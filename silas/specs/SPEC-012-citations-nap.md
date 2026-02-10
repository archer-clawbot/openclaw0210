# SILAS SPEC #12 — CITATION BUILDING & NAP CONSISTENCY
## Directory Submissions, Aggregator Strategy & NAP Audit Protocol

**Spec ID:** SPEC-012-CITATIONS
**Version:** 1.0
**Dependencies:** SPEC-001 (GBP Optimization), SPEC-003 (Schema Markup)

---

## 1. PURPOSE

Citations — mentions of a business's Name, Address, and Phone (NAP) across the web — are a foundational local ranking factor. Inconsistent or missing citations confuse Google's entity resolution system, weaken the GBP's authority, and cause ranking suppression. This spec defines how Silas audits existing citations, identifies gaps and inconsistencies, builds new citations, and maintains NAP accuracy across the citation ecosystem.

Citations are the "boring infrastructure" of local SEO. They're not glamorous, but a client with 80 consistent citations will outrank a competitor with 20 inconsistent ones every time, all else being equal.

---

## 2. CITATION TAXONOMY

### 2.1 Citation Types

| Type | Definition | Example | SEO Value |
|---|---|---|---|
| **Structured Citation** | NAP listed in a formal business directory with structured fields | Yelp, BBB, Yellow Pages | High — direct entity signal |
| **Unstructured Citation** | NAP mentioned in free-form text (blog, news article, press release) | Local news article mentioning the business | Medium — co-citation + authority |
| **Aggregator Citation** | NAP submitted to a data aggregator that feeds downstream directories | Data Axle, Localeze, Foursquare | High — multiplier effect |
| **Industry-Specific Citation** | NAP in a vertical-specific directory | Avvo (legal), Healthgrades (medical), HomeAdvisor (home services) | Very High — topical relevance + authority |
| **Social Citation** | NAP on social media profiles | Facebook, LinkedIn, Instagram | Medium — entity consistency signal |
| **Government/Institutional** | NAP on .gov or .edu sites, chamber of commerce, BBB | Local chamber of commerce listing | Very High — trust signal |

### 2.2 Citation Value Hierarchy

Not all citations are equal. Silas prioritizes citation building in this order:

```
TIER 1 — Foundation (Build First)
├── Google Business Profile (SPEC-001)
├── Data Aggregators (Data Axle, Localeze, Foursquare)
├── Apple Business Connect
├── Bing Places
└── Facebook Business Page

TIER 2 — Core Directories (Build Second)
├── Yelp
├── BBB (Better Business Bureau)
├── Yellow Pages / YP.com
├── Angi (formerly Angie's List)
├── Thumbtack
├── MapQuest
├── Superpages
├── CitySearch
└── Manta

TIER 3 — Industry-Specific (Build Third)
├── Varies by vertical (see §3)
├── Local chamber of commerce
├── State licensing board directories
└── Trade association directories

TIER 4 — Secondary / Long-Tail (Build Fourth)
├── Local business directories
├── City-specific directories
├── Niche review sites
├── Local newspaper business directories
└── University/hospital supplier directories (if applicable)

TIER 5 — Social & Platform (Maintain)
├── LinkedIn Company Page
├── Instagram Business Profile
├── Twitter/X Business Profile
├── Pinterest Business Profile (if visual industry)
├── YouTube Channel (About section)
└── NextDoor Business Profile
```

---

## 3. INDUSTRY-SPECIFIC CITATION SOURCES

Silas selects industry-specific directories based on the client's GBP primary category:

### 3.1 Home Services (HVAC, Plumbing, Electrical, Roofing)

| Directory | Priority | Notes |
|---|---|---|
| HomeAdvisor / Angi | P0 | Merged platform, high domain authority |
| Houzz | P1 | Strong for remodeling/construction verticals |
| Porch | P1 | Home services marketplace |
| BuildZoom | P2 | Contractor license verification + directory |
| Contractor License Board (state) | P0 | Government trust signal |
| ACCA Directory (HVAC) | P1 | Trade association |
| PHCC Directory (Plumbing) | P1 | Trade association |

### 3.2 Restaurants / Food Service

