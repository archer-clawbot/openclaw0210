#!/usr/bin/env node
// TODO: Add log rotation — dispatcher.log grows unbounded (currently 302KB+)
// Consider rotating at 1MB or daily, keeping last 7 days

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

// Convex → Agent Dispatcher (Multi-Client)
// Polls Convex for all registered clients, dispatches tasks to agents
// via Gateway WS, and updates task status as agents complete.

const path = require('path');
const fs = require('fs');
const convex = require('./lib/convex');
const { GatewayClient } = require('./lib/gateway');
const clients = require('./lib/clients');

// ── Constants ─────────────────────────────────────────────────────────

const MAX_ATTEMPTS = 3;
const POLL_INTERVAL = 30_000;
const POLL_MAX_INTERVAL = 120_000;
const WAIT_TIMEOUT = 3_000;
const CLIENT_PAUSE = 50; // ms between client polls (rate limit)

const AGENT_MODEL = {
  scout:   'haiku',
  specs:   'haiku',
  mozi:    'sonnet',
  silas:   'sonnet',
  scribe:  'sonnet',
  herald:  'haiku',
  wrench:  'haiku',
  citadel: 'haiku',
  lookout: 'haiku',
  razor:   'sonnet',
};

const LOG_FILE = path.join(__dirname, 'dispatcher.log');
const DELIVERABLES_ROOT = path.join(process.env.OPENCLAW_HOME || path.resolve(__dirname, '..'), 'deliverables');

// ── Logging ───────────────────────────────────────────────────────────

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

// Agents that receive WordPress credentials + execution instructions
const EXECUTION_AGENTS = new Set(['wrench', 'builder']);

// Chain map: when an analysis agent completes, auto-create a follow-up task for the execution agent.
const CHAIN_MAP = {
  specs: { executionAgent: 'wrench', verb: 'Implement' },
  silas: { executionAgent: 'wrench', verb: 'Implement' },
  scout: null,   // research only, no follow-up
  mozi:  null,   // strategy only, no follow-up
  scribe: { executionAgent: 'wrench', verb: 'Publish' },
};

function buildTaskMessage(task, client, chainContext) {
  const agentId = task.agentId;
  const deliverables = path.join(DELIVERABLES_ROOT, client.slug, agentId);
  const lines = [
    'You have been assigned a task from the client project board.',
    '',
    `CLIENT: ${client.name}`,
    `DOMAIN: ${client.domain}`,
    `TASK: ${task.title}`,
    '',
    'DESCRIPTION:',
    task.description || task.title,
    '',
  ];

  // Execution agents (wrench, builder) get WP credentials + strict execution rules
  if (EXECUTION_AGENTS.has(agentId) && client.access?.wordpress) {
    const wp = client.access.wordpress;
    const auth = Buffer.from(`${wp.user}:${wp.appPassword}`).toString('base64');

    if (chainContext) {
      lines.push(
        'SOURCE DELIVERABLES (from the analysis agent):',
        `  Directory: ${chainContext.deliverablePath}`,
        '',
        'Read ALL files in that directory. They contain the analysis, recommendations, and exact changes to make.',
        'Your job is to EXECUTE every change described in those files.',
        '',
      );
    }

    lines.push(
      'INSTRUCTIONS:',
      '- EXECUTE the task directly on the live WordPress site. Do not write recommendations.',
      '- Save a summary of what you changed (with real API responses) to your deliverables path.',
      '',
      'WORDPRESS REST API CREDENTIALS:',
      `  REST API base: ${wp.restApi}`,
      `  Auth header value: Basic ${auth}`,
      '',
      'CRITICAL EXECUTION RULES:',
      '1. You MUST use the Bash tool to run curl commands against the REST API. This is mandatory.',
      '2. Do NOT write reports about what you "would do." Actually run the commands.',
      '3. Do NOT hallucinate or fabricate API responses. Run the real curl command and use the real output.',
      '4. Do NOT use browser automation (Playwright, Puppeteer, Chrome). REST API via curl only.',
      '5. Every change you claim to make MUST have a corresponding curl command you actually executed.',
      '',
      'WORKFLOW:',
      `  Step 1: Fetch current data:  curl -s "${wp.restApi}/pages?per_page=50" -H "Authorization: Basic ${auth}"`,
      `  Step 2: For each page to update, run:  curl -s -X POST "${wp.restApi}/pages/<ID>" -H "Authorization: Basic ${auth}" -H "Content-Type: application/json" -d '{"meta":{"rank_math_title":"...","rank_math_description":"..."}}'`,
      '  Step 3: Verify the update by fetching the page again and confirming the new values.',
      '',
      'RankMath meta keys: rank_math_title, rank_math_description',
      '',
      'Your deliverable must include the ACTUAL curl output (or a summary of real responses), not fabricated results.',
      '',
    );
  } else {
    lines.push(
      'INSTRUCTIONS:',
      '- Analyze, audit, and produce detailed recommendations with specific actionable changes.',
      '- Be specific: include page IDs, exact new values, before/after comparisons.',
      '- Do NOT attempt to make live changes yourself. An execution agent will implement your recommendations.',
      '- Save your deliverable to the path below.',
      '',
    );
  }

  lines.push(`Save deliverables to: ${deliverables}\\`);
  return lines.join('\n');
}

