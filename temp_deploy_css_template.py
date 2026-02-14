import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Check existing templates
print("=== Templates ===")
r = requests.get(f"{BASE}/wp-json/wp/v2/templates", auth=auth)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    templates = r.json()
    print(f"Count: {len(templates)}")
    for t in templates:
        print(f"  {t.get('id')} | {t.get('slug')} | {t.get('title',{}).get('rendered','N/A')}")

print("\n=== Template Parts ===")
r = requests.get(f"{BASE}/wp-json/wp/v2/template-parts", auth=auth)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    parts = r.json()
    print(f"Count: {len(parts)}")
    for p in parts:
        print(f"  {p.get('id')} | {p.get('slug')} | {p.get('area')} | {p.get('title',{}).get('rendered','N/A')}")

# Templates don't work for classic (non-block) themes anyway
# This site uses GeneratePress which is a classic theme

# FINAL CLEAN APPROACH:
# Use the WP REST API to update the theme's global-styles custom CSS
# In WordPress 6.x, even classic themes can have a `wp_global_styles` post
# that stores custom CSS in the `styles.css` property
# 
# The approach: find the wp_global_styles post ID and update its `styles.css`

# Let me search for it by querying all post types
print("\n=== Search for wp_global_styles posts ===")
# We can use a database-level query via a custom endpoint
# But we don't have one...

# Actually let me try: the global-styles/themes/localcatalyst returned data
# That data comes from a wp_global_styles post in the database
# The post_name is 'wp-global-styles-localcatalyst'
# Let's try to query by name
r = requests.get(
    f"{BASE}/wp-json/wp/v2/global-styles",
    auth=auth,
    params={"slug": "wp-global-styles-localcatalyst"}
)
print(f"Global styles by slug: {r.status_code}")
print(f"Response: {r.text[:500]}")

# Try querying by post_name using the standard posts endpoint
r = requests.get(
    f"{BASE}/wp-json/wp/v2/posts",
    auth=auth,
    params={"slug": "wp-global-styles-localcatalyst", "status": "any", "type": "wp_global_styles"}
)
print(f"\nPosts by slug: {r.status_code}")
print(f"Response: {r.text[:200]}")

# The issue is global-styles as a REST endpoint requires the post ID
# and the listing endpoint doesn't seem to work
# Let me try batch querying IDs to find the global styles post
# It's usually created when the theme is first activated
# The Customizer Additional CSS post (custom_css) would also work

# Try to find posts by type - use the types we know
# Global styles CPT rest_base is 'global-styles'  
# Let's try a direct approach: use the WP_Query via a search
print("\n=== Try to find global styles via search ===")
for post_type_rest in ['global-styles']:
    for slug in ['wp-global-styles-localcatalyst', 'localcatalyst']:
        r = requests.get(
            f"{BASE}/wp-json/wp/v2/{post_type_rest}",
            auth=auth,
            params={"slug": slug}
        )
        if r.status_code == 200 and r.json():
            print(f"Found via {post_type_rest}?slug={slug}: {r.json()}")
            break
        else:
            pass

# OK, let me try something I should have tried much earlier
# Use the Customizer API via REST 
# wp-json/wp/v2/global-styles/{id} supports updating styles.css
# But we need the ID
# 
# The key insight: when a global styles post doesn't exist yet,
# WordPress auto-generates one on first access with /themes/localcatalyst
# The auto-generated one doesn't have a persistent ID
# We need to CREATE one via POST

print("\n=== Try to CREATE a global-styles post ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/global-styles",
    auth=auth,
    json={
        "title": {"raw": "Custom Styles"},
        "slug": "wp-global-styles-localcatalyst",
        "styles": {
            "css": "/* test CSS */"
        }
    }
)
print(f"Create global styles: {r.status_code}")
print(f"Response: {r.text[:500]}")

