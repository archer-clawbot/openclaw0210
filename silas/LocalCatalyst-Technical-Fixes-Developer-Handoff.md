# LocalCatalyst.ai — Technical Fixes (Developer Handoff)

**Site:** https://localcatalyst.ai  
**Platform:** WordPress + Rank Math SEO + WooCommerce  
**Priority:** CRITICAL — Site is not indexed by Google

---

## 🚨 CRITICAL: Indexation Issues

### Issue #1: Site Not Appearing in Google
**Symptom:** `site:localcatalyst.ai` returns 0 results  
**Impact:** CRITICAL — no organic traffic possible

**Diagnosis Checklist:**
1. Check if homepage has `<meta name="robots" content="noindex">` — Remove if present
2. Check Rank Math → General → Robots Meta → Ensure "index, follow" is set globally
3. Check WordPress → Settings → Reading → Ensure "Discourage search engines" is UNCHECKED
4. Verify robots.txt is NOT blocking important pages

**Action Items:**
- [ ] Verify no `noindex` tags on homepage, service pages, learn pages
- [ ] Submit sitemap to Google Search Console: `https://localcatalyst.ai/sitemap_index.xml`
- [ ] Request manual indexing via GSC for:
  - Homepage
  - /services/topical-map/
  - /services/seo-audit/
  - /services/gbp-optimization/
  - /learn/

---

## ⚡ HIGH Priority Fixes

### Issue #2: Missing Meta Descriptions
**Pages Affected:** Homepage, potentially others  
**Impact:** High — poor CTR in search results

**Fix:**
- [ ] Add meta description to homepage via Rank Math:  
  *"Get SEO audits, topical maps, content pages, and GBP optimization in hours, not weeks. Transparent pricing, AI-powered delivery, no retainers. LocalCatalyst — productized SEO for local businesses."*
- [ ] Audit all pages for missing meta descriptions via Rank Math SEO Analyzer

---

### Issue #3: Missing Favicon
**Impact:** Medium — poor brand recognition in browser tabs

**Fix:**
- [ ] Upload 512x512px favicon via Rank Math → Titles & Meta → Global Meta → Site Icon
- [ ] Verify favicon appears in browser after clearing cache

---

### Issue #4: Missing Open Graph Images
**Impact:** Medium — social shares look unprofessional

**Fix:**
- [ ] Create 1200x630px OG image template
- [ ] Upload as fallback: Rank Math → Titles & Meta → Social → Facebook → Default Image
- [ ] Add custom OG images for high-value pages (homepage, topical-map, seo-audit)

---

### Issue #5: No Canonical Tag on Cart Page
**Page:** /cart/  
**Impact:** Medium — duplicate content risk

**Fix:**
- [ ] Add self-referencing canonical: `<link rel="canonical" href="https://localcatalyst.ai/cart/" />`
- [ ] OR: Set cart/checkout to `noindex` via Rank Math (recommended)

---

### Issue #6: Missing H1 on Cart Page
**Page:** /cart/  
**Impact:** Low — poor page structure

**Fix:**
- [ ] Add H1 to WooCommerce cart template: `<h1>Your Cart</h1>`
- [ ] OR: Use Rank Math to inject H1 via schema settings

---

### Issue #7: Placeholder Images in Sitemap
**Pages Affected:** /cart/ sitemap includes 4x `woocommerce-placeholder.webp`  
**Impact:** Medium — signals low-quality content to Google

**Fix:**
- [ ] Noindex cart/checkout pages:
  - Rank Math → Edit /cart/ → Robots Meta → Set to `noindex, follow`
  - Rank Math → Edit /checkout/ → Robots Meta → Set to `noindex, follow`
- [ ] OR: Exclude WooCommerce utility pages from sitemap:
  - Rank Math → Sitemap Settings → Exclude: cart, checkout, my-account

---

### Issue #8: No Google Analytics Tracking
**Impact:** High — cannot measure traffic, conversions, behavior

**Fix:**
- [ ] Create GA4 property for localcatalyst.ai
- [ ] Add tracking code to `<head>` section (use plugin: GA Google Analytics or MonsterInsights)
- [ ] Set up conversion goals:
  - Form submission on /contact/
  - Add to cart clicks
  - Checkout initiation
  - Service page visits (events)

---

## 📝 MEDIUM Priority Fixes

### Issue #9: Missing Alt Text on Images
**Pages Affected:** Homepage (0 images have alt text), likely others  
**Impact:** Medium — accessibility issue + missed image SEO opportunity

**Fix:**
- [ ] Audit all images via Rank Math SEO Analyzer
- [ ] Add descriptive alt text to every image:
  - Logo: "LocalCatalyst AI-powered SEO deliverables"
  - Service icons: "Topical map icon", "SEO audit icon", etc.
  - Screenshots: Describe what's shown
- [ ] Ensure alt text is NOT stuffed with keywords