const delay = ms => new Promise(r => setTimeout(r, ms));

// ── Auto-Chain: Analysis → Execution ─────────────────────────────────

async function maybeChainTask(client, task, dryRun) {
  const chain = CHAIN_MAP[task.agentId];
  if (!chain) return;

  if (!client.access?.wordpress) {
    log(`  [${client.slug}] chain skipped (no WP access): ${task.title}`);
    return;
  }

  const deliverablePath = path.join(DELIVERABLES_ROOT, client.slug, task.agentId);
  const chainTitle = `Wrench: ${chain.verb} — ${task.title.replace(/^\w+:\s*/, '')}`;
  const chainDesc = [
    `Auto-chained from: ${task.title}`,
    `Source agent: ${task.agentId}`,
    `Source deliverables: ${deliverablePath}`,
    '',
    `Read all files in the source deliverables directory and execute every recommended change on the live WordPress site.`,
  ].join('\n');

  if (dryRun) {
    log(`  [${client.slug}] [dry-run] would chain: ${chainTitle}`);
    return;
  }

  try {
    const result = await convex.createTask({
      tenantId: client.tenantId,
      title: chainTitle,
      description: chainDesc,
      agentId: 'wrench',
      clientSlug: client.slug,
      status: 'in_progress',
      tags: ['chained'],
      chainFrom: task._id,
    });
    log(`  [${client.slug}] chained: ${chainTitle} (task ${result.taskId})`);
  } catch (err) {
    log(`  [${client.slug}] chain error: ${err.message}`);
  }
}

// ── Poll Cycle (Single Client) ──────────────────────────────────────

