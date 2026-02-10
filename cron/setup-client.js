#!/usr/bin/env node
// All-in-one client setup: creates Convex tasks from playbook, registers client.
//
// Usage:
//   node setup-client.js --name "Foo's Plumbing" --domain foosplumbing.com [--dry-run]

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const path = require('path');
const fs = require('fs');
const convex = require('./lib/convex');
const clients = require('./lib/clients');

// ── 90-Day Playbook Template ─────────────────────────────────────────

const PLAYBOOK = [
  // Week 1 — Foundation (assigned immediately)
  { agent: 'scout',   title: 'Full competitive landscape audit',        phase: '1-Foundation', week: 1 },
  { agent: 'specs',   title: 'Technical SEO audit',                     phase: '1-Foundation', week: 1 },
  { agent: 'mozi',    title: 'Business strategy review',                phase: '1-Foundation', week: 1 },
  { agent: 'silas',   title: 'GBP completeness audit',                  phase: '1-Foundation', week: 1 },
  { agent: 'specs',   title: 'Fix title tags on top pages',             phase: '1-Foundation', week: 1 },
  { agent: 'specs',   title: 'Submit & verify Search Console',          phase: '1-Foundation', week: 1 },
  { agent: 'specs',   title: 'Deploy LocalBusiness schema',             phase: '1-Foundation', week: 1 },
  { agent: 'scout',   title: 'Baseline ranking report',                 phase: '1-Foundation', week: 1 },

  // Week 2 — Content Foundation
  { agent: 'silas',   title: 'Full site SEO audit + scorecard',         phase: '1-Foundation', week: 2 },
  { agent: 'silas',   title: 'Content briefs for all service pages',    phase: '1-Foundation', week: 2 },
  { agent: 'scribe',  title: 'Write homepage copy',                     phase: '1-Foundation', week: 2 },
  { agent: 'scribe',  title: 'Write top 5 service page copy',           phase: '1-Foundation', week: 2 },
  { agent: 'herald',  title: 'Optimize GBP listing (hours, categories, attributes)', phase: '1-Foundation', week: 2 },
  { agent: 'herald',  title: 'Write 4 GBP posts',                       phase: '1-Foundation', week: 2 },

  // Week 3-4 — Authority Building
  { agent: 'citadel', title: 'Submit to top 20 directories',            phase: '2-Authority', week: 3 },
  { agent: 'citadel', title: 'NAP consistency audit + corrections',     phase: '2-Authority', week: 3 },
  { agent: 'scribe',  title: 'Write 2 blog posts (local SEO topics)',   phase: '2-Authority', week: 3 },
  { agent: 'specs',   title: 'Configure GA4 events + goals',            phase: '2-Authority', week: 3 },
  { agent: 'specs',   title: 'Fix Core Web Vitals issues',              phase: '2-Authority', week: 4 },
  { agent: 'scribe',  title: 'Write 5 city/service landing pages',      phase: '2-Authority', week: 4 },
  { agent: 'herald',  title: 'Write 4 GBP posts (month 2)',             phase: '2-Authority', week: 4 },

  // Week 5-8 — Acceleration
  { agent: 'citadel', title: 'Submit to 30 more directories',           phase: '3-Acceleration', week: 5 },
  { agent: 'scribe',  title: 'Write 4 blog posts',                      phase: '3-Acceleration', week: 5 },
  { agent: 'silas',   title: 'Monthly SEO progress report',             phase: '3-Acceleration', week: 5 },
  { agent: 'razor',   title: 'CRO audit on top landing pages',          phase: '3-Acceleration', week: 6 },
  { agent: 'scribe',  title: 'Write 5 more city/service pages',         phase: '3-Acceleration', week: 6 },
  { agent: 'herald',  title: 'Write 4 GBP posts (month 3)',             phase: '3-Acceleration', week: 7 },
  { agent: 'lookout', title: 'Set up rank tracking + weekly alerts',    phase: '3-Acceleration', week: 7 },
  { agent: 'silas',   title: 'Quarterly strategy review',               phase: '3-Acceleration', week: 8 },

  // Ongoing / Recurring
  { agent: 'herald',  title: 'Weekly GBP posts (4 per month)',          phase: 'Ongoing', week: 0, tags: ['recurring'] },
  { agent: 'scribe',  title: 'Monthly blog posts (2 per month)',        phase: 'Ongoing', week: 0, tags: ['recurring'] },
  { agent: 'lookout', title: 'Weekly ranking report',                   phase: 'Ongoing', week: 0, tags: ['recurring'] },
  { agent: 'silas',   title: 'Monthly SEO progress report',             phase: 'Ongoing', week: 0, tags: ['recurring'] },
  { agent: 'citadel', title: 'Quarterly citation audit',                phase: 'Ongoing', week: 0, tags: ['recurring'] },
];

