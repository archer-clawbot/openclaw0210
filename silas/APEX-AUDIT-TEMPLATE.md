# CATALYST AUDIT OUTPUT TEMPLATE
## Mandatory format for all SEO audit reports produced by Silas

When you receive an audit request (new client intake, prospect audit, or periodic re-audit), you MUST produce the report in this exact format. Do not freestyle. Every section is required. If you cannot obtain data for a section, mark it "DATA UNAVAILABLE — requires [tool/access]" rather than omitting it.

---

# START OF TEMPLATE

---

# CATALYST SEO Audit Report
## [Business Name]
### [domain.com]

**Audit Date:** [Date]
**Prepared By:** LocalCatalyst.ai
**Audit Type:** [New Client Intake / Prospect Audit / Quarterly Re-Audit]
**Auditor:** Silas (CATALYST Engine)

---

## 1. EXECUTIVE SUMMARY

[2-3 sentences. What is this business, what's their current SEO posture, and what's the single biggest thing holding them back. No fluff.]

---

## 2. MASTER SCORECARD

Score every domain on the 0-10 CATALYST scale. Each score MUST include a 1-sentence justification.

**Scoring Scale:**
- 0-2: Non-existent or critically broken
- 3-4: Minimal setup, major gaps
- 5-6: Partial implementation, clear opportunities
- 7-8: Good, fine-tuning needed
- 9-10: Fully optimized per CATALYST spec standards

```
ROUTE 1: GBP OPTIMIZATION
├── Services (SPEC-001):        [X/10] — [justification]
├── Description (SPEC-002):     [X/10] — [justification]
├── Q&A (SPEC-003):             [X/10] — [justification]
├── Products (SPEC-004):        [X/10] — [justification]
├── Posting (SPEC-005):         [X/10] — [justification]
└── Route 1 Average:            [X/10]

ROUTE 2: WEBSITE
├── Location Silos (SPEC-006):  [X/10] — [justification]
├── Grounding Boxes (SPEC-007): [X/10] — [justification]
├── Schema (SPEC-008):          [X/10] — [justification]
├── Technical SEO (SPEC-009):   [X/10] — [justification]
├── On-Page Content (SPEC-010): [X/10] — [justification]
└── Route 2 Average:            [X/10]

ROUTE 4: OFF-SITE
├── Citations (SPEC-011):       [X/10] — [justification]
├── Reviews (SPEC-012):         [X/10] — [justification]
├── Link Authority (013/014):   [X/10] — [justification]
└── Route 4 Average:            [X/10]

ROUTE 5: TRACKING
├── Rank Tracking (SPEC-015):   [X/10] — [justification]
├── Reporting (SPEC-016):       [X/10] — [justification]
└── Route 5 Average:            [X/10]

AI/CROSS-PLATFORM
├── LLM Visibility (SPEC-017):  [X/10] — [justification]
├── Platform Presence (018):    [X/10] — [justification]
└── AI Average:                 [X/10]

════════════════════════════════════
OVERALL CATALYST SCORE:              [X/10]
════════════════════════════════════
```

**Score Calculation:** Overall = weighted average. Route 1 (25%) + Route 2 (30%) + Route 4 (25%) + Route 5 (10%) + AI/XP (10%).

---

## 3. SERP VISIBILITY

### 3.1 Primary Keywords

Use web_search to check actual rankings. Do NOT estimate or guess.

