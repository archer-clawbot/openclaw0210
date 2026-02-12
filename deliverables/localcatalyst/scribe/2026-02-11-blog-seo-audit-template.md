# LocalCatalyst - SEO Audit Template
**Client:** LocalCatalyst
**Deliverable:** Hub blog post
**Date:** 2026-02-11
**Agent:** Scribe
**URL:** /learn/seo-audit-template/
**Parent Hub:** /services/seo-audit/
**Primary Keyword:** SEO audit template
**Secondary Keywords:** SEO audit checklist, site audit template, website audit framework, SEO audit spreadsheet, SEO audit process template
**Title Tag:** SEO Audit Template: Full Checklist (2026)
**Meta Description:** Use this SEO audit template to evaluate your website systematically. Covers technical SEO, on-page, off-page, and competitive analysis with actionable checklists.
**H1:** SEO Audit Template: A Complete Framework for Evaluating Any Website
**Word Count Target:** 2,500

---

## SEO Audit Template: A Complete Framework for Evaluating Any Website

A structured template transforms an SEO audit from an overwhelming exercise into a systematic evaluation with clear, repeatable steps. Whether you are performing your first site review or standardizing the process across client engagements, having a documented framework ensures nothing important gets overlooked. This template mirrors the methodology used in professional [SEO audit services](/services/seo-audit/) and adapts to sites of any size.

The template below is organized into four sections: Technical SEO, On-Page SEO, Off-Page SEO, and Competitive Analysis. Each section includes the specific items to check, the tools to use, and the benchmarks that distinguish acceptable performance from issues requiring action.

---

## Section 1: Technical SEO Audit Template

Technical SEO determines whether search engines can efficiently access, crawl, index, and render your website. Technical issues affect the entire site, making them the highest-priority audit category.

### 1.1 Crawlability

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Robots.txt review | Manual / Screaming Frog | Important pages not blocked; correct directives | No critical pages disallowed |
| XML sitemap | Google Search Console / Manual | All indexable pages included; no errors | Updated within last 30 days |
| Sitemap submission | Google Search Console | Sitemap submitted and processed | Indexed count close to submitted count |
| Internal link structure | Screaming Frog | Orphan pages; broken internal links | Zero orphan indexable pages |
| Redirect audit | Screaming Frog | Redirect chains; 302s that should be 301s | No chains longer than 2 hops |
| Crawl errors | Google Search Console | 404 errors, server errors, crawl anomalies | Decreasing error trend |
| JavaScript rendering | Google Mobile-Friendly Test | Content visible after rendering | All critical content renders |

**How to evaluate:** Run a full crawl with Screaming Frog (or Sitebulb, or Lumar). Export the crawl data and filter for issues in each category above. Cross-reference with Google Search Console's coverage report for indexation discrepancies.

### 1.2 Indexation

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Index coverage | Google Search Console | Pages indexed vs. total pages | 90%+ of intended pages indexed |
| Duplicate content | Screaming Frog / Siteliner | Duplicate title tags, duplicate content blocks | Under 10% duplication |
| Canonical tags | Screaming Frog | Correct self-referencing canonicals; cross-domain canonicals | Every indexable page has a canonical |
| Thin content pages | Screaming Frog / Manual | Pages with under 300 words of unique content | Consolidate or expand thin pages |
| Noindex tags | Screaming Frog | Accidental noindex on important pages | Only applied intentionally |
| Pagination | Manual review | Proper handling of paginated content | Canonical to self or view-all page |
| Parameter handling | Google Search Console | URL parameters creating duplicate content | Parameters configured correctly |

### 1.3 Site Performance

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Largest Contentful Paint (LCP) | PageSpeed Insights / CrUX | Time to render largest visible content | Under 2.5 seconds |
| Interaction to Next Paint (INP) | PageSpeed Insights / CrUX | Responsiveness to user input | Under 200 milliseconds |
| Cumulative Layout Shift (CLS) | PageSpeed Insights / CrUX | Visual stability during page load | Under 0.1 |
| Mobile usability | Google Mobile-Friendly Test | Viewport configuration; tap target size; text readability | All pages pass mobile test |
| HTTPS | Manual / Screaming Frog | Valid SSL; no mixed content warnings | Full HTTPS, no mixed content |
| Server response time (TTFB) | WebPageTest | Time to first byte | Under 600ms |

### 1.4 Structured Data

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Schema markup | Google Rich Results Test | LocalBusiness, FAQ, Product, Article schema as applicable | Present on all eligible pages |
| Validation errors | Google Rich Results Test | Missing required fields; invalid markup | Zero errors |
| Rich result eligibility | Google Search Console | Enhanced results displaying in search | Increasing impression count |

---

## Section 2: On-Page SEO Audit Template

