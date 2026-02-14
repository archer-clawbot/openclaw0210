import requests
import base64
import json

# Auth
auth = base64.b64encode(b'cody@spartandigital.co:lGHAdJtpiiFO8Morr8whCyZe').decode()
headers = {
    'Authorization': f'Basic {auth}',
    'Content-Type': 'application/json'
}

# Fetch current content (edit context to get raw field)
print('Fetching page 297...')
r = requests.get(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297?context=edit',
    headers=headers
)

if r.status_code != 200:
    print(f'Error fetching: {r.status_code}')
    exit(1)

raw_content = r.json()['content']['raw']

print(f'\nCurrent content length: {len(raw_content)}')
print('Orphaned tags present:')
print(f'  <!-- HERO SECTION --></p>: {"<!-- HERO SECTION --></p>" in raw_content}')
print(f'  <!-- ARTICLE BODY + SIDEBAR --></p>: {"<!-- ARTICLE BODY + SIDEBAR --></p>" in raw_content}')

# Fix the content
fixed = raw_content
fixed = fixed.replace('<p><!-- HERO SECTION --></p>\n', '<!-- HERO SECTION -->\n')
fixed = fixed.replace('<p><!-- ARTICLE BODY + SIDEBAR --></p>\n', '<!-- ARTICLE BODY + SIDEBAR -->\n')

# Try without the wrapping <p> tags
fixed = fixed.replace('<!-- HERO SECTION --></p>\n', '<!-- HERO SECTION -->\n')
fixed = fixed.replace('<!-- ARTICLE BODY + SIDEBAR --></p>\n', '<!-- ARTICLE BODY + SIDEBAR -->\n')

print(f'\nFixed content length: {len(fixed)}')
print(f'Difference: {len(raw_content) - len(fixed)} characters removed')

# Update
print('\nUpdating page...')
update_data = {'content': fixed}
update_response = requests.post(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297',
    headers=headers,
    data=json.dumps(update_data)
)

print(f'Update status: {update_response.status_code}')

if update_response.status_code == 200:
    print(f'Modified: {update_response.json().get("modified", "UNKNOWN")}')
    
    # Verify
    print('\nVerifying fix...')
    verify = requests.get(
        'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297?context=edit',
        headers=headers
    )
    new_raw = verify.json()['content']['raw']
    
    print('After update:')
    print(f'  <!-- HERO SECTION --></p>: {"<!-- HERO SECTION --></p>" in new_raw}')
    print(f'  <!-- ARTICLE BODY + SIDEBAR --></p>: {"<!-- ARTICLE BODY + SIDEBAR --></p>" in new_raw}')
    
    if '<!-- HERO SECTION --></p>' not in new_raw and '<!-- ARTICLE BODY + SIDEBAR --></p>' not in new_raw:
        print('\n✅ SUCCESS — Orphaned tags removed!')
    else:
        print('\n❌ FAILED — Orphaned tags still present')
else:
    print(f'Error: {update_response.text[:500]}')
