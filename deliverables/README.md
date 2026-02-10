# Deliverables

Shared output folder for all agent deliverables. Organized by client, then agent.

## Folder Structure

```
deliverables/
  {client-slug}/
    {agent}/
      {YYYY-MM-DD}-{description}.md
      {YYYY-MM-DD}-{description}.json
```

## Examples

```
deliverables/
  chicagos-electrician/
    silas/
      2026-02-09-apex-audit.md
      2026-02-15-quarterly-content-audit.md
    specs/
      2026-02-08-title-tag-optimization.md
      2026-02-08-schema-deployment.md
    scribe/
      2026-02-10-gbp-posts-batch.md
  spectators-bar-grill/
    silas/
      2026-02-12-onboarding-scorecard.md
  _system/
    sentinel/
      2026-02-09-health-report.md
      2026-02-10-health-report.md
    ledger/
      2026-02-09-monthly-spend-report.md
```

## Conventions

- **client-slug**: lowercase, hyphenated (e.g., `chicagos-electrician`, `spectators-bar-grill`)
- **agent**: agent ID (e.g., `silas`, `specs`, `scribe`)
- **date**: `YYYY-MM-DD` of completion
- **description**: brief slug of what the deliverable is
- **_system**: for non-client deliverables (Sentinel health reports, Ledger cost reports, etc.)
- Agents create client/agent subdirectories as needed
- Full deliverable saved here; summary posted to the agent's Slack channel
