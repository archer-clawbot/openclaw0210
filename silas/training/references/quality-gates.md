# Programmatic SEO Quality Gates
## Thresholds for large-scale page generation and templated content

Skills reference this file by ID: `ref:quality-gates`.

---

## Purpose

When clients have (or plan to have) large numbers of templated pages (city pages, service+location combos, landing pages), these quality gates determine whether the content strategy is sustainable or risks thin-content penalties.

---

## Page Volume Thresholds

| Page Count | Gate | Action |
|------------|------|--------|
| 1-50 | Green | Normal operation. Standard CATALYST content quality rules apply. |
| 51-100 | Yellow — Warning | Flag in audit. Verify each page has genuinely unique content (not just city-name-swapped). Require minimum 500 unique words per page beyond template boilerplate. |
| 101-500 | Orange — Review Required | Escalate in audit. Require content differentiation audit: sample 10% of pages and verify < 30% content overlap between any two pages. Each page must have unique: opening paragraph, local details, pricing specifics, testimonials. |
| 501+ | Red — Stop and Assess | Do NOT recommend additional pages without a content differentiation strategy. At this scale, thin/duplicate content risk is extreme. Require: unique data per page (real pricing, real reviews, real local details), not just template variables. |

---

## Content Uniqueness Requirements

### Per-Page Minimum (Regardless of Scale)
- **Unique word count:** At least 60% of content must be unique to that page (not shared with template)
- **Local specificity:** At least 3 locally-specific details per page (landmarks, neighborhoods, local regulations, local pricing factors)
- **Data specificity:** At least 1 verifiable data point per page (price range, response time, service area boundary)

### Template vs. Unique Content Ratio
| Ratio | Assessment |
|-------|-----------|
| > 70% unique | Excellent — each page adds genuine value |
| 50-70% unique | Acceptable — template provides structure, content is differentiated |
| 30-50% unique | Warning — approaching thin content territory |
| < 30% unique | Fail — essentially duplicate pages with swapped variables |

---

## Quality Signals to Check

### Positive Signals (content is likely valuable)
- Each page ranks for different keyword clusters
- Each page has unique user engagement metrics (different time-on-page, bounce rates)
- Pages contain location-specific photos, testimonials, or case studies
- Pricing or availability varies by location (reflecting real differences)
- Internal linking follows logical geographic/topical relationships

### Negative Signals (content is likely thin/duplicate)
- Pages are identical except for city/neighborhood name
- No unique images per page (all use same stock photos)
- FAQ sections are identical across all pages
- Schema markup is copy-pasted without location-specific data
- No internal links between related location pages
- Google Search Console shows "Duplicate without user-selected canonical" warnings

---

## Audit Template: Programmatic SEO Assessment

When a client site has 50+ templated pages, include this assessment in the audit:

```
### Programmatic SEO Quality Assessment

**Total templated pages:** [count]
**Quality gate status:** [Green/Yellow/Orange/Red]

**Sample audit (10% random sample, min 5 pages):**
| Page | Unique Word % | Local Details | Unique Data Points | Assessment |
|------|--------------|---------------|-------------------|------------|
| [URL] | [%] | [count] | [count] | [Pass/Warn/Fail] |

**Content overlap check:**
- Average pairwise similarity: [%]
- Highest similarity pair: [URL1] vs [URL2] at [%]

**Recommendation:** [Continue / Consolidate / Pause expansion / Rewrite]
```

---

## Integration with CATALYST Scoring

Programmatic SEO quality affects these SPEC scores:
- **SPEC-006 (Location Silos):** Thin city pages reduce the silo score
- **SPEC-010 (On-Page Content):** Duplicate content across pages caps score at 4
- **SPEC-009 (Technical SEO):** Crawl budget waste from thin pages reduces score

If quality gate is **Orange or Red**, add a note to the Priority Matrix:
> "Content consolidation required before creating additional pages. Current page volume ([count]) exceeds quality threshold — [X]% of sampled pages show < 50% unique content."
