# AGENT SYSTEM DOCUMENTATION

**Complete documentation for the 18-agent autonomous SEO system.**

---

## QUICK START

### For Operators (Cody)

**Talk to Archer:**
- Telegram: @ArcherClawBot
- All requests go through Archer — he routes to the right agents

**Common Commands:**
```
"Onboard new client: {Client Name}"
"Run a CATALYST audit on {site}"
"Write 4 GBP posts for {client}"
"What are {client} rankings this week?"
"How much did we spend this month?"
```

**Check Status:**
- Weekly rollup: Every Sunday morning (automated)
- Client status: "What's the status on {client}?"
- System status: "How are the agents doing?"

---

## DOCUMENTATION INDEX

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **AGENTS.md** | Agent roster, routing table, core system overview | Start here — system architecture |
| **ONBOARDING.md** | How to add new agents to the fleet | When deploying new agents |
| **INTEGRATION.md** | How agents coordinate, handoff workflows | Understanding multi-agent workflows |
| **TELEGRAM-ROUTING.md** | Bot setup, routing philosophy | Setting up Telegram bots |
| **CRON-JOBS.md** | Scheduled tasks, monitoring automation | Configuring automated workflows |
| **README.md** (this file) | Navigation and quick reference | You are here |

---

## AGENT WORKSPACES

Each agent has their own workspace: `agents/{agent-id}/`

**Files:**
- `SKILL.md` — Agent's operating manual (what they do, how they do it)
- `LOGGING.md` — Instructions on self-documentation
- `MEMORY.md` — Agent's persistent memory (builds over time)

**Configured Agents (Full Documentation):**
1. **Silas** — SEO Strategist (audits, strategy, competitor analysis)
2. **Scribe** — Content Writer (GBP posts, service pages, blogs)
3. **Wrench** — Site Optimization (deploys content, fixes, updates)
4. **Specs** — Technical SEO (schema, RankMath, GA4/GSC, Core Web Vitals)
5. **Herald** — GBP Operations (posts, reviews, listings)
6. **Citadel** — Citations & NAP Management
7. **Lookout** — Rank Tracking & Monitoring
8. **Ledger** — Cost Analysis & Profitability
9. **Razor** — CRO (conversion rate optimization)
10. **Blitz** — Paid Ads (Google Ads, Meta Ads)

**Pending Deployment:**
- Mozi (Business Advisor)
- Scout (Research)
- Canvas (Design)
- Builder (New Sites)
- Ghost (PBN)
- Sentinel (System Health)
- Forge (Overnight Improvement)

---

## DELIVERABLES

All agent outputs saved to: `deliverables/{client-slug}/{agent}/`

**Format:** `{YYYY-MM-DD}-{description}.md`

**Examples:**
```
deliverables/spectators/silas/2026-02-14-catalyst-audit.md
deliverables/spectators/scribe/2026-02-14-gbp-posts.md
deliverables/spectators/wrench/2026-02-14-schema-deployed.md
deliverables/spectators/lookout/2026-02-14-rank-report.md
```

**Special:**
- Non-client work: `deliverables/_system/{agent}/`
- Weekly rollups: `deliverables/_system/archer/{YYYY-MM-DD}-weekly-rollup.md`

---

## AUTOMATION

### Active Cron Jobs

**Weekly Agent Standup:**
- Schedule: Every Sunday 9:00 AM CST
- Agents: Silas, Lookout, Ledger
- Deliverable: `deliverables/_system/archer/{YYYY-MM-DD}-weekly-rollup.md`
- Status: ✅ Active

### Planned Cron Jobs

- **Lookout:** Weekly rank check (Mondays 8am)
- **Ledger:** Monthly profitability report (1st of month, 9am)
- **Lookout:** Daily anomaly check (high-priority clients, 7am)
- **Sentinel:** Nightly health check (11pm)
- **Forge:** Overnight improvement proposals (2am)

See `CRON-JOBS.md` for full details.

---

## ROUTING WORKFLOWS

### Single-Agent Tasks

**Archer routes directly to one agent:**
```
"Write 4 GBP posts for Spectators"
  → Archer → Scribe → Delivers posts
  → Archer → Herald → Publishes posts
  → Archer → Cody: "Posts published"
```

---

