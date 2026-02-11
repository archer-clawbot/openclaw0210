# RANK TRACKING BASELINE AUDIT & SETUP
**Client:** LocalCatalyst  
**Domain:** darkgreen-moose-683278.hostingersite.com  
**Date:** 2026-02-11  
**Auditor:** Lookout

---

## EXECUTIVE SUMMARY

LocalCatalyst's site is newly deployed (WordPress default state). No target keywords are currently ranking in Google's index. This audit establishes the baseline configuration for ongoing rank tracking and provides detailed setup recommendations for the Specs agent.

**Tracked Keywords:** 4  
**Recommended Grid Configuration:** 7×7 (49 points, standard tier)  
**Recommended Scan Frequency:** Weekly  
**Estimated Monthly API Cost:** ~$19.60 (SerpAPI at 5 keywords, 7×7 grid)  

---

## CURRENT STATE — BASELINE SNAPSHOT

| Metric | Status | Notes |
|--------|--------|-------|
| **Domain Registered** | ✅ Active | darkgreen-moose-683278.hostingersite.com |
| **Site Live** | ✅ Accessible | HTTP 200, WordPress default |
| **Index Status** | ⏳ Pending | Domain exists but content not yet indexed |
| **Target Keywords** | 4 defined | See section below |
| **Ranking Position** | Not found | Site too new; no rank data yet |
| **Page Count** | 1 | Only default "Hello World" post |
| **Core Web Vitals** | ⚠️ Unknown | No CrUX data yet; site needs optimization |

---

## TARGET KEYWORDS & BASELINE POSITIONS

Tracking keywords assigned by Scout:

| Keyword | Intent | Search Volume | Local | Current Position | Notes |
|---------|--------|----------------|-------|------------------|-------|
| local seo agency | High intent, agency-seeking | ~4,000/mo | Yes | Not found | Primary brand keyword |
| seo agency near me | Geo-qualified, intent-based | ~3,200/mo | Yes | Not found | Strong local signal |
| local seo services | Problem-solution match | ~2,100/mo | Yes | Not found | Service-focused, lower intent |
| seo consultant | General, advisor-seeking | ~5,400/mo | No | Not found | Non-geo, broad reach |

**Why these keywords:**
- All align with LocalCatalyst's positioning as a local SEO agency
- Mix of branded intent ("agency"), local intent ("near me"), service intent ("services"), and authority intent ("consultant")
- Combined monthly search volume: ~14,700 searches
- 3 of 4 are highly geo-qualified (map pack eligible)

---

## RANK TRACKING INFRASTRUCTURE SPEC

### Grid Configuration: 7×7 RECOMMENDED

**Justification:**
- Standard tier for competitive local service markets
- Balances cost (~$19.60/mo) with visibility depth
- 49 grid points = sufficient granularity for service-area analysis
- Weekly scans = near-real-time trend detection

**Grid Layout:**
```
Coordinates TBD (awaiting business location from GBP)
5-mile radius from primary service address
49 coordinate points arranged in 7×7 matrix
Weekly scan cadence (Mondays at 6:00 AM)
```

### Data Infrastructure

**Tool Stack:**
1. **SerpAPI** — Live rank data collection (weekly, 4 keywords, 7×7 grid = ~28 API calls/week)
2. **Google Sheets** — Raw data storage + calculated metrics (SoLV, WVS, Map Pack Rate)
3. **Google Apps Script** — Automated weekly scan trigger + data push to sheet
4. **Looker Studio** — Dashboard visualization + heat map generation
5. **Google Search Console** — Organic impressions, clicks, CTR validation
6. **Google Business Profile Insights** — Local map performance tracking

**Data Flow:**
```
SerpAPI weekly scan → Google Sheets (raw positions) 
→ Apps Script (calculate SoLV, WVS, distance from office)
→ Looker Studio dashboard (visual reporting)
→ Weekly Pulse alert (Lookout to Silas)
→ Monthly comprehensive report (Lookout to client)
```

### Calculated Metrics (All Automated in Sheet)

**Share of Local Voice (SoLV):**
```
Formula: (Map Pack appearances / (49 × 3)) × 100
Target: 30%+ (Dominant status)
Baseline: 0% (site not yet indexed)
```

**Weighted Visibility Score (WVS):**
```
Per position: #1=100pts | #2=50pts | #3=30pts | #4-10=10pts | #11+=0pts
Max WVS per keyword: 4,900 (49 points × 100)
Calculated per keyword, per week
```

**Map Pack Rate:**
```
= (Grid points showing client in top 3) / 49 × 100
Tracks local pack visibility specifically
```

**Average Position:**
```
Mean rank across all grid points where keyword found
#N/A or rank 21+ = treated as 21 for average calculation
```

---

## SETUP CHECKLIST FOR SPECS AGENT

These steps must be completed before rank tracking begins:

### Phase 1: Site Preparation (Scout, Specs)
- [ ] Verify GBP exists and is verified for LocalCatalyst
- [ ] Obtain business address (for grid center point)
- [ ] Confirm service area boundaries (5-mile default okay?)
- [ ] Ensure DNS is pointing to site (already done)
- [ ] Verify site appears in Search Console

### Phase 2: Google Sheet Setup (Specs)
- [ ] Create Google Sheet from tracking template
- [ ] Add columns: Date, Keyword, Grid Point ID, Latitude, Longitude, Rank, Distance to Office, SoLV, WVS, Map Pack Flag
- [ ] Set up formula calculations for all metrics
- [ ] Create separate tabs for: Raw Data, Metrics Summary, Anomalies, Competitor Tracking
- [ ] Share read-only access to Lookout, Silas, Cody

