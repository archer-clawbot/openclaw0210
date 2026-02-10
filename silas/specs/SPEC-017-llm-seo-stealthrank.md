# SPEC-017: LLM SEO — StealthRank System
## Silas Engine — AI/Cross-Platform Group
### Version 1.0 | AI & Cross-Platform Optimization

---

## 1. PURPOSE

This specification defines Silas's methodology for optimizing client businesses to appear in Large Language Model (LLM) responses — ChatGPT, Google Gemini, Perplexity, Claude, Microsoft Copilot, and Apple Intelligence. Traditional SEO targets Google's crawler and ranking algorithm. LLM SEO targets the training data, retrieval pipelines, and citation preferences of AI systems that are rapidly replacing traditional search for local business discovery.

"StealthRank" is the internal codename because these optimizations are invisible to competitors — there's no public ranking position to monitor, no SERP feature to reverse-engineer. You either appear in AI responses or you don't.

**Core principle:** "AI systems recommend businesses they can verify across multiple independent sources. Become the most verifiable entity in your market."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-002: GBP Description Engineering | Entity co-citation seeds for LLM knowledge graphs |
| SPEC-003: GBP Q&A Pre-emption | AI-scrapable structured Q&A pairs |
| SPEC-006: Semantic Location Silo | Authoritative content pages that LLMs cite |
| SPEC-007: Grounding Box Offensive | Content structured for AI extraction |
| SPEC-008: Schema & Structured Data | Machine-readable entity data for LLM comprehension |
| SPEC-010: On-Page Content Optimization | Content quality signals that influence training data |
| SPEC-011: Citation Building & NAP | Cross-platform verification nodes for entity confidence |
| SPEC-015: Geo-Grid Rank Tracking | Measurement framework (extended for LLM tracking) |
| SPEC-016: Client Reporting System | LLM visibility metrics included in reports |
| SPEC-018: Cross-Platform AI Ecosystem | Multi-platform content that feeds LLM training |

---

## 3. HOW LLMs RECOMMEND LOCAL BUSINESSES

### 3.1 LLM Information Sources

LLMs don't search the web in real-time (except Perplexity and Gemini with Search grounding). They draw from:

| Source | How It's Used | Optimization Target |
|--------|-------------|-------------------|
| Training data | Pre-baked knowledge from web crawl snapshots | Ensure business appears in crawled content (website, directories, news, reviews) |
| RAG (Retrieval-Augmented Generation) | Real-time web retrieval to supplement responses | Optimize for search snippet extraction (grounding boxes, schema) |
| Knowledge graphs | Structured entity databases (Google KG, Wikidata) | Build entity authority through consistent NAP + citations |
| Review aggregation | Sentiment and frequency signals from review platforms | Volume + recency + sentiment optimization (SPEC-012) |
| Structured data | Schema.org markup parsed during crawl or retrieval | Complete and accurate LocalBusiness schema (SPEC-008) |

### 3.2 LLM Decision Framework

When an LLM responds to "best plumber in Fort Lauderdale," it evaluates:

```
1. Entity recognition: Does it know this business exists?
   → Requires: consistent presence across multiple platforms
   
2. Entity confidence: How sure is it about the business details?
   → Requires: identical NAP across 50+ directories
   
3. Authority signals: Is this business considered a leader?
   → Requires: review volume, rating, content depth, citation count
   
4. Recency: Is the information current?
   → Requires: recent reviews, recent content, active GBP
   
5. Verifiability: Can the recommendation be fact-checked?
   → Requires: consistent information across independent sources
   
6. Specificity: Does the business match the exact query intent?
   → Requires: granular service descriptions, location specificity
```

### 3.3 Key Differences from Traditional SEO

| Factor | Google Search | LLM Responses |
|--------|-------------|---------------|
| Ranking signal | PageRank, backlinks, CTR | Entity confidence, cross-platform verification |
| Content format | Keywords, meta tags, headers | Natural language, factual claims, structured data |
| Competition | 10 blue links + Map Pack | 1-5 recommendations in prose |
| Measurement | Position tracking, impressions | Response monitoring, mention frequency |
| Update speed | Index in hours/days | Training data updated months later (except RAG) |
| Manipulation resistance | Moderate (link schemes work) | High (fabricated citations get cross-checked) |

---

## 4. LLM-SPECIFIC OPTIMIZATION STRATEGIES

### 4.1 Entity Fortification

The foundation of LLM SEO is making your business entity impossible to ignore.

