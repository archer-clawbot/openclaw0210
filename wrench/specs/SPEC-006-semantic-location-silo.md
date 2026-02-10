# SPEC-006: Semantic Location Silo Architecture
## Silas Engine — Route 2: Website Optimization Pipeline
### Version 1.0 | Website Optimization Group

---

## 1. PURPOSE

This specification defines Silas's methodology for building a content architecture that signals topical authority for every service in every location the client serves. The structure uses a City Hub (parent page) with Neighborhood Spokes (child pages), connected by strategic internal linking to create an impenetrable local relevance fortress that competitors cannot outrank without building equivalent depth.

**Core principle:** "Every service in every neighborhood deserves its own page. The business that covers the most ground with the most depth wins the local map."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-001: GBP Services | Website service pages must align with GBP service entries |
| SPEC-002: GBP Description | City hub pages reinforce entity co-citations from GBP description |
| SPEC-007: Grounding Box | Grounding boxes deploy on hub and spoke pages |
| SPEC-008: Schema & Structured Data | Every page needs appropriate schema (LocalBusiness, FAQPage, Service) |
| SPEC-009: Technical SEO | Crawlability, URL structure, and performance standards |
| SPEC-010: On-Page Content | Content quality standards applied to every silo page |
| SPEC-014: Local PBN | PBN links point into the silo structure strategically |
| SPEC-015: Geo-Grid Rank Tracking | Tracks which silo pages drive rank improvements per grid point |

---

## 3. ARCHITECTURE

### 3.1 URL Structure

```
/[city]/                              ← City Hub (parent)
├── /[city]/[neighborhood-1]/         ← Neighborhood Spoke
├── /[city]/[neighborhood-2]/         ← Neighborhood Spoke
├── /[city]/[service-1]/              ← Service + Location page
├── /[city]/[service-2]/              ← Service + Location page
├── /[city]/[service]-[neighborhood]/ ← Service + Specific Area page (high-value combos)
└── /[city]/about-[city]/             ← City-specific "about our service area" page
```

### 3.2 Page Types

| Page Type | Word Count | Purpose | Quantity |
|-----------|-----------|---------|----------|
| **City Hub** | 1,500-2,500 | Central authority page for the entire city | 1 per city served |
| **Neighborhood Spoke** | 800-1,500 | Hyperlocal page for a specific neighborhood | 5-15 per city |
| **Service + Location** | 1,000-2,000 | Specific service page with location targeting | 1 per major service |
| **Service + Neighborhood** | 600-1,000 | Specific service + specific neighborhood combo | Only for high-value intersections |

### 3.3 Silo Scale Planning

| Client Type | Cities | Neighborhoods/City | Services | Total Pages |
|-------------|--------|-------------------|----------|-------------|
| Single location, 1 city | 1 | 5-8 | 5-10 | 15-25 |
| Single location, multi-city service | 3-5 | 3-5 each | 5-10 | 40-80 |
| Multi-location (like Spectators) | 3 | 5-8 each | 5-10 | 50-100 |

---

## 4. PAGE TEMPLATES

### 4.1 City Hub Page

```
URL: /[city]/
Title: [Primary Service] in [City], [State] | [Business Name]
H1: [Primary Service] in [City] — [Value Proposition]

CONTENT STRUCTURE:

1. OPENING PARAGRAPH (100-150 words)
   - Business identity + city + primary service
   - Mention 2-3 neighborhoods served (links to spokes)
   - Entity co-citation (local landmark or institution)

2. SERVICE OVERVIEW SECTION (300-500 words)
   - H2: "Our [Services] in [City]"
   - Brief description of each major service
   - Each service links to its dedicated service page
   - Include pricing overview where applicable

3. NEIGHBORHOOD COVERAGE SECTION (200-400 words)
   - H2: "[City] Areas We Serve"
   - Brief paragraph for each neighborhood with local knowledge
   - Each neighborhood links to its spoke page
   - Include travel time/distance from business to each area

4. CREDENTIALS SECTION (100-200 words)
   - H2: "Why [City] Trusts [Business Name]"
   - Years in business, certifications, awards
   - Team qualifications
   - Review count and average rating

5. PRICING TABLE (if applicable)
   - H2: "[Service] Pricing in [City]"
   - HTML table with service names, price ranges, and "Get Quote" CTAs
   - This is a grounding box target (see SPEC-007)

6. FAQ SECTION (200-400 words)
   - H2: "Frequently Asked Questions About [Service] in [City]"
   - 5-10 questions matching real search queries
   - Wrap in FAQPage schema
   - Answers should be 2-4 sentences with specific details

7. TESTIMONIAL BLOCK (100-200 words)
   - 2-3 review quotes from customers in this city
   - Include reviewer name and neighborhood if available
   - Review schema markup

8. MAP EMBED + CONTACT
   - Embedded Google Map showing business location
   - Full address, phone, hours
   - LocalBusiness schema with complete NAP
```

### 4.2 Neighborhood Spoke Page