| Directory | Priority | Notes |
|---|---|---|
| Yelp | P0 | Critical for restaurant discovery |
| TripAdvisor | P0 | Especially for tourist-heavy areas |
| OpenTable | P1 | If restaurant takes reservations |
| DoorDash / UberEats / GrubHub | P1 | Delivery platform listings are citations |
| Zomato | P2 | Market-dependent |
| Local food blogs / directories | P2 | City-specific |
| State health department | P1 | Public inspection records = citation |

### 3.3 Legal Services

| Directory | Priority | Notes |
|---|---|---|
| Avvo | P0 | Dominant legal directory |
| FindLaw | P0 | Thomson Reuters legal directory |
| Justia | P1 | Free legal profiles |
| Lawyers.com | P1 | Martindale-Hubbell network |
| State Bar Association | P0 | Government/institutional trust signal |
| Super Lawyers | P1 | If applicable |
| NOLO | P2 | Legal information directory |

### 3.4 Medical / Dental / Health

| Directory | Priority | Notes |
|---|---|---|
| Healthgrades | P0 | Dominant medical directory |
| Vitals | P0 | High DA medical profiles |
| WebMD | P1 | Provider directory |
| Zocdoc | P1 | If accepting appointments |
| RateMDs | P2 | Review-focused medical |
| State medical board | P0 | License verification = trust signal |
| Medicare.gov (if applicable) | P1 | Government directory |

### 3.5 Real Estate

| Directory | Priority | Notes |
|---|---|---|
| Zillow | P0 | Agent/broker profiles |
| Realtor.com | P0 | NAR-affiliated directory |
| Trulia | P1 | Zillow network |
| Redfin | P1 | Agent profiles |
| State real estate commission | P0 | License directory |

### 3.6 Auto Services

| Directory | Priority | Notes |
|---|---|---|
| CarFax Service Centers | P1 | Verified shop directory |
| RepairPal | P1 | Certified shop network |
| AAA Approved Auto Repair | P0 | If applicable — very high trust |
| ASE (Certification Body) | P1 | Technician/shop directory |
| AutoMD | P2 | Shop finder |

---

## 4. NAP CONSISTENCY RULES

### 4.1 The Golden NAP

Every client must have ONE canonical version of their NAP. This is the "golden NAP" and every citation everywhere must match it exactly.

**Golden NAP Components:**

```
BUSINESS NAME:     {Exact legal or DBA name as it appears on GBP}
STREET ADDRESS:    {Exact format: 123 Main Street, Suite 200}
CITY:              {Full city name, no abbreviations}
STATE:             {Two-letter abbreviation}
ZIP:               {5-digit or ZIP+4}
PHONE:             {Primary phone in (XXX) XXX-XXXX format}
WEBSITE:           {Canonical URL with https://}
```

### 4.2 Common NAP Inconsistencies

Silas audits for and corrects these patterns:

| Inconsistency Type | Example | Impact |
|---|---|---|
| **Name variation** | "Acme HVAC" vs "Acme HVAC Services" vs "Acme Heating & AC" | High — different entity signals |
| **Suite/Unit format** | "Suite 200" vs "Ste 200" vs "Ste. 200" vs "#200" | Medium — confuses address matching |
| **Street abbreviation** | "Street" vs "St" vs "St." | Low-Medium — usually auto-resolved |
| **Phone format** | "(555) 123-4567" vs "555-123-4567" vs "5551234567" | Low — Google normalizes phone numbers |
| **Old address** | Previous location still listed on directories | Critical — directly conflicts with GBP |
| **Old phone number** | Previous phone still listed | Critical — lost leads + entity confusion |
| **Missing website** | Citation has NAP but no URL | Medium — missed link equity |
| **Wrong URL** | http:// vs https://, www vs non-www, trailing slash inconsistency | Low-Medium |
| **Tracking number as primary** | Call tracking number listed as main phone | High — NAP mismatch with GBP |
| **DBA vs Legal name** | Legal entity name on some, DBA on others | High if significantly different |

### 4.3 Multi-Location NAP Rules

For clients with multiple locations (like a restaurant with 3 locations):

