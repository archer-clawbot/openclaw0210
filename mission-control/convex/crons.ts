import { cronJobs } from "convex/server";
import { api } from "./_generated/api";
import { internal } from "./_generated/api";

const crons = cronJobs();

// ── WooCommerce crons (existing) ─────────────────────────────

// Run sync every 15 minutes to catch anything webhooks missed
crons.interval(
	"woo-sync-all",
	{ minutes: 15 },
	api.wooSync.syncAll,
	{ fullResync: false },
);

// Run deliverable generation daily at 6 AM UTC (midnight CST)
crons.daily(
	"woo-generate-deliverables",
	{ hourUTC: 6, minuteUTC: 0 },
	api.wooDeliverables.generateCycleDeliverables,
);

// ── Pipeline crons ───────────────────────────────────────────

// Check for overdue deliverables every 6 hours
crons.interval(
	"pipeline:stale-check",
	{ hours: 6 },
	internal.pipelineCrons.checkStaleDeliverables,
);

// Check for re-audits due daily at 6:00 AM CT (12:00 UTC)
crons.cron(
	"pipeline:reaudit-check",
	"0 12 * * *",
	internal.pipelineCrons.checkReaudits,
);

// Compute pipeline stats daily at 2:00 AM CT (8:00 UTC)
crons.cron(
	"pipeline:daily-stats",
	"0 8 * * *",
	internal.pipelineCrons.computeDailyStats,
);

export default crons;
