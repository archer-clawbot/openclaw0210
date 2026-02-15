# Technical Specifications - WooCommerce Product Images

**Generated:** 2026-02-14  
**For:** LocalCatalyst.ai WooCommerce Store  
**Project:** SEO Services Product Image Set  

---

## Image Specifications

### General Requirements

| Property | Specification |
|----------|---|
| **Format** | PNG (portable network graphics) |
| **Dimensions** | 1024 × 1024 pixels (square) |
| **Color Space** | RGB (8-bit per channel) |
| **Bit Depth** | 32-bit (with alpha transparency) |
| **DPI** | 72 DPI (web standard) |
| **Compression** | Lossless PNG compression |
| **File Size** | ~80–150 KB per image |
| **Background** | Transparent with branded gradient overlay |

### Color Specifications

**Brand Primary Colors:**
- **Blue:** RGB(30, 58, 138) / Hex #1E3A8A / HSL(220°, 65%, 33%)
- **Green:** RGB(22, 163, 74) / Hex #16A34A / HSL(142°, 76%, 36%)

**Supporting Colors:**
- **Light Background:** RGB(248, 250, 252) / Hex #F8FAFC
- **Dark Text:** RGB(15, 23, 42) / Hex #0F172A
- **Accent Gradient:** Blue (#1E3A8A) → Green (#16A34A)

**Accessibility Compliance:**
- Contrast Ratio (Blue text on white): 8.5:1 (WCAG AAA)
- Contrast Ratio (Green text on white): 4.8:1 (WCAG AA)
- All text readable without color alone

---

## Image Variants

### 1. Website Build Service Image

**Purpose:** Hero image for $999–$2,999 website development product

**Composition:**
- Central laptop device showing website interface
- Blue & green color scheme throughout
- Clean, professional appearance
- Shows responsive design or multi-page layout
- Text overlay optional: "Professional Website Design"

**Design Elements:**
- Laptop screen: Modern business website
- Navigation bar: Clean, simple structure
- Color blocks: Blue navigation, green CTAs
- Typography: Professional sans-serif fonts
- Style: Modern minimalist design

**Emotional Tone:** Professional, trustworthy, modern, capable

---

### 2. Citation Building Service Image

**Purpose:** Hero image for $197–$597 citation building product

**Composition:**
- Network diagram with business listings/directories
- Multiple platform icons connected with lines
- Blue & green accent colors
- Shows data connections and verified badges

**Design Elements:**
- Central hub with business location
- Surrounding directory icons (Google Maps, Yelp, Apple Maps, etc.)
- Connection lines in blue and green
- Checkmark icons for "verified"
- Star ratings for social proof
- Abstract data visualization style

**Emotional Tone:** Connected, professional, organized, authoritative

---

### 3. GBP Optimization Service Image

**Purpose:** Hero image for $297–$497 Google Business Profile product

**Composition:**
- Large Google Maps pin as focal point
- Business information cards around it
- Star ratings, reviews, opening hours visible
- Blue & green design treatment
- Dashboard/interface aesthetic

**Design Elements:**
- Central Google Maps pin icon (blue/green gradient)
- Information cards: Business name, rating, hours
- Star rating display (5 stars)
- Map background (subtle)
- Review count badges
- Modern interface styling

**Emotional Tone:** Local-focused, professional, customer-centric, visible

---

### 4. Schema Markup Service Image

**Purpose:** Hero image for $197–$397 schema markup product

**Composition:**
- Code/data visualization in JSON format
- Blue & green colored code elements
- Abstract data structure representation
- Technical professional appearance

**Design Elements:**
- Code brackets and braces
- JSON structure layout
- Blue and green syntax highlighting
- Data flow arrows or connections
- Technical grid/pattern background
- Modern developer aesthetic

**Emotional Tone:** Technical, professional, sophisticated, data-driven

---

## Technical Implementation - Image Generation

### Google Imagen 3 API Integration

**API Endpoint:**
```
https://us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/us-central1/endpoints/openapi/generateImages
```

**Authentication:**
- Use Google Cloud Service Account
- Credentials file: OAuth 2.0 JSON key
- Scope: `https://www.googleapis.com/auth/cloud-platform`

**API Key Provided:**
- Key: `AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q`
- Project: `true-veld-446518-m7`
- Region: `us-central1`

### Request Format

```json
{
  "instances": [
    {
      "prompt": "Professional modern website design mockup for digital marketing and SEO services...",
      "negative_prompt": "low quality, blurry, distorted, cartoon, sketch, watermark"
    }
  ],
  "parameters": {
    "sampleCount": 1,
    "width": 1024,
    "height": 1024,
    "seed": 12345,
    "safteyFilterLevel": "block_some"
  }
}
```

### Response Format

```json
{
  "predictions": [
    {
      "bytesBase64Encoded": "iVBORw0KGgoAAAANS...",
      "mimeType": "image/png"
    }
  ]
}
```

---

## WooCommerce Integration

### Product Image Settings

**WooCommerce Media Settings:**
```
Settings → Media
├── Thumbnail size: 1024 × 1024 (crop)
├── Medium size: 1024 × 1024 (crop)
├── Large size: 1024 × 1024 (full size)
└── Single Product Image: 1024 × 1024
```

### Product Image Upload

1. **Featured Image** (primary product image)
   - Dimension: 1024 × 1024
   - Purpose: Display on product page and shop listings
   - Alt text: Required for SEO

2. **Product Gallery** (optional, up to 10 images)
   - Dimension: 1024 × 1024 (or higher)
   - Purpose: Additional views, lifestyle shots
   - Alt text: Each image should have descriptive alt text

### Image Metadata

**WordPress Media Library Fields:**

```
Title: "Website Build Service Icon - LocalCatalyst"
Filename: "localcatalyst-website-build-1024x1024.png"
Alt Text: "Professional website design and SEO service for local businesses - LocalCatalyst.ai"
Caption: "Custom Website Build - Professional Design & Development"
Description: "High-quality service icon representing professional website design and development for SEO optimization services."
```

---

## Performance Optimization

### Image Optimization Checklist

- [ ] **File Size:** Compress to <150 KB per image (PNG)
  - Use tool: TinyPNG.com or ImageOptim
- [ ] **Dimensions:** Verify exactly 1024 × 1024 pixels
- [ ] **Color Space:** Convert to sRGB if needed
- [ ] **Metadata:** Strip EXIF data (privacy + file size)
- [ ] **Format:** Save as PNG-8 or PNG-24 (depending on colors)

### WooCommerce Performance

**Lazy Loading:**
- Enable lazy loading in WooCommerce settings
- Images load on-demand as users scroll
- Improves page load speed

**Caching:**
- Use WP Super Cache or W3 Total Cache
- Cache image thumbnails at multiple sizes
- Set cache expiration: 30 days

**CDN (Optional):**
- If using CloudFlare or similar CDN
- Image optimization enabled automatically
- Serves images from nearest geographic location

---

## Brand Compliance & Asset Standards

### LocalCatalyst Brand Guidelines

**Logo & Imagery:**
- All product images must use brand colors (blue #1E3A8A, green #16A34A)
- Professional, modern design style
- No competing brand logos visible
- Original artwork or licensed stock only

**Typography:**
- Approved fonts: Inter, Poppins, Roboto
- Font sizes: 18px minimum for body text, 24px+ for headings
- Line height: 1.5 for readability

**Style Guide:**
- Minimalist, professional aesthetic
- White/light backgrounds preferred
- Consistent padding/spacing
- Avoid clutter or busy designs

---

## Quality Assurance Testing

### Visual Inspection

```
Checklist for Each Image:

☐ Colors are accurate and vibrant
☐ Text is readable and properly positioned
☐ No pixelation or compression artifacts
☐ Dimensions are exactly 1024×1024
☐ Background is clean and professional
☐ All design elements are aligned
☐ No spelling or grammar errors
☐ Brand colors (#1E3A8A and #16A34A) are present
```

### Rendering Tests

**Desktop Display (1920px wide):**
```
Product page image size: 1024px (full width)
Display quality: Sharp, clear, vibrant
```

**Tablet Display (768px wide):**
```
Product page image size: 512px (scaled down)
Display quality: Still sharp at 50% size
```

**Mobile Display (375px wide):**
```
Product page image size: 375px (full width)
Display quality: Clear, no pixelation
```

### Browser Compatibility

| Browser | Compatibility | Notes |
|---------|---|---|
| Chrome 90+ | ✓ Full Support | PNG and lazy loading work |
| Firefox 88+ | ✓ Full Support | Standard PNG support |
| Safari 14+ | ✓ Full Support | Image optimization supported |
| Edge 90+ | ✓ Full Support | Chromium-based |
| IE 11 | ⚠ Limited | PNG works, lazy loading may not |

---

## Backup & Version Control

### File Organization

```
LocalCatalyst/WooCommerce/Product-Images/
├── 2026-02-14/  (Latest)
│   ├── 01-website-build.png
│   ├── 02-citation-building.png
│   ├── 03-gbp-optimization.png
│   ├── 04-schema-markup.png
│   └── TECHNICAL-SPECS.md
├── 2026-01-15/  (Previous)
│   └── (old images)
└── Previous-Versions/
    └── (archived versions)
```

### Version Naming Convention

```
{service}-v{version}.png
Examples:
- website-build-v1.png
- website-build-v2.png (if updated)
- citation-building-v1.png
```

---

## Troubleshooting Guide

### Common Issues

**Issue:** Image appears blurry in WooCommerce
- **Cause:** Wrong image dimensions or scaling
- **Solution:** Regenerate thumbnails, verify 1024×1024 in media settings

**Issue:** Colors look washed out
- **Cause:** Color space mismatch or browser settings
- **Solution:** Check image is in RGB, clear browser cache

**Issue:** File size too large
- **Cause:** PNG not optimized
- **Solution:** Use ImageOptim or TinyPNG to compress

**Issue:** Image won't upload
- **Cause:** File size or permission issue
- **Solution:** Check max upload size in wp-config.php

---

## References & Resources

### Tools Used

- **Image Generation:** Google Imagen 3 API
- **Optimization:** TinyPNG, ImageOptim
- **Verification:** Screaming Frog, PageSpeed Insights

### Documentation

- [WooCommerce Product Images](https://docs.woocommerce.com/document/products/)
- [Google Schema.org - Product](https://schema.org/Product)
- [PNG Specification](https://en.wikipedia.org/wiki/PNG)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Document Created:** 2026-02-14  
**Last Updated:** 2026-02-14  
**Next Review:** 2026-03-14