### Multi-Agent Workflows

**Archer coordinates sequence:**
```
"Run CATALYST audit and implement fixes"
  → Archer → Silas (audit)
  → Silas → Delivers audit with handoffs
  → Archer → Scribe (content gaps)
  → Archer → Wrench (deploy content + on-page fixes)
  → Archer → Specs (technical SEO)
  → Archer → Wrench (deploy schema)
  → Archer → Herald (GBP optimization)
  → Archer → Citadel (citations)
  → Archer → Lookout (start tracking)
  → Archer → Cody: "Audit complete, all fixes implemented"
```

See `INTEGRATION.md` for detailed workflows.

---

## SELF-DOCUMENTATION SYSTEM

**Every agent updates their MEMORY.md after completing tasks.**

**What's logged:**
- Completed work (what was delivered, where it's saved)
- Client patterns (voice preferences, tech quirks, recurring issues)
- Learnings (what worked, what didn't)
- Blockers (what's preventing progress)

**Why this matters:**
- **Institutional knowledge** — Agents get smarter over time
- **Continuity** — Any agent can reference past work
- **Pattern recognition** — Recurring issues surface automatically

**Example (Scribe's MEMORY.md):**
```markdown
## Client: Spectators Bar & Grill

**Voice Preferences:**
- Tone: Casual, fun, sports-focused
- Avoid: Corporate jargon
- Emphasis: "Game day headquarters," "family-friendly"

**Brand Language:**
- Always: "game day" (not "sports day")
- Always: "daily specials" (not "promotions")
```

**Result:** Future GBP posts auto-match Spectators' voice without manual guidance.

---

## COST TRACKING

**Ledger tracks every dollar spent:**
- API costs (Opus, Sonnet, Haiku tokens)
- Per-client profitability (cost vs retainer)
- Monthly burn rate (total spend)
- Budget alerts (when clients exceed budget)

**Reports:**
- Weekly: In Sunday standup (if notable)
- Monthly: Profitability report (1st of month)
- On-demand: "What's Client X profitability?"

---

## MONITORING

**Lookout watches for issues:**
- Ranking drops (> 5 positions)
- Traffic anomalies (> 20% change)
- GSC errors (index coverage, crawl errors)
- Competitor movements

**Alerts:**
- Automatic escalation to Archer → Silas (investigation)
- Weekly rank reports (Sundays)
- Daily checks (high-priority clients)

---

## HANDOFF PROTOCOL

**When Agent A completes work for Agent B to implement:**

1. **Agent A** delivers output to `deliverables/{client}/{agent-a}/{file}.md`
2. **Archer** reads Agent A's deliverable
3. **Archer** routes to **Agent B** with context: "Context: {link to Agent A's file}"
4. **Agent B** reads Agent A's file → executes → delivers confirmation

**Example:**
```
Scribe writes content → deliverables/client/scribe/service-page.md
Archer → Wrench: "Deploy content from deliverables/client/scribe/service-page.md"
Wrench reads file → deploys → confirms: "Page live at {URL}"
```

See `INTEGRATION.md` for detailed handoff workflows.

---

## TELEGRAM BOTS

**Current Setup:**
- **Archer:** @ArcherClawBot (✅ Active)
- All other agents: Bots reserved, not yet configured

**Recommended Approach:**
- Route all requests through Archer (simple, centralized)
- Later: Add direct bots for quick queries (Lookout, Ledger)

See `TELEGRAM-ROUTING.md` for bot configuration.

---

## ESCALATION RULES

**Archer always escalates to Cody:**
- Client-facing communication (before sending)
- Strategy/scope changes
- Budget decisions > $100
- Negative review responses (before publishing)
- PBN deployment approvals
- New client onboarding kickoff

**Archer handles autonomously:**
- Routing tasks to agents
- Status updates
- Progress tracking
- Internal coordination

---

## FILE STRUCTURE

```
workspace/
├── AGENTS.md                 # System overview, roster, routing table
├── agents/
│   ├── ONBOARDING.md         # How to add new agents
│   ├── INTEGRATION.md        # Agent coordination workflows
│   ├── TELEGRAM-ROUTING.md   # Bot setup and routing
│   ├── CRON-JOBS.md          # Scheduled tasks
│   ├── README.md             # This file
│   ├── silas/
│   │   ├── SKILL.md          # Silas's operating manual
│   │   ├── LOGGING.md        # Self-documentation protocol
│   │   └── MEMORY.md         # Silas's persistent memory
│   ├── scribe/
│   │   ├── SKILL.md
│   │   ├── LOGGING.md
│   │   └── MEMORY.md
│   ├── wrench/
│   ├── specs/
│   ├── herald/
│   ├── citadel/
│   ├── lookout/
│   ├── ledger/
│   ├── razor/
│   └── blitz/
└── deliverables/
    ├── {client-slug}/
    │   ├── silas/
    │   ├── scribe/
    │   ├── wrench/
    │   └── ...
    └── _system/
        ├── archer/
        ├── lookout/
        ├── ledger/
        └── ...
```

---

## GETTING STARTED (NEW OPERATORS)

### Day 1: Learn the System
1. Read `AGENTS.md` (agent roster, routing table)
2. Message @ArcherClawBot: "What can you do?"
3. Try simple request: "What are {client} rankings?"

### Week 1: Use Core Features
- Request audits ("Run CATALYST audit on {client}")
- Request content ("Write 4 GBP posts for {client}")
- Check status ("What's the status on {client}?")

### Month 1: Advanced Workflows
- Multi-agent onboarding ("Onboard new client: {name}")
- Review weekly rollups (Sundays)
- Check profitability ("Is {client} profitable?")

---

## TROUBLESHOOTING

### "Agent didn't do what I asked"

**Check:**
1. Was task routed to correct agent? (Archer should confirm routing)
2. Was context provided? (Agent needs client name, URL, etc.)
3. Did agent ask for missing info? (Check Telegram messages)

**Fix:**
- Provide more context: "Write 4 GBP posts for Spectators Bar & Grill (spectatorsbargrill.com)"
- Check agent's MEMORY.md for patterns/blockers

---

### "Where's the deliverable?"

**Check:**
- `deliverables/{client-slug}/{agent}/{YYYY-MM-DD}-{description}.md`
- Ask Archer: "Where's the {audit/content/report} for {client}?"

**Fix:**
- Archer can search deliverables folder and provide link

---

### "Ranking dropped — what happened?"

**Process:**
1. Lookout detects drop → alerts Archer
2. Archer → Silas: "Investigate ranking drop for {keyword}"
3. Silas audits page, identifies cause
4. Archer routes fix to appropriate agent (Wrench/Specs/Scribe)
5. Lookout monitors recovery

**Manual trigger:**
- "Investigate ranking drop for {client} - {keyword}"

---

### "Client is unprofitable"

**Process:**
1. Ledger flags unprofitable client in monthly report
2. Archer escalates to Cody
3. Options:
   - Increase retainer
   - Reduce service scope
   - Switch agents to cheaper models (Opus → Sonnet)
   - Discontinue client (if not strategic)

**Manual check:**
- "Is {client} profitable?"

---

## EXPANSION ROADMAP

### Phase 1: Core SEO (✅ Complete)
- Silas, Scribe, Wrench, Specs, Herald, Citadel, Lookout, Ledger

### Phase 2: Advanced Optimization (In Progress)
- Razor (CRO) — ✅ Operational
- Blitz (Paid Ads) — ✅ Operational

### Phase 3: Research & Strategy (Planned)
- Mozi (Business Advisor)
- Scout (Research & Competitor Intel)

### Phase 4: Build & Design (Planned)
- Builder (New WordPress Sites)
- Canvas (Design & Wireframes)

### Phase 5: Infrastructure (Planned)
- Sentinel (System Health Monitoring)
- Forge (Overnight Improvement & Optimization)
- Ghost (PBN Management)

---

## SUPPORT

**Questions? Issues?**
- Ask Archer: @ArcherClawBot
- Check documentation: `workspace/agents/`
- Review MEMORY.md files for agent-specific patterns
- Check deliverables folder for past work

**System Updates:**
- Weekly rollups (Sundays 9am) include system status
- Sentinel health checks (when deployed) run nightly
- Forge improvement proposals (when deployed) run overnight

---

**This is a living system. Agents learn. Agents improve. Documentation evolves.**

Last updated: February 14, 2026
