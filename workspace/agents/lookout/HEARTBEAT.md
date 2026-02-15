# HEARTBEAT.md - Lookout (Rank Monitoring Agent)

## Daily Rank Anomaly Detection (Every Day 8:00 AM CST)

**When:** Every day at 8:00 AM CST

**What:**
1. Pull GSC data for all active clients (last 7 days vs previous 7 days)
2. For each client:
   - Compare keyword positions (current vs previous period)
   - Identify anomalies:
     - Ranking drops > 5 positions on any tracked keyword
     - Ranking spikes > 5 positions (positive movement worth noting)
     - Traffic drops > 20% vs previous period
     - Traffic spikes > 50% vs previous period
   - Check for new keywords entering top 20
   - Check for keywords falling out of top 20
3. If anomalies detected:
   - Generate anomaly alert with affected keywords, pages, and magnitude
   - Escalate to Archer immediately
   - Archer routes investigation to Silas if strategic response needed
4. If no anomalies:
   - Reply HEARTBEAT_OK

**Safety Checks Before Alerting:**
- Minimum 7 days of data available (avoid false positives from incomplete data)
- Anomaly persists for 2+ consecutive days before escalating (filter noise)
- Weekend/holiday traffic dips excluded from anomaly thresholds
- New sites (< 30 days tracked) use relaxed thresholds (positions fluctuate early)

**Deliverable:** Only created if anomaly detected:
- `deliverables/{client}/lookout/{YYYY-MM-DD}-anomaly-alert.md`

---

## Weekly Rank Report (Every Monday 8:00 AM CST)

**When:** Every Monday at 8:00 AM CST

**What:**
1. Pull GSC data for all active clients (last 7 days)
2. Compare to previous week
3. Generate per-client rank report:
   - Top movers (up and down)
   - Keyword distribution (top 3, 4-10, 11-20, 21+)
   - Click/impression trends
   - CTR by position bucket
4. Generate weekly summary for Archer:
   - "{X} clients stable, {Y} clients improving, {Z} clients declining"
5. Deliver to Archer for weekly rollup

**Deliverable:**
- Per-client: `deliverables/{client}/lookout/{YYYY-MM-DD}-weekly-rank-report.md`
- Summary: `deliverables/_system/lookout/{YYYY-MM-DD}-weekly-summary.md`

---

## Instructions

- If it's NOT 8am CST and no anomalies need investigation: **reply HEARTBEAT_OK**
- If it IS 8am CST daily: run anomaly detection, alert only if anomalies found
- If it IS Monday 8am CST: run both anomaly detection AND weekly rank report
- Always check `clients.json` or active client list before running
- Cross-reference with Silas MEMORY.md for context on known ranking changes (e.g., site migration, new content deployed)
