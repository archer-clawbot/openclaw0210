import requests
import json
import hmac
import hashlib
import time
import os

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Load OPENCLAW_BRIDGE_SECRET from .env
env_path = r"C:\Users\spart\.openclaw\.env"
bridge_secret = None
if os.path.exists(env_path):
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENCLAW_BRIDGE_SECRET="):
                bridge_secret = line.split("=", 1)[1].strip().strip('"').strip("'")
                break

if bridge_secret:
    print(f"Bridge secret found: {bridge_secret[:8]}...")
else:
    print("Bridge secret NOT found in .env")
    exit(1)

# Create HMAC-signed request to bridge
def bridge_request(method, endpoint, body=None):
    url = f"{BASE}/wp-json/openclaw/v1{endpoint}"
    timestamp = str(int(time.time()))
    
    # The HMAC payload is: timestamp + endpoint + body_json
    body_json = json.dumps(body) if body else ""
    payload = f"{timestamp}{endpoint}{body_json}"
    signature = hmac.new(
        bridge_secret.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()
    
    headers = {
        "X-OpenClaw-Timestamp": timestamp,
        "X-OpenClaw-Signature": signature,
        "Content-Type": "application/json"
    }
    
    if method == "GET":
        r = requests.get(url, headers=headers)
    elif method == "POST":
        r = requests.post(url, headers=headers, data=body_json if body else None)
    
    return r

# Test bridge connectivity
print("=== Bridge verify ===")
r = bridge_request("GET", "/bridge/verify")
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:500]}")

# Check bridge config
print("\n=== Bridge config ===")
r = bridge_request("GET", "/bridge/config")
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:500]}")

# Check fleet health
print("\n=== Fleet health ===")
r = bridge_request("POST", "/fleet/health", {"status": "check"})
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:500]}")

