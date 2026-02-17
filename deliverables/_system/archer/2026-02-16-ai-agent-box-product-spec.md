# AI Agent Box — Product Specification
**Date:** 2026-02-16  
**Status:** Brainstorm / Post-Perfection Concept  
**Priority:** Deferred (after Week 4 system stability)

---

## Executive Summary

**Product:** Plug-and-play Raspberry Pi 5 device pre-configured with 18-agent LocalCatalyst.ai marketing system.

**Value Prop:** "Own Your 24/7 AI Marketing Team — No Monthly Fees"

**Target Market:** 
- Multi-location businesses (medical, home services, restaurants)
- Franchises (standardized config, location-specific data)
- Small agencies (white-label for clients)

**Business Model:** 
- One-time sale: $800-1200 (hardware + setup + lifetime updates)
- Optional support: $100-200/mo (troubleshooting, config changes)
- Client provides own API keys (no recurring API liability)

**Key Innovation:** Physical device clients can touch/see (higher perceived value than cloud service) + autonomous operation (set it and forget it).

---

## Hardware Specification

### Base Configuration

**Option 1: Premium (Pironman 5 Kit) — $180 cost, sell at $1200**
| Component | Spec | Cost |
|-----------|------|------|
| Raspberry Pi 5 | 8GB RAM | $80 |
| Pironman 5 Case | Aluminum, active cooling, OLED display | $90 |
| Power Supply | USB-C 27W official | $12 |
| Storage | 256GB microSD (Class 10 A2) | $25 |
| Ethernet Cable | Cat6, 6ft | $5 |
| **Total Hardware Cost** | | **$212** |
| **Your Margin** | | **$988** |

**Option 2: Budget (Basic Setup) — $120 cost, sell at $800**
| Component | Spec | Cost |
|-----------|------|------|
| Raspberry Pi 5 | 8GB RAM | $80 |
| Official Case | With active cooler | $15 |
| Power Supply | USB-C 27W official | $12 |
| Storage | 128GB microSD (Class 10 A2) | $15 |
| Ethernet Cable | Cat6, 6ft | $5 |
| **Total Hardware Cost** | | **$127** |
| **Your Margin** | | **$673** |

### Pre-Installed Software
- **OS:** Raspberry Pi OS Lite (headless, optimized)
- **OpenClaw:** Gateway + 18-agent system
- **Dashboard:** Next.js web interface (local + Tailscale remote access)
- **Agents:** Silas, Scribe, Wrench, Specs, Herald, Citadel, Lookout, Ledger, Canvas, Mozi, Scout, Builder, Ghost, Sentinel, Forge, Razor, Blitz, Archer
- **Monitoring:** Sentinel nightly health checks, Forge overnight improvements

