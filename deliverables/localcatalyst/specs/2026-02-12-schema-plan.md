# LocalCatalyst Schema Markup Implementation Plan
**Date:** 2026-02-12  
**Site:** https://darkgreen-moose-683278.hostingersite.com  
**Business Type:** B2B SaaS / Marketing Agency (Local SEO Services)  
**Content Management System:** WordPress (Twenty Twenty-Five theme)  
**Recommended Implementation:** RankMath Pro

---

## EXECUTIVE SUMMARY

LocalCatalyst is a B2B SaaS platform selling AI-powered SEO deliverables to local businesses. The site currently lacks comprehensive schema markup, which creates SEO opportunities across multiple templates and content types.

This plan outlines:
- **5 core schema architectures** for different page types
- **Page-by-page deployment strategy** across 11+ template types
- **Implementation priority** with phased rollout
- **RankMath configuration** for autonomous schema management
- **Validation procedures** to ensure zero warnings in Google's Rich Results Test

**Expected SEO Impact:**
- Improved SERP click-through rates via rich snippets
- Better structured data for Google's AI Overviews
- Enhanced Knowledge Panel eligibility
- Stronger topical authority signals

---

## PART 1: SITE STRUCTURE & CURRENT STATE

### Page Templates Identified

| Template | Current URL(s) | Content Type | Current Schema |
|----------|---|---|---|
| Homepage | `/` | Value prop, service grid, stats | None detected |
| Services Hub | `/services/` | Service directory, pricing table | None detected |
| Service Detail Pages | `/services/[category]/[service]/` | Detailed service guides (2,000-4,000 words) | None detected |
| Blog/Learn | `/blog/`, `/hello-world/` | Educational posts (3,000-8,000 words) | None detected |
| About | `/about/` | Company story, methodology, team | None detected |
| Contact | `/contact/` | Contact form, booking interface | None detected |
| Shop/WooCommerce | `/shop/` | Product listings and checkout | Standard WooCommerce (minimal) |
| FAQ Pages | N/A detected yet | Frequently asked questions | None detected |
| Case Studies | N/A detected yet | Customer success stories | None detected |
| Pricing | `/services/` or separate | Pricing tables | None detected |
| Privacy/Legal | `/privacy-policy/`, `/terms-of-service/` | Legal pages | None detected |

### Current SEO Baseline
- **WordPress Installation:** Twenty Twenty-Five theme
- **Plugins Detected:** WooCommerce (shop functionality)
- **Missing Infrastructure:** 
  - No RankMath Pro installation detected
  - No schema.org markup in page source
  - No breadcrumb navigation schema
  - No organization/business entity schema

---

## PART 2: RECOMMENDED SCHEMA ARCHITECTURE

### 2.1 Site-Wide Schema Foundation

#### Organization Schema (Global)
**Where:** Homepage `<head>` + all pages via global template  
**Purpose:** Establish organizational identity, contact info, and location

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://darkgreen-moose-683278.hostingersite.com/#organization",
  "name": "LocalCatalyst",
  "url": "https://darkgreen-moose-683278.hostingersite.com",
  "logo": "https://darkgreen-moose-683278.hostingersite.com/logo.png",
  "description": "AI-powered SEO deliverables for local businesses. Transparent pricing, autonomous production, results you can measure.",
  "email": "hello@localcatalyst.com",
  "phone": "[PHONE TO BE ADDED]",
  "foundingDate": "2025",
  "sameAs": [
    "https://linkedin.com/company/localcatalyst",
    "https://twitter.com/localcatalyst"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "[STATE TBD]",
    "postalCode": "[ZIP TBD]",
    "streetAddress": "[ADDRESS TBD]"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "hello@localcatalyst.com",
    "telephone": "[PHONE TBD]",
    "areaServed": "US",
    "hoursAvailable": "Mo-Fr 09:00-18:00 CT"
  }
}
```

**RankMath Setup:**
- Settings → General → Organization Type: `Organization`
- Fill Company Name, Logo, and contact details
- Enable Knowledge Graph integration

---

#### WebSite Schema with SearchAction
**Where:** Homepage only  
**Purpose:** Enable sitelinks search box in Google SERPs

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://darkgreen-moose-683278.hostingersite.com/#website",
  "name": "LocalCatalyst",
  "url": "https://darkgreen-moose-683278.hostingersite.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://darkgreen-moose-683278.hostingersite.com/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**RankMath Setup:**
- Settings → Titles & Meta → Enable on Homepage only
- Ensure search functionality is active

---

#### BreadcrumbList Schema
**Where:** All pages except homepage  
**Purpose:** Improve SERP presentation and navigation clarity

**Breadcrumb Hierarchy Examples:**

**Service Detail Page Example:**
```
Home > Services > Content Pages > Blog Writing Services
```

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
      "item": "https://darkgreen-moose-683278.hostingersite.com/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Content Pages",
      "item": "https://darkgreen-moose-683278.hostingersite.com/services/content-pages/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Blog Writing Services",
      "item": "https://darkgreen-moose-683278.hostingersite.com/services/content-pages/blog-writing-services/"
    }
  ]
}
```

