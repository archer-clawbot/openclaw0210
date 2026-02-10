# SPEC-016: Client Reporting System
## Silas Engine — Route 5: Tracking, CTR & Reporting Pipeline
### Version 1.0 | Tracking & Reporting Group

---

## 1. PURPOSE

This specification defines how Silas transforms raw tracking data, optimization logs, and competitive intelligence into polished, white-labeled client reports. Reporting is the revenue justification layer — without it, clients can't see the value of the work, and agencies can't defend their retainer. Every optimization from SPEC-001 through SPEC-015 ultimately feeds into this output.

**Core principle:** "A report that doesn't lead to a decision or defend the retainer is wasted effort."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-015: Geo-Grid Rank Tracking | Primary data source for all rank metrics (SoLV, WVS, heat maps) |
| SPEC-001–005: GBP Optimization | Optimization activity log entries |
| SPEC-006: Semantic Location Silo | Content deployment tracking |
| SPEC-007: Grounding Box Offensive | AI Overview capture rate data |
| SPEC-008: Schema & Structured Data | Rich result eligibility tracking |
| SPEC-009: Technical SEO Foundation | Core Web Vitals + crawl health data |
| SPEC-010: On-Page Content Optimization | Content quality scores + page-level metrics |
| SPEC-011: Citation Building & NAP | Citation count + NAP consistency score |
| SPEC-012: Review Management | Review count, rating, velocity, sentiment |
| SPEC-013: Expired Domain Acquisition | Domain acquisitions + link deployment log |
| SPEC-014: Local PBN Architecture | PBN content publishing schedule |

---

## 3. REPORT TYPES

### 3.1 Report Portfolio

| Report | Audience | Frequency | Delivery | Purpose |
|--------|----------|-----------|----------|---------|
| Weekly Pulse | Internal (agency) | Weekly | Email/Slack | Operational awareness — what changed, what needs attention |
| Monthly Client Report | Client stakeholder | Monthly | PDF + dashboard link | Value demonstration — what we did, what improved, what's next |
| Quarterly Business Review | Client decision-maker | Quarterly | PDF + live presentation | Strategic overview — ROI, competitive position, roadmap |
| Onboarding Audit | Client (new) | Once | PDF | Baseline assessment — current state, opportunities, plan |
| Anomaly Alert | Internal + client (optional) | As needed | Email/Slack | Urgent notification — significant rank change or issue |
| Competitive Intelligence | Internal (agency) | Monthly | PDF/Dashboard | Competitor monitoring — who's gaining, who's declining |

### 3.2 Report Generation Priority

```
Silas report generation order:
1. Anomaly alerts (immediate — triggered by SPEC-015 anomaly detection)
2. Weekly pulse (automated every Monday)
3. Monthly client report (1st–3rd of each month for previous month)
4. Quarterly business review (first week of Q start month)
5. Competitive intelligence (mid-month)
6. Ad-hoc reports (on operator request)
```

---

## 4. MONTHLY CLIENT REPORT — MASTER TEMPLATE

This is the primary deliverable. Everything else is a derivative or subset.

### 4.1 Report Structure

```
Page 1:  Cover Page
Page 2:  Executive Summary (1 page max)
Page 3:  Key Performance Metrics Dashboard
Page 4:  Geo-Grid Heat Map — Primary Keyword
Page 5:  SoLV & Weighted Visibility Score Analysis
Page 6:  Rank Trend Charts (Week-over-Week)
Page 7:  Competitive Landscape
Page 8:  Work Completed This Month
Page 9:  Google Business Profile Performance
Page 10: Website Performance (if applicable)
Page 11: Reviews & Reputation Snapshot
Page 12: Next Month Action Plan
Page 13: Appendix — Full Data Tables (optional)
```

### 4.2 Section Specifications

---

#### Section 1: Cover Page

| Element | Content |
|---------|---------|
| Agency logo | White-labeled — use operator's agency branding |
| Report title | "Local SEO Performance Report" |
| Client business name | Auto-populated from client profile |
| Reporting period | "January 2026" (dynamic) |
| Location(s) covered | "123 Main St, Fort Lauderdale, FL" |
| Report date | Auto-generated |
| Prepared by | Agency name |

**Design notes:**
- Clean, minimal — no clutter
- Agency brand colors
- Professional typography
- No Silas/AI branding (white-label)

---

#### Section 2: Executive Summary

**Purpose:** Client reads this and nothing else? They should still understand the situation.

**Template:**

