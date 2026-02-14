# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## WordPress Sites

Credentials are injected at runtime by the dispatcher when you receive a task.
Do not store or reference hardcoded credentials.
If you need WordPress API access during an interactive session, ask the operator.

---

## Shell Environment — CRITICAL

This system runs on **Windows 11 with PowerShell**. The `exec` tool executes commands in PowerShell, NOT bash.

**You MUST use PowerShell syntax for all shell commands. Never use bash/CMD syntax.**

| Bash/CMD (WRONG) | PowerShell (CORRECT) |
|---|---|
| `curl -s URL` | `Invoke-RestMethod URL` |
| `curl -X POST -H "..." -d "..."` | `Invoke-RestMethod -Method Post -Headers @{...} -Body "..." URL` |
| `cmd1 && cmd2` | `cmd1; cmd2` (or use `-and` for conditional) |
| `cmd1 \|\| cmd2` | Use `try { cmd1 } catch { cmd2 }` |
| `dir /b /s *.md` | `Get-ChildItem -Recurse -Filter *.md` |
| `cat file.txt` | `Get-Content file.txt` |
| `grep "pattern" file` | `Select-String -Pattern "pattern" file` |

**Key rules:**
- Use `Invoke-RestMethod` instead of `curl` — PowerShell aliases `curl` to `Invoke-WebRequest` which has different flags
- Use semicolons `;` to chain commands, not `&&`
- Use PowerShell path separators: backslash `\` not forward slash `/`
- For Python scripts: `python script.py` works fine in PowerShell

## Schema Deployment

Use the **fallback deployment method** (`deploy_schema_fallback.py`) which targets the WordPress REST API v2 `/pages/{id}` endpoint. The primary `deploy_schema.py` targets the RankMath plugin API which returns 404 if RankMath is not installed.

Run deployment with: `python C:\Users\spart\.openclaw\deployments\deploy_schema_fallback.py`

---

Add whatever helps you do your job. This is your cheat sheet.
