# LOGGING.md — Self-Documentation Protocol

## Overview
After completing ANY task, update your MEMORY.md to track:
- Completed work (what you delivered)
- Client patterns (recurring issues, preferences)
- Learnings (what worked, what didn't)
- Blockers encountered

## When to Log
- **After every task completion** (before sending deliverable to Archer/Cody)
- **After discovering a pattern** (e.g., "Client X always needs schema fixes")
- **After a blocker** (e.g., "API access missing for client Y")

## What to Log

### Completed Work
```markdown
**{YYYY-MM-DD}** — {Client Name} — {Task Type}
- Deliverable: `path/to/file.md`
- Summary: {One sentence what you did}
- Outcome: {Result, if known}
```

### Client Patterns
```markdown
## Client: {Client Name}

**Preferences:**
- {Preference 1}
- {Preference 2}

**Recurring Issues:**
- {Issue pattern}

**Notes:**
- {Important context for future tasks}
```

### Learnings
```markdown
**{YYYY-MM-DD}** — {Lesson}
- Context: {What happened}
- Insight: {What you learned}
- Application: {How to apply this in future}
```

### Blockers
```markdown
**{YYYY-MM-DD}** — {Blocker}
- Impact: {What's blocked}
- Escalated to: {Archer/Cody}
- Status: {Pending/Resolved}
```

## Example Entry

```markdown
**2026-02-14** — Spectators Bar & Grill — SEO Audit
- Deliverable: `deliverables/spectators/silas/2026-02-14-catalyst-audit.md`
- Summary: Full CATALYST audit, identified 12 technical issues, 8 content gaps
- Outcome: Handed off to Wrench for schema implementation

**Client Pattern Noted:**
- Spectators consistently has outdated NAP across GBP listings (3 locations)
- Recommend quarterly NAP audit going forward
```

## Tool
Use the `Edit` tool to append to MEMORY.md after each task. Do NOT overwrite the entire file — just add new entries.

---

## Self-Improvement Protocol

**After every task, spend 30 seconds on self-assessment:**

1. **Efficiency:** Could I have done this faster? Unnecessary steps?
2. **Quality:** Would Cody approve without edits?
3. **Patterns:** Is there a repeatable workflow I should document?
4. **Blockers:** Did I hit friction that could be eliminated?
5. **Cost:** Could a cheaper model have handled this?

**If you identify an improvement, log it in MEMORY.md under `## Self-Improvement Log`:**

```markdown
### Improvement Identified — {YYYY-MM-DD}
- **Category:** {Efficiency | Quality | Cost | Workflow | Prompt}
- **Observation:** {What you noticed}
- **Proposed Fix:** {Specific change}
- **Impact:** {High | Medium | Low}
- **Requires Approval:** {Yes | No}
```

See `workspace/agents/SELF-IMPROVEMENT-PROTOCOL.md` for full protocol details.

---

**This is mandatory. Institutional knowledge is how we get smarter over time.**
