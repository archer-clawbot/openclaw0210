# LocalCatalyst — Image SEO Optimization
**Client:** LocalCatalyst
**Deliverable:** Service sub-page (cluster)
**Date:** 2026-02-11
**Agent:** Scribe
**URL:** /on-page-seo-services/image-optimization/
**Parent Hub:** /on-page-seo-services/
**Primary Keyword:** image SEO optimization
**Secondary Keywords:** image optimization for SEO, alt text SEO, image compression, WebP optimization, image search traffic, local image SEO
**Title Tag:** Image SEO Optimization — Alt Text, Compression & More | LocalCatalyst.ai
**Meta Description:** Image optimization drives page speed, accessibility, and image search traffic. Alt text, compression, WebP, lazy loading, and local image SEO strategies.
**H1:** Image SEO Optimization: Speed, Accessibility, and a Hidden Traffic Channel
**Word Count Target:** 1,500

---

*Breadcrumbs: [Home](/) > [On-Page SEO Services](/on-page-seo-services/) > Image Optimization*

## Image SEO Optimization: Speed, Accessibility, and a Hidden Traffic Channel

Images are typically the heaviest elements on a web page. Unoptimized images are the single most common cause of slow page load times, failed [Core Web Vitals assessments](/technical-seo-services/core-web-vitals/), and poor mobile experiences. They are also an untapped traffic source — Google Images accounts for over 20% of all web searches, and visual search is growing rapidly as Google Lens and similar tools become mainstream. Our [on-page SEO services](/on-page-seo-services/) include systematic image optimization because the performance and visibility gains are too significant to leave on the table.

Most local businesses treat images as decorative elements: upload a photo, maybe resize it, and move on. That approach ignores every optimization opportunity images present — from the alt text that makes your content accessible and keyword-relevant, to the file format choices that determine whether your page loads in 2 seconds or 8, to the metadata that connects your images to local search queries.

## Alt Text Best Practices

Alt text (alternative text) is the text description assigned to an image via the HTML `alt` attribute. It serves three critical purposes:

### Accessibility

Screen readers use alt text to describe images to visually impaired users. This is the primary purpose of alt text, and it should guide how you write it. A good alt attribute describes what the image shows in clear, specific language.

### Search Engine Context

Google cannot "see" images the way humans do. While Google's image recognition technology is advanced, alt text remains the primary signal Google uses to understand what an image depicts and how it relates to the page content. Well-written alt text with relevant keywords helps Google index your images accurately and associate them with relevant search queries.

### Image Search Rankings

Images with descriptive, keyword-relevant alt text are more likely to appear in Google Images results for relevant queries. For local businesses, image search traffic can be a meaningful channel — a roofer whose project photos appear in image searches for "roof replacement before and after" gains visibility that competitors without optimized images miss.

### How to Write Alt Text

**Descriptive and specific:** Describe what the image actually shows, not what you wish it showed.

- **Good:** "Completed kitchen remodel with white quartz countertops and stainless steel appliances in an Austin home"
- **Bad:** "Kitchen remodel"
- **Worse:** "best kitchen remodeling company Austin TX affordable kitchen remodel"

**Keyword-relevant, not keyword-stuffed:** Include relevant keywords when they naturally describe the image. Do not force keywords into every alt attribute.

- **Natural:** "Emergency plumber repairing a burst pipe under a kitchen sink"
- **Stuffed:** "emergency plumber Austin TX burst pipe repair kitchen plumbing"

**Concise:** Keep alt text under 125 characters. Screen readers may truncate longer descriptions, defeating the accessibility purpose.

**Context-appropriate:** The same image on different pages might warrant different alt text. A photo of your office building on the "About" page might use "LocalCatalyst office building exterior on Main Street" while the same photo on a location page might use "Our Austin headquarters at 123 Main Street, downtown Austin."

### When Not to Use Alt Text

Decorative images — visual elements that add aesthetic value but no informational content (borders, backgrounds, spacers) — should have empty alt attributes (`alt=""`). This tells screen readers to skip the image entirely, improving the accessibility experience.

## File Naming Conventions for SEO

Image file names are a ranking signal for Google Images. A file named `IMG_4392.jpg` tells Google nothing about the image content. A file named `kitchen-remodel-white-quartz-countertops.jpg` provides clear context.

