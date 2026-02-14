import requests

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Try uploading a PHP file (will almost certainly be blocked)
php_content = b"""<?php
// Test
echo 'hello';
"""

print("=== Try uploading .php file ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/media",
    auth=auth,
    files={'file': ('test.php', php_content, 'application/x-php')}
)
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:300]}")

# Try with .phtml
print("\n=== Try .phtml ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/media",
    auth=auth,
    files={'file': ('test.phtml', php_content, 'text/html')}
)
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:300]}")

# What file types ARE allowed?
# Let's try .json
print("\n=== Try .json ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/media",
    auth=auth,
    files={'file': ('test.json', b'{"test":true}', 'application/json')}
)
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:300]}")

