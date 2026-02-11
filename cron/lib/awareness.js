// Awareness Injection Engine — lightweight keyword-based RAG.
// Detects topics in task text, injects relevant documents into agent context.
// No vector DB or embeddings — pure keyword matching with fuzzy support.

const fs = require('fs');
const path = require('path');

const OPENCLAW_HOME = process.env.OPENCLAW_HOME || path.resolve(__dirname, '../..');
const REGISTRY_FILE = path.resolve(__dirname, '..', 'awareness-registry.json');

// ── Registry Loading ───────────────────────────────────────────────

let _registryCache = null;
let _registryMtime = 0;

function loadRegistry() {
  try {
    const stat = fs.statSync(REGISTRY_FILE);
    if (_registryCache && stat.mtimeMs === _registryMtime) return _registryCache;
    _registryCache = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf8'));
    _registryMtime = stat.mtimeMs;
    return _registryCache;
  } catch {
    return { config: {}, documents: [] };
  }
}

function getConfig() {
  const reg = loadRegistry();
  return {
    maxActiveInjections: 3,
    maxInjectionTokens: 5000,
    keywordThreshold: 0.3,
    stalenessWindow: 5,
    ...reg.config,
  };
}

// ── Topic Detection ────────────────────────────────────────────────

/**
 * Detect which documents match the given text for a specific agent.
 * @param {string} text - task title + description
 * @param {string} agentId - the target agent (filters by agent relevance)
 * @returns {Array<{ docId, confidence, matchedTriggers, priority, filepath, tokenEstimate }>}
 */
function detectTopics(text, agentId) {
  const registry = loadRegistry();
  const config = getConfig();
  const textLower = text.toLowerCase();
  const textWords = textLower.split(/\W+/).filter(w => w.length > 2);
  const matches = [];

  for (const doc of registry.documents) {
    // Filter by agent if doc has agent restrictions
    if (doc.agents && doc.agents.length > 0 && !doc.agents.includes(agentId)) {
      continue;
    }

    const matchedTriggers = [];
    let totalScore = 0;

    for (const trigger of doc.triggers) {
      const triggerLower = trigger.toLowerCase();

      // Exact phrase match (highest confidence)
      if (textLower.includes(triggerLower)) {
        matchedTriggers.push(trigger);
        totalScore += 1.0;
        continue;
      }

      // Word-level match for multi-word triggers
      const triggerWords = triggerLower.split(/\W+/).filter(w => w.length > 2);
      if (triggerWords.length > 1) {
        const wordMatches = triggerWords.filter(tw => textWords.includes(tw));
        if (wordMatches.length >= Math.ceil(triggerWords.length * 0.6)) {
          matchedTriggers.push(trigger);
          totalScore += 0.7;
          continue;
        }
      }

      // Fuzzy match for single words (handles typos)
      if (triggerWords.length === 1 && triggerLower.length >= 4) {
        for (const word of textWords) {
          if (fuzzyMatch(word, triggerLower, 0.8)) {
            matchedTriggers.push(trigger);
            totalScore += 0.5;
            break;
          }
        }
      }
    }

    if (matchedTriggers.length === 0) continue;

    // Normalize confidence to 0-1 range (cap at 1.0)
    const confidence = Math.min(1.0, totalScore / Math.max(doc.triggers.length * 0.3, 1));

    if (confidence >= config.keywordThreshold) {
      matches.push({
        docId: doc.docId,
        confidence,
        matchedTriggers,
        priority: doc.priority || 5,
        filepath: doc.filepath,
        tokenEstimate: doc.tokenEstimate || 1000,
        description: doc.description,
      });
    }
  }

  // Sort by (confidence * priority) descending
  matches.sort((a, b) => (b.confidence * b.priority) - (a.confidence * a.priority));
  return matches;
}

/**
 * Simple fuzzy match using Levenshtein-like ratio.
 */
function fuzzyMatch(a, b, threshold) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 2) return false;

  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return true;

  // Simple edit distance (optimized for short strings)
  const dist = editDistance(a, b);
  const ratio = 1 - dist / maxLen;
  return ratio >= threshold;
}

function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// ── Document Loading ───────────────────────────────────────────────

