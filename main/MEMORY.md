# ARCHER — Orchestrator Memory

## Active Projects

### Spectators Bar & Grill (Client)
- **Website:** spectatorsbargrill.com
- **Type:** Sports bar with 3 Houston-area locations
- **Status:** SEO optimization completed Feb 2026
- **Pending:** Geo-grid rank tracking (paused for budget), video training extraction

### Dunham Integrative Health + Aesthetics (Client)
- **Website:** dunhamintegrativefh.com
- **Type:** Medical aesthetics practice, Glenville, NY
- **Onboarded:** 2026-02-17
- **Audit:** CATALYST APEX — 2.3/10 (Critical)
- **Dispatch Queue:** Wrench (schema/canonical), Scribe (title/meta), Herald (GBP), Citadel (NAP/citations), Lookout (tracking)

### sandbags.info (Client)
- **Website:** sandbags.info
- **Type:** National content/authority site (non-local, non-e-commerce)
- **Methodology:** CATALYST-N (National SEO)
- **Onboarded:** 2026-02-17
- **Audit:** CATALYST-N — 1.4/10 (Pre-Launch Baseline)
- **Content:** 63 pages written by Scribe, 51 still needed; total architecture = 87 pages
- **Dispatch Queue:** OPERATOR decision (platform + GSC/GA4), Wrench (robots.txt/schema), Scribe (About/E-E-A-T pages + remaining 51 pages), Lookout (tracking), Canvas (calculator tool), Ghost (link building)

### Catalyst SEO Training
- 25 screen recordings in Google Drive with SEO strategies
- Goal: Extract actionable tactics from videos
- Blocked on transcription approach (large files)

---

## Cody's Work Context

- Works at a local SEO agency (main job)
- Takes on side clients (Spectators is one)
- Interested in efficiency tools and automation
- Budget-conscious on tooling costs
- Has 3D printing hobby (not monetized)
- Communicates via Telegram

---

## Technical Preferences

- Windows environment (PowerShell)
- Prefers API/automation over manual web work
- Mission Control: Convex + React + Tailwind (replaces Trello)
- Agent gateway runs on port 18789 (local)

---

## Lessons Learned

### Rate Limit Retry Protocol (CRITICAL — Updated Feb 17 2026)
**Neither `exec sleep` nor cron systemEvents reliably trigger autonomous retries.**
- `exec sleep`: completes silently, no action triggered (Feb 16 21:04 incident — 30 min lost)
- cron systemEvent: fires correctly but idle session doesn't process it autonomously (Feb 16 21:53 incident — 30 min lost again)
- **Root cause:** systemEvents appear in conversation log but don't trigger a response unless session is actively processing a user message
- **Real fix:** Notify user + manually retry in same response. Don't rely on deferred automation for retries.
- **Protocol:** Rate limit hit -> tell user "hit rate limit, retrying in 60s" -> exec sleep 60 in foreground (blocking) -> spawn immediately after -> confirm with sessionKey
- **Note:** Cron is still useful for scheduled tasks (weekly standups, heartbeats) but NOT for reactive retries
- **Dispatcher:** `cron/dispatcher.js` now has built-in retry logic with exponential backoff (30s->60s->120s->300s), retry-after header parsing, batch pacing (15s normal, 60s post-rate-limit), max 5 attempts

### Routing Execution Protocol (CRITICAL)
**MANDATORY POST-SPAWN VERIFICATION:**
1. Call `sessions_spawn` with full task details
2. Immediately capture the returned `childSessionKey` from the response
3. Confirm to the user with the sessionKey: "Wrench is working on this [session: xyz]"
4. ONLY THEN update notes/status to "in progress"
5. NEVER narrate intent ("I'm sending this to...") without executing the tool call in the same response
6. Phantom routing bug (Feb 14, 2026): Said "cart/checkout styling in progress" but never spawned the task

**Proof required. Intent != Execution.**

### WordPress REST API
- Application Passwords work ONLY for API, not web login
- Remove spaces from app passwords when using programmatically
- AIOSEO has its own API endpoint: `/wp-json/aioseo/v1/post/{id}`
- Code Snippets plugin can be managed via API for deploying PHP

