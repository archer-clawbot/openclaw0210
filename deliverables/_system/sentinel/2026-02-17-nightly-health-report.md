# OPENCLAW NIGHTLY HEALTH REPORT
**Tuesday, February 17, 2026 — 2:05 AM CST**

---

## SYSTEM STATUS: 🔴 CRITICAL

**Summary:** 2 critical failures detected. Immediate escalation required.

---

## CHECK RESULTS

### 1. Session Errors [FAIL]
**Status:** ❌ FAIL

- **Finding:** 75 tool execution errors detected in last 24 hours
- **Breakdown:**
  - **forge agent:** 26 tool errors (6 sessions: 7, 4, 2, 2, 3, 8 errors respectively)
  - **main agent:** 49 tool errors (17 sessions with failures; top session: 20 errors)
- **Threshold:** 0 = PASS, 1-5 = WARN, 6+ = FAIL
- **Root cause:** Tool execution failures in agent sessions — likely API timeouts, malformed requests, or tool availability issues
- **Impact:** 75 failed tool operations in 24h is significant; patterns suggest systematic issue
- **Recommendation:** Review agent logs for common failure patterns; check API credentials and network connectivity

### 2. Workspace Files [PASS]
**Status:** ✅ PASS

- All 18 agent workspaces have required files (AGENTS.md, SOUL.md, IDENTITY.md, TOOLS.md, USER.md, HEARTBEAT.md)
- No zero-byte files detected (except HEARTBEAT.md, which can be empty)

### 3. Gateway Health [PASS]
**Status:** ✅ PASS

- Port 18789 responding
- OpenClaw gateway is active and reachable

### 4. Telegram Bots [PASS]
**Status:** ✅ PASS

- All 18 Telegram bot accounts verified responding
- Bot tokens: valid and operational for all agents (default, silas, scribe, herald, wrench, citadel, mozi, ghost, ledger, canvas, scout, lookout, specs, blitz, razor, builder, sentinel, forge)

### 5. Session Sizes [PASS]
**Status:** ✅ PASS

- No oversized files detected (>5 MB)
- No stale files detected (>30 days old)
- Session storage health: normal

### 6. Runtime Directories [PASS]
**Status:** ✅ PASS

- All 18 agents have valid runtime structure
- Files verified: auth-profiles.json, models.json, sessions/ directories
- No missing or corrupted runtime files

### 7. Cron Jobs [WARN]
**Status:** ⚠️ WARN

- **Total jobs:** 8
- **Enabled:** 5
  - `Sentinel Nightly Health Check` (2:00 AM daily)
  - `Night Forge Nightly Improvement` (2:05 AM daily)
  - `Razor Weekly CRO Trigger` (9:00 AM Sundays)
  - `Blitz Weekly Campaign Optimization` (9:00 AM Mondays)
  - `Weekly Agent Standup` (9:00 AM Sundays)
  - `scribe-rate-limit-retry-batch2` (scheduled at-job)
  - `scribe-batch3-resume` (scheduled at-job)
- **Disabled:** 1
  - `AI Automation Daily Brief` (disabled — was 8:00 AM daily)
- **Issue:** Sentinel cron job failed on last run (Feb 16, 2:00 AM)
  - Error: "Slack bot token missing for account 'default'"
  - This prevented delivery of yesterday's report to #sentinel
- **Status:** Slack integration broken — awaiting token configuration

### 8. Archer Session State Audit [PASS]
**Status:** ✅ PASS

- Reviewed Archer's MEMORY.md for active "in progress" claims
- 7 active sessions detected in fleet: sentinel (2), main (1), forge (2), slack sessions (2)
- No phantom tasks found (memory claims match active sessions)
- Cross-reference: All claimed ongoing work has corresponding active sessions

### 9. Cost Anomaly Detection [FAIL]
**Status:** ❌ FAIL

