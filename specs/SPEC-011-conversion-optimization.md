# SILAS SPEC #11 — PAGE-LEVEL CONVERSION OPTIMIZATION
## CTA Architecture, Phone Visibility, Form Positioning & Lead Capture Engineering

**Spec ID:** SPEC-011-CONVERSION-OPTIMIZATION
**Version:** 1.0
**Dependencies:** SPEC-002 (On-Page SEO), SPEC-007 (Content Architecture), SPEC-008 (Technical SEO), SPEC-010 (Structured Content Formatting)

---

## 1. PURPOSE

SEO traffic without conversions is vanity metrics. This spec defines the exact placement, design, and behavior of every conversion element on client pages — CTAs, phone numbers, contact forms, click-to-call buttons, scheduling widgets, and trust signals. Silas uses this spec to audit existing pages for conversion leaks and to architect new pages that convert organic traffic into phone calls, form submissions, and booked appointments.

This spec governs the VISIBLE conversion layer. It works alongside SPEC-010 (content formatting for SERP capture) and SPEC-009 (grounding boxes for AI extraction). Content gets you the click. This spec gets you the lead.

---

## 2. CONVERSION HIERARCHY

### 2.1 Primary Conversion Actions by Business Type

Different businesses have different primary conversion actions. Silas must identify the client's conversion hierarchy during onboarding (Route 0 orchestrator intake):

| Business Type | Primary Conversion | Secondary Conversion | Tertiary Conversion |
|---|---|---|---|
| **Home Services** (HVAC, plumbing, roofing, etc.) | Phone call | Form submission | Schedule online |
| **Medical / Dental** | Schedule appointment | Phone call | Form submission |
| **Legal** | Phone call (free consultation) | Form submission | Live chat |
| **Restaurant / Food** | Online order / reservation | Phone call | Map directions |
| **Retail / E-commerce** | Add to cart / Purchase | Store locator | Phone call |
| **Professional Services** (accounting, consulting) | Form submission | Phone call | Schedule meeting |
| **Real Estate** | Form submission (property inquiry) | Phone call | Schedule showing |
| **Auto Services** (mechanic, detailing, body shop) | Phone call | Schedule online | Map directions |

### 2.2 Conversion Intent Mapping

Each page type serves visitors at different points in the decision funnel. Conversion elements must match the visitor's intent:

| Page Type | Visitor Intent Stage | Dominant CTA Style |
|---|---|---|
| **Homepage** | Mixed — discovery, validation, navigation | Soft CTA (explore services) + persistent phone |
| **City Hub** | Mid-funnel — evaluating provider options | Medium CTA (get a quote) + phone |
| **Service Page** | High-intent — ready to buy/book | Hard CTA (call now, schedule today) |
| **Neighborhood Spoke** | High-intent — location-specific need | Hard CTA (call now) + address proximity signal |
| **Blog / Resource** | Low-intent — researching/learning | Soft CTA (related services) + subtle phone |
| **Landing Page (PPC)** | Highest-intent — clicked an ad | Aggressive CTA (single action, no distractions) |
| **About / Team** | Mid-funnel — trust evaluation | Medium CTA (contact us, get to know us) |
| **Contact Page** | Conversion-ready — looking for contact method | All contact methods visible immediately |

---

## 3. PHONE NUMBER ARCHITECTURE

### 3.1 Why Phone Matters Most

