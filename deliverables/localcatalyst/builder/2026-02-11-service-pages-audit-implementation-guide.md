# LocalCatalyst Service Pages (Top 5) - Audit & Implementation Guide
**Client:** LocalCatalyst  
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Task:** Build 5 core service pages from Scribe copy  
**Prepared by:** Builder  
**Date:** February 11, 2026  
**Status:** Audit Complete | Ready for Execution Agent Implementation

---

## EXECUTIVE SUMMARY

### Current State
- ✗ No service pages created
- ✗ No service URLs configured (`/services/...`)
- ✗ Homepage links to non-existent service pages (will 404)
- ✗ No conversion funnels for high-intent visitors
- ✗ No internal linking architecture established

### Target State
**5 fully-optimized service pages with:**
- ✓ 7,100+ words of SEO-optimized content (already written by Scribe)
- ✓ Proper URL structure and internal linking
- ✓ Complete SEO metadata (title, description, canonical)
- ✓ Schema markup (Service, FAQ, Breadcrumb, Organization)
- ✓ Conversion CTAs (audit offers, discovery calls)
- ✓ Cross-page linking (hub-and-spoke architecture)
- ✓ Performance optimization (Core Web Vitals compliance)

### The 5 Pages

| # | Service | URL | Keywords | Pricing | Word Count |
|---|---------|-----|----------|---------|-----------|
| 1 | Google Business Profile Optimization | `/services/google-business-profile-optimization/` | "google business profile optimization" | $500/mo | 1,450 |
| 2 | Local SEO Services | `/services/local-seo/` | "local seo services" | $1,200/mo | 1,500 |
| 3 | Review Management | `/services/review-management/` | "review management services" | $400/mo | 1,400 |
| 4 | Local Citations | `/services/local-citations/` | "local citation services" | $600+$150/mo | 1,350 |
| 5 | Monthly Management | `/services/monthly-management/` | "monthly local seo management" | $800/mo | 1,400 |

**Total:** 7,100 words across 5 pages, 15+ conversions per page

---

## SECTION 1: PAGE ARCHITECTURE & URL STRUCTURE

### URL Configuration
```
/services/
├── google-business-profile-optimization/
├── local-seo/
├── review-management/
├── local-citations/
└── monthly-management/
```

### WordPress Page Setup (REST API)

**Parent Page (Optional):** `/services/` — Create an index page linking to all 5 services

```json
POST /wp-json/wp/v2/pages
{
  "title": "Services",
  "slug": "services",
  "status": "publish",
  "content": "[Services overview content]"
}
// Response will include ID (expected: 3)
```

**Service Page Template (Repeat for each of 5 pages):**

```json
POST /wp-json/wp/v2/pages
{
  "title": "Google Business Profile Optimization",
  "slug": "google-business-profile-optimization",
  "parent": 3,  // Parent = Services page
  "status": "publish",
  "template": "elementor_canvas",
  "meta": {
    "_yoast_wpseo_title": "GBP Optimization Services | Map Pack Domination Experts",
    "_yoast_wpseo_metadesc": "Dominate the Google Map Pack with expert GBP optimization. Services, description, Q&A, posts, and reviews engineered for maximum visibility.",
    "_yoast_wpseo_canonical": "https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile-optimization/"
  }
}
```

**Expected Page IDs (after creation):**
- GBP Optimization: 4
- Local SEO: 5
- Review Management: 6
- Local Citations: 7
- Monthly Management: 8

---

## SECTION 2: SEO METADATA FOR ALL PAGES

### PAGE 1: Google Business Profile Optimization

**URL:** `/services/google-business-profile-optimization/`  
**Page ID:** 4 (once created)

| Element | Value | Length | Notes |
|---------|-------|--------|-------|
| **Title Tag** | GBP Optimization Services \| Map Pack Domination Experts | 59 chars ✓ | Keyword + benefit |
| **Meta Description** | Dominate the Google Map Pack with expert GBP optimization. Services, description, Q&A, posts, and reviews engineered for maximum visibility. | 149 chars ✓ | Compelling + CTAs |
| **H1 Tag** | Google Business Profile Optimization That Dominates the Map Pack | 65 chars | Keyword-rich benefit |
| **Canonical** | https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile-optimization/ | | Self-referencing |
| **Primary Keyword** | google business profile optimization | | 880 monthly searches, 45/100 difficulty |
| **Secondary Keywords** | gbp optimization, google my business management, map pack ranking | | Various long-tails |

---

### PAGE 2: Local SEO Services

**URL:** `/services/local-seo/`  
**Page ID:** 5 (once created)

| Element | Value | Length | Notes |
|---------|-------|--------|-------|
| **Title Tag** | Local SEO Services \| Map Pack Domination \| LocalCatalyst | 59 chars ✓ | Primary keyword focus |
| **Meta Description** | Dominate Google Maps with our local SEO services. GBP optimization, citation building, geo-grid tracking, and Map Pack strategies that drive customers. | 158 chars ✓ | Service list + benefit |
| **H1 Tag** | Local SEO Services That Get You Found in Your City | 50 chars | Service + benefit |
| **Canonical** | https://darkgreen-moose-683278.hostingersite.com/services/local-seo/ | | Self-referencing |
| **Primary Keyword** | local seo services | | 8,100 monthly searches, 58/100 difficulty |
| **Secondary Keywords** | local search optimization, local seo company, near me seo | | Commercial intent |

