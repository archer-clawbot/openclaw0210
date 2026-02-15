# AGENT INTEGRATION & COORDINATION

This document maps how agents work together, who hands off to whom, and what information flows between agents.

---

## COORDINATION PRINCIPLES

1. **Archer is the hub.** Agents do NOT talk directly to each other. All coordination flows through Archer.
2. **Handoff docs are mandatory.** When Agent A completes work that Agent B will implement, Agent A creates a handoff document.
3. **Deliverables folder is the source of truth.** Agents read from `deliverables/{client-slug}/{agent}/` to find outputs from other agents.
4. **Context is everything.** When Archer routes Task 2 (depends on Task 1), Archer provides Task 1's deliverable location to Agent 2.

---

## COMMON WORKFLOWS

### Workflow 1: Full CATALYST Audit → Implementation

**Trigger:** "Run a full CATALYST audit on {client} and implement fixes"

**Coordination:**

```
1. Archer → Silas: "Run CATALYST audit on {client}"
   └─ Silas delivers: `deliverables/{client}/silas/YYYY-MM-DD-catalyst-audit.md`

2. Archer reads Silas's audit → identifies handoffs:
   - Content gaps → Scribe
   - On-page SEO → Wrench
   - Schema missing → Specs
   - GBP issues → Herald
   - NAP inconsistencies → Citadel

3. Archer → Scribe: "Create content for {pages listed in Silas's audit}. Context: {link to audit}"
   └─ Scribe delivers: `deliverables/{client}/scribe/YYYY-MM-DD-service-pages.md`

4. Archer → Wrench: "Deploy content from Scribe. Context: {link to Scribe's deliverable}"
   └─ Wrench deploys content, confirms live

5. Archer → Specs: "Create schema per Silas's recommendations. Context: {link to audit}"
   └─ Specs delivers: `deliverables/{client}/specs/YYYY-MM-DD-schema-handoff.md`

6. Archer → Wrench: "Implement schema from Specs. Context: {link to Specs' handoff}"
   └─ Wrench deploys schema, validates with Rich Results Test

7. Archer → Herald: "Optimize GBP listing per Silas's audit. Context: {link to audit}"
   └─ Herald updates GBP, reports completion

8. Archer → Citadel: "Fix NAP inconsistencies per Silas's audit. Context: {link to audit}"
   └─ Citadel updates directories, delivers NAP audit

9. Archer → Lookout: "Start tracking rankings for {keywords from audit}"
   └─ Lookout begins weekly monitoring

10. Archer → Cody: "CATALYST audit complete. All fixes implemented. Summary: {link to rollup}"
```

**Key Handoffs:**
- Silas → Scribe (content creation)
- Silas → Wrench (on-page optimization)
- Silas → Specs (technical SEO)
- Silas → Herald (GBP)
- Silas → Citadel (citations)
- Scribe → Wrench (content deployment)
- Specs → Wrench (schema deployment)

---

### Workflow 2: GBP Post Campaign

**Trigger:** "Write and publish 4 GBP posts for {client}"

**Coordination:**

```
1. Archer → Scribe: "Write 4 GBP posts for {client}. Types: 2 offers, 2 updates. Context: {client voice from Scribe's MEMORY.md}"
   └─ Scribe delivers: `deliverables/{client}/scribe/YYYY-MM-DD-gbp-posts.md`

2. Archer → Herald: "Publish GBP posts from Scribe. Context: {link to Scribe's deliverable}"
   └─ Herald publishes posts to GBP, screenshots confirmation

3. Archer → Cody: "4 GBP posts published for {client}. Live on GBP."
```

**Key Handoffs:**
- Scribe → Herald (GBP posts)

---

### Workflow 3: Schema Implementation (Full Deployment)

**Trigger:** "Do schema on {client site}"

**Coordination:**

```
1. Archer → Silas: "Audit {client} for schema opportunities. Create schema handoff doc."
   └─ Silas delivers: `deliverables/{client}/silas/YYYY-MM-DD-schema-handoff.md`

2. Archer → Specs: "Create schema markup per Silas's handoff. Context: {link to handoff}"
   └─ Specs delivers: `deliverables/{client}/specs/YYYY-MM-DD-schema-implementation.md`

3. Archer → Wrench: "Deploy schema from Specs. Context: {link to Specs' deliverable}"
   └─ Wrench deploys schema via Code Snippets or RankMath, validates with Rich Results Test

4. Archer → Cody: "Schema deployed on {client}. Validated. No errors."
```

