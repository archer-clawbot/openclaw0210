import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ── Queries ─────────────────────────────────────────────────────────

export const queryTasks = query({
	args: {
		tenantId: v.string(),
		status: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("tasks")
			.withIndex("by_tenant_status", (q) =>
				q.eq("tenantId", args.tenantId).eq("status", args.status as any),
			)
			.collect();
	},
});

// ── Mutations ───────────────────────────────────────────────────────

export const dispatch = mutation({
	args: {
		taskId: v.id("tasks"),
		tenantId: v.string(),
		openclawRunId: v.string(),
	},
	handler: async (ctx, args) => {
		const task = await ctx.db.get(args.taskId);
		if (!task || task.tenantId !== args.tenantId) {
			throw new Error("Task not found");
		}
		// Idempotent: skip if already in_progress with same runId
		if (task.status === "in_progress" && task.openclawRunId === args.openclawRunId) {
			return { ok: true, skipped: true };
		}
		await ctx.db.patch(args.taskId, {
			status: "in_progress",
			openclawRunId: args.openclawRunId,
			dispatchedAt: Date.now(),
			attempts: (task.attempts ?? 0) + 1,
		});
		return { ok: true };
	},
});

export const complete = mutation({
	args: {
		taskId: v.id("tasks"),
		tenantId: v.string(),
		needsReview: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const task = await ctx.db.get(args.taskId);
		if (!task || task.tenantId !== args.tenantId) {
			throw new Error("Task not found");
		}
		// Idempotent: skip if already done/review
		if (task.status === "done" || task.status === "review") {
			return { ok: true, skipped: true };
		}
		const status = args.needsReview ? "review" : "done";
		await ctx.db.patch(args.taskId, {
			status,
			completedAt: Date.now(),
		});
		return { ok: true, status };
	},
});

export const fail = mutation({
	args: {
		taskId: v.id("tasks"),
		tenantId: v.string(),
		error: v.string(),
	},
	handler: async (ctx, args) => {
		const task = await ctx.db.get(args.taskId);
		if (!task || task.tenantId !== args.tenantId) {
			throw new Error("Task not found");
		}
		const attempts = task.attempts ?? 0;
		const maxAttempts = task.maxAttempts ?? 3;
		const blocked = attempts >= maxAttempts;
		await ctx.db.patch(args.taskId, {
			status: blocked ? "review" : "assigned",
			lastError: args.error,
			tags: blocked ? [...(task.tags || []), "blocked"] : task.tags,
		});
		return { ok: true, blocked, attempts };
	},
});

export const createTask = mutation({
	args: {
		tenantId: v.string(),
		title: v.string(),
		description: v.string(),
		agentId: v.optional(v.string()),
		clientSlug: v.optional(v.string()),
		status: v.optional(v.string()),
		tags: v.optional(v.array(v.string())),
		priority: v.optional(v.string()),
		phase: v.optional(v.string()),
		chainFrom: v.optional(v.id("tasks")),
		maxAttempts: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const taskId = await ctx.db.insert("tasks", {
			title: args.title,
			description: args.description,
			status: (args.status ?? "assigned") as any,
			assigneeIds: [],
			tags: args.tags ?? [],
			tenantId: args.tenantId,
			agentId: args.agentId,
			clientSlug: args.clientSlug,
			priority: args.priority as any,
			phase: args.phase,
			chainFrom: args.chainFrom,
			maxAttempts: args.maxAttempts ?? 3,
			attempts: 0,
		});
		return taskId;
	},
});

export const promote = mutation({
	args: {
		tenantId: v.string(),
		fromStatus: v.string(),
		toStatus: v.string(),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query("tasks")
			.withIndex("by_tenant_status", (q) =>
				q.eq("tenantId", args.tenantId).eq("status", args.fromStatus as any),
			)
			.collect();
		const toPromote = tasks.slice(0, args.limit ?? tasks.length);
		for (const task of toPromote) {
			await ctx.db.patch(task._id, { status: args.toStatus as any });
		}
		return { promoted: toPromote.length };
	},
});