On-page SEO evaluates the content and HTML elements that signal relevance to search engines and serve user intent.

### 2.1 Title Tags and Meta Descriptions

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Title tag presence | Screaming Frog | Every page has a unique title tag | 100% coverage |
| Title tag length | Screaming Frog | Under 60 characters to avoid truncation | 95%+ within limit |
| Title tag keywords | Manual review | Primary keyword included naturally | Present on all target pages |
| Meta description presence | Screaming Frog | Every page has a unique meta description | 100% coverage |
| Meta description length | Screaming Frog | Under 160 characters | 95%+ within limit |
| Duplicate titles/descriptions | Screaming Frog | No two pages share the same title or description | Zero duplicates |

### 2.2 Heading Structure

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| H1 tag presence | Screaming Frog | One H1 per page | 100% coverage |
| H1 keyword inclusion | Manual review | Primary keyword in H1 naturally | Present on target pages |
| Heading hierarchy | Manual review | Logical H1 > H2 > H3 structure | No skipped levels |
| Multiple H1 tags | Screaming Frog | Only one H1 per page | Zero pages with multiple H1s |

### 2.3 Content Quality

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Word count by page | Screaming Frog | Content depth relative to competitors | Meet or exceed competitor average |
| Keyword targeting | SEMrush / Ahrefs | Each page targets a primary keyword | One primary keyword per page |
| Search intent alignment | Manual review | Content matches intent behind target keyword | All target pages aligned |
| Content freshness | Manual review | Last update date relative to competitors | Updated within 12 months |
| Duplicate content | Copyscape / Siteliner | Unique content across all pages | Under 15% similarity |
| Readability | Hemingway Editor / Yoast | Grade level appropriate for audience | Grade 8-10 for general audiences |

### 2.4 Internal Linking

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Internal link count | Screaming Frog | Links to and from each priority page | Minimum 3 internal links to each target page |
| Anchor text | Screaming Frog | Descriptive, keyword-relevant anchors | No generic "click here" anchors |
| Link equity distribution | Screaming Frog | Priority pages receive proportional link equity | Top pages have most internal links |
| Broken internal links | Screaming Frog | Links pointing to 404 or redirect pages | Zero broken internal links |

### 2.5 Image Optimization

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Alt text presence | Screaming Frog | Every meaningful image has alt text | 95%+ coverage |
| Alt text quality | Manual review | Descriptive and keyword-relevant where natural | No keyword stuffing |
| File size | PageSpeed Insights | Images compressed without visible quality loss | Under 200KB per image |
| Image format | Manual review | WebP or modern formats used | Modern formats for above-the-fold images |
| Image sitemap | Manual review | Images included in sitemap if applicable | Present for image-heavy sites |

---

## Section 3: Off-Page SEO Audit Template

Off-page SEO evaluates external signals, primarily backlinks and brand presence, that influence search rankings.

### 3.1 Backlink Profile

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Total referring domains | Ahrefs / SEMrush | Total unique domains linking to site | Compare to top 3 competitors |
| Domain authority distribution | Ahrefs / SEMrush | Distribution of linking domain authority | Healthy mix across DA ranges |
| Link growth rate | Ahrefs / SEMrush | New referring domains per month | Steady growth, no sudden spikes |
| Anchor text distribution | Ahrefs / SEMrush | Ratio of branded, exact match, partial, generic | Exact match under 10% |
| Toxic links | Ahrefs / SEMrush | Links from spam, PBN, or penalized domains | Under 5% toxic links |
| Dofollow/nofollow ratio | Ahrefs / SEMrush | Balance of link types | 60-80% dofollow |
| Link relevance | Manual review | Topical and geographic relevance of linking sites | Majority from relevant sources |

Understanding [what makes a good backlink](/learn/what-makes-a-good-backlink/) helps you evaluate each link in your profile against quality benchmarks.

### 3.2 Local Citations (for Local Businesses)

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| NAP consistency | Moz Local / BrightLocal | Consistent name, address, phone across citations | 95%+ consistency |
| Google Business Profile | Manual review | Complete, optimized, actively managed | All fields populated |
| Core directory presence | Manual review | Listed on Yelp, BBB, Apple Maps, Bing Places | Present on all major platforms |
| Industry directory presence | Manual review | Listed on relevant industry directories | Present on top 5 industry directories |
| Duplicate listings | Moz Local / BrightLocal | Duplicate or conflicting listings | Zero duplicates |

### 3.3 Brand Signals

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Unlinked brand mentions | Ahrefs Content Explorer | Mentions of brand without a link | Outreach list for link conversion |
| Brand search volume | Google Trends / Keyword tools | Monthly brand name searches | Growing trend |
| Social profile completeness | Manual review | Active, complete profiles on relevant platforms | All major platforms claimed |
| Review profile | Manual review | Google, Yelp, and industry review volume and ratings | Growing review count, 4+ star average |

