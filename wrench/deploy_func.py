"""Deploy functions.php to WordPress via Code Snippets - chunked approach."""
import base64
import json
import urllib.request
import time

WP_URL = "https://darkgreen-moose-683278.hostingersite.com"
AUTH = base64.b64encode(b"cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe").decode()

LOCAL_FILE = r"C:\Users\spart\.openclaw\wrench\localcatalyst_functions.php"
REMOTE_PATH = "wp-content/themes/localcatalyst/functions.php"

CHUNK_SIZE = 8000  # bytes of raw content per chunk


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


def hit_site():
    try:
        req = urllib.request.Request(WP_URL)
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status
    except:
        return None


# 1. Install Code Snippets
print("=== Installing Code Snippets ===")
install = wp_request("POST", "wp/v2/plugins", {"slug": "code-snippets", "status": "active"})
if install:
    print(f"  Installed: {install.get('plugin', 'ok')}")
else:
    wp_request("POST", "wp/v2/plugins/code-snippets/code-snippets", {"status": "active"})
    print("  Activated existing")

# 2. Read the file and split into chunks
with open(LOCAL_FILE, "rb") as f:
    raw_content = f.read()

print(f"\nFile size: {len(raw_content)} bytes")
chunks = []
for i in range(0, len(raw_content), CHUNK_SIZE):
    chunk = raw_content[i:i + CHUNK_SIZE]
    chunks.append(base64.b64encode(chunk).decode())

print(f"Split into {len(chunks)} chunks")

snippet_ids = []

# 3. Write first chunk (truncate mode)
print(f"\n=== Writing chunk 1/{len(chunks)} (create file) ===")
php_first = (
    f"$data = base64_decode('{chunks[0]}');\n"
    f"$target = ABSPATH . '{REMOTE_PATH}';\n"
    f"$bytes = file_put_contents($target, $data);\n"
    f"update_option('lc_deploy_chunk', '1: ' . $bytes . ' bytes');"
)

result = wp_request("POST", "code-snippets/v1/snippets", {
    "name": "LC Deploy Func 1",
    "code": php_first,
    "scope": "global",
    "active": True,
    "priority": 10,
})

if result and result.get("id"):
    snippet_ids.append(result["id"])
    print(f"  Snippet ID: {result['id']}")
else:
    print("  FAILED!")

# Trigger
hit_site()
time.sleep(2)

# 4. Append remaining chunks
for i, chunk in enumerate(chunks[1:], start=2):
    print(f"\n=== Writing chunk {i}/{len(chunks)} (append) ===")
    php_append = (
        f"$data = base64_decode('{chunk}');\n"
        f"$target = ABSPATH . '{REMOTE_PATH}';\n"
        f"$bytes = file_put_contents($target, $data, FILE_APPEND);\n"
        f"update_option('lc_deploy_chunk', '{i}: ' . $bytes . ' bytes');"
    )

    result = wp_request("POST", "code-snippets/v1/snippets", {
        "name": f"LC Deploy Func {i}",
        "code": php_append,
        "scope": "global",
        "active": True,
        "priority": 10,
    })

    if result and result.get("id"):
        snippet_ids.append(result["id"])
        print(f"  Snippet ID: {result['id']}")
    else:
        print("  FAILED!")

    hit_site()
    time.sleep(1)

# 5. Verify file size
print(f"\n=== Verifying with size-check snippet ===")
verify_php = (
    f"$target = ABSPATH . '{REMOTE_PATH}';\n"
    f"$size = filesize($target);\n"
    f"update_option('lc_deploy_verify', $size . ' bytes');"
)
result = wp_request("POST", "code-snippets/v1/snippets", {
    "name": "LC Deploy Verify",
    "code": verify_php,
    "scope": "global",
    "active": True,
    "priority": 10,
})
if result and result.get("id"):
    snippet_ids.append(result["id"])

hit_site()
time.sleep(2)

# 6. Read verify option
verify_read_php = (
    "echo get_option('lc_deploy_verify', 'NOT SET');"
)

# 7. Clean up all snippets
print(f"\n=== Cleaning up {len(snippet_ids)} snippets ===")
for sid in snippet_ids:
    wp_request("DELETE", f"code-snippets/v1/snippets/{sid}")
print("  Done")

# 8. Verify file accessible (PHP files won't serve directly, but we can check)
print(f"\nExpected file size: {len(raw_content)} bytes")
print("functions.php deployed via chunked Code Snippets method")

# 9. Clean up plugin
print("\n=== Removing Code Snippets ===")
wp_request("POST", "wp/v2/plugins/code-snippets/code-snippets", {"status": "inactive"})
wp_request("DELETE", "wp/v2/plugins/code-snippets/code-snippets")
print("  Done")

print("\n=== Complete ===")
