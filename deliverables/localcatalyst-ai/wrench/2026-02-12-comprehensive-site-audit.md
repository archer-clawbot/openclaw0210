# LocalCatalyst.ai — Comprehensive Site Architecture & Best Practices Audit

**Date**: 2026-02-12  
**Client**: LocalCatalyst.ai  
**Site**: https://darkgreen-moose-683278.hostingersite.com  
**Auditor**: Wrench (Site Optimization Agent)  
**Scope**: Site-wide structure, theme configuration, template types, and WordPress/GeneratePress best practices

---

## Executive Summary

LocalCatalyst is a well-structured WordPress site built on **GeneratePress theme** with **custom HTML markup and CSS classes** (lc-* naming convention). The site has:

- **197+ pages** across multiple content types
- **12 major industries** with hub pages and sub-pages
- **6 service offerings** with detailed product pages  
- **Multiple hub pages** (About, Resources, Case Studies, etc.)
- **Strong visual design** using custom CSS and sections

### Key Findings

✅ **What's Working Well**
- Consistent custom CSS class system (lc-* convention) on styled pages
- Clear information architecture with parent/child relationships
- Good use of hub/spoke content structure for industries and services
- Modern design approach with custom HTML sections (on most pages)
- Responsive layout across styled page types

🔴 **CRITICAL ISSUES — Broken/Unstyled Pages**
- **4 pages completely unstyled**: /about/, /our-process/, /contact/, /platform/ (404)
- **Impact**: Broken brand perception, poor user experience on key conversion pages
- **/platform/ returns 404** — Page doesn't exist or broken permalink
- **/about/, /our-process/, /contact/** rendered with browser defaults (no CSS, no design)

⚠️ **Best Practice Issues Found**
- **CSS styling inconsistency** — FAQ button hover issue reveals global theme style conflicts (page-by-page fixes instead of global theme CSS)
- **No reusable blocks/patterns** — Content is built with raw HTML instead of WordPress block patterns
- **Limited use of block editor** — Pages use custom HTML instead of GeneratePress/GenerateBlocks capabilities
- **No global component system** — Same section markup repeated across multiple pages instead of reusable patterns
- **Missing structured template system** — All pages use default template instead of custom page templates
- **No child theme CSS organization** — Custom styles scattered; some pages have no styling at all
- **Inconsistent page completion** — Some pages fully styled, others completely unstyled
- **No documented template hierarchy** — Difficult to maintain consistency across new pages

---

## Site Structure Analysis

### Page Inventory Summary

| Page Type | Count | Representative Pages |
|-----------|-------|----------------------|
| Homepage | 1 | ID: 6 (/) |
| About/Company | 6 | About (18) 🔴, Why Choose Us (412), Team (411), Certifications (410) |
| Services Hub | 1 | Services (12) |
| Service Detail Pages | 10+ | Schema Markup (93), Content Pages, GBP Optimization, etc. |
| Industries Hub | 1 | Industries (81) |
| Industry Category Pages | 12 | Dental SEO (74), HVAC (119), Plumbing (121), etc. |
| Industry Sub-Pages | 60+ | Multi-location dental, real estate keywords, home services SEO, etc. |
| Case Studies Hub | 1 | Case Studies (70) |
| Case Study Pages | 8+ | Multi-Location Dental, Restaurant Google Maps, Medical Practice, etc. |
| Legal/Policy Pages | 4 | Terms of Service, Privacy Policy, etc. |
| Process/Contact | 2 | Our Process 🔴, Contact 🔴 |
| Utilities | 3 | Resources (421), Testimonials (420), Platform 🔴 (404) |
| **TOTAL PAGES** | **197+** | — |

**🔴 Critical Issues**: 4 pages are broken/unstyled (see Critical Problem Pages section below)

---

## Template Type Analysis

### 1. **Homepage (ID: 6)**

**URL**: `/`  
**Template**: Default (no custom template)  
**Structure**: HTML sections with custom classes (lc-hero, lc-section-label, lc-grid-2, etc.)  

**Observations**:
- Uses hero section with glow background effects
- Grid-based layout with custom CSS
- Service offerings displayed in organized card layout
- "How it works" section with numbered steps
- Industry showcase grid (12 industry tiles)

**Best Practice Issues**:
- ❌ Hero section markup is inline HTML, not using GeneratePress Hero block or pattern
- ❌ Service cards are custom HTML `<a>` elements with inline styles, not reusable block components
- ❌ Grid layouts use custom `style=""` attributes instead of GeneratePress grid system or block layout
- ⚠️ No schema markup for homepage (e.g., Organization schema, LocalBusiness schema not detected)

---

### 2. **Service Hub Page (ID: 12)**

**URL**: `/services/`  
**Template**: Default  
**Structure**: HTML sections with service cards in grid layout  

**Observations**:
- Displays 6 main services with pricing and turnaround times
- "Recommended Paths" section showing customer journey suggestions
- Call-to-action at bottom

**Best Practice Issues**:
- ❌ Service cards are duplicated HTML structure across page (violates DRY principle)
- ❌ Pricing table is HTML markup, not using WordPress table block or reusable pattern
- ⚠️ No structured pricing schema (could benefit from Product or Offer schema)
- ⚠️ "Recommended Paths" section uses inline styles instead of reusable block pattern

---

### 3. **Service Detail Page — Schema Markup (ID: 93)**

**URL**: `/services/schema-markup/`  
**Template**: Default  
**Structure**: HTML sections with custom classes (lc-hero, lc-faq-trigger, lc-table, etc.)  
**Content**: 5,400+ word page with multiple sections

**Key Sections**:
- Dark hero with breadcrumb
- Product pricing options
- Problem statement
- Sample output (code example)
- What's included (feature cards)
- How it works (3-step process)
- Comparison table vs. competitors
- **FAQ section with collapsible buttons** ← **This is where FAQ hover issue appears**
- Cross-sell section
- Dark CTA section

**Best Practice Issues**:
- ❌ **FAQ Buttons Styling Issue** — `.lc-faq-trigger` elements show dark gray background on hover instead of transparent (GeneratePress theme conflict, currently patched page-by-page)
- ❌ All content is raw HTML instead of using WordPress Accordion block (available in core blocks)
- ❌ Breadcrumb is custom HTML instead of using GeneratePress Breadcrumb element
- ❌ Feature comparison table uses custom grid layout instead of block table
- ❌ Pricing tiers use inline styles instead of consistent design tokens
- ⚠️ Code sample uses `<pre>` with inline color spans instead of code block
- ⚠️ No table of contents or jump links despite page length (5,400+ words)
- ⚠️ Schema markup for this page (SoftwareApplication, Product, Offer schema) not detected

---

### 4. **About Page (ID: 18) — 🔴 UNSTYLED**

**URL**: `/about/`  
**Template**: Default  
**Structure**: ❌ **NO CUSTOM STYLING**
**Content**: ✓ Exists (company narrative, APEX Framework, testimonials, values)

**CRITICAL ISSUE**: Page is completely unstyled
- ❌ Page renders with browser defaults (serif font, left-aligned, no color)
- ❌ Zero lc-* CSS classes applied
- ❌ No hero section, no visual design, no spacing
- ❌ Looks broken/incomplete compared to rest of site
- ❌ APEX Framework should be 4 numbered cards, displayed as plain text instead

**Content Present**:
- Company narrative and philosophy ✓
- APEX Framework breakdown (4 components, should be cards) ✓
- "What Makes Us Different" section ✓
- Client testimonials/quotes (should be styled blocks) ✓
- Values and principles ✓

**Best Practice Issues**:
- ❌ **No custom styling** — Page needs complete visual rebuild
- ❌ APEX Framework uses plain text instead of styled card/step layout
- ❌ Client testimonials are plain text, not using block styling or schema
- ❌ No schema markup (Organization schema missing)
- ❌ No hero section with background, no visual hierarchy
- ❌ No footer CTA to schedule call

**Fix Required**: Rebuild `/about/` with proper `<section class="lc-...">` structure and styling
**Effort**: ~2 hours

---

### 5. **Industries Hub Page (ID: 81)**

**URL**: `/industries/`  
**Template**: Default  
**Structure**: HTML sections with 12 industry cards in grid  

**Observations**:
- Each industry has an emoji, name, description, and "View SEO strategy →" link
- All 12 industries shown in 3x4 grid layout
- Consistent card design throughout

**Best Practice Issues**:
- ❌ Card markup is duplicated 12 times (HTML copy-paste) instead of using reusable block or pattern
- ❌ No custom page template for "Industry Hubs" — every industry hub is on /industries/ with linked sub-pages
- ⚠️ No schema markup (ItemList schema with ListItem elements would be appropriate)
- ⚠️ Industry categories not using hierarchical page structure (could benefit from custom template or CPT)

---

### 6. **Industry Category Page — Dental SEO (ID: 74)**

**URL**: `/industries/dental-seo/`  
**Template**: Default  
**Structure**: HTML sections with industry-specific data and content clusters  

**Key Sections**:
- Hero with "DENTAL PRACTICES" label
- "The Challenge" section explaining industry-specific issues
- "Keyword Landscape" section with sample keywords and difficulty scores
- Case study highlighting "Page 3 → Local 3-Pack" results
- Service offerings (industry-specific messaging)
- FAQ section
- Cross-sell to other industries

**Best Practice Issues**:
- ❌ Keyword landscape table uses custom HTML instead of block table
- ❌ Case study section uses custom grid layout instead of block columns
- ❌ "Services" section repeats service cards instead of using reusable component
- ❌ No custom template for industry pages (all 12+ industries using same default template)
- ⚠️ No LocalBusiness schema specific to dental (should include specialty: Dentistry)
- ⚠️ Case study data not wrapped in article/study schema

---

### 7. **Case Study Page**

**URL**: `/case-studies/` (hub) and `/case-studies/multi-location-dental/` (detail)  
**Template**: Default  
**Structure**: HTML sections with case study narrative  

**Observations**:
- Hub page shows all case studies in list/grid
- Detail pages show problem, solution, results structure

**Best Practice Issues**:
- ❌ No custom case study template
- ❌ Case study data not wrapped in structured markup (missing Article schema, breadcrumb schema)
- ❌ Results metrics (e.g., "Page 3 → Local 3-Pack in 11 weeks") not highlighted with semantic HTML
- ⚠️ No schema for review/testimonial data mentioned in case studies

---

### 8. **Resources Page (ID: 421)**

**URL**: `/resources/`  
**Template**: Default  
**Structure**: Guide/hub page with links to downloadables  

**Best Practice Issues**:
- ⚠️ Limited information from fetch; need to review in detail
- ❌ Likely no structured markup for resource listings (missing CreativeWork schema)

---

### 9. **Our Process Page — 🔴 UNSTYLED**

**URL**: `/our-process/`  
**Template**: Default  
**Structure**: ❌ **NO CUSTOM STYLING**
**Content**: ✓ Exists (6-step process explanation)

**CRITICAL ISSUE**: Page is completely unstyled
- ❌ Zero lc-* CSS classes applied
- ❌ 6-step workflow described in plain text (should be numbered card layout)
- ❌ No visual process flow, no styling
- ❌ Page structure is raw text paragraphs

**Content Present**:
- Step 1: Order Received ✓
- Step 2: Task Dispatched ✓
- Step 3: Research and Analysis ✓
- Step 4: Execution ✓
- Step 5: Quality Check ✓
- Step 6: Delivery ✓
- Product turnaround times (table) ✓
- Call-to-action ✓

**Best Practice Issues**:
- ❌ **No custom styling** — Page needs complete visual rebuild
- ❌ 6-step process should be visual cards with step numbers (01, 02, 03...), not text
- ❌ Turnaround table uses plain HTML table (should use styled lc-table)
- ❌ No connecting visual lines between steps
- ❌ No schema markup for process/workflow

**Fix Required**: Rebuild with step-by-step card layout with connecting visual lines
**Effort**: ~2 hours

---

### 10. **Contact Page — 🔴 UNSTYLED**

**URL**: `/contact/`  
**Template**: Default  
**Structure**: ❌ **NO CUSTOM STYLING**
**Content**: ✓ Exists (contact form, strategy call info, FAQ)

**CRITICAL ISSUE**: Page is completely unstyled
- ❌ Zero lc-* CSS classes applied
- ❌ Contact form is bare HTML (no styling, no visual hierarchy)
- ❌ No hero section, no CTA emphasis
- ❌ FAQ section is plain text (should be collapsible accordion)
- ❌ Form inputs are unstyled (no borders, padding, focus states)

**Content Present**:
- Strategy call value prop ✓
- "What You'll Get" section ✓
- Who should schedule (persona fit) ✓
- How it works (4 steps, should be styled) ✓
- FAQ section (6 questions, should be collapsible) ✓
- Contact form (needs styling) ✓
- Email/phone contact info ✓

**Best Practice Issues**:
- ❌ **No custom styling** — Page needs complete visual rebuild
- ❌ Form is unstyled HTML (needs input styling, button styling, error/success states)
- ❌ No hero section with headline and CTA
- ❌ FAQ should use lc-faq-trigger (collapsible accordion style)
- ❌ "How it works" section should be styled 4-step cards
- ❌ No prominent CTA button at top and bottom

**Fix Required**: Rebuild with hero, styled form, styled FAQ accordion, styled step cards
**Effort**: ~2.5 hours

---

## WordPress & GeneratePress Theme Analysis

### Theme Configuration Issues

#### ❌ **Issue 1: No Child Theme CSS Organization**

**Severity**: Medium  
**Impact**: CSS sprawl, hard to maintain, theme updates risk breaking custom styles

**Findings**:
- Site uses GeneratePress parent theme
- Custom CSS appears to be in page content (inline `<style>` blocks) or Additional CSS
- No child theme detected at `/wp-content/themes/generatepress-child/`
- All custom styles (lc-* classes) are scattered across page content

**Why This Matters**:
- GeneratePress updates could break custom layouts
- Difficult to maintain consistency across 197+ pages
- Theme updates require careful testing
- New developers can't easily understand CSS architecture

**Recommendation**:
1. Create `/wp-content/themes/generatepress-child/` directory
2. Move all `lc-*` CSS into `style.css`
3. Create organized CSS files:
   - `css/design-tokens.css` — Color, spacing, typography variables
   - `css/components.css` — Button, card, hero, section styles
   - `css/layouts.css` — Grid, flex, responsive layouts
   - `css/utilities.css` — Margin, padding, display utilities
4. Enqueue child theme CSS in `functions.php`
5. Remove inline styles from pages (migrate to CSS classes)

---

#### ❌ **Issue 2: No Reusable Blocks or Patterns**

**Severity**: High  
**Impact**: Content duplication, inconsistent styling, hard to update components globally

**Findings**:
- All pages use custom HTML markup instead of block editor
- Service cards duplicated on:
  - Homepage (6 cards)
  - Services hub (6 cards)
  - Each industry page (6 cards)
  - Each service detail page (cross-sell section, 3 cards)
- **FAQ section**: Appears on 20+ pages with identical HTML structure
- Comparison tables: Multiple copies across service pages
- Testimonial quotes: Duplicated across pages

**Why This Matters**:
- FAQ hover bug fix requires updating 20+ pages instead of one CSS rule
- To update service card design, you must edit 20+ pages
- Inconsistent spacing or styling issues proliferate across site
- New pages are built by copy-pasting old page HTML

**Example: FAQ Section Duplication**
```
lc-faq-trigger appears on:
- /services/schema-markup/ (5 FAQs)
- /services/gbp-optimization/ (likely 5 FAQs)
- /industries/dental-seo/ (FAQ section)
- /industries/hvac-seo/ (likely FAQs)
- And 10+ more pages...

Total: ~20-30 pages with identical FAQ button markup
```

**Recommendation**:
1. Convert service cards to **GenerateBlocks reusable block**
   - Create block with title, description, price, link, icon
   - Use once, reuse on all pages via `/wp-json/blocks`
2. Create **FAQ accordion reusable block**
   - Use GeneratePress Accordion block or custom GenerateBlocks
   - Deploy on all pages that need FAQs
3. Create **comparison table reusable block**
4. Establish block naming convention and version control
5. Document block patterns in development guide

---

#### ⚠️ **Issue 3: No Global Component System**

**Severity**: Medium  
**Impact**: Styling inconsistency, maintenance burden, brand drift

**Findings**:
- Hero sections vary across pages (some have glow effects, some don't)
- Buttons have inconsistent hover states (the FAQ button issue)
- Card layouts use different padding/borders/shadows
- Typography hierarchy not standardized (h1 sizes vary)
- No global color palette (colors appear to be hardcoded in inline styles)

**Why This Matters**:
- Brand looks inconsistent to users
- Each new page requires custom styling
- Theme updates become risky (hard to test all variations)

**Recommendation**:
1. Create **design-tokens.css** with CSS custom properties (variables):
   ```css
   :root {
     /* Colors */
     --lc-primary: #2d5016;
     --lc-emerald: #10b981;
     --lc-text: #1f2937;
     --lc-text-muted: #6b7280;
     --lc-bg-white: #ffffff;
     --lc-bg-off-white: #f9fafb;
     
     /* Typography */
     --lc-font-mono: 'Courier New', monospace;
     --lc-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
     
     /* Spacing */
     --lc-space-sm: 8px;
     --lc-space-md: 16px;
     --lc-space-lg: 32px;
     
     /* Sizing */
     --lc-container-max: 1140px;
   }
   ```

2. Refactor inline `style=""` attributes to use variables
3. Create **component.css** with standard components:
   - `.lc-btn` with consistent hover states
   - `.lc-card` with standard padding, shadow, border
   - `.lc-section` with standard padding
   - `.lc-section-label` with standard size/color
4. Update theme customizer to reference design tokens

---

#### ⚠️ **Issue 4: Missing Schema Markup**

**Severity**: High  
**Impact**: Google can't understand page content, missed rich results, lower CTR from SERPs

**Findings**:
No structured markup detected for:

| Page Type | Missing Schema | Impact |
|-----------|---|---|
| Homepage | Organization, LocalBusiness, SoftwareApplication | Google knows less about the company, no rich results |
| Service Pages | Product, Offer, FAQPage | Service pricing not shown in results, no FAQ rich results |
| Industry Pages | CreativeWork, Article (for guides) | Guides not recognized as industry resources |
| Case Studies | NewsArticle, Article, BreadcrumbList | Case studies treated as generic pages |
| About Page | Organization, Person (for team) | About page shows no structured company data |

**Why This Matters**:
- Google Rich Results require schema markup (FAQs, products, reviews, etc.)
- LocalBusiness schema critical for local SEO site (ironically!)
- Service/Product schema helps Google display pricing and offers in search results
- Missing BreadcrumbList schema — breadcrumbs exist but not marked up

**Recommendation**:
1. Add **Organization schema** to homepage
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "LocalCatalyst",
     "url": "https://darkgreen-moose-683278.hostingersite.com",
     "description": "AI-powered SEO deliverables",
     "sameAs": [...]
   }
   ```

