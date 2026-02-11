// Credential Segmentation — per-agent access control for secrets.
// Agents only see credentials listed in their manifest. System-tier keys are never exposed.

const fs = require('fs');
const path = require('path');

const MANIFEST_FILE = path.resolve(__dirname, '..', 'manifests', 'agent-credentials.json');
const AUDIT_LOG = path.resolve(__dirname, '..', 'data', 'credential-audit.jsonl');

// ── Manifest Loading ───────────────────────────────────────────────

let _manifestCache = null;
let _manifestMtime = 0;

function loadManifest() {
  try {
    const stat = fs.statSync(MANIFEST_FILE);
    if (_manifestCache && stat.mtimeMs === _manifestMtime) return _manifestCache;
    _manifestCache = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    _manifestMtime = stat.mtimeMs;
    return _manifestCache;
  } catch {
    return { tiers: { system: { keys: [] }, shared: { keys: [] } }, agents: {} };
  }
}

// ── Core Access Control ────────────────────────────────────────────

/**
 * Get the list of env var keys an agent is allowed to access.
 * Includes: agent-specific keys + shared-tier keys.
 * Excludes: system-tier keys + other agents' keys.
 */
function getAllowedKeys(agentId) {
  const manifest = loadManifest();
  const agentManifest = manifest.agents[agentId];
  if (!agentManifest) return [...(manifest.tiers.shared?.keys || [])];

  return [
    ...(agentManifest.credentials || []),
    ...(manifest.tiers.shared?.keys || []),
  ];
}

/**
 * Check if an agent is allowed to access a specific credential key.
 */
function isAllowed(agentId, credentialKey) {
  const manifest = loadManifest();

  // System-tier keys are NEVER allowed for any agent
  if ((manifest.tiers.system?.keys || []).includes(credentialKey)) {
    return false;
  }

  // Shared-tier keys are always allowed
  if ((manifest.tiers.shared?.keys || []).includes(credentialKey)) {
    return true;
  }

  // Check agent-specific manifest
  const agentManifest = manifest.agents[agentId];
  if (!agentManifest) return false;

  return (agentManifest.credentials || []).includes(credentialKey);
}

/**
 * Check if an agent is allowed to access a specific client service (e.g., "wordpress", "gbp").
 */
function hasClientAccess(agentId, serviceType) {
  const manifest = loadManifest();
  const agentManifest = manifest.agents[agentId];
  if (!agentManifest) return false;
  return (agentManifest.clientAccess || []).includes(serviceType);
}

/**
 * Build a filtered environment dict for an agent.
 * Only includes keys the agent is allowed to see.
 */
function getEnvForAgent(agentId) {
  const allowed = getAllowedKeys(agentId);
  const env = {};
  for (const key of allowed) {
    if (process.env[key]) {
      env[key] = process.env[key];
    }
  }
  return env;
}

/**
 * Validate that a client config's access block is appropriate for the target agent.
 * Returns { allowed: boolean, blocked: string[] } where blocked lists denied service types.
 */
function validateClientAccess(agentId, clientAccess) {
  if (!clientAccess || typeof clientAccess !== 'object') {
    return { allowed: true, blocked: [] };
  }

  const blocked = [];
  for (const serviceType of Object.keys(clientAccess)) {
    if (!hasClientAccess(agentId, serviceType)) {
      blocked.push(serviceType);
    }
  }

  return {
    allowed: blocked.length === 0,
    blocked,
  };
}

/**
 * Filter a client config's access block to only include services the agent can use.
 * Returns a new access object with only allowed services.
 */
function filterClientAccess(agentId, clientAccess) {
  if (!clientAccess || typeof clientAccess !== 'object') return {};

  const filtered = {};
  for (const [serviceType, config] of Object.entries(clientAccess)) {
    if (hasClientAccess(agentId, serviceType)) {
      filtered[serviceType] = config;
    }
  }
  return filtered;
}

// ── Audit Logging ──────────────────────────────────────────────────

function logAccess(agentId, credentialKey, action, allowed) {
  const entry = {
    timestamp: new Date().toISOString(),
    agentId,
    credentialKey,
    action,
    allowed,
  };

  try {
    const dir = path.dirname(AUDIT_LOG);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(AUDIT_LOG, JSON.stringify(entry) + '\n');
  } catch { /* audit logging should never crash the system */ }
}

/**
 * Checked access — logs the access attempt and returns the value if allowed, null if denied.
 */
function getCredential(agentId, credentialKey) {
  const allowed = isAllowed(agentId, credentialKey);
  logAccess(agentId, credentialKey, 'read', allowed);

  if (!allowed) return null;
  return process.env[credentialKey] || null;
}

// ── Status / Reporting ─────────────────────────────────────────────

function formatManifestReport() {
  const manifest = loadManifest();
  const lines = [];
  lines.push('╔══════════════════════════════════════════╗');
  lines.push('║       CREDENTIAL MANIFEST REPORT         ║');
  lines.push('╚══════════════════════════════════════════╝');
  lines.push('');

  lines.push('System-tier (never exposed):');
  for (const key of manifest.tiers.system?.keys || []) {
    lines.push(`  - ${key}`);
  }
  lines.push('');
  lines.push('Shared-tier (all agents):');
  for (const key of manifest.tiers.shared?.keys || []) {
    lines.push(`  - ${key}`);
  }
  lines.push('');

  lines.push('Agent'.padEnd(14) + 'Credentials'.padEnd(35) + 'Client Access');
  lines.push('─'.repeat(65));
  for (const [agentId, agentDef] of Object.entries(manifest.agents)) {
    const creds = (agentDef.credentials || []).join(', ') || '(none)';
    const access = (agentDef.clientAccess || []).join(', ') || '(none)';
    lines.push(`${agentId.padEnd(14)}${creds.padEnd(35)}${access}`);
  }

  return lines.join('\n');
}

module.exports = {
  getAllowedKeys,
  isAllowed,
  hasClientAccess,
  getEnvForAgent,
  validateClientAccess,
  filterClientAccess,
  getCredential,
  formatManifestReport,
  loadManifest,
};