For local service businesses (the majority of Silas's client base), phone calls convert at 10–15x the rate of form submissions. Google tracks click-to-call behavior from mobile SERPs and GBP as an engagement signal. Phone visibility directly impacts both conversions AND rankings.

### 3.2 Phone Number Placement Rules

| Location | Format | Behavior | Required? |
|---|---|---|---|
| **Header (desktop)** | Full number, large font (18px+) | `tel:` link on mobile, visible on all viewports | Yes — every page |
| **Header (mobile)** | Phone icon + "Call Now" button | `tel:` link, full-width or prominent button | Yes — every page |
| **Hero Section** | Full number + "Call for Free Estimate" | `tel:` link, high contrast against background | Yes — service pages |
| **Sticky Mobile Bar** | Phone icon + abbreviated CTA | Fixed to bottom of viewport, `tel:` link | Yes — all pages on mobile |
| **Mid-Page CTA Band** | Full number + contextual CTA | `tel:` link within colored band breaking up content | Recommended — long pages |
| **Footer** | Full number + business hours | `tel:` link, paired with address | Yes — every page |
| **Sidebar (desktop)** | Full number + form | `tel:` link above form widget | Recommended — service pages |

### 3.3 Phone Number HTML

**Standard clickable phone number:**
```html
<a href="tel:+1XXXXXXXXXX" aria-label="Call {BUSINESS_NAME} at (XXX) XXX-XXXX">
  (XXX) XXX-XXXX
</a>
```

**Mobile click-to-call button:**
```html
<a href="tel:+1XXXXXXXXXX" class="cta-phone-mobile"
   aria-label="Call {BUSINESS_NAME} now">
  <svg><!-- phone icon --></svg>
  <span>Call Now — Free Estimate</span>
</a>
```

**Rules:**
- Always use `tel:+1XXXXXXXXXX` format (include country code, no spaces/dashes in href)
- Display format: `(XXX) XXX-XXXX` for US numbers (matches user expectation)
- Add `aria-label` for accessibility (screen readers)
- Never render phone numbers as images (not crawlable, not clickable)
- Never use JavaScript to reveal phone numbers (crawler can't execute JS reliably)
- Track phone clicks with Google Tag Manager event (see §8)

### 3.4 Multi-Location Phone Handling

For clients with multiple locations (like Spectators with 3 locations), Silas must route visitors to the correct phone number:

**Option A — Location-Specific Pages:**
Each location page displays only that location's phone number. The header shows the primary/corporate number with a "Find Your Location" dropdown.

**Option B — Geo-Detection (Advanced):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "telephone": "{LOCATION_SPECIFIC_NUMBER}",
  "address": { /* location-specific address */ }
}
</script>
```

Each location page serves its own phone number in both visible content and schema. The homepage can use a location selector or default to the primary location.

**Option C — Call Tracking Numbers:**
If the client uses call tracking (CallRail, CallTrackingMetrics, etc.), Silas must ensure:
- The tracking number is the visible/clickable number
- The actual business number appears in schema markup (Google penalizes NAP inconsistency if tracking numbers appear in schema)
- The tracking number swap script loads AFTER the page renders (so crawlers see the real number)

---

## 4. CTA DESIGN SYSTEM

### 4.1 CTA Types

Silas uses three CTA intensity levels, deployed based on page type and visitor intent (§2.2):

**Hard CTA — "Do It Now"**
- Purpose: Immediate action for high-intent visitors
- Language: "Call Now", "Schedule Today", "Book Your Free Estimate", "Get Emergency Service"
- Visual: High-contrast button, primary brand color, large (minimum 44px tall for mobile tap targets)
- Placement: Hero section, mid-page band, sticky bar

**Medium CTA — "Take the Next Step"**
- Purpose: Move mid-funnel visitors closer to conversion
- Language: "Get a Free Quote", "Request a Consultation", "See Our Services", "View Pricing"
- Visual: Secondary brand color or outlined button, standard size
- Placement: End of content sections, sidebar, below tables

**Soft CTA — "Learn More"**
- Purpose: Guide low-intent visitors deeper into the site
- Language: "Learn About Our Process", "Read Customer Reviews", "Explore {Service}"
- Visual: Text link or subtle button, understated styling
- Placement: Within blog content, end of informational sections, related content blocks

### 4.2 CTA Placement Framework

The "Rule of 3 Touchpoints": every page should present a conversion opportunity at three distinct scroll depths — top (above the fold), middle (content break), and bottom (post-content). The visitor should never need to scroll more than 2 screen heights without encountering a CTA.

**Visual placement map for a service page:**

```
┌─────────────────────────────────┐
│  HEADER — Phone number visible  │  ← Persistent across all pages
├─────────────────────────────────┤
│                                 │
│  HERO SECTION                   │
│  H1 + opening paragraph        │
│  [HARD CTA BUTTON]             │  ← Touchpoint 1: Above the fold
│  Phone: (XXX) XXX-XXXX         │
│                                 │
├─────────────────────────────────┤
│                                 │
│  CONTENT SECTION 1              │
│  Pricing table / Process steps  │
│                                 │
├─── CTA BAND ────────────────────┤  ← Touchpoint 2: Mid-page break
│  "Ready to get started?         │
│   Call (XXX) XXX-XXXX or        │
│   [REQUEST A QUOTE]"            │
├─────────────────────────────────┤
│                                 │
│  CONTENT SECTION 2              │
│  PAA block / Neighborhood info  │
│                                 │
├─────────────────────────────────┤
│                                 │
│  SOCIAL PROOF SECTION           │
│  Reviews / Case study           │
│  [HARD CTA BUTTON]             │  ← Touchpoint 3: Post-proof action
│                                 │
├─────────────────────────────────┤
│  FOOTER — Phone, address, form  │  ← Final conversion safety net
└─────────────────────────────────┘

│ STICKY MOBILE BAR │ ← Always visible on mobile
│ [📞 Call] [📋 Quote] │
```

### 4.3 CTA Copy Rules

**DO:**
- Start with a verb: "Call", "Get", "Schedule", "Book", "Request"
- Include the value proposition: "Free Estimate", "Same-Day Service", "No Obligation"
- Create urgency when honest: "Limited Availability", "Emergency Service Available 24/7"
- Use first person for forms: "Get My Free Quote" (outperforms "Get Your Free Quote" by 25-30% in A/B tests)
- Include phone number directly in CTA bands (not just a button — some users prefer to dial manually)

**DON'T:**
- Use generic "Submit" or "Click Here"
- Use false urgency: "Only 3 Spots Left!" (unless true)
- Stack multiple CTAs competing for the same action in the same viewport
- Use all caps for CTA text (reduces readability)
- Make the CTA longer than 6 words on a button

### 4.4 CTA Button Specifications

**Minimum requirements for all CTA buttons:**

| Property | Mobile | Desktop |
|---|---|---|
| Height | 48px minimum (Google's tap target standard) | 44px minimum |
| Width | Full-width or minimum 200px | Minimum 180px |
| Font size | 16px minimum (prevents iOS zoom) | 14px minimum |
| Padding | 12px vertical, 24px horizontal | 10px vertical, 20px horizontal |
| Border radius | 4–8px (not fully rounded — reduces perceived clickability) | 4–8px |
| Contrast ratio | 4.5:1 text-to-background minimum (WCAG AA) | 4.5:1 minimum |
| Hover state | N/A (no hover on mobile) | Darken 10–15% or add shadow |

**Color guidance:**
- Primary CTA: Client's brand primary color (or high-contrast action color like green/orange if brand color is low-contrast)
- Secondary CTA: Outlined version of primary or neutral gray
- Never use red for positive CTAs (red = danger/error association)
- Never use the same color as the page background's dominant tone

---

## 5. CONTACT FORM ARCHITECTURE

### 5.1 Form Placement Strategy

Forms should appear in these locations based on page type:

| Page Type | Form Location | Form Complexity |
|---|---|---|
| Service Page | Sidebar (desktop), after content (mobile) | Short (3–5 fields) |
| Contact Page | Main content area, full-width | Medium (5–7 fields) |
| Landing Page | Above the fold, beside or below hero | Minimal (2–3 fields) |
| City Hub | Sidebar or bottom section | Short (3–5 fields) |
| Blog Post | Bottom of post or sidebar | Minimal (2–3 fields) |
| Homepage | Not recommended (too early in funnel) | — |

### 5.2 Form Field Hierarchy

Every additional form field reduces completion rate by approximately 10–15%. Silas builds forms using the minimum viable fields:

**Minimal Form (2–3 fields) — Highest conversion, used for landing pages and blog CTAs:**
```html
<form>
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="tel" name="phone" placeholder="Phone Number" required>
  <button type="submit">Get My Free Quote</button>
</form>
```

**Short Form (3–5 fields) — Standard for service pages:**
```html
<form>
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="tel" name="phone" placeholder="Phone Number" required>
  <input type="email" name="email" placeholder="Email Address">
  <select name="service" required>
    <option value="">Select a Service</option>
    <option value="service_1">{SERVICE_1}</option>
    <option value="service_2">{SERVICE_2}</option>
  </select>
  <button type="submit">Request Free Estimate</button>
</form>
```

**Medium Form (5–7 fields) — Contact page and detailed requests:**
```html
<form>
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="tel" name="phone" placeholder="Phone Number" required>
  <input type="email" name="email" placeholder="Email Address" required>
  <input type="text" name="address" placeholder="Service Address">
  <select name="service" required>
    <option value="">Select a Service</option>
    <!-- service options -->
  </select>
  <select name="urgency">
    <option value="standard">Standard (within a week)</option>
    <option value="soon">Soon (within 48 hours)</option>
    <option value="emergency">Emergency (today)</option>
  </select>
  <textarea name="message" placeholder="Describe your issue (optional)" rows="3"></textarea>
  <button type="submit">Submit Service Request</button>
</form>
```

### 5.3 Form UX Rules

| Rule | Implementation | Rationale |
|---|---|---|
| Phone field uses `type="tel"` | `<input type="tel">` | Triggers numeric keypad on mobile |
| Email field uses `type="email"` | `<input type="email">` | Triggers email keyboard on mobile |
| Labels above fields, not inside | Visible `<label>` elements | Placeholder-only labels disappear on focus, confusing users |
| Error validation is inline | Show error next to the field, not at top of form | Users don't scroll back up to find what's wrong |
| Submit button matches Hard CTA style | Same color, size, and contrast as page CTAs | Visual consistency, clear affordance |
| Success message replaces form | "Thank you! We'll call you within [timeframe]." | Confirms submission, sets response expectation |
| No CAPTCHA on short forms | Use honeypot field instead | CAPTCHA kills mobile completion rates |
| Form loads without JavaScript | Server-side rendering, progressive enhancement | JS-dependent forms may not render for all users |

### 5.4 Honeypot Anti-Spam

Instead of CAPTCHA (which reduces form completion by 20–30%), use an invisible honeypot field:

```html
<!-- Honeypot — hidden from real users, filled by bots -->
<div style="position:absolute;left:-9999px;" aria-hidden="true">
  <input type="text" name="website" tabindex="-1" autocomplete="off">
</div>
```

Server-side: reject any submission where `website` field is filled.

### 5.5 Form Schema Markup

Every contact form page should include ContactPoint schema:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{BUSINESS_NAME}",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1XXXXXXXXXX",
    "contactType": "customer service",
    "availableLanguage": ["English"],
    "areaServed": "{SERVICE_AREA}"
  },
  "potentialAction": {
    "@type": "CommunicateAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{CONTACT_PAGE_URL}",
      "actionPlatform": "https://schema.org/DesktopWebPlatform"
    }
  }
}
```

---

## 6. TRUST SIGNAL PLACEMENT

### 6.1 Trust Signal Types

Trust signals reduce friction at conversion points. Silas deploys these in proximity to CTAs and forms:

| Trust Signal | Format | Placement |
|---|---|---|
| **Star Rating** | Aggregate star display (4.8★ from 127 reviews) | Header, hero section, next to CTA buttons |
| **Review Snippets** | 1–2 line quotes from real reviews | Between content and CTA, beside forms |
| **Certification Badges** | Visual logos (BBB, trade associations, manufacturer) | Footer, about page, beside forms |
| **License Numbers** | Text: "FL License #CAC1234567" | Footer, about page |
| **Years in Business** | Text or badge: "Serving {City} Since {Year}" | Hero section, about page |
| **Service Guarantees** | Text or badge: "100% Satisfaction Guarantee" | Near CTA buttons, form headers |
| **Response Time Promise** | Text: "We respond within 30 minutes" | Near phone number, form submission confirmation |
| **Photo of Team/Owner** | Actual photo (not stock) | About page, sidebar, near reviews |
| **Insurance / Bonding** | Text: "Fully Licensed, Bonded & Insured" | Footer, service pages |
| **Number of Jobs Completed** | Text: "4,500+ repairs completed" | Hero section, about page |

### 6.2 Trust Signal Placement Rules

**The Trust Proximity Principle:** Trust signals are most effective when placed directly adjacent to conversion elements. A review snippet next to a CTA button reduces click hesitation. A certification badge next to a form reassures the visitor before they submit personal information.

**Placement map:**

```
[HARD CTA BUTTON]
★★★★★ 4.8 from 127 Google Reviews
"Best service we've ever had..." — Jane D.
Licensed & Insured | BBB A+ Rated
```

**Rules:**
- At least ONE trust signal must appear within 200px of every Hard CTA
- The aggregate star rating should appear on EVERY page (header or hero)
- Certification badges should appear on service pages and the about page
- Review snippets should rotate or be manually curated (not auto-pulled — curated snippets are always higher quality)
- Never use trust signals from organizations the client isn't actually a member of
- Photo-based trust signals (team photos, truck photos) must be real — no stock photography

### 6.3 Review Integration

**Google Reviews Widget:**
For WordPress sites, Silas recommends embedding Google reviews using one of these methods:

**Method A — Plugin (Fastest):**
- Widget for Google Reviews (free plugin, auto-pulls from GBP)
- Display settings: 5-star reviews only, limit to 5–10 displayed, show reviewer photo + name

**Method B — Custom HTML (Better control):**
- Pull reviews via Google Places API
- Render as semantic HTML with ReviewAggregate schema
- Cache locally (API has rate limits)

**Method C — Manual Curation (Best quality):**
- Select 5–10 best reviews manually
- Format as blockquotes with attribution
- Update quarterly during optimization cycles

Regardless of method, the review section MUST include AggregateRating schema:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{BUSINESS_NAME}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{RATING}",
    "reviewCount": "{REVIEW_COUNT}",
    "bestRating": "5"
  }
}
```

---

## 7. MOBILE CONVERSION OPTIMIZATION

### 7.1 Mobile-First Priority

60–80% of local search traffic is mobile. Mobile conversion optimization is not secondary — it's primary. Every element in this spec must work on a 375px viewport (iPhone SE) as the baseline.

### 7.2 Sticky Mobile CTA Bar

Every client page must have a sticky bottom bar on mobile viewports:

```html
<div class="sticky-mobile-cta" role="navigation" aria-label="Quick contact">
  <a href="tel:+1XXXXXXXXXX" class="sticky-cta-call">
    <svg><!-- phone icon --></svg>
    <span>Call Now</span>
  </a>
  <a href="{FORM_SECTION_ANCHOR}" class="sticky-cta-quote">
    <svg><!-- form icon --></svg>
    <span>Free Quote</span>
  </a>
