"""
Use Google Drive API to list files in a public shared folder
No authentication needed for public folders
"""
import requests
import json
import re

# Google Drive API key (free tier, works for public files)
# This is a public API endpoint that doesn't require auth for shared folders
folder_id = '1o0oSDHtHFS81WMxLjMb8XpujS_mDgHYm'

def get_public_folder_files(folder_id):
    """
    For public folders, we can use the export endpoint pattern
    to get file metadata
    """
    files = []
    
    # Method 1: Try the Drive API v3 files.list with folder query
    # This requires an API key but works for public folders
    
    # Method 2: Parse the folder page HTML
    url = f"https://drive.google.com/drive/folders/{folder_id}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml'
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        html = response.text
        
        # Google Drive stores file data in JavaScript variables
        # Look for patterns like: "FILE_ID", ["filename"]
        # or data-id attributes
        
        # Pattern 1: Look for file IDs in the format used by Drive
        # Files IDs are typically 28-33 characters, start with 1
        # followed by alphanumeric and - _
        
        # The page contains data like: ["1xxxxx",["filename.mp4"]]
        pattern = r'\["(1[a-zA-Z0-9_-]{20,45})"\s*,\s*\[\s*"([^"]+\.mp4)"\s*\]'
        matches = re.findall(pattern, html)
        
        if matches:
            for file_id, filename in matches:
                files.append({
                    'id': file_id,
                    'name': filename,
                    'download_url': f'https://drive.google.com/uc?id={file_id}&export=download'
                })
        else:
            # Try alternate pattern - Google sometimes uses different formats
            # Look for: id="FILE_ID" with nearby filename
            pattern2 = r'data-id="(1[a-zA-Z0-9_-]{20,45})"[^>]*>[^<]*screen-\d+-\d+\.mp4'
            # Or patterns in the JS state
            pattern3 = r'"(1[a-zA-Z0-9_-]{28,33})","screen-(\d+-\d+)\.mp4"'
            matches = re.findall(pattern3, html)
            
            for file_id, timestamp in matches:
                filename = f'screen-{timestamp}.mp4'
                files.append({
                    'id': file_id,
                    'name': filename,
                    'download_url': f'https://drive.google.com/uc?id={file_id}&export=download'
                })
        
        # Debug: print some of the HTML structure
        if not files:
            # Look for any file IDs
            all_ids = re.findall(r'"(1[a-zA-Z0-9_-]{28,33})"', html)
            print(f"Found {len(all_ids)} potential file IDs")
            
            # Look for mp4 filenames
            all_files = re.findall(r'screen-\d+-\d+\.mp4', html)
            print(f"Found {len(all_files)} mp4 filenames")
            
            # Save sample of HTML for debugging
            with open('drive_page_sample.html', 'w', encoding='utf-8') as f:
                f.write(html[:50000])
            print("Saved HTML sample to drive_page_sample.html")
    
    return files

print("Attempting to list files from public folder...")
files = get_public_folder_files(folder_id)

if files:
    print(f"\nFound {len(files)} files:")
    for f in files:
        print(f"  {f['name']}: {f['id']}")
    
    with open('video_files.json', 'w') as f:
        json.dump(files, f, indent=2)
    print(f"\nSaved to video_files.json")
else:
    print("\nCould not extract file list. Checking saved HTML...")