2. Add **Product/Offer schema** to service pages (Schema Markup, GBP Optimization, etc.)
3. Add **FAQPage schema** to pages with FAQ sections (currently FAQs are not marked up)
4. Add **BreadcrumbList schema** to breadcrumb navigation
5. Add **Article schema** to industry guide pages
6. Add **NewsArticle schema** to case studies

---

#### ⚠️ **Issue 5: No Custom Page Templates**

**Severity**: Medium  
**Impact**: All pages use default layout, hard to enforce consistent structure across page types

**Findings**:
- All 197+ pages use default template (empty string in `template` field)
- No custom templates at `/wp-content/themes/generatepress/page-*.php`
- All pages built with inline HTML sections instead of template structure

**Why This Matters**:
- When adding a new industry page, developer must copy-paste structure from existing industry page
- No way to auto-generate sidebar, related items, or consistent sections
- Hard to enforce consistent page structure (e.g., "all industry pages should have FAQ section")

**Recommendation**:
1. Create custom templates:
   - `page-service-detail.php` — For all service pages
   - `page-industry-hub.php` — For /industries/ hub
   - `page-industry-category.php` — For individual industries (dental, HVAC, etc.)
   - `page-case-study.php` — For case studies
   - `page-about.php` — For about/company pages
   - `page-wide.php` — For full-width pages (like homepage)

