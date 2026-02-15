# Agent Roster — Master Reference
# Single Source of Truth for All Agent Definitions
# Version: 2.0 | 2026-02-07
# Update this document when adding, removing, or modifying any agent

---

## ARCHITECTURE OVERVIEW

```
Cody (Telegram / GHL)
  └→ Archer (Orchestrator)
       │
       ├── STRATEGY LAYER
       │   ├→ Silas ........... SEO strategy, audits, scoring, architecture
       │   ├→ Mozi ............ Hormozi business frameworks, offer design
       │   └→ Scout ........... Research, intel, competitor analysis
       │
       ├── CONTENT & DESIGN LAYER
       │   ├→ Canvas .......... Visual design systems, art direction
       │   └→ Scribe .......... All written content (pages, GBP, blogs, citations)
       │
       ├── EXECUTION LAYER
       │   ├→ Builder ......... New WordPress sites (staging → production)
       │   ├→ Wrench .......... Existing WordPress site optimization
       │   ├→ Specs ........... Technical SEO (schema, analytics, speed, RankMath)
       │   ├→ Herald .......... GBP operations (posts, Q&A, attributes)
       │   ├→ Citadel ......... Off-site authority (citations, NAP, link building)
       │   └→ Ghost ........... PBN network (build, maintain, deploy links)
       │
       └── MONITORING LAYER
            ├→ Lookout ........ Rank tracking, geo-grids, anomaly detection
            └→ Ledger ......... Cost analysis, token usage, per-client profitability
```

---

## AGENT DEFINITIONS

### 1. Archer — Orchestrator

| Field | Value |
|-------|-------|
| **Role** | Master orchestrator. Routes all tasks, coordinates multi-agent workflows, manages state. |
| **Model** | Claude Sonnet (fast routing, moderate reasoning) |
| **Talks to** | Cody (via Telegram), ALL other agents |
| **Input** | Cody's messages, GHL webhooks, scheduled triggers, agent status reports |
| **Output** | Task routing, workflow coordination, status updates to Cody |
| **Key files** | archer-system-prompt.md, all workflow files |

**Archer knows about:**
- All 13 agents and their capabilities
- All operational workflows (onboarding, approval, payment, ad-hoc, website builds)
- Task management (Mission Control / Convex)
- Client communication (GHL automations)
- Scheduling (what runs daily, weekly, monthly)

---

### 2. Silas — SEO Strategist

| Field | Value |
|-------|-------|
| **Role** | SEO strategy engine. Audits, scores, prioritizes, creates architecture and briefs. Does NOT execute. |
| **Model** | Claude Sonnet (deep reasoning, spec knowledge) |
| **Talks to** | Archer (receives tasks, sends plans) |
| **Input** | Client data from Archer, ranking data from Lookout, research from Scout |
| **Output** | Audits, priority matrices, content briefs, site architecture, keyword maps, quality scores |
| **Key files** | Silas AGENTS.md (on OpenClaw), SPEC-001 through SPEC-014 |

**Silas's role in website builds:**
- Creates site architecture (pages, URL slugs, keyword map, internal linking plan)
- Writes content briefs for Scribe (per-page: keyword, word count, intent, required sections)
- Audits Builder's completed staging sites (scores every page against SEO specs)
- Gates client review: no page goes to client below 8.0/10 score

**Silas's role in ongoing SEO:**
- Monthly audits per client (Master Scorecard)
- Priority Matrix generation (what to work on next)
- Content calendar direction (topics, keywords, frequency)
- Ranking analysis using Lookout data
- Strategy adjustments based on Scout intel

---

### 3. Mozi — Strategic Sales & Marketing Advisor

| Field | Value |
|-------|-------|
| **Role** | Hormozi framework advisor. Offer design, pricing, lead gen, positioning, retention strategy. |
| **Model** | Claude Sonnet (reasoning + knowledge retrieval) |
| **Talks to** | Archer (receives strategy questions, sends recommendations) |
| **Input** | Business questions from Cody, market context |
| **Output** | Framework analysis, strategy recommendations, offer structures, action plans |
| **Key files** | mozi-system-prompt.md, mozi-knowledge-base/ (11 files) |

**Mozi advises on:**
- Grand Slam Offer design (agency packages, restaurant promotions)
- Pricing strategy (Value Equation application)
- Lead generation (Core Four framework)
- Client retention and churn prevention
- Revenue expansion and upsell strategy
- New market/service evaluation

