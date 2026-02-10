# SPEC-020: Client Lifecycle & Project Management
## Silas Engine — Operational Group
### Version 1.0 | System Architecture & Control

---

## 1. PURPOSE

This specification defines how Silas manages the complete client lifecycle — from initial onboarding through active optimization to long-term maintenance. While SPEC-019 handles the technical orchestration (what to do), this spec handles the operational management (when, for whom, and how to track it all across 20+ clients).

**Core principle:** "Every client gets the same rigorous process, regardless of whether it's the first or the twentieth."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-015: Geo-Grid Rank Tracking | Provides performance data for all lifecycle decisions |
| SPEC-016: Client Reporting System | Deliverable output at every lifecycle stage |
| SPEC-019: Silas Orchestrator | Executes the technical work within each lifecycle phase |
| All SPEC-001–018 | Individual optimization tasks managed within this lifecycle |

---

## 3. CLIENT LIFECYCLE PHASES

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ PROSPECT │──►│ONBOARDING│──►│  ACTIVE  │──►│ MATURE  │──►│ RENEWAL │
│          │   │          │   │OPTIMIZE  │   │MAINTAIN │   │/OFFBOARD│
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
  Sales &       Audit &       Months       Months        Annual
  intake        setup         1-3          4-12+         review
```

### 3.1 Phase Definitions

| Phase | Duration | Primary Activity | Key Deliverable |
|-------|----------|-----------------|-----------------|
| Prospect | 1-5 days | Sales audit, proposal generation | Free audit report + proposal |
| Onboarding | Week 1-2 | Full audit, setup, baseline tracking | Onboarding audit (SPEC-016 §7) |
| Active Optimization | Month 1-3 | Heavy optimization across all routes | Monthly reports, visible improvements |
| Mature Maintenance | Month 4-12+ | Ongoing optimization, defense, expansion | Monthly reports, quarterly reviews |
| Renewal / Offboard | Annual | Retainer justification, renewal, or transition | Year-in-review + renewal proposal |

---

## 4. PHASE: PROSPECT

### 4.1 Free Audit Workflow

The sales tool — a quick audit that demonstrates value and identifies opportunities.

```
Input: Business URL or GBP link (from sales conversation)
Time: 15-30 minutes (Silas generates, operator reviews)

Silas generates:
1. Quick Score (0-10) across 5 areas:
   ☐ GBP optimization level
   ☐ Website SEO health
   ☐ Review/reputation strength
   ☐ Citation/NAP consistency
   ☐ Competitive position (SoLV estimate from 3x3 grid)

2. Top 5 "quick wins" the prospect is missing:
   e.g., "Your GBP has no custom services — you're invisible for long-tail queries"
   e.g., "You have 42 reviews but your competitor has 187"
   
3. Competitive gap summary:
   "Your top competitor [Name] has [X] more reviews, [Y] more citation sources,
    and occupies [Z]% more of the Map Pack than you."

Output: 1-page PDF or email-ready summary
```

### 4.2 Proposal Generation

```
Based on free audit results, Silas generates a proposal:

1. Current state summary (from audit)
2. Opportunity estimate:
   - "Based on our analysis, optimizing your local presence could generate
     an estimated [X] additional monthly leads worth $[Y]"
3. Recommended tier and pricing
4. 90-day roadmap preview
5. Expected milestones (month 1, month 3, month 6)

Template customized by client tier:
- Starter ($500-1,000/mo): GBP + basic website + citations + tracking
- Standard ($1,000-2,000/mo): Full Route 1-2 + Route 4-5
- Premium ($2,000-4,000/mo): All routes + content creation + advanced link building
- Enterprise ($4,000+/mo): Everything + custom dashboard + priority support
```

---

## 5. PHASE: ONBOARDING

### 5.1 Onboarding Checklist

```
WEEK 1 — SETUP & AUDIT

