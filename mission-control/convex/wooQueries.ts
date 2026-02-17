import { v } from "convex/values";
import { query } from "./_generated/server";

const DEFAULT_TENANT_ID = "default";

// ── Customer Queries ────────────────────────────────────────────────

export const getCustomerByWcId = query({
	args: { wcCustomerId: v.number() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("wooCustomers")
			.withIndex("by_wcCustomerId", (q) =>
				q.eq("wcCustomerId", args.wcCustomerId),
			)
			.first();
	},
});

export const getCustomerByEmail = query({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("wooCustomers")
			.withIndex("by_email", (q) => q.eq("email", args.email))
			.first();
	},
});

export const listCustomers = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query("wooCustomers")
			.withIndex("by_tenant", (q) => q.eq("tenantId", DEFAULT_TENANT_ID))
			.collect();
	},
});

// ── Order Queries ───────────────────────────────────────────────────

export const listOrdersByCustomer = query({
	args: { customerId: v.id("wooCustomers") },
	handler: async (ctx, args) => {
		const orders = await ctx.db
			.query("wooOrders")
			.withIndex("by_customerId", (q) =>
				q.eq("customerId", args.customerId),
			)
			.collect();

		// Sort newest first
		orders.sort((a, b) => b._creationTime - a._creationTime);
		return orders;
	},
});

export const getOrder = query({
	args: { wcOrderId: v.number() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("wooOrders")
			.withIndex("by_wcOrderId", (q) =>
				q.eq("wcOrderId", args.wcOrderId),
			)
			.first();
	},
});

export const listAllOrders = query({
	args: {
		status: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let ordersQuery = ctx.db
			.query("wooOrders")
			.withIndex("by_tenant", (q) => q.eq("tenantId", DEFAULT_TENANT_ID));

		const orders = await ordersQuery.collect();

		const filtered = args.status
			? orders.filter((o) => o.status === args.status)
			: orders;

		filtered.sort((a, b) => b._creationTime - a._creationTime);

		// Join with customer info
		return await Promise.all(
			filtered.map(async (order) => {
				const customer = order.customerId
					? await ctx.db.get(order.customerId)
					: null;
				return {
					...order,
					customerName: customer
						? `${customer.firstName} ${customer.lastName}`.trim()
						: "Guest",
					customerEmail: customer?.email ?? null,
				};
			}),
		);
	},
});

// ── Product Queries ─────────────────────────────────────────────────

export const listProducts = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query("wooProducts")
			.withIndex("by_tenant", (q) => q.eq("tenantId", DEFAULT_TENANT_ID))
			.collect();
	},
});

export const getProduct = query({
	args: { wcProductId: v.number() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("wooProducts")
			.withIndex("by_wcProductId", (q) =>
				q.eq("wcProductId", args.wcProductId),
			)
			.first();
	},
});

// ── Deliverable Queries ─────────────────────────────────────────────

export const listDeliverablesByCustomer = query({
	args: {
		customerId: v.id("wooCustomers"),
		itemType: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let deliverables = await ctx.db
			.query("wooDeliverables")
			.withIndex("by_customerId", (q) =>
				q.eq("customerId", args.customerId),
			)
			.collect();

		if (args.itemType) {
			deliverables = deliverables.filter(
				(d) => d.itemType === args.itemType,
			);
		}

		// Sort by cycle number desc, then by creation time desc
		deliverables.sort((a, b) => {
			const cycleDiff = (b.cycleNumber ?? 0) - (a.cycleNumber ?? 0);
			if (cycleDiff !== 0) return cycleDiff;
			return b._creationTime - a._creationTime;
		});

		return deliverables;
	},
});

