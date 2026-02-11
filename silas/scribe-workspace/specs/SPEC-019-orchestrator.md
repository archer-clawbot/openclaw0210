# SPEC-019: Silas Orchestrator — Route 0
## Silas Engine — Operational Group
### Version 1.0 | System Architecture & Control

---

## 1. PURPOSE

This is the brain of Silas. Route 0 is the master orchestrator that receives a client intake (URL + GBP link), performs the initial crawl and audit, scores opportunities across all domains, generates a prioritized master plan, and dispatches work to the specialized routes (1–5). Without the orchestrator, each route operates in isolation and the operator must manually decide what to do, in what order, for every client.

Route 0 turns "give me a URL and GBP, I'll handle the rest" from a concept into a working system.

**Core principle:** "Audit everything, score everything, do the highest-impact work first."

---

## 2. DEPENDENCIES

Route 0 depends on ALL other specs — it reads from them to build the audit, and dispatches work to them for execution.

| Spec Group | Route | Orchestrator Interaction |
|-----------|-------|------------------------|
| SPEC-001–005 | Route 1 (GBP) | Audits GBP → dispatches optimization tasks |
| SPEC-006–010 | Route 2 (Website) | Crawls website → dispatches content/technical tasks |
| SPEC-011–014 | Route 4 (Off-Site) | Audits citations/reviews/links → dispatches building tasks |
| SPEC-015–016 | Route 5 (Tracking) | Sets up tracking → consumes data for reporting |
| SPEC-017–018 | AI/Cross-Platform | Audits LLM/platform presence → dispatches optimization |

---

## 3. SYSTEM ARCHITECTURE

### 3.1 Orchestrator Flow

```
                    ┌─────────────────────────┐
                    │     CLIENT INTAKE        │
                    │  URL + GBP Link + NAP    │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    PHASE 1: CRAWL        │
                    │  Gather raw data from    │
                    │  all accessible sources   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    PHASE 2: AUDIT        │
                    │  Score every domain      │
                    │  against spec standards   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  PHASE 3: PRIORITIZE     │
                    │  Rank opportunities by   │
                    │  impact × effort          │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  PHASE 4: DISPATCH       │
                    │  Send tasks to Routes    │
                    │  1-5 in priority order    │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  PHASE 5: MONITOR        │
                    │  Track execution status   │
                    │  + measure outcomes        │
                    └─────────────────────────┘
```

### 3.2 Orchestrator Inputs

| Input | Required | Source | Purpose |
|-------|----------|--------|---------|
| Website URL | Yes | Operator | Crawl target for website audit |
| GBP Link or Place ID | Yes | Operator | GBP audit target |
| Business Name | Yes | Auto-extract from GBP or manual | Entity matching |
| Business Address | Yes | Auto-extract from GBP or manual | NAP baseline |
| Phone Number | Yes | Auto-extract from GBP or manual | NAP baseline |
| Client Tier | Optional | Operator | Determines scope of work |
| Existing CMS | Optional | Operator or auto-detect | WordPress, HTML, Shopify, etc. |
| Target Keywords | Optional | Operator or auto-generate | Primary service keywords |
| Service Area | Optional | Auto-extract from GBP or manual | Geo-targeting scope |
| Competitor Names | Optional | Operator or auto-detect | Competitive analysis targets |

### 3.3 Orchestrator Outputs

| Output | Delivered To | Format |
|--------|-------------|--------|
| Master Audit Report | Operator + Client (SPEC-016 onboarding audit) | PDF/Markdown |
| Opportunity Scorecard | Operator | Scored matrix |
| Prioritized Action Plan | Routes 1–5 | Task queue |
| Client Project File | Internal database | JSON |
| 90-Day Roadmap | Client (SPEC-016 §7.4) | Report section |

---

## 4. PHASE 1: CRAWL

### 4.1 Website Crawl

