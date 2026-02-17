"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const PORTAL_URL = "https://dashboard.localcatalyst.ai";

// ═══════════════════════════════════════════════════════════════
// DELIVERY EMAIL — sent when a purchase deliverable is delivered
// ═══════════════════════════════════════════════════════════════

export const sendDeliveryEmail = internalAction({
	args: {
		deliverableId: v.id("wooDeliverables"),
	},
	handler: async (ctx, args) => {
		const result = await ctx.runQuery(
			api.pipelineQueries.getPipelineDeliverable,
			{
				id: args.deliverableId,
			},
		);
		if (!result) return;

		const d = result.deliverable;
		if (!d.customerEmail) return;

		const RESEND_API_KEY = process.env.RESEND_API_KEY;
		const fromEmail =
			process.env.RESEND_FROM_EMAIL || "portal@localcatalyst.ai";
		if (!RESEND_API_KEY) {
			console.error("RESEND_API_KEY not configured");
			return;
		}

		// Generate referral code from email
		const refCode = d.customerEmail
			? Buffer.from(d.customerEmail).toString("base64").substring(0, 6).toUpperCase()
			: "NOREF";

		const domainSlug = d.domain?.replace(/\./g, "-") || "";

		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: `LocalCatalyst <${fromEmail}>`,
				to: [d.customerEmail],
				subject: `Your ${d.title || d.sku} is ready — LocalCatalyst.ai`,
				html: `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f4f4f5; color: #18181b; }
		.container { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
		.card { background: #ffffff; border-radius: 12px; padding: 40px; border: 1px solid #e4e4e7; }
		.logo { text-align: center; margin-bottom: 32px; }
		.logo span { font-size: 24px; font-weight: 700; letter-spacing: 2px; color: #18181b; }
		.logo .accent { color: #f97316; }
		.btn { display: inline-block; background: #18181b; color: #ffffff !important; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; margin: 24px 0; }
		.footer { text-align: center; margin-top: 32px; font-size: 12px; color: #a1a1aa; }
		h2 { margin: 0 0 16px 0; font-size: 20px; }
		p { margin: 0 0 12px 0; line-height: 1.6; color: #3f3f46; }
		.highlight { background: #f4f4f5; border-radius: 8px; padding: 16px; margin: 16px 0; }
		.highlight strong { color: #18181b; }
		hr { border: none; border-top: 1px solid #e4e4e7; margin: 24px 0; }
	</style>
</head>
<body>
	<div class="container">
		<div class="card">
			<div class="logo">
				<span class="accent">◇</span> <span>LocalCatalyst</span>
			</div>
			<h2>Your deliverable is ready!</h2>
			<p>Hi ${d.customerName || "there"},</p>
			<p>Your <strong>${d.title || d.sku}</strong> has been completed and is ready for download.</p>
			${
				d.fileUrl
					? `
			<div style="text-align: center; margin: 32px 0;">
				<a href="${d.fileUrl}" class="btn">Download Your Deliverable</a>
			</div>`
					: ""
			}
			<hr>
			<h3 style="margin: 0 0 12px 0; font-size: 16px; color: #18181b;">What's Next?</h3>
			${
				domainSlug
					? `<p>Ready to keep improving your online presence? <a href="${PORTAL_URL}/report/${domainSlug}" style="color: #f97316;">View Your Full Report →</a></p>`
					: ""
			}
			<hr>
			<p style="font-size: 13px; color: #a1a1aa;">
				Know a business that could use help with their SEO?
				<a href="https://localcatalyst.ai/?ref=${refCode}" style="color: #f97316;">Share your referral link</a>
				and get $25 off your next deliverable.
			</p>
		</div>
		<div class="footer">
			<p>Catalyst Digital LLC — LocalCatalyst.ai</p>
		</div>
	</div>
</body>
</html>
				`,
			}),
		});

		if (!response.ok) {
			console.error(
				"Failed to send delivery email:",
				await response.text(),
			);
		}
	},
});
