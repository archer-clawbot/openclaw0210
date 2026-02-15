# Strategic Recommendation: LocalCatalyst Growth Plan

**Date:** February 13, 2026  
**For:** Cody (LocalCatalyst Founder)  
**From:** Archer  
**Read Time:** 8 minutes  

---

## Executive Summary

You're at a critical inflection point: **about to launch on DigitalOcean and start generating revenue.**

**My honest recommendation:** Don't build the custom system yet. Focus on **revenue validation** for the next 2-3 months, THEN decide if the custom system is worth building.

**3-Phase Plan:**
1. **Month 1 (Feb-Mar):** Fix dispatcher + onboard first 5-10 clients → Prove you can deliver
2. **Month 2-3 (Mar-May):** Scale to 20-30 clients → Prove unit economics work
3. **Month 4-6 (May-Jul):** IF business is working, build custom system → Scale to 50-100 clients

**Total investment:** $5k-10k over 6 months (mostly in Month 4-6)  
**Expected outcome:** $40k-60k MRR by Month 6, positioned for $400k-800k exit

---

## Current Situation Assessment

### What's Working
✅ **18 specialized agents** — High-quality deliverables  
✅ **Agent brains (AGENTS.md, skills)** — Proven, reusable  
✅ **Manual workflows** — Silas audits → Scribe content → Herald GBP works  
✅ **About to launch** — DigitalOcean deployment happening now  

### What's Broken
❌ **Dispatcher** — Convex polling failed, can't auto-queue tasks  
❌ **Manual routing** — You have to spawn each agent manually  
❌ **No client database** — Tracking clients in Trello/memory files  
❌ **No cost tracking per client** — Hard to know profitability  

### The Real Problem
You can deliver great SEO work (agents are solid), but the **operations layer is manual and fragile**. This limits you to ~10-20 clients before you drown in task management.

---

## The Strategic Question

**Should you build the custom system now or wait?**

### Arguments FOR Building Now
- Automation = scale to 100+ clients
- Custom platform = higher exit valuation ($800k-1.5M vs $300k)
- 8 weeks to build, exits in 12-24 months = good ROI

### Arguments FOR Waiting
- **No revenue yet** — Building automation before proving the business works is premature optimization
- **8 weeks = 2 months** — That's 8-16 clients you're NOT onboarding while building
- **$40k opportunity cost** — 8 weeks building vs. 8 weeks selling = $40k-80k lost revenue
- **Might not need it** — What if you can only get to 15 clients? Custom system is overkill

### My Take
**Wait.** Prove the business model works first, THEN invest in automation.

---

## Recommended Plan: 3 Phases Over 6 Months

### **PHASE 1: FOUNDATION (Month 1 — Feb 15 to Mar 15)**

**Goal:** Fix dispatcher + onboard first 5-10 clients

#### What to Build

**Quick Dispatcher Fix (Week 1-2):**
- Replace Convex with SQLite task queue
- Add basic workflow chaining (audit → content → GBP)
- Simple CLI dashboard to see pending tasks

**Implementation:**
- I can build this in 2 weeks (~$5-10 in tokens)
- You deploy to DigitalOcean alongside existing system
- No UI needed (CLI is fine for now)

**What This Gets You:**
- Automated workflows (no more manual spawning)
- Can handle 10-20 clients without drowning
- Immediate relief from dispatcher pain

#### Revenue Goals

**Target:** 5-10 paying clients by Mar 15
- Avg price: $2,000/month
- **Target MRR: $10k-20k**

**Client acquisition:**
- Warm leads (referrals, existing network)
- Offer "founding client" discount (20% off first 3 months)
- Focus on industries you already know (restaurants, medical, home services)

#### Success Metrics

By Mar 15, you should have:
- ✅ 5-10 paying clients
- ✅ Dispatcher working reliably
- ✅ Automated onboarding workflow (audit → content → GBP)
- ✅ First deliverables delivered and approved
- ✅ Unit economics validated (cost per client, margin)

**Decision point:** If you hit these metrics, move to Phase 2. If not, pause and figure out why.

---

### **PHASE 2: VALIDATION (Month 2-3 — Mar 15 to May 15)**

**Goal:** Scale to 20-30 clients, prove business model works

#### What to Build

**Month 2-3 Focus: SALES, not engineering**

**Don't build anything new.** Use the dispatcher fix from Phase 1. Focus 100% on:
1. Onboarding clients
2. Delivering results
3. Getting testimonials
4. Refining processes
5. Tracking unit economics