</div>

<style>
  .sticky-mobile-cta {
    display: none; /* hidden on desktop */
  }
  @media (max-width: 768px) {
    .sticky-mobile-cta {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: #fff;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.15);
      padding: 8px;
      gap: 8px;
    }
    .sticky-mobile-cta a {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
    }
    .sticky-cta-call {
      background: {PRIMARY_CTA_COLOR};
      color: #fff;
    }
    .sticky-cta-quote {
      background: #f0f0f0;
      color: #333;
    }
    /* Prevent page content from being hidden behind sticky bar */
    body { padding-bottom: 72px; }
  }
</style>
```

### 7.3 Mobile Form Optimization

Mobile forms require additional rules beyond §5.3:

| Rule | Why |
|---|---|
| Maximum 3 visible fields | Scrolling to find the submit button kills completion |
| Use `autocomplete` attributes | `autocomplete="name"`, `autocomplete="tel"` pre-fills from device contacts |
| Submit button is full-width | Easy tap target, no horizontal alignment guessing |
| Input font size ≥ 16px | Prevents iOS auto-zoom on focus |
| Form section has its own heading | Scroll-to-section from sticky bar must land clearly |
| No multi-column form layouts | Single column only on mobile |
| Input height ≥ 48px | Google's minimum tap target for mobile usability |

### 7.4 Mobile Speed and Conversion

Every 100ms of load time delay reduces mobile conversion rate by approximately 1%. Conversion optimization and performance are inseparable on mobile. Key rules:

- Hero image must be compressed and lazy-loaded (or use CSS background)
- CTA buttons must render in the initial HTML (no JS-dependent CTAs)
- Sticky bar must be in the initial DOM (no delayed injection)
- Form must be functional without JavaScript (progressive enhancement)
- Phone number `tel:` links must be in the initial HTML

---

## 8. CONVERSION TRACKING

### 8.1 Required Tracking Events

Silas ensures every client site tracks these conversion events:

| Event | Trigger | Tracking Method |
|---|---|---|
| **Phone Click (Header)** | Click on header phone `tel:` link | GTM click event → GA4 |
| **Phone Click (Sticky Bar)** | Click on mobile sticky bar call button | GTM click event → GA4 |
| **Phone Click (In-Content)** | Click on any mid-page phone link | GTM click event → GA4 |
| **Form Submission** | Successful form submission | Form redirect or GTM form event → GA4 |
| **Form Start** | First field interaction | GTM focus event → GA4 |
| **Form Abandonment** | Form started but not submitted within session | GA4 calculated metric |
| **CTA Button Click** | Click on any CTA button (non-phone) | GTM click event → GA4 |
| **Directions Click** | Click on Google Maps embed or "Get Directions" | GTM click event → GA4 |
| **Schedule Widget** | Appointment booked via online scheduler | Widget callback → GA4 |
| **Scroll Depth** | 25%, 50%, 75%, 100% scroll thresholds | GTM scroll trigger → GA4 |

### 8.2 Google Tag Manager Container Template

Silas generates a standard GTM container configuration for every client with these tags pre-configured:

```
TRIGGERS:
├── Phone Click — CSS selector: a[href^="tel:"]
├── Form Submit — Form ID or CSS selector match
├── CTA Click — CSS class: .cta-button, .cta-phone-mobile, etc.
├── Directions Click — CSS selector: a[href*="maps.google"]
└── Scroll Depth — 25/50/75/100 thresholds