- **24-hour cost summary:**
  - main: $26.66 (84% of fleet total)
  - forge: $4.86 (15% of fleet total)
  - sentinel: $0.22 (1% of fleet total)
  - **TOTAL: $31.75**

- **Threshold assessment:**
  - Main agent at 84% of daily cost (FAIL threshold: >60%)
  - Daily total $31.75 (FAIL threshold: >$50) ✓ under threshold
  - **Primary issue:** Cost concentration in single agent

- **Pattern:** Consistent with Feb 16 report (main at 76% yesterday); indicates sustained high-cost pattern
- **Likely cause:** High-token-count sessions in main agent (likely Weekly Standup sub-agents or large scribe spawns)
- **Recommendation:** Audit main agent's spawned sub-sessions; consider cost optimization for weekly standup workflow; check if Forge is accumulating expensive sessions

---

## ESCALATION ALERTS

### 🔴 CRITICAL: 2 Failures Detected

#### FAILED: Session Errors (Tool Execution)
- **Issue:** 75 tool execution errors in last 24h (forge: 26, main: 49)
- **Impact:** Tool failures prevent agent tasks from completing successfully
- **Recommended agent:** Wrench (tool debugging) or Specs (error analysis)
- **Suggested action:** 
  1. Pull tool error logs from forge and main sessions
  2. Identify common failure patterns (timeouts, auth, malformed requests)
  3. Check API credentials, network connectivity, tool availability
  4. If auth errors, review token refresh logic

#### FAILED: Cost Anomaly (Main Agent Resource Concentration)
- **Issue:** Main agent consuming 84% of daily fleet cost ($26.66 of $31.75)
- **Impact:** Budget concentration risk; if main keeps spawning expensive sub-agents, daily cost could exceed $50
- **Recommended agent:** Archer (resource planning) + Ledger (cost audit)
- **Suggested action:**
  1. Audit main agent's last 24h sessions for sub-agent spawns
  2. Check if Weekly Standup (Sunday 9 AM) is creating expensive parallelization
  3. Review Forge's cost trend (Night Forge runs at 2:05 AM, might compound costs)
  4. Consider rate-limiting or cost caps for main→sub-agent spawning
  5. Monitor daily if this becomes consistent pattern (>50% cost from single agent)

---

## TREND TRACKING

**From HEARTBEAT.md — Feb 16 escalations (still outstanding):**
1. ✗ **Slack token issue** — Persists. Still no token for channel delivery. Blocking Sentinel reporting.
2. ✗ **Tool error baseline** — Was 30 errors Feb 16, now 75 errors Feb 17. Trend is **worsening**.
3. ✗ **Main cost concentration** — Was 76% Feb 16, now 84% Feb 17. Trend is **worsening**.

**Action:** Previous escalations were not resolved. Tool errors doubled and cost concentration increased.

---

## SUMMARY

| Check | Status | Details |
|-------|--------|---------|
| 1. Session Errors | ❌ FAIL | 75 tool errors (forge: 26, main: 49) |
| 2. Workspace Files | ✅ PASS | All 18 agents complete |
| 3. Gateway | ✅ PASS | Port 18789 operational |
| 4. Telegram Bots | ✅ PASS | All 18 bots verified |
| 5. Session Sizes | ✅ PASS | No stale/oversized files |
| 6. Runtime Dirs | ✅ PASS | All agents configured |
| 7. Cron Jobs | ⚠️ WARN | Slack token missing (blocking delivery) |
| 8. Archer State | ✅ PASS | No phantom tasks detected |
| 9. Cost Anomaly | ❌ FAIL | Main at 84% of fleet cost |

**Agents checked:** 18  
**Checks run:** 9  
**Next run:** Wednesday, February 18, 2026 at 2:00 AM CST

---

## ESCALATION ROUTING

**Auto-escalation message sent to #archer** with:
- Failed check summaries
- Recommended remediation agents (Wrench for tool errors, Ledger for cost audit)
- Note about persisting Slack token issue blocking report delivery
