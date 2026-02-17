import sys
import markdown2

md_path = sys.argv[1]
html_path = sys.argv[2]

with open(md_path, 'r', encoding='utf-8') as f:
    md_content = f.read()

html_content = markdown2.markdown(md_content, extras=['tables', 'fenced-code-blocks', 'header-ids'])

styled_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>CATALYST Audit — Dunham Integrative Family Health</title>
<style>
  body {{ font-family: 'Segoe UI', Arial, sans-serif; max-width: 860px; margin: 40px auto; padding: 0 40px; color: #1a1a1a; line-height: 1.7; font-size: 14px; }}
  h1 {{ font-size: 26px; border-bottom: 3px solid #2563eb; padding-bottom: 10px; color: #1e3a5f; margin-top: 32px; }}
  h2 {{ font-size: 19px; color: #2563eb; margin-top: 28px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }}
  h3 {{ font-size: 15px; color: #374151; margin-top: 20px; }}
  h4 {{ font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }}
  table {{ width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }}
  th {{ background: #2563eb; color: white; padding: 8px 12px; text-align: left; }}
  td {{ padding: 7px 12px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }}
  tr:nth-child(even) td {{ background: #f9fafb; }}
  code {{ background: #f3f4f6; padding: 2px 5px; border-radius: 3px; font-size: 12px; font-family: monospace; }}
  pre {{ background: #f3f4f6; padding: 14px; border-radius: 6px; font-size: 12px; overflow-x: auto; }}
  blockquote {{ border-left: 4px solid #2563eb; margin: 12px 0; padding: 8px 16px; background: #eff6ff; }}
  ul, ol {{ padding-left: 22px; }}
  li {{ margin-bottom: 4px; }}
  hr {{ border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }}
  strong {{ color: #111; }}
  @media print {{
    body {{ margin: 0; padding: 20px; }}
    h2 {{ page-break-before: auto; }}
    table {{ page-break-inside: avoid; }}
  }}
</style>
</head>
<body>
{html_content}
</body>
</html>"""

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(styled_html)

print(f"HTML saved: {html_path}")