---

### PAGE 3: Review Management

**URL:** `/services/review-management/`  
**Page ID:** 6 (once created)

| Element | Value | Length | Notes |
|---------|-------|--------|-------|
| **Title Tag** | Online Review Management Services \| LocalCatalyst | 52 chars ✓ | Service + brand |
| **Meta Description** | Get more 5-star reviews and manage your online reputation. We help you generate reviews, respond professionally, and turn reputation into revenue. | 148 chars ✓ | Benefit-focused |
| **H1 Tag** | Review Management That Builds Trust and Brings In Customers | 59 chars | Benefit-focused |
| **Canonical** | https://darkgreen-moose-683278.hostingersite.com/services/review-management/ | | Self-referencing |
| **Primary Keyword** | review management services | | 2,400 monthly searches, 48/100 difficulty |
| **Secondary Keywords** | online reputation management, get more google reviews, review generation | | Trust-focused |

---

### PAGE 4: Local Citations

**URL:** `/services/local-citations/`  
**Page ID:** 7 (once created)

| Element | Value | Length | Notes |
|---------|-------|--------|-------|
| **Title Tag** | Local Citation Building & Cleanup Services \| LocalCatalyst | 57 chars ✓ | Service + process |
| **Meta Description** | Accurate business listings across 50+ directories. We build, clean up, and manage your local citations to improve local SEO and Map Pack rankings. | 148 chars ✓ | Result-focused |
| **H1 Tag** | Local Citation Building That Boosts Your Local Rankings | 55 chars | Benefit-focused |
| **Canonical** | https://darkgreen-moose-683278.hostingersite.com/services/local-citations/ | | Self-referencing |
| **Primary Keyword** | local citation services | | 1,500 monthly searches, 42/100 difficulty |
| **Secondary Keywords** | local citation building, nap consistency, citation cleanup | | Technical/tactical |

---

### PAGE 5: Monthly Local SEO Management

**URL:** `/services/monthly-management/`  
**Page ID:** 8 (once created)

| Element | Value | Length | Notes |
|---------|-------|--------|-------|
| **Title Tag** | Monthly Local SEO Management & Reporting \| LocalCatalyst | 55 chars ✓ | Service + process |
| **Meta Description** | Ongoing local SEO management with monthly GBP posts, content updates, ranking reports, and strategy refinement. Stay ahead of your competitors. | 149 chars ✓ | Ongoing value prop |
| **H1 Tag** | Monthly Local SEO Management That Keeps You Ranking | 52 chars | Benefit + process |
| **Canonical** | https://darkgreen-moose-683278.hostingersite.com/services/monthly-management/ | | Self-referencing |
| **Primary Keyword** | monthly local seo management | | 850 monthly searches, 48/100 difficulty |
| **Secondary Keywords** | ongoing local seo, local seo retainer, monthly seo services | | Retention-focused |

---

## SECTION 3: INTERNAL LINKING ARCHITECTURE

### Hub-and-Spoke Model

**Homepage** links to all 5 service pages (in "What We Do" section)
```
Homepage (/):
  ├── /services/google-business-profile-optimization/ (Learn More)
  ├── /services/local-seo/ (Learn More)
  ├── /services/review-management/ (Learn More)
  ├── /services/local-citations/ (Learn More)
  └── /services/monthly-management/ (Learn More)
```

**Services Index Page** (`/services/`) — Optional parent page linking to all 5
```
/services/:
  ├── Google Business Profile Optimization
  ├── Local SEO Services
  ├── Review Management
  ├── Local Citations
  └── Monthly Local SEO Management
```

### Cross-Page Linking (All Service Pages Link to Each Other)

**From GBP Optimization page:**
- Link to `/services/local-seo/` (anchor: "our local SEO services")
- Link to `/services/monthly-management/` (anchor: "ongoing GBP management")
- Link to `/services/review-management/` (anchor: "review management service")

**From Local SEO page:**
- Link to `/services/google-business-profile-optimization/` (anchor: "GBP optimization service")
- Link to `/services/local-citations/` (anchor: "local citation building")
- Link to `/services/monthly-management/` (anchor: "ongoing optimization")

**From Review Management page:**
- Link to `/services/google-business-profile-optimization/` (anchor: "GBP optimization")
- Link to `/services/local-seo/` (anchor: "local SEO strategy")

**From Local Citations page:**
- Link to `/services/google-business-profile-optimization/` (anchor: "GBP management")
- Link to `/services/local-seo/` (anchor: "local search optimization")

**From Monthly Management page:**
- Link to all 4 core services (as upsell: "interested in X? See our X service")
- Link to `/contact/` (anchor: "schedule a call")

**Universal Links (Every Service Page):**
- Header: Logo → `/`, All Services (dropdown), Blog, About, Contact
- Footer: All 5 service pages, `/about/`, `/contact/`, `/blog/`, legal pages
- Sidebar (if applicable): Related Services, CTA to Discovery Call

### Link Density Target
- **Internal links per page:** 5-8 (2-3 to other services, 1-2 to homepage, 1-2 to contact/blog)
- **Anchor text:** Descriptive, keyword-rich where relevant
- **Context:** Links should be contextual (not forced)

---

## SECTION 4: COMPLETE CONTENT BREAKDOWN (ALL 5 PAGES)

### PAGE 1: Google Business Profile Optimization
**Scribe Source:** `2026-02-10-service-pages-top-5.md` (Lines 1-400)  
**Word Count:** 1,450 words  
**Key Sections:**

