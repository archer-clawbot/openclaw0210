# LocalCatalyst — Title Tag Optimization Report
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Date:** February 10, 2026  
**Agent:** Specs  
**Phase:** Foundation (Phase 1)  

---

## BUSINESS CONTEXT REQUIRED

Before finalizing title tags, **Silas must provide** the following information:

| Requirement | Status | Example |
|---|---|---|
| **Primary Service** | ⚠️ NEEDED | "HVAC Repair," "Electrical Service," "Plumbing," etc. |
| **Service Location(s)** | ⚠️ NEEDED | "Chicago, IL," "Denver Metro," "Austin TX" (primary) |
| **Business Name (Exact)** | ⚠️ NEEDED | Must match GBP listing exactly |
| **Secondary Services** | ⚠️ NEEDED | 2-5 additional services |
| **Service Differentiator** | ⚠️ NEEDED | "24/7 Emergency," "Family-Owned Since 1995," "Licensed & Insured," etc. |
| **Coverage Area** | ⚠️ NEEDED | List of cities/neighborhoods served |

**This report contains templated recommendations. Replace `[PLACEHOLDERS]` with actual business data.**

---

## CURRENT STATE AUDIT

### Homepage Title Tag
**URL:** `/`  
**Current Title:** `darkgreen-moose-683278.hostingersite.com`  
**Current H1:** `Blog`  

**Status:** 🔴 **CRITICAL ISSUE**
- Generic domain name (not descriptive)
- No keyword targeting
- No business name or service signal
- Character count: 43 characters (under-optimized)

---

### "Hello World" Post Title Tag
**URL:** `/hello-world/`  
**Post ID:** 1  
**Current Title:** `Hello world! – darkgreen-moose-683278.hostingersite.com`  
**Current H1:** `Hello world!`  

**Status:** 🔴 **CRITICAL ISSUE**
- Default WordPress post (should be deleted)
- Non-descriptive, not business-relevant
- Character count: 56 characters (but wasted on placeholder content)

---

## TITLE TAG STANDARDS (SPEC-010)

**Optimal Format:**  
`[Primary Keyword] in [Location] | [Business Name]`

**Technical Specs:**
- **Ideal Length:** 50-60 characters
- **Must Include:**
  - Primary keyword (service offered)
  - Location (city/area)
  - Brand name (business name)
- **Structure:** [Keyword] + [Location] OR [Brand] – [Keyword] – [Location]
- **Avoid:**
  - Keyword stuffing (no multiple repetitions)
  - All caps
  - Special characters (unless necessary)
  - Placeholder text

**Scoring:**
- 0: Non-descriptive, generic, no keyword
- 5: Includes keyword but missing location or brand
- 8: Keyword + location + brand, proper length
- 10: Keyword + location + brand, compelling, optimized for CTR

---

## RECOMMENDED TITLE TAG TEMPLATES

### 1. HOMEPAGE TITLE TAG
**URL:** `/`  
**Type:** Site Hub / City Hub Page  

**Template:**
```
[Primary Service] in [City], [State] | [Business Name]
```

**Example 1 (HVAC Company in Chicago):**
- `HVAC Services in Chicago, IL | [Business Name]` (58 chars)
- Character count: ✅ 58 (perfect)

**Example 2 (Electrician in Denver):**
- `Licensed Electrician Denver CO | [Business Name]` (49 chars)
- Character count: ✅ 49 (tight but good)

**Example 3 (Plumbing in Austin):**
- `Emergency Plumber Austin TX | [Business Name]` (46 chars)
- Character count: ✅ 46 (good)

**YOUR HOMEPAGE TITLE:**
```
[Primary Service] in [City], [State] | [Business Name]
```
**Expected Length:** 48-62 characters  
**Keyword Targets:** Primary service + location + brand recognition

**Editing Instructions:**
1. Open WordPress → Dashboard → Customize (or Elementor if using page builder)
2. OR use RankMath plugin to set custom title in post editor
3. OR add to `wp-config.php` if using theme-level setting

---

### 2. "HELLO WORLD" POST (Status: Should Delete)
**URL:** `/hello-world/`  
**Post ID:** 1  
**Type:** Default WordPress post  
**Recommendation:** ❌ **DELETE THIS POST**

