import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Check the GP Pro export raw response
print("=== GP Pro Export (raw) ===")
r = requests.post(f"{BASE}/wp-json/generatepress-pro/v1/export", auth=auth)
print(f"Status: {r.status_code}")
print(f"Content-Type: {r.headers.get('Content-Type', 'N/A')}")
print(f"Content length: {len(r.content)}")
print(f"First 500 bytes: {r.text[:500]}")

# The export might return a file download, not JSON
# Let's try a different approach entirely

# Since we have the uploaded ZIP on the server, let's use WP's built-in 
# plugin installer via admin-ajax
# First, let's check if the WP admin AJAX supports app password auth

print("\n=== Try admin-ajax with REST auth ===")
r = requests.post(
    f"{BASE}/wp-admin/admin-ajax.php",
    auth=auth,
    data={"action": "wp_ajax_nopriv_heartbeat"},
)
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:200]}")

# Different approach: use the WP REST API to update theme mod (custom CSS)
# wp_get_custom_css() reads from custom_css post type
# We can try to create a custom_css post type directly
print("\n=== Try direct REST call to create custom_css ===")
# WordPress stores Additional CSS as a post with:
# - post_type: custom_css  
# - post_name: theme stylesheet name
# - post_content: the CSS
# We can't create it via /wp/v2/posts because custom_css isn't exposed
# But we might be able to use the theme-mods via the settings or customizer API

# Let's check the Customizer changeset approach
print("\n=== Check if wp_customize endpoints exist ===")
r = requests.get(f"{BASE}/wp-json/", auth=auth)
routes = r.json().get("routes", {})
custom_routes = [k for k in routes.keys() if "customiz" in k.lower() or "changeset" in k.lower()]
print(f"Customizer routes: {custom_routes}")

