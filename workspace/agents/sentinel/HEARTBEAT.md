# HEARTBEAT.md - Sentinel (System Health Agent)

## Nightly System Health Check (Every Night 11:00 PM CST)

**When:** Every night at 11:00 PM CST

**What:**
1. Check system health across all components:
   - **OpenClaw Gateway:** Status, uptime, response time
   - **Agent Sessions:** Any agents stuck, errored, or unresponsive (via `sessions_list`)
   - **API Quotas:** Google (GSC, GA4, GBP), Anthropic, Gemini — approaching limits?
   - **Recent Errors:** Scan session logs for failures, timeouts, repeated errors
   - **Deliverables Folder:** Accessibility, disk space, recent write activity
   - **Cron Jobs:** All scheduled jobs ran successfully? Any missed runs?
2. Generate health report with status indicators:
   - ✅ All systems healthy
   - ⚠️ Warnings (quota at 80%, agent slow, cron missed)
   - 🔴 Critical issues (gateway down, agent crashed, API quota exceeded)
3. If critical issues detected:
   - Escalate to Archer immediately (even at night)
   - Archer alerts Cody via Telegram
4. If warnings detected:
   - Include in health report for Archer's morning review
5. If all healthy:
   - Reply HEARTBEAT_OK

**Health Check Thresholds:**
- API quota > 80% usage → ⚠️ Warning
- API quota > 95% usage → 🔴 Critical
- Agent session stuck > 30 minutes → ⚠️ Warning
- Agent session stuck > 2 hours → 🔴 Critical
- Gateway response time > 5s → ⚠️ Warning
- Gateway unreachable → 🔴 Critical
- Cron job missed scheduled run → ⚠️ Warning
- Cron job missed 2+ consecutive runs → 🔴 Critical

**Deliverable:** `deliverables/_system/sentinel/{YYYY-MM-DD}-health-report.md`

---

## Weekly System Summary (Every Sunday 10:00 PM CST)

**When:** Every Sunday at 10:00 PM CST

**What:**
1. Compile weekly system metrics:
   - Total agent sessions run (by agent)
   - Total API calls (by provider)
   - Uptime percentage
   - Error rate (errors / total sessions)
   - Average session duration (by agent)
2. Identify trends:
   - Agents with increasing error rates
   - API quotas trending toward limits
   - Performance degradation patterns
3. Generate weekly system summary for Archer's Monday review

**Deliverable:** `deliverables/_system/sentinel/{YYYY-MM-DD}-weekly-system-summary.md`

---

## Instructions

- If it's NOT 11pm CST and no active issues: **reply HEARTBEAT_OK**
- If it IS 11pm CST: execute nightly health check
- If it IS Sunday 10pm CST: execute both nightly check AND weekly summary
- Critical issues bypass normal reporting — escalate immediately regardless of time
- Maintain a running log of recurring issues in MEMORY.md for pattern detection
