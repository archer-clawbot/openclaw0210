# LocalCatalyst — Schema Markup Automation via RankMath REST API
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Date:** February 10, 2026  
**Agent:** Specs  
**Phase:** Foundation → Content Creation (Phase 2)  
**SPEC-006, SPEC-007, SPEC-008 Reference**

---

## EXECUTIVE SUMMARY

**Scenario:** Builder creates location silo pages (City Hub, Service pages, Neighborhood spokes). Rather than manually adding schema to each page via RankMath UI, use **RankMath REST API** to deploy schema programmatically.

**Benefit:** Deploy schema to 20+ pages in minutes instead of hours of manual work.

**Tools:**
- RankMath Pro (installed & active)
- RankMath REST API (v1.0 API integration)
- WordPress REST API (v2)
- Postman, cURL, or custom script

**Current Status:** 🔴 **PAGES NOT YET CREATED** (awaiting Builder)

**Deliverable:** Ready-to-use API payloads + automation workflow

---

## PART 1: RANKMATHS REST API OVERVIEW

### What Is RankMath REST API?

RankMath extends WordPress REST API to allow programmatic control of:
- Page titles and meta descriptions
- Focus keywords and target keywords
- Schema markup (LocalBusiness, Service, FAQPage, BreadcrumbList, etc.)
- Sitemap inclusion/exclusion
- Redirect rules

### Prerequisite: RankMath Pro Must Be Installed

**Status for LocalCatalyst:** 🟡 RankMath Pro planned (not yet installed)

**Installation:**
1. Go to WordPress Admin → Plugins → Add New
2. Search "RankMath"
3. Install "RankMath - Professional SEO Plugin"
4. Activate plugin
5. License: Need RankMath Pro API key (LocalCatalyst provides)

### API Base URL

```
https://darkgreen-moose-683278.hostingersite.com/wp-json/rankmath/v1/
```

### Authentication Required

**Method:** Basic Auth (WordPress REST API credentials)
- **Username:** WordPress admin username (e.g., "spartan")
- **Password:** WordPress application password (from TOOLS.md, if available) OR create new

**Example (Postman):**
```
Authorization: Basic [base64-encoded username:password]
```

---

## PART 2: PAGE STRUCTURE & SCHEMA STRATEGY

### Location Silo Architecture (SPEC-006)

```
Homepage (/):
├── City Hub (/chicago/):
│   ├── Service Page (/chicago/hvac-repair/)
│   ├── Service Page (/chicago/hvac-installation/)
│   └── Neighborhood Spoke (/chicago/north-side/)
├── City Hub (/denver/):
│   ├── Service Page (/denver/hvac-repair/)
│   └── Neighborhood Spoke (/denver/south-denver/)
└── [Additional cities]
```

### Schema Deployment by Page Type

| Page Type | URL Pattern | Schema Types | Priority |
|---|---|---|---|
| **Homepage** | `/` | LocalBusiness, BreadcrumbList | P1 |
| **City Hub** | `/[city]/` | LocalBusiness (location-specific), FAQPage, BreadcrumbList | P1 |
| **Service Page** | `/[city]/[service]/` | Service, LocalBusiness (ref), BreadcrumbList, FAQPage | P1 |
| **Neighborhood Spoke** | `/[city]/[neighborhood]/` | LocalBusiness (location ref), BreadcrumbList | P2 |
| **Blog/Article** | `/blog/[slug]/` | Article, BreadcrumbList, FAQPage | P2 |
| **Contact Page** | `/contact/` | LocalBusiness (contact info), BreadcrumbList | P2 |

### Schema Deployment Strategy

**Phase 1 (Immediate):**
- Deploy LocalBusiness to all pages (global, via homepage)
- Deploy BreadcrumbList to all pages (auto-generated)
- Deploy FAQPage to City Hub pages (has FAQ sections)

**Phase 2 (After content):**
- Deploy Service schema to each service page (specific to that service)
- Deploy FAQPage to service pages (if FAQ section added)

**Phase 3 (Future):**
- Deploy Article schema to blog posts
- Deploy Review schema to testimonials page
- Deploy HowTo schema to guide pages

