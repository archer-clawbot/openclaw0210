import requests
import base64
import json
import re

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

# Find all literal HTML tags that should be escaped
# Pattern: backtick + HTML tag + backtick (code examples)
pattern = r'`(</?(?:script|head|body|html|div|p|a|span|meta|link)[^`]*>)`'

matches = list(re.finditer(pattern, raw))
print(f'\nFound {len(matches)} code examples with unescaped HTML tags:')

for i, match in enumerate(matches[:10]):
    print(f'  {i+1}. {match.group(0)}')

# Replace with HTML-encoded versions
fixed = raw
fixed = re.sub(r'`<script([^`]*)>`', r'`&lt;script\1&gt;`', fixed)
fixed = re.sub(r'`</script>`', r'`&lt;/script&gt;`', fixed)
fixed = re.sub(r'`<head>`', r'`&lt;head&gt;`', fixed)
fixed = re.sub(r'`<body>`', r'`&lt;body&gt;`', fixed)
fixed = re.sub(r'`<html>`', r'`&lt;html&gt;`', fixed)

# Also fix any that aren't in backticks but are in code context
fixed = re.sub(r'(\s)<script type="application/ld\+json">(\s)', r'\1&lt;script type="application/ld+json"&gt;\2', fixed)

changes = len(raw) - len(fixed)
print(f'\nContent length changed by: {changes} characters')
print(f'New length: {len(fixed)}')

# Preview
print('\nSearching for remaining <script in content...')
if '<script' in fixed:
    script_matches = list(re.finditer(r'<script', fixed))
    print(f'  Found {len(script_matches)} instances of <script')
    for i, match in enumerate(script_matches):
        pos = match.start()
        context = fixed[max(0, pos-50):pos+100].replace('\n', ' ')
        print(f'  {i+1}. Position {pos}: ...{context}...')
else:
    print('  None found - all escaped!')

# Update
if changes != 0 or True:  # Always try to update
    print('\nUpdating page...')
    update = requests.post(
        'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297',
        headers=headers,
        data=json.dumps({'content': fixed})
    )
    
    print(f'Status: {update.status_code}')
    if update.status_code == 200:
        print('SUCCESS')
        print(f'Modified: {update.json().get("modified")}')
    else:
        print(f'ERROR: {update.text[:500]}')
else:
    print('\nNo changes needed')
