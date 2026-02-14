import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ── Token Management ─────────────────────────────────────────────────
// The apiTokens table stores SHA-256 hashes of API tokens.
// Raw tokens are returned ONCE at creation time and never stored.

// Generate a new API token. Run from Convex dashboard or setup script.
// Returns the raw token (show once, never stored).
export const createToken = mutation({
	args: {
		name: v.string(),
		tenantId: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// Generate a random 32-byte token
		const array = new Uint8Array(32);
		crypto.getRandomValues(array);
		const rawToken = Array.from(array, (b) =>
			b.toString(16).padStart(2, "0")
		).join("");

		// Hash it for storage
		const encoder = new TextEncoder();
		const data = encoder.encode(rawToken);
		const hashBuffer = await crypto.subtle.digest("SHA-256", data);
		const tokenHash = Array.from(new Uint8Array(hashBuffer), (b) =>
			b.toString(16).padStart(2, "0")
		).join("");

		const tokenPrefix = rawToken.substring(0, 8);

		await ctx.db.insert("apiTokens", {
			tokenHash,
			tokenPrefix,
			tenantId: args.tenantId,
			name: args.name,
			createdAt: Date.now(),
		});

		// Return the raw token — this is the ONLY time it's visible
		return {
			token: rawToken,
			prefix: tokenPrefix,
			name: args.name,
		};
	},
});

// Verify a token by its hash. Used by the HTTP auth middleware.
export const verifyToken = query({
	args: {
		tokenHash: v.string(),
	},
	handler: async (ctx, args) => {
		const token = await ctx.db
			.query("apiTokens")
			.withIndex("by_tokenHash", (q) => q.eq("tokenHash", args.tokenHash))
			.first();

		if (!token) return null;
		if (token.revokedAt) return null;

		return {
			tenantId: token.tenantId,
			name: token.name,
			createdAt: token.createdAt,
		};
	},
});

// Update lastUsedAt timestamp for a token (fire-and-forget from auth middleware).
export const touchToken = mutation({
	args: {
		tokenHash: v.string(),
	},
	handler: async (ctx, args) => {
		const token = await ctx.db
			.query("apiTokens")
			.withIndex("by_tokenHash", (q) => q.eq("tokenHash", args.tokenHash))
			.first();

		if (token && !token.revokedAt) {
			await ctx.db.patch(token._id, { lastUsedAt: Date.now() });
		}
	},
});

// Revoke a token by prefix (for key rotation).
export const revokeByPrefix = mutation({
	args: {
		tokenPrefix: v.string(),
	},
	handler: async (ctx, args) => {
		const tokens = await ctx.db.query("apiTokens").collect();

		let revoked = 0;
		for (const token of tokens) {
			if (token.tokenPrefix === args.tokenPrefix && !token.revokedAt) {
				await ctx.db.patch(token._id, { revokedAt: Date.now() });
				revoked++;
			}
		}
		return { revoked };
	},
});

// List all active (non-revoked) tokens. For admin dashboard.
export const listActive = query({
	handler: async (ctx) => {
		const tokens = await ctx.db.query("apiTokens").collect();
		return tokens
			.filter((t) => !t.revokedAt)
			.map((t) => ({
				prefix: t.tokenPrefix,
				name: t.name,
				tenantId: t.tenantId,
				createdAt: t.createdAt,
				lastUsedAt: t.lastUsedAt,
			}));
	},
});
