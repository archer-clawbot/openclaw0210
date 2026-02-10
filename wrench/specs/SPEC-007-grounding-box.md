# SPEC-007: Grounding Box Offensive
## Silas Engine — Route 2: Website Optimization Pipeline
### Version 1.0 | Website Optimization Group

---

## 1. PURPOSE

This specification defines Silas's methodology for engineering "grounding boxes" — hidden, machine-readable content blocks deployed on client pages that serve as pre-packaged perfect answers for Google's AI Overview system and other AI crawlers. A grounding box feeds AI systems a structured, authoritative, self-contained answer to a specific query without affecting the page's visual design for human visitors.

**Core principle:** "The AI doesn't read your whole page. Give it a cheat sheet stapled to the back — a perfect answer it can extract in milliseconds."

**Cross-reference:** For the full implementation system including HTML templates, CSS cloaking, deployment scripts, and monitoring, see the extended document `silas-spec-09-grounding-boxes.md` (legacy numbering). This spec defines the strategic framework; SPEC-009 contains the engineering details.

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-006: Semantic Location Silo | Grounding boxes deploy on hub and spoke pages |
| SPEC-008: Schema & Structured Data | Each grounding box wraps content in appropriate schema |
| SPEC-009: Technical SEO (legacy numbering) | Extended implementation details |
| SPEC-010: On-Page Content | Visible page content and grounding box content must be consistent |
| SPEC-015: Geo-Grid Rank Tracking | Tracks AI Overview capture rates per query |
| SPEC-017: LLM SEO / StealthRank | Grounding boxes feed the same AI systems StealthRank targets |
| SPEC-018: Cross-Platform AI Ecosystem | Grounding box content propagates across AI platforms |

---

## 3. CORE CONCEPT

### 3.1 What Is a Grounding Box?

A grounding box is a `<section>` element containing optimized content wrapped in semantic HTML and JSON-LD schema, styled with `visibility: hidden` or positioned off-screen so human visitors never see it but AI crawlers parse it fully. It is designed to be:

- **Self-contained:** The AI extracts a complete answer from this single block
- **Machine-readable:** Pure semantic HTML with no JavaScript dependencies
- **Fast-rendering:** Inline critical CSS, sub-100ms render target
- **Query-matched:** Each box targets a specific high-intent query or query cluster

### 3.2 Why It Works

Google's AI Overview pre-selection algorithm evaluates candidate pages for:

1. **Speed of extraction** — pure HTML wins over JS-rendered content
2. **Answer completeness** — self-contained response with no external dependencies
3. **Structural clarity** — semantic markup (headings, lists, tables, schema)
4. **E-E-A-T signals** — authority and experience indicators
5. **Local relevance** — location-specific signals for geo-queries

A grounding box scores maximally on all five because it's engineered specifically for machine consumption.

### 3.3 Relationship to Visible Content

The grounding box does NOT replace on-page content. The visible page serves human visitors and traditional organic ranking. The grounding box is an additional layer — a condensed, optimized version of the same information for AI extraction. The content must be consistent with the visible page; contradictions would trigger spam detection.

---

## 4. GROUNDING BOX STRUCTURE

### 4.1 HTML Template

```html
<!-- GROUNDING BOX — Target Query: "{PRIMARY_QUERY}" -->
<section class="gb-container" 
  aria-hidden="true"
  itemscope itemtype="https://schema.org/{RelevantType}">

  <!-- Direct Answer -->
  <h2 itemprop="name">{Exact query phrased as a heading}</h2>
  <p itemprop="description">
    <strong>{1-2 sentence definitive answer with specific numbers/facts.}</strong>
  </p>

  <!-- Supporting Data Table -->
  <table>
    <thead>
      <tr><th>{Factor}</th><th>{Value/Range}</th></tr>
    </thead>
    <tbody>
      <tr><td>{Detail 1}</td><td>{Specific data}</td></tr>
      <tr><td>{Detail 2}</td><td>{Specific data}</td></tr>
      <tr><td>{Detail 3}</td><td>{Specific data}</td></tr>
    </tbody>
  </table>

  <!-- Contextual Expansion -->
  <p>{2-3 sentences expanding the answer with local specifics, credentials, 
  and verifiable facts. Include business name, city, and trust signal.}</p>

  <!-- Entity & Authority Signals -->
  <div itemprop="provider" itemscope itemtype="https://schema.org/LocalBusiness">
    <meta itemprop="name" content="{Business Name}">
    <meta itemprop="telephone" content="{Phone}">
    <meta itemprop="address" content="{Full Address}">
  </div>
</section>
```

### 4.2 CSS Hiding Methods

```css
/* Method 1: Visibility hidden (preferred — content still in DOM) */
.gb-container {
  visibility: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

/* Method 2: Off-screen positioning */
.gb-container {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
}
```

**Critical:** Do NOT use `display: none` — Google may ignore content with display:none. Use visibility/position-based hiding that keeps content in the DOM and parseable by crawlers.

### 4.3 Content Rules

