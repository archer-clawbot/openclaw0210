import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { api } from "./_generated/api";

const DEFAULT_TENANT_ID = "default";

// ── Deliverable CRUD ────────────────────────────────────────────────

export const createDeliverable = mutation({
	args: {
		packageConfigId: v.optional(v.id("wooPackageConfigs")),
		packageItemId: v.optional(v.id("wooPackageItems")),
		orderId: v.optional(v.id("wooOrders")),
		customerId: v.id("wooCustomers"),
		wcOrderId: v.optional(v.number()),
		wcProductId: v.optional(v.number()),
		cycleNumber: v.optional(v.number()),
		title: v.string(),
		itemType: v.string(),
		quantity: v.optional(v.number()),
		dueDate: v.optional(v.string()),
		notes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert("wooDeliverables", {
			packageConfigId: args.packageConfigId,
			packageItemId: args.packageItemId,
			orderId: args.orderId,
			customerId: args.customerId,
			wcOrderId: args.wcOrderId,
			wcProductId: args.wcProductId,
			cycleNumber: args.cycleNumber,
			title: args.title,
			itemType: args.itemType,
			status: "pending",
			quantity: args.quantity,
			quantityDelivered: 0,
			dueDate: args.dueDate,
			notes: args.notes,
			tenantId: DEFAULT_TENANT_ID,
		});
		return id;
	},
});

export const updateDeliverableStatus = mutation({
	args: {
		id: v.id("wooDeliverables"),
		status: v.string(),
	},
	handler: async (ctx, args) => {
		const updates: Record<string, unknown> = { status: args.status };
		if (args.status === "delivered") {
			updates.deliveredAt = Date.now();
		}
		await ctx.db.patch(args.id, updates);
		return args.id;
	},
});

export const updateDeliverable = mutation({
	args: {
		id: v.id("wooDeliverables"),
		title: v.optional(v.string()),
		status: v.optional(v.string()),
		quantity: v.optional(v.number()),
		quantityDelivered: v.optional(v.number()),
		dueDate: v.optional(v.string()),
		documentIds: v.optional(v.string()),
		downloadUrls: v.optional(v.string()),
		notes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...fields } = args;
		const updates: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(fields)) {
			if (value !== undefined) updates[key] = value;
		}

		// Auto-set deliveredAt when status becomes delivered
		if (fields.status === "delivered") {
			updates.deliveredAt = Date.now();
		}

		// Auto-detect completion: if quantityDelivered >= quantity, mark delivered
		if (fields.quantityDelivered !== undefined) {
			const deliverable = await ctx.db.get(id);
			if (
				deliverable &&
				deliverable.quantity &&
				fields.quantityDelivered >= deliverable.quantity &&
				deliverable.status !== "delivered"
			) {
				updates.status = "delivered";
				updates.deliveredAt = Date.now();
			}
		}

		await ctx.db.patch(id, updates);
		return id;
	},
});

export const deleteDeliverable = mutation({
	args: { id: v.id("wooDeliverables") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
		return { deleted: true };
	},
});

// ── Mark Delivered + Trigger Email ──────────────────────────────────

export const markDelivered = mutation({
	args: {
		id: v.id("wooDeliverables"),
		documentIds: v.optional(v.string()),
		downloadUrls: v.optional(v.string()),
		notes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const deliverable = await ctx.db.get(args.id);
		if (!deliverable) throw new Error("Deliverable not found");

		const updates: Record<string, unknown> = {
			status: "delivered",
			deliveredAt: Date.now(),
			emailSentAt: Date.now(),
		};

		if (args.documentIds !== undefined) updates.documentIds = args.documentIds;
		if (args.downloadUrls !== undefined)
			updates.downloadUrls = args.downloadUrls;
		if (args.notes !== undefined) updates.notes = args.notes;
		if (deliverable.quantity) updates.quantityDelivered = deliverable.quantity;

		await ctx.db.patch(args.id, updates);

		// Schedule the email notification via the existing email action
		const customer = await ctx.db.get(deliverable.customerId);
		if (customer) {
			await ctx.scheduler.runAfter(0, api.email.sendDeliverableReadyEmail, {
				toEmail: customer.email,
				firstName: customer.firstName,
				deliverableTitle: deliverable.title,
				deliverableId: args.id,
			});
		}

		return args.id;
	},
});

// ── Deliverable Generation Engine ───────────────────────────────────

/**
 * Generates deliverable instances for all active packages
 * based on their billing cycle day and frequency rules.
 *
 * Run via cron or manually from admin.
 */
