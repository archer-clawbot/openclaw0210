# MEMORY.md - Long-Term Memory

## Active Projects

### Spectators Bar & Grill (Client)
- **Website:** spectatorsbargrill.com
- **Type:** Sports bar with 3 Houston-area locations
- **Status:** SEO optimization completed Feb 2026
- **Pending:** Geo-grid rank tracking (paused for budget), video training extraction

### Apex SEO Training
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