**RankMath Setup:**
- Settings → Schema → Breadcrumbs → Enable
- Configure breadcrumb separator (use " / ")
- Set to display on all post types except homepage

---

### 2.2 Service Pages Schema Architecture

#### Service Schema (Primary)
**Where:** `/services/[category]/[service]/` pages  
**Purpose:** Enable Rich Results for services in Knowledge Panel and SERP

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://darkgreen-moose-683278.hostingersite.com/services/content-pages/blog-writing-services/#service",
  "name": "Blog Writing Services",
  "description": "Strategic SEO blog writing that builds topical authority, captures long-tail traffic, and converts readers into customers.",
  "provider": {
    "@type": "Organization",
    "@id": "https://darkgreen-moose-683278.hostingersite.com/#organization"
  },
  "serviceType": "Content Writing",
  "areaServed": "US",
  "image": "https://[image-url]",
  "url": "https://darkgreen-moose-683278.hostingersite.com/services/content-pages/blog-writing-services/",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Blog Writing Options",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Single Blog Post",
        "price": "97",
        "priceCurrency": "USD",
        "description": "2-4 hours delivery time per post"
      },
      {
        "@type": "Offer",
        "name": "Blog Package (25+ posts)",
        "price": "69",
        "priceCurrency": "USD",
        "description": "Discounted rate for bulk orders"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "reviewCount": "[COUNT]"
  }
}
```

**Key Points:**
- Maps to `/services/[category]/[service]/` URLs
- Includes pricing via `hasOfferCatalog`
- References Organization via `@id` relationship
- Includes aggregate ratings if reviews are available
- `serviceType` must be valid schema.org value

---

#### FAQPage Schema (for Service Pages with FAQ Sections)
**Where:** Service pages with FAQ sections (e.g., blog writing services page already has FAQs)  
**Purpose:** Enable Rich Result FAQ snippets

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take for blog content to start ranking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For long-tail keywords with moderate competition, we typically see initial rankings within 4-8 weeks of publication. More competitive keywords may take 3-6 months as your site's topical authority builds."
      }
    },
    {
      "@type": "Question",
      "name": "Do you write content for our specific industry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We write for every industry we serve — HVAC, plumbing, roofing, dental, medical, legal, restaurants, auto repair, pest control, landscaping, salons, gyms, and more."
      }
    },
    {
      "@type": "Question",
      "name": "Can you optimize blog posts we've already published?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Our content audit evaluates every existing post for keyword targeting, search intent alignment, content quality, and internal linking."
      }
    }
  ]
}
```

**RankMath Setup:**
- Settings → Schema → FAQPage
- Auto-detect FAQ sections (H3 + paragraph pattern)
- Or manually add FAQ blocks via RankMath editor

---

### 2.3 Article/Blog Schema

#### Article Schema (for Blog Posts & Educational Content)
**Where:** `/blog/`, blog post pages, `/services/[service]/` detailed guides  
**Purpose:** Enable Article snippets, featured snippets, and AI Overview citations

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://darkgreen-moose-683278.hostingersite.com/services/content-pages/blog-writing-services/#article",
  "headline": "Strategic SEO Blog Writing That Builds Topical Authority",
  "description": "Comprehensive guide to strategic blog writing for local SEO, including content strategy, keyword research, and performance measurement.",
  "image": [
    "https://[primary-image-url]",
    "https://[secondary-image-url]"
  ],
  "datePublished": "2026-02-12",
  "dateModified": "2026-02-12",
  "author": {
    "@type": "Organization",
    "@id": "https://darkgreen-moose-683278.hostingersite.com/#organization"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://darkgreen-moose-683278.hostingersite.com/#organization"
  },
  "mainEntity": {
    "@type": "WebPage",
    "@id": "https://darkgreen-moose-683278.hostingersite.com/services/content-pages/blog-writing-services/"
  }
}
```

**RankMath Setup:**
- Post Type Settings → Post → Enable Article Schema
- Auto-populate `datePublished` and `dateModified` from post metadata
- Set author as Organization for content hub pages

---

### 2.4 HowTo Schema

#### HowTo Schema (for Process-Driven Content)
**Where:** Service pages and guides with step-by-step processes  
**Purpose:** Enable How-To Rich Results and improve AI Overview eligibility

**Example: "Our Blog Writing Process"**

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Our Blog Writing Process",
  "description": "The 5-step process behind every piece of blog content we deliver.",
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Keyword Research and Opportunity Mapping",
      "text": "Before we write anything, we identify exactly what your audience is searching for..."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Content Brief Development",
      "text": "Every blog post starts with a detailed brief — not a vague topic suggestion..."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Expert Content Drafting",
      "text": "Our writers produce content that demonstrates genuine expertise in your industry..."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "SEO Optimization",
      "text": "Before publication, every post is optimized for maximum search visibility..."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Publishing and Monitoring",
      "text": "We don't publish and forget. Every blog post is tracked for keyword ranking progression..."
    }
  ]
}
```

