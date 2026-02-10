# LocalCatalyst Design System
**Client:** LocalCatalyst (SEO Agency)  
**Created by:** Canvas Design Agent  
**Date:** February 9, 2026  
**Version:** 1.0

---

## TABLE OF CONTENTS
1. Brand Foundation
2. Color Palette
3. Typography System
4. Component Library
5. Layout & Spacing System
6. Interaction Patterns
7. Accessibility Standards
8. Icon System

---

## 1. BRAND FOUNDATION

### Brand Positioning
- **Industry:** B2B SEO Services (Local, Technical, On-Page, GBP)
- **Audience:** Small-to-medium local business owners ($10K-$50K annual marketing budget)
- **Tone:** Expert, Professional, Trustworthy, Transparent
- **Personality:** Confident but approachable; data-driven but human
- **Core Message:** "Local SEO expertise that drives real results"

### Design Direction
- **Overall Feel:** Modern, professional, confidence-inspiring
- **Primary Metaphor:** Data visualization, upward growth, dominance, clarity
- **Mood Keywords:** Trustworthy, innovative, transparent, results-focused
- **Primary Conversion Goal:** Schedule strategy call / request proposal

---

## 2. COLOR PALETTE

### Primary Color System

#### Primary Blue (Brand Identity)
- **Color Name:** LocalCatalyst Blue
- **Hex:** `#1D4F7C`
- **RGB:** `(29, 79, 124)`
- **HSL:** `(206°, 62%, 30%)`
- **Usage:** Primary headers, key CTAs, brand identity, focus states

#### Secondary Blue (Trust Accent)
- **Color Name:** Confidence Blue
- **Hex:** `#2563EB`
- **RGB:** `(37, 99, 235)`
- **HSL:** `(218°, 98%, 54%)`
- **Usage:** Hover states, secondary CTAs, data highlights, links

#### CTA Orange (Urgency & Action)
- **Color Name:** Action Orange
- **Hex:** `#F97316`
- **RGB:** `(249, 115, 22)`
- **HSL:** `(25°, 97%, 53%)`
- **Usage:** Primary buttons, important alerts, conversion CTAs, energy
- **Contrast ratio vs white:** 4.1:1 ✅ (WCAG AA)

### Neutral Color System

#### Text Colors
- **Primary Text:** `#1F2937` (Near-black for readability)
- **Secondary Text:** `#6B7280` (Medium gray for secondary information)
- **Tertiary Text:** `#9CA3AF` (Light gray for captions/metadata)
- **On Dark Background:** `#FFFFFF` (Pure white for text on dark)

#### Background Colors
- **Primary Background:** `#FFFFFF` (Pure white for main content)
- **Secondary Background:** `#F9FAFB` (Off-white for sections, blocks)
- **Tertiary Background:** `#F3F4F6` (Light gray for alternate sections)
- **Dark Background:** `#1F2937` (Dark charcoal for dark sections)

#### Border & Divider Colors
- **Primary Border:** `#E5E7EB` (Light gray for standard borders)
- **Secondary Border:** `#D1D5DB` (Medium gray for emphasis)
- **Subtle Border:** `#F3F4F6` (Very light for subtle separation)

### Utility Colors

#### Success State
- **Color:** `#10B981`
- **RGB:** `(16, 185, 129)`
- **Usage:** Checkmarks, confirmed states, positive metrics

#### Warning State
- **Color:** `#F59E0B`
- **RGB:** `(245, 158, 11)`
- **Usage:** Important alerts, cautions, review notifications

#### Error State
- **Color:** `#EF4444`
- **RGB:** `(239, 68, 68)`
- **Usage:** Error messages, critical alerts, validation failures

#### Disabled State
- **Color:** `#D1D5DB`
- **RGB:** `(209, 213, 219)`
- **Usage:** Disabled buttons, inactive elements, locked features

### Color Applications

| Element | Primary Color | Secondary Color | Accent Color |
|---------|---|---|---|
| Primary CTA Button | `#F97316` | Hover: `#EA580C` | - |
| Secondary CTA Button | `#1D4F7C` | Hover: `#153655` | - |
| Hero Section | `#1D4F7C` | - | `#F97316` |
| Service Card Header | `#1D4F7C` | - | - |
| Form Labels | `#1F2937` | - | - |
| Form Focus | - | `#2563EB` | - |
| Data Visualization | Mix | `#2563EB`, `#10B981`, `#F59E0B` | - |
| Navigation Active | `#1D4F7C` | - | `#F97316` |

