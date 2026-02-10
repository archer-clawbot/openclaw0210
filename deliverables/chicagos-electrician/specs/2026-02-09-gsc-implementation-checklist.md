# Google Search Console Implementation Checklist
**Chicago's Electrician | chicagoselectrician.com**

**Quick Reference for Execution Agent**

---

## ✅ PRE-IMPLEMENTATION VERIFICATION

- [ ] Google account credentials available (archerclawdbot@gmail.com)
- [ ] WordPress admin access available (username: archer)
- [ ] Browser access to Google Search Console
- [ ] This checklist and audit recommendations document reviewed

---

## 🚀 PHASE 1: PROPERTY CREATION & VERIFICATION (15 min)

### Step 1: Access Google Search Console
- [ ] Open https://search.google.com/search-console
- [ ] Sign in with Google account
- [ ] Click "Start now" or "+" to add new property

### Step 2: Add Property
- [ ] Select **"URL prefix"** (not Domain)
- [ ] Enter: `https://www.chicagoselectrician.com`
- [ ] Click **"Continue"**

### Step 3: Choose Verification Method
- [ ] Select **"HTML tag"** option
- [ ] Copy the generated meta tag (example):
  ```html
  <meta name="google-site-verification" content="[UNIQUE_ID_HERE]" />
  ```

### Step 4: Add Verification Tag to WordPress
- [ ] Log into WordPress: https://www.chicagoselectrician.com/wp-admin
- [ ] Username: `archer`
- [ ] Password: [use provided credentials]
- [ ] Navigate to: **Rank Math → Settings → Webmaster Tools**
- [ ] Find: **"Google Search Console verification"** field
- [ ] Paste the verification meta tag
- [ ] Click **"Save settings"**
- [ ] Confirmation message appears

### Step 5: Complete GSC Verification
- [ ] Return to Google Search Console
- [ ] Click **"Verify"** button
- [ ] Wait for confirmation (should appear within seconds)
- [ ] GSC shows **"Property verified"** message
- [ ] Dashboard becomes accessible

**⏱️ Expected time: 5 minutes**

---

## 📑 PHASE 2: SITEMAP SUBMISSION (5 min)

### Step 6: Submit Sitemap Index
- [ ] In GSC Dashboard, click **"Sitemaps"** (left sidebar)
- [ ] Click **"New sitemap"**
- [ ] Type: `sitemap_index.xml`
- [ ] Click **"Submit"**
- [ ] Wait for confirmation

### Step 7: Verify Submission
- [ ] Sitemap appears in Sitemaps list
- [ ] Status shows: **"Success"** (green)
- [ ] Shows "Submitted" timestamp
- [ ] Display shows URL count (25+)
- [ ] Screenshot results

**⏱️ Expected time: 2 minutes**

---

## 🔒 PHASE 3: SECURITY & MANUAL ACTIONS CHECK (3 min)

### Step 8: Check Manual Actions
- [ ] In GSC Dashboard, left sidebar → **"Security & manual actions"**
- [ ] Look for **"Manual actions"** section
- [ ] Verify message: **"No issues found"**
- [ ] Screenshot result

### Step 9: Check Security Issues
- [ ] In same section, look for **"Security issues"**
- [ ] Verify message: **"No security issues detected"**
- [ ] Screenshot result

**Expected Result:** Green checkmarks, no alerts

**⏱️ Expected time: 1 minute**

---

## 🔍 PHASE 4: URL INSPECTION (3 min)

### Step 10: Verify Homepage Indexing
- [ ] In GSC Dashboard, click **"URL Inspection"** (left sidebar)
- [ ] Enter: `https://www.chicagoselectrician.com`
- [ ] Wait for results to load
- [ ] Verify the following statuses:
  - [ ] **"URL is on Google"** = Yes or checkmark
  - [ ] **"Indexing allowed"** = Yes
  - [ ] **"Mobile usability"** = No issues
  - [ ] **"Last crawled"** = Recent timestamp
- [ ] Screenshot results

**⏱️ Expected time: 2 minutes**

---

## ⏳ PHASE 5: WAIT FOR INDEXING (24-48 hours)

- [ ] Return to GSC after 24 hours
- [ ] Check Coverage report for indexed URL count
- [ ] Verify no new errors have appeared
- [ ] Note the timestamp for baseline metrics collection

---

## 📊 PHASE 6: BASELINE METRICS COLLECTION (48-72 hours post-verification)

### Step 11: Record Core Web Vitals Baseline
- [ ] In GSC Dashboard, click **"Core Web Vitals"**
- [ ] Record date & time: ____________
- [ ] Mobile tab:
  - [ ] Good URLs: ___%
  - [ ] LCP status: ____
  - [ ] CLS status: ____
  - [ ] INP status: ____
