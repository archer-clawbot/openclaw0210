import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const run = mutation({
	args: {
		tenantId: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const tenantId = args.tenantId ?? "default";

		// Check if agents already seeded for this tenant
		const existing = await ctx.db
			.query("agents")
			.withIndex("by_tenant", (q) => q.eq("tenantId", tenantId))
			.first();
		if (existing) {
			console.log(`Agents already seeded for tenant ${tenantId}`);
			return;
		}

		const agents = [
			{
				name: "Archer",
				role: "Orchestrator — routes all tasks",
				level: "LEAD" as const,
				status: "active" as const,
				avatar: "🏹",
			},
			{
				name: "Silas",
				role: "SEO Strategist — audits, scorecards, briefs, strategy",
				level: "LEAD" as const,
				status: "idle" as const,
				avatar: "📊",
			},
			{
				name: "Mozi",
				role: "Business Advisor — Hormozi frameworks, pricing, offers",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "💰",
			},
			{
				name: "Scout",
				role: "Research — competitor intel, SERP analysis, algorithm updates",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "🔍",
			},
			{
				name: "Canvas",
				role: "Design — wireframes, design systems, brand guidelines",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "🎨",
			},
			{
				name: "Scribe",
				role: "Content — all written content, GBP posts, blogs, pages",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "✍️",
			},
			{
				name: "Builder",
				role: "New Sites — WordPress builds from scratch on Cloudways",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "🏗️",
			},
			{
				name: "Wrench",
				role: "Existing Sites — optimization, fixes, updates to live sites",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "🔧",
			},
			{
				name: "Specs",
				role: "Technical SEO — RankMath, schema, GA4, GSC, Core Web Vitals",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "⚙️",
			},
			{
				name: "Herald",
				role: "GBP Operations — publish posts, manage listings, reviews",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "📢",
			},
			{
				name: "Citadel",
				role: "Citations — NAP consistency, directory submissions",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "🏰",
			},
			{
				name: "Ghost",
				role: "PBN — private blog network management, link deployment",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "👻",
			},
			{
				name: "Lookout",
				role: "Monitoring — rank tracking, anomaly detection, reporting",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "👁️",
			},
			{
				name: "Ledger",
				role: "Cost Analysis — API spend, per-client profitability, budgets",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "📒",
			},
			{
				name: "Razor",
				role: "CRO — conversion rate optimization, A/B testing, page analysis",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "🔪",
			},
			{
				name: "Blitz",
				role: "Paid Ads — Google Ads, Meta Ads, campaign management",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "⚡",
			},
			{
				name: "Sentinel",
				role: "System Health — nightly infrastructure monitoring, health reports",
				level: "SPC" as const,
				status: "idle" as const,
				avatar: "🛡️",
			},
		];

		for (const agent of agents) {
			await ctx.db.insert("agents", {
				...agent,
				tenantId,
			});
		}

		console.log(`Seeded ${agents.length} agents for tenant ${tenantId}`);
	},
});
