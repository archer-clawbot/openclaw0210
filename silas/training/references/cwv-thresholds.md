# Core Web Vitals Thresholds Reference
## Source: Google Chrome UX Report + web.dev (updated Feb 2026)

This file is the single source of truth for CWV scoring in CATALYST audits.
Skills reference this file by ID: `ref:cwv-thresholds`.

---

## Metric Definitions & Thresholds

### LCP (Largest Contentful Paint)
Measures loading performance — time until the largest visible content element renders.

| Rating | Threshold | Audit Action |
|--------|-----------|-------------|
| Good | <= 2.5s | Pass |
| Needs Improvement | 2.5s - 4.0s | Flag as moderate issue |
| Poor | > 4.0s | Flag as critical — Tier 1 fix |

**Common causes of poor LCP:**
- Unoptimized hero images (no WebP/AVIF, missing width/height)
- Render-blocking CSS/JS in `<head>`
- Slow server response (TTFB > 800ms)
- Client-side rendering without SSR/SSG
- Third-party script blocking main thread

**Measurement:** 75th percentile of page loads over 28-day rolling window (CrUX field data). Lab data (Lighthouse) uses simulated mobile on throttled 4G.

---

### INP (Interaction to Next Paint)
Replaced FID in March 2024. Measures responsiveness — the delay between user interaction and the next visual update.

| Rating | Threshold | Audit Action |
|--------|-----------|-------------|
| Good | <= 200ms | Pass |
| Needs Improvement | 200ms - 500ms | Flag as moderate issue |
| Poor | > 500ms | Flag as critical — Tier 1 fix |

**Key difference from FID:** INP measures ALL interactions during page lifecycle (clicks, taps, keyboard), not just the first. It captures the worst-case interaction latency (98th percentile for pages with 50+ interactions, worst interaction otherwise).

**Common causes of poor INP:**
- Long JavaScript tasks (> 50ms) on main thread
- Excessive DOM size (> 1,400 elements)
- Layout thrashing from JS-triggered reflows
- Unoptimized event handlers (no debouncing/throttling)
- Heavy third-party scripts (chat widgets, analytics, ad tags)

**Measurement:** 75th percentile across all page interactions in CrUX field data. Lab testing via Chrome DevTools Performance panel or Web Vitals extension.

---

### CLS (Cumulative Layout Shift)
Measures visual stability — unexpected layout shifts during page load and interaction.

| Rating | Threshold | Audit Action |
|--------|-----------|-------------|
| Good | <= 0.1 | Pass |
| Needs Improvement | 0.1 - 0.25 | Flag as moderate issue |
| Poor | > 0.25 | Flag as critical — Tier 1 fix |

**CLS calculation:** Sum of impact fraction * distance fraction for all unexpected layout shifts within session windows (max 5s window, 1s gap).

**Common causes of poor CLS:**
- Images/embeds without explicit width/height attributes
- Dynamically injected content above the fold (ads, banners, cookie notices)
- Web fonts causing FOUT/FOIT (missing `font-display: swap` or `optional`)
- Late-loading CSS that repositions elements

---

## Secondary Performance Metrics

These are NOT Core Web Vitals but are relevant for CATALYST audit Section 5.

| Metric | Good | Acceptable | Poor | Notes |
|--------|------|------------|------|-------|
| TTFB | < 200ms | 200-600ms | > 600ms | Server response time; affects LCP directly |
| FCP | < 1.8s | 1.8-3.0s | > 3.0s | Time to first visible content |
| TBT | < 200ms | 200-600ms | > 600ms | Lab proxy for INP; total blocking time |
| Speed Index | < 3.4s | 3.4-5.8s | > 5.8s | How quickly content is visually populated |
| Document Size | < 500KB | 500KB-1MB | > 1MB | Total HTML document transfer size |

---

## Data Sources for CWV Measurement

| Source ID | Method | Reliability | Notes |
|-----------|--------|-------------|-------|
| `pagespeed` | PageSpeed Insights API / web_search | High (field + lab) | Free; uses CrUX field data + Lighthouse lab data |
| `crux` | Chrome UX Report | Highest (field only) | Requires BigQuery or CrUX API; 28-day rolling |
| `lighthouse` | Lighthouse CLI/DevTools | Medium (lab only) | Simulated throttled mobile; no field data |
| `web-vitals-js` | web-vitals library on site | High (real users) | Requires client-side instrumentation |

**For CATALYST audits:** Use PageSpeed Insights via web_search as primary source. Note whether data is "field" (real users) or "lab" (simulated) — field data is authoritative for CWV pass/fail.

---

## CWV → CATALYST Score Mapping

| CWV Status | SPEC-009 Score Impact |
|------------|----------------------|
| All 3 Good | No penalty; eligible for 7-10 |
| 1 Needs Improvement | Cap at 7 unless other technical factors are perfect |
| 1 Poor | Cap at 5 |
| 2+ Poor | Cap at 3 |
| No field data available | Mark "Lab Only — verify with field data"; score based on lab results with caveat |
