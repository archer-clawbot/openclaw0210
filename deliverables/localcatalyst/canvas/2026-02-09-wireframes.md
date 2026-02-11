# LocalCatalyst Wireframes & Page Specifications
**Client:** LocalCatalyst (SEO Agency)  
**Created by:** Canvas Design Agent  
**Date:** February 9, 2026  
**Version:** 1.0

---

## TABLE OF CONTENTS
1. Page Type Patterns
2. Homepage
3. Service Pages (Local SEO, Technical SEO, On-Page, GBP)
4. About Page
5. Contact Page
6. Case Studies Index
7. Blog Index

---

## PAGE TYPE PATTERNS & REUSABLE SECTIONS

### Hero Section (Full-Width)
```
Desktop (1024px+):
  Height: 600px
  Layout: 2 columns
    - Left (50%): Content area
      - Headline: H1 (48px, #1D4F7C)
      - Subheadline: P Large (18px, #6B7280)
      - CTA Button: Primary (orange)
      - Secondary CTA: Ghost button below
    - Right (50%): Image/Illustration
      - Image: 500x400px (cover)
      - Background: Gradient overlay (optional)

Tablet (768-1023px):
  Height: 500px
  Layout: 1.5 columns (slightly staggered)
    - Same left content
    - Image smaller, positioned right
    
Mobile (320-767px):
  Height: 400px
  Layout: 1 column, stacked
    - Full-width content
    - Image below (100% width, 250px height)
    - Headline: 32px
    - Subheadline: 16px
    
Background:
  - Light gradient: white to off-white, OR
  - Solid: #FFFFFF with blue accent shapes (SVG decoration)
  
Spacing:
  - Content top: 64px
  - Button spacing: 16px between CTAs
  - Section padding: 64px (desktop), 48px (tablet), 32px (mobile)
```

### Two-Column Content Section
```
Desktop:
  - Left (60%): Main content
    - Heading: H2 (32px)
    - Paragraph(s): P (16px, line-height 1.6)
    - List items (if applicable)
    - CTA Button
  - Right (40%): Image, icon grid, or visual element
  - Gap: 48px between columns

Tablet:
  - Left (55%): Same content
  - Right (45%): Image
  - Gap: 32px

Mobile:
  - Stacked 1 column
  - Content first, image below
  - Full width
```

### Three-Column Card Grid
```
Desktop:
  - 3 cards per row
  - Card width: calc(33.33% - 16px gap)
  - Gap: 24px

Tablet:
  - 2 cards per row
  - Card width: calc(50% - 16px gap)
  - Gap: 16px

Mobile:
  - 1 card per row
  - Card width: 100%
  - Gap: 16px
  
Card height: Auto (content-driven)
Hover state: Lift effect (translateY -4px), shadow increase
```

### Four-Column Icon Feature Grid
```
Desktop:
  - 4 features per row
  - Icon: 32px, centered
  - Title: H5 (16px)
  - Description: P Small (14px)
  - Padding: 20px
  
Tablet:
  - 2 per row
  
Mobile:
  - 1 per row
```

### CTA Section (Full-Width)
```
Background: Gradient (#1D4F7C to #2563EB)
Padding: 96px 24px (desktop), 64px 24px (tablet), 48px 24px (mobile)
Text Alignment: Center

Content:
  - Headline: H2 (40px, white)
  - Subheading: P Large (18px, white/light gray)
  - CTA Button: White text, orange background, 18px padding
  - Button hover: Darker orange

Optional:
  - Centered icon above headline (48px, white)
  - Decorative background pattern (subtle SVG)
```

### Testimonial Section
```
Background: #F9FAFB (off-white)
Padding: 64px 24px

Heading: H2 (32px, center)
Subheading: P (16px, center, gray)

Carousel/Slider:
  Desktop:
  - 3 cards visible
  - Testimonial cards: 300px width
  - Gap: 24px
  - Navigation: Previous/Next arrows
  
  Tablet:
  - 2 cards visible
  
  Mobile:
  - 1 card visible (full width)
  - Pagination dots below

Swipe support on mobile
Auto-rotate every 6 seconds (pause on hover)
```

