# SPEC-015: Geo-Grid Rank Tracking & Analytics
## Silas Engine — Route 5: Tracking, CTR & Reporting Pipeline
### Version 1.0 | Tracking & Reporting Group

---

## 1. PURPOSE

This specification defines Silas's geo-grid rank tracking system — the measurement backbone that quantifies every optimization performed across Routes 1–4. Without tracking, optimization is guesswork. This spec transforms raw SerpAPI grid data into actionable metrics (SoLV, Weighted Visibility Score, Opportunity Matrix) and establishes the automated pipeline from data collection through Looker Studio visualization.

**Core principle:** "If you can't measure it in a grid, you can't prove it moved."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-001: GBP Services Optimization | Tracks ranking impact of service entry changes |
| SPEC-002: GBP Description Engineering | Measures description optimization lift |
| SPEC-003: GBP Q&A Pre-emption | Correlates Q&A seeding with justification snippet frequency |
| SPEC-004: GBP Products Tab | Tracks product tab optimization impact |
| SPEC-005: GBP Posting Strategy | Measures post cadence vs. rank volatility |
| SPEC-006: Semantic Location Silo | Validates silo pages driving geo-specific rank improvements |
| SPEC-007: Grounding Box Offensive | Tracks AI Overview capture rates per grid point |
| SPEC-008: Schema & Structured Data | Validates schema deployment impact on rich results |
| SPEC-009: Technical SEO Foundation | Core Web Vitals correlation with rank positions |
| SPEC-010: On-Page Content Optimization | Content quality impact on organic + map rankings |
| SPEC-011: Citation Building & NAP | Citation consistency correlation with grid positions |
| SPEC-012: Review Management | Review velocity/sentiment impact on rankings |
| SPEC-013: Expired Domain Acquisition | Link authority impact tracking over time |
| SPEC-014: Local PBN Architecture | PBN link deployment impact measurement |
| SPEC-016: Client Reporting System | Consumes all metrics produced here for client-facing reports |

---

## 3. SYSTEM ARCHITECTURE

### 3.1 Data Flow Pipeline

```
[SerpAPI] → [Google Sheets (raw data)] → [Calculated Fields] → [Looker Studio] → [Client Reports]
     ↓              ↓                           ↓                     ↓
  API calls    Apps Script            SoLV / WVS / Distance      Dashboards
  per keyword   automation            formulas applied            & exports
```

### 3.2 Component Stack

| Component | Role | Cost |
|-----------|------|------|
| SerpAPI | Grid-based local rank data collection | ~$50/mo (5,000 searches) |
| Google Sheets | Raw data storage + Apps Script automation | Free |
| Google Apps Script | Scheduled API calls + data processing | Free |
| Looker Studio | Visualization + dashboards + client access | Free |
| Claude API (Silas) | Analysis, anomaly detection, recommendations | Variable |

### 3.3 Template Resources

| Resource | URL |
|----------|-----|
| Google Sheet + Script Template | https://docs.google.com/spreadsheets/d/1zFI3OP33gpXgaaId6TtWKipfY-B-xT6UsWrUNED93o4/edit |
| Looker Studio Dashboard Template | https://lookerstudio.google.com/reporting/cf951815-e313-4041-a2b2-bd0c9b0bc3e2 |
| SerpAPI Account | https://serpapi.com/ |

---

## 4. GEO-GRID FUNDAMENTALS

### 4.1 What Is a Geo-Grid?

A geo-grid overlays a geographic area with evenly spaced coordinate points, then performs a Google Maps local search from each point. This reveals how rankings change based on the searcher's physical location — the single most important ranking factor for local SEO.

Unlike traditional rank trackers that check from one location, a geo-grid exposes the full geographic footprint of a business's visibility.

### 4.2 Grid Configuration Parameters

| Parameter | Recommended Default | Notes |
|-----------|-------------------|-------|
| Grid size | 7×7 (49 points) | Sweet spot between coverage and API cost |
| Grid radius | 5 miles from business | Covers typical service area |
| Point spacing | ~1.67 miles apart | Derived from radius / grid dimension |
| Keywords tracked | 5–10 per location | Primary service + geo-modified variants |
| Scan frequency | Weekly | Monthly minimum, weekly ideal |
| Results depth | Top 20 per point | Captures positions 1–20 at each grid point |

### 4.3 Grid Size Options

| Grid | Points | API Calls/Keyword | Monthly Cost (weekly, 5 keywords) |
|------|--------|-------------------|----------------------------------|
| 3×3 | 9 | 9 | ~$1.80 |
| 5×5 | 25 | 25 | ~$5.00 |
| 7×7 | 49 | 49 | ~$9.80 |
| 9×9 | 81 | 81 | ~$16.20 |
| 11×11 | 121 | 121 | ~$24.20 |

