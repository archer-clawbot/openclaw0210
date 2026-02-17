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

## Shell Environment — CRITICAL (Updated 2026-02-16 by Forge)

The `exec` tool runs in **bash (Git Bash on Windows)**, NOT PowerShell.

**Use Unix/bash commands. PowerShell cmdlets will fail.**

| PowerShell (WRONG) | Bash (CORRECT) |
|---|---|
| `Get-ChildItem -Recurse` | `find . -type f` or `ls -la` |
| `Get-Content file.txt` | `cat file.txt` |
| `Select-String -Pattern "x"` | `grep "x" file.txt` |
| `Test-Path dir` | `[ -d dir ]` or `ls dir 2>/dev/null` |
| `New-Item -ItemType Directory` | `mkdir -p dir` |
| `Remove-Item -Recurse -Force` | `rm -rf dir` |
| `Invoke-RestMethod URL` | `curl -s URL` |
| `$env:VAR = 'value'` | `export VAR=value` |

**Key rules:**
- Use **forward slashes** in paths: `~/.openclaw/` not `C:\Users\...`
- Use `&&` to chain commands: `cmd1 && cmd2`
- Use `||` for fallback: `cmd1 || echo "failed"`
- Prefer the **`read` tool** for reading files (avoids shell quoting issues)
- Python works: `python script.py`
- Node works: `node script.js`

**Path shortcuts:**
- `~/.openclaw/` → User's OpenClaw directory
- Use relative paths when possible

---

Add whatever helps you do your job. This is your cheat sheet.