| Rule | Rationale |
|------|-----------|
| Lead with the direct answer (no preamble) | AI systems extract the first substantive sentence |
| Include specific numbers | "Starts at $2,800" not "Contact for pricing" |
| Use tables for comparative data | AI prefers structured data over prose |
| Keep box self-contained | Answer shouldn't require reading the rest of the page |
| One box per target query | Multiple boxes per query dilute signal |
| Place near top of page source | Higher DOM position = higher extraction priority |
| Wrap in appropriate schema | Schema validates the content type for AI |

---

## 5. TARGET QUERY IDENTIFICATION

### 5.1 Finding Grounding Box Targets

For each client, identify queries where:
1. An AI Overview currently appears in search results (these are extractable positions)
2. The client's page ranks on page 1 but isn't being cited in the AI Overview
3. No competitor has a well-structured answer (the AI Overview cites generic sources)

### 5.2 Common Query Patterns for Local Businesses

| Pattern | Example |
|---------|---------|
| "How much does [service] cost in [city]?" | "How much does a tankless water heater cost in Sugar Land?" |
| "Best [service provider] in [city]" | "Best plumber in Sugar Land" |
| "What to look for in a [provider]" | "What to look for in a hair salon" |
| "[Service A] vs [Service B]" | "Balayage vs traditional highlights" |
| "How long does [service] take?" | "How long does a kitchen remodel take?" |
| "Do I need [service] for [situation]?" | "Do I need a permit for water heater replacement?" |

### 5.3 Priority Ranking

```
Priority = AI Overview Presence × Page 1 Ranking × Commercial Intent

Where:
- AI Overview Presence: Does an AI Overview appear? (Yes = 1, No = 0)
- Page 1 Ranking: Is the client on page 1? (Yes = high priority target)
- Commercial Intent: Does the query lead to a purchase? (High = priority)
```

---

## 6. DEPLOYMENT STRATEGY

### 6.1 Deployment Priority

1. **Homepage** — 1-2 grounding boxes for the primary service + city query
2. **City Hub pages** — 1 grounding box per hub targeting "[service] in [city]"
3. **Service pages** — 1 grounding box per service targeting "how much / what to expect"
4. **Neighborhood spokes** — 1 grounding box for high-value neighborhood queries
5. **FAQ/Guide pages** — 1 grounding box per major question the page answers

### 6.2 Scale

| Client Size | Target Grounding Boxes |
|-------------|----------------------|
| Single location, small service menu | 5-10 |
| Single location, broad services | 10-20 |
| Multi-location | 15-30 |
| Enterprise/large service area | 30-50 |

---

## 7. DELIVERABLE FORMAT

```markdown
# GROUNDING BOX DEPLOYMENT PACKAGE
## [Client Name] — [Date]

### Target Query: "[Query Text]"
**Deploy On:** [Page URL]
**Position:** Before closing </main> tag
**Schema Type:** [Schema type]

```html
[Complete HTML for grounding box]
```

### Target Query: "[Next Query]"
[...repeat for each grounding box...]

---

### DEPLOYMENT CHECKLIST
☐ All grounding boxes use consistent CSS class
☐ CSS hiding rule added to site stylesheet
☐ Schema validates (test at validator.schema.org)
☐ Content consistent with visible page content
☐ aria-hidden="true" on all grounding box containers
```

---

## 8. SCORING RUBRIC

| Score | Criteria |
|-------|----------|
| **0** | No structured content targeting AI extraction. |
| **3** | Some FAQ content but not optimized for extraction, no hidden boxes. |
| **5** | A few structured answer blocks on key pages (visible, not hidden). |
| **7** | Grounding boxes on all major service pages, proper schema, hidden from visual. |
| **9** | Full deployment across all service + location pages, actively winning AI Overview citations. |
| **10** | Score 9 + tracked AI Overview capture rates, iterative optimization, competitive gap analysis. |

---

## 9. MONITORING & ITERATION

### 9.1 Track AI Overview Presence
- Weekly check: Is the client being cited in AI Overviews for target queries?
- If yes: document which grounding box triggered the citation
- If no: analyze what the AI Overview IS citing and adjust grounding box content

### 9.2 Iteration Loop
```
Deploy grounding box → Wait 2-4 weeks for indexing → Check AI Overview → 
  If cited: maintain and monitor
  If not cited: analyze competitor's cited content → adjust box content → redeploy
```

---

## 10. AUTOMATION PIPELINE

```
TRIGGER: Client website optimization cycle OR post-silo-build deployment

1. IDENTIFY target queries (Section 5)
2. PRIORITIZE by AI Overview presence + ranking + intent (Section 5.3)
3. GENERATE grounding box HTML for each target query
4. WRAP in appropriate schema
5. VALIDATE schema
6. FORMAT deployment package with page placement instructions
7. DELIVER to operator for CMS implementation

ESCALATION POINTS:
- CMS doesn't support custom HTML injection → provide plugin recommendations
- Client concerned about hidden content → explain AI Overview strategy and compliance
- Schema validation errors → debug and fix before delivery
```

---

*This spec is part of the Silas Engine, Route 2: Website Optimization Pipeline.*
*For extended engineering details, see silas-spec-09-grounding-boxes.md.*
