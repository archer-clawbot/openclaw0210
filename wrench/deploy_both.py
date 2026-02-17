"""Deploy CSS + functions.php to WordPress via Code Snippets plugin."""
import base64
import json
import urllib.request
import sys
import time

WP_URL = "https://darkgreen-moose-683278.hostingersite.com"
AUTH = base64.b64encode(b"cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe").decode()

FILES = [
    {
        "label": "CSS",
        "local": r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css",
        "remote": "wp-content/themes/localcatalyst/css/localcatalyst_global-styles.css",
    },
    {
        "label": "functions.php",
        "local": r"C:\Users\spart\.openclaw\wrench\localcatalyst_functions.php",
        "remote": "wp-content/themes/localcatalyst/functions.php",
    },
]


def wp_request(method, endpoint, data=None):
    url = f"{WP_URL}/wp-json/{endpoint}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Authorization", f"Basic {AUTH}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        print(f"  HTTP {e.code}: {raw[:300]}")
        return None


# 1. Install Code Snippets plugin
print("=== Installing Code Snippets plugin ===")
install = wp_request("POST", "wp/v2/plugins", {"slug": "code-snippets", "status": "active"})
if install:
    print(f"  Plugin installed: {install.get('plugin', 'ok')}")
else:
    # Might already be installed — try activating
    activate = wp_request("POST", "wp/v2/plugins/code-snippets/code-snippets", {"status": "active"})
    if activate:
        print("  Plugin already installed, activated")
    else:
        print("  WARNING: Could not install/activate Code Snippets")

snippet_ids = []

# 2. Deploy each file
for f in FILES:
    print(f"\n=== Deploying {f['label']} ===")
    with open(f["local"], "rb") as fh:
        content_b64 = base64.b64encode(fh.read()).decode()
    print(f"  Base64 length: {len(content_b64)}")

    php_code = (
        f"$data = base64_decode('{content_b64}');\n"
        f"$target = ABSPATH . '{f['remote']}';\n"
        f"$dir = dirname($target);\n"
        f"if (!is_dir($dir)) {{ wp_mkdir_p($dir); }}\n"
        f"$bytes = file_put_contents($target, $data);\n"
        f"update_option('lc_deploy_{f['label']}', $bytes . ' bytes at ' . date('c'));"
    )

    result = wp_request("POST", "code-snippets/v1/snippets", {
        "name": f"LC Deploy {f['label']}",
        "code": php_code,
        "scope": "global",
        "active": True,
        "priority": 10,
    })

    if not result or not result.get("id"):
        print(f"  FAILED to create snippet for {f['label']}")
        continue

    sid = result["id"]
    snippet_ids.append(sid)
    print(f"  Snippet created: ID {sid}")

# 3. Trigger execution
print("\n=== Triggering execution ===")
try:
    req = urllib.request.Request(WP_URL)
    with urllib.request.urlopen(req, timeout=15) as resp:
        print(f"  Site response: {resp.status}")
except Exception as e:
    print(f"  Site hit: {e}")

time.sleep(3)

# 4. Clean up snippets
print("\n=== Cleaning up snippets ===")
for sid in snippet_ids:
    wp_request("DELETE", f"code-snippets/v1/snippets/{sid}")
    print(f"  Deleted snippet {sid}")

# 5. Verify files accessible
print("\n=== Verifying deployed files ===")
for f in FILES:
    try:
        url = f"{WP_URL}/{f['remote']}"
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=10) as resp:
            size = resp.headers.get("Content-Length", "unknown")
            print(f"  {f['label']}: HTTP {resp.status}, size: {size}")
    except urllib.error.HTTPError as e:
        print(f"  {f['label']}: HTTP {e.code}")
    except Exception as e:
        print(f"  {f['label']}: {e}")

# 6. Remove Code Snippets plugin
print("\n=== Removing Code Snippets plugin ===")
wp_request("POST", "wp/v2/plugins/code-snippets/code-snippets", {"status": "inactive"})
wp_request("DELETE", "wp/v2/plugins/code-snippets/code-snippets")
print("  Done")

print("\n=== All deployments complete ===")
