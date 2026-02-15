# AGENT ONBOARDING CHECKLIST

When adding a new agent to the fleet, follow this checklist to ensure complete setup.

---

## 1. Agent Identity & Scope

- [ ] Define agent name (e.g., "Silas")
- [ ] Define role (1-2 sentence description)
- [ ] Assign model (Opus 4.5 for heavy lifting, Sonnet 4.5 for standard, Haiku for simple/repetitive)
- [ ] Determine Telegram bot handle (e.g., @SilasSEOBot)
- [ ] Assign unique agent ID (lowercase, no spaces — e.g., "silas")

**Example:**
```
Name: Silas
Role: SEO Strategist — audits, strategy, competitor analysis
Model: Opus 4.5
Telegram: @SilasSEOBot
ID: silas
```

---

## 2. Workspace Creation

- [ ] Create workspace directory: `agents/{agent-id}/`
- [ ] Create `SKILL.md` (agent's operating manual)
- [ ] Create `LOGGING.md` (self-documentation protocol)
- [ ] Create `MEMORY.md` (persistent memory file)

**Commands:**
```bash
mkdir -p C:/Users/spart/.openclaw/workspace/agents/{agent-id}
```

---

## 3. SKILL.md Development

**Template Sections (Customize per Agent):**

```markdown
# {AGENT NAME} — {Role}

You are **{Agent}**, the {role description}.

---

## IDENTITY

- **Role:** {Role}
- **Model:** {Model}
- **Telegram:** {Telegram handle}
- **Workspace:** `C:\Users\spart\.openclaw\workspace\agents\{agent-id}`
- **Deliverables:** `C:\Users\spart\.openclaw\deliverables\{client-slug}\{agent-id}\`

---

## CORE MISSION

You handle {primary responsibilities}:

1. **{Responsibility 1}** — {description}
2. **{Responsibility 2}** — {description}
3. **{Responsibility 3}** — {description}

**You do NOT:**
- {What this agent doesn't do — clarify boundaries}

**You DO:**
- {What this agent explicitly does}

---

## {SECTION 2 — e.g., TASK TYPES, FRAMEWORKS, METHODOLOGIES}

{Agent-specific content — audit frameworks, content templates, technical processes, etc.}

---

## {SECTION 3 — e.g., DELIVERABLE TEMPLATES}

{Standard output formats, report templates, handoff docs}

---

## {AGENT NAME}'S VOICE

- **{Trait 1}** — {description}
- **{Trait 2}** — {description}
- **{Trait 3}** — {description}

---

## WHEN TO ESCALATE TO ARCHER/CODY

- {Escalation scenario 1}
- {Escalation scenario 2}
- {Escalation scenario 3}

---

## WORKFLOW EXAMPLES

### Example 1: "{Common Task}"

**Steps:**
1. {Step 1}
2. {Step 2}
3. {Step 3}

---

## LOGGING (MANDATORY)

After every task, update your MEMORY.md:

```markdown
**{YYYY-MM-DD}** — {Client Name} — {Task Type}
- Deliverable: `deliverables/{client-slug}/{agent-id}/{filename}.md`
- Summary: {One sentence}
- Outcome: {Result}
```

Log client patterns:
{Agent-specific pattern tracking — voice, tech stack, preferences, etc.}

---

**You are {Agent}. {One-line agent motto/philosophy}.**
```

**Examples to Reference:**
- `agents/silas/SKILL.md` — SEO strategist (audits, frameworks)
- `agents/scribe/SKILL.md` — Content writer (templates, voice tracking)
- `agents/wrench/SKILL.md` — Site optimization (implementation, testing)
- `agents/specs/SKILL.md` — Technical SEO (schema, analytics)

---

## 4. LOGGING.md Setup

**Standard Template (Customize per Agent):**

```markdown
# LOGGING.md — Self-Documentation Protocol

## Overview
After completing ANY task, update your MEMORY.md to track:
- Completed work ({agent-specific deliverables})
- Client patterns ({agent-specific patterns — e.g., voice preferences, tech quirks})
- Learnings (what worked, what didn't)
- Blockers encountered

## When to Log
- **After every task completion** (before sending deliverable to Archer/Cody)
- **After discovering a pattern** (e.g., "{agent-specific pattern example}")
- **After a blocker** (e.g., "{agent-specific blocker example}")

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

**{Pattern Category 1}:**
- {Pattern detail}

**{Pattern Category 2}:**
- {Pattern detail}

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

## Tool
Use the `Edit` tool to append to MEMORY.md after each task. Do NOT overwrite the entire file — just add new entries.

---

**This is mandatory. Institutional knowledge is how we get smarter over time.**
```

---

## 5. MEMORY.md Initialization

**Standard Template (Same for All Agents):**

```markdown
# MEMORY.md — {Agent Name} ({Role})

## Completed Work

*(Log completed tasks here)*

---

## Client Patterns

*(Log recurring client behaviors, preferences, issues)*

---

## Learnings

*(Log insights from completed work — what worked, what didn't)*

---

## Blockers

*(Log anything that's blocking you — API access, missing credentials, scope unclear)*

---

**Last Updated:** {Auto-populated by agent after each task}
```

---

## 6. Update AGENTS.md

- [ ] Add agent to roster table (with workspace status "✅ Configured")
- [ ] Add agent to task routing table
- [ ] Update configured agents count

**Location:** `workspace/AGENTS.md`

---

## 7. Deliverables Folder

- [ ] Create deliverables directory: `deliverables/{client-slug}/{agent-id}/`
- [ ] Create `_system` folder for non-client work: `deliverables/_system/{agent-id}/`

**Commands:**
```bash
mkdir -p C:/Users/spart/.openclaw/deliverables/_system/{agent-id}
```

---

## 8. OpenClaw Configuration (Optional)

**If agent needs dedicated Telegram bot or gateway:**

- [ ] Create agent profile in `openclaw.json`
- [ ] Configure Telegram bot token
- [ ] Set agent-specific model override (if not using default)
- [ ] Test Telegram bot responds to `/start`

**Note:** Most agents share Archer's gateway — only create separate gateways for agents that need isolation (e.g., Sentinel, Forge).

---

## 9. Testing & Validation

- [ ] Spawn agent via `sessions_spawn` with test task
- [ ] Verify agent loads correct SKILL.md
- [ ] Verify agent updates MEMORY.md after task
- [ ] Check deliverable saved to correct folder
- [ ] Test escalation behavior (agent asks for missing info)

**Test Command (via Archer):**
```
sessions_spawn:
  agentId: "{agent-id}"
  task: "Test task: {simple task to verify agent works}. Deliver a test report to deliverables/_system/{agent-id}/"
  label: "{agent-name}"
```

---

## 10. Documentation & Handoff

- [ ] Document agent in this file's "Configured Agents" list
- [ ] Add agent to weekly standup rotation (if applicable)
- [ ] Notify Cody that agent is operational
- [ ] Add agent to routing table in Archer's brain

---

## CONFIGURED AGENTS (Current Status)

| Agent | Role | Workspace | Status |
|-------|------|-----------|--------|
| Silas | SEO Strategist | `agents/silas/` | ✅ Operational |
| Scribe | Content Writer | `agents/scribe/` | ✅ Operational |
| Wrench | Site Optimization | `agents/wrench/` | ✅ Operational |
| Specs | Technical SEO | `agents/specs/` | ✅ Operational |
| Herald | GBP Operations | `agents/herald/` | ✅ Operational |
| Citadel | Citations | `agents/citadel/` | ✅ Operational |
| Lookout | Rank Tracking | `agents/lookout/` | ✅ Operational |
| Ledger | Cost Analysis | `agents/ledger/` | ✅ Operational |
| Razor | CRO | `agents/razor/` | ✅ Operational |
| Blitz | Paid Ads | `agents/blitz/` | ✅ Operational |

---

## PENDING DEPLOYMENT

| Agent | Role | Priority | Notes |
|-------|------|----------|-------|
| Mozi | Business Advisor | Medium | Hormozi frameworks, pricing |
| Scout | Research | Medium | Competitor intel, SERP analysis |
| Canvas | Design | Low | Wireframes, brand guidelines |
| Builder | New Sites | Medium | WordPress builds from scratch |
| Ghost | PBN | Low | Private blog network management |
| Sentinel | System Health | High | Nightly infrastructure monitoring |
| Forge | Overnight Improvement | High | Autonomous prompt tuning |

---

## QUICK REFERENCE

**Create new agent workspace:**
```bash
mkdir -p agents/{agent-id}
touch agents/{agent-id}/SKILL.md
touch agents/{agent-id}/LOGGING.md
touch agents/{agent-id}/MEMORY.md
```

**Test agent:**
```
sessions_spawn agentId="{agent-id}" task="Test: {simple task}" label="{agent-name}"
```

**Check agent memory:**
```
Read path="agents/{agent-id}/MEMORY.md"
```