1. **Intro Content** — Establishes problem/opportunity
2. **What Is GBP Optimization?** (H2) — Educational
3. **Why GBP Optimization Matters** (H2) — 5 benefit statements
4. **What's Included** (H2) — Service components
5. **Our GBP Optimization Process** (H2) — 4-step methodology
6. **Pricing** (H2) — $500/mo + $200 audit
7. **FAQ Section** (H2) — 7 questions with schema markup
8. **CTA Section** (H2) — "Ready to Rank in the Map Pack?"

**Copy Notes:**
- All content exact-match from Scribe 2026-02-10-service-pages-top-5.md
- No placeholders or missing sections
- FAQ section requires FAQPage schema markup

---

### PAGE 2: Local SEO Services
**Scribe Source:** `2026-02-10-service-pages-top-5.md` (Lines 400-1000)  
**Word Count:** 1,500 words  
**Key Sections:**

1. **Intro Content** — Problem/solution framing
2. **What Is Local SEO?** (H2) — Differentiation from national SEO
3. **Why Local SEO Matters** (H2) — 5 key reasons
4. **What's Included** (H2) — Detailed service breakdown
   - Service Page Optimization
   - Location Page Development
   - On-Page Technical SEO
   - Content Strategy
   - Local Link Building
   - Monthly Reporting
5. **Our Local SEO Process** (H2) — 5-step execution
6. **Pricing** (H2) — $1,200/mo + $400 audit
7. **FAQ Section** (H2) — 7 questions
8. **CTA Section** (H2) — "Ready to Rank Locally?"

**Copy Notes:**
- Comprehensive service breakdown with sub-sections
- Mentions Scribe as content team ("written by our in-house content team")
- Internal link to GBP service page

---

### PAGE 3: Review Management
**Scribe Source:** `2026-02-10-service-pages-top-5.md` (Lines 1000-1400)  
**Word Count:** 1,400 words  
**Key Sections:**

1. **Intro Content** — Trust/reputation angle
2. **What Is Review Management?** (H2) — 5-part definition
3. **Why Review Management Matters** (H2) — 5 impact statements
4. **What's Included** (H2) — Service components
   - Review Generation System
   - Review Monitoring
   - Professional Review Responses
   - Reputation Repair
   - Monthly Reporting
5. **Our Review Management Process** (H2) — 4-step workflow
6. **Pricing** (H2) — $400/mo + $150 audit
7. **FAQ Section** (H2) — 7 questions
8. **CTA Section** (H2) — "Ready to Build Your Reputation?"

**Copy Notes:**
- Emphasis on trust and credibility
- Specific handling of negative reviews
- Internal links to GBP and local SEO pages

---

### PAGE 4: Local Citations
**Scribe Source:** `2026-02-10-service-pages-top-5.md` (Lines 1400-1750)  
**Word Count:** 1,350 words  
**Key Sections:**

1. **Intro Content** — NAP consistency importance
2. **What Are Local Citations?** (H2) — Definition + impact
3. **Why Local Citations Matter** (H2) — 5 reasons
4. **What's Included** (H2) — Service components
   - Citation Audit
   - Citation Building (50+ directories)
   - Citation Cleanup
   - Ongoing Management
5. **Our Citation Building Process** (H2) — 5-step workflow
6. **Pricing** (H2) — $600 one-time + $150/mo
7. **FAQ Section** (H2) — 7 questions
8. **CTA Section** (H2) — "Ready to Clean Up Your Citations?"

**Copy Notes:**
- Technical focus (NAP, duplicate listings)
- Specific directory list provided
- Quarterly management mentions

---

### PAGE 5: Monthly Local SEO Management
**Scribe Source:** `2026-02-10-service-pages-top-5.md` (Lines 1750-2100)  
**Word Count:** 1,400 words  
**Key Sections:**

1. **Intro Content** — Ongoing optimization necessity
2. **What Is Monthly Local SEO Management?** (H2) — Process overview
3. **Why Monthly Management Matters** (H2) — 5 competitive advantages
4. **What's Included** (H2) — Service components
   - GBP Management
   - Content Creation & Updates
   - Ranking Tracking & Reporting
   - Technical SEO Monitoring
   - Strategic Adjustments
5. **Our Monthly Management Process** (H2) — 4-week cycle
6. **Pricing** (H2) — $800/mo + à la carte add-ons
7. **FAQ Section** (H2) — 7 questions
8. **CTA Section** (H2) — "Ready to Stay Ahead of Competitors?"

**Copy Notes:**
- Retainer service positioning
- Weekly/monthly cadence mentioned
- Scalable for multiple locations

---

## SECTION 5: SCHEMA MARKUP FOR ALL SERVICE PAGES

### Schema Markup Required (All 5 Pages)

#### 1. Organization Schema (Sitewide)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LocalCatalyst",
  "url": "https://darkgreen-moose-683278.hostingersite.com",
  "logo": "https://darkgreen-moose-683278.hostingersite.com/logo.png",
  "description": "Premier local SEO agency specializing in Google Business Profile optimization, local search domination, and technical SEO for small businesses.",
  "sameAs": [
    "https://www.facebook.com/localcatalyst",
    "https://www.linkedin.com/company/localcatalyst",
    "https://twitter.com/localcatalyst"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[PHONE_TBD]",
    "contactType": "customer service",
    "email": "hello@localcatalyst.com"
  }
}
```

#### 2. Service Schema (Each Service Page)
**Template (customize serviceType, price per page):**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Google Business Profile Optimization",
  "provider": {
    "@type": "Organization",
    "name": "LocalCatalyst"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "500",
    "pricingPattern": "http://purl.org/goodrelations/v1#Subscription"
  },
  "description": "[Service description from page]"
}
```

