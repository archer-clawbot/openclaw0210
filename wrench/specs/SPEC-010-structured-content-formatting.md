# SILAS SPEC #10 — STRUCTURED CONTENT FORMATTING SYSTEM
## Content Architecture for SERP Feature Capture & AI Extraction

**Spec ID:** SPEC-010-CONTENT-FORMATTING
**Version:** 1.0
**Dependencies:** SPEC-002 (On-Page SEO), SPEC-006 (Semantic Location Silos), SPEC-007 (Content Architecture), SPEC-009 (Grounding Boxes)

---

## 1. PURPOSE

This spec defines the exact formatting patterns Silas uses when generating visible on-page content for client sites. Every heading, paragraph, table, list, and definition block is structured to maximize capture of Google SERP features (featured snippets, People Also Ask, knowledge panels, passage indexing) and AI extraction (AI Overviews, ChatGPT citations, Perplexity references). This is the formatting layer that sits between raw content strategy (SPEC-007) and machine-targeted hidden content (SPEC-009 grounding boxes).

---

## 2. SERP FEATURE TAXONOMY

### 2.1 Target Features

Silas needs to understand which SERP features exist and what content format triggers each one:

| SERP Feature | Trigger Format | Content Length | Priority |
|---|---|---|---|
| **Featured Snippet — Paragraph** | Definition block (question as H2/H3, answer in first `<p>`) | 40–60 words | P0 |
| **Featured Snippet — Table** | HTML `<table>` with `<thead>` and `<tbody>` | 3–8 rows, 2–4 columns | P0 |
| **Featured Snippet — List** | HTML `<ol>` or `<ul>` directly under a heading | 3–8 items, each < 50 words | P1 |
| **People Also Ask (PAA)** | Question as heading + concise answer paragraph | 25–50 words per answer | P0 |
| **AI Overview Citation** | Structured content matching query intent exactly | Varies — first 200 words matter most | P0 |
| **Knowledge Panel Enhancement** | Schema markup + consistent entity signals | N/A (schema-driven, see SPEC-003) | P1 |
| **Passage Indexing** | Self-contained content blocks with clear heading boundaries | 100–300 words per passage | P1 |
| **Image Pack** | `<img>` with descriptive `alt`, inside relevant content section | Alt text < 125 chars | P2 |
| **Video Carousel** | Embedded YouTube with structured description (see APEX YouTube module) | N/A | P2 |
| **Local Pack Justification** | Service description matching query → justification snippet | 15–30 words shown | P0 |

### 2.2 Feature Priority by Page Type

| Page Type | Primary SERP Target | Secondary Target |
|---|---|---|
| City Hub (Level 1) | AI Overview Citation, Local Pack Justification | Featured Snippet — Paragraph |
| Service Page | Featured Snippet — Table (pricing), PAA | AI Overview Citation |
| Neighborhood Spoke (Level 2) | Local Pack Justification, Passage Indexing | PAA |
| Landmark/HOA Page (Level 3) | Passage Indexing (hyper-local queries) | Local Pack Justification |
| Blog / Resource Post | Featured Snippet (all types), PAA | AI Overview Citation |
| FAQ Page | PAA, Featured Snippet — List | AI Overview Citation |

---

## 3. CORE FORMATTING PATTERNS

### 3.1 The Definition Block (Featured Snippet — Paragraph)

The definition block is the single highest-value formatting pattern. It directly targets the paragraph featured snippet position.

**Structure:**
```html
<h2>What Is {QUERY_AS_QUESTION}?</h2>
<p>{DIRECT_ANSWER_40_TO_60_WORDS}</p>
```

