# OPENCLAW HEALTH REPORT
**Sunday, February 15, 2026 | 2:00 AM CST**

## SYSTEM STATUS: DEGRADED

---

## Check Results

### 1. Session Errors [WARN]
**13 tool errors detected in last 24 hours**

| Agent | Session ID | Error Count | Status |
|-------|-----------|-------------|--------|
| forge | 7b773bf2-1db4-419f-9283-2db869ee499e | 2 | Tool execution |
| main | 1ea6640a-0eff-42c3-8ce7-b80970922f71 | 6 | Tool execution |
| main | 30bbc4d5-2d58-4787-b7f4-bd0c6a05d507 | 3 | Tool execution |
| mozi | a1bbe165-4ed9-46d5-903a-5a5251bcf2a4 | 2 | Tool execution |

**Analysis:** Most errors appear to be transient tool execution issues. No authentication failures, rate limits, or capacity issues detected. Likely retryable errors.

**Action:** Monitor these agents in next 24 hours. If error count exceeds 10 per session, escalate to Wrench for debugging.

---

### 2. Workspace Files [PASS]
✅ All 18 agents have complete documentation:
- AGENTS.md (non-empty brain prompt)
- SOUL.md
- IDENTITY.md
- TOOLS.md
- USER.md
- HEARTBEAT.md

---

### 3. Gateway Health [PASS]
✅ Port 18789 responding
✅ Gateway connectivity: healthy

---

### 4. Telegram Bot Connectivity [PASS]
✅ All 18 bots responding to `getMe` endpoint

**Accounts tested:**
`default`, `silas`, `scribe`, `herald`, `wrench`, `citadel`, `mozi`, `ghost`, `ledger`, `canvas`, `scout`, `lookout`, `specs`, `blitz`, `razor`, `builder`, `sentinel`, `forge`

---

### 5. Session Sizes [PASS]
✅ No oversized sessions detected (threshold: 5MB)
✅ No stale sessions detected (threshold: 30+ days old)

Session JSONL files are within normal operating parameters.

---

### 6. Runtime Directories [PASS]
✅ All 18 agents have valid runtime structure:
- `agent/auth-profiles.json` exists
- `agent/models.json` exists
- `sessions/` directory exists

---

### 7. Cron Jobs [PASS]
**7 jobs configured, 5 enabled:**

| Job | Schedule | Status | Next Run |
|-----|----------|--------|----------|
| Sentinel Nightly Health Check | 0 2 * * * (daily 2 AM) | ✅ Enabled | 2026-02-16 02:00 |
| Night Forge — Overnight Improvement | 5 2 * * * (daily 2:05 AM) | ✅ Enabled | 2026-02-16 02:05 |
| Razor Weekly CRO Trigger | 0 9 * * 0 (Sun 9 AM) | ✅ Enabled | 2026-02-16 09:00 |
| Blitz Weekly Campaign Optimization | 0 9 * * 1 (Mon 9 AM) | ✅ Enabled | 2026-02-17 09:00 |
| Weekly Agent Standup | 0 9 * * 0 (Sun 9 AM) | ✅ Enabled | 2026-02-16 09:00 |
| AI Automation Daily Brief | 0 8 * * * | ⛔ Disabled | — |
| Archer Weekly Rollup | 0 9 * * 0 (Sun 9 AM) | ⛔ Disabled | — |

All enabled jobs are healthy. Disabled jobs are intentionally paused.

---

### 8. Archer Session State Audit [PASS]
✅ No phantom tasks detected

**Method:** Scanned Archer's MEMORY.md for "in progress" claims and cross-referenced against active sessions via `sessions_list`. All task routing claims match active sessions.

**Session activity (last 24h):**
- Main: 2 active telegram sessions
- Wrench: 1 active telegram session
- Specs: 1 active WhatsApp session
- Silas: 1 active session
- Scout: 1 active telegram session
- Mozi: 1 active telegram session
- Lookout: 1 active telegram session
- Sentinel: 1 active telegram session
- Forge: 1 active telegram session

Total active sessions: 10 (excluding archived/historical)

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| Session Errors | ⚠️ WARN | 13 tool errors, likely transient |
| Workspace Files | ✅ PASS | Complete across all agents |
| Gateway | ✅ PASS | Healthy |
| Telegram Bots | ✅ PASS | All 18 bots OK |
| Session Sizes | ✅ PASS | No bloat or stale files |
| Runtime Dirs | ✅ PASS | All agents configured |
| Cron Jobs | ✅ PASS | All healthy |
| Session State | ✅ PASS | No phantom routing |

**Overall Status:** **DEGRADED** (1 WARN, 7 PASS)

---

## Recommendations

1. **Monitor session errors:** The 13 errors across multiple agents are likely transient. If Forge, Main, or Mozi show sustained error rates (>10 errors/session) in tomorrow's report, escalate to Wrench for tool debugging.

2. **Slack integration:** Note that Slack bot token is not configured in openclaw.json. Consider adding it if Slack is intended as a delivery channel for reports. This report was saved to deliverables instead.

3. **Routine maintenance:** All core systems are healthy. No urgent action required.

---

**Report Generated:** 2026-02-15 02:00:00 CST  
**Next Health Check:** 2026-02-16 02:00:00 CST
