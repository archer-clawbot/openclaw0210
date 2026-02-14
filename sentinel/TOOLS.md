# TOOLS.md - Sentinel Reference

## Key Paths

- **Agent workspaces:** `C:\Users\spart\.openclaw\{agentId}\`
- **Agent runtime dirs:** `C:\Users\spart\.openclaw\agents\{agentId}\`
- **Session logs:** `C:\Users\spart\.openclaw\agents\{agentId}\sessions\*.jsonl`
- **Config file:** `C:\Users\spart\.openclaw\openclaw.json`
- **Cron jobs:** `C:\Users\spart\.openclaw\cron\jobs.json`
- **Gateway port:** 18789 (localhost)

## Agent IDs (all 18)

main, silas, scribe, herald, wrench, citadel, mozi, ghost, ledger, canvas, scout, lookout, specs, razor, blitz, builder, sentinel, forge

## Shell Environment — CRITICAL

This system runs on **Windows 11 with PowerShell**. The `exec` tool executes commands in PowerShell, NOT bash.

**You MUST use PowerShell syntax for all shell commands. Never use bash/CMD syntax.**

| Bash/CMD (WRONG) | PowerShell (CORRECT) |
|---|---|
| `curl -s URL` | `Invoke-RestMethod URL` |
| `curl -X POST -H "..." -d "..."` | `Invoke-RestMethod -Method Post -Headers @{...} -Body "..." URL` |
| `cmd1 && cmd2` | `cmd1; cmd2` (or use `-and` for conditional) |
| `dir /b /s *.md` | `Get-ChildItem -Recurse -Filter *.md` |
| `cat file.txt` | `Get-Content file.txt` |
| `grep "pattern" file` | `Select-String -Pattern "pattern" file` |

## Delivery

Reports go to Slack #sentinel channel. Use the `message` tool to send your compiled report.
If CRITICAL, also message #archer channel to alert the orchestrator.