```
Input: Client website URL

Data collection:
1. Homepage analysis:
   ☐ Title tag, meta description, H1
   ☐ Schema markup (JSON-LD)
   ☐ Canonical tag
   ☐ Core Web Vitals (via PageSpeed Insights API)
   ☐ Mobile friendliness
   ☐ SSL status
   ☐ Load time
   ☐ CMS detection (WordPress, Shopify, Wix, custom)

2. Sitemap discovery:
   ☐ robots.txt → sitemap reference
   ☐ /sitemap.xml
   ☐ XML sitemap entries → total indexable pages

3. Full site crawl (up to 500 pages):
   ☐ All internal URLs
   ☐ Per-page: title, meta desc, H1, H2s, word count, schema
   ☐ Internal link structure (orphan page detection)
   ☐ Image alt text audit
   ☐ Broken links (4xx, 5xx)
   ☐ Redirect chains (301/302)
   ☐ Duplicate content detection

4. Content inventory:
   ☐ Service pages (list all)
   ☐ Location pages (list all)
   ☐ Blog posts (list all, with dates)
   ☐ About/contact pages
   ☐ Missing pages (services without pages)
```

### 4.2 GBP Crawl

```
Input: GBP URL or Place ID

Data collection via Google Places API + manual inspection:
1. Business information:
   ☐ Business name (as displayed)
   ☐ Primary category
   ☐ Secondary categories
   ☐ Address
   ☐ Phone number
   ☐ Website URL
   ☐ Hours of operation
   ☐ Service area (if service-area business)

2. GBP content:
   ☐ Description (full text)
   ☐ Services list (all entries)
   ☐ Products tab (all entries)
   ☐ Q&A entries (all questions + answers)
   ☐ Posts (last 10, with dates)
   ☐ Photos (count, types, recency)

3. Reviews:
   ☐ Total review count
   ☐ Average rating
   ☐ Recent review velocity (reviews/month)
   ☐ Owner response rate
   ☐ Sentiment analysis of recent 20 reviews

4. Attributes:
   ☐ All GBP attributes set
   ☐ Missing recommended attributes
```

### 4.3 Citation Crawl

```
Data collection:
1. NAP consistency check across top 20 directories
   ☐ Google, Bing, Apple, Yelp, Facebook
   ☐ BBB, Angi, YellowPages, Manta, Foursquare
   ☐ Industry-specific directories (varies by vertical)

2. For each directory found:
   ☐ NAP matches? (exact comparison)
   ☐ Listing claimed?
   ☐ Listing complete?
   ☐ Duplicate listings detected?

3. Citation count:
   ☐ Total citations found
   ☐ Consistent citations (matching NAP)
   ☐ Inconsistent citations (mismatched NAP)
   ☐ Missing from key directories
```

### 4.4 Competitive Crawl

```
Data collection:
1. Identify top 5 competitors:
   ☐ Search "[primary keyword] [city]" on Google Maps
   ☐ Extract top 5 non-client businesses from results
   
2. For each competitor:
   ☐ GBP completeness (categories, services, description, photos)
   ☐ Review count and rating
   ☐ Website presence and quality (quick scan)
   ☐ Backlink profile (DR, referring domains via Ahrefs/Semrush API)
   ☐ Citation presence on top directories
```

### 4.5 LLM/Platform Presence Crawl

```
Data collection:
1. LLM visibility baseline (SPEC-017 §6):
   ☐ Query top 3 LLMs with branded and category queries
   ☐ Record mention/no-mention per platform

2. Platform presence (SPEC-018 §11.1):
   ☐ YouTube channel: exists? video count?
   ☐ Facebook page: exists? active?
   ☐ Instagram: exists? active?
   ☐ LinkedIn: company page exists?
   ☐ Apple Business Connect: claimed?
   ☐ Bing Places: claimed?
   ☐ Yelp: claimed? reviews?
```

---

## 5. PHASE 2: AUDIT & SCORING

### 5.1 Master Scorecard

Every audit area gets scored on a 0–10 scale using the standards defined in each spec.