---

### 2.5 Product/Offer Schema (for Shop Pages)

#### Product Schema (WooCommerce Integration)
**Where:** `/shop/` product pages  
**Purpose:** Enable rich product snippets, pricing visibility, and reviews

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Topical Map",
  "description": "Complete content architecture with keywords, search volume, difficulty scores, and priority build order.",
  "image": "https://[product-image]",
  "sku": "TOPICAL-MAP-001",
  "offers": {
    "@type": "Offer",
    "url": "https://darkgreen-moose-683278.hostingersite.com/shop/topical-map/",
    "priceCurrency": "USD",
    "price": "397",
    "availability": "https://schema.org/InStock",
    "shippingDetails": {
      "@type": "ShippingDeliveryTime",
      "shippingLabel": "Delivery",
      "businessDays": "1-2"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "reviewCount": "[COUNT]"
  }
}
```

**Note:** WooCommerce typically generates basic schema automatically. RankMath can enhance it with additional fields.

---

## PART 3: PAGE-BY-PAGE SCHEMA ASSIGNMENTS

### High Priority - Phase 1 (Weeks 1-2)

| Page | URL | Schema Types | Notes |
|------|-----|--------------|-------|
| **Homepage** | `/` | `Organization`, `WebSite`, `SearchAction` | Foundation - all pages reference this Organization schema |
| **Services Hub** | `/services/` | `Organization`, `BreadcrumbList`, `CollectionPage` | Directory of all 6 services |
| **Blog Writing** | `/services/content-pages/blog-writing-services/` | `Service`, `FAQPage`, `BreadcrumbList`, `Article` | Longest/most detailed service page; has 5+ FAQ questions |
| **SEO Audit** | `/services/seo-services/seo-audit/` | `Service`, `FAQPage`, `BreadcrumbList` | Key service with FAQ section |
| **Schema Markup** | `/services/technical-seo/schema-markup/` | `Service`, `FAQPage`, `BreadcrumbList` | (If/when page is created) |
| **Contact** | `/contact/` | `Organization`, `ContactPoint`, `BreadcrumbList` | Establishes contact method schema |

**Phase 1 Rationale:**
- Establishes organizational identity (essential for all other schema to reference)
- Covers 6 highest-traffic, revenue-generating pages
- Enables rich snippets for service pages
- Improves click-through rates on service offerings

---

### Medium Priority - Phase 2 (Weeks 3-4)

| Page | URL | Schema Types | Notes |
|------|-----|--------------|-------|
| **About** | `/about/` | `Organization`, `BreadcrumbList`, `Person` (team members if added) | Company credibility signals |
| **Topical Map Service** | `/services/topical-map/` | `Service`, `FAQPage`, `BreadcrumbList` | Premium service listing |
| **GBP Optimization** | `/services/gbp-optimization/` | `Service`, `FAQPage`, `BreadcrumbList` | Key service offering |
| **Citation Building** | `/services/citations/` | `Service`, `FAQPage`, `BreadcrumbList` | Premium service |
| **Blog Archive** | `/blog/` | `CollectionPage`, `BreadcrumbList`, `ItemList` | Blog hub page |
| **Shop Homepage** | `/shop/` | `CollectionPage`, `ItemList`, (Products) | WooCommerce category page |

**Phase 2 Rationale:**
- Enhances secondary pages that support conversions
- Improves site-wide topical authority signals
- Establishes credibility (About, Person schema for team)
- Optimizes e-commerce visibility

---

### Low Priority - Phase 3 (Weeks 5-6)

| Page | URL | Schema Types | Notes |
|------|-----|--------------|-------|
| **Blog Posts** | `/[post-slug]/` | `Article`, `BreadcrumbList`, `HowTo` (if applicable) | Individual posts |
| **Case Studies** | `/case-studies/` (if exists) | `Article`, `BreadcrumbList`, `SchemaMarkup` (results) | Success stories |
| **Pricing Page** | `/services/` or dedicated | `PriceTable`, `BreadcrumbList` | Already on services page, can be standalone |
| **FAQ Hub** | `/faqs/` (if created) | `FAQPage`, `BreadcrumbList`, `CollectionPage` | Central FAQ resource |
| **Privacy/Legal** | `/privacy-policy/`, `/terms/` | `BreadcrumbList`, `WebPage` | Minimal schema needed |
| **Individual Products** | `/shop/[product]/` | `Product`, `Offer`, `Review` | WooCommerce products |

**Phase 3 Rationale:**
- Covers remaining pages for comprehensive coverage
- Enables featured snippet opportunities in blog content
- Optimizes individual product listings
- Builds topical cluster visibility

---

## PART 4: SCHEMA RELATIONSHIP HIERARCHY

### How Schemas Reference Each Other

```
Organization (Global, Site-Wide)
├── WebSite (Homepage)
│   └── SearchAction (Sitelinks box)
├── ContactPoint (Contact page)
├── Service (Each service page)
│   ├── FAQPage (Service-level FAQs)
│   ├── Article (Extended guides)
│   ├── HowTo (Process pages)
│   └── Offer (Pricing)
├── BreadcrumbList (All pages except homepage)
├── Article (Blog posts, educational content)
│   └── Author → Organization
├── Product (WooCommerce items)
│   └── Offer (Pricing)
└── Person (Team members, if added)
    └── worksFor → Organization
