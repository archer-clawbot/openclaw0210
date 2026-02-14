import requests
import base64

# Auth
auth = base64.b64encode(b'cody@spartandigital.co:lGHAdJtpiiFO8Morr8whCyZe').decode()
headers = {'Authorization': f'Basic {auth}'}

# Get all pages
r = requests.get(
    'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages?per_page=100',
    headers=headers
)

pages = r.json()
print(f'Total pages found: {len(pages)}\n')

# Find pages with /learn/ in URL
learn_pages = []
for page in pages:
    link = page.get('link', '')
    if '/learn/' in link:
        learn_pages.append(page)

print(f'Pages under /learn/: {len(learn_pages)}\n')

for page in learn_pages:
    slug = page['slug']
    title = page['title']['rendered']
    page_id = page['id']
    link = page['link']
    
    print(f'{slug} (ID {page_id})')
    print(f'  {link}')
