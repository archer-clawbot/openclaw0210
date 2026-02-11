// Per-Skill Model Routing — routes tasks to the cheapest appropriate model.
// Keyword-based skill detection from task text, model floor enforcement for external content.

const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.resolve(__dirname, '..', 'routing-config.json');

const TIER_ORDER = { fast: 0, balanced: 1, premium: 2 };
const TIER_MODEL = { fast: 'haiku', balanced: 'sonnet', premium: 'opus' };

// ── Config Loading ─────────────────────────────────────────────────

let _configCache = null;
let _configMtime = 0;

function loadConfig() {
  try {
    const stat = fs.statSync(CONFIG_FILE);
    if (_configCache && stat.mtimeMs === _configMtime) return _configCache;
    _configCache = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    _configMtime = stat.mtimeMs;
    return _configCache;
  } catch {
    return { models: {}, rules: [], fallbacks: {}, defaultModel: 'sonnet' };
  }
}

function getModelTier(model) {
  const config = loadConfig();
  const modelDef = config.models[model];
  return modelDef ? modelDef.tier : 'balanced';
}

// ── Core Routing ───────────────────────────────────────────────────

/**
 * Route a task to the optimal model.
 * @param {string} agentId - target agent
 * @param {string} taskText - combined title + description for keyword matching
 * @param {object} opts - { processesExternalContent, escalationReason }
 * @returns {{ model: string, reason: string, rule: string|null, escalated: boolean }}
 */
function route(agentId, taskText, opts = {}) {
  const config = loadConfig();
  const textLower = (taskText || '').toLowerCase();

  // 1. Find matching rule (first match wins)
  let model = null;
  let reason = null;
  let matchedRule = null;

  for (const rule of config.rules || []) {
    if (rule.agent !== agentId) continue;

    // Check if any keyword matches the task text
    const matched = (rule.keywords || []).some(kw => textLower.includes(kw.toLowerCase()));
    if (matched) {
      model = rule.model;
      reason = rule.reason;
      matchedRule = rule.keywords.find(kw => textLower.includes(kw.toLowerCase()));
      break;
    }
  }

  // 2. Fallback if no rule matched
  if (!model) {
    model = (config.fallbacks || {})[agentId] || config.defaultModel || 'sonnet';
    reason = 'fallback (no rule matched)';
  }

  // 3. Enforce external content model floor
  let escalated = false;
  if (opts.processesExternalContent) {
    const floor = config.externalContentFloor || 'sonnet';
    const floorTier = TIER_ORDER[getModelTier(floor)] || 1;
    const modelTier = TIER_ORDER[getModelTier(model)] || 1;
    if (modelTier < floorTier) {
      model = floor;
      reason += ` (floor enforced: external content)`;
      escalated = true;
    }
  }

  // 4. Handle escalation request
  if (opts.escalationReason && config.allowEscalation !== false) {
    const currentTier = TIER_ORDER[getModelTier(model)] || 1;
    const nextTier = Math.min(currentTier + 1, 2);
    if (nextTier > currentTier) {
      const tierName = Object.entries(TIER_ORDER).find(([, v]) => v === nextTier)?.[0] || 'balanced';
      model = TIER_MODEL[tierName] || 'sonnet';
      reason += ` (escalated: ${opts.escalationReason})`;
      escalated = true;
    }
  }

  return { model, reason, rule: matchedRule, escalated };
}

/**
 * Get the model for an agent (simple lookup, no task text analysis).
 * Used as a drop-in replacement for the static AGENT_MODEL map.
 */
function getAgentDefault(agentId) {
  const config = loadConfig();
  return (config.fallbacks || {})[agentId] || config.defaultModel || 'sonnet';
}

/**
 * Check if an agent is known (exists in fallbacks or any rule).
 */
function isKnownAgent(agentId) {
  const config = loadConfig();
  if ((config.fallbacks || {})[agentId]) return true;
  return (config.rules || []).some(r => r.agent === agentId);
}

// ── Rule Management ────────────────────────────────────────────────

function addRule(agent, keywords, model, reason) {
  const config = loadConfig();
  config.rules.push({ agent, keywords, model, reason });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  _configCache = null;
  return true;
}

function removeRule(agent, keyword) {
  const config = loadConfig();
  const before = config.rules.length;
  config.rules = config.rules.filter(r =>
    !(r.agent === agent && r.keywords.some(kw => kw.toLowerCase() === keyword.toLowerCase()))
  );
  if (config.rules.length < before) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    _configCache = null;
    return true;
  }
  return false;
}

// ── Status / Reporting ─────────────────────────────────────────────

function formatStatus() {
  const config = loadConfig();
  const lines = [];
  lines.push('╔══════════════════════════════════════════╗');
  lines.push('║       MODEL ROUTING CONFIG               ║');
  lines.push('╚══════════════════════════════════════════╝');
  lines.push('');
  lines.push(`Default: ${config.defaultModel} | Floor: ${config.externalContentFloor} | Escalation: ${config.allowEscalation ? 'ON' : 'OFF'}`);
  lines.push('');

  // Show fallbacks
  lines.push('Agent Fallbacks:');
  const agents = Object.entries(config.fallbacks || {});
  const haikuAgents = agents.filter(([, m]) => m === 'haiku').map(([a]) => a);
  const sonnetAgents = agents.filter(([, m]) => m === 'sonnet').map(([a]) => a);
  if (haikuAgents.length) lines.push(`  haiku:  ${haikuAgents.join(', ')}`);
  if (sonnetAgents.length) lines.push(`  sonnet: ${sonnetAgents.join(', ')}`);
  lines.push('');

  // Show rules grouped by agent
  lines.push('Routing Rules:');
  lines.push('Agent'.padEnd(12) + 'Model'.padEnd(10) + 'Keywords'.padEnd(40) + 'Reason');
  lines.push('─'.repeat(85));
  for (const rule of config.rules || []) {
    lines.push(
      `${(rule.agent || '').padEnd(12)}${(rule.model || '').padEnd(10)}${(rule.keywords || []).join(', ').slice(0, 38).padEnd(40)}${rule.reason || ''}`
    );
  }

  return lines.join('\n');
}

module.exports = {
  route,
  getAgentDefault,
  isKnownAgent,
  addRule,
  removeRule,
  formatStatus,
  loadConfig,
};
