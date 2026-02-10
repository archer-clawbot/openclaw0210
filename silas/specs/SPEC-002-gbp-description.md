# SPEC-002: GBP Description Engineering
## Silas Engine — Route 1: GBP Optimization Pipeline
### Version 1.0 | GBP Optimization Group

---

## 1. PURPOSE

This specification defines Silas's methodology for engineering the 750-character Google Business Profile description using the "Local Hub Gambit" — a technique that weaponizes entity co-citations to position the client as a connected authority hub rather than an isolated listing. The description is not a sales pitch. It is a machine-readable entity signal that tells Google's knowledge graph how the business relates to other known, trusted entities in the local ecosystem.

**Core principle:** "Your description doesn't convince customers. It convinces Google's entity resolution system that you are real, connected, and authoritative."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-001: GBP Services | Services provide the granular detail the description summarizes |
| SPEC-003: GBP Q&A | Q&A answers should reinforce entity relationships mentioned in description |
| SPEC-005: GBP Posting Strategy | Posts reinforce entity co-citations through regular mentions |
| SPEC-006: Semantic Location Silo | Website city hub pages should mirror the entity co-citations in description |
| SPEC-008: Schema & Structured Data | sameAs and areaServed schema must align with description claims |
| SPEC-011: Citation Building & NAP | Citations on third-party sites validate the entity relationships claimed |
| SPEC-017: LLM SEO / StealthRank | LLM-optimized descriptions share optimization principles with GBP description |

---

## 3. THE LOCAL HUB GAMBIT

### 3.1 Core Concept

Google's knowledge graph maps entities (businesses, places, organizations, landmarks) and the relationships between them. When a GBP description mentions other verifiable entities, Google cross-references those claims against its knowledge graph. If the relationships check out, the business inherits association with those entities' trust and authority signals.

This is "algorithmic trigger mapping" — deliberately including entity references that trigger Google's validation checks, passing each one, and accumulating trust.

### 3.2 Why It Works

```
Description mentions "ABC Plumbing partners with [Real Supplier Name]"
     ↓
Google's entity resolution system checks:
  - Does [Real Supplier Name] exist in the knowledge graph? ✓
  - Is [Real Supplier Name] in a related industry? ✓
  - Are there other signals linking ABC Plumbing to [Real Supplier Name]? 
    (citations, website mentions, reviews, social) ✓
     ↓
Result: ABC Plumbing's entity confidence score increases
     ↓
Higher entity confidence → Better rankings in competitive queries
```

### 3.3 Entity Co-Citation Categories

| Category | Examples | Validation Ease |
|----------|----------|----------------|
| **Suppliers/Distributors** | Product brands, wholesale suppliers, manufacturer names | High — Google knows brand entities well |
| **Professional Associations** | Chamber of Commerce, BBB, industry trade groups | High — these are well-mapped entities |
| **Geographic Anchors** | Landmarks, shopping centers, major intersections, parks | High — geographic entities are core to Maps |
| **Educational/Government** | Local schools, city offices, county buildings | High — .gov/.edu entities are trusted |
| **Complementary Businesses** | Other local businesses that serve the same customer base | Medium — depends on their entity strength |
| **Events/Traditions** | Local festivals, seasonal events, community traditions | Medium — depends on event prominence |
| **Neighborhood Names** | Specific subdivisions, historic districts, planned communities | High — Google Maps knows neighborhoods |

---

## 4. DESCRIPTION STRUCTURE

### 4.1 The 750-Character Template

The GBP description has a hard limit of 750 characters. Every character must earn its place. The structure below maximizes entity signals within this constraint.

```
[SENTENCE 1: Identity + Primary Keyword + City]
[SENTENCE 2: Entity Co-Citation #1 — supplier, partner, or association]
[SENTENCE 3: Entity Co-Citation #2 — landmark, neighborhood, or institution]
[SENTENCE 4: Core services with specific details]
[SENTENCE 5: Credential/trust signal — years, certifications, awards]
[SENTENCE 6: Service area with specific neighborhoods]
[SENTENCE 7: Closing CTA or differentiator]
```

### 4.2 Sentence-by-Sentence Breakdown

**Sentence 1 — Identity Statement:**
- Front-load the primary keyword + city in the very first sentence
- Use the exact business name as it appears on GBP
- Write in third person ("Business Name provides..." NOT "We provide...")
- This is the single most important sentence — Google weights early content higher

**Sentence 2 — Entity Co-Citation #1:**
- Mention a real, verifiable entity the business is connected to
- Best: supplier/brand name, professional association membership, certification body
- The relationship must be real — Google WILL cross-check

**Sentence 3 — Entity Co-Citation #2:**
- Mention a geographic anchor — landmark, neighborhood, or institution
- This strengthens the location signal beyond just the city name
- Best: something unique to the specific area (not generic "near downtown")

