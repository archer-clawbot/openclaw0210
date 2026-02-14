import requests
import re

r = requests.get('https://darkgreen-moose-683278.hostingersite.com/learn/schema-markup-guide/')
html = r.text

# Find content section
entry_start = html.find('<div class="entry-content"')
aside_start = html.find('<aside style="width: 280px', entry_start)
content = html[entry_start:aside_start]

# Find all script tags
script_opens = list(re.finditer(r'<script[^>]*>', content))
script_closes = list(re.finditer(r'</script>', content))

print(f'Script tags: {len(script_opens)} opens, {len(script_closes)} closes')

if len(script_opens) > len(script_closes):
    print(f'\nFOUND {len(script_opens) - len(script_closes)} UNCLOSED SCRIPT TAGS\n')
    
    # Find which scripts are unclosed
    for i, script_open in enumerate(script_opens):
        open_pos = script_open.start()
        
        # Find the next closing tag after this opening
        next_close = None
        for close in script_closes:
            if close.start() > open_pos:
                next_close = close.start()
                break
        
        if next_close is None:
            print(f'UNCLOSED SCRIPT #{i+1} at position {open_pos}:')
            ctx_start = max(0, open_pos - 100)
            ctx_end = min(len(content), open_pos + 300)
            print(content[ctx_start:ctx_end])
            print('\n' + '='*80 + '\n')
else:
    print('\nAll scripts are properly closed')