**Strategy:** Create a dense web of consistent, verifiable information about the business across every platform LLMs crawl.

**Implementation:**

```
Tier 1 — Core Entity Signals (must have):
☐ Google Business Profile — fully optimized (SPEC-001 through 005)
☐ Website with complete LocalBusiness schema (SPEC-008)
☐ Top 20 citation directories with identical NAP (SPEC-011)
☐ 100+ Google reviews with 4.5+ average (SPEC-012)
☐ Active social media profiles (Facebook, Instagram minimum)

Tier 2 — Extended Entity Signals (should have):
☐ Better Business Bureau listing
☐ Industry-specific directories (Angi, HomeAdvisor, Thumbtack, etc.)
☐ Local Chamber of Commerce membership
☐ Wikipedia or Wikidata entity (if notable enough)
☐ Crunchbase profile (for B2B/tech)
☐ Apple Maps listing (Apple Intelligence source)
☐ Bing Places listing (Copilot source)

Tier 3 — Authority Entity Signals (competitive advantage):
☐ Local news mentions (press releases, features, interviews)
☐ Industry publication mentions
☐ Podcast guest appearances with transcripts
☐ YouTube channel with keyword-optimized content
☐ GitHub presence (for relevant technical businesses)
☐ Published case studies with verifiable data
```

### 4.2 Content Engineering for LLM Extraction

LLMs prefer content that is:
- Factual and specific (numbers, prices, dates)
- Self-contained (answers the query without needing context)
- Structured (tables, lists, clear sections)
- Authoritative (credentials stated, sources cited)

**Anti-pattern:** Vague marketing copy like "We're the best plumber in town!" LLMs skip this.

**Target pattern:** "AC evaporator coil replacement in Fort Lauderdale costs $1,800–$4,300 in 2026. The average homeowner pays $2,950. Factors include unit tonnage (1.5-ton: $1,800–$2,500; 5+ ton: $3,500–$4,300), coil type, and emergency service premiums (+20%)."

**Content structure for LLM extraction:**

```html
<!-- Optimized for LLM extraction -->
<article itemscope itemtype="https://schema.org/Service">
  <h1>[Service] Cost in [City] — [Year] Pricing Guide</h1>
  
  <!-- Direct answer paragraph — LLMs extract this first -->
  <p>The average cost for <span itemprop="name">[service]</span> 
  in <span itemprop="areaServed">[city]</span> is <strong>$X,XXX</strong>, 
  with most homeowners paying between <strong>$X,XXX and $X,XXX</strong>.</p>
  
  <!-- Structured data table — LLMs love tables -->
  <table>
    <tr><th>Factor</th><th>Cost Range</th></tr>
    <tr><td>[Factor 1]</td><td>$X,XXX – $X,XXX</td></tr>
    <tr><td>[Factor 2]</td><td>$X,XXX – $X,XXX</td></tr>
  </table>
  
  <!-- FAQ section — maps to conversational queries -->
  <section>
    <h2>Frequently Asked Questions</h2>
    <details>
      <summary>How much does [service] cost in [city]?</summary>
      <p>[Direct factual answer with specific numbers]</p>
    </details>
  </section>
</article>
```

### 4.3 Conversational Query Optimization

LLM queries are conversational, not keyword-based. Users ask:
- "Who's the best plumber near me?"
- "I need my AC fixed in Fort Lauderdale, who should I call?"
- "What does roof replacement cost in Houston?"

**Optimization approach:**

```
For each client service:
1. Map the top 10 conversational queries users might ask an LLM
2. Create content that directly answers each query
3. Structure answers as self-contained paragraphs (not spread across pages)
4. Include specific, verifiable facts (prices, certifications, years in business)
5. Embed the answer in schema markup (FAQ, HowTo, Service)
6. Cross-reference with GBP Q&A (SPEC-003) for consistency
```

**Query mapping template:**

| Conversational Query | Content Target | Answer Format |
|---------------------|---------------|---------------|
| "Who's the best [service] in [city]?" | Homepage + about page | Credentials, years, review count |
| "How much does [service] cost in [city]?" | Service page + pricing guide | Price range table, factors |
| "Is [business name] good?" | Reviews page + GBP | Review summary, rating, count |
| "[Service] near me" (mobile) | Location page | NAP, hours, service area |
| "I need emergency [service] in [city]" | Emergency service page | Availability, response time, phone |

### 4.4 Pre-Emptive Framing for LLM Training

