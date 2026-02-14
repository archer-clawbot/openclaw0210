import requests

url = 'https://darkgreen-moose-683278.hostingersite.com/learn/schema-markup-guide/'
r = requests.get(url)
html = r.text

# Find the entry-content section
entry_start = html.find('<div class="entry-content"')
if entry_start == -1:
    print('entry-content not found')
    exit(1)

# Find where aside starts
aside_start = html.find('<aside style="width: 280px', entry_start)
if aside_start == -1:
    print('aside not found')
    exit(1)

# Get content between entry-content start and aside
content_before_aside = html[entry_start:aside_start]

# Count opening and closing tags
import re

div_opens = len(re.findall(r'<div[\s>]', content_before_aside))
div_closes = len(re.findall(r'</div>', content_before_aside))

p_opens = len(re.findall(r'<p[\s>]', content_before_aside))
p_closes = len(re.findall(r'</p>', content_before_aside))

section_opens = len(re.findall(r'<section[\s>]', content_before_aside))
section_closes = len(re.findall(r'</section>', content_before_aside))

print(f'Content from entry-content to aside: {len(content_before_aside)} chars')
print(f'\nTag balance:')
print(f'  <div>: opens={div_opens}, closes={div_closes}, diff={div_opens - div_closes}')
print(f'  <p>: opens={p_opens}, closes={p_closes}, diff={p_opens - p_closes}')
print(f'  <section>: opens={section_opens}, closes={section_closes}, diff={section_opens - section_closes}')

if div_opens != div_closes:
    print(f'\n⚠️ UNBALANCED DIVS: {div_opens - div_closes} extra opening tags')
    
if p_opens != p_closes:
    print(f'\n⚠️ UNBALANCED P TAGS: {p_opens - p_closes} extra opening tags')

if section_opens != section_closes:
    print(f'\n⚠️ UNBALANCED SECTIONS: {section_opens - section_closes} extra opening tags')

# Show last 300 chars before aside
print('\n\nLast 300 chars before aside:')
print(content_before_aside[-300:])