---

### Issue #10: Identical lastmod Dates on Learn Articles
**Pages Affected:** 100+ /learn/ articles all show Feb 12-13, 2026  
**Impact:** Medium — may signal mass-published/auto-generated content to Google

**Fix:**
- [ ] Stagger publication dates:
  - Republish 2-3 articles per week over next 8 weeks
  - OR: Manually update `lastmod` dates in Rank Math
- [ ] Add unique intro paragraphs to each article (if needed for differentiation)

---

## 🔧 SCHEMA MARKUP ADDITIONS

### Issue #11: Missing FAQ Schema
**Pages Affected:** All service pages with FAQ sections  
**Impact:** High — missing featured snippet opportunities

**Fix:**
- [ ] Use Rank Math FAQ block to wrap FAQ sections:
  - /services/topical-map/
  - /services/seo-audit/
  - /services/content-pages/
  - /services/schema-markup/
  - /services/gbp-optimization/
  - /services/citation-building/
- [ ] Validate via Google Rich Results Test

---

### Issue #12: Missing Product Schema
**Pages Affected:** All WooCommerce product pages  
**Impact:** High — missing rich results (price, availability)

**Fix:**
- [ ] Rank Math → Edit product pages → Schema tab → Set type to "Product"
- [ ] Ensure these fields are populated:
  - Name
  - Description
  - Price
  - Currency
  - Availability
  - SKU (optional)
- [ ] Validate via Google Rich Results Test

---

### Issue #13: Missing HowTo Schema
**Pages Affected:** Service pages with "How It Works" sections  
**Impact:** Medium — missing rich results for step-by-step guides

**Fix:**
- [ ] Use Rank Math HowTo block on service pages
- [ ] Wrap step-by-step sections in HowTo schema

---

## 🔍 CRAWL & INDEXATION CLEANUP

### Issue #14: Unnecessary Pages in Sitemap
**Pages Affected:** /cart/, /checkout/, /my-account/, /shop/  
**Impact:** Low — these pages don't need to rank

**Fix:**
- [ ] Rank Math → Sitemap Settings → Exclude:
  - cart
  - checkout
  - my-account
  - shop (if not needed)
- [ ] Regenerate sitemap

---

### Issue #15: No robots.txt Test Tool Used
**Impact:** Low — want to verify robots.txt is configured correctly

**Fix:**
- [ ] Test robots.txt in Google Search Console → Crawl → robots.txt Tester
- [ ] Ensure these are allowed:
  - /services/
  - /learn/
  - /industries/
  - /case-studies/
- [ ] Ensure these are disallowed:
  - /wp-admin/
  - /wp-content/uploads/wc-logs/
  - /cart/
  - /checkout/

---

## 📊 PERFORMANCE (Already Excellent)

**Current Status:** 0.46-0.76s avg load time ✅

No immediate action needed — site is already fast. Future optimization:
- [ ] Run Lighthouse audit to verify Core Web Vitals
- [ ] Test mobile page speed separately
- [ ] Consider image lazy-loading (if not already enabled)

---

## ✅ TESTING CHECKLIST

After implementing fixes:

### Indexation Tests
- [ ] `site:localcatalyst.ai` returns 100+ results
- [ ] Homepage appears when searching "LocalCatalyst"
- [ ] Service pages indexed within 7 days

### Schema Tests
- [ ] Google Rich Results Test shows FAQ schema on service pages
- [ ] Google Rich Results Test shows Product schema on WooCommerce pages
- [ ] No schema errors in Search Console

### On-Page Tests
- [ ] All images have alt text (check via Screaming Frog or Rank Math)
- [ ] All pages have meta descriptions
- [ ] All pages have exactly 1 H1 tag
- [ ] Favicon displays in browser tabs
- [ ] OG images show in social share previews (use opengraph.xyz to test)

### Analytics Tests
- [ ] Google Analytics tracking code fires on every page
- [ ] Conversion goals trigger correctly
- [ ] GSC shows sitemap submitted and processed

---

## 🚀 DEPLOYMENT ORDER

**Day 1 (Today):**
1. Fix indexation blockers (noindex tags, robots settings)
2. Submit sitemap to GSC
3. Add homepage meta description
4. Install Google Analytics

**Day 2-3:**
5. Add favicon
6. Add OG image fallback
7. Noindex cart/checkout pages
8. Add alt text to homepage images

**Week 2:**
9. Add FAQ schema to service pages
10. Add Product schema to WooCommerce pages
11. Add author bylines to Learn articles

**Week 3-4:**
12. Stagger Learn article publication
13. Add HowTo schema to service pages
14. Clean up sitemap exclusions

---

## 📞 QUESTIONS?

If any of these fixes are unclear or require clarification, ping Cody or the dev team lead.

**Priority:** Start with indexation fixes ASAP — site is invisible to Google until this is resolved.
