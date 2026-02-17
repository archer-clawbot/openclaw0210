# CSEO Skill: Content Quality
## E-E-A-T evaluation (Sept 2025 guidelines) + AI content detection signals
## Origin: claude-seo `/seo eeat` — adapted for CATALYST framework

---

## When This Skill Activates

Injected by the awareness engine when task context matches:
- E-E-A-T evaluation, content quality assessment
- SPEC-010 deep analysis
- Content audit, AI content concerns, trust signals

---

## Capabilities

### 1. E-E-A-T Composite Scoring

Evaluate each E-E-A-T component using the rubric from `ref:eeat-rubric`:

```
E-E-A-T Scorecard — [Business Name]
══════════════════════════════════════

Experience (E1):      [X/10] × 0.20 = [weighted]
  Evidence: [1-2 sentence justification citing specific signals found/missing]

Expertise (E2):       [X/10] × 0.25 = [weighted]
  Evidence: [1-2 sentence justification]

Authoritativeness (A): [X/10] × 0.25 = [weighted]
  Evidence: [1-2 sentence justification]

Trustworthiness (T):  [X/10] × 0.30 = [weighted]
  Evidence: [1-2 sentence justification]

────────────────────────────────────
Composite E-E-A-T Score:  [X.X/10]
────────────────────────────────────

YMYL category: [Yes — specify / No]
YMYL-adjusted score: [X.X/10 or N/A]
```

### 2. Per-Component Signal Inventory

For each E-E-A-T component, catalog what's present and what's missing:

**Experience signals checklist:**
- [ ] Real photos of completed work (not stock)
- [ ] Case studies with specific outcomes
- [ ] Before/after documentation
- [ ] Video content of actual work
- [ ] Customer testimonials with verifiable details
- [ ] Project galleries or portfolios
- [ ] Process walkthroughs

**Expertise signals checklist:**
- [ ] Professional licenses displayed (with numbers)
- [ ] Industry certifications shown
- [ ] Staff bios with qualifications
- [ ] Educational content depth
- [ ] Industry-specific terminology accuracy
- [ ] Pricing transparency with factor explanations
- [ ] Manufacturer partnerships/authorized dealer status

**Authoritativeness signals checklist:**
- [ ] Review volume (100+) and rating (4.5+)
- [ ] Citation count (30+) with NAP consistency
- [ ] Press/media mentions
- [ ] Industry awards or recognition
- [ ] Association memberships
- [ ] BBB accreditation
- [ ] Backlinks from relevant domains
- [ ] Featured in local "best of" lists

**Trustworthiness signals checklist:**
- [ ] HTTPS with valid SSL
- [ ] Privacy policy (accessible, current)
- [ ] Terms of service
- [ ] Physical address displayed (matches GBP)
- [ ] Phone number displayed (matches GBP)
- [ ] Functional contact form
- [ ] NAP consistency across all platforms
- [ ] Review response rate (70%+)
- [ ] Service guarantees or warranties
- [ ] Refund/cancellation policies

### 3. AI Content Detection Signals

Evaluate whether content shows signs of mass-generated AI content (a quality risk):

**Positive AI content indicators (concerning):**
- Uniform paragraph length across all pages
- Generic opening patterns ("In today's fast-paced world...")
- Lack of specific local details, pricing, or real examples
- Perfect grammar but zero personality or voice
- Identical content structure across all service/city pages
- No first-person experience or anecdotes
- Missing specific data (exact prices, timelines, measurements)

**Assessment output:**
```
AI Content Risk: [None / Low / Medium / High]
Evidence: [specific patterns observed]
Recommendation: [action if Medium/High]
```

**Important:** The concern is not whether AI was used to draft content — it's whether the content adds genuine value. AI-assisted content with real data, local specifics, and expertise signals is fine. Mass-generated thin content without those signals is the problem.

---

## Audit Output Format

When producing content quality findings for CATALYST audit Section 6, generate the E-E-A-T scorecard as a subsection:

```
### 6.4 E-E-A-T Assessment

[Insert E-E-A-T Scorecard from capability #1]

**Top 3 E-E-A-T gaps:**
1. [Gap + recommended action + spec reference]
2. [Gap + recommended action + spec reference]
3. [Gap + recommended action + spec reference]

**AI content risk:** [None/Low/Medium/High] — [1-sentence rationale]
```

---

## Scoring Impact

E-E-A-T assessment feeds into SPEC-010 (On-Page Content) score as a quality multiplier:

| E-E-A-T Composite | SPEC-010 Impact |
|-------------------|-----------------|
| 8.0+ | Eligible for 9-10 (if content volume/optimization also strong) |
| 6.0-7.9 | Eligible for 7-8 |
| 4.0-5.9 | Caps SPEC-010 at 6 regardless of optimization |
| < 4.0 | Caps SPEC-010 at 4 — trust and credibility issues override content quality |

---

## References
- `ref:eeat-rubric` — detailed scoring criteria and weights
- `ref:quality-gates` — programmatic SEO quality thresholds (related concern)