**Sentences 4-5 — Service + Credential Block:**
- Name 3-5 specific services (not generic categories)
- Include a hard credential: years in business, license number, certification name, award
- Numbers are more convincing to both humans and algorithms: "15+ years" > "experienced"

**Sentence 6 — Service Area:**
- List 3-5 specific neighborhoods or cities served
- These become ranking signals for those areas
- Use real neighborhood names, not just the metro area

**Sentence 7 — Closing:**
- Brief differentiator or CTA
- Keep it to 10-15 words max — don't waste characters

### 4.3 Example Outputs

**Home Services (Plumber):**
```
ABC Plumbing delivers expert residential plumbing services throughout Sugar 
Land and Fort Bend County. As an authorized Rinnai and Navien installer and 
member of the Fort Bend County Chamber of Commerce, ABC brings manufacturer-
certified expertise to every project. Located minutes from First Colony Mall 
and serving the Sweetwater, Riverstone, and Harvest Green communities. 
Specializing in tankless water heater installation, whole-home repiping, 
sewer line repair, and emergency plumbing. Family-owned since 2008 with 
4,500+ completed projects and a 4.9-star Google rating. Serving Sugar Land, 
Missouri City, Richmond, Stafford, and Rosenberg. Call for same-day service.
```
(742 characters)

**Professional Services (Salon):**
```
Pure Elements Salon is Albany's premier destination for precision color, 
cutting-edge styling, and restorative hair treatments. A Redken Elite salon 
and Olaplex certified studio, Pure Elements uses exclusively professional-
grade systems for vibrant, long-lasting results. Steps from Stuyvesant Plaza 
in the heart of the Capital District. Our team specializes in balayage, 
corrective color, keratin smoothing, bridal styling, and men's grooming. 
Serving clients from Albany, Colonie, Latham, Guilderland, and Delmar since 
2015. Book your consultation today.
```
(531 characters)

**Restaurant:**
```
Spectators Bar & Grill is Sugar Land's go-to destination for craft cocktails, 
scratch-made American cuisine, and the best live sports viewing experience in 
Fort Bend County. Featuring 40+ screens, a curated bar program with Woodford 
Reserve and Nolet's Gin craft cocktails, and a chef-driven menu updated 
seasonally. Located in the Riverstone community near Harvest Green and 
University Boulevard. Private event hosting, full-service catering, daily 
happy hour, and weekend brunch available. Serving Sugar Land, Missouri City, 
and Richmond since 2019.
```
(538 characters)

---

## 5. RULES & CONSTRAINTS

### 5.1 Google's Description Policies

| Allowed | Prohibited |
|---------|-----------|
| Business name and description | Phone numbers |
| Services offered | URLs or website links |
| Credentials and certifications | Promotional language ("Best in town!", "50% off!") |
| Service areas | All-caps words (except acronyms) |
| Entity co-citations | Misleading claims |
| Third-person voice | First-person pronouns ("We," "Our") — Google prefers third-person |

### 5.2 Entity Co-Citation Rules

1. **Every entity mentioned MUST be real and verifiable by Google.** If the business claims to be a "Rinnai authorized installer," Rinnai's dealer locator should confirm it.
2. **Never fabricate relationships.** Google's cross-referencing is sophisticated — fake claims reduce entity confidence rather than building it.
3. **Prefer entities that Google already has strong knowledge graph entries for.** National brands, government entities, and well-known landmarks are safer than obscure local references.
4. **Aim for 2-3 entity co-citations per description.** More than 4 starts to feel forced and reduces the space available for service and area signals.

### 5.3 Character Optimization

- Avoid filler words: "very," "really," "great," "best"
- Use numerals instead of words: "15+" not "fifteen plus"
- Use "&" instead of "and" where natural
- Abbreviate state names: "NY" not "New York" (in service area lists)
- Use em dashes for compact phrasing: "Family-owned since 2008 — 4,500+ projects completed"

---

## 6. RESEARCH PROCESS

### 6.1 Entity Discovery

```
Silas Autonomous Action:
1. Pull client's current GBP description
2. Identify existing entity co-citations (if any)
3. Research potential entities:
   a. SUPPLIERS: What brands/products does the client use? Check website, social media
   b. ASSOCIATIONS: Is the client a member of Chamber of Commerce, BBB, trade groups?
   c. GEOGRAPHIC: What landmarks, shopping centers, or institutions are nearby?
   d. CREDENTIALS: What certifications, licenses, or awards does the client hold?
4. Verify each entity exists in Google's knowledge graph:
   - Search the entity name — does it have a Knowledge Panel?
   - Check Google Maps — is it a mapped location?
   - Check Wikipedia — does it have an entry?
5. Rank entities by:
   - Verification ease (how easily Google can confirm the relationship)
   - Relevance (how related the entity is to the client's industry)
   - Authority (how strong the entity's own knowledge graph presence is)
6. Select top 2-3 for inclusion in description
```

