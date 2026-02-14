import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# Check all post types and their REST visibility
print("=== All registered post types (including hidden) ===")
r = requests.get(f"{BASE}/wp-json/wp/v2/types", auth=auth)
if r.status_code == 200:
    types = r.json()
    for name, data in types.items():
        rest_base = data.get('rest_base', 'N/A')
        print(f"  {name}: rest_base={rest_base}")

# WPCode Lite stores snippets as 'wpcode' CPT but may not expose via REST
# Let's try common REST bases
print("\n=== Try WPCode REST endpoints ===")
for slug in ['wpcode', 'wpcode-snippet', 'code-snippets', 'snippets', 'ihaf']:
    r = requests.get(f"{BASE}/wp-json/wp/v2/{slug}", auth=auth)
    if r.status_code == 200:
        data = r.json()
        print(f"  /wp/v2/{slug}: FOUND ({len(data)} items)")
    else:
        pass  # 404, skip

# OK, let's go with the most practical approach given our constraints:
# Deploy the CSS via a custom page that serves as a CSS endpoint
# Then reference it from the theme

# Actually - the MOST practical approach is simply to use the 
# insert-headers-and-footers plugin's "header scripts" setting
# This plugin lets you add code to the <head> section via a wp_option

# Check the IHAF plugin settings
print("\n=== Check IHAF/WPCode settings ===")
# WPCode Lite stores its header/footer scripts in options:
# ihaf_insert_header, ihaf_insert_footer, ihaf_insert_body
# These are wp_options that might be accessible

# Try to read current settings via the options approach
# Actually, we can use the WP REST API settings endpoint
# WPCode registers its options with the settings API

r = requests.get(f"{BASE}/wp-json/wp/v2/settings", auth=auth)
if r.status_code == 200:
    settings = r.json()
    # Check for any WPCode/IHAF related settings
    for k, v in settings.items():
        if 'ihaf' in k.lower() or 'wpcode' in k.lower() or 'header' in k.lower() or 'footer' in k.lower():
            val_preview = str(v)[:200] if v else 'empty'
            print(f"  {k} = {val_preview}")

# The settings endpoint only shows registered settings
# Let's check if WPCode has its own REST endpoints
print("\n=== Check WPCode-specific endpoints ===")
r = requests.get(f"{BASE}/wp-json/", auth=auth)
routes = r.json().get("routes", {})
wpcode_routes = [k for k in routes.keys() if any(w in k.lower() for w in ['wpcode', 'ihaf', 'snippet', 'insert-header'])]
print(f"WPCode routes: {wpcode_routes}")

# LAST RESORT: Direct database approach via a PHP snippet
# Let's create a PHP file that writes the CSS, upload it as a must-use plugin
# We can upload a .php file via... hmm, WordPress blocks PHP uploads

# Actually, let me try something: Create the CSS via a GenerateBlocks style
print("\n=== Try GenerateBlocks styles endpoint ===")
r = requests.get(f"{BASE}/wp-json/wp/v2/gblocks_styles", auth=auth)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    styles = r.json()
    print(f"Existing styles: {len(styles)}")
    for s in styles[:3]:
        print(f"  ID {s.get('id')}: {s.get('title', {}).get('rendered', 'N/A')}")

# Try creating a GenerateBlocks style with our CSS
print("\n=== Create GenerateBlocks global style ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/gblocks_styles",
    auth=auth,
    json={
        "title": "LC Global Styles",
        "content": css_content,
        "status": "publish"
    }
)
print(f"Status: {r.status_code}")
if r.status_code in (200, 201):
    style = r.json()
    print(f"Created style ID: {style.get('id')}")
else:
    print(f"Response: {r.text[:500]}")

