# Blitz Paid Ads System — End-to-End Campaign Launch + Auto-Optimization

**Date:** 2026-02-12  
**Agent:** Archer  
**Status:** ✅ Ready for Use

---

## Overview

Blitz is now your **full-stack paid ads specialist** handling Google Ads and Meta Ads (Facebook/Instagram). The system enables:

1. **End-to-end campaign launches** — Say "set up ad campaign for [Product/Service]" and the entire workflow runs autonomously:
   - Campaign strategy (Blitz)
   - Landing page build (Builder/Wrench)
   - Landing page content (Scribe)
   - Ad creatives (Canvas)
   - CRO audit (Razor)
   - Analytics setup (Specs)
   - Campaign setup (Blitz)
   - Approval package (Blitz)
   - Launch + monitoring (Blitz)

2. **Weekly auto-optimization** — Blitz can autonomously optimize campaigns (pause underperformers, scale winners, adjust bids, add negative keywords)

3. **Multi-platform support** — Google Ads (Search, Display, Performance Max) + Meta Ads (Feed, Stories, Reels, Carousel)

4. **Data-driven optimization** — Integrates with GA4, GTM, Meta Pixel, Google Ads API for performance tracking and A/B testing

---

## How It Works

### **End-to-End Campaign Launch (W-009 Workflow)**

When you say: **"Set up ad campaign for [Client] to promote [Product/Service]"**

Archer spawns Blitz and triggers this workflow:

#### **Phase 1: Strategy & Planning (Day 1-2)**
- Blitz gathers requirements (objective, audience, budget, platform, offer)
- Creates campaign brief
- You review and approve

