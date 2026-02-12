# Razor Auto-Deploy CRO System — Implementation Complete

**Date:** 2026-02-12  
**Agent:** Archer  
**Status:** ✅ Ready for Use

---

## Overview

Razor can now run **autonomous weekly CRO improvements** for approved clients. The system:
1. Analyzes GA4 + GSC data every Sunday at 9am CST
2. Identifies optimization opportunities (ranked by ICE score)
3. Coordinates with other agents (Scribe, Wrench, Specs, Silas) to implement changes
4. Auto-deploys changes ONLY for clients marked `auto_deploy: true`
5. Monitors performance for 7 days post-deploy (rollback if conversion rate drops > 10%)

**Default:** All CRO changes require your manual approval.  
**Auto-Deploy:** Only enabled when you explicitly mark a client for auto-deploy.

---

## How It Works

### 1. Client Configuration

Clients are managed in: `C:\Users\spart\.openclaw\workspace\agents\razor\clients.json`

Each client has:
- `auto_deploy` flag (true/false)
- Deploy constraints:
  - Max changes per week (default: 3)
  - Allowed change types (copy, CTA, form fields, trust signals, etc.)
  - Forbidden change types (pricing, navigation, checkout, legal)
  - Minimum confidence score (1-10 scale, default: 8)
  - Require A/B test first (true/false)

**Example Client Entry:**
```json
{
  "name": "Spectators Bar & Grill",
  "slug": "spectators",
  "url": "https://spectatorsbargrill.com",
  "auto_deploy": false,
  "ga4_property_id": "",
  "gsc_property": "https://spectatorsbargrill.com",
  "deploy_constraints": {
    "max_changes_per_week": 3,
    "allowed_change_types": ["copy", "cta", "form-fields", "trust-signals"],
    "forbidden_change_types": ["pricing", "navigation", "checkout", "legal"],
    "min_confidence_score": 8,
    "require_test_first": false
  }
}
```

---

### 2. Weekly Workflow (Sundays 9am CST)

**Trigger:** Cron job fires every Sunday at 9am CST → Archer receives system event → Archer spawns Razor

**Razor's Workflow:**
1. **Data Collection:**
   - Pull GA4 data (last 7 days vs previous 7 days)
     - Conversion rate by page, device, traffic source
     - Bounce rate, engagement rate, funnel drop-offs
   - Pull GSC data (last 28 days)
     - Landing page CTR, impressions, position
     - Core Web Vitals (LCP, FID, CLS)
   - Identify pages with issues:
     - Conversion rate drops > 10%
     - Bounce rate increases > 15%
     - High-traffic, low-conversion pages

2. **Opportunity Identification:**
   - Generate improvement ideas based on data
   - Rank by ICE score (Impact × Confidence × Ease)
   - Filter by client's deploy constraints
   - Select top N improvements (up to max_changes_per_week)

3. **Agent Coordination:**
   - Route tasks to appropriate agents:
     - **Scribe:** Copy changes (headlines, CTAs, trust signals)
     - **Wrench:** Form optimization, code changes, deployment
     - **Specs:** Technical SEO, schema, GTM validation
     - **Silas:** Meta tags, title optimization
   - Collect deliverables from agents

4. **Staging & Validation:**
   - Wrench stages changes (staging site or preview)
   - Razor validates:
     - Change matches request
     - No broken elements
     - GTM events still firing (if form/CTA changed)
     - Mobile renders correctly

5. **Deployment Decision:**
   - **IF `auto_deploy: true` AND all safety checks pass:**
     - Deploy via Wrench
     - Log to deliverables folder
     - Post summary to Slack #razor
     - **Notify you (brief summary, not asking for approval)**
   
   - **IF `auto_deploy: false` OR constraints violated:**
     - Generate approval request
     - Wait for your approval before deploying

6. **Post-Deploy Monitoring:**
   - Monitor conversion rate for 7 days
   - If conversion drops > 10% → rollback immediately + alert you
   - After 7 days → document success/failure, update learnings

---

## Safety Mechanisms

**Pre-Deployment Checks:**
1. ✅ Client has `auto_deploy: true`
2. ✅ Change type in `allowed_change_types`
3. ✅ Change type NOT in `forbidden_change_types`
4. ✅ Confidence score ≥ `min_confidence_score`
5. ✅ Weekly change count < `max_changes_per_week`
6. ✅ No conflicting changes in progress (same page)
7. ✅ GTM events validated (if applicable)

**Change Risk Levels:**

**Low-Risk (Auto-Deploy Friendly):**
- Copy changes (headlines, subheadings, CTA text)
- Trust signals (add testimonials, reviews, badges)
- Form field labels (clarify placeholders)
- Schema additions
- Image optimization

**Medium-Risk (Test First):**
- Form field removal/consolidation
- CTA color/size changes
- Layout changes
- Trust signal removal

