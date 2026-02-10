#!/usr/bin/env python3
import requests
import json
import base64

# WordPress credentials
SITE_URL = "https://www.chicagoselectrician.com"
API_BASE = f"{SITE_URL}/wp-json/wp/v2"
USERNAME = "archer"
PASSWORD = "4modnfgtvfPk9wjSYhEFcYrc"

# Create basic auth header
auth_string = f"{USERNAME}:{PASSWORD}"
auth_bytes = base64.b64encode(auth_string.encode()).decode()
headers = {"Authorization": f"Basic {auth_bytes}"}

# Fetch all pages
print("Fetching pages...")
pages_response = requests.get(f"{API_BASE}/pages?per_page=100", headers=headers)
pages = pages_response.json()

# Extract key info
print(f"\nFound {len(pages)} pages. Top 10 pages:")
print("=" * 120)

top_pages = []
for i, page in enumerate(pages[:10], 1):
    page_id = page.get('id')
    title = page.get('title', {}).get('rendered', 'N/A')
    slug = page.get('slug', 'N/A')
    link = page.get('link', 'N/A')
    
    # Get Yoast SEO metadata
    yoast_meta = page.get('yoast_head_json', {})
    meta_title = yoast_meta.get('title', 'N/A')
    meta_desc = yoast_meta.get('description', 'N/A')
    
    top_pages.append({
        'id': page_id,
        'title': title,
        'slug': slug,
        'link': link,
        'meta_title': meta_title,
        'meta_desc': meta_desc
    })
    
    print(f"\n{i}. {title}")
    print(f"   Slug: {slug}")
    print(f"   URL: {link}")
    print(f"   Current Title Tag: {meta_title[:80]}...")
    print(f"   Current Meta Desc: {meta_desc[:80]}...")
    print(f"   Page ID: {page_id}")

# Output as JSON for later use
with open('C:\\Users\\spart\\.openclaw\\specs\\pages_audit.json', 'w') as f:
    json.dump(top_pages, f, indent=2)

print("\n" + "=" * 120)
print(f"Audit saved to pages_audit.json")