### Footer Section
```
Background: #1F2937 (dark charcoal)
Padding: 48px 24px
Text Color: #D1D5DB (light gray)
Link Color: #D1D5DB, hover: #FFFFFF

Desktop Layout (4 columns):
  1. Logo & tagline (30% width)
  2. Services (20% width, 4 links)
  3. Resources (20% width, 4 links)
  4. Company (30% width)

Each column:
  - Section header: Poppins 600, 14px, white
  - Links: Inter 400, 14px, gray
  - Spacing: 16px between items

Bottom bar:
  - Copyright text (center)
  - Social icons (6 icons, right-aligned on desktop, center on mobile)

Mobile:
  - Stacked columns (100% width)
  - Social icons: centered
  - Padding: 32px 16px
```

### Trust Badge Section
```
Background: #F9FAFB or transparent
Padding: 32px 24px
Text: "Trusted by 500+ Local Businesses | 10+ Years in Industry | 98% Client Retention"

Desktop:
  - 3 badges in a row
  - Metric: H4 (28px, #F97316)
  - Label: P Small (14px, #6B7280)
  - Centered

Mobile:
  - Stacked vertically
  - Metric: H5 (20px)
  - Label: P (14px)
```

---

## 1. HOMEPAGE

### Page Structure & Scrolling Flow

```
1. Header/Navigation
   - Sticky header, white background
   - Logo (32px height)
   - Navigation: Home, Services (dropdown), Blog, About, Contact
   - Primary CTA: "Get Free Audit" (orange button)
   
2. Hero Section (600px height)
   - Headline: "Dominate Local Search. Guaranteed Results."
   - Subheadline: "Data-driven local SEO strategies that get your business to the top of Google Maps and search results."
   - CTA Button: "Schedule a Free Strategy Call" (orange, primary)
   - Secondary CTA: "View Our Services" (ghost button)
   - Image: Illustration of search results/map with upward arrow
   
3. Trust Badges Section (4-pack)
   - "500+ Successful Clients" | "98% Retention Rate" | "10+ Years in Industry" | "$10M+ Revenue Generated"
   
4. The Problem Section (2 columns)
   - Left: Text describing local business SEO challenges
   - Right: Icon grid (4 icons showing pain points)
     * "Buried in search results"
     * "Google Business Profile ignored"
     * "Competitors ranking higher"
     * "Missing local traffic"
   - CTA: "See How We Fix This" (link button)
   
5. Services Overview (4 cards)
   - Card 1: Local SEO
     * Icon: Map pin
     * Title: "Local SEO Domination"
     * Description: "Get ranked #1 in your local market with our proven methodology."
     * CTA: "Learn More" (link)
   
   - Card 2: Technical SEO
     * Icon: Cog/Wrench
     * Title: "Technical SEO Excellence"
     * Description: "Fix crawl issues, improve Core Web Vitals, and boost your rankings."
     * CTA: "Learn More" (link)
   
   - Card 3: On-Page Optimization
     * Icon: Document
     * Title: "On-Page Mastery"
     * Description: "Optimize every page for search intent and user experience."
     * CTA: "Learn More" (link)
   
   - Card 4: GBP Optimization
     * Icon: Building/Store
     * Title: "Google Business Domination"
     * Description: "Maximize your GBP profile to drive calls, visits, and revenue."
     * CTA: "Learn More" (link)
   
6. Our Approach (2 columns, alternating)
   - Section 1: Left image, right text
     * Headline: "The CATALYST Framework"
     * Description: "Our proprietary 5-step methodology..."
     * List: Analyze, Plan, Execute, Xtract (data), Expand
   
   - Section 2: Right image, left text (alternated)
     * Headline: "Data-Driven Decisions"
     * Description: "Every recommendation backed by data..."
   
   - Section 3: Left image, right text
     * Headline: "Transparent Reporting"
     * Description: "Real dashboards, real results, no BS metrics..."

7. Case Studies Section
   - Headline: "Real Results for Real Businesses"
   - 3 case study cards displayed
   - Each card: image, title, industry, result metric (green), link
   - CTA: "View All Case Studies" (primary button, centered)

8. Testimonials Section (Carousel)
   - Headline: "What Our Clients Say"
   - 3 testimonials visible (carousel)
   - Auto-rotate, swipe support
   - Previous/Next arrows
   - Rating: 5 stars per card

9. ROI Calculator Section (Optional)
   - Headline: "What Could You Be Making?"
   - Interactive calculator:
     * Input: "How many monthly searches?" (slider)
     * Input: "What's your conversion rate?" (slider)
     * Input: "Average customer value?" (number input)
   - Output: "You could be generating $X/month from local search"
   - CTA: "Let's Unlock This Revenue" (primary button)

10. CTA Section (Full-width, blue gradient)
    - Headline: "Ready to Dominate Your Local Market?"
    - Subheading: "Get your free SEO audit and learn exactly what you need to rank higher."
    - CTA: "Schedule Your Free Audit" (orange button, white text, 18px)

11. Footer
    - 4 columns: Logo, Services, Resources, Company
    - Social icons
    - Copyright

### Visual Hierarchy Notes
- H1 (hero headline) commands attention immediately
- Orange buttons create clear conversion path
- Case studies and testimonials build social proof
- Trust badges appear early to establish credibility
- CTA section near bottom captures remaining interest
- Multiple CTAs throughout (at least 1 per section)
```

