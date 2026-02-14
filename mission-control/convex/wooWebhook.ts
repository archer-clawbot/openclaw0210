import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

// ── Webhook Signature Validation ────────────────────────────────────

async function verifyWebhookSignature(
	body: string,
	signature: string | null,
): Promise<boolean> {
	const secret = process.env.WC_WEBHOOK_SECRET;
	if (!secret) {
		console.warn("WC_WEBHOOK_SECRET not set — skipping signature check");
		return true; // Allow during development; remove in production
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

// ── Main Webhook Handler ────────────────────────────────────────────

export const handleWebhook = httpAction(async (ctx, request) => {
	const bodyText = await request.text();
	const signature = request.headers.get("X-WC-Webhook-Signature");
	const topic = request.headers.get("X-WC-Webhook-Topic");
	const _resource = request.headers.get("X-WC-Webhook-Resource");

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
			// Upsert the customer first if we have billing info
			// (guest orders won't have a customer_id but will have billing email)
			if (body.customer_id && body.customer_id > 0) {
				// Customer already exists via customer webhook or previous sync
			} else if (body.billing?.email) {
				// Guest order — create a minimal customer record from billing info
				await ctx.runMutation(api.wooMutations.upsertCustomer, {
					wcCustomerId: 0, // Guest
					email: body.billing.email,
					firstName: body.billing.first_name || "",
					lastName: body.billing.last_name || "",
					company: body.billing.company || undefined,
					phone: body.billing.phone || undefined,
					wcDateCreated: body.date_created || new Date().toISOString(),
				});
			}

			await ctx.runMutation(
				api.wooMutations.upsertOrder,
				transformOrderPayload(body),
			);
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
});