**Cost calculation:** $0.01/search × points × keywords × 4 weeks

### 4.4 Grid Point Generation

Given a center point (business lat/lng) and radius, generate an evenly distributed NxN grid:

```
Algorithm: Grid Point Generator
Input: center_lat, center_lng, radius_miles, grid_size
Output: Array of {lat, lng} coordinate pairs

1. Convert radius to degrees:
   lat_offset = radius_miles / 69.0
   lng_offset = radius_miles / (69.0 * cos(center_lat * π / 180))

2. Calculate step size:
   lat_step = (2 * lat_offset) / (grid_size - 1)
   lng_step = (2 * lng_offset) / (grid_size - 1)

3. Generate points:
   start_lat = center_lat - lat_offset
   start_lng = center_lng - lng_offset
   
   For row = 0 to grid_size - 1:
     For col = 0 to grid_size - 1:
       point_lat = start_lat + (row * lat_step)
       point_lng = start_lng + (col * lng_step)
       Add {lat: point_lat, lng: point_lng} to grid
```

---

## 5. SERPAPI INTEGRATION

### 5.1 API Call Structure

Each grid point generates one SerpAPI call per keyword:

```
Endpoint: google_maps
Parameters:
  q: "{keyword}"
  ll: "@{lat},{lng},14z"    ← Grid point coordinates + zoom level
  type: "search"
  hl: "en"
  gl: "us"
```

### 5.2 Response Data Extraction

From each API response, extract and store:

| Field | Column | Source |
|-------|--------|--------|
| Keyword | A | Query parameter |
| Grid Point Lat | B | Grid coordinates |
| Grid Point Lng | C | Grid coordinates |
| Business Center Lat | D | Client business location |
| Business Center Lng | E | Client business location |
| Scan Date | F | Timestamp |
| Position | G | Result index (1-20) |
| Business Name (Title) | H | `local_results[i].title` |
| Address | I | `local_results[i].address` |
| Phone | J | `local_results[i].phone` |
| Rating | K | `local_results[i].rating` |
| Reviews | L | `local_results[i].reviews` |
| Category | M | `local_results[i].type` |
| Result Lat | N | `local_results[i].gps_coordinates.latitude` |
| Result Lng | O | `local_results[i].gps_coordinates.longitude` |
| Place ID | P | `local_results[i].place_id` |
| Data ID | Q | `local_results[i].data_id` |
| Thumbnail | R | `local_results[i].thumbnail` |
| Description | S | `local_results[i].description` |
| Extensions JSON | T | `JSON.stringify(local_results[i].extensions)` |

### 5.3 Google Apps Script — Automated Scan

```javascript
// Core scanning function — called by time-based trigger
function runGridScan() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RawData");
  var configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
  
  var apiKey = configSheet.getRange("B1").getValue(); // SerpAPI key
  var keywords = configSheet.getRange("B3:B12").getValues().flat().filter(k => k !== "");
  var centerLat = configSheet.getRange("B14").getValue();
  var centerLng = configSheet.getRange("B15").getValue();
  var gridSize = configSheet.getRange("B16").getValue() || 7;
  var radiusMiles = configSheet.getRange("B17").getValue() || 5;
  
  var gridPoints = generateGrid(centerLat, centerLng, radiusMiles, gridSize);
  var scanDate = new Date().toISOString();
  
  keywords.forEach(function(keyword) {
    gridPoints.forEach(function(point) {
      var url = "https://serpapi.com/search.json" +
        "?engine=google_maps" +
        "&q=" + encodeURIComponent(keyword) +
        "&ll=@" + point.lat + "," + point.lng + ",14z" +
        "&type=search" +
        "&hl=en&gl=us" +
        "&api_key=" + apiKey;
      
      try {
        var response = UrlFetchApp.fetch(url);
        var data = JSON.parse(response.getContentText());
        var results = data.local_results || [];
        
        results.forEach(function(result, index) {
          sheet.appendRow([
            keyword,
            point.lat,
            point.lng,
            centerLat,
            centerLng,
            scanDate,
            index + 1,  // Position (1-based)
            result.title || "",
            result.address || "",
            result.phone || "",
            result.rating || "",
            result.reviews || 0,
            result.type || "",
            result.gps_coordinates ? result.gps_coordinates.latitude : "",
            result.gps_coordinates ? result.gps_coordinates.longitude : "",
            result.place_id || "",
            result.data_id || "",
            result.thumbnail || "",
            result.description || "",
            JSON.stringify(result.extensions || {})
          ]);
        });
        
        Utilities.sleep(1000); // Rate limiting — 1 second between calls
      } catch(e) {
        Logger.log("Error for " + keyword + " at " + point.lat + "," + point.lng + ": " + e);
      }
    });
  });
}

function generateGrid(centerLat, centerLng, radiusMiles, gridSize) {
  var latOffset = radiusMiles / 69.0;
  var lngOffset = radiusMiles / (69.0 * Math.cos(centerLat * Math.PI / 180));
  var latStep = (2 * latOffset) / (gridSize - 1);
  var lngStep = (2 * lngOffset) / (gridSize - 1);
  var startLat = centerLat - latOffset;
  var startLng = centerLng - lngOffset;
  var points = [];
  
  for (var row = 0; row < gridSize; row++) {
    for (var col = 0; col < gridSize; col++) {
      points.push({
        lat: Math.round((startLat + row * latStep) * 1000000) / 1000000,
        lng: Math.round((startLng + col * lngStep) * 1000000) / 1000000
      });
    }
  }
  return points;
}

// Set up weekly trigger
function createWeeklyTrigger() {
  ScriptApp.newTrigger('runGridScan')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(4)  // 4 AM — low traffic period
    .create();
}
```

