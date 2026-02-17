# Scoring Framework & Priority Matrix

## MASTER SCORECARD

Score every client across these domains (0-10 scale):

```
ROUTE 1: GBP OPTIMIZATION
├── Services (SPEC-001):        [ /10]
├── Description (SPEC-002):     [ /10]
├── Q&A (SPEC-003):             [ /10]
├── Products (SPEC-004):        [ /10]
├── Posting (SPEC-005):         [ /10]
└── Route 1 Average:            [ /10]

ROUTE 2: WEBSITE
├── Location Silos (SPEC-006):  [ /10]
├── Grounding Boxes (SPEC-007): [ /10]
├── Schema (SPEC-008):          [ /10]
├── Technical SEO (SPEC-009):   [ /10]
├── On-Page Content (SPEC-010): [ /10]
└── Route 2 Average:            [ /10]

ROUTE 4: OFF-SITE
├── Citations (SPEC-011):       [ /10]
├── Reviews (SPEC-012):         [ /10]
├── Link Authority (013/014):   [ /10]
└── Route 4 Average:            [ /10]

ROUTE 5: TRACKING
├── Rank Tracking (SPEC-015):   [ /10]
├── Reporting (SPEC-016):       [ /10]
└── Route 5 Average:            [ /10]

AI/CROSS-PLATFORM
├── LLM Visibility (SPEC-017):  [ /10]
├── Platform Presence (018):    [ /10]
└── AI Average:                 [ /10]

OVERALL READINESS:              [ /10]
```

### Scoring Scale
- 0-2: Non-existent or critically broken
- 3-4: Minimal setup, major gaps
- 5-6: Partial implementation, clear opportunities
- 7-8: Good, fine-tuning needed
- 9-10: Fully optimized per spec standards

---

## PRIORITY MATRIX

```
Priority Score = Impact (1-5) × (6 - Effort (1-5))

Impact:
  5 = Directly moves Map Pack rankings within 2 weeks
  4 = High impact within 1 month
  3 = Moderate impact within 2-3 months
  2 = Low impact, long-term play
  1 = Minimal direct ranking impact

Effort:
  1 = < 1 hour, Silas generates autonomously
  2 = 1-4 hours, Silas generates deliverables
  3 = 4-8 hours, may need operator action
  4 = 8-20 hours, significant project
  5 = 20+ hours, multi-week initiative
```

### Default Priority Stack (CATALYST Phasing)

**Tier 1 — Quick Wins (Week 1-2):** GBP description, services, Q&A, products, schema deployment, critical technical fixes, review response activation

**Tier 2 — Foundation (Week 2-4):** GBP posting cadence, citation audit + submissions, on-page optimization, geo-grid tracking setup, grounding boxes

**Tier 3 — Architecture (Month 2):** Location silos, cross-platform presence, YouTube, LLM optimization, reporting system

**Tier 4 — Authority (Month 2-3):** Expired domain prospecting, PBN deployment, parasite SEO, competitive displacement

**Tier 5 — Ongoing (Continuous):** Weekly GBP posts, weekly scans, monthly reports, review management, content refresh, quarterly LLM retests

### Dynamic Adjustment Rules
- If GBP already scores 8+: skip Tier 1 GBP tasks, advance to Route 2
- If website has zero schema: elevate SPEC-008 to Tier 1
- If reviews < 50 or rating < 4.0: elevate SPEC-012 to Tier 1
- If Core Web Vitals failing: elevate SPEC-009 to Tier 1 (blocking issue)
- If competitor link gap > 50 DR: elevate SPEC-013/014 to Tier 2

---

## SUPPLEMENTARY SEO HEALTH SCORE (Optional)

An optional 0-100 composite score that can be produced alongside the CATALYST 0-10 score for clients who want a granular technical SEO benchmark. This does NOT replace the CATALYST score — it supplements it.

### Formula

```
SEO Health Score (0-100) = sum of category scores:

Technical Health (30 points max):
├── CWV all Good:           10 pts (Partial: 5, All Poor: 0)
├── HTTPS + security:        5 pts
├── Mobile optimization:     5 pts
├── Crawlability:            5 pts
└── Site structure:           5 pts

Content Health (25 points max):
├── E-E-A-T composite >= 7:  10 pts (5-7: 5 pts, < 5: 0)
├── Content uniqueness:       5 pts
├── Alt text coverage > 90%:  5 pts
└── Schema completeness:      5 pts

Authority Health (25 points max):
├── Reviews (100+, 4.5+):    10 pts (50-100: 5 pts, < 50: 0)
├── Citations (30+, NAP ok):  10 pts
└── Backlink profile:          5 pts

Visibility Health (20 points max):
├── GEO composite >= 5:      10 pts (3-5: 5 pts, < 3: 0)
├── GBP optimization:         5 pts
└── Multi-platform presence:   5 pts
```

### Score Interpretation

| SEO Health Score | Label | Action |
|-----------------|-------|--------|
| 80-100 | Excellent | Maintenance mode — focus on freshness |
| 60-79 | Good | Fine-tuning — address specific gaps |
| 40-59 | Needs Work | Active optimization — follow Priority Matrix |
| 20-39 | Poor | Foundation building — Tier 1 tasks first |
| 0-19 | Critical | Emergency — technical/trust issues blocking progress |

### Mapping to CATALYST Score

| CATALYST Score (0-10) | Expected SEO Health Range |
|----------------------|--------------------------|
| 9-10 | 85-100 |
| 7-8 | 65-84 |
| 5-6 | 40-64 |
| 3-4 | 20-39 |
| 0-2 | 0-19 |

**Usage:** Include in audit Section 2 after the CATALYST score if the client or task requests a detailed SEO health benchmark. Otherwise omit to keep the report concise.
