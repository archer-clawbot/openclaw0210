"""
Geo-Grid Rank Tracker Configuration
Spectators Bar & Grill - 3 Locations
"""

import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

# Database
DATABASE_PATH = BASE_DIR / "rankings.db"

# Report output
REPORTS_DIR = BASE_DIR / "reports"
REPORTS_DIR.mkdir(exist_ok=True)

# API Configuration (set via environment or .env file)
# Supports: serpapi, dataforseo, valueserp, outscraper
SEARCH_API_PROVIDER = os.getenv("SEARCH_API_PROVIDER", "serpapi")
SERPAPI_KEY = os.getenv("SERPAPI_KEY", "")
DATAFORSEO_LOGIN = os.getenv("DATAFORSEO_LOGIN", "")
DATAFORSEO_PASSWORD = os.getenv("DATAFORSEO_PASSWORD", "")
VALUESERP_KEY = os.getenv("VALUESERP_KEY", "")
OUTSCRAPER_KEY = os.getenv("OUTSCRAPER_KEY", "")

# Search Configuration
SEARCH_KEYWORD = "sports bar"
SEARCH_RADIUS_MILES = 5
GRID_SIZE = 7  # 7x7 = 49 points per location

# Spectators Locations
LOCATIONS = {
    "sugar_land": {
        "name": "Spectators Bar and Grill - Sugar Land",
        "address": "1525 Lake Pointe Pkwy, Suite 100, Sugar Land, TX 77478",
        "lat": 29.5963,
        "lng": -95.6349,
        "place_id": "ChIJaeU0eljnQIYRLev1HGn-0Ew",  # Google Place ID
        "phone": "+1-346-874-7275"
    },
    "riverstone": {
        "name": "Spectators Bar and Grill - Riverstone", 
        "address": "18702 University Blvd, Sugar Land, TX 77479",
        "lat": 29.5389,
        "lng": -95.6792,
        "place_id": None,  # Need to look up
        "phone": "+1-346-585-3078"
    },
    "harvest_green": {
        "name": "Spectators Bar and Grill - Harvest Green",
        "address": "18822 West Airport Blvd, #700, Richmond, TX 77406",
        "lat": 29.5456,
        "lng": -95.7512,
        "place_id": None,  # Need to look up
        "phone": "+1-346-391-8065"
    }
}

# Ranking thresholds for heatmap coloring
RANK_COLORS = {
    1: "#22c55e",      # Green - #1
    2: "#4ade80",      # Light green - #2
    3: "#86efac",      # Lighter green - #3
    (4, 5): "#fbbf24", # Yellow - #4-5
    (6, 10): "#fb923c", # Orange - #6-10
    (11, 20): "#f87171", # Red - #11-20
    None: "#9ca3af"    # Gray - Not found
}