### 5.4 API Cost Management

| Strategy | Implementation |
|----------|---------------|
| Start small | Begin with 3×3 grid, expand once value is proven |
| Keyword prioritization | Track only primary money keywords first |
| Scan timing | Weekly is sufficient; daily is wasteful for most clients |
| Batch scheduling | Stagger client scans across different days |
| Cache results | Store all data; never re-fetch the same date+point+keyword |

**Budget allocation per client tier:**

| Tier | Grid | Keywords | Frequency | Monthly Cost |
|------|------|----------|-----------|-------------|
| Starter | 5×5 | 3 | Bi-weekly | ~$1.50 |
| Standard | 7×7 | 5 | Weekly | ~$9.80 |
| Premium | 9×9 | 10 | Weekly | ~$32.40 |
| Enterprise | 11×11 | 15 | Weekly | ~$72.60 |

---

## 6. CALCULATED FIELDS & FORMULAS

### 6.1 Office Distance (Miles)

Calculates the distance between each grid point and the business location. Critical for understanding the proximity factor — the single strongest local ranking signal.

**Google Sheets formula (Column U):**

```
=IF(OR(ISBLANK(N2), ISBLANK(O2)), "",
  ACOS(
    COS(RADIANS(90-E2)) * COS(RADIANS(90-N2)) +
    SIN(RADIANS(90-E2)) * SIN(RADIANS(90-N2)) *
    COS(RADIANS(F2-O2))
  ) * 3959
)
```

Where:
- E2 = Business center latitude
- F2 = Business center longitude (Note: uses column F, not E — verify column mapping per sheet)
- N2 = Result business latitude
- O2 = Result business longitude
- 3959 = Earth's radius in miles

**Interpretation:**
- 0–1 mile: Proximity dominant zone — should rank top 3 almost always
- 1–3 miles: Competitive zone — other signals (reviews, relevance) determine position
- 3–5 miles: Stretch zone — only strong profiles rank here
- 5+ miles: Authority zone — requires exceptional signals to appear

### 6.2 Competitor Label Extraction

Extracts competitor business names from the extensions JSON for quick identification:

**Google Sheets formula (Column V):**

```
=IFERROR(REGEXEXTRACT(T2, """description"":""([^""]+)"""), "None")
```

### 6.3 Is Map Pack (Calculated Field — Looker Studio)

Identifies whether a result appeared in the top 3 (Map Pack):

```sql
CASE 
  WHEN Position <= 3 THEN "Yes" 
  ELSE "No" 
END
```

### 6.4 SoLV — Share of Local Voice

**The premier metric for 2026.** SoLV moves beyond average rank (easily skewed by a few outlier positions) and focuses on market dominance — what percentage of the Map Pack does a business own?

**Concept:**
If there are 49 grid points (7×7), there are 147 available Map Pack slots (49 × 3). If a business appears in 50 of those slots, they own 34% of the local voice for that keyword.

**Looker Studio implementation:**

```
Chart Type: Pie Chart (or Donut Chart)
Dimension: Title (Business Name)
Metric: Record Count
Filter: "Map Pack Only" → Include Position <= 3
Sort: Descending
```

**SoLV formula (if calculating manually):**

```
SoLV = (Count of Map Pack appearances for Business X) / (Total grid points × 3) × 100
```

