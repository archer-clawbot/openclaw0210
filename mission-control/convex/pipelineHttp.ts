import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

// ── Auth helper: validate X-LC-API-Key header ──

function validateApiKey(request: Request): boolean {
	const apiKey = request.headers.get("X-LC-API-Key");
	const storedKey = process.env.LC_API_KEY;
	if (!apiKey || !storedKey || apiKey !== storedKey) return false;
	return true;
}

function unauthorizedResponse(): Response {
	return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: JSON_HEADERS,
	});
}

// ═══════════════════════════════════════════════════════════════
// POST /pipeline/deliverables — Create a deliverable
// ═══════════════════════════════════════════════════════════════

export const createDeliverable = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const body = await request.json();

	try {
		const result = await ctx.runMutation(
			api.pipelineDeliverables.createPipelineDeliverable,
			{
				sku: body.sku,
				customerName: body.customer_name || body.customerName,
				domain: body.domain,
				vertical: body.vertical,
				metro: body.metro,
				customerEmail: body.customer_email || body.customerEmail,
				source: body.source || "manual",
				requestChannel:
					body.request_channel || body.requestChannel || "api",
				requestNotes: body.request_notes || body.requestNotes,
				wcOrderId: body.wc_order_id || body.wcOrderId,
				wcOrderNumber: body.wc_order_number || body.wcOrderNumber,
				price: body.price,
				pipelinePhase: body.pipeline_phase || body.pipelinePhase,
				meta: body.meta,
			},
		);

		return new Response(JSON.stringify(result), {
			status: 201,
			headers: JSON_HEADERS,
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return new Response(JSON.stringify({ error: message }), {
			status: 400,
			headers: JSON_HEADERS,
		});
	}
});

// ═══════════════════════════════════════════════════════════════
// POST /pipeline/deliverables/update-status — Update status
// ═══════════════════════════════════════════════════════════════

export const updateStatus = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const body = await request.json();

	try {
		const result = await ctx.runMutation(
			api.pipelineDeliverables.updatePipelineStatus,
			{
				id: body.id,
				status: body.status,
				actor: body.actor,
				errorMessage: body.error_message || body.errorMessage,
				healthScore: body.health_score || body.healthScore,
				actionItemsCount:
					body.action_items_count || body.actionItemsCount,
			},
		);

		return new Response(
			JSON.stringify({ id: result, status: body.status }),
			{
				status: 200,
				headers: JSON_HEADERS,
			},
		);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return new Response(JSON.stringify({ error: message }), {
			status: 400,
			headers: JSON_HEADERS,
		});
	}
});

// ═══════════════════════════════════════════════════════════════
// POST /pipeline/deliverables/update — General update
// ═══════════════════════════════════════════════════════════════

export const updateDeliverable = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const body = await request.json();

	try {
		const result = await ctx.runMutation(
			api.pipelineDeliverables.updatePipelineDeliverable,
			{
				id: body.id,
				pipelinePhase: body.pipeline_phase || body.pipelinePhase,
				assignedAgent: body.assigned_agent || body.assignedAgent,
				modelTier: body.model_tier || body.modelTier,
				healthScore: body.health_score || body.healthScore,
				actionItemsCount:
					body.action_items_count || body.actionItemsCount,
				fileUrl: body.file_url || body.fileUrl,
				filePath: body.file_path || body.filePath,
				fileSizeBytes: body.file_size_bytes || body.fileSizeBytes,
				fileType: body.file_type || body.fileType,
				meta: body.meta,
				actor: body.actor,
			},
		);

		return new Response(JSON.stringify({ id: result }), {
			status: 200,
			headers: JSON_HEADERS,
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return new Response(JSON.stringify({ error: message }), {
			status: 400,
			headers: JSON_HEADERS,
		});
	}
});

// ═══════════════════════════════════════════════════════════════
// POST /pipeline/deliverables/retry — Retry failed
// ═══════════════════════════════════════════════════════════════

