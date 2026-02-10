# SPEC-008: Schema & Structured Data
## Silas Engine — Route 2: Website Optimization Pipeline
### Version 1.0 | Website Optimization Group

---

## 1. PURPOSE

This specification defines Silas's methodology for implementing comprehensive schema markup — the machine-readable layer that tells search engines and AI systems exactly what the client's content means, how the business relates to its GBP listing, and how entities connect across the web. For local businesses, schema is non-negotiable: it's how Google connects the website to the GBP, validates the entity, feeds data to AI systems, and enables rich results.

**Core principle:** "Schema is the API between your website and Google's knowledge graph. Every fact about the business should be expressed in both human-readable and machine-readable form."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-001: GBP Services | hasOfferCatalog schema must match GBP service entries |
| SPEC-002: GBP Description | sameAs array connects website to GBP and all platforms |
| SPEC-003: GBP Q&A | FAQPage schema on website mirrors Q&A entries |
| SPEC-006: Semantic Location Silo | Every silo page gets appropriate schema |
| SPEC-007: Grounding Box | Grounding boxes wrap content in schema |
| SPEC-010: On-Page Content | Schema validates claims made in visible content |
| SPEC-011: Citation Building & NAP | NAP in schema must exactly match GBP and all citations |
| SPEC-017: LLM SEO / StealthRank | Schema feeds AI systems' entity understanding |

---

## 3. THE CRITICAL RULE

**Every fact in schema must EXACTLY match the GBP listing.** Name, address, phone, hours — any mismatch creates an entity confidence penalty. This is the single most impactful schema rule for local SEO.

```
GBP Business Name: "ABC Plumbing & Drain Services"
Website Schema Name: "ABC Plumbing & Drain Services"  ← Must be identical

NOT:
Website Schema Name: "ABC Plumbing"  ← Mismatch → penalty
Website Schema Name: "A.B.C. Plumbing & Drain Services"  ← Mismatch → penalty
```

This extends to:
- Street address (exact format)
- Phone number (exact format including country code)
- Business hours (exact match)
- Business category/type
- Website URL

---

## 4. REQUIRED SCHEMA STACK

### 4.1 LocalBusiness (Homepage — Required)

This is the foundation schema that every local business website must have on the homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "{website_url}#business",
  "name": "{Exact GBP business name}",
  "image": "{Logo URL}",
  "telephone": "{Exact GBP phone with country code}",
  "email": "{Business email}",
  "url": "{Website URL}",
  "description": "{Business description matching GBP}",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{Exact GBP street address}",
    "addressLocality": "{City}",
    "addressRegion": "{State abbreviation}",
    "postalCode": "{ZIP}",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{lat}",
    "longitude": "{lng}"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "areaServed": [
    { "@type": "City", "name": "{City 1}" },
    { "@type": "City", "name": "{City 2}" },
    { "@type": "City", "name": "{City 3}" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "{Service Name 1}",
          "description": "{Service description}"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "{Service Name 2}",
          "description": "{Service description}"
        }
      }
    ]
  },
  "sameAs": [
    "{Google Business Profile URL}",
    "{Facebook URL}",
    "{Instagram URL}",
    "{YouTube URL}",
    "{Yelp URL}",
    "{LinkedIn URL}",
    "{Apple Maps URL}",
    "{BBB URL}",
    "{Twitter/X URL}",
    "{TikTok URL}"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{rating}",
    "reviewCount": "{count}",
    "bestRating": "5"
  }
}
```

### 4.2 Business Type Specificity

Use the most specific `@type` available instead of generic `LocalBusiness`:

| Business Type | Schema @type |
|--------------|-------------|
| Restaurant/Bar | `Restaurant` or `BarOrPub` |
| Plumber | `Plumber` |
| Electrician | `Electrician` |
| Hair Salon | `HairSalon` or `BeautySalon` |
| Dentist | `Dentist` |
| Lawyer | `LegalService` or `Attorney` |
| Auto Repair | `AutoRepair` |
| Real Estate Agent | `RealEstateAgent` |
| General Contractor | `GeneralContractor` or `HomeAndConstructionBusiness` |
| Medical Practice | `Physician` or `MedicalClinic` |
| Veterinary | `VeterinaryCare` |
| Fitness | `HealthClub` or `ExerciseGym` |

### 4.3 Additional Schema Types

**FAQPage (on every page with FAQ section):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{Question text}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{Answer text}"
      }
    }
  ]
}
```

**BreadcrumbList (on every page):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "{homepage_url}" },
    { "@type": "ListItem", "position": 2, "name": "{City}", "item": "{city_url}" },
    { "@type": "ListItem", "position": 3, "name": "{Page Title}", "item": "{current_url}" }
  ]
}
```

**Service (on service pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{Service Name}",
  "description": "{Service description}",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "{website_url}#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "{City}"
  },
  "offers": {
    "@type": "Offer",
    "priceRange": "{Price range}",
    "priceCurrency": "USD"
  }
}
```

**VideoObject (on pages with embedded YouTube):**
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "{Video title}",
  "description": "{Video description}",
  "thumbnailUrl": "{Thumbnail URL}",
  "uploadDate": "{ISO date}",
  "contentUrl": "{YouTube URL}",
  "embedUrl": "{YouTube embed URL}"
}
```

**Review (on testimonial pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "{Reviewer name}"
  },
  "reviewBody": "{Review text}",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "@id": "{website_url}#business"
  }
}
```

---

## 5. THE sameAs ARRAY

### 5.1 Why sameAs Matters

The `sameAs` property tells Google's knowledge graph: "This website entity is the SAME entity as these profiles." This creates entity consolidation — all trust, reviews, mentions, and authority from every platform roll up into one unified entity profile.

