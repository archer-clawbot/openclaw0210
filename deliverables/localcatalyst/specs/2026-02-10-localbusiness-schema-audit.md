# LocalCatalyst: LocalBusiness Schema Implementation Audit
**Date:** February 10, 2026  
**Client:** LocalCatalyst  
**Domain:** https://darkgreen-moose-683278.hostingersite.com  
**Agent:** Specs  
**Status:** Audit & Recommendations (Ready for Implementation)

---

## Executive Summary

The LocalCatalyst website currently has **zero structured data markup**. This audit provides a complete specification for implementing LocalBusiness schema (JSON-LD) on the homepage and Service schema on service pages, enabling Google to better understand and display the business in search results and Knowledge Panels.

**Impact:** Proper LocalBusiness schema can improve local search visibility, enable Rich Results in Google Search, and support Knowledge Panel eligibility.

---

## Current State Analysis

### Site Overview
- **URL:** https://darkgreen-moose-683278.hostingersite.com
- **Platform:** WordPress (Twenty Twenty-Five theme)
- **Current Status:** Fresh install with placeholder content
- **Schema Present:** ❌ None (0/10 coverage)

### Audit Findings

| Item | Current State | Finding |
|------|---------------|---------|
| **LocalBusiness Schema** | Missing | ❌ CRITICAL |
| **Service Schema** | Missing | ❌ CRITICAL |
| **JSON-LD Markup** | 0 blocks | ❌ CRITICAL |
| **Breadcrumb Schema** | Missing | ⚠️ Recommended |
| **Organization Schema** | Missing | ⚠️ Recommended |
| **FAQ Schema** | N/A | Not yet evaluated |

### Key Issues
1. **No structured data** — Google cannot automatically understand business details
2. **No rich snippets** — Business info won't appear in enhanced search results
3. **Missing NAP validation** — Address, phone, hours not machine-readable
4. **No local intent signals** — Missed opportunity for local search ranking
5. **Service visibility gap** — Individual service pages lack schema context

---

## Recommendations: LocalBusiness Schema

### 1. Homepage Implementation

**Location:** Homepage (`/` or homepage template)  
**Type:** LocalBusiness (JSON-LD)  
**Priority:** CRITICAL

#### Required Fields

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[BUSINESS_NAME]",
  "description": "[BUSINESS_DESCRIPTION]",
  "url": "https://darkgreen-moose-683278.hostingersite.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[STREET_ADDRESS]",
    "addressLocality": "[CITY]",
    "addressRegion": "[STATE]",
    "postalCode": "[ZIP_CODE]",
    "addressCountry": "US"
  },
  "telephone": "[PHONE_NUMBER]",
  "email": "[EMAIL_ADDRESS]",
  "image": "https://darkgreen-moose-683278.hostingersite.com/[LOGO_PATH]",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [LATITUDE],
    "longitude": [LONGITUDE]
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "HH:MM",
      "closes": "HH:MM"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Tuesday",
      "opens": "HH:MM",
      "closes": "HH:MM"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "HH:MM",
      "closes": "HH:MM"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "HH:MM",
      "closes": "HH:MM"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "HH:MM",
      "closes": "HH:MM"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "HH:MM",
      "closes": "HH:MM"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "CLOSED"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "[SERVICE_AREA_CITY_1]"
  },
  "priceRange": "[PRICE_RANGE]",
  "sameAs": [
    "https://www.facebook.com/[FACEBOOK_PAGE]",
    "https://www.instagram.com/[INSTAGRAM_HANDLE]",
    "https://www.google.com/maps/place/[GOOGLE_MAPS_URL]"
  ]
}
```

#### Implementation Notes

| Field | Required | Source | Validation |
|-------|----------|--------|-----------|
| `name` | YES | Business registration | Must match GBP listing exactly |
| `address` | YES | Physical address | Use precise street address |
| `telephone` | YES | Contact info | Must be clickable (format: +1XXXXXXXXXX) |
| `email` | OPTIONAL | Contact form | Use primary business email |
| `image` | YES | Logo/header | Must be 1200x630px minimum, HTTPS |
| `geo` | YES | Google Maps | Latitude/Longitude (8 decimals min.) |
| `openingHoursSpecification` | YES | Business hours | 24-hour format (HH:MM) |
| `areaServed` | YES | Service locations | Include all cities served |
| `priceRange` | OPTIONAL | Pricing info | Use schema values: $ \| $$ \| $$$ \| $$$$ |
| `sameAs` | OPTIONAL | Social links | Use verified business profiles |

#### Before/After Comparison

**BEFORE:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>darkgreen-moose-683278.hostingersite.com</title>
  <!-- No schema markup -->
</head>
<body>
  <!-- Content here -->
</body>
</html>
```

