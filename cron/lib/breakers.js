// Circuit Breaker — cost-based dispatch protection.
// Three states: CLOSED (normal) → OPEN (paused) → HALF_OPEN (probe)
// Reads live cost data from Observatory, trips when limits exceeded.

const fs = require('fs');
const path = require('path');
const observatory = require('./observatory');

const STATE_FILE = path.resolve(__dirname, '..', 'breaker-state.json');
const LIMITS_FILE = path.resolve(__dirname, '..', 'breaker-limits.json');

// ── State persistence ──────────────────────────────────────────────

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { agents: {}, fleet: { state: 'CLOSED' } };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ── Config ─────────────────────────────────────────────────────────

function loadLimits() {
  try {
    return JSON.parse(fs.readFileSync(LIMITS_FILE, 'utf8'));
  } catch {
    return {
      defaults: { hourly: 5, daily: 40 },
      fleet: { hourly: 30, daily: 200 },
      thresholds: { warning: 80, critical: 95, trip: 100 },
      cooldownMinutes: 15,
      agents: {},
    };
  }
}

function getAgentLimits(agentId) {
  const config = loadLimits();
  const overrides = config.agents[agentId] || {};
  return {
    hourly: overrides.hourly ?? config.defaults.hourly,
    daily: overrides.daily ?? config.defaults.daily,
  };
}

function getFleetLimits() {
  return loadLimits().fleet;
}

function getCooldownMs() {
  const config = loadLimits();
  return (config.cooldownMinutes || 15) * 60 * 1000;
}

function getThresholds() {
  const config = loadLimits();
  return config.thresholds || { warning: 80, critical: 95, trip: 100 };
}

// ── Core: check before dispatch ────────────────────────────────────

/**
 * Check if an agent is allowed to dispatch.
 * Call this BEFORE every gw.dispatchAgent().
 * @param {string} agentId
 * @param {Function} log - dispatcher's log function
 * @returns {{ allowed: boolean, state: string, reason?: string, costs?: object }}
 */
function check(agentId, log = () => {}) {
  const state = loadState();
  const cooldownMs = getCooldownMs();
  const thresholds = getThresholds();
  const agentState = state.agents[agentId] || { state: 'CLOSED', trippedAt: null };

  // ── OPEN: enforce cooldown, transition to HALF_OPEN when expired ──
  if (agentState.state === 'OPEN') {
    const elapsed = Date.now() - (agentState.trippedAt || 0);
    if (elapsed >= cooldownMs) {
      agentState.state = 'HALF_OPEN';
      state.agents[agentId] = agentState;
      saveState(state);
      log(`  [breaker] ${agentId}: OPEN → HALF_OPEN (cooldown expired, allowing probe)`);
      return { allowed: true, state: 'HALF_OPEN', reason: 'probe dispatch' };
    }
    const remaining = Math.ceil((cooldownMs - elapsed) / 60000);
    return { allowed: false, state: 'OPEN', reason: `tripped — ${remaining}min cooldown remaining` };
  }

  // ── Get current spend from Observatory ──
  const limits = getAgentLimits(agentId);
  // Observatory accepts fractional days: 1/24 = last hour
  const hourlyCosts = observatory.getAgentCosts(agentId, 1 / 24);
  const dailyCosts = observatory.getAgentCosts(agentId, 1);

  const hourlySpend = hourlyCosts.total.totalCost;
  const dailySpend = dailyCosts.total.totalCost;

  const hourlyPct = limits.hourly > 0 ? (hourlySpend / limits.hourly) * 100 : 0;
  const dailyPct = limits.daily > 0 ? (dailySpend / limits.daily) * 100 : 0;

  const costs = {
    hourly: { spend: hourlySpend, limit: limits.hourly, pct: hourlyPct },
    daily: { spend: dailySpend, limit: limits.daily, pct: dailyPct },
  };

  // ── Trip at 100% ──
  if (hourlyPct >= thresholds.trip || dailyPct >= thresholds.trip) {
    const reason = hourlyPct >= thresholds.trip
      ? `hourly limit hit ($${hourlySpend.toFixed(2)}/$${limits.hourly})`
      : `daily limit hit ($${dailySpend.toFixed(2)}/$${limits.daily})`;
    trip(agentId, reason, state);
    log(`  [breaker] ${agentId}: TRIPPED — ${reason}`);
    return { allowed: false, state: 'OPEN', reason, costs };
  }

  // ── Fleet-wide check ──
  const fleetResult = checkFleet(log);
  if (!fleetResult.allowed) {
    return { allowed: false, state: 'FLEET_OPEN', reason: `fleet: ${fleetResult.reason}`, costs };
  }

  // ── Warning / critical logging (don't block) ──
  const maxPct = Math.max(hourlyPct, dailyPct);
  if (maxPct >= thresholds.critical) {
    log(`  [breaker] ${agentId}: CRITICAL (${maxPct.toFixed(0)}% of limit)`);
    sendAlert(agentId, 'critical', costs);
  } else if (maxPct >= thresholds.warning) {
    log(`  [breaker] ${agentId}: WARNING (${maxPct.toFixed(0)}% of limit)`);
    sendAlert(agentId, 'warning', costs);
  }

  // ── HALF_OPEN probe succeeded — close breaker ──
  if (agentState.state === 'HALF_OPEN') {
    agentState.state = 'CLOSED';
    agentState.trippedAt = null;
    state.agents[agentId] = agentState;
    saveState(state);
    log(`  [breaker] ${agentId}: HALF_OPEN → CLOSED (probe OK, costs under limit)`);
  }

  return { allowed: true, state: agentState.state || 'CLOSED', costs };
}