```
EXECUTIVE SUMMARY

This month, [Business Name] saw [improvement/stability/decline] in local search visibility 
for [primary keyword]. Your Share of Local Voice (SoLV) moved from [X]% to [Y]%, 
representing a [increase/decrease] of [Z] percentage points.

KEY WINS:
• [Win 1: e.g., "Achieved #1 Map Pack position for 'plumber near me' at 28 of 49 grid points"]
• [Win 2: e.g., "GBP description optimization increased justification snippet appearances by 40%"]
• [Win 3: e.g., "Review count increased from 142 to 167 (+25 new reviews)"]

AREAS OF FOCUS:
• [Focus 1: e.g., "Rankings decline in northeast grid quadrant — competitor 'ABC Plumbing' gained ground"]
• [Focus 2: e.g., "Website Core Web Vitals need improvement — LCP at 3.2s (target: <2.5s)"]

NEXT MONTH PRIORITY:
[1-2 sentence summary of primary focus for upcoming month]
```

**Silas generation rules:**
- Maximum 250 words
- Lead with the most impactful metric change
- Include exactly 3 wins and 2 focus areas (or fewer if month was quiet)
- Never include jargon without defining it
- Frame negatives as "opportunities" or "focus areas", not "problems"
- Every statement must be backed by data from SPEC-015

---

#### Section 3: Key Performance Metrics Dashboard

**Layout:** KPI cards in a 2×3 or 3×2 grid

| Metric | Source | Display Format |
|--------|--------|---------------|
| SoLV (Share of Local Voice) | SPEC-015 §6.4 | Percentage + trend arrow + comparison |
| Weighted Visibility Score | SPEC-015 §6.5 | Number + trend arrow + comparison |
| Map Pack Rate | SPEC-015 §10.1 | Percentage of grid points in top 3 |
| Average Position | SPEC-015 §10.1 | Number (1 decimal) + trend |
| Total Reviews | SPEC-012 | Count + new this month |
| Average Rating | SPEC-012 | Stars (1 decimal) |

**Comparison options:**
- vs. Previous month (default)
- vs. 3 months ago
- vs. Campaign start (for new clients)

**Color coding:**
- Green arrow ↑: Improvement
- Red arrow ↓: Decline
- Gray dash —: No significant change (within ±2%)

---

#### Section 4: Geo-Grid Heat Map

**Content:** Visual grid showing client's ranking at each geographic point for the primary keyword.

**Specifications:**
- Grid layout matching SPEC-015 §9 (7×7 default)
- Color-coded cells per SPEC-015 §9.1 color schema
- Each cell displays the rank number
- Map orientation: North at top
- Include business location marker (star icon at center)
- Legend below map explaining color → position mapping
- Caption: "Keyword: '[keyword]' | Scan Date: [date] | Grid: [size] | Radius: [miles] mi"

**Silas generation:**
1. Pull latest scan data from Google Sheets
2. Filter to primary keyword + client's business name
3. Generate NxN grid table with color-coded cells
4. Calculate summary stats:
   - Points in Map Pack: X of Y (Z%)
   - Points at #1: X of Y (Z%)
   - Points not found: X of Y (Z%)
5. Include a 1-sentence interpretation:
   "You dominate the [direction] quadrant but lose ground in the [direction] quadrant where [competitor] has stronger proximity."

**Month-over-month comparison option:**
Side-by-side heat maps (this month vs. last month) when significant changes occurred.

---

#### Section 5: SoLV & WVS Analysis

**Charts to include:**

**Chart A: SoLV Pie/Donut**
- Dimension: Business Name (top 5 + "Others")
- Metric: Map Pack appearance count
- Filter: Position <= 3
- Highlight client's slice with brand color
- Show percentage labels

**Chart B: WVS Bar Chart**
- Dimension: Business Name (top 5)
- Metric: Visibility Score SUM
- Sort: Descending
- Highlight client's bar with brand color
- Add max theoretical score as a reference line

**Chart C: SoLV Trend Line**
- X-axis: Scan date (weekly data points)
- Y-axis: SoLV percentage
- Lines: Client + top 2 competitors
- Show minimum 8 weeks of history

**Narrative template:**
```
"You currently control [X]% of Map Pack visibility for '[keyword]', placing you 
[1st/2nd/3rd/etc.] in the market. Your nearest competitor, [Name], holds [Y]%. 
Your Weighted Visibility Score of [N] reflects [strong/moderate/emerging] dominance, 
particularly at grid points within [distance] miles of your location."
```

---

#### Section 6: Rank Trend Charts

**Chart type:** Multi-line time series

**Primary chart:**
- X-axis: Week
- Y-axis: Average position (inverted — lower = higher on chart)
- Lines: One per tracked keyword
- Data points: 8–12 weeks of history

**Secondary chart (if applicable):**
- Map Pack Rate trend per keyword
- Shows what percentage of grid points the client holds top 3

