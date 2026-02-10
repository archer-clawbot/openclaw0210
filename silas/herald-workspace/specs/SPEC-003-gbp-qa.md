# SPEC-003: GBP Q&A Pre-emption Protocol
## Silas Engine — Route 1: GBP Optimization Pipeline
### Version 1.0 | GBP Optimization Group

---

## 1. PURPOSE

This specification defines Silas's methodology for seeding Google Business Profile Q&A entries before customers ask random, uncontrolled questions. Each pre-emptive Q&A entry is a keyword-dense content block that Google indexes and uses for relevance signals, justification snippets, and AI Overview source material. The Q&A section is a free content surface on GBP that most businesses completely ignore — making it a high-impact, low-competition opportunity.

**Core principle:** "Control the narrative. Every question a customer sees should already have your best answer waiting."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-001: GBP Services | Questions should reference services listed in the GBP |
| SPEC-002: GBP Description | Answers reinforce entity co-citations from the description |
| SPEC-004: GBP Products Tab | Products and Q&A cross-reference for conversion |
| SPEC-005: GBP Posting Strategy | Posts can address popular Q&A topics in depth |
| SPEC-006: Semantic Location Silo | Website FAQ pages mirror Q&A entries for content alignment |
| SPEC-008: Schema & Structured Data | FAQPage schema on website should include these same Q&A pairs |
| SPEC-017: LLM SEO / StealthRank | Q&A content feeds AI systems' understanding of the business |

---

## 3. WHY IT WORKS

### 3.1 Q&A as Indexed Content

Google indexes GBP Q&A entries and uses them as ranking signals. Each Q&A pair functions as additional content associated with the business listing — content that:
- Contains keywords Google associates with the business
- Demonstrates expertise and completeness
- Provides answers to real search queries (improving relevance matching)
- Feeds Google's AI systems with structured business information

### 3.2 The Pre-emption Advantage

If you don't seed Q&A proactively, three things happen:
1. **Customers ask unhelpful questions** — "Where are you located?" (already answered by the map)
2. **Competitors or trolls post misleading content** — Q&A is open to anyone
3. **The section remains empty** — a missed opportunity for indexed content

Pre-emption means controlling all three: seeding valuable questions, providing authoritative answers, and filling the space before random content appears.

### 3.3 The Google Docs Answer Funnel

For complex topics that exceed Q&A character limits, the answer can link to a Google Doc — a publicly viewable document with a comprehensive guide. This creates a Google-to-Google trust signal (GBP → Google Docs) and provides a content depth that Q&A alone can't achieve.

---

## 4. Q&A ENTRY ARCHITECTURE

### 4.1 Target Volume

| Business Maturity | Target Q&A Count | Cadence |
|-------------------|-----------------|---------|
| New client (0 Q&A) | 15-20 initial entries | Deploy over 2-3 weeks |
| Established (some Q&A) | Build to 25-30 total | Add 3-5 per week |
| Optimized (25+ Q&A) | Maintain + refresh | 2-3 new per month |

### 4.2 Question Categories

Each client should have Q&A entries spanning all six categories:

**Category 1 — Service-Specific (40% of entries):**
```
"Do you offer [specific service] in [city]?"
"What does your [service] include?"
"How long does [service] typically take?"
```

**Category 2 — Pricing (15% of entries):**
```
"How much does [service] cost?"
"Do you offer free estimates for [service]?"
"What financing options are available?"
```

**Category 3 — Process & Logistics (15% of entries):**
```
"What's the process for scheduling [service]?"
"How far in advance should I book [service]?"
"Do you offer same-day/emergency [service]?"
```

**Category 4 — Credentials & Trust (10% of entries):**
```
"Are you licensed and insured for [service] in [state]?"
"What certifications do your technicians have?"
"How long have you been in business?"
```

**Category 5 — Service Area (10% of entries):**
```
"Do you serve [neighborhood/city]?"
"What areas do you cover for [service]?"
"How far will you travel for [service]?"
```