```

### Key Relationships to Maintain

1. **All `Service` schemas reference Organization:**
   - `provider`: points to Organization `@id`

2. **All `Article` schemas reference Organization:**
   - `author`: Organization
   - `publisher`: Organization

3. **All `Product` schemas reference Organization:**
   - Via publisher or provider fields

4. **All non-homepage pages include BreadcrumbList:**
   - Last item's `@id` = page's canonical URL

5. **Contact page strengthens Organization:**
   - Includes full `ContactPoint` with hours, email, phone

---

## PART 5: IMPLEMENTATION VIA RANKMATH PRO

### 5.1 RankMath Setup Checklist

#### Step 1: Installation & Activation
```
Plugin → Add New → Search "RankMath"
Install RankMath SEO Pro
Activate Plugin
Run Setup Wizard
```

#### Step 2: Global Settings
```
RankMath → Settings → General

Business Type: Choose "Agency" or "Service Business"
Company Name: "LocalCatalyst"
Company Logo: Upload logo (512x512 minimum)
Company Tagline: "AI-powered SEO deliverables for local businesses"
Location: [Add HQ location when known]
Phone: [Add when known]
Email: hello@localcatalyst.com
```

#### Step 3: Homepage Configuration
```
RankMath → Settings → Titles & Meta
Homepage Title: "AI-Powered SEO Deliverables for Local Businesses | LocalCatalyst"
Homepage Meta Description: "Order SEO content, audits, and technical optimization. Transparent pricing, 4-6 hour delivery. Built by AI agents for local business owners."

RankMath → Schema
Homepage Schema Type: Organization + WebSite
Enable SearchAction Sitelinks Box
```

#### Step 4: Per-Post Type Configuration

**For Post Type: "Page" (Services, About, Contact, etc.)**
```
RankMath → Post Type Settings → Page

Default Schema Type: BreadcrumbList
Enable: FAQPage (auto-detect H3 + paragraph patterns)
Enable: Article (for content hub pages)
```

**For Post Type: "Post" (Blog articles)**
```
RankMath → Post Type Settings → Post

Default Schema Type: Article
Auto-populate Author: Organization
Auto-populate DatePublished from post creation
Auto-populate DateModified from post update
Enable: FAQPage (if post contains FAQ sections)
```

**For Post Type: "Product" (WooCommerce)**
```
RankMath → Post Type Settings → Product

Default Schema Type: Product
Auto-populate Offer from pricing
Auto-populate from WooCommerce fields
```

#### Step 5: Schema Module Activation
```
RankMath → Settings → Schema

Enable Schema Tab in Editor: ON
Auto-generate Rich Snippets: ON
Remove Yoast/other schema conflicts: ON
```

---

### 5.2 Per-Page RankMath Configuration

#### Example 1: Service Page (`/services/content-pages/blog-writing-services/`)

**In RankMath Schema Tab:**
```
Schema Type: Service

Service Name: Blog Writing Services
Service Description: Strategic SEO blog writing that builds topical authority, captures long-tail traffic, and converts readers into customers.
Provider: Organization (auto-populated)
Area Served: US
Service Type: Content Writing

Pricing/Offers:
├─ Single Blog Post - $97 (2-4 hours)
├─ Bulk Package (25+) - $69 per page

FAQ Section:
├─ How long does blog content take to rank?
├─ Do you write for my industry?
├─ Can you optimize existing posts?
├─ How is this different from hiring a freelancer?
├─ What if blogging hasn't worked for us?
```

**Breadcrumb Configuration:**
```
RankMath will auto-generate:
Home > Services > Content Pages > Blog Writing Services
```

---

#### Example 2: Blog Post

**In RankMath Schema Tab:**
```
Schema Type: Article

Title: Strategic SEO Blog Writing That Drives Local Rankings and Revenue
Description: Comprehensive guide to strategic blog writing...
Author: LocalCatalyst (Organization)
Date Published: [Post creation date]
Date Modified: [Last update date]
Image: [Featured image]