Best practices:

- **Use hyphens to separate words** — `kitchen-remodel-austin.jpg`, not `kitchen_remodel_austin.jpg` or `kitchenremodelaustin.jpg`
- **Be descriptive** — Name the file based on what the image shows
- **Include relevant keywords** — Naturally incorporate service and location terms where appropriate
- **Keep names concise** — 3-6 descriptive words is the sweet spot
- **Use lowercase** — Avoid capitalization inconsistencies that can cause 404 errors on case-sensitive servers

Rename files before uploading to your CMS. Renaming files after upload may create broken image references throughout your site.

## Image Compression and Format Selection

### Compression

Every image should be compressed before upload. Compression reduces file size — often by 60-80% — with minimal visible quality loss. Uncompressed images straight from a camera or stock photo site are dramatically larger than necessary for web display.

**Lossy compression** reduces file size by permanently removing image data. At quality settings of 70-85%, the quality difference is imperceptible to human eyes on screen display. This is the standard for photographs and complex images.

**Lossless compression** reduces file size without removing any data. File size reductions are smaller (20-40%) but quality is perfectly preserved. Appropriate for graphics, logos, and images where precision matters.

### Format Selection

The image format you choose significantly impacts file size and loading speed:

**WebP** — Google's modern image format offers 25-35% smaller file sizes than JPEG at equivalent quality. WebP is supported by all modern browsers (Chrome, Firefox, Safari, Edge) and is the recommended default format for web images in 2026.

**AVIF** — The newest format, offering 30-50% smaller files than WebP. Browser support is now broad enough for progressive adoption. We implement AVIF with WebP fallbacks for maximum compression with universal compatibility.

**JPEG** — The legacy standard for photographs. Still appropriate as a fallback format but should not be the primary format when WebP and AVIF are options.

**PNG** — Best for images requiring transparency (logos, icons, graphics with transparent backgrounds). File sizes are larger than WebP/AVIF, so use PNG only when transparency is needed.

**SVG** — Scalable vector format for icons, logos, and simple graphics. SVGs are resolution-independent (they scale perfectly to any size) and typically have tiny file sizes. Every logo and icon on your site should be SVG.

### Responsive Images with srcset

Different devices need different image sizes. A 2,000-pixel-wide hero image is perfect for desktop but wastefully large for a mobile phone that displays it at 375 pixels wide. The HTML `srcset` attribute allows you to serve different image sizes based on the viewer's device:

```html
<img src="kitchen-remodel-800.webp"
     srcset="kitchen-remodel-400.webp 400w,
             kitchen-remodel-800.webp 800w,
             kitchen-remodel-1200.webp 1200w,
             kitchen-remodel-1600.webp 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="Completed kitchen remodel with white quartz countertops">
```

This ensures mobile users download a 400-pixel image while desktop users receive the full-resolution version. The bandwidth savings on mobile are substantial — often reducing image payload by 70-80% compared to serving the full-size image to all devices.

## Lazy Loading

Lazy loading defers the loading of images until they are about to enter the viewport (the visible portion of the screen). Images below the fold are not loaded until the user scrolls toward them. This improves initial page load time and reduces wasted bandwidth for users who do not scroll the full page.

Implementation is straightforward with the native HTML `loading` attribute:

```html
<img src="project-photo.webp" loading="lazy" alt="Before and after roof replacement">
```

**Important exception:** Do not lazy load above-the-fold images, especially the Largest Contentful Paint (LCP) element. Lazy loading the hero image or primary content image delays the LCP metric and harms Core Web Vitals scores. Only images below the initial viewport should be lazy loaded.

## Image Sitemaps

An image sitemap tells Google which images exist on your site and where they are located. While Google can discover images through regular crawling, an image sitemap ensures comprehensive discovery — especially for images loaded via JavaScript or CSS that Googlebot might miss during standard crawling.

Image sitemap entries can include:

- Image URL
- Caption
- Geographic location
- Title
- License information

For local businesses with photo galleries, portfolio pages, or product catalogs, image sitemaps can significantly increase the number of images indexed in Google Images. This is especially relevant for businesses where visual content drives customer decisions — contractors, restaurants, medical practices, and retail stores. Your [XML sitemap](/technical-seo-services/crawlability-indexation/) should include image references for all key pages.