```
URL: /[city]/[neighborhood]/
Title: [Service] in [Neighborhood], [City] | [Business Name]
H1: [Neighborhood] [Service] — [Unique Angle for This Area]

CONTENT STRUCTURE:

1. NEIGHBORHOOD-SPECIFIC OPENING (100-150 words)
   - Mention specific landmarks, cross-streets, character of the area
   - Demonstrate genuine local knowledge (not generic city description)
   - "[Business Name] has served [Neighborhood] homeowners since [year]..."

2. SERVICES IN THIS AREA (200-400 words)
   - Which services are most commonly requested in this neighborhood
   - Why (e.g., "Older homes in [neighborhood] commonly need repiping due to galvanized plumbing")
   - Link to each relevant service page

3. LOCAL KNOWLEDGE SIGNALS (150-300 words)
   - Building types common in this area (HOA communities, historic homes, new construction)
   - Common issues specific to this neighborhood
   - Proximity details ("Located 8 minutes from [Business] on [Highway]")

4. NEIGHBORHOOD-SPECIFIC TESTIMONIALS (if available)
   - Reviews from customers in this specific neighborhood
   - "Serving [Neighborhood] families like the [Surname]s since [year]"

5. INTERNAL LINKS
   - Link UP to City Hub
   - Link ACROSS to 2-3 adjacent neighborhood spokes
   - Link to relevant service pages
```

---

## 5. INTERNAL LINKING RULES

### 5.1 Directional Linking

```
                    [City Hub]
                   ↗    ↑    ↖
                 /       |       \
         [Spoke 1] ← → [Spoke 2] ← → [Spoke 3]
              ↕             ↕              ↕
         [Service A]   [Service B]    [Service C]
```

### 5.2 Rules

| Rule | Implementation |
|------|---------------|
| Hub links DOWN to every spoke and service page | Minimum 1 contextual link per page in the hub content |
| Every spoke links UP to City Hub | At least 1 contextual link + breadcrumb navigation |
| Spokes link ACROSS to adjacent spokes | 2-3 contextual links to neighboring areas |
| Service pages link to relevant spokes | "We serve [Neighborhood] — learn about our work there" |
| Never orphan a page | Every page must have at least 2 internal links pointing to it |
| Anchor text variety | Don't use the same anchor text for every link to the hub |
| Contextual > navigational | Links embedded in body text > sidebar/footer links |

### 5.3 Internal Linking Density

- City Hub: 10-20 outbound internal links (to all spokes + services)
- Neighborhood Spoke: 5-10 outbound internal links (hub + adjacent spokes + services)
- Service Page: 5-8 outbound internal links (hub + relevant spokes)

---

## 6. CONTENT UNIQUENESS REQUIREMENTS

### 6.1 The Duplicate Content Problem

The most common failure in location silo building is creating neighborhood pages that are essentially the same content with the neighborhood name swapped. Google detects and penalizes this. Every page must be genuinely unique.

### 6.2 Uniqueness Checklist

For each neighborhood spoke, verify:
- [ ] Opening paragraph references specific landmarks/streets unique to this neighborhood
- [ ] At least 1 paragraph discusses issues or characteristics specific to this area
- [ ] Different testimonials or examples than other spokes
- [ ] Different internal linking patterns (links to relevant, not all, service pages)
- [ ] Different FAQ questions (neighborhood-specific variants)

### 6.3 Content Research for Uniqueness

Silas gathers unique content signals per neighborhood:
- Zillow/Realtor data for housing stock information (age, type, common features)
- Google Maps for landmarks, businesses, institutions
- News archives for neighborhood-specific events or developments
- Review analysis for location-specific service patterns

---

## 7. SCORING RUBRIC

| Score | Criteria |
|-------|----------|
| **0** | No location-specific pages on the website. |
| **1** | Single "Service Area" page listing cities. No dedicated content. |
| **2** | 1-2 city pages, no neighborhood depth. |
| **3** | City page with generic content, no neighborhood spokes. |
| **4** | City page + a few service pages, weak internal linking. |
| **5** | City page + some neighborhood pages, but content is templated/duplicate. |
| **6** | City hub + 3-5 unique neighborhood spokes, moderate internal linking. |
| **7** | Full silo with hub + most neighborhood spokes, good internal linking, unique content. |
| **8** | Complete silo: hub + all spokes + service pages, strategic cross-linking, genuinely unique content per page. |
| **9** | Score 8 + service × neighborhood intersection pages for high-value combos. |
| **10** | Complete silo architecture across all service areas, every page unique, strategic internal linking, FAQ schema, grounding boxes deployed, tracking confirms rank improvements per area. |

---

## 8. AUTOMATION PIPELINE

```
TRIGGER: New client onboarded OR website content expansion cycle

1. MAP client's service area:
   a. Identify all cities served
   b. Identify 5-15 neighborhoods per city
   c. Identify all services offered
   d. Calculate total pages needed
2. AUDIT existing website pages against the silo map
3. IDENTIFY gaps (missing hub, missing spokes, missing services)
4. GENERATE content for missing pages:
   a. City Hub pages first (these anchor the silo)
   b. Neighborhood Spokes second
   c. Service pages third
   d. Intersection pages last (only for high-value combos)
5. DEFINE internal linking plan for each page
6. DELIVER content package to operator for CMS implementation

ESCALATION POINTS:
- Content requires local knowledge Silas doesn't have → request neighborhood details from operator
- CMS limitations on URL structure → adapt silo structure to CMS capabilities
- Client has limited budget for content → prioritize by geo-grid ranking data (SPEC-015)
- Existing pages need restructuring → provide migration plan with redirect map
```

---

*This spec is part of the Silas Engine, Route 2: Website Optimization Pipeline.*
