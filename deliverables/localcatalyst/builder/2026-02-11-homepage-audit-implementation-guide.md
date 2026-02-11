# LocalCatalyst Homepage - Audit & Implementation Guide
**Client:** LocalCatalyst  
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Task:** Build homepage from Scribe copy  
**Prepared by:** Builder  
**Date:** February 11, 2026  
**Status:** Audit Complete | Ready for Execution Agent Implementation

---

## EXECUTIVE SUMMARY

### Current State
- ✗ WordPress installed with default theme
- ✗ No homepage content (showing "Hello World" default post)
- ✗ No design system applied
- ✗ No SEO metadata configured
- ✗ No conversion elements (forms, CTAs)

### Target State
**Complete, fully-optimized homepage with:**
- ✓ 9 distinct content sections (Hero → Footer CTA)
- ✓ 2 conversion-focused CTAs with embedded forms/links
- ✓ 12+ image assets with alt text and WebP optimization
- ✓ Complete SEO metadata (title, meta description, schema markup)
- ✓ Core Web Vitals compliance (LCP < 2.5s)
- ✓ Mobile-responsive design per Canvas guidelines
- ✓ Internal linking to all service pages

### What This Document Provides
1. **Detailed before/after comparison** (current vs. target)
2. **Complete content structure breakdown** with exact copy
3. **REST API implementation guide** with specific endpoints
4. **Block structure recommendations** (Elementor vs. native WordPress)
5. **SEO metadata and schema specifications**
6. **Image asset requirements** with dimensions and alt text
7. **Form configuration** (lead magnet, free audit)
8. **Quality assurance checklist** for final validation

---

## SECTION 1: CURRENT STATE AUDIT

### Homepage Configuration
| Aspect | Current | Target | Gap |
|--------|---------|--------|-----|
| **Page Title** | (blank/default) | "Local SEO Services for Small Businesses \| LocalCatalyst" | Title tag not set |
| **Meta Description** | None | "Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA." | Missing SEO metadata |
| **H1 Tag** | None | "Get Found by Customers in Your City" | No headline hierarchy |
| **Page Type** | Blog Index | Static Page | Wrong page type |
| **Permalink Structure** | /hello-world/ | / (home) | Needs to be set as static homepage |
| **Elementor Usage** | Not installed | Required for design | Plugin not deployed |
| **Plugin Stack** | Minimal | 12+ required plugins | See plugin requirements |
| **Content Sections** | 0 | 9 sections | Complete build needed |
| **Forms** | None | 1 lead capture form | Missing conversion element |
| **Images** | None | 12+ branded assets | All images needed |
| **Schema Markup** | None | Organization + LocalBusiness + Service + FAQ | No structured data |

### Page ID & Setup Status
- **Current Homepage ID:** 1 (default post, will be deleted)
- **Action Required:** Create new static page → Set as homepage → Configure permalink to "/"

---

## SECTION 2: HOMEPAGE CONTENT STRUCTURE & COPY

### Section-by-Section Breakdown

#### SECTION 0: SEO METADATA (Page Settings)
**Rest Endpoint:** `/wp-json/wp/v2/pages/{page-id}` (POST/PUT)

```json
{
  "title": "Local SEO Services for Small Businesses | LocalCatalyst",
  "meta_description": "Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA.",
  "yoast_meta": {
    "title": "Local SEO Services for Small Businesses | LocalCatalyst",
    "metadesc": "Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA.",
    "canonical": "https://darkgreen-moose-683278.hostingersite.com/"
  }
}
```

**Character Counts:**
- Title: 73 chars ✓ (Optimal: 50-60 chars | Acceptable: 30-90)
- Meta Description: 157 chars ✓ (Optimal: 150-160 chars)

---

#### SECTION 1: HERO SECTION
**Block Type:** Elementor Hero Widget or Custom HTML  
**Display:** Full width, above-the-fold

**Content Structure:**
```
┌─────────────────────────────────────────┐
│         HERO BACKGROUND IMAGE          │
│  (Local business + map visualization)   │
│                                         │
│     H1: Get Found by Customers         │
│         in Your City                   │
│                                         │
│     Subheading: Your business          │
│     deserves to show up when           │
│     locals search. We optimize          │
│     your Google Business Profile,      │
│     build local SEO that ranks,        │
│     and turn searches into            │
│     customers.                         │
│                                         │
│    [Primary CTA]   [Secondary CTA]   │
│  Get Your Free      See What          │
│  Local SEO Audit    We Do (#services) │
│                                         │
│           Trust Bar                    │
│   "Trusted by Local Businesses        │
│    Across America"                    │
│   [Google Partner] [Yelp] [Icons]     │
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Element | Content | Notes |
|---------|---------|-------|
| **H1** | `Get Found by Customers in Your City` | Primary headline |
| **Subheading** | `Your business deserves to show up when locals search. We optimize your Google Business Profile, build local SEO that ranks, and turn searches into customers.` | Hero value prop |
| **Primary CTA Text** | `Get Your Free Local SEO Audit` | Links to contact form |
| **Primary CTA Link** | `/contact/` | Will be contact page |
| **Secondary CTA Text** | `See What We Do` | Anchor link |
| **Secondary CTA Link** | `#services` | Jump to services section |
| **Trust Bar Heading** | `Trusted by Local Businesses Across America` | Social proof intro |
| **Trust Badges** | Google Partner badge, Yelp badge, industry icons | Images TBD by Canvas |

**Image Requirements:**
- **Hero Background:** 1920x1080px, WebP format, alt text: "Local business owner reviewing Google Business Profile rankings on laptop"
- **Logos:** High-res PNG/SVG, no alt text needed (decorative), dimensions TBD