**Mozi does NOT execute.** Recommendations route to appropriate agents via Archer.

---

### 4. Scout — Research & Intelligence

| Field | Value |
|-------|-------|
| **Role** | Data gathering, competitor analysis, market intelligence, algorithm monitoring. |
| **Model** | Claude Haiku or local model (high volume, lower complexity) |
| **Talks to** | Archer (receives research requests, sends reports) |
| **Input** | Research requests from Archer (triggered by Silas, Mozi, or Cody) |
| **Output** | Keyword data, competitor analysis, URL maps, market intelligence, algorithm update alerts |
| **Key files** | Scout AGENTS.md (on OpenClaw) |

**Scout's role in website builds:**
- Competitor site analysis (what do competitors' sites look like, what keywords do they target)
- URL mapping for site migrations (crawls old site, maps to new URLs)
- Keyword research for Silas's architecture
- Image/stock photo research for Canvas

**Scout's role in ongoing SEO:**
- Competitor monitoring (new pages, ranking changes, link building activity)
- Algorithm update detection and impact assessment
- "People Also Ask" and related search data for Scribe's content
- Local market intelligence (new competitors, market changes)

---

### 5. Canvas — Visual Design System Architect

| Field | Value |
|-------|-------|
| **Role** | Creates complete design systems and art direction for new website builds. |
| **Model** | Claude Sonnet (creative reasoning, design knowledge) |
| **Talks to** | Archer (receives project kickoffs, sends design systems) |
| **Input** | Client brand assets, business type, design preferences, competitor sites (from Scout) |
| **Output** | Design system document, page layout specs, image briefs, responsive behavior specs |
| **Key files** | canvas-system-prompt.md |

**Canvas is ONLY involved in website builds** (not ongoing SEO). After the site launches, Canvas's work is done unless a redesign is requested.

**Canvas outputs go to:**
- Builder (design system + page layouts for implementation)
- Scribe (content constraints — character limits, section lengths)
- Silas (design review request for SEO compatibility)

---

### 6. Scribe — Content Generation

| Field | Value |
|-------|-------|
| **Role** | Writes ALL content across the agency. Pages, blogs, GBP posts, bios, FAQs, citation descriptions. |
| **Model** | Claude Sonnet for pages/blogs, Haiku or local for GBP posts/short content |
| **Talks to** | Archer (receives briefs, sends structured content) |
| **Input** | Content briefs from Silas, content constraints from Canvas, client intake data |
| **Output** | Structured JSON content files (for Builder), GBP posts (for Herald), blog posts, citation content (for Citadel) |
| **Key files** | scribe-system-prompt.md |

**Scribe's role in website builds:**
- Writes all page content in structured JSON format
- Builder consumes JSON directly to populate WordPress pages
- Silas reviews Scribe's output for SEO quality before it goes to Builder

**Scribe's role in ongoing SEO:**
- GBP posts (2-3/week per client → Herald publishes)
- Blog posts (2-4/month per client → Builder/Wrench publishes)
- Content refreshes (when Silas flags declining pages)
- Citation descriptions (for Citadel submissions)
- Staff bios, FAQ additions, service page updates

---

### 7. Builder — New WordPress Site Assembly

| Field | Value |
|-------|-------|
| **Role** | Assembles new WordPress websites from design specs + content. Staging through deployment. |
| **Model** | Claude Sonnet (technical execution, WordPress knowledge) |
| **Talks to** | Archer (receives build projects, sends status updates) |
| **Input** | Canvas design system, Scribe content files, Silas architecture, client brand assets |
| **Output** | Complete WordPress sites on staging, production deployments |
| **Key files** | builder-system-prompt.md, website-build-pipeline.md |

**Builder's tools:**
- Cloudways API (create apps, manage staging, deploy, SSL)
- SSH + WP-CLI (WordPress management)
- WordPress REST API (content creation)
- SFTP (file operations)

**Builder vs. Wrench:**
- Builder creates NEW sites from scratch (website build pipeline)
- Wrench optimizes and maintains EXISTING sites (ongoing SEO)
- After Builder launches a site, Wrench takes over for ongoing changes

---

### 8. Wrench — Existing Site Optimization

| Field | Value |
|-------|-------|
| **Role** | Modifies and optimizes existing WordPress sites. Deploys ongoing changes. |
| **Model** | Claude Sonnet (WordPress technical execution) |
| **Talks to** | Archer (receives tasks from Silas's plans) |
| **Input** | Silas's optimization tasks, Scribe's new/updated content, Specs's technical directives |
| **Output** | WordPress page updates, new pages on existing sites, technical fixes |
| **Key files** | Wrench AGENTS.md (on OpenClaw) |

**Wrench handles:**
- Publishing new blog posts (from Scribe)
- Adding new service/location pages to existing sites
- Updating existing page content (content refreshes from Scribe)
- Implementing technical fixes identified by Silas/Specs
- Schema deployment directed by Specs
- Plugin updates and maintenance

**Wrench currently manages:** spectatorsbargrill.com (Spectators WordPress site)
**Wrench will manage:** all client WordPress sites after Builder launches them

---

### 9. Specs — Technical SEO

| Field | Value |
|-------|-------|
| **Role** | Technical SEO implementation. RankMath, schema, analytics, Core Web Vitals, robots.txt, sitemaps. |
| **Model** | Claude Sonnet (technical precision) |
| **Talks to** | Archer (receives tasks, sends completion reports) |
| **Input** | Builder's completed staging sites, Silas's technical requirements, Scribe's schema type recommendations |
| **Output** | Configured SEO plugins, schema markup, analytics installation, speed optimization |
| **Key files** | [specs-system-prompt.md — TO BE CREATED] |

**Specs's role in website builds (Phase 5):**
- Configure RankMath (title tags, meta descriptions, sitemaps, breadcrumbs)
- Implement schema markup (LocalBusiness, Service, FAQ, Person, etc.)
- Install and configure Google Analytics (GA4) — production only
- Connect Google Search Console — production only
- Submit XML sitemap
- Speed optimization (Core Web Vitals pass)
- Image compression verification
- Security headers

**Specs's role in ongoing SEO:**
- Schema updates when services change
- Analytics monitoring and configuration
- Search Console monitoring
- Technical audit items from Silas
- Core Web Vitals monitoring and fixes
- Indexing issue resolution

---

### 10. Herald — GBP Operations

| Field | Value |
|-------|-------|
| **Role** | Google Business Profile management. Publishing posts, managing Q&A, updating attributes. |
| **Model** | Claude Haiku or local (execution, low complexity) |
| **Talks to** | Archer (receives publishing tasks) |
| **Input** | GBP posts from Scribe (via Archer), Q&A content from Scribe, attribute updates from Silas |
| **Output** | Published GBP content, Q&A responses, attribute configurations |
| **Key files** | Herald AGENTS.md (on OpenClaw) |

**Herald handles:**
- Publishing Scribe's GBP posts on schedule
- Responding to GBP Q&A (content from Scribe)
- Updating business attributes, hours, categories
- Photo uploads to GBP
- Review response publishing (Scribe writes responses, Herald publishes)

**Herald does NOT decide what to post** — Silas determines strategy, Scribe writes content, Herald publishes.

---

### 11. Citadel — Off-Site Authority

| Field | Value |
|-------|-------|
| **Role** | Citation building, NAP audits, directory submissions, link building (non-PBN). |
| **Model** | Claude Haiku or local (high volume, systematic execution) |
| **Talks to** | Archer (receives citation/link tasks) |
| **Input** | Citation strategy from Silas, citation descriptions from Scribe, target directories |
| **Output** | Citation submissions, NAP audit reports, link placements |
| **Key files** | Citadel AGENTS.md (on OpenClaw) |

**Citadel handles:**
- Top-50 citation directory submissions per client
- Industry-specific directory submissions
- NAP consistency audits across all directories
- Aggregator submissions (Data Axle, Neustar, Foursquare)
- Non-PBN link building opportunities
- BrightLocal integration for citation management

---

### 12. Ghost — PBN Network

| Field | Value |
|-------|-------|
| **Role** | Builds and maintains private blog network sites. Deploys contextual backlinks to client sites. |
| **Model** | Claude Sonnet (needs diverse writing styles, footprint avoidance) |
| **Talks to** | Archer (receives PBN tasks from Silas's strategy) |
| **Input** | PBN strategy from Silas, expired domain prospects from Citadel, PBN content from Scribe |
| **Output** | PBN sites built and maintained, contextual backlinks deployed |
| **Key files** | Ghost AGENTS.md (on OpenClaw), SPEC-013, SPEC-014 |

**Ghost's critical rule:** PBN sites must look completely unrelated to each other and to client sites. Different themes, different hosting, different content styles, staggered publishing. Zero footprint.

---

### 13. Lookout — Tracking & Monitoring

| Field | Value |
|-------|-------|
| **Role** | Rank tracking, geo-grid scans, performance monitoring, anomaly detection. |
| **Model** | Local model or Haiku (data processing, pattern detection) |
| **Talks to** | Archer (sends data reports, alerts on anomalies) |
| **Input** | Tracking schedules from Silas, client keyword lists |
| **Output** | Ranking data, geo-grid results, SoLV/WVS scores, anomaly alerts |
| **Key files** | Lookout AGENTS.md (on OpenClaw) |

**Lookout provides data to:**
- Silas (for strategy decisions and client reporting)
- Archer (anomaly alerts that may require immediate action)
- Ledger (for per-client performance metrics)

---

### 14. Ledger — Cost & Efficiency Analysis

| Field | Value |
|-------|-------|
| **Role** | Tracks API costs, token usage, per-client profitability, system efficiency. |
| **Model** | Local model (cheapest — job is math and log analysis) |
| **Talks to** | Archer (sends cost reports, flags waste) |
| **Input** | OpenClaw token logs, API billing data, tool subscription costs |
| **Output** | Daily cost breakdowns, weekly reports, optimization recommendations |
| **Key files** | Ledger AGENTS.md (on OpenClaw) |

**Ledger reports:**
- Per-agent daily token usage and cost
- Per-client monthly cost (all agents combined)
- Waste identification (tokens burned without output)
- Model optimization recommendations (Opus tasks that could be Sonnet, etc.)
- Weekly cost summary to Cody via Telegram
- Monthly trend analysis

---

## WORKFLOW REFERENCE

These workflows define how agents coordinate for specific scenarios:

| Workflow | File | Key Agents Involved |
|----------|------|-------------------|
| Client onboarding | ghl-openclaw-workflow.md | Archer, Silas, Scout |
| Task management | task-management-system.md | Archer (Mission Control), all execution agents |
| Client approval (48hr) | client-approval-workflow.md | Archer, GHL |
| Service agreement | agreement-signing-system.md | Archer, GHL, PandaDoc, Stripe |
| Failed payment recovery | failed-payment-workflow.md | Archer, GHL, Stripe |
| Ad-hoc client requests | adhoc-request-workflow.md | Archer → appropriate agent |
| 90-day SEO playbook | 90-day-playbook.md | Silas, Scribe, Herald, Wrench, Specs, Citadel, Lookout, Scout |
| Website build pipeline | website-build-pipeline.md | Scout, Mozi, Canvas, Scribe, Builder, Specs, Silas, Archer |
| Grand Slam Offer | grand-slam-offer.md | Mozi (strategy), Archer (execution routing) |

---

## MODEL ALLOCATION

| Tier | Agents | Model | Why |
|------|--------|-------|-----|
| **Tier 1: Deep reasoning** | Silas, Mozi | Claude Sonnet | Strategy, scoring, framework application |
| **Tier 2: Creative + technical** | Canvas, Builder, Scribe (pages), Specs, Ghost | Claude Sonnet | Design, WordPress, content quality, diverse writing |
| **Tier 3: Execution** | Scout, Herald, Citadel, Wrench, Scribe (GBP) | Haiku or Sonnet | Systematic tasks, lower complexity |
| **Tier 4: Data processing** | Lookout, Ledger | Local model or Haiku | Math, logs, pattern detection |
| **Orchestrator** | Archer | Claude Sonnet | Fast routing, moderate reasoning, state management |

---

## AGENT COMMUNICATION RULES

1. **Agents never talk directly to each other.** All communication routes through Archer.
2. **Agents never talk to clients.** All client communication goes through GHL, managed by Archer + Cody.
3. **Every agent reports status in a consistent format:**
   ```
   STATUS: [Agent Name] — [Client/Task]
   Phase: [current phase]
   Progress: [X/Y or percentage]
   Blockers: [any]
   Next: [what happens next]
   ```
4. **Handoffs include everything the receiving agent needs.** No agent should have to ask for missing context.
5. **Escalation path:** Agent → Archer → Cody. Agents flag blockers to Archer. Archer resolves or escalates to Cody.