---

## 2. SERVICE PAGES (Local SEO, Technical SEO, On-Page, GBP)

### Shared Structure for All Service Pages

```
1. Header/Navigation (same as homepage)

2. Service-Specific Hero Section
   - Full-width, 600px height
   - Headline: "[Service Name] Services" (e.g., "Local SEO Services")
   - Subheadline: Benefit-driven, specific to service
   - CTA: "Schedule a Strategy Call" (orange)
   - Image: Service-specific illustration
   
   Example for Local SEO:
   - Headline: "Local SEO Services That Dominate Your Market"
   - Subheadline: "Get ranked #1 in Google Maps, Local Pack, and organic search results for your service area."

3. Breadcrumb Navigation
   - Home > Services > Local SEO
   - Mobile: hidden on <768px

4. Overview Section (2 columns)
   - Left: Benefit-focused intro paragraph
     * "What is [Service]?"
     * 3-4 sentences explaining value
   - Right: Icon + stat boxes
     * Stat 1: "X% higher click-through rate"
     * Stat 2: "X% more phone calls"
     * Stat 3: "X% ROI improvement"

5. What We Do Section (3-column grid)
   - Title: "Our [Service] Process"
   - Card 1-3: Each step or deliverable
     * Icon
     * Title
     * Description (2-3 sentences)

6. Deeper Dive: 2-Column Alternating Sections (3-4 sections total)
   
   Example for Local SEO Service Page:
   
   Section A: "Google Business Profile Optimization"
   - Left: Image of GBP profile
   - Right: Text describing GBP audit, optimization, monitoring
   
   Section B: "Citation Building & Authority"
   - Left: Text
   - Right: List of major citation sources with icons
   
   Section C: "Local Link Building"
   - Left: Image
   - Right: Text describing strategy
   
   Section D: "Review Management & Reputation"
   - Left: Text
   - Right: Image/testimonial cards

7. Pricing/Investment Section
   - Headline: "Simple, Transparent Pricing"
   - Optional: 2-3 pricing tiers displayed
   - Text: "Pricing varies based on competition level and service scope. Get a custom quote."
   - CTA: "Request a Quote" (primary button)

8. FAQ Section
   - Headline: "Common Questions About [Service]"
   - 4-6 FAQ items (accordion or toggle)
   - Title and answer text
   - Schema markup: FAQSchema
   - Example questions:
     * "How long until I see results?"
     * "What's the difference between organic and local SEO?"
     * "Do you guarantee first-page rankings?"
     * "What if I'm not satisfied with results?"

9. Related Services (3 cards)
   - "Also interested in [Related Service]?"
   - Show 2-3 other services with links
   - Cards with icon + title + brief description

10. Case Studies Specific to This Service (3 cards)
    - Only show case studies relevant to this service
    - Each card: image, title, industry, result, link

11. Testimonials (Carousel, 3 visible)
    - Focus on testimonials from clients in similar industries
    - 5-star ratings
    - Quote, name, company, role

12. CTA Section (Blue gradient)
    - Headline: "Ready to [Service Benefit]?"
    - Example: "Ready to Dominate Your Local Market?"
    - Subheading: Benefit-focused
    - CTA: "Schedule Your Free Consultation" (orange)

13. Footer (same as homepage)

### Service-Specific Details

**LOCAL SEO SERVICE PAGE (/services/local-seo/)**
- Headline: "Local SEO Services - Get #1 Rankings in Your Area"
- Meta Focus: Citations, Google Business Profile, local reviews, local links
- Key Differentiator: "We specialize in Google Business Profile optimization"
- FAQ includes: GBP ranking factors, citation importance, review strategies
- Case studies: Local businesses (plumbers, dentists, restaurants, etc.)

**TECHNICAL SEO SERVICE PAGE (/services/technical-seo/)**
- Headline: "Technical SEO Services - Fix Your Crawl, Boost Rankings"
- Meta Focus: Page speed, Core Web Vitals, schema markup, site structure
- Key Differentiator: "We audit and optimize the technical foundation of your site"
- FAQ includes: Core Web Vitals, crawl budget, mobile-first indexing, ADA compliance
- Case studies: Businesses with ranking stagnation (before/after Core Web Vitals fixes)

**ON-PAGE OPTIMIZATION SERVICE PAGE (/services/on-page-optimization/)**
- Headline: "On-Page SEO Services - Optimize Every Page to Rank"
- Meta Focus: Content, keywords, meta tags, internal linking, user experience
- Key Differentiator: "Every page optimized for search intent and conversion"
- FAQ includes: Keyword optimization, meta descriptions, header structure, word count
- Case studies: Content-heavy sites, e-commerce, B2B companies

**GBP OPTIMIZATION SERVICE PAGE (/services/google-business-profile-optimization/)**
- Headline: "Google Business Profile Optimization - Dominate the Map Pack"
- Meta Focus: GBP profile setup, optimization, reviews, posts, Q&A
- Key Differentiator: "Specialized GBP expertise for maximum local visibility"
- FAQ includes: GBP ranking factors, review generation, category optimization, local pack
- Case studies: Service businesses with multiple locations, retail, professionals

---

## 3. ABOUT PAGE (/about/)

### Page Structure

```
1. Header/Navigation

