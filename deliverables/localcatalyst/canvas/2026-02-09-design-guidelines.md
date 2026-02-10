# LocalCatalyst Design Guidelines for Builder
**Client:** LocalCatalyst (SEO Agency)  
**Created by:** Canvas Design Agent  
**Date:** February 9, 2026  
**Version:** 1.0  
**Audience:** Builder Agent (WordPress/Elementor Implementation)

---

## EXECUTIVE SUMMARY FOR BUILDER

This document provides everything you need to build the LocalCatalyst website according to the design system and wireframes. You have:

1. **Design System** (`2026-02-09-design-system.md`)
   - Complete color palette with WCAG AA verified contrast ratios
   - Typography system (Poppins headings, Inter body)
   - Reusable components (buttons, cards, forms, navigation)
   - Spacing & layout system
   - Interaction patterns

2. **Wireframes** (`2026-02-09-wireframes.md`)
   - Detailed page structures for all pages
   - Component reuse specifications
   - Responsive breakpoints
   - Content word count targets

3. **This Document:** Step-by-step implementation guide

---

## QUICK START: RECOMMENDED ASTRA TEMPLATE SELECTION

### Primary Template Recommendation: **Astra Premium "SEO Agency" Starter Template**

If available, use the SEO Agency v2 or SaaS Business template as the base. If not available, use:
- **Homepage Base:** "SaaS Business" or "Consulting Agency"
- **Service Pages Base:** "Service Single" template (duplicate 4x)
- **About Base:** "About Us" template
- **Contact Base:** "Contact" template
- **Blog/Case Studies:** Built-in Astra blog template

### Why This Approach?
- Saves 40% implementation time
- Pre-styled components reduce custom CSS
- Responsive grid already optimized
- Customization points are clear
- Easy to maintain and scale

---

## STEP 1: THEME SETUP & CUSTOMIZATION

### 1.1 Install and Activate Theme
```
1. Dashboard > Appearance > Themes
2. Click "Activate" on Astra Pro
3. Verify Premium Starter Templates are available
   - Appearance > Starter Templates
4. Begin with recommended template import
```

### 1.2 WordPress Customizer Settings

Access: **Appearance > Customize**

#### Site Identity
```
Site Title: LocalCatalyst
Tagline: Local SEO Agency | Google Business Profile Optimization
Logo: Import LocalCatalyst logo (if available; create if not)
  - Logo width: 150px (desktop), 120px (mobile)
  - Format: PNG with transparent background
  - Size: 1200x400px (provide 2x for retina)
Favicon: LocalCatalyst icon (32x32px)
```

#### Colors & Fonts

**Global Colors:**
```
Customize > Colors > Primary Color: #1D4F7C (LocalCatalyst Blue)
Customize > Colors > Accent Color: #F97316 (Action Orange)
Customize > Colors > Text Color: #1F2937 (Dark text)
Customize > Colors > Background Color: #FFFFFF (White)
Customize > Colors > Heading Color: #1D4F7C (Blue)
Customize > Colors > Link Color: #2563EB (Secondary Blue)
```

**Typography:**
```
Customize > Typography > Heading Font: Poppins
Customize > Typography > Body Font: Inter
Customize > Typography > Heading Font Weight: 700
Customize > Typography > Body Font Weight: 400
Customize > Typography > H1 Size: 48px (desktop), 32px (mobile)
Customize > Typography > H2 Size: 32px (desktop), 24px (mobile)
Customize > Typography > H3 Size: 24px (desktop), 20px (mobile)
Customize > Typography > Body Size: 16px
Customize > Typography > Line Height: 1.6 (body), 1.3 (headings)
```

#### Header Settings
```
Customize > Header > Header Style: Horizontal
Customize > Header > Header Width: Full Width
Customize > Header > Header Background: White (#FFFFFF)
Customize > Header > Header Border: 1px solid #E5E7EB
Customize > Header > Header Padding: 16px 24px
Customize > Header > Menu Font: Inter, 500, 16px
Customize > Header > Active Menu Color: #F97316 (orange bottom border)
Customize > Header > Menu Hover Color: #2563EB (text color)
```

#### Button Settings
```
Customize > Buttons > Button Style: Rounded
Customize > Buttons > Button Padding: 14px 28px
Customize > Buttons > Button Border Radius: 6px
Customize > Buttons > Primary Button Color: #F97316 (orange background)
Customize > Buttons > Primary Button Text Color: #FFFFFF (white text)
Customize > Buttons > Button Hover Color: #EA580C (darker orange)
Customize > Buttons > Secondary Button Color: #1D4F7C (blue background)
Customize > Buttons > Secondary Button Text Color: #FFFFFF (white text)
```

#### Footer Settings
```
Customize > Footer > Footer Background: #1F2937 (dark charcoal)
Customize > Footer > Footer Text Color: #D1D5DB (light gray)
Customize > Footer > Footer Link Color: #D1D5DB
Customize > Footer > Footer Link Hover Color: #FFFFFF
```

#### Blog Settings
```
Customize > Blog > Blog Layout: Grid (3 columns)
Customize > Blog > Excerpt Length: 20 words
Customize > Blog > Show Post Meta: Yes (date, author, category)
Customize > Blog > Show Featured Image: Yes
```

---

## STEP 2: INSTALL REQUIRED PLUGINS

### Essential Plugins (Required)
```
1. Fluent Forms (Contact form builder)
   - Download/activate from WordPress.org
   - OR use Elementor Forms (built-in)
   
2. Google Site Kit
   - Connect Analytics, Search Console, PageSpeed Insights
   
3. WP Mail SMTP
   - Configure for form email delivery
   - SMTP: Gmail, SendGrid, or Mailgun
   
4. Ultimate Addons for Elementor (Premium)
   - Already included with Astra Pro license
   - Provides advanced widgets
```

### Optional but Recommended
```
1. WP Fluent SEO or RankMath SEO
   - Schema markup management
   - Sitemap generation
   - SEO optimization
   
2. Yoast SEO (if preferred)
   - Alternative to RankMath/Fluent SEO
   
3. Schema.org Pro
   - Advanced schema implementation
   
4. Elementor Pro (if not included)
   - Advanced page builder features
```