**Annotation layer:**
Mark significant events on the timeline:
- "GBP description updated" (SPEC-002)
- "15 new citations deployed" (SPEC-011)
- "5-star review campaign launched" (SPEC-012)
- "Location silo pages published" (SPEC-006)
- "Google algorithm update detected" (industry event)

These annotations create a visual cause-and-effect narrative that clients can follow.

---

#### Section 7: Competitive Landscape

**Content:**

**Table A: Top 5 Competitors Summary**

| Rank | Competitor | SoLV | WVS | Reviews | Rating | Trend |
|------|-----------|------|-----|---------|--------|-------|
| 1 | [Client] | 34% | 2,450 | 167 | 4.7 | ↑ |
| 2 | ABC Plumbing | 22% | 1,680 | 312 | 4.5 | → |
| 3 | Quick Fix Pro | 18% | 1,200 | 89 | 4.8 | ↑ |
| ... | | | | | | |

**Chart B: Opportunity Matrix (Scatter Plot)**
- Per SPEC-015 §7
- Labeled quadrants
- Client highlighted

**Narrative template:**
```
"Your strongest competitor this month is [Name]. They outperform you in [metric] 
but you lead in [metric]. The key differentiation opportunity is [specific gap]. 
[Competitor 2] is an emerging threat — they've gained [X]% SoLV in the past 
[timeframe]. We recommend [action] to maintain your advantage."
```

**Competitive change alerts:**
- Flag any competitor that gained > 5% SoLV month-over-month
- Flag any new competitor entering the top 5
- Flag any competitor that disappeared (potential suspension/closure)

---

#### Section 8: Work Completed This Month

**Purpose:** Justify the retainer. Show exactly what was done.

**Format:** Activity log organized by route/spec.

```
WORK COMPLETED — [Month Year]

GBP OPTIMIZATION (Route 1):
☑ Rewrote 8 custom service entries with long-tail keyword targeting (SPEC-001)
☑ Updated business description with keyword-optimized copy (SPEC-002)
☑ Seeded 5 new Q&A entries targeting high-intent queries (SPEC-003)
☑ Published 4 GBP posts (2 offers, 1 event, 1 update) (SPEC-005)

WEBSITE OPTIMIZATION (Route 2):
☑ Published 3 neighborhood spoke pages for location silo (SPEC-006)
☑ Deployed grounding box on primary service page (SPEC-007)
☑ Updated LocalBusiness schema with areaServed expansion (SPEC-008)
☑ Fixed 2 Core Web Vitals issues (LCP improved from 3.2s to 2.1s) (SPEC-009)

OFF-SITE (Route 4):
☑ Submitted NAP to 12 new citation directories (SPEC-011)
☑ Responded to 8 new Google reviews (SPEC-012)
☑ Acquired 1 expired domain with local backlink profile (SPEC-013)

TRACKING & REPORTING (Route 5):
☑ Completed 4 weekly geo-grid scans (SPEC-015)
☑ Generated monthly performance report (this document) (SPEC-016)
```

**Silas generation rules:**
- Pull from optimization activity log (maintained across all specs)
- Only include completed items, not in-progress
- Use checkmarks (☑) for completed items
- Group by route for clarity
- Include spec reference for traceability
- If a route had no activity this month, explicitly state: "No [route] work this period — scheduled for [next month]"

---

#### Section 9: Google Business Profile Performance

**Data source:** GBP Insights API (if available) or manual screenshots

| Metric | This Month | Last Month | Change |
|--------|-----------|------------|--------|
| Search views | | | |
| Maps views | | | |
| Website clicks | | | |
| Direction requests | | | |
| Phone calls | | | |
| Total interactions | | | |

**Chart:** Stacked area chart showing interaction types over 6 months

**Correlation note:**
"Direction requests increased [X]% following GBP optimization, correlating with our SoLV improvement from [A]% to [B]%."

---

#### Section 10: Website Performance

**Data sources:** Google Search Console, Google Analytics, Core Web Vitals

**Organic performance (from GSC):**

| Metric | This Month | Last Month | Change |
|--------|-----------|------------|--------|
| Organic impressions | | | |
| Organic clicks | | | |
| Average CTR | | | |
| Average position | | | |

**Top performing pages:**

| Page | Impressions | Clicks | CTR | Avg Position |
|------|------------|--------|-----|-------------|
| /service-page | | | | |
| /location-silo | | | | |
| ... | | | | |

**Core Web Vitals (from SPEC-009):**

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| LCP | | <2.5s | ✅/⚠️/❌ |
| INP | | <200ms | ✅/⚠️/❌ |
| CLS | | <0.1 | ✅/⚠️/❌ |

---

#### Section 11: Reviews & Reputation Snapshot

**Data source:** SPEC-012 Review Management