2. Hero Section (500px)
   - Headline: "The Team Behind LocalCatalyst"
   - Subheadline: "Dedicated local SEO experts with 10+ years of industry experience."
   - Image: Team photo or office shot

3. Our Story Section (2 columns)
   - Headline: "Who We Are"
   - Left: Narrative text
     * Company origin story
     * Why we started LocalCatalyst
     * Our mission statement
   - Right: Timeline or visual representation
     * Founded: YYYY
     * Clients Served: 500+
     * Industries: 15+
     * Team Size: X people

4. Our Values Section (3 columns)
   - Card 1: "Transparency"
     * Icon
     * Description
   - Card 2: "Excellence"
     * Icon
     * Description
   - Card 3: "Results"
     * Icon
     * Description

5. Team Section
   - Headline: "Meet the Team"
   - Team member cards (3-4 featured, expandable)
   - Each card:
     * Photo (300x300px)
     * Name: H4 (20px)
     * Title: P Small (14px, gray)
     * Bio: P (14px)
     * Social links: LinkedIn, Twitter (optional)

6. Credentials & Certifications
   - Headline: "Proven Expertise"
   - 2 columns or 4-column grid:
     * Google Partner Badge
     * Google Marketing Professional Certification
     * HubSpot Certified
     * Other relevant certifications
   - Each: Icon/image + name + year

7. Why Choose LocalCatalyst (4 columns)
   - "Proprietary CATALYST Framework"
   - "Data-Driven Methodology"
   - "Transparent Reporting"
   - "Dedicated Account Manager"
   - Each with icon, title, description

8. Our Clients Say (Testimonials, carousel)
   - Headline: "What Our Clients Say"
   - 3 testimonials visible, auto-rotate
   - Focus on client satisfaction and results

9. CTA Section (Blue gradient)
   - "Let's Grow Your Business Together"
   - CTA: "Schedule a Consultation" (orange button)

10. Footer

### Accessibility Features
- All images have descriptive alt text
- Team bios available for screen readers
- Credentials section has semantic structure
- Team photo links to bio on click (optional interactive feature)
```

---

## 4. CONTACT PAGE (/contact/)

### Page Structure

```
1. Header/Navigation

2. Hero Section (400px)
   - Headline: "Get in Touch"
   - Subheadline: "Have questions? Let's talk about your SEO goals."
   - No image (form is the focus)

