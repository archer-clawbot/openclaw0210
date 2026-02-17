import sys
import markdown2
from weasyprint import HTML
import os

md_path = sys.argv[1]
pdf_path = sys.argv[2]

with open(md_path, 'r', encoding='utf-8') as f:
    md_content = f.read()

html_content = markdown2.markdown(md_content, extras=['tables', 'fenced-code-blocks', 'header-ids'])

styled_html = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ font-family: 'Segoe UI', Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 0 40px; color: #1a1a1a; line-height: 1.6; }}
  h1 {{ font-size: 28px; border-bottom: 3px solid #2563eb; padding-bottom: 10px; color: #1e3a5f; }}
  h2 {{ font-size: 20px; color: #2563eb; margin-top: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }}
  h3 {{ font-size: 16px; color: #374151; margin-top: 20px; }}
  h4 {{ font-size: 14px; color: #6b7280; }}
  table {{ width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }}
  th {{ background: #2563eb; color: white; padding: 8px 12px; text-align: left; }}
  td {{ padding: 7px 12px; border-bottom: 1px solid #e5e7eb; }}
  tr:nth-child(even) td {{ background: #f9fafb; }}
  code {{ background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-size: 12px; }}
  pre {{ background: #f3f4f6; padding: 16px; border-radius: 6px; overflow-x: auto; font-size: 12px; }}
  blockquote {{ border-left: 4px solid #2563eb; margin: 0; padding: 8px 16px; background: #eff6ff; color: #374151; }}
  ul, ol {{ padding-left: 24px; }}
  li {{ margin-bottom: 4px; }}
  strong {{ color: #111827; }}
  hr {{ border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }}
  a {{ color: #2563eb; }}
  @page {{ margin: 40px; }}
</style>
</head>
<body>
{html_content}
</body>
</html>
"""

HTML(string=styled_html).write_pdf(pdf_path)
print(f"PDF saved to: {pdf_path}")
