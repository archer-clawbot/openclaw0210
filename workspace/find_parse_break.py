import requests
import re

# Fetch live page
r = requests.get('https://darkgreen-moose-683278.hostingersite.com/learn/schema-markup-guide/')
html = r.text

# Find the entry-content section
entry_start = html.find('<div class="entry-content"')
aside_start = html.find('<aside style="width: 280px', entry_start)

if entry_start == -1 or aside_start == -1:
    print('Could not find markers')
    exit(1)

# Extract content before aside
before_aside = html[entry_start:aside_start]

# Look for common HTML parser-breaking patterns
print('CHECKING FOR PARSER-BREAKING PATTERNS:\n')

# 1. Unclosed style/script tags
unclosed_style = re.findall(r'<style[^>]*>(?:(?!</style>).)*$', before_aside, re.DOTALL)
unclosed_script = re.findall(r'<script[^>]*>(?:(?!</script>).)*$', before_aside, re.DOTALL)

if unclosed_style:
    print(f'WARNING: UNCLOSED <style> TAG FOUND')
    print(f'   Last 200 chars: {before_aside[-200:]}')

if unclosed_script:
    print(f'WARNING: UNCLOSED <script> TAG FOUND')
    print(f'   Last 200 chars: {before_aside[-200:]}')

# 2. Nested P tags (browsers auto-close these)
nested_p = re.findall(r'<p[^>]*>.*?<p[^>]*>', before_aside, re.DOTALL)
if nested_p:
    print(f'WARNING: NESTED <p> TAGS: {len(nested_p)} instances')
    for i, match in enumerate(nested_p[:3]):
        clean = match.replace('\n', ' ')[:150]
        print(f'   {i+1}. {clean}...')

# 3. Block elements inside P tags
bad_p_content = re.findall(r'<p[^>]*>.*?<(div|section|article|aside)[^>]*>', before_aside, re.DOTALL)
if bad_p_content:
    print(f'\nWARNING: BLOCK ELEMENTS INSIDE <p> TAGS: {len(bad_p_content)} instances')
    for i, match in enumerate(bad_p_content[:3]):
        clean = match.replace('\n', ' ')[:150]
        print(f'   {i+1}. {clean}...')

# 4. Check the last 500 chars before aside for issues
print('\n\nLAST 500 CHARS BEFORE <aside>:')
print(before_aside[-500:])

# 5. Count unclosed tags in the last portion
last_chunk = before_aside[-1000:]
p_opens = len(re.findall(r'<p[\s>]', last_chunk))
p_closes = len(re.findall(r'</p>', last_chunk))
div_opens = len(re.findall(r'<div[\s>]', last_chunk))
div_closes = len(re.findall(r'</div>', last_chunk))

print(f'\n\nLAST 1000 CHARS TAG BALANCE:')
print(f'  <p>: opens={p_opens}, closes={p_closes}, diff={p_opens - p_closes}')
print(f'  <div>: opens={div_opens}, closes={div_closes}, diff={div_opens - div_closes}')
