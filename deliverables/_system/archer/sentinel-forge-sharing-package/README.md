# Sentinel + Forge Agent Installation Guide

**What are these agents?**

- **Sentinel**: Nightly system health monitor (runs at 2am, checks all agents, reports issues)
- **Forge**: Overnight improvement engine (runs at 2:05am, reads logs, diagnoses problems, patches agent prompts)

Both agents are **autonomous maintenance workers** — you wake up to a health report and system improvements.

---

## Prerequisites

- OpenClaw installed and running
- At least 1 other agent configured (Sentinel/Forge monitor YOUR agent fleet)
- Telegram bot tokens (optional, for direct messaging)
- Basic familiarity with OpenClaw agent deployment

---

## Installation Steps

### 1. Copy Agent Workspaces

Copy the `sentinel/` and `forge/` folders to your OpenClaw root directory:

```bash
# On Windows
xcopy /E /I sentinel C:\Users\YOUR_USERNAME\.openclaw\sentinel
xcopy /E /I forge C:\Users\YOUR_USERNAME\.openclaw\forge

# On Mac/Linux
cp -r sentinel ~/.openclaw/
cp -r forge ~/.openclaw/
```

**Important:** The workspace path is at the OpenClaw root level (NOT in `workspace/agents/`)

---

### 2. Customize the Workspace Files

**Required edits:**

1. **USER.md** (both agents):
   - Replace placeholder name/timezone with yours
   - Add your contact info

2. **AGENTS.md** (Sentinel):
   - Update agent count (line ~15: "18-agent system" → your actual count)
   - Update workspace paths in the agent table (lines 45-60) to match YOUR agent names/locations
   - Update Telegram bot usernames (if using Telegram)

3. **AGENTS.md** (Forge):
   - Update agent count
   - Update workspace paths
   - Adjust auto-apply rules if needed (default: max 5 changes/night, risk ≤2)

---

### 3. Get Telegram Bot Tokens (Optional)

If you want Sentinel/Forge to message you directly:

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create two bots:
   - `/newbot` → Name: "Sentinel Health Monitor" → Username: `@YourSentinelBot`
   - `/newbot` → Name: "Forge Optimizer" → Username: `@YourForgeBot`
3. Save the API tokens BotFather gives you

**Skip this step if you prefer reports in Slack or deliverables folder only.**

---

### 4. Update openclaw.json

Add Sentinel and Forge to your `openclaw.json` config:

**Option A: Merge the provided config snippet**

```bash
# Backup your current config first
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup

# Edit openclaw.json and add the two agent configs from openclaw-config-snippet.json
# (See the provided file for exact JSON structure)
```

**Option B: Use OpenClaw CLI (if available)**

```bash
openclaw agent add sentinel \
  --workspace "~/.openclaw/sentinel" \
  --model "anthropic/claude-haiku-4-5"

openclaw agent add forge \
  --workspace "~/.openclaw/forge" \
  --model "anthropic/claude-opus-4-5"
```

**Key fields to customize:**
- `workspace`: Adjust path for your system (Windows vs Mac/Linux)
- `agentDir`: Update to match your username
- `telegram.botToken`: Add your bot tokens (if using Telegram)

---

### 5. Set Up Deliverables Folder

Create the folders where reports will be saved:

```bash
mkdir -p ~/.openclaw/deliverables/_system/sentinel
mkdir -p ~/.openclaw/deliverables/_system/forge
```

---

### 6. Create Cron Jobs

**Using OpenClaw cron tool:**

```bash
# Sentinel (nightly 2am health check)
openclaw cron add \
  --name "Sentinel Nightly Health Check" \
  --schedule "0 2 * * *" \
  --agent sentinel \
  --task "Run nightly system health check. Execute all 8 checks, compile the health report, and save to deliverables/_system/sentinel/YYYY-MM-DD-nightly-health-report.md"

# Forge (nightly 2:05am improvement)
openclaw cron add \
  --name "Night Forge — Overnight Improvement" \
  --schedule "5 2 * * *" \
  --agent forge \
  --task "Run the 5-phase nightly protocol: HARVEST, DIAGNOSE, PRESCRIBE, APPLY, REPORT. Read all session logs, Sentinel's latest health report, and deliverables from the last 24h. Diagnose issues, apply approved fixes, and deliver morning brief."
```

