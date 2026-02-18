#!/usr/bin/env node
/**
 * Memory Safety Net — Periodic extraction of key events from Archer's
 * session JSONL files into MEMORY.md as a fallback for ungraceful disconnects.
 *
 * Usage:
 *   node cron/memory-safety-net.mjs [--dry-run] [--hours 6]
 *
 * What it extracts:
 *   - Client mentions (onboarding, audits, dispatches)
 *   - Agent spawn events (sessions_spawn tool calls)
 *   - Rate limit incidents
 *   - System errors and failures
 *
 * What it does NOT do:
 *   - Replace Archer's in-conversation LOGGING.md protocol
 *   - Overwrite existing MEMORY.md entries
 *   - Parse or interpret task content
 *
 * Schedule: Run every 6 hours via Task Scheduler or cron
 */
import fs from "fs";
import path from "path";

const OPENCLAW_ROOT = String.raw`C:\Users\spart\.openclaw`;
const SESSIONS_DIR = path.join(OPENCLAW_ROOT, "agents", "main", "sessions");
const MEMORY_FILE = path.join(OPENCLAW_ROOT, "main", "MEMORY.md");
const MARKER_FILE = path.join(OPENCLAW_ROOT, "cron", ".memory-safety-net-marker");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const hoursIdx = args.indexOf("--hours");
const LOOKBACK_HOURS = hoursIdx >= 0 ? parseInt(args[hoursIdx + 1]) || 6 : 6;

function log(msg) {
  const ts = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`[${ts}] ${msg}`);
}

function getLastRunTime() {
  try {
    const marker = fs.readFileSync(MARKER_FILE, "utf-8").trim();
    return new Date(marker).getTime();
  } catch {
    // First run — look back LOOKBACK_HOURS
    return Date.now() - LOOKBACK_HOURS * 60 * 60 * 1000;
  }
}

function updateMarker() {
  if (!DRY_RUN) {
    fs.writeFileSync(MARKER_FILE, new Date().toISOString());
  }
}

function getRecentSessions(sinceMs) {
  const sessionsIndex = path.join(SESSIONS_DIR, "sessions.json");
  if (!fs.existsSync(sessionsIndex)) {
    log("No sessions.json found");
    return [];
  }

  const sessions = JSON.parse(fs.readFileSync(sessionsIndex, "utf-8"));
  // sessions.json is keyed by session key (e.g. "agent:main:main")
  // Each value has { sessionId, updatedAt (unix ms), sessionFile, ... }
  const sessionList = Array.isArray(sessions) ? sessions : Object.values(sessions);

  return sessionList
    .filter((s) => {
      // updatedAt is a Unix timestamp in milliseconds
      const ts = s.updatedAt || s.lastActivityAt || s.createdAt;
      if (!ts) return false;
      // Handle both ISO strings and Unix ms timestamps
      const tsMs = typeof ts === "number" ? ts : new Date(ts).getTime();
      return tsMs > sinceMs;
    })
    .map((s) => s.sessionId || s.id)
    .filter(Boolean);
}

function extractEventsFromSession(sessionId) {
  const filePath = path.join(SESSIONS_DIR, `${sessionId}.jsonl`);
  if (!fs.existsSync(filePath)) return [];

  const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
  const events = [];

  for (const line of lines) {
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }

    if (entry.type !== "message") continue;
    const msg = entry.message;
    if (!msg || !msg.content) continue;

    const timestamp = entry.timestamp || "";
    const role = msg.role;

    for (const block of msg.content) {
      // Extract from assistant text blocks
      if (role === "assistant" && block.type === "text" && block.text) {
        const text = block.text;

        // Detect client onboarding mentions
        const onboardMatch = text.match(
          /onboard(?:ing|ed)?\s+(?:new\s+)?client[:\s]+(.+?)(?:\.|$)/im
        );
        if (onboardMatch) {
          events.push({
            type: "client_mention",
            detail: `Client onboarding mentioned: ${onboardMatch[1].trim().slice(0, 100)}`,
            timestamp,
            sessionId,
          });
        }

        // Detect rate limit events
        if (/rate.?limit|429|too many requests/i.test(text)) {
          events.push({
            type: "rate_limit",
            detail: `Rate limit event detected in assistant response`,
            timestamp,
            sessionId,
          });
        }

        // Detect audit completions
        const auditMatch = text.match(
          /(?:audit|catalyst|apex)\s+(?:complete|finished|done|delivered).*?(\d+\.?\d*\/10)/im
        );
        if (auditMatch) {
          events.push({
            type: "audit_complete",
            detail: `Audit completed with score ${auditMatch[1]}`,
            timestamp,
            sessionId,
          });
        }
      }

      // Extract from tool calls (sessions_spawn = agent dispatch)
      if (role === "assistant" && block.type === "toolCall") {
        const toolName = block.name || block.toolName || "";
        if (toolName === "sessions_spawn" || toolName.includes("spawn")) {
          let agentId = "unknown";
          let taskSnippet = "";
          try {
            // Tool calls use "arguments" field (object), not "input"
            const args =
              block.arguments ||
              block.input ||
              (typeof block.args === "string"
                ? JSON.parse(block.args)
                : block.args) ||
              {};
            agentId = args.agentId || args.agent_id || "unknown";
            taskSnippet = (args.task || args.message || "")
              .replace(/\n/g, " ")
              .slice(0, 120);
          } catch {
            // parse error, skip
          }
          events.push({
            type: "agent_dispatch",
            detail: `Dispatched to ${agentId}: ${taskSnippet}`,
            timestamp,
            sessionId,
          });
        }
      }

      // Extract from user messages — new client info
      if (role === "user" && block.type === "text" && block.text) {
        const text = block.text;
        // Detect client onboarding requests
        if (/onboard|new client|audit\s+\S+\.\S+/i.test(text)) {
          const domainMatch = text.match(
            /(?:https?:\/\/)?([a-z0-9][-a-z0-9]*\.[a-z]{2,})/i
          );
          if (domainMatch) {
            events.push({
              type: "client_request",
              detail: `Operator requested work on domain: ${domainMatch[1]}`,
              timestamp,
              sessionId,
            });
          }
        }
      }
    }
  }

  return events;
}

