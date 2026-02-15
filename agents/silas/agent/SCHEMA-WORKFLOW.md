# SCHEMA IMPLEMENTATION WORKFLOW

## DECISION TREE (CRITICAL)

When you receive a schema-related task, the **phrasing determines the workflow**:

---

### OPTION 1: FULL DEPLOYMENT
**Trigger phrases:**
- "Do schema on [site]"
- "Implement schema on [site]"  
- "Add schema to [site]"
- "Fix schema on [site]"
- Any action verb implying deployment

**Your Workflow:**
1. ✅ Run your CATALYST audit (if not already done)
2. ✅ Identify missing/broken schema markup
3. ✅ Create technical handoff document with implementation instructions
4. ✅ **End your task with:** "NEXT STEP: Route to Wrench for deployment" (this signals Archer to auto-route)
5. ✅ Save deliverable to `deliverables/{client-slug}/silas/{date}-schema-audit.md`

**Do NOT:**
- ❌ Implement schema yourself (that's Wrench's job)
- ❌ Stop after creating the handoff doc (signal routing to Wrench)

---

### OPTION 2: DOCUMENTATION ONLY
**Trigger phrases:**
- "Prepare schema for [site]"
- "Schema handoff for [site]"
- "Create schema documentation for [site]"
- Any phrasing that implies preparation, not deployment

**Your Workflow:**
1. ✅ Run your CATALYST audit (if not already done)
2. ✅ Identify missing/broken schema markup
3. ✅ Create technical handoff document with implementation instructions
4. ✅ Save deliverable to `deliverables/{client-slug}/silas/{date}-schema-handoff.md`
5. ✅ **End your task with:** "Handoff doc complete. No deployment requested." (this signals Archer to STOP, not route to Wrench)

**Do NOT:**
- ❌ Signal routing to Wrench
- ❌ Implement schema yourself

---

## WHY THIS MATTERS

**Operator clarity:** Cody wants to be able to say "do schema" and have it fully deployed, or "prepare schema" and get just the doc. This workflow distinction prevents:
- ❌ You doing work and Wrench redoing it
- ❌ Archer routing when deployment wasn't wanted
- ❌ Incomplete workflows (audit but no deployment when deployment was expected)

---

## HANDOFF DOCUMENT REQUIREMENTS

Whether for deployment or documentation only, your handoff doc MUST include:

1. **Current State Assessment**
   - What schema exists now (if any)
   - What's correct
   - What's broken/missing
   - Schema coverage score (0-100%)

2. **Required Schema Types**
   - Organization
   - LocalBusiness
   - Product (for service pages with pricing)
   - FAQPage (for FAQ sections)
   - BreadcrumbList
   - Article (for blog posts)
   - WebPage (for standard pages)
   - Service (for service-specific pages)

3. **Implementation Instructions (for Wrench)**
   - Exact schema JSON-LD code blocks
   - Where to place each schema type (which pages/templates)
   - WordPress implementation method (RankMath, custom code, plugin)
   - Testing instructions (Google Rich Results Tool URLs)

4. **Priority Ranking**
   - Tier 1: Critical schema (Organization, LocalBusiness)
   - Tier 2: High-impact schema (Product, FAQPage)
   - Tier 3: Nice-to-have schema (BreadcrumbList, Article)

5. **Expected Outcome**
   - Schema coverage before/after (e.g., 35% → 95%)
   - Rich results eligibility
   - SERP enhancement potential

---

## EXAMPLE TASK COMPLETIONS

### Full Deployment Example:
```
Task Complete: LocalCatalyst Schema Audit + Handoff

Schema coverage: 35% → 95% (after deployment)

Missing schema identified:
- FAQPage (20+ pages with FAQ sections)
- Product (6 service pages with pricing)
- BreadcrumbList (all pages)

Handoff document created with implementation instructions for all missing schema types.

**NEXT STEP: Route to Wrench for deployment.**

Deliverable: deliverables/localcatalyst/silas/2026-02-14-schema-audit.md
```

### Documentation Only Example:
```
Task Complete: LocalCatalyst Schema Handoff Doc

Schema coverage: 35% (current state)
Potential coverage: 95% (if recommendations implemented)

Missing schema identified:
- FAQPage (20+ pages with FAQ sections)  
- Product (6 service pages with pricing)
- BreadcrumbList (all pages)

Handoff document created with implementation instructions for all missing schema types.

**Handoff doc complete. No deployment requested.**

Deliverable: deliverables/localcatalyst/silas/2026-02-14-schema-handoff.md
```

---

## INTEGRATION WITH CATALYST AUDIT

If you're running a full CATALYST audit and schema is part of it:
- Schema analysis is Section 7 of your audit report
- Always include schema in technical handoff docs
- Schema score contributes to overall technical SEO score (68/100 in your framework)

If operator specifically requests schema work separate from a full audit:
- Run focused schema audit only
- Create standalone handoff doc (not full CATALYST report)
- Faster turnaround (1-2 hours vs. 8+ hours for full audit)

---

**Last Updated:** 2026-02-14  
**Author:** Archer (routing orchestration)  
**Purpose:** Permanent workflow definition per operator request
