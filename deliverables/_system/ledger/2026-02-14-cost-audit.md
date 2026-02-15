# System Cost Audit — Framework & Model Tiering

**Date:** 2026-02-14
**Agent:** Ledger
**Status:** Template — Awaiting Real Spend Data from Session Logs

---

## Model Tiering Recommendations

### Current Assignments (from openclaw.json)

| Agent | Current Model | Recommended Tier | Rationale |
|-------|---------------|------------------|-----------|
| **Archer** | Opus 4.5 | Opus | Orchestration requires strategic reasoning |
| **Silas** | Opus 4.5 | Opus | SEO strategy requires nuanced analysis |
| **Mozi** | Sonnet 4.5 | Sonnet | Business frameworks need good reasoning |
| **Scout** | Sonnet 4.5 | **Haiku** (for crawling) / Sonnet (for analysis) | Crawling is mechanical; analysis needs reasoning |
| **Canvas** | Sonnet 4.5 | Sonnet | Design prompts need creativity |
| **Scribe** | Sonnet 4.5 | Sonnet | Content quality requires good language model |
| **Builder** | Sonnet 4.5 | Sonnet | Site builds need precision |
| **Wrench** | Sonnet 4.5 | Sonnet | Implementation needs precision |
| **Specs** | Sonnet 4.5 | Sonnet | Technical SEO needs precision |
| **Herald** | Sonnet 4.5 | **Haiku** (for publishing) / Sonnet (for review responses) | Mechanical GBP operations can use Haiku |
| **Citadel** | Sonnet 4.5 | **Haiku** (for submissions) / Sonnet (for audits) | Directory submissions are mechanical |
| **Ghost** | Sonnet 4.5 | Sonnet | PBN management needs quality |
| **Lookout** | Sonnet 4.5 | **Haiku** (for data pulls) / Sonnet (for analysis) | GSC data pulls are mechanical |
| **Ledger** | Sonnet 4.5 | Sonnet | Cost analysis needs reasoning |
| **Razor** | Sonnet 4.5 | Sonnet | CRO requires strategic thinking |
| **Blitz** | Sonnet 4.5 | Sonnet | Paid ads need precision |
| **Sentinel** | Sonnet 4.5 | **Haiku** | Health checks are mechanical |
| **Forge** | Opus 4.5 | Opus | System improvement needs deep reasoning |

### Estimated Savings from Tiering

| Tier | Cost per 1M Input Tokens | Cost per 1M Output Tokens |
|------|--------------------------|---------------------------|
| Opus 4.5 | $15.00 | $75.00 |
| Sonnet 4.5 | $3.00 | $15.00 |
| Haiku 4.5 | $0.80 | $4.00 |

**If Haiku-eligible tasks (crawling, data pulls, directory submissions, health checks) represent ~30% of total token usage:**
- Current cost at Sonnet: ~$X
- Haiku cost: ~73% cheaper per token
- **Estimated savings: ~22% reduction in total API spend**

---

## Cost Audit Template

### Monthly Spend Breakdown

| Category | Jan 2026 | Feb 2026 | Trend |
|----------|----------|----------|-------|
| **Anthropic API (Opus)** | $ — | $ — | — |
| **Anthropic API (Sonnet)** | $ — | $ — | — |
| **Anthropic API (Haiku)** | $ — | $ — | — |
| **Google APIs (GSC/GA4/GBP)** | $ — | $ — | — |
| **Google Gemini (Image Gen)** | $ — | $ — | — |
| **OpenClaw Gateway** | $ — | $ — | — |
| **Total** | $ — | $ — | — |

### Per-Client Profitability

| Client | Monthly Retainer | Monthly API Spend | Profit Margin | Status |
|--------|-----------------|-------------------|---------------|--------|
| {Client 1} | $ — | $ — | — % | — |
| {Client 2} | $ — | $ — | — % | — |
| {Client 3} | $ — | $ — | — % | — |

### Per-Agent Spend

| Agent | Sessions This Month | Avg Tokens/Session | Total Spend | Top Task Type |
|-------|--------------------|--------------------|-------------|---------------|
| Archer | — | — | $ — | Orchestration |
| Silas | — | — | $ — | Audits |
| Scribe | — | — | $ — | Content |
| Wrench | — | — | $ — | Implementation |
| Herald | — | — | $ — | GBP Publishing |
| Citadel | — | — | $ — | Citations |
| Lookout | — | — | $ — | Rank Tracking |
| Specs | — | — | $ — | Technical SEO |
| Ledger | — | — | $ — | Cost Analysis |
| Razor | — | — | $ — | CRO |
| Blitz | — | — | $ — | Paid Ads |

---

## Cost Optimization Opportunities

### Quick Wins (No Quality Impact)

1. **Switch crawl agents to Haiku** — Already documented in MEMORY.md. Saves ~$2-3 per audit.
2. **Switch Sentinel heartbeats to Haiku** — Health checks are mechanical status queries.
3. **Switch Herald GBP publishing to Haiku** — Publishing pre-written content to GBP doesn't need Sonnet-level reasoning.
4. **Batch directory submissions** — Citadel submitting to 15 directories in 1 session vs 15 sessions.

### Medium-Term (Requires Testing)

5. **Scribe GBP posts on Sonnet vs Haiku** — Test 10 posts on each, compare quality. If Haiku passes quality bar, 73% savings on content.
6. **Lookout data pulls on Haiku** — GSC API calls and data formatting don't need reasoning.
7. **Image gen provider switch** — Flux at $0.014-0.03/image vs Gemini at $0.04/image = 25-65% savings.

### Long-Term (Requires Architecture)

8. **Token caching** — Cache frequently-read files (SKILL.md, MEMORY.md) to reduce input tokens.
9. **Agent task sizing** — Enforce max 12K word output ceiling to prevent context overflow and wasted tokens.
10. **Smart model routing** — Auto-select model tier based on task complexity (simple → Haiku, complex → Sonnet, strategic → Opus).

---

## Data Sources Needed

To populate this audit with real numbers, Ledger needs:

1. **OpenClaw session logs** — Token usage per session, per agent
2. **Anthropic billing dashboard** — Monthly API spend breakdown
3. **Google Cloud billing** — Gemini image gen costs, GSC/GA4 API costs
4. **Client retainer data** — Monthly retainer amounts per client
5. **Session metadata** — Task type, duration, model used per session

---

## Next Steps

1. Ledger to pull session data when billing APIs are accessible
2. Populate per-client and per-agent tables
3. Calculate actual savings from model tiering
4. Present findings to Cody in monthly burn rate report
5. Track month-over-month trends starting March 2026

---

**Cost awareness is how we stay profitable. Every token counts.**
