# LocalCatalyst - Complete SEO-Optimized Site Architecture

**Agency:** LocalCatalyst  
**Domain:** TBD (staging: https://darkgreen-moose-683278.hostingersite.com)  
**Prepared by:** Silas (CATALYST SEO Agent)  
**Date:** February 9, 2026

---

## EXECUTIVE SUMMARY

This document defines the complete website architecture for LocalCatalyst, a local SEO agency specializing in helping local businesses dominate their market. The architecture is designed to:

1. **Rank for high-intent SEO agency keywords** in target geo markets
2. **Establish topical authority** across local SEO, technical SEO, on-page optimization, and GBP optimization
3. **Convert agency prospects** through strategic content funnels
4. **Demonstrate expertise** through supporting content and case studies
5. **Support scalable content expansion** via blog and resource library

---

## SITE ARCHITECTURE OVERVIEW

### Tier 1: Homepage
```
/ (Homepage)
└── Authority hub positioning LocalCatalyst as the premier local SEO agency
```

### Tier 2: Core Service Pages (Primary Conversion Pages)
```
/services/local-seo/
/services/technical-seo/
/services/on-page-optimization/
/services/google-business-profile-optimization/
```

### Tier 3: Supporting Content Pages (Authority Building)
```
/seo-agency/ (Service category hub)
/local-seo-agency/ (Geo-modified service hub)
/seo-consultant/ (Alternative search intent)
/case-studies/ (Social proof hub)
/about/ (Trust signals)
/contact/ (Conversion point)
```

### Tier 4: Blog & Resources
```
/blog/ (Blog index)
/blog/category/local-seo/
/blog/category/technical-seo/
/blog/category/google-business-profile/
/blog/category/on-page-seo/
/resources/ (Downloadable assets, templates, guides)
```

### Tier 5: Legal & Utility
```
/privacy-policy/
/terms-of-service/
/sitemap/
```

---

## COMPLETE URL STRUCTURE MAP

### Primary Pages

| Page Type | URL | Target Keywords | Purpose |
|-----------|-----|----------------|---------|
| **Homepage** | `/` | "local seo agency", "seo services", brand | Authority hub, primary conversion |
| **Local SEO Service** | `/services/local-seo/` | "local seo services", "local search optimization" | Service detail + conversion |
| **Technical SEO Service** | `/services/technical-seo/` | "technical seo services", "technical seo audit" | Service detail + conversion |
| **On-Page Service** | `/services/on-page-optimization/` | "on-page seo services", "on-page optimization" | Service detail + conversion |
| **GBP Service** | `/services/google-business-profile-optimization/` | "google business profile optimization", "gbp management" | Service detail + conversion |
| **SEO Agency Hub** | `/seo-agency/` | "seo agency", "search engine optimization agency" | Supporting authority page |
| **Local SEO Agency Hub** | `/local-seo-agency/` | "local seo agency [city]", geo-intent | Geo-targeted authority page |
| **SEO Consultant** | `/seo-consultant/` | "seo consultant", "seo expert" | Personal brand/alternative intent |
| **Case Studies** | `/case-studies/` | "seo case studies", social proof | Trust building |
| **About** | `/about/` | Brand, trust signals | Company info, team, methodology |
| **Contact** | `/contact/` | "contact seo agency", conversion | Lead capture |
| **Blog Index** | `/blog/` | Long-tail, informational | Content hub |
| **Resources** | `/resources/` | "seo templates", "seo checklist" | Lead magnets |

### Blog Structure (Expandable)

```
/blog/
  ├── /category/local-seo/
  │     ├── /how-to-optimize-google-business-profile/
  │     ├── /local-seo-ranking-factors-2026/
  │     ├── /citation-building-guide/
  │     └── /local-link-building-strategies/
  │
  ├── /category/technical-seo/
  │     ├── /core-web-vitals-optimization/
  │     ├── /schema-markup-guide/
  │     ├── /crawl-budget-optimization/
  │     └── /javascript-seo-best-practices/
  │
  ├── /category/google-business-profile/
  │     ├── /gbp-optimization-checklist/
  │     ├── /google-reviews-generation-strategy/
  │     ├── /gbp-posts-templates/
  │     └── /map-pack-ranking-guide/
  │
  └── /category/on-page-seo/
        ├── /title-tag-optimization/
        ├── /content-optimization-framework/
        ├── /internal-linking-strategy/
        └── /keyword-research-process/
```

---

## PAGE HIERARCHY & INTERNAL LINKING MODEL

### Hub-and-Spoke Architecture

```
                    HOMEPAGE (/)
                        |
        ┌───────────────┼───────────────┐
        |               |               |
   SERVICE HUB    CONTENT HUB      CONVERSION HUB
        |               |               |
    [Services]      [Blog/Guides]   [Case Studies]
        |               |               |
   ┌────┴────┐     ┌────┴────┐         |
   |    |    |     |    |    |         |
  L-SEO T-SEO OP  Cat1 Cat2 Cat3   [Contact]
   |         |      |
 [Blog]   [Blog] [Posts]
```

### Internal Linking Rules

1. **Homepage Links:**
   - All 4 service pages (primary nav)
   - Case studies (featured section)
   - Latest 3 blog posts
   - About & Contact (header/footer)

2. **Service Page Links:**
   - Bi-directional links between related services (contextual)
   - Link to relevant blog category
   - Link to case studies demonstrating that service
   - Link to contact page (CTA)

3. **Blog Post Links:**
   - Link to parent category
   - Link to relevant service page (1-2 contextual links)
   - Link to related blog posts (2-3 minimum)
   - Link to resources/downloads when applicable

4. **Supporting Pages:**
   - SEO Agency hub → all service pages + case studies
   - Local SEO Agency hub → Local SEO service + geo-blog posts
   - SEO Consultant → About page + services

5. **Universal Links (Every Page):**
   - Header: Logo → Home, Services (dropdown), Blog, About, Contact
   - Footer: All service pages, key blog categories, legal pages

---

## SCHEMA MARKUP STRATEGY

### Organization Schema (All Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LocalCatalyst",
  "url": "https://localcatalyst.com",
  "logo": "https://localcatalyst.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/localcatalyst",
    "https://www.linkedin.com/company/localcatalyst",
    "https://twitter.com/localcatalyst"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service",
    "areaServed": "US"
  }
}
```

### LocalBusiness Schema (Homepage + About)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "LocalCatalyst",
  "image": "https://localcatalyst.com/images/office.jpg",
  "description": "Premier local SEO agency specializing in Google Business Profile optimization, local search domination, and technical SEO for local businesses.",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": XX.XXXX,
    "longitude": -XX.XXXX
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "XX"
  }
}
```

