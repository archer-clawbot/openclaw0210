# LocalCatalyst — LocalBusiness Schema Deployment Guide
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Date:** February 10, 2026  
**Agent:** Specs  
**Phase:** Foundation (Phase 1)  

---

## EXECUTIVE SUMMARY

LocalBusiness schema is the **machine-readable layer** that tells Google:
- What your business is
- Where it's located
- How to contact it
- What services it offers
- Business hours, ratings, social presence
- Relationship to Google Business Profile (GBP)

**Without this schema:**
- ❌ Google cannot confidently match your website to your GBP
- ❌ Entity confidence is low (ranking penalty)
- ❌ Rich snippets not displayed in search results
- ❌ AI systems cannot extract business facts reliably

**With LocalBusiness schema:**
- ✅ Google links website → GBP → Knowledge Panel
- ✅ Rich snippets in search results (ratings, address, hours)
- ✅ Entity confidence high (ranking boost)
- ✅ AI systems extract structured data for AI Overviews
- ✅ Voice search can answer "Is [business] open now?"

---

## CURRENT STATE AUDIT

**Website:** darkgreen-moose-683278.hostingersite.com  
**Pages:** 1 (Hello World post only)  
**Schema Status:** 🔴 **NONE DETECTED**

**Missing:**
- ❌ No LocalBusiness schema
- ❌ No Organization schema
- ❌ No BreadcrumbList schema
- ❌ No FAQPage schema (for future use)
- ❌ No Service schema (for future use)

**Scoring:** 0/10 (SPEC-008 baseline)

**Target:** 10/10 = Full suite including LocalBusiness, Service, FAQPage, BreadcrumbList, Review

---

## PART 1: UNDERSTANDING LOCALBUSINESS SCHEMA

### What Is LocalBusiness Schema?

LocalBusiness is a **JSON-LD structured data format** that encodes business information in a machine-readable way.

