import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

// ── Webhook Signature Validation ────────────────────────────────────

async function verifyWebhookSignature(
	body: string,
	signature: string | null,
): Promise<boolean> {
	const secret = process.env.WC_WEBHOOK_SECRET;
	if (!secret) {
		console.error("WC_WEBHOOK_SECRET not set — rejecting webhook");
		return false;
	}
	if (!signature) return false;

	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);

	const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
	const computed = btoa(String.fromCharCode(...new Uint8Array(signed)));

	return computed === signature;
}

// ── Transform WC webhook payloads ───────────────────────────────────

function transformCustomerPayload(wc: any) {
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

function transformOrderPayload(wc: any) {
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
		billingAddress: wc.billing ? JSON.stringify(wc.billing) : undefined,
		shippingAddress: wc.shipping ? JSON.stringify(wc.shipping) : undefined,
	};
}

function transformProductPayload(wc: any) {
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

// ── Auto-Create Deliverables from Order Line Items ──────────────────

function parseAgentId(fulfillmentAgent: string): string {
	// "Silas + Scribe" → "silas", "Silas" → "silas", "All" → "silas"
	const first = fulfillmentAgent.split(/[+,&]/)[0].trim().toLowerCase();
	return first === "all" ? "silas" : first;
}

function extractDomain(body: any): string | undefined {
	if (!body.meta_data) return undefined;
	for (const meta of body.meta_data) {
		if (meta.key === "domain" || meta.key === "website" || meta.key === "_billing_website") {
			return meta.value || undefined;
		}
	}
	return undefined;
}

async function autoCreateDeliverables(
	ctx: any,
	body: any,
	customerConvexId: any,
	orderConvexId: any,
) {
	const customerName = [body.billing?.first_name, body.billing?.last_name]
		.filter(Boolean)
		.join(" ") || "Unknown";
	const customerEmail = body.billing?.email || undefined;
	const domain = extractDomain(body);

	for (const item of body.line_items || []) {
		if (!item.sku) continue;

		try {
			const deliverableResult = await ctx.runMutation(
				api.pipelineDeliverables.createPipelineDeliverable,
				{
					sku: item.sku,
					customerName,
					customerEmail,
					domain,
					source: "purchase" as const,
					requestChannel: "woocommerce" as const,
					wcOrderId: body.id,
					wcOrderNumber: String(body.number || body.id),
					price: parseFloat(item.total) || undefined,
					customerId: customerConvexId || undefined,
					orderId: orderConvexId || undefined,
				},
			);

			// Create dispatcher task for the assigned agent
			const agentId = parseAgentId(deliverableResult.assignedAgent);
			await ctx.runMutation(api.dispatcher.createTask, {
				tenantId: "localcatalyst",
				title: `[${item.sku}] ${item.name} — Order #${body.number || body.id}`,
				description: [
					`Auto-created from WooCommerce order #${body.number || body.id}.`,
					`Customer: ${customerName} (${customerEmail || "no email"})`,
					domain ? `Domain: ${domain}` : null,
					`SKU: ${item.sku}`,
					`Deliverable: ${deliverableResult.displayId}`,
				].filter(Boolean).join("\n"),
				agentId,
				clientSlug: "localcatalyst",
				deliverableId: deliverableResult.id,
				tags: ["auto-order", item.sku],
				priority: "high" as const,
			});

			console.log(`Created deliverable ${deliverableResult.displayId} + task for SKU ${item.sku}`);
		} catch (err: any) {
			console.error(`Failed to create deliverable for SKU ${item.sku}:`, err.message);
		}
	}
}

// ── Main Webhook Handler ────────────────────────────────────────────

export const handleWebhook = httpAction(async (ctx, request) => {
	try {
	const bodyText = await request.text();
	const signature = request.headers.get("X-WC-Webhook-Signature");
	const topic = request.headers.get("X-WC-Webhook-Topic");

	// Verify signature
	const valid = await verifyWebhookSignature(bodyText, signature);
	if (!valid) {
		console.error("Webhook signature verification failed");
		return new Response(JSON.stringify({ error: "Invalid signature" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	// WooCommerce sends a ping on webhook creation — just ack it
	if (topic === "ping" || !topic) {
		return new Response(JSON.stringify({ ok: true, message: "pong" }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	let body: any;
	try {
		body = JSON.parse(bodyText);
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	// Skip if the body is empty or just has an id (WC sometimes sends
	// minimal payloads for deleted resources)
	if (!body || !body.id) {
		return new Response(JSON.stringify({ ok: true, skipped: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		// Route by topic
		if (
			topic === "customer.created" ||
			topic === "customer.updated"
		) {
			await ctx.runMutation(
				api.wooMutations.upsertCustomer,
				transformCustomerPayload(body),
			);
		} else if (
			topic === "order.created" ||
			topic === "order.updated"
		) {
			// Upsert customer to ensure we have a Convex record + ID
			let customerConvexId: any = undefined;

			if (body.customer_id && body.customer_id > 0) {
				// Registered customer — upsert from billing to ensure record exists
				if (body.billing?.email) {
					const result = await ctx.runMutation(api.wooMutations.upsertCustomer, {
						wcCustomerId: body.customer_id,
						email: body.billing.email,
						firstName: body.billing.first_name || "",
						lastName: body.billing.last_name || "",
						company: body.billing.company || undefined,
						phone: body.billing.phone || undefined,
						wcDateCreated: body.date_created || new Date().toISOString(),
					});
					customerConvexId = result.id;
				}
			} else if (body.billing?.email) {
				// Guest order — create a minimal customer record from billing info
				const result = await ctx.runMutation(api.wooMutations.upsertCustomer, {
					wcCustomerId: 0, // Guest
					email: body.billing.email,
					firstName: body.billing.first_name || "",
					lastName: body.billing.last_name || "",
					company: body.billing.company || undefined,
					phone: body.billing.phone || undefined,
					wcDateCreated: body.date_created || new Date().toISOString(),
				});
				customerConvexId = result.id;
			}

			const orderResult = await ctx.runMutation(
				api.wooMutations.upsertOrder,
				transformOrderPayload(body),
			);

			// Auto-trigger deliverables for new paid orders
			if (topic === "order.created" && orderResult.isNew) {
				if (body.status === "processing" || body.status === "completed") {
					await autoCreateDeliverables(ctx, body, customerConvexId, orderResult.id);
				}
			}
		} else if (
			topic === "product.created" ||
			topic === "product.updated"
		) {
			await ctx.runMutation(
				api.wooMutations.upsertProduct,
				transformProductPayload(body),
			);
		} else {
			console.log(`Unhandled webhook topic: ${topic}`);
		}

		return new Response(
			JSON.stringify({ ok: true, topic, resourceId: body.id }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error: any) {
		console.error(`Webhook handler error for ${topic}:`, error);
		return new Response(
			JSON.stringify({ error: error.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
	} catch (outerError: any) {
		return new Response(
			JSON.stringify({ error: "Uncaught: " + outerError.message }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
});