### Branding
- Custom laser-etched logo on case: "LocalCatalyst AI Agent"
- QR code sticker: "Scan to Setup" → lands on local dashboard
- Included quick-start card (4x6", laminated):
  - "1. Plug in ethernet + power"
  - "2. Scan QR code on case"
  - "3. Add your API key"
  - "4. You're live in 10 minutes"

---

## Dashboard Specification

### Access Methods

**1. Local Dashboard (Primary)**
- URL: `http://marketing-box.local` or `http://192.168.1.X:3000`
- Auto-discovery via mDNS (client types name, router resolves IP)
- Works immediately on client's wifi (no external accounts)

**2. Telegram Bots (Mobile/Notifications)**
- Pre-configured bots for key agents:
  - @HeraldGBPBot (GBP posts, reviews)
  - @LookoutRankBot (rank tracking, alerts)
  - @ArcherClawBot (orchestrator, general commands)
- Client scans QR during setup → auto-invites to bots
- Notifications pushed to Telegram (review alerts, rank drops, weekly reports)

**3. Tailscale VPN (Optional Remote Access)**
- Installed but not activated by default
- Client can enable in dashboard settings → generates invite link
- Once enabled, access dashboard from anywhere: `http://marketing-box.tail-scale.ts.net`

### Dashboard Features

#### Home Screen
**Status Tiles (Agent Overview)**
```
┌─────────────┬─────────────┬─────────────┐
│ Herald      │ Lookout     │ Silas       │
│ ✅ Active   │ ✅ Active   │ 🟡 Idle     │
│ 4 posts     │ Tracking    │ Ready       │
│ published   │ 15 keywords │             │
└─────────────┴─────────────┴─────────────┘
┌─────────────┬─────────────┬─────────────┐
│ Scribe      │ Citadel     │ Wrench      │
│ ✅ Active   │ ✅ Active   │ 🟡 Idle     │
│ 2 drafts    │ NAP: 98%    │ Ready       │
│ ready       │ consistent  │             │
└─────────────┴─────────────┴─────────────┘
```

**Activity Feed (Recent Work)**
```
🎯 Herald published GBP post: "Presidents Day Special - 20% Off" (2 hours ago)
📊 Lookout detected ranking drop: "dental implants Houston" -5 spots (4 hours ago)
✅ Citadel submitted citations to 12 directories (yesterday)
📝 Scribe completed blog post: "5 Reasons to Choose Invisalign" (2 days ago)
```

#### Rankings Page (Lookout Data)
- Line chart showing keyword positions over time (7d, 30d, 90d views)
- Table of tracked keywords:
  - Keyword | Current Rank | Change (↑3, ↓5) | Volume | Difficulty
- Alerts section:
  - "⚠️ 3 keywords dropped >5 spots this week"
  - "✅ 2 keywords entered top 3"

#### Content Queue (Scribe + Herald)
**GBP Posts**
```
📅 Scheduled (Next 7 Days)
- Feb 18: "Winter Dental Checkup Reminder" [Edit] [Delete]
- Feb 20: "Meet Dr. Smith - New Hygienist" [Edit] [Delete]
- Feb 24: "Spring Cleaning for Your Smile" [Edit] [Delete]

📝 Drafts (Awaiting Approval)
- "5 Tips for Whiter Teeth" [Preview] [Approve] [Edit]
```

**Blog Posts**
```
✅ Published
- "How to Choose the Right Dentist" (Feb 10)
- "Invisalign vs Braces: Which is Right for You?" (Feb 3)

🔄 In Progress
- Scribe writing: "The Truth About Teeth Whitening" (70% complete)
```

#### Citations (Citadel Data)
- NAP Consistency Score: 98% (visual gauge)
- Directories submitted: 47/50
- Pending submissions: 3 (Yelp, Yellowpages, Bing Places)
- Inconsistencies found: 2 (show details)

#### Settings
**Business Info**
- Business Name: [___________]
- Phone: [___________]
- Address: [___________]
- Website: [___________]
- Google Business Profile Link: [___________]

**API Keys**
- Anthropic (Claude): [••••••••••••••••] [Edit]
- Google Gemini (optional): [••••••••••••••••] [Edit]
- SE Ranking (optional): [••••••••••••••••] [Edit]

**Posting Schedule**
- GBP posts: [Weekly ▼] on [Mondays ▼]
- Blog posts: [Monthly ▼]

**Notifications**
- Telegram: [@username] [Connected ✅] [Reconnect]
- Email alerts: [email@example.com] [Test]

**Remote Access**
- Tailscale VPN: [Disabled] [Enable] 
  (Access your dashboard from anywhere)

**Advanced**
- Agent configuration (link to AGENTS.md editor)
- Logs (view system logs)
- Restart agents
- Factory reset

---

## Setup Flow (Client Experience)

### Step 1: Unboxing
Client receives:
- Pironman 5 box (or basic case)
- Power supply
- Ethernet cable
- Quick-start card (laminated, 4x6")
- QR code sticker on case: "Scan to Setup"

### Step 2: Physical Setup
1. Plug ethernet cable into router
2. Plug USB-C power into Pi
3. Wait 60 seconds for boot (OLED display shows "OpenClaw Ready")

### Step 3: Dashboard Setup
1. Scan QR code on case → opens `http://marketing-box.local/setup`
2. Setup wizard loads (5 screens):

**Screen 1: Welcome**
```
Welcome to Your AI Marketing Team!

Let's get you set up in 5 easy steps.

[Next →]
```

**Screen 2: API Key**
```
Add Your Anthropic API Key

Your AI agents use Claude to write content, respond to reviews, and more.

Get your key: https://console.anthropic.com/settings/keys

[Paste API Key: ___________]

Need help? Watch setup video: [link]

[← Back]  [Next →]
```

**Screen 3: Business Info**
```
Tell Us About Your Business

Business Name: [___________]
Phone: [___________]
Address: [___________]
Website: [___________]
Google Business Profile Link: [___________]

[← Back]  [Next →]
```

**Screen 4: Services (Optional)**
```
What Services Do You Offer? (Optional)

This helps your AI agents write better content.

- [x] Dental Implants
- [x] Cosmetic Dentistry
- [ ] Orthodontics
- [ ] Emergency Services

Or enter manually: [___________]

[← Back]  [Next →]
```

**Screen 5: Connect Telegram (Optional)**
```
Get Mobile Notifications (Optional)

Scan this QR code with Telegram to get instant alerts:

[QR Code]

You'll get notifications for:
- New Google reviews
- Ranking changes
- Weekly reports

Skip for now? You can enable this later in Settings.

[← Back]  [Finish Setup →]
```

### Step 4: Agents Start Working
- Setup complete screen:
  ```
  🎉 You're All Set!

  Your AI agents are now working 24/7:
  ✅ Herald will publish your first GBP post tomorrow
  ✅ Lookout started tracking your rankings
  ✅ Citadel is checking your citations

  Bookmark this page: http://marketing-box.local

  [Go to Dashboard]
  ```

### Step 5: First Run Tasks (Auto-Executed)
1. **Silas** runs CATALYST audit (baseline SEO health)
2. **Scout** researches keywords for client's industry
3. **Scribe** generates 4 GBP posts (queued for Herald)
4. **Lookout** sets up rank tracking (keywords from Scout)
5. **Citadel** audits NAP consistency across top 50 directories
6. **Sentinel** schedules nightly health checks (2am)

**Timeline:**
- Day 1: Setup + initial audits (2-4 hours background processing)
- Day 2: First GBP post published, rankings tracked, citations submitted
- Day 7: First weekly report (Lookout + Ledger via Telegram)

---

## Tech Stack

### Backend
- **OpenClaw Gateway:** Node.js daemon (port 18789)
- **Agent System:** 18 agents with SKILL.md, MEMORY.md workspaces
- **Database:** SQLite (local storage, fast, no external deps)
- **Cron Jobs:** Weekly standup (Sunday 9am), nightly health checks (2am)

### Frontend (Dashboard)
- **Framework:** Next.js 14 (React, TypeScript)
- **UI Library:** Shadcn/ui (clean, modern components)
- **Charts:** Recharts (rankings line charts, activity graphs)
- **Styling:** Tailwind CSS
- **Hosting:** Runs on Pi itself (Vercel build → local deploy)

### Networking
- **mDNS:** Avahi (resolves `marketing-box.local` on LAN)
- **Reverse Proxy:** Nginx (routes port 80 → Next.js port 3000)
- **Remote Access:** Tailscale VPN (optional, client-activated)

### Communication
- **Telegram Bots:** Pre-configured for Herald, Lookout, Archer
- **Email Alerts:** Nodemailer (optional, client provides SMTP)

---

## Pricing & Business Model

### Product Tiers

| Tier | Hardware | Price | Margin | Target Customer |
|------|----------|-------|--------|-----------------|
| **Essential** | Basic Pi 5 setup | $800 | $673 | Single-location small biz |
| **Professional** | Pironman 5 kit | $1200 | $988 | Multi-location, franchises |
| **Enterprise** | Pironman 5 + custom config | $1500+ | $1288+ | Agencies (white-label) |

### Optional Add-Ons

| Add-On | Price | What's Included |
|--------|-------|-----------------|
| **Support Plan** | $100-200/mo | Priority troubleshooting, config changes, agent tuning |
| **Custom Branding** | $300 one-time | White-label dashboard, custom case etching |
| **Onboarding Call** | $200 one-time | 1-hour Zoom walkthrough, Q&A, best practices |
| **Extra Agent Config** | $150 one-time | Add custom workflows (e.g., Scout competitor monitoring) |

### Client's Ongoing Costs (They Pay Directly)

| Service | Monthly Cost | Usage Level |
|---------|--------------|-------------|
| Anthropic API (Claude) | $50-200 | Depends on content volume |
| Google Gemini (optional) | $10-50 | If using Canvas for images |
| SE Ranking (optional) | $39-149 | If using Scout for keyword research |
| Electricity | ~$2 | Pi 5 at 10W, 24/7 |
| **Total** | **$60-400/mo** | vs $500-1000/mo for Yext/BrightLocal |

**Key Selling Point:** Client sees transparent costs (their Anthropic dashboard), no markup, no vendor lock-in.

---

## Revenue Projections

### Year 1 (Conservative)

**Assumptions:**
- 1 box sold per week (ramp up from 0 to 2/week by Q4)
- 80% Professional tier ($1200), 20% Essential tier ($800)
- 30% attach support plans ($150/mo avg)
- No custom branding or enterprise sales yet

**Monthly Revenue:**
- Week 1-13 (Q1): 0.5 boxes/week avg = 6 boxes = $6,600 hardware + $270/mo support
- Week 14-26 (Q2): 1 box/week = 13 boxes = $14,300 hardware + $585/mo support
- Week 27-39 (Q3): 1.5 boxes/week = 19 boxes = $20,900 hardware + $855/mo support
- Week 40-52 (Q4): 2 boxes/week = 26 boxes = $28,600 hardware + $1,170/mo support

**Year 1 Total:**
- Hardware sales: $70,400 (64 boxes * $1,100 avg)
- Support plans (recurring): $2,880/mo by end of year (19 clients * $150/mo avg)
- **Total Year 1 Revenue:** $70,400 + $17,280 (support) = **$87,680**

**Cost of Goods Sold (COGS):**
- Hardware: 64 boxes * $200 avg = $12,800
- Your time: 64 boxes * 3 hours setup = 192 hours * $100/hr = $19,200
- **Total COGS:** $32,000

**Year 1 Profit:** $87,680 - $32,000 = **$55,680** (64% margin)

### Year 2 (Moderate Growth)

**Assumptions:**
- 3-5 boxes/week (referrals, case studies, agencies)
- 40% attach support plans (higher retention)
- 10% enterprise/white-label sales ($1500+ per box)

**Projected:**
- 200 boxes/year * $1,150 avg = $230,000 hardware
- 80 support plans * $150/mo * 12 = $144,000 recurring
- **Total Year 2 Revenue:** **$374,000**
- **Estimated Profit:** $240,000 (64% margin)

---

## Target Market

### Ideal Customer Profile (ICP)

**Primary:**
- Multi-location businesses (3-10 locations)
- Industries: Medical (dental, chiropractors), Home Services (HVAC, plumbing), Restaurants (chains)
- Annual revenue: $500K-5M per location
- Current marketing: GBP + basic website, no dedicated marketing person
- Pain points: "Too busy to post on Google, reviews pile up, don't know our rankings"

**Secondary:**
- Small marketing agencies (1-5 employees)
- Want to offer SEO/GBP management but lack in-house expertise
- White-label the box for their clients ($1500 tier + $200/mo support)

**Tertiary:**
- Franchises (standardized marketing across locations)
- Need same system at every location, different data per franchise
- Bulk pricing: 10+ boxes = $900/box ($300 margin reduction for volume)

### Market Size

**Total Addressable Market (TAM):**
- U.S. small businesses with 3-10 locations: ~2 million
- Serviceable Addressable Market (SAM): 200,000 (those actively doing local SEO)
- Serviceable Obtainable Market (SOM): 1,000 clients (0.5% penetration in 3 years)

**Revenue Potential (3-Year Horizon):**
- 1,000 boxes * $1,100 avg = $1.1M hardware sales
- 400 support plans * $150/mo = $60K/mo = $720K/yr recurring
- **Total 3-Year Revenue:** $1.82M (Year 1: $88K, Year 2: $374K, Year 3: $1.36M)

---

## Competitive Analysis

| Competitor | Model | Price | Strengths | Weaknesses |
|------------|-------|-------|-----------|------------|
| **Yext** | SaaS subscription | $500-1000/mo | Enterprise features, integrations | Expensive, overkill for SMBs |
| **BrightLocal** | SaaS subscription | $50-200/mo | Citation management, rank tracking | No content generation, manual work |
| **Semrush Local** | SaaS subscription | $20-40/location/mo | Cheap, basic features | Limited automation, no GBP posting |
| **Your Box** | One-time + optional support | $800-1200 one-time + $100-200/mo | Autonomous, transparent costs, client owns | Requires API keys, tech setup |

**Key Differentiators:**
1. **Client owns the hardware** (not renting SaaS, no vendor lock-in)
2. **Transparent API costs** (they see Anthropic usage, no markup)
3. **Fully autonomous** (set it and forget it, agents work 24/7)
4. **Physical device** (higher perceived value, "AI agent in a box")
5. **Lifetime updates included** (system improves over time via Forge)

---

## Go-To-Market Strategy

### Phase 1: Proof of Concept (Month 1-2)
**Goal:** Validate product with 3-5 beta clients

**Actions:**
1. Build 3 boxes (Pironman 5 kits)
2. Offer to existing clients at 50% off ($600) in exchange for feedback
3. Document setup issues, refine dashboard UX
4. Collect testimonials + case study data (rankings, GBP post engagement)

**Success Metrics:**
- 3 boxes deployed successfully
- <30 minutes setup time (client self-service)
- 1 testimonial + 1 case study
- 0 critical bugs in first 30 days

### Phase 2: Initial Sales (Month 3-6)
**Goal:** Sell 10 boxes, establish sales process

**Actions:**
1. Create landing page (heywoodagency.com/ai-agent-box)
2. Product demo video (3 minutes: unboxing → setup → dashboard tour → results)
3. Case study blog post ("How [Client] Got 200% More GBP Engagement with AI Agent Box")
4. Outreach to past clients + warm leads
5. LinkedIn content: "I just shipped an AI marketing team in a box"

**Channels:**
- Email to past clients (50+ leads)
- LinkedIn posts (3x/week product updates)
- Local business Facebook groups (post case study)
- BNI/Chamber of Commerce demo (bring physical box)

**Success Metrics:**
- 10 boxes sold (mix of Essential + Professional tiers)
- 3 support plan attachments ($150/mo recurring)
- $11K revenue, $7K profit

### Phase 3: Scale (Month 7-12)
**Goal:** 2-3 boxes/week, build recurring support revenue

**Actions:**
1. Agency partnerships (white-label offering)
2. Paid ads (Google: "GBP management tool", Facebook: lookalike audiences)
3. Referral program (existing clients get $200 credit per referral)
4. Content marketing (SEO blog: "Best GBP tools for dentists")
5. Trade shows (dental, home services conferences)

**Channels:**
- Paid ads ($500/mo budget, target $100 CAC)
- Agency partnerships (10 agencies * 2 boxes/yr = 20 boxes)
- Referrals (20% of sales from existing clients)
- Organic content (blog traffic → landing page)

**Success Metrics:**
- 50 boxes sold in 6 months
- $55K revenue, $35K profit
- 15 active support plans ($2,250/mo recurring)

---

## Implementation Roadmap

### Pre-Launch (2-4 Weeks)
**Goal:** Build v1.0, test with 1 internal deployment

**Tasks:**
1. **Hardware:**
   - Order 5 Pironman 5 kits (test 1, deploy 4) — $900
   - Design QR code sticker + quick-start card — $100 print batch
   - Test boot time, thermal performance under load

2. **Software:**
   - Fork OpenClaw config for "box mode" (fixed agent config, no dev tools)
   - Build Next.js dashboard (5 pages: Home, Rankings, Content, Citations, Settings)
   - Implement setup wizard (5 screens)
   - Test mDNS discovery (marketing-box.local auto-resolves)
   - Configure Telegram bots (create 3 bots: Herald, Lookout, Archer)

3. **Documentation:**
   - Quick-start card copy (4x6", print-ready)
   - Setup video (3 min: unboxing → first login → Telegram connect)
   - FAQ doc (common issues, API key setup, Tailscale VPN)

**Deliverable:** 1 fully functional box deployed internally (test all workflows for 7 days)

### Phase 1: Beta (Weeks 5-8)
**Goal:** Deploy 3 beta units, refine based on feedback

**Tasks:**
1. Recruit 3 beta clients (existing clients, 50% off in exchange for feedback)
2. Ship boxes, schedule onboarding calls
3. Collect feedback (setup time, dashboard UX, feature requests)
4. Fix bugs, refine documentation
5. Record testimonial videos

**Deliverable:** 3 beta clients live, 1 case study, 1 testimonial

### Phase 2: Launch (Weeks 9-12)
**Goal:** Sell first 10 boxes, validate pricing

**Tasks:**
1. Launch landing page (heywoodagency.com/ai-agent-box)
2. Product demo video (3 min)
3. Email campaign to past clients (50+ leads)
4. LinkedIn launch post series (5 posts over 2 weeks)
5. Fulfill orders, onboard clients

**Deliverable:** 10 boxes sold, $11K revenue

### Phase 3: Scale (Months 4-6)
**Goal:** 2-3 boxes/week, establish recurring support revenue

**Tasks:**
1. Agency outreach (white-label partnerships)
2. Paid ads launch ($500/mo budget)
3. Referral program launch
4. Content marketing (blog posts, SEO)
5. Trade show booth (if budget allows)

**Deliverable:** 30 boxes sold, $33K revenue, 10 support plans ($1,500/mo recurring)

---

## Technical Considerations

### System Requirements

**Minimum Pi Specs:**
- Raspberry Pi 5 (8GB RAM required for 18 agents + dashboard)
- 128GB storage minimum (256GB recommended for logs/data)
- Active cooling (Pi 5 thermal throttles without fan under sustained load)
- Ethernet connection (wifi possible but not recommended for API reliability)

**Network Requirements:**
- Client must have router with DHCP (Pi gets IP automatically)
- Port 80 open internally (for dashboard HTTP access)
- Outbound HTTPS allowed (for Anthropic, Google APIs)
- Optional: static IP reservation (prevents `marketing-box.local` from breaking)

### Security

**Isolation:**
- Pi runs only OpenClaw + dashboard (no SSH exposed externally by default)
- API keys stored encrypted (client enters via dashboard, saved to keyring)
- No inbound ports open (except port 80 for local dashboard)
- Tailscale VPN optional (client-activated, generates unique auth key)

**Updates:**
- Forge checks for system updates weekly (overnight)
- Archer notifies client via Telegram: "Update available: [changelog]. Reply YES to install."
- Updates auto-apply after client approval (or auto-install if no response in 7 days)

**Backups:**
- Weekly auto-backup to client's Google Drive (optional, client connects OAuth)
- Backup includes: agent MEMORY.md files, client settings, API keys (encrypted)
- Restore via dashboard: Settings → Backups → Restore from [date]

### Monitoring

**Sentinel Health Checks (Nightly 2am):**
- All agents responding? (ping each agent sessionKey)
- API keys valid? (test Anthropic call)
- Disk space available? (alert if <10GB free)
- Internet connection stable? (ping anthropic.com)
- Dashboard accessible? (HTTP 200 on localhost:3000)

**Alerts (via Telegram):**
- ⚠️ Agent crashed (auto-restart attempted, notify client if restart fails)
- ⚠️ API key invalid (client needs to update in dashboard)
- ⚠️ Disk space low (recommend clearing old logs)
- ⚠️ No internet (check ethernet cable)

---

## FAQ (For Clients)

### Setup & Installation

**Q: Do I need technical skills to set this up?**  
A: No. Scan the QR code on the box, paste your Anthropic API key, enter your business info. Setup takes 10-15 minutes.

**Q: What if I don't have an Anthropic API key?**  
A: We'll send you a link to create one. It takes 2 minutes and you get $5 free credit to test.

**Q: Can I use this on WiFi instead of ethernet?**  
A: Yes, but ethernet is more reliable. WiFi works fine for most clients.

**Q: What if I move the box to a different location?**  
A: It'll reconnect automatically. Just plug in ethernet + power at the new location.

### Costs & Billing

**Q: What are my monthly costs?**  
A: Just your Anthropic API usage ($50-200/mo depending on how much content you generate) + optional support plan ($100-200/mo). No hidden fees.

**Q: Why do I need my own API key? Can't you just include it?**  
A: We want you to see transparent costs. If we bundled API usage, we'd have to charge you $500-1000/mo like other services. With your own key, you pay Anthropic directly (usually $50-200/mo) and there's no markup.

**Q: What if I stop paying for the support plan?**  
A: Your box keeps working. You just won't get priority troubleshooting or config changes. All core features (GBP posts, rank tracking, reviews) keep running.

### Features & Capabilities

**Q: What does the box actually do?**  
A: It publishes Google Business Profile posts weekly, monitors your rankings, responds to reviews (drafts for your approval), tracks citations, and generates blog content. All autonomous, 24/7.

**Q: Can I customize what it posts?**  
A: Yes. Edit the content queue in the dashboard, or message the Herald bot on Telegram: "Post about our spring special tomorrow."

**Q: Will it respond to reviews automatically?**  
A: It drafts responses and sends them to you on Telegram for approval. You reply YES to publish, or edit the draft first.

**Q: How do I know it's working?**  
A: Open the dashboard (`http://marketing-box.local`) anytime to see recent activity. You'll also get weekly reports on Telegram.

### Support & Troubleshooting

**Q: What if the box stops working?**  
A: Check if it's powered on (OLED display lit). If it's on but not responding, unplug power for 10 seconds, plug back in. If still not working, message us on Telegram.

**Q: Can I access the dashboard from my phone?**  
A: Yes, if you enable Tailscale VPN in Settings → Remote Access. Or use the Telegram bots for mobile access.

**Q: What happens if my internet goes down?**  
A: The box pauses work until internet returns, then resumes automatically. No data is lost.

**Q: Can I sell or transfer the box to someone else?**  
A: Yes. Factory reset it in Settings → Advanced → Factory Reset, then ship it to the new owner. They'll set it up with their own API key.

---

## Open Questions / Future Enhancements

### V1.0 Scope (Ship First)
- [x] Dashboard (Home, Rankings, Content, Citations, Settings)
- [x] Setup wizard (5 screens, QR code entry)
- [x] Telegram bots (Herald, Lookout, Archer)
- [x] Sentinel health checks (nightly 2am)
- [x] Basic troubleshooting docs

### V1.1 (Post-Launch Refinements)
- [ ] Tailscale VPN one-click setup (currently manual, should be automated)
- [ ] Google Drive backups (auto-backup MEMORY.md + settings weekly)
- [ ] Email alerts (alternative to Telegram for clients who don't use it)
- [ ] Multi-location support (1 box managing 3-5 GBP listings)

### V2.0 (Future Vision)
- [ ] White-label dashboard (agency custom branding, logo, colors)
- [ ] Mobile app (iOS/Android native, replace Telegram bots)
- [ ] Voice commands (Alexa/Google Home: "Alexa, ask my marketing box for this week's rankings")
- [ ] Client portal (multi-client management for agencies, 1 dashboard controls 10+ boxes)
- [ ] Marketplace (pre-built agent workflows: "Dental Practice Pack", "Restaurant Pack")

---

## Conclusion

**Product Viability:** ✅ Strong  
**Market Demand:** ✅ Validated (local SEO pain points well-documented)  
**Technical Feasibility:** ✅ High (OpenClaw + Pi 5 proven, dashboard is standard Next.js)  
**Revenue Potential:** ✅ $88K Year 1, $374K Year 2 (conservative projections)

**Next Steps (When Ready — Post-Perfection):**
1. Order 5 Pironman 5 kits ($900)
2. Build dashboard v1.0 (2-3 weeks)
3. Deploy 1 internal test unit (test for 7 days)
4. Recruit 3 beta clients (50% off for feedback)
5. Refine based on beta feedback (1-2 weeks)
6. Launch landing page + product demo video
7. Sell first 10 boxes

**Estimated Time to First Sale:** 6-8 weeks from start of development  
**Estimated ROI:** 2-3x margin (64% profit after COGS)

---

**Status:** Brainstorm captured for post-perfection phase (after Week 4 system stability)  
**Priority:** Medium-High (strong revenue potential, aligns with existing agent system)  
**Blocker:** Need stable agent system first (no phantom routing, reliable execution)