**Category 6 — Comparison & Decision (10% of entries):**
```
"What's the difference between [option A] and [option B]?"
"Why should I choose [Business] over [competitor type]?"
"What should I look for when hiring a [service provider]?"
```

### 4.3 Answer Template

```
Q: [Question matching a real search query]

A: Yes, [Business Name] offers [service] in [city/area]. [2-3 sentences 
with specific details — pricing ranges, process steps, timeline, or 
qualifications]. [Credential or differentiator]. [Optional: For a 
comprehensive guide, see: {Google Doc link}]. Contact us at [phone] 
to [specific CTA — schedule, get a quote, book].
```

**Answer Length Guidelines:**
- Minimum: 150 characters (any shorter loses keyword value)
- Sweet spot: 250-500 characters (enough detail to be useful without overwhelming)
- Maximum: ~1,000 characters (Google truncates longer answers behind "Read more")
- For topics requiring more depth: use Google Docs Answer Funnel

### 4.4 Example Entries by Vertical

**Home Services:**
```
Q: How much does a tankless water heater installation cost in Sugar Land?

A: At ABC Plumbing, tankless water heater installation in Sugar Land 
typically ranges from $2,800 to $5,500 depending on the unit selected 
(Rinnai or Navien), gas line requirements, and venting configuration. 
This includes the unit, all materials, labor, permits, and a full system 
commissioning. We offer free in-home estimates and financing through 
GreenSky. Licensed Texas Master Plumber (TSBPE #M-40123). 
Call (281) 555-0142 to schedule your free estimate.
```

**Restaurant:**
```
Q: Does Spectators Bar & Grill offer private event space in Sugar Land?

A: Spectators Bar & Grill offers private and semi-private event hosting 
at our Sugar Land location for groups of 20-120 guests. Our event packages 
include customized menus, dedicated bar service, A/V setup with our 40+ 
screens, and a dedicated event coordinator. Perfect for corporate events, 
watch parties, rehearsal dinners, and birthday celebrations. We also offer 
full off-site catering. Call (346) 874-7275 to discuss your event.
```

**Salon:**
```
Q: What's the difference between balayage and traditional highlights?

A: Great question — at Pure Elements Salon, balayage is a hand-painted 
technique that creates a natural, graduated color effect with softer regrowth 
lines, meaning less maintenance (touchups every 12-16 weeks vs. 6-8 for 
traditional foils). Traditional highlights use foils for more uniform, 
all-over brightness. Our color specialists will recommend the best approach 
during your complimentary consultation based on your hair type, lifestyle, 
and goals. Both services include Olaplex bond treatment. 
Book at (518) 555-0198.
```

---

## 5. GOOGLE DOCS ANSWER FUNNEL

### 5.1 When to Use

Deploy a Google Docs answer funnel when the Q&A topic warrants 1,000+ words of detail. Common triggers:
- Complex pricing breakdowns with multiple variables
- Step-by-step process guides
- Comparison guides (option A vs. option B vs. option C)
- "How to choose a..." guides targeting decision-stage keywords

### 5.2 Google Doc Structure

```
Title: [Client Name] — [Topic] Guide
URL: Publicly viewable Google Doc

Content Structure:
1. Direct answer to the question (first paragraph)
2. Detailed breakdown with subheadings
3. Pricing table or comparison table
4. FAQ section within the doc (nested FAQ schema on the website version)
5. Clear CTA with phone number and booking link
6. Business credentials section at the bottom

Format Requirements:
- Professional formatting (headings, bullets, tables)
- Include the business name and city at least 3 times
- Minimum 1,500 words for the doc to provide genuine value
- Include images if possible (process photos, team photos)
```

### 5.3 Linking from Q&A

In the GBP Q&A answer, include:
```
"We created a free comprehensive guide to [topic]: [Google Doc URL]. 
For personalized advice, call us at [phone]."
```

### 5.4 SEO Value

