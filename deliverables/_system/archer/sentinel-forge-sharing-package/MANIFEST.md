# Sentinel + Forge Sharing Package — File Manifest

This package contains everything your friend needs to implement Sentinel and Forge agents into their OpenClaw system.

---

## 📁 Package Contents

```
sentinel-forge-sharing-package/
├── README.md                           ⭐ Start here — complete installation guide
├── MANIFEST.md                         📋 This file — package contents
├── openclaw-config-snippet.json        ⚙️ Config to add to openclaw.json
├── cron-jobs-config.md                 ⏰ Cron job setup instructions
├── example-sentinel-report.md          📊 Sample health report output
│
├── sentinel/                           🛡️ Sentinel workspace files
│   ├── AGENTS.md                       (Brain — full agent prompt)
│   ├── SOUL.md                         (Personality/tone)
│   ├── IDENTITY.md                     (Name, emoji, avatar)
│   ├── TOOLS.md                        (Tool-specific notes)
│   ├── USER.md                         (User context)
│   └── HEARTBEAT.md                    (Cron trigger config)
│
└── forge/                              🔨 Forge workspace files
    ├── AGENTS.md                       (Brain — full agent prompt)
    ├── SOUL.md                         (Personality/tone)
    ├── IDENTITY.md                     (Name, emoji, avatar)
    ├── TOOLS.md                        (Tool-specific notes)
    ├── USER.md                         (User context)
    ├── HEARTBEAT.md                    (Cron trigger config)
    └── FORGE-LOG.md                    (Forge's memory template)
```

---

## ⚙️ What Each File Does

### Core Setup Files
| File | Purpose | Required? |
|------|---------|-----------|
| README.md | Installation walkthrough | ✅ Read first |
| openclaw-config-snippet.json | Agent config for openclaw.json | ✅ Must merge |
| cron-jobs-config.md | Cron job setup | ✅ Must configure |

### Workspace Files (Sentinel)
| File | Purpose | Customization Needed? |
|------|---------|----------------------|
| AGENTS.md | Full agent brain/prompt | ✅ Yes (agent count, workspace paths) |
| SOUL.md | Personality/tone | ⚠️ Optional |
| IDENTITY.md | Name, emoji | ⚠️ Optional |
| TOOLS.md | Tool notes | ⚠️ Optional |
| USER.md | User context | ✅ Yes (your name/timezone) |
| HEARTBEAT.md | Cron config | ⚠️ Optional (adjust schedule if needed) |

### Workspace Files (Forge)
| File | Purpose | Customization Needed? |
|------|---------|----------------------|
| AGENTS.md | Full agent brain/prompt | ✅ Yes (agent count, workspace paths, auto-apply rules) |
| SOUL.md | Personality/tone | ⚠️ Optional |
| IDENTITY.md | Name, emoji | ⚠️ Optional |
| TOOLS.md | Tool notes | ⚠️ Optional |
| USER.md | User context | ✅ Yes (your name/timezone) |
| HEARTBEAT.md | Cron config | ⚠️ Optional |
| FORGE-LOG.md | Forge's memory | ⚠️ Optional (starts empty) |

### Example Output
| File | Purpose |
|------|---------|
| example-sentinel-report.md | Sample health report (so your friend knows what to expect) |

---

## 🔒 Security Reminder

**This package does NOT include:**
- ❌ Telegram bot tokens (your friend must create their own via @BotFather)
- ❌ API keys (Anthropic, etc.)
- ❌ Your actual session logs or client data

**All files in this package are safe to share publicly.**

---

## 🚀 Quick Start (30 seconds)

1. **Read:** `README.md` (5 min)
2. **Copy:** `sentinel/` and `forge/` folders to `~/.openclaw/`
3. **Edit:** Update agent counts, workspace paths in both `AGENTS.md` files
4. **Merge:** `openclaw-config-snippet.json` into your `openclaw.json`
5. **Cron:** Set up 2 cron jobs (see `cron-jobs-config.md`)
6. **Test:** `openclaw spawn sentinel "Run health check"`
7. **Done:** Wait for tomorrow's 2am reports

---

## 📊 Expected Deliverables

After setup, your friend will receive:

**Every night at 2:00 AM:**
- Sentinel health report saved to `deliverables/_system/sentinel/YYYY-MM-DD-nightly-health-report.md`

**Every night at 2:05 AM:**
- Forge morning brief saved to `deliverables/_system/forge/YYYY-MM-DD-morning-brief.md`

**Both can also deliver via:**
- Telegram (if bot tokens configured)
- Slack (if channels configured)
- Email (if SMTP configured)

---

## 🛠️ Customization Checklist

Before going live, your friend MUST customize:

**Sentinel:**
- [ ] Agent count (line 15 in AGENTS.md)
- [ ] Agent workspace paths table (lines 45-60)
- [ ] Your name/timezone (USER.md)

**Forge:**
- [ ] Agent count
- [ ] Agent workspace paths
- [ ] Auto-apply rules (if needed)
- [ ] Your name/timezone (USER.md)

**Both:**
- [ ] Telegram bot tokens (if using Telegram)
- [ ] Cron schedule (if different timezone)

---

## 🎯 Success Criteria

After installation, your friend should see:

✅ Sentinel runs nightly without errors  
✅ Health report appears in deliverables folder  
✅ Forge runs nightly after Sentinel  
✅ Forge morning brief shows analysis + proposed fixes  
✅ No false positive alerts (tune thresholds if needed)

---

## 📞 Support

**Questions about this package?**  
Contact: Cody (@CryptosysX on Telegram)

**Questions about OpenClaw?**  
Docs: https://docs.openclaw.ai  
Discord: https://discord.com/invite/clawd

---

**Package Version:** 1.0  
**Generated:** February 15, 2026  
**Source System:** LocalCatalyst (18-agent local SEO fleet)
