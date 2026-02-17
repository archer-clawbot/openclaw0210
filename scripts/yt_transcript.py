#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple YouTube Transcript Extractor
Usage: python yt_transcript.py <youtube_url>
"""

import sys
import re

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
    # If no match, assume it's already a video ID
    return url

def main():
    if len(sys.argv) != 2:
        print("Usage: python yt_transcript.py <youtube_url>", file=sys.stderr)
        sys.exit(1)
    
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        
        video_id = extract_video_id(sys.argv[1])
        
        # Fetch transcript
        api = YouTubeTranscriptApi()
        transcript_data = api.fetch(video_id, languages=['en'])
        
        # Combine all text segments
        full_text = ' '.join([entry['text'] for entry in transcript_data])
        
        # Clean up
        full_text = full_text.replace('[Music]', '').replace('[Applause]', '')
        full_text = ' '.join(full_text.split())
        
        # Print with proper encoding
        print(full_text, flush=True)
        
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
