import { internalMutation } from "./_generated/server";

const DEFAULT_TENANT_ID = "default";

// ═══════════════════════════════════════════════════════════════
// CHECK STALE DELIVERABLES (overdue based on turnaround time)
// ═══════════════════════════════════════════════════════════════

export const checkStaleDeliverables = internalMutation({
	handler: async (ctx) => {
		const now = Date.now();
		const deliverables = await ctx.db.query("wooDeliverables").collect();

		// Get catalog for turnaround times
		const catalog = await ctx.db
			.query("pipelineProductCatalog")
			.withIndex("by_active", (q) => q.eq("active", true))
			.collect();
		const turnaroundBySku: Record<string, number> = {};
		for (const p of catalog) {
			turnaroundBySku[p.sku] = p.turnaroundHours;
		}

		const stale = deliverables.filter((d) => {
			if (d.status !== "in_progress" || !d.startedAt || !d.sku)
				return false;
			const turnaround = turnaroundBySku[d.sku] || 48;
			const deadline = d.startedAt + turnaround * 60 * 60 * 1000;
			return now > deadline;
		});

		if (stale.length > 0) {
			for (const d of stale) {
				// Log stale event
				await ctx.db.insert("pipelineDeliverableLog", {
					deliverableId: d._id,
					eventType: "note",
					message: `Deliverable is past its turnaround deadline (${turnaroundBySku[d.sku!] || 48}h)`,
					actor: "system",
					tenantId: DEFAULT_TENANT_ID,
				});
			}
		}

		return { staleCount: stale.length };
	},
});

// ═══════════════════════════════════════════════════════════════
// CHECK REAUDITS DUE (30-day post-delivery re-audit trigger)
// ═══════════════════════════════════════════════════════════════

export const checkReaudits = internalMutation({
	handler: async (ctx) => {
		const now = Date.now();
		const delivered = await ctx.db.query("wooDeliverables").collect();

		const due = delivered.filter(
			(d) =>
				d.nextReauditAt &&
				d.nextReauditAt <= now &&
				d.status === "delivered",
		);

		for (const d of due) {
			// Log the reaudit trigger
			await ctx.db.insert("pipelineDeliverableLog", {
				deliverableId: d._id,
				eventType: "reaudit_scheduled",
				message: "30-day re-audit triggered",
				actor: "system",
				tenantId: DEFAULT_TENANT_ID,
			});

			// Clear the reaudit trigger so it doesn't fire again
			await ctx.db.patch(d._id, { nextReauditAt: undefined });
		}

		return { reauditsTriggered: due.length };
	},
});

// ═══════════════════════════════════════════════════════════════
// COMPUTE DAILY STATS (placeholder — stats computed on-the-fly)
// ═══════════════════════════════════════════════════════════════

export const computeDailyStats = internalMutation({
	handler: async (_ctx) => {
		// Stats are currently computed on-the-fly via pipelineQueries.getPipelineStats
		// This cron exists as a placeholder for when we want to pre-compute
		// and cache stats in the pipelineStats table for faster dashboard loads
		return { computed: true };
	},
});
