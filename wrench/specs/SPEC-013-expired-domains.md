# SILAS SPEC #13 — EXPIRED DOMAIN ACQUISITION & LINK BUILDING
## Prospecting, Evaluation, Acquisition & Deployment of Expired Domains for Local SEO Authority

**Spec ID:** SPEC-013-EXPIRED-DOMAINS
**Version:** 1.0
**Dependencies:** SPEC-003 (Schema Markup), SPEC-006 (Semantic Location Silos), SPEC-012 (Citations)

---

## 1. PURPOSE

Expired domains with existing backlink authority, topical relevance, and geographic signals can be acquired and repurposed to funnel link equity into client sites. This is one of the highest-ROI off-site SEO tactics for local businesses because local domains with established authority are abundant, cheap, and undervalued by most competitors. This spec defines how Silas prospects for expired domains, evaluates their quality, and deploys them via 301 redirects or microsite rebuilds.

---

## 2. CORE CONCEPT

### 2.1 Why Expired Domains Work

When a domain expires, its backlink profile doesn't disappear immediately. The referring domains still point to it. If you acquire the expired domain and either 301 redirect it to the client's site or rebuild it with new content linking to the client, that backlink equity transfers.

For local SEO specifically, expired domains from businesses that were physically located in the client's target market carry geographic authority signals — local directory backlinks, local news mentions, chamber of commerce links — that are extremely difficult to earn organically.

### 2.2 Two Deployment Strategies

| Strategy | How It Works | Best For | Risk Level |
|---|---|---|---|
| **301 Redirect** | Point entire expired domain to client's relevant page via 301 redirect | Domains with strong backlink profiles but no content value | Low — Google handles 301s normally |
| **Microsite Rebuild** | Rebuild the domain with relevant content linking to client | Domains with topical relevance and content history | Low-Medium — requires ongoing content |

### 2.3 What Makes a Domain Valuable

The ideal expired domain for local SEO has:
- Backlinks from local sources (newspapers, directories, chambers, .gov/.edu)
- Geographic relevance (domain was a business in the same city/metro)
- Topical relevance (domain was in the same or adjacent industry)
- Clean history (no spam, no penalties, no adult content)
- Reasonable age (older = more authority, generally)
- Existing citations (if the expired business had directory listings, those still exist and can be updated)

---

## 3. PROSPECTING WORKFLOW

### 3.1 Prospecting Methods

Silas uses multiple methods to find expired domains in a client's target market:

**Method 1 — Competitor Backlink Mining:**
```
1. Pull backlink profiles of top 5 competitors (via Ahrefs, SEMrush, or Majestic)
2. Identify referring domains that are no longer active
3. Check if those domains are expired or expiring
4. Evaluate per §4 criteria
```
This finds domains that ALREADY link to businesses in the client's vertical and geography.

**Method 2 — Local Business Death Watch:**
```
1. Search for recently closed businesses in the target metro:
   - Google: "{city} business closed" + current year
   - Local news: "{city} restaurant closed" / "store closing {city}"
   - Yelp: Filter by "Closed" businesses in the target category
   - Google Maps: Look for "Permanently closed" businesses
2. Check if their domains are expired or expiring
3. Evaluate per §4 criteria
```

**Method 3 — Expired Domain Marketplaces:**
```
1. Search these platforms with geographic and topical filters:
   - ExpiredDomains.net (free — primary prospecting tool)
   - GoDaddy Auctions (use Advanced Search, not browse)
   - SpamZilla (paid — excellent filtering + spam detection)
   - DomCop (paid — aggregates multiple auction sources)
   - NameJet
   - SnapNames
   - Dynadot Expired Auctions
2. Filter by:
   - TLD: .com, .net, .org (avoid .info, .biz, exotic TLDs)
   - Contains city name or geographic identifier
   - Domain Authority / Referring Domains thresholds (see §4)
3. Evaluate per §4 criteria
```

**Method 4 — Wayback Machine Mining:**
```
1. Identify local businesses that existed 5-10 years ago
2. Check their domains on web.archive.org
3. If domain shows a legitimate local business, check availability
4. Evaluate per §4 criteria
```

