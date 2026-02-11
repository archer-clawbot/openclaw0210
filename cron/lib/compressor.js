// Noiseless Memory Compressor — three-zone conversation compression.
// Raw (full fidelity) → Compressed (AI-dense) → Archive (hash-ref only) → Purge
// Preserves all signal (proper nouns, URLs, numbers, decisions, code refs)
// while stripping conversational noise.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OPENCLAW_HOME = process.env.OPENCLAW_HOME || path.resolve(__dirname, '../..');
const MEMORY_DIR = path.join(OPENCLAW_HOME, 'cron', 'data', 'memory');
const BLOCKS_DIR = path.join(MEMORY_DIR, 'blocks');
const STATE_DIR = path.join(MEMORY_DIR, 'agents');

// ── Config ─────────────────────────────────────────────────────────

const CONFIG = {
  rawZoneMax: 20,              // Keep last 20 messages in full fidelity
  compressBlockSize: 10,       // Compress every 10 messages into one block
  compressedZoneMax: 10,       // Keep 10 compressed blocks before archiving
  archiveZoneMax: 50,          // Keep 50 hash refs before purging
  targetCompressionRatio: 0.4, // Aim for 60% reduction
  maxContextTokens: 100000,
  rawZoneTokenBudget: 50000,
  compressedZoneTokenBudget: 30000,
  archiveZoneTokenBudget: 5000,
};

// ── Compression Prompt ─────────────────────────────────────────────

const COMPRESSION_PROMPT = `You are a conversation compressor. Convert verbose human-AI conversations into machine-dense notation that another AI can perfectly reconstruct the meaning from.

RULES:
1. STRIP: pleasantries, filler words, hedging language, repeated information, conversational acknowledgments ("got it", "sure", "okay so"), meta-discussion about the conversation itself.
2. PRESERVE EXACTLY: all proper nouns, URLs, file paths, code snippets, numbers, dates, API keys/references, decisions made, action items, technical specifications.
3. FORMAT: Use structured notation:
   - DECISION: [what was decided]
   - ACTION: [who] → [what] by [when]
   - CONTEXT: [key fact established]
   - CODE_REF: [file/function referenced]
   - DATA: [any numerical data, configs, specs]
   - TOPIC: [subject being discussed]
4. NO PROSE. No articles (a, the). No filler. Pure signal.
5. Maintain chronological order within the block.
6. If the user corrected themselves or changed a decision, only keep the FINAL version and note it was revised.

Compress the following conversation block. Output ONLY the compressed notation, nothing else:`;

// ── Block Store ────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function hashBlock(messages) {
  const content = JSON.stringify(messages);
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

function saveBlock(agentId, messages) {
  ensureDir(BLOCKS_DIR);
  const hash = hashBlock(messages);
  const file = path.join(BLOCKS_DIR, `${agentId}_${hash}.json`);
  fs.writeFileSync(file, JSON.stringify({
    agentId,
    hash,
    messageCount: messages.length,
    savedAt: new Date().toISOString(),
    messages,
  }, null, 2));
  return hash;
}

