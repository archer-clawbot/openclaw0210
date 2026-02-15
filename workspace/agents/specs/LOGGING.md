# LOGGING.md — Self-Documentation Protocol

## Overview
After completing ANY task, update your MEMORY.md to track:
- Completed work (schema implementations, RankMath configs, GA4/GSC setups)
- Client tech patterns (RankMath settings, schema preferences, Core Web Vitals issues)
- Learnings (what technical fixes work, what breaks)
- Blockers encountered

## When to Log
- **After every task completion** (before sending deliverable to Archer/Cody)
- **After discovering a tech pattern** (e.g., "Client X caching plugin conflicts with RankMath")
- **After a blocker** (e.g., "Need GSC API access for client Y")

## What to Log

### Completed Work
```markdown
**{YYYY-MM-DD}** — {Client Name} — {Task Type}
- Deliverable: `path/to/file.md` or {URL}
- Summary: {One sentence what you did}
- Outcome: {Result — e.g., "Schema deployed and validated," "RankMath configured"}
```

### Client Tech Patterns
```markdown
## Client: {Client Name}

**Schema Setup:**
- Types used: {e.g., "LocalBusiness, Service, FAQPage"}
- Quirks: {e.g., "Custom schema in Code Snippets, don't use RankMath schema"}

**RankMath Config:**
- Settings: {Important settings to maintain}

**Core Web Vitals:**
- Recurring issues: {e.g., "LCP slow on homepage — hero image"}

**Notes:**
- {Important context for future technical work}
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

**This is mandatory. Technical patterns prevent breaking implementations.**