| Metric | This Month | Last Month | Change |
|--------|-----------|------------|--------|
| Total reviews (Google) | | | |
| Average rating | | | |
| New reviews received | | | |
| Reviews responded to | | | |
| Response rate | | | |
| Sentiment score | | | |

**Review highlights:**
- Best review of the month (quote snippet, < 15 words)
- Any negative reviews and response status
- Review velocity trend (reviews/month over 6 months)

**Competitor review comparison:**

| Business | Total Reviews | Avg Rating | Monthly Velocity |
|----------|--------------|------------|-----------------|
| [Client] | | | |
| Competitor A | | | |
| Competitor B | | | |

---

#### Section 12: Next Month Action Plan

**Purpose:** Set expectations and demonstrate strategic planning.

**Template:**

```
NEXT MONTH PRIORITIES — [Month Year]

PRIORITY 1: [Specific action]
Rationale: [Why this matters based on data]
Expected impact: [Metric we expect to move]
Timeline: [When it will be completed]

PRIORITY 2: [Specific action]
Rationale: [Data-driven reasoning]
Expected impact: [Target metric]
Timeline: [Deadline]

PRIORITY 3: [Specific action]
Rationale: [Why now]
Expected impact: [What should improve]
Timeline: [When]

ONGOING:
• Weekly GBP posts (SPEC-005)
• Review monitoring and response (SPEC-012)
• Geo-grid tracking scans (SPEC-015)
```

**Silas generation rules:**
- Maximum 3 priorities (focus, not overwhelm)
- Each priority must be tied to a data point from the current report
- "Expected impact" must reference a measurable metric
- Priorities should follow the APEX implementation phasing from the knowledge base
- Never repeat the same priority two months in a row unless explicitly justified

---

### 4.3 Report Design Specifications

| Element | Specification |
|---------|--------------|
| Format | PDF (primary), with live Looker Studio dashboard link |
| Page size | US Letter (8.5" × 11") |
| Orientation | Portrait (landscape for heat map page if needed) |
| Brand colors | Customizable per agency — stored in client profile |
| Typography | Clean sans-serif (Arial, Helvetica, Inter) |
| Charts | Consistent color palette across all visualizations |
| Headers | Agency logo top-left, page number top-right |
| Footers | Confidentiality notice + report generation date |
| File naming | `{client_name}_Local_SEO_Report_{YYYY-MM}.pdf` |

---

## 5. WEEKLY PULSE REPORT

**Purpose:** Internal operational awareness — not client-facing.

**Format:** Structured email or Slack message.

**Template:**

```
📊 WEEKLY PULSE — [Client Name] — Week of [Date]

SCAN RESULTS:
• SoLV: [X]% ([↑/↓/→] from [Y]% last week)
• WVS: [N] ([↑/↓/→])
• Map Pack Rate: [Z]%

ANOMALIES:
• [None / Description of significant changes]

OPTIMIZATION STATUS:
• [Task in progress and status]
• [Task completed this week]

UPCOMING:
• [Scheduled tasks for next week]

API BUDGET: [X]% remaining for this billing cycle
```

**Delivery:** Automated every Monday after scan completes.

---

## 6. QUARTERLY BUSINESS REVIEW (QBR)

### 6.1 Purpose

Quarterly reviews are the retainer defense mechanism. This is where you show the client the cumulative impact of 3 months of work, compare against the initial audit baseline, and set strategic direction for the next quarter.

### 6.2 QBR Structure

```
Slide 1:  Title slide (client name, quarter, agency logo)
Slide 2:  Quarter in review — key milestones
Slide 3:  SoLV journey — start of quarter vs. end (trend chart)
Slide 4:  WVS journey — same treatment
Slide 5:  Heat map comparison (Month 1 vs. Month 3)
Slide 6:  Competitive position changes over quarter
Slide 7:  Work completed summary (all 3 months combined)
Slide 8:  ROI analysis (see §6.3)
Slide 9:  Next quarter strategic plan
Slide 10: Q&A / discussion
```

### 6.3 ROI Calculation Framework

This is the most important slide for retainer defense.

**Method A: Click Value Estimation**

```
1. Total Map Pack impressions this quarter (from GBP Insights)
2. Estimated CTR from Map Pack position (industry avg: 25-35% for #1)
3. Estimated clicks = Impressions × CTR
4. Value per click = Google Ads CPC for same keyword
5. Total estimated value = Clicks × CPC
6. ROI = (Estimated Value - Retainer Cost) / Retainer Cost × 100

Example:
- 50,000 monthly Map Pack impressions × 30% CTR = 15,000 clicks/month
- Average CPC for local keywords: $8.50
- Monthly value: 15,000 × $8.50 = $127,500
- Monthly retainer: $2,000
- ROI: ($127,500 - $2,000) / $2,000 = 6,275%
```

