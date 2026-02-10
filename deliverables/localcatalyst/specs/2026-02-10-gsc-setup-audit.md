# Google Search Console Setup & Verification Audit
**Client:** LocalCatalyst  
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Date:** 2026-02-10  
**Agent:** Specs  
**Status:** Ready for Implementation  

---

## Executive Summary

The LocalCatalyst site is live but **not crawlable by Google** due to a critical robots.txt configuration. The XML sitemap is properly generated, but Google cannot access it. This audit identifies all blockers and provides step-by-step recommendations for GSC verification, sitemap submission, and baseline performance tracking.

**Priority Level:** CRITICAL (must fix robots.txt immediately)

---

## Current State Analysis

### ✅ What's Working
- **Domain:** Live and responding (HTTP 200)
- **Sitemap:** Generated automatically by WordPress
  - Endpoint: `https://darkgreen-moose-683278.hostingersite.com/sitemap.xml` (redirects to `/wp-sitemap.xml`)
  - Format: Valid XML sitemap index with 4 sub-sitemaps
  - Contents: Posts, Pages, Categories, Users
- **WordPress REST API:** Accessible (allows content audit)
- **HTTPS:** Enforced (secure connection)

### ❌ Critical Issues
1. **Googlebot Blocked in robots.txt** ⚠️ BLOCKING ISSUE
2. **Site Not Indexed** — No results in Google search (due to robots.txt block)
3. **No GSC Verification** — Domain ownership not verified in Search Console
4. **No Baseline Performance Tracking** — GA4 not linked to GSC

---

## Issue Details & Recommendations

### 1. CRITICAL: robots.txt Configuration Blocking Google

**Current robots.txt:**
```
User-agent: Googlebot
Disallow: /

User-agent: *
Allow: /
```

**Problem:**
- Googlebot is explicitly denied access to the entire site (`Disallow: /`)
- This prevents Google from crawling and indexing any content
- Site will never appear in search results while this is active

**Recommended Fix:**
```
User-agent: *
Allow: /

# Disallow private areas (if applicable)
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/uploads/private/

# Crawl delay to prevent server overload
Crawl-delay: 1

# Point to sitemap
Sitemap: https://darkgreen-moose-683278.hostingersite.com/sitemap.xml
```

**Before/After Comparison:**
| Aspect | Before | After |
|--------|--------|-------|
| Googlebot Access | Blocked (Disallow: /) | Allowed (Allow: /) |
| WordPress Admin | Not specified | Explicitly blocked (Disallow: /wp-admin/) |
| Sitemap Reference | Missing | Added at end of file |
| Other Bots | Allowed | Allowed (unchanged) |

**Action:** Update robots.txt file on the web server.

---

### 2. Google Search Console Ownership Verification

**Current Status:** Not verified  
**Domain:** darkgreen-moose-683278.hostingersite.com

**Verification Methods Available (in priority order):**

#### Option A: HTML Tag (Recommended for WordPress)
1. Log into WordPress Dashboard → Tools → Site Health
2. In GSC, select "HTML tag" as verification method
3. Copy the meta tag: `<meta name="google-site-verification" content="[UNIQUE_CODE]" />`
4. Add to WordPress theme header via:
   - **Yoast SEO** (if installed): SEO → Settings → Webmaster Tools → Google Search Console
   - **RankMath** (if installed): RankMath → Search Console → Connect/Add
   - **Manual:** Add via header via wp-config or child theme's functions.php
5. Return to GSC and click "Verify"

#### Option B: DNS Record Verification
1. Access domain registrar/host DNS settings
2. Add TXT record: `google-site-verification=[UNIQUE_CODE]`
3. Wait for DNS propagation (15 min to 48 hours)
4. Click "Verify" in GSC

#### Option C: File Upload
1. Download verification HTML file from GSC
2. Upload to domain root via FTP/Hosting File Manager
3. Click "Verify" in GSC

**Recommended Approach:** HTML Tag via RankMath (once RankMath is installed during implementation)

---

### 3. XML Sitemap Submission

**Current Sitemap Status:** ✅ Present and Valid

