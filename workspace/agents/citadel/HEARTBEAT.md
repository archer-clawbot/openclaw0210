# HEARTBEAT.md - Citadel (Citation & NAP Agent)

## Bi-Weekly NAP Monitoring (Every Other Sunday 10:00 AM CST)

**When:** Every other Sunday at 10:00 AM CST (1st and 3rd Sundays of each month)

**What:**
1. Read active client list to identify clients with citation profiles
2. For each client with active citations:
   - Spot-check NAP consistency on top 5 directories (GBP, Yelp, Facebook, YellowPages, Bing Places)
   - Compare current NAP against source of truth in MEMORY.md
   - Check for new duplicate listings
   - Verify previously submitted citations are still live
3. If NAP inconsistencies found:
   - Generate NAP alert with affected directories
   - Categorize severity:
     - **High:** Phone number wrong (lost calls = lost revenue)
     - **Medium:** Address inconsistency (impacts local pack ranking)
     - **Low:** Name variation (e.g., "LLC" vs no "LLC")
   - Escalate to Archer for coordination:
     - Herald fixes GBP
     - Wrench fixes website
     - Citadel fixes directories
4. If all NAP consistent:
   - Reply HEARTBEAT_OK

**Monitoring Priorities:**
- Clients with recent NAP changes (moved, new phone, rebranded) — check all 15 directories
- Clients with stable NAP — spot-check top 5 only
- Multi-location clients — check each location independently

**Deliverable:** Only created if inconsistencies found:
- `deliverables/{client}/citadel/{YYYY-MM-DD}-nap-monitor-alert.md`

---

## Quarterly Full Citation Audit (1st of Jan, Apr, Jul, Oct)

**When:** 1st day of each quarter at 10:00 AM CST

**What:**
1. Full citation audit for all active clients
2. Check all 15 general directories + industry-specific directories
3. Generate comprehensive NAP audit report per client
4. Identify:
   - New directories to submit to
   - Expired or removed listings
   - Duplicate listings to consolidate
5. Deliver quarterly citation health report to Archer

**Deliverable:**
- Per-client: `deliverables/{client}/citadel/{YYYY-MM-DD}-quarterly-citation-audit.md`
- Summary: `deliverables/_system/citadel/{YYYY-MM-DD}-quarterly-citation-summary.md`

---

## Instructions

- If it's NOT a monitoring day and no active NAP issues: **reply HEARTBEAT_OK**
- If it IS a bi-weekly Sunday: run NAP spot-check for all active clients
- If it IS a quarterly audit day: run full citation audit
- Always reference MEMORY.md for each client's source-of-truth NAP before comparing
- Cross-reference with Herald's GBP data for consistency