**Method 5 — Chamber of Commerce / Directory Archaeology:**
```
1. Access Wayback Machine snapshots of local chamber member directories
2. Cross-reference current member list with archived lists
3. Missing members = potentially closed businesses with expired domains
4. Check domain availability
```

**Method 6 — Phone Number Reverse Prospecting (CATALYST Method):**
This is the highest-value prospecting technique. Most SEOs miss it entirely.
```
1. Find an expired domain with a local business history
2. Load the domain in Wayback Machine (web.archive.org)
3. Navigate to the old "Contact Us" page
4. Extract the phone number listed on the site
5. Google search that phone number (in quotes)
6. CHECK FOR: Does that phone number bring up a verified,
   active Google Business Profile?
   - If YES → The domain owner let the domain expire but their
     GBP listing is still live. This domain has ACTIVE entity
     memory in Google's system. This is the jackpot.
   - If the GBP shows "Permanently Closed" → Still very valuable.
     Google remembers this was a business in your target city.
   - If no GBP at all → Still usable but lower entity value.
7. BUY THE DOMAIN regardless, but prioritize active/closed GBP finds.
```

**Method 7 — GoDaddy Closeout Mining:**
GoDaddy Closeouts are the bargain bin — $5-$11 domains that most people overlook.
```
1. Go to GoDaddy Auctions → Advanced Search
2. Set filters:
   - Keywords: City name OR geo-modifiers (e.g., "Fort Lauderdale",
     "Broward", "South Florida")
   - Extension: .com, .net, .org only
   - Type: "Closeouts" (not Auctions — these are buy-now, no bidding)
   - Age: Minimum 3 years
3. Also search niche keywords: industry terms for client's vertical
   (e.g., "HVAC", "plumbing", "roofing", "dental")
4. Export list and run through evaluation scorecard (§4)
```
For auction domains (not closeouts): don't bid early. Set a timer for 5 minutes before auction end and place your max bid then. Early bidding drives prices up and alerts competitor bots.

### 3.2 Prospecting Filters

To avoid wasting time evaluating junk domains, apply these pre-filters:

| Filter | Threshold | Rationale |
|---|---|---|
| Referring Domains | ≥ 10 | Below this, the domain has negligible link equity |
| Domain Rating (Ahrefs) or DA (Moz) | ≥ 15 | Below this, not worth the registration cost |
| TLD | .com, .net, .org only | Exotic TLDs carry less trust |
| Domain Age | ≥ 3 years of active history | Newer domains had less time to build authority |
| Spam Score (Moz) | ≤ 30% | Above this, likely penalized or spam-infested |
| Geographic Relevance | Must be in target metro | A plumber domain in Dallas won't help a Fort Lauderdale client |
| Content History | Must show legitimate business on Wayback | Domains with only parked/spam history are worthless |

---

## 4. DOMAIN EVALUATION CRITERIA

### 4.1 Evaluation Scorecard

For each candidate domain, Silas runs this evaluation:

```
DOMAIN: {domain.com}
EVALUATION DATE: {date}

AUTHORITY METRICS:
□ Referring Domains: {N}         (Score: 0-25)
  - 10-25 RD = 5pts | 25-50 = 10pts | 50-100 = 15pts | 100-250 = 20pts | 250+ = 25pts
□ Domain Rating (Ahrefs): {N}    (Score: 0-15)
  - DR 15-25 = 5pts | 25-40 = 10pts | 40+ = 15pts
□ Domain Age: {N} years          (Score: 0-10)
  - 3-5yr = 3pts | 5-10yr = 7pts | 10+ = 10pts

RELEVANCE METRICS:
□ Geographic Match: {city/metro}  (Score: 0-20)
  - Same city = 20pts | Same metro = 15pts | Same state = 5pts | No match = 0pts
□ Topical Match: {industry}       (Score: 0-15)
  - Same industry = 15pts | Adjacent = 10pts | Same vertical = 5pts | Unrelated = 0pts
□ Local Backlinks: {N}            (Score: 0-15)
  - Local newspaper = 5pts each (max 15)
  - Chamber/govt/edu = 5pts each (max 15)
  - Local directories = 2pts each (max 10)

SAFETY METRICS:
□ Spam Score (Moz): {N}%         (Pass/Fail)
  - ≤ 30% = Pass | > 30% = Fail (do not acquire)
□ Wayback History: {Clean/Spam}  (Pass/Fail)
  - Shows legitimate business = Pass | Shows spam/adult/pharma = Fail
□ Google Penalty Check:           (Pass/Fail)
  - Search "site:domain.com" — if zero results but domain has history = likely penalized = Fail
□ Anchor Text Profile:            (Pass/Fail)
  - Natural anchor distribution = Pass | Spammy exact-match anchors = Fail

ENTITY GHOST METRICS (CATALYST — highest-value signal):
□ Citation Trail:                  (Score: 0-15)
  - Search "domain.com" in quotes
  - Do results appear on Yelp, MapQuest, YellowPages, Manta?
  - Do those citations list an address in target city?
  - Citations found with local address = 15pts | Citations but wrong city = 5pts | None = 0pts
□ GBP Entity Memory:              (Score: 0-20)
  - Find old phone number from Wayback Machine contact page
  - Google search that phone number
  - Active verified GBP still exists = 20pts (JACKPOT)
  - "Permanently Closed" GBP exists = 15pts (very valuable)
  - No GBP but citations exist = 5pts
  - No entity trail at all = 0pts

THE LOCAL LINK RULE (overrides DR):
  DR 50 with ZERO local backlinks → PASS (low local value)
  DR 8 with 3 links from local businesses/newspapers/chamber → BUY
  Local links from .gov, .edu, local news, chamber of commerce
  are worth more than 50 generic high-DR backlinks for Map Pack movement.

TOTAL SCORE: {X}/100

RECOMMENDATION:
≥ 70: Strong acquire — high priority
50-69: Worth acquiring at low cost (< $50)
30-49: Marginal — acquire only if very cheap (< $15) and no better options
< 30: Do not acquire
```

### 4.2 Backlink Quality Audit

Beyond the scorecard, Silas reviews the actual backlink profile:

```
STEP 1: THE "LOCAL LINK" AUDIT (CATALYST — Most critical step)
Open the domain's backlink profile in Ahrefs/SEMrush.
Search WITHIN the backlinks for the target city name (e.g., "Fort Lauderdale").

LOOK FOR links from:
  - Local newspaper (e.g., sun-sentinel.com)
  - City/county government (e.g., fortlauderdale.gov)
  - Local college/university (e.g., broward.edu)
  - Chamber of commerce (e.g., ftlchamber.com)
  - Local churches, charities, or community organizations
  - Other local businesses

THE RULE: A domain with DR 50 but ZERO local links → LOW VALUE for Map Pack.
A domain with DR 8 but 3 links from local businesses → HIGH VALUE. BUY IT.
Local backlinks are the currency that moves the Map Pack. Generic high-DR
links move organic rankings but don't lift local pack positions.

STEP 2: GENERAL BACKLINK QUALITY CHECK
FOR EACH MAJOR REFERRING DOMAIN, CHECK:
1. Is the referring domain still live? (Dead links pass no equity)
2. Is the link dofollow? (Nofollow links pass minimal/no equity)
3. Is the referring page indexed? (Deindexed pages pass no equity)
4. Is the referring domain relevant? (Topical or geographic relevance)
5. Is the link contextual? (In-content link vs footer/sidebar)

FLAG IF:
- > 50% of backlinks are from non-English sites (spam indicator)
- > 30% of anchor text is exact-match keywords (penalty risk)
- Major backlinks come from PBN networks (toxic association)
- Domain was previously used for 301 redirect chaining
```

### 4.3 Wayback Machine Audit

```
WAYBACK MACHINE CHECK:
1. Load web.archive.org/web/*/{domain.com}
2. Review snapshots from the last 5-10 years
3. LOOK FOR:
   ├── Legitimate business content (good)
   ├── Local business with NAP visible (very good — check for phone number, see Method 6)
   ├── Blog or content site with real articles (good)
   ├── Parked page / "domain for sale" (neutral — depends on pre-parking history)
   ├── Spam / pill / casino / adult content (reject immediately)
   ├── Doorway pages or redirect chains (reject)
   ├── Japanese/Chinese/Russian text appearing suddenly (PBN hack — reject unless pre-hack content was legitimate and pre-hack backlinks are the valuable ones)
   └── "Buy Viagra" / pharma spam at any point in history (reject — anchor text is poisoned)
4. Note the last date the domain had real content
5. If real content existed within the last 3 years, backlinks are likely still being crawled
```