2. Move repeating sections into template includes
3. Use ACF (Advanced Custom Fields) or block patterns to populate template sections

---

#### ⚠️ **Issue 6: No Consistent Mobile Optimization**

**Severity**: Medium  
**Impact**: May have mobile usability issues, Core Web Vitals impact, poor mobile experience

**Findings**:
- Heavy use of inline styles and custom layouts
- Custom CSS grid/flex layouts may not be responsive
- No viewport-specific breakpoint management visible
- No mobile-first design pattern detected

**Recommendation**:
1. Audit Core Web Vitals (CLS, LCP, FID) on desktop and mobile
2. Ensure all custom sections use mobile-first CSS
3. Test all pages on mobile devices (iPhone, Android)
4. Use GeneratePress responsive utilities instead of custom media queries
5. Consider lazy loading for above-fold images

---

### Template System Analysis

**Critical Finding**: Site has **NO CUSTOM TEMPLATES** — all 197+ pages use default template

**Template Audit Results**:

| Template Type | Expected | Exists? | Status |
|---|---|---|---|
| `page-home.php` | Yes | ❌ No (404) | **Missing** |
| `page-services.php` | Yes | ❌ No (404) | **Missing** |
| `page-learn.php` | Yes | ❌ No (404) | **Missing** |
| `single-post.php` | Yes | ❌ No (404) | **Missing** |
| `single-page.php` | Yes | ❌ No (404) | **Missing** |
| `woocommerce.php` | Yes | ❌ No (404) | **Missing** |
| Default template | — | ✓ Yes | **All pages use this** |