**Or manually add to your cron config** (see `cron-jobs-config.md` for details)

---

### 7. Test the Agents

**Manual test (don't wait for 2am):**

```bash
# Test Sentinel
openclaw spawn sentinel "Run a full system health check and report findings"

# Test Forge (after Sentinel completes)
openclaw spawn forge "Read Sentinel's latest report, analyze any issues, and propose fixes"
```

**Check the output:**
- Sentinel should produce a health report at `deliverables/_system/sentinel/`
- Forge should analyze it and produce a morning brief at `deliverables/_system/forge/`

---

### 8. Customize for Your System

**Sentinel customizations:**
- Edit the agent workspace paths table in `AGENTS.md` (lines 45-60)
- Adjust error thresholds if needed (default: 6+ errors = FAIL)
- Update check schedules (default: nightly)

**Forge customizations:**
- Adjust auto-apply rules (default: max 5 changes/night, risk ≤2)
- Update protected files list (default: cannot touch Archer's AGENTS.md, openclaw.json, .env)
- Change morning brief delivery (Slack, Telegram, or deliverables only)

---

## What to Expect

### Every Morning (Starting Next Day):

**Sentinel Report (~2:00 AM):**
```
🛡️ SENTINEL NIGHTLY HEALTH REPORT
System Status: HEALTHY ✅
- Session Errors: PASS (0 errors)
- Workspace Files: PASS
- Gateway: PASS
- Telegram Bots: PASS (all 5 OK)
...
```

**Forge Report (~2:05 AM):**
```
🔨 FORGE MORNING BRIEF — Feb 16, 2026

CHANGES APPLIED:
1. ✅ PROMPT-PATCH → silas/AGENTS.md (added missing template)
   Rollback: git restore silas/AGENTS.md

CHANGES NEEDING APPROVAL:
2. ROUTING-FIX → workspace/AGENTS.md (clarify Scribe vs Wrench task split)
   Reply: "approve forge-2" to apply

FLEET HEALTH: 4/5 agents executed flawlessly last night
COST: $1.23 (Opus overnight run)
```

---

## Troubleshooting

**"Sentinel says 0 agents found"**
- Check the workspace paths in `sentinel/AGENTS.md` match YOUR actual agent locations
- Verify you have at least 1 agent configured (besides Sentinel/Forge)

**"Forge can't read session logs"**
- Ensure session logs are at `~/.openclaw/agents/*/sessions/*.jsonl`
- Check file permissions (Forge needs read access)

**"Cron jobs not running"**
- Verify cron scheduler is enabled: `openclaw cron status`
- Check timezone (cron uses system time, not UTC)
- View cron logs: `openclaw cron runs`

**"Reports not saving to deliverables"**
- Create the folders manually: `mkdir -p ~/.openclaw/deliverables/_system/{sentinel,forge}`
- Check disk space

---

## Security Notes

**What NOT to share:**
- ❌ Your Telegram bot tokens (your friend needs their own)
- ❌ Your API keys (Anthropic, etc.)
- ❌ Your actual session logs or deliverables (contains your data)

**What to share:**
- ✅ AGENTS.md, SOUL.md, IDENTITY.md, TOOLS.md, USER.md (templates)
- ✅ HEARTBEAT.md, FORGE-LOG.md (templates)
- ✅ This README and config snippets

---

## Support

**Original system:** LocalCatalyst (18-agent local SEO fleet)  
**Agents included:** Sentinel (health monitor), Forge (overnight improvement)  
**Customization required:** Yes (update agent counts, workspace paths, etc.)

**Questions?** Check OpenClaw docs or ask in the OpenClaw Discord.

---

## What's Next?

Once Sentinel + Forge are running:

1. **Week 1:** Just observe. Read the morning reports, get familiar with their output.
2. **Week 2:** Start approving Forge's proposed fixes (reply "approve forge-X").
3. **Week 3:** Tune thresholds (error counts, auto-apply rules) based on your fleet.
4. **Month 2:** System self-heals — you wake up to improvements, not issues.

**The goal:** Your agent fleet gets smarter every night while you sleep.