**Reason:**
- Not business-relevant
- Wastes crawl budget
- Creates "thin content" issue
- Confuses visitors and Google

**If you must keep it for testing (not recommended):**
```
[Service] Guide: [Topic] | [Business Name]
```

**Example (if kept):**
- `HVAC Maintenance Guide: When to Call | [Business Name]` (54 chars)
- `Emergency Plumbing Tips for Homeowners | [Business Name]` (56 chars)

**BUT: Recommended Action = DELETE entirely.**

---

## CRITICAL MISSING PAGES (To Create)

These pages don't exist yet but are essential for proper title tag optimization:

### About Page (if company wants)
**Recommended Title:**
```
About [Business Name] | [Service] Since [Year]
```
**Example:** `About Smith's HVAC | Licensed Since 1998` (45 chars)

### Services Page (main services listing)
**Recommended Title:**
```
[Service 1], [Service 2], [Service 3] | [Business Name]
```
**Example:** `Plumbing, Heating, Electrical Services | ABC Services` (56 chars)

### Contact Page
**Recommended Title:**
```
Contact [Business Name] - [City] [Service]
```
**Example:** `Contact ABC HVAC - Denver Emergency Repair` (45 chars)

### Service Pages (per service type - required for location silo)
**Recommended Title:**
```
[Service] in [City], [State] | [Business Name]
```
**Example:** `Water Heater Repair in Denver, CO | ABC Services` (50 chars)

---

## BEFORE/AFTER COMPARISON