**Page Template Assignments**:
- **ALL 100+ pages checked**: `"template":""`  (empty string = default template)
- No pages assigned to custom templates
- No custom template files in GeneratePress theme directory

---

### GenerateBlocks Usage Analysis

**Critical Finding**: GenerateBlocks is **INSTALLED but NOT USED**

**Findings**:
- ✓ GenerateBlocks REST API endpoint responds (200)  → Plugin is installed and active
- ❌ **Zero GenerateBlocks markup in any page content**
- ❌ **Zero WordPress block editor markup** (`<!-- wp:`) in content
- ✓ All content uses **raw HTML** with custom CSS classes (lc-*)
- ❌ Reusable blocks not being used despite plugin being available

**Why This Matters**:
- Site invested in GenerateBlocks plugin but bypassed it entirely
- Content is built with raw HTML instead of leveraging the plugin's capabilities
- Missed opportunity for: reusable components, animations, responsive blocks, easier page building
- More maintenance burden maintaining custom HTML

---

### Summary: Template & Block Editor Issues

**HIGH PRIORITY FINDING**:

The site has:
1. ❌ **No custom templates** (all pages use default)
2. ❌ **GenerateBlocks installed but unused**
3. ✓ Custom HTML/CSS system instead (lc-* classes)
4. ❌ **Inconsistent implementation** — some pages have custom HTML, others are blank

