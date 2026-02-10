# Google Search Console Setup & Verification
**Chicago's Electrician | chicagoselectrician.com**

**Date:** 2026-02-09  
**Agent:** Specs  
**Status:** Setup Instructions (Ready to Execute)

---

## Executive Summary

Chicago's Electrician is ready for Google Search Console verification and sitemap submission. The site has:
- ✅ XML sitemap properly configured (Rank Math SEO)
- ✅ Robots.txt correctly set up
- ✅ HTTPS enforced
- ✅ Clean URL structure

**Next steps:** Verify ownership in GSC and submit sitemap.

---

## 1. Current Technical Status

### Sitemap Configuration
- **Sitemap Index:** https://www.chicagoselectrician.com/sitemap_index.xml
- **Type:** Rank Math SEO-generated XML sitemap index
- **Child Sitemaps:**
  - Post sitemap: https://www.chicagoselectrician.com/post-sitemap.xml
  - Page sitemap: https://www.chicagoselectrician.com/page-sitemap.xml
- **Status:** ✅ Active and valid

### Robots.txt Status
- **Location:** https://www.chicagoselectrician.com/robots.txt
- **Crawler Access:** Fully allowed for all bots
- **WP-Admin:** Disallowed (correct for security)
- **AJAX:** Allowed (correct)
- **Sitemap Reference:** Present and pointing to correct location
- **Status:** ✅ Properly configured

### Site Accessibility
- **Protocol:** HTTPS enforced ✅
- **Response:** HTTP 200 (OK) ✅
- **Title Tag:** "MCC Electric | 24 Hour Electricians in Chicago | Electrical Services" ✅
- **Homepage Meta:** Present and descriptive ✅

---

## 2. Google Search Console Verification Steps

### Step 1: Access Google Search Console

