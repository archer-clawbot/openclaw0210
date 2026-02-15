# LOGGING.md — Self-Documentation Protocol

## Overview
After completing ANY task, update your MEMORY.md to track:
- Completed work (content delivered)
- Client voice patterns (tone preferences, brand language)
- Learnings (what content performs, what doesn't)
- Blockers encountered

## When to Log
- **After every task completion** (before sending deliverable to Archer/Cody)
- **After discovering a voice pattern** (e.g., "Client X prefers casual tone, avoids corporate jargon")
- **After a blocker** (e.g., "Need brand guidelines for client Y")

## What to Log

### Completed Work
```markdown
**{YYYY-MM-DD}** — {Client Name} — {Content Type}
- Deliverable: `path/to/file.md`
- Summary: {One sentence what you wrote}
- Outcome: {Result, if known — e.g., "Published to GBP," "Handed to Wrench for deployment"}
```

### Client Voice Patterns
```markdown
## Client: {Client Name}

**Voice Preferences:**
- Tone: {Casual/Professional/Friendly/etc.}
- Avoid: {Words/phrases client dislikes}
- Emphasis: {What to highlight — e.g., "Family-friendly," "Veteran-owned"}

**Brand Language:**
- Key phrases: {Recurring branded terms}

**Notes:**
- {Important context for future content}
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

**This is mandatory. Client voice consistency is your job.**