function loadDocument(filepath) {
  const fullPath = path.resolve(OPENCLAW_HOME, filepath);
  try {
    return fs.readFileSync(fullPath, 'utf8');
  } catch {
    return null;
  }
}

// ── Injection Assembly ─────────────────────────────────────────────

/**
 * Build the awareness injection block for a task.
 * @param {string} taskText - combined title + description
 * @param {string} agentId - target agent
 * @returns {{ injectionBlock: string, injectedDocs: string[], totalTokens: number }}
 */
function buildInjection(taskText, agentId) {
  const config = getConfig();
  const matches = detectTopics(taskText, agentId);

  const injected = [];
  let totalTokens = 0;
  const blocks = [];

  for (const match of matches) {
    // Respect limits
    if (injected.length >= config.maxActiveInjections) break;
    if (totalTokens + match.tokenEstimate > config.maxInjectionTokens) continue;

    const content = loadDocument(match.filepath);
    if (!content) continue;

    blocks.push([
      `[DOC: ${match.docId} | ${match.description}]`,
      content.trim(),
      `[/DOC]`,
    ].join('\n'));

    injected.push(match.docId);
    totalTokens += match.tokenEstimate;
  }

  if (blocks.length === 0) {
    return { injectionBlock: '', injectedDocs: [], totalTokens: 0 };
  }

  const injectionBlock = [
    '--- ACTIVE AWARENESS ---',
    ...blocks,
    '--- END AWARENESS ---',
  ].join('\n\n');

  return { injectionBlock, injectedDocs: injected, totalTokens };
}

/**
 * Force-inject a specific document by ID, regardless of topic matching.
 * @param {string} docId
 * @returns {{ injectionBlock: string } | null}
 */
function forceInject(docId) {
  const registry = loadRegistry();
  const doc = registry.documents.find(d => d.docId === docId);
  if (!doc) return null;

  const content = loadDocument(doc.filepath);
  if (!content) return null;

  return {
    injectionBlock: [
      '--- ACTIVE AWARENESS ---',
      `[DOC: ${doc.docId} | ${doc.description}]`,
      content.trim(),
      `[/DOC]`,
      '--- END AWARENESS ---',
    ].join('\n'),
  };
}

// ── Registry Management ────────────────────────────────────────────

function registerDocument(doc) {
  const registry = loadRegistry();
  // Remove existing with same ID
  registry.documents = registry.documents.filter(d => d.docId !== doc.docId);
  registry.documents.push(doc);
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));
  _registryCache = null; // invalidate cache
  return true;
}

function unregisterDocument(docId) {
  const registry = loadRegistry();
  const before = registry.documents.length;
  registry.documents = registry.documents.filter(d => d.docId !== docId);
  if (registry.documents.length < before) {
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));
    _registryCache = null;
    return true;
  }
  return false;
}

function listDocuments() {
  return loadRegistry().documents;
}

// ── Status Report ──────────────────────────────────────────────────

function formatStatus() {
  const registry = loadRegistry();
  const config = getConfig();
  const lines = [];
  lines.push('╔══════════════════════════════════════════╗');
  lines.push('║       AWARENESS ENGINE REGISTRY          ║');
  lines.push('╚══════════════════════════════════════════╝');
  lines.push('');
  lines.push(`Documents: ${registry.documents.length}`);
  lines.push(`Max injections: ${config.maxActiveInjections} | Max tokens: ${config.maxInjectionTokens}`);
  lines.push('');
  lines.push('DocId'.padEnd(25) + 'Tokens'.padEnd(8) + 'Pri'.padEnd(5) + 'Agents'.padEnd(20) + 'Triggers (sample)');
  lines.push('─'.repeat(90));

  for (const doc of registry.documents) {
    const agents = (doc.agents || []).join(',') || 'all';
    const triggers = (doc.triggers || []).slice(0, 3).join(', ');
    lines.push(
      `${(doc.docId || '').padEnd(25)}${String(doc.tokenEstimate || '?').padEnd(8)}${String(doc.priority || 5).padEnd(5)}${agents.padEnd(20)}${triggers}`
    );
  }

  return lines.join('\n');
}

module.exports = {
  detectTopics,
  buildInjection,
  forceInject,
  registerDocument,
  unregisterDocument,
  listDocuments,
  formatStatus,
  loadRegistry,
};