- Each location gets its OWN golden NAP
- Each location gets its OWN citation set
- Business name should include location differentiator if that's how GBP lists it (e.g., "Spectators Bar & Grill — Lake Pointe" vs "Spectators Bar & Grill — Riverstone")
- Phone numbers MUST be unique per location
- Website URL should point to the location-specific page, not the homepage
- Citations for one location must NEVER include another location's address or phone

---

## 5. CITATION AUDIT PROCESS

### 5.1 Audit Workflow

When Silas onboards a new client, the citation audit is one of the first tasks in the Route 0 orchestrator flow:

```
STEP 1: ESTABLISH GOLDEN NAP
├── Pull current NAP from GBP
├── Verify with client (is this the correct/current info?)
├── Document the canonical golden NAP
└── Flag any pending changes (new phone, address move, name change)

STEP 2: SCAN EXISTING CITATIONS
├── Tool: Use a citation scanning tool (see §5.2)
├── Input: Business name + phone number + address
├── Output: List of all found citations with current NAP data
└── Note: Scan using ALL known name variations and old phone numbers

STEP 3: CATEGORIZE FINDINGS
├── CORRECT: Citation matches golden NAP exactly → No action
├── INCONSISTENT: Citation exists but has wrong/outdated info → Update needed
├── MISSING: High-priority directory with no citation → Build needed
├── DUPLICATE: Same directory has multiple listings → Merge/remove needed
└── COMPETITOR HIJACK: Citation claimed by wrong party → Reclaim needed

STEP 4: PRIORITIZE ACTIONS
├── P0: Fix inconsistencies on Tier 1 sources (aggregators, GBP, Apple, Bing)
├── P1: Fix inconsistencies on Tier 2 core directories
├── P2: Build missing Tier 1-2 citations
├── P3: Build missing Tier 3 industry-specific citations
├── P4: Build Tier 4 long-tail citations
└── P5: Clean up duplicates and reclaim hijacked listings

STEP 5: GENERATE ACTION REPORT
├── Summary: X correct, X inconsistent, X missing, X duplicate
├── Priority fix list with specific directories and required changes
├── Estimated time to complete all fixes
└── Recurring audit schedule (quarterly recommended)
```

### 5.2 Citation Scanning Tools

Silas uses or recommends these tools for citation discovery:

| Tool | Use Case | Cost |
|---|---|---|
| **BrightLocal** | Comprehensive citation audit + tracking | $39+/mo |
| **Whitespark** | Citation finder + local rank tracker | $36+/mo |
| **Moz Local** | Citation management + distribution | $14+/mo per location |
| **Yext** | Automated citation sync (expensive, lock-in risk) | $199+/yr per location |
| **Manual Google Search** | Free fallback — search "business name" + "city" | Free |

**Silas's recommended approach:**
For agencies managing multiple clients, BrightLocal or Whitespark provide the best cost-to-coverage ratio. Yext is powerful for automation but creates vendor lock-in (if you stop paying, citations may revert). Manual citation management is more work but gives full control.

### 5.3 Manual Citation Discovery

When tools are unavailable, Silas can discover citations manually:

```
SEARCH QUERIES TO RUN:
1. "{Business Name}" (in quotes)
2. "{Business Name}" "{Phone Number}"
3. "{Business Name}" "{City}"
4. "{Old Business Name}" (if name changed)
5. "{Old Phone Number}" (if number changed)
6. "{Street Address}" "{City}"
7. "{Business Name}" site:yelp.com
8. "{Business Name}" site:bbb.org
9. "{Business Name}" site:yellowpages.com
10. "{Business Name}" site:facebook.com
```

For each result, Silas records: source domain, listed NAP, match status (correct/inconsistent/duplicate), and whether the listing is claimed/unclaimed.

---

## 6. DATA AGGREGATOR STRATEGY

### 6.1 What Are Aggregators?

Data aggregators are companies that collect business information and distribute it to hundreds of downstream directories, apps, and platforms. Fixing your NAP at the aggregator level cascades corrections across the entire ecosystem. This is the highest-leverage citation action.

