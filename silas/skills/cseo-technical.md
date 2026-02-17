# CSEO Skill: Technical SEO Audit
## 8-category technical audit: CWV, crawlability, indexation, security, JS rendering, mobile, performance, structure
## Origin: claude-seo `/seo technical` — adapted for CATALYST framework

---

## When This Skill Activates

Injected by the awareness engine when task context matches:
- Technical SEO audit, Core Web Vitals, CWV
- SPEC-009 evaluation
- Site speed, crawlability, indexation issues, mobile optimization

---

## 8-Category Technical Audit Framework

### Category 1: Core Web Vitals
Reference: `ref:cwv-thresholds`

**Data collection:** Use `source:pagespeed` to obtain CWV metrics. Distinguish field data (CrUX) from lab data (Lighthouse). Field data is authoritative for pass/fail.

**Enhanced CWV table (replaces basic Section 5.1):**

```
### Core Web Vitals Assessment

| Metric | Field Data | Lab Data | Threshold | Status | Trend |
|--------|-----------|----------|-----------|--------|-------|
| LCP | [Xs] | [Xs] | <= 2.5s | [Good/NI/Poor] | [Improving/Stable/Declining] |
| INP | [Xms] | [TBT: Xms] | <= 200ms | [Good/NI/Poor] | [Improving/Stable/Declining] |
| CLS | [X.XX] | [X.XX] | <= 0.1 | [Good/NI/Poor] | [Improving/Stable/Declining] |
| TTFB | [Xms] | [Xms] | <= 200ms | [Info] | |
| FCP | [Xs] | [Xs] | <= 1.8s | [Info] | |

Data source: [PageSpeed Insights / CrUX / Lab only]
Assessment date: [date]
CWV pass/fail: [PASS — all Good / FAIL — specify which metrics fail]
```

**INP-specific notes:** INP replaced FID in March 2024. Many sites that passed FID may fail INP because INP measures ALL interactions, not just the first. Flag this explicitly if the site has never been tested for INP.

### Category 2: Crawlability
```
CRAWLABILITY AUDIT
├── robots.txt
│   ├── Exists: [Yes/No]
│   ├── Location: [URL]
│   ├── Blocks important pages: [Yes — list / No]
│   ├── References sitemap: [Yes/No]
│   └── Issues: [list or None]
│
├── XML Sitemap
│   ├── Exists: [Yes/No]
│   ├── Location: [URL]
│   ├── Page count: [X]
│   ├── Last modified dates present: [Yes/No]
│   ├── Includes only indexable pages: [Yes/No]
│   ├── Submitted to GSC: [Yes/No/Unknown]
│   └── Issues: [list or None]
│
├── Crawl Depth
│   ├── Max depth: [X clicks from homepage]
│   ├── Pages > 3 clicks deep: [count]
│   └── Orphan pages: [count — pages with zero internal links to them]
│
└── Crawl Budget
    ├── Total crawlable pages: [count]
    ├── Blocked by robots.txt: [count]
    ├── Noindex pages: [count]
    ├── Redirect chains (2+ hops): [count]
    └── Assessment: [Efficient / Wasteful — explain]
```

### Category 3: Indexation
```
INDEXATION AUDIT
├── Canonical tags
│   ├── Self-referencing on all pages: [Yes/No/Partial]
│   ├── Cross-domain canonicals found: [Yes — list / No]
│   └── Conflicts with noindex: [Yes — list / No]
│
├── Index status
│   ├── Total pages discovered: [count]
│   ├── Pages with noindex: [count — list if unexpected]
│   ├── Duplicate content pages: [count]
│   ├── Thin content pages (< 300 words): [count]
│   └── Parameterized URLs indexed: [count]
│
└── Hreflang (if multilingual)
    ├── Present: [Yes/No/N/A]
    ├── Valid: [Yes/No]
    └── Return tags present: [Yes/No]
```

### Category 4: Security
```
SECURITY AUDIT
├── HTTPS
│   ├── SSL certificate: [Valid/Invalid/Missing]
│   ├── Certificate expiry: [date]
│   ├── Mixed content: [Yes — list / No]
│   ├── HTTP → HTTPS redirect: [Yes/No]
│   └── HSTS header: [Present/Missing]
│
├── Security headers
│   ├── X-Content-Type-Options: [Present/Missing]
│   ├── X-Frame-Options: [Present/Missing]
│   ├── Content-Security-Policy: [Present/Missing]
│   └── Permissions-Policy: [Present/Missing]
│
└── Vulnerabilities
    ├── Open admin pages: [Yes — list / No]
    ├── Directory listing enabled: [Yes/No]
    ├── Exposed .env or config files: [Yes/No]
    └── Outdated CMS/plugins: [Yes — list / Unknown]
```