async function pollClient(gw, client, dryRun) {
  const slug = client.slug;
  const tenantId = client.tenantId;
  const maxConcurrent = client.maxConcurrent || 3;

  // 1. Fetch in_progress tasks from Convex
  const inProgressTasks = await convex.queryTasks(tenantId, 'in_progress');
  log(`[${slug}] fetched ${inProgressTasks.length} in_progress tasks`);

  let dispatched = 0;
  let completed = 0;
  let errors = 0;

  for (const task of inProgressTasks) {
    // Skip tasks without an agentId (e.g., manually created)
    if (!task.agentId) continue;

    // Skip tasks without a runId (not yet dispatched to gateway)
    if (!task.openclawRunId) {
      // This task needs to be dispatched
      if (!AGENT_MODEL[task.agentId]) {
        log(`  [${slug}] skipping (unknown agent "${task.agentId}"): ${task.title}`);
        continue;
      }

      // Enforce concurrency limit (count tasks with runIds)
      const runningCount = inProgressTasks.filter(t => t.openclawRunId).length;
      if (runningCount >= maxConcurrent) {
        log(`  [${slug}] skipping (at concurrency limit ${maxConcurrent}): ${task.title}`);
        continue;
      }

      if (task.attempts >= MAX_ATTEMPTS) {
        log(`  [${slug}] skipping (max attempts reached): ${task.title}`);
        continue;
      }

      if (dryRun) {
        log(`  [${slug}] [dry-run] would dispatch: ${task.agentId} ← "${task.title}"`);
        dispatched++;
        continue;
      }

      try {
        // Detect chained tasks
        let chainContext = null;
        const srcMatch = (task.description || '').match(/Source deliverables:\s*(.+)/);
        if (srcMatch) {
          chainContext = { deliverablePath: srcMatch[1].trim() };
        }
        const message = buildTaskMessage(task, client, chainContext);
        const result = await gw.dispatchAgent({
          agentId: task.agentId,
          message,
          taskId: task._id,
        });

        await convex.markDispatched(task._id, tenantId, result.runId);
        log(`  [${slug}] dispatched: ${task.agentId} ← "${task.title}" (runId: ${result.runId})`);
        dispatched++;
      } catch (err) {
        log(`  [${slug}] dispatch error for ${task.title}: ${err.message}`);
        await convex.markFailed(task._id, tenantId, err.message).catch(() => {});
        errors++;
      }
      continue;
    }

    // ── Task has runId — check if agent finished ──
    if (dryRun) {
      log(`  [${slug}] [dry-run] would check status of ${task.title} (runId: ${task.openclawRunId})`);
      continue;
    }

    try {
      const result = await gw.waitForAgent(task.openclawRunId, WAIT_TIMEOUT);

      if (result.status === 'ok') {
        const needsReview = !client.autoApprove;
        await convex.markCompleted(task._id, tenantId, needsReview);
        log(`  [${slug}] completed: ${task.title} → ${needsReview ? 'REVIEW' : 'DONE'}`);
        await maybeChainTask(client, task, dryRun);
        completed++;
      } else if (result.status === 'error') {
        await convex.markFailed(task._id, tenantId, result.error || 'agent error');
        log(`  [${slug}] failed: ${task.title} (attempt ${task.attempts}/${MAX_ATTEMPTS})`);
        errors++;
      } else {
        // timeout — still running, skip
        log(`  [${slug}] still running: ${task.title}`);
      }
    } catch (err) {
      log(`  [${slug}] error checking ${task.title}: ${err.message}`);
    }
  }

  // 2. Backfill: if in_progress < max, promote from assigned
  const activeCount = inProgressTasks.length - completed;
  if (activeCount < maxConcurrent) {
    const toPromote = maxConcurrent - activeCount;
    if (dryRun) {
      log(`  [${slug}] [dry-run] would backfill up to ${toPromote} tasks from assigned → in_progress`);
    } else {
      const result = await convex.promoteTasks(tenantId, 'assigned', 'in_progress', toPromote);
      if (result.promoted > 0) {
        log(`  [${slug}] backfill: promoted ${result.promoted} tasks → in_progress`);
      }
    }
  }

  log(`[${slug}] cycle done — dispatched: ${dispatched}, completed: ${completed}, errors: ${errors}`);
  return { dispatched, completed, errors, tasksFound: inProgressTasks.length };
}

// ── Poll All Clients ─────────────────────────────────────────────────

