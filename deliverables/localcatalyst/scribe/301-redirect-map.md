# LocalCatalyst 301 Redirect Map
**Date:** 2026-02-11
**Purpose:** URL migration from legacy agency site structure to platform model

---

## Service URL Redirects

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/google-business-profile-management/` | `/services/gbp-optimization/` | Service rename |
| `/citation-building-services/` | `/services/citation-building/` | Path standardization |
| `/seo-audit-services/` | `/services/seo-audit/` | Path standardization |
| `/on-page-seo-services/` | `/services/content-pages/` | Service reframed as product |
| `/link-building-services/` | `/managed/` | Folded into managed SEO |
| `/reputation-management-services/` | `/services/` | Service discontinued — redirect to services index |
| `/seo-website-design/` | `/services/website-build/` | Service rename |
| `/technical-seo-services/` | `/services/seo-audit/` | Merged into SEO audit product |
| `/seo-content-strategy/` | `/services/content-pages/` | Service reframed as product |
| `/local-seo-services/` | `/services/` | Generic service → services index |
| `/services/local-seo/` | `/services/` | Path consolidation |
| `/services/technical-seo/` | `/services/seo-audit/` | Merged into SEO audit product |
| `/services/link-building/` | `/managed/` | Folded into managed SEO |

---

## Order URL Redirects

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/order/topical-map/` | `/services/topical-map/order/` | URL pattern standardization |
| `/order/seo-audit/` | `/services/seo-audit/order/` | URL pattern standardization |
| `/order/seo-audit/?tier=standard` | `/services/seo-audit/order/?tier=standard` | Preserve query params |
| `/order/seo-audit/?tier=comprehensive` | `/services/seo-audit/order/?tier=comprehensive` | Preserve query params |
| `/order/content-pages/` | `/services/content-pages/order/` | URL pattern standardization |
| `/order/schema-markup/` | `/services/schema-markup/order/` | URL pattern standardization |
| `/order/gbp-optimization/` | `/services/gbp-optimization/order/` | URL pattern standardization |
| `/order/gbp-optimization/?tier=standard` | `/services/gbp-optimization/order/?tier=standard` | Preserve query params |
| `/order/gbp-optimization/?tier=premium` | `/services/gbp-optimization/order/?tier=premium` | Preserve query params |
| `/order/monthly-content-starter/` | `/services/monthly-content/order/?tier=starter` | Tier moved to query param |
| `/order/monthly-content-growth/` | `/services/monthly-content/order/?tier=growth` | Tier moved to query param |
| `/order/monthly-content-authority/` | `/services/monthly-content/order/?tier=authority` | Tier moved to query param |

---

## Blog URL Redirects

| Old URL Pattern | New URL Pattern | Notes |
|---------|---------|-------|
| `/blog/*` | `/learn/*` | Entire blog section renamed to /learn/ |

---

## Content Sub-Path Redirects

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/seo-content-strategy/service-page-copywriting/` | `/services/content-pages/` | Cluster page → product page |
| `/seo-content-strategy/topical-authority/` | `/learn/how-to-build-topical-authority/` | Cluster page → blog/learn |
| `/contact/` | Keep active | General contact still needed for FAQ/support |
| `/schedule/` | `/managed/#schedule` | Scheduler embedded on managed page |

---

## Implementation Notes

- All redirects should be 301 (permanent)
- `/blog/*` → `/learn/*` should be handled as a wildcard/pattern redirect preserving the slug
- Query parameters should be preserved through redirects where applicable
- Test each redirect after implementation to confirm no redirect chains
- Monitor 404 reports in Google Search Console for 30 days post-migration
