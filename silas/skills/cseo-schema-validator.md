# CSEO Skill: Schema Validator
## Schema detection, validation, deprecation awareness, and JSON-LD generation
## Origin: claude-seo `/seo schema` — adapted for CATALYST framework

---

## When This Skill Activates

Injected by the awareness engine when task context matches:
- Schema audit, schema validation, structured data
- SPEC-008 evaluation
- JSON-LD generation or correction

---

## Capabilities

### 1. Schema Detection
Scan page source (from Scout crawl data or direct fetch) for:
- `<script type="application/ld+json">` blocks — parse and catalog each
- Microdata (`itemscope`, `itemtype`, `itemprop` attributes)
- RDFa (`typeof`, `property` attributes)
- Note: JSON-LD is the preferred format. Microdata/RDFa are legacy but valid.

**Detection output format:**
```
Page: [URL]
Schema found:
  1. [SchemaType] via [JSON-LD/Microdata/RDFa]
     - Key properties: [list populated fields]
     - Missing required: [list missing fields per template]
     - Validation: [Valid/Errors — list errors]
```

### 2. Deprecation Check
Cross-reference detected schema against `ref:schema-deprecations`:
- Flag HowTo schema with deprecation note (no rich result since Sept 2023)
- Flag FAQPage schema with restriction note (no rich results for general sites since Aug 2023)
- Flag ClaimReview if site is not a verified fact-checker
- Flag any deprecated properties on otherwise valid types

### 3. Completeness Validation
Compare detected schema against CATALYST requirements (SPEC-008):

**Required stack for local businesses:**
| Schema Type | Where | Required? |
|-------------|-------|-----------|
| LocalBusiness (or subtype) | Homepage + contact page | Required |
| Service | Each service page | Required |
| FAQPage | Pages with FAQ sections | Recommended |
| BreadcrumbList | Every page | Required |
| VideoObject | Pages with embedded video | Required |
| AggregateRating | If reviews displayed | Required |
| Article | Blog posts | Recommended |
| GeoCoordinates | Within LocalBusiness | Required |
| Event | Event pages | If applicable |

### 4. NAP Consistency in Schema
Verify that schema markup NAP matches across:
- All LocalBusiness instances on the site
- The client's GBP listing
- Other citation sources (from Scout/audit data)

Flag any mismatches: `"Schema NAP mismatch: [field] is '[schema value]' but GBP shows '[gbp value]'"`

### 5. JSON-LD Generation
When schema is missing or incomplete, generate corrected markup using templates from `ref:schema-templates`. Rules:
- Use the most specific `@type` available (Plumber, not LocalBusiness, if the client is a plumber)
- All facts MUST match GBP listing exactly
- Use consistent `@id` references across all schema blocks
- Include `sameAs` array with all known platform URLs
- Phone in E.164 format (+1XXXXXXXXXX)
- Dates in ISO 8601 format

---

## Audit Output Format

When producing schema findings for CATALYST audit Section 5.3, use this enhanced format:

```
### 5.3 Schema Markup (SPEC-008)

| Schema Type | Present? | Valid? | Rich Result Eligible? | Notes |
|------------|----------|--------|----------------------|-------|
| LocalBusiness | [Yes/No] | [Yes/No] | Yes (Knowledge Panel) | [completeness + subtype used] |
| FAQPage | [Yes/No] | [Yes/No] | No (restricted Aug 2023) | [still useful for AI signal] |
| BreadcrumbList | [Yes/No] | [Yes/No] | Yes | |
| AggregateRating | [Yes/No] | [Yes/No] | Yes (stars) | |
| Service | [Yes/No] | [Yes/No] | No (semantic only) | |
| VideoObject | [Yes/No] | [Yes/No] | Yes (video carousel) | |
| Article | [Yes/No] | [Yes/No] | Conditional | |
| GeoCoordinates | [Yes/No] | [Yes/No] | No (embedded) | |
| HowTo | [Yes/No] | [Yes/No] | No (removed Sept 2023) | [AI signal only] |

**Schema health:** [X/9 required types present] — [summary assessment]
**NAP consistency in schema:** [Consistent/Mismatch — details]
**Deprecated schema detected:** [None / list with notes]
```

---

## Scoring Impact

Schema validation results feed into SPEC-008 score:
- 0: No schema markup at all
- 3: Basic LocalBusiness only, or schema with validation errors
- 5: LocalBusiness + 1-2 other types, minor issues
- 7: Complete required stack, valid, consistent NAP
- 10: Full suite including all recommended types, no errors, consistent @id references, all deprecated types annotated

---

## References
- `ref:schema-deprecations` — deprecation and restriction details
- `ref:schema-templates` — JSON-LD templates for generation
- `ref:data-sources` — `source:schema-test` for validation tools
