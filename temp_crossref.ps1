# Live page slugs (excluding parent 'learn' page)
$liveSlugs = @(
    'near-me-search-optimization','xml-sitemap-best-practices','what-to-expect-from-seo-services',
    'what-makes-a-good-backlink','what-is-local-seo','what-is-an-seo-audit','what-are-local-citations',
    'website-speed-conversion-rates','ux-signals-seo','top-citation-sources','title-tag-optimization',
    'seo-vs-ppc','seo-red-flags','seo-pricing-guide','seo-glossary','seo-friendly-website-design-tips',
    'seo-automation','seo-audit-template','schema-markup-local-business','schema-markup-guide',
    'robots-txt-guide','review-management-best-practices','responding-to-negative-reviews',
    'redirect-management-seo','questions-to-ask-seo-company','on-page-seo-checklist',
    'nap-inconsistency-fix','nap-consistency','map-pack-ranking-guide','local-seo-vs-organic-seo',
    'local-seo-trends-2026','local-seo-statistics','local-seo-roi','local-seo-ranking-factors-2026',
    'local-seo-for-small-business','local-seo-checklist','local-link-building-strategies',
    'local-content-marketing-ideas','link-building-strategies-local-seo','link-building-mistakes',
    'keyword-placement-best-practices','javascript-seo-best-practices','https-ssl-seo',
    'how-to-optimize-google-business-profile','how-to-get-more-google-reviews','how-to-fix-crawl-errors',
    'how-to-earn-local-backlinks','how-to-choose-an-seo-agency','how-to-build-topical-authority',
    'how-often-seo-audit','how-long-does-local-seo-take','how-google-search-works',
    'holiday-local-seo-strategy','google-updates-q1-2026','google-reviews-impact-seo',
    'google-reviews-generation-strategy','google-business-profile-review-strategy',
    'google-business-profile-checklist','google-business-profile-categories','google-algorithm-updates',
    'google-ai-overviews-local-seo','gbp-suspension-recovery','gbp-products-services-setup',
    'gbp-posts-templates','gbp-optimization-checklist','gbp-insights-analytics','future-of-local-seo',
    'fake-google-reviews-removal','eeat-content-guidelines','duplicate-content-solutions',
    'do-citations-still-matter','diy-seo-vs-hiring-agency','diy-seo-audit-guide',
    'crawl-budget-optimization','cornerstone-content-strategy','core-web-vitals-optimization',
    'content-silos-seo','content-pruning-seo','content-optimization-framework','content-gap-analysis',
    'competitor-backlink-analysis','citation-audit-guide','best-wordpress-seo-plugins',
    'anchor-text-optimization','ai-seo-tools','ai-powered-seo','ai-content-seo',
    'internal-linking-strategy','search-intent','technical-seo-checklist','citation-building-guide',
    'how-we-write-content','gbp-optimization-guide','what-is-schema-markup','keyword-research-process',
    'topical-authority'
)

# Content plan file slugs (from filenames)
$planSlugs = @(
    'ai-content-seo','ai-powered-seo','ai-seo-tools','anchor-text-optimization',
    'best-wordpress-seo-plugins','citation-audit-guide','citation-building-guide',
    'competitor-backlink-analysis','content-gap-analysis','content-optimization-framework',
    'content-pruning-seo','content-silos-seo','core-web-vitals-optimization',
    'cornerstone-content-strategy','crawl-budget-optimization','diy-seo-audit-guide',
    'diy-seo-vs-hiring-agency','do-citations-still-matter','duplicate-content-solutions',
    'eeat-content-guidelines','fake-google-reviews-removal','future-of-local-seo',
    'gbp-insights-analytics','gbp-optimization-checklist','gbp-posts-templates',
    'gbp-products-services-setup','gbp-suspension-recovery','google-ai-overviews-local-seo',
    'google-algorithm-updates','google-business-profile-categories','google-business-profile-checklist',
    'google-business-profile-review-strategy','google-reviews-generation-strategy',
    'google-reviews-impact-seo','google-updates-q1-2026','holiday-local-seo-strategy',
    'how-google-search-works','how-long-does-local-seo-take','how-often-seo-audit',
    'how-to-build-topical-authority','how-to-choose-an-seo-agency','how-to-earn-local-backlinks',
    'how-to-fix-crawl-errors','how-to-get-more-google-reviews','how-to-optimize-google-business-profile',
    'https-ssl-seo','internal-linking-strategy','javascript-seo-best-practices',
    'keyword-placement-best-practices','keyword-research-process','link-building-mistakes',
    'link-building-strategies-local-seo','local-content-marketing-ideas','local-link-building-strategies',
    'local-seo-checklist','local-seo-for-small-business','local-seo-ranking-factors-2026',
    'local-seo-roi','local-seo-statistics','local-seo-trends-2026','local-seo-vs-organic-seo',
    'map-pack-ranking-guide','nap-consistency','nap-inconsistency-fix','near-me-search-optimization',
    'on-page-seo-checklist','questions-to-ask-seo-company','redirect-management-seo',
    'responding-to-negative-reviews','review-management-best-practices','robots-txt-guide',
    'schema-markup-guide','schema-markup-local-business','seo-audit-template','seo-automation',
    'seo-friendly-website-design-tips','seo-glossary','seo-pricing-guide','seo-red-flags','seo-vs-ppc',
    'technical-seo-checklist','title-tag-optimization','top-citation-sources','ux-signals-seo',
    'website-speed-conversion-rates','what-are-local-citations','what-is-an-seo-audit',
    'what-is-local-seo','what-makes-a-good-backlink','what-to-expect-from-seo-services',
    'xml-sitemap-best-practices','content-optimization-framework','writing-services'
)

Write-Host "=== LIVE PAGES WITH NO CONTENT PLAN FILE ==="
foreach ($slug in $liveSlugs) {
    if ($slug -notin $planSlugs) {
        Write-Host "  NO PLAN: $slug"
    }
}

Write-Host ""
Write-Host "=== CONTENT PLAN FILES WITH NO LIVE PAGE ==="
foreach ($slug in $planSlugs) {
    if ($slug -notin $liveSlugs) {
        Write-Host "  NO PAGE: $slug"
    }
}
