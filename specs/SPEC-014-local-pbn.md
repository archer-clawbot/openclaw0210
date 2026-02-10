# SILAS SPEC #14 — LOCAL PBN ARCHITECTURE
## Private Blog Network Design, Hosting, Content & Link Strategy for Local SEO

**Spec ID:** SPEC-014-LOCAL-PBN
**Version:** 1.0
**Dependencies:** SPEC-006 (Semantic Location Silos), SPEC-012 (Citations), SPEC-013 (Expired Domains)

---

## 1. PURPOSE

A Private Blog Network (PBN) is a set of websites you control that exist primarily to pass link equity to client sites. This spec defines how Silas architects, builds, and maintains a local PBN optimized for local SEO — one that looks like a collection of legitimate local resources rather than a coordinated link farm. A well-built local PBN is the most controllable off-site authority lever available.

**Risk Acknowledgment:** PBNs violate Google's webmaster guidelines. Detection results in penalties for both the PBN sites and the client sites they link to. Every design decision in this spec prioritizes detection avoidance. Silas should inform the operator of this risk during deployment and obtain explicit approval.

---

## 2. LOCAL PBN vs TRADITIONAL PBN

Traditional PBNs are generic authority sites linking to money sites. Local PBNs are fundamentally different:

| Dimension | Traditional PBN | Local PBN |
|---|---|---|
| **Content** | Generic articles on any topic | Hyper-local content: city guides, neighborhood resources, local event coverage |
| **Link targets** | Money pages (commercial) | City hubs, service pages, neighborhood spokes |
| **Domain sourcing** | Any high-DR expired domain | Locally relevant expired domains (local businesses, community sites) |
| **Hosting** | Diversified across hosts | Diversified AND geographically varied |
| **Audience** | None (purely for bots) | Plausible local audience (community resource) |
| **Detection risk** | High (obvious pattern) | Lower (looks like real local websites) |
| **Content depth** | Thin 300-500 word posts | Substantive 800-1500 word local guides |
| **Update frequency** | Rarely | Monthly (mimics active community site) |

The key insight: a local PBN site should be indistinguishable from a legitimate local community blog or resource site run by a hobbyist or local enthusiast. If a manual reviewer can't tell it's a PBN site, it's built correctly.

---

## 3. NETWORK ARCHITECTURE

### 3.1 Network Size Guidelines

| Client Monthly Budget | PBN Sites to Build | Content Per Site Per Month |
|---|---|---|
| $500–$1,000 | 2–3 | 1 post/month |
| $1,000–$2,500 | 3–5 | 1–2 posts/month |
| $2,500–$5,000 | 5–8 | 2 posts/month |
| $5,000+ | 8–15 | 2–3 posts/month |

### 3.2 Network Topology

PBN sites must NOT link to each other or create obvious patterns:

```
CORRECT TOPOLOGY (Spoke Model):
Each PBN site links only to the client site.
No PBN site links to any other PBN site.

PBN-A ──→ Client Site ←── PBN-B
              ↑
PBN-C ──→    │    ←── PBN-D
              │
PBN-E ────────┘

WRONG TOPOLOGY (Wheel — Detectable):
PBN-A → PBN-B → PBN-C → Client → PBN-A  (circular pattern = instant detection)

WRONG TOPOLOGY (Hub-and-Spoke with Cross-Links):
PBN-A ↔ PBN-B ↔ PBN-C ↔ PBN-D → Client (interconnected = network footprint)
```

### 3.3 Diversification Requirements

Every PBN site must be unique across these dimensions:

