import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { auth } from "./auth";
import { handleWebhook } from "./wooWebhook";

const http = httpRouter();

auth.addHttpRoutes(http);

// ── Auth Middleware ───────────────────────────────────────────────

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

/**
 * Verify Bearer token from Authorization header.
 * Returns token info on success, or a 401/403 Response on failure.
 */
async function verifyApiToken(
	ctx: any,
	request: Request,
): Promise<{ tenantId?: string; name?: string; tokenHash: string } | Response> {
	const authHeader = request.headers.get("Authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return new Response(
			JSON.stringify({ error: "Missing Authorization header" }),
			{ status: 401, headers: JSON_HEADERS },
		);
	}

	const rawToken = authHeader.slice(7);
	if (!rawToken) {
		return new Response(
			JSON.stringify({ error: "Empty bearer token" }),
			{ status: 401, headers: JSON_HEADERS },
		);
	}

	// Hash the raw token to look it up
	const encoder = new TextEncoder();
	const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(rawToken));
	const tokenHash = Array.from(new Uint8Array(hashBuffer), (b) =>
		b.toString(16).padStart(2, "0"),
	).join("");

	const tokenInfo = await ctx.runQuery(api.apiTokens.verifyToken, { tokenHash });
	if (!tokenInfo) {
		return new Response(
			JSON.stringify({ error: "Invalid or revoked token" }),
			{ status: 403, headers: JSON_HEADERS },
		);
	}

	// Fire-and-forget: update lastUsedAt
	void ctx.runMutation(api.apiTokens.touchToken, { tokenHash });

	return { ...tokenInfo, tokenHash };
}

/** Helper to create an authenticated dispatcher route handler. */
function authedHandler(
	fn: (ctx: any, body: any) => Promise<any>,
) {
	return httpAction(async (ctx, request) => {
		const authResult = await verifyApiToken(ctx, request);
		if (authResult instanceof Response) return authResult;

		try {
			const body = await request.json();
			const result = await fn(ctx, body);
			return new Response(JSON.stringify(result), {
				status: 200,
				headers: JSON_HEADERS,
			});
		} catch (err: any) {
			return new Response(
				JSON.stringify({ error: err.message }),
				{ status: 500, headers: JSON_HEADERS },
			);
		}
	});
}

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
	handler: authedHandler(async (ctx, body) => {
		await ctx.runMutation(api.openclaw.receiveAgentEvent, body);
		return { ok: true };
	}),
});

// ── Dispatcher HTTP routes (all authenticated) ───────────────────

http.route({
	path: "/dispatcher/tasks/query",
	method: "POST",
	handler: authedHandler(async (ctx, body) => {
		return await ctx.runQuery(api.dispatcher.queryTasks, {
			tenantId: body.tenantId,
			status: body.status,
		});
	}),
});

http.route({
	path: "/dispatcher/tasks/dispatch",
	method: "POST",
	handler: authedHandler(async (ctx, body) => {
		return await ctx.runMutation(api.dispatcher.dispatch, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			openclawRunId: body.openclawRunId,
		});
	}),
});

http.route({
	path: "/dispatcher/tasks/complete",
	method: "POST",
	handler: authedHandler(async (ctx, body) => {
		return await ctx.runMutation(api.dispatcher.complete, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			needsReview: body.needsReview,
		});
	}),
});

http.route({
	path: "/dispatcher/tasks/fail",
	method: "POST",
	handler: authedHandler(async (ctx, body) => {
		return await ctx.runMutation(api.dispatcher.fail, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			error: body.error,
		});
	}),
});

http.route({
	path: "/dispatcher/tasks/create",
	method: "POST",
	handler: authedHandler(async (ctx, body) => {
		const taskId = await ctx.runMutation(api.dispatcher.createTask, body);
		return { ok: true, taskId };
	}),
});

http.route({
	path: "/dispatcher/tasks/usage",
	method: "POST",
	handler: authedHandler(async (ctx, body) => {
		return await ctx.runMutation(api.dispatcher.recordUsage, {
			taskId: body.taskId,
			tenantId: body.tenantId,
			inputTokens: body.inputTokens,
			outputTokens: body.outputTokens,
			cacheReadTokens: body.cacheReadTokens,
			cacheWriteTokens: body.cacheWriteTokens,
			totalCost: body.totalCost,
		});
	}),
});

http.route({
	path: "/dispatcher/tasks/promote",
	method: "POST",
	handler: authedHandler(async (ctx, body) => {
		return await ctx.runMutation(api.dispatcher.promote, {
			tenantId: body.tenantId,
			fromStatus: body.fromStatus,
			toStatus: body.toStatus,
			limit: body.limit,
		});
	}),
});

export default http;
