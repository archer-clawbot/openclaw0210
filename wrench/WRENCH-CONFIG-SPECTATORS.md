# WRENCH CLIENT CONFIG — Spectators Bar & Grill

## Site Details
- **URL:** https://spectatorsbargrill.com
- **WordPress User:** spartan (ID: 1, admin)
- **Auth Method:** Application Password (Basic Auth)
- **REST API Base:** https://spectatorsbargrill.com/wp-json/wp/v2/
- **WooCommerce:** Installed (cart/checkout/shop pages present)
- **Staging URL:** None (deploy direct to production)

## Location Pages
| Page ID | Slug | Title | Parent |
|---------|------|-------|--------|
| 2524 | locations | Locations | — |
| 2535 | spectators-sugar-land | Sugar Land | 2524 |
| 2559 | spectators-riverstone | Riverstone | 2524 |
| 2740 | harvest-green | Harvest Green | 2524 |

## Menu Pages
| Page ID | Slug | Title | Location |
|---------|------|-------|----------|
| 536 | food-menu | Food Menu | Sugar Land (assumed) |
| 683 | cocktail-menu | Cocktail Menu | Sugar Land (assumed) |
| 2345 | breakfast-menu | Breakfast Menu | Unknown |
| 2308 | brunch-menu | Brunch Menu | Unknown |
| 2468 | lunch-specials | Lunch Specials | Unknown |
| 2282 | special-menus | Special Menus | Unknown |
| 2334 | family-meal-packs | Family Meal Packs | Unknown |
| 2599 | riverstone-food-menu | Riverstone Food Menu | Riverstone |
| 2601 | riverstone-menus | Riverstone Menus | Riverstone |

## Other Pages
| Page ID | Slug | Title | Notes |
|---------|------|-------|-------|
| 1420 | home | Home | Homepage |
| 891 | contact | Contact | |
| 2255 | gallery | Gallery | |
| 2422 | catering-sugar-land | Catering | Sugar Land only |
| 2577 | events-calendar | Events Calendar | |
| 2208 | open-positions | Open Positions | Job listings parent |

## SEO Gaps Identified
1. No neighborhood/service area pages (SPEC-006 silo missing)
2. No blog or content hub
3. Harvest Green has no dedicated menu pages
4. Menu pages not organized under location parents
5. Catering page only for Sugar Land — no Riverstone or Harvest Green
6. No schema markup detected (needs verification)
7. No dedicated happy hour / daily specials per location
8. Site name and description empty in WP settings

## Deployment Notes
- Always clear cache after changes
- Test mobile rendering after any page edits
- Coordinate NAP with Herald (GBP) and Citadel (citations)
