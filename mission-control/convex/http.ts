import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { auth } from "./auth";
import { handleWebhook } from "./wooWebhook";

const http = httpRouter();

auth.addHttpRoutes(http);

// ── WooCommerce webhook endpoint ─────────────────────────────────
http.route({
	path: "/woo/webhook",
	method: "POST",
	handler: handleWebhook,
});

// ── OpenClaw webhook endpoint ─────────────────────────────────────
http.route({
	path: "/openclaw/event",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		await ctx.runMutation(api.openclaw.receiveAgentEvent, body);
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

// ── Dispatcher HTTP routes ────────────────────────────────────────

// Query tasks by tenant + status
http.route({
	path: "/dispatcher/tasks/query",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const result = await ctx.runQuery(api.dispatcher.queryTasks, {
			tenantId: body.tenantId,
			status: body.status,
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

// Mark task as dispatched with runId
http.route({
	path: "/dispatcher/tasks/dispatch",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const result = await ctx.runMutation(api.dispatcher.dispatch, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			openclawRunId: body.openclawRunId,
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

// Mark task as completed or needs review
http.route({
	path: "/dispatcher/tasks/complete",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const result = await ctx.runMutation(api.dispatcher.complete, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			needsReview: body.needsReview,
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

// Mark task as failed
http.route({
	path: "/dispatcher/tasks/fail",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const result = await ctx.runMutation(api.dispatcher.fail, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			error: body.error,
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

// Create a new task
http.route({
	path: "/dispatcher/tasks/create",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const taskId = await ctx.runMutation(api.dispatcher.createTask, body);
		return new Response(JSON.stringify({ ok: true, taskId }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

// Record token usage + cost for a completed task
http.route({
	path: "/dispatcher/tasks/usage",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const result = await ctx.runMutation(api.dispatcher.recordUsage, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			inputTokens: body.inputTokens,
			outputTokens: body.outputTokens,
			cacheReadTokens: body.cacheReadTokens,
			cacheWriteTokens: body.cacheWriteTokens,
			totalCost: body.totalCost,
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

// Promote tasks from one status to another
http.route({
	path: "/dispatcher/tasks/promote",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const result = await ctx.runMutation(api.dispatcher.promote, {
			tenantId: body.tenantId,
			fromStatus: body.fromStatus,
			toStatus: body.toStatus,
			limit: body.limit,
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}),
});

export default http;
