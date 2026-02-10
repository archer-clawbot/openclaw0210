# CLAUDE CODE HANDOFF — OpenClaw Agent System Repair
## Created: February 8, 2026 by Claude (claude.ai session)

---

## WHAT IS THIS SYSTEM

OpenClaw is a multi-agent orchestration platform running on Windows 11. It manages 15 AI agents for a local SEO agency (LocalCatalyst.ai). Each agent has a Telegram bot. The main agent "Archer" receives all user messages and routes tasks to specialist agents.

**Config root:** `C:\Users\spart\.openclaw\`
**Main config:** `C:\Users\spart\.openclaw\openclaw.json`
**Gateway:** WebSocket on port 18789, runs as Windows Scheduled Task

---

## TWO-LAYER ARCHITECTURE

### Layer 1: Workspace (brain files — loaded into system prompt)
Location: `~/.openclaw/{agent-name}/`
Files loaded at session start: AGENTS.md, SOUL.md, IDENTITY.md, TOOLS.md, USER.md, HEARTBEAT.md, BOOTSTRAP.md
Plus any files in specs/, knowledge-base/, training/ subdirs

### Layer 2: Runtime (config + sessions)
Location: `~/.openclaw/agents/{agent-name}/`
Contains: agent/models.json, agent/auth-profiles.json, sessions/sessions.json, sessions/*.jsonl

**Exception:** Archer (main) uses `~/.openclaw/workspace/` as its workspace, not `~/.openclaw/main/`

---

## ISSUE #1 — CRITICAL: Subagent workspace inheritance (UNFIXED)

**Problem:** When Archer uses `sessions_spawn` to delegate to Silas, the spawned subagent inherits ARCHER'S workspace (`~/.openclaw/workspace/`), NOT Silas's workspace (`~/.openclaw/silas/`). The spawned "Silas" loads Archer's AGENTS.md brain and cannot access Silas's APEX template, specs, or training files.

**Evidence:** Session file `agents/main/sessions/0437a4d1-4aa0-49bd-8037-0c8892d82d55.jsonl` shows:
```json
{"type":"session","version":3,"id":"0437a4d1-...","cwd":"C:\\Users\\spart\\.openclaw\\workspace"}
```
Should be `C:\\Users\\spart\\.openclaw\\silas`

**When Silas is called directly** via `openclaw agent --agent silas --message "..."`, he gets the correct workspace and brain. This is proven by session `c4d0661c-7cc7-498c-9a80-257ee4c0c9a0.jsonl` which shows `cwd: silas/` and correctly injected AGENTS.md (13,832 chars).

**Fix:** Update Archer's AGENTS.md (`~/.openclaw/workspace/AGENTS.md`) to route via the `message` tool (sends to each agent's Telegram bot, starting a real session with the correct workspace) instead of `sessions_spawn`. Each agent already has a Telegram bot configured in openclaw.json.

The relevant section to add/replace in Archer's brain:

```markdown
## HOW TO ROUTE TASKS (CRITICAL)

**Use the `message` tool to route tasks to agents.** Do NOT use `sessions_spawn`.

When routing to an agent:
1. Use the `message` tool
2. Set channel: "telegram" 
3. Set accountId to the agent's ID (e.g., "silas", "scribe", "herald")
4. Include the full task context in the message body
5. The agent's Telegram bot will receive it and start a real session with their own workspace and brain

Example — routing an audit to Silas:
  message tool → channel: telegram, accountId: silas
  Message: "Run a full APEX audit on [domain]. Client: [name]. Priority: [level]."