3. Contact Information Cards (3 columns on desktop, 1 on mobile)
   - Card 1: "Call Us"
     * Icon: Phone
     * Phone number (clickable)
     * Hours: "Mon-Fri, 9am-6pm CST"
   - Card 2: "Email Us"
     * Icon: Envelope
     * Email address (mailto link)
     * Response time: "Within 24 hours"
   - Card 3: "Visit Us"
     * Icon: Map pin
     * Address
     * "Book a meeting" link

4. Contact Form (2 columns: form left, info right on desktop; full width on mobile)
   - Form fields:
     * First Name (required)
     * Last Name (required)
     * Email (required, email validation)
     * Phone (required, phone format)
     * Company Name (optional)
     * Service Interested In (dropdown: Local SEO, Technical SEO, On-Page, GBP, Other)
     * How did you hear about us? (dropdown: Google, Referral, Social Media, Other)
     * Message (textarea, required)
     * Privacy checkbox: "I agree to the privacy policy" (required)
     * Submit Button: "Send Message" (orange, primary)
   
   - Form styling per design system
   - Real-time validation
   - Success message: "Thanks for reaching out. We'll be in touch within 24 hours."
   - Error handling: Clear error messages for each field
   
   - Right sidebar (desktop only):
     * "What to expect"
     * 1. We review your info (24 hours)
     * 2. Schedule a strategy call (within 48 hours)
     * 3. Discuss your goals and timeline
     * 4. Get a custom proposal

5. FAQ Section
   - Headline: "Frequently Asked Questions"
   - 5-6 FAQ items (accordion)
   - Questions: General contact, timeline, pricing inquiry, process, etc.

6. CTA Section (Blue gradient)
   - Alternative CTA: "Prefer to chat live? Click here to schedule a call"
   - CTA: "Schedule a Call" (orange button)
   - Calendar embed: Calendly or ScheduleOnce

7. Footer

### Form Configuration
- Email notifications: form submissions sent to support email
- Form submission handler: WordPress form plugin (Fluent Forms recommended)
- Auto-responder: Automatic "We received your message" email to user
- Spam protection: reCAPTCHA v3 (invisible)
- Compliance: GDPR-compliant (privacy policy linked)
```

---

## 5. CASE STUDIES INDEX PAGE (/case-studies/)

### Page Structure

```
1. Header/Navigation

2. Hero Section (500px)
   - Headline: "Our Case Studies"
   - Subheadline: "Real results from real clients across industries"
   - Stat highlights:
     * "X businesses ranked in top 3"
     * "X% average traffic increase"
     * "X% average lead increase"

3. Filter/Sort Options (Desktop only, stacked on mobile)
   - Filter by Industry: All, Plumbing, Dentistry, Roofing, Law, Real Estate, etc.
   - Filter by Service: All, Local SEO, Technical SEO, On-Page, GBP
   - Sort by: Most Recent, Most Impressive Results
   - Active filters display clearly

4. Case Studies Grid (2-column on desktop, 1 on mobile, 3-4 visible with pagination)
   - Each card:
     * Image (500x300px, cover)
     * Category tag (industry, e.g., "Plumbing") - orange background
     * Title: H3 (24px)
     * Excerpt: 2-3 sentences of challenge/solution
     * Result metric: H4 in orange (e.g., "165% Traffic Increase")
     * Link: "Read Full Case Study" (link button)
     * Hover: Lift effect, image zoom
   
   - Pagination: Previous/Next buttons OR load more button
   - OR infinite scroll with lazy loading

5. Testimonial from Each Featured Case Study
   - Quote from the featured client
   - Small client photo
   - Name, company, role
   - 5-star rating

6. CTA Section (Blue gradient)
   - "Want Similar Results for Your Business?"
   - Subheading: "Schedule a free consultation to discuss your SEO goals."
   - CTA: "Get Your Free Audit" (orange button)

7. Footer

### Individual Case Study Page Template (/case-studies/[company-name]/)
   - Same header/navigation
   - Hero: Company name, industry, result metric (large), featured image
   - Challenge section: 2-3 paragraphs describing the client's situation
   - Solution section: Explanation of strategy employed
   - Results section: Metrics, graph, before/after comparison
   - Quote/testimonial: Full quote from client
   - Process breakdown: 4-5 steps showing what we did
   - Related case studies: 3 similar case studies at bottom
   - CTA: "Get Similar Results" (primary button)
   - Footer
```

---

## 6. BLOG INDEX PAGE (/blog/)

### Page Structure

```
1. Header/Navigation

