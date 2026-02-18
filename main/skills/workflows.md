# WORKFLOWS.md - Multi-Agent Workflow Definitions

This file defines standardized multi-agent workflows for common tasks. When you recognize a workflow pattern, follow the defined sequence and agent coordination.

---

## W-001: CLIENT ONBOARDING (FULL SEO)

**Trigger:** Cody says "Onboard [Client Name]" or "New client onboarding for [business]"

**Sequence:**
1. **Silas** → Runs CATALYST audit (technical SEO, on-page, off-page, local, content)
2. **Scribe** → Writes initial content (GBP posts, service page copy, blog post 1)
3. **Herald** → Publishes GBP posts, sets up GBP optimization
4. **Wrench** → Implements on-page SEO changes (Silas's recommendations)
5. **Citadel** → Submits T1 citations (NAP consistency)
6. **Lookout** → Sets up rank tracking for target keywords
7. **Silas** → Delivers onboarding scorecard + 90-day roadmap

**Duration:** 5-7 days  
**Deliverable:** Onboarding package (audit, scorecard, roadmap, content, citations submitted)

---

## W-002: GBP POST BATCH

**Trigger:** Cody says "Write X GBP posts for [Client]" or "GBP content for [business]"

**Sequence:**
1. **Scribe** → Writes X GBP posts (What's New, Offer, Event, Update formats)
2. **Herald** → Publishes posts to GBP (schedules if future dates provided)
3. **Lookout** → Monitors GBP performance (views, clicks)

**Duration:** 1-2 days  
**Deliverable:** GBP posts published + performance tracking

---

## W-003: TECHNICAL SEO IMPLEMENTATION

**Trigger:** Cody says "Implement technical SEO for [Client]" or "Set up RankMath/Schema for [site]"

**Sequence:**
1. **Silas** → Audits current technical setup (RankMath, schema, GSC, GA4, Core Web Vitals)
2. **Specs** → Implements fixes:
   - RankMath configuration
   - Schema markup (LocalBusiness, Service, FAQPage, etc.)
   - GA4 + GSC setup
   - Core Web Vitals optimization
3. **Wrench** → Deploys code changes (if needed)
4. **Silas** → Validates implementation (GSC, GA4, schema testing tools)

**Duration:** 2-3 days  
**Deliverable:** Technical SEO setup complete + validation report

---

## W-004: NEW WORDPRESS SITE BUILD

**Trigger:** Cody says "Build new site for [Client]" or "Set up WordPress for [business]"

**Sequence:**
1. **Silas** → Defines site structure (pages, navigation, SEO strategy)
2. **Canvas** → Creates design system (wireframes, brand guidelines)
3. **Scribe** → Writes all page content (homepage, services, about, contact)
4. **Builder** → Builds WordPress site on Cloudways
   - Theme setup (Hello Elementor or similar)
   - RankMath installed
   - Essential plugins (Elementor, WPForms, WP Rocket, etc.)
   - Pages built (content + design from Canvas)
5. **Specs** → Implements technical SEO (schema, GA4, GSC, RankMath config)
6. **Razor** → CRO audit (before launch)
7. **Wrench** → Final optimizations (speed, mobile, SEO tweaks)
8. **Silas** → Pre-launch audit (final QA)

**Duration:** 7-14 days  
**Deliverable:** Live WordPress site (staging → production after Cody approval)

---

## W-005: CITATION BUILD (T1)

**Trigger:** Cody says "Submit T1 citations for [Client]" or "Build citations for [business]"

**Sequence:**
1. **Citadel** → Audits current citation status (Whitespark or BrightLocal)
2. **Citadel** → Submits to T1 directories:
   - Google Business Profile (if not already)
   - Bing Places
   - Apple Maps
   - Yelp
   - Facebook
   - BBB
   - YellowPages
   - Industry-specific (e.g., Healthgrades for doctors, Houzz for contractors)
3. **Citadel** → Validates submissions (links, NAP accuracy)
4. **Lookout** → Monitors citation indexing and rankings

**Duration:** 3-5 days  
**Deliverable:** Citation report (submitted, pending, live)

---

## W-006: CONTENT SPRINT (BLOG POSTS)

**Trigger:** Cody says "Write [X] blog posts for [Client]" or "Content sprint for [topic/keyword cluster]"

**Sequence:**
1. **Silas** → Provides content brief (keywords, topics, target word count, internal linking strategy)
2. **Scribe** → Writes blog posts (SEO-optimized, benefit-driven, engaging)
3. **Wrench** → Publishes to WordPress (formatting, images, internal links, RankMath optimization)
4. **Specs** → Validates schema (Article schema, FAQPage if applicable)
5. **Lookout** → Tracks rankings for target keywords

**Duration:** 2-5 days (depending on quantity)  
**Deliverable:** Blog posts live + rank tracking

---

## W-007: PBN LINK DEPLOYMENT

**Trigger:** Cody says "Deploy PBN links for [Client]" or "Link build for [page/keyword]"

**Sequence:**
1. **Silas** → Defines link strategy (target pages, anchor text, link velocity)
2. **Ghost** → Deploys links from PBN:
   - Writes contextual link placements
   - Publishes on PBN sites
   - Staggers deployment (avoid footprint)
3. **Lookout** → Monitors rankings post-deployment (track impact)

**Duration:** 3-7 days  
**Deliverable:** PBN links deployed + tracking report

---

## W-008: MONTHLY SEO MAINTENANCE

**Trigger:** Runs automatically on 1st of each month (or Cody says "Monthly maintenance for [Client]")

**Sequence:**
1. **Lookout** → Pulls monthly ranking report (wins, losses, opportunities)
2. **Silas** → Analyzes rankings + GSC data (what's working, what needs attention)
3. **Scribe** → Writes 4 GBP posts for upcoming month
4. **Herald** → Publishes GBP posts
5. **Citadel** → Audits citations (check for duplicates, NAP changes, new opportunities)
6. **Specs** → Technical health check (Core Web Vitals, GSC errors, GA4 anomalies)
7. **Silas** → Compiles monthly report for Cody (rankings, traffic, actions taken, next month plan)

**Duration:** 2-3 days  
**Deliverable:** Monthly report + proactive maintenance complete

---

## W-009: PAID CAMPAIGN LAUNCH (END-TO-END)

**Trigger:** Cody says "Set up ad campaign for [Client] to promote [Product/Service]" or "Launch ads for [offer]"

**Sequence:**

### Phase 1: Strategy & Planning (Day 1-2)
1. **Blitz** → Gathers requirements from Cody:
   - Campaign objective (leads, sales, traffic)
   - Target audience (demographics, interests, geo)
   - Budget (daily/monthly)
   - Platform (Google Ads, Meta Ads, both)
   - Offer/promotion
2. **Blitz** → Creates campaign brief (objective, audience, budget, creative requirements, landing page requirements, success metrics)
3. **Cody** → Reviews + approves brief

### Phase 2: Landing Page Build (Day 2-5)
4. **Blitz** → **Builder** (if new landing page) or **Wrench** (if page on existing site):
   - Provide landing page requirements (structure, conversion goal, design specs)
5. **Blitz** → **Scribe**:
   - Request landing page content (headline, subheadings, benefits, CTA, form copy, trust signals)
6. **Blitz** → **Canvas**:
   - Request landing page hero image + supporting graphics
7. **Builder/Wrench** → Builds landing page (staging)
8. **Blitz** → **Razor**:
   - Request CRO audit of landing page
9. **Razor** → Provides CRO recommendations (headline, CTA, form fields, trust signals, page speed)
10. **Wrench** → Implements Razor's CRO changes

### Phase 3: Ad Creative & Copy (Day 3-6)
11. **Blitz** → **Canvas**:
   - Request ad creatives (image/video ads for Meta, display ads for Google)
   - Provide specs (sizes, formats, brand assets, messaging theme)
12. **Blitz** → **Scribe**:
   - Request ad copy variations (5-10 headlines, 3-5 descriptions for A/B testing)
13. **Blitz** → Refines ad copy for platform requirements (character limits, formatting)

### Phase 4: Analytics & Tracking Setup (Day 4-7)
14. **Blitz** → **Specs**:
   - Request tracking setup:
     - GA4 conversion events (form_submit, phone_call, etc.)
     - GTM tags for landing page interactions
     - Meta Pixel installation + custom events
     - Google Ads conversion tracking tag
15. **Specs** → Sets up all tracking
16. **Specs** → Validates tracking (GTM Preview, GA4 DebugView, Meta Events Manager)
17. **Specs** → Confirms to Blitz: "Tracking setup complete and validated ✅"

### Phase 5: Campaign Setup (Day 5-8)
18. **Blitz** → Creates campaigns in Google Ads and/or Meta Ads:
   - Sets up campaign structure (campaigns, ad groups/ad sets, ads)
   - Configures targeting (audiences, keywords, locations, devices)
   - Sets budget and bidding strategy
   - Uploads ad creatives and copy
   - Links conversion tracking
   - Sets campaign to "Paused" (not live yet)

### Phase 6: Approval (Day 8-9)
19. **Blitz** → Compiles approval package for Cody:
   - Landing page preview (staging URL + screenshots)
   - All ad creatives with copy
   - Targeting details (audiences, keywords, locations)
   - Budget & bidding strategy
   - Tracking setup confirmation
   - Expected performance projections
   - Approval checklist
20. **Cody** → Reviews approval package
21. **Cody** → **Approves** (or requests changes)

### Phase 7: Launch (Day 9-10)
22. **Blitz** → Publishes landing page to production (via Wrench)
23. **Blitz** → Sets campaigns to "Active" (ads go live)
24. **Blitz** → Validates:
   - Ads are serving
   - Landing page is live
   - Tracking is recording (check GA4, platform dashboards)
25. **Blitz** → Notifies Cody: "Campaign [name] is live ✅"

### Phase 8: Monitoring & Optimization (Ongoing)
26. **Blitz** → Daily monitoring (first 7 days):
   - Check spend, impressions, clicks, conversions
   - Validate tracking
   - Identify issues (low CTR, high CPA, disapproved ads)
27. **Blitz** + **Razor** → Weekly optimization:
   - A/B test results (pause losers, scale winners)
   - Landing page CRO improvements
   - Bid adjustments, audience refinement, budget reallocation
28. **Blitz** → Weekly performance reports to Cody
29. **Blitz** → Monthly performance summaries

**Duration:** 9-10 days (strategy → launch)  
**Ongoing:** Daily monitoring (first 7 days), weekly optimization, monthly reporting

**Deliverables:**
- Campaign brief
- Landing page (staging + production)
- Ad creatives (all variations)
- Campaign approval package
- Campaign launch report
- Weekly performance reports
- Monthly performance summaries

---

## WORKFLOW INVOCATION

When you (Archer) detect a workflow trigger from Cody, confirm the workflow and execute:

**Example:**
```
Cody: "Set up ad campaign for LocalCatalyst to promote topical map service"

Archer: "Got it. Launching W-009: Paid Campaign Launch (End-to-End).

This workflow includes:
- Blitz: Campaign strategy + ad setup
- Builder/Wrench: Landing page build
- Scribe: Landing page content + ad copy
- Canvas: Ad creatives + landing page graphics
- Specs: GA4, GTM, Meta Pixel, conversion tracking
- Razor: Landing page CRO audit

Estimated timeline: 9-10 days (strategy → launch)

Kicking off now. Blitz will gather requirements from you first."

[Spawn Blitz with campaign requirements]
```

---

## ADDING NEW WORKFLOWS

When a new multi-agent pattern emerges (e.g., "Video Production Workflow," "Review Response Workflow"), add it here with:
- Trigger phrase(s)
- Agent sequence
- Duration estimate
- Deliverables

Keep this file updated as the fleet evolves.
