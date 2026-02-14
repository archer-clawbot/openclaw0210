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

export default crons;
