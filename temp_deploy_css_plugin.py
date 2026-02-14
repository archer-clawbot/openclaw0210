import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Install a File Manager plugin from WordPress.org
# "wp-file-manager" is a popular one with REST API
# Actually let's try "theme-editor" or a simpler plugin

# The WP REST API can install plugins by slug from WordPress.org
# Let's try installing a simple code snippets plugin that allows running PHP code
# "code-snippets" plugin would let us run PHP to write files

print("=== Install Code Snippets plugin ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/plugins",
    auth=auth,
    json={
        "slug": "code-snippets",
        "status": "active"
    }
)
print(f"Status: {r.status_code}")
if r.status_code in (200, 201):
    plugin = r.json()
    print(f"Plugin: {plugin.get('plugin')}")
    print(f"Status: {plugin.get('status')}")
    print(f"Version: {plugin.get('version')}")
else:
    print(f"Response: {r.text[:500]}")