**Rules:**
- The heading MUST contain the query as a question (or close semantic match)
- The first `<p>` immediately after the heading MUST contain the complete answer
- Answer length: 40–60 words (Google's snippet extraction window)
- First sentence answers the question directly — no preamble
- Include one specific data point (number, percentage, range) when applicable
- Name the location within the answer for local queries

**Example:**
```html
<h2>What Does AC Coil Replacement Cost in Fort Lauderdale?</h2>
<p>AC coil replacement in Fort Lauderdale typically costs between $1,200 and
$2,800 for an evaporator coil and $800 to $2,400 for a condenser coil. Coastal
properties along Galt Ocean Mile and Harbor Beach often pay 15–25% more due to
salt-air corrosion requiring marine-grade components. Total installed cost
depends on system tonnage, refrigerant type, and accessibility.</p>
```

**Anti-patterns (never do):**
```html
<!-- BAD: Heading is not a question -->
<h2>AC Coil Replacement Costs</h2>

<!-- BAD: First paragraph doesn't answer directly -->
<p>If you're a homeowner in Fort Lauderdale, you might be wondering about
the cost of replacing your AC coil. There are many factors to consider...</p>

<!-- BAD: Answer is too long (100+ words) -->
<p>[Giant paragraph that buries the actual answer in sentence 4]</p>

<!-- BAD: Answer has no specific data -->
<p>AC coil replacement costs vary depending on your situation. Contact us
for a free estimate to learn more about pricing in your area.</p>
```

### 3.2 The Comparison/Pricing Table (Featured Snippet — Table)

Tables are the most effective format for capturing pricing, comparison, and specification queries.

**Structure:**
```html
<h2>{SERVICE} Cost in {CITY} — {YEAR} Price Guide</h2>
<table>
  <thead>
    <tr>
      <th>{CATEGORY_LABEL}</th>
      <th>{VALUE_LABEL}</th>
      <th>{NOTES_LABEL}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{ITEM_1}</td>
      <td>{VALUE_1}</td>
      <td>{NOTE_1}</td>
    </tr>
    <!-- 3–8 rows total -->
  </tbody>
</table>
```

**Rules:**
- Always include `<thead>` and `<tbody>` — Google's table extractor requires both
- 2–4 columns maximum (Google truncates wider tables in snippets)
- 3–8 rows (fewer = too thin for snippet selection; more = gets truncated)
- First column = category/item name, second column = primary data, third = supporting context
- Heading directly above the table must contain the target query
- Use raw numbers in cells, not prose ("$1,200 – $2,800" not "approximately twelve hundred to twenty-eight hundred dollars")
- Include the year in the heading for freshness signal

**Table Types by Query Intent:**

**Cost/Pricing Table:**
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Service/Item | Price Range | Notes/Conditions |

**Comparison Table:**
| Column 1 | Column 2 | Column 3 | Column 4 |
|---|---|---|---|
| Option | Pros | Cons | Typical Cost |

**Specification Table:**
| Column 1 | Column 2 |
|---|---|
| Feature/Attribute | Value/Detail |

**Process/Timeline Table:**
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Step/Phase | Description | Duration/Cost |

### 3.3 The Step List (Featured Snippet — Ordered List)

Ordered lists target "how to" queries and process-oriented featured snippets.

**Structure:**
```html
<h2>How to {PROCESS_QUERY}</h2>
<ol>
  <li><strong>{STEP_NAME}:</strong> {STEP_DESCRIPTION_UNDER_50_WORDS}</li>
  <li><strong>{STEP_NAME}:</strong> {STEP_DESCRIPTION_UNDER_50_WORDS}</li>
  <!-- 3–8 items -->
</ol>
```

**Rules:**
- Always `<ol>` for processes, steps, rankings, or sequences
- 3–8 items (Google's featured snippet extraction window)
- Each `<li>` starts with a bolded label followed by a colon
- Each item is a single sentence or short phrase (under 50 words)
- The heading must contain "how to" or the process question
- If the process has more than 8 steps, break into phases — each phase gets its own `<ol>`

### 3.4 The Checklist/Feature List (Featured Snippet — Unordered List)

Unordered lists target "what are" and "signs of" queries.

**Structure:**
```html
<h2>{WHAT_ARE / SIGNS_OF / BENEFITS_OF} {TOPIC}?</h2>
<ul>
  <li><strong>{ITEM_NAME}:</strong> {BRIEF_EXPLANATION}</li>
  <!-- 3–8 items -->
</ul>
```

**Rules:**
- Use `<ul>` for non-sequential items: features, symptoms, benefits, types
- Same 3–8 item constraint as ordered lists
- Bold the key term at the start of each item
- Do NOT use `<ul>` for processes or rankings (those need `<ol>`)

### 3.5 The PAA Block (People Also Ask Optimization)

PAA blocks are clusters of question-answer pairs formatted to be extracted by Google's PAA system.

**Structure:**
```html
<h2>Frequently Asked Questions About {TOPIC} in {CITY}</h2>

<h3>{QUESTION_1}?</h3>
<p>{ANSWER_25_TO_50_WORDS}</p>

<h3>{QUESTION_2}?</h3>
<p>{ANSWER_25_TO_50_WORDS}</p>

<h3>{QUESTION_3}?</h3>
<p>{ANSWER_25_TO_50_WORDS}</p>
```

**Rules:**
- Each question is an `<h3>` (nested under the `<h2>` section heading)
- Each answer is a single `<p>` immediately after the `<h3>`
- Answer length: 25–50 words (shorter than definition blocks)
- Answers must be self-contained — no "as mentioned above" references
- Questions should come from actual PAA results for the target query (Silas pulls these during SPEC-002 keyword research)
- Minimum 3 questions, maximum 8 per PAA block
- Always pair with FAQPage schema (see SPEC-003)
- Position the PAA block in the bottom third of the page (after main content, before footer)

**Question Sourcing Priority:**
1. Actual PAA questions from Google SERP for the target keyword
2. "People Also Search For" suggestions
3. Google Autocomplete variations
4. Client-reported common customer questions
5. Silas-generated questions based on query intent analysis

### 3.6 The Passage Block (Passage Indexing Optimization)

Google's passage indexing allows a specific section of a longer page to rank independently for a query, even if the page as a whole targets a different keyword. Each passage block is a self-contained answer unit.

**Structure:**
```html
<h2>{SUBTOPIC_HEADING}</h2>
<p>{OPENING_SENTENCE_THAT_DIRECTLY_ADDRESSES_SUBTOPIC}</p>
<p>{SUPPORTING_DETAIL_1}</p>
<p>{SUPPORTING_DETAIL_2_WITH_DATA_POINT}</p>
<!-- Optional: table or list if relevant -->
```

**Rules:**
- Each passage block targets a distinct subtopic or long-tail query
- 100–300 words per block (the passage indexing extraction window)
- The block must make sense in isolation — a reader landing on this passage via Google should understand the context without reading the rest of the page
- Start with the most important information (inverted pyramid)
- Include at least one specific data point per passage
- Heading must be descriptive and keyword-relevant (not clever or vague)
- Clear heading boundaries between passages — no ambiguous section transitions

**Good heading for passage indexing:**
```html
<h2>How Long Does an AC Compressor Last in Fort Lauderdale?</h2>
```

**Bad heading for passage indexing:**
```html
<h2>The Lifespan Question</h2>
```

---

## 4. CONTENT BLOCK TEMPLATES BY PAGE TYPE

### 4.1 Service Page Template

Service pages are the highest-conversion pages and target both commercial and informational queries. Content blocks appear in this order:

```
BLOCK 1: Hero Definition Block
├── H1: {Service} in {City} — {Qualifier}
├── Opening paragraph (definition block format, 40-60 words)
└── Target: Featured Snippet — Paragraph

BLOCK 2: Pricing Table
├── H2: {Service} Cost in {City} — {Year} Pricing
├── Cost breakdown table (4-6 rows)
└── Target: Featured Snippet — Table

BLOCK 3: Process Steps
├── H2: How {Service} Works (or "What to Expect")
├── Ordered list (4-6 steps)
└── Target: Featured Snippet — Ordered List

BLOCK 4: Differentiator Passage
├── H2: Why {Service} in {City} Is Different
├── 150-250 word passage with local-specific factors
└── Target: Passage Indexing, AI Overview

BLOCK 5: Service Variations (if applicable)
├── H2: Types of {Service} We Offer in {City}
├── Unordered list or comparison table
└── Target: Featured Snippet — List/Table

BLOCK 6: PAA Block
├── H2: Common Questions About {Service} in {City}
├── 4-6 question/answer pairs
└── Target: People Also Ask

BLOCK 7: Local Authority Section
├── H2: {Service} in {Neighborhoods Served}
├── Brief paragraphs about 3-4 neighborhoods
├── Internal links to neighborhood spoke pages
└── Target: Local Pack Justification, Internal link equity
```

### 4.2 City Hub Page Template

City hub pages establish topical authority for the primary service + city combination and distribute link equity to neighborhood spokes.

```
BLOCK 1: Entity Definition
├── H1: {Primary Service Category} in {City}
├── Opening definition block (40-60 words)
└── Target: AI Overview Citation

BLOCK 2: Service Overview Table
├── H2: Our {Service Category} Services in {City}
├── Table: Service Name | Description | Starting Price
└── Target: Featured Snippet — Table

BLOCK 3: Why {City} Passage
├── H2: Why {City} {Property/Climate/Demographic} Needs {Service}
├── 200-word passage with city-specific factors
├── Named landmarks, weather patterns, building codes
└── Target: Passage Indexing, Local authority

BLOCK 4: Neighborhood Directory
├── H2: Serving All {City} Neighborhoods
├── Grid or list of neighborhood spoke pages with brief descriptions
├── Internal links to every Level 2 spoke
└── Target: Internal link distribution, Crawl efficiency

BLOCK 5: Embedded Map
├── Custom Google My Map with service area pins
└── Target: Geographic relevance signal

BLOCK 6: Aggregated Social Proof
├── H2: What {City} Customers Say
├── Review widget filtered to {City} reviews
└── Target: E-E-A-T, Trust signals

BLOCK 7: PAA Block
├── H2: Frequently Asked Questions — {Service} in {City}
├── 5-8 question/answer pairs
└── Target: People Also Ask
```

### 4.3 Neighborhood Spoke Page Template

Neighborhood pages target "[Service] [Neighborhood]" queries and signal geographic relevance to the GBP.

```
BLOCK 1: Neighborhood-Specific Definition
├── H1: {Service} in {Neighborhood}, {City}
├── Definition block with neighborhood-specific context
└── Target: Featured Snippet — Paragraph (hyper-local)

BLOCK 2: Neighborhood-Specific Challenges
├── H2: {Service} Challenges in {Neighborhood}
├── 150-200 word passage about housing stock, climate, or infrastructure
├── Named streets, subdivisions, building types
└── Target: Passage Indexing, Local authority

BLOCK 3: Service Pricing (if different from city average)
├── H2: {Service} Cost in {Neighborhood}
├── Brief pricing table or paragraph referencing city hub for full pricing
└── Target: Featured Snippet — Table (if table), Local relevance

BLOCK 4: Driving Directions
├── H2: Serving {Neighborhood} from Our {City} Location
├── Narrative directions from landmark to office
├── Named streets, distances, landmarks
└── Target: Geographic co-citation, GBP proximity signal

BLOCK 5: Nearby Areas
├── H2: Also Serving Areas Near {Neighborhood}
├── Links to 3-4 adjacent neighborhood spoke pages
└── Target: Internal link mesh, Crawl efficiency

BLOCK 6: Case Study / Social Proof
├── H2: Recent {Service} Work in {Neighborhood}
├── 100-word case study with specifics (building type, problem, solution)
└── Target: E-E-A-T, Passage Indexing
```

### 4.4 Blog / Resource Post Template

Blog posts target informational queries and feed PAA/AI Overview with educational content.

```
BLOCK 1: Topic Definition
├── H1: {Informational Query as Title}
├── Definition block answering the query (40-60 words)
└── Target: Featured Snippet — Paragraph

BLOCK 2: Key Takeaways (optional, for long posts)
├── H2: Key Takeaways
├── Unordered list of 3-5 summary points
└── Target: Featured Snippet — List

BLOCK 3-N: Topic Sections
├── H2: {Subtopic Heading}
├── Passage block (100-300 words each)
├── Tables, lists, or images where relevant
└── Target: Passage Indexing per section

BLOCK FINAL-1: PAA Block
├── H2: Related Questions About {Topic}
├── 3-5 question/answer pairs
└── Target: People Also Ask

BLOCK FINAL: Internal Link Section
├── H2: Related Services / Learn More
├── Links to relevant service pages and other blog posts
└── Target: Internal link equity, Topical cluster reinforcement
```

### 4.5 Landmark / HOA / Condo Page Template

These hyper-local pages target building-specific queries and signal deep geographic knowledge.

```
BLOCK 1: Building-Specific Opening
├── H1: {Service} for {Building/Complex Name}
├── Opening passage: system types, building age, specific challenges
├── NO generic content — every sentence must be specific to this building
└── Target: Passage Indexing, Hyper-local relevance

BLOCK 2: System Specifications
├── H2: {Service} Systems at {Building Name}
├── Specification table: System Type | Details | Common Issues
└── Target: Featured Snippet — Table (for "[Building Name] HVAC" queries)

BLOCK 3: Logistics & Access
├── H2: Our Service Process at {Building Name}
├── Ordered list: parking, elevator access, COI requirements, scheduling
└── Target: E-E-A-T, Shows physical presence knowledge

BLOCK 4: Case Study
├── H2: Recent {Service} Work at {Building Name}
├── 150-word case study with unit type, problem, solution, outcome
└── Target: Passage Indexing, Social proof

BLOCK 5: Link Back to Hub
├── Brief paragraph linking to city hub and parent neighborhood spoke
└── Target: Internal link structure, Silo integrity
```

---

## 5. SEMANTIC HTML REQUIREMENTS

### 5.1 Required Elements

Silas must use proper semantic HTML in all generated content. This is non-negotiable — semantic elements give the parser explicit meaning.

| Element | Use Case | Never Substitute With |
|---|---|---|
| `<h1>` | Page title (exactly one per page) | `<div class="title">` or `<p><strong>` |
| `<h2>` | Major section headings | Bolded paragraphs |
| `<h3>` | Subsection headings / PAA questions | `<h2>` (breaks hierarchy) |
| `<p>` | All body text | `<div>` with text or `<span>` blocks |
| `<table>` | Structured data comparisons | Side-by-side `<div>` columns |
| `<thead>` / `<tbody>` | Table structure | Tables without these elements |
| `<ol>` | Sequential processes, rankings | `<ul>` with numbered text |
| `<ul>` | Non-sequential lists | `<p>` tags with bullet characters |
| `<strong>` | Key terms within text | `<b>` (no semantic weight) |
| `<em>` | Emphasis within text | `<i>` (no semantic weight) |
| `<address>` | Business NAP information | `<p>` or `<div>` for addresses |
| `<time>` | Dates and times | Plain text dates |
| `<article>` | Blog posts, case studies | `<div>` wrapper |
| `<section>` | Distinct content sections | Unsemantic `<div>` blocks |
| `<nav>` | Internal link sections | `<div class="links">` |

### 5.2 Heading Hierarchy Rules

```
H1: Page Title (exactly one)
├── H2: Major Section
│   ├── H3: Subsection
│   │   └── H4: Sub-subsection (rare — avoid going this deep)
│   └── H3: Subsection
├── H2: Major Section
│   └── H3: Subsection
└── H2: FAQ Section
    ├── H3: Question 1
    ├── H3: Question 2
    └── H3: Question 3
```

**Rules:**
- Never skip heading levels (e.g., H1 → H3 without an H2)
- H1 must contain the primary target keyword
- H2s should contain secondary keywords or query variations
- H3s in PAA blocks must be phrased as questions
- Maximum heading depth: H4 (deeper creates extraction confusion)
- Every H2 defines a passage indexing boundary

### 5.3 Paragraph Rules

- Maximum paragraph length: 150 words (for readability and passage extraction)
- Ideal paragraph length: 40–80 words
- One idea per paragraph (supports passage indexing)
- First sentence of each paragraph should be meaningful in isolation (inverted pyramid)
- No single-sentence paragraphs in body content (too thin for extraction)
- Exception: The first `<p>` after a definition block heading can be a single sentence if it's the direct answer

---

## 6. CONTENT DENSITY GUIDELINES

### 6.1 Word Count Targets by Page Type

| Page Type | Minimum Words | Target Words | Maximum Words |
|---|---|---|---|
| City Hub | 1,200 | 1,800 | 2,500 |
| Service Page | 800 | 1,200 | 2,000 |
| Neighborhood Spoke | 600 | 900 | 1,500 |
| Landmark/HOA Page | 400 | 600 | 1,000 |
| Blog/Resource Post | 1,000 | 1,500 | 3,000 |
| FAQ Page | 500 | 800 | 1,200 |

### 6.2 Structured Element Density

For every 500 words of body content, Silas should include at least ONE of:
- A table (3+ rows)
- An ordered or unordered list (3+ items)
- A definition block (question heading + answer paragraph)
- A data callout or statistic

This ensures every section of the page has extraction-ready structured content, not just walls of prose.

### 6.3 Keyword Integration Rules

- Primary keyword: Appear in H1, first paragraph, at least one H2, and the meta description
- Primary keyword density: 1.0–1.5% of total page word count
- Secondary keywords: Appear in H2/H3 headings and naturally within body text
- LSI / semantic variations: Distributed throughout body paragraphs
- Never repeat the exact primary keyword more than 3 times in any single 300-word section
- No keyword stuffing in tables — table cells should read naturally
- Location name: Appear within the first 100 words, in at least one table, and in the final paragraph

---

## 7. SPECIAL CONTENT PATTERNS

### 7.1 The "Implicit Schema Mimicry" Pattern

From the APEX course: structure visible content to mirror Schema.org property names so the AI parser can extract structured data even without JSON-LD.

**How it works:** Name content sections and table headers using terms that match schema properties. The AI parser recognizes the pattern and treats the content as quasi-structured data.

**Example for a service page:**
```html
<h2>Emergency AC Repair Service Details</h2>
<table>
  <thead>
    <tr>
      <th>Service Type</th>      <!-- maps to schema: serviceType -->
      <th>Price Range</th>       <!-- maps to schema: offers.price -->
      <th>Availability</th>      <!-- maps to schema: hoursAvailable -->
      <th>Service Area</th>      <!-- maps to schema: areaServed -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Emergency AC Diagnosis</td>
      <td>$89 – $150</td>
      <td>24/7 including holidays</td>
      <td>Fort Lauderdale, Broward County</td>
    </tr>
  </tbody>
</table>
```

The AI sees `serviceType`, `price`, `availability`, and `areaServed` patterns in the content even without explicit schema markup. This creates a double signal when combined with the JSON-LD schema in SPEC-003.

### 7.2 The "Freshness Cascade" Pattern

Content that signals recency ranks higher in AI Overviews. Silas implements freshness signals through:

**Date Stamps in Headings:**
```html
<h2>AC Repair Cost in Fort Lauderdale — Updated February 2026</h2>
```

**"Last Updated" Footer:**
```html
<p><time datetime="2026-02-06">Last updated: February 6, 2026</time> by
<strong>{BUSINESS_NAME}</strong>.</p>
```

**Year-Stamped Data:**
All pricing tables, statistics, and cost references include the current year. Silas updates these during recurring optimization cycles.

### 7.3 The "Entity Co-Citation" Pattern

Mentioning recognized entities (brands, organizations, institutions, geographic features) near the client's business name strengthens entity association signals.

**Implementation:**
```html
<p>{BUSINESS_NAME} is a {CERTIFICATION_BODY}-certified {SERVICE} provider
serving {CITY}. We service all major {EQUIPMENT_BRANDS}, including
{BRAND_1}, {BRAND_2}, and {BRAND_3}, and hold factory authorization from
{MANUFACTURER}. Our technicians are trained through {TRAINING_PROGRAM} and
maintain active {LICENSE_TYPE} licensing with {LICENSING_BODY}.</p>
```

Every named entity in this paragraph is a co-citation signal that strengthens the client's entity graph.

### 7.4 The "Comparative Displacement" Pattern

From the APEX LLM SEO module: structure content so that when an AI compares the client against competitors, the client's description scores higher on authority, specificity, and technical credibility.

**Before (generic):**
```
"ABC Plumbing — Licensed plumber in Fort Lauderdale. 24/7 service."
```

**After (StealthRank-optimized):**
```
"ABC Plumbing — Master-licensed plumbing contractor with EPA-compliant
water system certification serving Fort Lauderdale and Broward County.
Full-service residential diagnostics including video pipe inspection,
hydrostatic pressure testing, and code-compliant repiping using
PEX-A manifold systems."
```

**Silas applies this pattern to:**
- GBP business descriptions (SPEC-001)
- Service page opening paragraphs
- About page credentials sections
- Review response templates (seeds authority language)

---

## 8. FORMATTING ANTI-PATTERNS

### 8.1 Never Do These

| Anti-Pattern | Why It Fails | Correct Alternative |
|---|---|---|
| Walls of text (300+ words with no structure) | Not extractable by snippet system | Break into passage blocks with headings |
| Accordion/tab content (hidden behind JS clicks) | Crawler may not expand; content devalued | All content visible in initial HTML render |
| Images of text (infographics with key data) | Not parseable by text extraction | Use HTML tables + supplement with image |
| Clever/vague headings ("The Big Picture") | No keyword match for passage indexing | Descriptive headings with target query |
| Nested lists beyond 2 levels | Snippet extractor ignores deep nesting | Flatten to single-level or use tables |
| Tables with 10+ rows | Gets truncated in featured snippet | Split into multiple focused tables |
| "Click here" or "Learn more" link text | Zero semantic value for crawlers | Descriptive anchor text with keywords |
| FAQ as accordion (click-to-expand) | Content may be invisible to crawler | Render all Q&A visible in HTML |
| Generic stock photos with "img_1234.jpg" | Zero image SEO value | Descriptive filenames + keyword-rich alt text |
| Content behind login/paywall | Not crawlable | All target content publicly accessible |

### 8.2 CMS-Specific Pitfalls

**WordPress + Elementor:**
- Elementor's "Toggle" and "Accordion" widgets render content via JavaScript — avoid for SEO-critical content
- Use Elementor's "Text Editor" widget for body content (renders as standard HTML)
- Elementor's "Table" widget does NOT generate proper `<thead>` — use a "Custom HTML" widget with hand-coded `<table>` instead
- Toggle/Accordion is acceptable for supplementary content that isn't targeting SERP features

**WordPress + WPCafe / Menu Plugins:**
- Menu plugins often render items as `<div>` blocks with no semantic structure
- If menu items need to rank (e.g., restaurant "menu [city]" queries), supplement with a properly structured HTML table in a Custom HTML widget below the plugin output

---

## 9. AUTONOMOUS FORMATTING WORKFLOW

### 9.1 Silas Content Generation Pipeline

When Silas generates content for a client page, it follows this formatting decision tree:

```
INPUT: Page type + Target keyword + Query intent

STEP 1: DETERMINE SERP FEATURE TARGETS
├── Check §2.2 (Feature Priority by Page Type)
├── Identify which SERP features this page should target
└── Output: Ordered list of target features

STEP 2: SELECT CONTENT BLOCK TEMPLATE
├── Match page type to template (§4.1 – §4.5)
├── Customize block order based on query intent
└── Output: Page skeleton with block placeholders

STEP 3: GENERATE DEFINITION BLOCK
├── If page targets Featured Snippet — Paragraph:
│   ├── Write H2 as question containing target keyword
│   ├── Write 40-60 word direct answer
│   └── Validate: first sentence answers the question, includes data point
└── If not targeting paragraph snippet: skip

STEP 4: GENERATE STRUCTURED DATA BLOCKS
├── Pricing query → Build cost table (§3.2)
├── Process query → Build step list (§3.3)
├── Comparison query → Build comparison table (§3.2)
├── "What are" query → Build feature list (§3.4)
└── Validate: correct element type, within row/item limits

STEP 5: GENERATE PASSAGE BLOCKS
├── Identify 2-4 subtopics for passage indexing
├── Write 100-300 word self-contained blocks
├── Each block gets a descriptive H2
└── Validate: each passage makes sense in isolation

STEP 6: GENERATE PAA BLOCK
├── Source questions (§3.5 priority order)
├── Write 25-50 word answers
├── Format as H3 + P pairs
└── Validate: answers are self-contained

STEP 7: DENSITY CHECK
├── Verify word count within page type target (§6.1)
├── Verify structured element density (§6.2)
├── Verify keyword integration (§6.3)
├── Verify heading hierarchy (§5.2)
└── Verify paragraph length (§5.3)

STEP 8: SCHEMA PAIRING
├── Generate corresponding FAQPage schema for PAA block (hand off to SPEC-003)
├── Verify table content matches schema offers/pricing (if applicable)
└── Flag any content that should be mirrored in grounding box (hand off to SPEC-009)
```

### 9.2 Content Audit Mode

When Silas audits an existing page (rather than generating new content), it runs this assessment:

```
AUDIT CHECKLIST:
□ Does the page have a definition block targeting the primary query?
□ Does the first paragraph answer the query directly (within 60 words)?
□ Are there any tables? Do they have <thead> and <tbody>?
□ Are tables under 8 rows / 4 columns?
□ Does the heading hierarchy follow H1 → H2 → H3 without skipping?
□ Are there any headings phrased as questions (PAA opportunity)?
□ Is the word count within target range for this page type?
□ Is there at least one structured element (table/list) per 500 words?
□ Are paragraphs under 150 words?
□ Are there any accordion/tab elements hiding content?
□ Are images using descriptive alt text?
□ Is there a freshness signal (date, "updated" reference)?
□ Is the primary keyword in the H1, first paragraph, and at least one H2?

SCORING:
12/12 = Optimally formatted (no action needed)
9-11 = Minor improvements (generate fix recommendations)
6-8 = Significant formatting gaps (generate restructured content)
0-5 = Complete rewrite recommended (generate full page using template)
```

---

## 10. CROSS-SPEC INTEGRATION

| Related Spec | Integration Point |
|---|---|
| **SPEC-002 (On-Page SEO)** | Keyword targets and density rules from SPEC-002 feed into formatting decisions here. SPEC-010 determines HOW those keywords are presented. |
| **SPEC-003 (Schema Markup)** | Every PAA block in SPEC-010 must have corresponding FAQPage schema in SPEC-003. Pricing tables should align with AggregateOffer schema. |
| **SPEC-006 (Semantic Location Silos)** | Silo hierarchy determines page type, which determines content block template (§4). |
| **SPEC-007 (Content Architecture)** | SPEC-007 defines content strategy (what topics, what depth). SPEC-010 defines content formatting (how it's structured in HTML). |
| **SPEC-009 (Grounding Boxes)** | Grounding box content should be a condensed version of the visible structured content, not a copy. The grounding box targets the same query but in machine-optimized format. |

---

## 11. IMPLEMENTATION NOTES

### 11.1 Content Generation vs. Content Migration

When Silas generates content for a new page, it follows the templates in §4 directly.

When Silas audits and restructures an existing page, it preserves the existing copy where possible and reformats it into the correct structure. This means:
- Extracting the direct answer from prose and moving it to a definition block position
- Converting inline data to tables
- Breaking long sections into passage-indexed blocks with proper headings
- Adding PAA blocks sourced from the existing content's natural Q&A patterns
- Adding freshness signals

The goal is to restructure, not rewrite — unless the existing content scores below 6/12 on the audit checklist.

### 11.2 Content Length vs. Quality

Silas prioritizes formatting quality over word count. A 900-word service page with a definition block, pricing table, step list, and PAA section outperforms a 2,000-word page of unstructured prose. If the client's content meets the minimum word count but has excellent structure, Silas does NOT pad it with filler to hit a higher target.

---

*End of SPEC-010 — Structured Content Formatting System*
*Total spec lines across 10 documents: ~10,350*
*Next pending: SPEC-011 — Page-Level Conversion Optimization (CTA Placement, Phone Visibility, Form Positioning)*
