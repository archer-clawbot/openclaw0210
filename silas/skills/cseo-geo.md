# CSEO Skill: GEO (Generative Engine Optimization)
## Scoring and optimization for AI Overviews, ChatGPT, Perplexity, Copilot
## Origin: claude-seo `/seo geo` — adapted for CATALYST framework

---

## When This Skill Activates

Injected by the awareness engine when task context matches:
- GEO, generative engine optimization, AI search optimization
- AI Overviews, AI visibility, LLM citations
- SPEC-017 deep analysis

---

## GEO vs Traditional SEO

GEO focuses on being **cited by AI systems**, not just ranking in blue links. The output of a GEO audit is a score reflecting how likely AI systems are to recommend this business when users ask conversational queries.

Key differences:
| Factor | Traditional SEO | GEO |
|--------|----------------|-----|
| Target | SERP position 1-10 | Cited in AI answer |
| Signal | Backlinks, content, technical | Entity consensus, verifiability, structured data |
| Measurement | Rank tracking | LLM mention rate + position |
| Content style | Keyword-optimized | Definitive answers, structured facts |
| Platform scope | Google Search | Google AI Overview + ChatGPT + Perplexity + Copilot + Siri |

---

## GEO Scoring Framework

### Per-Platform Assessment

Test 5 standard queries per platform:
1. "Who is the best [service] in [city]?"
2. "Recommend a [service provider] in [city]"
3. "How much does [service] cost in [city]?"
4. "Tell me about [Business Name]"
5. "[Business Name] reviews"

**Scoring per platform:**

| Score | Criteria |
|-------|----------|
| 0 | Not mentioned in any response |
| 1 | Mentioned once but with incorrect information |
| 2 | Mentioned but not as a recommendation (just listed) |
| 3 | Mentioned as one of several options, correct info |
| 4 | Recommended in top 5, correct info |
| 5 | Recommended in top 3 or directly cited as answer |

**Per-platform max: 25 points (5 queries x 5 points)**

### Platform Weights

| Platform | Weight | Rationale |
|----------|--------|-----------|
| Google AI Overviews | 35% | Highest search volume, most visibility |
| ChatGPT (with search) | 25% | Fastest-growing AI search platform |
| Perplexity | 20% | Cites sources directly, high-intent users |
| Microsoft Copilot | 10% | Growing but niche for local search |
| Apple Siri / Intelligence | 10% | Mobile-first, Yelp/Apple Maps dependent |

### GEO Composite Score

```
GEO Score = (Google_AO / 25 × 0.35) + (ChatGPT / 25 × 0.25) +
            (Perplexity / 25 × 0.20) + (Copilot / 25 × 0.10) +
            (Siri / 25 × 0.10)

Result: 0.0 - 1.0 → multiply by 10 for CATALYST scale (0-10)
```

---

## GEO Optimization Levers

### Lever 1: Entity Consensus (Impact: High)
Ensure identical business information across all platforms AI systems crawl:
- GBP, website, Yelp, BBB, Facebook, Apple Maps, Bing Places
- Minimum 20 consistent citations for entity recognition threshold
- `sameAs` in schema connecting all profiles

### Lever 2: Definitive Content (Impact: High)
AI systems cite content that directly answers questions:
- Grounding boxes (SPEC-007) are the primary vehicle
- Lead with the answer (no "it depends" or "contact us for pricing")
- Include specific numbers: prices, timelines, coverage areas, credentials
- Use tables for comparative data

### Lever 3: Structured Data (Impact: Medium-High)
AI systems rely heavily on schema for entity understanding:
- Complete LocalBusiness schema with all properties
- Service schema with pricing on every service page
- FAQPage schema on pages with Q&A content (still useful for AI despite rich result restriction)
- Review/AggregateRating schema

### Lever 4: Source Diversity (Impact: Medium)
AI systems cross-reference multiple sources:
- YouTube presence with rich descriptions (feeds ChatGPT and Google AI)
- LinkedIn company page (feeds Copilot)
- Yelp + Apple Business Connect (feeds Siri)
- Reddit presence — organic only (feeds Perplexity and ChatGPT)

### Lever 5: Freshness Signals (Impact: Medium)
AI systems prefer recent information:
- Regular GBP posts (weekly minimum)
- Recent reviews (within 30 days)
- Updated content with current-year dates
- Active social media presence

---

## Audit Output Format

When producing GEO findings for CATALYST audit Section 8, use this enhanced format:

```
### 8.1 GEO Assessment (Generative Engine Optimization)

**Test queries used:**
1. "[query 1]"
2. "[query 2]"
3. "[query 3]"
4. "[query 4]"
5. "[query 5]"

| Platform | Q1 | Q2 | Q3 | Q4 | Q5 | Raw | Weighted |
|----------|----|----|----|----|----|----|---------|
| Google AI Overview | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | × 0.35 = [X] |
| ChatGPT | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | × 0.25 = [X] |
| Perplexity | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | × 0.20 = [X] |
| Copilot | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | × 0.10 = [X] |
| Siri/Apple | [0-5] | [0-5] | [0-5] | [0-5] | [0-5] | [/25] | × 0.10 = [X] |

**GEO Composite Score: [X.X/10]**

**Key findings:**
- [Platform with strongest presence — why]
- [Platform with weakest presence — why]
- [Biggest optimization opportunity]

**GEO optimization priorities:**
1. [Action + expected impact]
2. [Action + expected impact]
3. [Action + expected impact]
```

---

## Data Availability Notes

Current access limitations (see `ref:data-sources`):
- **Google AI Overviews:** Can test via `web_search` with conversational queries. Medium reliability — AI Overviews vary by session.
- **ChatGPT / Perplexity / Copilot:** Requires direct API access or manual testing. If unavailable, note "REQUIRES MANUAL VERIFICATION" and score based on optimization signals rather than actual mentions.
- **Siri:** Cannot test programmatically. Score based on Apple Maps/Yelp presence as proxy.

When platform access is unavailable, assess optimization potential instead:
```
IF cannot test directly:
  Score based on presence of optimization signals:
  - Entity consensus: [Strong/Weak]
  - Definitive content: [Present/Missing]
  - Structured data: [Complete/Partial/Missing]
  - Source diversity: [count of active platforms]
  - Freshness: [Recent activity / Stale]

  Estimated GEO readiness: [X/10]
  Note: "GEO score estimated from optimization signals. Actual LLM testing recommended."
```

---

## Scoring Impact

GEO composite feeds into SPEC-017 (LLM Visibility) score:
- Directly replaces the basic AI Overview check table in current Section 8
- Provides structured, repeatable scoring across platforms
- Connects to existing Entity Fortification Tiers in ROUTE-AI-CROSSPLATFORM

---

## References
- `ref:data-sources` — `source:ai-overview`, `source:llm-mention`
- SPEC-017 (StealthRank) in ROUTE-AI-CROSSPLATFORM for entity optimization strategy
- SPEC-007 (Grounding Boxes) — primary content vehicle for GEO
