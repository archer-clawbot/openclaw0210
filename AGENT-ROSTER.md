# AGENT-ROSTER.md — Canonical Agent Registry

> **This file is the single source of truth for all active OpenClaw agents.**
>
> All orchestrator agents (especially Archer) must reference this file before making any claims about which agents exist, their capabilities, or their operational status. Do not hardcode agent counts or names — read them from here.

---

## Fleet Summary

- **Total agents:** 19 (1 orchestrator + 18 specialist agents)
- **Cron-triggered:** 2 (Sentinel, Forge)
- **On-demand (spawned by Archer):** 17
- **Last updated:** 2026-02-15

---

## Agent Roster

| # | Emoji | Name | Agent ID | Role | Trigger | Status |
|---|-------|------|----------|------|---------|--------|
| 1 | 🏹 | Archer | `main` | Master orchestrator — single point of contact for the operator. Routes tasks to agents, coordinates multi-agent workflows. | On-demand (Telegram) | ACTIVE |
| 2 | ⚡ | Blitz | `blitz` | Paid advertising campaign manager — designs, launches, and optimizes campaigns across Google Ads and Meta Ads. | On-demand | ACTIVE |
| 3 | 🏗️ | Builder | `builder` | WordPress site construction — builds new sites from scratch on Cloudways, assembling Canvas designs and Scribe content. | On-demand | ACTIVE |
| 4 | 🎨 | Canvas | `canvas` | Creative and visual design — creates design systems, wireframes, brand guidelines, and visual specs for Builder. | On-demand | ACTIVE |
| 5 | 🏰 | Citadel | `citadel` | Citation building — manages NAP consistency across directories, submits citations, audits listings. | On-demand | ACTIVE |
| 6 | 🔥 | Forge | `forge` | Overnight improvement engine — runs nightly 2:05-5:30 AM CST, diagnoses problems, patches agent prompts and configs. | Cron (2:05 AM CST daily) | ACTIVE |
| 7 | 👻 | Ghost | `ghost` | Off-site SEO and link building — manages PBN infrastructure, deploys links, maintains operational security. | On-demand | ACTIVE |
| 8 | 📯 | Herald | `herald` | Google Business Profile operations — publishes GBP posts, manages listings, handles review classification and response publishing. | On-demand | ACTIVE |
| 9 | 📊 | Ledger | `ledger` | Financial tracking and billing — tracks every cost center (API, hosting, tools) and produces profitability reports. | On-demand | ACTIVE |
| 10 | 👁️ | Lookout | `lookout` | Rank tracking and monitoring — tracks rankings, monitors site health, detects anomalies, produces performance reports. | On-demand | ACTIVE |
| 11 | 🧠 | Mozi | `mozi` | Business strategy and positioning — applies Hormozi frameworks to pricing, offers, sales, retention, and growth. | On-demand | ACTIVE |
| 12 | ✂️ | Razor | `razor` | CRO specialist — analyzes conversion bottlenecks, architects landing pages, designs A/B tests, optimizes CTAs. | On-demand | ACTIVE |
| 13 | 🔭 | Scout | `scout` | Research and reconnaissance — gathers data, analyzes competitors, monitors algorithm updates, provides intelligence reports. | On-demand | ACTIVE |
| 14 | ✍️ | Scribe | `scribe` | Content writing — writes all content: service pages, blog posts, GBP posts, meta descriptions, review responses, email copy. | On-demand | ACTIVE |
| 15 | 🛡️ | Sentinel | `sentinel` | Nightly system health monitor — audits the entire 18-agent system at 2 AM CST and delivers a structured health report. | Cron (2:00 AM CST daily) | ACTIVE |
| 16 | 🎯 | Silas | `silas` | SEO engine (CATALYST methodology) — senior-level local SEO strategist covering GBP, website architecture, citations, links, geo-grid tracking, LLM visibility. | On-demand | ACTIVE |
| 17 | 📐 | Specs | `specs` | Schema and structured data specialist — handles RankMath, schema markup, GA4, Search Console, Core Web Vitals, technical auditing. | On-demand | ACTIVE |
| 18 | 🔧 | Wrench | `wrench` | Technical SEO implementation — modifies, fixes, updates, and optimizes existing live WordPress sites (post-launch). | On-demand | ACTIVE |

---

## Directory Conventions

OpenClaw agents use **three** directory layers, each serving a different purpose:

### 1. Brain (Workspace) — `~/.openclaw/{agent-id}/`

Each agent's core prompt files live in a root-level folder named by agent ID:

