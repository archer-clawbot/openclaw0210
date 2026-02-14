import requests

r = requests.get('https://darkgreen-moose-683278.hostingersite.com/learn/schema-markup-guide/')
html = r.text

# Find where </p></div> appears multiple times
hero_start = html.find('HERO SECTION')
if hero_start > -1:
    search_area = html[hero_start:hero_start+15000]
    
    # Find suspicious patterns
    double_close_p = search_area.find('</p>\n</p>')
    if double_close_p > -1:
        print('FOUND DOUBLE </p> at position:', double_close_p)
        print('Context:', search_area[double_close_p-100:double_close_p+100])
    
    # Look for orphaned </p>
    import re
    # Count opening vs closing p tags in first 10000 chars
    opens = len(re.findall(r'<p[>\s]', search_area[:10000]))
    closes = len(re.findall(r'</p>', search_area[:10000]))
    print(f'\nFirst 10k chars: <p> opens={opens}, </p> closes={closes}, diff={closes-opens}')
    
    # Find the problematic hero section closing
    hero_end_idx = search_area.find('</section>')
    if hero_end_idx > -1:
        hero_section = search_area[:hero_end_idx+11]
        hero_closes = len(re.findall(r'</p>', hero_section))
        hero_opens = len(re.findall(r'<p[>\s]', hero_section))
        print(f'\nHero section: <p> opens={hero_opens}, </p> closes={hero_closes}')
        
        if hero_closes > hero_opens:
            print(f'\n⚠️ FOUND ISSUE: {hero_closes - hero_opens} extra </p> tags in hero section')
            
            # Find them
            last_500 = hero_section[-500:]
            print('\nLast 500 chars of hero section:')
            print(last_500)