**High-Risk (NEVER Auto-Deploy):**
- Pricing changes
- Navigation changes
- Checkout process
- Legal text (terms, privacy)
- Third-party integrations (payment, CRM)

**Rollback Triggers:**
- Conversion rate drops > 10% (statistically significant)
- Page errors or broken functionality
- You request rollback
- Multiple user complaints

---

## How to Enable Auto-Deploy for a Client

**Command:** "Enable auto-deploy for [Client Name]"

**Archer will:**
1. Ask you to confirm deploy constraints:
   - Max changes per week? (default: 3)
   - Allowed change types? (default: copy, CTA, form fields, trust signals, image optimization, schema)
   - Forbidden types? (default: pricing, navigation, checkout, legal)
   - Min confidence score? (default: 8/10)
   - Require A/B test first? (default: false)

2. Update `clients.json` → set `auto_deploy: true`

3. Confirm: "Auto-deploy enabled for [Client]. First run: next Sunday 9am CST."

---

## How to Disable Auto-Deploy

**Command:** "Disable auto-deploy for [Client Name]"

**Archer will:**
1. Update `clients.json` → set `auto_deploy: false`
2. Confirm: "Auto-deploy disabled for [Client]. Future changes will require approval."

---

## Weekly Report Format

Every Sunday after the workflow runs, you'll receive a summary like this:

```
📊 Razor Weekly CRO Report — [Date]

✅ Auto-Deploy Clients: 2
📈 Changes Deployed: 5
⏸️ Changes Held for Approval: 2
🔄 Monitoring: 3 pages (deployed last week)

---

### Spectators Bar & Grill
✅ Deployed (3 changes):
1. Homepage headline rewrite (+12% expected lift, confidence: 9/10)
2. Contact form reduced from 7 to 4 fields (+10% expected lift, confidence: 8/10)
3. Added trust badges to footer (+5% expected lift, confidence: 7/10)

📊 Monitoring: Last week's changes performing well (conversion rate +8%)

---

### Chicago's Electrician
⏸️ Held for Approval (2 changes):
1. CTA color change (confidence: 6/10, below threshold)
2. Navigation menu reorganization (forbidden change type)

---

🚨 No rollbacks needed.
📈 Overall: 8 pages monitored, all stable or improving.
```

---

## What You Need to Do

### Now:
1. **Set up API access for Razor:**
   - GA4 Data API credentials (service account or OAuth)
   - Google Search Console API credentials
   - Add credentials to Razor's config

2. **Decide which clients (if any) should have auto-deploy enabled:**
   - Start with low-risk clients (small sites, non-critical)
   - Test the workflow with `auto_deploy: false` first (approval required)
   - Enable auto-deploy once you trust the system

3. **Add GA4 property IDs to `clients.json`:**
   - Spectators: `ga4_property_id: "XXXXXXXXX"`
   - Any other clients: add to JSON

### Weekly (Automated):
- **Sundays 9am CST:** Razor runs workflow, you get summary
- **If auto-deploy enabled:** Changes deploy automatically, you're notified (not asked)
- **If auto-deploy disabled:** Razor requests approval, waits for your OK

### As Needed:
- **Enable/disable auto-deploy:** Just tell Archer "Enable auto-deploy for [Client]"
- **Adjust constraints:** Edit `clients.json` or ask Archer to update
- **Request immediate CRO check:** "Razor, run CRO analysis for [Client] now"

---

## Files Created

1. **Razor's SKILL.md:** `C:\Users\spart\.openclaw\workspace\agents\razor\SKILL.md`
   - Full CRO methodology, auto-deploy workflow, safety mechanisms

2. **Razor's clients.json:** `C:\Users\spart\.openclaw\workspace\agents\razor\clients.json`
   - Client configuration, auto-deploy flags, constraints

3. **Razor's HEARTBEAT.md:** `C:\Users\spart\.openclaw\workspace\agents\razor\HEARTBEAT.md`
   - Weekly workflow instructions, monitoring schedule

4. **Cron Job:** "Razor Weekly CRO Trigger" (Sundays 9am CST)
   - Sends system event to Archer → Archer spawns Razor

---

## Next Steps

1. **Set up GA4 + GSC API access** (required for data collection)
2. **Test workflow with auto-deploy disabled** (manual approval mode)
3. **Review first week's results** (see what Razor recommends)
4. **Enable auto-deploy for 1 low-risk client** (if comfortable)
5. **Scale to more clients** (after validating the system works)

---

## Questions?

Ask Archer:
- "What clients have auto-deploy enabled?"
- "Show me Razor's latest report"
- "Enable auto-deploy for [Client]"
- "What are Razor's deploy constraints for [Client]?"
- "Run a CRO audit for [Client] now"

---

**You now have the best damn CRO agent in the world.** 🏹
