import requests
import json
import hmac
import hashlib
import time
import os

BASE = "https://darkgreen-moose-683278.hostingersite.com"

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

print(f"Bridge secret: {bridge_secret[:8]}..." if bridge_secret else "NOT FOUND")

def bridge_request(method, route, body_dict=None):
    """Make HMAC-signed request to OpenClaw bridge."""
    url = f"{BASE}/wp-json/openclaw/v1{route}"
    timestamp = str(int(time.time()))
    
    # Body handling
    if body_dict:
        body_str = json.dumps(body_dict)
    else:
        body_str = ""
    
    # Signature format: {timestamp}:{METHOD}:{path}:{sha256(body)}
    # path = the REST route (e.g., /openclaw/v1/bridge/verify)
    path = f"/openclaw/v1{route}"
    body_hash = hashlib.sha256(body_str.encode("utf-8") if body_str else b"").hexdigest()
    payload = f"{timestamp}:{method}:{path}:{body_hash}"
    
    signature = hmac.new(
        bridge_secret.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()
    
    headers = {
        "X-OpenClaw-Timestamp": timestamp,
        "X-OpenClaw-Signature": signature,
    }
    
    if body_dict:
        headers["Content-Type"] = "application/json"
    
    if method == "GET":
        r = requests.get(url, headers=headers)
    elif method == "POST":
        r = requests.post(url, headers=headers, data=body_str if body_str else None)
    
    return r

# Test bridge connectivity
print("\n=== Bridge verify ===")
r = bridge_request("GET", "/bridge/verify")
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:500]}")

# Check bridge config
print("\n=== Bridge config GET ===")
r = bridge_request("GET", "/bridge/config")
print(f"Status: {r.status_code}")
print(f"Response: {r.text[:500]}")