| Dimension | Requirement | Why |
|---|---|---|
| **Registrar** | Different registrar per 3 sites minimum | Same registrar for 10+ domains = footprint |
| **Hosting provider** | Different host per site (minimum 3 hosts across network) | Shared hosting IP = network detection |
| **IP address** | Unique IP per site (different C-class) | Same IP range = obvious PBN |
| **CMS / Theme** | Varied — WordPress, HTML, Hugo, Ghost | All WordPress with same theme = footprint |
| **WHOIS** | Privacy protection on ALL domains | Prevents ownership pattern detection |
| **Google Analytics** | Different GA property per site (or no GA) | Same GA account = instant network detection |
| **Google Search Console** | Separate Google account per site (or none) | Same GSC account = network footprint |
| **AdSense / Monetization** | Different approach per site or none | Same AdSense = network linking |
| **Content author** | Different author names/bios per site | Same author across PBN = footprint |
| **Design style** | Visually distinct — different colors, layouts, fonts | Cookie-cutter design = obvious |

### 3.4 Critical Footprint Avoidance Rules

```
NEVER:
├── Use the same Google Analytics property across PBN sites
├── Use the same Google account for Search Console
├── Use the same email address for registration or hosting
├── Use the same theme/template across more than 2 sites
├── Use the same hosting provider for more than 3 sites
├── Link PBN sites to each other
├── Put PBN sites on the same IP or IP range
├── Use the same content management system for every site
├── Use the same author name across sites
├── Register all domains on the same day
├── Host PBN sites on the same server as the client site
├── Include client branding on PBN sites
├── Use identical page structures across sites
└── Set up CDN/Cloudflare with the same account for multiple PBN sites
```

---

## 4. DOMAIN SELECTION FOR PBN

### 4.1 Sourcing

PBN domains come from two sources:

**Source A — Expired Domains (Primary):**
Use the SPEC-013 prospecting workflow but with modified criteria for PBN suitability. A domain that scores 50-69 on the SPEC-013 scorecard (marginal for 301 redirect) may be perfect for PBN use because you'll be rebuilding it with content.

**Source B — Fresh Registrations (Supplementary):**
Register new domains with locally relevant names. These have no existing authority but avoid the risk of inherited penalties.

Fresh domain naming patterns:
- `{city}homeownerguide.com`
- `living-in-{neighborhood}.com`
- `{city}communitynews.net`
- `best-of-{city}.com`
- `{city}{service}guide.com`

### 4.2 PBN Domain Evaluation Criteria

Domains for PBN use have different thresholds than 301 redirect domains:

| Metric | Minimum for PBN | Ideal |
|---|---|---|
| Referring Domains | ≥ 5 (lower threshold than 301s) | 20+ |
| Domain Rating | ≥ 10 | 25+ |
| Spam Score | ≤ 20% (stricter than 301s) | ≤ 10% |
| Geographic Relevance | Same metro preferred | Same city ideal |
| Wayback History | Must show clean content | Legitimate local business/resource ideal |
| Age | ≥ 2 years | ≥ 5 years |

---

## 5. SITE BUILD SPECIFICATIONS

### 5.1 CMS Selection

Vary CMS across the network to avoid pattern detection:

| CMS | Use For | Detection Notes |
|---|---|---|
| **WordPress** | 40-50% of sites | Most natural — 40% of the web uses WP |
| **Static HTML** | 20-30% of sites | Fastest, simplest, hardest to fingerprint |
| **Hugo / Jekyll / 11ty** | 10-20% of sites | Static site generators look like hobby/dev sites |
| **Ghost / Blogger** | 10% of sites | Different platform fingerprint |

### 5.2 WordPress Configuration (When Used)

```
SETUP CHECKLIST:
□ Install WordPress manually (not one-click — avoids host-specific fingerprints)
□ Use a DIFFERENT theme than other PBN sites and the client site
□ Choose from free themes with 10,000+ installs (looks organic)
□ Install only 3-5 essential plugins:
  ├── Yoast SEO or RankMath (basic SEO)
  ├── WP Super Cache or LiteSpeed Cache (performance)
  ├── Akismet or Antispam Bee (looks like a real site)
  └── Contact Form 7 (functional contact page)
□ Create a custom favicon (not default WP icon)
□ Set a unique tagline/site description
□ Remove default "Hello World" post and sample page
□ Set up a unique permalink structure
□ Disable XML-RPC (security — real site operators do this)
□ Remove WordPress version number from source
```

