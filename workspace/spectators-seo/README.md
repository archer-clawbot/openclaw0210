# Spectators Bar & Grill - SEO Implementation

## ✅ Completed via API

### Meta Descriptions (Live)
All 3 location pages now have unique, optimized meta descriptions:

| Location | Page ID | Meta Description |
|----------|---------|------------------|
| **Sugar Land** | 2535 | Visit Spectators Bar & Grill in Sugar Land, TX! Sports bar with 50+ TVs, craft beer, wings & burgers. 1525 Lake Pointe Pkwy. Open daily. |
| **Riverstone** | 2559 | Spectators Bar & Grill Riverstone - Sugar Land's favorite sports bar! Great food, cold drinks, 50+ TVs. 18702 University Blvd. Call (346) 585-3078. |
| **Harvest Green** | 2740 | Spectators Bar & Grill Harvest Green in Richmond, TX. Sports bar with wings, burgers & craft beer. 18822 West Airport Blvd. Call (346) 391-8065. |

### SEO Titles (Live)
- Sugar Land: "Spectators Bar & Grill Sugar Land | Sports Bar in Sugar Land, TX"
- Riverstone: "Spectators Bar & Grill Riverstone | Sports Bar in Sugar Land, TX"
- Harvest Green: "Spectators Bar & Grill Harvest Green | Sports Bar in Richmond, TX"

### AIOSEO Plugin
- Activated via API (was inactive)

---

## ⚠️ Requires Manual Implementation

### LocalBusiness Schema Markup

The current site has **incorrect schema** - all 3 location pages show the Sugar Land address.

**Solution:** Add the PHP code from `location-schema-snippet.php` to the site.

#### Option 1: Code Snippets Plugin (Recommended)
1. Go to **Plugins > Add New**
2. Search for "Code Snippets" by Code Snippets Pro
3. Install and activate
4. Go to **Snippets > Add New**
5. Paste the contents of `location-schema-snippet.php`
6. Set to run on "Front-end only"
7. Save and activate

#### Option 2: Astra Custom Layouts
1. Go to **Astra > Custom Layouts**
2. Create new layout
3. Set Display Rules: Pages > Specific Pages > Select all 3 location pages
4. Add the schema code in a PHP hook

#### Option 3: Functions.php (Not Recommended)
Add to child theme's functions.php - not recommended as it will be lost on theme updates.

---

## Files in This Directory

- `sugar-land-schema.json` - JSON-LD schema for Sugar Land location
- `riverstone-schema.json` - JSON-LD schema for Riverstone location  
- `harvest-green-schema.json` - JSON-LD schema for Harvest Green location
- `location-schema-snippet.php` - Complete PHP snippet to add all 3 schemas

---

## Verification

After implementing schema, test at:
- https://search.google.com/test/rich-results
- https://validator.schema.org/

---

## Additional Recommendations

1. **Fix Instagram Feed** - Token expired error showing on all location pages
2. **Add Hours to Riverstone & Harvest Green** - Currently missing from page content
3. **Add Phone to Sugar Land** - Currently missing from page content
4. **Cross-link locations** - Add "Visit our other locations" section
5. **Add more unique content** - Each page should have 300+ words describing the specific location
