# Night Forge — Institutional Memory

<!--
This file is Forge's memory of past problems, fixes, and outcomes.
Forge reads this at the start of each nightly cycle to:
1. Detect repeat issues (escalate priority if seen 3+ nights)
2. Avoid re-applying failed fixes
3. Track improvement trends
-->

<!-- Entries will be appended below by Forge during nightly cycles -->

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