2. Hero Section (400px)
   - Headline: "The LocalCatalyst Blog"
   - Subheadline: "SEO insights, strategies, and tips for local businesses"
   - Search box: Search posts by keyword (optional, searchable)

3. Featured Post (Full-width, 2 columns)
   - Image: 600x400px (left)
   - Title: H2 (40px, left side)
   - Excerpt: P Large (18px)
   - Date, author, read time
   - CTA: "Read Article" (ghost button)

4. Category Filter/Navigation (Horizontal pill buttons)
   - "All Posts" (active by default)
   - "Local SEO"
   - "Technical SEO"
   - "Google Business Profile"
   - "On-Page SEO"
   - Click filters the posts below

5. Blog Post Grid (3 columns on desktop, 2 on tablet, 1 on mobile)
   - Each card:
     * Image: 300x200px (cover)
     * Category tag: Pills, gray background
     * Title: H3 (20px)
     * Excerpt: 2-3 lines of text
     * Date: P Small (12px, gray)
     * Author: P Small (12px, gray)
     * Read time: "5 min read" (P Small, gray)
     * CTA: "Read More" (implicit link on card)
   
   - Hover state: Lift effect, image zoom, title color change to blue
   - Pagination: Load more button OR Previous/Next

6. Email Signup Section
   - Headline: "Get SEO Tips in Your Inbox"
   - Subheading: "Subscribe to our weekly newsletter for local SEO strategies"
   - Email input: Placeholder "Enter your email"
   - Submit button: "Subscribe" (orange)
   - Privacy text: "We respect your privacy. Unsubscribe anytime."

7. Footer

### Individual Blog Post Template (/blog/[post-slug]/)
   - Featured image: Full-width, 600x400px
   - Title: H1 (48px)
   - Meta: Date | Author | Read time | Category
   - Post content: Multi-paragraph with headings, lists, images
   - Sidebar (right, desktop only):
     * Table of contents (auto-generated from H2/H3)
     * Related posts (3 items)
     * Email signup card
     * CTA: "Need professional help?" with button to contact page
   
   - Post navigation:
     * Previous post link (bottom)
     * Next post link (bottom)
   
   - Related posts section (3-column grid)
   - CTA section: "Implement these strategies? We can help." (blue gradient)
   - Breadcrumb: Home > Blog > [Category] > [Post Title]
   - Comments section: Enabled, moderated
   - Footer