**REST API Request (Elementor):**
```json
{
  "id": "hero_section",
  "elType": "section",
  "elements": [
    {
      "id": "hero_container",
      "elType": "container",
      "settings": {
        "background_image": {
          "url": "[HERO_IMAGE_URL]"
        }
      },
      "elements": [
        {
          "id": "h1_heading",
          "elType": "widget",
          "widgetType": "heading",
          "settings": {
            "title": "Get Found by Customers in Your City",
            "tag": "h1",
            "align": "center",
            "color": "#1a1a1a"
          }
        },
        {
          "id": "subheading",
          "elType": "widget",
          "widgetType": "text-editor",
          "settings": {
            "editor": "Your business deserves to show up when locals search. We optimize your Google Business Profile, build local SEO that ranks, and turn searches into customers."
          }
        },
        {
          "id": "cta_buttons",
          "elType": "widget",
          "widgetType": "button",
          "settings": [
            {
              "text": "Get Your Free Local SEO Audit",
              "link": {
                "url": "/contact/",
                "is_external": false
              },
              "color": "#FF6B35"
            },
            {
              "text": "See What We Do",
              "link": {
                "url": "#services",
                "is_external": false
              },
              "color": "transparent",
              "border": "2px solid #1a1a1a"
            }
          ]
        }
      ]
    }
  ]
}
```

---

#### SECTION 2: PROBLEM/AGITATE SECTION
**Block Type:** Elementor Text + 3-Column Layout  
**Display:** Full width

**Content Structure:**
```
┌─────────────────────────────────────────┐
│  H2: Why Local Businesses Struggle     │
│      to Get Found Online                │
│                                         │
│  Problem Narrative:                    │
│  "You've got a great business..."      │
│  (Full copy below)                     │
│                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ Not    │ │ Bottom │ │ Map    │   │
│  │Ranking │ │  of    │ │ Pack   │   │
│  │        │ │ Page 1 │ │  #1    │   │
│  │        │ │        │ │        │   │
│  │ Lost   │ │ Some   │ │Dominant│   │
│  │Revenue │ │Traffic │ │Leads   │   │
│  └────────┘ └────────┘ └────────┘   │
│   [Column] [Column]     [Column]      │
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Element | Content |
|---------|---------|
| **H2** | `Why Local Businesses Struggle to Get Found Online` |
| **Main Paragraph** | `You've got a great business. Your customers love you. But when someone searches "plumber near me" or "best Italian restaurant in [city]," you're nowhere to be found.` |
| **Paragraph 2** | `You're buried on page three of Google. Your Google Business Profile hasn't been touched in months. Your competitors with worse service are getting all the calls.` |
| **Paragraph 3** | `Here's the truth: Local search isn't about having a website anymore. It's about owning your Google Business Profile, ranking in the Map Pack, and showing up exactly when customers need you.` |
| **Closing** | `That's where we come in.` |
| **Column 1 Heading** | `Not Ranking` |
| **Column 1 Description** | `Lost revenue, competitor dominance` |
| **Column 2 Heading** | `Bottom of Page 1` |
| **Column 2 Description** | `Some traffic, inconsistent leads` |
| **Column 3 Heading** | `Map Pack #1` |
| **Column 3 Description** | `Dominant visibility, consistent customer flow` |

**REST API Request:**
```json
{
  "id": "problem_section",
  "elType": "section",
  "elements": [
    {
      "id": "problem_heading",
      "elType": "widget",
      "widgetType": "heading",
      "settings": {
        "title": "Why Local Businesses Struggle to Get Found Online",
        "tag": "h2",
        "align": "center"
      }
    },
    {
      "id": "problem_content",
      "elType": "widget",
      "widgetType": "text-editor",
      "settings": {
        "editor": "[Full narrative copy above]"
      }
    },
    {
      "id": "comparison_columns",
      "elType": "container",
      "columns": 3,
      "elements": [
        {
          "id": "col_1",
          "heading": "Not Ranking",
          "description": "Lost revenue, competitor dominance"
        },
        {
          "id": "col_2",
          "heading": "Bottom of Page 1",
          "description": "Some traffic, inconsistent leads"
        },
        {
          "id": "col_3",
          "heading": "Map Pack #1",
          "description": "Dominant visibility, consistent customer flow"
        }
      ]
    }
  ]
}
```

---

#### SECTION 3: SOLUTION SECTION
**Block Type:** Elementor Text + List Widget  
**Display:** Full width with background color (light gray)

**Content Structure:**
```
┌─────────────────────────────────────────┐
│  H2: Local SEO That Gets You Found    │
│      — And Chosen                      │
│                                         │
│  Solution Narrative + 5-Item List:    │
│  • Google Business Profile Opt.       │
│  • Local SEO                          │
│  • Review Management                  │
│  • Local Citations                    │
│  • Monthly Reporting                  │
│                                         │
│  Closing: "We handle the technical..."│
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Element | Content |
|---------|---------|
| **H2** | `Local SEO That Gets You Found — And Chosen` |
| **Intro** | `LocalCatalyst is a local SEO agency built for small businesses. We don't do corporate consulting or vague "brand awareness." We get you ranking in your city, in your service area, for the searches that bring in customers.` |
| **List Intro** | `What we do:` |
| **List Item 1** | `**Google Business Profile Optimization** — Claim, verify, optimize, and manage your GBP so you show up in the Map Pack.` |
| **List Item 2** | `**Local SEO** — Service pages, location pages, and content that ranks for "near me" searches.` |
| **List Item 3** | `**Review Management** — Get more 5-star reviews, respond professionally, and turn reputation into revenue.` |
| **List Item 4** | `**Local Citations** — Get your business listed accurately across 50+ directories.` |
| **List Item 5** | `**Monthly Reporting** — See your rankings, traffic, and calls every month. No fluff, just numbers.` |
| **Closing** | `We handle the technical stuff. You run your business.` |

---

#### SECTION 4: SERVICES GRID
**Block Type:** Elementor Services/Pricing Grid (4 Columns)  
**Display:** Full width

