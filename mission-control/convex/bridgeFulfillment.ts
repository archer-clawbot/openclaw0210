"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const fulfillWooOrder = internalAction({
	args: { deliverableId: v.id("wooDeliverables") },
	handler: async (ctx, args) => {
		const result = await ctx.runQuery(
			api.pipelineQueries.getPipelineDeliverable,
			{ id: args.deliverableId },
		);
		if (!result?.deliverable?.wcOrderId) return;

		const d = result.deliverable;
		const domain = process.env.WP_LOCALCATALYST_DOMAIN;
		const secret = process.env.OPENCLAW_BRIDGE_SECRET;
		if (!domain || !secret) {
			console.error("Missing WP_LOCALCATALYST_DOMAIN or OPENCLAW_BRIDGE_SECRET");
			return;
		}

		const payload = JSON.stringify({
			order_id: d.wcOrderId,
			deliverable_url: d.fileUrl || "",
			note: `Deliverable ${d.deliverableDisplayId} (${d.title}) has been completed and delivered.`,
		});

		// HMAC signature
		const encoder = new TextEncoder();
		const key = await crypto.subtle.importKey(
			"raw",
			encoder.encode(secret),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"],
		);
		const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
		const signature = Array.from(new Uint8Array(signed), (b) =>
			b.toString(16).padStart(2, "0"),
		).join("");

		const url = `https://${domain}/wp-json/openclaw/v1/orders/fulfill`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-OpenClaw-Signature": signature,
			},
			body: payload,
		});

		if (!response.ok) {
			console.error("Bridge fulfillment failed:", response.status, await response.text());
		} else {
			console.log(`WP order ${d.wcOrderId} marked as fulfilled via bridge`);
		}
	},
});
