import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";

const DEFAULT_TENANT_ID = "default";

// ═══════════════════════════════════════════════════════════════
// STATUS STATE MACHINE
// ═══════════════════════════════════════════════════════════════

const VALID_TRANSITIONS: Record<string, string[]> = {
	queued: ["in_progress", "cancelled"],
	in_progress: ["completed", "failed", "cancelled"],
	completed: ["delivered", "failed"],
	failed: ["queued"], // only via retry
	delivered: [], // terminal
	cancelled: [], // terminal
};

function validateTransition(current: string, next: string): boolean {
	return VALID_TRANSITIONS[current]?.includes(next) ?? false;
}

// ═══════════════════════════════════════════════════════════════
// CREATE DELIVERABLE (Pipeline Path)
// ═══════════════════════════════════════════════════════════════

export const createPipelineDeliverable = mutation({
	args: {
		sku: v.string(),
		customerName: v.string(),
		domain: v.optional(v.string()),
		vertical: v.optional(v.string()),
		metro: v.optional(v.string()),
		customerEmail: v.optional(v.string()),
		source: v.union(
			v.literal("purchase"),
			v.literal("prospecting"),
			v.literal("manual"),
			v.literal("system"),
		),
		requestChannel: v.optional(
			v.union(
				v.literal("woocommerce"),
				v.literal("slack"),
				v.literal("telegram"),
				v.literal("api"),
				v.literal("system"),
			),
		),
		requestNotes: v.optional(v.string()),
		wcOrderId: v.optional(v.number()),
		wcOrderNumber: v.optional(v.string()),
		price: v.optional(v.number()),
		pipelinePhase: v.optional(v.string()),
		meta: v.optional(v.any()),
		customerId: v.optional(v.id("wooCustomers")),
		orderId: v.optional(v.id("wooOrders")),
	},
	handler: async (ctx, args) => {
		// Look up SKU in product catalog
		const product = await ctx.db
			.query("pipelineProductCatalog")
			.withIndex("by_sku", (q) => q.eq("sku", args.sku))
			.first();

		if (!product) {
			throw new Error(`Unknown SKU: ${args.sku}`);
		}

		// Generate sequential DEL-XXXXX display ID
		const all = await ctx.db.query("wooDeliverables").collect();
		let maxNum = 0;
		for (const d of all) {
			const match = d.deliverableDisplayId?.match(/DEL-(\d+)/);
			if (match) {
				const num = parseInt(match[1], 10);
				if (num > maxNum) maxNum = num;
			}
		}
		const displayId = `DEL-${String(maxNum + 1).padStart(5, "0")}`;

		const now = Date.now();

		const id = await ctx.db.insert("wooDeliverables", {
			// Display ID
			deliverableDisplayId: displayId,

			// Required existing fields — populated from catalog/args
			title: product.name,
			itemType: args.sku,
			status: "queued",

			// From catalog lookup
			sku: args.sku,
			assignedAgent: product.fulfillmentAgent,
			modelTier: product.modelTier,

			// From args
			customerName: args.customerName,
			customerEmail: args.customerEmail,
			domain: args.domain,
			vertical: args.vertical,
			metro: args.metro,
			source: args.source,
			requestChannel: args.requestChannel || "api",
			requestNotes: args.requestNotes,
			wcOrderId: args.wcOrderId,
			wcOrderNumber: args.wcOrderNumber,
			price:
				args.price ??
				(args.source === "purchase" ? product.defaultPrice : undefined),
			pipelinePhase: args.pipelinePhase,
			meta: args.meta,
			customerId: args.customerId,
			orderId: args.orderId,

			// Defaults
			retryCount: 0,
			maxRetries: 2,
			tenantId: DEFAULT_TENANT_ID,

			// Timestamps
			createdAt: now,
		});

		// Log creation event
		await ctx.db.insert("pipelineDeliverableLog", {
			deliverableId: id,
			eventType: "created",
			message:
				args.source === "purchase"
					? `Created from WooCommerce order ${args.wcOrderNumber}`
					: args.source === "manual"
						? `Created from ${args.requestChannel} request: ${args.requestNotes?.substring(0, 100)}`
						: `Created via ${args.source} pipeline`,
			actor: "system",
			tenantId: DEFAULT_TENANT_ID,
		});

		return { id, displayId, assignedAgent: product.fulfillmentAgent };
	},
});

// ═══════════════════════════════════════════════════════════════
// UPDATE STATUS (with state machine enforcement)
// ═══════════════════════════════════════════════════════════════