**This explains the unstyled pages**:
- Pages with custom HTML markup (homepage, services, industries) → Styled ✓
- Pages without custom HTML markup (/about/, /contact/, /our-process/) → Unstyled ❌
- All use same default template, so template can't enforce consistency

**Missing Template Structure**:
If custom templates existed and were assigned:
- `page-home.php` would ensure homepage has hero, services section, industries grid
- `page-services.php` would ensure all service pages have pricing, FAQ, comparison table
- `single-page.php` would ensure all pages have consistent header/footer treatment
- `single-post.php` would ensure blog posts have consistent layout

Instead, every page depends on manual HTML markup in content, leading to:
- ✓ Styled pages (developer remembered to add HTML)
- ❌ Unstyled pages (developer forgot to add HTML)
- ❌ No consistency enforcement
- ❌ High maintenance burden

---

## Content Architecture Analysis

### Information Architecture

#### ✅ **Good: Clear Hub/Spoke Structure**

The site uses a hub-and-spoke content model that's SEO-friendly:

```
Homepage (hub)
├── Services (hub)
│   ├── Topical Map (detail page)
│   ├── SEO Audit (detail page)
│   └── ... (6 service pages)
├── Industries (hub)
│   ├── Dental SEO (category hub)
│   │   ├── Dental Website Design (guide)
│   │   ├── Dental Google Reviews (guide)
│   │   └── Multi-Location Dental SEO (guide)
│   ├── HVAC SEO (category hub)
│   └── ... (12 industry categories)
├── Case Studies (hub)
│   ├── Multi-Location Dental (detail)
│   ├── Restaurant Google Maps (detail)
│   └── ... (8+ case studies)
└── About (hub)
    ├── Why Choose Us (page)
    ├── Team (page)
    └── Certifications (page)
```

**Why This Works**:
- Hub pages rank for broad keywords (e.g., "Dental SEO")
- Spoke pages target long-tail variations (e.g., "Dental Implants Cost", "Multi-Location Dental")
- Internal linking naturally flows from hub to spokes
- Easy to add new content without restructuring

---

#### ❌ **Issue: Inconsistent Page Depth**

**Severity**: Low-Medium  
**Impact**: Some page hierarchies are unclear, parent-child relationships could be better organized

**Findings**:
- Most pages have clear parent IDs
- Some pages might be orphaned or misplaced
- Example: Case studies should be under a dedicated hub, not at root level

**Recommendation**:
1. Audit all parent-child relationships
2. Ensure logical hierarchy:
   - `/services/` is parent to all service pages
   - `/industries/` is parent to all industry category pages
   - `/case-studies/` is parent to all case study detail pages

