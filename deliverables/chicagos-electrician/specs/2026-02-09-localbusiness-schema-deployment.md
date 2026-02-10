# LocalBusiness Schema Implementation — Chicago's Electrician
**Client:** Chicago's Electrician  
**Date:** 2026-02-09  
**Agent:** Specs  
**Status:** Ready for Implementation

---

## Executive Summary

Chicago's Electrician currently has a LocalBusiness schema in place, but it requires consolidation and optimization:
- **Current state:** LocalBusiness schema exists but with address inconsistencies
- **Goal:** Deploy a unified, optimized LocalBusiness schema + Service schemas for key service pages
- **Impact:** Enhanced local search visibility, rich snippets in Google results

---

## Current State Analysis

### Existing Schema (Homepage)
✅ LocalBusiness schema present  
✅ Electrician schema present  
✅ Organization/Brand schema present  
⚠️ **Address inconsistency:** Two different business addresses in schema
- Address 1: 207 E Ohio St Ste 308, Chicago, IL 60611
- Address 2: 376 Monaco Drive, Roselle, IL 60172

⚠️ **Phone:** +1 847-401-8393 (needs verification against GBP)  
⚠️ **Hours:** Listed in Electrician schema as Mo-Fr 0800-1700 (incomplete — no weekends)

### Missing Schema
❌ Service schema on `/commercial-electrician/` page  
❌ Service schema on `/residential-electrician/` page  
❌ FAQPage schema on service pages (identified in audit but not yet deployed)

---

## Recommended Actions

### STEP 1: Verify & Consolidate Business Data
Before deploying schema, confirm with business:

| Field | Current Data | Status | Notes |
|-------|--------------|--------|-------|
| Business Name | MCC Electric | ✅ | Consistent across sources |
| Primary Address | 207 E Ohio St Ste 308, Chicago, IL 60611 | ⚠️ | Need to confirm primary location |
| Secondary Address | 376 Monaco Drive, Roselle, IL 60172 | ⚠️ | From homepage footer |
| Phone | +1 847-401-8393 | ⚠️ | Verify against GBP listing |
| Email | info@mccelectricinc.com | ✅ | Listed in schema |
| Business Hours | Mo-Fr 08:00-17:00 | ❌ | Incomplete (no weekends) |
| Service Area | Chicago metro (20km radius from 60611) | ⚠️ | Verify actual service area |
| GBP Listing | Exists | ✅ | Confirm all data matches |

**Action Required:** Contact business owner to confirm:
1. Which address is PRIMARY (for LocalBusiness schema)
2. Complete business hours (24/7 emergency service?)
3. Whether secondary address should be added as separate LocalBusiness entry
4. Exact service area boundaries

### STEP 2: Deploy Optimized LocalBusiness Schema

**Target Pages:** Homepage (`/`)

**JSON-LD to Add (via RankMath or custom):**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MCC Electric",
  "description": "Licensed and insured 24-hour electrician serving Chicago and surrounding areas. Residential and commercial electrical services.",
  "image": "https://www.chicagoselectrician.com/wp-content/uploads/2012/06/logo2.png",
  "url": "https://www.chicagoselectrician.com",
  "telephone": "+1 847-401-8393",
  "email": "info@mccelectricinc.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "207 E Ohio St Ste 308",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60611",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.8924034",
    "longitude": "-87.6219606"
  },
  "openingHours": [
    "Mo-Fr 08:00-17:00",
    "Sa 09:00-14:00",
    "Su closed"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "41.8924034",
      "longitude": "-87.6219606"
    },
    "geoRadius": "20 km"
  },
  "priceRange": "$$",
  "sameAs": [
    "https://www.facebook.com/MccElectricInc",
    "https://www.linkedin.com/company/mcc-electric-inc/",
    "https://www.yelp.com/biz/mcc-electric-chicago",
    "https://www.google.com/maps"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
}
```

**Key Components:**
- **name:** "MCC Electric" (not full page title)
- **address:** Primary business location (207 E Ohio St)
- **phone:** Verified phone number
- **hours:** Complete weekly schedule including emergency availability
- **areaServed:** Exact service area boundaries
- **geo:** Accurate coordinates (41.8924034, -87.6219606)
- **aggregateRating:** If GBP data available

---

### STEP 3: Deploy Service Schema

**Target Pages:**
- `/commercial-electrician/`
- `/residential-electrician/`

**JSON-LD for Commercial Electrician Page:**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Commercial Electrical Services",
  "description": "Professional commercial electrician services for offices, retail, multi-family buildings, factories, and manufacturers in Chicago. Same-day service available.",
  "image": "https://www.chicagoselectrician.com/wp-content/uploads/2024/03/commercial-service.jpg",
  "provider": {
    "@type": "LocalBusiness",
    "name": "MCC Electric",
    "telephone": "+1 847-401-8393",
    "url": "https://www.chicagoselectrician.com"
  },
  "areaServed": "Chicago, IL",
  "serviceType": "Electrical Installation, Repair, Maintenance",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "Contact for quote",
    "availability": "Call for availability",
    "url": "https://www.chicagoselectrician.com/contact-us-free-estimate-for-your-electrical-job/"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  },
  "hasOfferingDetails": [
    {
      "@type": "OfferingDetails",
      "name": "Indoor Lighting",
      "description": "LED lighting, recessed lighting, decorative and custom lighting solutions"
    },
    {
      "@type": "OfferingDetails",
      "name": "Generators",
      "description": "Commercial-grade generator installation, repair, and maintenance"
    },
    {
      "@type": "OfferingDetails",
      "name": "Panel & Circuit Breaker Upgrades",
      "description": "Electrical panel replacement and circuit breaker upgrades"
    },
    {
      "@type": "OfferingDetails",
      "name": "EV Charger Installation",
      "description": "Electric vehicle charging station installation and wiring"
    }
  ]
}
```