### 6.2 Primary Aggregators

| Aggregator | Downstream Reach | Submission Method | Cost |
|---|---|---|---|
| **Data Axle (formerly Infogroup)** | 100+ directories including YP, Superpages, CitySearch | Direct submission via expressupdate.com | Free |
| **Localeze (Neustar)** | 100+ directories including Bing, Apple Maps, Yahoo | Direct submission via neustarlocaleze.biz | Free listing, paid for enhanced |
| **Foursquare** | Apple Maps, Uber, 100+ apps | Direct claim via business.foursquare.com | Free |
| **Factual (now Foursquare)** | Merged with Foursquare | Same as above | Free |

### 6.3 Aggregator Submission Process

```
FOR EACH AGGREGATOR:
1. Search for existing listing using business name + phone
2. IF listing exists:
   ├── Claim the listing (requires verification — phone, postcard, or email)
   ├── Update all fields to match golden NAP
   ├── Add enhanced info: hours, categories, description, photos
   └── Submit and wait for propagation (4-8 weeks)
3. IF no listing exists:
   ├── Create new listing with golden NAP
   ├── Complete all available fields
   └── Submit for review (may take 2-6 weeks to appear)
4. Document submission date and expected propagation window
5. Re-check downstream directories 6-8 weeks later to verify propagation
```

### 6.4 Propagation Timeline

Aggregator changes don't propagate instantly. Typical timelines:

| Action | Timeline |
|---|---|
| Aggregator listing update submitted | Day 0 |
| Aggregator verifies and publishes | 1–2 weeks |
| First downstream directories update | 3–4 weeks |
| Majority of downstream directories update | 6–8 weeks |
| Full propagation across ecosystem | 8–12 weeks |

Silas should set calendar reminders to verify propagation at 6 and 12 weeks post-submission.

---

## 7. CITATION BUILDING PROCESS

### 7.1 Manual Citation Building

For each directory, Silas follows this standard process:

```
1. Navigate to directory's "Add Business" or "Claim Business" page
2. Search for existing listing first (avoid creating duplicates)
3. IF listing exists but unclaimed → Claim it
4. IF listing exists and claimed by someone else → Flag for client to handle
5. IF no listing exists → Create new listing
6. Complete ALL available fields:
   ├── Business Name (golden NAP — exact match)
   ├── Address (golden NAP — exact match)
   ├── Phone (golden NAP — exact match)
   ├── Website URL (canonical URL)
   ├── Business Hours (match GBP exactly)
   ├── Categories (match GBP categories as closely as possible)
   ├── Description (use GBP description or condensed version)
   ├── Photos (upload 3-5 high-quality images)
   ├── Payment Methods (if available)
   ├── Year Established (if available)
   ├── License Numbers (if available)
   └── Social Media Links (if available)
7. Submit and document: directory name, submission date, login credentials
8. Verify listing goes live (check back in 1-2 weeks)
```

### 7.2 Citation Building Velocity

Don't build all citations at once. Sudden spikes in citation creation can trigger spam filters.

**Recommended velocity:**

| Phase | Volume | Timeframe |
|---|---|---|
| Week 1-2 | Aggregators (3-4 submissions) | Submit all aggregators |
| Week 3-4 | Tier 2 Core Directories (8-10) | 4-5 per week |
| Week 5-8 | Tier 3 Industry-Specific (5-10) | 2-3 per week |
| Week 9-12 | Tier 4 Long-Tail (10-20) | 3-5 per week |
| Ongoing | Social + new opportunities | As discovered |

### 7.3 Citation Content Rules

Every citation should include as much information as possible. Incomplete citations are weaker signals.

**Required fields (absolute minimum):**
- Business Name
- Address
- Phone
- Website URL

**Strongly recommended:**
- Business hours
- Categories
- Business description (200+ characters)

**Recommended (adds value):**
- Photos (minimum 3)
- Payment methods
- Year established
- Service area
- Social media links

**Description writing rules:**
- Write 3 description variations (short: 100 chars, medium: 300 chars, long: 700 chars) to match different directory field limits
- Each description must contain: business name, primary service, city, and a differentiator
- Do NOT copy-paste the same description everywhere — vary the wording while maintaining the same facts
- Include the city name and service keywords naturally
- Do NOT keyword-stuff — directories increasingly use AI to detect spam