### Service Schema (Each Service Page)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Local SEO Services",
  "provider": {
    "@type": "Organization",
    "name": "LocalCatalyst"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Local SEO Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Business Profile Optimization"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Local Citation Building"
        }
      }
    ]
  }
}
```

### FAQ Schema (Service Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is local SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer optimized for featured snippet]"
      }
    }
  ]
}
```

### Article Schema (Blog Posts)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post Title]",
  "image": "[Featured Image URL]",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "LocalCatalyst",
    "logo": {
      "@type": "ImageObject",
      "url": "https://localcatalyst.com/logo.png"
    }
  },
  "datePublished": "[ISO Date]",
  "dateModified": "[ISO Date]"
}
```

### Breadcrumb Schema (All Pages Except Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://localcatalyst.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://localcatalyst.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Local SEO",
      "item": "https://localcatalyst.com/services/local-seo"
    }
  ]
}
```

---

## CONTENT FUNNEL STRATEGY

### Awareness Stage (Blog Posts)
**Target:** Informational queries, early-stage research  
**Content Types:** How-to guides, ranking factors, best practices  
**CTA:** Subscribe to newsletter, download resource

### Consideration Stage (Supporting Pages)
**Target:** "SEO agency", "local seo services" (category-level)  
**Content Types:** SEO Agency hub, Local SEO Agency hub, methodology pages  
**CTA:** View services, schedule consultation

### Decision Stage (Service Pages)
**Target:** "local seo services [city]", "hire seo agency"  
**Content Types:** Service detail pages with pricing, process, deliverables  
**CTA:** Book discovery call, request proposal

### Conversion Stage (Contact/Case Studies)
**Target:** High-intent, ready to buy  
**Content Types:** Case studies with ROI data, testimonials  
**CTA:** Contact form, calendar booking

---

## KEYWORD TARGETING MATRIX