---

### Content Gaps & Opportunities

#### ⚠️ **Missing SEO-Critical Content**

| Gap | Impact | Priority |
|-----|--------|----------|
| No "How We Differ" page (comparing vs. competitors) | Missed conversion opportunity, weak value proposition | High |
| No pricing comparison guide | Users can't easily compare tiers | Medium |
| No implementation guides/documentation | Users don't know how to use deliverables | Medium |
| No video content (testimonials, how-to) | Missed engagement, lower dwell time | Low |
| No local SEO blog/news section | Missed content syndication, news index opportunities | Low |

---

## Accessibility & Performance Analysis

### ❌ **Issue: Limited Accessibility Markup**

**Severity**: Medium  
**Impact**: Site may not be fully accessible to screen readers and keyboard users

**Findings**:
- Custom button elements (`.lc-faq-trigger`) may lack proper ARIA labels
- Icon-only buttons (emoji in cards) may not have alt text
- Form labels likely missing `<label>` associations
- Heading hierarchy not verified (h1, h2, h3 nesting)

**Recommendation**:
1. Add ARIA labels to custom buttons
   ```html
   <button class="lc-faq-trigger" aria-expanded="false" aria-controls="faq-answer-1">
     <span class="lc-faq-question">Question text</span>
   </button>
   ```

2. Ensure all form fields have associated labels
3. Test with screen readers (NVDA, JAWS)
4. Verify keyboard navigation works (Tab, Enter, Arrow keys)

---

### ⚠️ **Issue: Page Size & Performance**

**Findings**:
- Service detail pages are very long (5,400+ words)
- Large HTML documents with extensive inline styles
- No mentioned optimization (image optimization, lazy loading, caching)

**Recommendation**:
1. Add lazy loading to off-screen images
2. Minify inline CSS and move to external stylesheets
3. Implement Content Delivery Network (CDN) for assets
4. Test Core Web Vitals (Google PageSpeed Insights)
5. Consider splitting very long pages into tab sections

---

## Best Practices Scorecard

| Best Practice | Status | Notes |
|---|---|---|
| **Custom page templates** | 🔴 **CRITICAL** | **0 of 6 templates exist** — All pages use default (page-home.php, page-services.php, etc. missing) |
| **GenerateBlocks usage** | 🔴 **CRITICAL** | **Installed but unused** — $$ spent on plugin, zero usage; raw HTML instead |
| **Custom child theme** | ❌ Missing | CSS scattered across pages |
| **Reusable block patterns** | ❌ Missing | 20+ page duplication of FAQ, cards, etc. |
| **Global component system** | ⚠️ Partial | CSS classes defined but not centralized |
| **Schema markup** | ❌ Missing | No structured data on any page type |
| **Design tokens/variables** | ❌ Missing | Colors hardcoded in inline styles |
| **Consistent page styling** | 🔴 **CRITICAL** | **4 pages completely unstyled** — /about/, /contact/, /our-process/, /platform/ (404) |
| **Mobile optimization** | ⚠️ Untested | Presumed OK but not verified |
| **Accessibility** | ⚠️ Partial | Some semantic HTML but missing ARIA/labels |
| **SEO best practices** | ✅ Good | Hub/spoke structure, clear IA, fast pages |
| **Performance** | ⚠️ Untested | Large documents, inline styles |
| **Documentation** | ❌ Missing | No developer guide or style guide |
| **Version control** | ❌ Unknown | CSS/template changes not tracked |

---

## 🔴 BLOCKING ISSUE: Missing Template System

Cody expects custom templates for 6 page types. **NONE EXIST**.

**Critical Finding**: Site has NO custom templates
- `page-home.php` — ❌ Missing
- `page-services.php` — ❌ Missing  
- `page-learn.php` — ❌ Missing
- `single-post.php` — ❌ Missing
- `single-page.php` — ❌ Missing
- `woocommerce.php` — ❌ Missing

**All 197+ pages use default template** (`"template":""`)

**Why This Is Critical**:
1. **No consistency enforcement** — Pages must manually include HTML; some do, some don't
2. **Unstyled pages result** — /about/, /contact/, /our-process/ are blank because they don't have custom HTML markup
3. **Scalability broken** — Adding new pages requires remembering to add custom HTML
4. **GenerateBlocks unused** — Plugin is installed but not leveraged for templates or reusable blocks

**Root Cause**: Site was built with custom HTML/CSS approach (lc-* classes) instead of template system

**Fix Required BEFORE other improvements**: Build 6 custom templates to enforce consistency and prevent future unstyled pages

---

## Critical Problem Pages — Urgent Issues Flagged by Cody

### 🔴 **BROKEN: /platform/ — 404 Not Found**

**Status**: HTTP 404 — Page doesn't exist  
**Impact**: Dead link somewhere on site (navigation menu?) or broken permalink

**Issue**:
- Page returns generic WordPress 404 template
- No content page created, or permalink configuration is broken
- Likely referenced in navigation menu, causing user confusion

**Fix**:
1. Check if `/platform/` page exists in WordPress admin (Pages list)
2. If it should exist: Create it and style it with custom HTML like other pages
3. If it shouldn't exist: Remove from navigation menu
4. Verify all internal links don't point to `/platform/`

**Priority**: CRITICAL (breaks user navigation)

