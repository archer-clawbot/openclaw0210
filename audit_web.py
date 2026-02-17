import urllib.request
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

url = 'https://woocommerce-1589123-6212995.cloudwaysapps.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
resp = urllib.request.urlopen(req, timeout=30)
html = resp.read().decode('utf-8', errors='replace')

print(f"=== HOMEPAGE HTML SIZE: {len(html)} bytes ({len(html)/1024:.1f} KB) ===\n")

# Extract <head> section
head_match = re.search(r'<head[^>]*>(.*?)</head>', html, re.DOTALL | re.IGNORECASE)
head = head_match.group(1) if head_match else ''

# Count CSS files (link rel=stylesheet)
css_files = re.findall(r'<link[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE)
css_files2 = re.findall(r'<link[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']stylesheet["\']', html, re.IGNORECASE)
all_css = list(set(css_files + css_files2))
print(f"=== TOTAL CSS FILES LOADED: {len(all_css)} ===")
for i, css in enumerate(all_css, 1):
    in_head = 'HEAD' if css in str(head) else 'BODY'
    print(f"  {i}. [{in_head}] {css[:120]}")

# Count JS files (script src=)
js_files = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', html, re.IGNORECASE)
print(f"\n=== TOTAL JS FILES LOADED: {len(js_files)} ===")
for i, js in enumerate(js_files, 1):
    # Check if in head or body
    in_head = 'HEAD' if js in str(head) else 'BODY'
    # Check for defer/async
    pattern = f'<script[^>]*src=["\']' + re.escape(js) + '["\'][^>]*>'
    tag_match = re.search(pattern, html)
    attrs = ''
    if tag_match:
        tag = tag_match.group(0)
        if 'defer' in tag: attrs += ' defer'
        if 'async' in tag: attrs += ' async'
        if not attrs: attrs = ' RENDER-BLOCKING'
    print(f"  {i}. [{in_head}]{attrs} {js[:120]}")

# Inline scripts
inline_scripts = re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
print(f"\n=== INLINE SCRIPTS: {len(inline_scripts)} ===")
for i, script in enumerate(inline_scripts, 1):
    content = script.strip()
    if content:
        lines = content.count('\n') + 1
        chars = len(content)
        preview = content[:80].replace('\n', ' ')
        print(f"  {i}. {chars} chars, {lines} lines: {preview}...")

# Inline styles
inline_styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE)
print(f"\n=== INLINE STYLE BLOCKS: {len(inline_styles)} ===")
total_inline_css = 0
for i, style in enumerate(inline_styles, 1):
    content = style.strip()
    if content:
        total_inline_css += len(content)
        lines = content.count('\n') + 1
        chars = len(content)
        preview = content[:80].replace('\n', ' ')
        print(f"  {i}. {chars} chars, {lines} lines: {preview}...")
print(f"  Total inline CSS: {total_inline_css} bytes ({total_inline_css/1024:.1f} KB)")

# Render-blocking resources in <head> (CSS and JS without defer/async)
print(f"\n=== RENDER-BLOCKING RESOURCES IN <HEAD> ===")
head_css = re.findall(r'<link[^>]*rel=["\']stylesheet["\'][^>]*>', head, re.IGNORECASE)
print(f"  CSS in <head> (all render-blocking): {len(head_css)}")
for i, tag in enumerate(head_css, 1):
    href = re.search(r'href=["\']([^"\']+)["\']', tag)
    if href:
        print(f"    {i}. {href.group(1)[:100]}")

head_js = re.findall(r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>', head, re.IGNORECASE)
blocking_js = []
for js in head_js:
    pattern = f'<script[^>]*src=["\']' + re.escape(js) + '["\'][^>]*>'
    tag_match = re.search(pattern, head)
    if tag_match:
        tag = tag_match.group(0)
        if 'defer' not in tag and 'async' not in tag:
            blocking_js.append(js)
print(f"  Render-blocking JS in <head>: {len(blocking_js)}")
for i, js in enumerate(blocking_js, 1):
    print(f"    {i}. {js[:100]}")

# Check for preloads
preloads = re.findall(r'<link[^>]*rel=["\']preload["\'][^>]*>', html, re.IGNORECASE)
print(f"\n=== PRELOAD HINTS: {len(preloads)} ===")
for p in preloads:
    href = re.search(r'href=["\']([^"\']+)["\']', p)
    if href:
        print(f"  {href.group(1)[:100]}")

# Check for preconnect
preconnects = re.findall(r'<link[^>]*rel=["\']preconnect["\'][^>]*>', html, re.IGNORECASE)
print(f"\n=== PRECONNECT HINTS: {len(preconnects)} ===")
for p in preconnects:
    href = re.search(r'href=["\']([^"\']+)["\']', p)
    if href:
        print(f"  {href.group(1)}")

# Check for meta viewport
viewport = re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*>', html, re.IGNORECASE)
print(f"\n=== META VIEWPORT: {'FOUND' if viewport else 'MISSING'} ===")
if viewport:
    print(f"  {viewport.group(0)}")

# Check for charset
charset = re.search(r'<meta[^>]*charset[^>]*>', html, re.IGNORECASE)
print(f"\n=== CHARSET: {'FOUND' if charset else 'MISSING'} ===")

# Count total DOM elements (approximate)
tags = re.findall(r'<[a-zA-Z][^>]*>', html)
print(f"\n=== APPROXIMATE DOM ELEMENTS: {len(tags)} ===")

# Check for lazy loading images
images = re.findall(r'<img[^>]*>', html, re.IGNORECASE)
lazy_imgs = [img for img in images if 'loading="lazy"' in img or 'loading=\'lazy\'' in img]
print(f"\n=== IMAGES: {len(images)} total, {len(lazy_imgs)} with lazy loading ===")

# JSON-LD schemas
schemas = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
print(f"\n=== JSON-LD SCHEMAS: {len(schemas)} ===")
for i, s in enumerate(schemas, 1):
    import json
    try:
        data = json.loads(s)
        schema_type = data.get('@type', 'Unknown')
        print(f"  {i}. @type: {schema_type}")
    except:
        print(f"  {i}. [PARSE ERROR] {s[:80]}...")

print("\n=== WEB AUDIT COMPLETE ===")