| Page | Primary Keyword | Secondary Keywords | Monthly Volume | Difficulty |
|------|----------------|-------------------|----------------|------------|
| Homepage | local seo agency | seo agency, search engine optimization services | 12,000 | 65 |
| Local SEO Service | local seo services | local search optimization, local seo company | 8,500 | 62 |
| Technical SEO Service | technical seo services | technical seo audit, technical seo consultant | 3,200 | 58 |
| On-Page Service | on-page seo services | on-page optimization, on-page seo audit | 2,400 | 55 |
| GBP Service | google business profile optimization | gbp optimization, google my business management | 1,900 | 52 |
| SEO Agency Hub | seo agency | best seo agency, top seo agencies | 18,000 | 70 |
| Local SEO Agency Hub | local seo agency [city] | local seo company near me | Varies | 60-65 |
| SEO Consultant | seo consultant | freelance seo consultant, seo expert | 6,500 | 60 |

---

## TECHNICAL SEO REQUIREMENTS

### URL Structure Rules
- **Lowercase only:** `/services/local-seo/` ✅ NOT `/Services/Local-SEO/` ❌
- **Hyphens for word separation:** `/on-page-optimization/` ✅
- **No trailing parameters** (use clean URLs)
- **Consistent trailing slash** (recommend WITH trailing slash)

### Sitemap Configuration
- XML sitemap at `/sitemap.xml`
- Separate sitemaps for pages, posts, images
- Submit to Google Search Console
- Update frequency: Posts (weekly), Pages (monthly)

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/

Sitemap: https://localcatalyst.com/sitemap.xml
```

### Page Speed Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Mobile-friendly:** 100% responsive
- **Image optimization:** WebP format, lazy loading

### Canonical Tags
- All pages must have self-referencing canonical
- Service pages: canonical to primary service URL
- Blog posts: canonical to post permalink

---

## CONVERSION OPTIMIZATION

### Primary CTAs by Page Type

**Homepage:**
- Hero CTA: "Get Your Free SEO Audit"
- Secondary CTA: "View Our Services"
- Tertiary CTA: "See Case Studies"

**Service Pages:**
- Primary CTA: "Schedule a Strategy Call"
- Secondary CTA: "Download Service Guide"
- Sticky CTA: "Request a Proposal" (scroll-triggered)

**Blog Posts:**
- Top CTA: "Subscribe for SEO Tips"
- Inline CTA: Link to relevant service
- Bottom CTA: "Need Help? Talk to an Expert"

**Case Studies:**
- CTA: "Get Similar Results for Your Business"

### Lead Capture Strategy
- Homepage: Free SEO audit offer (email capture)
- Service pages: Calendar booking embed (Calendly/ScheduleOnce)
- Blog sidebar: Email newsletter signup
- Resources page: Gated downloadable templates/checklists
- Exit-intent popup: "Wait! Get Our Local SEO Checklist"

---

## CONTENT PRODUCTION ROADMAP

### Phase 1: Core Pages (Week 1-2)
- Homepage
- 4 Service pages
- About page
- Contact page

### Phase 2: Supporting Pages (Week 3)
- SEO Agency hub
- Local SEO Agency hub
- SEO Consultant page
- Case Studies index

### Phase 3: Blog Foundation (Week 4)
- Blog setup with category structure
- First 8 blog posts (2 per service category)

### Phase 4: Resources & Expansion (Ongoing)
- Resources page with downloadable assets
- Additional blog posts (2-4/month)
- Case study expansion (1/month)

---

## COMPETITIVE POSITIONING

### Unique Value Propositions to Emphasize
1. **CATALYST Methodology** (proprietary framework for local SEO)
2. **Data-Driven Approach** (SoLV, WVS, geo-grid tracking)
3. **GBP Specialization** (deep expertise in Map Pack domination)
4. **Technical SEO + Local SEO Integration** (not just citations and reviews)
5. **AI Optimization Ready** (LLM visibility, AI Overview optimization)

### Differentiation from Competitors
- Most local SEO agencies focus only on citations/reviews
- LocalCatalyst offers **technical SEO depth** typically only seen in enterprise agencies
- **Proprietary tracking and reporting** (not just generic dashboards)
- **Transparent methodology** (educate clients on the "why" behind every tactic)

---

## NEXT STEPS

1. ✅ Review and approve this architecture
2. ⏭️ Proceed to individual content briefs for each page
3. ⏭️ Implement technical SEO foundation (schema, sitemaps, robots.txt)
4. ⏭️ Begin content production per roadmap
5. ⏭️ Set up conversion tracking and analytics

---

**Prepared by:** Silas (CATALYST SEO Agent)  
**Date:** February 9, 2026  
**Status:** Ready for Implementation
