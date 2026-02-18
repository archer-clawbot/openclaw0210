# MEMORY.md - Long-Term Memory

## Future Roadmap

### Orgo Integration (Phase 2 Infrastructure)
- **What:** Ephemeral cloud VMs (sub-500ms boot) for AI computer use — "King Claw + Worker" model
- **Why:** Isolate risky web-touching tasks from the main host; blast radius containment
- **King:** Archer stays on local hardware, holds credentials/strategy (Opus model)
- **Workers:** Disposable Orgo VMs per task — burn after completion (Sonnet or Kimi 2.5 for cost efficiency)
- **Priority agents:** Citadel (directory submissions), Herald (GBP automation), Scout (scraping/SERP), Ghost (PBN — isolated IPs), Blitz (ad platforms — bot detection)
- **Reference:** https://youtu.be/4KxXUVtorWk, https://docs.orgo.ai
- **Status:** Future — no account yet, noted Feb 17 2026

**Implementation (when ready — ~1 hour to set up):**
1. Sign up at orgo.ai (free tier available)
2. Copy full LLM docs: `docs.orgo.ai` → `llmsfull.txt`
3. Paste into OpenClaw + say: "Make a skill to connect to Orgo API to spin up VMs for sub-agents"
4. OpenClaw writes the skill file — restart gateway — done
5. One Orgo API key handles all VMs in a workspace
6. Workers export files back to main agent via Orgo's native export API
7. Sub-agent uniqueness is critical — prompt must specify each agent gets a DIFFERENT task
8. Nick Vasilescu (creator) has unofficial Orgo MCP on his GitHub (@NickVas...)
9. No A2A protocol needed — workers report back to Archer via native sessions_spawn

---

## Active Projects

### Spectators Bar & Grill (Client)
- **Website:** spectatorsbargrill.com
- **Type:** Sports bar with 3 Houston-area locations
- **Status:** SEO optimization completed Feb 2026
- **Pending:** Geo-grid rank tracking (paused for budget), video training extraction

### Catalyst SEO Training
- 25 screen recordings in Google Drive with SEO strategies
- Goal: Extract actionable tactics from videos
- Blocked on transcription approach (large files)

---

## Cody's Work Context

- Works at a local SEO agency (main job)
- Takes on side clients (Spectators is one)
- Interested in efficiency tools and automation
- Budget-conscious on tooling costs
- Has 3D printing hobby (not monetized)

---

## Technical Preferences

- Windows environment (PowerShell)
- Prefers API/automation over manual web work
- Communicates via Telegram

---

## Lessons Learned

### WordPress REST API
- Application Passwords work ONLY for API, not web login
- Remove spaces from app passwords when using programmatically
- AIOSEO has its own API endpoint: `/wp-json/aioseo/v1/post/{id}`
- Code Snippets plugin can be managed via API for deploying PHP

### WordPress Site Build Standards
- **SEO Plugin:** RankMath (best for schema, technical SEO, and agency credibility)
- **Comments:** ALWAYS disable globally (Settings > Discussion > uncheck "Allow people to submit comments") — avoid spam
- **Placeholders:** Use generic contact info, phone, email, addresses, GBP embeds, and fake staff bios until client provides real data

### Google Drive
- JS-rendered pages don't work with simple fetch
- Browser automation needed for extracting file info
- Large video files need cloud transcription (can't download locally)

### Rate Limit Retry Protocol (CRITICAL — Updated Feb 16 2026)
**Neither `exec sleep` nor cron systemEvents reliably trigger autonomous retries.**
- `exec sleep`: completes silently, no action triggered (Feb 16 21:04 incident — 30 min lost)
- cron systemEvent: fires correctly but idle session doesn't process it autonomously (Feb 16 21:53 incident — 30 min lost again)
- **Root cause:** systemEvents appear in conversation log but don't trigger a response unless session is actively processing a user message
- **Real fix:** Notify user + manually retry in same response. Don't rely on deferred automation for retries.
- **Protocol:** Rate limit hit → tell user "hit rate limit, retrying in 60s" → exec sleep 60 in foreground (blocking) → spawn immediately after → confirm with sessionKey
- **Note:** Cron is still useful for scheduled tasks (weekly standups, heartbeats) but NOT for reactive retries

### Routing Execution Protocol (CRITICAL)
**MANDATORY POST-SPAWN VERIFICATION:**
1. Call `sessions_spawn` with full task details
2. Immediately capture the returned `childSessionKey` from the response
3. Confirm to the user with the sessionKey: "Wrench is working on this [session: xyz]"
4. ONLY THEN update notes/status to "in progress"
5. NEVER narrate intent ("I'm sending this to...") without executing the tool call in the same response
6. Phantom routing bug (Feb 14, 2026): Said "cart/checkout styling in progress" but never spawned the task — led to operator discovering the gap

**Proof required. Intent ≠ Execution.**

### Agent Infrastructure Build (Feb 14, 2026)
**Inspired by Marcelo's 25-agent system + Cody Sanchez government funding playbook:**
- Built complete workspace documentation for 8 core agents
- Implemented self-documentation system (SKILL.md, LOGGING.md, MEMORY.md)
- Each agent now builds institutional knowledge over time (client voice, tech quirks, patterns)
- Created weekly standup automation (Silas, Lookout, Ledger report trends every Sunday)
- Documented multi-agent coordination workflows (INTEGRATION.md)
- Established deliverables naming conventions and handoff protocols
- Created onboarding checklist for future agent deployment (ONBOARDING.md)
- Mapped Telegram bot routing strategy (Archer-centric, optional direct bots)
- Designed cron job framework for proactive monitoring (Lookout, Ledger, Sentinel, Forge)

**Key Innovation:**
- Agents update MEMORY.md after every task → learns client preferences, recurring issues, tech patterns
- Example: Scribe learns Spectators' voice ("game day," casual tone) → future content auto-matches without manual guidance
- Example: Wrench logs site quirks ("WP Rocket caching breaks schema") → prevents breaking things

**Result:**
- System gets smarter over time instead of repeating same mistakes
- Reduced manual handoff overhead (agents read each other's deliverables)
- Proactive monitoring (weekly standups, anomaly detection)
- Complete documentation for 10 operational agents (8 core + Razor + Blitz)

---

## Completed Work

### 2026-02-17 — System — Pitch Agent Created (Agent #19)
- **Role:** Conversion copywriter — writes copy that converts humans (ads, landing pages, emails, social)
- **Brain:** 7 marketing legends synthesized (Hormozi, Gary Vee, Brunson, Kennedy, Schwartz, Godin, Deiss)
- **Separation:** Scribe = SEO content for Google | Pitch = conversion copy for humans | Mozi = strategy
- **Model:** Sonnet 4.6
- **Status:** Brain files complete, openclaw.json updated
- **Pending:** Telegram bot token, gateway restart
- **Deliverable:** `deliverables/_system/pitch/2026-02-17-pitch-agent-created.md`

---

**Last Updated:** 2026-02-17
