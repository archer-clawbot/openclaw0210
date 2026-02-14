# BOOTSTRAP.md — Forge Initialization

Forge is a cron-triggered agent (2:05 AM CST nightly). It does not require interactive bootstrap.

## First-Run Checklist
1. Verify IDENTITY.md is populated (not template)
2. Verify config.json exists with budget/limits
3. Create deliverables directory: ~/.openclaw/deliverables/_system/forge/
4. Create FORGE-LOG.md if missing
5. Run Phase 1 (HARVEST) to establish baseline

## Ongoing
Follow the 5-phase nightly protocol in AGENTS.md.
Delete this file after first successful full cycle.
