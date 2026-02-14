# OpenRouter Multi-Model Backup Strategy

**Date:** February 13, 2026  
**Purpose:** Reduce Anthropic API dependency and prevent business shutdown if API access is lost  
**Status:** Planning → Implementation Needed

---

## Problem Statement

**Risk:** If Anthropic bans our API key or changes ToS to prohibit agentic systems, LocalCatalyst.ai business could go offline immediately.

**Current dependency:**
- 100% of agents use Claude models (Opus 4.5, Sonnet 4.5, Haiku 4.5)
- No backup provider configured
- Single point of failure

**Trigger event:** Cole's video mentioned Anthropic banning Claude Pro users who use it with OpenClaw. While we're using API (not Pro), we should still have a backup plan.

---

## Solution: Multi-Model Strategy

**Goal:** Maintain 80%+ quality while reducing Anthropic dependency to 60-70% of total usage.

### Tier 1: High-Stakes Work (Keep Claude Opus)
**Agents:** Silas, Mozi, Specs  
**Model:** Claude Opus 4.5  
**Why:** These agents need maximum quality for strategy, audits, technical work  
**Fallback:** Claude Sonnet 4.5 → GPT-4o (OpenRouter)

### Tier 2: Default Work (Keep Claude Sonnet)
**Agents:** Scout, Scribe, Razor, Blitz, Canvas, Builder, Wrench  
**Model:** Claude Sonnet 4.5  
**Why:** High quality, good balance of cost/performance  
**Fallback:** GPT-4o (OpenRouter) → Gemini 2.0 Pro (OpenRouter)

### Tier 3: Low-Stakes Work (Switch to GPT-4o-mini)
**Agents:** Sentinel, Lookout, Herald, Citadel, Ghost, Ledger, Forge  
**Model:** GPT-4o-mini or Gemini 2.0 Flash (via OpenRouter)  
**Why:** These agents do monitoring, reporting, data aggregation — don't need Opus-level intelligence  
**Cost savings:** 90% cheaper than Claude Haiku  
**Fallback:** Gemini 2.0 Flash (OpenRouter) → Claude Haiku (if absolutely needed)

---

## OpenRouter Configuration

### What is OpenRouter?
- Unified API for 200+ LLMs (Claude, GPT, Gemini, Llama, Mistral, etc.)
- Single API key, switch models without changing code
- Automatic fallback if a model is down
- Cost tracking across all models

### Models to Enable

| Model | Use Case | Cost per 1M tokens | Quality vs Claude |
|-------|----------|-------------------|-------------------|
| **anthropic/claude-opus-4** | High-stakes (Silas, Mozi, Specs) | $75 in / $15 out | 100% (same as direct) |
| **anthropic/claude-sonnet-4** | Default work (Scout, Scribe, etc.) | $15 in / $3 out | 100% (same as direct) |
| **anthropic/claude-haiku-4** | Backup for monitoring agents | $1.50 in / $0.80 out | 100% (same as direct) |
| **openai/gpt-4o** | Primary fallback | $5 in / $15 out | 90-95% |
| **openai/gpt-4o-mini** | Low-stakes work | $0.30 in / $0.60 out | 85-90% |
| **google/gemini-2.0-flash-exp** | Secondary fallback (free tier) | $0 (while in preview) | 80-85% |
| **google/gemini-2.0-pro-exp** | Third fallback | $1.25 in / $5 out | 85-90% |

### Cost Comparison Example (1M Input Tokens)

**Current (100% Claude):**
- High-stakes: $75 (Opus)
- Default: $15 (Sonnet)
- Low-stakes: $1.50 (Haiku)
- **Total for typical day (mix of agents): ~$50-100**

**With OpenRouter Strategy:**
- High-stakes: $75 (Opus) — no change
- Default: $15 (Sonnet) — no change
- Low-stakes: $0.30 (GPT-4o-mini) — **80% savings**
- **Total for typical day: ~$40-80** (20-30% cost reduction)

**Bonus:** If Anthropic goes down, we can route everything through OpenRouter (GPT-4o) and stay operational.

---

## Implementation Plan

### Phase 1: Setup (Week 1)

**Step 1: Get OpenRouter API Key**
1. Sign up at https://openrouter.ai/
2. Add payment method
3. Generate API key
4. Store in environment variables (never plain text)