**Benchmarks:**

| SoLV Range | Interpretation |
|------------|---------------|
| 0–5% | Invisible — urgent optimization needed |
| 5–15% | Emerging — gaining traction but not dominant |
| 15–30% | Competitive — solid presence, room to grow |
| 30–50% | Dominant — strong market position |
| 50%+ | Market leader — focus on defense |

**Client communication template:**
"We own [X]% of the Map Pack real estate for '[keyword]'. Our next closest competitor, '[Competitor Name]', owns [Y]%. Our goal is to increase our share from [X]% to [target]% by [date]."

### 6.5 Weighted Visibility Score (WVS)

Standard SoLV treats Rank #1 and Rank #3 as equal. But Rank #1 gets roughly 5× the clicks of Rank #3. WVS assigns weighted points to give a "True Power Score."

**Point allocation:**

| Position | Points | Rationale |
|----------|--------|-----------|
| 1 | 100 | Top of Map Pack — highest CTR |
| 2 | 50 | Second position — ~50% of #1's CTR |
| 3 | 30 | Third position — visible but lower engagement |
| 4–10 | 10 | Below the fold — minimal visibility |
| 11–20 | 0 | Effectively invisible |

**Looker Studio calculated field:**

```sql
CASE 
  WHEN Position = 1 THEN 100
  WHEN Position = 2 THEN 50
  WHEN Position = 3 THEN 30
  WHEN Position <= 10 THEN 10
  ELSE 0 
END
```

**Looker Studio chart:**

```
Chart Type: Bar Chart (Horizontal)
Dimension: Title (Business Name)
Metric: Visibility Score (aggregation: SUM)
Sort: Descending
```

**Key insight:** A business can have lower SoLV than a competitor but a higher WVS if they hold more #1 positions. This distinction matters because #1 rankings are disproportionately valuable for conversions.

### 6.6 Maximum Theoretical Score

For benchmarking a business against the theoretical maximum visibility:

```
Max WVS = Grid Points × 100 (if ranked #1 at every point)
```

For a 7×7 grid: Max WVS = 4,900 per keyword.

**Percentage of maximum:**

```
WVS% = (Actual WVS / Max WVS) × 100
```

---

## 7. OPPORTUNITY MATRIX (SCATTER PLOT)

The Opportunity Matrix combines SoLV and WVS to reveal competitive dynamics and identify attack targets.

### 7.1 Chart Configuration

```
Chart Type: Scatter Plot
Dimension: Title (Business Name)
X-Axis: Record Count (total times ranked — frequency)
Y-Axis: Visibility Score SUM (quality of rankings)
```

### 7.2 Quadrant Analysis

```
                    HIGH Visibility Score
                           │
        "Snipers"          │         "Dominant Leaders"
     Low frequency but     │      High frequency AND
     always rank #1        │      high-quality positions
     (strong proximity     │      (study their strategy)
      signal)              │
                           │
  ─────────────────────────┼─────────────────────────
                           │
     "Ghosts"              │      "Page 2 Purgatory"
     Rarely rank,          │      Rank everywhere but
     low positions when    │      rarely top 3
     they do               │      (weak — easy to
     (non-threats)         │       outrank with CTR)
                           │
                    LOW Visibility Score
```

### 7.3 Strategic Responses by Quadrant

| Quadrant | Competitor Type | Silas Action |
|----------|----------------|------------|
| Top Right (Dominant) | Study and replicate | Analyze their GBP, content, links, reviews. Flag for deep competitive audit. |
| Bottom Right (Purgatory) | Easy targets | These competitors rank often but poorly. Better CTR signals, more reviews, or stronger GBP optimization will displace them. |
| Top Left (Snipers) | Proximity-dominant | These businesses rank #1 near their location only. Can't beat proximity — focus on the grid points where they DON'T appear. |
| Bottom Left (Ghosts) | Ignore | Non-competitive. No action needed unless they start improving. |

### 7.4 Silas Competitive Analysis Workflow

```
1. Generate Opportunity Matrix from latest scan
2. Identify top 3 competitors in "Dominant Leaders" quadrant
3. For each dominant competitor:
   a. Extract their Place ID from scan data
   b. Pull their GBP details (reviews, categories, services)
   c. Compare against client's GBP optimization (SPEC-001 through 005)
   d. Identify gaps: missing services, fewer reviews, weaker description
   e. Generate prioritized action items to close gaps
4. Identify all "Page 2 Purgatory" competitors
   a. These are the quickest wins — flag grid points where they rank 4–10
   b. Client likely needs only marginal improvements to overtake them
5. Output: Competitive threat assessment with specific action items
```