Main Entity:
├─ Article schema
├─ FAQPage (if Q&A section exists)
├─ HowTo (if 5-step process section exists)
```

---

#### Example 3: Contact Page

**In RankMath Schema Tab:**
```
Schema Type: Organization (extends global schema)

Contact Point:
├─ Email: hello@localcatalyst.com
├─ Phone: [To be added]
├─ Area Served: US
├─ Hours: Mo-Fr 09:00-18:00 CT

Address: [To be filled in]
```

---

### 5.3 RankMath Advanced Features

#### Enable Local Business Schema (Optional - if physical location exists)
```
RankMath → Settings → Local SEO

Business Type: Service Business / Agency
Business Name: LocalCatalyst
Business Address: [If applicable]
Business Phone: [If applicable]
Service Area: Entire US
Open/Close Hours: Mon-Fri 9am-6pm CT
Google Business Profile: [Link if exists]
```

#### Enable Knowledge Graph Connection
```
RankMath → Settings → Integrations

Link social profiles:
├─ LinkedIn
├─ Twitter
├─ Facebook

This strengthens Knowledge Panel eligibility
```

#### Enable Content AI (Optional)
```
RankMath → Content AI

- AI-assisted schema completion
- AI-assisted meta description writing
- AI keyword recommendations
```

---

## PART 6: IMPLEMENTATION STEPS & TIMELINE

### Phase 1: Foundation (Week 1)

**Monday:**
- [ ] Install RankMath Pro plugin
- [ ] Run setup wizard
- [ ] Configure global Organization schema (General settings)
- [ ] Set business type, name, logo, contact

**Tuesday:**
- [ ] Configure Homepage schema (Organization + WebSite + SearchAction)
- [ ] Set up BreadcrumbList defaults for all pages
- [ ] Configure Post and Page type defaults in RankMath

**Wednesday:**
- [ ] Create/edit Service page schema for top 3 services:
  - Blog Writing Services
  - SEO Audit
  - Topical Map
- [ ] Add FAQPage schema to each service page
- [ ] Validate in Google Rich Results Test

**Thursday:**
- [ ] Configure remaining 3 service pages:
  - GBP Optimization
  - Citation Building
  - Schema Markup (if page exists)
- [ ] Validate all service pages

**Friday:**
- [ ] Configure Contact page with ContactPoint schema
- [ ] Configure About page with Organization + Person schema
- [ ] Full site validation pass in Rich Results Test
- [ ] Document all configurations

---

### Phase 2: Expansion (Week 2-3)

**Week 2:**
- [ ] Create Blog post schema template
- [ ] Apply Article schema to existing blog posts
- [ ] Create/update FAQ page schema
- [ ] Configure WooCommerce Product schema
- [ ] Validate new schema types

**Week 3:**
- [ ] Create HowTo schema for process-driven pages
- [ ] Update existing service pages with HowTo blocks
- [ ] Add more FAQ questions to service pages
- [ ] Run comprehensive validation across 50+ pages
- [ ] Generate RankMath schema report

---

### Phase 3: Optimization & Monitoring (Week 4+)

**Ongoing:**
- [ ] Monitor Google Search Console for schema errors
- [ ] Track Rich Results impressions and CTR
- [ ] Refine schema based on performance data
- [ ] Update schema when content changes
- [ ] Annual schema audit and modernization

---

## PART 7: VALIDATION & QUALITY ASSURANCE

### Tools for Validation

#### 1. **Google Rich Results Test**
**URL:** https://search.google.com/test/rich-results

**Validation Checklist for Each Page:**
- [ ] Zero errors (not just warnings)
- [ ] Expected rich result type appears
- [ ] All required fields populated
- [ ] Price, availability, rating visible where applicable
- [ ] Images display correctly

**Test Each Schema Type:**
- [ ] Organization (homepage)
- [ ] Service (service pages)
- [ ] FAQPage (FAQ sections)
- [ ] Article (blog posts)
- [ ] Product (WooCommerce)
- [ ] BreadcrumbList (all non-homepage pages)

---

#### 2. **Google Search Console**
**URL:** https://search.google.com/search-console

**Post-Implementation:**
1. Submit sitemap if not already done
2. Check "Enhancements" section:
   - [ ] Rich Results → Review coverage
   - [ ] Structured Data → Check for errors
   - [ ] Breadcrumb → Validate breadcrumbs visible
3. Monitor for 2 weeks post-launch for errors
4. Set up alerts for schema errors

---

#### 3. **Schema.org Markup Validator**
**URL:** https://validator.schema.org

**Before Deployment:**
- Validate JSON-LD markup for correctness
- Check all @id references resolve correctly
- Verify type definitions match schema.org spec

---

#### 4. **RankMath Built-In Validators**
**Location:** RankMath → Dashboard → Site Health

- Schema errors count
- SEO score trends
- Mobile optimization status

---

### Common Schema Issues & Fixes

#### Issue 1: "String value expected" for URL fields
**Fix:** Ensure all URL fields use absolute URLs (including protocol):
```
✗ /services/blog-writing/
✓ https://darkgreen-moose-683278.hostingersite.com/services/blog-writing/
```

#### Issue 2: Missing required fields
**Fix:** Ensure all `required` fields per schema.org spec are populated:
- Service schema requires: name, provider, description
- Article schema requires: headline, image, datePublished
- Product schema requires: name, image, offers

#### Issue 3: Duplicate schema markup
**Fix:** Ensure RankMath is the ONLY source of schema (remove any others):
- Disable Yoast/Ranktracker schema if installed
- Check theme isn't adding duplicate schema
- Remove manual JSON-LD blocks if RankMath handles it

#### Issue 4: @id reference errors
**Fix:** Ensure all `@id` references point to valid resources:
```
"provider": {
  "@id": "https://darkgreen-moose-683278.hostingersite.com/#organization"
}
```
The referenced `@id` must exist in Organization schema on same page.

---

## PART 8: EXPECTED SEO IMPACT

### Short-Term (2-4 weeks)
- [ ] Rich snippets appear in Google SERP for service pages
- [ ] Breadcrumb navigation visible in SERP
- [ ] FAQ rich results visible on service pages with FAQs
- [ ] Click-through rate increase (avg +15-25% with snippets)
- [ ] Google Search Console "Enhancements" show coverage

### Medium-Term (4-8 weeks)
- [ ] Article schema increases visibility in Google News (if applicable)
- [ ] Product schema improves e-commerce visibility
- [ ] Breadcrumbs reduce bounce rate on internal navigation
- [ ] Knowledge Panel starts showing Organization info
- [ ] Featured snippet opportunities increase

### Long-Term (8+ weeks)
- [ ] Topical authority signals strengthen across topic clusters
- [ ] AI Overview citations increase (content appears in AI-generated answers)
- [ ] Organic CTR continues to improve
- [ ] Sitelinks search box may appear on branded searches
- [ ] Schema helps Google better understand site hierarchy

---

## PART 9: PRIORITY ORDER FOR MAXIMUM IMPACT

### **MUST DO FIRST (Week 1):**
1. **Organization Schema** - All other schemas reference this
2. **Service Schema** - Core revenue pages (blog writing, audit, topical map)
3. **FAQPage Schema** - High-value rich snippet opportunity
4. **BreadcrumbList** - Improves UX and SERP presentation

### **SHOULD DO NEXT (Week 2-3):**
5. **Article Schema** - For blog posts and educational content
6. **Contact Schema** - Strengthens conversion funnel
7. **Product Schema** - For WooCommerce optimization
8. **HowTo Schema** - For process-driven content

### **NICE TO HAVE (Week 4+):**
9. **Person Schema** - Team members (if you add team page)
10. **Review/Rating Schema** - Testimonials/case studies
11. **Event Schema** - Webinars/conferences (if applicable)
12. **NewsArticle Schema** - If published to news outlets

---

## PART 10: DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] RankMath Pro installed and activated
- [ ] All settings configured per this plan
- [ ] Global Organization schema created
- [ ] Homepage schema configured
- [ ] Per-page templates set up

### During Deployment
- [ ] Enable schema module in RankMath
- [ ] Apply schemas to highest-priority pages (Phase 1)
- [ ] Test each page in Google Rich Results Test
- [ ] Fix any validation errors
- [ ] Document all configurations

### Post-Deployment (Week 1)
- [ ] Monitor Google Search Console
- [ ] Check for schema errors or warnings
- [ ] Verify rich snippets appear in SERP (Google Search Console → Enhancements)
- [ ] Track ranking changes for targeted keywords
- [ ] Calculate baseline CTR from SERP

### Post-Deployment (Week 2-4)
- [ ] Analyze Rich Results performance
- [ ] Measure CTR improvement vs. baseline
- [ ] Deploy Phase 2 schemas (expansion pages)
- [ ] Continue monitoring for errors
- [ ] Generate initial impact report

### Ongoing
- [ ] Monthly check of schema errors in GSC
- [ ] Quarterly schema refresh/updates
- [ ] Annual comprehensive schema audit
- [ ] Update schema when content significantly changes

---

## PART 11: IMPLEMENTATION NOTES FOR WRENCH/BUILDER

### For Wrench (Code Implementation)
If deploying manually instead of RankMath:

**1. Homepage (`index.php` or home template):**
```php
add_action('wp_head', function() {
    echo '<script type="application/ld+json">';
    echo json_encode([
        "@context" => "https://schema.org",
        "@type" => "Organization",
        "name" => "LocalCatalyst",
        "url" => home_url(),
        "logo" => get_theme_mod('custom_logo_url'),
        "email" => "hello@localcatalyst.com",
        // ... rest of schema
    ]);
    echo '</script>';
});
```

**2. Service Pages (`single-page.php` or custom template):**
```php
// Add Service schema via RankMath or manual JSON-LD
// Include BreadcrumbList for navigation
// Detect FAQ sections and auto-add FAQPage schema
```

**3. Blog Posts (`single-post.php`):**
```php
// Add Article schema from post metadata
// Auto-populate datePublished/dateModified
// Add breadcrumb navigation
```

**Recommendation:** Use RankMath Pro instead of manual implementation. It handles:
- Schema generation and updates
- Dynamic breadcrumb generation
- FAQ auto-detection
- Relationship mapping
- Validation and monitoring

---

### For Builder (Site Architecture)
Ensure the following for optimal schema deployment:

1. **Consistent URL Structure:**
   - Service pages: `/services/[category]/[service]/`
   - Blog posts: `/[post-slug]/` or `/blog/[post-slug]/`
   - Pages: `/[page-slug]/`
   - Products: `/shop/[product-slug]/`

2. **Breadcrumb Markup:**
   - Add WordPress breadcrumb navigation support
   - Ensure structure matches: Home > Parent > Child > Current
   - RankMath can auto-generate from URL structure

3. **Metadata Fields:**
   - Ensure posts have: title, description, featured image, published date, modified date
   - Service pages have: service name, description, price/offer, FAQ questions
   - Products have: name, price, image, availability, shipping info

4. **Theme Compatibility:**
   - Theme should not conflict with schema generation
   - Avoid duplicate schema markup
   - Ensure JSON-LD blocks don't interfere

---

## PART 12: RATIONALE & SEO THEORY

### Why This Schema Architecture?

#### 1. **Organization Foundation**
LocalCatalyst is a B2B service company. A strong Organization schema:
- Establishes entity authority
- Improves Knowledge Panel eligibility
- Helps Google understand company identity across all pages
- Supports "in-depth" articles that cite your company

#### 2. **Service Schema for Revenue Pages**
Service schema is underutilized by most agencies but extremely valuable:
- Enables rich snippets for service comparisons
- Helps Google match search intent (user looking for services)
- Displays pricing directly in SERP
- Differentiates from competitors without schema

#### 3. **FAQPage for Competitive Keywords**
FAQ snippets appear in 8-12% of SERPs. They're high-value because:
- Increase SERP real estate (questions + answers)
- Capture question-based searches ("How much does...?")
- Improve CTR significantly (up to 30% lift)
- Show answer preview in SERP

#### 4. **Article Schema for Authority**
Content hub pages need Article schema because:
- Signals comprehensive content (E-E-A-T)
- Improves AI Overview eligibility (AI Overviews cite full articles)
- Enables featured snippet opportunities
- Helps topical cluster recognition

#### 5. **BreadcrumbList for UX & SERP**
Breadcrumbs have dual value:
- Breadcrumbs appear in SERP (increased CTR)
- Improve internal site navigation (reduced bounce rate)
- Help Google understand site hierarchy
- Reduce crawl depth (crawlers find pages faster)

#### 6. **Product Schema for E-Commerce**
WooCommerce/product pages need rich snippets for:
- Price visibility in SERP
- Availability status
- Review ratings and count
- Stock status

---

## PART 13: MONITORING & MAINTENANCE

### Monthly Monitoring Tasks
```
□ Check Google Search Console → Enhancements
  ├─ Breadcrumbs: [X] pages validated
  ├─ FAQ: [X] pages with rich results
  ├─ Rich Results: [X] impressions
  └─ Click-through rate: [X]%