**Method B: Lead Attribution**

```
1. Total direction requests + calls + website clicks from GBP (quarter)
2. Estimated conversion rate to customer (varies by industry)
3. Average customer lifetime value
4. Revenue attributed to local SEO = Leads × Conversion Rate × LTV
5. ROI = (Attributed Revenue - Quarterly Retainer) / Quarterly Retainer × 100
```

**Method C: Competitive Displacement Value**

```
1. Calculate SoLV gained this quarter (e.g., went from 15% to 35%)
2. SoLV points gained = 20%
3. Each SoLV point ≈ X additional Map Pack exposures/month
4. Value those exposures at competitive CPC rates
5. This represents market share taken from competitors
```

**Silas should present all three methods** and let the client choose which resonates most with their business model. Different clients value different metrics — a lead-gen business cares about Method B, while a retail/restaurant cares about Method A.

---

## 7. ONBOARDING AUDIT REPORT

### 7.1 Purpose

The initial audit establishes baseline metrics before any optimization begins. This is the "before" snapshot that makes all future "after" comparisons meaningful.

### 7.2 Audit Report Structure

```
Section 1:  Executive Summary — Current State Assessment
Section 2:  GBP Audit (per SPEC-001 through 005 audit checklists)
Section 3:  Website Technical Audit (per SPEC-009)
Section 4:  Content Audit (per SPEC-010)
Section 5:  Citation/NAP Audit (per SPEC-011)
Section 6:  Review/Reputation Audit (per SPEC-012)
Section 7:  Baseline Geo-Grid Scan (first SPEC-015 scan)
Section 8:  Competitive Landscape Snapshot
Section 9:  Opportunity Scoring Matrix
Section 10: Recommended Action Plan (90-day roadmap)
```

### 7.3 Opportunity Scoring Matrix

Score each area on a 1-10 scale:

| Area | Current Score | Potential Score | Gap | Priority |
|------|-------------|----------------|-----|----------|
| GBP Optimization | | | | |
| Website Content | | | | |
| Technical SEO | | | | |
| Citations/NAP | | | | |
| Reviews | | | | |
| Link Authority | | | | |
| Content Architecture | | | | |

**Scoring rubric:**

| Score | Meaning |
|-------|---------|
| 1-3 | Critical gaps — significant work needed |
| 4-5 | Below average — clear improvement opportunities |
| 6-7 | Acceptable — optimization will move the needle |
| 8-9 | Strong — maintain and fine-tune |
| 10 | Excellent — minimal work needed in this area |

**Overall readiness score:** Average of all areas = "Local SEO Readiness: [X]/10"

### 7.4 90-Day Roadmap

Based on the opportunity matrix, generate a prioritized action plan:

```
MONTH 1 — Foundation
Week 1-2: GBP full optimization (SPEC-001 through 005)
Week 3: Technical SEO fixes (SPEC-009 critical items)
Week 4: Citation audit + first submissions (SPEC-011)
Ongoing: Review response protocol activated (SPEC-012)

MONTH 2 — Content & Authority
Week 1-2: Location silo page creation (SPEC-006)
Week 3: Grounding box deployment on key pages (SPEC-007)
Week 4: Schema markup deployment (SPEC-008)
Ongoing: Citation building continues, review solicitation

MONTH 3 — Authority & Measurement
Week 1: Expired domain prospecting (SPEC-013)
Week 2-3: Content expansion + internal linking
Week 4: First Quarterly Business Review
Ongoing: All tracking fully operational (SPEC-015)
```

---

## 8. ANOMALY ALERT REPORT

### 8.1 Trigger Conditions

Per SPEC-015 §10.3, anomalies trigger immediate alerts:

| Condition | Alert Level |
|-----------|------------|
| Position drop > 5 at 30%+ grid points | 🔴 CRITICAL |
| SoLV drop > 10% week-over-week | 🔴 CRITICAL |
| New competitor in top 3 at 20%+ grid points | 🟡 WARNING |
| GBP suspension detected | 🔴 CRITICAL |
| Review spike (positive or negative) | 🟡 WARNING |
| Website downtime detected | 🔴 CRITICAL |

### 8.2 Alert Template

```
🔴 CRITICAL ALERT — [Client Name]

WHAT HAPPENED:
[Metric] [dropped/changed] from [X] to [Y] between [date1] and [date2].

IMPACT:
• [Specific impact description]
• [Number of grid points affected]
• [Competitive context — did others see similar changes?]

LIKELY CAUSE:
• [Hypothesis 1 with supporting evidence]
• [Hypothesis 2 if applicable]

RECOMMENDED ACTION:
1. [Immediate step]
2. [Diagnostic step]
3. [Corrective step if cause confirmed]

NEXT SCAN: [Date] — will confirm if this is a sustained change or fluctuation.
```