```
SILAS MASTER SCORECARD — [Business Name]

ROUTE 1: GBP OPTIMIZATION
├── GBP Services (SPEC-001):        [ /10]
├── GBP Description (SPEC-002):     [ /10]
├── GBP Q&A (SPEC-003):             [ /10]
├── GBP Products (SPEC-004):        [ /10]
├── GBP Posting (SPEC-005):         [ /10]
└── Route 1 Average:                [ /10]

ROUTE 2: WEBSITE OPTIMIZATION
├── Location Silos (SPEC-006):      [ /10]
├── Grounding Boxes (SPEC-007):     [ /10]
├── Schema Markup (SPEC-008):       [ /10]
├── Technical SEO (SPEC-009):       [ /10]
├── On-Page Content (SPEC-010):     [ /10]
└── Route 2 Average:                [ /10]

ROUTE 4: OFF-SITE
├── Citations/NAP (SPEC-011):       [ /10]
├── Reviews (SPEC-012):             [ /10]
├── Link Authority (SPEC-013/014):  [ /10]
└── Route 4 Average:                [ /10]

ROUTE 5: TRACKING
├── Rank Tracking (SPEC-015):       [ /10]
├── Reporting Setup (SPEC-016):     [ /10]
└── Route 5 Average:                [ /10]

AI/CROSS-PLATFORM
├── LLM Visibility (SPEC-017):      [ /10]
├── Platform Presence (SPEC-018):   [ /10]
└── AI Average:                     [ /10]

═══════════════════════════════════════
OVERALL READINESS SCORE:            [ /10]
═══════════════════════════════════════
```

### 5.2 Scoring Rubric

| Score | Meaning | Typical Condition |
|-------|---------|-------------------|
| 0–2 | Non-existent / Critical | Feature not implemented at all |
| 3–4 | Minimal / Poor | Basic setup but major gaps |
| 5–6 | Below average | Partial implementation, clear improvement opportunities |
| 7–8 | Good | Solid implementation, fine-tuning needed |
| 9–10 | Excellent | Fully optimized per spec standards |

### 5.3 Scoring Criteria by Spec

**SPEC-001 (GBP Services) scoring:**
- 0: No custom services added
- 3: Generic keyword-only services
- 5: Some detailed services, some generic
- 7: All services detailed with descriptions
- 10: Every service is a micro-landing page matching high-intent long-tail queries

**SPEC-002 (GBP Description) scoring:**
- 0: Empty or auto-generated description
- 3: Basic description, no entity co-citations
- 5: Keyword-optimized but missing authority signals
- 7: Entity co-citations + credentials + geo-modifiers
- 10: Full "Local Hub Gambit" implementation with all CATALYST elements

**SPEC-008 (Schema) scoring:**
- 0: No schema markup
- 3: Basic LocalBusiness only
- 5: LocalBusiness + some Service schema
- 7: Complete LocalBusiness + Service + FAQ + sameAs
- 10: Full schema suite including VideoObject, Review, areaServed, hasOfferCatalog

**SPEC-009 (Technical SEO) scoring:**
- 0: Critical issues (no HTTPS, broken site)
- 3: HTTPS but Core Web Vitals failing, missing canonicals
- 5: CWV borderline, some technical issues
- 7: CWV passing, minor issues only
- 10: All CWV green, zero technical issues, perfect robots.txt + sitemap

