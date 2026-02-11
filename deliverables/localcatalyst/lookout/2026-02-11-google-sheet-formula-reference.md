# GOOGLE SHEET FORMULA REFERENCE
**For:** LocalCatalyst rank tracking sheet  
**Created:** 2026-02-11  
**Specs Agent:** Use these formulas in your Google Sheet setup

---

## SHEET STRUCTURE

### Tab 1: RAW_DATA
Columns for SerpAPI imports:
```
A: Scan Date
B: Keyword
C: Grid Point ID (e.g., "P1", "P2"... "P49")
D: Latitude
E: Longitude
F: Rank Position (or "Not Found" / "Rank 21+")
G: Distance to Office (miles, calculated via Haversine)
H: Map Pack Flag (TRUE if rank 1-3, FALSE otherwise)
```

**Sample row:**
```
2026-02-18 | local seo agency | P1 | 41.8781 | -87.6298 | 67 | 0.2 | FALSE
```

### Tab 2: WEEKLY_METRICS
Calculated metrics, one row per keyword per week:
```
A: Week Start Date
B: Keyword
C: SoLV (%)
D: WVS (points)
E: Map Pack Rate (%)
F: Average Position
G: Grid Points Found
H: Grid Points Top 3
I: Top Position
J: Bottom Position (rank 21+ or "NF")
```

### Tab 3: COMPETITOR_TRACKER
(Optional, for later use)

---

## KEY FORMULAS

### 1. SoLV (Share of Local Voice)
**Location:** WEEKLY_METRICS column C  
**Formula:**
```
=COUNTIFS(RAW_DATA!H:H, TRUE, RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2) / (49 * 3) * 100
```

**Breakdown:**
- Counts TRUE values in "Map Pack Flag" column (H) for past 7 days
- Divides by (49 grid points × 3 top positions) = 147
- Multiplies by 100 for percentage
- Scoped to keyword in column B

**Expected output:** 0% to 100% (0% initially, target 30%+)

### 2. WVS (Weighted Visibility Score)
**Location:** WEEKLY_METRICS column D  
**Formula:**
```
=SUMIFS(RAW_DATA!F:F, RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2, RAW_DATA!F:F, 1)*100
+SUMIFS(RAW_DATA!F:F, RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2, RAW_DATA!F:F, 2)*50
+SUMIFS(RAW_DATA!F:F, RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2, RAW_DATA!F:F, 3)*30
+SUMIFS(RAW_DATA!F:F, RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2, RAW_DATA!F:F, ">=4", RAW_DATA!F:F, "<=10")*10
```

**Breakdown:**
- Rank 1 = 100 pts × count
- Rank 2 = 50 pts × count
- Rank 3 = 30 pts × count
- Ranks 4-10 = 10 pts × count
- Summed across all 49 grid points
- Maximum: 4,900 pts (49 × 100)

**Expected output:** 0 to 4,900 (will grow as site ranks)

### 3. Map Pack Rate
**Location:** WEEKLY_METRICS column E  
**Formula:**
```
=COUNTIFS(RAW_DATA!H:H, TRUE, RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2) / COUNTIFS(RAW_DATA!F:F, "<>", RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2) * 100
```

**Breakdown:**
- Counts Map Pack TRUE values (rank 1-3)
- Divides by total found positions for that keyword
- Multiplies by 100 for percentage
- Handles "Not Found" as non-counted

**Expected output:** 0% to 100%

### 4. Average Position
**Location:** WEEKLY_METRICS column F  
**Formula:**
```
=AVERAGEIFS(RAW_DATA!F:F, RAW_DATA!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),DAY(TODAY())-7), RAW_DATA!B:B, B2)
```

**Note:** Treats "Not Found" as 21 (for calculation purposes; handle in data entry)

**Expected output:** 1 to 21+

### 5. Distance to Office (Haversine Formula)
**Location:** RAW_DATA column G  
**Formula:**
```
=ACOS(SIN(RADIANS(D2))*SIN(RADIANS($D$1))+COS(RADIANS(D2))*COS(RADIANS($D$1))*COS(RADIANS($E$1)-RADIANS(E2)))*3959
```

**Where:**
- $D$1 = Office latitude (cell to define once)
- $E$1 = Office longitude (cell to define once)
- D2 = Grid point latitude
- E2 = Grid point longitude
- 3959 = Earth radius in miles

**Setup:** Create two cells at top of RAW_DATA for "Office Lat" and "Office Lng" — fill in once you have business address.

**Expected output:** Miles (0.0 to 5.0+ depending on grid size)

