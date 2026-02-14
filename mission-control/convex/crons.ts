import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

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

export default crons;