(Each spec's scoring criteria follows the same pattern — detailed enough for Silas to auto-score from crawl data.)

---

## 6. PHASE 3: PRIORITIZE

### 6.1 Priority Matrix

Silas generates the action plan by scoring each opportunity on two axes:

```
Impact Score (1-5):
  5 = Directly moves Map Pack rankings within 2 weeks
  4 = High impact within 1 month
  3 = Moderate impact within 2-3 months
  2 = Low impact, long-term play
  1 = Minimal direct ranking impact

Effort Score (1-5):
  1 = < 1 hour, no external tools needed
  2 = 1-4 hours, Silas can generate deliverables
  3 = 4-8 hours, may need operator action
  4 = 8-20 hours, significant project
  5 = 20+ hours, multi-week initiative

Priority = Impact × (6 - Effort)
  Max priority = 5 × 5 = 25 (high impact, low effort)
  Min priority = 1 × 1 = 1 (low impact, high effort)
```

### 6.2 Standard Priority Stack

Based on the CATALYST 5-phase implementation order, here's the default priority stack:

```
PRIORITY TIER 1 — "Quick Wins" (Week 1-2)
Impact: 4-5 | Effort: 1-2 | Priority Score: 15-25
├── GBP description rewrite (SPEC-002)
├── GBP services expansion (SPEC-001)
├── GBP Q&A seeding (SPEC-003)
├── GBP products tab setup (SPEC-004)
├── Schema markup deployment (SPEC-008)
├── Critical technical SEO fixes (SPEC-009)
└── Review response protocol activation (SPEC-012)

PRIORITY TIER 2 — "Foundation" (Week 2-4)
Impact: 3-4 | Effort: 2-3 | Priority Score: 9-16
├── GBP posting cadence started (SPEC-005)
├── Citation audit + submissions (SPEC-011)
├── On-page content optimization (SPEC-010)
├── Geo-grid tracking setup (SPEC-015)
└── Grounding box deployment (SPEC-007)

PRIORITY TIER 3 — "Architecture" (Month 2)
Impact: 3-4 | Effort: 3-4 | Priority Score: 6-12
├── Semantic location silo creation (SPEC-006)
├── Cross-platform presence setup (SPEC-018)
├── YouTube channel + first videos (SPEC-018 §4)
├── LLM visibility optimization (SPEC-017)
└── Client reporting system live (SPEC-016)

PRIORITY TIER 4 — "Authority" (Month 2-3)
Impact: 3-5 | Effort: 4-5 | Priority Score: 3-10
├── Expired domain prospecting (SPEC-013)
├── PBN deployment (SPEC-014)
├── Parasite SEO content (SPEC-018 §7)
└── Advanced competitive displacement

PRIORITY TIER 5 — "Ongoing" (Continuous)
├── Weekly GBP posts (SPEC-005)
├── Weekly geo-grid scans (SPEC-015)
├── Monthly reporting (SPEC-016)
├── Review management (SPEC-012)
├── Content refresh and expansion
└── Quarterly LLM visibility retests (SPEC-017)
```

### 6.3 Dynamic Priority Adjustment

Silas adjusts the default stack based on audit results:

```
IF audit reveals GBP is already 8+/10:
  → Deprioritize Route 1 tasks, move to Route 2
  
IF website has zero schema:
  → Elevate SPEC-008 to Priority Tier 1

IF review count < 50 or rating < 4.0:
  → Elevate SPEC-012 review generation to Tier 1
  
IF competitor analysis shows link gap > 50 DR:
  → Elevate SPEC-013/014 to Tier 2

IF Core Web Vitals all failing:
  → Elevate SPEC-009 to Tier 1 (blocking issue)

IF no location silo pages exist:
  → Elevate SPEC-006 to Tier 2 (big keyword opportunity)
```

---

## 7. PHASE 4: DISPATCH

### 7.1 Task Queue Structure

Each dispatched task follows this structure:

```json
{
  "task_id": "TSK-2026-001",
  "client_id": "spectators-lp",
  "spec": "SPEC-002",
  "route": 1,
  "priority_tier": 1,
  "priority_score": 25,
  "title": "Rewrite GBP description with Local Hub Gambit",
  "description": "Current description is generic (scored 3/10). Rewrite using entity co-citation strategy with local supplier, builder, and association mentions per SPEC-002 §4.",
  "inputs": {
    "current_description": "[crawled text]",
    "target_keywords": ["service keyword", "city"],
    "entity_candidates": ["local supplier", "association", "landmark"]
  },
  "expected_output": "700-character GBP description ready to paste",
  "output_type": "copy",
  "requires_operator": false,
  "requires_access": "GBP edit access",
  "estimated_time": "30 minutes (Silas generates) + 5 minutes (operator pastes)",
  "status": "pending",
  "created_at": "2026-02-06T08:00:00Z",
  "completed_at": null,
  "outcome": null
}
```

### 7.2 Dispatch Rules

```
Automatic dispatch (Silas executes without operator):
- Content generation (descriptions, Q&A, posts, schema markup)
- Audit report generation
- Tracking setup and data collection
- Report generation
- Competitive analysis

Operator-required dispatch (Silas generates, operator executes):
- GBP edits (requires GBP login)
- Website changes (requires CMS access)
- Citation submissions (some require manual accounts)
- Domain purchases (requires payment)
- Review response posting
- Social media posting (requires account access)

Operator-approval dispatch (Silas recommends, operator approves):
- PBN deployment strategy
- Expired domain purchases
- Content strategy changes
- Budget allocation changes
```

### 7.3 Task Status Tracking

| Status | Meaning |
|--------|---------|
| `pending` | Task created, awaiting execution |
| `in_progress` | Currently being worked on |
| `generated` | Silas generated deliverables, awaiting operator action |
| `operator_action` | Waiting for operator to execute (paste, publish, submit) |
| `completed` | Task fully executed |
| `verified` | Outcome verified (e.g., rank improvement measured) |
| `blocked` | Cannot proceed (missing access, budget, approval) |
| `deferred` | Postponed to future sprint |

---

## 8. PHASE 5: MONITOR

### 8.1 Execution Dashboard

```
CLIENT: [Business Name]
OVERALL SCORE: [X/10] → TARGET: [Y/10]
SPRINT: Month 1, Week 2

TASK STATUS:
├── Completed:    12 tasks ████████████
├── In Progress:   3 tasks ███
├── Pending:       8 tasks ████████
├── Blocked:       1 task  █
└── Total:        24 tasks

ROUTE STATUS:
├── Route 1 (GBP):      [7/10] ↑ from [3/10]  ████████▒▒
├── Route 2 (Website):   [4/10] ↑ from [2/10]  █████▒▒▒▒▒
├── Route 4 (Off-Site):  [5/10] ↑ from [4/10]  ██████▒▒▒▒
├── Route 5 (Tracking):  [8/10] ↑ from [0/10]  █████████▒
└── AI/Cross-Platform:   [3/10] ↑ from [1/10]  ████▒▒▒▒▒▒

NEXT ACTIONS:
1. [Task title] — Route [X] — [Status]
2. [Task title] — Route [X] — [Status]
3. [Task title] — Route [X] — [Status]
```

### 8.2 Outcome Tracking

After each task is completed, Silas tracks whether it produced measurable results:

```
For each completed task:
1. Record completion date
2. Set measurement window:
   - GBP changes: check after 7 days
   - Content changes: check after 14-28 days
   - Link building: check after 30-60 days
   - Citations: check after 14-30 days
3. At measurement window:
   - Pull geo-grid data (SPEC-015)
   - Compare SoLV/WVS before vs. after
   - Compare position at affected grid points
   - Record attribution (SPEC-015 §15.2)
4. Update task record with outcome data
5. Feed into optimization loop:
   - Tasks that moved rankings → do more of this
   - Tasks that had no impact → investigate why
   - Tasks that hurt rankings → roll back if possible
```

### 8.3 Client Health Score

Silas maintains a rolling health score per client:

```
Health Score = Weighted average of:
  - Route scores (from master scorecard): 40%
  - Task completion rate: 20%
  - Rank trajectory (improving/stable/declining): 20%
  - Client engagement (viewing reports, responding): 10%
  - Risk factors (suspension threat, competitor surge): 10%

Health levels:
  90-100: Thriving — maintenance mode
  75-89:  Healthy — steady optimization
  60-74:  Needs attention — accelerate priority tasks
  40-59:  At risk — operator intervention needed
  <40:    Critical — emergency diagnostic required
```

---

## 9. MULTI-CLIENT ORCHESTRATION

### 9.1 Client Portfolio Management

```
For 20 SEO clients, Silas maintains:
1. Individual client project files (audit, scores, task queue)
2. Portfolio-level dashboard:
   - All clients ranked by health score
   - Clients needing attention (declining scores)
   - Aggregate task completion rate
   - Budget allocation across clients
   - Upcoming deadlines (reports, QBRs)

3. Resource allocation:
   - API budget distribution (SerpAPI, Claude, etc.)
   - Operator time allocation (which clients need manual work)
   - Content production queue (which clients need new content)
```

### 9.2 Batch Operations

```
Silas can batch operations across clients:

Weekly batch:
- Run geo-grid scans for all clients (staggered across weekdays)
- Generate weekly pulse reports for all clients
- Check anomaly alerts across portfolio

Monthly batch:
- Generate monthly reports for all clients
- Run citation consistency checks
- Update competitive analysis
- Refresh LLM visibility tests
- Audit cross-platform presence

Quarterly batch:
- Full re-audit for all clients (re-run Phase 1+2)
- Update priority stacks based on new scores
- Generate QBR materials for premium clients
- Strategic planning for next quarter
```

### 9.3 Operator Notification System

```
Silas sends operator (via Telegram) the following:

Daily (if applicable):
- Anomaly alerts for any client
- Tasks requiring operator action

Weekly (Monday morning):
- Portfolio health summary
- Top 5 tasks needing operator attention
- Budget status

Monthly (1st of month):
- Report generation summary
- Portfolio score changes
- Client engagement metrics
```

---

## 10. INTAKE QUESTIONNAIRE DESIGN

### 10.1 Web App Intake Flow

When Silas is deployed as a web app (per the architecture discussion), the intake follows this flow:

```
STEP 1: SITE TYPE
  ○ Pre-existing website
  ○ Build new website
  
  IF Pre-existing:
    → URL: [____________]
    → CMS: ○ WordPress ○ Shopify ○ Wix ○ Squarespace ○ Custom HTML ○ Other
    → Admin access available? ○ Yes ○ No
    
  IF New build:
    → Target domain: [____________]
    → Design preferences: [____________]
    → Number of pages needed: [____________]

STEP 2: GOOGLE BUSINESS PROFILE
  → GBP Link or Business Name: [____________]
  → [AUTO-POPULATE from Google Places API]:
    ☑ Business Name: [pre-filled]
    ☑ Address: [pre-filled]
    ☑ Phone: [pre-filled]
    ☑ Hours: [pre-filled]
    ☑ Categories: [pre-filled]
    ☑ Review count: [pre-filled]
    ☑ Rating: [pre-filled]
  → Verify/correct any auto-populated fields

STEP 3: SERVICES & KEYWORDS
  → Primary service category: [____________]
  → Top 5 services offered: [list]
  → Target keywords (if known): [list]
  → Service area radius: [____________]
  → Key neighborhoods/cities served: [list]

STEP 4: COMPETITIVE CONTEXT
  → Known competitors (if any): [list]
  → Biggest competitive advantage: [____________]
  → Key certifications/credentials: [list]
  → Years in business: [____________]

STEP 5: GOALS & BUDGET
  → Primary goal: ○ More calls ○ More foot traffic ○ More leads ○ Brand awareness
  → Client tier: ○ Starter ○ Standard ○ Premium ○ Enterprise
  → Monthly retainer: [____________]
  → Specific areas of concern: [free text]

STEP 6: ACCESS & PERMISSIONS
  → GBP access: ○ Owner ○ Manager ○ Need to request
  → Website access: ○ Admin ○ Editor ○ No access
  → Google Search Console: ○ Connected ○ Need to set up
  → Google Analytics: ○ Connected ○ Need to set up
  → Social media accounts: [list with access status]
```

### 10.2 Auto-Population from GBP

When the operator enters a GBP link or business name:

```
1. Extract Place ID from URL
2. Call Google Places API (Details endpoint)
3. Parse response:
   - name → Business Name
   - formatted_address → Address
   - formatted_phone_number → Phone
   - opening_hours → Hours
   - types → Categories
   - rating → Rating
   - user_ratings_total → Review Count
   - website → Website URL
   - geometry.location → Lat/Lng (for geo-grid center)
4. Pre-fill intake form fields
5. Operator verifies and corrects
```

This eliminates the biggest friction point in onboarding — typing the same information the GBP already contains.

---

## 11. ORCHESTRATOR CONFIGURATION

### 11.1 Route Activation Rules

Based on intake answers, routes auto-activate:

| Intake Answer | Routes Activated | Notes |
|--------------|-----------------|-------|
| Pre-existing site + GBP | Route 1, 2, 4, 5 | Standard full optimization |
| New site build + GBP | Route 1, 3*, 4, 5 | Route 3 = sub-mode of Route 2 |
| GBP only (no website) | Route 1, 4, 5 | Limited scope, recommend website build |
| Website only (no GBP) | Route 2, 5 | Limited scope, recommend GBP claim |

*Route 3 (new site build) is a sub-mode of Route 2 — same spec foundation but different starting point.

### 11.2 System Prompt Integration

The orchestrator's behavior is defined by its system prompt, which contains:

```
Layer 1: Identity and behavior rules
  - Who Silas is (autonomous SEO agent)
  - Decision-making framework
  - Communication style with operator
  - Escalation rules

Layer 2: CATALYST playbook (condensed)
  - Priority stack defaults
  - Scoring rubrics
  - Phase sequence

Layer 3: Intake processor
  - How to parse URL + GBP
  - What to crawl and in what order
  - Output format for audit report
```

---

## 12. ERROR HANDLING

### 12.1 Common Failure Modes

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Website unreachable | HTTP error on crawl | Alert operator, skip website audit, proceed with GBP/off-site |
| GBP not found | Places API returns no results | Ask operator to verify link/business name |
| API rate limit | 429 response from any API | Queue and retry with exponential backoff |
| Incomplete crawl | <80% of expected pages crawled | Re-crawl missing sections, flag incomplete audit |
| Access denied | CMS login required for changes | Queue task as "operator_action" |
| Budget exceeded | API cost tracking exceeds threshold | Pause non-critical tasks, alert operator |
| Conflicting NAP data | Different NAP across sources | Flag for operator decision (which is correct?) |

### 12.2 Escalation Protocol

```
Level 1 (Silas handles autonomously):
- Retry failed API calls
- Skip unavailable data sources
- Use cached data if fresh data unavailable
- Generate partial report with available data

Level 2 (Alert operator, continue working):
- Access credentials needed
- Budget threshold warning
- Incomplete data flagged in report
- Competitor data unavailable

Level 3 (Alert operator, stop and wait):
- GBP suspension detected
- Website completely down
- NAP conflict requiring human judgment
- Budget exhausted
- Client account issues
```

---

## 13. GLOSSARY

| Term | Definition |
|------|-----------|
| **Orchestrator** | Route 0 — the master controller that coordinates all other routes |
| **Crawl** | Automated data collection from website, GBP, citations, and competitors |
| **Audit** | Scoring all collected data against spec standards |
| **Master Scorecard** | Comprehensive scoring matrix across all specs (0-10 per area) |
| **Priority Matrix** | Impact × Effort calculation for ranking tasks |
| **Dispatch** | Sending prioritized tasks to the appropriate route for execution |
| **Task Queue** | Ordered list of tasks awaiting execution |
| **Client Health Score** | Rolling aggregate metric indicating overall client status |
| **Intake** | Client onboarding data collection process |
| **Sprint** | Time-boxed work period (typically 1 week or 2 weeks) |

---

## 14. CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial specification — complete orchestrator system |

---

*End of SPEC-019*