---

## 8. LOOKER STUDIO DASHBOARD ARCHITECTURE

### 8.1 Dashboard Pages

| Page | Purpose | Key Charts |
|------|---------|------------|
| 1. Overview | Executive summary | SoLV pie, WVS bar, trend line |
| 2. Heat Map | Geographic visualization | Grid map with color-coded positions |
| 3. Keyword Deep Dive | Per-keyword analysis | Filterable by keyword, date range |
| 4. Competitive Landscape | Competitor analysis | Opportunity Matrix scatter, competitor comparison |
| 5. Trend Analysis | Historical performance | Week-over-week SoLV/WVS trends |
| 6. Distance Analysis | Proximity factor visualization | Position vs. distance correlation |

### 8.2 Tooltip Configuration

For the heat map / grid visualization, configure rich tooltips that show all relevant data at each grid point:

**Calculated field — Tooltip_Final:**

```sql
CONCAT(
  "Pos: ",
  CONCAT(
    CAST(Position AS TEXT),
    CONCAT(
      "\n",
      CONCAT(
        IFNULL(Title, "Unknown"),
        CONCAT(
          "\nReviews: ",
          CONCAT(
            CAST(IFNULL(Reviews, 0) AS TEXT),
            CONCAT(
              "\nDist: ",
              CAST(ROUND(CAST(Office Dist (mi) AS NUMBER), 1) AS TEXT)
            )
          )
        )
      )
    )
  )
)
```

### 8.3 Filter Controls

| Filter | Type | Purpose |
|--------|------|---------|
| Date Range | Date picker | Compare scan periods |
| Keyword | Dropdown | Focus on specific keywords |
| Business Name | Dropdown | Isolate client vs. competitor |
| Position Range | Slider | Filter to Map Pack only (1-3) or extended (1-10) |
| Distance Range | Slider | Analyze by proximity zones |

### 8.4 Data Source Connection

```
1. Open Looker Studio → Create → Data Source
2. Select Google Sheets connector
3. Choose the tracking spreadsheet
4. Select the "RawData" sheet
5. Configure field types:
   - Position → Number
   - Grid Point Lat/Lng → Number (Latitude/Longitude geo type)
   - Rating → Number
   - Reviews → Number
   - Scan Date → Date
   - All text fields → Text
6. Add calculated fields (Is Map Pack, Visibility Score, Tooltip_Final)
7. Set data freshness to 12 hours (or 1 hour for premium clients)
```

---

## 9. HEAT MAP VISUALIZATION

### 9.1 Color Coding Schema

Map each grid point to a color based on the client's ranking at that location:

| Position | Color | Hex | Meaning |
|----------|-------|-----|---------|
| #1 | Dark Green | #1B7A1B | Dominant — you're the top result |
| #2 | Green | #4CAF50 | Strong — Map Pack, high visibility |
| #3 | Light Green | #8BC34A | Present — Map Pack, moderate CTR |
| 4–7 | Yellow | #FFD700 | Visible but below the fold |
| 8–10 | Orange | #FF9800 | Barely visible — needs work |
| 11–20 | Red | #F44336 | Effectively invisible |
| Not found | Gray | #9E9E9E | Completely absent from results |

### 9.2 Heat Map Implementation Options

**Option A: Looker Studio native (recommended for simplicity)**
- Use Bubble Map chart type
- Dimension: Grid coordinates
- Metric: Position (inverse — lower position = larger/greener bubble)
- Limitation: Less precise grid layout than dedicated tools

**Option B: Custom HTML/JS overlay (recommended for quality)**
- Generate a Google My Maps or Leaflet.js visualization
- Plot exact grid points with colored markers
- Embed in dashboard or generate as standalone HTML
- Better visual precision but requires custom development

**Option C: LocalFalcon-style grid (recommended for client presentations)**
- Generate NxN table with color-coded cells
- Each cell shows rank number
- Pure HTML/CSS — easy to embed or export as image
- Most intuitive for clients

### 9.3 Grid Table Generator (Option C)

Silas should be capable of generating a visual grid table from scan data:

```
Input: Scan data for one keyword, one date
Output: NxN HTML table with color-coded cells

Algorithm:
1. Filter scan data to target keyword + target business
2. For each grid point:
   a. Find the client's position (or "—" if not found)
   b. Assign color based on position
3. Arrange into NxN grid matching geographic layout
4. Generate HTML table with inline CSS for colors
5. Add legend and metadata (keyword, date, business name)
```

---

## 10. TREND ANALYSIS

### 10.1 Week-Over-Week Metrics

Track these metrics across time to measure optimization impact:

| Metric | Calculation | What It Shows |
|--------|-------------|---------------|
| SoLV Trend | SoLV per scan date | Market share growth/decline |
| WVS Trend | WVS sum per scan date | Quality of rankings over time |
| Average Position | AVG(Position) filtered to client | Overall rank improvement |
| Map Pack Rate | % of grid points where Position <= 3 | Penetration of top 3 |
| #1 Rate | % of grid points where Position = 1 | Dominance trend |
| Rank Volatility | STDEV(Position) across grid points | Stability of rankings |

### 10.2 Before/After Analysis

For measuring the impact of specific optimizations:

```
Method:
1. Identify the optimization date (e.g., "GBP description rewrite on March 1")
2. Pull 4 weeks of scan data BEFORE the change
3. Pull 4 weeks of scan data AFTER the change
4. Compare:
   - SoLV before vs. after
   - WVS before vs. after
   - Average position before vs. after
   - Map Pack rate before vs. after
5. Calculate lift: ((After - Before) / Before) × 100
6. Attribute improvement to specific optimization
```

### 10.3 Anomaly Detection

Silas should flag unusual rank changes that require attention:

| Anomaly | Detection Rule | Severity | Action |
|---------|---------------|----------|--------|
| Rank drop > 5 positions at 30%+ grid points | Compare consecutive scans | HIGH | Investigate: suspension, competitor surge, algorithm update |
| SoLV drop > 10% week-over-week | SoLV delta | HIGH | Check GBP for edits, suspensions, review spam |
| New competitor entering top 3 at 20%+ points | New Title in Map Pack filter | MEDIUM | Run competitive audit on new entrant |
| Rank improvement > 3 positions at 30%+ points | Position delta | LOW (positive) | Document what caused improvement for replication |
| Volatility spike (STDEV doubles) | Week-over-week STDEV comparison | MEDIUM | Likely algorithm update — monitor but don't panic |

### 10.4 Silas Anomaly Response Protocol

```
When anomaly detected:
1. Classify severity (HIGH / MEDIUM / LOW)
2. Pull context:
   - Was any optimization deployed in the last 7 days?
   - Were there known Google algorithm updates?
   - Has the GBP been edited (check GBP audit log)?
   - Are competitors showing similar volatility (affects all, or just client)?
3. Generate anomaly report:
   - What changed (metrics)
   - When it changed (date range)
   - Likely cause (hypothesis)
   - Recommended action
4. For HIGH severity:
   - Send immediate alert to operator (Cody)
   - Suggest emergency diagnostic checklist
5. For MEDIUM/LOW:
   - Include in next weekly report
   - Add to watchlist for follow-up scan
```

---

## 11. DISTANCE-RANK CORRELATION

### 11.1 Proximity Analysis

The proximity factor is the dominant local ranking signal. Understanding how rankings decay with distance from the business location reveals optimization opportunities.

**Analysis framework:**

```
For each keyword:
1. Calculate Office Distance for every grid point result
2. Plot: X = Distance (miles), Y = Position
3. Calculate correlation coefficient
4. Identify "proximity override" points:
   - Grid points where client ranks well DESPITE being far
   - These indicate strong non-proximity signals (reviews, relevance, authority)
5. Identify "proximity failure" points:
   - Grid points where client ranks poorly DESPITE being close
   - These indicate weaknesses that need fixing (missing services, low reviews)
```

### 11.2 Distance Decay Curve

Expected behavior for a well-optimized business:

```
Distance  │  Expected Position
0-0.5 mi  │  1-2 (dominant)
0.5-1 mi  │  1-3 (Map Pack)
1-2 mi    │  2-5 (competitive)
2-3 mi    │  3-8 (declining)
3-5 mi    │  5-15 (weak)
5+ mi     │  10+ (rare appearance)
```

If a client's actual curve is worse than expected, there are optimization gaps. If better, their non-proximity signals are strong.

### 11.3 Competitive Distance Comparison

Compare the client's distance decay curve against top competitors:

```
Output: Line chart
X-Axis: Distance from each business's location (normalized)
Y-Axis: Average position
Lines: One per business (client + top 3 competitors)

Interpretation:
- Steeper decay = more proximity-dependent (weaker non-proximity signals)
- Flatter decay = strong authority that persists across distance
- Goal: Make client's curve flatter than competitors
```

---

## 12. MULTI-KEYWORD TRACKING STRATEGY

### 12.1 Keyword Selection for Tracking

Not all keywords should be tracked in the grid. Budget is finite.

**Tier 1 — Always track (money keywords):**
- Primary service + city: "plumber fort lauderdale"
- Primary service + near me: "plumber near me"
- Emergency variant: "emergency plumber"