**Sitemap Details:**
- **Master Sitemap Index:** `https://darkgreen-moose-683278.hostingersite.com/sitemap.xml`
- **Redirects to:** `https://darkgreen-moose-683278.hostingersite.com/wp-sitemap.xml`
- **Sub-sitemaps identified:**
  - `wp-sitemap-posts-post-1.xml` (Blog posts)
  - `wp-sitemap-posts-page-1.xml` (Pages)
  - `wp-sitemap-taxonomies-category-1.xml` (Categories)
  - `wp-sitemap-users-1.xml` (Authors/Users)

**Submission Steps (after robots.txt is fixed and ownership verified):**
1. Log into Google Search Console
2. Left sidebar → Sitemaps
3. Click "Add/Test Sitemap"
4. Enter: `https://darkgreen-moose-683278.hostingersite.com/sitemap.xml`
5. Click "Submit"
6. Monitor processing (takes 1-3 hours, then weekly updates)

**Expected Outcome After Submission:**
- GSC shows sitemap as "Success"
- Displays count of submitted/indexed URLs
- Crawl stats begin showing in reports
- Google crawls site per sitemap schedule

---

### 4. Security & Manual Actions Check

**Current Status:** ✅ No apparent security issues detected

**Verification Checklist:**
- [ ] Check GSC for manual actions (spam, hacked content, etc.)
- [ ] Verify no malware indicators
- [ ] Confirm HTTPS properly enforced
- [ ] Check for mixed content warnings

**Detailed Verification Process (after GSC access established):**
1. GSC Security → Security Issues panel
2. Check for:
   - "Hacked Content" alerts
   - "Spam" notifications
   - "Structured Data" errors
3. GSC → Enhancements → Mobile Usability
4. GSC → Legacy Tools → Fetch as Google (test crawl)

**Expected Finding:** No issues (site is fresh and clean)

---

### 5. Baseline Performance Tracking Setup

**Goal:** Establish performance baseline before optimization

#### 5.1 Core Web Vitals Baseline
GSC provides automatic CWV tracking after verification:
- **LCP (Largest Contentful Paint):** Target < 2.5s
- **CLS (Cumulative Layout Shift):** Target < 0.1
- **INP (Interaction to Next Paint):** Target < 200ms

**Baseline Collection Timeline:**
- Week 1: Setup GSC + GA4 connection
- Week 2-4: Collect 28 days of data
- After Week 4: Generate baseline report with recommendations

#### 5.2 Link GSC to Google Analytics 4

**Current GA4 Status:** ⚠️ Unknown (requires verification during implementation)

**Steps to Link:**
1. Log into Google Analytics 4 property
2. Admin → Data Streams → [Select web stream]
3. Scroll down → Google Search Console Link
4. Click "Link Google Search Console" 
5. Select domain: `darkgreen-moose-683278.hostingersite.com`
6. Authorize and confirm

**Data Available After Linking:**
- Search traffic (queries, impressions, clicks, CTR)
- Keyword performance by page
- Landing page analysis
- Device/query type breakdowns

#### 5.3 Establish Crawl Stats Baseline
After GSC verification, track:
- Total URLs crawled per day
- Crawl time (ms average)
- 404 errors and redirects
- Robot exclusions (blocked by robots.txt)

**Initial Metrics to Document:**
| Metric | Expected Value | Baseline Goal |
|--------|---|---|
| URLs Crawled/Day | Starts low (10-50) | Establish pattern |
| Avg Crawl Time | ~200-500ms | Monitor for changes |
| Crawl Errors | 0 | Keep at 0 |
| Blocks by robots.txt | 0 | Keep at 0 |

---

## Implementation Checklist

### Phase 1: Pre-Verification (Critical - Do First)
- [ ] **Update robots.txt** — Remove Googlebot `Disallow: /` directive
- [ ] **Verify content accessibility** — Confirm site pages are crawlable
- [ ] **Check for staging/test content** — Remove if not needed for GSC

### Phase 2: Google Search Console Setup
- [ ] Create GSC property: `https://darkgreen-moose-683278.hostingersite.com`
- [ ] Verify ownership via HTML tag (preferred) or DNS
- [ ] Add secondary verification method (DNS backup)
- [ ] Confirm verification successful