Day 1-2: Access & Configuration
  ☐ Collect intake form data (SPEC-019 §10)
  ☐ Verify GBP access (owner or manager)
  ☐ Verify website CMS access
  ☐ Connect Google Search Console
  ☐ Connect Google Analytics
  ☐ Set up client project file in Silas

Day 2-3: Full Audit
  ☐ Run Phase 1 crawl (SPEC-019 §4)
  ☐ Generate Phase 2 scorecard (SPEC-019 §5)
  ☐ Generate Phase 3 priority stack (SPEC-019 §6)

Day 3-4: Tracking Setup
  ☐ Configure geo-grid (SPEC-015)
  ☐ Select keywords for tracking
  ☐ Run baseline scan
  ☐ Set up Looker Studio dashboard (SPEC-015 §8)
  ☐ Run baseline LLM visibility test (SPEC-017 §6)

Day 4-5: Deliverable
  ☐ Generate Onboarding Audit Report (SPEC-016 §7)
  ☐ Generate 90-Day Roadmap (SPEC-016 §7.4)
  ☐ Operator reviews and customizes
  ☐ Deliver to client

WEEK 2 — QUICK WINS
  ☐ Execute all Priority Tier 1 tasks (SPEC-019 §6.2)
  ☐ GBP description rewrite
  ☐ GBP services expansion
  ☐ GBP Q&A seeding
  ☐ Schema markup deployment
  ☐ Critical technical fixes
  ☐ Review response protocol activation
```

### 5.2 Client Project File

```json
{
  "client_id": "spectators-lp",
  "lifecycle_phase": "active_optimization",
  "onboarded_date": "2026-02-06",
  "tier": "standard",
  "monthly_retainer": 1500,
  
  "business_info": {
    "name": "Spectators Bar & Grill - Lake Pointe",
    "address": "123 Main St, Sugar Land, TX 77479",
    "phone": "(281) 555-1234",
    "website": "https://spectatorsbar.com/lake-pointe",
    "gbp_place_id": "ChIJ...",
    "gbp_url": "https://maps.google.com/...",
    "categories": ["Sports Bar", "Restaurant"],
    "service_area_radius": 5
  },
  
  "access": {
    "gbp": "manager",
    "wordpress": "admin",
    "gsc": "connected",
    "ga4": "connected",
    "social_accounts": {
      "facebook": "connected",
      "instagram": "connected",
      "youtube": "not_setup"
    }
  },
  
  "tracking_config": {
    "grid_size": "7x7",
    "keywords": ["sports bar sugar land", "bar near me", "sports bar katy"],
    "scan_frequency": "weekly",
    "serpapi_budget_monthly": 9.80
  },
  
  "scores": {
    "initial": {
      "date": "2026-02-06",
      "overall": 3.5,
      "route_1_gbp": 3,
      "route_2_website": 4,
      "route_4_offsite": 3,
      "route_5_tracking": 0,
      "ai_crossplatform": 2
    },
    "current": {
      "date": "2026-03-01",
      "overall": 6.2,
      "route_1_gbp": 7,
      "route_2_website": 5,
      "route_4_offsite": 5,
      "route_5_tracking": 8,
      "ai_crossplatform": 3
    }
  },
  
  "task_queue": [],
  "completed_tasks": [],
  "reports_generated": [],
  "next_report_due": "2026-03-01",
  "next_qbr_due": "2026-05-01"
}
```

---

## 6. PHASE: ACTIVE OPTIMIZATION

### 6.1 Monthly Sprint Structure

Each month follows a structured sprint:

```
WEEK 1: Scan + Report + Plan
  Monday: Geo-grid scan runs (automated)
  Tuesday: Monthly report generated (SPEC-016)
  Wednesday: Report delivered to client
  Thursday: Review last month's task outcomes
  Friday: Generate this month's priority task list

WEEK 2: Priority Execution
  Execute Tier 1 priority tasks for this month
  Focus on quick-win optimizations
  Operator handles manual tasks (GBP edits, posts)