**AFTER:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>darkgreen-moose-683278.hostingersite.com</title>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "[Business Name]",
    "description": "Providing [services] in the [City] area",
    "url": "https://darkgreen-moose-683278.hostingersite.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[Street Address]",
      "addressLocality": "[City]",
      "addressRegion": "[State]",
      "postalCode": "[ZIP]",
      "addressCountry": "US"
    },
    "telephone": "[Phone]",
    "email": "[Email]",
    "image": "https://darkgreen-moose-683278.hostingersite.com/logo.png",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.8781,
      "longitude": -87.6298
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Monday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "[City Name]"
    },
    "priceRange": "$$",
    "sameAs": ["https://www.facebook.com/business"]
  }
  </script>
</head>
<body>
  <!-- Content here -->
</body>
</html>
```

---

## Recommendations: Service Schema

### 2. Service Pages Implementation

**Location:** Individual service pages (`/services/service-name/` or custom)  
**Type:** Service (with BreadcrumbList)  
**Priority:** HIGH

#### Service Schema Structure

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[SERVICE_NAME]",
  "description": "[SERVICE_DESCRIPTION]",
  "provider": {
    "@type": "LocalBusiness",
    "name": "[BUSINESS_NAME]",
    "url": "https://darkgreen-moose-683278.hostingersite.com",
    "telephone": "[PHONE]",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[STREET]",
      "addressLocality": "[CITY]",
      "addressRegion": "[STATE]",
      "postalCode": "[ZIP]",
      "addressCountry": "US"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "[SERVICE_AREA]"
  },
  "serviceType": "[SERVICE_TYPE]",
  "image": "https://darkgreen-moose-683278.hostingersite.com/[SERVICE_IMAGE]",
  "url": "https://darkgreen-moose-683278.hostingersite.com/services/[service-slug]/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "ratingCount": "[COUNT]"
  }
}
```