const delay = ms => new Promise(r => setTimeout(r, ms));

// ── CLI parsing ──────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { dryRun: false };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--name' && args[i + 1]) opts.name = args[++i];
    else if (args[i] === '--domain' && args[i + 1]) opts.domain = args[++i];
    else if (args[i] === '--dry-run') opts.dryRun = true;
  }
  if (!opts.name || !opts.domain) {
    console.error('Usage: node setup-client.js --name "Client Name" --domain domain.com [--dry-run]');
    process.exit(1);
  }
  return opts;
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();
  const slug = clients.slugify(opts.name);
  const tenantId = slug;

  console.log(`Setting up client: ${opts.name} (${slug})`);
  console.log(`Domain: ${opts.domain}`);
  if (opts.dryRun) console.log('DRY RUN — no changes will be made\n');

  // 1. Check for duplicates
  if (clients.load(slug)) {
    console.error(`ERROR: Client "${slug}" already registered. Aborting.`);
    process.exit(1);
  }

  // 2. Create tasks from playbook
  let assignedCount = 0;
  let inboxCount = 0;

  for (const task of PLAYBOOK) {
    // Week 1 tasks go to "assigned" (ready for dispatcher), rest to "inbox"
    const status = task.week === 1 ? 'assigned' : 'inbox';
    const tags = [
      task.phase,
      ...(task.tags || []),
      task.week > 0 ? `week-${task.week}` : 'recurring',
    ];

    if (status === 'assigned') assignedCount++;
    else inboxCount++;

    if (opts.dryRun) {
      console.log(`[dry-run] [${status.toUpperCase()}] ${task.agent}: ${task.title}`);
    } else {
      await convex.createTask({
        tenantId,
        title: task.title,
        description: `${task.title}\n\nPhase: ${task.phase}\nAgent: ${task.agent}`,
        agentId: task.agent,
        clientSlug: slug,
        status,
        tags,
        phase: task.phase,
      });
      console.log(`  [${status.toUpperCase()}] ${task.agent}: ${task.title}`);
      await delay(100);
    }
  }

  // 3. Register client
  const config = {
    name: opts.name,
    slug,
    domain: opts.domain,
    tenantId,
    maxConcurrent: 6,
  };

  if (opts.dryRun) {
    console.log('\n[dry-run] Would register client config:');
    console.log(JSON.stringify(config, null, 2));
  } else {
    const registered = clients.register(config);
    console.log(`\nRegistered client: ${registered.slug}`);
  }

  // 4. Create deliverables directory
  const deliverablesDir = path.join(process.env.OPENCLAW_HOME || path.resolve(__dirname, '..'), 'deliverables', slug);
  if (opts.dryRun) {
    console.log(`[dry-run] Would create: ${deliverablesDir}`);
  } else {
    fs.mkdirSync(deliverablesDir, { recursive: true });
    console.log(`Created deliverables dir: ${deliverablesDir}`);
  }

  // 5. Summary
  const summary = {
    name: opts.name,
    slug,
    domain: opts.domain,
    tenantId,
    tasks: { assigned: assignedCount, inbox: inboxCount, total: assignedCount + inboxCount },
    deliverables: deliverablesDir,
  };

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Client setup complete: ${opts.name}`);
  console.log(`  ASSIGNED (Week 1): ${assignedCount} tasks`);
  console.log(`  INBOX (Later):     ${inboxCount} tasks`);
  console.log(`  Total:             ${assignedCount + inboxCount} tasks`);
  console.log(`${'='.repeat(60)}`);

  // Output JSON summary for programmatic consumption
  console.log('\n__JSON_SUMMARY__');
  console.log(JSON.stringify(summary));
}

main().catch(err => {
  console.error(`FATAL: ${err.message}`);
  process.exit(1);
});