export const generateCycleDeliverables = mutation({
	args: {},
	handler: async (ctx) => {
		const now = new Date();
		const currentDay = now.getUTCDate();
		const monthName = now.toLocaleString("en-US", { month: "long" });
		const year = now.getUTCFullYear();

		// Get all active package configs
		const configs = await ctx.db
			.query("wooPackageConfigs")
			.withIndex("by_status", (q) => q.eq("status", "active"))
			.collect();

		let totalGenerated = 0;

		for (const config of configs) {
			// Check if it's this config's billing day (or past it and not yet generated)
			if (currentDay < config.billingCycleDay) continue;
			if (config.lastGeneratedCycle === config.currentCycleNumber) continue;

			// Get all items for this package
			const items = await ctx.db
				.query("wooPackageItems")
				.withIndex("by_packageConfigId", (q) =>
					q.eq("packageConfigId", config._id),
				)
				.collect();

			for (const item of items) {
				if (!shouldGenerate(item.frequency, config.currentCycleNumber, item.completedCycles)) {
					continue;
				}

				// Create the deliverable
				await ctx.db.insert("wooDeliverables", {
					packageConfigId: config._id,
					packageItemId: item._id,
					customerId: config.customerId,
					wcOrderId: config.wcOrderId,
					wcProductId: item.wcProductId,
					cycleNumber: config.currentCycleNumber,
					title: `${item.label} — ${monthName} ${year} (Cycle ${config.currentCycleNumber})`,
					itemType: item.itemType,
					status: "pending",
					quantity: item.quantity,
					quantityDelivered: 0,
					tenantId: DEFAULT_TENANT_ID,
				});

				// Mark this cycle as completed for one_time/first_month items
				if (item.frequency === "one_time" || item.frequency === "first_month") {
					const completed = JSON.parse(item.completedCycles || "[]");
					completed.push(config.currentCycleNumber);
					await ctx.db.patch(item._id, {
						completedCycles: JSON.stringify(completed),
					});
				}

				totalGenerated++;
			}

			// Update the config
			await ctx.db.patch(config._id, {
				lastGeneratedCycle: config.currentCycleNumber,
				currentCycleNumber: config.currentCycleNumber + 1,
			});
		}

		return { generated: totalGenerated, configsProcessed: configs.length };
	},
});

/**
 * Manual trigger — generate deliverables for a specific package config.
 * Useful for onboarding a new client mid-cycle or re-running.
 */
export const generateForPackage = mutation({
	args: { packageConfigId: v.id("wooPackageConfigs") },
	handler: async (ctx, args) => {
		const config = await ctx.db.get(args.packageConfigId);
		if (!config) throw new Error("Package config not found");

		const now = new Date();
		const monthName = now.toLocaleString("en-US", { month: "long" });
		const year = now.getUTCFullYear();

		const items = await ctx.db
			.query("wooPackageItems")
			.withIndex("by_packageConfigId", (q) =>
				q.eq("packageConfigId", config._id),
			)
			.collect();

		let generated = 0;

		for (const item of items) {
			if (!shouldGenerate(item.frequency, config.currentCycleNumber, item.completedCycles)) {
				continue;
			}

			await ctx.db.insert("wooDeliverables", {
				packageConfigId: config._id,
				packageItemId: item._id,
				customerId: config.customerId,
				wcOrderId: config.wcOrderId,
				wcProductId: item.wcProductId,
				cycleNumber: config.currentCycleNumber,
				title: `${item.label} — ${monthName} ${year} (Cycle ${config.currentCycleNumber})`,
				itemType: item.itemType,
				status: "pending",
				quantity: item.quantity,
				quantityDelivered: 0,
				tenantId: DEFAULT_TENANT_ID,
			});

			if (item.frequency === "one_time" || item.frequency === "first_month") {
				const completed = JSON.parse(item.completedCycles || "[]");
				completed.push(config.currentCycleNumber);
				await ctx.db.patch(item._id, {
					completedCycles: JSON.stringify(completed),
				});
			}

			generated++;
		}

		await ctx.db.patch(config._id, {
			lastGeneratedCycle: config.currentCycleNumber,
			currentCycleNumber: config.currentCycleNumber + 1,
		});

		return { generated };
	},
});

// ── Frequency Logic ─────────────────────────────────────────────────

function shouldGenerate(
	frequency: string,
	currentCycle: number,
	completedCyclesJson: string | undefined,
): boolean {
	const completed: number[] = JSON.parse(completedCyclesJson || "[]");

	switch (frequency) {
		case "monthly":
			return true;
		case "first_month":
			return currentCycle === 1 && completed.length === 0;
		case "one_time":
			return completed.length === 0;
		case "quarterly":
			return currentCycle % 3 === 1;
		default:
			return false;
	}
}