**Example (minimal):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60601"
  },
  "telephone": "(555) 123-4567",
  "url": "https://darkgreen-moose-683278.hostingersite.com"
}
```

**Complete version (with all fields):**
See Part 2 below.

### Why It Matters

| Scenario | Without Schema | With Schema |
|---|---|---|
| User searches "hours for [business]" | Google shows GBP if linked, website ignored | Google pulls hours from schema |
| User asks "Is [business] open?" | Voice assistant confused | Voice assistant answers instantly from schema |
| Business appears in local pack | No rich snippet | Shows address, phone, rating in snippet |
| Google links website to GBP | Entity confidence: Low | Entity confidence: High |
| AI Overview creation | Business facts from GBP only | Business facts from website + GBP |

---

## PART 2: COMPLETE LOCALBUSINESS SCHEMA TEMPLATE

### Full Schema Structure (SPEC-008 Standard)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
  
  // Core Identity
  "name": "[EXACT GBP Business Name]",
  "image": "[Logo URL - e.g., https://darkgreen-moose-683278.hostingersite.com/logo.png]",
  "description": "[1-2 sentence description of business]",
  
  // Contact
  "telephone": "[EXACT GBP Phone Number - with country code]",
  "email": "[Business Email]",
  "url": "https://darkgreen-moose-683278.hostingersite.com",
  
  // Physical Address (MUST match GBP exactly)
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[EXACT GBP Street Address]",
    "addressLocality": "[EXACT GBP City]",
    "addressRegion": "[EXACT GBP State Code - e.g., IL, CO, TX]",
    "postalCode": "[EXACT GBP ZIP Code]",
    "addressCountry": "US"
  },
  
  // Geographic Coordinates (from GBP or Google Maps)
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[Latitude - e.g., 41.8781]",
    "longitude": "[Longitude - e.g., -87.6298]"
  },
  
  // Operating Hours (MUST match GBP exactly)
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Tuesday",
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "Closed",
      "closes": "Closed"
    }
  ],
  
  // Pricing & Service Area
  "priceRange": "$$",
  "areaServed": [
    { "@type": "City", "name": "Chicago" },
    { "@type": "City", "name": "Evanston" },
    { "@type": "City", "name": "Oak Park" }
  ],
  
  // Services Offered (links to Service schema)
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "[Service 1 Name]",
          "description": "[Service 1 description]"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "[Service 2 Name]",
          "description": "[Service 2 description]"
        }
      }
    ]
  },
  
  // Social Profiles & Platforms (ALL must be real URLs)
  "sameAs": [
    "[Google Business Profile URL]",
    "[Facebook URL]",
    "[Instagram URL]",
    "[YouTube URL]",
    "[Yelp URL]",
    "[LinkedIn URL]",
    "[Apple Maps URL]",
    "[BBB URL]",
    "[Twitter URL - if applicable]"
  ],
  
  // Ratings & Reviews (from GBP or Trustpilot, etc.)
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[e.g., 4.8]",
    "reviewCount": "[Number of reviews - e.g., 127]",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

---

## PART 3: CRITICAL RULE — EXACTNESS REQUIREMENT

### ⚠️ EVERY FACT MUST MATCH GBP EXACTLY

Mismatches create **entity confidence penalties**:

| Field | Current | GBP | Result | Impact |
|---|---|---|---|---|
| Business Name | "ABC Plumbing" | "ABC Plumbing Co" | ❌ Mismatch | Confidence: Low |
| Phone | "(555) 123-4568" | "(555) 123-4567" | ❌ Mismatch | Google confused |
| Address (Street) | "123 Main Street" | "123 Main St" | ❌ Mismatch | Entity penalty |
| City | "Chicago" | "Chicago" | ✅ Match | Confidence: High |
| Zip | "60601" | "60602" | ❌ Mismatch | Location penalty |
| Hours | "9-5 M-F" | "9:00-17:00 Mon-Fri" | ❌ Format mismatch | Schema invalid |

**Source of Truth:** Google Business Profile (GBP) listing

**Before deploying schema, confirm with Silas:**
- [ ] GBP business name (exact spelling)
- [ ] GBP phone (exact number with formatting)
- [ ] GBP address (exact street, city, ZIP)
- [ ] GBP hours (exact times, all days)
- [ ] GBP service areas (all cities served)

**After schema is deployed, audit:**
- Compare GBP listing to schema
- Use Google Rich Results Test to validate
- Monitor GSC for entity confidence issues

---

## PART 4: DATA COLLECTION CHECKLIST

Before implementation, gather this information (provide to Silas):

### Business Identity
- [ ] **Exact Business Name** (from GBP)  
  *Example: "Smith's HVAC Services LLC"*

- [ ] **Business Logo** (URL)  
  *Example: "https://darkgreen-moose-683278.hostingersite.com/logo.png"*

- [ ] **2-Sentence Description**  
  *Example: "Family-owned HVAC repair and installation in Chicago since 1998. Same-day emergency service available."*

### Contact
- [ ] **Phone Number** (from GBP, with country code)  
  *Example: "+1 (773) 555-1234"*

- [ ] **Email Address**  
  *Example: "info@smithshvac.com"*

### Address (ALL from GBP)
- [ ] **Street Address**  
  *Example: "456 Oak Avenue"*

- [ ] **City**  
  *Example: "Chicago"*

- [ ] **State**  
  *Example: "IL"*

- [ ] **ZIP Code**  
  *Example: "60601"*

### Coordinates
- [ ] **Latitude**  
  *Get from GBP or Google Maps: Right-click → Coordinates*  
  *Example: "41.8781"*

- [ ] **Longitude**  
  *Example: "-87.6298"*

### Business Hours (ALL from GBP, exact format)
- [ ] **Monday** opens/closes (e.g., "09:00" / "17:00")
- [ ] **Tuesday** opens/closes
- [ ] **Wednesday** opens/closes
- [ ] **Thursday** opens/closes
- [ ] **Friday** opens/closes
- [ ] **Saturday** opens/closes (or "Closed")
- [ ] **Sunday** opens/closes (or "Closed")
- [ ] **Holidays** (if applicable - requires separate specification)

### Services
- [ ] **Service 1 Name** + Description  
  *Example: "HVAC Repair — Emergency repair service for heating/cooling systems"*

- [ ] **Service 2 Name** + Description
- [ ] **Service 3 Name** + Description (optional)

### Service Areas
- [ ] **List of Cities/Areas Served**  
  *Example: ["Chicago", "Evanston", "Oak Park", "Arlington Heights"]*

### Social & Platform URLs (ALL real, verify they exist)
- [ ] **Google Business Profile URL**  
  *Example: "https://g.co/kgs/..."*

- [ ] **Facebook** (optional)
- [ ] **Instagram** (optional)
- [ ] **YouTube** (optional)
- [ ] **Yelp** (optional)
- [ ] **LinkedIn** (optional)
- [ ] **Apple Maps** (optional)
- [ ] **BBB** (optional)
- [ ] **Twitter** (optional)

### Ratings
- [ ] **Average Rating** (from GBP)  
  *Example: 4.8*

- [ ] **Number of Reviews** (from GBP)  
  *Example: 127*

---

## PART 5: IMPLEMENTATION METHODS

Three options for deploying LocalBusiness schema:

### Method 1: RankMath Pro (✅ RECOMMENDED)

**Why:**
- User-friendly UI (no coding required)
- Validates schema in real-time
- Auto-generates secondary schema types (BreadcrumbList, FAQPage, etc.)
- Integrates with WordPress admin
- Provides schema warnings/errors

**Steps:**

1. **Install RankMath Pro** (if not already done)
   - WordPress → Plugins → Add New → Search "RankMath"
   - Install & Activate
   - License: Add RankMath Pro key (contact LocalCatalyst for key)

2. **Navigate to Business Profile Setup**
   - WordPress → RankMath → General Settings → Business Profile

3. **Select Business Type**
   - Choose: **LocalBusiness** (or specific subtype like Plumber, Electrician, etc.)

4. **Fill in Business Information**
   - **Company Name:** [From GBP]
   - **Company Description:** [2 sentences]
   - **Company Logo:** [Upload or URL]
   - **Company Address:** [From GBP — Street, City, State, ZIP]
   - **Company Phone:** [From GBP]
   - **Company Email:** [Business email]
   - **Company Website:** `https://darkgreen-moose-683278.hostingersite.com`