```

---

## 7. DESIGN SPECIFICATIONS FOR BUILDER

### Page Template Recommendations (Astra Premium Starter Templates)

**Homepage:**
- Use Astra Premium "SEO Agency v2" or "SaaS Business" template
- Customization:
  - Update hero headline and subheadline
  - Replace colors with LocalCatalyst palette
  - Add 4-service card section
  - Add case studies carousel
  - Add testimonials carousel
  - Add ROI calculator (optional, requires custom code)

**Service Pages:**
- Use Astra Premium "Service Single" template
- Duplicate template 4x for each service
- Customization:
  - Update service-specific headline and content
  - Add 3-column feature grid
  - Add alternating 2-column sections
  - Add pricing section
  - Add FAQ accordion
  - Add related services cards
  - Add service-specific case studies
  - Add testimonials carousel

**About Page:**
- Use Astra Premium "About Us" template
- Customization:
  - Update company narrative
  - Add team member cards
  - Add credentials/certifications
  - Add 4-column benefits grid
  - Add testimonials carousel

**Contact Page:**
- Use Astra Premium "Contact" template
- Customization:
  - Add 3-column contact info cards
  - Implement contact form with Fluent Forms
  - Add calendar embed (Calendly)
  - Style form per design system
  - Add FAQ section

**Case Studies Page:**
- Use Astra Premium "Portfolio" template
- Customization:
  - Add filtering by industry and service
  - Create case study cards (2 columns)
  - Add pagination/load more
  - Create individual case study post type
  - Add related case studies widget

**Blog Index:**
- Use Astra Premium "Blog" template
- Customization:
  - Add category filter pills
  - Feature latest post prominently
  - Create 3-column post grid
  - Add email signup
  - Update post cards with author/date/read time

---

## RESPONSIVE BREAKPOINTS & MOBILE OPTIMIZATION

### All Pages Mobile Considerations
- Navigation: Hamburger menu on <768px
- Font sizes: Scale appropriately (H1: 48px desktop → 32px mobile)
- Buttons: Full-width on mobile (<100px width required)
- Forms: Single-column layout on mobile
- Images: Responsive with max-width: 100%
- Spacing: Reduced padding on mobile (32px sections instead of 64px)
- Cards: 1 column on mobile, 2-3 on tablet, 3-4 on desktop
- Carousels: 1 visible slide on mobile, 2-3 on tablet, 3+ on desktop
- Click-to-call button: Visible on mobile, hidden on desktop

### Touch-Friendly Elements
- Button minimum height: 48px
- Input field minimum height: 44px
- Link minimum tap target: 48x48px
- Spacing between tappable elements: minimum 12px

---

## WIREFRAME COMPONENT REUSE

### Design System Component Inventory
All wireframes use components from the design system:
- ✅ Primary CTA Button (orange)
- ✅ Secondary CTA Button (blue)
- ✅ Ghost Button (outline)
- ✅ Link Button (text only)
- ✅ Card components (service, testimonial, case study, feature)
- ✅ Forms (input, textarea, select, checkbox, email signup)
- ✅ Navigation (header, mobile menu, footer)
- ✅ Badges and tags (category, status)
- ✅ Icons (from Heroicons library)
- ✅ Carousels (testimonials, case studies)
- ✅ FAQ accordion
- ✅ Color palette (blue, orange, grays)
- ✅ Typography system (Poppins headings, Inter body)
- ✅ Spacing scale (4px-based)

---

## CONTENT SPECIFICATIONS BY PAGE

### Homepage Word Count Targets
- Hero headline: 8-12 words
- Hero subheadline: 15-20 words
- Service descriptions: 20-30 words each
- Section headings: 4-8 words

### Service Page Word Count Targets
- Hero headline: 8-10 words
- Hero subheadline: 15-20 words
- Overview section: 150-200 words
- Each feature/benefit: 50-75 words
- CTA section headline: 6-8 words
- FAQ answers: 75-150 words per answer

### About Page Word Count Targets
- Hero headline: 6-8 words
- Our story: 300-400 words
- Team member bios: 50-75 words each
- Company values: 30-50 words each

### Contact Page Word Count Targets
- Hero headline: 4-6 words
- Hero subheadline: 10-15 words
- Form labels: 1-3 words
- Form placeholders: 2-4 words
- CTA text: 3-5 words

---

## IMPLEMENTATION PRIORITY

### Phase 1 (Week 1): Foundation Pages
1. Homepage
2. All 4 Service Pages
3. About Page
4. Contact Page

### Phase 2 (Week 2): Supporting Pages
5. Case Studies Index + 3 Sample Case Studies
6. Blog Index + 5 Sample Blog Posts

### Phase 3 (Week 3): Expansion
7. Resources Page (downloadable assets)
8. Additional case studies (1-2 per week)
9. Additional blog posts (2-4 per week)

---

## NOTES FOR BUILDER

### CSS Customization Points
- Navigation background: Use sticky positioning
- Hero sections: Use background gradients or SVG decorations
- Form elements: Use consistent styling from design system
- Hover states: Implement smooth transitions (200-300ms)
- Mobile menu: Slide animation from left
- Carousels: Use Elementor carousel widget or Slick slider

### Plugin Requirements
- Fluent Forms (contact form)
- Ultimate Addons for Elementor (premium widgets if needed)
- Calendly or ScheduleOnce embed (contact page)
- WP Mail SMTP (email delivery)
- WP Fluent SEO or RankMath (SEO management)
- Google Site Kit (analytics)

### Schema Markup Implementation
- Organization schema on all pages
- LocalBusiness schema on homepage/about
- Service schema on service pages
- FAQPage schema on service pages
- Article schema on blog posts
- Breadcrumb schema on all non-homepage pages
- AggregateRating schema on testimonials

### Performance Targets
- Lighthouse Score: 90+
- LCP: < 2.5s
- CLS: < 0.1
- FID: < 100ms
- Images: WebP with fallbacks
- Fonts: Preconnect and preload Google Fonts
- Minify CSS/JS
- Defer non-critical scripts

---

**Wireframes Version:** 1.0  
**Last Updated:** February 9, 2026  
**Status:** Ready for Builder Implementation  
**Next Step:** Page-by-page content briefs and copywriting
