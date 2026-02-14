import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
	...authTables,
	agents: defineTable({
		name: v.string(),
		role: v.string(),
		status: v.union(
			v.literal("idle"),
			v.literal("active"),
			v.literal("blocked"),
		),
		level: v.union(v.literal("LEAD"), v.literal("INT"), v.literal("SPC")),
		avatar: v.string(),
		currentTaskId: v.optional(v.id("tasks")),
		sessionKey: v.optional(v.string()),
		systemPrompt: v.optional(v.string()),
		character: v.optional(v.string()),
		lore: v.optional(v.string()),
		orgId: v.optional(v.string()),
		workspaceId: v.optional(v.string()),
		tenantId: v.optional(v.string()),
	}).index("by_tenant", ["tenantId"]),
	tasks: defineTable({
		title: v.string(),
		description: v.string(),
		status: v.union(
			v.literal("inbox"),
			v.literal("assigned"),
			v.literal("in_progress"),
			v.literal("review"),
			v.literal("done"),
			v.literal("archived"),
		),
		assigneeIds: v.array(v.id("agents")),
		tags: v.array(v.string()),
		borderColor: v.optional(v.string()),
		sessionKey: v.optional(v.string()),
		openclawRunId: v.optional(v.string()),
		startedAt: v.optional(v.number()),
		usedCodingTools: v.optional(v.boolean()),
		orgId: v.optional(v.string()),
		workspaceId: v.optional(v.string()),
		tenantId: v.optional(v.string()),
		// Dispatcher fields
		agentId: v.optional(v.string()),
		clientSlug: v.optional(v.string()),
		priority: v.optional(v.union(
			v.literal("critical"),
			v.literal("high"),
			v.literal("medium"),
			v.literal("low"),
		)),
		phase: v.optional(v.string()),
		attempts: v.optional(v.number()),
		maxAttempts: v.optional(v.number()),
		lastError: v.optional(v.string()),
		dispatchedAt: v.optional(v.number()),
		completedAt: v.optional(v.number()),
		chainFrom: v.optional(v.id("tasks")),
		// WooCommerce deliverable link
		deliverableId: v.optional(v.id("wooDeliverables")),
		// Cost observatory fields
		inputTokens: v.optional(v.number()),
		outputTokens: v.optional(v.number()),
		cacheReadTokens: v.optional(v.number()),
		cacheWriteTokens: v.optional(v.number()),
		totalCost: v.optional(v.number()),
	})
		.index("by_tenant", ["tenantId"])
		.index("by_tenant_status", ["tenantId", "status"])
		.index("by_tenant_agent", ["tenantId", "agentId"]),
	messages: defineTable({
		taskId: v.id("tasks"),
		fromAgentId: v.id("agents"),
		content: v.string(),
		attachments: v.array(v.id("documents")),
		orgId: v.optional(v.string()),
		workspaceId: v.optional(v.string()),
		tenantId: v.optional(v.string()),
	})
		.index("by_tenant", ["tenantId"])
		.index("by_tenant_task", ["tenantId", "taskId"]),
	activities: defineTable({
		type: v.string(),
		agentId: v.id("agents"),
		message: v.string(),
		targetId: v.optional(v.id("tasks")),
		orgId: v.optional(v.string()),
		workspaceId: v.optional(v.string()),
		tenantId: v.optional(v.string()),
	})
		.index("by_tenant", ["tenantId"])
		.index("by_tenant_target", ["tenantId", "targetId"]),
	documents: defineTable({
		title: v.string(),
		content: v.string(),
		type: v.string(),
		path: v.optional(v.string()),
		taskId: v.optional(v.id("tasks")),
		createdByAgentId: v.optional(v.id("agents")),
		messageId: v.optional(v.id("messages")),
		orgId: v.optional(v.string()),
		workspaceId: v.optional(v.string()),
		tenantId: v.optional(v.string()),
	})
		.index("by_tenant", ["tenantId"])
		.index("by_tenant_task", ["tenantId", "taskId"]),
	notifications: defineTable({
		mentionedAgentId: v.id("agents"),
		content: v.string(),
		delivered: v.boolean(),
		orgId: v.optional(v.string()),
		workspaceId: v.optional(v.string()),
		tenantId: v.optional(v.string()),
	}),
	apiTokens: defineTable({
		tokenHash: v.string(),
		tokenPrefix: v.string(),
		tenantId: v.optional(v.string()),
		orgId: v.optional(v.string()),
		name: v.optional(v.string()),
		createdAt: v.number(),
		lastUsedAt: v.optional(v.number()),
		revokedAt: v.optional(v.number()),
	})
		.index("by_tokenHash", ["tokenHash"])
		.index("by_tenant", ["tenantId"]),
	tenantSettings: defineTable({
		tenantId: v.string(),
		retentionDays: v.number(),
		onboardingCompletedAt: v.optional(v.number()),
		createdAt: v.number(),
		updatedAt: v.number(),
	}).index("by_tenant", ["tenantId"]),
	rateLimits: defineTable({
		tenantId: v.optional(v.string()),
		orgId: v.optional(v.string()),
		windowStartMs: v.number(),
		count: v.number(),
	}).index("by_tenant", ["tenantId"]),

	// ── WooCommerce Integration ──────────────────────────────────────

	wooCustomers: defineTable({
		wcCustomerId: v.number(),
		email: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		company: v.optional(v.string()),
		phone: v.optional(v.string()),
		avatarUrl: v.optional(v.string()),
		wcDateCreated: v.string(),
		wcMeta: v.optional(v.string()),
		tenantId: v.optional(v.string()),
		lastSyncedAt: v.number(),
	})
		.index("by_tenant", ["tenantId"])
		.index("by_wcCustomerId", ["wcCustomerId"])
		.index("by_email", ["email"]),

	wooOrders: defineTable({
		wcOrderId: v.number(),
		wcCustomerId: v.number(),
		customerId: v.optional(v.id("wooCustomers")),
		status: v.string(),
		total: v.string(),
		currency: v.string(),
		paymentMethod: v.string(),
		wcDateCreated: v.string(),
		wcDatePaid: v.optional(v.string()),
		lineItems: v.string(),
		billingAddress: v.optional(v.string()),
		shippingAddress: v.optional(v.string()),
		tenantId: v.optional(v.string()),
		lastSyncedAt: v.number(),
	})
		.index("by_tenant", ["tenantId"])
		.index("by_wcOrderId", ["wcOrderId"])
		.index("by_customerId", ["customerId"])
		.index("by_tenant_status", ["tenantId", "status"]),

	wooProducts: defineTable({
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
		tenantId: v.optional(v.string()),
		lastSyncedAt: v.number(),
	})
		.index("by_tenant", ["tenantId"])
		.index("by_wcProductId", ["wcProductId"]),

	wooSyncState: defineTable({
		entityType: v.string(),
		lastSyncedAt: v.number(),
		lastWcModified: v.optional(v.string()),
		cursor: v.optional(v.number()),
		status: v.string(),
		errorMessage: v.optional(v.string()),
		tenantId: v.optional(v.string()),
	}).index("by_tenant_entity", ["tenantId", "entityType"]),

	// ── Package Configuration ────────────────────────────────────────

	wooPackageConfigs: defineTable({
		customerId: v.id("wooCustomers"),
		wcOrderId: v.number(),
		name: v.string(),
		status: v.string(),
		billingCycleDay: v.number(),
		startDate: v.string(),
		currentCycleNumber: v.number(),
		tenantId: v.optional(v.string()),
		notes: v.optional(v.string()),
		lastGeneratedCycle: v.optional(v.number()),
	})
		.index("by_customerId", ["customerId"])
		.index("by_tenant", ["tenantId"])
		.index("by_status", ["status"]),

	wooPackageItems: defineTable({
		packageConfigId: v.id("wooPackageConfigs"),
		wcProductId: v.optional(v.number()),
		itemType: v.string(),
		label: v.string(),
		frequency: v.string(),
		quantity: v.number(),
		quantityUnit: v.optional(v.string()),
		completedCycles: v.optional(v.string()),
		tenantId: v.optional(v.string()),
		notes: v.optional(v.string()),
	})
		.index("by_packageConfigId", ["packageConfigId"])
		.index("by_tenant", ["tenantId"]),

	wooDeliverables: defineTable({
		packageConfigId: v.optional(v.id("wooPackageConfigs")),
		packageItemId: v.optional(v.id("wooPackageItems")),
		orderId: v.optional(v.id("wooOrders")),
		customerId: v.id("wooCustomers"),
		wcOrderId: v.optional(v.number()),
		wcProductId: v.optional(v.number()),
		cycleNumber: v.optional(v.number()),
		title: v.string(),
		itemType: v.string(),
		status: v.string(),
		quantity: v.optional(v.number()),
		quantityDelivered: v.optional(v.number()),
		deliveredAt: v.optional(v.number()),
		dueDate: v.optional(v.string()),
		documentIds: v.optional(v.string()),
		downloadUrls: v.optional(v.string()),
		notes: v.optional(v.string()),
		emailSentAt: v.optional(v.number()),
		tenantId: v.optional(v.string()),
	})
		.index("by_customerId", ["customerId"])
		.index("by_packageConfigId", ["packageConfigId"])
		.index("by_tenant_status", ["tenantId", "status"])
		.index("by_customerId_cycleNumber", ["customerId", "cycleNumber"])
		.index("by_itemType", ["itemType"]),

	// ── Customer Portal Auth ─────────────────────────────────────────

	customerPortalUsers: defineTable({
		userId: v.string(),
		customerId: v.id("wooCustomers"),
		wcCustomerId: v.number(),
		role: v.string(),
		tenantId: v.optional(v.string()),
	})
		.index("by_userId", ["userId"])
		.index("by_customerId", ["customerId"])
		.index("by_wcCustomerId", ["wcCustomerId"]),
});
