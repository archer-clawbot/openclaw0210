import requests
import re
import sys

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"

# Read the CSS file
with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

print(f"CSS file loaded: {len(css_content)} bytes")

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0"})

# Step 1: GET login page
print("\n=== Step 1: GET login page ===")
r = session.get(f"{BASE}/wp-login.php")
print(f"Status: {r.status_code}")
print(f"Cookies: {list(session.cookies.keys())}")

# Step 2: POST login credentials
print("\n=== Step 2: POST login ===")
login_data = {
    "log": USERNAME,
    "pwd": PASSWORD,
    "wp-submit": "Log In",
    "redirect_to": f"{BASE}/wp-admin/",
    "testcookie": "1",
}
session.cookies.set("wordpress_test_cookie", "WP%20Cookie%20check", domain="darkgreen-moose-683278.hostingersite.com")

r = session.post(f"{BASE}/wp-login.php", data=login_data, allow_redirects=True)
print(f"Status: {r.status_code}")
print(f"URL after login: {r.url}")
print(f"Cookies: {list(session.cookies.keys())}")

# Check if we're logged in
if "wp-admin" in r.url or "dashboard" in r.text.lower():
    print("LOGIN SUCCESS")
else:
    print("LOGIN MIGHT HAVE FAILED")
    # Check for error messages
    if "ERROR" in r.text or "error" in r.text[:2000].lower():
        match = re.search(r'<div id="login_error"[^>]*>(.*?)</div>', r.text, re.DOTALL)
        if match:
            print(f"Login error: {match.group(1).strip()}")
    # Try to continue anyway

# Step 3: Access theme editor
print("\n=== Step 3: GET theme editor ===")
# First, check if the CSS file exists in the theme
editor_url = f"{BASE}/wp-admin/theme-editor.php?file=css%2Flocalcatalyst_global-styles.css&theme=localcatalyst"
r = session.get(editor_url)
print(f"Status: {r.status_code}")
print(f"URL: {r.url}")

if "wp-login.php" in r.url:
    print("REDIRECTED TO LOGIN - not authenticated")
    sys.exit(1)

# Check if the file exists in the editor
if "does not exist" in r.text or "No such file" in r.text:
    print("File does not exist yet - need to create it")
    # Try the style.css editor first to get a nonce, then create the file
    editor_url = f"{BASE}/wp-admin/theme-editor.php?theme=localcatalyst"
    r = session.get(editor_url)
    print(f"Main editor status: {r.status_code}")

# Find the nonce
nonce_match = re.search(r'name="_wpnonce"\s+value="([^"]+)"', r.text)
if nonce_match:
    nonce = nonce_match.group(1)
    print(f"Found nonce: {nonce}")
else:
    print("No nonce found in page")
    # Try alternate nonce patterns
    nonce_match = re.search(r'"_wpnonce":"([^"]+)"', r.text)
    if nonce_match:
        nonce = nonce_match.group(1)
        print(f"Found JS nonce: {nonce}")
    else:
        # Look for any nonce
        nonces = re.findall(r'nonce["\s:=]+([a-f0-9]{10})', r.text)
        if nonces:
            print(f"Found nonce candidates: {nonces[:3]}")
        print("Page title area:")
        title_match = re.search(r'<title>(.*?)</title>', r.text)
        if title_match:
            print(f"  {title_match.group(1)}")
        # Show a snippet around "nonce" if present
        idx = r.text.find("nonce")
        if idx > 0:
            print(f"Nonce context: ...{r.text[idx-30:idx+60]}...")
        sys.exit(1)

# Step 4: Submit the theme editor form
print("\n=== Step 4: Submit CSS via theme editor ===")
edit_data = {
    "_wpnonce": nonce,
    "_wp_http_referer": f"/wp-admin/theme-editor.php?file=css%2Flocalcatalyst_global-styles.css&theme=localcatalyst",
    "newcontent": css_content,
    "action": "update",
    "file": "css/localcatalyst_global-styles.css",
    "theme": "localcatalyst",
    "submit": "Update File",
}

r = session.post(f"{BASE}/wp-admin/theme-editor.php", data=edit_data, allow_redirects=True)
print(f"Status: {r.status_code}")
print(f"URL: {r.url}")

if "File edited successfully" in r.text or "updated" in r.text.lower():
    print("FILE UPDATED SUCCESSFULLY!")
elif "Unable to communicate" in r.text:
    print("WordPress file edit check failed (loopback request)")
elif "error" in r.text.lower():
    error_match = re.search(r'<div[^>]*class="[^"]*error[^"]*"[^>]*>(.*?)</div>', r.text, re.DOTALL)
    if error_match:
        print(f"Error: {error_match.group(1).strip()[:500]}")
    else:
        # Check for notice
        notice_match = re.search(r'<div[^>]*class="[^"]*notice[^"]*"[^>]*>(.*?)</div>', r.text, re.DOTALL)
        if notice_match:
            print(f"Notice: {notice_match.group(1).strip()[:500]}")

# Step 5: Verify the file is accessible
print("\n=== Step 5: Verify file on server ===")
r = requests.get(f"{BASE}/wp-content/themes/localcatalyst/css/localcatalyst_global-styles.css")
print(f"Status: {r.status_code}")
if r.status_code == 200:
    print(f"FILE IS LIVE! Size: {len(r.text)} bytes")
    print(f"First 100 chars: {r.text[:100]}")
else:
    print("File not accessible yet")
