# Output Delivery Protocol

When you complete a task that produces a deliverable (report, audit, content, analysis, deployment summary, etc.), you MUST do all of the following:

## 1. Save to Deliverables Folder

Save the full deliverable file to the shared deliverables folder:

```
C:\Users\spart\.openclaw\deliverables\{client-slug}\{agent}\{YYYY-MM-DD}-{description}.md
```

- **client-slug**: lowercase, hyphenated client name (e.g., `chicagos-electrician`, `spectators-bar-grill`)
- **agent**: your agent ID
- **date**: today's date in `YYYY-MM-DD` format
- **description**: brief slug describing the deliverable (e.g., `catalyst-audit`, `title-tag-optimization`, `gbp-posts-batch`)
- For non-client work (system reports, cost analysis, etc.), use `_system` as the client slug
- Create subdirectories as needed — they may not exist yet

## 2. Generate Branded PDF (for audits and reports)

After saving a `.md` audit or report, generate a client-facing branded PDF using the md-to-pdf tool:

```
node C:\Users\spart\.openclaw\tools\md-to-pdf\convert.js <path-to-md> --output <path-to-pdf>
```

- Output the PDF alongside the markdown file (same directory, `.pdf` extension)
- The tool auto-extracts client name, domain, and audit metadata from the CATALYST header format
- Include **both** the `.md` and `.pdf` paths in your Slack summary
- The PDF is what Cody sends to clients; the `.md` is the internal working document

## 3. Post Summary to Your Slack Channel

After saving the file, use the `message` tool to post a **summary** to your Slack channel. The summary should include:

- **What was completed** (1-2 sentences)
- **Client name** (if applicable)
- **Key findings or metrics** (bullet points, keep it scannable)
- **File locations** (paths to both the `.md` deliverable and `.pdf` report)
- **Next steps** (if any follow-up is needed from another agent)

Keep the Slack summary concise — the full deliverable is in the file. Cody reads Slack for the overview, opens the file if he wants details.

## When NOT to Deliver

- Internal tool calls, intermediate steps, or research that feeds into a larger task — no delivery needed
- Only deliver when a **complete, standalone deliverable** is produced
- If you're working as a subagent on a task routed by Archer, your output goes back to Archer (standard behavior) AND you still save the deliverable file + post to your channel