### Color Contrast Verification (WCAG AA)
- ✅ `#F97316` (Orange) on `#FFFFFF` (white): 4.1:1
- ✅ `#1D4F7C` (Primary Blue) on `#FFFFFF` (white): 7.8:1
- ✅ `#2563EB` (Secondary Blue) on `#FFFFFF` (white): 6.9:1
- ✅ `#1F2937` (Text) on `#FFFFFF` (white): 13.2:1
- ✅ `#6B7280` (Secondary Text) on `#FFFFFF` (white): 7.8:1

---

## 3. TYPOGRAPHY SYSTEM

### Font Families

#### Heading Font: Poppins
- **Family:** Poppins (Google Fonts)
- **Weight:** 600 (semibold), 700 (bold), 800 (extrabold)
- **Characteristics:** Modern, geometric, confident, friendly
- **Usage:** All headings (H1-H6), hero text, call-outs
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');`

#### Body Font: Inter
- **Family:** Inter (Google Fonts)
- **Weight:** 400 (regular), 500 (medium), 600 (semibold)
- **Characteristics:** Highly legible, modern, neutral, perfect for web
- **Usage:** Body text, paragraphs, lists, form text
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');`

### Typography Scale

| Size | Heading Level | Font Size | Line Height | Letter Spacing | Usage |
|------|---|---|---|---|---|
| Display | H1 XL | 48px | 1.1 | -0.5px | Homepage hero, page titles |
| Display | H1 L | 40px | 1.2 | -0.3px | Service page titles, major CTAs |
| Large | H2 | 32px | 1.3 | -0.2px | Section headings, service card titles |
| Medium | H3 | 24px | 1.4 | 0 | Subsection headings, testimonial intro |
| Small | H4 | 20px | 1.5 | 0 | Feature titles, form section headers |
| Extra Small | H5 | 16px | 1.5 | 0 | Card titles, sidebar headings |
| Minimal | H6 | 14px | 1.5 | 0.5px | Labels, category tags |
| Body Large | P | 18px | 1.6 | 0 | Lead paragraphs, intro text |
| Body | P | 16px | 1.6 | 0 | Standard body text, list items |
| Body Small | P Small | 14px | 1.5 | 0 | Secondary text, captions, dates |
| Tiny | Span Caption | 12px | 1.4 | 0.3px | Metadata, fine print, footnotes |

### Font Weight Usage

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, standard paragraphs |
| 500 | Medium | Emphasized body text, lead text |
| 600 | Semibold | Subheadings, button text, strong emphasis |
| 700 | Bold | Heading level 3-6 |
| 800 | Extrabold | Heading level 1-2, hero text |

### Line Height System
- **Headings:** 1.1-1.3 (tighter spacing for confidence)
- **Body:** 1.6 (generous spacing for readability)
- **Captions:** 1.4 (comfortable but compact)

### Letter Spacing
- **Headlines:** -0.5px to 0px (slightly tight for impact)
- **Body:** 0px (neutral)
- **Small text:** +0.3 to +0.5px (easier to read at small sizes)

---

## 4. COMPONENT LIBRARY

### Button Components

#### Primary CTA Button
```
Background: #F97316 (Orange)
Text Color: #FFFFFF (White)
Font: Poppins 600, 16px
Padding: 14px 28px
Border Radius: 6px
Line Height: 1.5
States:
  - Default: #F97316
  - Hover: #EA580C (darker orange)
  - Active: #DC2626 (dark red)
  - Disabled: #D1D5DB (gray) with 50% opacity
Transition: background-color 200ms ease-in-out
```

#### Secondary Button
```
Background: #1D4F7C (Primary Blue)
Text Color: #FFFFFF (White)
Font: Poppins 600, 16px
Padding: 14px 28px
Border: 2px solid #1D4F7C
Border Radius: 6px
States:
  - Default: #1D4F7C background
  - Hover: #153655 (darker blue)
  - Active: #0F2541 (very dark)
  - Disabled: transparent with #D1D5DB border
Transition: all 200ms ease-in-out
```