5. **Add Business Hours**
   - **For each day:** Enter opening & closing times (from GBP)
   - Format: 24-hour (09:00, 17:00)
   - Mark "Closed" days as such

6. **Add Service Areas**
   - Click **Add Service Area**
   - Add each city: Chicago, Evanston, Oak Park, etc.

7. **Add Services** (optional but recommended)
   - Click **Add Service**
   - Enter name & description for each service

8. **Add Social Profiles**
   - Paste URLs for Facebook, Instagram, Yelp, LinkedIn, BBB, etc.
   - **Important:** Only add links that actually exist (no blanks)

9. **Save & Validate**
   - Click **Save Settings**
   - Go to: RankMath → Tools → Schema Validator
   - Paste generated schema JSON
   - Check: No errors, no warnings

10. **Deploy Globally**
    - RankMath automatically adds schema to all pages
    - Check: RankMath → Dashboard → Schema status shows LocalBusiness

**Cost:** RankMath Pro = $199/year (covers all sites)

---

### Method 2: Manual JSON-LD (Backup Option)

**Use if RankMath unavailable.**

1. **Generate schema** (use template from Part 2)
2. **Add to theme header:**
   - WordPress → Appearance → Theme File Editor
   - Open `header.php`
   - Find `</head>` tag
   - Add before it:
   ```html
   <script type="application/ld+json">
   [PASTE FULL SCHEMA JSON HERE]
   </script>
   ```
3. **Save file**
4. **Validate** (see Part 6 below)

**Cons:**
- Requires manual JSON editing (error-prone)
- Not visible in WordPress UI
- Hard to update (must edit code)
- No validation feedback

---

### Method 3: Google Site Kit (Easiest for GA4 + Schema Integration)

**Use if Google Site Kit already installed for GA4.**

1. **Install/Open Google Site Kit plugin**
2. Go to **Setup → Business Information**
3. Fill in business details (same as RankMath Method 1)
4. Site Kit auto-generates LocalBusiness schema
5. Adds to all pages automatically

**Advantage:** One tool for GSC + GA4 + Schema  
**Disadvantage:** Less control over schema fields than RankMath

---

## PART 6: VALIDATION & TESTING

### Test 1: Google Rich Results Test

1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter URL: `https://darkgreen-moose-683278.hostingersite.com/`
3. Click **Test URL**
4. Results:
   - ✅ **Valid** = No errors, schema is correct
   - ⚠️ **Valid with warnings** = Works but missing optional fields
   - ❌ **Invalid** = Fix errors before deployment