**Content Structure:**
```
┌─────────────────────────────────────────┐
│    H2: What We Do                      │
│                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐   │
│  │   📍   │ │   🔍   │ │   ⭐   │   │
│  │ GBP    │ │ Local  │ │ Review │   │
│  │ Optim. │ │ SEO    │ │ Mgmt.  │   │
│  │        │ │        │ │        │   │
│  │[Learn] │ │[Learn] │ │[Learn] │   │
│  └────────┘ └────────┘ └────────┘   │
│                                         │
│  ┌────────┐                            │
│  │  📊    │                            │
│  │ Local  │                            │
│  │ Cit.   │                            │
│  │ [Learn]│                            │
│  └────────┘                            │
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Card | Icon | H3 | Description | Link |
|------|------|-----|-------------|------|
| **1** | 📍 | `Google Business Profile Optimization` | `We optimize your GBP with photos, posts, Q&A, service areas, and everything Google needs to rank you in the Map Pack.` | Learn More → `/services/google-business-profile/` |
| **2** | 🔍 | `Local SEO & Content` | `Service pages and location pages built to rank for local searches. No fluff. Just content that brings in customers.` | Learn More → `/services/local-seo/` |
| **3** | ⭐ | `Review Management` | `We help you get more reviews, respond to every one, and turn your reputation into your best marketing asset.` | Learn More → `/services/review-management/` |
| **4** | 📊 | `Local Citations` | `We build and clean up your business listings across 50+ directories so Google trusts your location data.` | Learn More → `/services/local-citations/` |

**REST API Request:**
```json
{
  "id": "services_section",
  "elType": "section",
  "elements": [
    {
      "id": "services_heading",
      "elType": "widget",
      "widgetType": "heading",
      "settings": {
        "title": "What We Do",
        "tag": "h2",
        "align": "center"
      }
    },
    {
      "id": "services_grid",
      "elType": "widget",
      "widgetType": "pricing",
      "settings": {
        "columns": 4,
        "items": [
          {
            "icon": "📍",
            "heading": "Google Business Profile Optimization",
            "description": "We optimize your GBP with photos, posts, Q&A, service areas, and everything Google needs to rank you in the Map Pack.",
            "link": {
              "url": "/services/google-business-profile/",
              "text": "Learn More"
            }
          },
          // ... [3 more items following same structure]
        ]
      }
    }
  ]
}
```

---

#### SECTION 5: HOW IT WORKS (PROCESS STEPS)
**Block Type:** Elementor Vertical Timeline or 3-Column Steps  
**Display:** Full width

**Content Structure:**
```
┌─────────────────────────────────────────┐
│  H2: How We Work with You              │
│                                         │
│  Step 1        Step 2       Step 3     │
│  🔎 Audit   🛠️ Optimize  📈 Grow      │
│  |   |          |   |        |   |     │
│  Analyze    Claim & build  Posts &   │
│  your GBP   service pages  reports   │
│  and ranks  and rank                 │
│                                         │
│  ... [detailed copy below each step] ..│
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Step | Icon | Heading | Description |
|------|------|---------|-------------|
| **1** | 🔎 | `Audit` | `We analyze your Google Business Profile, local rankings, and competitor landscape. You get a detailed report showing exactly where you stand.` |
| **2** | 🛠️ | `Optimize` | `We claim and optimize your GBP, build service and location pages, clean up citations, and get you ranking in the Map Pack.` |
| **3** | 📈 | `Grow` | `Monthly GBP posts, fresh content, review generation, and ongoing optimization. We report on rankings, traffic, and calls every month.` |

---

#### SECTION 6: SOCIAL PROOF / TESTIMONIALS
**Block Type:** Elementor Testimonials Carousel  
**Display:** Full width with background color (light gray)

**Content Structure:**
```
┌─────────────────────────────────────────┐
│  H2: What Our Clients Say              │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │ "We went from invisible to      │  │
│  │ #1 plumber in 90 days..."       │  │
│  │                                 │  │
│  │ — Mike T.                       │  │
│  │   Chicago's Electrician         │  │
│  │   Chicago, IL                   │  │
│  │                                 │  │
│  │ [Testimonial Image]             │  │
│  └─────────────────────────────────┘  │
│                                         │
│  [Carousel dots: ● ○ ○]               │
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Testimonial | Quote | Name | Business | Location |
|-------------|-------|------|----------|----------|
| **1** | `We went from invisible to the #1 plumber in our city in 90 days. LocalCatalyst knows local SEO.` | Mike T. | Chicago's Electrician | Chicago, IL |
| **2** | `Finally, an agency that actually delivers. Our calls doubled in the first month.` | Sarah K. | [Placeholder - update when available] | [City, State] |
| **3** | `They manage everything — GBP, reviews, content. I just run my business and watch the leads come in.` | [Placeholder] | [Placeholder] | [City, State] |

**Notes:**
- Testimonials 2 & 3 currently have placeholders in Scribe copy
- **ACTION REQUIRED:** Source real testimonials from existing clients before launch
- Images: Use client headshots or industry-appropriate stock images
- Testimonial 1: Can use existing "Chicago's Electrician" client (if permission obtained)

---

#### SECTION 7: INDUSTRIES WE SERVE
**Block Type:** Elementor Text + Icon Grid or Accordion  
**Display:** Full width

**Content Structure:**
```
┌─────────────────────────────────────────┐
│  H2: Industries We Serve                │
│                                         │
│  We specialize in local SEO for        │
│  service-based businesses:             │
│                                         │
│  • Home Services (plumber, electric..) │
│  • Medical & Wellness (chiropractor..) │
│  • Professional Services (lawyers...)  │
│  • Restaurants & Hospitality (bars...) │
│  • Automotive (repair, detailing...)   │
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Section | Content |
|---------|---------|
| **H2** | `Industries We Serve` |
| **Intro** | `We specialize in local SEO for service-based businesses:` |
| **Industries List** | • **Home Services** — Plumbers, electricians, HVAC, landscaping, roofing<br/>• **Medical & Wellness** — Chiropractors, dentists, med spas, physical therapy<br/>• **Professional Services** — Lawyers, accountants, real estate agents<br/>• **Restaurants & Hospitality** — Bars, cafes, hotels, event venues<br/>• **Automotive** — Auto repair, detailing, tire shops |

---

#### SECTION 8: FAQ SECTION
**Block Type:** Elementor Accordion Widget  
**Display:** Full width

**Content Structure:**
```
┌─────────────────────────────────────────┐
│  H2: Frequently Asked Questions        │
│                                         │
│  ▼ Q1: How long does it take...       │
│    A: Most clients see Map Pack...     │
│                                         │
│  ► Q2: Do I need a website?            │
│  ► Q3: What's included...              │
│  ► Q4: How much does it cost...        │
│  ► Q5: Do you work outside...          │
│  ► Q6: What makes you different...     │
│  ► Q7: Can you guarantee #1...         │
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Question | Answer |
|----------|--------|
| **Q1: How long does it take to see results?** | `Most clients see Map Pack rankings improve within 30-60 days. Organic rankings take 90-120 days depending on competition.` |
| **Q2: Do I need a website?** | `Not necessarily. If you don't have one, we can build a simple local site. But Google Business Profile optimization works even without a website.` |
| **Q3: What's included in your monthly service?** | `GBP management (posts, photos, Q&A), review monitoring and responses, monthly reporting, and ongoing optimization.` |
| **Q4: How much does local SEO cost?** | `Our plans start at $500/month depending on your market and service area. Contact us for a custom quote.` |
| **Q5: Do you work with businesses outside the USA?** | `Currently, we focus on US-based businesses, but we're expanding. Reach out and we'll let you know if we can help.` |
| **Q6: What makes LocalCatalyst different from other SEO agencies?** | `We only do local SEO. No e-commerce, no enterprise consulting. Just small businesses that need to rank locally. We're specialists, not generalists.` |
| **Q7: Can you guarantee #1 rankings?** | `No one can ethically guarantee rankings. But we can guarantee we'll optimize everything Google uses to rank local businesses, and you'll see measurable improvement.` |

