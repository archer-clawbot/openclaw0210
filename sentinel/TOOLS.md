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

This system runs on **Windows 11** but the `exec` tool executes commands in **bash (Git Bash)**, NOT PowerShell and NOT CMD.

**You MUST use bash/Unix syntax for all shell commands. Never use PowerShell cmdlets or CMD syntax.**

### Path format

Use Windows-native paths with forward slashes in bash. Both of these work:
- `"C:/Users/spart/.openclaw/agents"` (forward slashes)
- Quoting: always double-quote paths with spaces

**WRONG paths (do NOT use):**
- `/mnt/c/...` (WSL — this is NOT WSL)
- `C:\Users\...` with unescaped backslashes in bash (backslash is an escape character)

### Command equivalents

| PowerShell (WRONG) | Bash (CORRECT) |
|---|---|
| `Get-ChildItem -Recurse -Filter *.md` | `find "C:/Users/spart/.openclaw" -name "*.md"` |
| `Get-Content file.txt` | `cat file.txt` |
| `Select-String -Pattern "pat" file` | `grep "pat" file` |
| `Test-NetConnection localhost -Port 18789` | `curl -s -o /dev/null -w "%{http_code}" http://localhost:18789 2>/dev/null || echo "down"` or `timeout 3 bash -c 'echo > /dev/tcp/localhost/18789' 2>/dev/null && echo "up" || echo "down"` |
| `Get-ScheduledTask` | `schtasks /query /fo csv /nh` (this is a Windows CMD tool that works from bash) |
| `Invoke-RestMethod URL` | `curl -s URL` |
| `Invoke-RestMethod -Method Post ...` | `curl -s -X POST -H "header" -d "body" URL` |
| `cmd1; cmd2` | `cmd1 && cmd2` (sequential, stop on error) or `cmd1; cmd2` (always run both) |
| `Measure-Object` | `wc -l` (line count), `wc -c` (byte count) |
| `[math]::Round($x, 2)` | `awk "BEGIN {printf \"%.2f\", val}"` |

### Reading files

**Prefer the `read` tool over `exec` + `cat` for reading file contents.** The `read` tool is more reliable and avoids shell escaping issues. Use `exec` only when you need to:
- List directories or find files (`ls`, `find`)
- Check network connectivity (`curl`, `/dev/tcp`)
- Run system queries (`schtasks`)
- Process text with pipes (`grep`, `wc`, `awk`)

### JSONL processing

Session files are JSONL (one JSON object per line). To search them properly:
```bash
# Count lines containing a pattern in a specific field context
grep -c '"isError":true' file.jsonl

# Extract error messages from tool results
grep '"status":"error"' file.jsonl | grep -o '"error":"[^"]*"'
```

**IMPORTANT:** Do NOT count raw string matches like `grep -c "error"` — this matches field names like `"isError":false` which are not actual errors. Always match within a structured context.

## Delivery

Reports go to Slack #sentinel channel. Use the `message` tool to send your compiled report.
If CRITICAL, also message #archer channel to alert the orchestrator.