### 6. Map Pack Flag
**Location:** RAW_DATA column H  
**Formula:**
```
=IF(AND(F2<>0, F2<4), TRUE, FALSE)
```

**Breakdown:**
- TRUE if F2 (Rank Position) is between 1 and 3
- FALSE otherwise or if "Not Found"

**Expected output:** TRUE or FALSE

---

## HELPER FORMULAS

### Grid Point ID Generator
**Location:** RAW_DATA column C (during import)
```
=CONCATENATE("P", ROW()-1)
```
Auto-generates P1, P2, P3... P49 for each scan.

### Week-over-Week Change
**Location:** WEEKLY_METRICS column K (new column)
```
=IF(ROW()=2, "—", ROUND((D2-OFFSET(D2,-1,0))/OFFSET(D2,-1,0)*100,1))
```

Shows % change in WVS from previous week.

### SoLV Trend (7-week sparkline)
**Location:** Summary tab
```
=SPARKLINE(WEEKLY_METRICS!C:C, {"max_value", 100; "color1", "green"})
```

Quick visual of SoLV trend over time.

---

## DATA ENTRY PROTOCOL

### For SerpAPI Imports (via Apps Script)
Specs agent: SerpAPI will return raw JSON. Parse into this structure:

```json
{
  "scan_date": "2026-02-18",
  "keyword": "local seo agency",
  "grid_point": "P1",
  "latitude": 41.8781,
  "longitude": -87.6298,
  "rank": 67,  // or null if not found
  "distance_miles": 0.2
}
```

Apps Script then inserts as a row in RAW_DATA. Formulas auto-calculate.

### Manual Validation
After each weekly scan:
1. Verify row count = 196 (49 points × 4 keywords)
2. Check for null/blank ranks → should be "Not Found"
3. Confirm SoLV is between 0-100
4. Review WVS — should change slowly unless major rank shift
5. Flag any rank movement > 10 positions for Lookout review

---

## MONTHLY REPORT PULL

On the 1st of each month, Lookout will:
1. Filter WEEKLY_METRICS to last 4 rows (4 weeks)
2. Calculate MoM change: (Week 4 - Week 1) / Week 1
3. Identify wins (3+ position improvement) and drops (3+ decline)
4. Generate narrative summary for Silas
5. Assemble client-facing report

**Formulas for MoM comparison:**
```
SoLV Change = (SoLV_Week4 - SoLV_Week1) / SoLV_Week1 * 100
WVS Change = (WVS_Week4 - WVS_Week1) / WVS_Week1 * 100
Map Pack Rate Change = Map Pack Rate_Week4 - Map Pack Rate_Week1
```

---

## CRITICAL: HANDLE "NOT FOUND" PROPERLY

**When SerpAPI returns no rank:**
- Enter "NF" in column F (Rank Position)
- Formula treats "NF" as text, not numeric
- For averaging: pre-process "NF" → 21 before AVERAGE
- For comparison: count "NF" separately as "disappeared"

**Alternative (cleaner):** Always insert rank 21 for "Not Found", then calculate separately:
```
=COUNTIFS(RAW_DATA!F:F, 21, RAW_DATA!B:B, B2) / 49
```

This gives you a "Unranked Rate" metric too.

---

## TESTING CHECKLIST

Before first live scan, test with dummy data:

- [ ] Insert 10 dummy rows (5 different keywords, various ranks 1-50)
- [ ] Verify SoLV calculates (should be non-zero)
- [ ] Verify WVS calculates (should be 100+ points)
- [ ] Verify Map Pack Rate (should be % of top-3 ranks)
- [ ] Verify Average Position (should be ~15-25)
- [ ] Verify Haversine distance (use online calculator to cross-check)
- [ ] Verify week-over-week change (should be "—" for first row, % for subsequent)
- [ ] Share read-only link to Lookout — verify all formulas visible

---

## FAQ

**Q: Can I edit the formulas?**  
A: Only Specs should edit formulas. Lookout reads them; Silas interprets results. If you change a formula, notify Lookout immediately.

**Q: What if a keyword doesn't appear in all 49 grid points?**  
A: That's normal. Early on, keywords may only rank at 5-10 grid points. Formulas handle this with COUNTIFS.

**Q: How often should I backup the sheet?**  
A: Every week after the scan. Use "Version history" in Google Sheets (built-in, automatic).

**Q: Can I add more keywords later?**  
A: Yes, but must update the formula denominators (currently assume 4 keywords). Notify Lookout before adding.

**Q: What's a "good" WVS?**  
A: Target 1,470 (30% of max 4,900) to indicate "Competitive" status. Week 1-2: expect 0-50.

---

_Prepared by Lookout for Specs agent | Last updated 2026-02-11_
