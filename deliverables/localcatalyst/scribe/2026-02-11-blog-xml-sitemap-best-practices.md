# LocalCatalyst - Blog Post: XML Sitemap Best Practices for SEO
**Client:** LocalCatalyst
**Deliverable:** Blog post (Hub 4 educational content)
**Date:** 2026-02-11
**Agent:** Scribe
**URL:** /learn/xml-sitemap-best-practices/
**Parent Hub:** /services/seo-audit/
**Primary Keyword:** XML sitemap SEO
**Secondary Keywords:** XML sitemap best practices, sitemap index file, submit sitemap Google, sitemap generator, sitemap errors
**Title Tag:** XML Sitemap Best Practices for SEO | LocalCatalyst.ai
**Meta Description:** Learn XML sitemap best practices -- what to include, what to exclude, how to create and submit sitemaps, and how to monitor them for SEO.
**H1:** XML Sitemap Best Practices: How to Build Sitemaps That Improve Crawling and Indexation
**Word Count Target:** 1,500

---

An XML sitemap is one of the most straightforward tools in technical SEO, yet it is frequently misconfigured. A well-structured sitemap helps search engines discover your pages faster, prioritize crawling, and understand your site's architecture. As part of our [technical SEO services](/services/seo-audit/technical-seo-audit/), sitemap auditing is one of the first items we address because it directly affects how efficiently Google crawls and indexes your site.

This guide covers what XML sitemaps do, how to create them properly, what to include and exclude, and how to monitor them for ongoing SEO performance.

## What an XML Sitemap Does (and Does Not Do)

An XML sitemap is a structured file that lists the URLs on your site you want search engines to crawl and consider for indexing. It acts as a roadmap -- not a guarantee. Including a URL in your sitemap does not force Google to index it, and excluding a URL does not prevent indexation.

What a sitemap does provide:

- **Discovery.** URLs that are difficult to find through internal links (orphan pages, new content, deep pages) are surfaced to crawlers.
- **Prioritization signals.** The `<lastmod>` tag tells crawlers which pages have been recently updated, helping them allocate crawl budget more efficiently.
- **Coverage visibility.** Comparing the URLs in your sitemap against the URLs Google has indexed reveals gaps and issues.

## How to Create an XML Sitemap

### CMS-Generated Sitemaps

Most modern content management systems generate sitemaps automatically:

- **WordPress:** Yoast SEO, Rank Math, and All in One SEO all generate XML sitemaps. WordPress itself includes a basic sitemap at `/wp-sitemap.xml` since version 5.5.
- **Shopify:** Generates a sitemap automatically at `/sitemap.xml`.
- **Wix, Squarespace, Webflow:** Auto-generate sitemaps with varying levels of configuration.

For most CMS-powered sites, the built-in or plugin-generated sitemap is sufficient. The key is configuring it correctly.

### Custom or Large-Scale Sites

For sites with complex architectures or hundreds of thousands of URLs, consider:

- **Screaming Frog** can generate sitemaps from a crawl of your site.
- **Custom scripts** using a sitemap library in your development language (Python, Node.js, PHP) that query your database and output XML.
- **Dynamic sitemaps** generated on each request by your application server, though caching is essential for performance.

### Sitemap Format Requirements

A valid XML sitemap must follow the Sitemaps.org protocol:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/page/</loc>
    <lastmod>2026-02-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Important notes on optional tags:**
- `<lastmod>` is useful and should be accurate. If your CMS updates this automatically when content changes, keep it. If it updates on every page load regardless of content changes, it becomes meaningless and Google will ignore it.
- `<changefreq>` is largely ignored by Google. Include it if you want, but do not rely on it.
- `<priority>` is also ignored by Google. It was intended to communicate relative importance within your site, but Google determines this independently.

## What to Include in Your Sitemap

Include every URL that meets all of the following criteria:

- Returns a 200 HTTP status code.
- Is the canonical version of the page (self-referencing canonical tag).
- Is not blocked by `robots.txt`.
- Does not have a `noindex` meta tag or `X-Robots-Tag` header.
- Contains substantive, unique content worth indexing.

In practice, this means including:

- All core landing pages, service pages, and product pages.
- Blog posts and editorial content.
- Category and taxonomy pages that have unique content (not thin aggregation pages).
- Location pages for multi-location businesses.

## What to Exclude from Your Sitemap

Exclude URLs that you do not want indexed or that would dilute the quality signal of your sitemap:

- **Redirected URLs.** Only include the final destination URL, not the redirect source.
- **Noindexed pages.** Including a noindexed URL in a sitemap creates a conflicting signal.
- **Parameter variations.** Filter, sort, and session ID parameters should not appear in the sitemap.
- **Paginated pages** (page 2, page 3, etc.) unless they contain unique, indexable content.
- **Utility pages.** Login, cart, checkout, thank-you, and account pages serve no organic search purpose.
- **Duplicate content.** If multiple URLs serve the same content, include only the canonical version.
- **Staging or development URLs.** Ensure your sitemap generation process is environment-aware.

## Sitemap Index Files

The XML sitemap protocol limits individual sitemaps to 50,000 URLs and 50MB (uncompressed). For larger sites, use a sitemap index file that references multiple sub-sitemaps:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.example.com/sitemap-pages.xml</loc>
    <lastmod>2026-02-10</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-posts.xml</loc>
    <lastmod>2026-02-10</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-products.xml</loc>
    <lastmod>2026-02-10</lastmod>
  </sitemap>
</sitemapindex>
```

**Best practices for sitemap organization:**

- Segment by content type (pages, posts, products, categories).
- Keep each sub-sitemap under 10,000 URLs for easier management and debugging.
- Use descriptive filenames so you can quickly identify which sitemap covers which section.
- Gzip compress large sitemaps (Google accepts `.xml.gz` files).

## Submitting Your Sitemap

### Google Search Console

1. Navigate to Sitemaps in the left sidebar.
2. Enter your sitemap URL (e.g., `/sitemap.xml` or `/sitemap_index.xml`).
3. Click Submit.
4. Google will report the number of discovered URLs and any processing errors.

### Robots.txt

Add a `Sitemap:` directive to the bottom of your `robots.txt` file:

```
Sitemap: https://www.example.com/sitemap.xml
```

This method works for all search engines that read `robots.txt`, not just Google.

### Bing Webmaster Tools

Submit your sitemap through Bing's Webmaster Tools for coverage in Bing and Yahoo search results. The process mirrors Google's.

## Monitoring Your Sitemap

Submitting a sitemap is not a one-time task. Ongoing monitoring ensures it stays healthy:

- **Check Search Console regularly.** The Sitemaps report shows how many URLs were submitted versus how many were indexed. A large gap warrants investigation.
- **Cross-reference with the Pages report.** URLs in your sitemap that appear in the "Excluded" section of the Pages report need attention -- they may be noindexed, canonicalized, or returning errors.
- **Validate after site changes.** Any migration, redesign, or URL restructure should trigger a sitemap audit. Ensure old URLs are removed, new URLs are added, and redirects are not included.
- **Watch for sitemap errors.** Search Console will flag XML formatting errors, URLs that return non-200 status codes, and sitemaps that exceed size limits.

Our [local SEO audit](/services/seo-audit/local-seo-audit/) process includes a full sitemap-to-index reconciliation as part of the crawl analysis phase.

## Common Sitemap Mistakes

1. **Including noindexed URLs.** This sends conflicting signals to Google: "please crawl this" vs. "please do not index this."
2. **Stale `<lastmod>` dates.** If `<lastmod>` updates every time the page is served (regardless of content changes), Google will eventually ignore it for your entire site.
3. **Forgetting to update after a migration.** Old URLs in the sitemap post-migration generate a flood of crawl errors.
4. **Not using HTTPS URLs.** If your site serves over HTTPS, every URL in the sitemap must use the `https://` protocol.
5. **One monolithic sitemap for massive sites.** Break large sitemaps into logical sub-sitemaps for manageability and debugging.

## FAQ

### Do small sites need an XML sitemap?

Yes, but for different reasons than large sites. Small sites (under 500 pages) typically do not have crawl budget issues, but a sitemap still aids discovery of new content and provides a useful diagnostic tool when cross-referenced with Search Console data.

### Can I have multiple sitemaps?

Absolutely. Use a sitemap index file to organize multiple sitemaps by content type, language, or section. There is no penalty for having multiple sitemaps, and it makes management significantly easier.

### Should I include images in my XML sitemap?

Google supports image sitemaps using the `<image:image>` extension. If your site is image-heavy (e-commerce, photography, real estate), an image sitemap can help Google discover and index images that might not be found through standard crawling. For most other sites, it is not necessary.

### How often should I regenerate my sitemap?

Your sitemap should update automatically whenever content is published, updated, or removed. If your CMS handles this natively, no manual regeneration is needed. For static sites, regenerate and resubmit after every deployment that changes URLs.

---

## Get Your Sitemap Working Harder

A properly configured XML sitemap is a low-effort, high-impact technical SEO win. If you are unsure whether your sitemap is helping or hurting your crawl efficiency, [Order an SEO Audit](/services/seo-audit/) and we will include a full sitemap analysis in our report.
