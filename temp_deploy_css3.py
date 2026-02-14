import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Read the CSS file  
with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# Approach: Upload CSS as .txt, then enqueue it via functions.php modification
# Actually, let's try something better - upload the CSS content as a custom page
# that WordPress will cache and serve

# Best approach: Use the Hostinger REST API or check if SSH/SFTP access is available via API

# Actually - the uploaded ZIP is at a known location on the server
# Let's see if we can use the WordPress async upload/installer mechanism
# Or better yet: let's use WP-CLI if it's available via the LiteSpeed plugin

# Check LiteSpeed endpoints
print("=== Check LiteSpeed API endpoints ===")
r = requests.get(f"{BASE}/wp-json/", auth=auth)
routes = r.json().get("routes", {})
ls_routes = [k for k in routes.keys() if "litespeed" in k.lower()]
print(f"LiteSpeed routes ({len(ls_routes)}):")
for route in ls_routes[:20]:
    print(f"  {route}")

# Check Wordfence endpoints  
wf_routes = [k for k in routes.keys() if "wordfence" in k.lower()]
print(f"\nWordfence routes ({len(wf_routes)}):")
for route in wf_routes[:20]:
    print(f"  {route}")

# Let's try the generatepress endpoint for uploading fonts (which uploads files!)
print("\n=== Check GP font upload endpoint ===")
gp_routes = [k for k in routes.keys() if "generatepress" in k.lower()]
print(f"GP routes ({len(gp_routes)}):")
for route in gp_routes:
    methods = routes[route].get("methods", [])
    print(f"  {route} [{', '.join(methods) if isinstance(methods, list) else methods}]")

# Try the font upload endpoint - it can write files to the theme directory!
print("\n=== Try GP font library upload ===")
r = requests.options(f"{BASE}/wp-json/generatepress-font-library/v1/upload-fonts", auth=auth)
print(f"OPTIONS status: {r.status_code}")
if r.status_code == 200:
    print(json.dumps(r.json(), indent=2)[:1000])

