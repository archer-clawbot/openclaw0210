import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const DEFAULT_TENANT_ID = "default";

// ── Customers ───────────────────────────────────────────────────────

export const upsertCustomer = mutation({
	args: {
		wcCustomerId: v.number(),
		email: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		company: v.optional(v.string()),
		phone: v.optional(v.string()),
		avatarUrl: v.optional(v.string()),
		wcDateCreated: v.string(),
		wcMeta: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("wooCustomers")
			.withIndex("by_wcCustomerId", (q) =>
				q.eq("wcCustomerId", args.wcCustomerId),
			)
			.first();

		const now = Date.now();

		if (existing) {
			await ctx.db.patch(existing._id, {
				email: args.email,
				firstName: args.firstName,
				lastName: args.lastName,
				company: args.company,
				phone: args.phone,
				avatarUrl: args.avatarUrl,
				wcMeta: args.wcMeta,
				lastSyncedAt: now,
			});
			return { id: existing._id, isNew: false };
		}

		const id = await ctx.db.insert("wooCustomers", {
			wcCustomerId: args.wcCustomerId,
			email: args.email,
			firstName: args.firstName,
			lastName: args.lastName,
			company: args.company,
			phone: args.phone,
			avatarUrl: args.avatarUrl,
			wcDateCreated: args.wcDateCreated,
			wcMeta: args.wcMeta,
			tenantId: DEFAULT_TENANT_ID,
			lastSyncedAt: now,
		});
		return { id, isNew: true };
	},
});

// ── Orders ──────────────────────────────────────────────────────────

export const upsertOrder = mutation({
	args: {
		wcOrderId: v.number(),
		wcCustomerId: v.number(),
		status: v.string(),
		total: v.string(),
		currency: v.string(),
		paymentMethod: v.string(),
		wcDateCreated: v.string(),
		wcDatePaid: v.optional(v.string()),
		lineItems: v.string(),
		billingAddress: v.optional(v.string()),
		shippingAddress: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// Resolve the Convex customer ID from wcCustomerId
		const customer = await ctx.db
			.query("wooCustomers")
			.withIndex("by_wcCustomerId", (q) =>
				q.eq("wcCustomerId", args.wcCustomerId),
			)
			.first();

		const existing = await ctx.db
			.query("wooOrders")
			.withIndex("by_wcOrderId", (q) =>
				q.eq("wcOrderId", args.wcOrderId),
			)
			.first();

		const now = Date.now();

		if (existing) {
			await ctx.db.patch(existing._id, {
				status: args.status,
				total: args.total,
				currency: args.currency,
				paymentMethod: args.paymentMethod,
				wcDatePaid: args.wcDatePaid,
				lineItems: args.lineItems,
				billingAddress: args.billingAddress,
				shippingAddress: args.shippingAddress,
				customerId: customer?._id,
				lastSyncedAt: now,
			});
			return { id: existing._id, isNew: false };
		}

		const id = await ctx.db.insert("wooOrders", {
			wcOrderId: args.wcOrderId,
			wcCustomerId: args.wcCustomerId,
			customerId: customer?._id,
			status: args.status,
			total: args.total,
			currency: args.currency,
			paymentMethod: args.paymentMethod,
			wcDateCreated: args.wcDateCreated,
			wcDatePaid: args.wcDatePaid,
			lineItems: args.lineItems,
			billingAddress: args.billingAddress,
			shippingAddress: args.shippingAddress,
			tenantId: DEFAULT_TENANT_ID,
			lastSyncedAt: now,
		});
		return { id, isNew: true };
	},
});

// ── Products ────────────────────────────────────────────────────────

export const upsertProduct = mutation({
	args: {
		wcProductId: v.number(),
		name: v.string(),
		slug: v.string(),
		type: v.string(),
		status: v.string(),
		price: v.string(),
		regularPrice: v.string(),
		description: v.optional(v.string()),
		shortDescription: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
		categories: v.string(),
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("wooProducts")
			.withIndex("by_wcProductId", (q) =>
				q.eq("wcProductId", args.wcProductId),
			)
			.first();

		const now = Date.now();

		if (existing) {
			await ctx.db.patch(existing._id, {
				name: args.name,
				slug: args.slug,
				type: args.type,
				status: args.status,
				price: args.price,
				regularPrice: args.regularPrice,
				description: args.description,
				shortDescription: args.shortDescription,
				imageUrl: args.imageUrl,
				categories: args.categories,
				lastSyncedAt: now,
			});
			return { id: existing._id, isNew: false };
		}

		const id = await ctx.db.insert("wooProducts", {
			wcProductId: args.wcProductId,
			name: args.name,
			slug: args.slug,
			type: args.type,
			status: args.status,
			price: args.price,
			regularPrice: args.regularPrice,
			description: args.description,
			shortDescription: args.shortDescription,
			imageUrl: args.imageUrl,
			categories: args.categories,
			tenantId: DEFAULT_TENANT_ID,
			lastSyncedAt: now,
		});
		return { id, isNew: true };
	},
});

// ── Sync State ──────────────────────────────────────────────────────

export const getSyncState = query({
	args: {
		entityType: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("wooSyncState")
			.withIndex("by_tenant_entity", (q) =>
				q.eq("tenantId", DEFAULT_TENANT_ID).eq("entityType", args.entityType),
			)
			.first();
	},
});

export const updateSyncState = mutation({
	args: {
		entityType: v.string(),
		lastSyncedAt: v.number(),
		lastWcModified: v.optional(v.string()),
		cursor: v.optional(v.number()),
		status: v.string(),
		errorMessage: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("wooSyncState")
			.withIndex("by_tenant_entity", (q) =>
				q.eq("tenantId", DEFAULT_TENANT_ID).eq("entityType", args.entityType),
			)
			.first();

		if (existing) {
			await ctx.db.patch(existing._id, {
				lastSyncedAt: args.lastSyncedAt,
				lastWcModified: args.lastWcModified,
				cursor: args.cursor,
				status: args.status,
				errorMessage: args.errorMessage,
			});
			return existing._id;
		}

		return await ctx.db.insert("wooSyncState", {
			entityType: args.entityType,
			lastSyncedAt: args.lastSyncedAt,
			lastWcModified: args.lastWcModified,
			cursor: args.cursor,
			status: args.status,
			errorMessage: args.errorMessage,
			tenantId: DEFAULT_TENANT_ID,
		});
	},
});