**Step 2: Test OpenRouter Access**
```python
import requests

url = "https://openrouter.ai/api/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "HTTP-Referer": "https://localcatalyst.ai",
    "X-Title": "LocalCatalyst SEO Agents"
}
payload = {
    "model": "openai/gpt-4o-mini",
    "messages": [{"role": "user", "content": "Test message"}]
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

**Step 3: Update Agent Configs**

For each Tier 3 agent (Sentinel, Lookout, Herald, Citadel, Ghost, Ledger, Forge):

**File:** `C:\Users\spart\.openclaw\agents\{agent}\models.json`

**Before:**
```json
{
  "default": "claude-haiku-4-5"
}
```

**After:**
```json
{
  "default": "openrouter/openai/gpt-4o-mini",
  "fallback": [
    "openrouter/google/gemini-2.0-flash-exp",
    "openrouter/anthropic/claude-haiku-4"
  ]
}
```

**Step 4: Test One Agent**

Pick Sentinel (low-risk monitoring agent):
1. Update models.json to use OpenRouter
2. Run a test health check: `openclaw run sentinel "Run the nightly health check"`
3. Verify output quality is acceptable
4. Compare cost (should be 90% cheaper)
5. If good, roll out to other Tier 3 agents

---

### Phase 2: Add Fallback Logic (Week 2)

**Update dispatcher to auto-retry with fallback models if Anthropic fails:**

**File:** `C:\Users\spart\.openclaw\cron\dispatcher.js` (or equivalent)

**Add retry logic:**
```javascript
async function callLLM(agentId, prompt, model) {
  const models = getModelsForAgent(agentId); // e.g., ["claude-sonnet-4-5", "openrouter/gpt-4o", "openrouter/gemini-2.0-pro-exp"]
  
  for (const modelName of models) {
    try {
      const response = await llmAPI.call(modelName, prompt);
      return response;
    } catch (error) {
      if (error.code === 429 || error.code === 403 || error.code === 401) {
        // Anthropic rate limit, ban, or auth error → try next model
        console.warn(`${modelName} failed (${error.code}), trying fallback...`);
        continue;
      } else {
        throw error; // Other errors (network, etc.) should fail immediately
      }
    }
  }
  
  throw new Error("All models failed for agent: " + agentId);
}
```

**Result:** If Anthropic API returns 403 (banned), system automatically switches to GPT-4o and keeps working.

---

### Phase 3: Set Usage Caps (Week 2)

**Add spending limits to prevent runaway costs:**

**File:** `C:\Users\spart\.openclaw\cron\lib\usage-monitor.js` (create if doesn't exist)

```javascript
const DAILY_SPEND_LIMIT = 500; // $500/day account-wide
const CLIENT_DAILY_LIMIT = 50;  // $50/day per client

