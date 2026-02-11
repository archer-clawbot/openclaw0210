// Token Cost Observatory — reads session JSONL files, aggregates costs by agent and date.
// Powers `node dispatcher.js --costs` and per-task cost recording.

const fs = require('fs');
const path = require('path');

const OPENCLAW_HOME = process.env.OPENCLAW_HOME || path.resolve(__dirname, '../..');
const AGENTS_DIR = path.join(OPENCLAW_HOME, 'agents');

/**
 * Scan a single session JSONL file and sum all usage costs.
 * Returns { inputTokens, outputTokens, cacheReadTokens, cacheWriteTokens, totalTokens, totalCost, messageCount }
 */
function scanSessionCost(filePath) {
  const result = {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    totalTokens: 0,
    totalCost: 0,
    messageCount: 0,
  };

  let data;
  try {
    data = fs.readFileSync(filePath, 'utf8');
  } catch {
    return result;
  }

  const lines = data.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const entry = JSON.parse(line);
      if (entry.type !== 'message') continue;
      if (entry.message?.role !== 'assistant') continue;
      const u = entry.message?.usage;
      if (!u) continue;
      result.inputTokens += u.input || 0;
      result.outputTokens += u.output || 0;
      result.cacheReadTokens += u.cacheRead || 0;
      result.cacheWriteTokens += u.cacheWrite || 0;
      result.totalTokens += u.totalTokens || 0;
      result.totalCost += u.cost?.total || 0;
      result.messageCount++;
    } catch {
      // malformed line — skip
    }
  }
  return result;
}

/**
 * Get costs for all sessions of an agent modified within the last N days.
 * Returns { agentId, sessions: [{ file, ...cost }], total: { ...cost } }
 */
function getAgentCosts(agentId, days = 7) {
  const sessDir = path.join(AGENTS_DIR, agentId, 'sessions');
  const cutoff = Date.now() - days * 86_400_000;

  let files;
  try {
    files = fs.readdirSync(sessDir);
  } catch {
    return { agentId, sessions: [], total: emptyCost() };
  }

  const sessions = [];
  for (const file of files) {
    if (!file.endsWith('.jsonl')) continue;
    const full = path.join(sessDir, file);
    try {
      const stat = fs.statSync(full);
      if (stat.mtimeMs < cutoff) continue;
    } catch {
      continue;
    }
    const cost = scanSessionCost(full);
    if (cost.messageCount > 0) {
      sessions.push({ file, ...cost });
    }
  }

  const total = sessions.reduce((acc, s) => {
    acc.inputTokens += s.inputTokens;
    acc.outputTokens += s.outputTokens;
    acc.cacheReadTokens += s.cacheReadTokens;
    acc.cacheWriteTokens += s.cacheWriteTokens;
    acc.totalTokens += s.totalTokens;
    acc.totalCost += s.totalCost;
    acc.messageCount += s.messageCount;
    return acc;
  }, emptyCost());

  return { agentId, sessions, total };
}

/**
 * Get costs for ALL agents within the last N days.
 * Returns array of { agentId, sessions, total } sorted by totalCost desc.
 */
function getAllAgentCosts(days = 7) {
  let agents;
  try {
    agents = fs.readdirSync(AGENTS_DIR).filter(d => {
      try {
        return fs.statSync(path.join(AGENTS_DIR, d, 'sessions')).isDirectory();
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }

  const results = agents
    .map(a => getAgentCosts(a, days))
    .filter(r => r.sessions.length > 0)
    .sort((a, b) => b.total.totalCost - a.total.totalCost);

  return results;
}

/**
 * Find cost data for a specific task by matching the agent's session files.
 * Looks for sessions modified after dispatchedAt whose first user message matches the task title.
 * Returns cost object or null.
 */
function getTaskCost(agentId, openclawRunId) {
  const sessDir = path.join(AGENTS_DIR, agentId, 'sessions');

  // Try direct session file match using the runId (which is often the session ID)
  const directFile = path.join(sessDir, `${openclawRunId}.jsonl`);
  try {
    fs.statSync(directFile);
    const cost = scanSessionCost(directFile);
    return cost.messageCount > 0 ? cost : null;
  } catch {
    // not a direct match — fall through to scan
  }

  // Fallback: scan recent session files for one whose session ID matches the runId
  let files;
  try {
    files = fs.readdirSync(sessDir);
  } catch {
    return null;
  }

  for (const file of files) {
    if (!file.endsWith('.jsonl')) continue;
    const full = path.join(sessDir, file);
    try {
      const firstLine = fs.readFileSync(full, 'utf8').split('\n')[0];
      const header = JSON.parse(firstLine);
      if (header.type === 'session' && header.id === openclawRunId) {
        const cost = scanSessionCost(full);
        return cost.messageCount > 0 ? cost : null;
      }
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Format cost data as a CLI-printable table.
 */
function formatCostReport(data, days = 7) {
  const lines = [];
  lines.push(`── Cost Summary (Last ${days} Days) ────────────────────────────`);
  lines.push(`${'Agent'.padEnd(13)}${'Sessions'.padEnd(10)}${'Input'.padEnd(10)}${'Output'.padEnd(10)}Total Cost`);
  lines.push('─'.repeat(60));

  let grandTotal = emptyCost();
  let grandSessions = 0;

  for (const agent of data) {
    const t = agent.total;
    grandTotal.inputTokens += t.inputTokens;
    grandTotal.outputTokens += t.outputTokens;
    grandTotal.totalCost += t.totalCost;
    grandSessions += agent.sessions.length;

    lines.push(
      `${agent.agentId.padEnd(13)}` +
      `${String(agent.sessions.length).padEnd(10)}` +
      `${fmtTokens(t.inputTokens).padEnd(10)}` +
      `${fmtTokens(t.outputTokens).padEnd(10)}` +
      `$${t.totalCost.toFixed(2)}`
    );
  }

  lines.push('─'.repeat(60));
  lines.push(
    `${'TOTAL'.padEnd(13)}` +
    `${String(grandSessions).padEnd(10)}` +
    `${fmtTokens(grandTotal.inputTokens).padEnd(10)}` +
    `${fmtTokens(grandTotal.outputTokens).padEnd(10)}` +
    `$${grandTotal.totalCost.toFixed(2)}`
  );

  return lines.join('\n');
}

function fmtTokens(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  return String(n);
}

function emptyCost() {
  return { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, totalTokens: 0, totalCost: 0, messageCount: 0 };
}

module.exports = {
  scanSessionCost,
  getAgentCosts,
  getAllAgentCosts,
  getTaskCost,
  formatCostReport,
};