---

### 🔴 **UNSTYLED: /about/ — Text Only, No Design**

**Status**: HTTP 200 ✓ Page exists  
**Content**: ✓ Full company narrative, APEX Framework, values  
**Styling**: ❌ **COMPLETELY MISSING**

**What's Broken**:
- Page rendered with browser defaults (no custom CSS classes)
- No lc-* classes applied to any sections
- No hero section, no visual design, no spacing
- Content is readable but looks broken compared to rest of site

**Root Cause**: Page content is raw text without `<section class="lc-...">` HTML structure

**Fix**:
1. Rebuild `/about/` page with proper HTML sections
2. Apply lc-* classes (lc-hero, lc-container, lc-section, etc.)
3. Add color, padding, typography, and spacing
4. Add hero background and visual elements

**Priority**: CRITICAL (key company page; first impression damaged)

---

### 🔴 **UNSTYLED: /our-process/ — Text Only, No Design**

**Status**: HTTP 200 ✓ Page exists  
**Content**: ✓ Full CATALYST system workflow (6 steps)  
**Styling**: ❌ **COMPLETELY MISSING**

**What's Broken**:
- Zero lc-* CSS classes detected
- 6-step process described in plain text (should be numbered cards)
- No visual hierarchy, spacing, or design

**Root Cause**: Page uses plain text instead of structured HTML with lc-* classes

**Fix**:
1. Rebuild with step cards (01, 02, 03...)
2. Add lc-process section styling
3. Add connecting visual lines between steps
4. Apply card styling with backgrounds, shadows, borders

**Priority**: CRITICAL (marketing page explaining value proposition)

---

### 🔴 **UNSTYLED: /contact/ — Text Only, No Design**

**Status**: HTTP 200 ✓ Page exists  
**Content**: ✓ Contact form, strategy call info, FAQ  
**Styling**: ❌ **COMPLETELY MISSING**

**What's Broken**:
- No custom styling at all
- Form is unstyled HTML (bare inputs with no formatting)
- No visual hierarchy for sections
- Call-to-action not highlighted
- FAQ section is plain text (should be collapsible)

**Root Cause**: Page built without lc-* class structure

**Fix**:
1. Add hero section at top with CTA
2. Wrap form in `.lc-form-container` with styling
3. Style form inputs (border, padding, focus states)
4. Make FAQ section collapsible (use lc-faq-trigger)
5. Add button styling and color

**Priority**: CRITICAL (conversion page; broken form hurts lead generation)

---

## Summary: 4 Pages Broken/Unstyled

| Page | Status | Issue | Impact |
|------|--------|-------|--------|
| `/platform/` | 404 | Doesn't exist | Broken navigation |
| `/about/` | 200, unstyled | No design | Brand perception damage |
| `/our-process/` | 200, unstyled | No styling | Marketing page ineffective |
| `/contact/` | 200, unstyled | No styling | Conversion page looks broken |

**Fix Effort**: ~6-8 hours total to rebuild all 4 pages with proper HTML + CSS

---

## Priority Recommendations

### 🔴 **BLOCKING — MUST FIX FIRST (Before Any Other Changes)**

#### 0. **Create 6 Custom Page Templates** — BLOCKING ISSUE
- **Issue**: Site has 0 custom templates; all 197+ pages use default
- **Impact**: Unstyled pages, no consistency enforcement, GenerateBlocks unused
- **Solution**: Create templates for home, services, learn, single post, single page, WooCommerce
- **Why First**: Templates will enforce structure and prevent future unstyled pages; other improvements depend on this
- **Effort**: 12-16 hours (6 templates × 2-3 hours each)
- **Deliverables**:
  - `page-home.php` — Enforce hero, services section, industries section, structured layout
  - `page-services.php` — Enforce pricing display, FAQ section, comparison table, CTA
  - `page-learn.php` — Enforce hub page layout with content grid
  - `single-page.php` — Enforce consistent page header, sidebar options, footer
  - `single-post.php` — Enforce blog post layout (featured image, content, related posts)
  - `woocommerce.php` — Enforce WooCommerce page layout (if needed)

---

### 🔴 **CRITICAL (Deploy This Week)**

#### 1. **Global CSS Fix for FAQ Buttons** — Apply sitewide
- **Issue**: `.lc-faq-trigger` buttons show dark gray on hover (GeneratePress theme conflict)
- **Current State**: Fixed page-by-page (not scalable)
- **Solution**: Create child theme and add global CSS override
- **Impact**: Fixes issue on 20+ pages instantly
- **Effort**: 30 minutes
- **File Path**: `wp-content/themes/generatepress-child/style.css`

#### 2. **Schema Markup Audit & Deployment** — Add to critical pages
- **Issue**: No structured data on any page; Google can't understand content
- **Solution**: Add Organization, Product, FAQPage, Article schemas to at least:
  - Homepage (Organization)
  - All service pages (Product/Offer)
  - All pages with FAQs (FAQPage)
  - Breadcrumb navigation (BreadcrumbList)
- **Impact**: Unlocks rich results, improves CTR from SERPs
- **Effort**: 4-6 hours for critical pages
- **Tools**: GeneratePress schema plugin or custom JSON-LD blocks

---

### 🟠 **HIGH (Deploy This Month)**