async function pollAllClients(gw, dryRun, filterSlug) {
  const allClients = clients.listActive();

  if (allClients.length === 0) {
    log('No active clients registered. Nothing to dispatch.');
    return;
  }

  const targets = filterSlug
    ? allClients.filter(c => c.slug === filterSlug)
    : allClients;

  if (targets.length === 0) {
    log(`Client "${filterSlug}" not found or not active.`);
    return;
  }

  log(`polling ${targets.length} client(s): ${targets.map(c => c.slug).join(', ')}`);

  let hadActivity = false;
  for (let i = 0; i < targets.length; i++) {
    try {
      const result = await pollClient(gw, targets[i], dryRun);
      if (result && (result.dispatched > 0 || result.completed > 0 || result.tasksFound > 0)) {
        hadActivity = true;
      }
    } catch (err) {
      log(`[${targets[i].slug}] poll error: ${err.message}`);
    }
    if (i < targets.length - 1) await delay(CLIENT_PAUSE);
  }
  return hadActivity;
}

// ── Status Display ───────────────────────────────────────────────────

async function showStatus(filterSlug) {
  const allClients = clients.listActive();
  const targets = filterSlug
    ? allClients.filter(c => c.slug === filterSlug)
    : allClients;

  if (targets.length === 0) {
    console.log(filterSlug ? `Client "${filterSlug}" not found.` : 'No active clients.');
    return;
  }

  for (const client of targets) {
    console.log(`\n── ${client.name} (${client.slug}) ──`);
    console.log(`Tenant: ${client.tenantId} | Max concurrent: ${client.maxConcurrent}`);

    try {
      const statuses = ['inbox', 'assigned', 'in_progress', 'review', 'done'];
      for (const status of statuses) {
        const tasks = await convex.queryTasks(client.tenantId, status);
        if (tasks.length > 0) {
          console.log(`\n  ${status.toUpperCase()} (${tasks.length}):`);
          for (const t of tasks) {
            const agent = t.agentId || '?';
            const attempts = t.attempts ?? 0;
            const runId = t.openclawRunId ? t.openclawRunId.slice(0, 8) : '-';
            console.log(`    ${agent.padEnd(10)} ${t.title.slice(0, 50).padEnd(52)} attempts=${attempts} run=${runId}`);
          }
        }
      }
    } catch (err) {
      console.log(`  Error fetching status: ${err.message}`);
    }
  }
}

// ── CLI ───────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // --status [slug]
  if (args.includes('--status')) {
    const idx = args.indexOf('--status');
    const slug = args[idx + 1] && !args[idx + 1].startsWith('--') ? args[idx + 1] : null;
    return showStatus(slug);
  }

  const dryRun = args.includes('--dry-run');
  const watch = args.includes('--watch');

  // --client <slug>
  let filterSlug = null;
  const clientIdx = args.indexOf('--client');
  if (clientIdx !== -1 && args[clientIdx + 1]) {
    filterSlug = args[clientIdx + 1];
  }

  const gw = dryRun ? null : new GatewayClient({ log });

  // Graceful shutdown
  let stopping = false;
  function shutdown() {
    if (stopping) return;
    stopping = true;
    log('shutting down…');
    if (gw) gw.close();
    process.exit(0);
  }
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  if (!dryRun) {
    await gw.connect();
  }

  log(`dispatcher started (dryRun=${dryRun}, watch=${watch}, client=${filterSlug || 'all'})`);

  // Run first cycle
  await pollAllClients(gw, dryRun, filterSlug);

  if (!watch) {
    if (gw) gw.close();
    return;
  }

  // Continuous polling with idle backoff
  let currentInterval = POLL_INTERVAL;

  async function loop() {
    if (stopping) return;
    try {
      const hadActivity = await pollAllClients(gw, dryRun, filterSlug);
      if (hadActivity) {
        currentInterval = POLL_INTERVAL;
      } else {
        currentInterval = Math.min(currentInterval * 2, POLL_MAX_INTERVAL);
      }
    } catch (err) {
      log(`cycle error: ${err.message}`);
    }
    if (!stopping) setTimeout(loop, currentInterval);
  }

  setTimeout(loop, currentInterval);
}

main().catch((err) => {
  log(`fatal: ${err.message}`);
  console.error(err);
  process.exit(1);
});