#### **Phase 2: Landing Page Build (Day 2-5)**
- **Builder/Wrench** builds landing page (based on Blitz's requirements)
- **Scribe** writes landing page content (headline, benefits, CTA, form copy)
- **Canvas** creates landing page hero image + graphics
- **Razor** audits landing page for CRO (conversion optimization)
- **Wrench** implements Razor's CRO changes

#### **Phase 3: Ad Creative & Copy (Day 3-6)**
- **Canvas** creates ad creatives (images/videos for Meta, display ads for Google)
- **Scribe** writes ad copy variations (5-10 headlines, 3-5 descriptions for A/B testing)
- **Blitz** refines ad copy for platform specs (character limits, formatting)

#### **Phase 4: Analytics & Tracking Setup (Day 4-7)**
- **Specs** sets up:
  - GA4 conversion events (form_submit, phone_call, etc.)
  - GTM tags for landing page tracking
  - Meta Pixel + custom events
  - Google Ads conversion tracking
- **Specs** validates all tracking (GTM Preview, GA4 DebugView, Meta Events Manager)

#### **Phase 5: Campaign Setup (Day 5-8)**
- **Blitz** creates campaigns in Google Ads and/or Meta Ads:
  - Campaign structure (campaigns, ad groups, ads)
  - Targeting (audiences, keywords, locations)
  - Budget & bidding strategy
  - Ad creatives + copy upload
  - Conversion tracking linked
- Campaign set to "Paused" (not live yet)

#### **Phase 6: Approval (Day 8-9)**
- **Blitz** compiles approval package:
  - Landing page preview + CRO audit score
  - All ad creatives with copy
  - Targeting details
  - Budget & bidding strategy
  - Tracking confirmation
  - Expected performance projections
- **You review and approve** (or request changes)

#### **Phase 7: Launch (Day 9-10)**
- **Blitz** publishes landing page to production (via Wrench)
- **Blitz** sets campaigns to "Active" (ads go live)
- **Blitz** validates (ads serving, landing page live, tracking recording)
- **You get notified**: "Campaign [name] is live ✅"

#### **Phase 8: Monitoring & Optimization (Ongoing)**
- **Daily monitoring** (first 7 days): Spend, clicks, conversions, tracking validation
- **Weekly optimization**: A/B test results, bid adjustments, audience refinement, landing page CRO
- **Weekly reports**: Performance summary, optimization actions, next week plan
- **Monthly summaries**: ROI analysis, best/worst performers, recommendations

**Total Timeline:** 9-10 days from "set up campaign" to launch  
**Hands-off for you:** Blitz coordinates everything; you only approve before launch

---

## Weekly Auto-Optimization

Similar to Razor's auto-deploy CRO system, Blitz can **autonomously optimize campaigns** every Monday at 9am CST.

### What Auto-Optimize Does

**Every Monday:**
1. Pull platform data (Google Ads API, Meta Ads API) for last 7 days
2. Pull GA4 data (landing page performance by traffic source)
3. Identify optimization opportunities:
   - Underperforming ads (low CTR, high CPA, zero conversions)
   - Winning campaigns (high ROAS, low CPA)
   - Budget allocation opportunities (underfunded winners)
   - Negative keywords to add (Google Ads)
4. Apply optimizations (within safety constraints):
   - Pause underperforming ads
   - Scale budget on winners (+10-20%)
   - Adjust bids (+/- 10-20%)
   - Add negative keywords
   - Duplicate winning ads
5. Generate weekly auto-optimization report
6. Notify you with summary (not asking for approval — already done)

**Default:** All campaign optimizations require your approval.  
**Auto-Optimize Enabled:** Blitz optimizes autonomously (with safety guardrails).

---

### Campaign Configuration

Campaigns are managed in: `C:\Users\spart\.openclaw\workspace\agents\blitz\campaigns.json`

**Example Campaign Entry:**
```json
{
  "name": "LocalCatalyst Topical Map Service",
  "slug": "lc-topical-map",
  "client": "LocalCatalyst",
  "platform": "meta",
  "campaign_id": "123456789",
  "auto_optimize": false,
  "optimization_constraints": {
    "max_budget_increase_per_week": 0.20,
    "max_budget_decrease_per_week": 0.30,
    "min_conversions_before_pause": 0,
    "min_spend_before_pause": 50,
    "allowed_actions": [
      "pause-ads",
      "scale-budget",
      "adjust-bids",
      "add-negative-keywords",
      "duplicate-winners"
    ],
    "forbidden_actions": [
      "change-targeting",
      "change-landing-page",
      "pause-campaign"
    ],
    "min_confidence_score": 7
  }
}
```

**Safety Constraints:**
- **Max budget increase/decrease per week:** Caps how much budget can change (e.g., 20% increase = $100/day → $120/day max)
- **Min conversions/spend before pause:** Don't pause ads prematurely (wait for statistical significance)
- **Allowed actions:** Whitelist (pause-ads, scale-budget, adjust-bids, add-negative-keywords, duplicate-winners)
- **Forbidden actions:** Never auto-apply these (change-targeting, change-landing-page, pause-campaign)
- **Min confidence score:** Only apply optimizations with confidence ≥ 7/10

---

### How to Enable Auto-Optimize

**Command:** "Enable auto-optimize for [Campaign Name]"

**Archer will:**
1. Ask you to confirm optimization constraints (or use defaults)
2. Update `campaigns.json` → set `auto_optimize: true`
3. Confirm: "Auto-optimize enabled for [Campaign]. First run: next Monday 9am CST."

**To disable:** "Disable auto-optimize for [Campaign Name]"

---

### Weekly Optimization Report Example

Every Monday after the workflow runs, you'll get a summary like this:

```
📊 Blitz Weekly Optimization Report — Feb 17, 2026

✅ Auto-Optimize Campaigns: 1
🎯 Optimizations Applied: 3
⏸️ Held for Approval: 1

---

### LocalCatalyst Topical Map Service (Meta)

✅ Optimizations Applied:
1. Paused Ad Variation 3 (CTR 0.3%, $75 spent, 0 conversions)
2. Scaled budget +20% ($50/day → $60/day) — ROAS 4.5:1 (target: 3:1)
3. Added negative keywords: "free topical map," "topical map template" (18 clicks, $32 spent, 0 conversions)

⏸️ Held for Approval:
1. Change ad creative (not in allowed_actions) — recommend Canvas to create new variations

📊 Performance (Last 7 Days):
- Spend: $750
- Conversions: 38
- CPA: $19.74 (target: $25)
- ROAS: 4.1:1 (target: 3:1)
- Status: ✅ Exceeding targets

🚨 No rollbacks needed.
```

---

## Analytics Integration

Blitz integrates with GA4, GTM, Meta Pixel, and Google Ads for data-driven optimization.

### Google Analytics 4 (GA4)
- **Campaign performance:** Sessions, conversions, conversion rate by source/medium
- **Landing page performance:** Bounce rate, avg session duration, conversion rate
- **UTM tracking:** All ad URLs tagged with `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- **API access:** Blitz pulls GA4 data to analyze campaign performance and landing page effectiveness

### Google Tag Manager (GTM)
- **Landing page event tracking:** Form submissions, button clicks, phone clicks, scroll depth
- **Cross-platform tracking:** Fire GA4 events AND Meta Pixel events via GTM
- **Validation:** Specs uses GTM Preview Mode + GA4 DebugView to validate all tracking before launch

### Meta Pixel
- **Standard events:** `PageView`, `Lead`, `CompleteRegistration`, `Purchase`, `ViewContent`
- **Custom events:** `ClickCTA`, `ClickPhone`, `VideoPlay` (if needed)
- **Optimization:** Teaches Meta's algorithm which actions to optimize for
- **Remarketing:** Build audiences of page visitors, video viewers, form starters

### Google Ads Conversion Tracking
- **Conversion actions:** Form submission, phone call clicks, purchase
- **Conversion value:** Assign values for ROAS calculation
- **Smart Bidding:** Target CPA, Target ROAS (requires 30+ conversions/month)

---

## A/B Testing Methodology

Blitz runs **statistically rigorous A/B tests** on ads and landing pages.

### What to Test

**Ad Copy:**
- Headlines (value props, benefits, urgency)
- Descriptions (features vs benefits, short vs detailed)
- CTAs ("Get Started" vs "Book Free Consultation")
- Urgency ("Limited Time" vs "Join 1,000+ Businesses")

**Ad Creative (Meta):**
- Images (product shots vs lifestyle vs before/after)
- Video (15s vs 30s, talking head vs screen recording)
- Format (single image vs carousel vs video)
- Colors (high-contrast CTA vs brand colors)

**Landing Page (with Razor):**
- Headlines (different value propositions)
- CTA copy (action words)
- Form length (3 fields vs 5 fields vs 7 fields)
- Trust signals (with reviews vs without)

### Testing Framework

**Statistical Rigor:**
- **Minimum impressions per variation:** 1,000 (for CTR testing)
- **Minimum conversions per variation:** 50 (for conversion rate testing)
- **Statistical significance:** 95% confidence minimum
- **Test duration:** 7-14 days (capture weekly patterns)

**When to Call a Test:**
- 95% significance + minimum sample size reached
- OR 14 days elapsed with no clear winner (declare tie, keep both)
- OR one variation performing catastrophically (pause immediately)

---

## Agent Coordination Examples

### Example: Blitz → Builder (Landing Page Request)

**Blitz sends:**
```
Task: Build landing page for LocalCatalyst Topical Map Service campaign

Requirements:
- URL: /topical-map-service-lp (new page on localcatalyst.ai)
- Conversion Goal: Form submission (name, email, phone, company)
- Structure:
  - Hero: Headline, subheadline, CTA button, hero image
  - Benefits: 3 key benefits with icons
  - Social proof: Client testimonials (3-5)
  - CTA section: Form (4 fields) + trust badges
  - Footer: Privacy policy link, contact info
- Design: Clean, modern, fast-loading (target LCP < 2.5s)
- Mobile-First: Must render perfectly on mobile

Context: Meta Ads campaign targeting marketing agencies. Audience: agency owners, marketing directors. Offer: Free consultation + discount on first topical map.

Deadline: 3 days
```

**Builder responds:**
```
✅ Landing page built: https://staging.localcatalyst.ai/topical-map-service-lp

Features:
- Responsive design (mobile, tablet, desktop)
- Form integrated (4 fields)
- LCP: 2.1s ✅
- Trust badges added

Next: Scribe to write content, Razor to audit for CRO
```

---

### Example: Blitz → Razor (CRO Audit Request)

**Blitz sends:**
```
Task: CRO audit for LocalCatalyst Topical Map landing page

URL: https://staging.localcatalyst.ai/topical-map-service-lp

Context:
- Meta Ads campaign (cold traffic, marketing agency audience)
- Conversion goal: Form submission
- Current form: 4 fields
- Traffic expectation: 1,000 visitors/month, targeting 5% conversion rate

Request:
- Audit page for conversion optimization
- Check: Headline clarity, CTA visibility, form friction, trust signals, mobile UX, page speed
- Provide top 5 recommendations (ranked by impact)

Deadline: 2 days
```

**Razor responds:**
```
✅ CRO Audit Complete

Audit Score: 7/10

Top 5 Recommendations:
1. Headline is vague (Impact: High) — Change to "Rank for 100+ Keywords in 90 Days with Topical Maps"
2. CTA copy is weak (Impact: High) — Change "Submit" to "Get My Free Consultation"
3. Add testimonial with photo (Impact: Medium)
4. Form asks for phone too early (Impact: Medium) — Make phone optional
5. No urgency/scarcity (Impact: Low) — Add "Limited spots available"

Recommendations sent to Wrench for implementation.
```

---

### Example: Blitz → Canvas (Ad Creative Request)

**Blitz sends:**
```
Task: Create Meta Ads creatives for LocalCatalyst Topical Map campaign

Requirements:
- Format: Square (1080x1080) and Vertical (1080x1920 for Stories)
- Quantity: 5 variations (A/B testing)
- Theme: Professional, modern, data-driven (target: marketing agencies)
- Elements:
  - Headline overlay: "Rank for 100+ Keywords"
  - Visual: Topical map graphic OR before/after ranking chart
  - Brand colors: LocalCatalyst blue (#0066CC), white, gray
  - Logo: LocalCatalyst logo (bottom corner)

Variations:
1. Topical map visual (nodes, clusters, links)
2. Before/after ranking chart
3. Client testimonial quote
4. Simple text-based ad
5. Video (15s screen recording showing topical map tool)

Deadline: 3 days
```

**Canvas responds:**
```
✅ Ad creatives delivered

Files:
- ad-variation-1-square.png (topical map visual)
- ad-variation-1-vertical.png
- ad-variation-2-square.png (ranking chart)
- ad-variation-2-vertical.png
- ad-variation-3-square.png (testimonial)
- ad-variation-3-vertical.png
- ad-variation-4-square.png (text-based)
- ad-variation-4-vertical.png
- ad-variation-5-video.mp4 (15s demo)

All optimized, brand colors applied, logo included.
```

---

## Campaign Optimization Playbook

### Week 1-2 (Learning Phase)
- **Do:** Monitor daily, validate tracking, identify obvious issues
- **Don't:** Make big changes (let algorithm learn)
- **Red Flags:**
  - Zero conversions after 3 days + 500+ clicks → tracking issue
  - CTR < 0.5% → ad copy weak, targeting too broad
  - CPA > 5x target → bidding too aggressive, audience not qualified

### Week 3-4 (Optimization Phase)
- **Pause underperformers:** Ads with CTR < campaign average, audiences with CPA > 1.5x average
- **Scale winners:** Increase budget on high ROAS campaigns (+20% per week)
- **Test new variables:** New ad creatives (Canvas), new audiences (Scout), new keywords (Silas)

### Month 2+ (Scaling Phase)
- **Increase budget:** +10-20% per week on campaigns with consistent ROAS > target
- **Launch new campaigns:** Test new products, offers, or markets
- **Refine targeting:** Exclude poor performers, double down on winners
- **Expand to new platforms:** If Meta is working, test Google (or vice versa)

---

## What You Need to Do

### Now:
1. **Set up API access for Blitz:**
   - Google Ads API credentials
   - Meta Ads API credentials (Business Manager access)
   - GA4 Data API credentials (same as Razor)
   - Add credentials to Blitz's config

2. **Test end-to-end workflow:**
   - Run a test campaign (small budget, safe audience)
   - Validate agent coordination (Builder → Scribe → Canvas → Razor → Specs → Blitz)
   - Review approval package format
   - Launch and monitor

3. **Enable auto-optimize for 1 campaign** (after validating manual workflow)

### When You Want to Launch a Campaign:

**Just say:** "Set up ad campaign for [Client] to promote [Product/Service]"

**Archer will:**
1. Confirm you want to run W-009 (Paid Campaign Launch workflow)
2. Spawn Blitz
3. Blitz gathers requirements from you
4. Workflow runs (9-10 days)
5. You approve before launch
6. Campaign goes live
7. Blitz monitors and optimizes

---

## Files Created

1. **Blitz's SKILL.md:** `C:\Users\spart\.openclaw\workspace\agents\blitz\SKILL.md`
   - Full paid ads methodology, end-to-end workflow, analytics integration, A/B testing, auto-optimization

2. **Blitz's campaigns.json:** `C:\Users\spart\.openclaw\workspace\agents\blitz\campaigns.json`
   - Campaign configuration, auto-optimize flags, optimization constraints

3. **Blitz's HEARTBEAT.md:** `C:\Users\spart\.openclaw\workspace\agents\blitz\HEARTBEAT.md`
   - Weekly auto-optimization workflow, daily monitoring checks

4. **Workflows.md (updated):** `C:\Users\spart\.openclaw\workspace\skills\workflows.md`
   - Added W-009: Paid Campaign Launch (End-to-End) workflow definition

5. **Cron Job:** "Blitz Weekly Campaign Optimization" (Mondays 9am CST)

---

## Example Use Cases

### Use Case 1: Launch New Service Offer

**You:** "Set up ad campaign for LocalCatalyst to promote topical map service. I want to generate more sales."

**Archer:** "Got it. Running W-009: Paid Campaign Launch. Blitz will gather requirements from you, then coordinate with Builder, Scribe, Canvas, Specs, and Razor to build the full campaign. Timeline: 9-10 days. Spawning Blitz now."

**Blitz:** "Campaign brief questions:
- Target audience? (e.g., marketing agencies, SEO consultants, small business owners)
- Budget? (daily/monthly)
- Platform? (Meta, Google, or both)
- Offer? (free consultation, discount, limited-time promo)
- Location targeting? (nationwide, specific cities, etc.)"

**[You answer, workflow runs]**

**Day 9:**

**Blitz:** "Campaign approval package ready. Landing page built, CRO-optimized (Razor score: 8/10), 5 ad variations created (Canvas), tracking validated (Specs). Budget: $50/day. Expected CPA: $22. Review here: [link]. Approve to launch?"

**You:** "Approve"

**Blitz:** "Campaign live ✅. Monitoring begins."

---

### Use Case 2: Optimize Running Campaign

**You:** "Enable auto-optimize for LocalCatalyst Topical Map campaign"

**Archer:** "Updating campaigns.json for auto-optimize. Confirm constraints:
- Max budget increase per week: 20% ✅
- Max budget decrease per week: 30% ✅
- Allowed actions: pause-ads, scale-budget, adjust-bids, add-negative-keywords ✅
- Forbidden actions: change-targeting, change-landing-page, pause-campaign ✅
- Min confidence score: 7 ✅

Auto-optimize enabled. First run: Monday 9am CST."

---

### Use Case 3: Get Campaign Performance

**You:** "How's the LocalCatalyst campaign performing?"

**Blitz:** "LocalCatalyst Topical Map Service (Meta) — Last 7 Days:
- Spend: $750
- Conversions: 38
- CPA: $19.74 (target: $25) ✅
- ROAS: 4.1:1 (target: 3:1) ✅
- CTR: 1.8% (campaign avg: 1.2%) ✅

Performance: Exceeding targets. Budget scaled +20% on Monday (auto-optimize).

Winning ads:
1. Ad Variation 2 (ranking chart) — CTR 2.1%, CPA $17
2. Ad Variation 5 (video) — CTR 1.9%, CPA $18

Paused:
- Ad Variation 3 (testimonial) — CTR 0.3%, $75 spent, 0 conversions

Next: Continue monitoring, consider creating more video variations (high CTR)."

---

## Next Steps

1. **Set up API access** (Google Ads, Meta Ads, GA4)
2. **Run test campaign** (validate end-to-end workflow)
3. **Enable auto-optimize** (after validating manual workflow)
4. **Launch first real campaign** (use the workflow)

---

**You now have a full-stack paid ads machine.** From strategy to creative to landing page to analytics to launch to optimization — all coordinated, all data-driven, all autonomous (with your approval).

🎯 **Blitz: You turn ad spend into revenue.**