---

## 5. ACQUISITION PROCESS

### 5.1 Registration Sources

| Source | Best For | Typical Cost |
|---|---|---|
| **GoDaddy Auctions** | Recently expired domains with bidding | $10–$500+ |
| **NameCheap** | Standard expired registration | $8–$15 |
| **Porkbun** | Budget registration | $8–$12 |
| **Google Domains (now Squarespace)** | Reliable registration | $12–$14 |
| **ExpiredDomains.net → registrar** | Finding then registering directly | Registration cost only |
| **Dropcatch services** | High-value domains that are about to drop | $10–$100+ |

### 5.2 Acquisition Rules

- Never spend more than $100 on a domain for a local SEO client unless the backlink profile is exceptional (50+ quality referring domains with local relevance)
- Register with a different registrar than the client's main domain (diversifies footprint)
- Use privacy protection (WHOIS guard) to prevent competitive intelligence leakage
- Register for at least 2 years (sends a stability signal)
- Document the acquisition: domain, cost, date, intended deployment, client assignment

### 5.3 Budget Guidelines

| Client Monthly SEO Budget | Domain Acquisition Budget | Domains Per Quarter |
|---|---|---|
| $500–$1,000 | $25–$50/quarter | 1–3 |
| $1,000–$2,500 | $50–$150/quarter | 2–5 |
| $2,500–$5,000 | $150–$400/quarter | 3–8 |
| $5,000+ | $400+/quarter | 5–15 |

---

## 6. DEPLOYMENT: 301 REDIRECT

### 6.1 When to Use 301 Redirects

301 redirects are the simpler deployment option. Use when:
- The expired domain has a strong backlink profile but no content worth rebuilding
- You want immediate link equity transfer with minimal ongoing maintenance
- The domain's topical relevance aligns with a specific page on the client's site

### 6.2 Implementation

```
STEP 1: Set up hosting for the expired domain (cheapest plan available)
STEP 2: Point the domain's DNS to the hosting server
STEP 3: Configure 301 redirect via .htaccess:

  # .htaccess file
  RewriteEngine On
  RewriteRule ^(.*)$ https://clientsite.com/target-page [R=301,L]

STEP 4: Verify redirect is working (curl -I {expired-domain.com})
STEP 5: Submit the expired domain to Google Search Console
STEP 6: Request indexing of the expired domain (so Google crawls it and discovers the 301)
STEP 7: Monitor in Google Search Console for 4-8 weeks
```

### 6.3 Redirect Mapping

Map the redirect to the most relevant page on the client's site:

| Expired Domain Type | Redirect Target |
|---|---|
| Same-industry local business | Client's city hub page |
| Same-service business | Client's matching service page |
| Local organization / community site | Client's homepage |
| Industry blog / content site | Client's most relevant blog post or service page |
| **Entity Ghost with GBP memory** | Client's Google Maps CID link (see §6.4) |

**Never redirect to:**
- The homepage if a more relevant page exists (wastes topical relevance)
- A page that doesn't match the expired domain's topical context
- Multiple pages (you can only 301 to one destination per domain, unless you do page-level mapping)

### 6.4 CID Entity Merge Redirect (CATALYST Technique)

If the expired domain scored high on Entity Ghost metrics (§4.1) — meaning it had an active or permanently closed GBP listing — you can redirect it to the client's Google Maps CID link. This tells Google that the old entity at the expired domain's location has "moved" to the client's location.

**CID Link Format:**
```
https://maps.google.com/?cid=XXXXXXXXXXXXXXXXXX
```

Find the client's CID by searching their business on Google Maps, clicking their listing, and extracting the `cid=` parameter from the URL.