**Key Handoffs:**
- Silas → Specs (schema requirements)
- Specs → Wrench (schema markup)

---

### Workflow 4: CRO Audit → Optimization

**Trigger:** "Run a CRO audit on {client} homepage and implement fixes"

**Coordination:**

```
1. Archer → Razor: "CRO audit on {client} homepage. Pull GA4/GSC data, analyze conversion funnel."
   └─ Razor delivers: `deliverables/{client}/razor/YYYY-MM-DD-cro-audit.md`

2. Archer reads Razor's audit → identifies handoffs:
   - Copy changes (headlines, CTAs) → Scribe
   - Form optimization → Wrench
   - Page speed issues → Specs

3. Archer → Scribe: "Rewrite homepage headline per Razor's recommendations. Context: {link to audit}"
   └─ Scribe delivers: `deliverables/{client}/scribe/YYYY-MM-DD-homepage-headline.md`

4. Archer → Wrench: "Deploy headline from Scribe + reduce contact form fields per Razor's audit. Context: {links}"
   └─ Wrench deploys changes, tests on staging, pushes to production

5. Archer → Specs: "Fix page speed issues per Razor's audit (compress hero image). Context: {link to audit}"
   └─ Specs delivers optimization handoff

6. Archer → Wrench: "Implement page speed fixes from Specs. Context: {link to handoff}"
   └─ Wrench implements, re-runs PageSpeed Insights

7. Archer → Razor: "Changes deployed. Monitor conversion rate for 7 days."
   └─ Razor tracks conversion rate, reports back if improvement detected

8. Archer → Cody: "CRO audit complete. Changes deployed. Razor monitoring conversion impact."
```

**Key Handoffs:**
- Razor → Scribe (copy changes)
- Razor → Wrench (form/UX changes)
- Razor → Specs (technical performance fixes)
- Scribe → Wrench (copy deployment)
- Specs → Wrench (performance optimization deployment)

---

### Workflow 5: Rank Drop Investigation

**Trigger:** Lookout detects ranking drop → automatic escalation

**Coordination:**

```
1. Lookout detects anomaly (keyword dropped 8 positions)
   └─ Lookout delivers: `deliverables/{client}/lookout/YYYY-MM-DD-anomaly-alert.md`

2. Archer → Lookout alert received → routes investigation

3. Archer → Silas: "Investigate ranking drop for {client} - {keyword}. Context: {link to Lookout's alert}"
   └─ Silas audits affected page, checks for:
      - On-page changes
      - Technical issues
      - Competitor movement
      - Algorithm updates
   └─ Silas delivers: `deliverables/{client}/silas/YYYY-MM-DD-rank-drop-analysis.md`

4. Archer reads Silas's analysis → routes fixes:
   - If technical issue → Specs
   - If on-page issue → Wrench
   - If content gap → Scribe
   - If competitor outranked → Silas (strategy update)

5. Archer → Cody: "Rank drop investigated. Cause: {X}. Fix in progress: {Agent Y working on it}."

6. After fix deployed:
   Archer → Lookout: "Monitor {keyword} for recovery over next 2 weeks."
```

**Key Handoffs:**
- Lookout → Silas (anomaly investigation)
- Silas → Specs/Wrench/Scribe (fix implementation)
- Wrench/Specs/Scribe → Lookout (monitor post-fix)

---

### Workflow 6: Client Onboarding (Full Stack)

**Trigger:** "Onboard new client: {Client Name}"

**Coordination:**

```
1. Archer → Silas: "Create onboarding scorecard for {client}. Website: {URL}."
   └─ Silas delivers: `deliverables/{client}/silas/YYYY-MM-DD-onboarding-scorecard.md`

2. Archer → Citadel: "Run NAP audit for {client}. NAP: {provided by Cody}"
   └─ Citadel delivers: `deliverables/{client}/citadel/YYYY-MM-DD-nap-audit.md`

3. Archer → Herald: "Optimize {client} GBP listing. Context: {GBP URL}"
   └─ Herald updates GBP (categories, attributes, hours, photos)

4. Archer → Specs: "Set up GA4 and GSC for {client}. Website: {URL}."
   └─ Specs configures analytics, submits sitemap

5. Archer → Lookout: "Start tracking rankings for {client}. Keywords: {from Silas's scorecard}"
   └─ Lookout begins weekly monitoring

6. Archer → Ledger: "Set up cost tracking for {client}. Monthly retainer: ${X}."
   └─ Ledger creates client cost profile

7. Archer → Cody: "Client onboarding complete. Scorecard: {link}. Monitoring active."
```

