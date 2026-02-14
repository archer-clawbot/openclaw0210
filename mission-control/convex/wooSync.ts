"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// ── WC API Helper ───────────────────────────────────────────────────

function getWcAuth() {
	const url = process.env.WC_API_URL;
	const key = process.env.WC_CONSUMER_KEY;
	const secret = process.env.WC_CONSUMER_SECRET;

	if (!url || !key || !secret) {
		throw new Error(
			"Missing WooCommerce env vars: WC_API_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET",
		);
	}

	const authHeader =
		"Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

	return { url, authHeader };
}

async function wcFetch(
	endpoint: string,
	params: Record<string, string> = {},
): Promise<{ data: any[]; totalPages: number }> {
	const { url, authHeader } = getWcAuth();

	const searchParams = new URLSearchParams(params);
	const fullUrl = `${url}/${endpoint}?${searchParams.toString()}`;

	const response = await fetch(fullUrl, {
		headers: { Authorization: authHeader },
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`WC API error ${response.status}: ${body}`);
	}

	const totalPages = parseInt(
		response.headers.get("X-WP-TotalPages") || "1",
		10,
	);
	const data = await response.json();

	return { data, totalPages };
}

// ── Transform WC responses into Convex mutation args ────────────────

function transformCustomer(wc: any) {
	return {
		wcCustomerId: wc.id as number,
		email: (wc.email || "") as string,
		firstName: (wc.first_name || "") as string,
		lastName: (wc.last_name || "") as string,
		company: (wc.billing?.company || undefined) as string | undefined,
		phone: (wc.billing?.phone || undefined) as string | undefined,
		avatarUrl: (wc.avatar_url || undefined) as string | undefined,
		wcDateCreated: (wc.date_created || new Date().toISOString()) as string,
		wcMeta: wc.meta_data?.length
			? JSON.stringify(wc.meta_data)
			: undefined,
	};
}

function transformOrder(wc: any) {
	return {
		wcOrderId: wc.id as number,
		wcCustomerId: (wc.customer_id || 0) as number,
		status: (wc.status || "pending") as string,
		total: (wc.total || "0.00") as string,
		currency: (wc.currency || "USD") as string,
		paymentMethod: (wc.payment_method_title || wc.payment_method || "") as string,
		wcDateCreated: (wc.date_created || new Date().toISOString()) as string,
		wcDatePaid: (wc.date_paid || undefined) as string | undefined,
		lineItems: JSON.stringify(
			(wc.line_items || []).map((li: any) => ({
				id: li.id,
				productId: li.product_id,
				name: li.name,
				quantity: li.quantity,
				total: li.total,
				sku: li.sku,
			})),
		),
		billingAddress: wc.billing
			? JSON.stringify(wc.billing)
			: undefined,
		shippingAddress: wc.shipping
			? JSON.stringify(wc.shipping)
			: undefined,
	};
}

function transformProduct(wc: any) {
	return {
		wcProductId: wc.id as number,
		name: (wc.name || "") as string,
		slug: (wc.slug || "") as string,
		type: (wc.type || "simple") as string,
		status: (wc.status || "publish") as string,
		price: (wc.price || "0.00") as string,
		regularPrice: (wc.regular_price || "0.00") as string,
		description: (wc.description || undefined) as string | undefined,
		shortDescription: (wc.short_description || undefined) as string | undefined,
		imageUrl: (wc.images?.[0]?.src || undefined) as string | undefined,
		categories: JSON.stringify(
			(wc.categories || []).map((c: any) => ({
				id: c.id,
				name: c.name,
				slug: c.slug,
			})),
		),
	};
}

// ── Sync Actions ────────────────────────────────────────────────────

export const syncCustomers = action({
	args: {
		modifiedAfter: v.optional(v.string()),
		page: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const params: Record<string, string> = {
			per_page: "100",
			page: String(args.page || 1),
			orderby: "registered_date",
			order: "asc",
		};
		if (args.modifiedAfter) {
			params.modified_after = args.modifiedAfter;
		}

		await ctx.runMutation(api.wooMutations.updateSyncState, {
			entityType: "customers",
			lastSyncedAt: Date.now(),
			status: "syncing",
			cursor: args.page || 1,
		});

		try {
			const { data, totalPages } = await wcFetch("customers", params);
			let upserted = 0;

			for (const wc of data) {
				await ctx.runMutation(
					api.wooMutations.upsertCustomer,
					transformCustomer(wc),
				);
				upserted++;
			}

			const currentPage = args.page || 1;
			const hasMore = currentPage < totalPages;

			await ctx.runMutation(api.wooMutations.updateSyncState, {
				entityType: "customers",
				lastSyncedAt: Date.now(),
				lastWcModified:
					data.length > 0
						? data[data.length - 1].date_modified
						: args.modifiedAfter,
				cursor: hasMore ? currentPage + 1 : undefined,
				status: hasMore ? "syncing" : "idle",
			});

			// Continue pagination if needed
			if (hasMore) {
				await ctx.scheduler.runAfter(0, api.wooSync.syncCustomers, {
					modifiedAfter: args.modifiedAfter,
					page: currentPage + 1,
				});
			}

			return { upserted, hasMore, page: currentPage, totalPages };
		} catch (error: any) {
			await ctx.runMutation(api.wooMutations.updateSyncState, {
				entityType: "customers",
				lastSyncedAt: Date.now(),
				status: "error",
				errorMessage: error.message,
			});
			throw error;
		}
	},
});

