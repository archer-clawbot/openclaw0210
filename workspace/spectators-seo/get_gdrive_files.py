"""
Get Google Drive file IDs from shared folder
"""
import requests
import re
import json

folder_id = '1o0oSDHtHFS81WMxLjMb8XpujS_mDgHYm'
url = f'https://drive.google.com/drive/folders/{folder_id}'

session = requests.Session()
res = session.get(url)

# Extract file data from the page HTML/JS
# Google Drive embeds file info in JavaScript
files = []

# Pattern to find file entries in the Drive page source
# The format is typically: ["FILE_ID",["filename.ext"]]
text = res.text

# Find all mp4 file references
# Look for patterns like: "1abc...xyz","screen-20260204...mp4"
pattern = r'"(1[a-zA-Z0-9_-]{30,45})","(screen-[^"]+\.mp4)"'
matches = re.findall(pattern, text)

if not matches:
    # Try alternative pattern
    pattern = r'"(1[a-zA-Z0-9_-]{25,})"\s*,\s*\[\s*"(screen-[^"]+\.mp4)"'
    matches = re.findall(pattern, text)

if not matches:
    # Try to find any file IDs and names separately
    file_ids = re.findall(r'"(1[a-zA-Z0-9_-]{30,45})"', text)
    file_names = re.findall(r'"(screen-\d+-\d+\.mp4)"', text)
    print(f"Found {len(file_ids)} potential file IDs")
    print(f"Found {len(file_names)} file names")
    
    # Print unique file names
    unique_names = list(set(file_names))
    unique_names.sort()
    for name in unique_names[:30]:
        print(f"File: {name}")
else:
    print(f"Found {len(matches)} files")
    for file_id, filename in matches:
        download_url = f'https://drive.google.com/uc?id={file_id}&export=download'
        print(f"{filename}: {file_id}")

# Save results
output = {
    'folder_id': folder_id,
    'files': [{'id': m[0], 'name': m[1]} for m in matches] if matches else []
}

with open('gdrive_files.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"\nSaved to gdrive_files.json")