TAGS:
├── GA4 Event: phone_click (category: conversion)
├── GA4 Event: form_submit (category: conversion)
├── GA4 Event: cta_click (category: engagement)
├── GA4 Event: directions_click (category: engagement)
├── GA4 Event: scroll_depth (category: engagement)
└── Google Ads Conversion (if client runs PPC)

VARIABLES:
├── Click URL — built-in
├── Click Text — built-in
├── Page Path — built-in
└── Click Element CSS Selector — custom
```

### 8.3 Call Tracking Integration

If the client uses a call tracking service, Silas configures number swap properly:

**CallRail / CallTrackingMetrics / WhatConverts:**
1. Place the tracking script in `<head>` via GTM
2. The script dynamically swaps the visible phone number with a tracking number
3. CRITICAL: The swap must NOT affect the `<script type="application/ld+json">` schema — schema must always show the REAL business number
4. The swap must NOT affect the `tel:` href on mobile — update both the display text AND the href

**Validation:**
After deploying call tracking, Silas crawls the page as Googlebot (using the user-agent string) to verify that the schema still shows the real number, not the tracking number. NAP inconsistency between schema and tracking numbers can cause GBP listing issues.

---

## 9. PAGE-TYPE CONVERSION BLUEPRINTS

### 9.1 Service Page Blueprint

```
CONVERSION ELEMENTS:
├── Header: Phone number visible (right-aligned desktop, full-width mobile)
├── Hero: H1 + 1 paragraph + [Hard CTA Button] + Phone number
│   └── Trust: "★★★★★ 4.8 | 127 Reviews | Licensed & Insured"
├── After Pricing Table: CTA Band
│   └── "Ready for a quote? Call (XXX) XXX-XXXX or [Get My Free Quote]"
├── Sidebar (desktop): Short form (3-5 fields) + phone + trust badges
├── After PAA Block: [Medium CTA] linking to contact page
├── Review Section: 3-5 curated reviews + [Hard CTA Button]
├── Footer: Phone + address + hours + [Form link]
└── Mobile Sticky Bar: [Call Now] + [Free Quote]

