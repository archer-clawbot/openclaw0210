# SPEC-001: GBP Services Optimization
## Silas Engine — Route 1: GBP Optimization Pipeline
### Version 1.0 | GBP Optimization Group

---

## 1. PURPOSE

This specification defines Silas's methodology for transforming Google Business Profile service entries from generic keyword stubs into high-converting micro-landing pages. Each custom service entry targets specific high-intent long-tail queries and triggers "justification snippets" in the Local Pack — the blue text Google displays explaining WHY a business is relevant to the searcher's query.

**Core principle:** "Every service entry is a micro-landing page that answers a specific searcher's intent before they click."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-002: GBP Description Engineering | Description establishes the entity context that services reinforce |
| SPEC-003: GBP Q&A Pre-emption | Q&A answers should cross-reference services offered |
| SPEC-004: GBP Products Tab | Products mirror services as visual conversion elements |
| SPEC-005: GBP Posting Strategy | Posts highlight individual services on rotation |
| SPEC-006: Semantic Location Silo | Website service pages should align with GBP service entries |
| SPEC-008: Schema & Structured Data | Service schema on website must match GBP service entries |
| SPEC-010: On-Page Content | Service page content provides the depth that GBP entries summarize |
| SPEC-015: Geo-Grid Rank Tracking | Tracks ranking impact of service entry changes per keyword |
| SPEC-016: Client Reporting System | Reports service optimization lift to clients |

---

## 3. WHY IT WORKS

### 3.1 The Justification Snippet Mechanism

When a user searches a long-tail query like "emergency plumber for water heater replacement in Sugar Land," Google scans GBP service entries for a content match. If a business has a service entry that closely mirrors the query language, Google displays a justification snippet — a blue annotation below the business name in the Local Pack saying something like:

> *"Their website mentions water heater replacement"*
> *"Provides emergency plumber services"*

This snippet dramatically increases CTR because the searcher sees their exact intent reflected before clicking. Businesses without justification snippets appear generic in comparison.

### 3.2 Ranking Signal Reinforcement

Detailed service entries create a feedback loop:

```
Detailed service entry → Matches long-tail query → Justification snippet appears
     ↓                                                        ↓
Higher topical relevance score                    Higher CTR than competitors
     ↓                                                        ↓
Better ranking for that query cluster ← ← ← ← ← Behavioral signal to Google
```

### 3.3 Competitive Advantage

