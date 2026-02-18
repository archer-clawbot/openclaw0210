# LOGGING.md — Archer Self-Documentation Protocol

## Overview

You are the orchestrator. Your memory is the system's memory. Update MEMORY.md **during** conversations, not after — sessions can disconnect at any time without warning.

## CRITICAL: Write-During, Not Write-After

**DO NOT wait until the end of a conversation to update MEMORY.md.**

Update MEMORY.md immediately when any of these events occur:
- A new client is onboarded (add to Active Projects)
- An agent completes a task (add to Completed Work)
- You discover a pattern or lesson (add to Lessons Learned)
- A blocker is identified or resolved (update Blockers)
- A rate limit or system issue occurs (add to Lessons Learned)
- The operator shares preferences or context (update Cody's Work Context)
- A dispatch queue is created for a client (update that client's entry)

**Why:** If your session disconnects mid-conversation, anything not written to MEMORY.md is lost forever. The JSONL transcript is not reliably recoverable.

## When to Log

### Immediately (Same Response as the Event)
- **Client onboarded** — Add to Active Projects with business details, audit results, dispatch queue
- **Rate limit hit** — Log the incident with timestamp, agent, outcome
- **Routing failure** — Log phantom routing bugs, session spawn failures
- **System upgrade** — Log what changed (template deployments, config updates, dispatcher changes)

### Within 2-3 Responses of Completion
- **Agent task completed** — Add to Completed Work with deliverable path
- **Multi-agent workflow finished** — Summarize outcomes
- **New pattern discovered** — Add to Lessons Learned

### Weekly (Sunday Standup)
- Archive completed work older than 30 days (move to bottom or summarize)
- Review and clean up Blockers section
- Update agent infrastructure notes if anything changed

## What to Log

### Active Projects
```markdown
### {Client Name} (Client)
- **Website:** {domain}
- **Type:** {business type, location}
- **Onboarded:** {YYYY-MM-DD}
- **Methodology:** {APEX | CATALYST-N | Hybrid}
- **Audit:** {methodology} — {score}/10
- **Status:** {current state}
- **Dispatch Queue:** {agents and their assignments}
```

### Completed Work
```markdown
### {YYYY-MM-DD} — {Client or System} — {Task Type}
- {Agent}: {what they delivered}
- Deliverable: `{path/to/file}`
- Outcome: {result, if known}
```

### Lessons Learned
```markdown
### {Topic} ({Date})
- **Context:** {What happened}
- **Root cause:** {Why it happened}
- **Fix:** {What to do differently}
- **Impact:** {High | Medium | Low}
```

### Blockers
```markdown
### {YYYY-MM-DD} — {Blocker}
- **Impact:** {What's blocked}
- **Waiting on:** {Operator | Agent | External}
- **Status:** {Active | Resolved}
```

## Tool Usage

Use the `Edit` tool to append new entries to the appropriate section of MEMORY.md. **Do NOT overwrite the entire file** — just add or update specific entries.

**To add a new client:**
```
Edit MEMORY.md — append under "## Active Projects"
```

**To log completed work:**
```
Edit MEMORY.md — append under "## Completed Work"
```

**To update a client's status:**
```
Edit MEMORY.md — find the client's section, update the relevant fields
```

## Self-Assessment (After Every Multi-Agent Dispatch)

Spend 10 seconds on these checks:
1. **Routing accuracy:** Did every agent get the right task with full context?
2. **Context completeness:** Did any agent come back asking for info you should have included?
3. **Timing:** Could batches have been grouped better?
4. **Cost:** Could cheaper models (Haiku) have handled any of these tasks?
5. **Memory:** Did I update MEMORY.md with the outcomes?

If you identify an improvement, log it under Lessons Learned.

---

**This is mandatory. You are the only agent whose memory loss affects the entire system.**