---

## 8. CITATION MAINTENANCE

### 8.1 Ongoing Monitoring

Citations decay over time. Directories change ownership, platforms shut down, aggregators push stale data. Silas includes citation maintenance in the recurring optimization cycle:

**Monthly:**
- Check Tier 1 citations (GBP, aggregators, Apple, Bing) for accuracy
- Review any client NAP changes (new phone, address move, name change) and propagate

**Quarterly:**
- Run full citation scan using audit tool
- Fix any new inconsistencies
- Build 5-10 new long-tail citations
- Remove/update any deprecated directory listings

**Annually:**
- Complete citation inventory refresh
- Review industry-specific directories (new ones may have launched)
- Evaluate citation tool subscriptions

### 8.2 NAP Change Protocol

When a client changes their phone number, address, or business name, this is a high-priority event:

```
NAP CHANGE EMERGENCY PROTOCOL:
1. Update GBP immediately (highest priority)
2. Update all aggregators within 24 hours
3. Update Apple Business Connect and Bing Places within 48 hours
4. Update website (all pages, schema markup, footer, contact page) immediately
5. Update top 10 Tier 2 directories within 1 week
6. Update remaining directories within 2-4 weeks
7. Monitor aggregator propagation at 6 and 12 weeks
8. Run full citation scan at 90 days to catch stragglers
9. Update any print/physical materials (not Silas's job — flag for client)
```

The longer old NAP data persists, the more damage it does. Address changes are especially critical — Google may create a duplicate GBP listing if it finds conflicting address data across citations.

### 8.3 Duplicate Listing Management

Duplicate listings across directories (or worse, duplicate GBP listings) actively harm rankings. Silas handles duplicates:

**On directories:**
- Claim the correct listing, request removal of the duplicate via the directory's support/contact system
- If both are unclaimed, claim the one with more reviews/history, request removal of the other
- Document all duplicate resolution attempts and outcomes

**On GBP (critical):**
- If a duplicate GBP listing exists, use Google's "Suggest an edit" → "Place is permanently closed or has never existed" on the duplicate
- File a GBP support request for duplicate removal
- Never merge listings without client approval — merging can lose reviews
- Flag to the client immediately — duplicate GBPs are ranking emergencies

---

## 9. APPLE BUSINESS CONNECT & BING PLACES

### 9.1 Apple Business Connect

Apple Business Connect powers Apple Maps, Siri, Spotlight, and Wallet results. It's increasingly important as Apple's market share in mobile search grows.