TRACKING:
├── Phone clicks (header, hero, CTA band, sticky bar — each tagged separately)
├── Form submission
├── CTA button clicks
└── Scroll depth
```

### 9.2 City Hub Blueprint

```
CONVERSION ELEMENTS:
├── Header: Phone number + location selector (if multi-location)
├── Hero: H1 + overview paragraph + [Medium CTA] + Phone
│   └── Trust: Star rating + years in business
├── After Service Table: [Medium CTA] "View Pricing" or "Get a Quote"
├── Neighborhood Directory: Each neighborhood card links to spoke page
│   └── Secondary CTA on each card: "Learn More" or "Get Service Here"
├── Review Section: Aggregated reviews filtered by city
├── Map Embed: Interactive Google My Map with service area
│   └── "Get Directions" link tracked as conversion event
├── Bottom Section: Short form + phone + "Serving {City} Since {Year}"
└── Mobile Sticky Bar: [Call Now] + [Free Quote]
```

### 9.3 Blog Post Blueprint

```
CONVERSION ELEMENTS:
├── Header: Phone number (standard, always present)
├── In-Content (after ~500 words): Contextual CTA band
│   └── "Need help with {topic}? Call (XXX) XXX-XXXX for expert advice."
├── End of Post: Related services section with [Soft/Medium CTA]
│   └── "If you're experiencing {problem from article}, our {service} team can help."
├── Sidebar (desktop): Minimal form (2-3 fields) or email signup
├── No sticky bar on blog posts (too aggressive for informational intent)
├── Author bio with credentials (trust signal for E-E-A-T)
└── Related posts section with internal links

