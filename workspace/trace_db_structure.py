import requests
import base64
import re

# Fetch from database
auth = base64.b64encode(b'cody@spartandigital.co:lGHAdJtpiiFO8Morr8whCyZe').decode()
r = requests.get(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/297?context=edit',
    headers={'Authorization': f'Basic {auth}'}
)

raw = r.json()['content']['raw']

# Find lc-article section
article_start = raw.find('<div class="lc-article"')
aside_end = raw.find('</aside>', article_start)
section = raw[article_start:aside_end + 100]

# Track all divs in this section
depth = 0
print('DIV STRUCTURE IN DATABASE:\n')

for match in re.finditer(r'</?div[>\s]|</?aside[>\s]|</?section[>\s]', section):
    pos = match.start()
    tag = match.group()
    
    # Get context
    context_start = max(0, pos - 80)
    context_end = min(len(section), pos + 80)
    context = section[context_start:context_end].replace('\n', ' ').strip()[:120]
    
    if tag.startswith('</'):
        depth -= 1
        print(f'{"  " * depth}{tag[:10]:<15} (depth now: {depth})')
        print(f'{"  " * depth}  Context: ...{context}...')
    else:
        print(f'{"  " * depth}{tag[:20]:<20} (depth now: {depth})')
        print(f'{"  " * depth}  Context: ...{context}...')
        depth += 1
    
    print()

print(f'\nFinal depth: {depth} (should be 0 after lc-article closes)')
