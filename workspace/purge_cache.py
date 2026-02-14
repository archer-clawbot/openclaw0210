import requests

url = 'https://darkgreen-moose-683278.hostingersite.com/learn/schema-markup-guide/'

# Try method 1: X-LiteSpeed-Purge header
print('Attempting cache purge method 1 (X-LiteSpeed-Purge)...')
headers = {'X-LiteSpeed-Purge': url}
r = requests.get(url, headers=headers)
print(f'Status: {r.status_code}')
print(f'Cache: {r.headers.get("X-LiteSpeed-Cache", "unknown")}')

# Try method 2: PURGE HTTP method
print('\nAttempting cache purge method 2 (PURGE verb)...')
try:
    r2 = requests.request('PURGE', url)
    print(f'Status: {r2.status_code}')
except Exception as e:
    print(f'Error: {e}')

# Try method 3: Check if cache is now cleared
print('\nChecking cache status...')
r3 = requests.get(url, headers={'Cache-Control': 'no-cache'})
print(f'Cache header: {r3.headers.get("X-LiteSpeed-Cache", "unknown")}')
print(f'Content length: {len(r3.text)}')

# Check if aside/footer are in the HTML
print(f'\nSidebar in HTML: {"<aside" in r3.text}')
print(f'Footer in HTML: {"<footer" in r3.text}')
