import requests
import json

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"
auth = (USERNAME, APP_PASSWORD)

with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# Re-create the GP Element with hook metadata
# First, let's look at how GP Premium stores display conditions by checking the DB
# Let's look at ALL meta for the working elements via the _embed approach
print("=== Check GP Element 83 (working nav header) with all postmeta ===")
r = requests.get(
    f"{BASE}/wp-json/wp/v2/gp_elements/83?context=edit",
    auth=auth,
)
if r.status_code == 200:
    element = r.json()
    print(f"Title: {element.get('title', {}).get('raw', 'N/A')}")
    meta = element.get('meta', {})
    for k, v in meta.items():
        if v and v != '' and v != False:
            print(f"  {k} = {v}")
    
    # The raw content
    content = element.get('content', {}).get('raw', '')
    print(f"Content length: {len(content)}")
    print(f"Content preview: {content[:150]}")

# The display conditions are stored in post meta but NOT exposed via REST API
# GP Premium uses _generate_element_display_conditions which is NOT registered with show_in_rest
# So we CAN'T set them via REST API

# However: let me check if GP Premium falls back to showing the element everywhere
# when no conditions are set. Or does it require conditions to be set?

# The GP Premium source code (gp-premium/elements) checks:
# $display_conditions = get_post_meta($post_id, '_generate_element_display_conditions', true);
# If empty, the element is NOT displayed anywhere (safe default)

# So we need another approach. Let me check: can we set arbitrary post meta via REST API?
print("\n=== Try setting arbitrary post meta via REST API ===")
# Create a new GP Element  
r = requests.post(
    f"{BASE}/wp-json/wp/v2/gp_elements",
    auth=auth,
    json={
        "title": "LC Global Styles CSS",
        "content": f"<style id='lc-global-styles'>\n{css_content}\n</style>",
        "status": "publish",
        "meta": {
            "_generate_block_type": "hook",
            "_generate_hook": "wp_head",
            "_generate_hook_priority": "5",
            # Try setting display conditions - these might be registered but just empty
            "_generate_element_display_conditions": [
                {"rule": "general:site", "include": "include"}
            ],
            "_generate_element_exclude_conditions": [],
            "_generate_element_user_conditions": [],
        }
    }
)
print(f"Create GP Element status: {r.status_code}")
if r.status_code in (200, 201):
    element = r.json()
    elem_id = element.get('id')
    print(f"Element ID: {elem_id}")
    meta = element.get('meta', {})
    for k, v in meta.items():
        if v and v != '' and v != False:
            print(f"  {k} = {v}")
    
    # Check if display conditions were saved
    if meta.get('_generate_element_display_conditions'):
        print("Display conditions SAVED!")
    else:
        print("Display conditions NOT saved (not registered in REST)")
else:
    print(f"Response: {r.text[:500]}")
    elem_id = None

# Verify on frontend
if elem_id:
    print(f"\n=== Check frontend for CSS (element {elem_id}) ===")
    r = requests.get(f"{BASE}/")
    if "lc-global-styles" in r.text:
        print("SUCCESS! CSS is being injected!")
    else:
        print("CSS not found on frontend")
        # Delete the element since it's not working
        r = requests.delete(f"{BASE}/wp-json/wp/v2/gp_elements/{elem_id}?force=true", auth=auth)
        print(f"Deleted element: {r.status_code}")

