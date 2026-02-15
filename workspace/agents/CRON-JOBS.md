# AGENT CRON JOBS & AUTOMATION

This document defines scheduled tasks for agents (weekly reports, monitoring, proactive alerts).

---

## ACTIVE CRON JOBS

### 1. Weekly Agent Standup

**Schedule:** Every Sunday at 9:00 AM CST  
**Trigger:** Cron job (already configured)  
**Agent:** Archer  
**Task:** Orchestrate weekly standup with Silas, Lookout, Ledger

**Workflow:**
```
1. Archer spawns:
   - Silas (SEO patterns/insights)
   - Lookout (ranking trends/anomalies)
   - Ledger (cost trends/profitability)

2. Each agent reviews their MEMORY.md + recent deliverables

3. Agents report:
   - Silas: SEO patterns across clients, recurring issues, strategy insights
   - Lookout: Ranking trends, anomalies detected, traffic patterns
   - Ledger: Cost trends, budget alerts, profitability concerns

4. Quality Metrics (NEW — each agent includes):
   - Tasks completed this week (count)
   - Tasks requiring rework (count + reasons)
   - Self-improvement proposals identified (from SELF-IMPROVEMENT-PROTOCOL.md)
   - Blocker resolution time (avg hours from escalation to resolution)
   - Client satisfaction signals (approval rate, revision requests)

5. Archer synthesizes into unified rollup with quality dashboard:
   - System Health Score (% of heartbeats returning OK)
   - Task Completion Rate (completed / assigned)
   - Rework Rate (reworks / completions — target < 10%)
   - Cost Efficiency (actual spend vs budget)
   - Improvement Velocity (proposals deployed this week)

6. Archer delivers to Cody (Telegram):
   "Weekly rollup ready. Health: {score}%. Completion: {rate}%. Key insights: {summary}. Full report: {link}"
```

**Deliverable:** `deliverables/_system/archer/{YYYY-MM-DD}-weekly-rollup.md`

**Cron Expression:** `0 9 * * 0` (9:00 AM every Sunday)

**Status:** ✅ Active (created Feb 14, 2026)

---

## HEARTBEAT CRON JOBS

### 7. Lookout: Daily Rank Anomaly Detection

**Schedule:** Every day at 8:00 AM CST
**Trigger:** Cron job (to be created)
**Agent:** Lookout
**Task:** Pull GSC data, compare to previous period, alert on ranking/traffic anomalies

**Cron Expression:** `0 8 * * *` (8:00 AM every day)