## Decorative vs. Informational Images

Not every image on your site requires the same level of optimization:

**Informational images** — Photos, diagrams, charts, and screenshots that convey information relevant to the page content. These require descriptive alt text, SEO-friendly file names, and full optimization.

**Decorative images** — Background patterns, visual dividers, icons used purely for aesthetics, and stock photos that add visual appeal but no informational value. These should have empty alt attributes and can be implemented via CSS (background images) to keep them out of the HTML document entirely.

Misclassifying decorative images as informational — and writing keyword-stuffed alt text for them — is a common mistake that dilutes the relevance signals of your truly informational images.

## Original Images vs. Stock Photos

Original photography provides SEO advantages over stock photos:

- **Uniqueness** — Stock photos appear on thousands of websites. Google may associate them with unrelated content or deprioritize them in image search because they are not unique to your site.
- **Relevance** — Photos of your actual team, location, projects, and products are inherently more relevant to your business than generic stock alternatives.
- **E-E-A-T signals** — Original imagery demonstrates first-hand experience — a core component of Google's quality evaluation criteria.
- **Local signals** — Original photos of your location, neighborhood, and service area provide visual local relevance.

We recommend original photography for service pages, location pages, team pages, and case studies. Stock photos are acceptable for blog posts and informational content where original imagery is impractical, but they should be supplemented with original images wherever possible.

## Local Image SEO

For local businesses, image optimization includes geographic elements that connect your visual content to local search queries.

### Geo-Tagging

EXIF data embedded in photographs includes GPS coordinates indicating where the photo was taken. Photos taken at your business location carry embedded geo-data that associates the image with your geographic area. While the direct ranking impact of EXIF data is debated, it reinforces local relevance signals — especially when combined with location-relevant alt text and file names.

### Local Landmarks and Context

Include recognizable local elements in photographs when possible:

- Exterior photos showing neighborhood context, street signs, or recognizable landmarks
- Service area photos that demonstrate your presence in specific communities
- Project photos with identifiable local architecture or landscape features

These visual cues reinforce local relevance for both users and search engines, complementing your [local keyword strategy](/local-seo-services/local-keyword-research/) at the visual level.

### Google Business Profile Photos

Image optimization extends beyond your website to your [GBP photos and videos](/google-business-profile-management/gbp-photos-videos/). GBP photos influence Map Pack rankings, customer engagement, and conversion rates. Apply the same optimization principles — descriptive file names, appropriate compression, original photography — to every image you upload to your Google Business Profile.

## FAQ

### How many images should a page have?

There is no fixed rule, but every page should have at least one relevant image. For service pages, 3-5 images that illustrate the service, process, and results provide good visual support. For blog posts, one image per 300-500 words keeps readers engaged. For portfolio/gallery pages, the number is dictated by content. The key metric is that each image should serve a purpose — either informational or engagement-driven.

### Does image optimization really affect page speed that much?

Yes. Images typically account for 50-80% of a page's total file size. Compressing and converting images to modern formats can reduce total page weight by 40-70%. For a typical local business site, image optimization is the single highest-impact speed improvement available, often bringing LCP times from "poor" to "good" threshold without any other changes.

### Should I use a CDN for images?

For most local business websites, a CDN provides meaningful speed improvements for image delivery. CDNs serve images from geographically distributed servers, reducing latency. Many CDNs also offer automatic image optimization — resizing, format conversion, and compression on the fly — which simplifies ongoing image management. As part of [site speed optimization](/technical-seo-services/site-speed-optimization/), we evaluate CDN implementation for every client.

### What about AI-generated images?

AI-generated images are acceptable for illustrative and decorative purposes but should not replace original photography for business-specific content. Google's guidance allows AI-generated images but emphasizes that content (including images) should serve users. A contractor should show real project photos, not AI-generated renderings of imaginary projects. Use AI-generated images for conceptual illustrations in blog content where original photography is impractical.

---

**Are unoptimized images slowing down your site and costing you rankings?** [Request your free SEO audit](/free-seo-audit/) to get a complete performance analysis including image optimization recommendations for every page.