export const syncOrders = action({
	args: {
		modifiedAfter: v.optional(v.string()),
		page: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const params: Record<string, string> = {
			per_page: "100",
			page: String(args.page || 1),
			orderby: "date",
			order: "asc",
		};
		if (args.modifiedAfter) {
			params.modified_after = args.modifiedAfter;
		}

		await ctx.runMutation(api.wooMutations.updateSyncState, {
			entityType: "orders",
			lastSyncedAt: Date.now(),
			status: "syncing",
			cursor: args.page || 1,
		});

		try {
			const { data, totalPages } = await wcFetch("orders", params);
			let upserted = 0;

			for (const wc of data) {
				await ctx.runMutation(
					api.wooMutations.upsertOrder,
					transformOrder(wc),
				);
				upserted++;
			}

			const currentPage = args.page || 1;
			const hasMore = currentPage < totalPages;

			await ctx.runMutation(api.wooMutations.updateSyncState, {
				entityType: "orders",
				lastSyncedAt: Date.now(),
				lastWcModified:
					data.length > 0
						? data[data.length - 1].date_modified
						: args.modifiedAfter,
				cursor: hasMore ? currentPage + 1 : undefined,
				status: hasMore ? "syncing" : "idle",
			});

			if (hasMore) {
				await ctx.scheduler.runAfter(0, api.wooSync.syncOrders, {
					modifiedAfter: args.modifiedAfter,
					page: currentPage + 1,
				});
			}

			return { upserted, hasMore, page: currentPage, totalPages };
		} catch (error: any) {
			await ctx.runMutation(api.wooMutations.updateSyncState, {
				entityType: "orders",
				lastSyncedAt: Date.now(),
				status: "error",
				errorMessage: error.message,
			});
			throw error;
		}
	},
});

export const syncProducts = action({
	args: {
		modifiedAfter: v.optional(v.string()),
		page: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const params: Record<string, string> = {
			per_page: "100",
			page: String(args.page || 1),
			orderby: "date",
			order: "asc",
		};
		if (args.modifiedAfter) {
			params.modified_after = args.modifiedAfter;
		}

		await ctx.runMutation(api.wooMutations.updateSyncState, {
			entityType: "products",
			lastSyncedAt: Date.now(),
			status: "syncing",
			cursor: args.page || 1,
		});

		try {
			const { data, totalPages } = await wcFetch("products", params);
			let upserted = 0;

			for (const wc of data) {
				await ctx.runMutation(
					api.wooMutations.upsertProduct,
					transformProduct(wc),
				);
				upserted++;
			}

			const currentPage = args.page || 1;
			const hasMore = currentPage < totalPages;

			await ctx.runMutation(api.wooMutations.updateSyncState, {
				entityType: "products",
				lastSyncedAt: Date.now(),
				lastWcModified:
					data.length > 0
						? data[data.length - 1].date_modified
						: args.modifiedAfter,
				cursor: hasMore ? currentPage + 1 : undefined,
				status: hasMore ? "syncing" : "idle",
			});

			if (hasMore) {
				await ctx.scheduler.runAfter(0, api.wooSync.syncProducts, {
					modifiedAfter: args.modifiedAfter,
					page: currentPage + 1,
				});
			}

			return { upserted, hasMore, page: currentPage, totalPages };
		} catch (error: any) {
			await ctx.runMutation(api.wooMutations.updateSyncState, {
				entityType: "products",
				lastSyncedAt: Date.now(),
				status: "error",
				errorMessage: error.message,
			});
			throw error;
		}
	},
});

// ── Full Sync (all entities) ────────────────────────────────────────

export const syncAll = action({
	args: {
		fullResync: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const entities = ["customers", "orders", "products"] as const;

		for (const entityType of entities) {
			let modifiedAfter: string | undefined;

			if (!args.fullResync) {
				const syncState = await ctx.runQuery(
					api.wooMutations.getSyncState,
					{ entityType },
				);
				modifiedAfter = syncState?.lastWcModified ?? undefined;
			}

			const syncFn =
				entityType === "customers"
					? api.wooSync.syncCustomers
					: entityType === "orders"
						? api.wooSync.syncOrders
						: api.wooSync.syncProducts;

			// Schedule each sync as a separate action so they don't block each other
			await ctx.scheduler.runAfter(0, syncFn, {
				modifiedAfter,
				page: 1,
			});
		}

		return { scheduled: true };
	},
});