#### BreadcrumbList for Service Pages

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
      "name": "[Service Name]",
      "item": "https://darkgreen-moose-683278.hostingersite.com/services/[service-slug]/"
    }
  ]
}
```

#### Example Service Pages (to be created)

**Service 1 Example:**
- **Page:** `/services/service-1/`
- **Title:** `Service 1 - LocalCatalyst`
- **H1:** `Professional Service 1 Services`
- **Service Name (Schema):** `Service 1`
- **Area Served (Schema):** `[Primary City]`

**Service 2 Example:**
- **Page:** `/services/service-2/`
- **Title:** `Service 2 - LocalCatalyst`
- **H1:** `Expert Service 2 Solutions`
- **Service Name (Schema):** `Service 2`
- **Area Served (Schema):** `[Primary City]`

---

## Data Collection Checklist

**Before implementation, gather the following:**

- [ ] **Business Name** — Legal business name
- [ ] **Business Type** — LocalBusiness, ProfessionalService, etc.
- [ ] **Street Address** — Complete physical address
- [ ] **City, State, ZIP** — Full location details
- [ ] **Phone Number** — Primary business phone
- [ ] **Email** — Business email address
- [ ] **Website** — Domain (already have)
- [ ] **Business Hours** — Days & times for each day (e.g., Mon-Fri 9am-5pm)
- [ ] **Service Area** — Cities/regions served
- [ ] **Services Offered** — List of 3-5 main services with descriptions
- [ ] **Latitude/Longitude** — GPS coordinates (from Google Maps or geocoding)
- [ ] **Logo/Image** — High-quality logo (1200x630px minimum)
- [ ] **Business Rating** — Google reviews rating & count (if available)
- [ ] **Social Media** — Facebook, Instagram, LinkedIn URLs
- [ ] **Price Range** — $ / $$ / $$$ / $$$$
- [ ] **Service Descriptions** — 100-200 word descriptions per service

---

## Validation & Testing

### 1. Google Rich Results Test
**URL:** https://search.google.com/test/rich-results

**Steps:**
1. Paste homepage URL
2. Verify LocalBusiness schema passes
3. Check for warnings/errors
4. Expected result: ✅ Valid LocalBusiness Rich Result

**Service Page Testing:**
1. Paste each service page URL
2. Verify Service schema passes
3. Verify BreadcrumbList appears
4. Expected result: ✅ Valid Service Rich Result

### 2. Structured Data Testing Tool
**URL:** https://www.google.com/webmasters/markup-helper/

**Verify:**
- All required fields present
- No "Missing required property" warnings
- All values properly formatted
- Phone number is valid format
- Latitude/longitude within valid range

### 3. Schema.org Validation
**URL:** https://validator.schema.org/

**Check:**
- LocalBusiness type validation
- Service type validation
- No type errors or warnings
- All properties have correct range values

### 4. Screaming Frog SEO Spider
**Configuration:**
- Enable JSON-LD analysis
- Crawl site
- Extract all `<script type="application/ld+json">` tags
- Verify presence on homepage and service pages

---

## Implementation Approach

### Option A: RankMath Plugin (Recommended)
**Pros:** 
- Built-in schema builder UI
- One-click LocalBusiness setup
- Easy service schema per page
- Built-in validation

**Steps:**
1. Install & activate RankMath Pro
2. Go to RankMath → Schema → Add Schema
3. Select LocalBusiness type
4. Fill in business details
5. Apply to homepage
6. Create Service schema for each service page
7. Validate in Rich Results Test

**Estimated Time:** 30-45 minutes

### Option B: Manual JSON-LD (Advanced)
**Pros:**
- Full control over schema
- No plugin dependencies
- Lighter code footprint

**Steps:**
1. Add JSON-LD block to `header.php` or child theme
2. Create PHP function to output LocalBusiness schema
3. Add Service schema to individual service page templates
4. Validate manually in Rich Results Test

**Estimated Time:** 60-90 minutes

### Option C: Page-level in Yoast SEO / All in One SEO
**Pros:**
- Per-page schema customization
- Integrated with existing SEO plugins

**Steps:**
1. Install & configure (if not already done)
2. Add LocalBusiness schema via plugin UI
3. Configure Service schema for each service
4. Validate results

**Estimated Time:** 45-60 minutes

**RECOMMENDATION:** Option A (RankMath) — best balance of UX, power, and documentation.

---

## File Structure for Implementation

### WordPress Implementation (RankMath)

**Locations to modify:**
1. **Site-wide Settings**
   - RankMath → General Settings → Title & Meta Separators
   - RankMath → Local SEO → Business Details
   - RankMath → Schema → General Configuration

2. **Homepage Template**
   - `functions.php` or child theme (add LocalBusiness schema)
   - Or: Use RankMath's "Default Schema" for homepage

3. **Service Pages**
   - Create new pages: `/services/service-1/`, `/services/service-2/`, etc.
   - Add Service schema via RankMath for each

4. **Sitemap Configuration**
   - Ensure `sitemap.xml` includes service pages
   - Set priority: homepage (1.0), service pages (0.8), blog (0.6)

---

## Specific Changes Required

### Change 1: Add LocalBusiness Schema to Homepage

**Page ID/Template:** Homepage (static or blog archive)  
**Current:** No schema  
**New:** LocalBusiness JSON-LD block

**Exact Implementation:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[BUSINESS_NAME_FROM_INTAKE]",
  "description": "[BUSINESS_TAGLINE]",
  "url": "https://darkgreen-moose-683278.hostingersite.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[FROM_INTAKE]",
    "addressLocality": "[FROM_INTAKE]",
    "addressRegion": "[FROM_INTAKE]",
    "postalCode": "[FROM_INTAKE]",
    "addressCountry": "US"
  },
  "telephone": "[FROM_INTAKE]",
  "email": "[FROM_INTAKE]",
  "image": "https://darkgreen-moose-683278.hostingersite.com/[logo-path]",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [FROM_GOOGLE_MAPS],
    "longitude": [FROM_GOOGLE_MAPS]
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "[FROM_INTAKE]",
      "closes": "[FROM_INTAKE]"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "[FROM_INTAKE]",
      "closes": "[FROM_INTAKE]"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "CLOSED"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "[FROM_INTAKE]"
  },
  "priceRange": "[FROM_INTAKE]",
  "sameAs": [
    "[FROM_INTAKE]",
    "[FROM_INTAKE]"
  ]
}
</script>
```

**Where to place:**  
- In `<head>` section of homepage template
- Or use RankMath Schema builder → LocalBusiness type
- Recommended: Inside `<header>` before closing `</header>` tag

---

### Change 2: Create Service Pages with Schema

**Number of Changes:** 3-5 service pages (TBD during intake)

**Per Service Page:**