### 5.2 Required sameAs Entries

| Platform | Priority | URL Format |
|----------|----------|------------|
| Google Business Profile | Critical | `https://www.google.com/maps/place/?q=place_id:{PLACE_ID}` |
| Facebook | High | `https://www.facebook.com/{page_name}` |
| Instagram | High | `https://www.instagram.com/{handle}` |
| YouTube | High | `https://www.youtube.com/channel/{channel_id}` |
| Yelp | High | `https://www.yelp.com/biz/{business_slug}` |
| LinkedIn | Medium | `https://www.linkedin.com/company/{company_slug}` |
| BBB | Medium | `https://www.bbb.org/...` |
| Apple Maps | Medium | Apple Maps connect link |
| Twitter/X | Low | `https://twitter.com/{handle}` |
| TikTok | Low | `https://www.tiktok.com/@{handle}` |

### 5.3 Finding the GBP URL

The GBP profile URL should use the CID format for reliability:
```
https://www.google.com/maps?cid={CID_NUMBER}
```
The CID can be found via Google Maps URL or through the GBP API.

---

## 6. MULTI-LOCATION SCHEMA

### 6.1 Architecture

For multi-location businesses, each location needs its own complete LocalBusiness schema on its location page. The parent organization wraps them:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{Brand Name}",
  "url": "{Main website}",
  "subOrganization": [
    {
      "@type": "Restaurant",
      "name": "{Brand Name} — Sugar Land",
      "address": { /* Sugar Land address */ },
      "telephone": "{Sugar Land phone}",
      /* ... complete LocalBusiness for this location ... */
    },
    {
      "@type": "Restaurant",
      "name": "{Brand Name} — Riverstone",
      "address": { /* Riverstone address */ },
      "telephone": "{Riverstone phone}",
      /* ... complete LocalBusiness for this location ... */
    }
  ]
}
```

### 6.2 Critical Multi-Location Rule

Each location page MUST have the correct address and phone for THAT location. The most common and most damaging schema error for multi-location businesses is using the same address/phone on all location pages. Silas flags this as a P0 critical issue.

---

## 7. SCHEMA AUDIT PROCESS

### 7.1 Automated Checks

```
Silas Autonomous Action:
1. CRAWL all pages of client website
2. EXTRACT all JSON-LD and Microdata schema
3. VALIDATE each schema block against schema.org specifications
4. CROSS-CHECK schema NAP against GBP listing:
   ☐ Business name matches exactly
   ☐ Address matches exactly
   ☐ Phone matches exactly
   ☐ Hours match exactly
   ☐ Business type is correct
5. CHECK sameAs array:
   ☐ All platform URLs are valid and accessible
   ☐ No dead links in sameAs
   ☐ Major platforms included (GBP, Facebook, Yelp minimum)
6. CHECK for missing schema:
   ☐ Homepage has LocalBusiness
   ☐ Service pages have Service schema
   ☐ FAQ sections have FAQPage schema
   ☐ All pages have BreadcrumbList
7. GENERATE audit report with issues + fixes
```

### 7.2 Validation Tools

| Tool | Purpose |
|------|---------|
| Google Rich Results Test | Tests if schema generates rich results |
| Schema.org Validator | Validates structural correctness |
| Google Search Console | Shows schema errors at scale |
| Structured Data Testing Tool | Detailed field-level validation |

---

## 8. SCORING RUBRIC

| Score | Criteria |
|-------|----------|
| **0** | No schema markup on the website. |
| **1** | Auto-generated schema by CMS plugin, incomplete or incorrect. |
| **2** | Basic LocalBusiness with name and address only. |
| **3** | LocalBusiness with NAP but missing hours, areaServed, services. |
| **4** | LocalBusiness complete but no sameAs, no additional schema types. |
| **5** | LocalBusiness + some Service schema, sameAs array started. |
| **6** | Complete LocalBusiness + Service + FAQ schema, sameAs with 3+ platforms. |
| **7** | Full suite: LocalBusiness + Service + FAQ + BreadcrumbList + sameAs (5+ platforms). |
| **8** | Score 7 + areaServed, hasOfferCatalog, aggregateRating, VideoObject where applicable. |
| **9** | Complete schema stack across all pages, validates cleanly, sameAs complete. |
| **10** | Score 9 + multi-location schema correct, zero validation errors, monthly NAP sync verification, schema driving rich results in SERPs. |

---

## 9. AUTOMATION PIPELINE

```
TRIGGER: New client onboarded OR schema audit cycle (quarterly)

1. CRAWL website and extract all existing schema
2. PULL GBP listing data for NAP comparison
3. AUDIT for mismatches and missing schema (Section 7)
4. SCORE current state (Section 8)
5. GENERATE complete schema package:
   a. LocalBusiness JSON-LD for homepage
   b. Service schema for each service page
   c. FAQPage schema for pages with FAQ sections
   d. BreadcrumbList for all pages
   e. sameAs array with all verified platform URLs
   f. Additional types as applicable (VideoObject, Review, etc.)
6. FORMAT as ready-to-implement code blocks per page
7. DELIVER to operator for CMS implementation

ESCALATION POINTS:
- NAP mismatch detected between website schema and GBP → P0 critical, fix immediately
- Multi-location schema using same address for all locations → P0 critical
- sameAs URLs are broken or outdated → flag for operator to verify platform profiles
- CMS plugin conflict with custom schema → provide implementation method guidance
```

---

*This spec is part of the Silas Engine, Route 2: Website Optimization Pipeline.*
*For extended structured data formatting details, see silas-spec-10-structured-content-formatting.md.*
