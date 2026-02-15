# Search API Comparison: Perplexity Sonar vs Brave Search

**Date:** 2026-02-15
**Agent:** Scout (research by Archer)
**Purpose:** Evaluate search APIs for Scout's research capabilities

---

## Executive Summary

| Feature | Perplexity Sonar | Brave Search |
|---------|-----------------|--------------|
| **Best for** | AI-synthesized answers with citations | Raw search results + BYO LLM |
| **Cheapest query** | ~$0.005/query (Sonar basic) | ~$0.003/query (base search) |
| **Citations** | Built-in, numbered, automatic | URLs in results; AI Answers tier adds citations |
| **Latency** | 1-3 seconds (synthesized) | <600ms p90 (raw results) |
| **Privacy** | Standard data processing | Zero data retention |
| **Index** | Not disclosed (multi-source) | 35B+ pages (independent index) |

**Recommendation:** Hybrid approach — Brave for high-volume raw search, Perplexity Sonar for complex queries needing synthesized answers.

---

## Perplexity Sonar API — Detailed Breakdown

### Models & Token Pricing

| Model | Input ($/M tokens) | Output ($/M tokens) | Best For |
|-------|--------------------|--------------------|----------|
| **Sonar** | $1 | $1 | Quick factual lookups |
| **Sonar Pro** | $3 | $15 | Multi-step research, detailed answers |
| **Sonar Reasoning** | $1 | $5 | Analytical queries |
| **Sonar Reasoning Pro** | $2 | $8 | Complex reasoning + search |
| **Sonar Deep Research** | $2 | $8 (+$2 citations, +$3 reasoning) | Comprehensive research reports |

### Search Context Pricing (per 1,000 requests)

| Context Depth | Sonar / Reasoning | Sonar Pro / Reasoning Pro |
|---------------|-------------------|---------------------------|
| Low | $5 | $6 |
| Medium | $8 | $10 |
| High | $12 | $14 |

### Effective Cost Per Query

| Use Case | Model | Est. Cost/Query |
|----------|-------|----------------|
| Simple fact check | Sonar (low context) | ~$0.005-0.008 |
| Competitor research | Sonar Pro (medium context) | ~$0.02-0.03 |
| Deep SERP analysis | Sonar Deep Research | ~$0.05-0.10 |
| Algorithm update check | Sonar Reasoning (medium) | ~$0.01-0.02 |

### Key Features
- **Built-in citations:** Numbered references with URLs in every response
- **Sonar Pro:** 2x more citations than base Sonar; multi-search for diverse perspectives
- **Grounding:** RAG-powered — searches live web, synthesizes answer, grounds in sources
- **OpenAI-compatible API format** — easy integration with existing tooling
- **Rate limits:** 50 RPM default; tiered system (Tier 0-5) based on cumulative spend

### Limitations
- No transparent rate limit scaling docs
- Latency 1-3s (too slow for real-time autocomplete)
- Can't control which sources are searched
- Token costs add up for long-form research

---

## Brave Search API — Detailed Breakdown

### Pricing Tiers

| Plan | Cost | Queries Included | Rate Limit |
|------|------|-----------------|------------|
| **Base Search** | $3-5/1,000 queries | Pay-as-you-go | 20 QPS |
| **Pro Search** | $5/1,000 queries | Pay-as-you-go | 50 QPS |
| **AI Answers** | $4/1,000 queries + $5/M tokens | Pay-as-you-go | Custom |
| **Enterprise** | Custom pricing | Custom | Custom QPS |

### Effective Cost Per Query

| Use Case | Tier | Est. Cost/Query |
|----------|------|----------------|
| Keyword research (raw results) | Base | ~$0.003-0.005 |
| SERP analysis (results + snippets) | Pro | ~$0.005 |
| Quick competitive check | AI Answers | ~$0.008-0.01 |

### Key Features
- **Independent index:** 35B+ pages — not resold Bing/Google data
- **Zero data retention:** Privacy-first architecture
- **LLM Context API:** Results optimized for AI consumption (structured, clean)
- **Sub-second latency:** p90 <600ms for search results
- **Ancillary APIs:** Image search, news search, video search, spellcheck, autosuggest
- **Flexible:** Raw results let you BYO synthesis with any LLM

### Limitations
- No built-in answer synthesis (except AI Answers tier)
- Free tier discontinued — all metered billing now
- AI Answers quality depends on query complexity
- No reasoning/multi-step capability built in

---

## Head-to-Head Comparison

### For Scout's Core Use Cases

| Use Case | Winner | Why |
|----------|--------|-----|
| **Competitor SERP analysis** | Brave | Raw results with structured data, faster, cheaper |
| **Algorithm update research** | Perplexity Sonar | Synthesized answer with citations saves time |
| **Keyword opportunity research** | Brave | High-volume queries at $0.003/ea |
| **Local SEO competitive intel** | Perplexity Sonar Pro | Multi-step research, grounded answers |
| **Citation source discovery** | Brave | Raw directory listings, fast |
| **Industry trend reports** | Perplexity Deep Research | Comprehensive, cited reports |

### Recommended Strategy for Scout

**Primary (80% of queries): Brave Search API**
- All SERP analysis, keyword research, citation source discovery
- High-volume, low-latency, cost-effective
- ~$0.003-0.005/query
- BYO synthesis with Scout's own LLM reasoning

**Secondary (20% of queries): Perplexity Sonar**
- Complex competitive analysis requiring synthesis
- Algorithm update summaries
- Industry research reports
- ~$0.01-0.05/query

**Estimated monthly cost at 1,000 queries/month:**
- Brave (800 queries): ~$2.40-4.00
- Perplexity (200 queries): ~$2.00-10.00
- **Total: ~$4.40-14.00/month**

---

## Action Items

1. **Sign up for Brave Search API** — Get API key, test with 10 competitor SERP queries
2. **Sign up for Perplexity Sonar** — Get API key, test with 5 synthesis queries
3. **Run comparison test:** Same 5 queries on both APIs, compare quality + latency
4. **Update Scout SKILL.md** with API selection guidelines
5. **Track costs in first month** — Validate estimates against actual usage

---

**Scout's research quality is only as good as the data sources. Pick the right API for the right query.**
