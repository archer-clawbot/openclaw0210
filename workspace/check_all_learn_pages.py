import requests

pages = [
    'schema-markup-guide',
    'internal-linking-strategy', 
    'local-seo-checklist',
    'google-business-profile-optimization'
]

print('CHECKING ALL /learn/ PAGES:\n')

for slug in pages:
    try:
        r = requests.get(f'https://darkgreen-moose-683278.hostingersite.com/learn/{slug}/')
        
        aside_exists = '<aside' in r.text
        footer_exists = '<footer' in r.text
        lc_article = 'lc-article' in r.text
        hero_section = 'lc-hero' in r.text
        
        print(f'{slug}:')
        print(f'  Status: {r.status_code}')
        print(f'  Has <aside>: {aside_exists}')
        print(f'  Has <footer>: {footer_exists}')
        print(f'  Has lc-article: {lc_article}')
        print(f'  Has lc-hero: {hero_section}')
        print()
    except Exception as e:
        print(f'{slug}: ERROR - {e}\n')