---

## Section 4: Competitive Analysis Template

The competitive analysis benchmarks your audit findings against the sites you need to outrank.

### 4.1 Competitor Identification

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| SERP competitors | Manual search | Domains ranking for your top 10 keywords | Identify top 3-5 competitors |
| Local pack competitors | Manual search | Businesses appearing in map pack for local keywords | Identify top 3 map pack competitors |
| Content competitors | SEMrush / Ahrefs | Domains competing for informational keywords | May differ from SERP competitors |

### 4.2 Competitive Benchmarking

| Metric | Your Site | Comp. 1 | Comp. 2 | Comp. 3 |
|---|---|---|---|---|
| Domain Authority/Rating | | | | |
| Referring Domains | | | | |
| Indexed Pages | | | | |
| Organic Keywords | | | | |
| Estimated Organic Traffic | | | | |
| Core Web Vitals (pass/fail) | | | | |
| Content Depth (avg. word count) | | | | |
| Google Review Count | | | | |
| Google Review Rating | | | | |

### 4.3 Content Gap Analysis

| Check Item | Tool | What to Look For | Benchmark |
|---|---|---|---|
| Keyword gaps | SEMrush / Ahrefs | Keywords competitors rank for that you do not | Prioritize by volume and intent |
| Content format gaps | Manual review | Content types competitors use (video, tools, guides) | Identify formats you are missing |
| Topic coverage gaps | Manual review | Topics competitors cover in depth | Prioritize by search demand |
| SERP feature gaps | SEMrush | Featured snippets, PAA boxes competitors own | Target winnable features |

---

## Using This Template: Prioritization Framework

After completing all sections, prioritize findings using this framework:

### Critical (Fix Immediately)
- Issues blocking crawling or indexation
- Security vulnerabilities (missing HTTPS, mixed content)
- Manual actions or penalty indicators
- Broken critical pages (homepage, top service pages)

### High Priority (Fix Within 30 Days)
- Core Web Vitals failures
- Missing or duplicate title tags on high-traffic pages
- Toxic backlinks requiring disavow
- Major content gaps for high-value keywords

### Medium Priority (Fix Within 90 Days)
- Internal linking optimization
- Image optimization and alt text
- Structured data implementation
- Content freshness updates

### Low Priority (Ongoing Improvement)
- Minor meta description optimization
- Additional schema markup types
- Brand mention conversion to links
- Long-tail content gap coverage

---

## Template Formats and Downloads

This template can be adapted into several working formats:

- **Spreadsheet:** Create a Google Sheets or Excel workbook with tabs for each section. Use conditional formatting to flag issues by severity.
- **Project management tool:** Convert each check item into a task in Asana, Trello, or Monday.com with assignees and due dates.
- **Audit report:** Use the findings as the structure for a client-facing report, adding screenshots, data, and specific recommendations for each issue.
- **Recurring checklist:** For ongoing [SEO audit schedules](/learn/how-often-seo-audit/), use the template as a quarterly checklist that tracks improvements over time.

---

## FAQ

### Can I use this template for any type of website?

This template covers the fundamental elements that apply to all websites. E-commerce sites, SaaS platforms, and enterprise sites may require additional sections for product page optimization, international SEO (hreflang), or JavaScript rendering analysis. Use this template as the base and add industry-specific sections as needed.

### How long does it take to complete an audit using this template?

For a small site (under 50 pages), expect 6-10 hours to complete all sections thoroughly. Medium sites (50-500 pages) typically require 15-25 hours. Large sites require significantly more time, particularly for the content quality and backlink analysis sections. Automated tools reduce time spent on data collection but not on analysis and prioritization.

### What tools do I need to complete this audit?

At minimum: Google Search Console (free), Screaming Frog (free for up to 500 URLs), Google PageSpeed Insights (free), and one backlink analysis tool (Ahrefs, SEMrush, or Moz -- all require paid subscriptions for full data). This combination covers approximately 80% of the template's data requirements.

### Should I use this template or hire a professional?

Using this template for a self-audit provides valuable insights, especially for smaller sites or businesses with SEO knowledge on the team. For competitive markets, large sites, or situations where you lack confidence in interpreting findings, a professional audit adds strategic analysis, competitive context, and prioritized recommendations that a template alone cannot provide. Many businesses start with a self-audit, then engage a professional for deeper analysis of the areas they identify as most problematic.

---

## Put This Template to Work

A template provides structure. Expert analysis provides strategy. If you want a professional evaluation that goes beyond checklist completion to deliver prioritized, actionable recommendations tailored to your competitive landscape, order an SEO audit(/services/seo-audit/) and let our team apply this framework to your site with the depth and context that drives real ranking improvements.