**Implementation:**
```json
{
  "name": "Lookout Daily Rank Anomaly Detection",
  "schedule": {
    "kind": "cron",
    "expr": "0 8 * * *",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "HEARTBEAT: Daily rank anomaly detection. Pull GSC data for all active clients (last 7 days vs previous 7 days). Identify anomalies: ranking drops > 5 positions, traffic drops > 20%, traffic spikes > 50%. If anomalies found, generate alert and escalate to Archer. If no anomalies, reply HEARTBEAT_OK."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (enable when Lookout has GSC API access for all clients)

---

### 8. Sentinel: Nightly System Health Check

**Schedule:** Every night at 11:00 PM CST
**Trigger:** Cron job (to be created)
**Agent:** Sentinel
**Task:** Check gateway status, agent health, API quotas, recent errors, cron job status

**Cron Expression:** `0 23 * * *` (11:00 PM every night)

**Implementation:**
```json
{
  "name": "Sentinel Nightly Health Check",
  "schedule": {
    "kind": "cron",
    "expr": "0 23 * * *",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "HEARTBEAT: Nightly system health check. Check OpenClaw gateway status, agent session health (sessions_list), API quota usage, recent error logs, deliverables folder accessibility, cron job run history. Generate health report: ✅ healthy / ⚠️ warnings / 🔴 critical. If critical, escalate to Archer immediately. If healthy, reply HEARTBEAT_OK."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (Sentinel agent needs full workspace buildout)

---

### 9. Citadel: Bi-Weekly NAP Monitoring

**Schedule:** Every other Sunday at 10:00 AM CST (1st and 3rd Sundays)
**Trigger:** Cron job (to be created)
**Agent:** Citadel
**Task:** Spot-check NAP consistency on top 5 directories for all active clients

**Cron Expression:** `0 10 1-7,15-21 * 0` (10:00 AM on Sundays in 1st and 3rd weeks)

**Implementation:**
```json
{
  "name": "Citadel Bi-Weekly NAP Monitor",
  "schedule": {
    "kind": "cron",
    "expr": "0 10 1-7,15-21 * 0",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "HEARTBEAT: Bi-weekly NAP monitoring. For all active clients with citation profiles, spot-check NAP consistency on top 5 directories (GBP, Yelp, Facebook, YellowPages, Bing Places). Compare against source of truth in MEMORY.md. If inconsistencies found, generate alert with severity (High: phone wrong, Medium: address, Low: name variation). If all consistent, reply HEARTBEAT_OK."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (enable when Citadel has directory API access)

---

### 10. Herald: Weekly GBP Activity Check

**Schedule:** Every Monday at 9:00 AM CST
**Trigger:** Cron job (to be created)
**Agent:** Herald
**Task:** Check GBP listing status, unresponded reviews, post freshness, Q&A activity

**Cron Expression:** `0 9 * * 1` (9:00 AM every Monday)

**Implementation:**
```json
{
  "name": "Herald Weekly GBP Activity Check",
  "schedule": {
    "kind": "cron",
    "expr": "0 9 * * 1",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "HEARTBEAT: Weekly GBP activity check. For all active clients, check: listing status (active/suspended), new unresponded reviews (last 7 days), post freshness (flag if > 14 days since last post), unanswered Q&A, Google-suggested edits. If critical issues (suspension, negative review > 48hrs), escalate to Archer immediately. If all healthy, reply HEARTBEAT_OK."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (enable when Herald has GBP API access for all clients)

---

## PLANNED CRON JOBS

### 2. Lookout: Weekly Rank Check (All Clients)

**Schedule:** Every Monday at 8:00 AM CST  
**Trigger:** Cron job (to be created)  
**Agent:** Lookout  
**Task:** Pull GSC data for all clients, generate rank reports, alert on anomalies

**Workflow:**
```
1. Lookout pulls GSC data (last 7 days) for all clients
2. Compares to previous week
3. Identifies anomalies (drops > 5 positions, spikes > 5 positions)
4. Generates rank report per client
5. If anomalies found:
   - Escalates to Archer with alert
   - Archer routes investigation to Silas
6. Delivers weekly summary to Archer:
   "{X} clients stable, {Y} clients with anomalies"
```

**Deliverable:**
- Per-client: `deliverables/{client}/lookout/{YYYY-MM-DD}-weekly-rank-report.md`
- Summary: `deliverables/_system/lookout/{YYYY-MM-DD}-weekly-summary.md`

**Cron Expression:** `0 8 * * 1` (8:00 AM every Monday)

**Implementation:**
```json
{
  "name": "Lookout Weekly Rank Check",
  "schedule": {
    "kind": "cron",
    "expr": "0 8 * * 1",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "WEEKLY RANK CHECK: Pull GSC data for all active clients (last 7 days). Generate rank reports. Identify anomalies (drops/spikes > 5 positions). Escalate anomalies to Archer. Deliver weekly summary."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (create when Lookout is fully operational with GSC API access)

---

### 3. Ledger: Monthly Profitability Report

**Schedule:** First of every month at 9:00 AM CST  
**Trigger:** Cron job (to be created)  
**Agent:** Ledger  
**Task:** Generate monthly burn rate report, per-client profitability, budget alerts

**Workflow:**
```
1. Ledger pulls session data (all clients, all agents, previous month)
2. Calculates total API spend
3. Breaks down by client, by agent
4. Compares to client retainers
5. Calculates profit margins
6. Identifies:
   - Top spenders (clients)
   - Unprofitable clients
   - Budget overruns
7. Generates monthly burn rate report
8. Delivers to Archer → Cody
```

**Deliverable:** `deliverables/_system/ledger/{YYYY-MM}-monthly-burn-rate.md`

**Cron Expression:** `0 9 1 * *` (9:00 AM on the 1st of every month)

**Implementation:**
```json
{
  "name": "Ledger Monthly Profitability Report",
  "schedule": {
    "kind": "cron",
    "expr": "0 9 1 * *",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "MONTHLY BURN RATE REPORT: Pull session data for all clients and agents (last month). Calculate total API spend, break down by client and agent. Compare to client retainers. Generate profitability report. Identify unprofitable clients and budget overruns. Deliver to Archer for review with Cody."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (create when Ledger is fully operational with cost tracking)

---

### 4. Lookout: Daily Anomaly Check (High-Priority Clients)

**Schedule:** Every day at 7:00 AM CST  
**Trigger:** Cron job (to be created)  
**Agent:** Lookout  
**Task:** Check for ranking/traffic anomalies on high-priority clients

**Workflow:**
```
1. Lookout checks GSC + GA4 for high-priority clients
2. Compares to previous day
3. If anomaly detected (drop > 20%, spike > 50%):
   - Generate anomaly alert
   - Escalate to Archer immediately
   - Archer routes investigation to Silas
4. If no anomalies:
   - No alert (silent success)
```

**Deliverable:** Only created if anomaly detected:
- `deliverables/{client}/lookout/{YYYY-MM-DD}-anomaly-alert.md`

**Cron Expression:** `0 7 * * *` (7:00 AM every day)

**Implementation:**
```json
{
  "name": "Lookout Daily Anomaly Check",
  "schedule": {
    "kind": "cron",
    "expr": "0 7 * * *",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "DAILY ANOMALY CHECK: Check GSC + GA4 for high-priority clients (last 24 hours vs previous 24 hours). Identify anomalies (ranking drops > 20%, traffic drops > 20%, traffic spikes > 50%). If anomalies found, create alert and escalate to Archer. If no anomalies, reply HEARTBEAT_OK."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (create when high-priority clients are defined)

---

### 5. Sentinel: Nightly System Health Check

**Schedule:** Every night at 11:00 PM CST  
**Trigger:** Cron job (to be created)  
**Agent:** Sentinel  
**Task:** Check system health (agent uptime, OpenClaw gateway, API quotas, errors)

**Workflow:**
```
1. Sentinel checks:
   - OpenClaw gateway status
   - Agent session health (any agents stuck/errored?)
   - API quota usage (approaching limits?)
   - Recent error logs (from sessions_list)
   - Deliverables folder health (disk space, accessibility)

2. Generates health report:
   - ✅ All systems healthy
   - ⚠️ Warnings (quota at 80%, etc.)
   - 🔴 Critical issues (gateway down, agent crashed)

3. If critical issues:
   - Escalate to Archer → Cody immediately (even at night)

4. If warnings:
   - Post to #sentinel channel (Slack) or deliver report to Archer for morning review

5. If healthy:
   - Silent (or post brief "✅ All systems healthy" to Slack)
```

**Deliverable:** `deliverables/_system/sentinel/{YYYY-MM-DD}-health-report.md`

**Cron Expression:** `0 23 * * *` (11:00 PM every night)

**Implementation:**
```json
{
  "name": "Sentinel Nightly Health Check",
  "schedule": {
    "kind": "cron",
    "expr": "0 23 * * *",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "NIGHTLY HEALTH CHECK: Check OpenClaw gateway status, agent session health, API quota usage, recent error logs, deliverables folder accessibility. Generate health report. If critical issues, escalate to Archer immediately. If warnings, post to #sentinel. If healthy, reply HEARTBEAT_OK."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (Sentinel agent needs to be built first)

---

### 6. Forge: Overnight Improvement Review

**Schedule:** Every night at 2:00 AM CST  
**Trigger:** Cron job (to be created)  
**Agent:** Forge  
**Task:** Analyze agent performance, propose prompt improvements, submit for approval

**Workflow:**
```
1. Forge reviews:
   - Recent agent sessions (deliverables, logs)
   - Token usage efficiency (cost per task)
   - Task success rate (were deliverables accepted or rejected?)
   - Common errors or escalations

2. Identifies improvement opportunities:
   - Prompt optimizations (reduce token usage, improve clarity)
   - Workflow optimizations (batch tasks, reduce handoffs)
   - Model selection (can tasks use cheaper models without quality loss?)

3. Generates improvement proposals:
   - Forge 1: "Switch Scribe GBP posts from Opus to Sonnet (80% cost savings, quality test needed)"
   - Forge 2: "Add schema validation step to Specs SKILL.md (reduce Wrench rework)"

4. Submits proposals to Archer for morning review with Cody

5. Cody approves/rejects each proposal

6. Approved proposals deployed by Forge (update SKILL.md, adjust model assignments)
```

**Deliverable:**
- Proposals: `deliverables/_system/forge/{YYYY-MM-DD}-improvement-proposals.md`
- Deployed changes: `deliverables/_system/forge/{YYYY-MM-DD}-deployed-changes.md`

**Cron Expression:** `0 2 * * *` (2:00 AM every night)

**Implementation:**
```json
{
  "name": "Forge Overnight Improvement",
  "schedule": {
    "kind": "cron",
    "expr": "0 2 * * *",
    "tz": "America/Chicago"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "OVERNIGHT IMPROVEMENT: Analyze recent agent performance (sessions, token usage, success rate, errors). Identify optimization opportunities (prompt tuning, model selection, workflow improvements). Generate improvement proposals. Submit to Archer for morning review with Cody. Do NOT deploy without approval."
  },
  "sessionTarget": "isolated",
  "enabled": false
}
```

**Status:** 🔄 Pending (Forge agent needs to be built first)

---

## CREATING CRON JOBS

### Add Job via `cron` Tool

**Example: Weekly Lookout Rank Check**

```javascript
cron({
  action: "add",
  job: {
    name: "Lookout Weekly Rank Check",
    schedule: {
      kind: "cron",
      expr: "0 8 * * 1",  // 8:00 AM every Monday
      tz: "America/Chicago"
    },
    payload: {
      kind: "agentTurn",
      message: "WEEKLY RANK CHECK: Pull GSC data for all active clients (last 7 days). Generate rank reports. Identify anomalies (drops/spikes > 5 positions). Escalate anomalies to Archer. Deliver weekly summary."
    },
    sessionTarget: "isolated",
    enabled: true
  }
})
```

**Returns:**
```json
{
  "id": "abc-123-def-456",
  "name": "Lookout Weekly Rank Check",
  "nextRunAtMs": 1771426800000
}
```

---

### List All Cron Jobs

```javascript
cron({ action: "list" })
```

**Returns:**
```json
[
  {
    "id": "b088fc20-...",
    "name": "Weekly Agent Standup",
    "enabled": true,
    "nextRunAtMs": 1771167600000
  },
  {
    "id": "abc-123-...",
    "name": "Lookout Weekly Rank Check",
    "enabled": true,
    "nextRunAtMs": 1771426800000
  }
]
```

---

### Disable/Enable Job

```javascript
// Disable
cron({
  action: "update",
  jobId: "abc-123-def-456",
  patch: { enabled: false }
})

// Enable
cron({
  action: "update",
  jobId: "abc-123-def-456",
  patch: { enabled: true }
})
```

---

### Manually Trigger Job (Test)

```javascript
cron({
  action: "run",
  jobId: "abc-123-def-456"
})
```

**Use for:** Testing job before enabling on schedule.

---

## CRON JOB BEST PRACTICES

### 1. Use `agentTurn` Payload for Isolated Sessions

**Correct:**
```json
"payload": {
  "kind": "agentTurn",
  "message": "WEEKLY RANK CHECK: {task description}"
}
```

**Why:** Agent runs in isolated session (doesn't pollute main session history).

---

### 2. Include Clear Task Instructions

**Good:**
```
"WEEKLY RANK CHECK: Pull GSC data for all active clients (last 7 days). Generate rank reports. Identify anomalies (drops/spikes > 5 positions). Escalate anomalies to Archer. Deliver weekly summary."
```

**Bad:**
```
"Check rankings"
```

**Why:** Agent needs context to execute autonomously.

---

### 3. Use HEARTBEAT_OK for Silent Success

**In agent SKILL.md or task instructions:**
```
If no anomalies found, reply HEARTBEAT_OK.
```

**Why:** Prevents unnecessary notifications when everything is healthy.

---

### 4. Test Before Enabling

**Workflow:**
1. Create job with `enabled: false`
2. Manually trigger with `cron({ action: "run", jobId: "..." })`
3. Verify output
4. Enable job: `cron({ action: "update", jobId: "...", patch: { enabled: true } })`

---

### 5. Set Appropriate Timezones

**Always specify `tz`:**
```json
"schedule": {
  "kind": "cron",
  "expr": "0 9 * * 0",
  "tz": "America/Chicago"
}
```

**Why:** Avoids confusion (UTC vs local time).

---

## IMPLEMENTATION ROADMAP

### Phase 1: Core Automation (Current)
- [x] Weekly agent standup (Silas, Lookout, Ledger) — **Active** (enhanced with quality metrics)

### Phase 2: Heartbeat Monitoring (Configured — Pending Activation)
- [ ] Lookout: Daily rank anomaly detection (8am CST) — HEARTBEAT.md created
- [ ] Herald: Weekly GBP activity check (Mon 9am CST) — HEARTBEAT.md created
- [ ] Citadel: Bi-weekly NAP monitoring (1st/3rd Sun 10am CST) — HEARTBEAT.md created
- [ ] Sentinel: Nightly system health check (11pm CST) — HEARTBEAT.md created

### Phase 3: Monitoring Automation
- [ ] Lookout: Weekly rank check (all clients)
- [ ] Lookout: Daily anomaly check (high-priority clients)
- [ ] Ledger: Monthly profitability report

### Phase 4: System Health
- [ ] Sentinel: Nightly health check
- [ ] Sentinel: Alert on critical issues (immediate escalation)

### Phase 5: Continuous Improvement
- [ ] Forge: Overnight improvement proposals
- [ ] Forge: Autonomous deployment (with approval workflow)

---

## CRON EXPRESSION CHEAT SHEET

| Pattern | Description | Example |
|---------|-------------|---------|
| `* * * * *` | Every minute | `* * * * *` |
| `0 * * * *` | Every hour | `0 9 * * *` = 9:00 AM daily |
| `0 0 * * *` | Daily at midnight | `0 0 * * *` |
| `0 9 * * 1` | Every Monday at 9 AM | `0 9 * * 1` |
| `0 9 * * 0` | Every Sunday at 9 AM | `0 9 * * 0` |
| `0 9 1 * *` | First of month at 9 AM | `0 9 1 * *` |
| `0 9 1 1 *` | January 1st at 9 AM | `0 9 1 1 *` |

**Format:** `minute hour day month weekday`

**Weekdays:**
- 0 = Sunday
- 1 = Monday
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday

---

## MONITORING CRON JOBS

### Check Job Status

```javascript
cron({ action: "status" })
```

**Returns:**
```json
{
  "enabled": true,
  "jobCount": 5,
  "nextRunAtMs": 1771167600000,
  "nextRunJob": "Weekly Agent Standup"
}
```

---

### Check Job Run History

```javascript
cron({
  action: "runs",
  jobId: "b088fc20-..."
})
```

**Returns:**
```json
[
  {
    "runId": "run-123",
    "startedAtMs": 1771167600000,
    "completedAtMs": 1771167730000,
    "status": "success",
    "output": "{summary of what happened}"
  }
]
```

---

**Cron jobs turn reactive agents into proactive systems. Set them up, monitor them, trust them.**
