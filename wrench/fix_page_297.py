#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import sys
import os
os.environ['PYTHONIOENCODING'] = 'utf-8'

# Load original
with open('page_297.json', 'r') as f:
    data = json.load(f)

content = data['content']['rendered']
original_len = len(content)

# Fix #1: Remove extra </p> after "Get Schema Markup ($197)"
fix1_before = 'Get Schema Markup ($197)</a></p>\n</p></div>\n<aside'
fix1_after = 'Get Schema Markup ($197)</a></p>\n</div>\n<aside'

# Fix #2: Remove extra </p> after rich results strategies  
fix2_before = 'and rich results strategies.</p>\n</p></div>\n</section>'
fix2_after = 'and rich results strategies.</p>\n</div>\n</section>'

# Fix #3: Close the TOC <p> tag
fix3_before = 'Start Building Your Structured Data Foundation</a>\n    </div>\n</aside>'
fix3_after = 'Start Building Your Structured Data Foundation</a>\n    </p>\n</div>\n</aside>'

print("Checking for fixes...")
fix1_found = fix1_before in content
fix2_found = fix2_before in content
fix3_found = fix3_before in content

print(f"FIX #1 (Remove extra </p> after Get Schema Markup): {'FOUND' if fix1_found else 'NOT FOUND'}")
print(f"FIX #2 (Remove extra </p> after rich results): {'FOUND' if fix2_found else 'NOT FOUND'}")
print(f"FIX #3 (Close TOC <p> tag): {'FOUND' if fix3_found else 'NOT FOUND'}")

# Apply fixes
if fix1_found:
    content = content.replace(fix1_before, fix1_after)
    print("[OK] Applied FIX #1")
if fix2_found:
    content = content.replace(fix2_before, fix2_after)
    print("[OK] Applied FIX #2")
if fix3_found:
    content = content.replace(fix3_before, fix3_after)
    print("[OK] Applied FIX #3")

print(f"\nOriginal content length: {original_len} bytes")
print(f"Fixed content length: {len(content)} bytes")
print(f"Bytes removed: {original_len - len(content)}")

# Verify
p_tags = content.count('<p')
p_close = content.count('</p>')
print(f"\nTag balance check:")
print(f"  <p tags found: {p_tags}")
print(f"  </p> tags found: {p_close}")

# Save fixed version
data['content']['rendered'] = content
with open('page_297_fixed.json', 'w') as f:
    json.dump(data, f, indent=2)

print("\n[OK] Fixed JSON saved to page_297_fixed.json")
print("Ready for deployment via REST API or database update.")

# Show before/after snippets
print("\n" + "="*70)
print("VERIFICATION SNIPPETS")
print("="*70)

if 'Get Schema Markup ($197)</a></p>' in content:
    idx = content.find('Get Schema Markup ($197)')
    snippet = content[idx:idx+200]
    print(f"\nAfter Fix #1 - Get Schema Markup area:")
    print(snippet[:100] + "...")