export const retryDeliverable = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const body = await request.json();

	try {
		const result = await ctx.runMutation(
			api.pipelineDeliverables.retryDeliverable,
			{
				id: body.id,
			},
		);

		return new Response(
			JSON.stringify({ id: result, status: "queued" }),
			{
				status: 200,
				headers: JSON_HEADERS,
			},
		);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return new Response(JSON.stringify({ error: message }), {
			status: 400,
			headers: JSON_HEADERS,
		});
	}
});

// ═══════════════════════════════════════════════════════════════
// POST /pipeline/deliverables/add-log — Add log entry
// ═══════════════════════════════════════════════════════════════

export const addLog = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const body = await request.json();

	try {
		const result = await ctx.runMutation(
			api.pipelineDeliverables.addDeliverableLog,
			{
				deliverableId:
					body.deliverable_id || body.deliverableId || body.id,
				eventType: body.event_type || body.eventType,
				message: body.message,
				actor: body.actor,
			},
		);

		return new Response(JSON.stringify({ id: result }), {
			status: 201,
			headers: JSON_HEADERS,
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return new Response(JSON.stringify({ error: message }), {
			status: 400,
			headers: JSON_HEADERS,
		});
	}
});

// ═══════════════════════════════════════════════════════════════
// GET /pipeline/catalog — List product catalog (public)
// ═══════════════════════════════════════════════════════════════

export const getCatalog = httpAction(async (ctx, _request) => {
	const catalog = await ctx.runQuery(api.pipelineQueries.listCatalog, {});
	return new Response(JSON.stringify(catalog), {
		status: 200,
		headers: JSON_HEADERS,
	});
});

// ═══════════════════════════════════════════════════════════════
// GET /pipeline/stats — Pipeline stats
// ═══════════════════════════════════════════════════════════════

export const getStats = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const url = new URL(request.url);
	const periodDays = parseInt(
		url.searchParams.get("period_days") || "30",
		10,
	);

	const stats = await ctx.runQuery(api.pipelineQueries.getPipelineStats, {
		periodDays,
	});
	return new Response(JSON.stringify(stats), {
		status: 200,
		headers: JSON_HEADERS,
	});
});

// ═══════════════════════════════════════════════════════════════
// GET /pipeline/reaudits/due — Reaudits due
// ═══════════════════════════════════════════════════════════════

export const getReauditsDue = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const due = await ctx.runQuery(api.pipelineQueries.getReauditsDue, {});
	return new Response(JSON.stringify(due), {
		status: 200,
		headers: JSON_HEADERS,
	});
});

// ═══════════════════════════════════════════════════════════════
// POST /pipeline/upload-url — Get presigned upload URL
// ═══════════════════════════════════════════════════════════════

export const getUploadUrl = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const uploadUrl = await ctx.runMutation(
		api.pipelineFiles.generateUploadUrl,
		{},
	);
	return new Response(JSON.stringify({ uploadUrl }), {
		status: 200,
		headers: JSON_HEADERS,
	});
});

// ═══════════════════════════════════════════════════════════════
// POST /pipeline/deliverables/link-file — Link uploaded file
// ═══════════════════════════════════════════════════════════════

export const linkFile = httpAction(async (ctx, request) => {
	if (!validateApiKey(request)) return unauthorizedResponse();

	const body = await request.json();

	try {
		const fileUrl = await ctx.runMutation(
			api.pipelineFiles.linkFileToDeliverable,
			{
				deliverableId:
					body.deliverable_id || body.deliverableId || body.id,
				storageId: body.storage_id || body.storageId,
				fileName: body.file_name || body.fileName,
				fileType: body.file_type || body.fileType,
				actor: body.actor,
			},
		);

		return new Response(JSON.stringify({ fileUrl }), {
			status: 200,
			headers: JSON_HEADERS,
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return new Response(JSON.stringify({ error: message }), {
			status: 400,
			headers: JSON_HEADERS,
		});
	}
});
