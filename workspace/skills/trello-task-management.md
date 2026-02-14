# Trello Task Management

> **STATUS: NOT YET DEPLOYED.** The Trello skill server (`http://127.0.0.1:8001`) is not running. The `create-website-template.js` script does not exist yet. Do NOT attempt to call Trello endpoints or reference these scripts until the skill is deployed. This document is the specification for future implementation.

You manage task boards via the **Trello skill** (FastAPI server on `http://127.0.0.1:8001`). Use the skill's HTTP endpoints to create, move, and update cards as agents complete work.

## Board Structure

**Agency Operations Board** — Cody's personal dashboard:
| List | Purpose |
|------|---------|
| MY ACTION ITEMS | Tasks only Cody can do (manual directory claims, client calls, content review) |
| IN PROGRESS (AGENTS) | Cards currently being executed by agents |
| COMPLETED THIS WEEK | Auto-moved here when agents finish tasks. Cleared every Monday. |
| UPCOMING | Scheduled future tasks |
| DONE (ARCHIVE) | Completed and acknowledged. Archived monthly. |

**Client Boards** — One board per client, named after the client:
| List | Purpose |
|------|---------|
| BACKLOG | All planned tasks (populated from 90-day playbook at onboarding) |
| THIS MONTH | Tasks scheduled for current month |
| IN PROGRESS | Currently being worked on |
| NEEDS MY REVIEW | Agent completed work needing Cody's QC |
| COMPLETED | Done and verified — feeds into weekly client digest |
| BLOCKED | Waiting on client access, approval, or tool issue |

## Card Format

```
Title: [Agent]: [Task description]
  Examples: "Silas: Optimize homepage title tags"
            "YOU: Claim Healthgrades listing"

Labels:
  Red     = Cody's action required
  Green   = Agent task (automated)
  Yellow  = Needs review/QC
  Blue    = Blocked/waiting
  Purple  = Recurring task

Description:
  Client: [name]
  Agent: [agent name]
  Phase: [1-Foundation / 2-Authority / 3-Acceleration / Ongoing]
  Priority: [Critical / High / Medium / Low]
  Details: [specifics]
```

## Trello Workflows

**When a new client onboards:**
1. Create new board: "[Client Name]"
2. Create standard lists (Backlog, This Month, In Progress, Needs My Review, Completed, Blocked)
3. Create standard labels (Red=Your Action, Green=Agent Task, Yellow=Needs Review, Blue=Blocked, Purple=Recurring)
4. Populate Backlog with all tasks from the 90-day playbook
5. Move Week 1 tasks to "This Month"
6. Create cards on Agency Ops board for Cody's manual tasks

**Automated client setup + dispatch:**
When the operator says "add [client] and run" or "onboard [client]":
1. Confirm with operator (escalation: new client onboarding kickoff)
2. Spawn setup via sessions_spawn:
   ```
   sessions_spawn:
     agentId: "specs"
     task: "Run this command and report the output:\n\nnode C:\\Users\\spart\\.openclaw\\cron\\setup-client.js --name \"[Client Name]\" --domain [domain.com]"
     label: "client-setup"
   ```
3. The setup script creates the Trello board, populates the 90-day playbook, and registers the client.
4. Start the dispatcher if not already running (see below).
5. Monitor progress: `node C:\\Users\\spart\\.openclaw\\cron\\dispatcher.js --status [client-slug]`

**Starting the dispatcher:**
When the operator says "start executing," "run tasks," "start the dispatcher," or "execute for [client]":
1. Spawn the dispatcher via sessions_spawn:
   ```
   sessions_spawn:
     agentId: "specs"
     task: "Run this command (it will run continuously — let it run):\n\nnode C:\\Users\\spart\\.openclaw\\cron\\dispatcher.js --watch"
     label: "dispatcher"
   ```
   For a single client only:
   ```
   sessions_spawn:
     agentId: "specs"
     task: "Run this command (it will run continuously — let it run):\n\nnode C:\\Users\\spart\\.openclaw\\cron\\dispatcher.js --watch --client [client-slug]"
     label: "dispatcher"
   ```
2. The dispatcher polls every 60 seconds: backfills THIS MONTH → IN PROGRESS, dispatches cards to agents via gateway, moves completed cards to NEEDS MY REVIEW, moves failed cards to BLOCKED after 3 attempts.
3. It handles ALL registered clients automatically unless --client is specified.

**Checking dispatch status:**
When the operator asks "what's the status?" or "how's [client] going?":
```
sessions_spawn:
  agentId: "specs"
  task: "Run this command and report the output:\n\nnode C:\\Users\\spart\\.openclaw\\cron\\dispatcher.js --status"
  label: "dispatch-status"
```

**When an agent starts a task:**
1. Move card from "This Month" → "In Progress" on client board
2. Add comment: "Started by [Agent] at [timestamp]"
3. Mirror card to Agency Ops "IN PROGRESS (AGENTS)" list

**When an agent completes a task:**
1. Move card to "Completed" (or "Needs My Review" if QC required)
2. Add comment: "Completed by [Agent] at [timestamp]. Results: [summary]"
3. Move mirrored card on Agency Ops to "COMPLETED THIS WEEK"
4. If QC required: add Yellow label, move to "NEEDS MY REVIEW"

**Weekly maintenance (Monday morning):**
1. Archive all cards in "COMPLETED THIS WEEK" on Agency Ops
2. Pull next week's tasks from "This Month" if not already in progress
3. Send Cody a Telegram summary: "This week: X tasks completed, Y in progress, Z need your action"

## Trello Skill Endpoints

The skill runs on `http://127.0.0.1:8001`. Key endpoints:

| Method | Path | Use |
|--------|------|-----|
| GET | `/boards` | List all boards |
| POST | `/boards` | Create board `{"name": "..."}` |
| POST | `/boards/{id}/lists` | Create list `{"name": "..."}` |
| POST | `/boards/{id}/labels` | Create label `{"name": "...", "color": "red"}` |
| POST | `/cards` | Create card `{"list_id": "...", "name": "...", "description": "..."}` |
| PUT | `/cards/{id}/move` | Move card `{"list_id": "target-list-id"}` |
| POST | `/cards/{id}/comments` | Add comment `{"text": "..."}` |
| PUT | `/cards/{id}/archive` | Archive card |
| GET | `/boards/{id}/cards` | Get all cards on board |
| GET | `/lists/{id}/cards` | Get cards on list |
| GET | `/boards/{id}/labels` | Get labels on board |

## Weekly Client Digest (Saturday 8am Cron)

Every Saturday morning, for each active client:
1. GET completed cards this week from client board "Completed" list
2. Translate task titles to client-friendly language (business benefits, not technical jargon)
3. Pull quick weekly stats from Lookout (GBP views, organic sessions, calls)
4. GET "This Month" cards to generate "Coming Next Week" preview
5. Compile formatted weekly digest
6. Deliver via GHL (or Telegram to Cody for review)

**Translation examples:**
| Internal Card | Client Summary |
|---------------|---------------|
| "Silas: Optimize homepage title tag" | "Optimized your homepage for better Google visibility" |
| "Citadel: Build 12 citations" | "Listed your business on 12 additional online directories" |
| "Herald: Publish 3 GBP posts" | "Published 3 updates to your Google Business Profile" |
| "Specs: Fix Core Web Vitals" | "Improved your website speed and mobile experience" |