- [ ] Desktop tab:
  - [ ] Good URLs: ___%
  - [ ] LCP status: ____
  - [ ] CLS status: ____
  - [ ] INP status: ____
- [ ] Screenshot both tabs

### Step 12: Record Coverage Baseline
- [ ] In GSC Dashboard, click **"Coverage"**
- [ ] Record date & time: ____________
- [ ] Note values:
  - [ ] Indexed: ____ URLs
  - [ ] Errors: ____ (should be 0 or very low)
  - [ ] Valid with warnings: ____
  - [ ] Excluded: ____
- [ ] Screenshot results

### Step 13: Record Performance Baseline
- [ ] In GSC Dashboard, click **"Performance"**
- [ ] Set date range: **"Last 28 days"**
- [ ] Record date & time: ____________
- [ ] Note values:
  - [ ] Total clicks: ____
  - [ ] Total impressions: ____
  - [ ] Avg CTR: ___%
  - [ ] Avg position: ____
- [ ] Screenshot results
- [ ] **Note:** May be 0 if newly indexed; return after 28 days for full baseline

---

## 📝 FINAL VERIFICATION CHECKLIST

### GSC Setup Complete?
- [ ] Property verified (GSC shows "Verified" status)
- [ ] Sitemap submitted (shows "Success")
- [ ] Homepage indexed (URL Inspection shows "on Google")
- [ ] No manual actions detected
- [ ] No security issues detected
- [ ] Mobile-friendly status: No issues

### Documentation Complete?
- [ ] All screenshots captured
- [ ] Baseline metrics recorded (or scheduled for 48+ hours)
- [ ] Summary document created
- [ ] Issues (if any) documented with resolutions

### Handoff Ready?
- [ ] All items above completed
- [ ] Deliverable document created
- [ ] Evidence/screenshots saved
- [ ] Ready to hand off to Silas for audit

---

## ❌ TROUBLESHOOTING

### If Verification Fails
**Problem:** GSC shows "Verification failed"
**Solution:**
1. Verify meta tag was copied completely (including `content="..."`)
2. Confirm Rank Math settings saved
3. Clear browser cache and try again
4. Alternative: Use DNS TXT record verification instead

### If Sitemap Won't Submit
**Problem:** GSC shows error when submitting `sitemap_index.xml`
**Solution:**
1. Verify URL is public: https://www.chicagoselectrician.com/sitemap_index.xml
2. Check robots.txt allows sitemap (it does ✅)
3. Try submitting individual sitemaps instead (post-sitemap.xml, page-sitemap.xml)
4. Wait 5 minutes and retry

### If Homepage Not Indexed After 48 Hours
**Problem:** URL Inspection shows "Crawling failed" or "Crawl errors"
**Solution:**
1. Check Coverage report for specific errors
2. Verify site is accessible from GSC URL Inspection Tool
3. Request indexing manually (button in URL Inspection Tool)
4. Check for noindex robots meta tag (shouldn't exist, but verify)
5. Contact hosting if site access issues suspected

### If Core Web Vitals Show Issues
**Problem:** CLS, LCP, or INP showing "Poor" status
**Solution:**
1. This is normal for newly indexed sites; metrics improve over time
2. Forward to Specs for optimization if persistent
3. Check PageSpeed Insights: https://pagespeed.web.dev
4. Generate report for performance improvements

---

## ⏰ TIMELINE SUMMARY

| Phase | Duration | Status |
|-------|----------|--------|
| Property + Verification | 5 min | 🔵 Start |
| Sitemap Submission | 2 min | 🔵 Start + 5 min |
| Security Check | 1 min | 🔵 Start + 7 min |
| URL Inspection | 2 min | 🔵 Start + 8 min |
| **Total Setup Time** | **~10 min** | ✅ Complete |
| Wait for Indexing | 24-48 hrs | ⏳ Automatic |
| Baseline Metrics | 2-3 min | 🔵 48+ hours |
| **Total Project Time** | **~50 minutes** | (mostly waiting) |

---

## 📌 CRITICAL NOTES

1. **Do NOT skip verification** — Property won't work without verified ownership
2. **Use HTML tag method** — Fastest and simplest for this site
3. **Sitemap is already ready** — No changes needed, just submit
4. **No errors expected** — Site was previously audited
5. **Baseline metrics timing** — Must wait 24-48 hours before full data available
6. **Rank Math will auto-maintain sitemaps** — Future posts auto-included

---

## 🤝 HANDOFF

**When all above steps complete:**
1. Document completion with timestamps
2. Provide all screenshots
3. Report baseline metrics (if collected)
4. Note any issues encountered
5. Pass to **Silas** for quality audit
6. **Lookout** will monitor ongoing GSC health

---

**Execution Agent:** [Your name]  
**Start Date:** _______________  
**Completion Date:** _______________  
**Issues Encountered:** None / [List any issues]  
**Sign-off:** _______________