WEEK 3: Deep Work
  Execute Tier 2-3 priority tasks
  Content creation (location silos, blog posts, videos)
  Off-site work (citations, link building)

WEEK 4: Review + Prep
  Monitor results from Week 2-3 deployments
  Prepare any client-facing updates
  Queue next month's tasks
  Update client project file scores
```

### 6.2 Monthly Deliverables

| Month | Expected Deliverables | Client Should See |
|-------|----------------------|-------------------|
| 1 | Audit report, GBP full optimization, schema, basic citations | Immediate GBP improvements, first heat map |
| 2 | Location silo pages, content optimization, expanded citations | Position improvements at nearby grid points |
| 3 | Full content architecture, link building started, YouTube | Significant SoLV improvement, competitive gains |

### 6.3 Milestone Targets

```
Month 1 milestones:
  ☐ GBP score 7+/10
  ☐ Schema fully deployed
  ☐ 20+ citation submissions in progress
  ☐ Review response protocol active
  ☐ Baseline tracking operational

Month 3 milestones:
  ☐ SoLV improved 10+ percentage points from baseline
  ☐ Website score 7+/10
  ☐ 50+ consistent citations
  ☐ Location silo pages live
  ☐ First QBR with ROI data

Month 6 milestones:
  ☐ Overall score 7+/10 across all routes
  ☐ SoLV 25%+ (or top 3 in market)
  ☐ 100+ Google reviews
  ☐ Cross-platform presence established
  ☐ LLM visibility improving
```

---

## 7. PHASE: MATURE MAINTENANCE

### 7.1 Transition Criteria

Move from Active Optimization to Mature Maintenance when:

```
ALL of:
  ☐ Overall score ≥ 7/10
  ☐ SoLV ≥ 25% (or top 3 in market)
  ☐ All Priority Tier 1-2 tasks completed
  ☐ Tracking operational for 3+ months
  ☐ Client has received 3+ monthly reports

THEN:
  Shift focus from aggressive optimization to:
  - Defense (maintaining rankings)
  - Expansion (new keywords, new service areas)
  - Content freshness (regular updates)
  - Competitive monitoring (react to competitor moves)
```

### 7.2 Maintenance Task Calendar

```
WEEKLY:
  ☐ GBP post (SPEC-005)
  ☐ Review monitoring + response (SPEC-012)
  ☐ Geo-grid scan (SPEC-015)
  ☐ Anomaly monitoring

MONTHLY:
  ☐ Monthly report (SPEC-016)
  ☐ Content refresh (update 1-2 pages)
  ☐ Citation consistency check (SPEC-011)
  ☐ Competitive position check
  ☐ LLM visibility check (SPEC-017)

QUARTERLY:
  ☐ QBR with ROI analysis (SPEC-016 §6)
  ☐ Full re-audit (SPEC-019 Phase 1-2)
  ☐ Strategy adjustment based on re-audit
  ☐ New keyword/service area expansion planning
  ☐ Cross-platform presence audit (SPEC-018)

ANNUALLY:
  ☐ Year-in-review report
  ☐ Renewal proposal with next year strategy
  ☐ Complete re-audit and re-baseline
```

### 7.3 Defensive Monitoring

```
What Silas watches for during maintenance:

1. RANK DEFENSE:
   - SoLV drops > 5% week-over-week → investigate
   - New competitor entering top 3 → competitive audit
   - Algorithm update volatility → patience + monitoring

2. REPUTATION DEFENSE:
   - Negative review spike → immediate response protocol
   - Rating drop below 4.5 → review generation acceleration
   - Competitor review manipulation → document for potential report

3. LISTING DEFENSE:
   - GBP suspension detection → emergency protocol
   - NAP inconsistency introduced → immediate correction
   - Duplicate listing appearance → merge/remove

4. CONTENT DEFENSE:
   - Content decay (pages losing traffic) → content refresh
   - Competitor content surpassing ours → gap analysis
   - Broken links/pages → immediate fix
