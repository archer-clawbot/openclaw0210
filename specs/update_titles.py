#!/usr/bin/env python3
import requests
import json
import base64

# WordPress credentials
SITE_URL = "https://www.chicagoselectrician.com"
API_BASE = f"{SITE_URL}/wp-json/wp/v2"
USERNAME = "archer"
PASSWORD = "4modnfgtvfPk9wjSYhEFcYrc"

# Create basic auth
auth_string = f"{USERNAME}:{PASSWORD}"
auth_bytes = base64.b64encode(auth_string.encode()).decode()
headers = {"Authorization": f"Basic {auth_bytes}", "Content-Type": "application/json"}

# Define top pages with their optimized titles and descriptions
# Formula: Primary Keyword + Location + Value Prop | Brand
optimizations = [
    {
        "id": 2,  # Homepage
        "title": "Licensed Electrician Chicago | 24/7 Emergency Service | Chicago's Electrician",
        "description": "Licensed electrician in Chicago offering 24/7 emergency electrical services. Free estimates, same-day service. Residential & commercial electrical contractors serving Chicagoland.",
        "name": "Homepage"
    },
    {
        "id": 6759,  # Residential Electrician
        "title": "Residential Electrician Chicago | Home Electrical Services | Chicago's Electrician",
        "description": "Professional residential electrician in Chicago. Lighting, panel upgrades, electrical repairs & more. Licensed, insured. Free estimates. Call for same-day service.",
        "name": "Residential Electrician"
    },
    {
        "id": 6680,  # Commercial Electrician
        "title": "Commercial Electrician Chicago | Business Electrical Services | Chicago's Electrician",
        "description": "Commercial electrician in Chicago for business electrical services. Tenant buildouts, new construction, 24/7 emergency service. Licensed electrical contractors.",
        "name": "Commercial Electrician"
    },
    {
        "id": 6604,  # Contact Us
        "title": "Contact Chicago's Electrician | Free Estimate Request",
        "description": "Contact Chicago's Electrician for a free estimate. Licensed electrical contractors serving Chicago. Call for 24/7 emergency electrical service.",
        "name": "Contact Us"
    },
]

print("=" * 120)
print("TITLE TAG OPTIMIZATION - CHICAGO'S ELECTRICIAN")
print("=" * 120)
print()

# Update each page
success_count = 0
for page in optimizations:
    page_id = page["id"]
    new_title = page["title"]
    new_description = page["description"]
    page_name = page["name"]
    
    # Prepare update payload for Yoast SEO
    update_payload = {
        "yoast_head_json": {
            "title": new_title,
            "description": new_description
        }
    }
    
    # Alternatively, use the Yoast REST API endpoint if available
    # Try updating via wp-json/yoast/v1/titles endpoint
    yoast_endpoint = f"{API_BASE}/pages/{page_id}"
    
    try:
        print(f"Updating: {page_name} (ID: {page_id})")
        print(f"  New Title: {new_title}")
        print(f"  New Desc: {new_description[:70]}...")
        
        # Update the page metadata via REST API
        response = requests.post(
            yoast_endpoint,
            headers=headers,
            json=update_payload,
            verify=False
        )
        
        if response.status_code in [200, 201]:
            print(f"  ✓ Success!")
            success_count += 1
        else:
            print(f"  ✗ Error: {response.status_code}")
            print(f"    Response: {response.text[:200]}")
    except Exception as e:
        print(f"  ✗ Exception: {str(e)}")
    
    print()

print("=" * 120)
print(f"Updated: {success_count}/{len(optimizations)} pages")
print("=" * 120)