**Implementation:**
```
# .htaccess for Entity Ghost → CID merge
RewriteEngine On
RewriteRule ^(.*)$ https://maps.google.com/?cid=XXXXXXXXXXXXXXXXXX [R=301,L]
```

**When to use CID redirect vs website redirect:**
- CID redirect: The expired domain's entity was in the SAME industry AND same geographic area. You're effectively telling Google these entities should merge.
- Website redirect: The expired domain has good backlinks but weak entity signals. Pure link equity transfer.

**Risk note:** CID merges are powerful but aggressive. If the expired domain's entity was in a very different industry, the merge signal may confuse Google's entity resolution. Use only when there's strong industry alignment.

### 6.4 Page-Level Redirect Mapping (Advanced)

If the expired domain has strong backlinks pointing to specific inner pages, map those pages individually:

```
# .htaccess
RewriteEngine On

# Map specific pages to relevant client pages
RewriteRule ^services/ac-repair$ https://clientsite.com/ac-repair-fort-lauderdale [R=301,L]
RewriteRule ^about$ https://clientsite.com/about [R=301,L]
RewriteRule ^contact$ https://clientsite.com/contact [R=301,L]

# Catch-all for everything else
RewriteRule ^(.*)$ https://clientsite.com/ [R=301,L]
```

Use Ahrefs or similar to identify which inner pages have the most backlinks and map those specifically.

---

## 7. DEPLOYMENT: MICROSITE REBUILD

### 7.1 When to Use Microsite Rebuilds

Rebuilding the expired domain as a functional microsite is more work but produces stronger, longer-lasting results. Use when:
- The expired domain has strong topical AND geographic relevance
- The domain name itself is keyword-rich (e.g., fortlauderdaleacrepair.com)
- You want to create an additional asset that generates its own traffic
- The client's budget supports ongoing content maintenance
- You plan to use the domain as part of a local PBN (see SPEC-014)

### 7.2 Microsite Architecture

A rebuilt microsite should be minimal but legitimate:

```
PAGES:
├── Homepage: Overview of the service/topic + link to client
├── Service Page 1: Detailed content on primary topic + link to client
├── Service Page 2: Detailed content on secondary topic + link to client
├── About Page: Brief "about" content establishing the site's purpose
├── Contact Page: Redirect to client's contact page or simple form
└── Blog (optional): 2-3 articles on relevant local topics

TECHNICAL:
├── Hosted on separate hosting from client (diversify footprint)
├── Unique IP address (not shared with client site or other microsites)
├── SSL certificate installed
├── Google Analytics and Search Console set up
├── Sitemap.xml submitted
├── Robots.txt configured
└── Basic WordPress install with lightweight theme
```

### 7.3 Microsite Content Rules

- Content must be unique and genuinely useful (not thin doorway pages)
- Include 1-2 contextual links to client's site per page (maximum)
- Links to client should use natural anchor text (not exact-match keyword anchors)
- Include links to other authoritative external sources (Wikipedia, government sites, industry authorities) to look natural
- Content should be 500-1,000 words per page minimum
- Include the city/metro name naturally throughout
- Add LocalBusiness schema if the microsite represents a plausible local entity
- Update content at least quarterly (stale microsites get devalued)

### 7.4 Microsite Link Placement

Links from the microsite to the client should be:

```
GOOD — Natural contextual link:
"For professional AC repair services in Fort Lauderdale, homeowners
consistently recommend <a href="https://clientsite.com/ac-repair">
Acme HVAC Solutions</a>, a NATE-certified contractor serving
Broward County."

BAD — Unnatural exact-match anchor:
"If you need <a href="https://clientsite.com">Fort Lauderdale AC
repair emergency 24/7 HVAC contractor</a>, call today."

BAD — Footer/sidebar sitewide link:
<footer>Sponsored by <a href="https://clientsite.com">Client Name</a></footer>
```

---

## 8. MONITORING & MAINTENANCE

### 8.1 Post-Deployment Monitoring

After deploying a 301 redirect or microsite, Silas tracks:

| Metric | Tool | Check Frequency | Success Indicator |
|---|---|---|---|
| 301 is functioning | curl / uptime monitor | Weekly for first month, then monthly | HTTP 301 response |
| Google has crawled the redirect | Google Search Console | Weekly for 8 weeks | Coverage report shows redirect |
| Referring domains still linking | Ahrefs / SEMrush | Monthly | Backlink count stable or growing |
| Client page ranking movement | Rank tracker | Weekly | Positive rank movement for target keyword |
| Organic traffic to client page | GA4 | Monthly | Traffic increase to redirect target page |

### 8.2 Domain Renewal

- Expired domains acquired for SEO must be renewed annually
- Set auto-renewal to prevent accidental loss
- If a domain's backlink profile degrades significantly (major referring domains remove links), evaluate whether renewal is worth the cost
- Maintain a master spreadsheet of all acquired domains: domain, client, deployment type, cost, renewal date, referring domains count

### 8.3 Risk Management

| Risk | Mitigation |
|---|---|
| Google devalues 301 redirects from expired domains | Diversify with microsites + continue building organic links |
| Expired domain has hidden spam history | Thorough Wayback audit before acquisition (§4.3) |
| Competitor reports your redirect as spam | Ensure redirect targets a relevant page; maintain clean backlink profile |
| Domain registration cost exceeds value | Track ROI per domain quarterly; drop underperformers |
| Too many 301s to same client creates pattern | Spread across multiple client pages; mix 301s with microsites |

---

## 9. AUTONOMOUS EXECUTION

### 9.1 What Silas Can Do

| Action | Autonomous? | Notes |
|---|---|---|
| Prospect for expired domains | ✅ Yes | Automated search via APIs or manual methods |
| Evaluate domain quality (scorecard) | ✅ Yes | Pull metrics from Ahrefs/Moz APIs |
| Run Wayback Machine audit | ✅ Yes | web.archive.org is freely accessible |
| Generate acquisition recommendations | ✅ Yes | Score + recommend based on thresholds |
| Register domains | ⚠️ Partial | Can automate via registrar APIs; requires payment method |
| Configure 301 redirects | ✅ Yes | Automated via hosting API or SSH |
| Build microsite content | ✅ Yes | Content generation per §7.3 rules |
| Monitor post-deployment | ✅ Yes | Scheduled checks via APIs |
| Manage renewals | ⚠️ Partial | Can flag upcoming renewals; payment requires operator |

### 9.2 Prospecting Output Format

Silas delivers expired domain prospects in this format:

```
EXPIRED DOMAIN PROSPECT REPORT — {CLIENT_NAME}
Target Metro: {CITY}
Target Industry: {INDUSTRY}
Scan Date: {DATE}

RECOMMENDED ACQUISITIONS:

1. {domain1.com}
   Score: 82/100
   DR: 35 | RD: 87 | Age: 8 years
   Geo Match: Same city (Fort Lauderdale) ✅
   Topical Match: Same industry (HVAC contractor) ✅
   Local Backlinks: 12 (including city newspaper, chamber of commerce)
   Wayback: Clean — legitimate HVAC business 2014-2022
   Est. Cost: $12 (standard registration)
   Recommended Deployment: 301 → /ac-repair-fort-lauderdale
   ROI Projection: High

2. {domain2.com}
   Score: 61/100
   ...

PASSED ON (with reasons):
- {domain3.com}: Spam score 45%, rejected
- {domain4.com}: DR 8, below threshold
```

---

## 10. CROSS-SPEC INTEGRATION

| Related Spec | Integration Point |
|---|---|
| **SPEC-006 (Semantic Location Silos)** | 301 redirect targets should align with the silo hierarchy. A neighborhood-relevant expired domain → redirect to the neighborhood spoke page. |
| **SPEC-012 (Citations)** | Expired domains from local businesses may still have active citations. If acquired, update those citations to point to client (creates citation + backlink double signal). |
| **SPEC-014 (Local PBN)** | Microsites built from expired domains can become part of the PBN. The distinction is that SPEC-013 microsites are standalone link equity vehicles, while SPEC-014 PBN sites are part of a coordinated network. |

---

*End of SPEC-013 — Expired Domain Acquisition & Link Building*
*Total spec lines across 13 documents: ~13,200*
*Next: SPEC-014 — Local PBN Architecture*