// ── Fleet-wide check ───────────────────────────────────────────────

function checkFleet(log = () => {}) {
  const limits = getFleetLimits();

  const dailyAll = observatory.getAllAgentCosts(1);
  const dailySpend = dailyAll.reduce((sum, a) => sum + a.total.totalCost, 0);

  const hourlyAll = observatory.getAllAgentCosts(1 / 24);
  const hourlySpend = hourlyAll.reduce((sum, a) => sum + a.total.totalCost, 0);

  if (hourlySpend >= limits.hourly) {
    const reason = `hourly fleet limit ($${hourlySpend.toFixed(2)}/$${limits.hourly})`;
    log(`  [breaker] FLEET TRIPPED — ${reason}`);
    sendAlert('FLEET', 'tripped', { reason });
    return { allowed: false, reason };
  }
  if (dailySpend >= limits.daily) {
    const reason = `daily fleet limit ($${dailySpend.toFixed(2)}/$${limits.daily})`;
    log(`  [breaker] FLEET TRIPPED — ${reason}`);
    sendAlert('FLEET', 'tripped', { reason });
    return { allowed: false, reason };
  }

  return { allowed: true };
}

// ── Manual controls ────────────────────────────────────────────────

function trip(agentId, reason, existingState) {
  const state = existingState || loadState();
  state.agents[agentId] = {
    state: 'OPEN',
    trippedAt: Date.now(),
    reason,
  };
  saveState(state);
  sendAlert(agentId, 'tripped', { reason });
}

function reset(agentId) {
  const state = loadState();
  if (state.agents[agentId]) {
    state.agents[agentId] = { state: 'CLOSED', trippedAt: null };
    saveState(state);
  }
  return true;
}

function resetAll() {
  saveState({ agents: {}, fleet: { state: 'CLOSED' } });
  return true;
}

// ── Status report ──────────────────────────────────────────────────

