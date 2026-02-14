"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

const PORTAL_URL = "https://dashboard.localcatalyst.ai";

function getResendConfig() {
	const apiKey = process.env.RESEND_API_KEY;
	const fromEmail =
		process.env.RESEND_FROM_EMAIL || "portal@localcatalyst.ai";

	if (!apiKey) {
		throw new Error("Missing RESEND_API_KEY env var");
	}

	return { apiKey, fromEmail };
}

async function sendEmail(args: {
	apiKey: string;
	from: string;
	to: string;
	subject: string;
	html: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${args.apiKey}`,
			},
			body: JSON.stringify({
				from: args.from,
				to: [args.to],
				subject: args.subject,
				html: args.html,
			}),
		});

		const data = await response.json();
		if (!response.ok) {
			console.error("Resend API error:", data);
			return { ok: false, error: data.message || "Email send failed" };
		}
		return { ok: true, id: data.id };
	} catch (error: any) {
		console.error("Email send error:", error);
		return { ok: false, error: error.message };
	}
}

// ── Email Templates ─────────────────────────────────────────────────

function baseLayout(content: string): string {
	return `
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
	</style>
</head>
<body>
	<div class="container">
		<div class="card">
			<div class="logo">
				<span class="accent">◇</span> <span>LocalCatalyst</span>
			</div>
			${content}
		</div>
		<div class="footer">
			<p>LocalCatalyst — AI-Powered SEO Services</p>
		</div>
	</div>
</body>
</html>`;
}

// ── Email Actions ───────────────────────────────────────────────────

export const sendWelcomeEmail = action({
	args: {
		toEmail: v.string(),
		firstName: v.string(),
		tempPassword: v.string(),
	},
	handler: async (_ctx, args) => {
		const { apiKey, fromEmail } = getResendConfig();

		const html = baseLayout(`
			<h2>Welcome to your LocalCatalyst Dashboard</h2>
			<p>Hi ${args.firstName},</p>
			<p>Your client portal is ready. You can log in to view your SEO deliverables, track progress, and download reports.</p>
			<div class="highlight">
				<p><strong>Email:</strong> ${args.toEmail}</p>
				<p><strong>Temporary Password:</strong> ${args.tempPassword}</p>
			</div>
			<p>You'll be asked to set a new password on first login.</p>
			<a href="${PORTAL_URL}/login" class="btn">Log In to Your Portal</a>
			<p>If you have any questions, just reply to this email.</p>
		`);

		return sendEmail({
			apiKey,
			from: `LocalCatalyst <${fromEmail}>`,
			to: args.toEmail,
			subject: "Welcome to your LocalCatalyst Dashboard",
			html,
		});
	},
});

export const sendDeliverableReadyEmail = action({
	args: {
		toEmail: v.string(),
		firstName: v.string(),
		deliverableTitle: v.string(),
		deliverableId: v.string(),
	},
	handler: async (_ctx, args) => {
		const { apiKey, fromEmail } = getResendConfig();

		const html = baseLayout(`
			<h2>Your deliverable is ready</h2>
			<p>Hi ${args.firstName},</p>
			<p>Great news — <strong>${args.deliverableTitle}</strong> has been completed and is ready for your review.</p>
			<a href="${PORTAL_URL}/portal/deliverables/${args.deliverableId}" class="btn">View Deliverable</a>
			<p>You can view all your deliverables, download files, and track your package progress in the portal.</p>
		`);

		return sendEmail({
			apiKey,
			from: `LocalCatalyst <${fromEmail}>`,
			to: args.toEmail,
			subject: `Your ${args.deliverableTitle} is ready — LocalCatalyst`,
			html,
		});
	},
});

export const sendCycleCompleteEmail = action({
	args: {
		toEmail: v.string(),
		firstName: v.string(),
		cycleName: v.string(),
		deliverableCount: v.number(),
	},
	handler: async (_ctx, args) => {
		const { apiKey, fromEmail } = getResendConfig();

		const html = baseLayout(`
			<h2>Your monthly package is complete</h2>
			<p>Hi ${args.firstName},</p>
			<p>All <strong>${args.deliverableCount} deliverables</strong> for <strong>${args.cycleName}</strong> have been completed.</p>
			<a href="${PORTAL_URL}/portal" class="btn">View in Portal</a>
			<p>Thank you for trusting LocalCatalyst with your SEO strategy.</p>
		`);

		return sendEmail({
			apiKey,
			from: `LocalCatalyst <${fromEmail}>`,
			to: args.toEmail,
			subject: `${args.cycleName} — All deliverables complete`,
			html,
		});
	},
});

export const sendPasswordResetEmail = action({
	args: {
		toEmail: v.string(),
		firstName: v.string(),
		resetToken: v.string(),
	},
	handler: async (_ctx, args) => {
		const { apiKey, fromEmail } = getResendConfig();

		const html = baseLayout(`
			<h2>Reset your password</h2>
			<p>Hi ${args.firstName},</p>
			<p>We received a request to reset your password. Click the button below to set a new one.</p>
			<a href="${PORTAL_URL}/login?reset=${args.resetToken}" class="btn">Reset Password</a>
			<p>If you didn't request this, you can safely ignore this email.</p>
		`);

		return sendEmail({
			apiKey,
			from: `LocalCatalyst <${fromEmail}>`,
			to: args.toEmail,
			subject: "Reset your password — LocalCatalyst",
			html,
		});
	},
});