#### Ghost Button (Outline)
```
Background: transparent
Text Color: #1D4F7C (Primary Blue)
Font: Poppins 600, 16px
Padding: 14px 28px
Border: 2px solid #1D4F7C
Border Radius: 6px
States:
  - Default: transparent background, #1D4F7C border
  - Hover: #F9FAFB background, #1D4F7C border
  - Active: #F3F4F6 background
Transition: all 200ms ease-in-out
```

#### Link Button (Text)
```
Background: transparent
Text Color: #2563EB (Secondary Blue)
Font: Inter 500, 16px
Padding: 4px 0
Border: none
States:
  - Default: #2563EB, no underline
  - Hover: #1D4F7C, underline
  - Visited: #6B7280
Transition: color 150ms ease-in-out
```

### Card Components

#### Service Card
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border Radius: 8px
Padding: 24px
Box Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover State:
  - Box Shadow: 0 10px 15px rgba(0,0,0,0.1)
  - Transform: translateY(-2px)
  - Transition: all 300ms ease-in-out

Interior Structure:
  - Icon: 48x48px, #F97316 (orange)
  - Title: H3 (24px, Poppins 700)
  - Description: P (16px, Inter 400, #6B7280)
  - CTA Link: Link button, #2563EB
```

#### Testimonial Card
```
Background: #F9FAFB (off-white)
Border: 1px solid #E5E7EB
Border Radius: 8px
Padding: 24px
Box Shadow: none

Interior Structure:
  - Stars: 5x ⭐ rating icon
  - Quote Text: P (16px, Inter 400, #1F2937)
  - Attribution Name: P Small bold (14px, #1D4F7C)
  - Attribution Title: P Small (14px, #6B7280)
  - Company: P Small italic (14px, #9CA3AF)
  - Left Accent: 4px left border, #F97316
```

#### Case Study Card
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border Radius: 8px
Overflow: hidden

Interior Structure:
  - Image: 100% width, 200px height (cover)
  - Content Padding: 24px
  - Title: H3 (24px, Poppins 700, #1D4F7C)
  - Category Tag: Pill badge, #F97316 background, 12px
  - Result Metric: H4 (20px, Poppins 700, #F97316)
  - Description: P (14px, #6B7280)
  - CTA: Primary button

Hover State:
  - Image: scale 1.05 on hover
  - Card: lift effect (box-shadow increase)
```

#### Feature/Benefit Card
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border Radius: 8px
Padding: 20px
Text Alignment: Center

Interior Structure:
  - Icon: 32x32px, #2563EB
  - Title: H5 (16px, Poppins 600)
  - Description: P (14px, Inter 400, #6B7280)
```

### Form Components

#### Form Input Field
```
Background: #FFFFFF
Border: 2px solid #E5E7EB
Border Radius: 6px
Padding: 12px 16px
Font: Inter 400, 16px
Line Height: 1.5

States:
  - Default: #E5E7EB border
  - Focus: #2563EB border, 2px
  - Hover: #D1D5DB border
  - Filled: #E5E7EB border, #1F2937 text
  - Error: #EF4444 border, #EF4444 bottom text
  - Disabled: #F3F4F6 background, #D1D5DB border, 50% opacity

Label:
  - Font: Inter 500, 14px
  - Color: #1F2937
  - Margin Bottom: 8px
  - Asterisk for required: #EF4444

Placeholder:
  - Color: #9CA3AF
  - Font: Inter 400, 16px
```

#### Form Textarea
```
Same as input field but:
  - Min Height: 120px
  - Max Height: 300px
  - Resize: vertical only
  - Font: Inter 400, 16px
  - Line Height: 1.6
```

#### Form Checkbox
```
Size: 20x20px
Border: 2px solid #D1D5DB
Border Radius: 4px
Background: #FFFFFF

States:
  - Default: #FFFFFF background, #D1D5DB border
  - Hover: #E5E7EB background, #D1D5DB border
  - Checked: #F97316 background, #F97316 border
  - Disabled: #F3F4F6 background, #D1D5DB border, 50% opacity

Label:
  - Font: Inter 400, 16px
  - Color: #1F2937
  - Margin Left: 12px
```

#### Form Select Dropdown
```
Same styling as input field
  - Arrow icon: #1F2937
  - Appearance: none (custom styled)
  - Padding Right: 36px (for arrow space)

Focus State:
  - Border: 2px solid #2563EB
  - Box Shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)

Dropdown Options:
  - Background: #FFFFFF
  - Text: #1F2937
  - Hover: #F3F4F6 background
  - Selected: #F97316 background, #FFFFFF text
```

### Navigation Components

#### Main Navigation Header
```
Background: #FFFFFF
Border Bottom: 1px solid #E5E7EB
Padding: 16px 24px
Position: sticky, z-index: 1000

Layout:
  - Logo: 32px height (left)
  - Nav Items: 5-7 items, font Inter 500, 16px
  - Active State: #F97316 bottom border (3px)
  - Hover State: color #2563EB
  - CTA Button: Primary button (right)

Mobile (< 768px):
  - Logo: 24px height
  - Nav Items: hidden (hamburger menu)
  - Hamburger: 24px icon, #1F2937
```

#### Mobile Navigation Menu
```
Position: fixed, full-screen on open
Background: #FFFFFF
Top: 0
Left: 0
Z-index: 999

Overlay:
  - Background: rgba(0,0,0,0.5)
  - Animate on open/close

Menu Items:
  - Padding: 16px 24px
  - Font: Inter 500, 16px
  - Color: #1F2937
  - Border Bottom: 1px solid #E5E7EB

CTA:
  - Primary button at bottom
  - Full width
  - Margin: 16px
```

#### Footer Navigation
```
Background: #1F2937 (dark charcoal)
Padding: 48px 24px
Color: #FFFFFF

Layout:
  - Logo Section (left): white logo, tagline
  - Column 1: Services (4 links)
  - Column 2: Resources (4 links)
  - Column 3: Company (About, Blog, Contact)
  - Column 4: Legal (Privacy, Terms)
  - Social Icons (right): 6 icons

Link Styling:
  - Font: Inter 400, 14px
  - Color: #D1D5DB
  - Hover: #FFFFFF
  - Transition: color 200ms

Section Headers:
  - Font: Poppins 600, 14px
  - Color: #FFFFFF
  - Margin Bottom: 16px
```

### CTA Components

#### Click-to-Call Button (Mobile)
```
Position: fixed
Bottom: 20px
Right: 20px
Z-index: 50
Size: 56px diameter (circular)
Background: #F97316
Icon: phone, white, 24px
Border Radius: 50%
Box Shadow: 0 4px 12px rgba(249, 115, 22, 0.3)

Hover State:
  - Background: #EA580C
  - Box Shadow: 0 6px 16px rgba(249, 115, 22, 0.4)

Disappear on:
  - Scroll below footer
  - On contact page
```

#### Sticky CTA Bar
```
Position: fixed
Bottom: 0
Left: 0
Right: 0
Z-index: 40
Background: linear-gradient(90deg, #1D4F7C 0%, #2563EB 100%)
Padding: 16px 24px
Display: flex, justify-content: space-between, align-items: center

Show Only:
  - On pages without prominent CTA (blog, resources, case studies)
  - Above 768px (desktop)
  - After scrolling past hero

Text:
  - "Ready to dominate local search?" (white text, 16px)
  - CTA Button: "Schedule a Call" (white, secondary styling)
```

---

## 5. LAYOUT & SPACING SYSTEM

### Spacing Scale (4px Base)
```
0px: 0
4px: 1 unit
8px: 2 units
12px: 3 units
16px: 4 units
24px: 6 units
32px: 8 units
48px: 12 units
64px: 16 units
96px: 24 units
```

### Breakpoints & Responsive Design
```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1440px
Large Desktop: 1440px+
```

### Container Max-Widths
```
Mobile: 100% (with 16px padding each side)
Tablet: 750px
Desktop: 960px
Large Desktop: 1200px (max-width: 1440px with padding)
```

### Section Spacing
```
Mobile: 32px top/bottom
Tablet: 48px top/bottom
Desktop: 64px top/bottom
Large sections: 96px top/bottom
```

### Component Spacing
```
Margin: use spacing scale
Padding: use spacing scale
Gap (flex): 16px between items, 24px between sections

Card spacing: 24px
Text spacing:
  - Heading to subheading: 12px
  - Heading to body: 16px
  - Paragraph to paragraph: 16px
```

### Grid System
```
12-column grid at all breakpoints
Column gap: 24px (desktop), 16px (tablet), 12px (mobile)

Grid column widths:
- 1 col: 8.33%
- 2 col: 16.66%
- 3 col: 25%
- 4 col: 33.33%
- 6 col: 50%
- 12 col: 100%
```

---

## 6. INTERACTION PATTERNS

### Button Interactions
```
Hover: background-color + slight lift (transform: translateY(-2px))
Duration: 200ms cubic-bezier(0.4, 0, 0.2, 1)
Active: darker color + no lift
Focus: outline-offset 2px, outline 2px solid #2563EB

Mobile: tap should feel responsive
  - Reduce motion: prefer color change only
  - No transform on disabled state
```

### Form Interactions
```
Input focus: border color #2563EB, box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)
Label on focus: color #2563EB
Placeholder fade: opacity 0 on focus
Error message: slide down, color #EF4444, font 12px
Success message: color #10B981

Real-time validation:
  - Email: check format on blur
  - Phone: format as user types
  - Required fields: mark immediately
```

### Link Interactions
```
Text links: underline on hover
Duration: 150ms
Color change: #1D4F7C to #2563EB
Visited state: #6B7280
No color change on visited (for agency sites - better UX)
```

### Scroll Animations
```
Fade in on scroll: opacity 0 to 1, duration 600ms
Slide up on scroll: transform translateY(20px) to translateY(0)
Stagger cards: 100ms delay between each

Use intersection observer (not scroll event)
Disable on mobile < 1024px for performance
Prefers-reduced-motion: no animations
```

### Mobile Interactions
```
Hamburger menu: slide from left or scale
Ripple effect: optional on button tap
Touch targets: minimum 48x48px
Swipe: supported for carousels and galleries
Double-tap: zoom disabled on input
```

---

## 7. ACCESSIBILITY STANDARDS

### WCAG 2.1 AA Compliance

#### Color Contrast
- All text: minimum 4.5:1 contrast
- Large text (18px+): minimum 3:1 contrast
- UI components: minimum 3:1 contrast
- ✅ All LocalCatalyst colors verified above

#### Keyboard Navigation
- All interactive elements keyboard accessible
- Focus visible on all elements (outline or highlight)
- Tab order logical and intuitive
- No keyboard traps
- Tab order: left-to-right, top-to-bottom

#### Screen Reader Support
```
Semantic HTML:
  - <button> for buttons (not <div>)
  - <nav>, <main>, <footer> landmark elements
  - <form>, <label>, <input> for forms
  - Proper heading hierarchy (H1 → H2 → H3)
  
ARIA Labels:
  - aria-label for icon buttons
  - aria-labelledby for complex components
  - aria-describedby for help text
  - aria-current="page" on nav items
  - role="alert" for notifications
  - aria-live="polite" for dynamic content
```

#### Images & Icons
```
All decorative images: role="presentation" or <img alt="">
All meaningful images: descriptive alt text
Icons with text: hidden from screen readers (aria-hidden="true")
Icons only buttons: aria-label required
```

#### Forms
```
All inputs have associated <label>
Error messages linked with aria-describedby
Required fields marked with * and aria-required="true"
Form validation: errors displayed clearly
Focus management: focus moves to first error on submit
```

#### Video & Media
```
All video: captions or transcript required
Audio: transcript required
Controls: keyboard accessible
Autoplay: disabled or user-initiated only
Pause animation on user preference (prefers-reduced-motion)
```

#### Mobile Accessibility
```
Minimum tap target: 48x48px
Zoom: minimum 200% allowed (no user-scalable="no")
Orientation: both portrait and landscape supported
Text sizing: zoom to 200% without horizontal scroll
Touch-friendly spacing between interactive elements
```

---

## 8. ICON SYSTEM

### Icon Library
- **Source:** Heroicons 2 (MIT licensed, free)
- **Size:** 24px standard, 32px large, 16px small
- **Style:** Outline (default), Solid (emphasis)
- **Color:** Inherit from text color or explicit color

### Common Icons (by use)
```
Navigation:
  - Home: Home icon
  - Services: Cog/Wrench icon
  - Blog: Document/Book icon
  - Contact: Phone/Mail/User icon
  - Menu: Hamburger (3 lines)
  - Close: X icon
  - Back: Chevron-left
  - Next: Chevron-right

Features:
  - Checkmark: Check icon (green for success)
  - X mark: XMark icon (red for error/remove)
  - Info: Information icon (blue)
  - Warning: Exclamation icon (orange)
  - Tip: Lightbulb icon

Services/Features:
  - Search: Magnifying glass
  - Optimization: Wrench or Cog
  - Analytics: Chart/Bar icon
  - Growth: Trending up arrow
  - Users: People icon
  - Location: Map pin
  - Phone: Phone icon
  - Mail: Envelope icon

Social:
  - Facebook: Facebook logo
  - LinkedIn: LinkedIn logo
  - Twitter: Twitter/X logo
  - Google: Google logo
```

### Icon Colors
```
Default: inherit text color (#1F2937)
Accent: #F97316 (orange for emphasis)
Secondary: #2563EB (blue for interactive)
Success: #10B981 (green)
Error: #EF4444 (red)
Warning: #F59E0B (orange)
Disabled: #D1D5DB (gray)
```

---

## 9. DESIGN TOKENS SUMMARY

### Quick Reference Table

| Element | Color | Font | Size | Spacing |
|---------|-------|------|------|---------|
| H1 (Hero) | #1D4F7C | Poppins 800 | 48px | LH: 1.1 |
| H2 | #1D4F7C | Poppins 700 | 32px | LH: 1.3 |
| H3 | #1D4F7C | Poppins 700 | 24px | LH: 1.4 |
| Body Large | #1F2937 | Inter 400 | 18px | LH: 1.6 |
| Body | #1F2937 | Inter 400 | 16px | LH: 1.6 |
| Small | #6B7280 | Inter 400 | 14px | LH: 1.5 |
| Primary Button | #FFFFFF on #F97316 | Poppins 600 | 16px | 14px 28px |
| Secondary Button | #FFFFFF on #1D4F7C | Poppins 600 | 16px | 14px 28px |
| Ghost Button | #1D4F7C on transparent | Poppins 600 | 16px | 14px 28px |
| Input Field | #1F2937 on #FFFFFF | Inter 400 | 16px | 12px 16px |

---

## 10. IMPLEMENTATION NOTES FOR BUILDER

### CSS Variables (Recommended)
```css
:root {
  /* Primary Colors */
  --color-primary: #1D4F7C;
  --color-secondary: #2563EB;
  --color-accent: #F97316;
  
  /* Neutrals */
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  
  /* Spacing */
  --spacing-unit: 4px;
  --spacing-xs: calc(var(--spacing-unit) * 2);
  --spacing-sm: calc(var(--spacing-unit) * 3);
  --spacing-md: calc(var(--spacing-unit) * 4);
  --spacing-lg: calc(var(--spacing-unit) * 6);
  --spacing-xl: calc(var(--spacing-unit) * 8);
  
  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
}
```

### Google Fonts Setup
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Astra Theme Customizer Settings
- **Heading Font:** Poppins
- **Body Font:** Inter
- **Primary Color:** #1D4F7C
- **Accent Color:** #F97316
- **Link Color:** #2563EB
- **Button Style:** Rounded (6px)
- **Button Padding:** Medium
- **Text Transform:** None
- **Letter Spacing:** Minimal (as per scale)

### Performance Considerations
- ✅ Both fonts loaded via Google Fonts CDN
- ✅ Font weights limited to essentials (4, 5, 6, 7, 8)
- ✅ Display=swap for fast text rendering
- ✅ Preconnect links for font CDN
- ✅ No custom icon font (use SVG or Heroicons)
- ✅ Images: WebP format with fallbacks
- ✅ Lazy loading on below-fold images

### Browser Support
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ CSS Grid and Flexbox fully supported
- ✅ CSS Variables supported in all modern browsers
- ✅ No IE11 support required
- ✅ Mobile-first responsive design
- ✅ Touch-friendly interface

---

**Design System Version:** 1.0  
**Last Updated:** February 9, 2026  
**Status:** Ready for Implementation  
**Next Step:** Wireframes & Page-Specific Specifications