### Phase 3: Sitemap & Indexing
- [ ] Submit XML sitemap: `https://darkgreen-moose-683278.hostingersite.com/sitemap.xml`
- [ ] Monitor sitemap processing (GSC → Sitemaps panel)
- [ ] Check initial crawl stats
- [ ] Request indexing for priority pages (if needed)

### Phase 4: Security & Performance Baseline
- [ ] Review GSC Security Issues panel (expect: none)
- [ ] Link GA4 to GSC (search performance data)
- [ ] Document baseline Core Web Vitals
- [ ] Set up crawl stats monitoring

### Phase 5: Ongoing Monitoring
- [ ] Monitor crawl stats weekly
- [ ] Review Search Performance report in GSC
- [ ] Track Core Web Vitals from GSC dashboard
- [ ] Address any crawl errors within 48 hours

---

## Technical Specifications for Implementation

### robots.txt Update
**File Location:** Domain root (`/robots.txt`)  
**Current Size:** 58 bytes  
**Recommended Size:** ~200-300 bytes  
**Change Type:** Full replacement of content  

**Current Content to Replace:**
```
User-agent: Googlebot
Disallow: /

User-agent: *
Allow: /
```

**New Content:**
```
User-agent: *
Allow: /

# Disallow private WordPress areas
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/uploads/private/

# Reduce server load
Crawl-delay: 1

# Sitemap location
Sitemap: https://darkgreen-moose-683278.hostingersite.com/sitemap.xml
```

### GSC HTML Tag Verification
**Tag Format:**
```html
<meta name="google-site-verification" content="[GSC_WILL_PROVIDE]" />
```

**Placement:** WordPress `<head>` section (via RankMath or theme)  
**Verification Method:** Automatic (GSC checks on demand)

---

## Expected Outcomes & Timeline

### Immediate (Day 1-2)
- ✅ robots.txt fixed → Googlebot can now crawl
- ✅ GSC ownership verified
- ✅ Sitemap submitted
- ⏳ Google begins initial crawl

### Short-term (Week 1-2)
- ✅ 5-20 pages crawled and indexed
- ✅ First search query impressions appear
- ✅ Crawl stats baseline established
- ✅ Security check completed (no issues)

### Medium-term (Week 3-4)
- ✅ 28-day Core Web Vitals data collected
- ✅ Search Performance baseline available
- ✅ GA4-GSC link active, search data flowing
- ✅ Crawl patterns stabilized

### Before Next Phase
- All GSC panels showing data
- No crawl errors or security issues
- Performance baseline documented
- Ready for content/on-page optimization

---

## Dependencies & Handoffs

**Depends On:**
- Site ownership credentials (provided by client or hosting)
- Google account access (client's GSC admin account)
- WordPress admin access (for RankMath installation, if used)

**Hands Off To:**
- **Silas** — Quality audit using GSC baseline data
- **Lookout** — Ongoing performance monitoring & alerts
- **Builder/Wrench** — Content & on-page optimization (after baseline)

---

## Notes for Implementation Team

1. **Robots.txt is the blocker** — Until this is fixed, Google cannot crawl the site. Prioritize this.
2. **Fresh domain timing** — Site is new to Google, so crawl frequency will be low initially. This is normal.
3. **No manual actions expected** — Site is clean with no apparent security issues.
4. **Sitemap is ready** — WordPress automatically generated and maintains the sitemap; no manual updates needed.
5. **Performance baseline critical** — Collect 28 days of data before optimizing; this establishes the before/after comparison.

---

## QA Checklist for Completion

- [ ] robots.txt confirmed updated (Googlebot `Disallow` removed)
- [ ] GSC shows domain as "Verified" 
- [ ] Sitemap shows as "Success" in GSC Sitemaps panel
- [ ] Initial crawl results visible in GSC Coverage report
- [ ] No errors in GSC Security Issues or Enhancements panels
- [ ] GA4 linked to GSC (Search Performance data flowing)
- [ ] Core Web Vitals baseline documented
- [ ] Crawl stats monitoring initiated
- [ ] Deliverable review completed by Silas

---

**Prepared by:** Specs (Technical SEO Agent)  
**Status:** Ready for execution  
**Next Review:** After implementation complete (2026-02-12)