| Keyword | Position | URL Ranking | Local Pack? | Notes |
|---------|----------|-------------|-------------|-------|
| [primary keyword + city] | [#] | [URL] | [Yes/No] | |
| [primary keyword + near me] | [#] | [URL] | [Yes/No] | |
| [service keyword + city] | [#] | [URL] | [Yes/No] | |

### 3.2 Secondary Market Keywords

| Keyword | Position | Top Competitor | Gap Analysis |
|---------|----------|----------------|--------------|
| [keyword + secondary city] | [# or "Not in Top 20"] | [competitor domain] | [what they're doing that client isn't] |

### 3.3 SERP Feature Presence

| Feature | Present? | Notes |
|---------|----------|-------|
| Local Pack (Map) | [Yes/No] | |
| Knowledge Panel | [Yes/No] | |
| FAQ Rich Snippets | [Yes/No] | |
| Star Ratings | [Yes/No] | |
| Sitelinks | [Yes/No] | |
| People Also Ask | [Yes/No — are they cited?] | |

---

## 4. GOOGLE BUSINESS PROFILE AUDIT

Use web_search to find GBP listing. Search: "[business name]", "[business name] Google Maps", "[business name] [city]".

### 4.1 GBP Status

| Element | Status | Score Impact |
|---------|--------|-------------|
| Listing Exists | [Yes/No] | [If No: Route 1 scores all = 0] |
| Verified | [Yes/No/Unknown] | |
| Primary Category | [category or "Not set"] | |
| Secondary Categories | [list or "None"] | |
| Address Visible | [Yes/No] | |
| Phone Number | [number or "Not listed"] | |
| Website Link | [URL or "Not linked"] | |
| Business Hours | [Set/Not set] | |
| Service Areas | [list or "Not configured"] | |

### 4.2 GBP Content

| Element | Count/Status | Quality Assessment |
|---------|-------------|-------------------|
| Photos | [count] | [assessment] |
| Posts (last 30 days) | [count] | [frequency, quality] |
| Q&A | [count] | [owner-seeded or organic] |
| Products | [count] | [configured properly?] |
| Services | [count] | [match website services?] |
| Description | [present/missing] | [keyword-rich? entity co-citations?] |

### 4.3 Reviews

| Platform | Count | Average Rating | Response Rate |
|----------|-------|---------------|---------------|
| Google | [count] | [rating] | [% responded] |
| Yelp | [count] | [rating] | [% responded] |
| Facebook | [count] | [rating] | [% responded] |
| BBB | [count] | [rating] | [% responded] |
| Industry-specific | [count] | [rating] | [% responded] |

---

## 5. WEBSITE TECHNICAL AUDIT

### 5.1 Performance

| Metric | Value | CATALYST Target | Status |
|--------|-------|-------------|--------|
| Page Load Time | [ms] | < 2000ms | [Pass/Fail] |
| TTFB | [ms] | < 200ms | [Pass/Fail] |
| LCP | [s] | < 2.5s | [Pass/Fail] |
| CLS | [score] | < 0.1 | [Pass/Fail] |
| INP | [ms] | < 200ms | [Pass/Fail] |
| Document Size | [KB] | < 500KB | [Pass/Fail] |

### 5.2 Technical Checklist

| Element | Status | Notes |
|---------|--------|-------|
| HTTPS | [Pass/Fail] | |
| Mobile Responsive | [Pass/Fail] | |
| Canonical Tags | [Pass/Fail] | |
| Robots.txt | [Pass/Fail] | |
| XML Sitemap | [Pass/Fail] | [URL count] |
| WWW Redirect | [Pass/Fail] | |
| 404 Page | [Pass/Fail] | |
| Hreflang (if multilingual) | [Pass/Fail/N/A] | |
| Core Web Vitals | [Pass/Fail] | |

### 5.3 Schema Markup (SPEC-008)

*Enhanced by cseo-schema-validator. See `ref:schema-deprecations` for rich result eligibility.*

| Schema Type | Present? | Valid? | Rich Result Eligible? | Notes |
|------------|----------|--------|----------------------|-------|
| LocalBusiness | [Yes/No] | [Yes/No] | Yes (Knowledge Panel) | [completeness + subtype used] |
| FAQPage | [Yes/No] | [Yes/No] | No (restricted Aug 2023) | [still useful for AI signal] |
| BreadcrumbList | [Yes/No] | [Yes/No] | Yes | |
| AggregateRating | [Yes/No] | [Yes/No] | Yes (stars) | |
| Service | [Yes/No] | [Yes/No] | No (semantic only) | |
| VideoObject | [Yes/No] | [Yes/No] | Yes (video carousel) | |
| Article (blog) | [Yes/No] | [Yes/No] | Conditional | |
| GeoCoordinates | [Yes/No] | [Yes/No] | No (embedded) | |
| HowTo | [Yes/No] | [Yes/No] | No (removed Sept 2023) | [AI signal only] |

**Schema health:** [X/9 required types present]
**NAP consistency in schema:** [Consistent / Mismatch — details]
**Deprecated schema flags:** [None / list with notes]

### 5.4 Site Architecture

| Page Type | Count | Avg Word Count | Internal Links | Quality |
|-----------|-------|---------------|----------------|---------|
| Homepage | 1 | [count] | [count] | [assessment] |
| Service Pages | [count] | [avg] | [avg] | [assessment] |
| City/Location Pages | [count] | [avg] | [avg] | [assessment] |
| POI/Landmark Pages | [count] | [avg] | [avg] | [assessment] |
| Blog Posts | [count] | [avg] | [avg] | [assessment] |
| Total Indexed | [count] | | | |

---

## 6. ON-PAGE SEO AUDIT (SPEC-010)

### 6.1 Homepage Meta

| Element | Content | Length | Assessment |
|---------|---------|--------|------------|
| Title | [exact title] | [chars] | [good/needs work — why] |
| Meta Description | [exact description] | [chars] | [good/needs work — why] |
| H1 | [exact H1] | | [good/needs work — why] |
| OG Tags | [present/missing] | | |
| Twitter Cards | [present/missing] | | |

### 6.2 Image SEO

| Metric | Value | Notes |
|--------|-------|-------|
| Total Images | [count] | |
| Images with Alt Text | [count] | |
| CSS Background Images (no alt) | [count] | [SEO invisible] |
| Image Compression | [assessment] | |
| WebP/AVIF Usage | [Yes/No] | |

### 6.3 E-E-A-T Assessment

*Enhanced by cseo-content-quality. See `ref:eeat-rubric` for scoring criteria.*

```
Experience (E1):      [X/10] × 0.20 = [weighted]
Expertise (E2):       [X/10] × 0.25 = [weighted]
Authoritativeness (A): [X/10] × 0.25 = [weighted]
Trustworthiness (T):  [X/10] × 0.30 = [weighted]
──────────────────────────────────────
Composite E-E-A-T Score:  [X.X/10]
```

**Top 3 E-E-A-T gaps:**
1. [Gap + recommended action + spec reference]
2. [Gap + recommended action + spec reference]
3. [Gap + recommended action + spec reference]

**AI content risk:** [None/Low/Medium/High] — [1-sentence rationale]

### 6.4 Content Quality Signals

| Signal | Status | Notes |
|--------|--------|-------|
| Unique Content per Page | [Yes/Partial/No] | |
| Grounding Boxes Present | [Yes/No] | [per SPEC-007] |
| Location Silos Structured | [Yes/No] | [per SPEC-006] |
| External Authority Links | [count] | [to .gov, .edu, industry] |
| Internal Link Structure | [Strong/Weak] | |
| Thin Content Pages | [count] | [pages < 300 words] |
| Duplicate Content Risk | [None/Low/Medium/High] | |

---

## 7. OFF-SITE AUDIT

### 7.1 Citation Profile (SPEC-011)

Use web_search to verify. Search: "[business name] [city]", "[phone number]", "[address]".

| Directory | Listed? | NAP Correct? | Link to Site? |
|-----------|---------|-------------|---------------|
| Google Business Profile | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| Yelp | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| BBB | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| Facebook | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| Angi | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| HomeAdvisor | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| Yellow Pages | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| Apple Maps | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| Bing Places | [Yes/No] | [Yes/No/N/A] | [Yes/No] |
| Industry-Specific | [Yes/No] | [Yes/No/N/A] | [Yes/No] |

**Confirmed NAP:**
```
[Business Name]
[Address Line 1]
[City, State ZIP]
[Phone]
[Email]
[Website URL]
```

**Citation Count:** [X] found / 50+ recommended
**NAP Consistency:** [Consistent / Inconsistent — describe discrepancies]

### 7.2 Backlink Profile

| Metric | Value | Competitor Avg |
|--------|-------|---------------|
| Estimated Total Backlinks | [count] | [competitor avg] |
| Referring Domains | [count] | [competitor avg] |
| Domain Authority/Rating | [score] | [competitor avg] |
| Toxic/Spam Links | [count or assessment] | |

Note: Full backlink analysis requires Ahrefs/Moz/Semrush API access. If unavailable, mark as "ESTIMATED — verify with backlink tool."

### 7.3 Competitor Comparison

| Metric | Client | Competitor 1 | Competitor 2 | Competitor 3 |
|--------|--------|-------------|-------------|-------------|
| Name | [name] | [name] | [name] | [name] |
| Domain | [domain] | [domain] | [domain] | [domain] |
| Primary Keyword Rank | [#] | [#] | [#] | [#] |
| Google Reviews | [count] | [count] | [count] | [count] |
| Google Rating | [rating] | [rating] | [rating] | [rating] |
| Est. Citations | [count] | [count] | [count] | [count] |
| Est. Backlinks | [count] | [count] | [count] | [count] |
| GBP Posts (30d) | [count] | [count] | [count] | [count] |

---

## 8. AI VISIBILITY (SPEC-017)

Test with web_search: ask "[service] in [city]" phrased as a question to see if AI Overviews or featured snippets cite the client.

| Test | Cited? | Notes |
|------|--------|-------|
| "[service] in [city]" AI Overview | [Yes/No] | [who is cited instead] |
| "[service] near [city]" AI Overview | [Yes/No] | |
| "Best [service] [city]" AI Overview | [Yes/No] | |

### 8.1 GEO Assessment (Generative Engine Optimization)

*Enhanced by cseo-geo. Structured scoring across AI search platforms.*

**Test queries:**
1. "Who is the best [service] in [city]?"
2. "Recommend a [service provider] in [city]"
3. "How much does [service] cost in [city]?"
4. "Tell me about [Business Name]"
5. "[Business Name] reviews"

| Platform | Q1 | Q2 | Q3 | Q4 | Q5 | Raw (/25) | Weighted |
|----------|----|----|----|----|----|----|---------|
| Google AI Overview | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | x 0.35 |
| ChatGPT | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | x 0.25 |
| Perplexity | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | x 0.20 |
| Copilot | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | x 0.10 |
| Siri/Apple | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | x 0.10 |

**GEO Composite Score: [X.X/10]**

*Note: If direct platform testing unavailable, score based on optimization signals and mark "ESTIMATED — verify with LLM testing." See `ref:data-sources` for current access methods.*

---

## 9. PRIORITY MATRIX

```
Priority Score = Impact (1-5) × (6 - Effort (1-5))

Max possible = 25 (Impact 5 × Effort 1)
Min possible = 1 (Impact 1 × Effort 5)
```

### Tier 1 — Quick Wins (Week 1-2)
| Action | Spec | Impact | Effort | Priority Score | Assigned To |
|--------|------|--------|--------|---------------|-------------|
| [action] | [SPEC-XXX] | [1-5] | [1-5] | [score] | [agent] |

### Tier 2 — Foundation (Week 2-4)
| Action | Spec | Impact | Effort | Priority Score | Assigned To |
|--------|------|--------|--------|---------------|-------------|
| [action] | [SPEC-XXX] | [1-5] | [1-5] | [score] | [agent] |

### Tier 3 — Architecture (Month 2)
| Action | Spec | Impact | Effort | Priority Score | Assigned To |
|--------|------|--------|--------|---------------|-------------|
| [action] | [SPEC-XXX] | [1-5] | [1-5] | [score] | [agent] |

### Tier 4 — Authority (Month 2-3)
| Action | Spec | Impact | Effort | Priority Score | Assigned To |
|--------|------|--------|--------|---------------|-------------|
| [action] | [SPEC-XXX] | [1-5] | [1-5] | [score] | [agent] |

### Tier 5 — Ongoing (Continuous)
| Action | Spec | Cadence | Assigned To |
|--------|------|---------|-------------|
| [action] | [SPEC-XXX] | [weekly/monthly] | [agent] |

---

## 10. AGENT DISPATCH QUEUE

Tasks ready for Archer to route:

```
DISPATCH QUEUE — [Client Name] — [Date]
═══════════════════════════════════════

1. → Wrench: [specific technical fix, spec reference]
2. → Scribe: [content brief, spec reference]
3. → Herald: [GBP action, spec reference]
4. → Citadel: [citation/review task, spec reference]
5. → Lookout: [tracking setup, spec reference]
6. → Razor: [CRO audit if applicable]
7. → Ghost: [PBN task if applicable — requires operator approval]
```

---

## 11. EXPECTED RESULTS TIMELINE

| Timeframe | Expected Outcome | Key Metric |
|-----------|------------------|-----------|
| Week 2 | [outcome] | [metric] |
| Month 1 | [outcome] | [metric] |
| Month 2 | [outcome] | [metric] |
| Month 3 | [outcome] | [metric] |
| Month 6 | [outcome] | [metric] |

---

## 12. INVESTMENT & ROI PROJECTION

| Service | Monthly Cost | Duration |
|---------|-------------|----------|
| [service tier or scope] | $[amount] | [months] |

**Projected ROI:** [Based on current traffic, conversion rates, and industry benchmarks]

---

## 13. CONCLUSION

[3-5 sentences. What's the verdict, what's the #1 priority, and what happens if they do nothing vs. execute the plan. End with a clear next step.]

---

*Prepared using the CATALYST SEO Methodology by LocalCatalyst.ai*
**Next Step:** [Specific action — schedule call, approve plan, begin onboarding]

# END OF TEMPLATE

---

## TEMPLATE USAGE RULES FOR SILAS

1. **Never skip sections.** If you can't get data, say so. Don't omit.
2. **Always use web_search** for SERP data, GBP verification, citation checks, and competitor analysis. Never estimate what you can verify.
3. **Scores must have justifications.** A naked number is meaningless to a client.
4. **The Priority Matrix must reference specs.** Every action ties back to a SPEC-XXX.
5. **The Dispatch Queue is for Archer.** It tells him exactly what to route where after the audit is approved.
6. **Client-facing sections:** 1-3, 9, 11-13. Internal sections: 4-8, 10. When producing a "client-ready" report, include everything but note which sections are for internal strategy review.
7. **File naming:** `deliverables/{client-slug}/silas/{YYYY-MM-DD}-audit.md`
8. **Overall score weighting:** Route 1 (25%) + Route 2 (30%) + Route 4 (25%) + Route 5 (10%) + AI/XP (10%). This ensures GBP and website carry the most weight for local SEO clients.
