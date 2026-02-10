"""
List Google Drive files using gdown's internal API
"""
import gdown
import json
import os

folder_url = 'https://drive.google.com/drive/folders/1o0oSDHtHFS81WMxLjMb8XpujS_mDgHYm'
output_dir = 'gdrive_file_list'

# Use gdown to get file list (it handles Google's JS-rendered pages)
try:
    # This will list files without downloading
    from gdown.download_folder import _get_folder_list
    
    folder_id = '1o0oSDHtHFS81WMxLjMb8XpujS_mDgHYm'
    files = _get_folder_list(folder_id)
    
    print(f"Found {len(files)} files:")
    file_data = []
    for f in files:
        file_info = {
            'id': f.id,
            'name': f.name,
            'url': f'https://drive.google.com/file/d/{f.id}/view',
            'download_url': f'https://drive.google.com/uc?id={f.id}&export=download'
        }
        file_data.append(file_info)
        print(f"  {f.name} ({f.id})")
    
    # Save to JSON
    with open('video_files.json', 'w') as f:
        json.dump(file_data, f, indent=2)
    
    print(f"\nSaved file list to video_files.json")
    
except Exception as e:
    print(f"Error: {e}")
    print("Trying alternative method...")
    
    # Fallback: just download the folder listing
    import subprocess
    result = subprocess.run(['python', '-m', 'gdown', '--folder', folder_url, '--dry-run'], 
                          capture_output=True, text=True)
    print(result.stdout)
    print(result.stderr)