**Key Handoffs:**
- Silas → Lookout (keywords to track)
- Silas → Specs (technical setup priorities)
- Citadel → Herald (NAP to use in GBP)
- Cody → Ledger (retainer amount for profitability tracking)

---

## AGENT-TO-AGENT HANDOFF MATRIX

| From Agent | To Agent | What's Handed Off | Format |
|------------|----------|-------------------|--------|
| **Silas** | Scribe | Content requirements (pages to write, keywords, structure) | Handoff doc in deliverables |
| **Silas** | Wrench | On-page optimization tasks (title tags, meta, internal links) | Handoff doc in deliverables |
| **Silas** | Specs | Technical SEO tasks (schema, RankMath config, CWV fixes) | Handoff doc in deliverables |
| **Silas** | Herald | GBP optimization tasks (categories, attributes, posts) | Handoff doc in deliverables |
| **Silas** | Citadel | Citation tasks (NAP audit, directory submissions) | Handoff doc in deliverables |
| **Silas** | Lookout | Keywords to track | Keyword list in audit |
| **Scribe** | Wrench | Content to deploy (service pages, blog posts, copy) | Content file in deliverables |
| **Scribe** | Herald | GBP posts to publish | Post file in deliverables |
| **Specs** | Wrench | Schema markup to deploy, technical fixes to implement | Handoff doc in deliverables |
| **Razor** | Scribe | Copy changes (headlines, CTAs, form labels) | CRO audit with recommendations |
| **Razor** | Wrench | Form/UX changes (field removal, button placement) | CRO audit with recommendations |
| **Razor** | Specs | Technical performance fixes (image compression, CWV) | CRO audit with recommendations |
| **Lookout** | Silas | Anomalies to investigate (rank drops, traffic changes) | Anomaly alert in deliverables |
| **Lookout** | Archer | Weekly rank reports, anomaly alerts | Report in deliverables |
| **Ledger** | Archer | Cost alerts, profitability reports | Report in deliverables |
| **Ledger** | Cody | Monthly burn rate, client profitability | Report in deliverables |

---

## DELIVERABLE NAMING CONVENTIONS

**Standard Format:**
```
deliverables/{client-slug}/{agent-id}/{YYYY-MM-DD}-{description}.md
```

**Examples:**
- `deliverables/spectators/silas/2026-02-14-catalyst-audit.md`
- `deliverables/spectators/scribe/2026-02-14-gbp-posts.md`
- `deliverables/spectators/wrench/2026-02-14-schema-deployed.md`
- `deliverables/spectators/lookout/2026-02-14-rank-report.md`

**Special Cases:**
- Non-client work: `deliverables/_system/{agent-id}/...`
- Multi-client reports: `deliverables/_system/ledger/2026-02-14-monthly-burn-rate.md`

---

## INFORMATION FLOW EXAMPLES

### Example 1: Content Creation → Deployment

**Archer coordinates:**
```
1. Archer → Scribe: 
   "Write service page content for /services/emergency-plumbing.
    Target keyword: 'emergency plumber Houston'
    Word count: 800-1200
    Context: Silas's handoff doc at deliverables/houston-plumber/silas/2026-02-14-content-brief.md"

2. Scribe reads Silas's handoff → writes content → delivers to:
   deliverables/houston-plumber/scribe/2026-02-14-emergency-plumbing-page.md

3. Archer → Wrench:
   "Deploy service page content from Scribe.
    Content file: deliverables/houston-plumber/scribe/2026-02-14-emergency-plumbing-page.md
    Target URL: houstonplumber.com/services/emergency-plumbing"

4. Wrench reads Scribe's file → deploys to WordPress → tests → confirms live
```

**Key:** Archer provides explicit file paths so agents know where to read context.

---

### Example 2: Schema Creation → Deployment

**Archer coordinates:**
```
1. Archer → Specs:
   "Create LocalBusiness schema for Houston Plumber.
    Requirements from Silas: deliverables/houston-plumber/silas/2026-02-14-schema-requirements.md
    NAP: {provided by Cody}"

2. Specs reads Silas's requirements → creates JSON-LD schema → delivers handoff to:
   deliverables/houston-plumber/specs/2026-02-14-schema-implementation.md

3. Archer → Wrench:
   "Deploy schema from Specs.
    Schema handoff: deliverables/houston-plumber/specs/2026-02-14-schema-implementation.md
    Method: Code Snippets plugin"

4. Wrench reads Specs' handoff → implements schema → validates → confirms deployed
```

