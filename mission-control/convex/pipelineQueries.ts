import { v } from "convex/values";
import { query } from "./_generated/server";

// ═══════════════════════════════════════════════════════════════
// LIST PIPELINE DELIVERABLES (with filtering)
// ═══════════════════════════════════════════════════════════════

export const listPipelineDeliverables = query({
	args: {
		status: v.optional(v.string()),
		source: v.optional(v.string()),
		sku: v.optional(v.string()),
		search: v.optional(v.string()),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		let deliverables = await ctx.db
			.query("wooDeliverables")
			.order("desc")
			.collect();

		// Filter to pipeline deliverables only (exclude package-based ones)
		deliverables = deliverables.filter((d) => {
			const source = d.source;
			return (
				source === "purchase" ||
				source === "prospecting" ||
				source === "manual" ||
				source === "system" ||
				d.sku
			);
		});

		// Apply filters
		if (args.status) {
			deliverables = deliverables.filter((d) => d.status === args.status);
		}
		if (args.source) {
			deliverables = deliverables.filter((d) => d.source === args.source);
		}
		if (args.sku) {
			deliverables = deliverables.filter((d) => d.sku === args.sku);
		}
		if (args.search) {
			const q = args.search.toLowerCase();
			deliverables = deliverables.filter(
				(d) =>
					d.customerName?.toLowerCase().includes(q) ||
					d.domain?.toLowerCase().includes(q) ||
					d.deliverableDisplayId?.toLowerCase().includes(q) ||
					d.wcOrderNumber?.toLowerCase().includes(q) ||
					d.sku?.toLowerCase().includes(q),
			);
		}

		const limit = args.limit || 50;
		return deliverables.slice(0, limit);
	},
});

// ═══════════════════════════════════════════════════════════════
// GET SINGLE DELIVERABLE WITH LOG
// ═══════════════════════════════════════════════════════════════

export const getPipelineDeliverable = query({
	args: { id: v.id("wooDeliverables") },
	handler: async (ctx, args) => {
		const deliverable = await ctx.db.get(args.id);
		if (!deliverable) return null;

		const log = await ctx.db
			.query("pipelineDeliverableLog")
			.withIndex("by_deliverableId", (q) =>
				q.eq("deliverableId", args.id),
			)
			.order("desc")
			.collect();

		return { deliverable, log };
	},
});

// ═══════════════════════════════════════════════════════════════
// PIPELINE STATS (computed on-the-fly)
// ═══════════════════════════════════════════════════════════════

export const getPipelineStats = query({
	args: {
		periodDays: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const periodMs = (args.periodDays || 30) * 24 * 60 * 60 * 1000;
		const cutoff = Date.now() - periodMs;

		const all = await ctx.db.query("wooDeliverables").collect();

		// Filter to pipeline deliverables within period
		const pipeline = all.filter((d) => {
			const isPipeline =
				d.source === "purchase" ||
				d.source === "prospecting" ||
				d.source === "manual" ||
				d.source === "system" ||
				d.sku;
			const inPeriod = (d.createdAt || d._creationTime) >= cutoff;
			return isPipeline && inPeriod;
		});

		const byStatus: Record<string, number> = {};
		const bySource: Record<string, number> = {};
		const bySku: Record<string, number> = {};
		let revenueCaptured = 0;
		let revenuePending = 0;
		let totalFulfillmentMs = 0;
		let fulfilledCount = 0;
		let failedCount = 0;

		for (const d of pipeline) {
			// By status
			byStatus[d.status] = (byStatus[d.status] || 0) + 1;

			// By source
			if (d.source) bySource[d.source] = (bySource[d.source] || 0) + 1;

			// By SKU
			if (d.sku) bySku[d.sku] = (bySku[d.sku] || 0) + 1;

			// Revenue
			if (
				d.price &&
				(d.status === "delivered" || d.status === "completed")
			) {
				revenueCaptured += d.price;
			}
			if (
				d.price &&
				(d.status === "queued" || d.status === "in_progress")
			) {
				revenuePending += d.price;
			}

			// Fulfillment time
			if (d.status === "delivered" && d.startedAt && d.deliveredAt) {
				totalFulfillmentMs += d.deliveredAt - d.startedAt;
				fulfilledCount++;
			}

			// Failures
			if (d.status === "failed") failedCount++;
		}

		return {
			total: pipeline.length,
			byStatus,
			bySource,
			bySku,
			revenue: {
				captured: revenueCaptured,
				pending: revenuePending,
			},
			performance: {
				avgFulfillmentHours:
					fulfilledCount > 0
						? Math.round(
								(totalFulfillmentMs /
									fulfilledCount /
									(1000 * 60 * 60)) *
									10,
							) / 10
						: 0,
				fulfilledCount,
				failedCount,
				failRate:
					pipeline.length > 0
						? Math.round((failedCount / pipeline.length) * 100) /
							100
						: 0,
			},
		};
	},
});

// ═══════════════════════════════════════════════════════════════
// REAUDITS DUE
// ═══════════════════════════════════════════════════════════════

export const getReauditsDue = query({
	handler: async (ctx) => {
		const now = Date.now();
		const all = await ctx.db.query("wooDeliverables").collect();

		return all.filter(
			(d) =>
				d.nextReauditAt &&
				d.nextReauditAt <= now &&
				d.status === "delivered",
		);
	},
});

// ═══════════════════════════════════════════════════════════════
// PRODUCT CATALOG
// ═══════════════════════════════════════════════════════════════

export const listCatalog = query({
	handler: async (ctx) => {
		return await ctx.db
			.query("pipelineProductCatalog")
			.withIndex("by_active", (q) => q.eq("active", true))
			.collect();
	},
});

export const getCatalogBySku = query({
	args: { sku: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("pipelineProductCatalog")
			.withIndex("by_sku", (q) => q.eq("sku", args.sku))
			.first();
	},
});
