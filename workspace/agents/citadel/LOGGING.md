# LOGGING.md — Self-Documentation Protocol

## Overview
After completing ANY task, update your MEMORY.md to track:
- Completed work (citation submissions, NAP audits)
- Client NAP patterns (consistency issues, directory preferences)
- Learnings (what directories matter, what's noise)
- Blockers encountered

## When to Log
- **After every task completion** (before sending deliverable to Archer/Cody)
- **After discovering a NAP pattern** (e.g., "Client X has outdated phone number on 10+ directories")
- **After a blocker** (e.g., "Need client's Yelp login for directory access")

## What to Log

### Completed Work
```markdown
**{YYYY-MM-DD}** — {Client Name} — {Task Type}
- Deliverable: `path/to/file.md`
- Summary: {One sentence what you did}
- Outcome: {Result — e.g., "Submitted to 15 directories," "NAP updated on 8 listings"}
```

### Client NAP Patterns
```markdown
## Client: {Client Name}

**NAP Consistency Issues:**
- {Common discrepancies — e.g., "Phone number varies across listings"}

**Directory Performance:**
- High-value directories: {e.g., "Yelp, YellowPages, Healthgrades"}
- Low-value directories: {e.g., "Ignore spammy directories"}

**Notes:**
- {Important context for future citation work}
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

**This is mandatory. NAP consistency is your job.**