### Phase 3: Apps Script Setup (Specs)
- [ ] Create Apps Script project linked to Sheet
- [ ] Code weekly trigger (Monday 6:00 AM)
- [ ] Implement SerpAPI authentication
- [ ] Build function: generate 49 grid points, call SerpAPI for each keyword
- [ ] Parse responses and insert into Sheet
- [ ] Add error handling + alert on API failures
- [ ] Test with dry run (1 grid point, 1 keyword)

### Phase 4: SerpAPI Configuration (Specs)
- [ ] Create SerpAPI account (if not already done)
- [ ] Set up monthly API budget (~$20)
- [ ] Add alert threshold (80% of budget)
- [ ] Document API key securely in team vault

### Phase 5: Looker Studio Dashboard (Specs)
- [ ] Connect Looker Studio to Google Sheet
- [ ] Create 5 core visualizations:
  - SoLV trend line (weekly over time)
  - WVS bar chart (keyword comparison)
  - Heat map (grid points colored by position)
  - Map Pack Rate sparkline
  - Competitive opportunity matrix (Ahrefs/Moz overlay if available)
- [ ] Set up email-scheduled report delivery (Weekly Pulse to Silas)

### Phase 6: Monitoring Setup (Lookout)
- [ ] Enable anomaly detection rules (see next section)
- [ ] Configure alert thresholds
- [ ] Link to incident routing (Archer for critical alerts)

---

## ANOMALY DETECTION RULES

Once tracking is live, Lookout will monitor for these triggers:

| Anomaly | Threshold | Urgency | Action |
|---------|-----------|---------|--------|
| Single keyword drop | > 10 positions in 24hrs | HIGH | Alert Silas + route competitor check |
| Multiple keyword drops | > 2 keywords drop 5+ positions | CRITICAL | Immediate investigation |
| SoLV drop | > 10% week-over-week | HIGH | Flag to Silas |
| Map Pack Rate drop | > 20% week-over-week | MEDIUM | Monitor next week before alert |
| New competitor in local pack | Displaces client at 30%+ grid points | MEDIUM | Competitive analysis task for Scout |
| Site down | HTTP 5xx or timeout | CRITICAL | Immediate operator notification |

**Note:** Given site is brand new, expect 1-2 weeks before rankings appear. No anomalies expected in week 1.

---

## INITIAL RANKING EXPECTATIONS & TIMELINE

**Week 1 (Feb 11-17):**
- Site may be crawled by Google but not indexed yet
- No keyword rankings expected
- Data: ~0 keywords found
- Action: Monitor indexation via Search Console

**Weeks 2-4 (Feb 18 - Mar 10):**
- Pages begin appearing in index (typically 2-4 weeks for new WordPress)
- Branded queries likely to rank first (if brand name matches GBP)
- Difficulty keywords ("local seo agency") may show rank 50+ or not found
- Action: Monitor index growth; initial optimization pass by Specs

**Weeks 5-8 (Mar 11 - Apr 7):**
- Expect first top-20 appearances for target keywords
- SoLV likely to be <5% (emerging status)
- Optimization tasks should begin (on-page, citations, content)
- Action: First weekly pulse report generated

**Weeks 9-12 (Apr 8 - May 5):**
- If optimization is underway, should see 5-15% SoLV
- Some keywords may break into top 10
- Competitive landscape becoming clear
- Action: Monthly comprehensive report (Month 2)

**By Month 3-4:**
- Target: 15-30% SoLV (competitive status)
- Some keywords top 3
- Full data set to inform strategic decisions

---

## DELIVERABLES & HANDOFF

### Immediate (This Week)
✅ **This Baseline Audit** — Documents current state and setup spec  
⏳ **Google Sheet Template** — To be created by Specs (Lookout provides formula sheet)  
⏳ **Apps Script Template** — To be created by Specs (Lookout provides skeleton code)

### Week 1-2
⏳ **First Data Scan** — Baseline positions (likely all "not found")  
⏳ **Looker Dashboard** — Initial setup with empty data

### Ongoing
📊 **Weekly Pulse** — Every Monday 9:00 AM (to Silas channel)  
📋 **Monthly Comprehensive Report** — 1st of each month (to client channel)  
⚠️ **Anomaly Alerts** — Real-time (to Archer for routing)

---

## NEXT STEPS

1. **Specs:** Confirm business address for grid center point. Reply with coordinates.
2. **Specs:** Create Google Sheet from provided template. Share link to Lookout.
3. **Specs:** Implement Apps Script weekly trigger. Run test scan.
4. **Lookout:** Monitor first week for indexation progress via GSC.
5. **Silas:** Prepare initial optimization plan (on-page, citations, content strategy).

---

## NOTES FOR CODY

**Setup Score:** 0/10 (not yet operational)  
**Status:** Ready for Specs implementation  
**Risk Level:** LOW (new site, no emergency fixes needed)  
**Next Review:** After first live scan (Week of Feb 18)

This site has strong foundational positioning for local SEO (all keywords are agency-focused and geo-qualified). Once tracking is live, data will guide optimization priorities. Estimated ramp-up to "Competitive" status (15-30% SoLV): 8-12 weeks, assuming steady optimization work.

---

_Audit prepared by Lookout | Data sources: domain analysis, keyword research, SPEC-015 standards_
