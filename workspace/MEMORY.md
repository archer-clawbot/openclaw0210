# MEMORY.md - Long-Term Memory

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
