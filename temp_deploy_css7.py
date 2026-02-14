import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# Check WordPress version
print("=== WordPress Version ===")
r = requests.get(f"{BASE}/wp-json/", auth=auth)
if r.status_code == 200:
    wp_info = r.json()
    print(f"Name: {wp_info.get('name')}")
    print(f"URL: {wp_info.get('url')}")
    # Version might be in the generator
    
# Check wp version via header
r2 = requests.head(f"{BASE}/", allow_redirects=True)
print(f"X-Powered-By: {r2.headers.get('X-Powered-By', 'N/A')}")

# Check for the WP 6.5+ file editing endpoint
# In recent WordPress versions, there's a batch API endpoint
print("\n=== Check WP REST API batch endpoint ===")
r = requests.get(f"{BASE}/wp-json/", auth=auth)
routes = r.json().get("routes", {})

# Look for any unexplored endpoints
print("All routes containing 'file' or 'edit' or 'template':")
for route_name in sorted(routes.keys()):
    if any(word in route_name.lower() for word in ['file', 'edit', 'template']):
        methods = routes[route_name].get('methods', [])
        if 'POST' in methods or 'PUT' in methods or 'PATCH' in methods:
            print(f"  {route_name} [{', '.join(methods)}]")

# Check wp_template endpoints - for block themes, these can edit template files
print("\n=== Check templates endpoint ===")
r = requests.get(f"{BASE}/wp-json/wp/v2/templates", auth=auth)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    templates = r.json()
    print(f"Templates count: {len(templates)}")
    for t in templates[:5]:
        print(f"  {t.get('id')} - {t.get('title', {}).get('rendered', 'N/A')}")

# Check template-parts
print("\n=== Check template-parts ===")
r = requests.get(f"{BASE}/wp-json/wp/v2/template-parts", auth=auth)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    parts = r.json()
    print(f"Parts count: {len(parts)}")

# Final idea: Update the global-styles to include custom CSS
# The global-styles endpoint for a specific ID is writable
# First, find the ID
print("\n=== Search for global-styles ID ===")
# Try a larger range
for test_id in range(50, 800):
    r = requests.get(f"{BASE}/wp-json/wp/v2/global-styles/{test_id}", auth=auth)
    if r.status_code == 200:
        gs = r.json()
        print(f"Found global-styles at ID {test_id}")
        print(f"  Title: {gs.get('title')}")
        # Check if it has styles.css property
        styles = gs.get('styles', {})
        if 'css' in styles:
            print(f"  Has CSS property! Current length: {len(styles['css'])}")
        else:
            print(f"  Style keys: {list(styles.keys())}")
        
        # Check write permission
        r2 = requests.options(f"{BASE}/wp-json/wp/v2/global-styles/{test_id}", auth=auth)
        if r2.status_code == 200:
            opts = r2.json()
            methods = opts.get('methods', [])
            print(f"  Allowed methods: {methods}")
            # Check for css in schema
            endpoints = opts.get('endpoints', [])
            for ep in endpoints:
                args = ep.get('args', {})
                if 'styles' in args:
                    print(f"  Styles arg: {json.dumps(args['styles'], indent=2)[:500]}")
        break
    elif r.status_code == 403:
        # Exists but no access - skip
        continue

