# OPENCLAW NIGHTLY HEALTH CHECK
**February 11th, 2026 | 2:00 AM CST**

---

## SYSTEM STATUS: 🛑 CRITICAL

**Summary:** One FAIL detected (Session Error Scan). Escalated to Archer for auth token and API capacity review.

---

## CHECK 1: Session Log Error Scan — **FAIL** 🛑

**Threshold:** 0 errors = PASS | 1-5 = WARN | 6+ = FAIL

**Agents with 6+ errors in last 24 hours (7 total):**

| Agent | Total | Auth | Tool | Model | Timeout |
|-------|-------|------|------|-------|---------|
| sentinel | 96 | 16 | 9 | 12 | 9 |
| specs | 73 | 64 | 0 | 0 | 0 |
| main | 26 | 19 | 0 | 2 | 59 |
| builder | 13 | 10 | 0 | 0 | 3 |
| mozi | 11 | 3 | 0 | 8 | 5 |
| scout | 7 | — | — | — | — |
| silas | 6 | — | — | — | — |

**Root Cause Analysis:**
- **Auth errors** (107 total across specs, main, sentinel, builder): Likely expired/invalid tokens in agent auth-profiles.json
- **Model errors** (20 total in mozi, sentinel): Rate limit or API capacity exhaustion
- **Timeout errors** (59+ in main, mozi, builder): Network instability or slow API responses

**Impact:** Agents unable to authenticate to external APIs, impacting bot connectivity and external tool execution.

**Action:** Escalated to #archer with token rotation recommendation to Wrench.

---

## CHECK 2: Workspace Integrity — **PASS** ✅

**Requirement:** All 17 agents must have all 6 required files (non-zero-byte except HEARTBEAT.md)

**Agents checked:** main, silas, scribe, herald, wrench, citadel, mozi, ghost, ledger, canvas, scout, lookout, specs, razor, blitz, builder, sentinel

**Result:** All files present and valid. No zero-byte files (excluding HEARTBEAT.md).

---

## CHECK 3: Gateway Health — **PASS** ✅

**Requirement:** Port 18789 must respond to connection test

**Result:** Port 18789 responding normally. Gateway is operational.

**Note:** OpenClaw Gateway daemon is running and accepting connections.

---

## CHECK 4: Telegram Bot Connectivity — **PASS** ✅

**Requirement:** All 18 bot `getMe` endpoints must return `"ok": true`

**Bots checked (all responding):**
- default, silas, scribe, herald, wrench, citadel, mozi, ghost, ledger, canvas, scout, lookout, specs, razor, blitz, builder, sentinel, forge

**Result:** 18/18 bots alive. All Telegram connectivity operational.

---

## CHECK 5: Stale Session Detection — **PASS** ✅

**Thresholds:** 5 MB size OR 30+ days old

**Sessions over 5 MB:** 0 detected
**Sessions over 30 days old:** 0 detected

**Result:** No oversized or stale session files. Storage health is good.

**Total session files in system:** 50 files across all agents, all active/recent.

---

## CHECK 6: Runtime Directory Audit — **PASS** ✅

**Requirement:** Each agent must have:
- `C:\Users\spart\.openclaw\agents\{id}\agent\auth-profiles.json`
- `C:\Users\spart\.openclaw\agents\{id}\agent\models.json`
- `C:\Users\spart\.openclaw\agents\{id}\sessions\` directory

**Agents audited:** main, silas, scribe, herald, wrench, citadel, mozi, ghost, ledger, canvas, scout, lookout, specs, razor, blitz, builder, sentinel

**Result:** All 17 agents have valid runtime configuration. No missing files or directories.

---

## CHECK 7: Cron Job Status — **PASS** ✅

**Jobs configured (4 total):**

| Job Name | Agent | Schedule | Enabled | Next Run |
|----------|-------|----------|---------|----------|
| Sentinel Nightly Health Check | sentinel | 0 2 * * * (2 AM CST daily) | ✅ Yes | Feb 12, 2:00 AM CST |
| Forge Night Cycle | forge | 0 5 2 * * * (2:05 AM CST daily) | ✅ Yes | Feb 12, 2:05 AM CST |
| AI Automation Daily Brief | main | 0 8 * * * (8 AM CST daily) | ❌ No | Disabled |
| Archer Weekly Rollup | main | 0 9 * * 0 (9 AM Sunday CST) | ❌ No | Disabled |

**Windows Scheduled Tasks:**
- "OpenClaw Gateway Ready" — Present, normal state

**Result:** All required cron jobs configured correctly. No corruption or missing dependencies.

---

## ESCALATION SUMMARY

**FAILED check:** Session Log Error Scan (Check 1)

**Auto-escalation sent to #archer:**
- Auth token rotation needed (primary: specs with 64 errors)
- API key/capacity check needed (sentinel, mozi hitting model errors)
- Network stability review recommended (main experiencing 59 timeout errors)

**Recommended handoff:**
- **Wrench:** Token/auth-profiles.json update (specs, main, builder)
- **Archer (Cody):** API billing/capacity check + potential token refresh

---

## METRICS

- **Agents checked:** 17 (config lists 18 including Forge)
- **Checks executed:** 7 of 7
- **Checks PASS:** 6 of 7 (86%)
- **Checks FAIL:** 1 of 7 (14%)
- **Checks WARN:** 0
- **Overall status:** CRITICAL (1 FAIL = escalation required)

---

## NEXT RUN

**Scheduled:** Thursday, February 12th, 2026 at 2:00 AM CST

**Will check for:** Continued auth errors (if not fixed), any new session issues, stale files accumulation.