□ Check RankMath Dashboard
  ├─ Schema errors: [X]
  ├─ Pages with schema: [X]
  ├─ SEO score trend: Up/Down/Stable

□ Spot-check validation
  ├─ Run 5-10 random pages through Rich Results Test
  ├─ Check for new errors
  ├─ Verify snippet appearance in SERP
```

### Quarterly Schema Audit
```
□ Review all schema configurations
□ Check for deprecated schema types
□ Verify all @id references resolve correctly
□ Update schema for changed content
□ Test compatibility with new Google SERP features
```

### Annual Comprehensive Audit
```
□ Evaluate schema performance impact
□ Review Google Rich Results trends
□ Check schema.org spec updates
□ Explore new schema types (NewsArticle, Event, etc.)
□ Modernize schema based on latest best practices
□ Full site re-validation
```

---

## APPENDIX A: RANKMATH PRO CONFIGURATION EXPORT

**Settings to preserve/document:**

```yaml
RankMath Configuration Backup:
  General:
    - Business Type: "Service Business / Agency"
    - Company Name: "LocalCatalyst"
    - Company Logo: [URL]
    - Company Contact: hello@localcatalyst.com
    
  Schema Defaults:
    - Post Type: "post" → Article
    - Post Type: "page" → BreadcrumbList
    - Post Type: "product" → Product
    - Breadcrumb: Enabled
    - FAQPage: Auto-detect enabled
    
  Advanced:
    - Remove other schema: Enabled
    - JSON-LD pretty print: Enabled
    - Auto-update schema dates: Enabled
    
  Knowledge Graph:
    - Social profiles linked
    - Local Business: [Config]
    - Contact Point: Enabled
