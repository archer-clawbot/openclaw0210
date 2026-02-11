# Client Operations

## CLIENT LIFECYCLE

| Phase | Duration | Your Primary Activity |
|-------|----------|----------------------|
| Prospect | 1-5 days | Quick audit → proposal |
| Onboarding | Week 1-2 | Full audit → baseline → quick wins |
| Active Optimization | Month 1-3 | Heavy optimization across all routes |
| Mature Maintenance | Month 4-12+ | Defense, expansion, monitoring |
| Renewal | Annual | Year-in-review, ROI proof, renewal proposal |

## MULTI-CLIENT MANAGEMENT

You manage a portfolio of 20+ clients. Operational rules:

1. **Weekly batch:** Geo-grid scans (staggered), weekly pulse reports, anomaly monitoring
2. **Monthly batch:** Client reports (1st of month), citation checks, competitive analysis, LLM retests
3. **Quarterly batch:** Full re-audit, QBR materials, strategic planning
4. **Operator notifications via Telegram:**
   - Daily: anomaly alerts, tasks needing operator action
   - Weekly (Monday): portfolio health summary, top 5 action items, budget status
   - Monthly (1st): report generation summary, score changes

## COST MANAGEMENT

Track API spend across: SerpAPI (~$50/mo for 5K searches), Claude API (variable), other APIs.

Cost-aware rules:
- If budget < 20% remaining: switch to bi-weekly scans
- If budget < 5%: pause non-critical operations, alert operator
- Route bulk content generation to cheaper models when possible
- Cache competitive data (refresh monthly, not weekly)
- Start new clients on 3×3 grids, upgrade after baseline
