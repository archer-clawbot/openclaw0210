import requests
import base64
import re

# Auth
auth = base64.b64encode(b'cody@spartandigital.co:lGHAdJtpiiFO8Morr8whCyZe').decode()
headers = {'Authorization': f'Basic {auth}'}

# Get all pages
print('Fetching all pages from /learn/...\n')
r = requests.get(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages?per_page=100',
    headers=headers
)

pages = r.json()

# Filter for /learn/ pages
learn_pages = [p for p in pages if '/learn/' in p['link']]

print(f'Found {len(learn_pages)} /learn/ pages\n')
print('='*80)

for page in learn_pages:
    page_id = page['id']
    title = page['title']['rendered']
    slug = page['slug']
    modified = page['modified']
    
    # Get full content
    r2 = requests.get(
        f'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/{page_id}?context=edit',
        headers=headers
    )
    
    content_raw = r2.json()['content']['raw']
    
    # Check for issues
    has_aside = '<aside' in content_raw
    has_hero = 'lc-hero' in content_raw
    has_article = 'lc-article' in content_raw
    
    # Check for unescaped code examples
    unescaped_script = bool(re.search(r'`<script[^`]*>`', content_raw))
    unescaped_head = bool(re.search(r'`<head>`', content_raw))
    
    status = '✅ OK' if (has_aside and has_hero and has_article and not unescaped_script and not unescaped_head) else '⚠️ ISSUE'
    
    print(f'\n{status} {slug} (ID: {page_id})')
    print(f'  Title: {title}')
    print(f'  Modified: {modified}')
    print(f'  Has sidebar: {has_aside}')
    print(f'  Has hero: {has_hero}')
    print(f'  Has lc-article: {has_article}')
    if unescaped_script:
        print(f'  ⚠️ Has unescaped <script> in code examples')
    if unescaped_head:
        print(f'  ⚠️ Has unescaped <head> in code examples')