### Performance Plugins
```
1. Wp-Optimize or WP Super Cache
   - Caching and optimization
   
2. ShortPixel Image Optimizer
   - Image compression and WebP conversion
   
3. Lazy Load by WP Rocket
   - Lazy load images and iframes
```

---

## STEP 3: IMPORT STARTER TEMPLATE & CUSTOMIZE

### 3.1 Import Homepage Template
```
1. Appearance > Starter Templates > SEO Agency (or SaaS Business)
2. Click "Import"
3. Select "All Content" or "Only Settings" based on preference
4. Wait for import to complete
5. Go to Dashboard > Edit with Elementor
```

### 3.2 Homepage Structure (Per Wireframes)

Edit the imported homepage using Elementor:

**Section 1: Header Navigation**
- Already included in theme template
- Verify logo, nav items, CTA button are present
- Nav items should be: Home, Services (dropdown), Blog, About, Contact
- CTA button: "Get Free Audit" (orange, primary style)

**Section 2: Hero**
- Headline: "Dominate Local Search. Guaranteed Results."
- Subheadline: "Data-driven local SEO strategies that get your business to the top of Google Maps and search results."
- Hero height: 600px (desktop), 400px (mobile)
- Hero image: Illustration of search results/map (to be sourced)
- Buttons:
  - Primary: "Schedule a Free Strategy Call" (orange)
  - Secondary: "View Our Services" (ghost/outline)
- Hero background: Light gradient or solid white with blue accent shapes

**Section 3: Trust Badges**
- 4 stat boxes (responsive grid)
- Box 1: "500+ Successful Clients"
- Box 2: "98% Retention Rate"
- Box 3: "10+ Years in Industry"
- Box 4: "$10M+ Revenue Generated"
- Text styling: Stat number (H4, orange), label (P small, gray)

**Section 4: The Problem**
- Headline: "The Local Business Challenge"
- 2-column layout:
  - Left: Paragraph describing pain points
  - Right: 4-icon feature grid
- Icons with text:
  - "Buried in search results"
  - "Google Business Profile ignored"
  - "Competitors ranking higher"
  - "Missing local traffic"

**Section 5: Services Overview (4-Card Grid)**
- Card 1: Local SEO
  - Icon: Map pin (32px, orange)
  - Title: "Local SEO Domination"
  - Description: "Get ranked #1 in your local market with our proven methodology."
  - CTA: "Learn More" (link button)
- Card 2: Technical SEO
  - Icon: Cog (32px, orange)
  - Title: "Technical SEO Excellence"
  - Description: "Fix crawl issues, improve Core Web Vitals, and boost your rankings."
  - CTA: "Learn More"
- Card 3: On-Page Optimization
  - Icon: Document (32px, orange)
  - Title: "On-Page Mastery"
  - Description: "Optimize every page for search intent and user experience."
  - CTA: "Learn More"
- Card 4: GBP Optimization
  - Icon: Building (32px, orange)
  - Title: "Google Business Domination"
  - Description: "Maximize your GBP profile to drive calls, visits, and revenue."
  - CTA: "Learn More"
- Card styling: White background, 1px border, rounded corners, hover lift effect

**Section 6: APEX Framework (2-Column Alternating)**
- Section 6A: "The APEX Framework"
  - Left: Image (500x400px)
  - Right: Text
  - Headline: "The APEX Framework"
  - Paragraph: "Our proprietary 5-step methodology..."
  - List with icons:
    - Analyze
    - Plan
    - Execute
    - Xtract (data)
    - Expand
  - CTA: "Learn More About Our Process" (ghost button)

- Section 6B: "Data-Driven Decisions"
  - Left: Text
  - Right: Image (500x400px)
  - Headline: "Data-Driven Decisions"
  - Paragraph: "Every recommendation backed by data..."
  - List of data metrics tracked

- Section 6C: "Transparent Reporting"
  - Left: Image (500x400px)
  - Right: Text
  - Headline: "Transparent Reporting"
  - Paragraph: "Real dashboards, real results, no BS metrics..."