**What to look for:**
- ✅ "LocalBusiness" shows as detected type
- ✅ Fields like "name," "address," "telephone" populated
- ✅ No red error badges
- ⚠️ Missing optional fields (like "aggregateRating" if new business) is OK

**Example successful result:**
```
✅ Valid
Detected: LocalBusiness

Properties found:
- name: "Smith's HVAC"
- address: "456 Oak Ave, Chicago, IL 60601"
- telephone: "(773) 555-1234"
- openingHoursSpecification: [7 objects]
- areaServed: [3 cities]
```

### Test 2: GSC Rich Results Report

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select property
3. Go to **Enhancements → Rich Results** (left sidebar)
4. Look for **LocalBusiness** section
5. Should show:
   - ✅ "LocalBusiness" detected
   - ✅ Number of pages with valid LocalBusiness schema
   - ⚠️ Any validation errors (fix these)

### Test 3: Schema.org Validator (Backup)

1. Go to [schema.org/validator](https://schema.org/validator)
2. Paste your schema JSON (or URL)
3. Check for errors/warnings

### Test 4: Mobile-Friendly + Desktop Test

1. Go to [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
2. Enter URL: `https://darkgreen-moose-683278.hostingersite.com/`
3. Check:
   - ✅ Mobile friendly
   - ✅ Core Web Vitals passing
   - ✅ No blocking JavaScript

---

## PART 7: BEFORE/AFTER COMPARISON

### Before Schema Deployment
```html
<head>
  <title>darkgreen-moose-683278.hostingersite.com</title>
  <meta name="description" content="[No description]">
  <!-- No schema tags -->
</head>
```

**Google's understanding:**
- ❓ Is this a business? Unknown
- ❓ What does it do? Unknown
- ❓ Where is it located? Unknown
- ❓ What's the phone number? Unknown
- Entity confidence: **VERY LOW**

---

### After Schema Deployment
```html
<head>
  <title>HVAC Services in Chicago, IL | ABC HVAC</title>
  <meta name="description" content="Expert HVAC repair and installation in Chicago...">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ABC HVAC Services",
    "address": { "streetAddress": "456 Oak Ave", ... },
    "telephone": "(773) 555-1234",
    "openingHoursSpecification": [ ... ],
    "areaServed": [ "Chicago", "Evanston" ],
    "aggregateRating": { "ratingValue": 4.8, ... }
  }
  </script>
</head>
```

**Google's understanding:**
- ✅ **LocalBusiness** detected
- ✅ **Name:** ABC HVAC Services
- ✅ **Address:** Chicago, IL
- ✅ **Phone:** (773) 555-1234
- ✅ **Hours:** M-F 9-5, Sat 10-2, Sun Closed
- ✅ **Services:** HVAC Repair, Installation
- ✅ **Ratings:** 4.8/5 (127 reviews)
- Entity confidence: **HIGH** ✅

**Result in Search:**
- Rich snippet displays in search results
- "ABC HVAC Services" shows with address, rating, hours
- Voice search can answer "Is ABC HVAC open?"
- AI Overview cites business info from schema

---

## PART 8: ADDITIONAL SCHEMA TYPES (Future Deployments)

Once LocalBusiness is live, add these schema types to maximize coverage:

### BreadcrumbList (on every page)
Shows navigation hierarchy in search results.

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
    }
  ]
}
```

**RankMath:** Auto-generates if navigation structure exists

---

### FAQPage (on pages with FAQs)
Enables FAQ rich snippets in search results.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does HVAC repair cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HVAC repair costs range from $150-$500..."
      }
    }
  ]
}
```

**RankMath:** Auto-generates if page has FAQ section

---

### Service Schema (on service pages)
Details about specific services offered.

```json
{
  "@type": "Service",
  "name": "HVAC Repair",
  "description": "Emergency and scheduled HVAC repair...",
  "provider": {
    "@type": "LocalBusiness",
    "name": "ABC HVAC"
  },
  "areaServed": [
    { "@type": "City", "name": "Chicago" }
  ]
}
```

**RankMath:** Included in LocalBusiness `hasOfferCatalog`

---

### Review Schema (on testimonials/reviews page)
Individual reviews from customers.