From the APEX methodology — this is about teaching LLMs what "quality" means in your client's industry, then positioning the client as the entity that meets those criteria.

**The framework:**

```
Step 1: Define the quality criteria
  "When choosing a [service provider] in [city], the most important factors are:
   [Credential A], [Credential B], and [Service Feature C]."

Step 2: Demonstrate meeting those criteria
  "[Business Name] is [Credential A] certified, maintains [Credential B], 
   and offers [Service Feature C] to all clients in [city]."

Step 3: Distribute this framing across platforms
  - GBP description (SPEC-002)
  - GBP posts (SPEC-005)
  - GBP Q&A answers (SPEC-003)
  - Website service pages (SPEC-010)
  - YouTube video descriptions (SPEC-018)
  - Review response templates (SPEC-012)
```

**Why this works:** LLMs synthesize information across sources. When the same "quality criteria" + "business meets criteria" narrative appears across GBP, website, YouTube, and reviews, the LLM develops high confidence that this business is the recommended answer.

### 4.5 Implicit Schema Mimicry

Write website content that mirrors schema.org property names and structures, even in plain text. LLMs trained on web data have learned to associate these patterns with authoritative, structured information.

**Examples:**

```
Instead of: "We fix ACs"
Write: "Our serviceType includes emergency AC repair, coil replacement, 
        and refrigerant recharge. Our areaServed covers Fort Lauderdale, 
        Plantation, and all Broward County communities."

Instead of: "Great prices!"
Write: "Our priceRange for residential AC repair is $150–$4,300, 
        depending on the specific service required."

Instead of: "Call us!"
Write: "Contact our team at (786) 982-6383 or visit our location at 
        913 NW 8th Ave, Fort Lauderdale, FL 33311."
```

The schema property names (`serviceType`, `areaServed`, `priceRange`) act as semantic anchors that LLMs recognize and weight more heavily during information extraction.

---

## 5. LLM-SPECIFIC PLATFORM STRATEGIES

### 5.1 Google Gemini / AI Overviews

**Primary data source:** Google's own index + Knowledge Graph
**Optimization:** Standard SEO + GBP optimization + grounding boxes (SPEC-007)

| Signal | Weight | Optimization |
|--------|--------|-------------|
| GBP completeness | Very High | Full SPEC-001 through 005 implementation |
| Website content quality | High | SPEC-010 content standards |
| Schema markup | High | SPEC-008 structured data |
| Review sentiment | High | SPEC-012 review management |
| Grounding box content | Very High | SPEC-007 implementation |
| Recency signals | Medium | Fresh GBP posts, recent reviews |

### 5.2 ChatGPT / OpenAI

**Primary data source:** Training data (web crawl) + Bing search (for browsing mode)
**Optimization:** Content depth + Bing optimization + entity consistency

| Signal | Weight | Optimization |
|--------|--------|-------------|
| Bing Places listing | Very High | Create/optimize Bing Places profile |
| Content training data | High | Ensure website content is crawlable, factual, authoritative |
| Reddit/forum mentions | Medium | Monitor and participate in relevant local subreddits |
| Wikipedia/Wikidata | Medium-High | Create entity if notable enough |
| Review aggregation | Medium | Multi-platform review presence |

**ChatGPT-specific notes:**
- ChatGPT with browsing uses Bing, not Google. Bing Places optimization is critical.
- ChatGPT's training data has a lag. Content must exist for months before it enters training.
- ChatGPT heavily weights entities that appear in "authoritative" sources (news, government, education domains).

### 5.3 Perplexity

**Primary data source:** Real-time web search (multiple search engines)
**Optimization:** SEO fundamentals + citation-worthy content

| Signal | Weight | Optimization |
|--------|--------|-------------|
| Search ranking (organic) | Very High | Standard SEO (Perplexity searches the web live) |
| Content structure | High | Direct answers, tables, clear formatting |
| Source diversity | High | Appear on multiple domains for the same query |
| Recency | Very High | Fresh content wins (Perplexity prioritizes recent results) |
| Schema markup | Medium | Helps with structured extraction |

**Perplexity-specific notes:**
- Perplexity cites its sources with links. Getting cited = direct traffic.
- Content that provides definitive, specific answers gets cited more often.
- Perplexity uses multiple search backends — appearing in both Google and Bing results increases citation probability.

### 5.4 Microsoft Copilot

**Primary data source:** Bing index + Microsoft Graph
**Optimization:** Bing SEO + Microsoft ecosystem presence