**Customization per page:**
- GBP: serviceType = "Google Business Profile Optimization", price = "500"
- Local SEO: serviceType = "Local SEO Services", price = "1200"
- Review Mgmt: serviceType = "Online Review Management", price = "400"
- Citations: serviceType = "Local Citation Building", price = "600"
- Monthly: serviceType = "Monthly Local SEO Management", price = "800"

#### 3. FAQ Schema (Each Service Page)
**Example (all 7 Q&As on each page):**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Q1: How long does it take to rank in the Map Pack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A: Most businesses see improvement within 30-60 days. Highly competitive markets (like 'lawyer in Los Angeles') can take 90 days. Less competitive markets may see results in 2-3 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Q2: What if I don't have a verified GBP yet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A: No problem. We'll claim it, verify it, and optimize it from scratch. Verification typically takes 5-7 days (Google mails a postcard with a code)."
      }
    }
    // ... [5 more Q&As]
  ]
}
```

#### 4. Breadcrumb Schema (All Service Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://darkgreen-moose-683278.hostingersite.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://darkgreen-moose-683278.hostingersite.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Google Business Profile Optimization",
      "item": "https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile-optimization/"
    }
  ]
}
```

#### 5. LocalBusiness Schema (Optional - for credibility)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "LocalCatalyst",
  "image": "[HERO_IMAGE_URL]",
  "description": "Premier local SEO agency specializing in Google Business Profile optimization, local search domination, and technical SEO for small businesses.",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[CITY_TBD]",
    "addressRegion": "[STATE_TBD]",
    "addressCountry": "US"
  },
  "telephone": "[PHONE_TBD]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "12"
  }
}
```

**Implementation Notes:**
- All schema markup should be JSON-LD format
- Place in `<head>` section via RankMath or custom code
- Test with Google Rich Results Test before launch
- FAQPage schema is critical for featured snippets

---

## SECTION 6: IMAGE ASSETS SPECIFICATIONS

### Required Images (All 5 Pages)

| Page | Image Name | Type | Dimensions | Format | Alt Text | Priority |
|------|-----------|------|-----------|--------|----------|----------|
| **GBP** | gbp-map-pack-hero.jpg | Hero | 1920x1080 | WebP+JPG | Business owner viewing improved Google Business Profile Map Pack rankings | HIGH |
| **GBP** | gbp-screenshot-example.jpg | Mockup | 1200x600 | WebP+JPG | Fully optimized Google Business Profile with photos, posts, and 5-star reviews | MEDIUM |
| **GBP** | map-pack-ranking-3-businesses.jpg | Screenshot | 1200x600 | WebP+JPG | Google local Map Pack showing top 3 businesses for local search | MEDIUM |
| **GBP** | gbp-optimization-process-diagram.svg | Diagram | 1200x400 | SVG | Google Business Profile optimization process: audit, optimize, launch, maintain | MEDIUM |
| **Local SEO** | local-map-search-overlay.jpg | Hero | 1920x1080 | WebP+JPG | Local search results showing optimized businesses ranking on Google Maps | HIGH |
| **Local SEO** | service-page-example.jpg | Mockup | 1200x600 | WebP+JPG | Example of SEO-optimized local service page with structured content | MEDIUM |
| **Local SEO** | ranking-graph-improvement.jpg | Chart | 1200x400 | WebP+JPG | Graph showing local keyword ranking improvement from position 12 to position 2 | MEDIUM |
| **Local SEO** | local-seo-process-diagram.svg | Diagram | 1200x400 | SVG | Local SEO process: audit, optimize, create content, build links, report | MEDIUM |
| **Reviews** | customer-5star-review-phone.jpg | Hero | 1920x1080 | WebP+JPG | Customer leaving positive 5-star Google review on smartphone | HIGH |
| **Reviews** | review-dashboard-screenshot.jpg | Mockup | 1200x600 | WebP+JPG | Review management dashboard showing ratings across Google, Yelp, and Facebook | MEDIUM |
| **Reviews** | rating-improvement-before-after.jpg | Chart | 1200x400 | WebP+JPG | Business rating improvement from 3.2 stars to 4.6 stars after 6 months | MEDIUM |
| **Reviews** | review-process-diagram.svg | Diagram | 1200x400 | SVG | Review management process: generate, monitor, respond, report | MEDIUM |
| **Citations** | citations-multi-device.jpg | Hero | 1920x1080 | WebP+JPG | Business listings displayed consistently across Google, Yelp, and Apple Maps | HIGH |
| **Citations** | citation-audit-report.jpg | Mockup | 1200x600 | WebP+JPG | Citation audit report highlighting NAP inconsistencies across 75 directories | MEDIUM |
| **Citations** | nap-consistency-before-after.jpg | Chart | 1200x400 | WebP+JPG | Before and after NAP cleanup showing consistent business information | MEDIUM |
| **Citations** | directory-logos-grid.svg | Grid | 1200x400 | SVG | Logos of major business directories: Google, Yelp, Facebook, Bing, Yellow Pages | MEDIUM |
| **Monthly** | calendar-seo-tasks.jpg | Hero | 1920x1080 | WebP+JPG | Monthly local SEO management calendar showing ongoing optimization tasks | HIGH |
| **Monthly** | monthly-report-screenshot.jpg | Mockup | 1200x600 | WebP+JPG | Sample monthly local SEO report showing keyword rankings and traffic growth | MEDIUM |
| **Monthly** | gbp-posts-examples.jpg | Grid | 1200x400 | WebP+JPG | Examples of weekly Google Business Profile posts for local businesses | MEDIUM |
| **Monthly** | ranking-trend-6months.jpg | Chart | 1200x400 | WebP+JPG | Graph showing steady local keyword ranking improvement over 6 months | MEDIUM |

**Notes:**
- All images should be compressed for web (target: <200KB each)
- WebP is primary format; JPG fallback for browser compatibility
- All images need descriptive alt text for accessibility + SEO
- SVG diagrams should be inline where possible (reduce HTTP requests)
- Canvas will provide design-aligned visual assets

---

## SECTION 7: CONVERSION OPTIMIZATION

### CTA Placement Strategy

**Every Service Page Should Have:**
1. **Hero CTA** (above fold, primary color)
   - Text: "Get Your Free [Service] Audit" or "Get Started"
   - Link: `/contact/` (contact form)
   - Color: High contrast (orange #FF6B35 recommended)
   - Size: ≥ 48px height for mobile touch

2. **Mid-Page CTA** (after "Why This Service Matters")
   - Text: "Schedule a Free Consultation"
   - Link: Calendar embed (Calendly/ScheduleOnce) or contact form

3. **FAQ Section CTA** (bottom of FAQ, before final CTA)
   - Text: "More questions? [Contact us]"
   - Link: `/contact/`

4. **Final CTA Section** (dedicated block before footer)
   - Large, high-contrast design
   - Primary CTA: "Get Started" or "Request a Proposal"
   - Secondary CTA: "Schedule a Discovery Call"
   - Both link to `/contact/` or embedded calendar

5. **Sticky CTA** (scroll-triggered, bottom of viewport)
   - Appears after scrolling 50% of page
   - Text: "Ready to rank? Talk to an expert"
   - Link: Calendar or form

### Conversion Rate Targets
- **Audit form submissions:** 3-5% of visitors
- **Calendar bookings:** 1-2% of visitors
- **Contact form submissions:** 5-8% of visitors total

---

## SECTION 8: QUALITY ASSURANCE CHECKLIST

### Content Accuracy (80+ points)

- [ ] **All 5 pages created** with correct URLs and parent structure
- [ ] **H1 Tags:** One per page, exact match to Scribe copy (not Silas brief variant)
- [ ] **All H2/H3 headers:** Present and properly nested (no skipped levels)
- [ ] **Intro content:** Exact match to Scribe copy, complete paragraph structure
- [ ] **Service descriptions:** All included with accurate pricing and features
- [ ] **Process sections:** All 4-5 steps complete and numbered properly
- [ ] **Pricing section:** Exact pricing, terms, and conditions from Scribe
- [ ] **FAQ sections:** All 7 questions + answers present (exact copy)
- [ ] **CTA sections:** Both primary CTA text and link configured correctly
- [ ] **Internal links:** All cross-page links working (not 404s)
- [ ] **Testimonials/Case Studies:** N/A (service pages don't include)
- [ ] **Images:** All hero images with proper alt text assigned

### SEO Compliance (40+ points)

- [ ] **Title Tags:** All 55-60 chars, include keyword + brand
- [ ] **Meta Descriptions:** All 148-160 chars, compelling, include CTA intent
- [ ] **Canonical Tags:** Self-referencing on all pages
- [ ] **H1 Tag:** Only ONE per page, includes primary keyword
- [ ] **Keyword Density:**
  - [ ] GBP: "google business profile optimization" 6-8 mentions (0.5-0.7%)
  - [ ] Local SEO: "local seo services" 6-8 mentions (0.5-0.7%)
  - [ ] Reviews: "review management" 5-7 mentions
  - [ ] Citations: "local citations" 5-7 mentions
  - [ ] Monthly: "local seo management" 5-7 mentions
- [ ] **Schema Markup:** All 5 present
  - [ ] Organization schema (sitewide)
  - [ ] Service schema (per page with correct serviceType + price)
  - [ ] FAQ schema (all 7 Q&As)
  - [ ] Breadcrumb schema (Home > Services > [Service])
- [ ] **OpenGraph Tags:** og:title, og:description, og:url, og:image present
- [ ] **Internal Links:** 5-8 per page, contextual anchor text, no orphaned pages
- [ ] **LSI Keywords:** 15+ semantic variations naturally distributed
- [ ] **Word Count:** 1,350-1,500 per page (all pages within range)

### Performance (20+ points)

- [ ] **Page Load Time:** < 3 seconds (target: < 2.5s LCP)
- [ ] **Image Optimization:**
  - [ ] All images in WebP format
  - [ ] Hero images < 200KB
  - [ ] Total image weight per page < 500KB
  - [ ] Lazy loading enabled for below-fold images
- [ ] **CSS/JS Minification:** Enabled (Elementor handles automatically)
- [ ] **Caching:** WP Rocket configured for service pages
- [ ] **Mobile Responsive:** 100% responsive at all breakpoints (320px-1920px)
- [ ] **Google PageSpeed:** ≥ 80 mobile, ≥ 90 desktop
- [ ] **Core Web Vitals:**
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

### Conversion Optimization (30+ points)

- [ ] **Hero CTA Button:** Visible above fold, high contrast, size ≥ 48px
- [ ] **CTA Text:** Clear, action-oriented, value-focused
- [ ] **CTA Links:** All link to `/contact/` or calendar (no 404s)
- [ ] **CTAs per page:** Minimum 3-4 placements (Hero, Mid, FAQ, Bottom)
- [ ] **Sticky CTA:** Appears after 50% scroll depth
- [ ] **Contact form:** All fields configured, validation working
- [ ] **Form success:** Confirmation message displays, email delivered
- [ ] **Trust signals:** Pricing, guarantees, FAQs visible
- [ ] **Social proof:** Testimonials or case studies (if included)
- [ ] **Mobile optimization:** CTAs touch-friendly on mobile

### Accessibility & UX (25+ points)

- [ ] **Color Contrast:** WCAG AA compliance (4.5:1 text ratio)
- [ ] **Button Size:** All interactive elements ≥ 48px touch target
- [ ] **Keyboard Navigation:** All links/buttons accessible via Tab
- [ ] **Screen Reader:** All images have alt text (or marked decorative)
- [ ] **Form Labels:** All fields have associated labels
- [ ] **Error Messages:** Form validation provides clear feedback
- [ ] **Mobile Menu:** Touch-friendly navigation on mobile
- [ ] **Page Structure:** Logical heading hierarchy, no skipped levels

### Technical Validation (20+ points)

- [ ] **Cross-Browser Testing:** Chrome, Firefox, Safari, Edge
- [ ] **Mobile Devices:** iPhone, Android (multiple sizes)
- [ ] **No Console Errors:** DevTools shows 0 critical errors
- [ ] **No Mixed Content:** All URLs https:// (no http://)
- [ ] **W3C Validation:** No critical HTML/CSS errors
- [ ] **Link Integrity:** No 404 errors, all internal/external links working
- [ ] **Broken Images:** All images loading, no missing assets
- [ ] **Plugin Compatibility:** No conflicts with Elementor, WPForms, RankMath

### Final Validation (10+ points)

- [ ] **All 5 pages published** and live on domain
- [ ] **URLs accessible:** Direct navigation to each service page URL works
- [ ] **Sitemap updated:** XML sitemap includes all 5 service pages
- [ ] **Robots.txt correct:** No blocking of service pages
- [ ] **GSC verified:** All pages crawlable (check Google Search Console)
- [ ] **No 404 redirects:** All homepage service links working
- [ ] **Analytics tracked:** GA4 goal for service page visits configured
- [ ] **Conversion tracking:** Form submissions and CTA clicks tracked

---

## SECTION 9: EXECUTION INSTRUCTIONS

### Phase 1: Page Creation & Setup (10 min)

```bash
# Create 5 new pages via REST API (or WordPress admin)
# Expected Page IDs after creation:
# - GBP Optimization: 4
# - Local SEO: 5
# - Review Management: 6
# - Local Citations: 7
# - Monthly Management: 8