### 8.3 Silas Alert Delivery

```
When anomaly detected:
1. Generate alert using template above
2. Delivery routing:
   IF severity == CRITICAL:
     Send immediately via Telegram to operator (Cody)
     If client notifications enabled: email client contact
   IF severity == WARNING:
     Include in next weekly pulse
     Flag for review in dashboard
3. Set follow-up reminder for next scan
4. Add to anomaly log for historical tracking
```

---

## 9. WHITE-LABELING SYSTEM

### 9.1 Branding Configuration

Each agency operator stores their branding profile:

```json
{
  "agency_name": "Your Agency Name",
  "logo_url": "/assets/logo.png",
  "primary_color": "#2563EB",
  "secondary_color": "#1E40AF",
  "accent_color": "#3B82F6",
  "font_primary": "Inter",
  "font_secondary": "Arial",
  "footer_text": "Confidential — Prepared by [Agency Name]",
  "report_template": "professional",
  "include_methodology": false,
  "include_tool_names": false
}
```

### 9.2 White-Label Rules

| Rule | Implementation |
|------|---------------|
| No "Silas" branding | Never mention Silas, AI assistant, or automation in client-facing reports |
| No tool names | Replace "SerpAPI" with "our rank tracking platform" |
| No methodology exposure | Don't reveal specific tactics (grounding boxes, PBN, etc.) unless client requests |
| Agency attribution only | "Prepared by [Agency Name]" — never "Generated by AI" |
| Consistent branding | All charts, colors, fonts match agency brand |
| Custom terminology | Replace technical terms with client-friendly language |

### 9.3 Terminology Translation

| Internal Term | Client-Facing Term |
|-------------|-------------------|
| SoLV | Market Share Score or Local Visibility Share |
| WVS | Visibility Power Score |
| Geo-grid | Location-based rank tracking |
| Map Pack | Top 3 local results |
| Grid points | Tracking locations |
| Grounding box | Content optimization |
| PBN | Authority building network |
| Schema markup | Search enhancement code |
| Core Web Vitals | Website speed & performance |
| Canonical tag | Page priority signal |
| NAP consistency | Business listing accuracy |

---

## 10. REPORT GENERATION PIPELINE

### 10.1 Automated Monthly Report Workflow

```
Trigger: 1st of each month, 6:00 AM

Step 1: Data Collection (Silas)
  ├── Pull latest 4 weekly scans from SPEC-015
  ├── Calculate month-over-month metrics
  ├── Pull GBP Insights data (if API available)
  ├── Pull GSC data (if API available)
  ├── Pull optimization activity log
  └── Pull review data from SPEC-012

Step 2: Analysis (Silas)
  ├── Calculate SoLV, WVS, Map Pack Rate, Avg Position
  ├── Generate trend comparisons (this month vs. last)
  ├── Identify top 3 wins and top 2 focus areas
  ├── Run competitive analysis
  ├── Calculate ROI estimates
  └── Generate next month priority recommendations

Step 3: Content Generation (Silas)
  ├── Write executive summary (250 words max)
  ├── Write metric narratives for each section
  ├── Write competitive analysis commentary
  ├── Write next month action plan
  └── Generate work completed checklist

Step 4: Visualization Generation
  ├── Generate heat map grid table (HTML)
  ├── Generate SoLV pie chart
  ├── Generate WVS bar chart
  ├── Generate trend line charts
  ├── Generate Opportunity Matrix scatter plot
  └── Export all as PNG for PDF embedding

Step 5: PDF Assembly
  ├── Apply white-label template
  ├── Insert content and visualizations
  ├── Add page numbers, headers, footers
  ├── Generate table of contents
  └── Export final PDF

Step 6: Delivery
  ├── Save PDF to client folder
  ├── Email to client contact (if enabled)
  ├── Update Looker Studio dashboard data source
  ├── Post summary to operator's Telegram
  └── Log report generation in activity log
```

### 10.2 Manual Report Override

```
Operator can request:
- Regenerate report with different date range
- Add/remove specific sections
- Include custom commentary or notes
- Generate for a specific keyword subset
- Export in different formats (PPTX for presentations)
```

---

## 11. DATA SOURCES & INTEGRATIONS

### 11.1 Primary Data Sources

| Source | Data Type | Access Method | Update Frequency |
|--------|----------|---------------|-----------------|
| Google Sheets (SPEC-015) | Geo-grid scan data | Sheets API | Weekly |
| Google Business Profile | Insights (views, clicks, calls) | GBP API / manual | Monthly |
| Google Search Console | Organic impressions, clicks, position | GSC API | Monthly |
| Google Analytics 4 | Traffic, conversions, behavior | GA4 API | Monthly |
| Optimization Activity Log | Work completed entries | Internal database | Ongoing |
| Review Platforms | Reviews, ratings, sentiment | SPEC-012 system | Weekly |
| Citation Tracker | NAP consistency, listing count | SPEC-011 system | Monthly |

