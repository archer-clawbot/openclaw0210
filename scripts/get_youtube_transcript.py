#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
YouTube Transcript Extractor for OpenClaw
Usage: python get_youtube_transcript.py <youtube_url>
"""

import sys
import re
import io

# Fix Windows console encoding
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def extract_video_id(url):
    """Extract video ID from YouTube URL"""
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)',
        r'youtube\.com\/embed\/([^&\n?#]+)'
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return url

def main():
    if len(sys.argv) != 2:
        print("Usage: python get_youtube_transcript.py <youtube_url>", file=sys.stderr)
        sys.exit(1)
    
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        
        video_id = extract_video_id(sys.argv[1])
        api = YouTubeTranscriptApi()
        transcript = api.fetch(video_id, languages=['en'])
        
        # Extract text from all snippets
        text_parts = []
        for snippet in transcript.snippets:
            # snippet is a TranscriptSnippet with a 'text' attribute
            if hasattr(snippet, 'text'):
                text_parts.append(snippet.text)
        
        full_text = ' '.join(text_parts)
        
        # Clean up
        full_text = full_text.replace('[Music]', '').replace('[Applause]', '')
        full_text = ' '.join(full_text.split())
        
        print(full_text)
        return 0
        
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    sys.exit(main())
