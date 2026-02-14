import requests
import base64

# Auth
auth = base64.b64encode(b'cody@spartandigital.co:lGHAdJtpiiFO8Morr8whCyZe').decode()
headers = {'Authorization': f'Basic {auth}'}

# Find page by slug
r = requests.get(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages?slug=internal-linking-strategy',
    headers=headers
)

pages = r.json()
if not pages:
    print('Page not found')
    exit(1)

page = pages[0]
print(f'Page ID: {page["id"]}')
print(f'Title: {page["title"]["rendered"]}')
print(f'Modified: {page["modified"]}')

# Get full content with edit context
r2 = requests.get(
    f'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages/{page["id"]}?context=edit',
    headers=headers
)

content_raw = r2.json()['content']['raw']
content_rendered = r2.json()['content']['rendered']

print(f'\nRAW content:')
print(f'  Length: {len(content_raw)}')
print(f'  Has <aside: {"<aside" in content_raw}')
print(f'  Has lc-article: {"lc-article" in content_raw}')

print(f'\nRENDERED content:')
print(f'  Length: {len(content_rendered)}')
print(f'  Has <aside: {"<aside" in content_rendered}')
print(f'  Has lc-article: {"lc-article" in content_rendered}')

# Check if content has same structure as schema markup page
if 'lc-article' in content_raw:
    # Find the lc-article section
    lc_start = content_raw.find('<div class="lc-article"')
    if lc_start != -1:
        lc_section = content_raw[lc_start:lc_start+1000]
        print(f'\nlc-article section:')
        print(lc_section[:500])