### 11.2 API Integration Priority

```
Phase 1 (MVP): Google Sheets + manual GBP screenshots
Phase 2: Add GSC API integration
Phase 3: Add GBP API integration
Phase 4: Add GA4 API integration
Phase 5: Full automation — all sources API-connected
```

This phased approach lets Silas start generating reports immediately with just the geo-grid data, then progressively enrich reports as API integrations come online.

---

## 12. CLIENT DASHBOARD (LOOKER STUDIO)

### 12.1 Dashboard vs. Report

| Aspect | PDF Report | Looker Studio Dashboard |
|--------|-----------|----------------------|
| Purpose | Point-in-time snapshot for meetings/review | Interactive exploration for ongoing monitoring |
| Update frequency | Monthly | Real-time (data refresh) |
| Interactivity | None — static document | Filters, date ranges, drill-down |
| Delivery | Email attachment, file share | Shared URL (view-only) |
| Branding | Fully white-labeled | Partially white-labeled (Looker UI visible) |
| Access control | PDF access = anyone with file | Google account required + share permissions |

### 12.2 Dashboard Access Levels

| Level | Who | Permissions |
|-------|-----|------------|
| Viewer | Client contacts | View only — no editing, no data export |
| Editor | Agency team members | Edit charts, add pages, modify filters |
| Owner | Operator (Cody) | Full control — data sources, sharing, deletion |

### 12.3 Dashboard Page Structure

Mirror the monthly report structure but with interactive controls:

```
Page 1: KPI Overview (filterable by date range, keyword)
Page 2: Heat Map Explorer (keyword selector, date slider)
Page 3: Competitive Analysis (business selector, metric toggle)
Page 4: Trend Analysis (multi-keyword overlay, custom date range)
Page 5: Review Tracker (sentiment filter, response status)
```

---

## 13. REPORT QUALITY STANDARDS

### 13.1 Content Quality Checklist

Before any report is delivered:

| Check | Requirement |
|-------|-------------|
| Data accuracy | All metrics verified against source data |
| Date accuracy | Correct reporting period displayed |
| Client name correct | Business name consistent throughout |
| No internal jargon | All terms translated to client-friendly language |
| No AI/tool references | White-label compliance verified |
| Chart readability | All charts have clear labels, legends, titles |
| Narrative tone | Professional, confident, data-driven |
| Action items specific | Next steps are concrete, not vague |
| Comparison context | All metrics shown with comparison baseline |
| Spelling/grammar | Error-free |

### 13.2 Narrative Quality Rules

| Rule | Example |
|------|---------|
| Lead with impact, not activity | "Rankings improved 15%" not "We updated the description" |
| Quantify everything | "Reviews increased from 142 to 167" not "Reviews improved" |
| Contextualize metrics | "34% SoLV puts you #1 in market" not just "SoLV is 34%" |
| Future-oriented closing | Always end sections with what's next |
| Avoid absolutes | "Strong improvement" not "Perfect performance" |
| Frame negatives constructively | "Opportunity in NE quadrant" not "Failing in NE quadrant" |
| Attribution clarity | "Following our GBP optimization" — connect work to results |

### 13.3 Visual Quality Rules

| Rule | Specification |
|------|--------------|
| Consistent colors | Same palette across all charts |
| Client highlight | Client's data always in brand primary color |
| Competitor muting | Competitors in neutral grays unless comparing |
| Readable fonts | Minimum 10pt for chart labels, 12pt for body text |
| White space | Don't crowd pages — one main chart per section |
| Mobile consideration | Dashboard must be legible on tablet screens |

---

## 14. MULTI-CLIENT REPORT MANAGEMENT

### 14.1 Client Roster

Silas maintains a client roster with report configuration:

```json
{
  "client_id": "spectators-lp",
  "business_name": "Spectators Bar & Grill - Lake Pointe",
  "report_tier": "standard",
  "report_frequency": "monthly",
  "tracked_keywords": ["sports bar sugar land", "bar near me", "sports bar katy"],
  "grid_config": "7x7",
  "contact_email": "owner@spectators.com",
  "dashboard_url": "https://lookerstudio.google.com/...",
  "branding_profile": "default_agency",
  "report_sections": ["all"],
  "delivery_method": "email_pdf",
  "notes": "Multi-location client — see also spectators-rs and spectators-hg"
}
```

### 14.2 Batch Report Generation