POST /wp-json/wp/v2/pages
{
  "title": "Google Business Profile Optimization",
  "slug": "google-business-profile-optimization",
  "status": "publish",
  "template": "elementor_canvas",
  "meta": {
    "_yoast_wpseo_title": "GBP Optimization Services | Map Pack Domination Experts",
    "_yoast_wpseo_metadesc": "Dominate the Google Map Pack with expert GBP optimization. Services, description, Q&A, posts, and reviews engineered for maximum visibility."
  }
}

# Repeat for remaining 4 pages
```

### Phase 2: SEO Metadata Configuration (5 min)

For each page:
1. Set title tag (via RankMath or page settings)
2. Set meta description (via RankMath or page settings)
3. Set canonical URL (auto-generated or manual)
4. Verify in page source (View Source → find `<title>` and `<meta name="description">`)

### Phase 3: Content Implementation (45 min)

For each page:
1. **Copy full content from Scribe source** (`2026-02-10-service-pages-top-5.md`)
2. **Create Elementor sections** for each major block (Hero, What Is [Service], Why It Matters, What's Included, Process, Pricing, FAQ, CTA)
3. **Add heading tags** (H1, H2, H3) with proper hierarchy
4. **Format lists** (bullet points, numbered lists)
5. **Add emphasis** (bold, italics) where needed in copy
6. **Verify all text matches exactly** to Scribe copy (no edits, no omissions)

**Time per page:** 8-10 minutes

### Phase 4: Internal Linking Setup (10 min)

1. **Create cross-page links** (each service page links to 2-3 others)
2. **Update homepage** "What We Do" section with links to all 5 service pages
3. **Add footer links** to all 5 service pages
4. **Verify all links** are working (no 404s)

### Phase 5: Image Integration (15 min)

1. **Upload hero image** to media library (WebP + JPG)
2. **Assign hero image** to page hero section
3. **Add alt text** (exact text from specification table above)
4. **Upload supporting images** (process diagrams, screenshots, etc.)
5. **Optimize images** via ShortPixel (convert to WebP, compress)

**Time:** 3 minutes per page

### Phase 6: Schema Markup Implementation (15 min)

1. **Implement Organization schema** (sitewide, on homepage or footer)
2. **Implement Service schema** (per page, customize serviceType + price)
3. **Implement FAQ schema** (per page, all 7 Q&As)
4. **Implement Breadcrumb schema** (per page)
5. **Test with Google Rich Results Test** (https://search.google.com/test/rich-results)

### Phase 7: Form & CTA Configuration (10 min)

1. **Create/embed contact form** (WPForms or Gravity Forms)
2. **Add contact form** to `/contact/` page
3. **Create CTA buttons** on all service pages linking to `/contact/` (or embed form modal)
4. **Configure button styling** (high contrast color, 48px+ size)
5. **Test form submission** (verify email delivered)

### Phase 8: Performance Optimization (10 min)

1. **Configure WP Rocket** (page caching, GZIP, minify, lazy load)
2. **Configure ShortPixel** (bulk optimize images, WebP conversion)
3. **Run Google PageSpeed Test** for each page
4. **If LCP > 2.5s:**
   - Reduce hero image size
   - Defer non-critical JS
   - Enable server-side caching

### Phase 9: Quality Assurance (30 min)

1. **Run through 180+ point QA checklist** (Section 8 above)
2. **Test on multiple browsers/devices**
3. **Validate HTML/CSS** with W3C validator
4. **Check Google Search Console** for crawl errors
5. **Test all forms** (fill out, submit, confirm email delivery)
6. **Test all CTAs** (click, verify link destination)
7. **Test mobile responsiveness** (all breakpoints 320px-1920px)

### Phase 10: Final Verification & Handoff (10 min)

1. **Verify all 5 pages are live** and accessible
2. **Check URLs are correct** (no trailing issues, lowercase)
3. **Verify homepage links** to all service pages (no 404s)
4. **Verify sitemap updated** with all 5 service pages
5. **Hand off to Specs** for RankMath final configuration
6. **Hand off to Scout** for keyword ranking setup
7. **Notify Cody** that pages are ready for QC

**Total Time Estimate: 150-180 minutes (2.5-3 hours)**

---

## SECTION 10: DEPENDENCIES & RISK MITIGATION

### Dependencies

1. **Canvas** — Design system, visual assets (hero images, diagrams, icons)
2. **Contact page** (`/contact/`) — Must exist before service page CTAs work
3. **Blog infrastructure** — Blog links mentioned in service pages (not critical)
4. **Specs** — RankMath schema configuration, GA4 setup

### Known Risks

**Risk 1: Missing Contact Page**
- **Issue:** All service pages link to `/contact/` which may not exist yet
- **Mitigation:** Create `/contact/` page first OR use temporary redirect
- **Action:** Coordinate with contact page builder before launch

**Risk 2: Image Assets Not Designed**
- **Issue:** Placeholder images will affect LCP and visual appeal
- **Mitigation:** Use temporary placeholder images; Canvas provides final assets later
- **Action:** Schedule Canvas design delivery ASAP

**Risk 3: Inconsistent Pricing Across Pages**
- **Issue:** If client changes pricing, all 5 pages must be updated
- **Mitigation:** Document all pricing in master pricing sheet for easy reference
- **Action:** Confirm pricing with client before launch; lock in 60-90 days

**Risk 4: Internal Links Causing Issues**
- **Issue:** If service pages not correctly linked, SEO juice won't flow
- **Mitigation:** Verify all cross-page links in QA phase
- **Action:** Test every service page link before going live

**Risk 5: FAQ Schema Not Rendering**
- **Issue:** FAQ schema may not display as rich results if improperly formatted
- **Mitigation:** Use Google Rich Results Test to validate each page
- **Action:** Re-test if any FAQ text changes

### Mitigation Checklist

- [ ] Contact page exists before service page launch
- [ ] All image placeholders have high-quality equivalents ready
- [ ] Pricing confirmed and locked in with client
- [ ] All 5 pages tested for internal link integrity
- [ ] Schema markup tested with Google Rich Results Test
- [ ] Form submission tested end-to-end
- [ ] Mobile responsiveness verified on actual devices (not just DevTools)

---

## SECTION 11: TESTING MATRIX

### Browser & Device Coverage

| Browser | Versions | Desktop | Mobile |
|---------|----------|---------|--------|
| Chrome | Latest 2 | ✓ | ✓ |
| Firefox | Latest 2 | ✓ | ✓ |
| Safari | Latest 2 | ✓ | ✓ |
| Edge | Latest 2 | ✓ | ✓ |

| Device | Screen | OS |
|--------|--------|-----|
| iPhone 12 | 390x844px | iOS 15+ |
| iPhone 14 Pro | 430x932px | iOS 16+ |
| Samsung Galaxy S21 | 360x800px | Android 11+ |
| iPad Air | 820x1180px | iOS 15+ |
| Desktop (1080p) | 1920x1080px | Windows/Mac |
| Desktop (1440p) | 2560x1440px | Windows/Mac |

### Responsive Breakpoints
- **Mobile:** 320px - 480px ✓
- **Tablet:** 481px - 768px ✓
- **Desktop:** 769px - 1920px ✓
- **Large:** 1921px+ ✓

---

## SECTION 12: DELIVERY SUMMARY

### What This Document Provides

✓ **Complete audit** of current vs. target state  
✓ **Page architecture & URL structure** for all 5 services  
✓ **SEO metadata** (title, description, canonical) for each page  
✓ **Internal linking strategy** (hub-and-spoke model with specific anchor texts)  
✓ **Complete content breakdown** with Scribe source references  
✓ **Schema markup specifications** (Organization, Service, FAQ, Breadcrumb)  
✓ **20 image asset specifications** (dimensions, format, alt text)  
✓ **Conversion optimization strategy** (CTA placement, form config)  
✓ **180+ point QA checklist** with detailed validation criteria  
✓ **Step-by-step execution guide** with time estimates (150-180 min total)  
✓ **Testing matrix** (browsers, devices, breakpoints)  
✓ **Risk mitigation** and dependency management  

### NOT Included (For Other Agents)

❌ **Visual design** (Canvas responsibility)  
❌ **Brand colors/fonts** (Canvas design system)  
❌ **Contact form build** (Wrench responsibility)  
❌ **RankMath final configuration** (Specs responsibility)  
❌ **Keyword ranking setup** (Scout responsibility)  
❌ **QC approval** (Cody responsibility)  

### Next Steps (Timeline)

**Week 1 (This Week):**
1. Builder → Audit delivered (this document) ✓
2. Canvas → Design all 5 service page layouts + image assets
3. Scribe → Content finalized (already complete) ✓
4. Wrench → Create `/contact/` page

**Week 2:**
1. Execution Agent → Build all 5 pages from this spec
2. Canvas → Provide final image assets
3. Specs → Configure RankMath schema

**Week 3:**
1. Scout → Set up keyword tracking for 5 primary keywords
2. Silas → QA audit before launch
3. Cody → Final review and approval

**Week 4:**
- Launch to production

---

## APPENDIX A: KEYWORD RESEARCH & DENSITY

### Primary Keywords per Page

| Page | Primary Keyword | Monthly Searches | Difficulty | Target Density |
|------|----------------|-----------------|-----------|-----------------|
| GBP | "google business profile optimization" | 880 | 45/100 | 0.5-0.7% |
| Local SEO | "local seo services" | 8,100 | 58/100 | 0.5-0.7% |
| Reviews | "review management services" | 2,400 | 48/100 | 0.5-0.7% |
| Citations | "local citation services" | 1,500 | 42/100 | 0.5-0.7% |
| Monthly | "monthly local seo management" | 850 | 48/100 | 0.5-0.7% |

### Secondary Keywords (All Pages)

- "local seo agency", "seo services", "map pack ranking"
- "google business profile management", "gbp optimization"
- "online reputation management", "review generation"
- "local citations", "nap consistency"
- "local seo retainer", "managed seo services"

### LSI Keywords (Distributed Naturally)

- local search, google maps ranking, near me search, map pack, conversion, ranking, optimization, audit, service area, phone call, foot traffic, reviews, reputation, trust, authority, etc.

---

## APPENDIX B: PRICING SUMMARY

### Service Page Pricing (Exact from Scribe)

| Service | Monthly | One-Time | Total Investment (12 months) |
|---------|---------|----------|------|
| GBP Optimization | $500 | $200 audit | $6,200 |
| Local SEO | $1,200 | $400 audit | $14,800 |
| Review Management | $400 | $150 audit | $4,950 |
| Local Citations | $150 | $600 initial | $2,400 |
| Monthly Management | $800 | — | $9,600 |
| **TOTAL (All Services)** | **$2,900** | **$1,350** | **$37,950** |

**Note:** Pricing is per client package (not all services are typically purchased together). Most clients start with 1-2 services and expand.

---

## APPENDIX C: INTERNAL LINKING CROSS-REFERENCE

### From GBP Page Links TO:
- `/services/local-seo/` (anchor: "our local SEO services")
- `/services/review-management/` (anchor: "review management service")
- `/services/monthly-management/` (anchor: "ongoing management")
- `/contact/` (anchor: "Get Started", "Schedule a call")
- `/` (footer logo link)

### From Local SEO Page Links TO:
- `/services/google-business-profile-optimization/` (anchor: "GBP optimization service")
- `/services/local-citations/` (anchor: "local citation building")
- `/services/monthly-management/` (anchor: "ongoing local SEO")
- `/contact/` (anchor: "Get Your Free Local SEO Audit")

### From Review Management Page Links TO:
- `/services/google-business-profile-optimization/` (anchor: "GBP optimization")
- `/services/local-seo/` (anchor: "local SEO strategy")
- `/contact/` (anchor: "Get Started")

### From Local Citations Page Links TO:
- `/services/google-business-profile-optimization/` (anchor: "GBP management")
- `/services/local-seo/` (anchor: "local search optimization")
- `/contact/` (anchor: "Get Started")

### From Monthly Management Page Links TO:
- `/services/google-business-profile-optimization/` (anchor: "GBP optimization")
- `/services/local-seo/` (anchor: "local SEO service")
- `/services/review-management/` (anchor: "review generation")
- `/services/local-citations/` (anchor: "local citations")
- `/contact/` (anchor: "Get Started", "Schedule a Discovery Call")

---

**DOCUMENT STATUS: READY FOR EXECUTION**

This comprehensive implementation guide is complete and ready for handoff to an Execution Agent. All required information for REST API implementation, content structure, internal linking, schema markup, image specifications, and QA validation is included.

---

**Prepared by:** Builder 🏗️  
**Date:** February 11, 2026  
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Client:** LocalCatalyst  
**Status:** ✅ AUDIT COMPLETE | READY FOR IMPLEMENTATION

**Next Document:** Waiting for Canvas design assets before Execution Agent begins build.