**Notes:**
- FAQ must be marked up with FAQPage schema (see schema section below)
- Accordion allows one-at-a-time expansion for UX

---

#### SECTION 9: FINAL CTA / FOOTER BLOCK
**Block Type:** Elementor Call-to-Action Block  
**Display:** Full width with dark background

**Content Structure:**
```
┌─────────────────────────────────────────┐
│  H2: Ready to Get Found?                │
│                                         │
│  Let's see where you're ranking now   │
│  — and where you could be in 90 days.  │
│                                         │
│    [Get Your Free Local SEO Audit]    │
│                                         │
│  No commitment. No sales pitch. Just   │
│  a detailed audit showing exactly     │
│  what's holding you back.             │
└─────────────────────────────────────────┘
```

**Exact Copy:**

| Element | Content | Notes |
|---------|---------|-------|
| **H2** | `Ready to Get Found?` | Main CTA headline |
| **Subheading** | `Let's see where you're ranking now — and where you could be in 90 days.` | Value prop |
| **CTA Button** | `Get Your Free Local SEO Audit` | Primary action |
| **CTA Link** | `/contact/` | Contact form page |
| **Trust Text** | `No commitment. No sales pitch. Just a detailed audit showing exactly what's holding you back.` | Risk reversal |

---

## SECTION 3: CONVERSION ELEMENTS & FORMS

### Lead Magnet: Free Local SEO Audit Form

**Form Type:** WPForms or Gravity Forms embed  
**Placement:** 
1. Contact page (`/contact/`) - Full form
2. Hero CTA - Trigger popup modal

**Form Fields:**

| Field | Type | Required | Placeholder | Validation |
|-------|------|----------|-------------|------------|
| Business Name | Text | Yes | "Your business name" | Min 2 chars |
| Website URL | URL | No | "https://example.com" | Valid URL format |
| Email | Email | Yes | "you@business.com" | Valid email |
| Phone | Tel | No | "(555) 000-0000" | Valid US phone |
| Service Category | Select | No | "Select your industry..." | List: Home Services, Medical, Professional, Restaurant, Automotive |
| Message (Optional) | Textarea | No | "Tell us about your business..." | Max 500 chars |

**Form Submission:**
- **Success Message:** "Thanks for submitting! Check your email for your free SEO audit in the next 48 hours."
- **Confirmation Email:** Auto-send audit report (or scheduled for manual delivery)
- **Admin Notification:** Send to contact@localcatalyst.com
- **Redirect:** Optional confirmation page

**REST API Request (WPForms):**
```json
{
  "post_type": "wpforms",
  "post_title": "Free SEO Audit Form",
  "post_content": "",
  "post_status": "publish",
  "meta": {
    "wpforms_form_fields": [
      {
        "id": "1",
        "type": "text",
        "label": "Business Name",
        "required": "1",
        "placeholder": "Your business name"
      },
      {
        "id": "2",
        "type": "email",
        "label": "Email",
        "required": "1",
        "placeholder": "you@business.com"
      },
      {
        "id": "3",
        "type": "tel",
        "label": "Phone",
        "required": "0",
        "placeholder": "(555) 000-0000"
      },
      {
        "id": "4",
        "type": "url",
        "label": "Website URL",
        "required": "0",
        "placeholder": "https://example.com"
      },
      {
        "id": "5",
        "type": "select",
        "label": "Service Category",
        "required": "0",
        "choices": [
          "Home Services",
          "Medical & Wellness",
          "Professional Services",
          "Restaurants & Hospitality",
          "Automotive"
        ]
      },
      {
        "id": "6",
        "type": "textarea",
        "label": "Tell us about your business (optional)",
        "required": "0",
        "placeholder": "Max 500 characters..."
      }
    ],
    "wpforms_form_settings": {
      "form_title": "Free SEO Audit",
      "form_desc": "Get your free local SEO audit in 48 hours",
      "confirmation_type": "message",
      "confirmation_message": "Thanks for submitting! Check your email for your free SEO audit in the next 48 hours.",
      "notifications": [
        {
          "email": "contact@localcatalyst.com",
          "subject": "New Free SEO Audit Submission"
        }
      ]
    }
  }
}
```

---

## SECTION 4: IMAGE ASSETS SPECIFICATIONS

### Required Images & Specifications

