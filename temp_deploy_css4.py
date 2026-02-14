import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

# Check the GP Pro export endpoint to understand the format
print("=== GP Pro Export ===")
r = requests.post(f"{BASE}/wp-json/generatepress-pro/v1/export", auth=auth)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    data = r.json()
    print(f"Export keys: {list(data.keys()) if isinstance(data, dict) else type(data)}")
    # Show first level structure
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, dict):
                print(f"  {k}: dict with keys {list(v.keys())[:5]}")
            elif isinstance(v, list):
                print(f"  {k}: list with {len(v)} items")
            elif isinstance(v, str):
                print(f"  {k}: string ({len(v)} chars)")
            else:
                print(f"  {k}: {type(v).__name__} = {str(v)[:100]}")
else:
    print(f"Response: {r.text[:500]}")

# Check the import endpoint schema
print("\n=== GP Pro Import Schema ===")
r = requests.options(f"{BASE}/wp-json/generatepress-pro/v1/import", auth=auth)
print(f"Status: {r.status_code}")
if r.status_code == 200:
    print(json.dumps(r.json(), indent=2)[:2000])