1. Go to [https://search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with the Google account that will manage this property (recommend: business Gmail or Google Workspace account)
3. Click **"Start now"** or the **"+"** button to add a property

### Step 2: Select Property Type

Choose **URL prefix** (recommended for this site):
- Enter: `https://www.chicagoselectrician.com`
- This method verifies the specific protocol and subdomain

### Step 3: Verify Ownership

**Recommended method: HTML tag** (easiest for WordPress)

1. GSC will generate an HTML verification tag
2. Copy the entire `<meta>` tag
3. Access WordPress admin:
   - URL: https://www.chicagoselectrician.com/wp-admin
   - Username: `archer`
   - Password: Use app password (see TOOLS.md)
4. Navigate to **Rank Math SEO > Settings > Webmaster Tools**
5. Find the **Google Search Console verification** field
6. Paste the meta tag into the verification field
7. Save settings
8. Return to GSC and click **"Verify"**

**Alternative methods** (if HTML tag fails):
- **DNS record:** Add TXT record to domain DNS (requires hosting/DNS access)
- **Google Analytics:** If GA4 already installed (see Step 4)
- **Google Tag Manager:** If GTM already installed

### Step 4: Complete Ownership Verification

- GSC will confirm verification within seconds to minutes
- Once verified, the property dashboard opens automatically
- Property status should show **"Verified"** in the property settings

---

## 3. Submit XML Sitemap

Once ownership is verified:

1. **In GSC Dashboard**, left sidebar → **Sitemaps**
2. Click **"New sitemap"**
3. Enter sitemap URL: `sitemap_index.xml`
   - GSC will auto-complete to: `https://www.chicagoselectrician.com/sitemap_index.xml`
4. Click **"Submit"**
5. GSC will show:
   - **Submitted date/time**
   - **Status** (usually "Success" within hours)
   - **Number of URLs indexed** (will update as Google crawls)

### Sitemap Monitoring

After submission, check:
- **Sitemaps dashboard** → Shows status of all submitted sitemaps
- **Coverage report** → Shows which URLs from sitemap are indexed
- **Index status** → Overall indexing health

---

## 4. Check for Manual Actions & Security Issues

### Manual Actions Check

In GSC Dashboard:
1. Left sidebar → **Security & manual actions**
2. Look for section: **"Manual actions"**
3. **Expected:** No manual actions listed
4. **If issues found:** Each action will show:
   - Type of action
   - Affected pages
   - Reason
   - Actions to fix

### Security Issues Check

In the same section:
1. Check **"Security issues"** subsection
2. Common issues to look for:
   - Hacked content
   - Malware
   - Unwanted software
3. **Expected:** "No security issues detected"
4. **If found:** GSC provides remediation steps

### URL Inspection Tool

Verify specific pages are being crawled:
1. Left sidebar → **URL inspection**
2. Enter homepage: `https://www.chicagoselectrician.com`
3. Check:
   - **Coverage** → Should be "URL is on Google"
   - **Indexing allowed** → Should be "Yes"
   - **Last crawled** → Should be recent
   - **Mobile usability** → Should be "No issues"

---

## 5. Baseline Performance Tracking Setup

### Core Web Vitals Monitoring

1. **In GSC Dashboard**, left sidebar → **Core Web Vitals**
2. Check current status:
   - **Good URLs** → Percentage of pages passing all three metrics
   - **LCP (Largest Contentful Paint)** → Target: < 2.5s
   - **CLS (Cumulative Layout Shift)** → Target: < 0.1
   - **INP (Interaction to Next Paint)** → Target: < 200ms
3. **Record baseline metrics** from this view (see section below)

### Coverage Report Baseline

1. **In GSC Dashboard**, left sidebar → **Coverage**
2. Record today's baseline:
   - **Total indexed URLs**
   - **Error count** (should be 0)
   - **Valid with warnings** (if any)
   - **Excluded URLs** (should only be non-essential pages)

### Performance Report Baseline

1. **In GSC Dashboard**, left sidebar → **Performance**
2. Set date range to "last 28 days"
3. Record baseline metrics:
   - **Total clicks**
   - **Total impressions**
   - **Average CTR**
   - **Average position**

---

## 6. Google Search Console Configuration Checklist

### Essential Settings

- [ ] Property ownership verified
- [ ] XML sitemap submitted and showing in Sitemap report
- [ ] No manual actions present
- [ ] No security issues detected
- [ ] Homepage indexed (confirmed via URL Inspection Tool)
- [ ] Core Web Vitals baseline recorded
- [ ] Coverage report baseline recorded
- [ ] Performance report baseline recorded

### Optional Enhancements (for later)

- [ ] Link Google Analytics 4 to GSC property (for deeper insights)
- [ ] Set target country (if location-specific, though not needed for Chicago local)
- [ ] Configure URL parameters (if any tracking parameters need management)
- [ ] Enable new URL crawl requests (optional, usually auto-enabled)

---

## 7. Baseline Metrics (To be filled after setup)

### Core Web Vitals Baseline
- **Date recorded:** [TO BE FILLED]
- **Good URLs (%):** [TO BE FILLED]
- **LCP Status:** [TO BE FILLED]
- **CLS Status:** [TO BE FILLED]
- **INP Status:** [TO BE FILLED]

### Coverage Baseline
- **Date recorded:** [TO BE FILLED]
- **Total indexed URLs:** [TO BE FILLED]
- **Errors:** [TO BE FILLED]
- **Valid with warnings:** [TO BE FILLED]

### Performance Baseline (28-day window)
- **Date recorded:** [TO BE FILLED]
- **Total clicks:** [TO BE FILLED]
- **Total impressions:** [TO BE FILLED]
- **Average CTR:** [TO BE FILLED]
- **Average position:** [TO BE FILLED]

---

## 8. Quick Reference URLs

| Resource | URL |
|----------|-----|
| Site Home | https://www.chicagoselectrician.com |
| Sitemap Index | https://www.chicagoselectrician.com/sitemap_index.xml |
| Post Sitemap | https://www.chicagoselectrician.com/post-sitemap.xml |
| Page Sitemap | https://www.chicagoselectrician.com/page-sitemap.xml |
| Robots.txt | https://www.chicagoselectrician.com/robots.txt |
| WordPress Admin | https://www.chicagoselectrician.com/wp-admin |
| Google Search Console | https://search.google.com/search-console |

---

## 9. Troubleshooting

### Sitemap Shows "Unable to Read"

**Cause:** XML parsing error or access issue
**Solution:**
1. Verify sitemap is accessible: https://www.chicagoselectrician.com/sitemap_index.xml
2. Check Rank Math > Settings > Sitemap to ensure enabled
3. Clear WordPress cache if applicable
4. Wait 24 hours for GSC to re-crawl

### Verification Tag Not Working

**Cause:** Plugin conflict or caching issue
**Solution:**
1. Clear browser cache
2. Try DNS verification method instead
3. Check Rank Math > Webmaster Tools > GSC field populated correctly
4. Ensure no redirect loops on homepage

### URLs Not Indexed Despite Sitemap Submission

**Cause:** Content issues, robots.txt blocking, or crawl errors
**Solution:**
1. Use URL Inspection Tool to check specific page
2. Request indexing for priority pages (one at a time)
3. Check Coverage report for any crawl errors
4. Verify page quality (heading structure, content, images)

---

## 10. Success Criteria

✅ **Setup is complete when:**
- [ ] GSC property verified
- [ ] Sitemap submitted and status = "Success"
- [ ] Homepage indexed and inspectable
- [ ] No manual actions or security issues
- [ ] Baseline metrics recorded
- [ ] Coverage shows expected number of indexed URLs
- [ ] All pages accessible to Googlebot

---

## Next Steps

1. **Execute verification** using HTML tag method (easiest)
2. **Submit sitemap** once verified
3. **Record baseline metrics** in section 7 above
4. **Monitor for 48 hours** for crawl activity and indexing
5. **Hand off to Silas** for quality audit and issue triage
6. **Monitor with Lookout** for ongoing Core Web Vitals and indexing health

---

## Notes for Team

- **Lookout** will monitor Search Console metrics continuously (see HEARTBEAT tasks)
- **Wrench** should ensure no crawl errors introduced during future site updates
- **Cody** will review GSC health as part of ongoing QC
- Any manual actions will trigger **Silas** for immediate remediation

---

**Deliverable:** Full GSC setup & verification guide for Chicago's Electrician
**Status:** Ready to execute (awaiting account authorization)
**Owner:** Specs Agent