```

---

## 8. PHASE: RENEWAL / OFFBOARD

### 8.1 Renewal Process

```
60 days before anniversary:
  1. Generate year-in-review report:
     - All-time score journey (month-by-month)
     - SoLV/WVS trends for full year
     - ROI calculation (all 3 methods from SPEC-016 §6.3)
     - Competitive position changes
     - Total work completed summary
  
  2. Generate renewal proposal:
     - Year 2 strategy and objectives
     - Recommended tier (same, upgrade, or downgrade)
     - New opportunities identified
     - Projected outcomes for Year 2

30 days before anniversary:
  3. Deliver to client + schedule renewal meeting
  4. QBR format with year-in-review + renewal proposal
```

### 8.2 Offboarding Process

If client does not renew:

```
1. Final deliverables:
   ☐ Final monthly report
   ☐ Export all tracking data (Google Sheets access transfer)
   ☐ Document all active optimizations in place
   ☐ Transfer Looker Studio dashboard ownership (or revoke access)
   ☐ Provide list of all content created (with URLs)
   ☐ Provide list of all citations submitted (with login info if owned)

2. Access handoff:
   ☐ Remove agency from GBP management
   ☐ Transfer website credentials back to client
   ☐ Document all tools/accounts created on client's behalf

3. Data retention:
   ☐ Archive client project file (12 months)
   ☐ Archive tracking data (24 months)
   ☐ Delete access credentials immediately

4. Follow-up:
   ☐ 3-month check-in (friendly email showing rank changes since offboarding)
   ☐ This often triggers re-engagement when rankings decline
```

---

## 9. MULTI-CLIENT DASHBOARD

### 9.1 Portfolio Overview

```
SILAS PORTFOLIO DASHBOARD — 20 Clients

CLIENT HEALTH SUMMARY:
  🟢 Thriving (90+):     4 clients
  🟢 Healthy (75-89):    8 clients
  🟡 Needs Attention:    5 clients
  🔴 At Risk:            2 clients
  ⚫ Critical:            1 client

TOP PERFORMERS THIS MONTH:
  1. Client A — SoLV +12% (34% → 46%)
  2. Client B — 25 new reviews, rating 4.3 → 4.6
  3. Client C — Map Pack rate 45% → 68%

NEEDS ATTENTION:
  ⚠ Client X — SoLV dropped 8% (competitor surge)
  ⚠ Client Y — 0 new reviews in 45 days
  ⚠ Client Z — Website CWV failing (LCP 4.2s)

UPCOMING DEADLINES:
  📊 Monthly reports due: Feb 1 (18 clients)
  📊 QBR scheduled: Feb 15 (Client A, Client D)
  🔄 Renewal due: Mar 1 (Client G)
  
BUDGET STATUS:
  SerpAPI: $340 / $500 (68% used)
  Claude API: $89 / $200 (45% used)
  Total operational: $429 / $700
```

### 9.2 Client Comparison Matrix

```
| Client | Phase | Score | SoLV | Reviews | MoM Δ | Health |
|--------|-------|-------|------|---------|-------|--------|
| Client A | Mature | 8.2 | 46% | 234 | +12% | 🟢 92 |
| Client B | Active | 6.5 | 28% | 167 | +6% | 🟢 78 |
| Client C | Active | 5.8 | 22% | 89 | +3% | 🟡 65 |
| ... | | | | | | |
```

### 9.3 Resource Allocation View

```
OPERATOR TIME ALLOCATION (this week):

High Priority (manual action required):
  ☐ Client X: GBP edits (30 min)
  ☐ Client Y: WordPress content publish (1 hr)
  ☐ Client Z: Review response batch (20 min)

Medium Priority:
  ☐ Client A: Social media posts (15 min)
  ☐ Client D: Citation submissions (45 min)

Low Priority (can defer):
  ☐ Client F: Photo upload to GBP (10 min)
  ☐ Client H: LinkedIn article publish (20 min)