async function checkUsageLimits(clientId, currentSpend) {
  const totalToday = await getTotalSpendToday();
  const clientToday = await getClientSpendToday(clientId);
  
  if (totalToday >= DAILY_SPEND_LIMIT) {
    throw new Error(`Account daily limit reached: $${totalToday}/$${DAILY_SPEND_LIMIT}`);
  }
  
  if (clientToday >= CLIENT_DAILY_LIMIT) {
    throw new Error(`Client daily limit reached: $${clientToday}/$${CLIENT_DAILY_LIMIT}`);
  }
}
```

**Trigger alerts:**
- Email/Slack alert when 80% of daily limit reached
- Hard stop at 100% (no more agent runs until next day)

---

### Phase 4: Quality Testing (Week 3)

**Test each agent with OpenRouter models to verify quality:**

| Agent | Task | Claude Result | GPT-4o-mini Result | Gemini 2.0 Flash Result | Pass? |
|-------|------|---------------|--------------------|-----------------------|-------|
| Sentinel | Health check | (baseline) | Compare | Compare | ✅/❌ |
| Lookout | Rank tracking | (baseline) | Compare | Compare | ✅/❌ |
| Herald | GBP post | (baseline) | Compare | Compare | ✅/❌ |
| Citadel | Citation audit | (baseline) | Compare | Compare | ✅/❌ |
| Ghost | PBN link | (baseline) | Compare | Compare | ✅/❌ |
| Ledger | Cost report | (baseline) | Compare | Compare | ✅/❌ |
| Forge | Prompt tuning | (baseline) | Compare | Compare | ✅/❌ |

**Acceptance criteria:**
- 80%+ quality for monitoring/reporting agents (Sentinel, Lookout, Ledger)
- 85%+ quality for content agents (Herald, Ghost)
- 90%+ quality for analysis agents (Citadel, Forge)

**If any agent fails quality test:** Keep that agent on Claude, don't switch to OpenRouter.

---

### Phase 5: Production Rollout (Week 4)

**Once testing is complete:**

1. Update all Tier 3 agents to use OpenRouter by default
2. Keep Tier 1 & 2 agents on Claude (high quality needed)
3. Enable fallback logic for all agents
4. Monitor cost savings (expect 20-30% reduction)
5. Monitor quality (no regressions)

---

## Disaster Recovery Plan

### Scenario 1: Anthropic API Down (Temporary Outage)

**What happens:**
- All agents automatically fall back to OpenRouter (GPT-4o)
- Quality drops slightly (90-95% vs 100%)
- Cost may increase slightly (GPT-4o more expensive than Sonnet for output)
- Business stays operational

**Action:** Wait for Anthropic to restore service, no intervention needed.

---

### Scenario 2: Anthropic Bans Our API Key

**What happens:**
- All agents get 403 errors from Anthropic
- Automatic fallback to OpenRouter (GPT-4o)
- We lose access to Opus/Sonnet quality for high-stakes work

**Action (within 1 hour):**
1. Switch all Tier 1 agents (Silas, Mozi, Specs) to `openrouter/anthropic/claude-opus-4` (routes through OpenRouter instead of direct Anthropic)
2. If OpenRouter also blocks us, fall back to GPT-4o for all agents
3. Contact Anthropic support to understand why we were banned
4. Provide evidence of compliance (invoices, service description, client list)
5. Request reinstatement

**If reinstatement fails:**
- Permanently switch to GPT-4o + Gemini 2.0 Pro for all work
- Quality will be 90-95% of current (acceptable tradeoff vs business shutdown)

---

### Scenario 3: Anthropic Changes ToS (Prohibits Agentic Use)

**What happens:**
- Anthropic announces "agentic systems no longer allowed on API"
- We have 30-90 days grace period (typical for ToS changes)

**Action (within grace period):**
1. Migrate all agents to OpenRouter (GPT-4o primary, Gemini 2.0 Pro secondary)
2. Re-test all workflows for quality
3. Update client-facing documentation (no mention of Claude/Anthropic)
4. If quality is unacceptable, consider:
   - Self-hosting Llama 3.3 70B (open-source, no ToS restrictions)
   - Using AWS Bedrock (enterprise Anthropic access, different ToS)
   - Switching to Google Vertex AI (Gemini with enterprise SLA)

---

## Cost Projections

### Current State (100% Anthropic Direct)

**Daily usage (estimated):**
- High-stakes (Silas, Mozi, Specs): 5M tokens/day @ $75/1M = $375/day
- Default (Scout, Scribe, etc.): 20M tokens/day @ $15/1M = $300/day
- Low-stakes (Sentinel, Lookout, etc.): 10M tokens/day @ $1.50/1M = $15/day
- **Total: ~$690/day = $20,700/month**

### Future State (Multi-Model Strategy)

**Daily usage (estimated):**
- High-stakes (Silas, Mozi, Specs): 5M tokens/day @ $75/1M = $375/day (no change)
- Default (Scout, Scribe, etc.): 20M tokens/day @ $15/1M = $300/day (no change)
- Low-stakes (Sentinel, Lookout, etc.): 10M tokens/day @ $0.30/1M = $3/day (**95% savings**)
- **Total: ~$678/day = $20,340/month**

**Savings: $360/month (2% overall)**

**Note:** Savings are small because low-stakes agents are already cheap. The real benefit is **disaster recovery** — if Anthropic goes down, we stay operational.

---

## Success Metrics

**Week 4 Review:**

| Metric | Target | Actual | Pass? |
|--------|--------|--------|-------|
| Cost reduction | 2-5% | __% | ✅/❌ |
| Quality maintained | 95%+ (vs Claude baseline) | __% | ✅/❌ |
| Zero downtime | 0 minutes | __ min | ✅/❌ |
| Fallback tested | Successfully routes to GPT-4o | ✅/❌ | ✅/❌ |

**If all metrics pass:** Roll out to production permanently.

---

## Documentation for Anthropic Compliance

**If Anthropic ever asks "What are you using the API for?"**

**Prepared Response:**

> "LocalCatalyst is a local SEO agency serving small businesses (medical practices, restaurants, home services, etc.). We use the Anthropic API to power internal automation tools that help our SEO team scale from 20 to 100+ clients.
> 
> **Specific use cases:**
> - Competitive keyword research and SERP analysis
> - Technical SEO audits (site speed, schema markup, crawl errors)
> - Topical map generation and content strategy
> - SEO scorecard creation and client reporting
> 
> Our clients pay us for SEO services and results (rankings, traffic, leads). We do not resell AI assistant access or compete with Claude Pro. The API is used exclusively for internal tooling to improve the efficiency of our SEO operations.
> 
> **Compliance:**
> - We pay for API usage (pay-per-token, not Pro subscription)
> - We have usage caps to prevent runaway costs ($500/day account-wide, $50/day per client)
> - All usage is logged and can be audited upon request
> 
> We are happy to provide invoices, client lists, or service descriptions to demonstrate compliance with Anthropic's API Terms of Service."

**Supporting documents to have ready:**
1. Anthropic API invoices (last 3 months)
2. LocalCatalyst service description (from website)
3. Client list (names redacted, just show "20+ active clients")
4. Usage logs showing API calls (dates, tokens, costs)

---

## Next Steps

**Immediate (This Week):**
- [ ] Sign up for OpenRouter account
- [ ] Get API key, store securely
- [ ] Test API access with simple request
- [ ] Update Sentinel to use GPT-4o-mini
- [ ] Run test health check, verify quality

**Short-term (Next 2 Weeks):**
- [ ] Roll out OpenRouter to all Tier 3 agents
- [ ] Add fallback logic to dispatcher
- [ ] Set usage caps ($500/day account, $50/day per client)
- [ ] Test disaster recovery (simulate Anthropic outage)

**Long-term (Next Month):**
- [ ] Monitor cost savings (expect 2-5% reduction)
- [ ] Monitor quality (should maintain 95%+)
- [ ] Document compliance evidence (invoices, service description)
- [ ] Review every quarter and adjust strategy as needed

---

## Appendix: Model Details

### Claude Opus 4.5 (via Anthropic or OpenRouter)
- **Best for:** Strategy, complex analysis, high-stakes content
- **Quality:** 100% (benchmark)
- **Cost:** $75 in / $15 out per 1M tokens
- **Speed:** ~10 tokens/sec
- **Context:** 200k tokens

### Claude Sonnet 4.5 (via Anthropic or OpenRouter)
- **Best for:** Default work, audits, content briefs
- **Quality:** 95-98% (vs Opus)
- **Cost:** $15 in / $3 out per 1M tokens
- **Speed:** ~30 tokens/sec
- **Context:** 200k tokens

### Claude Haiku 4.5 (via Anthropic or OpenRouter)
- **Best for:** Fast, cheap tasks (was used for monitoring)
- **Quality:** 85-90% (vs Opus)
- **Cost:** $1.50 in / $0.80 out per 1M tokens
- **Speed:** ~50 tokens/sec
- **Context:** 200k tokens

### GPT-4o (via OpenRouter)
- **Best for:** General fallback, good balance of quality/cost
- **Quality:** 90-95% (vs Claude Opus)
- **Cost:** $5 in / $15 out per 1M tokens
- **Speed:** ~40 tokens/sec
- **Context:** 128k tokens
- **Note:** Output tokens same cost as Claude Opus, so not always cheaper

### GPT-4o-mini (via OpenRouter)
- **Best for:** Monitoring, reporting, data aggregation
- **Quality:** 85-90% (vs Claude Opus)
- **Cost:** $0.30 in / $0.60 out per 1M tokens (90% cheaper than Haiku)
- **Speed:** ~60 tokens/sec
- **Context:** 128k tokens

### Gemini 2.0 Flash (via OpenRouter)
- **Best for:** Free tier fallback (while in preview)
- **Quality:** 80-85% (vs Claude Opus)
- **Cost:** $0 (preview) → $0.10 in / $0.40 out (after GA)
- **Speed:** ~80 tokens/sec
- **Context:** 1M tokens (massive context window)

### Gemini 2.0 Pro (via OpenRouter)
- **Best for:** Secondary fallback if GPT-4o fails
- **Quality:** 85-90% (vs Claude Opus)
- **Cost:** $1.25 in / $5 out per 1M tokens
- **Speed:** ~30 tokens/sec
- **Context:** 2M tokens (massive context window)

---

**End of Document**

*This strategy reduces Anthropic dependency from 100% to ~60%, maintains 95%+ quality, saves 2-5% on costs, and ensures business continuity if Anthropic API access is lost.*
