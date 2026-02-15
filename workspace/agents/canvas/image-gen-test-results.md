# Canvas Image Generation — API Research & Comparison

**Date:** 2026-02-14
**Agent:** Canvas (research by Archer)
**Purpose:** Evaluate alternatives to Google Gemini/Imagen for image generation

---

## Current Baseline

**Google Gemini (gemini-2.0-flash-exp-image-generation)**
- Cost: ~$0.02-0.06/image (Fast $0.02, Standard $0.04, Ultra $0.06)
- Resolution: 1024x1024 default, supports 16:9 and 9:16
- Quality: Good for product/marketing imagery
- PII Restrictions: **Strict** — will not generate images of real people, named businesses, or branded content
- Status: 7 images successfully generated (WooCommerce product images)

---

## Alternative API Comparison

| Provider | Cost/Image | Quality | PII Restrictions | Best For |
|----------|-----------|---------|-------------------|----------|
| **Flux FLUX.2 [klein]** | $0.014 | Good (budget) | Less strict than Google | High-volume, budget imagery |
| **Flux FLUX.2 [pro]** | $0.03 | Excellent photorealism | Moderate — blocks NSFW, not business imagery | Production marketing visuals |
| **GPT Image 1 Mini** | $0.005-0.052 | Good (low-high quality tiers) | **Very strict** — no real people, no named businesses | Budget option when restrictions are OK |
| **DALL-E 3** | $0.04-0.12 | Good but aging | **Very strict** — same as GPT Image | Comparable to current Gemini |
| **GPT Image 1.5** | $0.009-0.20 | Excellent (flagship) | **Very strict** | Premium quality when restrictions OK |
| **Ideogram 2a** | $0.025-0.08 | Excellent, **best text rendering** | Moderate | Images with text/signage/logos |
| **Stability AI (SD3.5)** | $0.03-0.08 | Good artistic styles | Less strict | Artistic/creative imagery |

---

## Detailed Provider Breakdown

### Flux (Black Forest Labs) — RECOMMENDED ALTERNATIVE

**Why:** Best quality-to-price ratio with fewer content restrictions.

| Model | Price | Notes |
|-------|-------|-------|
| FLUX.2 [klein] 4B/9B | From $0.014 | Budget option, megapixel-based |
| FLUX.2 [pro] | From $0.03 | Text-to-image; $0.045 for editing |
| FLUX.2 [flex] | From $0.05 | Maximum quality |
| FLUX.1 Kontext [pro] | $0.04 | Best for image editing/context |
| FLUX1.1 [pro] Ultra | $0.06 | Higher resolution |

- **API:** Direct at api.bfl.ai, also via Replicate, FAL, Together AI
- **Third-party hosting:** Kontext [dev] as low as $0.015/image on SiliconFlow
- **Restrictions:** Blocks NSFW; less strict on business imagery than Google/OpenAI
- **Key advantage:** Fewer PII refusals for marketing/business content

### OpenAI (GPT Image / DALL-E)

| Model | Low | Medium | High |
|-------|-----|--------|------|
| GPT Image 1 Mini | $0.005 | ~$0.02 | $0.052 |
| GPT Image 1.5 | $0.009 | ~$0.07 | $0.20 |
| GPT Image 1 | $0.011 | ~$0.07 | $0.25 |
| DALL-E 3 | — | $0.04 | $0.08-0.12 |

- **API:** REST via api.openai.com
- **Restrictions:** **Very strict** — no real people by name, no living artists' styles, no photo transformations of identifiable people
- **Key issue:** Content policy refusals will be similar or worse than Google

### Ideogram

- **Pricing:** 2a Turbo $0.025, 2a Standard $0.04
- **API:** REST at api.ideogram.ai
- **Key advantage:** **Industry-leading text rendering in images** — useful for signage, branded mockups, menu graphics
- **Restrictions:** Moderate content filtering

### Stability AI (Stable Diffusion 3.5)

- **Pricing:** Core $0.03, Ultra (SD3.5 Large) $0.08
- **API:** REST at platform.stability.ai
- **Note:** Company has had financial instability; pricing increased Aug 2025; fewer model updates recently
- **Restrictions:** Less restrictive than Google/OpenAI

### NVIDIA Build (NIM)

- **Pricing:** Credit-based, no transparent per-image pricing. Production requires NVIDIA AI Enterprise license ($4,500/GPU/yr)
- **Best for:** Prototyping only. Not viable for production use at OpenClaw scale.

### OpenRouter

- **Pricing:** Pass-through (~$0.04-0.13 depending on model) + small platform fee
- **Best for:** Aggregator if we want to switch between models dynamically
- **Not a model provider** — routes to Flux, DALL-E, etc.

---

## Recommendations for Canvas SKILL.md

### Tier 1: Default (Current) — Google Gemini
- Keep as primary for standard marketing imagery
- Cost: ~$0.04/image
- Works well for generic product/service visuals

### Tier 2: When Gemini Refuses — Flux FLUX.2 [pro]
- Use when Gemini content policy blocks the request
- Cost: ~$0.03/image (actually cheaper)
- Better for business-specific imagery
- API: api.bfl.ai or via Replicate

### Tier 3: Budget Batch Generation — GPT Image 1 Mini (Low)
- Use for high-volume, lower-quality needs (social media thumbnails, blog headers)
- Cost: $0.005/image
- Good enough for non-critical assets

### Tier 4: Text-Heavy Images — Ideogram 2a
- Use when image needs readable text (signage mockups, menu boards, branded graphics)
- Cost: $0.025-0.04/image
- No other model matches text rendering quality

---

## Action Items

1. **Immediate:** Add Flux API as fallback when Gemini refuses (requires API key from bfl.ai)
2. **Test:** Generate 3 comparison images (same prompt) across Gemini, Flux, and Ideogram to validate quality
3. **Update SKILL.md:** Add tiered image generation workflow
4. **Cost savings:** For batch jobs (10+ images), consider Flux [klein] at $0.014/image = 65% savings vs Gemini

---

## PII Restriction Summary

| Provider | Real People | Named Businesses | Business Imagery | Living Artists |
|----------|------------|------------------|-------------------|----------------|
| Google Gemini | ❌ Blocked | ❌ Blocked | ⚠️ Sometimes blocked | ❌ Blocked |
| OpenAI (all) | ❌ Blocked | ❌ Blocked | ⚠️ Sometimes blocked | ❌ Blocked |
| Flux | ⚠️ Deepfakes blocked | ✅ Generally OK | ✅ OK | ✅ OK |
| Ideogram | ⚠️ Moderate filter | ✅ Generally OK | ✅ OK | ⚠️ Unknown |
| Stability AI | ⚠️ NSFW blocked | ✅ Generally OK | ✅ OK | ✅ OK |

**Bottom line:** If PII restrictions are the main blocker, Flux or Stability AI are the best alternatives. Neither blocks generic business imagery.