**Tier 2 — Track monthly (secondary):**
- Specific services: "drain cleaning", "water heater repair"
- Neighborhood variants: "plumber coral ridge"
- Branded: "[Business Name] reviews"

**Tier 3 — Quarterly spot checks:**
- Long-tail: "24 hour plumber fort lauderdale fl"
- Question keywords: "how much does a plumber cost"
- Competitor brand searches

### 12.2 Keyword Performance Dashboard

For each tracked keyword, display:

| Metric | Current | Previous | Change |
|--------|---------|----------|--------|
| SoLV | 34% | 28% | +6% ↑ |
| WVS | 2,450 | 1,890 | +560 ↑ |
| Avg Position | 3.2 | 4.1 | -0.9 ↑ |
| Map Pack Rate | 67% | 52% | +15% ↑ |
| #1 Rate | 22% | 14% | +8% ↑ |

---

## 13. MULTI-LOCATION TRACKING

### 13.1 Per-Location Grids

For clients with multiple business locations (like Spectators with 3 locations), each location gets its own grid centered on its address. Grids may overlap, which is expected and useful — it shows which location dominates in contested zones.

### 13.2 Territory Mapping

```
For multi-location clients:
1. Generate grid for each location
2. At each grid point, identify which location ranks highest
3. Color-code by location to create a "territory map"
4. Identify contested zones (where locations compete with each other)
5. Identify dead zones (where neither location ranks)
6. Optimize: strengthen the weaker location in dead zones
```

### 13.3 Cannibalization Detection

When two locations from the same business compete:

```
Detection:
- Filter scan data for client's business name
- Find grid points where 2+ locations appear in results
- If both appear in Map Pack, calculate net benefit vs. single location
- If one pushes the other below Map Pack, flag as cannibalization

Resolution strategies:
- Differentiate services between locations
- Ensure GBP categories don't overlap unnecessarily
- Use different primary keywords per location
- Optimize content silos to target different neighborhoods
```

---

## 14. SILAS AUTOMATION RULES

### 14.1 Scheduled Tasks

| Task | Frequency | Trigger |
|------|-----------|---------|
| Run geo-grid scan | Weekly (Monday 4 AM) | Apps Script time trigger |
| Calculate metrics | After each scan | Apps Script onEdit trigger |
| Generate heat map | After metrics calculation | Automatic |
| Anomaly detection | After metrics calculation | Automatic |
| Trend analysis | Weekly | After scan completion |
| Competitive audit | Monthly | First scan of month |
| Report generation | Weekly/Monthly | See SPEC-016 |

### 14.2 Data Retention Policy

| Data Type | Retention | Rationale |
|-----------|-----------|-----------|
| Raw scan data | 12 months | Full historical analysis capability |
| Calculated metrics | 24 months | Long-term trend visibility |
| Heat map exports | 6 months | Visual comparison archives |
| Competitive snapshots | 12 months | Track competitor evolution |
| Anomaly logs | 24 months | Pattern recognition over time |

### 14.3 Silas Decision Framework for Tracking

```
When setting up tracking for a new client:

1. Determine grid configuration:
   IF client budget >= Premium tier:
     grid = 9x9, keywords = 10, frequency = weekly
   ELSE IF client budget >= Standard tier:
     grid = 7x7, keywords = 5, frequency = weekly
   ELSE:
     grid = 5x5, keywords = 3, frequency = bi-weekly

2. Select keywords:
   a. Pull client's GBP primary category
   b. Map to top 3-5 high-intent local keywords
   c. Include 1-2 "near me" variants
   d. Cross-reference with GSC data if available

3. Configure Google Sheet from template:
   a. Copy template spreadsheet
   b. Set API key, center coordinates, keywords
   c. Set up time trigger
   d. Run initial scan

4. Configure Looker Studio:
   a. Connect data source to client's sheet
   b. Apply calculated fields
   c. Set up filters and date controls
   d. Share with client (view-only)

5. Run baseline scan and generate first report
```

---

## 15. INTEGRATION WITH OTHER SPECS

### 15.1 Optimization Impact Tracking

Each optimization from other specs should be measurable through geo-grid data:

| Spec | Optimization | Tracking Method |
|------|-------------|----------------|
| SPEC-001 | Services rewrite | Before/after SoLV for service keywords |
| SPEC-002 | Description update | Before/after WVS for primary keywords |
| SPEC-003 | Q&A seeding | Monitor justification snippet frequency |
| SPEC-004 | Products tab | Track category-specific keyword positions |
| SPEC-005 | Posting cadence | Correlate post frequency with rank volatility |
| SPEC-006 | Location silos | Track neighborhood-specific keyword grids |
| SPEC-007 | Grounding boxes | AI Overview capture rate per grid point |
| SPEC-011 | Citations | NAP consistency score vs. position correlation |
| SPEC-012 | Reviews | Review count/rating vs. position correlation |
| SPEC-013 | Expired domains | Link deployment date vs. rank movement timeline |
| SPEC-014 | PBN links | PBN publish date vs. position changes |

### 15.2 Attribution Model

```
For each rank improvement:
1. Log the date range of improvement
2. Query optimization log for changes made in that window
3. Score attribution:
   - Only one optimization deployed → 100% attribution
   - Multiple optimizations → weighted by typical impact:
     * GBP changes: fastest impact (3-7 days)
     * Content changes: medium impact (2-4 weeks)
     * Link building: slow impact (4-12 weeks)
     * Reviews: gradual impact (ongoing)
4. Store attribution data for ROI calculations
5. Feed into SPEC-016 client reports
```

---

## 16. COST OPTIMIZATION STRATEGIES

### 16.1 Reducing API Spend

| Strategy | Savings | Trade-off |
|----------|---------|-----------|
| Reduce grid from 7×7 to 5×5 | ~50% fewer calls | Less geographic granularity |
| Track fewer keywords | Linear reduction | Less keyword coverage |
| Bi-weekly instead of weekly | 50% fewer calls | Slower anomaly detection |
| Use Places API for competitor data | Avoids duplicate SerpAPI calls | Different data format |
| Cache and diff | Only re-scan points that changed | Complex implementation |

### 16.2 Free Supplementary Data Sources

| Source | Data | Cost | Use Case |
|--------|------|------|----------|
| Google Search Console | Impressions, clicks, avg position (organic) | Free | Supplement grid data with organic performance |
| Google Business Profile Insights | Views, searches, actions, direction requests | Free | Correlate GBP engagement with grid positions |
| Google Analytics | Website traffic from Maps/local | Free | Conversion tracking from Map Pack clicks |

### 16.3 Silas Cost-Aware Scan Logic

```
IF monthly API budget remaining < 20%:
  Switch all clients to bi-weekly scans
  Alert operator about budget constraint
  Prioritize Tier 1 keywords only

IF monthly API budget remaining < 5%:
  Pause all scans
  Alert operator immediately
  Generate report from existing data only
```

---

## 17. QUALITY ASSURANCE

### 17.1 Data Validation Rules

| Rule | Check | Action on Failure |
|------|-------|-------------------|
| Position range | 1–20 | Discard row, log error |
| Coordinates valid | Lat -90 to 90, Lng -180 to 180 | Discard row, log error |
| Business name not empty | Title field populated | Flag for review |
| Scan completeness | All grid points returned data | Re-scan missing points |
| Duplicate detection | No duplicate point+keyword+date rows | Deduplicate, keep first |
| API error rate | < 5% of calls fail | Alert if exceeded |

### 17.2 Scan Integrity Checks

```
After each scan:
1. Count total rows inserted
2. Expected: grid_points × keywords × avg_results_per_point
3. If actual < 80% of expected → flag incomplete scan
4. Check for API error entries in log
5. Verify client's business appears in at least 50% of grid points
   (if not, verify correct business name matching)
6. Confirm scan date matches expected schedule
```

---

## 18. GLOSSARY

| Term | Definition |
|------|-----------|
| **Geo-Grid** | An NxN matrix of geographic coordinate points used to simulate searches from different locations |
| **SoLV** | Share of Local Voice — percentage of Map Pack slots (top 3) occupied by a business across all grid points |
| **WVS** | Weighted Visibility Score — position-weighted score (100/50/30/10/0) summed across grid points |
| **Map Pack** | The top 3 local business results displayed in Google Maps / local search results |
| **Grid Point** | A single latitude/longitude coordinate in the geo-grid where a search is simulated |
| **Proximity Factor** | Google's ranking signal based on physical distance between searcher and business |
| **Distance Decay** | The expected decrease in ranking as distance from the business increases |
| **Opportunity Matrix** | Scatter plot comparing competitors on frequency (count) vs. quality (WVS) of rankings |
| **Rank Volatility** | Standard deviation of position across grid points — higher = less stable rankings |
| **Cannibalization** | When multiple locations from the same business compete against each other in local results |
| **Territory Map** | Color-coded visualization showing which location dominates at each grid point |

---

## 19. CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial specification — complete geo-grid tracking system |

---

*End of SPEC-015*
