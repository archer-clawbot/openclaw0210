# LocalCatalyst — Google Search Console Setup & Verification Guide
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Date:** February 10, 2026  
**Agent:** Specs  
**Phase:** Foundation (Phase 1)  

---

## EXECUTIVE SUMMARY

Google Search Console (GSC) is **mandatory** for:
- Indexing monitoring & control
- Search performance data (clicks, impressions, CTR, position)
- Crawl error detection
- XML sitemap submission & monitoring
- URL inspection and re-indexing requests
- Mobile usability & structured data issues

**Current Status:** 🔴 **NOT VERIFIED** in any GSC property

**This guide provides:**
1. Step-by-step GSC property creation
2. Three verification methods (DNS, HTML tag, Google Analytics)
3. Sitemap submission process
4. Post-verification checklist

---

## PART 1: UNDERSTANDING GSC PROPERTY VARIANTS

Before verifying, understand that GSC treats these as **separate properties**:

| Property | Example | Preferred? | Notes |
|---|---|---|---|
| **Domain** (recommended) | `darkgreen-moose-683278.hostingersite.com` | ✅ YES | Covers all URL variants (http/https, www/non-www) |
| **URL Prefix** (alternative) | `https://darkgreen-moose-683278.hostingersite.com/` | ⚠️ Only if domain won't verify | Only covers exact protocol & www structure |

**Recommendation:** Verify as a **Domain property** (not URL Prefix). This covers:
- ✅ `https://darkgreen-moose-683278.hostingersite.com`
- ✅ `https://www.darkgreen-moose-683278.hostingersite.com` (if applicable)
- ✅ `http://darkgreen-moose-683278.hostingersite.com` (HTTP, though 301 redirects to HTTPS)

---

## PART 2: VERIFICATION METHOD OPTIONS

Three methods available. **Recommended: Method 1 (DNS)** for Hostinger-hosted sites.

### Method 1: DNS Verification ✅ **RECOMMENDED FOR HOSTINGER**

**Why:** 
- Most reliable for Hostinger domains
- Permanent verification (not dependent on single file)
- One-time setup

**Prerequisites:**
- Access to domain registrar DNS settings (Hostinger control panel)
- Domain registered/purchased through Hostinger or accessible via nameservers

**Step-by-Step:**

#### 1A. Get Verification Record from GSC

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add property"** (top left)
3. Choose **Domain** (not URL Prefix)
4. Enter: `darkgreen-moose-683278.hostingersite.com`
5. Click **Continue**
6. Google displays a **TXT record** like:
   ```
   TXT Record Name: _acm-challenge.darkgreen-moose-683278.hostingersite.com
   TXT Record Value: xyz123abc456...
   ```
7. **Copy both the name and value** (keep this tab open)

#### 1B. Add TXT Record to Hostinger DNS

