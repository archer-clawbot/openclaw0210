# Mandatory Audit Output Protocol

When you receive ANY audit request (new client intake, prospect audit, or periodic re-audit), you MUST follow these steps:

## Step 0a: GBP Discovery Protocol

Before auditing, you MUST locate the client's Google Business Profile. Use this escalation chain — do NOT mark GBP as "not found" until all steps are exhausted:

1. **Maps API search**: Search Google Maps for the exact business name + city (e.g., "Prime Dumpster Chicago"). If found, capture the CID/place ID.
2. **Domain search**: Search Google Maps for the domain name (e.g., "primedumpster.com"). Google often indexes the website URL in the GBP.
3. **Website scan (CRITICAL FALLBACK)**: Use Scout's crawl data or fetch the homepage yourself. Look for:
   - Embedded Google Maps iframes (`maps.google.com/maps?` or `google.com/maps/embed`)
   - Links to `google.com/maps/place/` or `maps.app.goo.gl/`
   - Schema markup with `@type: LocalBusiness` containing `sameAs` or `hasMap` URLs pointing to Google Maps
   - Any `data-cid` or `ludocid` parameters in embedded map URLs — these ARE the GBP CID
4. **Brand name variations**: Try alternate business name spellings, abbreviations, or DBA names found on the website.

If step 3 finds an embedded GBP, use that as the authoritative profile. Many businesses embed their GBP on the homepage or contact page but don't rank well enough to appear in a generic Maps search.

**Only after all 4 steps fail** may you mark GBP as "NOT FOUND — requires manual verification."

## Step 0b: Dispatch Scout for Site Crawl (BLOCKING)

**Before writing a single line of audit content**, dispatch Scout to perform a full technical site crawl:

```
SCOUT SITE CRAWL REQUEST
URL: [client website URL]
Business Name: [business name]
Service Area: [city, state]
```

Scout will crawl every page, parse the HTML, and return a structured report with exact title tags, meta descriptions, OG tags, image alt text coverage, schema markup, robots.txt, sitemap data, broken links, and page-by-page inventory.

**Do NOT proceed to writing the audit until Scout's crawl report is in hand.** This is what eliminates UNKNOWN values from the report. Every on-page data point in the audit should come from Scout's crawl data — not from guessing or marking UNKNOWN.

If Scout's crawl is incomplete or fails on certain pages, mark those specific items as "LIMITED DATA — crawl incomplete" rather than "UNKNOWN."

## Steps 1-7: Write the Audit

1. **Read the template first:** Load `APEX-AUDIT-TEMPLATE.md` from your workspace directory using the `read` tool before writing any audit content.
2. **Follow every section.** The template has 13 numbered sections. All 13 are required. If you cannot obtain data for a section, mark it "DATA UNAVAILABLE — requires [tool/access]" rather than omitting it.
3. **Use the Master Scorecard format** (load `skills/scoring-framework.md`) with 0-10 scoring per SPEC item, route averages, and the weighted overall formula: Route 1 (25%) + Route 2 (30%) + Route 4 (25%) + Route 5 (10%) + AI/XP (10%).
4. **Every score needs a 1-sentence justification.** No naked numbers.
5. **Use the Priority Matrix** with Impact × (6 - Effort) scoring, not just priority labels.
6. **End with the Agent Dispatch Queue** using the standardized handoff format for Archer.
7. **Never freestyle the format.** The template exists so every audit is consistent, comparable, and client-ready.

If the template file is not found in your workspace, alert the operator that `APEX-AUDIT-TEMPLATE.md` is missing and needs to be restored before you can produce a compliant audit.
