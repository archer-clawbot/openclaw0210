# Night Forge — Institutional Memory

<!--
This file is Forge's memory of past problems, fixes, and outcomes.
Forge reads this at the start of each nightly cycle to:
1. Detect repeat issues (escalate priority if seen 3+ nights)
2. Avoid re-applying failed fixes
3. Track improvement trends
-->

<!-- Entries will be appended below by Forge during nightly cycles -->

## 2026-02-15

### Problems Found
- [P-COST] Severity: 4×3=12 | Main agent spent $22.27 (70% of $31.75 daily total) — disproportionate resource consumption
- [P-TOOL] Severity: 4×2=8 | Mozi received 401 API auth error during task dispatch — invalid x-api-key
- [P-TOOL] Severity: 2×3=6 | 13 tool execution errors across 4 agents (down 95% from 254 on Feb 12) — transient

### Root Cause Analysis
**P-COST:** Main generated a 6,557-token implementation spec document at operator's request. This is legitimate usage, not waste. However, no cost alerting exists — Sentinel doesn't flag disproportionate spend.

**P-TOOL (Mozi 401):** Session `a1bbe165-4ed9-46d5-903a-5a5251bcf2a4` shows Anthropic rejected API key. Likely cause: key rotation, expiry, or misconfiguration. Requires operator verification of API credentials.

**P-TOOL (13 errors):** Down from 254 on Feb 12. Transient tool execution issues, no pattern indicating systemic failure. Monitoring only.

**P-INFRA (Convex):** ✅ **RESOLVED** — Dispatcher successfully polling and dispatching tasks (Feb 14 22:47 UTC shows 11+ tasks dispatched, 6+ completed for localcatalyst). Operator deployed the fix.

### Changes Applied
- [AUTO] Created backup directory: `~/.openclaw/forge/backups/2026-02-15/`
- [AUTO] mozi/AGENTS.md — PATCHED — added API Error Handling section (lines 92-112)
  Rollback: `cp ~/.openclaw/forge/backups/2026-02-15/mozi__AGENTS.md ~/.openclaw/mozi/AGENTS.md`
- [AUTO] sentinel/AGENTS.md — PATCHED — added Check 9: Cost Anomaly Detection (new check for daily fleet cost monitoring)
  Rollback: `cp ~/.openclaw/forge/backups/2026-02-15/sentinel__AGENTS.md ~/.openclaw/sentinel/AGENTS.md`

### Pending Operator Action
⚠️ **Mozi API Key Investigation Required**
- Error: 401 invalid x-api-key from Anthropic
- Action: Verify Mozi's API credentials in openclaw.json or .env
- If expired: Regenerate key at console.anthropic.com and update config

### Tracked (No Action)
- Session errors: 13 (down from 254 — 95% improvement) ✅
- Dispatcher: HEALTHY — polling 2 clients, dispatching tasks ✅
- Circuit breaker: CLOSED (healthy) ✅
- Gateway: Healthy on port 18789 ✅
- Workspace integrity: PASS (all 18 agents have required files) ✅
- Telegram bots: All 18 responding ✅
- Cron jobs: 5/7 enabled, healthy ✅

### Metrics
- Fleet 24h cost: $31.75 (main: $22.27, silas: $2.78, specs: $1.96, forge: $1.73, wrench: $1.50)
- Session errors: 13 (95% reduction from Feb 12)
- Tasks dispatched (Feb 14): 11+ for localcatalyst
- Streak: Night 1 with improvements (Convex resolved, errors down, auto-patches applied)

---

## 2026-02-12

### Problems Found
- [P-INFRA] Severity: 5×5=25 **REPEAT NIGHT 2** | Dispatcher poll error STILL ACTIVE: `Cannot read properties of undefined (reading 'IN_PROGRESS')` — 38+ hours of downtime, operator has NOT run `npx convex deploy`
- [P-TOOL] Severity: 4×3=12 | Session errors: 254+ across 13 agents (specs: 84, main: 47, sentinel: 31, silas: 28, forge: 15, builder: 13, scout: 11, mozi: 8, others: <10)
- [P-COST] Severity: 2×1=2 | Fleet 24h cost: $11.21 (main: $5.81, forge: $2.15, builder: $1.84, scribe: $1.27, sentinel: $0.15)