| Page | Current Title | Recommended Title | Improvement |
|------|---|---|---|
| **Homepage** | `darkgreen-moose-683278...` | `[Service] in [City] \| [Brand]` | 🟢 +75% (keyword + location) |
| **Post (Hello World)** | `Hello world! – darkgree...` | ❌ DELETE | 🔴 Complete removal |
| **About** | *(doesn't exist)* | `About [Brand] \| [Service] Since [Year]` | 🟢 NEW (needed) |
| **Services** | *(doesn't exist)* | `[S1], [S2], [S3] \| [Brand]` | 🟢 NEW (needed) |
| **Contact** | *(doesn't exist)* | `Contact [Brand] - [City]` | 🟢 NEW (needed) |

---

## IMPLEMENTATION ROADMAP

### PHASE 1: Immediate (This Week)
1. ✅ Collect business context from Silas (service, location, brand name)
2. ✅ Update homepage title using template above
3. ✅ Delete "Hello World" post (or optimize if keeping)
4. ✅ Configure RankMath title template for future posts

**Method:** 
- Use RankMath Pro plugin (recommended)
- OR manually edit in WordPress post editor
- OR use theme customizer if available

### PHASE 2: Content Structure (Next Week)
1. Create About page with optimized title
2. Create Services overview page with title
3. Create Contact page with title
4. Create first service page with location silo title

### PHASE 3: Ongoing
1. Create city hub pages (each with location silo title)
2. Create neighborhood/service pages (each with unique title)
3. Monitor performance in Google Search Console
4. Refine titles based on CTR data

---

## RANKMATH SETUP (Recommended Tool)

**Why RankMath?**
- Auto-generates title tags based on templates
- Prevents duplicate titles
- Provides real-time character count
- Integrates schema markup

**Template Configuration in RankMath:**

```
Homepage Template: %primary_keyword% in %location% | %site_title%
Post Template: %post_title% | %site_title% - %post_category%
Page Template: %page_title% | %site_title%
```

**Variables to define:**
- `%primary_keyword%` = Service offered
- `%location%` = City, State
- `%site_title%` = Business name
- `%post_title%` = Individual post/page title
- `%post_category%` = Category name (optional)

---

## TITLE TAG RULES FOR FUTURE CONTENT

When Silas/Builder create new pages, follow these rules:

### ✅ DO:
- Include primary keyword early (within first 25 characters)
- Include location (city, state, or service area)
- Keep 50-60 characters (allows full display in search results)
- Include brand/business name
- Use pipe `|` or dash `–` as separator
- Create unique titles for each page (no duplicates)
- Match H1 to title concept (don't need to be identical)

### ❌ DON'T:
- Stuff keywords: `"HVAC Repair HVAC Service HVAC Emergency HVAC"`
- Use all caps: `"HVAC REPAIR IN CHICAGO"`
- Exceed 70 characters (gets cut off in search results)
- Use generic titles: `"Home," "Service," "Blog Post"`
- Mix locations: `"Denver, Colorado, Metro Area, Fort Collins"`
- Add numbers or special characters unnecessarily

---

## VERIFICATION CHECKLIST

After implementation, verify:

| Check | Status | Method |
|---|---|---|
| Homepage title 50-60 chars | ⏳ | Google Search Console or PageSpeed Insights |
| Post titles unique (no dupes) | ⏳ | GSC Coverage report |
| All titles include keyword + location | ⏳ | Manual review of top 10 pages |
| No title tag warnings in RankMath | ⏳ | RankMath editor dashboard |
| CTR improving in GSC | ⏳ | GSC Performance report (30 days) |
| No "Missing meta description" errors | ⏳ | GSC Coverage report |

---

## EXAMPLE COMPLETED VERSIONS

### Example 1: Chicago HVAC Company
**Business Name:** Elite Heating & Cooling  
**Primary Service:** HVAC Repair & Installation  
**Location:** Chicago, IL  

**Homepage:**
- **Old:** `darkgreen-moose-683278.hostingersite.com`
- **New:** `HVAC Repair Chicago IL | Elite Heating & Cooling`
- **Length:** 57 characters ✅
- **Keywords:** HVAC, Repair, Chicago, IL, Brand

**Service Page (AC Repair):**
- **Title:** `Air Conditioning Repair Chicago | Elite Heating`
- **Length:** 50 characters ✅

---

### Example 2: Denver Plumbing Company
**Business Name:** Rocky Mountain Plumbing  
**Primary Service:** Emergency Plumbing  
**Locations:** Denver, Boulder, Littleton  

**Homepage:**
- **Old:** `darkgreen-moose-683278.hostingersite.com`
- **New:** `Emergency Plumber Denver CO | Rocky Mountain`
- **Length:** 49 characters ✅
- **Keywords:** Emergency, Plumber, Denver, CO, Brand

**Service Page (Water Heater):**
- **Title:** `Water Heater Repair Denver | Rocky Mountain`
- **Length:** 45 characters ✅

---

## DELIVERABLES REQUIRED FROM SILAS

Please provide (can be in Slack, email, or project brief):

```
Business Name: [exact GBP name]
Primary Service: [main service offered]
City: [primary service area]
State: [state code]
Secondary Services: [up to 5 additional services]
Differentiator: [24/7, Licensed, Family-Owned, etc.]
Service Areas: [list of cities/neighborhoods]
Website Goal: [leads, appointments, e-commerce]
```

**Once received, specifications can be finalized and handed to execution agent.**

---

## SIGN-OFF & NEXT STEPS

**Current Status:** 🟡 **INCOMPLETE** — Awaiting business context from Silas

**Dependencies:**
- [ ] Silas provides business details (service, location, brand)
- [ ] Execution agent installs RankMath Pro
- [ ] Execution agent configures title templates
- [ ] Execution agent updates homepage title
- [ ] Execution agent deletes "Hello World" post

**Timeline:**
- Week 1: Homepage title + Hello World removal
- Week 2: Service page title structure
- Ongoing: New page title templates

**Ownership:**
- **Silas:** Provide business context
- **Specs (this report):** Frameworks & templates
- **Execution Agent:** Implement in WordPress

---

## APPENDIX: Title Tag Character Limits by Search Engine

| Search Engine | Display Width (Desktop) | Display Width (Mobile) |
|---|---|---|
| Google | ~60 characters | ~54 characters |
| Bing | ~65 characters | ~60 characters |
| DuckDuckGo | ~60 characters | ~54 characters |

**Recommendation:** Target 50-60 characters to ensure full visibility across all search engines on all devices.

---

**Report saved to:** `C:\Users\spart\.openclaw\deliverables\localcatalyst\specs\2026-02-10-title-tag-optimization.md`

*Ready for execution once business context is provided.*