### Category 5: JavaScript Rendering
```
JS RENDERING AUDIT
├── Rendering method: [SSR / SSG / CSR / Hybrid]
├── Critical content in JS-only: [Yes — concern / No]
├── Meta tags rendered server-side: [Yes/No]
├── Schema markup rendered server-side: [Yes/No]
├── Noscript fallback: [Present/Missing]
└── JS-dependent navigation: [Yes — SEO risk / No]
```

For CSR (client-side rendered) sites, flag: "Site uses client-side rendering. Google can render JS but may delay indexing. Verify critical content is visible in page source (not just rendered DOM). Consider SSR/SSG for SEO-critical pages."

### Category 6: Mobile Optimization
```
MOBILE AUDIT
├── Responsive design: [Yes/No/Partial]
├── Viewport meta tag: [Present/Missing]
├── Horizontal scroll on mobile: [Yes — issue / No]
├── Tap target size (>= 48px): [Pass/Fail]
├── Font size (>= 16px body): [Pass/Fail]
├── Mobile page speed (Lighthouse): [X/100]
├── Intrusive interstitials: [Yes — list / No]
└── Mobile-specific issues: [list or None]
```

### Category 7: Page Performance
```
PERFORMANCE AUDIT
├── Total page weight
│   ├── HTML: [XKB]
│   ├── CSS: [XKB]
│   ├── JavaScript: [XKB]
│   ├── Images: [XKB]
│   ├── Fonts: [XKB]
│   ├── Total: [XKB]
│   └── Assessment: [Good < 1MB / Heavy > 2MB / Critical > 5MB]
│
├── Resource optimization
│   ├── Image format: [WebP/AVIF used / Legacy JPEG/PNG only]
│   ├── Image lazy loading: [Yes/No/Partial]
│   ├── CSS minified: [Yes/No]
│   ├── JS minified: [Yes/No]
│   ├── JS deferred/async: [Yes/No/Partial]
│   ├── CDN in use: [Yes/No]
│   └── Gzip/Brotli compression: [Yes/No]
│
└── Third-party impact
    ├── Third-party scripts: [count]
    ├── Estimated third-party blocking time: [Xms]
    └── Notable: [list heavy scripts — analytics, chat widgets, ad tags]
```

### Category 8: Site Structure
```
STRUCTURE AUDIT
├── URL structure: [Clean /city/service/ / Parameterized /?p=123]
├── Heading hierarchy
│   ├── Single H1 per page: [Yes/No — list violations]
│   ├── Logical H2/H3 nesting: [Yes/No]
│   └── Skipped heading levels: [Yes — list / No]
│
├── Navigation
│   ├── Breadcrumbs present: [Yes/No]
│   ├── BreadcrumbList schema: [Yes/No]
│   ├── 404 page exists: [Yes/No]
│   ├── 404 page is helpful: [Yes/No]
│   └── Internal link structure: [Strong/Weak — explain]
│
├── Redirects
│   ├── Redirect chains (2+ hops): [count — list]
│   ├── Redirect loops: [count — list]
│   └── 301 vs 302 issues: [list or None]
│
└── Broken links
    ├── Internal broken links: [count]
    ├── External broken links: [count]
    └── Notable: [list critical broken links]
```

---

## Summary Output Format

After completing all 8 categories, produce a summary:

```
### Technical SEO Summary

| Category | Status | Critical Issues |
|----------|--------|----------------|
| Core Web Vitals | [Pass/Fail] | [count] |
| Crawlability | [Good/Issues] | [count] |
| Indexation | [Good/Issues] | [count] |
| Security | [Good/Issues] | [count] |
| JS Rendering | [Good/Risk] | [count] |
| Mobile | [Good/Issues] | [count] |
| Performance | [Good/Heavy] | [count] |
| Structure | [Good/Issues] | [count] |

**Total critical issues:** [count]
**Total warnings:** [count]
**Overall technical health:** [Healthy / Needs Work / Critical]
```

---

## Scoring Impact

Technical audit results feed into SPEC-009 score per existing scale:
- CWV all failing → cap at 3
- CWV borderline + other issues → cap at 5
- CWV passing + minor issues → eligible for 7
- Zero issues across all 8 categories → eligible for 10

---

## References
- `ref:cwv-thresholds` — CWV metric definitions and thresholds
- `ref:data-sources` — `source:pagespeed`, `source:lighthouse`, `source:mobile-friendly`