| Signal | Weight | Optimization |
|--------|--------|-------------|
| Bing Places | Very High | Full optimization required |
| Bing Webmaster Tools | High | Submit sitemap, monitor indexing |
| LinkedIn presence | Medium | Company page + employee profiles |
| Microsoft Graph | Medium | If client uses Microsoft 365, data may surface |

### 5.5 Apple Intelligence / Siri

**Primary data source:** Apple Maps + web search (via Apple's search, with some Google integration)
**Optimization:** Apple Maps listing + Yelp (Apple's review partner)

| Signal | Weight | Optimization |
|--------|--------|-------------|
| Apple Maps listing | Very High | Claim and optimize via Apple Business Connect |
| Yelp reviews | Very High | Yelp is Apple's primary review data source |
| Website quality | Medium | Apple crawls websites for additional data |
| Siri-friendly content | Medium | Conversational, direct-answer content |

---

## 6. LLM VISIBILITY MONITORING

### 6.1 Testing Protocol

Since there's no "rank tracker" for LLM responses, monitoring requires direct querying.

**Manual testing cadence:** Monthly (minimum), quarterly for trend analysis

**Automated testing cadence:** Weekly via API calls (see §6.3)

### 6.2 Test Query Set

For each client, maintain a standardized set of test queries:

```
Category 1: Direct recommendation queries
- "Who is the best [service] in [city]?"
- "Recommend a [service provider] in [city]"
- "Top [service] companies near [neighborhood]"

Category 2: Cost/pricing queries
- "How much does [service] cost in [city]?"
- "What's the average price for [service] in [city]?"
- "[Service] pricing [city] [year]"

Category 3: Comparison queries
- "Compare [service] companies in [city]"
- "[Business Name] vs [Competitor Name]"
- "Is [Business Name] good?"

Category 4: Emergency/urgent queries
- "I need [service] right now in [city]"
- "Emergency [service] [city]"
- "24 hour [service] near me"

Category 5: Branded queries
- "Tell me about [Business Name]"
- "[Business Name] reviews"
- "What services does [Business Name] offer?"
```

### 6.3 Automated LLM Polling System

Using the AI visibility tool architecture discussed for the agency:

```
Polling pipeline:
1. For each client × each test query:
   a. Send query to ChatGPT API (gpt-4o)
   b. Send query to Gemini API
   c. Send query to Perplexity API
   d. Send query to Claude API
   
2. Parse each response:
   a. Does the response mention the client's business? (Y/N)
   b. What position is the mention? (1st, 2nd, 3rd recommendation, etc.)
   c. What information is provided? (name, phone, address, description)
   d. Is the information accurate? (verify against known NAP)
   e. Are competitors mentioned? (which ones, in what order)
   f. What sources are cited? (if applicable — Perplexity)
   
3. Score and store:
   a. LLM Mention Rate: % of queries where client is mentioned
   b. LLM Position: Average recommendation position
   c. LLM Accuracy: % of mentions with correct information
   d. LLM Share of Voice: Client mentions / total business mentions
   e. Platform breakdown: Per-LLM metrics
```

### 6.4 LLM Visibility Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| LLM Mention Rate | % of test queries where business is mentioned | >50% across platforms |
| LLM Recommendation Position | Average position in recommendation lists | Top 3 |
| LLM Accuracy Score | % of mentions with correct NAP + details | 100% |
| LLM Share of Voice | Business mentions / total business mentions across all queries | >20% |
| LLM Platform Coverage | % of LLM platforms where business appears | 75%+ |
| LLM Sentiment | Positive/neutral/negative tone of mentions | >80% positive |

### 6.5 Competitive LLM Benchmarking

```
For each client's market:
1. Run the same test queries through all LLMs
2. Track which businesses are recommended most often
3. Build a "LLM leaderboard" showing:
   - Who the LLMs recommend first
   - What information they cite (reviews, credentials, location)
   - Which businesses are NEVER mentioned (opportunity)
4. Analyze WHY certain competitors rank higher in LLM responses:
   - More reviews?
   - Better content?
   - Stronger citation presence?
   - Wikipedia/Wikidata entity?
5. Generate gap analysis and action items
```

---

## 7. LLM-SPECIFIC CONTENT STRATEGIES

### 7.1 The "Definitive Answer" Content Template

Create pages designed specifically to be extracted by LLMs:

```markdown
# [Service] in [City]: Complete [Year] Guide

## Quick Answer
[1-2 sentence direct answer to the most common query about this service in this city.
Include specific numbers — price range, time estimates, key qualifications.]

## Cost Breakdown
| Service Type | Price Range | Average |
|-------------|-------------|---------|
| [Type 1] | $X – $Y | $Z |
| [Type 2] | $X – $Y | $Z |

## What to Look For in a [Service Provider]
1. [Credential/certification — specific, verifiable]
2. [Experience indicator — years, project count]
3. [Trust signal — insurance, bonding, licensing]

## About [Business Name]
[Business Name] is a [credential]-certified [service provider] serving [city] 
and surrounding areas since [year]. With [X] Google reviews averaging [X.X] stars, 
we specialize in [specific services]. Contact us at [phone] or visit [address].

## Frequently Asked Questions
### How much does [service] cost in [city]?
[Direct factual answer with specific numbers]

### How do I choose a [service provider] in [city]?
[Answer that positions client's differentiators as industry standards]

### Does [Business Name] offer [specific service]?
[Yes, with details about that specific service offering]
```

### 7.2 The "Entity Hub" Page

A single page that serves as the definitive source of truth about the business entity:

```
URL: /about or /about-[business-name]

Required content:
☐ Full legal business name
☐ Complete address with schema markup
☐ Phone number
☐ Hours of operation
☐ Year established
☐ Owner/leadership names (with credentials)
☐ All certifications and licenses (with issuing bodies)
☐ All service areas (specific neighborhoods, not just "and surrounding areas")
☐ All services offered (with brief descriptions)
☐ Awards and recognition
☐ Industry association memberships
☐ Links to all other platform profiles (GBP, Yelp, BBB, etc.)
☐ sameAs schema pointing to all platform URLs
```

This page becomes the canonical reference that LLMs cross-check against other sources. Every fact on this page should be verifiable on at least 2 other platforms.

### 7.3 Review-to-Content Pipeline

LLMs heavily weight review data. Create a feedback loop:

```
1. Positive review received on Google
2. Extract key praise points (specific service, staff name, outcome)
3. Incorporate into:
   a. Service page testimonial section
   b. GBP post highlighting the experience
   c. Social media post (with permission)
   d. Case study / project page (for significant jobs)
4. The same praise points now appear on Google Reviews, website, GBP, 
   and social media — creating 4 independent verification nodes
5. LLMs see the consistent narrative across sources → higher confidence
```

---

## 8. NEGATIVE LLM OPTIMIZATION (DEFENSIVE)

### 8.1 Misinformation Correction

LLMs can hallucinate or present outdated information about a business.

**Detection:**
- Monthly brand query monitoring (§6.2)
- Alert if LLM states incorrect phone, address, hours, or services
- Alert if LLM associates negative sentiment that doesn't match reviews

**Correction strategies:**

| Issue | Correction |
|-------|-----------|
| Wrong phone number | Update NAP across all 50+ directories, ensure schema matches |
| Wrong address | Same — update everywhere, prioritize Google, Bing, Apple |
| Outdated hours | Update GBP + website + all directories |
| Wrong services listed | Add/update services on GBP, website, and directories |
| Negative association | Increase positive review volume, publish positive case studies |
| Competitor confusion | Strengthen unique entity signals (unique name, unique content) |

### 8.2 Reputation Management in LLM Context

Negative content about a business can persist in LLM training data long after it's been resolved.

```
Mitigation approach:
1. Monitor LLM responses for negative mentions
2. If found, trace the source (usually old reviews, news articles, or complaints)
3. Generate counter-content:
   a. Publish response/resolution on the same platforms
   b. Generate fresh positive content that outweighs negative
   c. Request removal of outdated/inaccurate content where possible
4. For RAG-based LLMs (Perplexity, Gemini with search):
   - Improvement is faster because they pull current web data
5. For training-based LLMs (ChatGPT, Claude):
   - Improvement is slower — takes until next training data refresh
   - Focus on volume of positive signals to outweigh negative
```

---

## 9. SILAS LLM OPTIMIZATION WORKFLOW

### 9.1 New Client LLM Audit

```
Step 1: Baseline LLM visibility check
  Run all test queries (§6.2) across all platforms
  Document: Where does the client appear? Where are they absent?

Step 2: Entity consistency audit
  Cross-check NAP across all known directories
  Score: % consistency (target: 100%)

Step 3: Competitor LLM analysis
  Who do LLMs currently recommend for client's keywords?
  What do those competitors have that the client doesn't?

Step 4: Gap identification
  Map missing platform presences
  Identify content gaps (no pricing page, no FAQ, etc.)
  Flag inaccurate LLM information for correction

Step 5: Prioritized action plan
  Tier by impact: Entity signals first, content second, monitoring third
```

### 9.2 Ongoing LLM Optimization Cadence

| Task | Frequency | Automation Level |
|------|-----------|-----------------|
| LLM polling (test queries) | Weekly | Fully automated via API |
| Entity consistency check | Monthly | Automated with manual review |
| Content freshness audit | Monthly | Semi-automated |
| Competitive LLM benchmarking | Monthly | Automated |
| LLM misinformation check | Monthly | Automated with manual correction |
| Strategy adjustment | Quarterly | Manual (Silas recommends, operator approves) |

### 9.3 Integration with Report Pipeline (SPEC-016)

Add to monthly client report:

```
Section: AI Visibility Report

LLM MENTION RATE: [X]% (up from [Y]%)
  - ChatGPT: [Z]%
  - Gemini: [Z]%
  - Perplexity: [Z]%
  - Copilot: [Z]%

TOP RECOMMENDATION: [Business appears as #X recommendation on average]

KEY WIN: "ChatGPT now recommends [Business Name] as the first option 
         for '[keyword]' queries — up from not mentioned last month."

ACCURACY: [X]% of mentions contain correct contact information

COMPETITOR ALERT: [Competitor Name] is being recommended more frequently 
                  on [Platform] — they recently [gained reviews / published content / etc.]
```

---

## 10. ADVANCED TECHNIQUES

### 10.1 Knowledge Graph Seeding

For businesses with sufficient notability, creating or enhancing Knowledge Graph entries:

```
Wikidata:
- Create a Wikidata entity for the business (if notable)
- Include: name, location, founding date, industry, website
- Link to: GBP, social profiles, industry associations

Google Knowledge Panel:
- Claim via Google's Knowledge Panel claim process
- Verify all information
- Add: logo, social profiles, website, founding date

Apple Maps:
- Claim via Apple Business Connect
- Verify all information
- Add photos, hours, services
```

### 10.2 The "NotebookLM" Tactic

From the APEX course — use Google's NotebookLM as an authority amplifier:

```
1. Upload client's best content (service guides, pricing pages) to NotebookLM
2. NotebookLM processes and indexes the content within Google's ecosystem
3. Generate a podcast/audio summary of the content
4. The content now exists as a Google-hosted knowledge asset
5. This creates an additional verification node within Google's own infrastructure
6. Particularly powerful for Gemini/AI Overview optimization
```

### 10.3 The "Answer Funnel" via Google Docs

From APEX Q&A tactics — use Google Docs as an authority bridge:

```
1. Create a comprehensive Google Doc answering a complex query
   (e.g., "Complete Guide to Insurance Claims for Roof Replacement in [City]")
2. Set sharing to "Anyone with the link can view"
3. Reference this doc in GBP Q&A answers
4. The doc creates a click signal from GBP → Google Docs (Google-to-Google trust)
5. The doc is crawlable and can appear in search results
6. LLMs processing Google Docs content treat it as semi-authoritative
```

---

## 11. GLOSSARY

| Term | Definition |
|------|-----------|
| **StealthRank** | Internal codename for LLM SEO — optimizations invisible to competitors |
| **LLM SEO** | Optimization of business visibility in AI chatbot responses |
| **AEO** | Answer Engine Optimization — optimizing for AI-powered answer systems |
| **Entity Fortification** | Building dense, consistent, verifiable information about a business across platforms |
| **RAG** | Retrieval-Augmented Generation — LLMs that search the web before responding |
| **Knowledge Graph** | Structured database of entities and their relationships (Google KG, Wikidata) |
| **LLM Mention Rate** | Percentage of test queries where a business appears in the LLM response |
| **LLM Share of Voice** | Business mentions as a proportion of total business mentions across queries |
| **Implicit Schema Mimicry** | Writing content using schema.org property names in natural language |
| **Pre-Emptive Framing** | Defining quality criteria in an industry, then positioning the client as meeting them |
| **Entity Hub** | A single canonical page serving as the definitive source of truth about the business |
| **NotebookLM Tactic** | Using Google NotebookLM to create Google-hosted knowledge assets |

---

## 12. CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial specification — complete LLM SEO system |

---

*End of SPEC-017*
