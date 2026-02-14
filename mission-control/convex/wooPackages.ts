import { v } from "convex/values";
import { mutation } from "./_generated/server";

const DEFAULT_TENANT_ID = "default";

// ── Package Config CRUD ─────────────────────────────────────────────

export const createPackageConfig = mutation({
	args: {
		customerId: v.id("wooCustomers"),
		wcOrderId: v.number(),
		name: v.string(),
		billingCycleDay: v.number(),
		startDate: v.string(),
		notes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert("wooPackageConfigs", {
			customerId: args.customerId,
			wcOrderId: args.wcOrderId,
			name: args.name,
			status: "active",
			billingCycleDay: args.billingCycleDay,
			startDate: args.startDate,
			currentCycleNumber: 1,
			tenantId: DEFAULT_TENANT_ID,
			notes: args.notes,
		});
		return id;
	},
});

export const updatePackageConfig = mutation({
	args: {
		id: v.id("wooPackageConfigs"),
		name: v.optional(v.string()),
		status: v.optional(v.string()),
		billingCycleDay: v.optional(v.number()),
		notes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...fields } = args;
		const updates: Record<string, unknown> = {};
		if (fields.name !== undefined) updates.name = fields.name;
		if (fields.status !== undefined) updates.status = fields.status;
		if (fields.billingCycleDay !== undefined)
			updates.billingCycleDay = fields.billingCycleDay;
		if (fields.notes !== undefined) updates.notes = fields.notes;

		await ctx.db.patch(id, updates);
		return id;
	},
});

export const deletePackageConfig = mutation({
	args: { id: v.id("wooPackageConfigs") },
	handler: async (ctx, args) => {
		// Delete all items in this package first
		const items = await ctx.db
			.query("wooPackageItems")
			.withIndex("by_packageConfigId", (q) =>
				q.eq("packageConfigId", args.id),
			)
			.collect();

		for (const item of items) {
			await ctx.db.delete(item._id);
		}

		await ctx.db.delete(args.id);
		return { deleted: true, itemsDeleted: items.length };
	},
});

// ── Package Item CRUD ───────────────────────────────────────────────

export const addPackageItem = mutation({
	args: {
		packageConfigId: v.id("wooPackageConfigs"),
		wcProductId: v.optional(v.number()),
		itemType: v.string(),
		label: v.string(),
		frequency: v.string(),
		quantity: v.number(),
		quantityUnit: v.optional(v.string()),
		notes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert("wooPackageItems", {
			packageConfigId: args.packageConfigId,
			wcProductId: args.wcProductId,
			itemType: args.itemType,
			label: args.label,
			frequency: args.frequency,
			quantity: args.quantity,
			quantityUnit: args.quantityUnit,
			completedCycles: "[]",
			tenantId: DEFAULT_TENANT_ID,
			notes: args.notes,
		});
		return id;
	},
});

export const updatePackageItem = mutation({
	args: {
		id: v.id("wooPackageItems"),
		itemType: v.optional(v.string()),
		label: v.optional(v.string()),
		frequency: v.optional(v.string()),
		quantity: v.optional(v.number()),
		quantityUnit: v.optional(v.string()),
		notes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...fields } = args;
		const updates: Record<string, unknown> = {};
		if (fields.itemType !== undefined) updates.itemType = fields.itemType;
		if (fields.label !== undefined) updates.label = fields.label;
		if (fields.frequency !== undefined) updates.frequency = fields.frequency;
		if (fields.quantity !== undefined) updates.quantity = fields.quantity;
		if (fields.quantityUnit !== undefined)
			updates.quantityUnit = fields.quantityUnit;
		if (fields.notes !== undefined) updates.notes = fields.notes;

		await ctx.db.patch(id, updates);
		return id;
	},
});

export const deletePackageItem = mutation({
	args: { id: v.id("wooPackageItems") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
		return { deleted: true };
	},
});
