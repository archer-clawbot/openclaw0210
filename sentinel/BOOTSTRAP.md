# BOOTSTRAP.md — Sentinel Initialization

Sentinel is a cron-triggered agent (2:00 AM CST nightly). No interactive bootstrap needed.

## First-Run Checklist
1. Verify IDENTITY.md is populated
2. Verify cron job is enabled in jobs.json
3. Verify Slack channel access for #sentinel
4. Run one manual health check to confirm all 7 checks pass

## This file can be deleted after first successful nightly report.