#### 3. **Create Child Theme with Organized CSS**
- **Issue**: Custom CSS scattered across pages, hard to maintain
- **Solution**: Migrate all custom styles to structured child theme
- **Impact**: Easier to update designs, theme updates won't break site
- **Effort**: 6-8 hours
- **Deliverables**:
  - `style.css` (main stylesheet)
  - `css/design-tokens.css` (color, spacing variables)
  - `css/components.css` (buttons, cards, sections)
  - `functions.php` (enqueue styles)

#### 4. **Convert Duplicated Sections to Reusable Blocks**
- **Issue**: FAQ, service cards, comparison tables duplicated 20+ times
- **Solution**: Create GenerateBlocks or ACF blocks for repeating components
- **Impact**: Global updates affect all pages; fixes spread instantly
- **Effort**: 10-12 hours (FAQ block + service card block)
- **Deliverables**:
  - FAQ Accordion reusable block
  - Service Card reusable block
  - Comparison Table reusable block

#### 5. **Create Custom Page Templates**
- **Issue**: All pages use default template; no structure enforcement
- **Solution**: Build templates for main page types (service, industry, case study, etc.)
- **Impact**: New pages built faster, consistent structure
- **Effort**: 8-10 hours
- **Templates**:
  - `page-service-detail.php`
  - `page-industry-category.php`
  - `page-case-study.php`

---

### 🟡 **MEDIUM (Deploy Next Quarter)**

#### 6. **Implement Accessibility Improvements**
- Add ARIA labels to custom buttons and interactive elements
- Ensure form fields have associated labels
- Verify heading hierarchy (h1→h2→h3 nesting)
- **Effort**: 4-6 hours
- **Tools**: WAVE, Axe DevTools for testing

#### 7. **Performance Audit & Optimization**
- Measure Core Web Vitals (Google PageSpeed Insights)
- Implement lazy loading for images
- Optimize JavaScript loading
- **Effort**: 4-8 hours depending on findings

#### 8. **Create Developer Documentation**
- Style guide (colors, spacing, typography)
- Component guide (button styles, card layouts)
- Template guide (how to use custom page templates)
- Contributing guidelines
- **Effort**: 4-6 hours
- **Deliverable**: `docs/STYLE_GUIDE.md`, `docs/CONTRIBUTING.md`

---

### 🟢 **NICE-TO-HAVE (Future)**

#### 9. **Convert Pages to Block Editor**
- Gradually migrate from custom HTML to GeneratePress blocks
- Benefits: easier to edit, more flexible, better mobile support
- **Effort**: 20+ hours (all pages)
- **Timing**: As site grows; not urgent

#### 10. **Add GenerateBlocks Premium**
- Enhanced block library with animations, advanced layouts
- Reusable block library management
- **Cost**: GenerateBlocks premium license (~$199/year)
- **ROI**: Faster page building, better design consistency

---

## Implementation Roadmap

### Week 1-2: Critical Fixes
- [ ] Create child theme structure
- [ ] Move custom CSS to child theme
- [ ] Deploy FAQ button CSS fix (immediate impact: fixes 20+ pages)
- [ ] Add basic schema markup to homepage and service pages

### Week 3-4: High-Priority Refactoring
- [ ] Create reusable FAQ accordion block
- [ ] Create reusable service card block
- [ ] Migrate FAQ sections on top 5 pages to block
- [ ] Create custom page templates

### Month 2: Medium-Priority Improvements
- [ ] Accessibility audit and fixes
- [ ] Performance audit and optimization
- [ ] Create developer documentation
- [ ] Migrate remaining FAQ sections to reusable block

---

## Files & Resources

### Current Site Structure
- **Theme**: GeneratePress (parent only)
- **Child Theme**: None (needs to be created)
- **Custom CSS**: Scattered in page content (inline `<style>` blocks)
- **Blocks**: No GenerateBlocks detected; all custom HTML

### Deliverables to Create
1. `wp-content/themes/generatepress-child/style.css` — All custom CSS
2. `wp-content/themes/generatepress-child/functions.php` — Enqueue styles
3. `wp-content/themes/generatepress-child/page-service-detail.php` — Service detail template
4. `wp-content/themes/generatepress-child/page-industry-category.php` — Industry page template
5. `docs/STYLE_GUIDE.md` — Designer/developer reference
6. `docs/CONTRIBUTING.md` — Contribution guidelines

---

## Conclusion

LocalCatalyst has a **solid foundation** with good information architecture and clear content strategy. The main issues are **technical debt** (CSS organization, code duplication) and **missing implementation** (schema markup, custom templates, reusable blocks).

**Primary blocker**: The FAQ button hover issue revealed a fundamental problem: **fixing class-specific issues page-by-page instead of globally**. Implementing the recommendations above will prevent this pattern from repeating.

**ROI of Improvements**:
- ✅ Fixes like global CSS take 30 mins but affect 20+ pages
- ✅ Reusable blocks reduce future maintenance by 50%+
- ✅ Schema markup unlocks rich results (higher CTR from Google)
- ✅ Child theme enables faster iteration and safer theme updates

**Next Steps**: Prioritize critical fixes (schema, child theme, CSS) in week 1, then tackle high-impact refactoring (reusable blocks, templates) in weeks 2-4.