Most businesses either:
- Have no custom services (relying on Google's auto-generated list)
- Have keyword-only services ("Plumbing," "HVAC," "Roofing")
- Have a few detailed entries mixed with generic ones

A business with 15-30 fully detailed service entries occupies significantly more topical space than competitors, capturing queries competitors don't even surface for.

---

## 4. SERVICE ENTRY ARCHITECTURE

### 4.1 Entry Components

| Component | Character Limit | Requirements |
|-----------|----------------|-------------|
| Service Name | ~120 characters | Specific long-tail keyword as the name itself |
| Category | N/A (select from GBP categories) | Logical grouping, max 10 categories recommended |
| Description | 300-1,000 characters | Mini sales page addressing user intent |
| Price | Optional | Exact price, range, or "Contact for quote" |

### 4.2 Service Name Engineering

The service name IS the keyword target. It should read like a long-tail search query:

**Bad (generic):**
- "Plumbing"
- "AC Repair"
- "Hair Coloring"

**Good (specific long-tail):**
- "Emergency Water Heater Replacement & Installation"
- "Central AC Repair & Same-Day Diagnostic Service"
- "Balayage & Highlight Color Services for All Hair Types"

**Rules for service names:**
- Include the specific service + qualifier (emergency, same-day, full-service, etc.)
- Never use just the category name as a service
- Match real search queries from keyword research
- Include outcome language where natural ("...for a Flawless Finish")
- Avoid keyword stuffing — it should read naturally to a human

### 4.3 Description Template

```
[Business Name] provides [specific service] for [target customer type] in 
[city/area]. Our [service] includes [specific details of what's included — 
materials, process steps, equipment, scope]. [Outcome statement — what the 
customer gets/experiences as a result]. [Credential or trust signal — years 
of experience, certifications, manufacturer authorizations]. Serving 
[2-3 neighborhoods or areas within the service territory].
```

**Example (Plumber):**
```
Service Name: Tankless Water Heater Installation & Conversion
Category: Water Heater Services
Description: ABC Plumbing provides professional tankless water heater 
installation and tank-to-tankless conversion for homeowners in Sugar Land 
and Fort Bend County. Our certified technicians handle the full process — 
gas line sizing, electrical upgrades, venting modifications, unit mounting, 
and system commissioning. Expect 30-40% energy savings versus traditional 
tank heaters with endless hot water on demand. Licensed, insured, and 
Rinnai/Navien authorized installer with 15+ years in residential plumbing. 
Serving Sugar Land, Missouri City, Richmond, and Stafford.
Price: $2,800 - $5,500
```

**Example (Salon):**
```
Service Name: Balayage Highlights for Medium to Long Hair
Category: Color Services
Description: Pure Elements Salon specializes in hand-painted balayage 
highlights that create a natural, sun-kissed dimension for medium to long 
hair. Our color specialists use Redken and Olaplex professional systems to 
ensure vibrant results with minimal damage. Each appointment includes a 
consultation, custom color formulation, application, processing with 
Olaplex bond treatment, toner, and blowout styling. Results last 12-16 
weeks with proper care. Serving clients from Albany, Colonie, Latham, and 
the Capital District.
Price: $185 - $350
```

### 4.4 Category Structure

Organize services into logical categories. Categories should match the mental model of the target customer:

| Business Type | Example Categories |
|--------------|-------------------|
| Plumber | Water Heater Services, Drain Services, Emergency Plumbing, Bathroom Remodeling, Gas Line Services |
| Salon | Color Services, Cut & Styling, Treatments & Repair, Bridal & Events, Men's Grooming |
| Restaurant | Dine-In Experience, Private Events, Catering Services, Daily Specials, Bar & Cocktails |
| Dentist | General Dentistry, Cosmetic Dentistry, Emergency Dental, Orthodontics, Pediatric Dental |
| Auto Shop | Brake Services, Engine Diagnostics, Oil & Maintenance, Transmission, AC & Heating |

**Rules:**
- Maximum 10 categories (more than that becomes unnavigable)
- Every service must belong to exactly one category
- Category names should match how customers think, not industry jargon
- Highest-revenue or most-searched categories should be listed first

---

## 5. SERVICE RESEARCH PROCESS

### 5.1 Step 1 — Audit Current State

```
Silas Autonomous Action:
1. Pull the client's current GBP service list
2. Count total services and categories
3. Flag services that are:
   - Keyword-only (no description)
   - Generic (just the category name)
   - Duplicate or overlapping
   - Missing price information
4. Score current state (see Section 8)
5. Document findings in audit report
```

### 5.2 Step 2 — Competitor Service Analysis

```
Silas Autonomous Action:
1. Identify top 5 competitors in the Local Pack for the client's primary keywords
2. Pull each competitor's GBP service list
3. Create a comparison matrix:
   - Which services do competitors offer that the client doesn't list?
   - Which services does the client offer that competitors don't list?
   - How detailed are competitor descriptions vs. client?
4. Identify gaps — services the client provides but hasn't listed on GBP
5. Identify opportunities — high-intent queries no competitor is targeting
```

### 5.3 Step 3 — Keyword Research Integration

```
Silas Autonomous Action:
1. Pull keyword data for the client's service vertical + location
2. Filter for high-intent long-tail queries (3+ words)
3. Group queries by service cluster
4. Map each query cluster to a potential GBP service entry
5. Prioritize by:
   - Search volume (higher = more potential traffic)
   - Intent clarity (more specific = higher conversion)
   - Competition gap (queries where no competitor has a matching service entry)
```

### 5.4 Step 4 — Generate Service Entries

```
Silas Autonomous Action:
1. For each identified service, generate:
   - Service Name (long-tail keyword format)
   - Category assignment
   - Full description (300-1,000 chars using template)
   - Price or price range (if available from client data)
2. Ensure descriptions:
   - Lead with the business name + specific service + city
   - Include tangible details (process, materials, timeline)
   - End with service area neighborhoods
   - Read naturally (not keyword-stuffed)
3. Organize into categories
4. Output as a ready-to-paste deliverable
```

---

## 6. DELIVERABLE FORMAT

When Silas generates service entries for a client, the output format is:

```markdown
# GBP SERVICE OPTIMIZATION PACKAGE
## [Client Name] — [Date]

### Current Score: [X]/10
### Target Score: [Y]/10
### Total Services: [N] across [M] categories

---

### Category: [Category Name]

**Service 1: [Service Name]**
Description: [Full description text]
Price: [Price or range]

**Service 2: [Service Name]**
Description: [Full description text]
Price: [Price or range]

[...repeat for all services in category...]

---

### Category: [Next Category Name]

[...repeat pattern...]

---

## IMPLEMENTATION NOTES
- [Any specific instructions for the operator]
- [Services that require pricing confirmation from client]
- [Categories that need client input on offerings]
```

---

## 7. VERTICAL-SPECIFIC PLAYBOOKS

### 7.1 Home Services (Plumbing, HVAC, Electrical, Roofing)
- Target minimum 20-30 services
- Break each trade into sub-specialties (don't just say "Plumbing Repair")
- Include emergency variants ("Emergency [Service]", "Same-Day [Service]")
- Include both residential and commercial variants if applicable
- Always include pricing — home service customers are price-sensitive searchers

### 7.2 Professional Services (Law, Accounting, Consulting)
- Target minimum 15-20 services
- Use practice area language, not internal department names
- Include consultation offerings ("Free Initial [Type] Consultation")
- Describe outcomes and processes, not just the service name
- Pricing: "Contact for consultation" is acceptable for professional services

### 7.3 Restaurants & Hospitality
- Target minimum 10-15 services/experiences
- Focus on experiences, not menu items (those go in Products)
- Include event-based services (private dining, catering, game day packages)
- Highlight unique offerings (brunch, happy hour, live entertainment)
- Pricing: ranges or "See menu" are appropriate

### 7.4 Health & Wellness (Dental, Medical, Chiropractic, Salon/Spa)
- Target minimum 15-25 services
- Use patient/client-friendly language, not clinical codes
- Include procedure descriptions that address common fears/questions
- Group by concern (not clinical specialty) for patient navigation
- Pricing: ranges or "Insurance accepted" / "Financing available"

### 7.5 Retail & E-commerce with Physical Locations
- Target minimum 10-15 services (focus on services, not products)
- Include experience services (personal shopping, fitting, consultation)
- Include convenience services (curbside pickup, same-day delivery, gift wrapping)
- Highlight what differentiates from online-only competitors

---

## 8. SCORING RUBRIC

### Scale: 0-10

| Score | Criteria |
|-------|----------|
| **0** | No custom services added. GBP shows only Google's auto-generated list. |
| **1** | 1-3 generic keyword-only services, no descriptions. |
| **2** | 4-6 services, some with brief descriptions but mostly generic. |
| **3** | 7-10 services, keyword-only names, minimal descriptions. |
| **4** | 10-15 services, some detailed, some generic. Inconsistent quality. |
| **5** | 10-15 services all with descriptions, but descriptions are generic/templated. |
| **6** | 15-20 services with descriptions, moderate keyword targeting, some pricing. |
| **7** | 15-20+ services, all with detailed descriptions, good keyword targeting, categories organized. |
| **8** | 20-25+ services, detailed descriptions with local modifiers, competitor gaps covered, pricing included. |
| **9** | 25-30 services, every entry is a micro-landing page, complete category structure, pricing, service area mentions. |
| **10** | 30+ services, every entry targets a verified high-intent query, descriptions include process/outcome/credential details, full pricing, triggering justification snippets for target keywords. |

### Scoring Automation

```
Silas evaluates each factor:
- Total service count: /3 points
- Description quality (detailed vs. generic): /3 points
- Keyword targeting (match to real search queries): /2 points
- Pricing completeness: /1 point
- Category organization: /1 point

Aggregate = total score out of 10
```

---

## 9. MONITORING & ITERATION

### 9.1 Post-Deployment Tracking

After service entries are deployed, Silas tracks:
- Justification snippet frequency in geo-grid tracking (SPEC-015)
- New keyword visibility from Search Console (queries the business now appears for)
- CTR changes on the GBP listing
- Conversion changes (calls, direction requests, website clicks)

### 9.2 Iteration Triggers

| Signal | Action |
|--------|--------|
| New competitor surfaces with better service entries | Re-audit and expand |
| Client adds new services or capabilities | Add corresponding GBP entries |
| Keyword research reveals new high-intent queries | Create targeting service entries |
| Justification snippet not appearing for target query | Revise service name/description to better match query |
| Price changes | Update pricing in service entries |

### 9.3 Refresh Cadence

- **Monthly:** Quick audit — are all services still accurate? Any new offerings?
- **Quarterly:** Full competitive re-analysis + keyword refresh
- **Annually:** Complete rebuild of service entries based on current search landscape

---

## 10. INTEGRATION WITH OTHER SPECS

### 10.1 → SPEC-002 (Description)
The GBP description establishes the entity's identity and authority. Services provide the granular detail. These must be consistent — if the description mentions "full-service residential plumbing," the services list should reflect every residential plumbing service offered.

### 10.2 → SPEC-005 (Posts)
GBP posts should rotate through highlighting individual services. When a service is underperforming in tracking, increase post frequency for that service to boost relevance signals.

### 10.3 → SPEC-006 (Location Silos)
Every GBP service entry should have a corresponding page (or section) on the website. The website page provides the depth; the GBP entry provides the snapshot. URL path should align: if the service is "Tankless Water Heater Installation," the website should have `/services/tankless-water-heater-installation/`.

### 10.4 → SPEC-008 (Schema)
The `hasOfferCatalog` array in the LocalBusiness schema must include every service listed on GBP. Mismatches between schema services and GBP services create entity inconsistency signals.

---

## 11. EDGE CASES & TROUBLESHOOTING

| Issue | Resolution |
|-------|-----------|
| Client doesn't know their full service list | Research competitors in same vertical, generate comprehensive list, have client confirm/deny each |
| Client wants to list services they don't actually offer yet | Refuse. GBP services must reflect current offerings. Flag as future additions. |
| Character limit hit on description | Prioritize: service details > outcome > credentials > service area. Cut credentials if needed. |
| Google rejects a service entry | Check for prohibited content (phone numbers, URLs, excessive caps, promotional language). Rewrite. |
| Multiple locations offer different services | Create location-specific service lists. Do NOT copy identical entries across all locations. |
| Client is in a niche vertical with few search queries | Focus on problem-based service names ("Fix [Problem]" instead of "[Service Type]") to match how customers search. |

---

## 12. AUTOMATION PIPELINE

### 12.1 Silas Autonomous Workflow

```
TRIGGER: New client onboarded OR monthly refresh cycle

1. PULL current GBP service list via API/scrape
2. SCORE current state (Section 8)
3. IF score < 7:
   a. RUN competitor analysis (Section 5.2)
   b. RUN keyword research integration (Section 5.3)
   c. GENERATE optimized service entries (Section 5.4)
   d. FORMAT deliverable (Section 6)
   e. DELIVER to operator for GBP implementation
   f. SET tracking markers for post-deployment monitoring
4. IF score >= 7:
   a. CHECK for new competitor services or keyword opportunities
   b. IF gaps found → generate incremental additions
   c. IF no gaps → log "services optimized" and move to next spec

ESCALATION POINTS:
- Service pricing not available → flag for operator input
- Client vertical not in playbook → request operator guidance on target services
- GBP API access issues → alert operator
```

---

*This spec is part of the Silas Engine, Route 1: GBP Optimization Pipeline.*
*For condensed reference, see ROUTE-1-GBP.md.*
*For orchestrator integration, see SPEC-019-orchestrator.md.*
