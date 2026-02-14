import requests
import json
import concurrent.futures

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# Instead of scanning IDs, use the WordPress Customizer API to set Additional CSS
# The function wp_get_custom_css_post() retrieves the custom_css post for the active theme
# We can try to find it or create it

# Actually, let's try a completely different approach:
# Use the WP REST API batch endpoint to make multiple requests at once
# And let's specifically try updating the global styles with custom CSS

# The global-styles endpoint needs a post ID. Let's find it via a search
print("=== Find global-styles post by querying posts ===")
# Global styles are stored as wp_global_styles post type
# Try getting all via a wider search
r = requests.get(
    f"{BASE}/wp-json/wp/v2/global-styles",
    auth=auth,
    params={"per_page": 100}
)
print(f"Global styles endpoint status: {r.status_code}")
if r.status_code == 200:
    gs_list = r.json()
    print(f"Found: {len(gs_list)} global styles")
    for gs in gs_list:
        print(f"  ID: {gs.get('id')} - Title: {gs.get('title')}")
elif r.status_code == 404:
    print("Not found - need to use the themes endpoint")
    
# Actually, we can get the global-styles ID from the theme response
print("\n=== Get theme with _embed for global styles link ===")
r = requests.get(
    f"{BASE}/wp-json/wp/v2/themes/localcatalyst",
    auth=auth
)
if r.status_code == 200:
    theme = r.json()
    links = theme.get('_links', {})
    print(f"Theme links: {list(links.keys())}")
    for k, v in links.items():
        print(f"  {k}: {json.dumps(v)[:200]}")

# Let's try a known approach: search for the global styles post by ID
# WordPress 6.x typically creates the global styles post when the theme is activated
# The ID is often stored in a hidden location
# We know the post exists because /wp-json/wp/v2/global-styles/themes/localcatalyst works

# Try accessing via the style variation endpoint
print("\n=== Try editing global styles CSS property ===")
# Get the global styles first to understand the ID
r = requests.get(
    f"{BASE}/wp-json/wp/v2/global-styles/themes/localcatalyst",
    auth=auth
)
gs_data = r.json()

# Try specific IDs around known post IDs (83, 84 are GP elements)
# The global-styles post might have a lower ID
for test_id in list(range(1, 30)) + list(range(75, 90)) + [100, 150, 200, 250, 300, 400, 500, 600, 700]:
    r = requests.head(
        f"{BASE}/wp-json/wp/v2/global-styles/{test_id}",
        auth=auth
    )
    if r.status_code == 200:
        print(f"\nFound global-styles at ID {test_id}")
        r2 = requests.get(f"{BASE}/wp-json/wp/v2/global-styles/{test_id}", auth=auth)
        if r2.status_code == 200:
            gs = r2.json()
            print(f"  Title: {gs.get('title')}")
            print(f"  Style keys: {list(gs.get('styles', {}).keys())}")
            
            # Try updating with custom CSS
            r3 = requests.options(f"{BASE}/wp-json/wp/v2/global-styles/{test_id}", auth=auth)
            if r3.status_code == 200:
                opts = r3.json()
                print(f"  Allowed methods: {opts.get('methods', [])}")
                for ep in opts.get('endpoints', []):
                    args = ep.get('args', {})
                    if 'styles' in args:
                        print(f"  Has 'styles' writable arg")
        break

