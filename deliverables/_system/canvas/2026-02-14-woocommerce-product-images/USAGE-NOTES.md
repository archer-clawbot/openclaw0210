# WooCommerce Product Image Upload Guide

**For:** Wrench (WooCommerce Manager)  
**Date:** 2026-02-14 (Updated)  
**Client:** LocalCatalyst.ai  
**Product Line:** SEO Services (7 total)  
**Total Images:** 7 product images

---

## Overview

This deliverable contains 7 professional product images for the LocalCatalyst WooCommerce store. Each image is 1024×1024 pixels and follows the brand's blue + green color scheme.

### Services Included:
1. **Topical Map** ($397)
2. **SEO Audit** ($297–$497)
3. **Content Pages** ($97/page)
4. **Schema Markup** ($197–$397)
5. **GBP Optimization** ($297–$497)
6. **Citation Building** ($197–$597)
7. **Monthly Content** ($297/month)

---

## File Manifest

```
2026-02-14-woocommerce-product-images/
├── 01-topical-map.png             ← Topical Map product image
├── 02-seo-audit.png               ← SEO Audit product image
├── 03-content-pages.png           ← Content Pages product image
├── 04-schema-markup.png           ← Schema Markup product image
├── 05-gbp-optimization.png        ← GBP Optimization product image
├── 06-citation-building.png       ← Citation Building product image
├── 07-monthly-content.png         ← Monthly Content product image
├── PROMPTS.md                     ← Image generation prompts & API reference
├── USAGE-NOTES.md                 ← This file
└── TECHNICAL-SPECS.md             ← Detailed technical specifications
```

---

## Quick Upload Steps

### 1. Access WooCommerce Admin

URL: `https://woocommerce-1589123-6212995.cloudwaysapps.com/cart/wp-admin/`

### 2. For Each Service, Update Product Image

**Step-by-step:**

1. Go to **Products → All Products**
2. Find the service product (e.g., "Website Build")
3. Click **Edit**
4. Scroll to **Product Image** section
5. Click **Set product image**
6. Select the corresponding image file:
   - Website Build → `01-website-build.png`
   - Citation Building → `02-citation-building.png`
   - GBP Optimization → `03-gbp-optimization.png`
   - Schema Markup → `04-schema-markup.png`
7. Click **Set as featured image**
8. Update **Alt Text** (see below)
9. Publish/Update

### 3. Alt Text Examples

Add descriptive alt text for SEO:

- **Topical Map:**  
  `"Content architecture and keyword strategy planning for SEO - LocalCatalyst"`

- **SEO Audit:**  
  `"Technical SEO audit and competitor analysis service - LocalCatalyst"`

- **Content Pages:**  
  `"SEO-optimized content page creation service with meta tags and internal linking - LocalCatalyst"`

- **Schema Markup:**  
  `"Structured data schema markup implementation for search engine optimization - LocalCatalyst"`

- **GBP Optimization:**  
  `"Google Business Profile optimization and local search visibility service - LocalCatalyst"`

- **Citation Building:**  
  `"Business citation building and NAP submission across 25+ directories - LocalCatalyst"`

- **Monthly Content:**  
  `"Ongoing monthly content production and SEO optimization service - LocalCatalyst"`

---

## Product Page Customization

Once images are uploaded, consider these enhancements:

### Add Gallery Images (Optional)

WooCommerce allows multiple images per product. For a richer product page:

1. Add lifestyle/context images showing the service in action
2. Add comparison before/after images (if applicable)
3. Add team photos or client results screenshots

### Update Product Descriptions

Ensure product descriptions include:
- **Service Overview** (2-3 sentences)
- **Key Benefits** (bullet list, 3-5 items)
- **Typical ROI/Results** (metrics or examples)
- **Timeline** (how long the service takes)
- **Pricing Structure** (what's included at each tier)
- **Call to Action** ("Get Started" button)

---

## Technical Specifications

| Attribute | Value |
|-----------|-------|
| **Format** | PNG (lossless) |
| **Resolution** | 1024 × 1024 pixels |
| **Color Space** | RGB |
| **File Size** | ~80–150 KB each |
| **Background** | Transparent or branded gradient |
| **DPI** | 72 (web standard) |
| **Brand Colors** | Blue: #1E3A8A, Green: #16A34A |

---

## Troubleshooting

### Images appear blurry

**Solution:** WooCommerce image scaling issue
- Check **Settings → Media**
- Ensure thumbnail, medium, and large image sizes are set to at least 1024×1024
- Regenerate thumbnails using a plugin (e.g., Regenerate Thumbnails)

### Colors look different

**Solution:** Color profile mismatch
- Ensure images are in RGB color space (not CMYK)
- Check browser color management settings
- Test on multiple browsers (Chrome, Firefox, Safari)

### Images won't upload

**Solution:** File size or permission issues
- Verify file size is under 5 MB (should be ~100 KB)
- Check WooCommerce media upload limits in `wp-config.php`
- Ensure plugin has write permissions to `/wp-content/uploads/`

---

## SEO Best Practices

### Product Image SEO

1. **File Names:** Keep them descriptive
   ```
   ❌ product-1.png
   ✅ localcatalyst-website-build-seo-service.png
   ```

2. **Alt Text:** Include primary keyword
   ```
   Alt Text: "Website design and SEO service for local businesses - LocalCatalyst"
   ```

3. **Product Schema:** WooCommerce automatically adds schema markup, but verify:
   - Product name
   - Price (in correct currency)
   - Image URL
   - Product description

4. **Meta Description:** Update product page meta to include image context
   ```
   "Professional website design and SEO optimization services. Get a custom website 
   built by LocalCatalyst experts starting at $999."
   ```

---

## Quality Assurance Checklist

Before publishing, verify:

- [ ] Image displays correctly at 1024×1024
- [ ] Image quality is sharp and clear
- [ ] Colors match LocalCatalyst brand guidelines
- [ ] Alt text is descriptive and includes keywords
- [ ] Product page layout looks good on mobile
- [ ] Product price matches cart/pricing page
- [ ] "Add to Cart" button is functional
- [ ] Shipping/tax settings are correct (if applicable)
- [ ] Related products/upsells are configured

---

## Backup & Version Control

Store originals:
- **Backup Location:** `LocalCatalyst/WooCommerce/Product-Images/2026-02-14/`
- **Version Control:** If updates are made, rename and keep previous versions
  - Example: `01-website-build-v1.png`, `01-website-build-v2.png`

---

## Future Updates

If images need revision:

1. **Document the change:** What's different and why?
2. **Request regeneration:** Contact Canvas agent with updated prompts
3. **A/B test:** Consider running both versions for 2 weeks to measure conversion impact
4. **Archive old version:** Keep in `Previous-Versions/` folder

---

## Brand Compliance

All images have been designed to match:
- **Brand Name:** LocalCatalyst.ai
- **Brand Colors:** Blue (#1E3A8A) + Green (#16A34A)
- **Style:** Professional, modern, minimalist
- **Tone:** Trustworthy, expert, results-focused

---

## Contact & Support

For questions about:
- **Image updates** → Contact Canvas (design agent)
- **WooCommerce setup** → Contact Wrench (platform manager)
- **Marketing strategy** → Contact Archer (operations)

---

**Last Updated:** 2026-02-14  
**Next Review:** 2026-03-14 (Monthly brand audit)