```json
{
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "author": {
    "@type": "Person",
    "name": "John Smith"
  },
  "reviewBody": "Great service, arrived on time, fixed the issue..."
}
```

**Manual deployment only (RankMath can help)**

---

## PART 9: DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Data from Silas collected (business name, address, phone, hours, services)
- [ ] GBP listing verified as source of truth
- [ ] Logo image URL ready
- [ ] Social media URLs verified (all links actually exist)
- [ ] RankMath Pro installed and licensed (or Site Kit alternative)

### Deployment
- [ ] RankMath Business Profile settings filled completely
- [ ] All GBP data matches schema exactly (name, phone, address, hours)
- [ ] Service areas added (all cities served)
- [ ] Services listed (at least 2-3)
- [ ] Social profiles added (Facebook, Yelp, LinkedIn at minimum)
- [ ] Ratings/reviews data added (if applicable)
- [ ] Schema saved and activated in RankMath

### Validation
- [ ] Google Rich Results Test shows ✅ Valid
- [ ] No errors in test results
- [ ] Local Business properties visible in test output
- [ ] GSC Rich Results report (after 24-48 hours) shows LocalBusiness detected
- [ ] Mobile-Friendly Test passes
- [ ] Core Web Vitals acceptable

### Post-Deployment Monitoring
- [ ] GSC checked daily for 7 days (look for crawl errors)
- [ ] Rich Results report monitored (should show LocalBusiness in coverage)
- [ ] Search Console URL Inspection used to re-check homepage
- [ ] Manual search for business name in Google (check for rich snippet)

---

## PART 10: TROUBLESHOOTING

### Problem: Schema Validation Error "name is required"

**Cause:** Business name field empty  
**Solution:**
1. Go to RankMath → Business Profile
2. Fill in **Company Name** field (from GBP)
3. Save & re-validate

---

### Problem: "address is required"

**Cause:** Address fields incomplete  
**Solution:**
1. Fill in ALL address fields in RankMath:
   - Street Address
   - City
   - State
   - ZIP Code
2. **IMPORTANT:** Values must match GBP exactly
3. Save & re-validate

---

### Problem: "Invalid openingHoursSpecification"

**Cause:** Hours format incorrect  
**Solution:**
1. RankMath requires 24-hour format: "09:00" not "9am"
2. For closed days, leave blank or mark "Closed"
3. Correct format example:
   - Monday: 09:00 – 17:00 ✅
   - Sunday: Closed ✅
4. Save & re-validate

---

### Problem: GSC shows "Excluded" for LocalBusiness

**Cause:** Schema on page but Google not processing it yet  
**Solution:**
1. Wait 24-72 hours (first crawl)
2. Use URL Inspection tool in GSC to force re-crawl
3. Request Indexing for homepage
4. Check again in 24 hours

---

### Problem: Rich snippet not showing in search results

**Cause:** May take 7-14 days for Google to show schema-based snippets  
**Solution:**
1. Confirm schema validates (Rich Results Test)
2. Confirm GSC shows LocalBusiness detected
3. Check business has been indexed at least 7 days
4. Search manually: "[business name] [city]" in Google
5. If still not showing after 14 days, check:
   - GBP listing is complete
   - Entity confidence in GSC is high
   - No conflicting schema (remove duplicates)

---

## PART 11: COMMON FIELDS & EXAMPLES

### LocalBusiness Subtypes (choose most accurate)

Instead of generic "LocalBusiness," use specific type:

```
- Plumber
- Electrician
- HVAC
- Painter
- Dentist
- AutoRepair
- Restaurant
- RetailStore
- ProfessionalService
- Attorney
- Doctor
```

**In RankMath:** Business Type dropdown shows these options

**Example:** If AC/HVAC company, select **"HVAC"** instead of "LocalBusiness"

### Price Range Codes

If service pricing is available:

```
"priceRange": "$"      = Budget (< $50)
"priceRange": "$$"     = Moderate ($50-$150)
"priceRange": "$$$"    = Expensive ($150-$300)
"priceRange": "$$$$"   = Premium (> $300)
```

### Service Areas Format

List cities/neighborhoods served:

```json
"areaServed": [
  { "@type": "City", "name": "Chicago" },
  { "@type": "City", "name": "Evanston" },
  { "@type": "City", "name": "Oak Park" },
  { "@type": "City", "name": "Arlington Heights" }
]
```