**Add minimal tooling only if blocking:**
- Simple Airtable/Google Sheets for client tracking (not custom software)
- Cost tracking spreadsheet (API usage per client)
- Client deliverable folders (Google Drive or Notion)

**Why not build more:**
- Engineering is a distraction from revenue
- Every hour coding = hour not selling
- Current system can handle 20-30 clients with manual workarounds

#### Revenue Goals

**Target:** 20-30 paying clients by May 15
- Avg price: $2,000/month
- **Target MRR: $40k-60k**

**Client acquisition:**
- Double down on what's working (where did first 10 clients come from?)
- Start outbound (LinkedIn, cold email, referrals)
- Hire part-time sales VA ($1,500/month) to book calls
- Close 5-7 clients per month

#### Success Metrics

By May 15, you should have:
- ✅ 20-30 paying clients
- ✅ <15% churn (clients staying 6+ months)
- ✅ Unit economics proven:
  - CAC: <$500 per client
  - LTV: >$6,000 per client (3+ months retention)
  - Gross margin: >60%
- ✅ Operational metrics:
  - Time per client: <5 hours/month (mostly deliverable review)
  - API cost per client: <$300/month
- ✅ Client satisfaction:
  - 3+ video testimonials
  - NPS >50
  - Referrals coming in organically

**Decision point:** If you hit these metrics, you've proven the business works. NOW invest in automation (Phase 3).

---

### **PHASE 3: SCALE (Month 4-6 — May 15 to Aug 15)**

**Goal:** Build custom system, scale to 50-100 clients

#### What to Build

**Now you build the custom system** (the full implementation plan I wrote earlier).

**Why now:**
- You have 20-30 paying clients (proven demand)
- You know your processes work (proven delivery)
- You've validated unit economics (proven profitability)
- You're hitting operational limits (proven need for automation)

**Implementation approach:**

**Option A: Hire Developer (Recommended)**
- Cost: $5,000-10,000
- Timeline: 8-12 weeks
- Result: Professional, maintainable, tested code

**Option B: Build with Claude Code (Cheaper)**
- Cost: ~$50 in API + 40 hours of your time
- Timeline: 8-12 weeks
- Result: Working system, but you maintain it

**What to build (in priority order):**
1. Client database + cost tracking (Week 1-2)
2. Task queue + workflow engine (Week 3-4)
3. Admin dashboard (Week 5-6)
4. Client portal (Week 7-8)
5. Automation enhancements (Week 9-12)