---

## PART 3: WORDPRESS REST API BASICS

### Getting a Page's ID

Before you can update a page via API, you need its **post ID**.

**Method 1: WordPress Admin UI**
- Go to Pages → Edit page
- Look at URL: `example.com/wp-admin/post.php?post=123`
- Post ID = `123`

**Method 2: REST API Query**

Get all pages:
```
GET https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages?per_page=100

Response (excerpt):
[
  {
    "id": 2,
    "slug": "about",
    "title": { "rendered": "About Us" },
    "link": "https://darkgreen-moose-683278.hostingersite.com/about/"
  },
  {
    "id": 3,
    "slug": "chicago",
    "title": { "rendered": "HVAC Services in Chicago" },
    "link": "https://darkgreen-moose-683278.hostingersite.com/chicago/"
  }
]
```

**Method 3: Query by Slug**

```
GET https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages?slug=chicago
```

---

## PART 4: RANKMATH API ENDPOINTS

### Get RankMath Metadata for a Page

```
GET https://darkgreen-moose-683278.hostingersite.com/wp-json/rankmath/v1/posts/[POST_ID]/metadata
```

**Response:**
```json
{
  "id": 3,
  "title": "HVAC Services in Chicago, IL | ABC HVAC",
  "description": "Expert HVAC repair...",
  "focus_keyword": "HVAC repair Chicago",
  "schema": [
    {
      "@type": "LocalBusiness",
      "name": "ABC HVAC"
    }
  ]
}
```

### Update RankMath Metadata for a Page

```
POST https://darkgreen-moose-683278.hostingersite.com/wp-json/rankmath/v1/posts/[POST_ID]/metadata
Content-Type: application/json
Authorization: Basic [credentials]

{
  "title": "New Title",
  "description": "New description",
  "focus_keyword": "keyword",
  "schema": [{ ... }]
}
```

---

## PART 5: SCHEMA PAYLOADS FOR EACH PAGE TYPE

### 5A. City Hub Page Schema

**URL Example:** `/chicago/`  
**Post ID:** Assigned by Builder (e.g., 5)

**RankMath API Payload:**

```json
{
  "title": "[Primary Service] in [City], [State] | [Business Name]",
  "description": "Expert [service] in [city]. [Value prop]. ✓ [Key benefit]",
  "focus_keyword": "[service] [city]",
  "schema": [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://darkgreen-moose-683278.hostingersite.com/chicago/#business",
      "name": "[EXACT GBP Business Name]",
      "image": "[Logo URL]",
      "description": "Expert HVAC services in Chicago...",
      "telephone": "[GBP Phone]",
      "email": "[Business Email]",
      "url": "https://darkgreen-moose-683278.hostingersite.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[GBP Address]",
        "addressLocality": "Chicago",
        "addressRegion": "IL",
        "postalCode": "[GBP ZIP]",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.8781",
        "longitude": "-87.6298"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Monday",
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Chicago" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "[Service Name]",
              "description": "[Service description]"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Question 1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Answer 1..."
          }
        }
      ]
    },
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
          "name": "Chicago",
          "item": "https://darkgreen-moose-683278.hostingersite.com/chicago/"
        }
      ]
    }
  ]
}
```

**cURL Command:**

```bash
curl -X POST https://darkgreen-moose-683278.hostingersite.com/wp-json/rankmath/v1/posts/5/metadata \
  -H "Authorization: Basic $(echo -n 'username:password' | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "HVAC Services in Chicago, IL | ABC HVAC",
    "description": "Expert HVAC repair...",
    "schema": [{ ... }]
  }'
```

---

### 5B. Service Page Schema

**URL Example:** `/chicago/hvac-repair/`  
**Post ID:** Assigned by Builder (e.g., 6)

**RankMath API Payload:**