**In RankMath:** Add each city individually

---

## PART 12: TIMELINE & DEPENDENCIES

### Dependencies (Must Complete First)
- [ ] Phase 1 - Technical SEO Audit (robots.txt fixed)
- [ ] Phase 1 - GSC Setup & Verification
- [ ] Phase 1 - Title Tag Optimization (homepage title set)
- [ ] Silas provides business context (name, address, phone, hours)

### Deployment Timeline
- **Day 1:** Receive data from Silas
- **Day 1:** Install RankMath Pro (if not done)
- **Day 1:** Fill in business information in RankMath
- **Day 1:** Validate with Google Rich Results Test
- **Day 2:** Monitor GSC Rich Results report
- **Day 2-14:** Monitor search results for rich snippet appearance

### SPEC-008 Scoring After Deployment

**Current Score:** 0/10 (no schema)

**After LocalBusiness Deployment:** 3/10
- ✅ Basic LocalBusiness
- ❌ No Service schema yet
- ❌ No FAQ schema yet
- ❌ No BreadcrumbList schema yet
- ❌ No Review schema yet

**Future Additions for 10/10:**
- Phase 2: Service schema (on service pages)
- Phase 3: FAQ schema (on content pages)
- Phase 3: BreadcrumbList schema (all pages)
- Phase 3: Review/AggregateRating schema (testimonials)

---

## PART 13: SIGN-OFF & NEXT STEPS

**Current Status:** 🔴 **AWAITING DATA FROM SILAS**

**Blockers:**
- ❌ Business name (must match GBP)
- ❌ Phone number (must match GBP)
- ❌ Address (must match GBP)
- ❌ Operating hours (must match GBP)
- ❌ Services offered (list)
- ❌ Service areas/cities (list)
- ❌ GBP listing URL
- ❌ Social media URLs
- ❌ Logo image

**Once Data Received:**
1. ✅ Execution agent installs RankMath Pro
2. ✅ Fills in all business information
3. ✅ Validates schema with Google Rich Results Test
4. ✅ Monitors GSC Rich Results report
5. ✅ Confirms rich snippet appears in search results

**Deliverable:** This guide is **ready for execution** once Silas provides business context.

---

## APPENDIX A: Schema Validation Tools

| Tool | URL | Purpose |
|---|---|---|
| **Google Rich Results Test** | https://search.google.com/test/rich-results | Official Google validation |
| **Schema.org Validator** | https://schema.org/validator | General schema validation |
| **Google Structured Data Testing Tool** | https://developers.google.com/structured-data/testing-tool | Legacy but useful |
| **Yoast Schema Validator** | https://yoast.com/structured-data-schema-validator/ | Free third-party validator |

---

## APPENDIX B: GBP Data Collection Template

Use this template to request data from Silas/business owner:

```
LOCALBUSINESS SCHEMA DATA COLLECTION
=====================================

Business Identity:
- Business Name (exact): _________________
- Business Logo URL: _________________
- 2-Sentence Description: _________________

Contact:
- Phone (from GBP): _________________
- Email: _________________

Address (from GBP):
- Street: _________________
- City: _________________
- State: _________________
- ZIP: _________________

Coordinates (from GBP or Maps):
- Latitude: _________________
- Longitude: _________________

Hours (from GBP, exact):
- Monday: Opens _____ Closes _____
- Tuesday: Opens _____ Closes _____
- Wednesday: Opens _____ Closes _____
- Thursday: Opens _____ Closes _____
- Friday: Opens _____ Closes _____
- Saturday: Opens _____ Closes _____
- Sunday: Opens _____ Closes _____

Services (list name + description):
1. _________________
2. _________________
3. _________________

Service Areas (cities/neighborhoods):
1. _________________
2. _________________
3. _________________

Social & Platform URLs (only if real):
- GBP: _________________
- Facebook: _________________
- Instagram: _________________
- Yelp: _________________
- LinkedIn: _________________
- BBB: _________________

Ratings (from GBP):
- Average Rating: _________________
- Number of Reviews: _________________
```

---

**Report saved to:** `C:\Users\spart\.openclaw\deliverables\localcatalyst\specs\2026-02-10-localbusiness-schema-deployment.md`

*Awaiting business context from Silas to finalize implementation.*