### WordPress Site Build Standards
- **SEO Plugin:** RankMath (best for schema, technical SEO, and agency credibility)
- **Comments:** ALWAYS disable globally (Settings > Discussion > uncheck "Allow people to submit comments")
- **Placeholders:** Use generic contact info until client provides real data

### Google Drive
- JS-rendered pages don't work with simple fetch
- Browser automation needed for extracting file info
- Large video files need cloud transcription (can't download locally)

### Agent Task Sizing Guardrails
- **Max 10 pages/agent** at 1,200-1,500 words avg
- **Max 8 pages/agent** at 1,500-2,000 words avg
- **Max 6 pages/agent** when any page exceeds 2,000 words
- **Absolute ceiling: ~12,000 words total output per agent**
- Agents silently stall when they exceed context window — no error, output just stops

---

## Agent Infrastructure Notes

### Infrastructure Build (Feb 14, 2026)
- Built complete workspace documentation for 8 core agents + 2 specialized (Razor, Blitz)
- Implemented self-documentation system (SKILL.md, LOGGING.md, MEMORY.md per agent)
- Each agent builds institutional knowledge over time (client voice, tech quirks, patterns)
- Created weekly standup automation (Silas, Lookout, Ledger report trends every Sunday)
- Documented multi-agent coordination workflows (INTEGRATION.md)
- Established deliverables naming conventions and handoff protocols

### Dual SEO Methodology (Feb 17, 2026)
- **APEX:** Local SEO (SPEC-001 through SPEC-020) — Template: `silas/APEX-AUDIT-TEMPLATE.md`
- **CATALYST-N:** National SEO (NSPEC-001 through NSPEC-025) — Template: `silas/CATALYST-N-AUDIT-TEMPLATE.md`
- Silas routes methodology based on business type; hybrid clients get both
- Cross-contamination guard: never mix local/national metrics in wrong template

---

## Future Roadmap

### Orgo Integration (Phase 2 Infrastructure)
- **What:** Ephemeral cloud VMs (sub-500ms boot) for AI computer use
- **Why:** Isolate risky web-touching tasks from the main host; blast radius containment
- **King:** Archer stays on local hardware, holds credentials/strategy
- **Workers:** Disposable Orgo VMs per task — burn after completion
- **Priority agents:** Citadel (directory submissions), Herald (GBP automation), Scout (scraping/SERP), Ghost (PBN — isolated IPs), Blitz (ad platforms)
- **Reference:** https://docs.orgo.ai
- **Status:** Future — no account yet, noted Feb 17 2026

---

## Completed Work

### 2026-02-17 — Dunham Integrative Health + Aesthetics — Client Onboarding
- Silas completed CATALYST APEX audit (2.3/10)
- Deliverable: `deliverables/dunham-integrative/silas/2026-02-17-catalyst-audit.md`
- Dispatch queue created for 5 agents

### 2026-02-17 — sandbags.info — Client Onboarding
- Silas completed CATALYST-N audit (1.4/10 baseline)
- Silas completed updated topical map (87 pages total architecture)
- Silas completed gap analysis (57 valid, 51 still to write)
- Scribe completed 63 content pages
- Deliverables: `deliverables/sandbags-info/silas/` and `deliverables/sandbags-info/scribe/`

### 2026-02-17 — System — Rate Limit Protocol Upgrade
- Updated workspace/AGENTS.md with proper rate limit protocol
- Updated dispatcher.js with retry logic, exponential backoff, batch pacing
- Replaced broken cron/sleep retry approach

### 2026-02-17 — System — CATALYST-N Deployment
- Deployed national SEO template to Silas workspace
- Renamed existing template to APEX-AUDIT-TEMPLATE.md
- Updated Silas AGENTS.md with methodology routing

### 2026-02-17 — System — Mission Control v2 Upgrade
- Added Projects, Clients, Brainstorms tables to Convex schema
- Deployed BrainstormLibrary page and nav link
- Seeded 3 default clients, imported 11 brainstorm files

---

## Blockers

*(None currently active)*

---

**Last Updated:** 2026-02-17
