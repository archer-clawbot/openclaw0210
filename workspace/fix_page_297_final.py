import requests
import base64
import json

# Auth
auth = base64.b64encode(b'cody@spartandigital.co:lGHAdJtpiiFO8Morr8whCyZe').decode()
headers = {
    'Authorization': f'Basic {auth}',
    'Content-Type': 'application/json'
}

# Fetch
print('Fetching page 297...')
r = requests.get(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297?context=edit',
    headers=headers
)

raw = r.json()['content']['raw']
print(f'Current length: {len(raw)}')

# Remove ALL standalone HTML comments that wpautop will wrap
fixed = raw
fixed = fixed.replace('<!-- HERO SECTION -->\n', '')
fixed = fixed.replace('<!-- ARTICLE BODY + SIDEBAR -->\n', '')

# Also remove any other standalone comments
import re
# Match standalone comments (comment on its own line)
fixed = re.sub(r'^<!--[^>]+-->\n', '', fixed, flags=re.MULTILINE)

changes = len(raw) - len(fixed)
print(f'Removed {changes} characters')

if changes == 0:
    print('No standalone comments found')
    exit(0)

print('\nPreview of changes:')
print('OLD first 200 chars:', raw[:200])
print('NEW first 200 chars:', fixed[:200])

# Update
print('\nUpdating...')
update = requests.post(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297',
    headers=headers,
    data=json.dumps({'content': fixed})
)

print(f'Status: {update.status_code}')
if update.status_code == 200:
    print('SUCCESS')
    print(f'Modified: {update.json().get("modified")}')
    
    # Verify rendered output
    verify = requests.get('https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297', headers=headers)
    rendered = verify.json()['content']['rendered']
    
    print('\nVerifying rendered output:')
    print('  Has <p><!-- HERO:', '<p><!-- HERO' in rendered)
    print('  Has <p><!-- ARTICLE:', '<p><!-- ARTICLE' in rendered)
    print('  First 150 chars:', rendered[:150])
else:
    print(f'ERROR: {update.text[:300]}')
