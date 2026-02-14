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

# Fix by removing <p> tags that wrap block-level elements
fixed = raw
fixed = fixed.replace('<p><!-- HERO SECTION -->\n', '<!-- HERO SECTION -->\n')
fixed = fixed.replace('<p><!-- ARTICLE BODY + SIDEBAR -->\n', '<!-- ARTICLE BODY + SIDEBAR -->\n')

changes = len(raw) - len(fixed)
print(f'Removed {changes} characters')

if changes == 0:
    print('No changes needed!')
    exit(0)

# Update
print('Updating...')
update = requests.post(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297',
    headers=headers,
    data=json.dumps({'content': fixed})
)

print(f'Status: {update.status_code}')
if update.status_code == 200:
    print('SUCCESS — Page updated')
    print(f'Modified: {update.json().get("modified")}')
else:
    print(f'ERROR: {update.text[:300]}')
