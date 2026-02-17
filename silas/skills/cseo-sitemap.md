# CSEO Skill: Sitemap Validation & Generation
## XML sitemap audit, validation, and generation guidance
## Origin: claude-seo `/seo sitemap` — adapted for CATALYST framework

---

## When This Skill Activates

Injected by the awareness engine when task context matches:
- Sitemap audit, XML sitemap, sitemap validation
- Crawlability issues, indexation issues
- SPEC-009 when sitemap problems detected

---

## Sitemap Audit Protocol

### 1. Discovery

Check for sitemaps in order:
1. `[domain]/sitemap.xml` (standard location)
2. `[domain]/sitemap_index.xml` (index file)
3. `robots.txt` — look for `Sitemap:` directive
4. Common CMS locations:
   - WordPress: `/wp-sitemap.xml` (core) or `/sitemap_index.xml` (Yoast/RankMath)
   - Shopify: `/sitemap.xml`
   - Wix: `/sitemap.xml`
   - Squarespace: `/sitemap.xml`

```
SITEMAP DISCOVERY
├── Found at: [URL or "Not found"]
├── Discovery method: [direct / robots.txt / CMS default]
├── Type: [Single sitemap / Sitemap index]
├── Referenced in robots.txt: [Yes/No]
└── If sitemap index:
    ├── Child sitemaps: [count]
    └── Types: [pages / posts / categories / images / video]
```

### 2. Validation

```
SITEMAP VALIDATION
├── XML well-formed: [Yes/No — parse errors]
├── Namespace correct: [Yes/No]
│   Expected: xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
├── URL count: [count]
│   ├── Under 50,000 limit: [Yes/No]
│   └── File size under 50MB: [Yes/No]
│
├── URL analysis:
│   ├── Total URLs listed: [count]
│   ├── HTTP 200 (valid): [count]
│   ├── HTTP 301 (redirects): [count] — should not be in sitemap
│   ├── HTTP 404 (broken): [count] — must remove
│   ├── HTTP 410 (gone): [count] — must remove
│   ├── HTTP 500 (server error): [count] — investigate
│   ├── Noindex pages in sitemap: [count] — contradicts sitemap inclusion
│   └── Non-canonical URLs: [count] — should only include canonical versions
│
├── <lastmod> dates:
│   ├── Present: [All/Some/None]
│   ├── Format valid (ISO 8601): [Yes/No]
│   ├── Dates accurate (not all same date): [Yes/No]
│   └── Most recent lastmod: [date]
│
├── <changefreq> (optional):
│   └── Present: [Yes/No] — Google ignores this, but doesn't penalize
│
├── <priority> (optional):
│   └── Present: [Yes/No] — Google ignores this, but doesn't penalize
│
└── Issues found: [list or None]
```

### 3. Completeness Check

Cross-reference sitemap URLs against known site pages (from Scout crawl):

```
SITEMAP COMPLETENESS
├── Pages in sitemap: [count]
├── Pages discovered by crawl: [count]
├── Pages in sitemap but not crawled: [count] — may be orphaned
├── Pages crawled but not in sitemap: [count] — should add
│   └── Notable missing:
│       ├── [URL — page type]
│       ├── [URL — page type]
│       └── [URL — page type]
├── Coverage: [sitemap pages / crawled pages] = [%]
└── Assessment: [Complete / Gaps found — action needed]
```

### 4. Best Practices Check

```
SITEMAP BEST PRACTICES
├── Only includes indexable pages: [Yes/No]
├── Excludes noindex pages: [Yes/No]
├── Excludes redirected URLs: [Yes/No]
├── Excludes paginated URLs: [Yes/No or N/A]
├── Uses HTTPS URLs (matches canonical): [Yes/No]
├── Consistent trailing slash usage: [Yes/No]
├── Image sitemap present (if image-heavy): [Yes/No/N/A]
├── Video sitemap present (if video content): [Yes/No/N/A]
└── Submitted to:
    ├── Google Search Console: [Yes/No/Unknown]
    └── Bing Webmaster Tools: [Yes/No/Unknown]
```

---

## Sitemap Generation Guidance

When a client's sitemap is missing, broken, or incomplete, provide these recommendations:

### For WordPress (most common)
```
Recommended: RankMath or Yoast SEO plugin auto-generates sitemaps.
- RankMath: Settings → Sitemap → Enable
- Yoast: SEO → General → Features → XML Sitemaps → On
- Verify at: [domain]/sitemap_index.xml

Manual override if needed:
- Exclude thin/noindex pages from sitemap in plugin settings
- Ensure all service pages and location pages are included
```

### For Custom/Static Sites
```
Generate sitemap with these rules:
1. Include only pages that return HTTP 200
2. Include only canonical URLs
3. Include only pages with index directive
4. Set <lastmod> to actual last-modified date
5. Do not include <changefreq> or <priority> (Google ignores them)
6. Submit to GSC and Bing Webmaster Tools
7. Add Sitemap: [URL] directive to robots.txt
```

### Sitemap Template
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>[full canonical URL]</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
  </url>
  <!-- Repeat for each indexable page -->
</urlset>
```

---

## Audit Output Format

Sitemap findings fold into CATALYST audit Section 5.2 (Technical Checklist) under the existing XML Sitemap row, with expanded detail:

```
| XML Sitemap | [Pass/Fail] | [URL count], [coverage %], [issues count] |
```

If issues are significant, add a subsection:
```
#### Sitemap Issues
- [Issue 1 + recommended fix]
- [Issue 2 + recommended fix]
```

---

## Scoring Impact

Sitemap issues affect SPEC-009 (Technical SEO) scoring:
- No sitemap at all: -2 points from technical score
- Sitemap exists but broken/incomplete: -1 point
- Sitemap with redirects/404s: -1 point
- Clean, complete, submitted sitemap: no penalty

---

## References
- `ref:data-sources` — `source:crawl` for cross-referencing sitemap vs crawled pages
- `ref:cwv-thresholds` — performance context for crawl budget concerns
