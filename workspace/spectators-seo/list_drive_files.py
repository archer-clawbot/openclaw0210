"""
List Google Drive files from public folder using Google API
"""
import requests
import json
import re

def get_folder_files(folder_id):
    """Get file list from a public Google Drive folder"""
    
    # Google Drive embed endpoint that returns folder contents
    url = f"https://drive.google.com/embeddedfolderview?id={folder_id}"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}")
        return []
    
    # Parse the HTML to find file info
    # Files are listed in flip-entry elements
    files = []
    
    # Pattern to extract file ID and name from the page
    # Looking for: data-id="FILE_ID" and title="FILENAME"
    pattern = r'data-id="([^"]+)"[^>]*>[^<]*<div[^>]*class="flip-entry-title"[^>]*>([^<]+)</div>'
    matches = re.findall(pattern, response.text, re.DOTALL)
    
    if not matches:
        # Try alternative: look for anchor tags with file links
        pattern2 = r'/file/d/([^/]+)/[^"]*"[^>]*title="([^"]+)"'
        matches = re.findall(pattern2, response.text)
    
    if not matches:
        # Another pattern for newer Drive UI
        pattern3 = r'"([1][a-zA-Z0-9_-]{30,45})","([^"]+\.mp4)"'
        matches = re.findall(pattern3, response.text)
    
    for file_id, filename in matches:
        files.append({
            'id': file_id,
            'name': filename.strip(),
            'view_url': f'https://drive.google.com/file/d/{file_id}/view',
            'download_url': f'https://drive.google.com/uc?id={file_id}&export=download'
        })
    
    return files

# Get files from the Apex SEO training folder
folder_id = '1o0oSDHtHFS81WMxLjMb8XpujS_mDgHYm'
files = get_folder_files(folder_id)

print(f"Found {len(files)} files")
for f in files:
    print(f"  {f['name']}: {f['id']}")

# Save to JSON
with open('video_files.json', 'w') as f:
    json.dump(files, f, indent=2)

print(f"\nSaved to video_files.json")
