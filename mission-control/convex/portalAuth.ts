import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const DEFAULT_TENANT_ID = "default";

// ── Role Resolution ─────────────────────────────────────────────────

/**
 * Check if the current authenticated user is a portal customer.
 * Returns their portal user record + customer data if they are,
 * or null if they're an admin (no portal user record).
 */
export const resolveRole = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return { authenticated: false, role: null };

		const portalUser = await ctx.db
			.query("customerPortalUsers")
			.withIndex("by_userId", (q) => q.eq("userId", userId))
			.first();

		if (portalUser) {
			const customer = await ctx.db.get(portalUser.customerId);
			return {
				authenticated: true,
				role: "client" as const,
				userId,
				portalUser,
				customer: customer
					? {
							id: customer._id,
							email: customer.email,
							firstName: customer.firstName,
							lastName: customer.lastName,
							company: customer.company,
						}
					: null,
			};
		}

		return {
			authenticated: true,
			role: "admin" as const,
			userId,
			portalUser: null,
			customer: null,
		};
	},
});

// ── Customer Account Creation ───────────────────────────────────────

/**
 * Link a Convex auth user to a WooCommerce customer.
 * Called after a customer account is created via the Password provider.
 */
export const linkCustomerToUser = mutation({
	args: {
		userId: v.string(),
		customerId: v.id("wooCustomers"),
		wcCustomerId: v.number(),
	},
	handler: async (ctx, args) => {
		// Check if already linked
		const existing = await ctx.db
			.query("customerPortalUsers")
			.withIndex("by_userId", (q) => q.eq("userId", args.userId))
			.first();

		if (existing) {
			return { id: existing._id, alreadyLinked: true };
		}

		const id = await ctx.db.insert("customerPortalUsers", {
			userId: args.userId,
			customerId: args.customerId,
			wcCustomerId: args.wcCustomerId,
			role: "client",
			tenantId: DEFAULT_TENANT_ID,
		});

		return { id, alreadyLinked: false };
	},
});

/**
 * Admin-only: list all portal users with their customer info.
 */
export const listPortalUsers = query({
	args: {},
	handler: async (ctx) => {
		const portalUsers = await ctx.db
			.query("customerPortalUsers")
			.collect();

		return await Promise.all(
			portalUsers.map(async (pu) => {
				const customer = await ctx.db.get(pu.customerId);
				return {
					...pu,
					customerName: customer
						? `${customer.firstName} ${customer.lastName}`.trim()
						: "Unknown",
					customerEmail: customer?.email ?? null,
				};
			}),
		);
	},
});
