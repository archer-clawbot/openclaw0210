# WooCommerce Product Image Prompts

**Generated:** 2026-02-14 (Updated)  
**Total Services:** 7 (Expanded from 4)  
**API Key:** AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q  
**Image Dimensions:** 1024x1024 (PNG)  
**Color Scheme:** Blue (#1E3A8A) and Green (#16A34A) - LocalCatalyst brand  

---

## 1. Topical Map ($397)

**Service Description:** Complete content architecture with keywords, search volume, difficulty scores, and strategic topic clusters

**Image Prompt:**
```
Hierarchical content architecture and keyword strategy visualization. 
Mind map or tree diagram showing interconnected topic clusters and keywords. 
Central "Topical Authority" hub branching to related topics with blue (#1E3A8A) 
and green (#16A34A) color scheme. Keywords shown with metrics bars (search volume, 
difficulty). Professional information architecture design. Clean, organized layout 
with clear visual hierarchy. Modern digital marketing aesthetic. 
White background with colored nodes and connecting lines. 
High quality, professional. Square format 1024x1024 pixels.
```

**Filename:** `01-topical-map.png`

---

## 2. SEO Audit ($297-$497)

**Service Description:** Comprehensive technical SEO, on-page optimization, GBP completeness analysis, and competitor gap identification

**Image Prompt:**
```
SEO audit checklist and analysis dashboard. Multiple checkmark icons and bar charts 
showing technical SEO metrics, on-page scores, GBP completeness percentage, 
competitor analysis. Blue (#1E3A8A) and green (#16A34A) progress bars and indicators. 
Magnifying glass icon integrated. Professional analytics interface. 
Clean, scannable layout with organized sections. Data visualization style. 
Modern digital marketing aesthetic. Light background with colored metrics. 
High quality, detailed. Square format 1024x1024 pixels.
```

**Filename:** `02-seo-audit.png`

---

## 3. Content Pages ($97/page)

**Service Description:** Publish-ready SEO-optimized content pages with headers, meta tags, internal linking strategy, and formatting

**Image Prompt:**
```
Professional content page creation visualization. Document or page layout showing 
optimized content structure with headlines (H1, H2, H3 hierarchy), body text, 
meta description tags, and internal linking arrows in blue (#1E3A8A) and green (#16A34A). 
Pencil and document icon integrated. Professional editorial design. 
Clean typography with visual hierarchy. Content blocks showing proper formatting. 
Modern digital marketing aesthetic. Light background with color accents. 
High quality, professional document style. Square format 1024x1024 pixels.
```

**Filename:** `03-content-pages.png`

---

## 4. Schema Markup ($197-$397)

**Service Description:** Implement structured data schema markup for improved search engine understanding (LocalBusiness, Service, FAQ, Review schemas)

**Image Prompt:**
```
Technical schema markup and structured data visualization. Code-style JSON and 
schema markup representation in blue (#1E3A8A) and green (#16A34A) colors. 
Code brackets, braces, and structured data elements arranged in clean pattern. 
Multiple schema types shown: LocalBusiness, Service, FAQ, Review. 
Data flow visualization showing connections and relationships. 
Abstract technical design. Professional, modern digital marketing aesthetic. 
Clean white/light background. Digital, technical, professional SEO look. 
High quality, high detail. Square format 1024x1024 pixels.
```

**Filename:** `04-schema-markup.png`

---

## 5. GBP Optimization ($297-$497)

**Service Description:** Complete Google Business Profile overhaul including photos, posts, messaging, reviews management, and complete NAP

**Image Prompt:**
```
Google Business Profile optimization dashboard interface. Large prominent Google Maps 
pin icon in blue (#1E3A8A) and green (#16A34A). Surrounding elements showing 
business information, star ratings (5 stars), review indicators, business hours, 
photos gallery preview, and local business metrics. Professional interface design 
with clean typography. Mobile phone mockup showing GBP interface. 
Gradient background with blue-to-green color transition. Modern digital marketing 
aesthetic. High quality, professional dashboard-style layout. 
Square format 1024x1024 pixels.
```

**Filename:** `05-gbp-optimization.png`

---

## 6. Citation Building ($197-$597)

**Service Description:** NAP (Name, Address, Phone) submissions across 25-100+ business directories and local listing platforms

**Image Prompt:**
```
Business citation network and local SEO visualization showing 25+ directory submissions. 
Multiple business directory icons (Google Maps, Yelp, Apple Maps, Angie's List, 
BBB, Facebook, LinkedIn, industry-specific directories, etc.) connected with 
blue (#1E3A8A) and green (#16A34A) linking lines. Verified checkmarks on each directory. 
Star ratings and review counts. Professional network diagram showing citations 
spreading across platforms. Abstract data flow visualization. 
Clean modern digital marketing design. White background with blue-green accents. 
Professional, corporate aesthetic. High quality, clean layout. 
Square format 1024x1024 pixels.
```

**Filename:** `06-citation-building.png`

---

## 7. Monthly Content ($297/mo)

**Service Description:** Ongoing monthly content production and optimization for sustained SEO momentum and topical authority

**Image Prompt:**
```
Monthly content production and publishing workflow visualization. Calendar showing 
recurring content publication schedule (monthly cadence). Content calendar with 
multiple blog post cards, SEO metrics, publishing schedule, and optimization checkmarks 
in blue (#1E3A8A) and green (#16A34A). Chart showing content growth over months. 
Recurring arrow indicating ongoing/subscription service. Professional publishing 
dashboard design. Clean organized layout with visual hierarchy. 
Modern digital marketing aesthetic. Light background with colored workflow elements. 
High quality, professional. Square format 1024x1024 pixels.
```

**Filename:** `07-monthly-content.png`

---

## API Integration Notes

**Note:** All 7 prompts are optimized for Google Imagen 3 API and include:
- Specific hex color codes (#1E3A8A blue, #16A34A green)
- Dimension specifications (1024×1024)
- Professional style descriptors
- Service-specific visual elements
- Quality and detail requirements

**Google Imagen 3 API Endpoint:**
```
https://us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/us-central1/endpoints/openapi/generateImages
```

**Sample Request Format:**
```json
{
  "instances": [
    {
      "prompt": "[SERVICE_PROMPT_HERE]"
    }
  ],
  "parameters": {
    "width": 1024,
    "height": 1024,
    "seed": 12345,
    "safteyFilterLevel": "block_some"
  }
}
```

**Color Palette Reference:**
- **Primary Blue:** #1E3A8A
- **Primary Green:** #16A34A
- **Light Background:** #F8FAFC or #F0F9FF
- **Text:** #0F172A
- **Accent:** Gradient blue → green

---

## Implementation Instructions for Wrench

### Step 1: Upload Images to WooCommerce

1. Navigate to **Products → Add New** (or edit existing service products)
2. For each service:
   - Upload the corresponding PNG image (e.g., `01-website-build.png` for Website Build)
   - Set as Featured Image
   - Add to Product Gallery if needed

### Step 2: File Naming Convention

Save images with descriptive names on the server:
- `localcatalyst-website-build-1024x1024.png`
- `localcatalyst-citation-building-1024x1024.png`
- `localcatalyst-gbp-optimization-1024x1024.png`
- `localcatalyst-schema-markup-1024x1024.png`

### Step 3: WooCommerce Product Image Settings

- **Image Size:** Ensure WooCommerce is configured for 1024×1024 display
- **Alt Text:** Add descriptive alt text for each image (SEO benefit)
  - Example: "Professional website design service icon for local SEO"
- **Product Gallery:** Consider adding 2-3 additional lifestyle/context images per product

### Step 4: Quality Assurance

- [ ] Test image display on desktop (1920px wide)
- [ ] Test image display on tablet (768px wide)
- [ ] Test image display on mobile (375px wide)
- [ ] Verify images load quickly (should be <100KB each)
- [ ] Confirm color accuracy matches brand guidelines

### Step 5: SEO Optimization

Add metadata to images:
- **File name:** Include service keyword (e.g., `website-build-service-icon`)
- **Alt text:** Include service name and benefit (e.g., "Professional website design and SEO service icon")
- **Image title:** Service name

---

## Design Specifications

| Property | Value |
|----------|-------|
| **Format** | PNG (lossless) |
| **Dimensions** | 1024×1024 pixels |
| **Color Mode** | RGB |
| **DPI** | 72 DPI (web standard) |
| **File Size Target** | 50-150 KB per image |
| **Color Scheme** | Blue (#1E3A8A) + Green (#16A34A) |
| **Style** | Professional, modern, minimal |
| **Use Case** | WooCommerce product imagery |
| **Brand** | LocalCatalyst.ai |

---

## Revision Notes

If images need updates:
1. Note the specific service and requested change
2. Regenerate using the same prompt with minor modifications
3. Test in WooCommerce before final deployment
4. Document changes in a `REVISIONS.md` file

---

**Created by:** Canvas Agent  
**Date:** 2026-02-14  
**Status:** Prompts documented and ready for image generation