**Section 7: Case Studies (3-Card Grid)**
- Headline: "Real Results for Real Businesses"
- 3 case study cards:
  - Image (500x300px cover)
  - Category tag (industry name, orange pill)
  - Title: Case study name
  - Result metric: Large, orange (#F97316)
  - Description: 2-3 lines
  - CTA: "Read Full Case Study" (link)
- Bottom CTA: "View All Case Studies" (primary button, centered)

**Section 8: Testimonials Carousel**
- Headline: "What Our Clients Say"
- Carousel settings:
  - Show 3 cards (desktop), 2 (tablet), 1 (mobile)
  - Auto-rotate: 6 seconds
  - Controls: Previous/Next arrows
  - Pagination dots: Below carousel
- Card styling: 5 stars (gold), quote text, client name/company/role, 1px left border (orange accent)

**Section 9: ROI Calculator (Optional)**
- Headline: "What Could You Be Making?"
- Input fields:
  - "How many monthly searches?" (slider, 100-10,000)
  - "What's your conversion rate?" (slider, 1%-10%)
  - "Average customer value?" (number input, $0-$10,000)
- Output: "You could be generating $X/month from local search"
- CTA: "Let's Unlock This Revenue" (primary button)
- Note: May require custom code or third-party calculator plugin

**Section 10: Main CTA (Full-Width Gradient)**
- Background: Linear gradient (#1D4F7C to #2563EB)
- Padding: 96px 24px (desktop), 64px 24px (tablet), 48px 24px (mobile)
- Headline: "Ready to Dominate Your Local Market?" (H2, white, 40px)
- Subheading: "Get your free SEO audit and learn exactly what you need to rank higher." (P large, white, 18px)
- CTA Button: "Schedule Your Free Audit" (orange, white text, 18px padding)

**Section 11: Footer**
- See Step 4 (Footer Configuration)

---

## STEP 4: SERVICE PAGE SETUP (LOCAL SEO, TECHNICAL SEO, ON-PAGE, GBP)

### 4.1 Create Service Page Templates

Duplicate the imported "Service Single" template 4 times:

```
1. Go to Dashboard > All Pages
2. Find "Service Single" (or similar)
3. Right-click > Duplicate
4. Rename: "Service - Local SEO"
5. Edit with Elementor > Begin customization
6. Repeat 3 more times for Technical SEO, On-Page, GBP
```

### 4.2 Service Page Standard Structure

Each service page should follow this structure:

**Section 1: Header Navigation** (Inherited from theme)

**Section 2: Hero Section**
- Full-width, 600px height
- Headline: "[Service Name] Services" (e.g., "Local SEO Services")
- Subheadline: Service-specific benefit statement
- Hero image: Service-specific illustration
- Primary CTA: "Schedule a Strategy Call" (orange)
- Hero background: White or light gradient

**Section 3: Breadcrumb Navigation**
- Home > Services > [Service Name]
- Hide on mobile (<768px)

**Section 4: Overview Section (2 Columns)**
- Left (60%): 
  - Headline: "What is [Service Name]?"
  - 3-4 paragraphs explaining value and benefits
- Right (40%):
  - 3 stat boxes stacked
  - Stat 1: "X% higher click-through rate"
  - Stat 2: "X% more phone calls"
  - Stat 3: "X% ROI improvement"

**Section 5: Our Process (3-Column Grid)**
- Headline: "Our [Service Name] Process"
- 3 cards:
  - Icon (32px, orange)
  - Title: Process step
  - Description: 2-3 sentences

**Section 6-9: Deep-Dive Sections (2-Column Alternating)**
- Use Elementor columns with left/right swapping
- Each section:
  - Headline (H2, 32px, blue)
  - 2-3 paragraphs with subheadings
  - Image (500x400px)
  - Alternating left/right placement
  - Example for Local SEO:
    - 6A: GBP Optimization (left image, right text)
    - 6B: Citation Building (right image, left text)
    - 6C: Local Link Building (left image, right text)
    - 6D: Review Management (right image, left text)

**Section 10: Pricing Section**
- Headline: "Simple, Transparent Pricing"
- 2-3 pricing options (optional display):
  - Tier 1: Starter
  - Tier 2: Professional
  - Tier 3: Enterprise
- OR: Text-based: "Pricing varies based on competition level and service scope. Get a custom quote."
- CTA: "Request a Quote" (primary button)

**Section 11: FAQ Accordion**
- Headline: "Common Questions About [Service Name]"
- 4-6 FAQ items in accordion (toggle) format
- Use Elementor Accordion widget
- Example questions per service (see wireframes)

**Section 12: Related Services (3-Card Grid)**
- Headline: "Also Interested In..."
- 3 related service cards:
  - Title
  - Icon
  - Brief description
  - Link to service page

**Section 13: Service-Specific Case Studies (3-Card Grid)**
- Headline: "Recent [Service] Results"
- 3 case study cards (filtered by service)
- Use case study custom post type

**Section 14: Testimonials Carousel**
- Headline: "What [Service] Clients Say"
- 3 testimonials visible (service-filtered)
- Same carousel as homepage

**Section 15: Main CTA (Full-Width Gradient)**
- Same blue gradient as homepage
- Headline: "Ready to [Service Benefit]?" (e.g., "Ready to Dominate Your Local Market?")
- Subheading: "Schedule your free consultation with our [service] experts."
- CTA: "Schedule Your Free Consultation" (orange button)

**Section 16: Footer** (Inherited from theme)

### 4.3 Service-Specific Content

**LOCAL SEO SERVICE PAGE (/services/local-seo/)**
- Hero headline: "Local SEO Services - Get #1 Rankings in Your Area"
- Key sections:
  - Google Business Profile Optimization
  - Local Citation Building
  - Review Management & Reputation
  - Local Link Building
  - Service Area Optimization
- FAQ focus: GBP ranking factors, citation sources, review generation
- Case studies: Plumbing, dentistry, restaurants, roofing, law firms

**TECHNICAL SEO SERVICE PAGE (/services/technical-seo/)**
- Hero headline: "Technical SEO Services - Fix Your Crawl, Boost Rankings"
- Key sections:
  - Page Speed & Core Web Vitals
  - Site Structure & Crawl Optimization
  - Mobile-First Indexing
  - Schema Markup Implementation
  - ADA Compliance & Accessibility
- FAQ focus: Core Web Vitals, crawl budget, mobile indexing
- Case studies: Businesses with ranking stagnation, slow sites improved

**ON-PAGE OPTIMIZATION SERVICE PAGE (/services/on-page-optimization/)**
- Hero headline: "On-Page SEO Services - Optimize Every Page to Rank"
- Key sections:
  - Keyword Research & Selection
  - Content Optimization Framework
  - Meta Tags & Title Optimization
  - Internal Linking Strategy
  - User Experience & Intent Matching
- FAQ focus: Keyword optimization, meta descriptions, header structure
- Case studies: Content-heavy sites, e-commerce, B2B companies

**GBP OPTIMIZATION SERVICE PAGE (/services/google-business-profile-optimization/)**
- Hero headline: "Google Business Profile Optimization - Dominate the Map Pack"
- Key sections:
  - GBP Profile Completeness
  - Category & Service Area Optimization
  - Review Generation & Management
  - GBP Posts & Q&A Strategy
  - Photo & Video Optimization
- FAQ focus: GBP ranking factors, review generation, category selection
- Case studies: Service businesses, multiple locations, retail, professionals

---

## STEP 5: ABOUT PAGE SETUP

### 5.1 Import About Template
```
1. Appearance > Starter Templates
2. Select "About Us" template
3. Import and customize
```

### 5.2 About Page Structure

**Section 1: Hero**
- Headline: "The Team Behind LocalCatalyst"
- Subheadline: "Dedicated local SEO experts with 10+ years of industry experience."
- Hero image: Team photo (required)

**Section 2: Our Story (2 Columns)**
- Left: Narrative paragraphs
  - Company origin story
  - Why we started LocalCatalyst
  - Mission statement
- Right: Timeline or visual stats
  - Founded: [Year]
  - Clients Served: [Number]
  - Industries: [Number]
  - Team Size: [Number]

**Section 3: Values (3-Column Grid)**
- Card 1: Transparency (icon + description)
- Card 2: Excellence (icon + description)
- Card 3: Results (icon + description)

**Section 4: Featured Team Members**
- Headline: "Meet the Team"
- 3-4 team member cards:
  - Photo (300x300px, square)
  - Name (H4, 20px)
  - Title (P small, gray)
  - Bio (P, 14px)
  - Social links (optional)

**Section 5: Credentials & Certifications (4 Columns)**
- Google Partner Badge
- Google Ads Certification
- HubSpot Certified
- Other relevant certifications
- Each: Icon/image + name + year

**Section 6: Why Choose Us (4-Column Grid)**
- Card 1: "Proprietary APEX Framework" (icon + description)
- Card 2: "Data-Driven Methodology" (icon + description)
- Card 3: "Transparent Reporting" (icon + description)
- Card 4: "Dedicated Account Manager" (icon + description)

**Section 7: Testimonials Carousel**
- Client testimonials
- 3 visible (auto-rotate)

**Section 8: Main CTA (Blue Gradient)**
- "Let's Grow Your Business Together"
- CTA: "Schedule a Consultation" (orange button)

**Section 9: Footer**

---

## STEP 6: CONTACT PAGE SETUP

### 6.1 Import Contact Template
```
1. Appearance > Starter Templates
2. Select "Contact" template
3. Import and customize
```

### 6.2 Contact Page Structure

**Section 1: Hero**
- Headline: "Get in Touch"
- Subheadline: "Have questions? Let's talk about your SEO goals."
- No image (form is the focus)

**Section 2: Contact Info Cards (3 Columns)**
- Card 1: Call Us
  - Icon: Phone
  - "Call Us: [Phone Number]"
  - "Mon-Fri, 9am-6pm CST"
- Card 2: Email Us
  - Icon: Envelope
  - "Email: [Email Address]"
  - "Response within 24 hours"
- Card 3: Visit Us
  - Icon: Map Pin
  - "[Address]"
  - "Book a meeting"

**Section 3: Contact Form (2 Columns on Desktop)**
- Left: Fluent Forms form
  - Fields:
    - First Name (required)
    - Last Name (required)
    - Email (required)
    - Phone (required)
    - Company Name (optional)
    - Service Interested In (dropdown)
    - How did you hear about us? (dropdown)
    - Message (textarea, required)
    - Privacy checkbox (required)
    - Submit button: "Send Message" (orange)
  - Form styling: Per design system
  - Submit handler: Email to support email, auto-responder to user
- Right: "What to Expect" text
  - "1. We review your info (24 hours)"
  - "2. Schedule a strategy call (48 hours)"
  - "3. Discuss your goals and timeline"
  - "4. Get a custom proposal"

### 6.3 Fluent Forms Setup
```
1. Dashboard > Fluent Forms > All Forms
2. Create new form
3. Add fields per contact page spec
4. Configure confirmation email:
   - To: User's email (from form)
   - Subject: "We received your message"
   - Body: Standard confirmation text
5. Configure admin email:
   - To: contact@localcatalyst.com
   - Subject: "New contact form submission"
   - Body: Show all fields
6. Add reCAPTCHA v3 for spam protection
7. Embed form on contact page
```

**Section 4: FAQ Section**
- Headline: "Frequently Asked Questions"
- 5-6 FAQ items in accordion format
- Use Elementor Accordion widget

**Section 5: Calendly/ScheduleOnce Embed**
- Alternative CTA: "Prefer to schedule directly?"
- Embed calendar widget (Calendly recommended)
- Set availability to business hours

**Section 6: Main CTA (Blue Gradient)**
- "Don't want to fill out a form?"
- CTA: "Schedule a Call" (orange button)

**Section 7: Footer**

---

## STEP 7: CASE STUDIES & BLOG SETUP

### 7.1 Create Custom Post Types (if not built-in)

Use Elementor or custom code to create post types:

```php
// Add to functions.php or use a custom post type plugin
register_post_type( 'case_study', array(
  'public' => true,
  'label' => 'Case Studies',
  'menu_icon' => 'dashicons-format-gallery',
  'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
  'has_archive' => true,
) );
```

### 7.2 Case Studies Page Structure (/case-studies/)

**Section 1: Hero**
- Headline: "Our Case Studies"
- Subheadline: "Real results from real clients across industries"
- Stat highlights: 3 key metrics

**Section 2: Filter/Sort (Desktop Only)**
- Filter by Industry dropdown
- Filter by Service dropdown
- Sort by (Most Recent, Most Impressive Results)
- Active filters display

**Section 3: Case Study Grid (2 Columns)**
- Each card:
  - Image (500x300px, cover)
  - Industry tag (orange pill)
  - Title (H3, 24px)
  - Excerpt (2-3 lines)
  - Result metric (orange, bold)
  - Link: "Read Full Case Study"
- Pagination: Previous/Next or Load More button
- Responsive: 1 column mobile, 2 tablet, 2 desktop

**Section 4: Testimonial**
- Client quote
- Client photo
- Name, company, role
- 5-star rating

**Section 5: Main CTA (Blue Gradient)**
- "Want Similar Results for Your Business?"
- CTA: "Get Your Free Audit" (orange button)

**Section 6: Footer**

### 7.3 Individual Case Study Template

**Structure:**
- Hero: Company name, industry, result metric (large), featured image
- Challenge section: 2-3 paragraphs
- Solution section: Strategy explanation
- Results section: Metrics, graphs, before/after comparison
- Testimonial: Full quote from client
- Process breakdown: 4-5 steps
- Related case studies: 3-item grid
- CTA: "Get Similar Results" (orange button)
- Footer

### 7.4 Blog Index Page Structure (/blog/)

**Section 1: Hero**
- Headline: "The LocalCatalyst Blog"
- Subheadline: "SEO insights, strategies, and tips for local businesses"
- Search box: Search posts by keyword

**Section 2: Featured Post (Full-Width, 2 Columns)**
- Latest post featured prominently
- Image (600x400px, left)
- Title (H2, 40px)
- Excerpt
- Date, author, read time
- CTA: "Read Article" (ghost button)

**Section 3: Category Filter Pills**
- All Posts (active by default)
- Local SEO
- Technical SEO
- Google Business Profile
- On-Page SEO
- Clicking filters posts below

**Section 4: Blog Post Grid (3 Columns)**
- Each card:
  - Image (300x200px, cover)
  - Category tag (gray pill)
  - Title (H3, 20px)
  - Excerpt (2-3 lines)
  - Meta: Date | Author | Read time
  - Hover: Lift effect, image zoom, title color to blue
- Pagination: Load More or Previous/Next

**Section 5: Email Signup**
- Headline: "Get SEO Tips in Your Inbox"
- Subheading: "Subscribe to our weekly newsletter for local SEO strategies"
- Email input + Subscribe button
- Privacy text

**Section 6: Footer**

### 7.5 Individual Blog Post Template

**Structure:**
- Featured image (full-width, 600x400px)
- Title (H1, 48px)
- Meta: Date | Author | Read time | Category
- Post content: Multi-paragraph with headings, lists, images
- Sidebar (desktop only):
  - Table of contents (auto-generated)
  - Related posts (3 items)
  - Email signup card
  - CTA: "Need professional help?"
- Post navigation: Previous/Next post links
- Related posts section: 3-column grid
- CTA section: Blue gradient
- Breadcrumb: Home > Blog > [Category] > [Post Title]
- Comments section (enabled, moderated)
- Footer

---

## STEP 8: GLOBAL CUSTOMIZATIONS

### 8.1 Header & Navigation Customization

```
1. Dashboard > Menus > Create New Menu
2. Menu name: "Main Menu"
3. Add menu items:
   - Home (/)
   - Services (dropdown submenu)
     - Local SEO (/services/local-seo/)
     - Technical SEO (/services/technical-seo/)
     - On-Page Optimization (/services/on-page-optimization/)
     - GBP Optimization (/services/google-business-profile-optimization/)
   - Blog (/blog/)
   - About (/about/)
   - Contact (/contact/)
   - Resources (optional, /resources/)
4. Set Primary Menu location to "Primary Menu"
5. Customize > Header > Primary Menu Color: #1F2937
6. Customize > Header > Primary Menu Hover Color: #2563EB
7. Customize > Header > Primary Menu Active Color: #F97316
8. Add CTA Button using Elementor Header widget
   - Text: "Get Free Audit"
   - Link: /contact/
   - Style: Primary (orange)
```

### 8.2 Mobile Menu Customization

```
1. Customize > Mobile Header > Mobile Menu Style: Slide
2. Mobile Menu Background: #FFFFFF
3. Mobile Menu Text Color: #1F2937
4. Mobile Menu Icon: Hamburger (3 lines)
5. Mobile Menu Icon Color: #1F2937
6. Mobile Menu Close Icon: X
7. Verify menu items stack vertically on mobile
8. Ensure CTA button is full-width on mobile
```

### 8.3 Footer Customization

```
1. Create footer widget area with 4 columns
2. Column 1: Logo + Tagline
3. Column 2: Services (widget with 4 links)
4. Column 3: Resources (widget with 4 links)
5. Column 4: Company (About, Blog, Contact)
6. Add social icons widget:
   - Facebook
   - LinkedIn
   - Twitter
   - Google
7. Add copyright text: "© [Year] LocalCatalyst. All rights reserved."
8. Footer background: #1F2937
9. Footer text color: #D1D5DB
10. Footer link color: #D1D5DB (hover: #FFFFFF)
```

### 8.4 Sticky Header on Scroll

```
Customize > Header > Sticky Header: Enabled
Customize > Header > Sticky Header Height: 64px (reduced from 80px)
Customize > Header > Sticky Header Shadow: Yes
Customize > Header > Sticky Header Behavior: Fade in on scroll
```

### 8.5 Click-to-Call Button (Mobile Only)

```
1. Use Elementor widget or custom HTML
2. Button:
   - Text: Phone icon + "[Phone Number]"
   - Link: tel:[phone-number]
   - Position: Fixed, bottom-right
   - Size: 56px diameter (circular)
   - Background: #F97316
   - Icon color: #FFFFFF
   - Show only on mobile (<768px)
   - Hide on contact page
   - Z-index: 50
3. Styling:
   - Border-radius: 50%
   - Box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)
   - Hover: Darker orange, larger shadow
   - Transition: 200ms ease
```

### 8.6 Sticky CTA Bar (Below Footer)

```
1. Create custom HTML widget or code snippet
2. Position: Fixed bottom, above footer
3. Background: Linear gradient (#1D4F7C to #2563EB)
4. Padding: 16px 24px
5. Content: "Ready to dominate local search?" + "Schedule a Call" button
6. Show only on:
   - Blog posts
   - Case study pages
   - Service area pages
   - Hide on: Homepage, Contact, About
7. Hide on mobile (<768px)
8. Z-index: 40
```

---

## STEP 9: SCHEMA MARKUP IMPLEMENTATION

Use **WP Fluent SEO** or **RankMath** for schema implementation:

### 9.1 Organization Schema (All Pages)
```
1. Dashboard > SEO Settings > Schema
2. Organization type: Organization
3. Name: LocalCatalyst
4. Logo: [Upload logo]
5. Contact type: Customer Service
6. Phone: [Phone number]
7. Email: [Email address]
8. Address: [Company address]
9. Social profiles: Facebook, LinkedIn, Twitter, Google
```

### 9.2 LocalBusiness Schema (Homepage + About)
```
Type: ProfessionalService
Name: LocalCatalyst
Address: [Company address]
Phone: [Phone number]
Opening hours: Mon-Fri 9:00-18:00
Rating: 4.9/5.0 (add review count)
Image: [Office photo]
```

### 9.3 Service Schema (Each Service Page)
```
Type: Service
Service type: [e.g., Local SEO Services]
Provider: LocalCatalyst
Area served: United States
Offers: [List of included services]
```

### 9.4 FAQPage Schema (Service Pages)
```
1. Add manually or use plugin
2. Type: FAQPage
3. Main entity: Array of Question/Answer pairs
4. Question: FAQ question text
5. Answer: FAQ answer text
```

### 9.5 Article Schema (Blog Posts)
```
Type: Article
Headline: [Post title]
Image: [Featured image]
Author: [Author name]
Publisher: LocalCatalyst
Date Published: [Publish date]
Date Modified: [Last update date]
Description: [Post excerpt]
```

### 9.6 BreadcrumbList Schema (All Pages)
```
Applied to all pages except homepage
Item 1: Home (/)
Item 2: [Parent page]
Item 3: [Current page]
RankMath auto-generates these
```

---

## STEP 10: FORMS & CONVERSIONS

### 10.1 Contact Form Configuration

Create form with Fluent Forms (preferred):

```
1. Dashboard > Fluent Forms > All Forms > Create New Form
2. Add fields:
   - First Name (text, required)
   - Last Name (text, required)
   - Email (email, required)
   - Phone (phone, required)
   - Company Name (text, optional)
   - Service Interested In (select, required)
     * Local SEO
     * Technical SEO
     * On-Page Optimization
     * GBP Optimization
     * Other
   - How did you hear about us? (select, required)
     * Google
     * Referral
     * Social Media
     * Other
   - Message (textarea, required, min 20 characters)
   - Privacy checkbox (required)
     * "I agree to the privacy policy"
   - Submit button: "Send Message" (primary styling)
3. Confirmation message: "Thanks for reaching out! We'll be in touch within 24 hours."
4. Email notification to admin:
   - To: contact@localcatalyst.com
   - Subject: "New Contact Form Submission"
   - Body: Show all submitted fields
5. Auto-responder to user:
   - To: User's email (from form)
   - Subject: "We Received Your Message"
   - Body: Standard confirmation + next steps
6. Add reCAPTCHA v3 for spam protection
7. Conditional logic (optional):
   - Show additional fields based on service selection
```

### 10.2 Newsletter Signup Forms

Create in Fluent Forms:

```
1. Simple 2-field form:
   - Email (required)
   - Submit: "Subscribe" button
2. Confirmation: "Thanks for subscribing!"
3. Integration: MailChimp or ConvertKit
   - On submission: Add user to newsletter list
   - Tag: "Blog Subscriber" or "Website Newsletter"
4. Place on:
   - Blog sidebar (desktop)
   - Blog footer section
   - CTA sections on pages
```

### 10.3 Quote Request Form

Create in Fluent Forms:

```
1. Fields:
   - Name (required)
   - Email (required)
   - Phone (required)
   - Company (required)
   - Service Interested In (select, required)
   - Budget Range (select, optional)
   - Timeline (select, optional)
   - Additional details (textarea, optional)
2. Confirmation: "We'll send you a custom proposal within 24 hours."
3. Admin email: contact@localcatalyst.com
4. Linked to Contact CRM (optional: integrate with HubSpot)
```

### 10.4 Calendly Calendar Embed

```
1. Create Calendly account: calendly.com
2. Set availability:
   - Mon-Fri: 10am-5pm CST (30-min slots)
   - Buffer: 15 min between meetings
3. Set time zone: Central Time
4. Configure booking notification:
   - Confirm attendee emails
   - Redirect to thank you page
5. Embed on:
   - Contact page (in right sidebar)
   - Service pages (in CTA section)
   - Bottom CTA sections
6. Embed code:
   ```html
   <div class="calendly-inline-widget" data-url="https://calendly.com/[username]"></div>
   <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
   ```
```

---

## STEP 11: IMAGES & MEDIA REQUIREMENTS

### 11.1 Required Images

**Homepage:**
- Hero image: 1200x600px (illustration of search results/map)
- Service card icons: 48x48px (SVG preferred, or PNG)
- APEX Framework section images: 500x400px each
- Testimonial avatars: 80x80px each
- Case study featured images: 500x300px each

**Service Pages:**
- Service hero image: 1200x600px
- Process step icons: 32x32px each
- Deep-dive section images: 500x400px each

**About Page:**
- Team hero image: 1200x400px
- Team member photos: 300x300px each (headshots)
- Credential/certification logos: 200x100px each

**Blog:**
- Featured post image: 800x450px
- Blog post featured images: 600x400px
- Blog card images: 300x200px
- Author avatars: 80x80px

### 11.2 Image Optimization

```
1. Dimensions: Use exact sizes specified above
2. Format: JPG (photos/illustrations), PNG (icons/logos), WebP (all)
3. Compression: Use ShortPixel or similar
   - Target: < 100KB per image (desktop)
   - Target: < 50KB per image (mobile)
4. Lazy loading: Enable in WordPress/Elementor
5. Alt text: Descriptive, keyword-relevant (max 125 characters)
6. Responsive images: Use srcset for different breakpoints
7. Retina: Provide 2x versions for high-DPI displays

Example alt text:
- Service card: "Local SEO services icon"
- Team photo: "John Smith, SEO Strategy Lead at LocalCatalyst"
- Case study: "Case study results showing 165% traffic increase for plumbing business"
```

### 11.3 Image Sources

**Where to source images:**
- Icons: Heroicons (heroicons.com), Feather Icons
- Illustrations: Pexels, Unsplash, Pixabay (free licenses)
- Team photos: Stock photos (Unsplash, Pexels) or client-provided
- Case study images: Client-provided or relevant stock photos
- UI mockups: Use Figma or screenshot actual designs

---

## STEP 12: PERFORMANCE OPTIMIZATION

### 12.1 Core Web Vitals Optimization

```
1. LCP (Largest Contentful Paint) < 2.5s:
   - Optimize hero images (WebP, lazy loading)
   - Defer non-critical CSS/JS
   - Use CDN for static assets
   - Minimize render-blocking resources

2. FID (First Input Delay) < 100ms:
   - Minimize JavaScript
   - Break up long tasks
   - Use code splitting
   - Defer third-party scripts (analytics, ads)

3. CLS (Cumulative Layout Shift) < 0.1:
   - Reserve space for images (use aspect-ratio CSS)
   - Avoid inserting ads/content above fold
   - Prevent layout shifts on scroll
   - Use transform for animations (not position)

Tools to test:
- Google PageSpeed Insights
- WebPageTest
- GTmetrix
```

### 12.2 Caching Strategy

```
1. Browser caching:
   - Set expires headers for static assets (1 year)
   - Use .htaccess or header rules
   
2. Server-side caching:
   - WP Super Cache or WP-Optimize
   - Cache full pages (excluding forms, comments)
   - Cache TTL: 24 hours
   
3. Database optimization:
   - Run WP-Optimize to clean database
   - Optimize tables
   - Remove transient data
```

### 12.3 CDN Implementation

```
1. CloudFlare (free tier sufficient):
   - Enable automatic image optimization
   - Enable minification (CSS, JS, HTML)
   - Enable Brotli compression
   
2. Image delivery:
   - Use Cloudflare Image Optimization
   - Serve WebP to compatible browsers
   - Auto-resize for breakpoints
```

### 12.4 Font Loading Optimization

```
1. Google Fonts setup (already in design system):
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

2. Font display strategy:
   - Use display=swap for fastest text display
   - Subset fonts to necessary characters
   - Limit weights to essentials (4, 5, 6, 7, 8)
```

### 12.5 JavaScript Optimization

```
1. Defer non-critical scripts:
   - Analytics (Google Analytics, Hotjar)
   - Chat widgets (Drift, Intercom)
   - Third-party embeds (Calendly, Typeform)

2. Load order:
   - Critical: Navigation, forms
   - Deferred: Analytics, chat, embeds
   - Async: Non-blocking scripts

3. Code splitting:
   - Load carousel JS only on pages with carousels
   - Load calculator JS only on homepage
   - Remove unused CSS
```

---

## STEP 13: SEO & TECHNICAL SETUP

### 13.1 WordPress SEO Basics

```
1. Dashboard > Settings > General:
   - WordPress Address: https://localcatalyst.com (with HTTPS)
   - Site Address: https://localcatalyst.com
   
2. Dashboard > Settings > Permalinks:
   - Common Settings: Post name (/blog/[post-slug]/)
   - Category base: /category/
   - Tag base: /tag/
   
3. Dashboard > Settings > Discussion:
   - Disallow comments on front page
   - Close comments after 30 days
   - Moderate comments before publishing
```

### 13.2 Robots.txt & Sitemap

```
robots.txt (create at root):
User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/
Disallow: /wp-content/uploads/wpcf7_uploads/

Sitemap: https://localcatalyst.com/sitemap.xml

Automatically generated by RankMath or Yoast SEO
```

### 13.3 Canonical Tags

```
1. RankMath/Yoast automatically adds canonical tags
2. Verify in HTML source:
   <link rel="canonical" href="https://localcatalyst.com/services/local-seo/">

3. Manual override (if needed):
   - Edit page in SEO plugin
   - Set canonical URL to primary version
```

### 13.4 Meta Descriptions & Open Graph

```
1. Each page should have unique meta description (155-160 chars)
2. Open Graph tags (for social sharing):
   - og:title
   - og:description
   - og:image (1200x630px)
   - og:url
   - og:type
   
3. Twitter Card tags:
   - twitter:card
   - twitter:title
   - twitter:description
   - twitter:image

4. RankMath/Yoast handles these automatically
```

### 13.5 SSL Certificate

```
1. Ensure HTTPS is enabled:
   - Dashboard > Settings > WordPress Address: https://...
   - Redirect HTTP to HTTPS (in .htaccess or Cloudflare)

2. Verify SSL:
   - Visit https://localcatalyst.com
   - Check for green lock in browser
   - No mixed content warnings
```

### 13.6 Google Search Console

```
1. Add property: https://localcatalyst.com
2. Verify ownership (HTML tag, DNS record, or Google Analytics)
3. Submit sitemap: https://localcatalyst.com/sitemap.xml
4. Check coverage (index all pages, remove 404s)
5. Set up manual actions alerts
6. Monitor Core Web Vitals in report
```

### 13.7 Google Analytics

```
1. Create Google Analytics 4 property
2. Add tracking code to WordPress
3. Track events:
   - Contact form submissions
   - CTA button clicks
   - Phone number clicks (mobile)
   - Calendar booking clicks
   - Download clicks (resources)
4. Set conversion goals for key actions
```

---

## STEP 14: SECURITY & MAINTENANCE

### 14.1 Security Setup

```
1. Install Wordfence Security (free):
   - Enable 2FA for admin accounts
   - Set up IP whitelisting (optional)
   - Daily security scans

2. Database security:
   - Use strong passwords (minimum 16 characters)
   - Never use "admin" as username
   - Limit login attempts (5 tries, 15-min lockout)

3. Backups:
   - Set up automated backups (daily)
   - UpdraftPlus or BackWPup (free plugins)
   - Store backups off-site

4. SSL certificate:
   - Auto-renew enabled (Let's Encrypt)
   - No expired or self-signed certs
```

### 14.2 Maintenance Tasks

```
Daily:
- Monitor contact form submissions
- Respond to comments (moderated)

Weekly:
- Check Google Search Console for crawl errors
- Review website analytics
- Monitor uptime (Uptime Robot)

Monthly:
- Update WordPress, plugins, theme
- Review security scan reports
- Update content (case studies, testimonials)
- Publish new blog posts (2-4 per month)

Quarterly:
- Run full website audit
- Update case studies
- Review and improve conversion metrics
- Check SEO rankings for target keywords
```

### 14.3 Update & Testing Schedule

```
1. Updates:
   - Always test in staging environment first
   - Create backup before updating
   - Update frequency: Weekly or as needed
   
2. Staging site:
   - Maintain clone of live site
   - Test updates before going live
   - Test new plugins/features
   
3. Testing checklist:
   - All forms submit correctly
   - All links work (internal + external)
   - Images load on all breakpoints
   - Mobile responsiveness
   - Core Web Vitals (< 2.5s LCP)
   - No JavaScript errors in console
```

---

## STEP 15: ANALYTICS & CONVERSION TRACKING

### 15.1 Google Analytics Events

```
Set up event tracking for key conversions:

1. Contact form submissions
   - Event name: form_submit
   - Parameters: form_name=contact, form_type=contact

2. CTA button clicks
   - Event name: button_click
   - Parameters: button_name=[CTA text], button_type=primary

3. Phone number clicks (mobile)
   - Event name: phone_click
   - Parameters: phone_number=[number]

4. Calendar booking
   - Event name: calendar_booking
   - Parameters: service_type=[service]

5. Resource downloads (if applicable)
   - Event name: resource_download
   - Parameters: resource_name=[file]
```

### 15.2 Conversion Goals

```
Set up conversion goals in Google Analytics:

1. Contact form submission
   - Goal type: Event
   - Event name: form_submit
   - Value: $0 (or estimate customer value)

2. Phone call click
   - Goal type: Event
   - Event name: phone_click

3. Calendar booking
   - Goal type: Event
   - Event name: calendar_booking
```

### 15.3 Monthly Reporting

```
Key metrics to track:

1. Traffic:
   - Total sessions
   - New vs returning visitors
   - Traffic by source (organic, direct, referral)
   - Top landing pages

2. Engagement:
   - Avg session duration
   - Pages per session
   - Bounce rate by page
   - Scroll depth

3. Conversions:
   - Contact form submissions
   - Phone clicks
   - Calendar bookings
   - Conversion rate (%)

4. SEO:
   - Rankings for target keywords
   - Organic traffic growth
   - Impressions in GSC
   - Click-through rate (CTR)
```

---

## COMMON CUSTOMIZATION REQUESTS

### Add a "Resources" Page

```
1. Create new page: /resources/
2. Structure:
   - Hero section (headline + subheading)
   - Resource cards (3 columns):
     * Icon
     * Title
     * Description
     * CTA: "Download" or "View"
   - Possible resources:
     * SEO Checklist (PDF download)
     * Local SEO Whitepaper (email gate)
     * Technical SEO Audit Template
     * GBP Optimization Guide
     * Competitive Analysis Template
3. Use Elementor to build page
4. Add gated downloads (email capture)
```

### Add Pricing Tables

```
1. Create pricing page or add to service pages
2. Structure:
   - Headline: "Simple, Transparent Pricing"
   - 3 pricing tiers (Starter, Professional, Enterprise)
   - Each tier includes:
     * Price (monthly or annual)
     * Included features (bulleted list)
     * CTA button
   - Use Elementor pricing table widget
3. Or use text-based "custom quote" approach
```

### Add Team Member Bios

```
1. Edit About page
2. Add 1-4 team member cards with:
   - Photo (300x300px, square)
   - Name
   - Title/Role
   - Bio (2-3 sentences)
   - Social links (LinkedIn, Twitter)
3. Create individual team member pages if needed
```

---

## TROUBLESHOOTING COMMON ISSUES

### Form Not Submitting
```
1. Check spam/filter
2. Verify email configuration (WP Mail SMTP)
3. Check browser console for JS errors
4. Test with reCAPTCHA disabled temporarily
5. Check form field validation rules
```

### Slow Page Load
```
1. Check LCP metric (Google PageSpeed Insights)
2. Optimize hero image (WebP, compression)
3. Defer third-party scripts (analytics, chat)
4. Enable caching plugin (WP Super Cache)
5. Check Core Web Vitals individually
```

### Mobile Navigation Not Working
```
1. Check hamburger menu widget
2. Verify z-index on mobile menu (1000+)
3. Test on actual mobile device
4. Check Elementor responsive settings
5. Ensure menu items are clickable on mobile
```

### Schema Markup Not Showing
```
1. Check RankMath/Yoast settings
2. Verify schema in source code (Ctrl+U)
3. Test in Google Rich Results Test
4. Ensure all required fields are filled
5. Wait 48 hours for Google to re-crawl
```

---

## FINAL CHECKLIST BEFORE LAUNCH

### Content
- [ ] All page copy is complete and proofread
- [ ] All images are optimized and in place
- [ ] All internal links are working
- [ ] All external links are correct

### Design
- [ ] All pages match design system colors
- [ ] Typography matches specification
- [ ] Spacing and alignment consistent
- [ ] Responsive on mobile/tablet/desktop
- [ ] All buttons and forms styled correctly

### Forms & CTAs
- [ ] Contact form fully functional
- [ ] Email notifications working
- [ ] Calendly/ScheduleOnce integrated
- [ ] All CTAs have correct links
- [ ] Click-to-call works on mobile

### SEO & Analytics
- [ ] All pages have meta descriptions
- [ ] All images have alt text
- [ ] Schema markup implemented
- [ ] Sitemap generated and submitted
- [ ] Google Search Console verified
- [ ] Google Analytics tracking
- [ ] Robots.txt configured
- [ ] SSL certificate active

### Performance
- [ ] Lighthouse score 90+
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms
- [ ] All images optimized
- [ ] Caching enabled

### Security
- [ ] SSL certificate active
- [ ] 2FA enabled on admin accounts
- [ ] Backup system working
- [ ] Wordfence security enabled
- [ ] No outdated plugins

### Accessibility
- [ ] All forms have labels
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] No broken links (404s)
- [ ] Focus states visible
- [ ] Alt text on all images

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## SUPPORT & QUESTIONS

For questions about the design system, wireframes, or implementation:

1. Review the design system document (colors, typography, components)
2. Review the wireframes document (page structures, content specs)
3. Check this guidelines document (implementation steps)
4. Test in staging environment before deploying to production
5. Contact design team for clarification on specifications

---

**Design Guidelines Version:** 1.0  
**Last Updated:** February 9, 2026  
**Status:** Ready for Builder Implementation  
**Next Step:** Build homepage first, then service pages, then supporting pages