**Setup process:**
1. Navigate to businessconnect.apple.com
2. Sign in with Apple ID (create one for the client if needed)
3. Search for existing business listing
4. Claim and verify (phone call, email, or document verification)
5. Complete all fields with golden NAP
6. Upload logo and cover photo
7. Add action buttons: call, directions, website, order (if applicable)
8. Set business hours (match GBP)
9. Add showcases (Apple's equivalent of GBP posts)
10. Submit for review

**Key differences from GBP:**
- Apple uses its own category taxonomy — map GBP categories as closely as possible
- Apple showcases are like GBP posts but with richer media support
- Apple Maps uses Foursquare data as a fallback, so Foursquare accuracy is doubly important

### 9.2 Bing Places

Bing Places powers Bing Maps, Cortana, and Microsoft Edge local results. Lower traffic than Google but zero competition from most businesses.

**Setup process:**
1. Navigate to bingplaces.com
2. Option A: Import directly from GBP (fastest — syncs all data)
3. Option B: Create manually with golden NAP
4. Verify via phone, email, or postcard
5. Complete all fields
6. Upload photos
7. Add services/menu items if applicable
8. Submit for review

**Import from GBP advantage:** Bing offers a one-click GBP import that syncs your listing automatically. This ensures NAP consistency and saves setup time. However, verify the import is accurate — Bing's import occasionally misformatts addresses.

---

## 10. CITATION BUILDING DELIVERABLES

### 10.1 Client Deliverable: Citation Audit Report

Silas generates this report during onboarding and quarterly refreshes:

```
CITATION AUDIT REPORT — {BUSINESS_NAME}
Date: {DATE}

GOLDEN NAP (Canonical Reference):
Name:    {BUSINESS_NAME}
Address: {ADDRESS}
Phone:   {PHONE}
Website: {URL}

SUMMARY:
Total Citations Found:    {N}
Correct Citations:        {N} ({%})
Inconsistent Citations:   {N} ({%})
Missing (Tier 1-2):       {N} directories not yet listed
Duplicate Listings:       {N}

TOP PRIORITY FIXES:
1. {Directory} — {Issue} — {Required Change}
2. {Directory} — {Issue} — {Required Change}
3. {Directory} — {Issue} — {Required Change}

MISSING CITATIONS TO BUILD:
1. {Directory} — {Tier} — {Priority}
2. {Directory} — {Tier} — {Priority}

CITATION SCORE: {X}/100
(Based on: coverage of Tier 1-3 sources + consistency rate)
```

### 10.2 Client Deliverable: Citation Tracking Spreadsheet

Silas maintains a master spreadsheet per client:

| Directory | Tier | Status | NAP Match | URL | Login | Date Built | Last Verified |
|---|---|---|---|---|---|---|---|
| Google Business Profile | 1 | Claimed | ✅ | {link} | {email} | {date} | {date} |
| Yelp | 2 | Claimed | ✅ | {link} | {email} | {date} | {date} |
| Yellow Pages | 2 | Unclaimed | ❌ Name | {link} | N/A | — | {date} |

This spreadsheet is the source of truth for all citation activity and is updated with every build/fix action.

---

## 11. AUTONOMOUS EXECUTION

### 11.1 What Silas Can Do Autonomously

| Action | Autonomous? | Notes |
|---|---|---|
| Run citation audit (scan + categorize) | ✅ Yes | Using API-based tools or manual search |
| Generate audit report | ✅ Yes | Standard report format |
| Identify missing citations | ✅ Yes | Compare against tier lists |
| Write citation descriptions (3 variants) | ✅ Yes | Based on GBP data + golden NAP |
| Generate NAP change propagation plan | ✅ Yes | Prioritized directory list with timeline |
| Build citations on directories | ⚠️ Partial | Can prepare all data; some directories require manual CAPTCHA or phone verification |
| Claim existing listings | ❌ No | Requires client to receive verification call/email/postcard |
| Submit aggregator updates | ⚠️ Partial | Can fill forms; verification may need client |
| Resolve duplicates | ❌ No | Requires human judgment + support requests |
| Monitor propagation | ✅ Yes | Scheduled re-checks at 6 and 12 weeks |

### 11.2 Handoff Protocol

For actions Silas can't complete autonomously, it generates a task card:

```
TASK: Claim Yelp Listing for {BUSINESS_NAME}
ASSIGNED TO: {OPERATOR}
URL: {YELP_CLAIM_URL}
REQUIRED INFO: Business phone must be available to receive verification call
GOLDEN NAP TO ENTER: {NAP_DATA}
DEADLINE: {DATE}
STATUS: Pending operator action
```

---

## 12. CROSS-SPEC INTEGRATION

| Related Spec | Integration Point |
|---|---|
| **SPEC-001 (GBP Optimization)** | GBP is the canonical citation source. Golden NAP is defined by the GBP listing. All other citations must match. |
| **SPEC-003 (Schema Markup)** | LocalBusiness schema on the website must match the golden NAP exactly. Schema is the website's "citation" signal. |
| **SPEC-013 (Expired Domain Link Building)** | Expired domains used for 301 redirects or microsites should include citations pointing to the main business — creates a citation + backlink double signal. |
| **SPEC-014 (Local PBN)** | PBN sites that mention the client business create unstructured citations. NAP references on PBN content must match golden NAP. |

---

*End of SPEC-012 — Citation Building & NAP Consistency*
*Total spec lines across 12 documents: ~12,100*
*Next: SPEC-013 — Expired Domain Acquisition & Link Building*
