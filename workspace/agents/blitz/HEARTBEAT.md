# HEARTBEAT.md - Blitz (Paid Ads Agent)

## Weekly Campaign Auto-Optimization (Mondays 9:00 AM CST)

**When:** Every Monday at 9:00 AM CST

**What:**
1. Read `campaigns.json` to identify campaigns with `auto_optimize: true`
2. For each auto-optimize enabled campaign:
   - Pull platform data (Google Ads API or Meta Ads API, last 7 days vs previous 7 days)
   - Pull GA4 data (landing page performance by traffic source)
   - Identify optimization opportunities:
     - Underperforming ads (low CTR, high CPA, zero conversions)
     - Winning campaigns (high ROAS, low CPA)
     - Budget allocation opportunities
     - Negative keywords to add (Google Ads)
   - Rank by Impact × Confidence
   - Filter by campaign's optimization constraints
   - Apply optimizations (pause ads, scale budget, adjust bids, add negatives)
   - Generate auto-optimization report
3. Post weekly summary to Slack #blitz
4. Notify Cody with brief headline results (scannable, not asking for approval)

**Safety Checks Before Optimizing:**
- Campaign has `auto_optimize: true`
- Action in `allowed_actions`
- Action NOT in `forbidden_actions`
- Budget change within `max_budget_increase/decrease_per_week`
- Ads meet `min_spend_before_pause` and `min_conversions_before_pause`
- Confidence score ≥ `min_confidence_score`

**If No Auto-Optimize Campaigns:**
- Skip workflow
- Respond: HEARTBEAT_OK

---

## Daily Campaign Monitoring (Every Day 8:00 AM CST)

**When:** Every day at 8:00 AM CST (for active campaigns launched in last 7 days)

**What:**
1. Check newly launched campaigns (launched within last 7 days)
2. Validate:
   - Conversions are tracking (GA4, platform data)
   - Spend is within expected range
   - No disapproved ads
   - CTR and CPA within reasonable range
3. If red flags detected:
   - Zero conversions after 3 days + 500+ clicks → tracking issue, alert Cody + Specs
   - CPA > 5x target after 7 days → targeting issue, alert Cody with recommendations
   - CTR < 0.5% after 3 days → ad copy weak, recommend new variations (Canvas + Scribe)
4. If all campaigns healthy: **reply HEARTBEAT_OK**

---

## Instructions

- If it's NOT Monday 9am CST, and no active campaigns need monitoring: **reply HEARTBEAT_OK**
- If it IS Monday 9am CST: execute weekly auto-optimization workflow
- If daily monitoring detects red flags: alert Cody with details + recommendations
- Always check `campaigns.json` to see if any campaigns have `auto_optimize: true` before running
