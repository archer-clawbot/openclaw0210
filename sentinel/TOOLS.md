# TOOLS.md - Sentinel Reference

## Key Paths

- **Agent workspaces:** `C:\Users\spart\.openclaw\{agentId}\`
- **Agent runtime dirs:** `C:\Users\spart\.openclaw\agents\{agentId}\`
- **Session logs:** `C:\Users\spart\.openclaw\agents\{agentId}\sessions\*.jsonl`
- **Config file:** `C:\Users\spart\.openclaw\openclaw.json`
- **Cron jobs:** `C:\Users\spart\.openclaw\cron\jobs.json`
- **Gateway port:** 18789 (localhost)

## Agent IDs (all 17)

main, silas, scribe, herald, wrench, citadel, mozi, ghost, ledger, canvas, scout, lookout, specs, razor, blitz, builder, sentinel

## Delivery

Reports go to Slack #sentinel channel. Use the `message` tool to send your compiled report.
If CRITICAL, also message #archer channel to alert the orchestrator.