function status() {
  const state = loadState();
  const allCosts = observatory.getAllAgentCosts(1);
  const fleetLimits = getFleetLimits();

  let fleetDaily = 0;
  const agents = [];

  for (const agent of allCosts) {
    const agentState = state.agents[agent.agentId] || { state: 'CLOSED' };
    const limits = getAgentLimits(agent.agentId);
    const dailyPct = limits.daily > 0 ? (agent.total.totalCost / limits.daily) * 100 : 0;
    fleetDaily += agent.total.totalCost;

    agents.push({
      agentId: agent.agentId,
      state: agentState.state,
      dailySpend: agent.total.totalCost,
      dailyLimit: limits.daily,
      pct: dailyPct.toFixed(0) + '%',
      trippedAt: agentState.trippedAt ? new Date(agentState.trippedAt).toISOString() : null,
      reason: agentState.reason || null,
    });
  }

  // Include agents that are tripped but had no recent costs
  for (const [agentId, agentState] of Object.entries(state.agents)) {
    if (agentState.state !== 'CLOSED' && !agents.find(a => a.agentId === agentId)) {
      const limits = getAgentLimits(agentId);
      agents.push({
        agentId,
        state: agentState.state,
        dailySpend: 0,
        dailyLimit: limits.daily,
        pct: '0%',
        trippedAt: agentState.trippedAt ? new Date(agentState.trippedAt).toISOString() : null,
        reason: agentState.reason || null,
      });
    }
  }

  return {
    fleet: {
      dailySpend: fleetDaily,
      dailyLimit: fleetLimits.daily,
      pct: fleetLimits.daily > 0 ? (fleetDaily / fleetLimits.daily * 100).toFixed(0) + '%' : '0%',
    },
    agents,
  };
}

function formatStatus() {
  const s = status();
  const lines = [];
  lines.push('╔══════════════════════════════════════════╗');
  lines.push('║         CIRCUIT BREAKER STATUS           ║');
  lines.push('╚══════════════════════════════════════════╝');
  lines.push('');
  lines.push(`Fleet: $${s.fleet.dailySpend.toFixed(2)} / $${s.fleet.dailyLimit} daily (${s.fleet.pct})`);
  lines.push('');
  lines.push('Agent'.padEnd(14) + 'State'.padEnd(12) + 'Daily Spend'.padEnd(14) + 'Limit'.padEnd(10) + 'Usage');
  lines.push('─'.repeat(58));

  for (const a of s.agents) {
    const stateStr = a.state === 'CLOSED' ? a.state : `${a.state}`;
    lines.push(
      `${a.agentId.padEnd(14)}${stateStr.padEnd(12)}$${a.dailySpend.toFixed(2).padEnd(13)}$${a.dailyLimit.toString().padEnd(9)}${a.pct}`
    );
    if (a.reason) {
      lines.push(`  └─ ${a.reason}`);
    }
  }

  if (s.agents.length === 0) {
    lines.push('  (no agent activity in last 24h)');
  }

  return lines.join('\n');
}

// ── Telegram alerting (graceful if not configured) ─────────────────

const _lastAlert = {};
const ALERT_COOLDOWN = 5 * 60 * 1000; // 5 min between same alerts

function sendAlert(agentId, level, data) {
  const key = `${agentId}:${level}`;
  const now = Date.now();
  if (_lastAlert[key] && (now - _lastAlert[key]) < ALERT_COOLDOWN) return;
  _lastAlert[key] = now;

  const botToken = process.env.TELEGRAM_BOT_TOKEN_ARCHER;
  const chatId = process.env.TELEGRAM_CHAT_ID || '7302669335';
  if (!botToken) return; // gracefully skip if not configured

  const emoji = level === 'tripped' ? '\u{1F6A8}' : level === 'critical' ? '\u26A0\uFE0F' : '\u{1F4A1}';
  let text;

  if (level === 'tripped') {
    text = `${emoji} BREAKER TRIPPED: ${agentId}\n${data.reason}\nAgent paused for ${loadLimits().cooldownMinutes || 15}min cooldown.`;
  } else {
    const costs = data;
    const maxBucket = costs.hourly.pct > costs.daily.pct ? 'hourly' : 'daily';
    const bucket = costs[maxBucket];
    text = `${emoji} ${level.toUpperCase()}: ${agentId}\n$${bucket.spend.toFixed(2)}/$${bucket.limit} ${maxBucket} (${bucket.pct.toFixed(0)}%)`;
  }

  // Fire-and-forget HTTPS POST to Telegram
  const https = require('https');
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const body = JSON.stringify({ chat_id: chatId, text });

  const req = https.request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
  req.on('error', () => {}); // swallow — alerting should never crash the dispatcher
  req.write(body);
  req.end();
}

module.exports = {
  check,
  trip,
  reset,
  resetAll,
  status,
  formatStatus,
};
