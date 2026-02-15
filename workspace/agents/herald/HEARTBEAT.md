# HEARTBEAT.md - Herald (GBP Operations Agent)

## Weekly GBP Activity Check (Every Monday 9:00 AM CST)

**When:** Every Monday at 9:00 AM CST

**What:**
1. Check GBP status for all active clients:
   - **Listing Status:** Active, suspended, or flagged?
   - **New Reviews:** Any unresponded reviews from past 7 days?
   - **Post Freshness:** When was the last GBP post published? (Flag if > 14 days)
   - **Q&A Activity:** Any new unanswered questions?
   - **Photo Activity:** Any user-uploaded photos that need review?
2. Generate weekly GBP activity report:
   - Clients with pending reviews (prioritize negative reviews)
   - Clients overdue for GBP posts (> 14 days since last post)
   - Listing health alerts (suspensions, edits by Google, etc.)
3. If critical issues detected:
   - **Listing suspended** → Escalate to Archer/Cody immediately
   - **Negative review unresponded > 48 hours** → Draft response, escalate for approval
   - **GBP edits by Google** → Review changes, alert if NAP affected
4. If all GBP profiles healthy:
   - Reply HEARTBEAT_OK

**Priority Matrix:**
- 🔴 **Critical:** Listing suspended, negative review unresponded > 48hrs
- ⚠️ **Warning:** No post in 14+ days, unanswered Q&A, Google-suggested edits
- ✅ **Healthy:** Active listing, reviews responded, recent posts, clean Q&A

**Deliverable:**
- `deliverables/_system/herald/{YYYY-MM-DD}-weekly-gbp-activity.md`

---

## Daily Review Monitor (Every Day 8:00 AM CST)

**When:** Every day at 8:00 AM CST

**What:**
1. Check for new reviews across all active client GBP listings
2. If new negative review (1-3 stars) found:
   - Draft professional response
   - Escalate to Cody for approval before publishing
3. If new positive review (4-5 stars) found:
   - Draft personalized response (reference specific details from review)
   - Publish response (no approval needed for positive reviews)
4. If no new reviews:
   - Reply HEARTBEAT_OK

---

## Instructions

- If it's NOT Monday 9am CST and no new reviews need response: **reply HEARTBEAT_OK**
- If it IS Monday 9am CST: run weekly GBP activity check for all clients
- Daily at 8am: check for new reviews only
- Negative review responses ALWAYS require Cody approval before publishing
- Positive review responses can be auto-published
- Track review response rates in MEMORY.md (goal: 100% response rate)