### 5.3 Page Structure

Each PBN site needs these pages at minimum:

```
REQUIRED PAGES:
├── Homepage: Overview of the site's topic/purpose
├── About Page: Fictional author/organization bio (plausible, not client-related)
├── Contact Page: Simple form (emails to a dedicated inbox, not client's)
├── Privacy Policy: Standard privacy policy (use a generator)
├── 3-5 Content Pages/Posts: Substantive local content (see §6)
└── Sidebar/Footer: Looks natural — categories, recent posts, search bar
```

### 5.4 Design Requirements

- Unique color scheme per site (NOT client brand colors)
- Unique logo or text-based site title per site
- At least one custom image per page (use Unsplash, Pexels — or AI-generated local imagery)
- Functional navigation (header menu, footer links)
- Mobile responsive (non-responsive sites look abandoned)
- SSL certificate installed (free via Let's Encrypt)
- Fast loading (< 3 seconds — slow sites look neglected)

---

## 6. CONTENT STRATEGY

### 6.1 Content Themes

PBN sites should look like genuine local resources. Content themes by site type:

**Type A — Local Area Guide:**
- "Best [restaurants/parks/activities] in [neighborhood]"
- "[City] neighborhood guide: [neighborhood name]"
- "Moving to [city]: What you need to know"
- "[City] events this month"
- "Hidden gems in [city]"

**Type B — Homeowner Resource:**
- "Home maintenance tips for [city] climate"
- "When to replace your [system] in [state]"
- "How to prepare your home for [local weather event]"
- "[City] building codes homeowners should know"
- "Best home improvement projects for [climate]"

**Type C — Community Blog:**
- "Local business spotlight: [business name]" (including client — natural placement)
- "[Neighborhood] development update"
- "New businesses opening in [city]"
- "Interview with [local figure/business owner]"

**Type D — Industry Resource:**
- "[Service] buying guide for [city] homeowners"
- "How to choose a [service provider] in [city]"
- "Common [service] problems in [climate/region]"
- "[Year] cost guide: [service] in [city]"

### 6.2 Content Quality Standards

PBN content is NOT throwaway. Low-quality PBN content is the #1 reason PBNs get detected and penalized.

| Standard | Requirement |
|---|---|
| Word count | 800–1,500 words per post (no thin content) |
| Uniqueness | 100% unique — never duplicated across PBN sites or client site |
| Local specificity | Named streets, neighborhoods, landmarks, businesses |
| Imagery | Minimum 1 image per post, with descriptive alt text |
| Internal links | 2-3 internal links per post (to other pages on the SAME PBN site) |
| External links | 2-4 external links to authoritative sources (Wikipedia, .gov, news) |
| Client links | Maximum 1 link to client per post (see §7) |
| Publishing cadence | Minimum 1 post per month per site |
| Formatting | Use headings, short paragraphs, occasional lists (looks like real blog) |

### 6.3 Content Generation

Silas can generate PBN content using local models (Llama, DeepSeek) to save API costs. Quality rules:

- Generate drafts with local LLM
- Review/edit for naturalness and local accuracy
- Verify no duplicate content across sites
- Add location-specific details that only a local would know
- Vary writing style between PBN sites (different "authors")
- Never mention the client in every post — only 30-40% of posts should contain a client link

---

## 7. LINK PLACEMENT STRATEGY

### 7.1 Link Types

| Link Style | Use Frequency | Example |
|---|---|---|
| **Contextual recommendation** | 40% of client links | "For professional AC repair in Fort Lauderdale, we recommend Acme HVAC." |
| **Resource mention** | 30% of client links | "Acme HVAC has a comprehensive guide to AC maintenance on their site." |
| **Local business spotlight** | 20% of client links | "Acme HVAC has been serving Fort Lauderdale since 2008..." (full paragraph) |
| **Sidebar/footer resource list** | 10% of client links | "Recommended local services: [list including client]" |

### 7.2 Anchor Text Distribution

This is critical. Unnatural anchor text is the fastest way to get a PBN detected AND penalize the client site.

| Anchor Type | Target % | Example |
|---|---|---|
| **Brand name** | 40-50% | "Acme HVAC Solutions" |
| **Naked URL** | 15-20% | "https://acmehvac.com" |
| **Generic** | 15-20% | "this company", "learn more", "their website" |
| **Partial match** | 10-15% | "AC repair services", "Fort Lauderdale HVAC" |
| **Exact match** | 0-5% | "AC repair Fort Lauderdale" (use sparingly) |

**NEVER exceed 10% exact-match anchors.** This is the single biggest penalty trigger.

### 7.3 Link Velocity

Don't add all links at once. Natural link growth is gradual.

| Network Size | New Client Links Per Month | Total Links After 6 Months |
|---|---|---|
| 3 sites | 1-2 | 6-12 |
| 5 sites | 2-3 | 12-18 |
| 8 sites | 3-4 | 18-24 |
| 15 sites | 4-6 | 24-36 |

### 7.4 Link Target Distribution

Don't send all PBN links to the same page:

| Target Page | % of PBN Links |
|---|---|
| Homepage | 20-30% |
| City hub pages | 25-35% |
| Service pages | 20-30% |
| Neighborhood spokes | 10-15% |
| Blog posts | 5-10% |

---

## 8. HOSTING & INFRASTRUCTURE

### 8.1 Hosting Diversification Matrix

For a 5-site PBN, the infrastructure should look like this:

| Site | Registrar | Host | CMS | IP Range |
|---|---|---|---|---|
| Site A | NameCheap | SiteGround | WordPress | 104.21.x.x |
| Site B | Porkbun | A2 Hosting | Static HTML | 68.183.x.x |
| Site C | GoDaddy | Hostinger | WordPress | 153.92.x.x |
| Site D | Google Domains | DigitalOcean | Hugo | 167.71.x.x |
| Site E | Dynadot | Cloudways | Ghost | 198.211.x.x |

### 8.2 Budget-Friendly Hosting Options

| Provider | Cheapest Plan | Notes |
|---|---|---|
| Hostinger | $2-3/mo | Good for WordPress PBN sites |
| DigitalOcean | $4-6/mo | Droplets with unique IPs |
| Vultr | $3.50-5/mo | Cloud servers, global locations |
| A2 Hosting | $3-5/mo | Reliable shared hosting |
| Nearly Free Speech | $0.25-2/mo | Extremely cheap for static sites |
| GitHub Pages / Netlify | Free | For static sites only — limited but zero cost |

### 8.3 Monthly Infrastructure Cost

| Network Size | Estimated Monthly Cost (domains + hosting) |
|---|---|
| 3 sites | $15–$30/mo |
| 5 sites | $25–$50/mo |
| 8 sites | $40–$80/mo |
| 15 sites | $75–$150/mo |

---

## 9. MAINTENANCE & MONITORING

### 9.1 Monthly Maintenance Tasks

```
PER SITE, MONTHLY:
□ Publish 1-2 new content posts
□ Update WordPress core/plugins/themes (if WP)
□ Check site is loading properly (uptime)
□ Verify SSL certificate is valid
□ Check Google Search Console for issues (if enrolled)
□ Review analytics for any unusual traffic patterns

PER NETWORK, MONTHLY:
□ Verify no cross-site footprints have been introduced
□ Check that all sites are still indexed (site:domain.com)
□ Review backlink profiles of PBN sites (are they building natural backlinks?)
□ Audit anchor text distribution across all client links
□ Review domain renewal dates — renew before expiration
```

### 9.2 Health Indicators

| Indicator | Healthy | Unhealthy |
|---|---|---|
| Indexation | All pages indexed | Pages dropping from index |
| Organic traffic | Any organic traffic (even minimal) | Zero traffic for 3+ months |
| Backlinks to PBN | Building natural backlinks over time | Losing backlinks or only PBN backlinks |
| Content freshness | Updated within last 60 days | No updates in 90+ days |
| Site speed | < 3 seconds load | > 5 seconds |
| Uptime | 99%+ | Frequent downtime |

### 9.3 Decommissioning

If a PBN site is compromised or underperforming:

```
DECOMMISSION PROCESS:
1. Remove all links to client sites from the PBN site
2. Wait 4 weeks for Google to recrawl
3. Let the domain expire (or sell it)
4. Do NOT 301 redirect the PBN domain to the client site
5. Do NOT delete content before removing links (sudden deletion is suspicious)
6. Update the master PBN inventory spreadsheet
```

---

## 10. DOCUMENTATION & INVENTORY

### 10.1 Master PBN Inventory

Silas maintains a secure, encrypted inventory of all PBN assets:

```
PBN INVENTORY — {AGENCY_NAME}

SITE: {domain.com}
├── Client: {CLIENT_NAME}
├── Registrar: {registrar} | Account: {email}
├── Host: {host} | Account: {email}
├── CMS: {WordPress/HTML/Hugo/etc.}
├── IP Address: {IP}
├── Theme/Design: {theme name or "custom"}
├── GA Property: {ID or "none"}
├── GSC: {account email or "none"}
├── Domain Acquired: {date}
├── Site Launched: {date}
├── Renewal Date: {date}
├── Monthly Cost: ${hosting}
├── Content Posts Published: {N}
├── Last Content Update: {date}
├── Client Links: {N total} | Anchor types: {breakdown}
├── Status: {Active / Monitoring / Decommissioning}
└── Notes: {any special considerations}
```

### 10.2 Security Protocols

PBN documentation is sensitive. If a competitor or Google employee discovered the inventory, the entire network and client sites would be at risk.

- Store inventory in encrypted document (not plain text Google Doc)
- Never share PBN details over email
- Use unique passwords per hosting/registrar account
- Never discuss PBN specifics in client-facing reports
- In client reports, reference PBN link building as "authority building" or "editorial link acquisition"

---

## 11. AUTONOMOUS EXECUTION

| Action | Autonomous? | Notes |
|---|---|---|
| Domain prospecting for PBN | ✅ Yes | Per SPEC-013 workflow with PBN-specific criteria |
| Domain evaluation | ✅ Yes | Automated scorecard |
| Domain registration | ⚠️ Partial | Requires payment method |
| Site setup (WordPress install, config) | ✅ Yes | Via hosting API or SSH |
| Theme installation and design | ✅ Yes | Automated setup with diversification rules |
| Content generation | ✅ Yes | Local LLM for drafts, Silas for review/polish |
| Link placement | ✅ Yes | Following anchor distribution rules |
| Monthly content publishing | ✅ Yes | Scheduled pipeline |
| Monitoring and health checks | ✅ Yes | Automated checks |
| Footprint audit | ✅ Yes | Cross-reference all diversification requirements |
| Decommissioning | ⚠️ Partial | Silas can execute but should flag operator |

---

## 12. CROSS-SPEC INTEGRATION

| Related Spec | Integration Point |
|---|---|
| **SPEC-006 (Semantic Location Silos)** | PBN link targets should align with silo structure. Neighborhood-focused PBN content links to neighborhood spokes. City-focused PBN content links to city hubs. |
| **SPEC-012 (Citations)** | PBN sites that mention the client create unstructured citations. NAP references must match golden NAP. |
| **SPEC-013 (Expired Domains)** | Expired domains scoring 50-69 that are marginal for 301 redirect can be repurposed as PBN sites. |
| **SPEC-010 (Content Formatting)** | PBN content should use basic structured formatting (headings, paragraphs, occasional lists) but should NOT use the same aggressive SERP-capture formatting as client pages — that pattern is a footprint. |

---

*End of SPEC-014 — Local PBN Architecture*
*Total spec lines across 14 documents: ~13,650*
*Off-Site group complete. Next group: Tracking & Reporting.*