```
~/.openclaw/blitz/       → AGENTS.md, IDENTITY.md, SOUL.md, TOOLS.md, USER.md, HEARTBEAT.md, BOOTSTRAP.md
~/.openclaw/sentinel/    → same structure
~/.openclaw/main/        → Archer's brain (alternative location)
```

**Exception:** Archer (the orchestrator) has a second workspace at `~/.openclaw/workspace/` which is the **active** workspace used by the gateway. The `main/` folder also exists but contains an older copy (references 17 agents instead of 18).

### 2. Runtime — `~/.openclaw/agents/{agent-id}/`

Session state, model configs, and auth profiles:

```
~/.openclaw/agents/blitz/agent/models.json
~/.openclaw/agents/blitz/agent/auth-profiles.json
~/.openclaw/agents/blitz/sessions/sessions.json
```

Also contains shared entries: `agents/agent/` (global defaults) and `agents/sessions/` (cross-agent session index).

### 3. Supplementary — `~/.openclaw/workspace/agents/{agent-id}/`

Optional per-agent files that extend the brain: `SKILL.md`, `LOGGING.md`, `MEMORY.md`, `HEARTBEAT.md`, and specialized configs like `campaigns.json` (Blitz) or `clients.json` (Razor).

Only 12 of 18 agents have entries here. The 6 without supplementary folders are: **Builder, Forge, Ghost, Main, Mozi, Scout**.

### Why both exist

The brain folders were originally intended to all live under `workspace/agents/`, but as the system grew, each agent's primary prompt files migrated to root-level folders for simpler access. The `workspace/agents/` path now holds supplementary/operational files rather than core brain prompts. The runtime `agents/` directory is managed by the OpenClaw gateway and should not be edited manually.

---

## Cron Schedule

| Agent | Cron Expression | Time (CST) | Job Name | Status |
|-------|----------------|------------|----------|--------|
| Sentinel | `0 2 * * *` | 2:00 AM daily | Sentinel Nightly Health Check | Enabled |
| Forge | `5 2 * * *` | 2:05 AM daily | Night Forge — Overnight Improvement Cycle | Enabled |
| Archer | `0 9 * * 0` | 9:00 AM Sundays | Weekly Agent Standup | Enabled |
| Archer | `0 9 * * 0` | 9:00 AM Sundays | Razor Weekly CRO Trigger | Enabled |
| Archer | `0 9 * * 1` | 9:00 AM Mondays | Blitz Weekly Campaign Optimization | Enabled |
| Archer | `0 8 * * *` | 8:00 AM daily | AI Automation Daily Brief | **Disabled** |
| Archer | `0 9 * * 0` | 9:00 AM Sundays | Archer Weekly Rollup | **Disabled** |

---

## Anomalies and Notes

1. **~~Archer dual-workspace drift~~** — FIXED 2026-02-15. `main/AGENTS.md` synced to 18 agents with Forge added to roster, routing table, and agent ID reference.

2. **~~Citadel IDENTITY.md role mismatch~~** — FIXED 2026-02-15. Updated from "Security & Compliance" to "Citation Building & NAP Management" to match operational role in AGENTS.md.

3. **~~Herald missing Role field~~** — FIXED 2026-02-15. Added `Role: Google Business Profile Operations` to IDENTITY.md.

4. **~~Sentinel missing Role field~~** — FIXED 2026-02-15. Added `Role: Nightly System Health Monitor` to IDENTITY.md.

5. **~~Sentinel cron delivering to Slack with no token~~** — FIXED 2026-02-15. Switched from Slack `#sentinel` to Telegram (chat ID 7302669335), matching Forge's working delivery method.

6. **Supplementary folders (`workspace/agents/{id}/`) are orphaned infrastructure.** 12 agents have entries there containing SKILL.md, LOGGING.md, and MEMORY.md — but these files are unreachable because each agent's workspace is overridden to its root-level folder (e.g., `~/.openclaw/wrench/` not `~/.openclaw/workspace/agents/wrench/`). The 6 agents without entries (Builder, Forge, Ghost, Main, Mozi, Scout) are not missing anything. If supplementary files are needed, they should be placed in each agent's own workspace, not in the shared workspace path. No action required.

---

## Maintenance

- **When adding a new agent:** Add a row to the roster table, create brain folder at root, register in `openclaw.json`, and update the fleet count.
- **When removing an agent:** Remove the row, archive the brain folder, and update `openclaw.json`.
- **When relocating an agent:** Update the directory conventions section and any hardcoded paths.
- **Periodic review:** Sentinel's nightly health check should validate that this roster matches the actual file system. Any drift should be flagged in its report.
