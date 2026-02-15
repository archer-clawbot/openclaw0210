# Sentinel + Forge Cron Job Configuration

## Sentinel: Nightly Health Check
**Schedule:** Daily at 2:00 AM (local time)

```bash
# OpenClaw cron syntax
openclaw cron add \
  --name "Sentinel Nightly Health Check" \
  --schedule "0 2 * * *" \
  --agent sentinel \
  --task "Run nightly system health check. Execute all 8 checks, compile the health report, and save to deliverables/_system/sentinel/YYYY-MM-DD-nightly-health-report.md"
```

**Or via OpenClaw UI/config:**
```json
{
  "schedule": "0 2 * * *",
  "agentId": "sentinel",
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Run nightly system health check. Execute all 8 checks, compile the health report, and save to deliverables/_system/sentinel/YYYY-MM-DD-nightly-health-report.md"
  }
}
```

---

## Forge: Overnight Improvement
**Schedule:** Daily at 2:05 AM (local time, 5 minutes after Sentinel)

```bash
openclaw cron add \
  --name "Night Forge — Overnight Improvement" \
  --schedule "5 2 * * *" \
  --agent forge \
  --task "Run the 5-phase nightly protocol: HARVEST, DIAGNOSE, PRESCRIBE, APPLY, REPORT. Read all session logs, Sentinel's latest health report, and deliverables from the last 24h. Diagnose issues, apply approved fixes, and deliver morning brief."
```

**Or via OpenClaw UI/config:**
```json
{
  "schedule": "5 2 * * *",
  "agentId": "forge",
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Run the 5-phase nightly protocol: HARVEST, DIAGNOSE, PRESCRIBE, APPLY, REPORT. Read all session logs, Sentinel's latest health report, and deliverables from the last 24h. Diagnose issues, apply approved fixes, and deliver morning brief."
  }
}
```

---

## Notes
- **Sentinel runs first** (2:00 AM) to generate the health report
- **Forge runs second** (2:05 AM) and reads Sentinel's report as input
- Adjust times to your timezone
- Both agents save reports to `deliverables/_system/{agent}/`