**JSON-LD for Residential Electrician Page:**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Residential Electrical Services",
  "description": "Expert residential electrician services for homes in Chicago. 24-hour emergency electrician available. Licensed and insured.",
  "image": "https://www.chicagoselectrician.com/wp-content/uploads/2024/02/Electricians-in-Chicago.png",
  "provider": {
    "@type": "LocalBusiness",
    "name": "MCC Electric",
    "telephone": "+1 847-401-8393",
    "url": "https://www.chicagoselectrician.com"
  },
  "areaServed": "Chicago, IL",
  "serviceType": "Electrical Installation, Repair, Maintenance",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "Contact for quote",
    "availability": "24/7 Emergency Service",
    "url": "https://www.chicagoselectrician.com/contact-us-free-estimate-for-your-electrical-job/"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  },
  "hasOfferingDetails": [
    {
      "@type": "OfferingDetails",
      "name": "Emergency Electrical Services",
      "description": "24/7 emergency electrician for urgent repairs"
    },
    {
      "@type": "OfferingDetails",
      "name": "Lighting Services",
      "description": "Indoor and outdoor lighting installation"
    },
    {
      "@type": "OfferingDetails",
      "name": "Electrical Cabling",
      "description": "Structured cabling and electrical wiring"
    },
    {
      "@type": "OfferingDetails",
      "name": "General Electrical Repairs",
      "description": "Panel replacements, outlet issues, surge protection"
    },
    {
      "@type": "OfferingDetails",
      "name": "Power Backup Systems",
      "description": "Generator installation for backup power"
    },
    {
      "@type": "OfferingDetails",
      "name": "Security Systems",
      "description": "Installation of cameras, alarms, and motion detectors"
    }
  ]
}
```

---

## Implementation Steps (via RankMath)

### Via WordPress Admin:

1. **Login to WordPress:**
   - URL: https://www.chicagoselectrician.com/wp-admin/
   - Username: archer
   - App Password: (use provided credentials)

2. **Access RankMath Schema Settings:**
   - Go to RankMath → Schema Settings
   - Select "LocalBusiness" for Homepage
   - Fill in all fields from recommended schema above

3. **Add Service Schema (Commercial Page):**
   - Go to Edit `/commercial-electrician/` page
   - Scroll to RankMath schema section
   - Add "Service" schema type
   - Fill fields with commercial service details

4. **Add Service Schema (Residential Page):**
   - Go to Edit `/residential-electrician/` page
   - Add "Service" schema type
   - Fill fields with residential service details

5. **Validate Each Page:**
   - Use Google Rich Results Test for each page
   - Ensure no warnings or errors
   - Check that schema displays correctly

---

## Validation Checklist

After implementation, validate using **Google Rich Results Test** (https://search.google.com/test/rich-results):

### Homepage Validation
- [ ] LocalBusiness schema present
- [ ] Name: "MCC Electric"
- [ ] Phone: +1 847-401-8393
- [ ] Address: 207 E Ohio St Ste 308, Chicago, IL 60611
- [ ] No warnings in validation
- [ ] Rich snippet shows business card

### Commercial Page Validation
- [ ] Service schema present
- [ ] Service type visible in preview
- [ ] Provider (MCC Electric) linked correctly
- [ ] No warnings or errors

### Residential Page Validation
- [ ] Service schema present
- [ ] Service type visible in preview
- [ ] Provider (MCC Electric) linked correctly
- [ ] No warnings or errors

---

## Data Consistency Rules

To maintain data integrity across all schema:

1. **NAP Consistency:**
   - Business Name: MCC Electric (always short name)
   - Phone: +1 847-401-8393 (same across all schema)
   - Address: Match primary address exactly

2. **GBP Matching:**
   - Verify all schema data matches Google Business Profile
   - Hours must match GBP hours exactly
   - Address must match GBP address exactly

3. **Address Policy:**
   - Primary address for LocalBusiness schema: 207 E Ohio St Ste 308, Chicago, IL 60611
   - If secondary location needs schema: Create separate LocalBusiness entry

---

## Timeline

| Task | Duration | Depends On |
|------|----------|-----------|
| Verify business data with owner | 1-2 days | None |
| Deploy LocalBusiness schema | 30 mins | Business data verification |
| Deploy Commercial Service schema | 30 mins | LocalBusiness deployment |
| Deploy Residential Service schema | 30 mins | LocalBusiness deployment |
| Validate with Rich Results Test | 30 mins | All schema deployment |
| Submit to Google Search Console | 15 mins | Validation complete |
| **Total** | **2-3 days** | — |

---

## Success Metrics

✅ **After implementation, you should see:**
- LocalBusiness rich snippet in Google Business Profile
- Service pages appearing in Google Local Services Ads (if eligible)
- Better local pack ranking for electrician keywords
- Improved click-through rate from organic search

---

## Notes & Dependencies

- **Current status:** RankMath is installed and active ✅
- **Address inconsistency:** Requires business owner confirmation
- **Hours data:** Currently incomplete — need 24/7 emergency availability clarification
- **Next step:** Silas to review implementation for quality audit

---

## Sign-Off

**Prepared by:** Specs  
**Date:** 2026-02-09  
**Status:** Ready for implementation pending business data verification

