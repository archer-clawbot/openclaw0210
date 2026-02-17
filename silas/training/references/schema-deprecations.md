# Schema Deprecation & Restriction Reference
## Tracks Google's schema markup policy changes that affect CATALYST audits

Skills reference this file by ID: `ref:schema-deprecations`.

---

## Active Deprecations & Restrictions

### HowTo Rich Results — REMOVED (September 2023)
**Status:** Google no longer shows HowTo rich results in search.
**Impact:** HowTo schema markup is NOT invalid — it still provides semantic signal to AI systems. But it will NOT generate rich snippets in Google Search.
**CATALYST action:**
- Do NOT recommend adding HowTo schema for the purpose of rich results
- Existing HowTo schema can remain (no penalty for having it)
- For process/guide content, use HowTo schema only if targeting AI extraction (grounding boxes)
- In audit reports, mark HowTo as "Valid schema, no rich result eligibility"

### FAQ Rich Results — RESTRICTED (August 2023)
**Status:** FAQ rich results now only display for well-known, authoritative government and health websites. General business sites no longer get FAQ rich snippets.
**Impact:** FAQPage schema remains valid and still provides semantic signal, but no visual SERP enhancement for local businesses.
**CATALYST action:**
- Still recommend FAQPage schema — it helps AI systems and Gemini understand Q&A content
- Do NOT promise FAQ rich snippets to clients
- In audit reports, note: "FAQPage schema present — feeds AI systems but no longer generates rich snippets for this site category"
- Continue deploying FAQ schema on service pages for grounding box support (SPEC-007)

### ClaimReview — RESTRICTED (June 2025)
**Status:** Google tightened eligibility for ClaimReview schema. Only verified fact-checking organizations in the ClaimReview Publisher program can generate fact-check rich results.
**Impact:** Minimal for local businesses — ClaimReview was never part of the CATALYST stack.
**CATALYST action:** No action needed. Listed here for completeness.

---

## Schema Types: Current Rich Result Eligibility

| Schema Type | Rich Result? | AI Signal? | CATALYST Recommendation |
|-------------|-------------|------------|------------------------|
| LocalBusiness | Yes (Knowledge Panel) | Yes | Required — SPEC-008 core |
| FAQPage | No (restricted) | Yes | Recommended for AI/grounding |
| HowTo | No (removed) | Yes | Optional — AI signal only |
| BreadcrumbList | Yes | Yes | Required on all pages |
| AggregateRating | Yes (stars) | Yes | Required if reviews exist |
| Review | Yes (stars) | Yes | Required on testimonial pages |
| VideoObject | Yes (video carousel) | Yes | Required on pages with video |
| Service | No (no rich result) | Yes | Recommended for entity clarity |
| Product | Yes (merchant listings) | Yes | Required for product/pricing pages |
| Article | Yes (if news eligible) | Yes | Recommended for blog posts |
| Event | Yes | Yes | Required if business runs events |
| GeoCoordinates | No (embedded in LB) | Yes | Required as part of LocalBusiness |
| Organization | Yes (Knowledge Panel) | Yes | Use LocalBusiness subtype instead |
| ProductGroup | No (no rich result) | Yes | For businesses with product variants |
| OfferCatalog | No (embedded) | Yes | Recommended within LocalBusiness |

---

## Deprecation Detection in Audits

When `cseo-schema-validator` finds these schema types on a client site, apply these rules:

```
IF site has HowTo schema:
  → Note: "HowTo schema detected. Valid markup but Google removed HowTo rich results
    in Sept 2023. Schema still provides AI semantic signal. No action needed unless
    client expects rich snippets."

IF site has FAQPage schema:
  → Note: "FAQPage schema detected. Google restricted FAQ rich results to authoritative
    health/gov sites in Aug 2023. Schema still valuable for AI systems and grounding
    box support. Keep deployed."

IF site has ClaimReview schema:
  → Note: "ClaimReview schema detected. Unless this site is a verified fact-checking
    organization, this schema will not generate rich results. Consider removing to
    reduce markup bloat."

IF site uses deprecated properties:
  → Flag: "[Property] on [SchemaType] is deprecated. Replace with [current property]."
  → Common: 'logo' as string (should be ImageObject), 'telephone' format issues
```

---

## Version History

| Date | Change | Source |
|------|--------|--------|
| Sept 2023 | HowTo rich results removed | Google Search Central Blog |
| Aug 2023 | FAQ rich results restricted to authoritative sites | Google Search Central Blog |
| June 2025 | ClaimReview restricted to verified fact-checkers | Google Search Central Blog |
| Mar 2024 | INP replaced FID as Core Web Vital | Chrome team announcement |
