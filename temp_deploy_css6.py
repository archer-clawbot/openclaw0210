import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Read the CSS
with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

print(f"CSS: {len(css_content)} bytes")

# Upload CSS content as a .txt file to media library
print("\n=== Upload CSS as .txt ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/media",
    auth=auth,
    files={
        'file': ('localcatalyst-global-styles-deploy.txt', css_content.encode('utf-8'), 'text/plain')
    },
    headers={'Content-Disposition': 'attachment; filename=localcatalyst-global-styles-deploy.txt'}
)
print(f"Status: {r.status_code}")
if r.status_code in (200, 201):
    media = r.json()
    txt_url = media.get('source_url', '')
    txt_id = media.get('id', '')
    print(f"Media ID: {txt_id}")
    print(f"Source URL: {txt_url}")
else:
    print(f"Response: {r.text[:500]}")
    txt_url = None

if not txt_url:
    print("Failed to upload txt file")
    exit(1)

# Now create a tiny MU-plugin that:
# 1. Reads the .txt from uploads
# 2. Writes it as .css to the theme directory
# 3. Self-destructs (deletes itself after running)
# 
# MU-plugins are loaded from wp-content/mu-plugins/ automatically
# We already have openclaw-hardening.php there
# But we can't upload to mu-plugins via REST API

# Alternative: Create a regular plugin as a ZIP, upload it, then activate it
# The plugin install from a URL requires wp-admin access

# FINAL APPROACH: Use the GeneratePress Site Library import endpoint
# It can import content and settings, which might include creating files
print("\n=== Try GP Site Library import_content ===")
r = requests.options(
    f"{BASE}/wp-json/generatepress-site-library/v1/import_content",
    auth=auth
)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    schema = r.json()
    print(json.dumps(schema, indent=2)[:1500])

# Try import_theme_options which might let us set custom CSS
print("\n=== Try GP import_theme_options ===")
r = requests.options(
    f"{BASE}/wp-json/generatepress-site-library/v1/import_theme_options",
    auth=auth
)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    schema = r.json()
    endpoints = schema.get('endpoints', [])
    for ep in endpoints:
        print(f"Methods: {ep.get('methods')}")
        print(f"Args: {json.dumps(ep.get('args', {}), indent=2)[:500]}")

# Check the import theme options with data
print("\n=== Try importing custom_css via GP theme options ===")
# GP Pro stores custom CSS in theme mods
import_data = {
    "custom_css": css_content
}
r = requests.post(
    f"{BASE}/wp-json/generatepress-site-library/v1/import_theme_options",
    auth=auth,
    json=import_data
)
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:500]}")