1. **Create page:** `/services/[service-slug]/`
2. **Add Service Schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[SERVICE_NAME]",
  "description": "[SERVICE_DESCRIPTION]",
  "provider": {
    "@type": "LocalBusiness",
    "name": "[BUSINESS_NAME]",
    "url": "https://darkgreen-moose-683278.hostingersite.com",
    "telephone": "[PHONE]",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[STREET]",
      "addressLocality": "[CITY]",
      "addressRegion": "[STATE]",
      "postalCode": "[ZIP]",
      "addressCountry": "US"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "[CITY]"
  },
  "serviceType": "[SERVICE_TYPE]",
  "image": "https://darkgreen-moose-683278.hostingersite.com/[image-path]",
  "url": "https://darkgreen-moose-683278.hostingersite.com/services/[slug]/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "ratingCount": "[COUNT]"
  }
}
</script>
```

3. **Add BreadcrumbList Schema:**
```html
<script type="application/ld+json">
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
      "name": "[SERVICE_NAME]",
      "item": "https://darkgreen-moose-683278.hostingersite.com/services/[slug]/"
    }
  ]
}
</script>
```

---

## Quality Assurance Checklist

After implementation, verify:

- [ ] **LocalBusiness schema on homepage:**
  - [ ] Passes Google Rich Results Test with ✅
  - [ ] No warnings in Rich Results Test
  - [ ] Business name matches registration documents
  - [ ] Address matches GBP listing exactly
  - [ ] Phone number is formatted correctly
  - [ ] Hours are in 24-hour format (HH:MM)
  - [ ] Coordinates are within 100m of actual location

- [ ] **Service schema on each service page:**
  - [ ] Passes Google Rich Results Test
  - [ ] Provider references are consistent
  - [ ] BreadcrumbList appears correctly
  - [ ] Service name matches page H1
  - [ ] Area served matches business service area

- [ ] **Overall validation:**
  - [ ] Zero errors in any validation tool
  - [ ] All external links are HTTPS
  - [ ] Logo image loads correctly
  - [ ] Social media links are verified
  - [ ] Price range is valid schema value
  - [ ] No data duplication in schema

---

## Performance Impact

**Expected changes:**
- **Code size:** +2-3KB per page (minimal)
- **Page load time:** No measurable impact
- **Render time:** < 1ms added
- **SEO benefit:** 15-25% potential CTR improvement (if Google Rich Results appear)

---

## Next Steps

### Phase 1: Data Intake
**Owner:** Client/Project Manager  
**Time:** 1-2 hours  
**Deliverable:** Completed intake form with all required business data

### Phase 2: Implementation
**Owner:** Execution Agent (Wrench/Builder)  
**Time:** 2-3 hours  
**Approach:** Use RankMath schema builder  
**Deliverable:** Live schema on all pages

### Phase 3: Validation
**Owner:** QA/Silas  
**Time:** 30-45 minutes  
**Deliverable:** Validation report confirming no errors

### Phase 4: Monitoring
**Owner:** Lookout  
**Time:** Ongoing  
**Deliverable:** Rich Results appearance tracking in GSC

---

## Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| **LocalBusiness schema validation** | 100% pass rate | Week 1 |
| **Service schema on all pages** | 100% coverage | Week 1 |
| **Google Rich Results Test passes** | 0 errors, 0 warnings | Week 1 |
| **Rich Results in search** | Appearance in SERP | Week 4-6 |
| **Knowledge Panel eligibility** | Qualifying data present | Ongoing |
| **Service page indexation** | 100% in GSC | Week 2 |

---

## Common Issues & Solutions

### Issue 1: Schema Validation Shows "Missing Business Hours"
**Cause:** `openingHoursSpecification` not included  
**Solution:** Add full business hours for all 7 days (use "CLOSED" for Sunday if not open)

### Issue 2: Latitude/Longitude Returns "Out of Range"
**Cause:** Coordinates not valid format  
**Solution:** Use 6-8 decimal places (e.g., 41.8781, -87.6298)

### Issue 3: Phone Number Validation Error
**Cause:** Missing country code or improper formatting  
**Solution:** Use international format: +1XXXXXXXXXX

### Issue 4: Service Area Shows as Invalid
**Cause:** Type mismatch in schema  
**Solution:** Use `@type: "City"` with single `name` property

### Issue 5: Multiple Schema Blocks Conflicting
**Cause:** RankMath + manual JSON-LD both present  
**Solution:** Remove manual JSON-LD if using RankMath, or disable RankMath auto-generation

---

## References

- **Schema.org LocalBusiness:** https://schema.org/LocalBusiness
- **Schema.org Service:** https://schema.org/Service
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **RankMath LocalBusiness Guide:** https://rankmath.com/kb/schema/local-business-schema
- **JSON-LD Examples:** https://www.json-ld.org/

---

## Appendix: LocalBusiness Type Decision Tree

```
Is this a business with a physical location?
├─ YES: Use LocalBusiness
│  ├─ Is it a retail store? → LocalBusiness
│  ├─ Is it a service provider? → LocalBusiness + Service
│  ├─ Is it a restaurant? → Restaurant (inherits LocalBusiness)
│  └─ Is it a healthcare provider? → MedicalBusiness (inherits LocalBusiness)
│
└─ NO: Use Organization
   ├─ Is it online-only? → Organization + WebSite
   └─ Is it a digital service? → Organization + Service
```

For **LocalCatalyst**, use **LocalBusiness** as the primary type (assuming physical location).

---

**Prepared by:** Specs  
**Status:** Ready for Implementation  
**Review Date:** February 10, 2026
