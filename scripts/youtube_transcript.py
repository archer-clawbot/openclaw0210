#!/usr/bin/env python3
"""
YouTube Transcript Extractor
Usage: python youtube_transcript.py <video_url_or_id>
"""

import sys
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound

def extract_video_id(url_or_id):
    """Extract video ID from various YouTube URL formats"""
    if len(url_or_id) == 11 and not '/' in url_or_id:
        return url_or_id
    
    # Handle various YouTube URL formats
    import re
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)',
        r'youtube\.com\/watch\?.*v=([^&\n?#]+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url_or_id)
        if match:
            return match.group(1)
    
    return url_or_id

def get_transcript(video_url_or_id):
    """Fetch and format transcript from YouTube video"""
    try:
        video_id = extract_video_id(video_url_or_id)
        
        # Get transcript (tries English first, then any available language)
        try:
            transcript_data = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        except NoTranscriptFound:
            # Try any available transcript
            transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Format as plain text (combine all text segments)
        full_text = ' '.join([entry['text'] for entry in transcript_data])
        
        # Clean up common transcript artifacts
        full_text = full_text.replace('[Music]', '').replace('[Applause]', '')
        full_text = ' '.join(full_text.split())  # Normalize whitespace
        
        print(full_text)
        return 0
        
    except TranscriptsDisabled:
        print("ERROR: Transcripts are disabled for this video", file=sys.stderr)
        return 1
    except NoTranscriptFound:
        print("ERROR: No transcript found for this video", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python youtube_transcript.py <video_url_or_id>", file=sys.stderr)
        sys.exit(1)
    
    sys.exit(get_transcript(sys.argv[1]))