```json
{
  "title": "[Service] in [City], [State] | [Business Name]",
  "description": "[Service] in [city]. [Specific value prop]. [CTA]",
  "focus_keyword": "[service] [city]",
  "schema": [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://darkgreen-moose-683278.hostingersite.com/chicago/hvac-repair/#service",
      "name": "HVAC Repair",
      "description": "Professional HVAC repair services in Chicago. Emergency same-day service available.",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
        "name": "[Business Name]",
        "telephone": "[GBP Phone]",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chicago",
          "addressRegion": "IL"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "Chicago" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "HVAC Repair Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Emergency HVAC Repair",
              "description": "24/7 emergency repair service"
            },
            "price": "150-500",
            "priceCurrency": "USD"
          }
        ]
      }
    },
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
          "name": "Chicago",
          "item": "https://darkgreen-moose-683278.hostingersite.com/chicago/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "HVAC Repair",
          "item": "https://darkgreen-moose-683278.hostingersite.com/chicago/hvac-repair/"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does HVAC repair cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HVAC repair in Chicago ranges from $150-$500 depending on the issue..."
          }
        }
      ]
    }
  ]
}
```

---

### 5C. Neighborhood Spoke Page Schema

**URL Example:** `/chicago/north-side/`  
**Post ID:** Assigned by Builder (e.g., 7)

**RankMath API Payload:**

```json
{
  "title": "[Service] in [Neighborhood], [City] | [Business Name]",
  "description": "[Neighborhood]-specific [service] in [city]. [Local angle].",
  "focus_keyword": "[service] [neighborhood] [city]",
  "schema": [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://darkgreen-moose-683278.hostingersite.com/chicago/north-side/#business",
      "name": "[Business Name] - North Side, Chicago",
      "telephone": "[GBP Phone]",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chicago",
        "addressRegion": "IL"
      },
      "areaServed": [
        { "@type": "City", "name": "North Side, Chicago" }
      ]
    },
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
          "name": "Chicago",
          "item": "https://darkgreen-moose-683278.hostingersite.com/chicago/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "North Side",
          "item": "https://darkgreen-moose-683278.hostingersite.com/chicago/north-side/"
        }
      ]
    }
  ]
}
```

---

## PART 6: AUTOMATION WORKFLOW

### Option A: Bash Script (cURL-Based)

**File:** `deploy-schema.sh`

```bash
#!/bin/bash

# Configuration
DOMAIN="https://darkgreen-moose-683278.hostingersite.com"
API_BASE="$DOMAIN/wp-json/rankmath/v1"
USERNAME="spartan"
PASSWORD="[APP_PASSWORD_FROM_TOOLS.md]"
CREDENTIALS=$(echo -n "$USERNAME:$PASSWORD" | base64)

# Define pages and their schemas
declare -A PAGES=(
  ["chicago"]="5"
  ["chicago-hvac-repair"]="6"
  ["chicago-north-side"]="7"
  ["denver"]="8"
  ["denver-hvac-repair"]="9"
)

# Schema template function
deploy_city_hub_schema() {
  local POST_ID=$1
  local CITY=$2
  local STATE=$3

  PAYLOAD=$(cat <<EOF
{
  "title": "HVAC Services in $CITY, $STATE | ABC HVAC",
  "description": "Expert HVAC repair and installation in $CITY...",
  "schema": [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ABC HVAC Services",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "$CITY",
        "addressRegion": "$STATE"
      }
    }
  ]
}
EOF
)

  curl -X POST "$API_BASE/posts/$POST_ID/metadata" \
    -H "Authorization: Basic $CREDENTIALS" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD"
}

# Deploy schema to all pages
deploy_city_hub_schema 5 "Chicago" "IL"
deploy_city_hub_schema 8 "Denver" "CO"
```

**Run:**
```bash
bash deploy-schema.sh
```

---

### Option B: Python Script (Requests Library)

**File:** `deploy-schema.py`