function loadBlock(agentId, hash) {
  const file = path.join(BLOCKS_DIR, `${agentId}_${hash}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data.messages || [];
  } catch {
    return null;
  }
}

// ── Token Estimation ───────────────────────────────────────────────

function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

function estimateMessagesTokens(messages) {
  return messages.reduce((sum, m) => sum + estimateTokens(m.content || JSON.stringify(m)), 0);
}

// ── Heuristic Compressor (no API call) ─────────────────────────────

/**
 * Fast heuristic compression — strips noise patterns without an AI call.
 * Used as fallback when no Anthropic client is available, or for cost savings.
 */
function compressHeuristic(messages) {
  const lines = [];
  let currentTopic = null;

  for (const msg of messages) {
    const content = msg.content || (typeof msg === 'string' ? msg : JSON.stringify(msg));
    const role = msg.role || 'unknown';

    // Extract structured elements
    const urls = content.match(/https?:\/\/[^\s"'<>]+/g) || [];
    const paths = content.match(/[A-Z]:\\[^\s"']+|\/[\w/.-]+\.\w+/g) || [];
    const numbers = content.match(/\$[\d,.]+|\d+%|\d{4}-\d{2}-\d{2}/g) || [];
    const decisions = content.match(/(?:decided?|chose?|going with|will use|switching to)\s+(.{10,60})/gi) || [];
    const actions = content.match(/(?:TODO|action|next step|will|should|need to)\s*:?\s*(.{10,80})/gi) || [];

    // Extract key sentences (those with proper nouns, numbers, or technical terms)
    const sentences = content.split(/[.!?\n]+/).filter(s => s.trim().length > 20);
    const keySentences = sentences.filter(s =>
      /[A-Z][a-z]+\s[A-Z]/.test(s) || // Proper nouns
      /\d/.test(s) ||                    // Numbers
      /(?:API|URL|config|schema|deploy|audit|optimize)/i.test(s) // Technical
    );

    // Build compressed entry
    const parts = [];
    if (keySentences.length > 0) {
      parts.push(...keySentences.slice(0, 3).map(s => s.trim()));
    }
    if (urls.length > 0) parts.push(`URLs: ${urls.join(', ')}`);
    if (paths.length > 0) parts.push(`FILES: ${paths.join(', ')}`);
    if (decisions.length > 0) parts.push(...decisions.map(d => `DECISION: ${d.trim()}`));
    if (actions.length > 0) parts.push(...actions.map(a => `ACTION: ${a.trim()}`));

    if (parts.length > 0) {
      lines.push(`[${role}] ${parts.join(' | ')}`);
    }
  }

  return lines.join('\n') || '(empty block)';
}

// ── AI Compressor ──────────────────────────────────────────────────

/**
 * Compress using Claude API (Haiku for cost efficiency).
 * @param {Array} messages - conversation messages to compress
 * @param {Function} apiCall - async function(prompt) that calls Claude and returns text
 * @returns {string} compressed text
 */
async function compressWithAI(messages, apiCall) {
  const block = messages.map(m => {
    const role = m.role || 'unknown';
    const content = m.content || JSON.stringify(m);
    return `[${role}]: ${content}`;
  }).join('\n\n');

  const prompt = `${COMPRESSION_PROMPT}\n\n${block}`;
  return await apiCall(prompt);
}

// ── Memory Manager ─────────────────────────────────────────────────

class MemoryManager {
  /**
   * @param {string} agentId
   * @param {object} opts - { apiCall, config }
   *   apiCall: async (prompt) => string — optional, for AI compression
   */
  constructor(agentId, opts = {}) {
    this.agentId = agentId;
    this.apiCall = opts.apiCall || null;
    this.config = { ...CONFIG, ...opts.config };

    // Load persisted state or initialize
    this.stateFile = path.join(STATE_DIR, `${agentId}.json`);
    this._loadState();
  }

  _loadState() {
    ensureDir(STATE_DIR);
    try {
      const data = JSON.parse(fs.readFileSync(this.stateFile, 'utf8'));
      this.rawZone = data.rawZone || [];
      this.compressedZone = data.compressedZone || [];
      this.archiveZone = data.archiveZone || [];
    } catch {
      this.rawZone = [];
      this.compressedZone = [];
      this.archiveZone = [];
    }
  }

  _saveState() {
    ensureDir(STATE_DIR);
    fs.writeFileSync(this.stateFile, JSON.stringify({
      agentId: this.agentId,
      updatedAt: new Date().toISOString(),
      rawZone: this.rawZone,
      compressedZone: this.compressedZone,
      archiveZone: this.archiveZone,
    }, null, 2));
  }

  /**
   * Add a message to the raw zone and trigger zone management.
   */
  async addMessage(message) {
    this.rawZone.push({
      ...message,
      timestamp: message.timestamp || new Date().toISOString(),
    });

    // Check if raw zone needs compression
    if (this.rawZone.length > this.config.rawZoneMax) {
      await this._compress();
    }

    this._saveState();
  }

  /**
   * Add multiple messages at once.
   */
  async addMessages(messages) {
    for (const msg of messages) {
      this.rawZone.push({
        ...msg,
        timestamp: msg.timestamp || new Date().toISOString(),
      });
    }

    while (this.rawZone.length > this.config.rawZoneMax) {
      await this._compress();
    }

    this._saveState();
  }

  /**
   * Assemble the context window for API calls.
   */
  getContextWindow() {
    const sections = [];

    // Archive zone (minimal — hash refs with topic tags)
    if (this.archiveZone.length > 0) {
      const archiveLines = this.archiveZone.map(a =>
        `[hash:${a.hash}] Topics: ${(a.topics || []).join(', ')} | ${a.timeRange || '?'}`
      );
      sections.push('--- ARCHIVE REFS (retrievable) ---\n' + archiveLines.join('\n'));
    }

    // Compressed zone (AI-dense blocks)
    if (this.compressedZone.length > 0) {
      const compLines = this.compressedZone.map(c => c.compressedText);
      sections.push('--- COMPRESSED CONTEXT ---\n' + compLines.join('\n\n'));
    }

    // Raw zone (full fidelity)
    if (this.rawZone.length > 0) {
      const rawLines = this.rawZone.map(m => {
        const role = m.role || 'unknown';
        const content = m.content || JSON.stringify(m);
        return `[${role}]: ${content}`;
      });
      sections.push('--- RECENT (RAW) ---\n' + rawLines.join('\n\n'));
    }

    return sections.join('\n\n');
  }

  /**
   * Compress oldest raw messages into a compressed block.
   */
  async _compress() {
    const blockSize = this.config.compressBlockSize;
    const toCompress = this.rawZone.splice(0, blockSize);

    if (toCompress.length === 0) return;

    // Save raw block to disk for later retrieval
    const hash = saveBlock(this.agentId, toCompress);

    // Compress
    let compressedText;
    if (this.apiCall) {
      try {
        compressedText = await compressWithAI(toCompress, this.apiCall);
      } catch {
        compressedText = compressHeuristic(toCompress);
      }
    } else {
      compressedText = compressHeuristic(toCompress);
    }

    // Extract topic tags from compressed text
    const topics = extractTopics(compressedText);

    const timeRange = toCompress.length > 0
      ? `${toCompress[0].timestamp || '?'} to ${toCompress[toCompress.length - 1].timestamp || '?'}`
      : '?';

    this.compressedZone.push({
      hash,
      compressedText,
      originalTokens: estimateMessagesTokens(toCompress),
      compressedTokens: estimateTokens(compressedText),
      topics,
      timeRange,
      compressedAt: new Date().toISOString(),
    });

    // Check if compressed zone needs archiving
    this._archive();
  }

  /**
   * Move oldest compressed blocks to archive (hash-ref only).
   */
  _archive() {
    while (this.compressedZone.length > this.config.compressedZoneMax) {
      const oldest = this.compressedZone.shift();
      this.archiveZone.push({
        hash: oldest.hash,
        topics: oldest.topics,
        timeRange: oldest.timeRange,
        archivedAt: new Date().toISOString(),
      });
    }

    // Purge oldest archive entries
    while (this.archiveZone.length > this.config.archiveZoneMax) {
      this.archiveZone.shift(); // Raw blocks remain on disk for manual retrieval
    }
  }

  /**
   * Retrieve full raw messages for a block by hash.
   */
  retrieveBlock(hash) {
    return loadBlock(this.agentId, hash);
  }

  /**
   * Get zone statistics.
   */
  getStats() {
    const rawTokens = estimateMessagesTokens(this.rawZone);
    const compTokens = this.compressedZone.reduce((s, c) => s + (c.compressedTokens || 0), 0);
    const origTokens = this.compressedZone.reduce((s, c) => s + (c.originalTokens || 0), 0);
    return {
      rawMessages: this.rawZone.length,
      rawTokens,
      compressedBlocks: this.compressedZone.length,
      compressedTokens: compTokens,
      originalTokensBeforeCompression: origTokens,
      compressionRatio: origTokens > 0 ? (1 - compTokens / origTokens).toFixed(2) : 'N/A',
      archiveRefs: this.archiveZone.length,
      totalContextTokens: rawTokens + compTokens + this.archiveZone.length * 50,
    };
  }
}

// ── Topic Extraction ───────────────────────────────────────────────

function extractTopics(text) {
  const topics = new Set();
  // Look for TOPIC: lines
  const topicMatches = text.match(/TOPIC:\s*(.+)/gi) || [];
  for (const m of topicMatches) {
    topics.add(m.replace(/^TOPIC:\s*/i, '').trim());
  }
  // Look for common SEO/business terms
  const terms = ['audit', 'GBP', 'citations', 'schema', 'content', 'rankings',
    'website', 'WordPress', 'report', 'tracking', 'PBN', 'review'];
  const textLower = text.toLowerCase();
  for (const term of terms) {
    if (textLower.includes(term.toLowerCase())) topics.add(term);
  }
  return [...topics].slice(0, 5);
}

// ── Status Report ──────────────────────────────────────────────────

function formatStatus() {
  ensureDir(STATE_DIR);
  const lines = [];
  lines.push('╔══════════════════════════════════════════╗');
  lines.push('║       MEMORY COMPRESSOR STATUS           ║');
  lines.push('╚══════════════════════════════════════════╝');
  lines.push('');

  let agentFiles;
  try {
    agentFiles = fs.readdirSync(STATE_DIR).filter(f => f.endsWith('.json'));
  } catch {
    agentFiles = [];
  }

  if (agentFiles.length === 0) {
    lines.push('  No agent memory states found.');
    lines.push('  Memory compressor will activate when agents process tasks.');
    return lines.join('\n');
  }

  lines.push('Agent'.padEnd(14) + 'Raw'.padEnd(8) + 'Compressed'.padEnd(13) + 'Archive'.padEnd(10) + 'Ratio'.padEnd(8) + 'Context Tokens');
  lines.push('─'.repeat(65));

  for (const file of agentFiles) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(STATE_DIR, file), 'utf8'));
      const mm = new MemoryManager(data.agentId);
      const stats = mm.getStats();
      lines.push(
        `${(data.agentId || '?').padEnd(14)}${String(stats.rawMessages).padEnd(8)}${String(stats.compressedBlocks).padEnd(13)}${String(stats.archiveRefs).padEnd(10)}${String(stats.compressionRatio).padEnd(8)}~${stats.totalContextTokens}`
      );
    } catch { /* skip malformed */ }
  }

  // Block store stats
  ensureDir(BLOCKS_DIR);
  try {
    const blocks = fs.readdirSync(BLOCKS_DIR).filter(f => f.endsWith('.json'));
    const totalSize = blocks.reduce((s, f) => {
      try { return s + fs.statSync(path.join(BLOCKS_DIR, f)).size; } catch { return s; }
    }, 0);
    lines.push('');
    lines.push(`Block store: ${blocks.length} blocks, ${(totalSize / 1024).toFixed(1)}KB on disk`);
  } catch { /* ignore */ }

  return lines.join('\n');
}

module.exports = {
  MemoryManager,
  compressHeuristic,
  compressWithAI,
  saveBlock,
  loadBlock,
  estimateTokens,
  formatStatus,
  COMPRESSION_PROMPT,
  CONFIG,
};
