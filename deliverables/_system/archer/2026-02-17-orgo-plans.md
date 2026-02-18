# Orgo Integration Plans
**Date:** 2026-02-17
**Author:** Archer

---

## Plan 1: Orgo for Autonomous Income (Upwork Method)

### Concept

Archer (King) scans Upwork for tasks AI can complete. For each viable job, it spins up a dedicated Orgo VM with its own sub-agent. Each sub-agent works the job in isolation — researches the requirements, builds the deliverable, prepares a proposal, and returns everything to Archer. Archer reviews, selects the best outputs, and submits.

No two sub-agents touch the same job. Each VM burns after task completion.

---

### Architecture

```
Archer (King — local machine)
│
├── Scans Upwork for viable jobs (computer use or API)
├── Selects 5-8 jobs that match AI skill profile
│
└── Spins up Orgo VMs (one per job)
    ├── Worker 1 → Job A (data cleaning / Python)
    ├── Worker 2 → Job B (API integration / Node.js)
    ├── Worker 3 → Job C (copywriting / blog post)
    ├── Worker 4 → Job D (web scraping / Selenium)
    └── Worker 5 → Job E (landing page / HTML+CSS)

Each Worker:
1. Reads job brief
2. Builds complete deliverable
3. Writes tailored proposal
4. Exports files back to Archer's VM
5. VM burns

Archer:
1. Reviews all outputs
2. Selects best quality work
3. Submits proposals (or flags for Cody review)
4. Routes payment to Lightning/bank
```

---

### Implementation Steps

#### Phase 1: Setup (1-2 hours)
1. Create Orgo account at orgo.ai (free tier to start)
2. Get API key from Orgo dashboard
3. Copy `docs.orgo.ai/llmsfull.txt` into a text file
4. Open Archer (or any agent) and paste the full LLM docs
5. Say: *"Make a skill to connect to Orgo API to spin up VMs for sub-agents"*
6. OpenClaw writes the skill file automatically
7. Restart gateway — done

#### Phase 2: Upwork Skill (2-3 hours)
Build or prompt Archer to build a specialized Upwork scanning skill:
- Connects to Upwork RSS feed or browser-scrapes job board
- Filters by: budget ($500+), job type (coding, writing, data), recency (<24h old)
- Scores each job: "Can AI do this solo?" → Yes/No/Maybe
- Returns list of viable jobs with requirements

#### Phase 3: First Swarm Run (test)
- Tell Archer: *"Scan Upwork for 5 jobs. Spin up one Orgo VM per job. Each sub-agent should: read the job brief, build a complete demo deliverable, and write a tailored proposal. No two sub-agents on the same job. Return everything."*
- Watch it run
- Review outputs before submitting anything
- Refine prompts based on quality

#### Phase 4: Productionize
- Automate daily scan (cron job, 9am)
- Set quality threshold (Archer auto-rejects weak jobs)
- Add payment routing (Upwork → bank → track in Ledger)
- Add human review gate (Cody approves before submission, or auto-submit if confidence is high)

---

### Model Strategy (Cost Control)

| Role | Model | Why |
|------|-------|-----|
| Archer (King) | Opus 4.5 | Strategic decisions, quality review |
| Orgo Workers | Kimi 2.5 or Sonnet | Cheap, capable, computer use capable |
| QA pass | Sonnet | Mid-tier review before submission |

Orgo workers do NOT need to be Opus. Nick's demo used Kimi 2.5 for computer use tasks at a fraction of the cost.

---

### What Jobs AI Can Actually Win Right Now

**High confidence (build and submit same day):**
- Data cleaning (CSV/Excel manipulation, deduplication)
- API integration (REST API hookups, webhook setup)
- Web scraping (BeautifulSoup, Playwright, Selenium scripts)
- Short-form copywriting (product descriptions, ad copy, bios)
- Landing page HTML/CSS (static pages, no backend)
- Python scripts (automation, file processing, reporting)

**Medium confidence (review before submitting):**
- WordPress setup/configuration
- Logo/graphic design (with image generation tools)
- Technical writing (docs, README files)
- SEO audits (Silas-style CATALYST reports)

**Avoid for now:**
- Long-running projects requiring back-and-forth with client
- Anything requiring phone calls or video meetings
- Highly specialized domain expertise (legal, medical)

---

### Revenue Expectations (Conservative)

Assume 5 job submissions/day, 20% win rate, avg $300/job:
- 1 win/day × $300 = $300/day
- Minus Orgo compute (~$5-15/day for 5 VMs)
- Minus API costs (~$3-8/day)
- **Net: ~$275-290/day**

This is conservative. Nick's demo showed 7-8 jobs in parallel in an hour.

---

### Risk Controls

1. **Never auto-submit without review gate** (at least for first 30 days)
2. **Client communication goes through Cody** — agents don't respond to Upwork messages autonomously
3. **IP diversity** — each Orgo VM has its own IP (built-in, inherent to the platform)
4. **No credential sharing** — workers get only what they need for their specific task
5. **Blast radius containment** — if a VM gets prompt-injected, it only has its own isolated context

---

## Plan 2: Orgo in the Raspberry Pi Product

### Concept

The Pi box is the King. Orgo is the muscle. The Pi sits on the client's desk as the always-on brain — it holds their data, runs their agents, sends them Telegram updates. Orgo VMs spin up when tasks need to touch the open web (scraping, GBP automation, directory submissions). VMs burn after use.

This separation is actually a feature, not a liability. It's the clearest explanation of the product you can give a non-technical client: *"Your box is the brain. The cloud handles the heavy lifting. Nothing risky runs on your desk."*

