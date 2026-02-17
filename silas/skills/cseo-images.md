# CSEO Skill: Image Optimization
## Alt text audit, modern formats, responsive images, lazy loading
## Origin: claude-seo `/seo images` — adapted for CATALYST framework

---

## When This Skill Activates

Injected by the awareness engine when task context matches:
- Image optimization, image SEO, alt text audit
- WebP, AVIF, image compression, lazy loading
- SPEC-009 or SPEC-010 when image-related issues detected

---

## Image Audit Framework

### 1. Alt Text Audit

Evaluate every image on the site (from Scout crawl data):

```
IMAGE ALT TEXT AUDIT
├── Total images: [count]
├── Images with alt text: [count] ([%])
├── Images without alt text: [count] ([%])
├── Decorative images (should have alt=""): [count]
├── CSS background images (invisible to SEO): [count]
├── Alt text quality breakdown:
│   ├── Descriptive + keyword-natural: [count] — Good
│   ├── Generic ("image", "photo", "IMG_1234"): [count] — Fix
│   ├── Keyword-stuffed: [count] — Fix
│   ├── File name as alt (auto-generated): [count] — Fix
│   └── Empty alt on content images: [count] — Fix
└── Logo images with business name in alt: [Yes/No]
```

**Alt text rules:**
- Describe the image content accurately in 5-15 words
- Include relevant keyword naturally if the image relates to a service/location
- Don't start with "Image of..." or "Photo of..." — screen readers already announce it as an image
- Decorative images (borders, spacers) should use `alt=""` (empty, not missing)
- Logo should include business name: `alt="[Business Name] logo"`
- Team/staff photos: `alt="[Name], [Role] at [Business Name]"`

### 2. Image Format Audit

```
IMAGE FORMAT AUDIT
├── Modern formats
│   ├── WebP usage: [Yes/No/Partial] — [count]/[total] images
│   ├── AVIF usage: [Yes/No/Partial] — [count]/[total] images
│   ├── <picture> element with fallbacks: [Yes/No]
│   └── Server-side content negotiation: [Yes/No/Unknown]
│
├── Legacy formats still in use
│   ├── JPEG: [count] — [acceptable for photos]
│   ├── PNG: [count] — [check if any should be JPEG/WebP]
│   ├── GIF: [count] — [check if any should be video/WebP]
│   ├── BMP: [count] — [always convert]
│   └── TIFF: [count] — [always convert]
│
└── Recommendation: [Already optimized / Convert to WebP / Implement <picture> fallbacks]
```

**Format guidelines:**
| Use Case | Best Format | Fallback |
|----------|-------------|----------|
| Photos (hero, portfolio, team) | WebP or AVIF | JPEG (quality 80-85) |
| Graphics with transparency | WebP | PNG |
| Simple graphics/icons | SVG | WebP |
| Animations | CSS animation or video | WebP animated |
| Never use | BMP, TIFF, uncompressed PNG for photos | — |

### 3. Responsive Images

```
RESPONSIVE IMAGE AUDIT
├── srcset attribute used: [Yes/No/Partial]
├── sizes attribute used: [Yes/No/Partial]
├── Multiple image sizes served: [Yes/No]
├── Oversized images on mobile: [count] — [list worst offenders]
├── Images without width/height attributes: [count] — [causes CLS]
└── Art direction (<picture> for different crops): [Yes/No/N/A]
```

**Critical rule:** Every `<img>` tag must have explicit `width` and `height` attributes to prevent CLS (Cumulative Layout Shift). This is the #1 image-related CWV issue.

### 4. Lazy Loading

```
LAZY LOADING AUDIT
├── Native lazy loading (loading="lazy"): [Used/Not used]
├── Above-the-fold images exempt: [Yes/No] — [should NOT be lazy]
├── LCP image is lazy loaded: [Yes/No] — [CRITICAL: must NOT be lazy]
├── JS-based lazy loading library: [library name or None]
├── Intersection Observer used: [Yes/No]
└── Placeholder strategy: [blur-up / LQIP / skeleton / none]
```

**Critical rule:** The LCP element (usually the hero image) must NOT have `loading="lazy"`. This directly harms LCP score. All below-the-fold images should have `loading="lazy"`.

### 5. Image Compression

```
COMPRESSION AUDIT
├── Average image file size: [XKB]
├── Largest image: [URL] at [XKB]
├── Images > 500KB: [count] — [list]
├── Images > 1MB: [count] — [list] — CRITICAL
├── Total image weight: [XMB] of [XMB] total page weight ([%])
└── Estimated savings with optimization: [XKB → XKB] ([X% reduction])
```

---

## Audit Output Format

When producing image findings for CATALYST audit Section 6.2, use this enhanced format:

```
### 6.2 Image SEO

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Total images | [count] | — | — |
| Alt text coverage | [%] | 100% | [Pass/Fail] |
| Alt text quality (descriptive) | [%] | > 80% | [Pass/Fail] |
| WebP/AVIF usage | [%] | > 80% | [Pass/Fail] |
| Responsive images (srcset) | [Yes/Partial/No] | Yes | [Pass/Fail] |
| Width/height attributes | [%] | 100% | [Pass/Fail] |
| Lazy loading (below fold) | [Yes/Partial/No] | Yes | [Pass/Fail] |
| LCP image NOT lazy | [Yes/No] | Yes | [Pass/Fail] |
| Images > 500KB | [count] | 0 | [Pass/Fail] |
| CSS background images | [count] | Minimize | [Info] |

**Image optimization priority actions:**
1. [Action + page(s) affected + estimated CWV impact]
2. [Action + page(s) affected]
3. [Action + page(s) affected]
```

---

## Scoring Impact

Image optimization affects multiple SPEC scores:
- **SPEC-009 (Technical SEO):** Missing width/height → CLS issues; lazy LCP → LCP issues; oversized images → performance issues
- **SPEC-010 (On-Page Content):** Missing alt text reduces content accessibility and SEO signal
- **SPEC-007 (Grounding Boxes):** Images within grounding boxes need proper alt text for AI extraction

---

## References
- `ref:cwv-thresholds` — CLS and LCP impact from image issues
- `ref:data-sources` — `source:pagespeed` for performance impact, `source:crawl` for image inventory