### Root Cause Analysis
**P-INFRA (Critical):** SAME AS LAST NIGHT. Convex backend references `STATUS.IN_PROGRESS` enum from undefined object. Local code uses lowercase `'in_progress'` strings. Issue is in DEPLOYED Convex backend, not local code. Requires `npx convex deploy` from `~/.openclaw/mission-control` to sync schema.

**P-TOOL:** Error distribution suggests API credential issues (specs 84 errors) and rate limiting (sentinel 31, main 47). Auth errors, timeouts, and capacity issues across fleet. Recommend token rotation for specs.

### Changes Applied
- [AUTO] Created backup directory: `~/.openclaw/forge/backups/2026-02-12/`
- [NONE] No agent patches possible — critical blocker is Convex backend deployment (operator action required)

### Pending Operator Action (CRITICAL - ESCALATED)
🔴 **THIS IS NIGHT 2 OF THE SAME CRITICAL ISSUE**

1. **Convex redeploy REQUIRED** — From `~/.openclaw/mission-control`, run:
   ```
   npx convex deploy
   ```
   This is blocking ALL automated task dispatch. 38+ hours of dispatcher downtime.

2. **Token rotation needed** — specs has 84 auth errors (up from 64 yesterday). Hand to Wrench.

### Tracked (No Action)
- Sentinel health check: FAIL (254+ session errors, threshold: 6)
- Circuit breaker: CLOSED (healthy) ✅
- Gateway: Healthy on port 18789 ✅
- Workspace integrity: PASS ✅
- Cron jobs: Active ✅

### Metrics
- Fleet-wide polling: ❌ FAILED (38+ hours and counting)
- Deliverables produced: Limited (manual triggers only)
- Session errors: 254+ (threshold exceeded)
- Daily cost: $11.21

---

## 2026-02-11

### Problems Found
- [P-INFRA] Severity: 5×5=25 | Dispatcher poll error: `Cannot read properties of undefined (reading 'IN_PROGRESS')` — Convex backend returning error, all client polling failing since Feb 10 11:54 AM (14+ hours)
- [P-TOOL] Severity: 4×3=12 | Auth errors: specs (64), main (19), sentinel (16), builder (10) — expired/invalid API tokens
- [P-TIMEOUT] Severity: 3×3=9 | Timeout errors: main (59), mozi (5), builder (3) — network instability
- [P-MODEL] Severity: 3×2=6 | Model/rate errors: sentinel (12), mozi (8) — API capacity

### Root Cause Analysis
The IN_PROGRESS error indicates **stale Convex deployment**. Schema uses lowercase `in_progress` but deployed backend code references uppercase `STATUS.IN_PROGRESS` enum. Local mission-control code looks correct — needs `npx convex deploy` to sync.

### Changes Applied
- [AUTO] cron/lib/convex.js — PATCHED — added defensive error handling for Convex error responses
  Rollback: `copy $env:USERPROFILE\.openclaw\forge\backups\2026-02-11\cron__lib__convex.js $env:USERPROFILE\.openclaw\cron\lib\convex.js`

### Pending Operator Action (CRITICAL)
1. **Convex redeploy required** — Run from `~/.openclaw/mission-control`:
   ```
   npx convex deploy
   ```
   This will sync the correct schema and fix the IN_PROGRESS error.

2. **Token rotation needed** — specs has 64 auth errors. Hand to Wrench for token refresh.

### Tracked (No Action)
- Sentinel health check: 6/7 passed, only session errors failed (caused by above issues)
- Scribe content quality: excellent (50KB service page deliverable, proper structure)
- All 18 Telegram bots: responding ✅
- Circuit breaker: CLOSED (healthy) ✅

### Metrics
- Fleet-wide polling: FAILED (14+ hours)
- Deliverables produced yesterday: 38 files across localcatalyst client
- Cost tonight: ~$0.XX (Forge cycle only — no dispatched work due to polling failure)