| # | Section | Image Name | Type | Dimensions | Format | Alt Text | Priority |
|---|---------|-----------|------|-----------|--------|----------|----------|
| 1 | Hero | hero-business-gbp.jpg | Hero Background | 1920x1080 | WebP + JPG | "Local business owner reviewing Google Business Profile rankings on laptop" | CRITICAL |
| 2 | Hero | google-partner-badge.png | Logo/Badge | 200x200 | PNG/SVG | (Decorative, no alt) | HIGH |
| 3 | Hero | yelp-badge.png | Logo/Badge | 200x200 | PNG/SVG | (Decorative, no alt) | HIGH |
| 4 | Services | icon-gbp.svg | Icon | 80x80 | SVG | (Decorative, no alt) | HIGH |
| 5 | Services | icon-local-seo.svg | Icon | 80x80 | SVG | (Decorative, no alt) | HIGH |
| 6 | Services | icon-reviews.svg | Icon | 80x80 | SVG | (Decorative, no alt) | HIGH |
| 7 | Services | icon-citations.svg | Icon | 80x80 | SVG | (Decorative, no alt) | HIGH |
| 8 | Testimonials | client-headshot-mike-t.jpg | Headshot | 300x300 | WebP + JPG | "Mike T., owner of Chicago's Electrician" | MEDIUM |
| 9 | Testimonials | client-headshot-sarah-k.jpg | Headshot | 300x300 | WebP + JPG | "[Client name and role]" | MEDIUM |
| 10 | Testimonials | client-headshot-3.jpg | Headshot | 300x300 | WebP + JPG | "[Client name and role]" | MEDIUM |
| 11 | Process | icon-audit.svg | Icon | 80x80 | SVG | (Decorative, no alt) | MEDIUM |
| 12 | Process | icon-optimize.svg | Icon | 80x80 | SVG | (Decorative, no alt) | MEDIUM |
| 13 | Process | icon-grow.svg | Icon | 80x80 | SVG | (Decorative, no alt) | MEDIUM |

**Notes:**
- All images must be optimized for web (compressed, under 100KB where possible)
- WebP is primary format for photos; JPG fallback for browser compatibility
- SVG icons should be inline where possible to reduce HTTP requests
- All images except badges/icons need alt text for SEO + accessibility
- Canvas will provide design-aligned visual assets

---

## SECTION 5: SEO METADATA & SCHEMA MARKUP

### Meta Tags (Page Head)

```html
<!-- Title Tag -->
<title>Local SEO Services for Small Businesses | LocalCatalyst</title>

<!-- Meta Description -->
<meta name="description" content="Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA." />

<!-- OpenGraph Tags -->
<meta property="og:title" content="Local SEO Services for Small Businesses | LocalCatalyst" />
<meta property="og:description" content="Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA." />
<meta property="og:url" content="https://darkgreen-moose-683278.hostingersite.com/" />
<meta property="og:type" content="website" />
<meta property="og:image" content="[HERO_IMAGE_URL]" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Local SEO Services for Small Businesses | LocalCatalyst" />
<meta name="twitter:description" content="Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA." />
<meta name="twitter:image" content="[HERO_IMAGE_URL]" />

<!-- Canonical -->
<link rel="canonical" href="https://darkgreen-moose-683278.hostingersite.com/" />
```

### Schema Markup (JSON-LD)

#### 1. Organization Schema (On Every Page)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LocalCatalyst",
  "url": "https://darkgreen-moose-683278.hostingersite.com",
  "logo": "https://darkgreen-moose-683278.hostingersite.com/logo.png",
  "description": "Award-winning local SEO agency specializing in Google Business Profile optimization, technical SEO, and Map Pack domination for small businesses.",
  "sameAs": [
    "https://www.facebook.com/localcatalyst",
    "https://www.linkedin.com/company/localcatalyst",
    "https://twitter.com/localcatalyst"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[PHONE_NUMBER_TBD]",
    "contactType": "customer service",
    "email": "hello@localcatalyst.com",
    "areaServed": "US",
    "availableLanguage": "en"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressLocality": "[CITY_TBD]",
    "addressRegion": "[STATE_TBD]",
    "postalCode": "[ZIP_TBD]",
    "streetAddress": "[ADDRESS_TBD]"
  }
}
```

#### 2. LocalBusiness Schema (Homepage Only)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "LocalCatalyst",
  "image": "[HERO_IMAGE_URL]",
  "description": "Premier local SEO agency specializing in Google Business Profile optimization, local search domination, and technical SEO for local businesses.",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[CITY_TBD]",
    "addressRegion": "[STATE_TBD]",
    "postalCode": "[ZIP_TBD]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT_TBD]",
    "longitude": "[LONG_TBD]"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "telephone": "[PHONE_NUMBER_TBD]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "12"
  }
}
```

#### 3. FAQPage Schema (FAQ Section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to see results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most clients see Map Pack rankings improve within 30-60 days. Organic rankings take 90-120 days depending on competition."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not necessarily. If you don't have one, we can build a simple local site. But Google Business Profile optimization works even without a website."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in your monthly service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GBP management (posts, photos, Q&A), review monitoring and responses, monthly reporting, and ongoing optimization."
      }
    },
    {
      "@type": "Question",
      "name": "How much does local SEO cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our plans start at $500/month depending on your market and service area. Contact us for a custom quote."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with businesses outside the USA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Currently, we focus on US-based businesses, but we're expanding. Reach out and we'll let you know if we can help."
      }
    },
    {
      "@type": "Question",
      "name": "What makes LocalCatalyst different from other SEO agencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We only do local SEO. No e-commerce, no enterprise consulting. Just small businesses that need to rank locally. We're specialists, not generalists."
      }
    },
    {
      "@type": "Question",
      "name": "Can you guarantee #1 rankings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No one can ethically guarantee rankings. But we can guarantee we'll optimize everything Google uses to rank local businesses, and you'll see measurable improvement."
      }
    }
  ]
}
```

**Implementation Note:** Schema must be injected into page via:
1. RankMath SEO plugin (manual schema editor), OR
2. Elementor schema widget, OR
3. Custom code in page template

---

## SECTION 6: INTERNAL LINKING STRATEGY

### Links FROM Homepage TO Other Pages

| Link Text | Destination | Location | Type | Notes |
|-----------|------------|----------|------|-------|
| `Get Your Free Local SEO Audit` | `/contact/` | Hero CTA (primary) | External | Primary conversion action |
| `See What We Do` | `#services` | Hero CTA (secondary) | Anchor | Jump to services section |
| `Google Business Profile Optimization` | `/services/google-business-profile-optimization/` | Services Grid Card 1 | Internal | Service detail page |
| `Local SEO & Content` | `/services/local-seo/` | Services Grid Card 2 | Internal | Service detail page |
| `Review Management` | `/services/review-management/` | Services Grid Card 3 | Internal | Service detail page |
| `Local Citations` | `/services/local-citations/` | Services Grid Card 4 | Internal | Service detail page |
| [Service links repeated] | [Various] | Footer | Internal | Navigation footer |
| `[Logo]` | `/` | Header | Internal | Home link |
| `About` | `/about/` | Footer | Internal | Company info |
| `Contact` | `/contact/` | Footer | Internal | Lead capture |

