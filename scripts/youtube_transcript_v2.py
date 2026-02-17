#!/usr/bin/env python3
"""
YouTube Transcript Extractor using yt-dlp
Usage: python youtube_transcript_v2.py <video_url>
"""

import sys
import subprocess
import json
import tempfile
import os

def get_transcript(video_url):
    """Extract transcript using yt-dlp"""
    try:
        # Use yt-dlp to extract subtitle/transcript info
        cmd = [
            'python', '-m', 'yt_dlp',
            '--skip-download',
            '--write-auto-subs',
            '--write-subs',
            '--sub-langs', 'en',
            '--sub-format', 'json3',
            '--print', '%(subtitles)j',
            video_url
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        
        if result.returncode != 0:
            print(f"ERROR: {result.stderr}", file=sys.stderr)
            return 1
        
        # Parse subtitle data
        try:
            subtitle_data = json.loads(result.stdout.strip())
            # Get English subtitles if available
            if 'en' in subtitle_data:
                subtitle_url = subtitle_data['en'][0]['url']
                # Fetch the subtitle content
                import urllib.request
                with urllib.request.urlopen(subtitle_url) as response:
                    subtitle_json = json.loads(response.read().decode('utf-8'))
                    # Extract text from subtitle events
                    transcript = ' '.join([
                        event.get('segs', [{}])[0].get('utf8', '')
                        for event in subtitle_json.get('events', [])
                        if event.get('segs')
                    ])
                    # Clean up
                    transcript = transcript.replace('\\n', ' ').strip()
                    transcript = ' '.join(transcript.split())
                    print(transcript)
                    return 0
        except (json.JSONDecodeError, KeyError, IndexError) as e:
            pass
        
        # Fallback: use simpler yt-dlp command
        with tempfile.TemporaryDirectory() as tmpdir:
            cmd = [
                'python', '-m', 'yt_dlp',
                '--skip-download',
                '--write-auto-subs',
                '--sub-format', 'vtt',
                '--sub-langs', 'en',
                '-o', os.path.join(tmpdir, 'transcript'),
                video_url
            ]
            subprocess.run(cmd, capture_output=True, check=True)
            
            # Find and read the VTT file
            vtt_file = None
            for file in os.listdir(tmpdir):
                if file.endswith('.vtt'):
                    vtt_file = os.path.join(tmpdir, file)
                    break
            
            if vtt_file:
                with open(vtt_file, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    # Extract just the text (skip timestamps and WEBVTT headers)
                    text_lines = []
                    for line in lines:
                        line = line.strip()
                        if line and not line.startswith('WEBVTT') and not '-->' in line and not line.isdigit():
                            text_lines.append(line)
                    transcript = ' '.join(text_lines)
                    # Clean up
                    transcript = transcript.replace('[Music]', '').replace('[Applause]', '')
                    transcript = ' '.join(transcript.split())
                    print(transcript)
                    return 0
            else:
                print("ERROR: No subtitle file found", file=sys.stderr)
                return 1
                
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python youtube_transcript_v2.py <video_url>", file=sys.stderr)
        sys.exit(1)
    
    sys.exit(get_transcript(sys.argv[1]))
