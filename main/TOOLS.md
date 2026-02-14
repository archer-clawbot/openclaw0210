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
| `if not exist dir mkdir dir` | `if (-not (Test-Path dir)) { New-Item -ItemType Directory dir }` |
| `cat file.txt` | `Get-Content file.txt` |
| `grep "pattern" file` | `Select-String -Pattern "pattern" file` |
| `echo "text" > file` | `Set-Content -Path file -Value "text"` |
| `rm -rf dir` | `Remove-Item -Recurse -Force dir` |
| `export VAR=value` | `$env:VAR = "value"` |

**Key rules:**
- Use `Invoke-RestMethod` instead of `curl` — PowerShell aliases `curl` to `Invoke-WebRequest` which has different flags
- Use semicolons `;` to chain commands, not `&&`
- Use PowerShell path separators: backslash `\` not forward slash `/`
- Wrap multi-step operations in PowerShell scripts if complex
- For Python scripts: `python script.py` works fine in PowerShell
- Variables use `$` prefix: `$result = Get-Content file.txt`

---

Add whatever helps you do your job. This is your cheat sheet.
