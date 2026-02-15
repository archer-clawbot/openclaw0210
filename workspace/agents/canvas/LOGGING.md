# LOGGING.md — Self-Documentation Protocol

## Overview
After completing ANY task, update your MEMORY.md to track:
- Completed work (wireframes, images, design systems)
- Client brand preferences (colors, style, visual identity)
- Learnings (what imagery works, what doesn't)
- Blockers encountered

## When to Log
- **After every task completion** (before sending deliverable to Archer/Cody)
- **After discovering a brand pattern** (e.g., "Client X prefers minimalist, blue/white color schemes")
- **After a blocker** (e.g., "Need client logo files for brand guidelines")

## What to Log

### Completed Work
```markdown
**{YYYY-MM-DD}** — {Client Name} — {Task Type}
- Deliverable: `path/to/file` or image files
- Summary: {One sentence what you created}
- Outcome: {Result — e.g., "Delivered to Wrench for implementation"}
```

### Client Brand Patterns
```markdown
## Client: {Client Name}

**Brand Colors:**
- Primary: {hex code}
- Secondary: {hex code}
- Accent: {hex code}

**Visual Style:**
- Photography style: {professional/casual/candid/etc.}
- Illustration style: {minimalist/detailed/flat/etc.}
- Color preferences: {warm/cool/neutral/bold}

**Recurring Requests:**
- {e.g., "Always needs product images for WooCommerce services"}

**Notes:**
- {Important context for future design work}
```

### Learnings
```markdown
**{YYYY-MM-DD}** — {Lesson}
- Context: {What happened}
- Insight: {What you learned about image generation, design systems, etc.}
- Application: {How to apply this in future}
```

### Blockers
```markdown
**{YYYY-MM-DD}** — {Blocker}
- Impact: {What's blocked}
- Escalated to: {Archer/Cody}
- Status: {Pending/Resolved}
```

## Image Generation Tracking

**For every image generation task, log:**
- Prompt used
- Model/settings (Imagen 3, aspect ratio, etc.)
- Client feedback (if received)
- Reusability (can this prompt be reused for other clients?)

**Example:**
```markdown
**2026-02-14** — WooCommerce Product Images

**Prompts Used:**
1. Website Build: "Professional website design on laptop screen, wireframes visible, modern office, blue/white color scheme, minimalist style, natural lighting, high-quality photography"
2. Citation Building: "Local business directory listings on mobile showing Google Maps, professional marketing concept, green/blue, clean modern style"
3. GBP Optimization: "Google Business Profile on smartphone with 5-star reviews, local search optimization, professional setting, blue/gold, modern clean"
4. Schema Markup: "Structured data JSON-LD code on screen, Google rich results preview, technical SEO, blue/purple, professional workspace"

**Reusability:** All 4 prompts can be reused for future LocalCatalyst WooCommerce sites (services are standardized)

**Client Feedback:** (pending)
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

**This is mandatory. Design patterns and successful prompts are institutional knowledge.**