export const listDeliverablesByCycle = query({
	args: {
		customerId: v.id("wooCustomers"),
		cycleNumber: v.number(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("wooDeliverables")
			.withIndex("by_customerId_cycleNumber", (q) =>
				q.eq("customerId", args.customerId).eq("cycleNumber", args.cycleNumber),
			)
			.collect();
	},
});

export const getDeliverable = query({
	args: { id: v.id("wooDeliverables") },
	handler: async (ctx, args) => {
		const deliverable = await ctx.db.get(args.id);
		if (!deliverable) return null;

		// Join with customer
		const customer = deliverable.customerId
			? await ctx.db.get(deliverable.customerId)
			: null;

		// Join with package config if present
		const packageConfig = deliverable.packageConfigId
			? await ctx.db.get(deliverable.packageConfigId)
			: null;

		return {
			...deliverable,
			customerName: customer
				? `${customer.firstName} ${customer.lastName}`.trim()
				: deliverable.customerName ?? "Unknown",
			customerEmail: customer?.email ?? deliverable.customerEmail ?? null,
			packageName: packageConfig?.name ?? null,
		};
	},
});

export const listAllDeliverables = query({
	args: {
		status: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let deliverables;
		if (args.status) {
			deliverables = await ctx.db
				.query("wooDeliverables")
				.withIndex("by_tenant_status", (q) =>
					q.eq("tenantId", DEFAULT_TENANT_ID).eq("status", args.status!),
				)
				.collect();
		} else {
			deliverables = await ctx.db
				.query("wooDeliverables")
				.withIndex("by_tenant_status", (q) =>
					q.eq("tenantId", DEFAULT_TENANT_ID),
				)
				.collect();
		}

		deliverables.sort((a, b) => b._creationTime - a._creationTime);

		// Join with customer info
		return await Promise.all(
			deliverables.map(async (d) => {
				const customer = d.customerId
					? await ctx.db.get(d.customerId)
					: null;
				return {
					...d,
					customerName: customer
						? `${customer.firstName} ${customer.lastName}`.trim()
						: d.customerName ?? "Unknown",
					customerEmail: customer?.email ?? d.customerEmail ?? null,
				};
			}),
		);
	},
});

// ── Package Queries ─────────────────────────────────────────────────

export const listPackageConfigs = query({
	args: {
		customerId: v.optional(v.id("wooCustomers")),
	},
	handler: async (ctx, args) => {
		if (args.customerId) {
			return await ctx.db
				.query("wooPackageConfigs")
				.withIndex("by_customerId", (q) =>
					q.eq("customerId", args.customerId!),
				)
				.collect();
		}
		return await ctx.db
			.query("wooPackageConfigs")
			.withIndex("by_tenant", (q) => q.eq("tenantId", DEFAULT_TENANT_ID))
			.collect();
	},
});

export const getPackageConfig = query({
	args: { id: v.id("wooPackageConfigs") },
	handler: async (ctx, args) => {
		const config = await ctx.db.get(args.id);
		if (!config) return null;

		const customer = await ctx.db.get(config.customerId);
		const items = await ctx.db
			.query("wooPackageItems")
			.withIndex("by_packageConfigId", (q) =>
				q.eq("packageConfigId", args.id),
			)
			.collect();

		return {
			...config,
			customerName: customer
				? `${customer.firstName} ${customer.lastName}`.trim()
				: "Unknown",
			customerEmail: customer?.email ?? null,
			items,
		};
	},
});

// ── Linked Tasks Queries ────────────────────────────────────────────

export const listTasksByDeliverable = query({
	args: { deliverableId: v.id("wooDeliverables") },
	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query("tasks")
			.withIndex("by_deliverableId", (q) =>
				q.eq("deliverableId", args.deliverableId),
			)
			.collect();

		tasks.sort((a, b) => b._creationTime - a._creationTime);
		return tasks;
	},
});

// ── Sync State Queries ──────────────────────────────────────────────

export const listSyncStates = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query("wooSyncState")
			.withIndex("by_tenant_entity", (q) =>
				q.eq("tenantId", DEFAULT_TENANT_ID),
			)
			.collect();
	},
});

// ── Portal User Queries ─────────────────────────────────────────────

export const getPortalUser = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("customerPortalUsers")
			.withIndex("by_userId", (q) => q.eq("userId", args.userId))
			.first();
	},
});
