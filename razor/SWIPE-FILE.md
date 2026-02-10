# SWIPE FILE: Annotated Landing Page Examples for Agent Training

## How to Use This Document

This is a companion to **SPEC-LANDING-PAGES.md**. It provides real-world examples, patterns, and annotated teardowns that teach the agent what "good" looks like in practice. Feed both documents to your agent.

Each example is broken down by: what they did right (mapped to the spec), what could be improved, and the underlying principle the agent should internalize.

---

## PART 1: HERO SECTION TEARDOWNS

### Example 1: Netflix — The Minimalist Value Prop

**What they do:**
- Headline: "Unlimited movies, TV shows, and more"
- Subheadline: "Starts at $6.99. Cancel anytime."
- Single CTA: Email input + "Get Started" button
- Background: Dark, cinematic imagery
- Zero navigation, zero distractions

**Spec Alignment:**
- ✅ Passes the 5-second test (What is it? Streaming. What's in it for me? Unlimited content, cheap. What do I do? Enter email.)
- ✅ CTA text is action-oriented ("Get Started" > "Submit")
- ✅ Friction-reducing microcopy ("Cancel anytime" directly in the subheadline)
- ✅ No navigation menu
- ✅ Single, clear CTA

**Agent Takeaway:** When the value proposition is strong enough, the hero section can be radically simple. Don't add complexity when clarity wins. The subheadline does double duty — it states the price AND handles the #1 objection (commitment fear) in the same breath.

**Pattern to Internalize:**
```
Headline: [Core benefit in plain language]
Subheadline: [Price/entry point] + [Objection destroyer]
CTA: [Simple action verb + low friction entry]
```

---

### Example 2: Shopify — Outcome-Focused Hero

**What they do:**
- Headline: "Start your business journey with Shopify"
- Subheadline: "Try Shopify free for 3 days, no credit card required"
- Single email input + CTA button
- Trust bar directly below: logos of major brands using Shopify
- Clean white background with product mockups

**Spec Alignment:**
- ✅ Headline speaks to the visitor's desire (starting a business)
- ✅ Free trial offer removes financial friction
- ✅ "No credit card required" — classic friction-reducing microcopy
- ✅ Social proof bar immediately after hero (brand logos)
- ✅ Minimal form (email only at top of funnel)

**What could be improved:**
- ⚠️ Headline could be more specific — "Start your business" is broad. A test variant like "Launch your online store in minutes" would be more concrete.

**Agent Takeaway:** For SaaS/service landing pages, leading with a free trial + "no credit card" is the gold standard friction reducer. Always pair it with a trust bar of recognizable logos right below the hero.

---

### Example 3: DoorDash Driver Signup — "You" Focused Copy

**What they do:**
- Headline: "Your time. Your goals. You're the boss."
- Subheadline focused on earnings potential
- Earnings calculator tool embedded
- Requirements listed transparently
- CTA: "Sign Up to Dash"

**Spec Alignment:**
- ✅ Uses "You/Your" language extensively (Spec Section 2.3, Rule 3)
- ✅ Addresses the visitor's core motivation (freedom + money)
- ✅ Interactive element (earnings calculator) increases engagement
- ✅ Transparent requirements manage expectations
- ✅ CTA uses branded action language

**Agent Takeaway:** When your audience's primary motivation is clear (freedom, money, control), lead with it in first-person language. Interactive tools like calculators massively increase time-on-page and conversion because they create personalized stakes.

**Pattern to Internalize:**
```
Headline: [Your/You're] + [Core emotional benefit]
Supporting element: [Interactive tool that personalizes the value]
CTA: [Action verb] + [Branded term]
```

---

## PART 2: SOCIAL PROOF PATTERNS

### Pattern A: The Big Number + Context

**Example: Glossier**
```
"Over 1M happy customers"
```

**Why it works:** A single, massive number creates instant credibility. The word "happy" adds emotional context. This is placed as a banner near the top of the page — it's not buried.

**Agent Rule:** When the client has impressive aggregate numbers, lead with the biggest one. Format:
```
[BIG NUMBER] + [positive descriptor] + [who they are]
"10,000+ businesses served"
"2.4 million meals delivered"
"4.9/5 from 12,847 reviews"
```

---

### Pattern B: Logo Trust Bar

**Example: Gusto, HubSpot, Slack (common across SaaS)**
```
"Trusted by teams at [Logo] [Logo] [Logo] [Logo] [Logo]"
```

**Placement:** Directly below the hero section, before any content.

**Agent Rule:** Use 4-6 logos maximum. They should be recognizable to the target audience. Grayscale logos on white background is the cleanest treatment. Add a lead-in phrase like "Trusted by," "Used by," or "Powering."

---

### Pattern C: Specific Result Testimonials

**Example format from high-converting pages:**
```
"Within 90 days, we went from page 3 to #1 in the Local 3-Pack.
Phone calls increased 340%."
— John Davidson, Owner, Davidson Plumbing, Houston TX
```

**Why it works vs. generic testimonials:**

| Element | Generic (Bad) | Specific (Good) |
|---------|---------------|-----------------|
| Result | "Great service!" | "340% increase in calls" |
| Timeframe | None | "Within 90 days" |
| Attribution | "John D." | "John Davidson, Owner, Davidson Plumbing, Houston TX" |
| Mechanism | None | "page 3 to #1 in Local 3-Pack" |

**Agent Rule:** ALWAYS use specific-result testimonials. If the client only has generic ones, rewrite them into the specific format by interviewing or requesting data. A single specific testimonial outperforms ten generic ones.

---

### Pattern D: Star Rating + Review Count Combo

**Example:**
```
⭐⭐⭐⭐⭐ 4.9/5 from 2,847 Google Reviews
```

**Placement:** Hero section (top-right or below headline) AND near CTAs.

**Agent Rule:** Always include the PLATFORM (Google, Yelp, Trustpilot) for credibility. The review count matters as much as the rating — "4.9 from 2,847 reviews" is far more powerful than just "4.9 stars."

---

## PART 3: CTA TEARDOWNS

### CTA Example 1: Multi-Layer CTA Block

**High-converting pattern:**
```
┌─────────────────────────────────────────┐
│                                         │
│   [  Get My Free SEO Audit Now  ]       │
│                                         │
│   ✓ No credit card required             │
│   ✓ Results delivered in 24 hours       │
│   ✓ 100% free — no strings attached     │
│                                         │
│   🔒 Your information is secure         │
│                                         │
└─────────────────────────────────────────┘
```

**Why it works:**
- Button text states the VALUE ("Free SEO Audit") not the action ("Submit")
- First-person language ("My" not "Your")
- Three friction-reducing checkmarks address top objections
- Security indicator adds trust at the point of commitment

**Agent Rule:** Every primary CTA should have at minimum: (1) Value-driven button text, (2) 2-3 friction reducers below, (3) Security/trust indicator. This is non-negotiable.

---

### CTA Example 2: Dual CTA for Different Intent Levels

**Pattern (used by SaaS like Evolo, HubSpot):**
```
[  Start Free Trial  ]     [  Request a Demo  ]
   (primary/filled)           (secondary/outline)
```

**Why it works:** Not every visitor is at the same stage. The primary CTA catches high-intent visitors. The secondary catches those who need more info first. Visual hierarchy (filled vs. outline button) makes the preferred action clear.

**Agent Rule:** Only use dual CTAs when the audience genuinely splits between self-service and sales-assisted paths. For local service businesses, stick to ONE CTA. Dual CTAs are for SaaS/enterprise.

---

### CTA Example 3: Sticky Mobile CTA

**Pattern:**
```
┌──────────────────────────────────────┐
│  [sticky bar at bottom of viewport]  │
│                                      │
│    Call Now: (555) 123-4567          │
│    [  Get My Free Quote  ]           │
│                                      │
└──────────────────────────────────────┘
```

**Why it works:** On mobile, the CTA is ALWAYS visible. No scrolling required. Click-to-call for phone-first audiences. Both options (call or form) are presented.

**Agent Rule:** For local service landing pages receiving mobile ad traffic, a sticky bottom CTA bar is mandatory. Include both a click-to-call number and a form CTA button.

---

## PART 4: PAGE TYPE EXAMPLES WITH FULL ANNOTATIONS

### Full Page Teardown 1: Local Service (Plumber)

**What the best-performing local service pages include:**

```
ABOVE THE FOLD:
├── Logo (top-left) + Phone Number (top-right, click-to-call)
├── H1: "Chicago's #1 Emergency Plumber — Available 24/7"
├── Subheadline: "Licensed & insured. At your door in 60 minutes or less."
├── CTA: [Get Your Free Estimate] with "No call-out fees" below
├── Trust indicators: Google rating badge, license number, years in business
│
SOCIAL PROOF BAR:
├── "4.9★ from 1,247 Google Reviews" + "A+ BBB Rating" + "25 Years Serving Chicago"
│
SERVICES GRID (3 columns):
├── Emergency Repairs (icon + 2-line description)
├── Drain Cleaning (icon + 2-line description)
├── Water Heater Installation (icon + 2-line description)
│
WHY CHOOSE US (3 differentiators):
├── "60-Minute Response Time" — with supporting detail
├── "Upfront Pricing, No Surprises" — with supporting detail
├── "Licensed, Bonded & Insured" — with supporting detail
│
TESTIMONIALS (2-3 with specific results):
├── "They were at my house in 45 minutes at 10pm on a Sunday..."
├── Full name, neighborhood, photo
│
SERVICE AREA:
├── Map embed showing coverage area
├── List of neighborhoods/cities served
│
FAQ (5-6 objection-handling questions):
├── "What areas do you serve?"
├── "How much does an emergency call cost?"
├── "Are you licensed and insured?"
├── "How fast can you get here?"
├── "Do you offer warranties on work?"
│
FINAL CTA:
├── Restated offer + form + guarantee badge
├── Phone number (large, clickable)
├── "Serving Chicago families since 1999"
│
FOOTER (minimal):
├── Logo + phone + address
├── Privacy policy link
├── License number
```

**Spec Compliance Notes:**
- H1 includes [Service] + [City] for both ad match AND SEO
- Phone number appears 3+ times on the page
- Every section has clear spec justification
- FAQ addresses money, trust, speed, and coverage — the top 4 objections for home services
- No navigation menu, no blog links, no social media icons
- Service area section with map validates local presence

---

### Full Page Teardown 2: Lead Gen (Free Audit/Consultation)

**Best-performing pattern for agency/B2B lead gen:**

```
ABOVE THE FOLD (split layout — copy left, form right):
├── LEFT SIDE:
│   ├── H1: "Find Out Why Your Competitors Are Outranking You"
│   ├── Subheadline: "Get a free, personalized SEO audit with
│   │   actionable recommendations in 24 hours"
│   ├── 3 bullet points:
│   │   ✓ See exactly where you rank vs. competitors
│   │   ✓ Get a prioritized list of fixes
│   │   ✓ Discover untapped keyword opportunities
│   ├── Micro-trust: "Trusted by 500+ local businesses"
│
├── RIGHT SIDE:
│   ├── Form header: "Get Your Free SEO Audit"
│   ├── Fields: Name, Email, Phone, Website URL
│   ├── CTA: [Get My Free Audit]
│   ├── Below button: "🔒 We'll never share your info"
│
PROBLEM SECTION:
├── H2: "Is Your Website Invisible to Local Customers?"
├── 3 pain points with icons:
│   ├── "Your competitors show up on Google — you don't"
│   ├── "You're spending money on ads with no clear ROI"
│   ├── "Your phone isn't ringing like it should"
│
SOLUTION SECTION:
├── H2: "Here's What Our Free Audit Reveals"
├── 3-step process with numbered icons:
│   ├── Step 1: We analyze your current rankings & visibility
│   ├── Step 2: We identify what's holding you back
│   ├── Step 3: You get a clear action plan to fix it
│
CREDIBILITY:
├── 2-3 testimonials with specific results
├── "As featured in" logo bar (if applicable)
├── Case study snapshot: "How [Client] went from 0 to 47 calls/month"
│
FAQ:
├── "Is this really free?"
├── "What happens after the audit?"
├── "How long does it take?"
├── "What information do you need from me?"
├── "Will you try to sell me something?"
│
FINAL CTA:
├── H2: "Stop Guessing. Start Growing."
├── Repeat form
├── Guarantee: "If our audit doesn't reveal at least 3 actionable
│   improvements, we'll send you a $50 Amazon gift card."
```

**Key Patterns to Internalize:**
1. Split-layout hero (copy left, form right) is the #1 lead gen pattern
2. Form has 4 fields — enough to qualify without killing conversions
3. The 3-step "How It Works" section makes the process feel simple and safe
4. FAQ directly addresses "is this a sales pitch?" objection
5. Risk-reversal guarantee adds a concrete, measurable promise
6. Pain points use "you" language and describe SYMPTOMS the visitor recognizes

---

### Full Page Teardown 3: E-Commerce Product Landing Page

**High-converting DTC landing page structure:**

```
ABOVE THE FOLD:
├── Product image (high-quality, lifestyle context)
├── H1: Benefit-driven product name
├── Star rating + review count
├── Price (with crossed-out original if discounted)
├── CTA: [Add to Cart] or [Buy Now]
├── Microcopy: "Free shipping over $50 | 30-day returns"
│
SOCIAL PROOF STRIP:
├── "As seen in [Media Logo] [Media Logo] [Media Logo]"
├── Or: "Join 50,000+ happy customers"
│
PROBLEM → PRODUCT BRIDGE:
├── "Tired of [problem]?"
├── "We created [Product] so you can [benefit] without [pain]"
├── Before/After imagery or comparison
│
FEATURE → BENEFIT GRID (3 columns):
├── Feature icon + "What it does" + "Why you'll love it"
├── Feature icon + "What it does" + "Why you'll love it"
├── Feature icon + "What it does" + "Why you'll love it"
│
UGC / SOCIAL PROOF SECTION:
├── Customer photos (real, not stock)
├── Instagram-style gallery
├── 3-5 top reviews with photos
│
HOW IT WORKS / HOW TO USE:
├── Simple 3-step visual guide
├── Reduces anxiety about complexity
│
COMPARISON TABLE (optional):
├── "Us vs. The Other Guys"
├── Checkmarks showing advantages
│
GUARANTEE + FINAL CTA:
├── "Love it or your money back. 30 days, no questions."
├── Repeated product + price + [Buy Now]
├── Urgency: "Free shipping ends tonight" (if real)
│
FAQ:
├── Shipping, returns, ingredients/materials, sizing
```

**Key DTC Patterns to Internalize:**
1. Product images showing the product IN USE convert higher than product-on-white
2. Price anchoring (crossed out original) increases perceived value
3. UGC (user-generated content) photos build more trust than professional shots
4. Comparison tables work if you have clear, defensible advantages
5. "How to use" section reduces purchase anxiety for unfamiliar products
6. Reviews with PHOTOS convert significantly higher than text-only reviews

---

## PART 5: HEADLINE SWIPE FILE

### Category: Local Service Headlines

```
"[City]'s Most Trusted [Service Provider] — [Unique Differentiator]"
→ "Houston's Most Trusted Plumber — 60-Minute Emergency Response"

"Need a [Service] in [City]? Get a Free Quote in [Timeframe]"
→ "Need a Roof Repair in Sugar Land? Get a Free Quote in 2 Hours"

"[Number] [City] Families Trust Us for [Service]"
→ "4,800+ Houston Families Trust Us for AC Repair"

"[Problem]? [City]'s [Superlative] [Service] is [Solution]"
→ "Clogged Drain? Houston's Fastest Plumber is One Call Away"
```

### Category: Lead Generation Headlines

```
"Find Out Exactly Why [Competitor Reference] is [Beating Them]"
→ "Find Out Exactly Why Your Competitors Rank Above You on Google"

"The Free [Deliverable] That Shows You [Specific Insight]"
→ "The Free SEO Audit That Shows You Exactly What's Costing You Customers"

"[Number] [Audience] Are Already [Getting Result]. Are You?"
→ "2,847 Local Businesses Are Already Dominating Google. Are You?"

"Stop [Pain]. Start [Desired Outcome]."
→ "Stop Guessing at Your Marketing. Start Getting Predictable Leads."
```

### Category: E-Commerce Headlines

```
"The [Adjective] [Product] That [Specific Benefit]"
→ "The Natural Deodorant That Actually Works — Even on Hot Days"

"Finally, a [Product] Designed for [Specific Audience]"
→ "Finally, a Meal Kit Designed for Busy Parents Who Hate Cooking"

"[Number] People Can't Be Wrong. Try [Product] Risk-Free."
→ "50,000 Happy Customers Can't Be Wrong. Try It Risk-Free for 30 Days."

"[Desired Outcome] Without [Common Sacrifice]"
→ "Clear Skin Without Harsh Chemicals or Prescription Drugs"
```

### Category: Restaurant / Hospitality Headlines

```
"[City]'s Best [Cuisine/Experience] — Now Taking Reservations"
→ "Sugar Land's Best Sports Bar Experience — Now Taking Large Party Reservations"

"See Why [Number] [City] Locals Choose [Restaurant] for [Occasion]"
→ "See Why 12,000+ Sugar Land Locals Choose Spectators for Game Day"

"[Signature Dish/Experience] + [Atmosphere] + [Value Prop]"
→ "Award-Winning Wings. 40 Screens. Happy Hour Daily 3-7PM."
```

---

## PART 6: MICROCOPY SWIPE FILE

### Below CTA Buttons
```
✓ No credit card required
✓ Cancel anytime
✓ Results in [timeframe]
✓ 100% free, no obligation
✓ Takes less than 60 seconds
✓ No spam, ever
✓ Join [number]+ others
✓ Your information is 100% secure
✓ [Number]-day money-back guarantee
✓ No contracts, cancel anytime
```

### Form Labels (Better Than Default)
```
Instead of "Name" → "Your Name"
Instead of "Email" → "Best Email for Your Report"
Instead of "Phone" → "Best Number to Reach You"
Instead of "Message" → "Tell Us About Your Project"
Instead of "Company" → "Business Name"
Instead of "Submit" → "Get My Free [Deliverable]"
```

### Trust Indicators Near Forms
```
🔒 "We respect your privacy. Unsubscribe anytime."
🔒 "Your info is encrypted with 256-bit SSL"
🔒 "We will never sell or share your information"
⭐ "Rated 4.9/5 by [number] businesses"
✅ "Trusted by [number]+ [audience type]"
📞 "Questions? Call us: (555) 123-4567"
```

### Urgency Microcopy (Use Only When TRUE)
```
"Limited spots available for [month]"
"This offer expires [date]"
"Only [number] audit slots remaining this week"
"Free shipping ends tonight at midnight"
"[Number] people are viewing this right now"
"Prices increase on [date]"
```

---

## PART 7: FAQ PATTERNS BY PAGE TYPE

### Local Service FAQ Template
```
Q: "What areas do you serve?"
A: Validates their location. List specific neighborhoods/cities. Creates local relevance.

Q: "How much does [service] cost?"
A: Provides a range OR positions as "free estimate." Addresses the money objection head-on.

Q: "Are you licensed and insured?"
A: States license number. Builds trust. Differentiates from unlicensed competitors.

Q: "How quickly can you respond?"
A: Gives specific timeframe. "We're typically at your door within 60 minutes."

Q: "Do you offer a warranty/guarantee?"
A: States the guarantee. "If you're not 100% satisfied, we'll make it right — free."

Q: "What brands/equipment do you work with?"
A: Lists major brands. Shows expertise and scope.
```

### Lead Gen / Audit FAQ Template
```
Q: "Is this really free? What's the catch?"
A: "There's genuinely no catch. We provide the audit for free because [reason — e.g., it's a chance for us to show you what we can do]."

Q: "What happens after I submit my information?"
A: Describes the exact next steps. "Within 24 hours, you'll receive an email with your personalized audit report..."

Q: "Will someone try to sell me something?"
A: Addresses directly. "You'll receive your audit with zero sales pressure. If you want our help implementing the recommendations, we're here. If not, the audit is yours to keep."

Q: "How is this different from other SEO audits?"
A: Differentiates. "Most free audits are automated junk. Ours is reviewed by a real SEO strategist who..."

Q: "What do I need to provide?"
A: Keeps it simple. "Just your website URL and the best way to reach you."
```

---

## PART 8: CONVERSION KILLERS — REAL EXAMPLES

These are actual patterns found on underperforming landing pages. Train the agent to NEVER do these:

### Killer 1: The "Welcome" Headline
```
❌ BAD: "Welcome to ABC Marketing Solutions"
✅ FIX: "Get 50+ Qualified Leads Per Month — Guaranteed"
```
**Why it kills:** "Welcome" communicates nothing. It doesn't tell the visitor what's in it for them. It wastes the most valuable real estate on the page.

### Killer 2: The Navigation Menu
```
❌ BAD: Home | About | Services | Blog | Contact | Portfolio
✅ FIX: No navigation. Logo only (links to landing page itself).
```
**Why it kills:** Every nav link is an exit. Research shows removing navigation from landing pages increases conversions by 28-100% (VWO studies).

### Killer 3: The "Submit" Button
```
❌ BAD: [Submit]
✅ FIX: [Get My Free Audit Now]
```
**Why it kills:** "Submit" is clinical, cold, and tells the visitor nothing about what happens next. Value-driven CTA text consistently outperforms generic labels.

### Killer 4: The Wall of Text
```
❌ BAD: A 500-word paragraph explaining the company history
✅ FIX: Short paragraphs (2-3 sentences), scannable subheads, bullet points for key benefits
```
**Why it kills:** Nobody reads walls of text on landing pages. 79% of visitors scan rather than read. If your content isn't scannable, it's invisible.

### Killer 5: Stock Photo Smiling Business People
```
❌ BAD: Generic stock photo of people in suits shaking hands
✅ FIX: Real team photo, real customer photo, product in action, or relevant lifestyle imagery
```
**Why it kills:** Visitors instantly recognize stock photos and subconsciously reduce trust. A real photo — even an imperfect one — builds more credibility.

### Killer 6: Social Media Icons in Hero
```
❌ BAD: Facebook | Instagram | Twitter | YouTube icons prominently placed
✅ FIX: Remove all social media links from landing pages entirely
```
**Why it kills:** Every social icon is an exit ramp. You spent money to get them here. Don't send them to Instagram where they'll forget you in 3 seconds.

### Killer 7: The Multi-Offer Page
```
❌ BAD: "Check out our services: SEO, PPC, Web Design, Social Media, Content Marketing, Email..."
✅ FIX: ONE service. ONE offer. ONE CTA. Build separate pages for each service.
```
**Why it kills:** Choice paralysis. When you give people too many options, they choose none. One page = one offer = maximum conversion.

---

## PART 9: MOBILE-SPECIFIC PATTERNS

### Pattern: Mobile Hero Stack

On mobile, the hero section stacks vertically:
```
[Logo — centered]
[H1 Headline — 28-36px, centered]
[Subheadline — 16-18px, centered]
[CTA Button — full width, 50px height]
[Trust indicator — star rating or micro-testimonial]
```

### Pattern: Thumb-Zone CTA Placement
The bottom third of the screen is the "thumb zone" — easiest to tap. Sticky CTAs at the bottom of the viewport live in this zone permanently.

### Pattern: Collapsible Sections
Long content (FAQ, features, service details) should collapse into accordions on mobile. Only the section headers are visible until tapped.

### Pattern: Click-to-Call Priority
For local services, the phone number should be:
- In the sticky header
- As a tap-to-call button in the sticky footer
- Formatted as a real link: `<a href="tel:+15551234567">`

---

## PART 10: RESOURCES & SWIPE SOURCES

### Where to Find More Landing Page Inspiration:

1. **Unbounce Landing Page Examples** — unbounce.com/landing-page-examples/
   Best for: Curated examples with expert commentary and conversion data

2. **Landingfolio** — landingfolio.com
   Best for: Screenshots categorized by industry and page type

3. **SwipeFile.com** — swipefile.com/category/landing-pages
   Best for: Annotated examples with copywriting analysis

4. **Swiped.co** — swiped.co
   Best for: Classic direct response and copywriting teardowns

5. **ReallyGoodLandingPages.com** — reallygoodlandingpages.com
   Best for: SaaS and tech landing page examples

6. **GetScrapbook.com** — getscrapbook.com/dtc-landing-pages
   Best for: DTC/e-commerce landing page swipe file (300+ examples)

7. **SwipeFiles.com (Corey Haines)** — swipefiles.com/teardowns
   Best for: Deep-dive teardowns of marketing and copywriting examples

8. **Lapa.ninja** — lapa.ninja
   Best for: Design-focused landing page inspiration

### Key Conversion Data Points for Agent Reference:

| Stat | Source |
|------|--------|
| Average landing page conversion rate: 4.2% (2024) | Unbounce Benchmark Report |
| Pages with single CTA convert 22% better than multi-CTA | HubSpot State of Marketing 2025 |
| 68%+ of landing page visits come from mobile | Unbounce 2024 |
| Removing navigation increases conversions 28-100% | VWO case studies |
| Multi-step forms convert 86% higher than single-step | Formstack research |
| Webinar landing pages average 22.84% conversion rate | Themeisle 2024 |
| Video on landing pages can increase conversions by 86% | Unbounce |
| 88% of local mobile searchers visit/call within 24 hours | Google Local Search Behavior 2024 |
| Every 1-second delay reduces conversions by ~7% | Google/Akamai |
| Each additional form field reduces conversions by 7-11% | HubSpot |
| Complex copy hurts conversion rates 62% more than in 2020 | Unbounce 2024 |

---

## AGENT INTEGRATION INSTRUCTIONS

When the agent receives a request to build a landing page, it should:

1. **Reference SPEC-LANDING-PAGES.md** for structural rules and principles
2. **Reference this SWIPE-FILE.md** for real-world patterns and examples
3. **Match the page type** (Part 4) to the request — local service, lead gen, e-commerce, or webinar
4. **Select appropriate headline formulas** (Part 5) based on the audience and offer
5. **Include all CTA elements** from Part 3 (value-driven text + friction reducers + trust)
6. **Add social proof** using the appropriate pattern from Part 2
7. **Build FAQ** using the templates in Part 7
8. **Check against conversion killers** in Part 8 — ensure NONE are present
9. **Apply mobile patterns** from Part 9 to all pages
10. **Run the pre-launch checklist** from SPEC Section 14

The combination of the spec (principles) and this swipe file (examples) gives the agent both the "why" and the "what it looks like" for every landing page element.