NOTE: Blog CTAs should feel helpful, not salesy. The visitor came to learn.
Match the CTA to the article's problem. Don't interrupt educational content
with "CALL NOW" unless the topic is emergency-related.
```

### 9.4 Contact Page Blueprint

```
CONVERSION ELEMENTS:
├── H1: "Contact {Business Name}" or "Get in Touch"
├── All contact methods visible immediately (no scrolling):
│   ├── Phone: Large, clickable, with business hours
│   ├── Email: Mailto link (or form, but phone is primary)
│   ├── Address: With embedded Google Map
│   └── Hours: Clear business hours table
├── Medium Form (5-7 fields): Centered, prominent
│   └── Service selector dropdown helps route inquiries
├── Trust signals: Badges, license number, response time promise
│   └── "We typically respond within 30 minutes during business hours"
├── Multi-Location: Separate contact cards per location
│   └── Each card: Phone, address, hours, map pin
└── Mobile: Stack all elements vertically, phone first

NO DISTRACTIONS: Contact page should not have blog sidebars,
promotional banners, or navigation-heavy elements. Single purpose: convert.
```

---

## 10. CONVERSION AUDIT CHECKLIST

When Silas audits an existing page for conversion optimization, it evaluates:

```
PHONE VISIBILITY
□ Phone number visible in header on desktop
□ Phone number accessible via tap on mobile (tel: link)
□ Phone number appears in hero/above-the-fold section (service pages)
□ Phone number format is consistent across all pages
□ tel: href includes country code (+1)
□ No phone numbers rendered as images