function readCurrentMemory() {
  try {
    return fs.readFileSync(MEMORY_FILE, "utf-8");
  } catch {
    return "";
  }
}

function deduplicateEvents(events, currentMemory) {
  const lower = currentMemory.toLowerCase();
  return events.filter((e) => {
    // Skip if the core detail is already in MEMORY.md
    const keywords = e.detail
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 4)
      .slice(0, 3);
    // If 2+ keywords from the event detail appear together in memory, it's a dupe
    const matches = keywords.filter((kw) => lower.includes(kw));
    return matches.length < 2;
  });
}

function formatRecoveryBlock(events) {
  if (events.length === 0) return "";

  const date = new Date().toISOString().split("T")[0];
  const lines = [
    ``,
    `### Safety Net Recovery — ${date}`,
    `*Auto-extracted from session transcripts. Verify accuracy and merge into proper sections.*`,
    ``,
  ];

  for (const event of events) {
    const ts = event.timestamp
      ? new Date(event.timestamp).toISOString().slice(0, 16).replace("T", " ")
      : "unknown time";
    const icon =
      {
        client_mention: "CLIENT",
        client_request: "REQUEST",
        agent_dispatch: "DISPATCH",
        rate_limit: "RATE-LIMIT",
        audit_complete: "AUDIT",
      }[event.type] || "EVENT";
    lines.push(`- **[${icon}]** ${ts} — ${event.detail}`);
    lines.push(`  *(session: ${event.sessionId.slice(0, 8)}...)*`);
  }

  lines.push(``);
  return lines.join("\n");
}

function appendToMemory(block) {
  if (!block) return;

  const memory = readCurrentMemory();

  // Insert before "## Blockers" section, or append at end
  const blockersIdx = memory.indexOf("## Blockers");
  let updated;
  if (blockersIdx > 0) {
    updated =
      memory.slice(0, blockersIdx).trimEnd() +
      "\n" +
      block +
      "\n" +
      memory.slice(blockersIdx);
  } else {
    updated = memory.trimEnd() + "\n" + block;
  }

  // Update the "Last Updated" timestamp
  updated = updated.replace(
    /\*\*Last Updated:\*\*.*/,
    `**Last Updated:** ${new Date().toISOString().split("T")[0]} (safety-net)`
  );

  if (!DRY_RUN) {
    fs.writeFileSync(MEMORY_FILE, updated);
  }
}

async function main() {
  log(`Memory Safety Net starting (lookback: ${LOOKBACK_HOURS}h, dry-run: ${DRY_RUN})`);

  const sinceMs = getLastRunTime();
  log(`Checking sessions modified since ${new Date(sinceMs).toISOString()}`);

  // Get session IDs that were active since last run
  const recentSessionIds = getRecentSessions(sinceMs);
  log(`Found ${recentSessionIds.length} recent session(s)`);

  if (recentSessionIds.length === 0) {
    log("No recent sessions to process. Exiting.");
    updateMarker();
    return;
  }

  // Extract events from each session
  let allEvents = [];
  for (const sid of recentSessionIds) {
    const events = extractEventsFromSession(sid);
    if (events.length > 0) {
      log(`  Session ${sid.slice(0, 8)}...: ${events.length} event(s)`);
      allEvents.push(...events);
    }
  }

  log(`Total events extracted: ${allEvents.length}`);

  if (allEvents.length === 0) {
    log("No extractable events found. Exiting.");
    updateMarker();
    return;
  }

  // Deduplicate against existing MEMORY.md
  const currentMemory = readCurrentMemory();
  const newEvents = deduplicateEvents(allEvents, currentMemory);
  log(`After dedup: ${newEvents.length} new event(s)`);

  if (newEvents.length === 0) {
    log("All events already in MEMORY.md. Exiting.");
    updateMarker();
    return;
  }

  // Format and append
  const block = formatRecoveryBlock(newEvents);

  if (DRY_RUN) {
    log("DRY RUN — would append:");
    console.log(block);
  } else {
    appendToMemory(block);
    log(`Appended ${newEvents.length} event(s) to MEMORY.md`);
  }

  updateMarker();
  log("Done.");
}

main().catch((err) => {
  console.error("Memory safety net failed:", err);
  process.exit(1);
});
