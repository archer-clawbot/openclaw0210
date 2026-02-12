# HEARTBEAT.md - Razor (CRO Agent)

## Weekly CRO Auto-Deploy (Sundays 9:00 AM CST)

**When:** Every Sunday at 9:00 AM CST

**What:**
1. Read `clients.json` to identify clients with `auto_deploy: true`
2. For each auto-deploy enabled client:
   - Pull GA4 data (last 7 days vs previous 7 days)
   - Pull GSC data (last 28 days)
   - Identify CRO improvement opportunities
   - Rank by ICE score (Impact × Confidence × Ease)
   - Filter by client's deploy constraints
   - Coordinate with other agents (Scribe, Wrench, Specs, Silas) to implement top improvements
   - Stage changes and validate
   - Deploy (if all safety checks pass)
   - Generate auto-deploy report
3. Post weekly summary to Slack #razor
4. Notify Cody with brief headline results (scannable, not asking for approval)

**Safety Checks Before Deploying:**
- Client has `auto_deploy: true`
- Change type in `allowed_change_types`
- Change type NOT in `forbidden_change_types`
- Confidence score ≥ `min_confidence_score`
- Weekly change count < `max_changes_per_week`
- No conflicting changes in progress
- GTM events validated (if applicable)

**If No Auto-Deploy Clients:**
- Skip workflow
- Respond: HEARTBEAT_OK

---

## Post-Deploy Monitoring (Daily Check)

**When:** Every day at 8:00 AM CST (for 7 days after a deployment)

**What:**
1. Check conversion rates for pages with deployed changes
2. If conversion rate drops > 10%:
   - Rollback immediately via Wrench
   - Alert Cody
   - Log rollback reason
3. If all changes performing well after 7 days:
   - Document success
   - Update learnings

---

## Instructions

- If it's NOT Sunday 9am CST, and no recent deployments need monitoring: **reply HEARTBEAT_OK**
- If it IS Sunday 9am CST, or monitoring is needed: execute the workflow and report results
- Always check `clients.json` to see if any clients have `auto_deploy: true` before running