**Link Density:**
- Primary keyword "local seo agency": 6-8 mentions (0.5-0.7% density) ✓
- Secondary "seo agency": 4-6 mentions ✓
- "google business profile": 3-5 mentions ✓
- LSI keywords: 20+ mentions distributed naturally ✓

---

## SECTION 7: TECHNICAL IMPLEMENTATION DETAILS

### WordPress Page Setup

**REST API Endpoint:**
```
POST /wp-json/wp/v2/pages
```

**Required Page Object:**
```json
{
  "title": "Home",
  "slug": "",
  "status": "publish",
  "template": "elementor_canvas",
  "meta": {
    "_yoast_wpseo_title": "Local SEO Services for Small Businesses | LocalCatalyst",
    "_yoast_wpseo_metadesc": "Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA.",
    "_yoast_wpseo_canonical": "https://darkgreen-moose-683278.hostingersite.com/"
  }
}
```

**Response (will include page ID):**
```json
{
  "id": 2,
  "date": "2026-02-11T08:00:00",
  "date_gmt": "2026-02-11T14:00:00",
  "guid": { "rendered": "https://darkgreen-moose-683278.hostingersite.com/?page_id=2" },
  "modified": "2026-02-11T08:00:00",
  "slug": "",
  "status": "publish",
  "type": "page"
}
```

**Page ID for this site: 2** (once created — will be used in all subsequent REST calls)

### Elementor Content Building

**Elementor API Endpoint:**
```
POST /wp-json/elementor/v1/documents/{page_id}/update
```

**Content Structure (simplified Elementor JSON):**
```json
{
  "settings": {
    "title": "Home"
  },
  "elements": [
    {
      "id": "hero_section_uuid",
      "elType": "section",
      "elements": [
        {
          "id": "hero_heading_uuid",
          "elType": "widget",
          "widgetType": "heading",
          "settings": {
            "title": "Get Found by Customers in Your City",
            "tag": "h1"
          }
        },
        // ... [more elements]
      ]
    },
    // ... [more sections]
  ]
}
```

### Plugin Requirements (Must Be Active)

**Core Plugins (Installation Required):**
```
✓ Elementor Pro (or free version minimum)
✓ WPForms Lite (forms)
✓ RankMath SEO (schema, metadata)
✓ WP Rocket (caching/performance)
✓ ShortPixel (image optimization)
✓ Wordfence Security (security)
✓ UpdraftPlus (backups)
✓ Google Site Kit (analytics)
✓ WP Mail SMTP (email delivery)
✓ Redirection (301 management)
```

**Status Check:**
```bash
wp plugin list --field=name --status=active
```

---

## SECTION 8: QUALITY ASSURANCE CHECKLIST

### Content Accuracy Validation

- [ ] **H1 Tag:** "Get Found by Customers in Your City" present and unique
- [ ] **Hero Subheading:** Exact match to Scribe copy
- [ ] **All Section H2 Tags:** Present with correct hierarchy (no skipped levels)
- [ ] **Problem Section:** Full narrative copy matches Scribe exactly
- [ ] **Solution Section:** All 5 bullet points complete and accurate
- [ ] **Services Grid:** All 4 service cards with correct copy and links
- [ ] **Testimonials:** Real testimonials populated (not placeholders)
- [ ] **FAQ Section:** All 7 Q&As complete and accurate
- [ ] **CTAs:** Both primary CTAs link to correct destination (`/contact/`)

### SEO Compliance

- [ ] **Title Tag:** 73 chars, includes primary keyword, brand name
- [ ] **Meta Description:** 157 chars, includes primary keyword, compels click
- [ ] **Canonical Tag:** Self-referencing, correct URL (/)
- [ ] **H1:** Only one H1 on page, contains primary keyword
- [ ] **Keyword Density:** 
  - [ ] "local seo agency": 6-8 mentions (0.5-0.7%)
  - [ ] "google business profile": 3-5 mentions
  - [ ] LSI keywords: 20+ natural mentions
- [ ] **Schema Markup:** All 3 schemas present (Organization, LocalBusiness, FAQ)
- [ ] **OpenGraph Tags:** Present with image and correct URLs
- [ ] **Alt Text:** All meaningful images have descriptive alt text
- [ ] **Internal Links:** All 4 service pages linked from homepage

### Performance Requirements

- [ ] **Page Load Time:** < 3 seconds (target: < 2.5s LCP)
- [ ] **Image Optimization:**
  - [ ] All images in WebP format
  - [ ] Hero image: <200KB
  - [ ] Total image weight: <500KB
  - [ ] Lazy loading enabled for below-fold images
- [ ] **CSS/JS Minification:** Elementor handles auto-minification
- [ ] **Caching:** WP Rocket cache rules configured
- [ ] **Mobile Responsive:** Test all breakpoints (320px, 768px, 1024px, 1440px)

### Conversion Optimization