```python
import requests
import json
import base64

# Configuration
DOMAIN = "https://darkgreen-moose-683278.hostingersite.com"
API_BASE = f"{DOMAIN}/wp-json/rankmath/v1"
USERNAME = "spartan"
PASSWORD = "[APP_PASSWORD]"

# Create Basic Auth header
credentials = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
headers = {
    "Authorization": f"Basic {credentials}",
    "Content-Type": "application/json"
}

# Define pages
pages = {
    "chicago": {
        "post_id": 5,
        "city": "Chicago",
        "state": "IL",
        "type": "city_hub"
    },
    "chicago-hvac-repair": {
        "post_id": 6,
        "city": "Chicago",
        "state": "IL",
        "service": "HVAC Repair",
        "type": "service"
    }
}

# City Hub Schema
def get_city_hub_schema(city, state):
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ABC HVAC Services",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressRegion": state
        },
        "telephone": "+1-555-123-4567",
        "url": DOMAIN
    }

# Service Page Schema
def get_service_schema(service, city):
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service,
        "description": f"{service} services in {city}",
        "provider": {
            "@type": "LocalBusiness",
            "name": "ABC HVAC Services"
        }
    }

# Deploy schema
def deploy_schema(post_id, page_type, **kwargs):
    if page_type == "city_hub":
        schema = get_city_hub_schema(kwargs['city'], kwargs['state'])
    elif page_type == "service":
        schema = get_service_schema(kwargs['service'], kwargs['city'])
    
    payload = {
        "title": kwargs.get('title', ''),
        "description": kwargs.get('description', ''),
        "schema": [schema]
    }
    
    url = f"{API_BASE}/posts/{post_id}/metadata"
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        print(f"✅ Post {post_id}: Schema deployed successfully")
    else:
        print(f"❌ Post {post_id}: {response.text}")

# Run deployments
for page_slug, page_data in pages.items():
    deploy_schema(
        post_id=page_data['post_id'],
        page_type=page_data['type'],
        **page_data
    )
```

**Run:**
```bash
python3 deploy-schema.py
```

---

### Option C: Postman Collection

**File:** `LocalCatalyst-Schema-Deployment.postman_collection.json`

```json
{
  "info": {
    "name": "LocalCatalyst Schema Deployment",
    "schema": "https://schema.org/draft/2020-12/schema.json"
  },
  "auth": {
    "type": "basic",
    "basic": [
      {
        "key": "username",
        "value": "spartan",
        "type": "string"
      },
      {
        "key": "password",
        "value": "[APP_PASSWORD]",
        "type": "string"
      }
    ]
  },
  "item": [
    {
      "name": "Deploy Chicago Hub Schema",
      "request": {
        "method": "POST",
        "url": {
          "raw": "https://darkgreen-moose-683278.hostingersite.com/wp-json/rankmath/v1/posts/5/metadata",
          "protocol": "https",
          "host": ["darkgreen-moose-683278", "hostingersite", "com"],
          "path": ["wp-json", "rankmath", "v1", "posts", "5", "metadata"]
        },
        "body": {
          "mode": "raw",
          "raw": "{\"title\":\"HVAC Services in Chicago, IL | ABC HVAC\",\"schema\":[{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\"}]}"
        }
      }
    }
  ]
}
```

**Use in Postman:**
1. Import collection
2. Set environment variables (domain, credentials)
3. Run requests sequentially

---

## PART 7: PAGE ID MAPPING & DEPLOYMENT CHECKLIST

**Before deploying, create this table with Builder:**

| Page | URL | Post ID | Schema Types | Status |
|---|---|---|---|---|
| City Hub (Chicago) | `/chicago/` | [TO_BE_ASSIGNED] | LocalBusiness, FAQPage, BreadcrumbList | ⏳ |
| Service (HVAC Repair) | `/chicago/hvac-repair/` | [TO_BE_ASSIGNED] | Service, BreadcrumbList, FAQPage | ⏳ |
| Spoke (North Side) | `/chicago/north-side/` | [TO_BE_ASSIGNED] | LocalBusiness, BreadcrumbList | ⏳ |
| City Hub (Denver) | `/denver/` | [TO_BE_ASSIGNED] | LocalBusiness, FAQPage, BreadcrumbList | ⏳ |