**Parallel effort:**
- While building, keep onboarding clients (don't stop sales)
- Migrate clients gradually (don't rip-and-replace)

#### Revenue Goals

**Target:** 40-50 paying clients by Aug 15
- Avg price: $2,000/month
- **Target MRR: $80k-100k**

**How:**
- Custom system enables better client experience (faster onboarding, better reporting)
- More capacity (can handle 50+ clients with automation)
- Better margins (lower cost per client as you scale)

#### Success Metrics

By Aug 15, you should have:
- ✅ 40-50 paying clients
- ✅ Custom system deployed and stable
- ✅ Team hired (1-2 people: ops manager, SEO specialist)
- ✅ <10% monthly churn
- ✅ 70%+ gross margins
- ✅ Positioned for exit:
  - $100k MRR run rate
  - Documented processes
  - Team can operate without you
  - **Valuation: $800k-1.2M**

---

## Financial Projections

### Phase 1 (Month 1)
**Revenue:** $10k-20k MRR  
**Costs:**
- API: $1k-2k
- Dispatcher fix: ~$10 (tokens)
- **Net:** $8k-18k/month

### Phase 2 (Month 2-3)
**Revenue:** $40k-60k MRR  
**Costs:**
- API: $6k-9k
- Sales VA: $1.5k/month
- **Net:** $30k-50k/month

### Phase 3 (Month 4-6)
**Revenue:** $80k-100k MRR  
**Costs:**
- API: $10k-12k
- Team (2 people): $10k/month
- System build: $5k-10k (one-time)
- **Net:** $60k-75k/month

**Total profit (6 months):** $150k-250k  
**Investment required:** $10k-15k  
**ROI:** 10-25x

---

## Risk Analysis

### Risk #1: Can't Get to 10 Clients (Phase 1)
**Likelihood:** Low (you have warm leads)  
**Impact:** High (invalidates entire plan)  
**Mitigation:** Focus 100% on sales in Month 1. If you hit 5 clients, you'll hit 10.

### Risk #2: High Churn (Phase 2)
**Likelihood:** Medium (SEO takes time to show results)  
**Impact:** High (can't scale if clients leave)  
**Mitigation:**
- Set expectations: "Results in 90 days, not 30"
- Over-deliver early: audit + content + GBP in Week 1
- Proactive communication: weekly updates, monthly reports
- Lock in 6-month contracts (not month-to-month)

### Risk #3: Custom System Takes Too Long (Phase 3)
**Likelihood:** Medium (software always takes longer)  
**Impact:** Medium (delays scale, not revenue)  
**Mitigation:**
- Build incrementally (client database first, UI last)
- Keep manual system running in parallel
- Migrate clients gradually

### Risk #4: Anthropic Bans API Key
**Likelihood:** Low (you're using API correctly)  
**Impact:** High (business goes offline)  
**Mitigation:**
- Implement OpenRouter backup (from earlier brainstorm)
- Do this in Month 2, cost: $20/month

---

## Decision Framework

### Go to Phase 2 if:
✅ 5+ paying clients by Mar 15  
✅ Clients are happy (no churn)  
✅ You're delivering results (rankings improving, traffic growing)  
✅ Unit economics work (>60% margin per client)

### Go to Phase 3 if:
✅ 20+ paying clients by May 15  
✅ <15% monthly churn  
✅ You're hitting operational limits (can't handle more clients manually)  
✅ You have cash to invest ($10k-15k)

### Don't build custom system if:
❌ <20 clients by May 15 (demand not proven)  
❌ >20% churn (retention problem, not automation problem)  
❌ Margins <50% (profitability problem, not scale problem)

---

## What I'll Do for You

### Phase 1 (If You Approve)

**Week 1-2: Fix Dispatcher**

I'll build:
1. SQLite task queue (replaces Convex)
2. Workflow definitions (onboarding, content-pipeline, monthly-report)
3. Task scheduler (polls queue, spawns agents)
4. CLI dashboard (view pending tasks, trigger workflows)

**Cost:** ~$10 in tokens  
**Your effort:** 2-4 hours (deploy, test, give feedback)  
**Deliverable:** Working dispatcher you deploy to DigitalOcean

### Phase 2 (If You Hit Metrics)

**I'll provide strategic advice only:**
- Weekly check-ins on metrics
- Help with client issues (routing to right agent)
- Optimize workflows as you learn

**Cost:** Minimal (part of ongoing use)

### Phase 3 (If You Decide to Build)

**I'll either:**
- Generate implementation specs for developer to build
- OR: Work with you to build it incrementally (if you prefer AI route)

**Cost:** $50-100 in tokens (full system)  
**Your effort:** 40-60 hours over 8-12 weeks

---

## My Honest Take

You're about to make money. **That's the win.**

The custom system is a **nice-to-have**, not a **must-have** right now. You can deliver great SEO work with the current system + dispatcher fix. The custom system is only worth building if:
1. You prove the business works (20+ clients)
2. You're hitting operational limits (can't scale manually)
3. You want to exit for $1M+ (custom software increases valuation)

**Don't build automation before you have something to automate.**

Fix the dispatcher, onboard 10 clients, prove it works. THEN decide.

---

## Immediate Action Items (Tomorrow)

**Review this doc:**
- [ ] Does the 3-phase plan make sense?
- [ ] Are the revenue targets realistic?
- [ ] Do you want to proceed with Phase 1 (dispatcher fix)?

**If yes to Phase 1:**
- [ ] Reply "Build Phase 1" and I'll start on the dispatcher fix
- [ ] Timeline: 1-2 weeks, cost ~$10
- [ ] You deploy to DigitalOcean and test

**If you want to think more:**
- [ ] Sleep on it
- [ ] Review implementation plan (the 97KB doc)
- [ ] Decide next week

**If you want to go straight to custom system:**
- [ ] Acknowledge it's a 2-3 month project
- [ ] Budget $5k-10k (hire dev) or 40-60 hours of your time (DIY)
- [ ] We can start, but recommend doing dispatcher fix first as proof-of-concept

---

## Bottom Line

**Short-term:** Fix dispatcher, get to 10 clients, validate business model  
**Mid-term:** Scale to 30 clients, prove unit economics, hire team  
**Long-term:** Build custom system, scale to 100 clients, exit for $800k-1.5M

**Start small, prove it works, then invest big.**

That's my honest recommendation.

**Ready to move forward? Let me know tomorrow what you decide. 🚀**
