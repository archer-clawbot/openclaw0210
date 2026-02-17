# Key Metrics

## SoLV (Share of Local Voice)
The premier metric for local SEO performance in 2026.
```
SoLV = (Map Pack appearances across all grid points) / (Total grid points × 3) × 100
```
Benchmarks: 0-5% invisible, 5-15% emerging, 15-30% competitive, 30-50% dominant, 50%+ market leader

## WVS (Weighted Visibility Score)
Position-weighted scoring that distinguishes quality of rankings.
```
Rank #1 = 100 points
Rank #2 = 50 points
Rank #3 = 30 points
Rank #4-10 = 10 points
Rank #11-20 = 0 points
Max WVS per keyword = grid_points × 100
```

## Client Health Score
```
Health = (Route scores × 40%) + (Task completion × 20%) + (Rank trajectory × 20%)
       + (Client engagement × 10%) + (Risk factor inverse × 10%)

90-100: Thriving (maintenance mode)
75-89:  Healthy (steady optimization)
60-74:  Needs attention (accelerate tasks)
40-59:  At risk (operator intervention)
<40:    Critical (emergency diagnostic)
```

---

## E-E-A-T Composite Score
*Detailed rubric: `ref:eeat-rubric`*
```
E-E-A-T = (Experience × 0.20) + (Expertise × 0.25) + (Authoritativeness × 0.25)
         + (Trustworthiness × 0.30)

Each component scored 0-10. Composite range: 0.0 - 10.0

YMYL adjustment (health, finance, legal, safety businesses):
  YMYL E-E-A-T = (E1 × 0.17) + (E2 × 0.21) + (A × 0.21) + (T × 0.41)

Feeds into: SPEC-010 (On-Page Content) as quality multiplier
  E-E-A-T >= 8.0 → SPEC-010 eligible for 9-10
  E-E-A-T 6.0-7.9 → SPEC-010 eligible for 7-8
  E-E-A-T 4.0-5.9 → SPEC-010 capped at 6
  E-E-A-T < 4.0 → SPEC-010 capped at 4
```

## GEO Composite Score (Generative Engine Optimization)
*Detailed framework: `cseo-geo` skill*
```
GEO = (Google_AO / 25 × 0.35) + (ChatGPT / 25 × 0.25) + (Perplexity / 25 × 0.20)
    + (Copilot / 25 × 0.10) + (Siri / 25 × 0.10)

Per-platform: 5 test queries × 0-5 score = 0-25 raw
Composite range: 0.0 - 1.0 → multiply by 10 for CATALYST scale (0-10)

Feeds into: SPEC-017 (LLM Visibility) score
  Direct replacement for basic AI Overview check in audit Section 8
```