Estimated total: 3 hours 20 minutes
```

---

## 10. COMMUNICATION TEMPLATES

### 10.1 Client Communication Cadence

| Communication | Frequency | Channel | Tone |
|--------------|-----------|---------|------|
| Monthly report delivery | Monthly | Email + PDF | Professional, data-driven |
| Quick win notification | As earned | Email or Slack | Celebratory, specific |
| Anomaly alert | As needed | Email or call | Calm, factual, solution-oriented |
| QBR meeting | Quarterly | Video call + presentation | Strategic, consultative |
| Renewal discussion | Annual | Call + proposal | Value-focused, forward-looking |

### 10.2 Quick Win Notification Template

```
Subject: 🎉 Quick Win — [Business Name] Now Ranking #1 for "[keyword]"

Hi [Contact],

Wanted to share a quick win — [Business Name] is now showing up as the 
#1 result in Google Maps for "[keyword]" at [X]% of the tracking locations 
we monitor. That's up from #[previous] last month.

This improvement followed the [optimization we made] last week. We'll have 
the full breakdown in your monthly report, but wanted you to see this right away.

Next up, we're working on [next priority] to push results even further.

Best,
[Agency Name]
```

### 10.3 Anomaly Communication Template

```
Subject: Update Required — [Business Name] Ranking Change Detected

Hi [Contact],

Our monitoring system detected a change in your local search visibility 
this week. Your visibility dropped from [X]% to [Y]% for "[keyword]."

What we know:
• [Brief factual description of the change]
• [Whether competitors showed similar changes]

What we're doing:
• [Diagnostic steps in progress]
• [Timeline for investigation]
• [Any immediate action taken]

This type of fluctuation [is/isn't] unusual and [explanation of likely cause].
We'll have a full analysis in [timeframe].

No action needed on your end — we're on it.

Best,
[Agency Name]
```

---

## 11. OPERATIONAL METRICS

### 11.1 Agency-Level KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Client retention rate | >85% annually | Renewals / total clients |
| Average client health score | >75 | Portfolio average |
| Report delivery on-time rate | 100% | Reports delivered by deadline |
| Task completion rate | >90% per sprint | Completed / planned tasks |
| Average SoLV improvement (month 3) | +15 points | New client avg improvement |
| Client response/engagement rate | >60% | Clients viewing reports regularly |
| Revenue per client | >$1,500/mo avg | Total revenue / client count |
| Operating margin | >80% | Revenue - tools/API costs |
| Operator time per client | <4 hrs/mo | Manual time tracking |

### 11.2 Silas Efficiency Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Audit generation time | <30 minutes | Crawl-to-report clock time |
| Report generation time | <15 minutes | Data pull to PDF export |
| Task generation accuracy | >95% | Tasks that require no operator correction |
| API cost per client/month | <$25 | SerpAPI + Claude + other APIs |
| Autonomous task completion | >60% | Tasks Silas completes without operator |

---

## 12. GLOSSARY

| Term | Definition |
|------|-----------|
| **Lifecycle Phase** | Stage of the client relationship (Prospect → Onboarding → Active → Mature → Renewal) |
| **Client Tier** | Service level (Starter/Standard/Premium/Enterprise) determining scope and pricing |
| **Sprint** | Time-boxed execution period, typically 1 month aligned with reporting |
| **Client Health Score** | 0-100 composite metric reflecting overall client status |
| **Quick Win** | High-impact, low-effort optimization that produces visible results quickly |
| **Portfolio Dashboard** | Aggregate view of all clients' status and needs |
| **Onboarding Audit** | Comprehensive initial assessment establishing baseline metrics |
| **Maintenance Mode** | Reduced-intensity optimization focused on defense and expansion |
| **Offboarding** | Structured process for transferring deliverables when a client leaves |
| **Retainer Defense** | QBR strategy for demonstrating ROI and justifying continued service |

---

## 13. CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial specification — complete client lifecycle management |

---

*End of SPEC-020*