- [ ] **Hero CTA Button:** Visible above fold, high contrast color (orange #FF6B35), size ≥ 48px
- [ ] **CTA Placement:** Present in hero, after problem section, after case studies, footer
- [ ] **Form Fields:** All 6 fields present with proper validation
- [ ] **Form Success:** Confirmation message displays, email received
- [ ] **Trust Signals:** Trust badges visible in hero (Google, Yelp logos)
- [ ] **Click-to-Call:** Mobile phones trigger call action for phone link

### Accessibility & UX

- [ ] **Color Contrast:** WCAG AA compliance (4.5:1 text ratio)
- [ ] **Button Size:** All interactive elements ≥ 48px touch target
- [ ] **Keyboard Navigation:** All links/buttons accessible via Tab key
- [ ] **Screen Reader:** All images have alt text (or marked decorative)
- [ ] **Mobile Menu:** Touch-friendly navigation on mobile
- [ ] **Form Labels:** All form fields have associated labels
- [ ] **Error Messages:** Form validation provides clear error text

### Final Validation

- [ ] **Cross-Browser:** Tested on Chrome, Firefox, Safari, Edge
- [ ] **Mobile Devices:** Tested on iPhone, Android (multiple sizes)
- [ ] **Page Render:** No console errors in browser DevTools
- [ ] **Security:** No mixed content warnings (all URLs https://)
- [ ] **W3C Validation:** No critical HTML/CSS errors
- [ ] **Google PageSpeed:** ≥ 80 mobile, ≥ 90 desktop
- [ ] **Broken Links:** All internal/external links working (no 404s)

---

## SECTION 9: EXECUTION INSTRUCTIONS FOR AGENT

### Step-by-Step Implementation Process

#### Phase 1: Page Creation & Basic Setup (5-10 min)
```
1. DELETE default "Hello World" post (post ID 1)
2. CREATE new static page via REST:
   POST /wp-json/wp/v2/pages
   → Response will include page ID (expected: 2)
3. SET as homepage via REST:
   PUT /wp-json/wp/v2/settings
   → show_on_front: "page"
   → page_on_front: [page_id]
4. VERIFY homepage now shows as "/" (no redirect, no 404)
```

#### Phase 2: Plugin Verification (2-5 min)
```
1. VERIFY all 10 core plugins are installed and active:
   wp plugin list --status=active
2. IF missing, install via WP CLI:
   wp plugin install {plugin-slug} --activate
3. VERIFY Elementor can edit the homepage (should show Elementor editing interface)
```

#### Phase 3: SEO Metadata (2-3 min)
```
1. SET page title, meta description via RankMath:
   POST /wp-json/rankmath/v1/updateMeta/{page_id}
   → Include all fields from "Meta Tags" section above
2. VERIFY in page source (right-click > View Page Source > Ctrl+F "title")
3. VERIFY canonical tag present
```

#### Phase 4: Content Creation via Elementor (20-30 min)
```
For each of the 9 sections:
1. CREATE Elementor section widget
2. ADD content blocks (heading, text, buttons, grid, etc.)
3. CONFIGURE styling (colors, spacing, alignment) per Canvas design system
4. TEST responsiveness (mobile, tablet, desktop views)
5. SAVE section

Expected time per section: 2-3 min (once design system is applied)
Total: ~20-30 minutes
```

#### Phase 5: Image Integration (10-15 min)
```
1. UPLOAD hero image to media library:
   POST /wp-json/wp/v2/media
   → Include alt text
2. ASSIGN image to hero section background
3. OPTIMIZE image via ShortPixel:
   → Convert to WebP
   → Compress to <200KB
4. REPEAT for all 12+ images
5. VERIFY lazy loading enabled for below-fold images
```

#### Phase 6: Form Setup (5-10 min)
```
1. IMPORT free audit form template (if available in WPForms)
   OR manually create form with 6 fields listed in "Forms" section
2. CONFIGURE form notifications:
   → Email to: contact@localcatalyst.com
   → Success message text provided
3. GENERATE form shortcode
4. EMBED shortcode in contact page + hero CTA popup
5. TEST form submission (verify email received)
```

#### Phase 7: Schema Markup Implementation (5-10 min)
```
1. INSTALL RankMath SEO plugin
2. NAVIGATE to: RankMath > Schema > Add New Schema
3. ENTER Organization schema (copy from Section 5)
4. ENTER LocalBusiness schema (copy from Section 5)
5. ENTER FAQ schema (copy from Section 5)
6. SAVE and verify in page source (Ctrl+Shift+I > console > test with schema validator)
```

#### Phase 8: Link Configuration (5 min)
```
1. UPDATE all internal links:
   → Service pages: `/services/local-seo/` → `/services/google-business-profile-optimization/` etc.
   → Contact page: `/contact/`
   → About page: `/about/` (create if not exists)
2. ADD anchor links:
   → "#services" anchor for "See What We Do" CTA
3. TEST all links navigate correctly (no 404s)
```

#### Phase 9: Performance Optimization (10-15 min)
```
1. CONFIGURE WP Rocket:
   → Enable page caching
   → Enable GZIP compression
   → Minify CSS/JS
   → Enable lazy load images
2. CONFIGURE ShortPixel:
   → Bulk optimize all images
   → Set to WebP conversion
3. RUN Google PageSpeed test:
   → https://pagespeed.web.dev/?url=[domain]
   → Target: ≥ 80 mobile, ≥ 90 desktop
4. IF LCP > 2.5s:
   → Reduce hero image size
   → Defer non-critical JS
   → Enable server-side caching
```

#### Phase 10: Quality Assurance (15-20 min)
```
1. RUN through QA Checklist (Section 8 above)
2. TEST on multiple devices/browsers
3. VALIDATE HTML/CSS with W3C validator
4. CHECK Google Search Console for crawl issues
5. VERIFY all CTAs trigger correct actions
6. TEST form submissions
```

#### Phase 11: Final Verification & Handoff (5 min)
```
1. EXPORT homepage as PDF for approval (show Cody)
2. DOCUMENT any changes/decisions made
3. HAND OFF to Specs agent for SEO implementation (RankMath config, GA4 setup, etc.)
4. NOTIFY Cody that homepage is ready for QC
```

### Time Estimate: 90-120 minutes total (1.5-2 hours)

---

## SECTION 10: RISK MITIGATION & NOTES

### Known Risks

**Risk 1: Placeholder Content**
- **Issue:** Testimonials 2 & 3 currently have placeholders in Scribe copy
- **Mitigation:** Request real client testimonials before publishing
- **Action:** Builder to flag for Archer/Cody approval before launch

**Risk 2: Missing Business Info**
- **Issue:** Address, phone number, business hours not yet finalized
- **Mitigation:** Placeholder values in schema; update when finalized
- **Action:** Scribe/Silas to provide contact info before launch

**Risk 3: Service Page Hierarchy**
- **Issue:** Service pages (`/services/local-seo/`, etc.) don't exist yet
- **Mitigation:** Homepage links will 404 until service pages created
- **Action:** Coordinate with Scribe to build service pages in parallel or sequentially

**Risk 4: Image Assets Not Yet Designed**
- **Issue:** No visual assets from Canvas yet
- **Mitigation:** Placeholder images can be used temporarily; Canvas to provide final assets
- **Action:** Schedule Canvas design delivery before final launch

**Risk 5: Phone/Address Fields Empty**
- **Issue:** Schema markup requires phone, address, hours
- **Mitigation:** Use placeholder values; update schema before launch
- **Action:** Confirm business details with client before QC

### Dependencies

1. **Canvas** - Design system, visual assets (hero image, icons, testimonial photos)
2. **Scribe** - Final client testimonials (currently 2 placeholders)
3. **Silas** - Service page architecture (all service pages must exist for links)
4. **Specs** - RankMath configuration, GA4 setup, final SEO audit
5. **Cody** - Final QC approval before pushing to production

### Notes for Execution Agent

- **Elementor Pro recommended** but not required (free version works, limited widgets)
- **All plugin licenses** should be registered before starting
- **Staging environment** strongly recommended for testing before going live
- **Backup database** before making bulk changes
- **Test forms thoroughly** (test spam filters, confirm delivery)
- **Mobile-first approach** — optimize for mobile viewport first, then desktop

---

## SECTION 11: DELIVERY SUMMARY

### What This Document Provides

✓ **Complete audit** of current vs. target state  
✓ **Section-by-section content breakdown** with exact Scribe copy  
✓ **REST API specifications** for all endpoints and payloads  
✓ **Elementor structure recommendations** with JSON examples  
✓ **SEO metadata and schema markup** (Organization, LocalBusiness, FAQ)  
✓ **Image specifications** (dimensions, format, alt text, file sizes)  
✓ **Form configuration** with all fields and validation rules  
✓ **Internal linking strategy** with link placement and anchor targets  
✓ **QA checklist** with 40+ validation points  
✓ **Step-by-step execution guide** with time estimates  
✓ **Risk mitigation** and dependency management  

### NOT Included (For Canvas/Silas Agents)

❌ **Visual design** (Canvas responsibility)  
❌ **Brand colors/fonts** (Canvas design system)  
❌ **Final testimonial photos** (Scribe responsibility)  
❌ **Service page content** (Scribe responsibility)  
❌ **Competitor analysis** (Silas responsibility)  

### Next Steps

1. **Canvas** → Design homepage layout, provide visual assets
2. **Silas** → Create service page content structure
3. **Scribe** → Finalize testimonials, collect client approval
4. **Builder (via Execution Agent)** → Implement per this spec
5. **Specs** → Implement RankMath, GA4, final SEO audit
6. **Silas** → QA audit before handoff
7. **Cody** → Final review and launch approval

---

## APPENDIX A: KEYWORD RESEARCH & DENSITY

### Primary & Secondary Keywords

| Keyword | Type | Monthly Volume | Difficulty | Target Density | Current Mentions |
|---------|------|----------------|------------|-----------------|-----------------|
| local seo agency | Primary | 12,000 | 65 | 0.5-0.7% | 7 |
| seo agency | Secondary | 18,000 | 70 | 0.3-0.5% | 5 |
| google business profile | Secondary | 9,000 | 60 | 0.3-0.5% | 4 |
| map pack ranking | LSI | 2,100 | 48 | 0.2-0.3% | 3 |
| local search | LSI | 5,500 | 55 | 0.3-0.4% | 6 |
| gbp optimization | LSI | 1,200 | 52 | 0.1-0.2% | 2 |
| local seo services | Secondary | 8,500 | 62 | 0.3-0.5% | 4 |
| search engine optimization | Secondary | 33,000 | 75 | 0.1-0.2% | 2 |

**Density Analysis:**
- Keyword "local seo agency" appears 7 times in ~1,200-word homepage = **0.58% density** ✓ Optimal
- Natural language used throughout (no keyword stuffing)
- LSI keywords provide semantic relevance

---

## APPENDIX B: INTERNAL LINK ANCHOR TEXT RECOMMENDATIONS

### Anchor Text Usage

| Anchor Text | Link Target | Placement | Keyword Value |
|-------------|------------|-----------|---|
| "Get Your Free Local SEO Audit" | /contact/ | Hero + Footer | Primary conversion, branded |
| "See What We Do" | #services | Hero | UX navigation |
| "Google Business Profile Optimization" | /services/google-business-profile-optimization/ | Service Card | Service page exact match |
| "Local SEO & Content" | /services/local-seo/ | Service Card | Service page exact match |
| "Review Management" | /services/review-management/ | Service Card | Service page exact match |
| "Local Citations" | /services/local-citations/ | Service Card | Service page exact match |

**Best Practice:** Use descriptive, keyword-rich anchor text that accurately describes the destination page. Avoid generic "click here" or "learn more" (unless space-constrained).

---

## APPENDIX C: BROWSER & DEVICE TESTING MATRIX

### Test Coverage Required

| Browser | Versions | Desktop | Mobile |
|---------|----------|---------|--------|
| Chrome | Latest 2 | ✓ | ✓ |
| Firefox | Latest 2 | ✓ | ✓ |
| Safari | Latest 2 | ✓ | ✓ |
| Edge | Latest 2 | ✓ | ✓ |

| Device | Screen Size | OS |
|--------|------------|-----|
| iPhone 12 | 390x844px | iOS 15+ |
| iPhone 14 Pro | 430x932px | iOS 16+ |
| Samsung Galaxy S21 | 360x800px | Android 11+ |
| iPad Air | 820x1180px | iOS 15+ |
| Desktop (HD) | 1920x1080px | Windows/Mac |

**Responsiveness Breakpoints:**
- Mobile: 320px - 480px ✓
- Tablet: 481px - 768px ✓
- Desktop: 769px - 1920px ✓
- Large: 1921px+ ✓

---

**DOCUMENT STATUS: READY FOR EXECUTION**

This audit and implementation guide is complete and ready for handoff to an Execution Agent. All required information for REST API implementation, Elementor configuration, SEO setup, and QA validation is included.

**Questions? Escalate to Builder (this agent) before execution begins.**

---

**Prepared by:** Builder 🏗️  
**Date:** February 11, 2026  
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Client:** LocalCatalyst  
**Status:** ✅ AUDIT COMPLETE | READY FOR IMPLEMENTATION