```

**Backup location:** Save RankMath settings export to project documentation folder.

---

## APPENDIX B: COMMON QUESTIONS

### Q: Should we implement ALL schemas at once?
**A:** No. Follow the 3-phase rollout. Implement Phase 1 first to ensure quality, then expand. Quality > quantity with schema.

### Q: What if we're missing company address/phone?
**A:** Add `"sameAs"` links (LinkedIn, Twitter) to Organization schema without address. Add address/phone when available. Partial schema is better than no schema.

### Q: How do we handle multiple service areas/locations?
**A:** Use `areaServed` with US or specific regions. If you have multiple locations later, create separate Location schema with LocalBusiness type for each.

### Q: Do we need schema for internal links/navigation?
**A:** BreadcrumbList provides the structure. You don't need schema for every link, but strategic internal links from Article → Service pages help authority transfer.

### Q: What about reviews and testimonials?
**A:** Use Review schema for individual testimonials, or AggregateRating if you have a reviews section. Add when testimonials are prominent on page.

### Q: How does schema impact Core Web Vitals?
**A:** Schema markup itself has zero impact on CWV (it's invisible JSON-LD). But schemas that improve CTR can reduce bounce rate, which correlates with better engagement metrics.

### Q: Can we use both RankMath and Yoast schema?
**A:** **No.** Disable one completely. Duplicate schema confuses Google and may cause validation errors. RankMath is recommended for this site.

---

## APPENDIX C: SCHEMA TESTING URLS

**Test these pages in Google Rich Results Test immediately after implementation:**

| URL | Expected Schema | Priority |
|-----|-----------------|----------|
| https://darkgreen-moose-683278.hostingersite.com/ | Organization, WebSite | 1 |
| https://darkgreen-moose-683278.hostingersite.com/services/ | BreadcrumbList, CollectionPage | 1 |
| https://darkgreen-moose-683278.hostingersite.com/services/content-pages/blog-writing-services/ | Service, FAQPage, BreadcrumbList | 1 |
| https://darkgreen-moose-683278.hostingersite.com/services/seo-services/seo-audit/ | Service, FAQPage, BreadcrumbList | 1 |
| https://darkgreen-moose-683278.hostingersite.com/about/ | Organization, BreadcrumbList | 2 |
| https://darkgreen-moose-683278.hostingersite.com/contact/ | ContactPoint, BreadcrumbList | 2 |
| https://darkgreen-moose-683278.hostingersite.com/hello-world/ | Article, BreadcrumbList | 2 |
| https://darkgreen-moose-683278.hostingersite.com/shop/ | CollectionPage, BreadcrumbList | 3 |

---

## FINAL RECOMMENDATIONS

### What to Do Immediately
1. ✅ **Install RankMath Pro** (do not use free version - Pro has better schema features)
2. ✅ **Configure Organization schema** (global, on all pages)
3. ✅ **Deploy Service schema** on all 6 service pages
4. ✅ **Add FAQPage schema** to high-value service pages
5. ✅ **Set up breadcrumbs** across entire site

### What to Avoid
1. ❌ Using outdated schema types (use schema.org 2024+ specs)
2. ❌ Mixing multiple schema plugins (choose one: RankMath or Yoast)
3. ❌ Leaving schema errors unresolved
4. ❌ Assuming schema implementation = instant rankings (it doesn't)
5. ❌ Setting up schema without monitoring it afterward

### What to Measure
1. 📊 Rich Results impressions in Google Search Console
2. 📊 Click-through rate improvement vs. baseline
3. 📊 Schema error count (should be zero)
4. 📊 Ranking changes for target keywords
5. 📊 User engagement metrics (time on page, bounce rate)

---

**Document Version:** 1.0  
**Date:** 2026-02-12  
**Status:** Ready for Implementation  
**Next Review:** 2026-03-12 (after Phase 1 implementation)

---

**For questions about this plan, reference the corresponding section:**
- Need to implement? → **Part 5: Implementation via RankMath Pro**
- Need to validate? → **Part 7: Validation & Quality Assurance**
- Need timeline? → **Part 6: Implementation Steps & Timeline**
- Need deployment help? → **Part 11: Implementation Notes for Wrench/Builder**

