import requests
import re

url = 'https://darkgreen-moose-683278.hostingersite.com/learn/schema-markup-guide/'
r = requests.get(url)
html = r.text

# Find the entry-content section
entry_start = html.find('<div class="entry-content"')
aside_start = html.find('<aside style="width: 280px', entry_start)

content = html[entry_start:aside_start]

# Track div depth
depth = 0
max_depth = 0
positions = []

for match in re.finditer(r'</?div[>\s]', content):
    pos = match.start()
    tag = match.group()
    
    if tag.startswith('</'):
        depth -= 1
    else:
        depth += 1
        max_depth = max(max_depth, depth)
    
    # Store positions where depth changes
    context_start = max(0, pos - 100)
    context_end = min(len(content), pos + 100)
    context = content[context_start:context_end]
    
    positions.append({
        'pos': pos,
        'tag': tag,
        'depth': depth,
        'context': context.replace('\n', ' ')[:150]
    })

print(f'Final depth: {depth} (should be 0)')
print(f'Max depth reached: {max_depth}')
print(f'\nShowing all div tags:\n')

for i, p in enumerate(positions):
    marker = ' <-- UNCLOSED' if i == len(positions) - 1 and p['depth'] > 0 else ''
    print(f"{i+1}. Depth {p['depth']}: {p['tag'][:20]}{marker}")
    print(f"   Context: ...{p['context']}...")
    print()

print(f'\n\nConclusion: {depth} unclosed <div> tags before aside')