This creates a three-layer content stack:
1. **GBP Q&A** → Brief, keyword-dense answer (Google indexes)
2. **Google Doc** → Comprehensive guide (Google indexes, Google-to-Google trust signal)
3. **Website FAQ page** → Same content with FAQPage schema (organic ranking potential)

All three layers reinforce each other and target the same keyword cluster from different surfaces.

---

## 6. POSTING PROCESS

### 6.1 Account Strategy

Q&A entries require two Google accounts:
1. **Question Account:** A personal Google account posts the question. This should NOT be the business owner's account (Google may flag self-Q&A from the same account).
2. **Business Account:** The GBP-verified business owner account posts the answer. Business owner answers appear with a "Business Owner" badge, which increases trust.

### 6.2 Deployment Cadence

```
Week 1: Post 5-7 Q&A entries (service-specific + pricing)
Week 2: Post 5-7 Q&A entries (process + credentials + area)
Week 3: Post 3-5 Q&A entries (comparison + decision)
Week 4+: Add 2-3 per week based on keyword research + seasonal relevance
```

**Timing rules:**
- Don't post all entries on the same day (looks unnatural)
- Space entries 1-2 days apart within each week
- Vary the time of day (not all at 9am)

### 6.3 Upvote Strategy

After posting, upvote the most important Q&A entries from additional Google accounts. Google surfaces Q&A entries with more upvotes more prominently. Target: 3-5 upvotes on the top 5-10 most valuable entries.

---

## 7. SCORING RUBRIC

| Score | Criteria |
|-------|----------|
| **0** | No Q&A entries on GBP. |
| **1** | 1-3 customer-posted Q&A with generic or no business owner answers. |
| **2** | A few Q&A entries, thin answers, no keyword targeting. |
| **3** | 5-10 entries, some business owner answers, minimal keyword density. |
| **4** | 10-15 entries, business owner answers on most, moderate detail. |
| **5** | 10-15 entries, all with business owner answers, moderate keyword density. |
| **6** | 15-20 entries, covering most question categories, good keyword targeting. |
| **7** | 20+ entries, comprehensive answers, all 6 question categories covered. |
| **8** | 25+ entries with answer funnels, keyword-dense, service area coverage complete. |
| **9** | 30+ entries, answer funnels for top 3-5 topics, FAQPage schema on website matches. |
| **10** | 30+ entries covering every service + area + FAQ, answer funnels active, regular refresh cadence, Q&A content feeds both GBP ranking and AI visibility. |

---

## 8. MONITORING & REFRESH

### 8.1 Monitoring
- Check for new customer-posted questions weekly (answer within 24 hours)
- Check for spam/competitor questions (flag and report if malicious)
- Track which Q&A entries appear as justification snippets

### 8.2 Refresh Triggers
- New services added → add corresponding Q&A entries
- Pricing changes → update price-related answers immediately
- Seasonal relevance → add seasonal Q&A ("Do you offer [holiday service]?")
- Competitor Q&A analysis reveals gaps → fill with new entries

---

## 9. AUTOMATION PIPELINE

```
TRIGGER: New client onboarded OR monthly refresh cycle

1. PULL current GBP Q&A entries
2. COUNT and categorize existing entries
3. SCORE current state (Section 7)
4. IF score < 7:
   a. GENERATE keyword-targeted questions by category (Section 4.2)
   b. WRITE comprehensive answers (Section 4.3)
   c. IDENTIFY 2-3 topics for Google Docs answer funnels
   d. FORMAT deliverable with deployment schedule
   e. DELIVER to operator for posting
5. MONITOR weekly for new customer questions
6. REFRESH quarterly with new entries based on keyword changes

ESCALATION POINTS:
- Spam/malicious questions detected → alert operator to report
- Customer question requires sensitive information → flag for operator response
- Answer funnel topics identified → create Google Docs content
```

---

*This spec is part of the Silas Engine, Route 1: GBP Optimization Pipeline.*