**Execution Checklist:**
- [ ] Builder creates all pages and provides post IDs
- [ ] Execution agent updates mapping table with post IDs
- [ ] Update scripts with correct post IDs
- [ ] Update business data (name, phone, address, hours) in payloads
- [ ] Run deployment script
- [ ] Validate each page with Google Rich Results Test
- [ ] Check GSC Rich Results report
- [ ] Confirm rich snippets appear in search (7-14 days)

---

## PART 8: VALIDATION AFTER DEPLOYMENT

### Test 1: Google Rich Results Test (Per Page)

After deployment, test each page:

```
https://search.google.com/test/rich-results
Enter URL: https://darkgreen-moose-683278.hostingersite.com/chicago/
```

**Expected Results:**
- ✅ LocalBusiness detected
- ✅ BreadcrumbList detected
- ✅ FAQPage detected (if FAQ section in content)
- ✅ No errors or warnings

### Test 2: GSC Rich Results Report

```
Google Search Console → Enhancements → Rich Results
```

Monitor:
- LocalBusiness: Should show all pages
- FAQPage: Should show pages with FAQ schema
- BreadcrumbList: Should show all pages

### Test 3: API Verification

Query what was deployed:

```bash
curl -X GET "https://darkgreen-moose-683278.hostingersite.com/wp-json/rankmath/v1/posts/5/metadata" \
  -H "Authorization: Basic [credentials]" \
  -H "Content-Type: application/json"
```

**Response should show:**
```json
{
  "schema": [
    {
      "@type": "LocalBusiness",
      "name": "ABC HVAC Services"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [ ... ]
    }
  ]
}
```

---

## PART 9: TROUBLESHOOTING

### Problem: 401 Unauthorized

**Cause:** Bad credentials  
**Solution:**
1. Verify username is correct (usually "admin" or from TOOLS.md)
2. Verify app password is correct (from WordPress → Users → [User] → App Passwords)
3. Ensure base64 encoding is correct:
   ```bash
   echo -n "username:password" | base64
   ```

### Problem: 404 Not Found on POST Request

**Cause:** Post ID doesn't exist  
**Solution:**
1. Query all pages to get correct IDs:
   ```
   GET /wp-json/wp/v2/pages?per_page=100
   ```
2. Verify post ID in your payload

### Problem: Schema Validation Error in Response

