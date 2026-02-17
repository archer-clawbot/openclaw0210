"""Deploy CSS file to WordPress via Code Snippets plugin."""
import base64
import json
import urllib.request
import sys

WP_URL = "https://darkgreen-moose-683278.hostingersite.com"
AUTH = base64.b64encode(b"cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe").decode()

CSS_FILE = r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css"
TARGET_PATH = "wp-content/themes/localcatalyst/css/localcatalyst_global-styles.css"

def wp_request(method, endpoint, data=None):
    url = f"{WP_URL}/wp-json/{endpoint}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Authorization", f"Basic {AUTH}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"HTTP {e.code}: {body[:500]}")
        return None

# Read and base64 encode the CSS
with open(CSS_FILE, "rb") as f:
    css_b64 = base64.b64encode(f.read()).decode()

print(f"CSS base64 length: {len(css_b64)}")

# Create the deployer snippet
php_code = f"""$css = base64_decode('{css_b64}');
$target = ABSPATH . '{TARGET_PATH}';
$dir = dirname($target);
if (!is_dir($dir)) {{ wp_mkdir_p($dir); }}
$bytes = file_put_contents($target, $css);
update_option('lc_css_deploy_result', $bytes . ' bytes at ' . date('c'));"""

result = wp_request("POST", "code-snippets/v1/snippets", {
    "name": "LC CSS Deploy",
    "code": php_code,
    "scope": "global",
    "active": True,
    "priority": 10,
})

if not result or not result.get("id"):
    print("Failed to create snippet")
    sys.exit(1)

snippet_id = result["id"]
print(f"Snippet created: ID {snippet_id}")

# Trigger execution by hitting the site
try:
    req = urllib.request.Request(WP_URL)
    with urllib.request.urlopen(req, timeout=15) as resp:
        print(f"Site response: {resp.status}")
except Exception as e:
    print(f"Site hit: {e}")

# Check result
import time
time.sleep(2)

# Read the option to verify
verify_php = """$result = get_option('lc_css_deploy_result', 'NOT SET');
echo $result;
delete_option('lc_css_deploy_result');"""

verify_result = wp_request("POST", "code-snippets/v1/snippets", {
    "name": "LC CSS Verify",
    "code": f"update_option('lc_css_verify', get_option('lc_css_deploy_result', 'NOT SET'));",
    "scope": "global",
    "active": True,
    "priority": 10,
})

if verify_result:
    verify_id = verify_result["id"]
    # Hit site again to run verify
    try:
        req = urllib.request.Request(WP_URL)
        with urllib.request.urlopen(req, timeout=15) as resp:
            pass
    except:
        pass
    time.sleep(1)
    print(f"Verify snippet created: ID {verify_id}")
    # Clean up both snippets
    wp_request("DELETE", f"code-snippets/v1/snippets/{snippet_id}")
    wp_request("DELETE", f"code-snippets/v1/snippets/{verify_id}")
    print("Snippets cleaned up")

# Verify CSS file exists by checking its URL
try:
    css_url = f"{WP_URL}/{TARGET_PATH}"
    req = urllib.request.Request(css_url, method="HEAD")
    with urllib.request.urlopen(req, timeout=10) as resp:
        content_length = resp.headers.get("Content-Length", "unknown")
        print(f"CSS file accessible: {resp.status}, size: {content_length}")
except urllib.error.HTTPError as e:
    print(f"CSS file check: HTTP {e.code}")
except Exception as e:
    print(f"CSS file check: {e}")

# Deactivate and delete Code Snippets plugin
wp_request("POST", "wp/v2/plugins/code-snippets/code-snippets", {"status": "inactive"})
wp_request("DELETE", "wp/v2/plugins/code-snippets/code-snippets")
print("Code Snippets plugin removed")

print("Done!")
