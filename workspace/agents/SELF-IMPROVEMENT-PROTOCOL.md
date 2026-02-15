# SELF-IMPROVEMENT PROTOCOL

## Purpose

Every agent continuously improves by identifying patterns, inefficiencies, and optimization opportunities in their own work. This protocol turns reactive task execution into proactive system evolution.

---

## How It Works

### After Every Task — Self-Assessment (30 seconds)

Before logging completion in MEMORY.md, ask yourself:

1. **Efficiency:** Could I have done this faster? Were there unnecessary steps?
2. **Quality:** Did the output meet the standard? Would Cody approve without edits?
3. **Patterns:** Have I seen this exact task type before? Is there a repeatable workflow I should document?
4. **Blockers:** Did I hit friction that could be eliminated? (Missing info, wrong tools, unclear instructions)
5. **Cost:** Could a cheaper model have handled this task without quality loss?

### If You Identify an Improvement — Log It

Add to the `## Self-Improvement Log` section in your MEMORY.md:

```markdown
### Improvement Identified — {YYYY-MM-DD}

**Category:** {Efficiency | Quality | Cost | Workflow | Prompt}
**Observation:** {What you noticed}
**Proposed Fix:** {Specific change to make}
**Impact:** {High | Medium | Low}
**Requires Approval:** {Yes — needs Cody/Archer sign-off | No — internal optimization}

**Example:**
- Category: Efficiency
- Observation: I write the same schema preamble for every client. Takes 5 minutes each time.
- Proposed Fix: Create a schema template in SKILL.md with client variables. Fill in variables instead of writing from scratch.
- Impact: Medium (saves ~5 min per schema task)
- Requires Approval: No (internal workflow change)
```

---

## Improvement Categories

### 1. Prompt Optimization
- Identify where SKILL.md instructions are unclear or cause rework
- Propose specific wording changes
- Track before/after quality when changes are applied

### 2. Workflow Optimization
- Identify unnecessary handoffs between agents
- Propose batch operations (e.g., "do all 3 clients at once instead of one at a time")
- Identify steps that could be parallelized

### 3. Cost Optimization
- Flag tasks that could use a cheaper model (Sonnet → Haiku for mechanical tasks)
- Identify wasteful token usage (e.g., reading entire files when only headers needed)
- Propose caching strategies for repeated lookups

### 4. Quality Optimization
- Track client feedback patterns (rework requests, approval rates)
- Identify common quality gaps in deliverables
- Propose template improvements or checklist additions

### 5. Knowledge Gaps
- Document areas where you lack information and had to guess or escalate
- Propose additions to SKILL.md or MEMORY.md to fill gaps
- Track recurring questions from Archer/Cody that should be pre-answered

---

## Escalation Path for Improvements

### Self-Deployable (No Approval Needed)
- Internal workflow optimizations (how YOU work)
- MEMORY.md pattern updates
- Personal efficiency improvements
- Template refinements (within your existing SKILL.md scope)

### Requires Archer Review
- Changes to SKILL.md (your operating instructions)
- Changes to LOGGING.md (reporting protocols)
- Cross-agent workflow changes (affects other agents)
- Model tier changes (switching from Sonnet to Haiku)

### Requires Cody Approval
- Client-facing workflow changes
- Cost threshold changes
- New automation proposals
- Changes to approval gates

---

## Weekly Self-Improvement Review

**When:** During weekly standup (Sunday 9am CST)

**Each agent reports:**
1. Number of improvements identified this week
2. Improvements self-deployed (no approval needed)
3. Improvements pending Archer/Cody review
4. Measurable impact of previously deployed improvements (if any)

**Archer synthesizes** agent improvement proposals into the weekly rollup for Cody.

---

## Anti-Patterns (Do NOT Do These)

- ❌ Don't propose improvements that add complexity without clear benefit
- ❌ Don't change client-facing workflows without approval
- ❌ Don't optimize for speed at the expense of quality
- ❌ Don't log vague improvements ("things could be better") — be specific
- ❌ Don't self-deploy changes that affect other agents' workflows

---

## Getting Started

1. Add `## Self-Improvement Log` section to your MEMORY.md (if not present)
2. After every task, spend 30 seconds on self-assessment (5 questions above)
3. If you spot an improvement, log it immediately
4. Review your improvement log weekly — patterns across entries = high-impact changes

---

**The system that improves itself is the system that wins. Every agent is responsible for making themselves better.**