CTA ARCHITECTURE
□ Hard CTA present above the fold (service pages)
□ CTA band present at mid-page on long pages
□ CTA present after social proof/reviews section
□ CTA copy starts with a verb
□ CTA button meets minimum size requirements (48px mobile)
□ CTA contrast ratio meets WCAG AA (4.5:1)
□ No competing CTAs in the same viewport

FORMS
□ Form present on service pages and contact page
□ Form has ≤ 5 fields (service pages) or ≤ 7 fields (contact page)
□ Phone field uses type="tel"
□ Email field uses type="email"
□ Form works without JavaScript
□ Success confirmation message displays after submission
□ Anti-spam implemented (honeypot preferred over CAPTCHA)

MOBILE
□ Sticky CTA bar present on mobile viewports
□ All tap targets ≥ 48px
□ Input font size ≥ 16px (no iOS auto-zoom)
□ Single-column form layout on mobile
□ Phone CTA is the primary sticky bar action

TRUST SIGNALS
□ Star rating visible on every page
□ Trust signal within 200px of Hard CTA
□ Real photos used (no stock photography for team/work images)
□ License/certification numbers displayed
□ Review section present on service pages

TRACKING
□ Phone click events tracked in GA4
□ Form submission events tracked in GA4
□ CTA button clicks tracked in GA4
□ Scroll depth tracked
□ Call tracking configured correctly (schema shows real number)