### 6.2 Competitor Description Analysis

```
Silas Autonomous Action:
1. Pull descriptions from top 5 Local Pack competitors
2. Analyze each for:
   - Entity co-citations used (or missing)
   - Keyword targeting
   - Service area specificity
   - Credential signals
3. Identify opportunities:
   - Entities no competitor is citing
   - Geographic areas no competitor claims
   - Credentials only the client holds
4. Use gaps to differentiate the client's description
```

---

## 7. DELIVERABLE FORMAT

```markdown
# GBP DESCRIPTION OPTIMIZATION
## [Client Name] — [Date]

### Current Description:
[Paste current description]

### Current Score: [X]/10
### Issues Identified:
- [Issue 1]
- [Issue 2]

---

### Optimized Description (Option A — [Character Count]/750):
[Full optimized description text]

**Entity Co-Citations Used:**
1. [Entity Name] — [Relationship] — [Verification: how Google confirms this]
2. [Entity Name] — [Relationship] — [Verification]
3. [Entity Name] — [Relationship] — [Verification]

---

### Optimized Description (Option B — [Character Count]/750):
[Alternative version with different entity emphasis]

**Entity Co-Citations Used:**
1. [Entity Name] — [Relationship] — [Verification]
2. [Entity Name] — [Relationship] — [Verification]

---

### Recommendation: Option [A/B] because [reason].

### Implementation Notes:
- [Any operator instructions]
- [Entity relationships that need client confirmation]
```

---

## 8. SCORING RUBRIC

| Score | Criteria |
|-------|----------|
| **0** | Description empty or auto-generated by Google. |
| **1** | 1-2 sentences, generic, no keywords or entity signals. |
| **2** | Basic description with business name and city, no entity co-citations. |
| **3** | Keyword-optimized but missing authority signals. Generic service list. |
| **4** | Decent keyword targeting, 1 credential mentioned, no entity co-citations. |
| **5** | Good keyword + city targeting, credentials, but no Local Hub Gambit elements. |
| **6** | 1 entity co-citation + credentials + service area neighborhoods. |
| **7** | 2 entity co-citations + credentials + geo-modifiers + specific services. |
| **8** | Full Local Hub Gambit: 2-3 verified entities, strong credentials, complete service area, optimized character usage. |
| **9** | Score 8 + every entity independently verified + competitive gaps exploited. |
| **10** | Perfect implementation: 3 verified entity co-citations, complete credential stack, every neighborhood claimed, maximum keyword coverage in 750 chars. |

---

## 9. MULTI-LOCATION HANDLING

For clients with multiple locations (like Spectators Bar & Grill with 3 locations), each location MUST have a unique description:

### Rules:
1. **Different entity co-citations per location** — each location should reference the landmarks, neighborhoods, and institutions specific to THAT location
2. **Location-specific credentials** if applicable (awards, age of that location)
3. **Unique service area neighborhoods** per location
4. **Shared elements are OK** for brand identity (business name, core services) but the entity signals must be location-specific

### Template for Multi-Location:
```
Location 1 (Sugar Land): References First Colony Mall, Sweetwater community
Location 2 (Riverstone): References Riverstone community, Harvest Green
Location 3 (Harvest Green): References Harvest Green master plan, University Blvd
```

---

## 10. AUTOMATION PIPELINE

```
TRIGGER: New client onboarded OR quarterly refresh cycle

1. PULL current GBP description
2. SCORE current state (Section 8)
3. IF score < 7:
   a. RUN entity discovery (Section 6.1)
   b. RUN competitor description analysis (Section 6.2)
   c. GENERATE 2 optimized description options
   d. VERIFY entity co-citations are accurate
   e. FORMAT deliverable (Section 7)
   f. DELIVER to operator for GBP implementation
4. IF score >= 7:
   a. CHECK for new entity opportunities (new partnerships, certifications, awards)
   b. CHECK competitor descriptions for new threats
   c. IF changes warranted → generate updated description
   d. IF no changes needed → log "description optimized" and move to next spec

ESCALATION POINTS:
- Cannot verify a claimed entity relationship → flag for operator confirmation
- Client has no verifiable entity co-citations → recommend building relationships first
- Multi-location client with identical descriptions → flag as critical issue
```

---

*This spec is part of the Silas Engine, Route 1: GBP Optimization Pipeline.*
*For condensed reference, see ROUTE-1-GBP.md.*
*For orchestrator integration, see SPEC-019-orchestrator.md.*