**Cause:** Invalid JSON or schema structure  
**Solution:**
1. Validate JSON with [jsonlint.com](https://jsonlint.com)
2. Check schema structure matches SPEC-008 standard
3. Ensure "@context" and "@type" are present

### Problem: Rich Results Test Shows Warnings

**Cause:** Missing optional fields  
**Solution:**
1. Add recommended optional fields:
   - `image` (logo URL)
   - `openingHoursSpecification`
   - `aggregateRating` (if ratings available)
2. Re-test after updates

---

## PART 10: IMPLEMENTATION TIMELINE

### Pre-Deployment (Week 1)
- [ ] Builder creates all location silo pages
- [ ] Builder provides post IDs for each page
- [ ] Update mapping table (Part 7)
- [ ] Choose automation method (Bash, Python, or Postman)
- [ ] Customize payloads with business data

### Deployment (Week 2)
- [ ] Run deployment script/requests
- [ ] Monitor response status codes (should be 200)
- [ ] Test each page with Google Rich Results Test
- [ ] Fix any validation errors
- [ ] Verify in RankMath dashboard (should show schema count)

### Post-Deployment (Week 2-3)
- [ ] Monitor GSC Rich Results report (updated 24-72h after deployment)
- [ ] Check for crawl errors related to schema
- [ ] Monitor search results for rich snippet appearance (7-14 days)
- [ ] Use URL Inspection tool in GSC to re-crawl any problematic pages

---

## PART 11: HANDLING DYNAMIC UPDATES

### When Adding New Pages

Each time Builder adds a new page (e.g., new city hub):

1. **Get the Post ID:**
   ```bash
   curl -X GET "https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages?slug=new-city"
   ```

2. **Deploy Schema:**
   ```bash
   curl -X POST ".../posts/[NEW_POST_ID]/metadata" ...
   ```

3. **Validate:**
   - Test in Google Rich Results Test
   - Check GSC after 24 hours

### Updating Schema (If Business Data Changes)

If phone, address, or hours change:

1. **Update payload** with new values
2. **Re-deploy** to all affected pages:
   ```bash
   for POST_ID in 5 6 7 8 9; do
     curl -X POST ".../posts/$POST_ID/metadata" ...
   done
   ```

3. **Validate** all pages in Rich Results Test
4. **Request re-indexing** in GSC (URL Inspection → Request Indexing)

---

## PART 12: MONITORING & MAINTENANCE

### Weekly Monitoring

1. **Check GSC Rich Results Report:**
   - Any new excluded items?
   - Any error count increase?

2. **Spot-Check Pages:**
   - Random sampling of 3-5 pages
   - Test in Google Rich Results Test
   - Confirm schema still present

### Monthly Audits

1. **Full Validation:**
   - Test 100% of pages in Rich Results Test
   - Verify no validation errors
   - Check error counts in GSC

2. **Performance Review:**
   - Search for business name in Google
   - Confirm rich snippets displaying
   - Note any missing or incorrect data in snippets

### Quarterly Updates

1. **Schema Refresh:**
   - Update business hours if seasonal changes
   - Add new services if offered
   - Update ratings if changed significantly
   - Add new cities if expansion

2. **API Integration Review:**
   - Audit script for errors
   - Test deployment workflow
   - Update documentation

---

## PART 13: SPEC SCORES IMPACT

### Current Score (Before Deployment)
**SPEC-008: Schema & Structured Data = 0/10**
- ❌ No schema markup
- ❌ No LocalBusiness
- ❌ No Service schema
- ❌ No FAQPage
- ❌ No BreadcrumbList

### After Initial Deployment
**SPEC-008 Score = 5/10**
- ✅ LocalBusiness on all pages
- ✅ BreadcrumbList on all pages
- ✅ FAQPage on hub + service pages
- ❌ Service schema incomplete (basic only)
- ❌ No Review schema yet

### After Full Deployment (Phase 3)
**SPEC-008 Score = 10/10**
- ✅ Complete LocalBusiness + subtype
- ✅ Service schema with pricing
- ✅ FAQPage fully populated
- ✅ BreadcrumbList on all pages
- ✅ Review/AggregateRating schema
- ✅ VideoObject (if videos added)

---

## PART 14: DELIVERABLE REFERENCE

### Files to Provide to Execution Agent

1. **This Guide:** `2026-02-10-schema-automation-api-guide.md`

2. **Deployment Script:**
   - `deploy-schema.sh` (Bash)
   - `deploy-schema.py` (Python)
   - `LocalCatalyst-Schema-Deployment.postman_collection.json` (Postman)

3. **Configuration File:**
   ```
   # .env (for scripts)
   DOMAIN=https://darkgreen-moose-683278.hostingersite.com
   USERNAME=spartan
   PASSWORD=[APP_PASSWORD_FROM_TOOLS.md]
   ```

4. **Page Mapping Document:**
   ```
   Page | URL | Post ID | Schema Types | Status
   [Auto-filled after Builder creates pages]
   ```

---

## SIGN-OFF

**Current Status:** 🔴 **AWAITING PAGE CREATION BY BUILDER**

**Dependencies:**
- [ ] Builder creates location silo pages
- [ ] Builder provides post IDs for each page
- [ ] RankMath Pro installed and active
- [ ] WordPress app password configured (if needed)
- [ ] Business data finalized (name, phone, address, hours, services, cities)

**Handoff:**
Once Builder creates pages and provides post IDs:
1. Update page mapping table
2. Customize deployment scripts
3. Run automation
4. Validate with Google Rich Results Test
5. Monitor GSC Rich Results report

**Expected Timeline:**
- Pages created: Week 1-2
- Schema deployed: Day 1 after page creation
- Validation complete: Day 2
- Rich snippets appear in search: 7-14 days later

---

**Report saved to:** `C:\Users\spart\.openclaw\deliverables\localcatalyst\specs\2026-02-10-schema-automation-api-guide.md`

*Ready for execution after Builder creates pages.*