SCORING:
24/24 = Conversion-optimized (monitor and iterate)
18-23 = Minor gaps (implement fixes, prioritize phone and CTA items)
12-17 = Significant conversion leaks (major restructure needed)
0-11  = Critical — page is losing most potential conversions
```

---

## 11. A/B TESTING FRAMEWORK

### 11.1 What to Test

Silas recommends testing these elements in priority order:

| Priority | Element to Test | Variations |
|---|---|---|
| P0 | CTA button copy | "Call Now" vs "Get Free Estimate" vs "Schedule Today" |
| P0 | Form field count | 3 fields vs 5 fields |
| P1 | CTA button color | Brand primary vs high-contrast alternative |
| P1 | Phone number placement | Header-only vs header + hero |
| P1 | Trust signal content | Star rating vs review snippet vs badge |
| P2 | CTA band position | After pricing table vs after process steps |
| P2 | Form CTA copy | "Submit" vs "Get My Free Quote" vs "Request Callback" |
| P2 | Sticky bar design | 2-button vs call-only |

### 11.2 Testing Requirements

- Minimum 200 conversions per variation before declaring a winner (statistical significance)
- Run tests for a minimum of 2 full weeks (accounts for day-of-week variance)
- Test ONE element at a time (multivariate testing requires significantly more traffic)
- Use Google Optimize successor or a tool like VWO/Optimizely for proper split testing
- Document all test results in the client's performance tracking dashboard

---

## 12. WORDPRESS / ELEMENTOR IMPLEMENTATION

### 12.1 Phone Number Management

For WordPress sites, Silas recommends storing the phone number as a global variable to ensure consistency:

**Method A — Elementor Global Widget:**
1. Create a "Phone CTA" global widget in Elementor
2. Use this widget in the header, hero, and CTA bands
3. Updating the global widget updates all instances

**Method B — Custom Field (ACF or native):**
1. Create a site-wide option field for phone number
2. Reference with shortcode: `[business_phone]`
3. Or PHP: `get_option('business_phone')`

**Method C — Theme Customizer:**
1. Register a customizer field for phone number
2. Output in header.php / footer.php templates
3. Available globally via `get_theme_mod('business_phone')`

### 12.2 Sticky Bar Implementation

**Elementor-Based:**
Use Elementor's "Sticky" motion effect on a section:
1. Create a narrow section at the bottom of the page template
2. Add two buttons: Call Now (tel: link) and Free Quote (anchor link)
3. Set Motion Effects → Sticky → Bottom
4. Set responsive visibility to Mobile + Tablet only

**Code-Based (More reliable):**
Inject via child theme's `wp_footer` hook using the HTML template from §7.2. This avoids Elementor's sticky behavior quirks on certain themes.

### 12.3 Form Plugins

Silas's recommended WordPress form plugins, in order of preference:

1. **WPForms Lite** — Clean, lightweight, GTM-friendly, honeypot built-in
2. **Gravity Forms** — More advanced routing/conditional logic, good for multi-location
3. **Contact Form 7** — Lightweight but requires more manual styling work
4. **Elementor Forms (Pro)** — Acceptable if client already has Elementor Pro

Avoid: Ninja Forms (bloated), JetPack Contact (limited tracking), generic theme-bundled forms (poor customization).

---

## 13. CROSS-SPEC INTEGRATION

| Related Spec | Integration Point |
|---|---|
| **SPEC-002 (On-Page SEO)** | Primary keyword from SPEC-002 drives CTA contextual copy. Service page keyword → CTA references that service. |
| **SPEC-003 (Schema Markup)** | ContactPoint and AggregateRating schema must align with visible conversion elements. Phone in schema = phone on page. |
| **SPEC-007 (Content Architecture)** | Content block order from SPEC-007 determines CTA band insertion points. CTAs go between major content sections, never interrupting a content block. |
| **SPEC-008 (Technical SEO)** | Page speed requirements (sub-3-second load) directly impact conversion rates. Sticky bars and form scripts must not degrade Core Web Vitals. |
| **SPEC-009 (Grounding Boxes)** | Grounding boxes do NOT contain conversion elements (no CTAs, no forms). They are for AI extraction only. Conversion elements are visible-layer only. |
| **SPEC-010 (Content Formatting)** | CTA bands are inserted between content blocks defined in SPEC-010 templates. They occupy their own visual row — never embedded within a content section. |

---

## 14. IMPLEMENTATION NOTES

### 14.1 Conversion vs. SEO Tension

There is a natural tension between SEO-optimized content (long, detailed, keyword-rich) and conversion-optimized design (clean, focused, action-oriented). Silas resolves this by:

- Using CTA bands as visual breaks BETWEEN content sections, not replacing content
- Keeping forms in sidebars (desktop) so content flow isn't interrupted
- Making the sticky mobile bar the primary mobile conversion path, so the content body stays clean
- Treating blog posts with lighter CTAs than service pages (matching visitor intent)

The goal is never to sacrifice SERP feature capture for conversion elements, or vice versa. Both must coexist.

### 14.2 Autonomous Deployment Priority

When Silas deploys conversion elements on a new client site, it follows this order:

```
1. Phone number in header + tel: link (immediate — highest impact)
2. Sticky mobile CTA bar (immediate — captures mobile majority)
3. Hard CTA in hero section of service pages
4. Contact form on service pages + contact page
5. CTA bands at mid-page on long service pages
6. Trust signals adjacent to CTAs
7. Review section with curated snippets
8. GTM conversion tracking setup
9. Call tracking integration (if client uses call tracking)
10. A/B testing framework (after baseline data collected)
```

Steps 1–3 can be deployed in a single session and typically produce a measurable conversion lift within the first week.

---

*End of SPEC-011 — Page-Level Conversion Optimization*
*Total spec lines across 11 documents: ~11,250*
*Next pending: Cross-spec integration cleanup (final pass)*