1. Go to [Hostinger Control Panel](https://hpanel.hostinger.com/)
2. Navigate: **Domains** → `darkgreen-moose-683278.hostingersite.com` → **DNS Zone**
3. Look for existing DNS records (A, CNAME, MX, etc.)
4. Click **Add Record** or **+ Add DNS Record**
5. Fill in:
   - **Type:** TXT
   - **Name:** `_acm-challenge` (Hostinger auto-appends domain)
   - **Value:** Paste the TXT record value from GSC (the long string)
   - **TTL:** 3600 (default)
6. Click **Save/Add**
7. **Wait 5-30 minutes** for DNS propagation
   - Check propagation: [MXToolbox DNS Checker](https://mxtoolbox.com/dnschecker.aspx)
   - Or [Google DNS Checker](https://dns.google/query?name=_acm-challenge.darkgreen-moose-683278.hostingersite.com&type=TXT)

#### 1C. Complete Verification in GSC

1. Return to GSC tab with verification form
2. Click **Verify** button
3. Wait for confirmation (typically 1-5 minutes, sometimes up to 24 hours)
4. GSC displays: ✅ **"Verification successful"**
5. Property is now verified

**Pros:**
- Works instantly on most Hostinger domains
- Permanent (doesn't require file maintenance)
- Covers all URL variants

**Cons:**
- Requires DNS access
- Requires DNS propagation time

---

### Method 2: HTML Tag Verification ⚠️ **Backup Option**

**Use if DNS method fails.**

**Step-by-Step:**

#### 2A. Get HTML Tag from GSC

1. In GSC property creation, select **HTML tag** verification method
2. Copy the tag:
   ```html
   <meta name="google-site-verification" content="abc123xyz...">
   ```

#### 2B. Add to Website Header

**Option A: Using RankMath Plugin (Easiest)**
1. Install RankMath Pro (if not already done)
2. Go to **RankMath** → **General Settings** → **Webmaster Tools**
3. Paste the verification code in **Google Search Console** field
4. Save
5. RankMath auto-adds the tag to `<head>`

**Option B: Manual Edit to Theme Header**
1. In WordPress: **Appearance** → **Theme File Editor**
2. Open `header.php`
3. Find `</head>` closing tag
4. Add above it:
   ```html
   <meta name="google-site-verification" content="abc123xyz...">
   ```
5. Save file

**Option C: Using Google Site Kit Plugin (Recommended)**
1. Install Google Site Kit plugin
2. Authenticate with Google Account
3. Plugin auto-verifies and adds tags
4. Handles GSC, GA4, and other tools integration

#### 2C. Complete Verification in GSC

1. Return to GSC verification form
2. Click **Verify**
3. GSC crawls site, finds tag, confirms verification

**Pros:**
- Works without DNS access
- Instant (if Site Kit used)

**Cons:**
- Dependent on specific file/tag (if file deleted, verification breaks)
- Requires WordPress access

---

### Method 3: Google Analytics Verification ⚠️ **Only if GA4 Already Set Up**

**Use only if Google Site Kit or GA4 already linked.**

1. In GSC, select **Google Analytics** method
2. If GA4 property linked to domain, GSC auto-verifies
3. No additional action needed

**Pros:**
- Instant if GA4 already installed

**Cons:**
- Only works if GA4 is current and properly linked
- Creates dependency between two tools

---

## PART 3: RECOMMENDED VERIFICATION SETUP

### For LocalCatalyst (Hostinger-Hosted Domain)

**Primary Method:** DNS (Method 1)  
**Backup Method:** HTML Tag (Method 2) via Google Site Kit  

**Step Summary:**
1. ✅ Use DNS verification (recommended for all Hostinger domains)
2. ✅ Add TXT record to Hostinger DNS Zone
3. ✅ Wait 10-30 minutes for propagation
4. ✅ Click Verify in GSC
5. ✅ Once verified, install Google Site Kit (will auto-add supplemental verification tags)
6. ✅ Link GA4 property in Site Kit

**Advantages:**
- Multiple verification layers (if one breaks, others maintain verification)
- Integrates GSC + GA4 + GA setup in one tool
- Permanent (DNS doesn't depend on file)
- Safest approach

---

## PART 4: PROPERTY VARIANTS TO VERIFY

After verifying the **Domain property**, GSC may prompt you to verify variants:

| Variant | Example | Action |
|---|---|---|
| **HTTP (insecure)** | `http://darkgreen-moose-683278.hostingersite.com` | Link to HTTPS via 301 redirect (auto-detected) |
| **www subdomain** | `www.darkgreen-moose-683278.hostingersite.com` | Link to primary domain (auto-detected) |
| **URL Prefix only** | `https://darkgreen-moose-683278.hostingersite.com/` | No action needed (covered by domain property) |

**Note:** If using Domain property verification, Google automatically links these variants after 1-2 weeks.

---

## PART 5: POST-VERIFICATION: SITEMAP SUBMISSION

### 5A. Verify Sitemap Exists

Check if WordPress sitemap is live:
- Go to: `https://darkgreen-moose-683278.hostingersite.com/sitemap.xml`
- Should return XML file with sitemap index
- Example structure:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://darkgreen-moose-683278.hostingersite.com/wp-sitemap-posts-post-1.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://darkgreen-moose-683278.hostingersite.com/wp-sitemap-posts-page-1.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://darkgreen-moose-683278.hostingersite.com/wp-sitemap-taxonomies-category-1.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://darkgreen-moose-683278.hostingersite.com/wp-sitemap-users-1.xml</loc>
    </sitemap>
  </sitemapindex>
  ```

✅ **Status:** Sitemap exists and is auto-generated by WordPress

### 5B. Submit Sitemap to GSC

1. In GSC, go to **Sitemaps** (left sidebar)
2. Click **Add/Test sitemap**
3. Enter: `sitemap.xml`
4. Click **Submit**
5. GSC shows:
   - **Submitted sitemaps:** 1
   - **Discovered pages:** [number from WordPress]
   - **Status:** Pending/Processing → Success (within 24 hours)

### 5C. Verify Sitemap Health

After 24 hours, check:
1. **Sitemaps** page in GSC
2. Look at:
   - **Indexed sitemaps:** Should show `sitemap.xml`
   - **Indexed URLs from sitemaps:** Count of pages GSC found
   - **Indexation status:** Hover over to see coverage

**Expected Results:**
- ✅ Sitemap submitted and crawled
- ✅ WordPress posts indexed
- ✅ Pages indexed (if any exist)
- ⚠️ Some author/category pages may show as excluded (normal)

---

## PART 6: INITIAL GSC DATA REVIEW (First 72 Hours)

After verification & sitemap submission, GSC shows initial data within 24-72 hours.

### What to Expect

| Metric | Expected | What It Means |
|---|---|---|
| **Coverage** | Shows pages discovered | All WordPress pages found |
| **Indexed** | 1-5 pages initially | Blog post + homepage (at minimum) |
| **Excluded** | Author pages, category archives | Normal (these are auto-excluded) |
| **Not indexed** | 0 (if robots.txt fixed) | Pages exist but Google hasn't crawled yet |
| **Performance** | 0 clicks/impressions initially | Too new for search visibility (wait 7-14 days) |

### Initial Crawl Errors

GSC may show:
- ✅ **"Excluded by robots.txt"** on author/category pages (normal)
- ✅ **"Crawl anomaly"** (temporary network issue, auto-resolves)
- ❌ **"Server error (5xx)"** (contact hosting provider)
- ❌ **"Redirect error"** (check SSL/HTTPS setup)

---

## PART 7: VERIFICATION CHECKLIST

### Pre-Verification

- [ ] Domain is publicly accessible (not in maintenance mode)
- [ ] SSL certificate valid (HTTPS works without browser warnings)
- [ ] robots.txt is fixed (allows Googlebot, not disallowing all)
- [ ] Sitemap.xml exists at root
- [ ] At least 1 page is published (Hello World post counts)

### Verification Process

- [ ] Google account created/logged in
- [ ] GSC property created (choose Domain, not URL Prefix)
- [ ] Verification method selected (DNS recommended)
- [ ] Verification record added to Hostinger DNS
- [ ] DNS propagation confirmed (5-30 minutes wait)
- [ ] Verification completed in GSC ✅
- [ ] GSC shows "Verified" status

### Post-Verification

- [ ] Sitemap.xml submitted to GSC
- [ ] GSC shows sitemap processed (24 hours)
- [ ] Coverage report shows pages indexed
- [ ] No critical crawl errors
- [ ] Google Site Kit installed (optional but recommended)
- [ ] GA4 property linked (in Site Kit)

---

## PART 8: TROUBLESHOOTING

### Problem: DNS Verification Fails After 24 Hours

**Cause:** TXT record not propagating  
**Solution:**
1. Verify TXT record in Hostinger DNS is correct
2. Check propagation: [mxtoolbox.com/dnschecker.aspx](https://mxtoolbox.com/dnschecker.aspx)
3. If TXT still not visible, wait another 24 hours
4. If still failing after 48 hours, contact Hostinger support

### Problem: "Ownership Verification Already Exists"

**Cause:** Domain already verified on another Google Account  
**Solution:**
1. Use same Google account that originally verified
2. OR contact Hostinger support to reset verification
3. OR use HTML Tag verification method on a different property

### Problem: robots.txt Still Blocking Googlebot

**Cause:** robots.txt not updated from earlier audit  
**Solution:**
1. Fix robots.txt immediately (see earlier audit)
2. Once fixed, GSC will re-crawl within 1-7 days
3. Manually request indexing for important pages

### Problem: Sitemap Shows "0 Indexed URLs"

**Cause:** 
- sitemap.xml not properly formatted
- Pages are noindex'd
- robots.txt blocking sitemap

**Solution:**
1. Verify sitemap.xml is valid (visit URL directly)
2. Check GSC Coverage report for specific pages
3. Request indexing for individual pages via URL Inspection tool

### Problem: "404 Error" on Homepage

**Cause:** Site may be down or redirecting incorrectly  
**Solution:**
1. Test: Visit `https://darkgreen-moose-683278.hostingersite.com` directly
2. Ensure HTTPS is working (no SSL errors)
3. Check WordPress installation is complete
4. Contact Hostinger if domain/hosting issue

---

## PART 9: ONGOING GSC MONITORING (After Verification)

Once verified, set these monitoring practices:

### Weekly Checks
1. **Coverage Report** — Any new excluded pages?
2. **Performance Report** — Any new queries indexed?
3. **Mobile Usability** — Any new mobile errors?
4. **Security Issues** — Any malware/hacking alerts?

### Monthly Actions
1. Submit new pages/posts via URL Inspection tool
2. Review crawl stats (crawl budget usage)
3. Check for new 404 errors or redirect chains
4. Update internal links if broken

### Quarterly Reviews
1. Analyze performance trends (CTR, position, impressions)
2. Identify low-performing pages to optimize
3. Audit title/meta tags for top pages
4. Plan content updates based on GSC data

---

## PART 10: VERIFICATION RECORD EXAMPLE

Here's what execution agent will see and use:

### GSC Property Details

| Field | Value |
|---|---|
| **Property Type** | Domain |
| **Property URL** | `darkgreen-moose-683278.hostingersite.com` |
| **Verification Method** | DNS (TXT Record) |
| **Verification Status** | ⏳ Pending |
| **Date Verified** | [After DNS propagation] |
| **Property ID** | [Auto-generated by GSC] |

### DNS Record to Add (Example)

```
Hostinger DNS Zone Edit:
───────────────────────────────────
Type: TXT
Name: _acm-challenge
Value: YOUR-UNIQUE-VERIFICATION-STRING-HERE
TTL: 3600
───────────────────────────────────
```

### Sitemap Submission Details

```
Sitemap URL: /sitemap.xml
Full URL: https://darkgreen-moose-683278.hostingersite.com/sitemap.xml
Status: Submitted
Expected Processing: 24-72 hours
```

---

## PART 11: IMPLEMENTATION TIMELINE

### Day 1 (This Week)
1. ✅ Get GSC verification TXT record from Google Search Console
2. ✅ Add TXT record to Hostinger DNS Zone
3. ✅ Wait 15-30 minutes for DNS propagation
4. ✅ Complete verification in GSC

### Day 2 (Next Day)
1. ✅ Confirm GSC shows "Verified" status
2. ✅ Submit sitemap.xml to GSC
3. ✅ Install Google Site Kit plugin (optional)
4. ✅ Link GA4 property in Site Kit (if not done)

### Day 3-7 (First Week)
1. ✅ Monitor GSC Coverage report
2. ✅ Check for crawl errors or warnings
3. ✅ Verify sitemap pages indexed
4. ✅ Request indexing for key pages (if needed)

### Ongoing (Every Month)
1. ✅ Monitor coverage and performance data
2. ✅ Submit new pages via URL Inspection
3. ✅ Check for 404s or redirect errors
4. ✅ Use performance data for content optimization

---

## PART 12: GSC INTEGRATIONS (OPTIONAL BUT RECOMMENDED)

### Google Site Kit
- **Why:** One-stop dashboard for GSC + GA4 + Analytics insights
- **Setup:** Install plugin → Authenticate Google Account → Auto-links GSC
- **Benefit:** See all data in WordPress admin dashboard

### Google Analytics 4
- **Why:** Track conversions, user behavior, acquisition channels
- **Setup:** Create GA4 property → Link in GSC → Set conversion events
- **Benefit:** Correlate organic search traffic with goal completions

### Bing Webmaster Tools
- **Why:** Secondary search engine verification (10-15% of searches)
- **Setup:** Add property → Verify via same DNS/HTML tag → Submit sitemap
- **Benefit:** Monitor Bing-specific crawling and performance data

---

## PART 13: SUCCESS METRICS

### After 48 Hours (Initial Verification)
✅ GSC shows "Verification successful"  
✅ Property dashboard accessible  
✅ Sitemap submitted and processing  

### After 7 Days
✅ Coverage report shows pages indexed  
✅ Sitemap fully processed (100% status)  
✅ No critical crawl errors  

### After 14 Days
✅ Performance report shows impressions (site appearing in search results)  
✅ At least 1 organic search click (if public-facing content exists)  
✅ Crawl stats showing regular Google bot visits  

### After 30 Days
✅ Stable coverage (consistent page count)  
✅ Performance data shows click trends  
✅ Opportunity to optimize pages based on GSC data  

---

## FINAL SIGN-OFF

**Current Status:** 🔴 **NOT VERIFIED**

**Next Action:** Execution agent implements:
1. Create GSC Domain property
2. Get DNS verification TXT record
3. Add TXT to Hostinger DNS
4. Complete verification
5. Submit sitemap.xml
6. Monitor Coverage report

**Estimated Time to Complete:** 30-45 minutes (including DNS propagation)

**Handoff Ready:** ✅ This guide provides step-by-step instructions for execution agent

---

## APPENDIX: Quick Reference URLs

| Tool | URL |
|---|---|
| Google Search Console | https://search.google.com/search-console |
| Hostinger DNS Manager | https://hpanel.hostinger.com/ → Domains → DNS |
| Sitemap Status | https://darkgreen-moose-683278.hostingersite.com/sitemap.xml |
| DNS Propagation Check | https://mxtoolbox.com/dnschecker.aspx |
| Mobile-Friendly Test | https://search.google.com/test/mobile-friendly |
| URL Inspection Tool | https://search.google.com/search-console/inspect |

---

**Report saved to:** `C:\Users\spart\.openclaw\deliverables\localcatalyst\specs\2026-02-10-gsc-setup-verification.md`

*Awaiting execution agent to implement GSC verification.*