export const updatePipelineStatus = mutation({
	args: {
		id: v.id("wooDeliverables"),
		status: v.string(),
		actor: v.optional(v.string()),
		errorMessage: v.optional(v.string()),
		healthScore: v.optional(v.number()),
		actionItemsCount: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const deliverable = await ctx.db.get(args.id);
		if (!deliverable) throw new Error("Deliverable not found");

		const currentStatus = deliverable.status;
		if (!validateTransition(currentStatus, args.status)) {
			throw new Error(
				`Invalid status transition: ${currentStatus} → ${args.status}. ` +
					`Valid transitions from ${currentStatus}: ${VALID_TRANSITIONS[currentStatus]?.join(", ") || "none"}`,
			);
		}

		const now = Date.now();
		const patch: Record<string, unknown> = { status: args.status };

		// Set timestamps based on new status
		switch (args.status) {
			case "in_progress":
				patch.startedAt = now;
				break;
			case "completed":
				patch.completedAt = now;
				break;
			case "delivered":
				patch.deliveredAt = now;
				patch.nextReauditAt = now + 30 * 24 * 60 * 60 * 1000; // +30 days
				break;
			case "failed":
				patch.failedAt = now;
				if (args.errorMessage) patch.errorMessage = args.errorMessage;
				break;
		}

		// Optional audit fields
		if (args.healthScore !== undefined) patch.healthScore = args.healthScore;
		if (args.actionItemsCount !== undefined)
			patch.actionItemsCount = args.actionItemsCount;

		await ctx.db.patch(args.id, patch);

		// Log status change
		await ctx.db.insert("pipelineDeliverableLog", {
			deliverableId: args.id,
			eventType: "status_change",
			oldValue: currentStatus,
			newValue: args.status,
			message: args.errorMessage || undefined,
			actor: args.actor || "system",
			tenantId: DEFAULT_TENANT_ID,
		});

		// If delivered + purchase + has customer email → trigger delivery email
		if (
			args.status === "delivered" &&
			deliverable.source === "purchase" &&
			deliverable.customerEmail
		) {
			await ctx.scheduler.runAfter(
				0,
				internal.pipelineEmail.sendDeliveryEmail,
				{
					deliverableId: args.id,
				},
			);
		}

		return args.id;
	},
});

// ═══════════════════════════════════════════════════════════════
// RETRY FAILED DELIVERABLE
// ═══════════════════════════════════════════════════════════════

export const retryDeliverable = mutation({
	args: {
		id: v.id("wooDeliverables"),
	},
	handler: async (ctx, args) => {
		const deliverable = await ctx.db.get(args.id);
		if (!deliverable) throw new Error("Deliverable not found");
		if (deliverable.status !== "failed") {
			throw new Error("Can only retry failed deliverables");
		}

		const retryCount = (deliverable.retryCount || 0) + 1;
		const maxRetries = deliverable.maxRetries || 2;

		if (retryCount > maxRetries) {
			throw new Error(
				`Max retries (${maxRetries}) exceeded for this deliverable`,
			);
		}

		await ctx.db.patch(args.id, {
			status: "queued",
			retryCount,
			errorMessage: undefined,
			failedAt: undefined,
		});

		await ctx.db.insert("pipelineDeliverableLog", {
			deliverableId: args.id,
			eventType: "retry",
			message: `Retry ${retryCount}/${maxRetries}`,
			actor: "system",
			tenantId: DEFAULT_TENANT_ID,
		});

		return args.id;
	},
});

// ═══════════════════════════════════════════════════════════════
// UPDATE DELIVERABLE (general patch)
// ═══════════════════════════════════════════════════════════════

export const updatePipelineDeliverable = mutation({
	args: {
		id: v.id("wooDeliverables"),
		pipelinePhase: v.optional(v.string()),
		assignedAgent: v.optional(v.string()),
		modelTier: v.optional(v.string()),
		healthScore: v.optional(v.number()),
		actionItemsCount: v.optional(v.number()),
		fileUrl: v.optional(v.string()),
		filePath: v.optional(v.string()),
		fileSizeBytes: v.optional(v.number()),
		fileType: v.optional(v.string()),
		meta: v.optional(v.any()),
		actor: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, actor, ...updates } = args;
		const patch: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(updates)) {
			if (value !== undefined) patch[key] = value;
		}
		if (Object.keys(patch).length > 0) {
			await ctx.db.patch(id, patch);
		}
		return id;
	},
});

// ═══════════════════════════════════════════════════════════════
// ADD LOG ENTRY (without status change)
// ═══════════════════════════════════════════════════════════════

export const addDeliverableLog = mutation({
	args: {
		deliverableId: v.id("wooDeliverables"),
		eventType: v.union(
			v.literal("note"),
			v.literal("file_uploaded"),
			v.literal("reaudit_scheduled"),
			v.literal("error"),
		),
		message: v.string(),
		actor: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("pipelineDeliverableLog", {
			deliverableId: args.deliverableId,
			eventType: args.eventType,
			message: args.message,
			actor: args.actor || "system",
			tenantId: DEFAULT_TENANT_ID,
		});
	},
});

// ═══════════════════════════════════════════════════════════════
// BACKFILL: Set source="package" on legacy deliverables
// ═══════════════════════════════════════════════════════════════

export const backfillSource = mutation({
	handler: async (ctx) => {
		const all = await ctx.db.query("wooDeliverables").collect();
		let patched = 0;
		for (const d of all) {
			if (!d.source) {
				await ctx.db.patch(d._id, { source: "package" });
				patched++;
			}
		}
		return { patched };
	},
});