---

### Example 3: CRO Audit → Multi-Agent Implementation

**Archer coordinates:**
```
1. Archer → Razor:
   "CRO audit on Spectators homepage.
    URL: spectatorsbargrill.com
    Focus: Conversion funnel, form friction, page speed"

2. Razor audits → delivers:
   deliverables/spectators/razor/2026-02-14-cro-audit.md
   
   Recommendations:
   - Rewrite headline (Scribe)
   - Reduce contact form from 8 to 4 fields (Wrench)
   - Compress hero image (Specs → Wrench)

3. Archer → Scribe:
   "Rewrite homepage headline per Razor's CRO audit.
    Audit: deliverables/spectators/razor/2026-02-14-cro-audit.md
    Provide 3 headline variations."

4. Scribe delivers: deliverables/spectators/scribe/2026-02-14-homepage-headline.md

5. Archer → Specs:
   "Compress homepage hero image per Razor's audit.
    Current: 2.3 MB → Target: < 200 KB
    Convert to WebP if possible."

6. Specs delivers optimization instructions: deliverables/spectators/specs/2026-02-14-image-optimization.md

7. Archer → Wrench:
   "Deploy 3 changes:
    1. Headline from Scribe: deliverables/spectators/scribe/2026-02-14-homepage-headline.md (use variation 1)
    2. Reduce contact form to 4 fields per Razor's audit
    3. Implement image optimization from Specs: deliverables/spectators/specs/2026-02-14-image-optimization.md"

8. Wrench deploys all changes → tests → confirms live

9. Archer → Razor:
   "Changes deployed. Monitor homepage conversion rate for 7 days."
```

**Key:** Multiple agents contribute, but Archer sequences and coordinates all handoffs.

---

## COORDINATION ANTI-PATTERNS (AVOID)

❌ **Agents messaging each other directly**
- Agents should NEVER use `sessions_send` to contact other agents
- All coordination flows through Archer

❌ **Agents guessing what another agent meant**
- If a handoff doc is unclear, escalate to Archer for clarification

❌ **Agents executing outside their domain**
- Scribe should NOT deploy content (that's Wrench)
- Wrench should NOT create schema (that's Specs)
- Specs should NOT write copy (that's Scribe)

❌ **Archer doing specialist work**
- Archer routes, doesn't execute
- If Archer catches itself writing content/code, STOP and route

---

## WEEKLY STANDUP COORDINATION

**Every Sunday 9am CST:**

```
1. Archer spawns:
   - Silas (session: silas-standup)
   - Lookout (session: lookout-standup)
   - Ledger (session: ledger-standup)

2. Each agent reviews their MEMORY.md + deliverables folder → reports:
   - Silas: SEO patterns across all clients, recurring issues, strategy insights
   - Lookout: Ranking trends, anomalies, traffic patterns
   - Ledger: Cost trends, profitability alerts, budget concerns

3. Archer synthesizes reports → creates unified rollup:
   deliverables/_system/archer/2026-02-16-weekly-rollup.md

4. Archer → Cody (Telegram):
   "Weekly rollup ready. Key insights: {summary}. Full report: {link}."
```

**Purpose:**
- Surface cross-agent insights (e.g., "Lookout sees rank drop + Ledger sees cost spike for same client")
- Proactive issue detection
- Weekly accountability and pattern recognition

---

## INTEGRATION TESTING CHECKLIST

When testing multi-agent workflows:

- [ ] Agent A completes task → deliverable saved to correct path
- [ ] Archer reads Agent A's deliverable → extracts relevant info
- [ ] Archer routes to Agent B with context (link to Agent A's deliverable)
- [ ] Agent B reads Agent A's deliverable → executes based on that context
- [ ] Agent B delivers output → Archer confirms completion
- [ ] End-to-end: Operator request → final deliverable (no manual intervention)

**Example Test:**
```
Trigger: "Write and publish a GBP post for Spectators"

Expected Flow:
1. Archer → Scribe (write post)
2. Scribe → deliverables/spectators/scribe/YYYY-MM-DD-gbp-post.md
3. Archer → Herald (publish post, context: Scribe's file)
4. Herald → reads Scribe's file → publishes to GBP
5. Herald → confirms published (screenshot)
6. Archer → Cody: "GBP post published. Screenshot: {link}"
```

Pass criteria: No manual steps, Archer never writes content, Herald never writes content.

---

**Integration is coordination, not collaboration. Agents don't work together — Archer makes them work in sequence.**
