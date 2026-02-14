import requests
from html.parser import HTMLParser

class TagCounter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.count = 0
        self.errors = []
    
    def handle_starttag(self, tag, attrs):
        self.count += 1
    
    def error(self, message):
        self.errors.append(message)

# Fetch page
r = requests.get('https://darkgreen-moose-683278.hostingersite.com/learn/schema-markup-guide/')
html = r.text

# Try to parse
parser = TagCounter()
try:
    parser.feed(html)
    print(f'HTML PARSED OK')
    print(f'Total tags found: {parser.count}')
    print(f'Parsing errors: {len(parser.errors)}')
    if parser.errors:
        for err in parser.errors[:5]:
            print(f'  - {err}')
except Exception as e:
    print(f'CRITICAL PARSE ERROR: {str(e)}')
    print(f'Error type: {type(e).__name__}')

# Check if aside is in the raw HTML
print(f'\n<aside in HTML: {"<aside" in html}')
print(f'<footer in HTML: {"<footer" in html}')