---

### Architecture

```
Client's Pi Box (on their desk, always on)
│
├── Archer/orchestrator — routing and coordination
├── Silas — strategy (reads local files, no web)
├── Scribe — content writing (pure LLM, no web)
├── Lookout — rank monitoring (reads API results)
├── Ledger — cost tracking (reads logs)
└── Specs — schema/technical (reads WordPress API)

Orgo VMs (spun up per task, burns after)
├── Herald → GBP post publishing (needs real browser)
├── Citadel → Directory submissions (dozens of sites)
├── Scout → Competitor scraping, SERP analysis
└── Blitz → Ad platform management (bot detection avoidance)
```

---

### Which Agents Stay on Pi vs Move to Orgo

| Agent | Location | Reason |
|-------|----------|--------|
| Archer | Pi (King) | Orchestrator, holds credentials |
| Silas | Pi | Pure reasoning, no web |
| Scribe | Pi | Pure LLM output, no web |
| Lookout | Pi | Reads rank tracking API responses |
| Ledger | Pi | Reads logs/spend data |
| Specs | Pi | WordPress REST API only |
| Razor | Pi | Analysis and recommendations only |
| Herald | **Orgo** | GBP needs real browser (bot protection) |
| Citadel | **Orgo** | Dozens of external directory sites |
| Scout | **Orgo** | Scraping, SERP parsing, competitor intel |
| Blitz | **Orgo** | Ad platforms (Google/Meta bot detection) |
| Ghost | **Orgo** | PBN — must have isolated IPs |

---

### Business Model Options

#### Option A: Include Orgo in Retainer (Recommended)
- Client pays you a monthly retainer (e.g., $500-800/month for active SEO management)
- You pay Orgo from that retainer (~$30-80/month in compute depending on activity)
- Client never touches Orgo — seamless
- **Pro:** Cleaner client experience, you control costs
- **Con:** You carry the Orgo bill (hedge by keeping compute-heavy tasks batched, not always-on)

#### Option B: Client Pays Orgo Directly
- Client creates Orgo account, enters API key into Pi box setup wizard
- You configure it, they pay Orgo directly
- **Pro:** No compute liability on your end
- **Con:** One more account/key for client to manage, breaks the "it just works" promise

**Recommendation:** Option A for managed clients. Option B for self-managed or cost-sensitive clients.

---

### Product Tier Update (with Orgo)

| Tier | Hardware | Orgo | Monthly | Who It's For |
|------|----------|------|---------|--------------|
| **Starter** | Pi 5 + Essential case | No Orgo | $0/mo (one-time setup) | DIY clients, low volume |
| **Managed** | Pi 5 + Pironman case | Orgo included | $300-500/mo retainer | Hands-off clients |
| **Agency** | Pi 5 + Pironman case | Orgo included | $800+/mo retainer | High-volume, multi-location |

The box is still a one-time hardware sale. Orgo is where the recurring revenue lives.

---

### Client-Facing Explanation (Non-Technical)

> *"Your AI box runs 18 specialized agents that manage your local SEO. For tasks like submitting your business to directories or publishing Google Business posts, your agents temporarily spin up secure cloud computers to do the work — then those computers shut down immediately after. This keeps your business data safe on your desk while the heavy lifting happens in the cloud. You never have to think about any of this. It just runs."*

---

### Implementation for First Client Unit

#### On the Pi:
1. Install OpenClaw (standard setup, per shopping list)
2. Configure all 18 agents
3. Add Orgo skill (paste llmsfull.txt, prompt OpenClaw to write skill)
4. Set Orgo API key in agent config
5. Configure which agents trigger Orgo vs run locally

#### In Archer's routing:
- Herald task → auto-spin Orgo VM → publish → burn
- Citadel task → auto-spin Orgo VM → submit citations → burn
- Scout task → auto-spin Orgo VM → scrape → return data → burn

#### Dashboard addition:
- Add "Cloud Tasks" panel showing active/completed Orgo jobs
- Show compute cost per task (pulled from Orgo API)
- Client can see their agents working without needing to understand VMs

---

### Risk/Liability Notes

1. **Pi goes offline** — Orgo tasks that are mid-run will complete or fail independently; Pi reconnects and picks up results
2. **Orgo outage** — Citadel/Herald/Scout tasks queue locally; Pi retries when Orgo comes back
3. **Cost spikes** — Set Orgo spending limits per workspace; Archer alerts Cody if compute exceeds threshold
4. **Client data on Orgo VMs** — Workers only receive the minimum context needed for their task; no master credentials leave the Pi

---

### Timeline to First Client Deployment

| Milestone | Time |
|-----------|------|
| Build prototype Pi box (per shopping list) | Week 1-2 |
| Install + test OpenClaw + 18 agents | Week 2 |
| Add Orgo skill, test Herald/Citadel on Orgo VMs | Week 3 |
| Refine routing, test failure modes | Week 4 |
| Deploy to first beta client (50% off) | Week 5-6 |
| Collect feedback, refine | Week 7-8 |
| First full-price client | Week 9+ |

---

## Shared Next Actions (Both Plans)

1. **Sign up at orgo.ai** (free tier, no commitment)
2. **Copy `docs.orgo.ai/llmsfull.txt`**
3. **Paste into Archer + say:** *"Make a skill to connect to Orgo API to spin up VMs for sub-agents"*
4. **Test with a single VM** — tell it to research a keyword or open a browser
5. **Verify export API** — confirm files come back to main agent correctly

Everything else builds on those 5 steps. The skill creation is the unlock.