**Why not sessions_spawn:** Subagents inherit the parent's workspace, so spawned agents don't get their own brain files, specs, or templates. The message tool starts a real agent session.
```

Agent ID → Telegram accountId mapping:
| Agent | accountId |
|-------|-----------|
| silas | silas |
| scribe | scribe |
| herald | herald |
| wrench | wrench |
| citadel | citadel |
| mozi | mozi |
| ghost | ghost |
| ledger | ledger |
| canvas | canvas |
| scout | scout |
| builder | builder (NO BOT TOKEN YET) |
| specs | specs (NO BOT TOKEN YET) |
| lookout | lookout (NO BOT TOKEN YET) |
| razor | razor (NO BOT TOKEN YET) |

---

## ISSUE #2 — Archer session has `channel: whatsapp` (UNFIXED)

In `agents/main/sessions/sessions.json`, the main session has `"channel": "whatsapp"` even though `lastChannel` and `deliveryContext.channel` are both "telegram". WhatsApp is not configured. This causes `--deliver` from CLI to fail.

**Fix:** Either clear the session (`'{}' > agents/main/sessions/sessions.json`) or edit the session JSON to change `"channel": "whatsapp"` to `"channel": "telegram"`. Then `openclaw gateway restart`.

---

## ISSUE #3 — 4 agents missing Telegram bots (UNFIXED)

builder, specs, lookout, razor have bindings in openclaw.json but no bot tokens under `channels.telegram.accounts`. The user needs to create 4 bots via @BotFather on Telegram and add the tokens to openclaw.json.

---

## ISSUE #4 — 4 agents missing runtime directories (UNFIXED)

builder, specs, lookout, razor have NO `agents/{name}/` directory. Need:
```
agents/{name}/agent/models.json
agents/{name}/agent/auth-profiles.json  
agents/{name}/sessions/sessions.json
```

Copy models.json and auth-profiles.json from any working agent (e.g., agents/wrench/agent/).

---

## ISSUE #5 — 4 agents missing supporting workspace files (UNFIXED)

builder, specs, lookout, razor only have AGENTS.md in their workspace directories. They need:
- SOUL.md (copy from any working agent, e.g., silas/SOUL.md — 1,673 bytes, shared across all)
- IDENTITY.md (635 bytes template)
- TOOLS.md (860 bytes)  
- USER.md (481 bytes)
- HEARTBEAT.md (168 bytes)
- BOOTSTRAP.md (1,470 bytes)

---

## WHAT'S ALREADY WORKING

- All 15 agents registered in openclaw.json ✓
- Gateway running, Telegram connected ✓
- Archer's brain (8,608 bytes) has full routing table, workflows, agent roster ✓
- Silas's brain upgraded to 13,832 bytes with full APEX methodology ✓
- APEX-AUDIT-TEMPLATE.md (14,593 bytes) in silas/ workspace ✓
- Silas works perfectly when called directly (`openclaw agent --agent silas`) ✓
- 11 of 15 agents have Telegram bots ✓
- 11 of 15 agents have complete workspaces ✓

---

## FILE LOCATIONS REFERENCE

```
C:\Users\spart\.openclaw\
├── openclaw.json                          # Master config (agents, channels, gateway, bindings)
├── gateway.cmd                            # Gateway service script
├── workspace/                             # ARCHER's workspace
│   ├── AGENTS.md                          # Archer brain (8,608 bytes) ← EDIT THIS FOR FIX #1
│   ├── SOUL.md, IDENTITY.md, etc.
│   └── audits/                            # Where spawned subagents write files
├── silas/                                 # Silas workspace
│   ├── AGENTS.md                          # Silas brain (13,832 bytes) ✓
│   ├── APEX-AUDIT-TEMPLATE.md             # Audit template (14,593 bytes) ✓
│   ├── specs/                             # 20 SPEC files
│   └── training/                          # Route training files + SILAS-BRAIN.md
├── {agent}/                               # Other agent workspaces
│   ├── AGENTS.md                          # Agent-specific brain
│   └── (supporting files vary)
└── agents/                                # Runtime layer
    ├── main/                              # Archer runtime
    │   ├── agent/models.json
    │   └── sessions/sessions.json         # ← HAS WHATSAPP BUG
    ├── silas/
    │   ├── agent/models.json
    │   ├── agent/APEX-AUDIT-TEMPLATE.md   # Old copy (runtime, not workspace)
    │   └── sessions/
    └── {agent}/                           # Other agent runtimes
```

---

## PRIORITY FIX ORDER

1. Edit `~/.openclaw/workspace/AGENTS.md` — Add message-tool routing instructions (Issue #1)
2. Clear Archer session or fix whatsapp→telegram (Issue #2)  
3. `openclaw gateway restart`
4. Test: Send "Run an APEX audit on humbleparkinglotstriping.com" via Telegram
5. Verify Silas gets his own workspace and produces template-compliant audit
6. Create 4 Telegram bots for builder/specs/lookout/razor (Issue #3)
7. Create runtime dirs for those 4 agents (Issue #4)
8. Copy supporting files to those 4 workspaces (Issue #5)

---

## USEFUL COMMANDS

```powershell
# Restart gateway
openclaw gateway restart

# List agents
openclaw agents list --bindings

# Test an agent directly (bypasses Archer, uses correct workspace)
openclaw agent --agent silas --message "Who are you?" --json

# Check sessions
openclaw sessions

# Clear a stale session
'{}' | Out-File "$env:USERPROFILE\.openclaw\agents\main\sessions\sessions.json" -Encoding UTF8

# View gateway logs
openclaw logs --follow

# Health check
openclaw doctor
```

---

## CONTEXT FROM PRIOR WORK

- Full transcript of this debugging session: uploaded as `openclaw_02082026_1530.zip` 
- Contains complete ~/.openclaw/ directory snapshot as of 3:30 PM CST Feb 8
- Previous audit results at `workspace/audits/` (4 files, all freestyle format due to Issue #1)
- Silas produces perfect APEX template output when called directly — proven in session c4d0661c