```
Monthly batch process (1st of each month):

1. Load client roster
2. For each client:
   a. Check report_frequency — skip if not due this month
   b. Pull all data sources for this client
   c. Generate report per client's report_tier configuration
   d. Apply client's branding_profile
   e. Deliver via client's delivery_method
   f. Log generation in activity tracker
3. Generate operator summary:
   "Generated [N] client reports. [X] show improvements, [Y] need attention."
4. Send operator digest via Telegram
```

### 14.3 Report Tiers

| Tier | Sections Included | Dashboard | Competitive Analysis | QBR |
|------|-------------------|-----------|---------------------|-----|
| Starter | KPIs, Heat Map, Work Log, Next Steps | No | Top 3 competitors | No |
| Standard | All sections | Yes (view-only) | Top 5 competitors | Annual |
| Premium | All sections + custom | Yes (interactive) | Full competitive audit | Quarterly |
| Enterprise | Custom report structure | Custom dashboard | Unlimited competitors | Monthly |

---

## 15. REPORT DELIVERY & DISTRIBUTION

### 15.1 Delivery Methods

| Method | Format | When to Use |
|--------|--------|------------|
| Email (PDF attachment) | PDF | Default for monthly reports |
| Shared Google Drive folder | PDF + source sheets | Clients who want raw data access |
| Looker Studio link | Interactive dashboard | Premium/Enterprise clients |
| Slack/Teams message | Summary + link | Clients with integrated workspace |
| Client portal (future) | Web-based report viewer | When custom portal is built |

### 15.2 Email Delivery Template

```
Subject: [Business Name] — Local SEO Report — [Month Year]

Hi [Contact Name],

Your [Month] Local SEO performance report is attached.

Quick highlights:
• Your Local Visibility Share is [X]% (was [Y]% last month)
• You're ranking in the top 3 at [Z]% of tracked locations
• [1 key win from this month]

The full report includes your geo-grid heat map, competitive analysis, 
and our recommended priorities for next month.

[If dashboard enabled:]
Your interactive dashboard is also updated: [dashboard_url]

Let me know if you have any questions about the report.

Best,
[Agency Name]
```

### 15.3 Delivery Timing

| Report Type | Generate | Deliver |
|-------------|----------|---------|
| Monthly report | 1st of month, 6 AM | 1st of month, 9 AM (after review window) |
| Weekly pulse | Monday, 6 AM | Monday, 7 AM |
| QBR | 5 business days before meeting | At meeting |
| Anomaly alert | Immediate | Within 15 minutes of detection |

---

## 16. SILAS REPORTING AUTOMATION RULES

### 16.1 Autonomous Report Generation

```
Silas can generate and deliver reports autonomously when:
- Report is scheduled (monthly, weekly)
- All required data sources are available
- No critical data quality issues detected
- Previous report was acknowledged by operator

Silas should pause and alert operator when:
- A data source is missing or stale (> 14 days old)
- Metrics show anomalies that need human interpretation
- Client is new (first report requires operator review)
- Report shows significant negative trends (operator should add context)
```

### 16.2 Report Improvement Loop

```
After each report delivery:
1. Track client engagement:
   - Did they open the email?
   - Did they view the dashboard?
   - Did they ask follow-up questions?
2. If no engagement for 2+ consecutive months:
   - Alert operator: "Client [name] hasn't viewed reports in 2 months"
   - Suggest: report format change, meeting to discuss, or service adjustment
3. If client asks questions about specific sections:
   - Log the sections of interest
   - Emphasize those sections in future reports
   - Reduce or remove sections they never ask about
4. Feed engagement data back into report template optimization
```

---

## 17. GLOSSARY

| Term | Definition |
|------|-----------|
| **Client Report** | Monthly PDF document summarizing SEO performance for a client |
| **Weekly Pulse** | Internal operational summary sent to agency team |
| **QBR** | Quarterly Business Review — strategic presentation for client leadership |
| **Onboarding Audit** | Initial baseline assessment performed for new clients |
| **White-Label** | Branding customization that removes tool/vendor references for agency branding |
| **SoLV** | Share of Local Voice — market share metric (see SPEC-015) |
| **WVS** | Weighted Visibility Score — quality-adjusted ranking metric (see SPEC-015) |
| **Opportunity Matrix** | Scatter plot comparing competitor frequency vs. quality (see SPEC-015) |
| **ROI Framework** | Methodology for calculating return on investment from SEO retainer |
| **Anomaly Alert** | Automated notification triggered by significant metric changes |
| **Report Tier** | Service level determining which report sections are included |
| **Batch Generation** | Process of generating reports for all clients in a single automated run |

---

## 18. CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial specification — complete client reporting system |

---

*End of SPEC-016*
