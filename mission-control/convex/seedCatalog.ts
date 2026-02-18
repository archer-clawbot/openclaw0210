import { mutation } from "./_generated/server";

// Seed the pipelineProductCatalog with LocalCatalyst's live product SKUs.
// SKUs match WooCommerce product/variation IDs set via set-woo-skus.js.
// Idempotent — safe to run multiple times.

export const seed = mutation({
	handler: async (ctx) => {
		const catalog = [
			// ── Topical Map (simple product, WC ID 41) ──────────────────────
			{
				sku: "LC-TOPICAL-MAP",
				name: "Topical Map",
				description: "Complete content roadmap with keyword targets, topic clusters, and priority rankings.",
				defaultPrice: 397,
				fulfillmentAgent: "Silas",
				turnaroundHours: 48,
				modelTier: "high_reasoning",
				specRef: "topical-map",
			},

			// ── SEO Audit (variable product, WC ID 42) ──────────────────────
			{
				sku: "LC-AUDIT-MINI",
				name: "SEO Audit — Mini",
				description: "Core technical scan — crawlability, indexation, speed, mobile, top 10 fixes.",
				defaultPrice: 297,
				fulfillmentAgent: "Silas",
				turnaroundHours: 72,
				modelTier: "high_reasoning",
				specRef: "seo-audit-mini",
			},
			{
				sku: "LC-AUDIT-CATALYST",
				name: "SEO Audit — CATALYST",
				description: "Full-depth analysis — technical, content, backlinks, competitors, 90-day plan.",
				defaultPrice: 497,
				fulfillmentAgent: "Silas",
				turnaroundHours: 96,
				modelTier: "high_reasoning",
				specRef: "seo-audit-catalyst",
			},

			// ── SEO Content Pages (variable product, WC ID 45) ──────────────
			{
				sku: "LC-CONTENT-1",
				name: "SEO Content Pages — Single Page",
				description: "One fully optimized SEO page.",
				defaultPrice: 97,
				fulfillmentAgent: "Scribe",
				turnaroundHours: 24,
				modelTier: "bulk_processing",
				specRef: "content-pages",
			},
			{
				sku: "LC-CONTENT-5",
				name: "SEO Content Pages — 5-Page Bundle",
				description: "5 optimized pages — $79 each.",
				defaultPrice: 395,
				fulfillmentAgent: "Scribe",
				turnaroundHours: 72,
				modelTier: "bulk_processing",
				specRef: "content-pages",
			},
			{
				sku: "LC-CONTENT-10",
				name: "SEO Content Pages — 10-Page Bundle",
				description: "10 optimized pages — $69 each.",
				defaultPrice: 690,
				fulfillmentAgent: "Scribe",
				turnaroundHours: 120,
				modelTier: "bulk_processing",
				specRef: "content-pages",
			},

			// ── Schema Markup (variable product, WC ID 49) ──────────────────
			{
				sku: "LC-SCHEMA-1",
				name: "Schema Markup — Single Page",
				description: "Custom JSON-LD schema for one page.",
				defaultPrice: 197,
				fulfillmentAgent: "Specs",
				turnaroundHours: 48,
				modelTier: "high_reasoning",
				specRef: "schema-markup",
			},
			{
				sku: "LC-SCHEMA-FULL",
				name: "Schema Markup — Full Site",
				description: "Schema implementation across your entire site.",
				defaultPrice: 397,
				fulfillmentAgent: "Specs",
				turnaroundHours: 72,
				modelTier: "high_reasoning",
				specRef: "schema-markup",
			},

			// ── GBP Optimization (variable product, WC ID 52) ───────────────
			{
				sku: "LC-GBP-STD",
				name: "GBP Optimization — Standard",
				description: "Complete profile optimization with keyword-optimized content.",
				defaultPrice: 297,
				fulfillmentAgent: "Silas",
				turnaroundHours: 48,
				modelTier: "high_reasoning",
				specRef: "gbp-optimization",
			},
			{
				sku: "LC-GBP-PRE",
				name: "GBP Optimization — Premium",
				description: "Full optimization plus 12 posts, Q&A seeding, photo guidelines, review templates.",
				defaultPrice: 497,
				fulfillmentAgent: "Silas",
				turnaroundHours: 72,
				modelTier: "high_reasoning",
				specRef: "gbp-optimization",
			},

			// ── Citation Building (variable product, WC ID 55) ──────────────
			{
				sku: "LC-CIT-25",
				name: "Citation Building — Starter (25 Citations)",
				description: "25 core citations including Google, Bing, Apple Maps, Yelp, Facebook.",
				defaultPrice: 197,
				fulfillmentAgent: "Silas",
				turnaroundHours: 120,
				modelTier: "high_reasoning",
				specRef: "citation-building",
			},
			{
				sku: "LC-CIT-50",
				name: "Citation Building — Growth (50 Citations)",
				description: "50 citations with niche and geo-specific directories.",
				defaultPrice: 347,
				fulfillmentAgent: "Silas",
				turnaroundHours: 168,
				modelTier: "high_reasoning",
				specRef: "citation-building",
			},
			{
				sku: "LC-CIT-100",
				name: "Citation Building — Authority (100 Citations)",
				description: "100 citations with data aggregators and local community sites.",
				defaultPrice: 597,
				fulfillmentAgent: "Silas",
				turnaroundHours: 240,
				modelTier: "high_reasoning",
				specRef: "citation-building",
			},

			// ── Website Build (variable product, WC ID 59) ──────────────────
			{
				sku: "LC-WEB-STARTER",
				name: "Website Build — Starter (5 Pages)",
				description: "Up to 5 pages, mobile-responsive, speed-optimized.",
				defaultPrice: 999,
				fulfillmentAgent: "Builder",
				turnaroundHours: 168,
				modelTier: "high_reasoning",
				specRef: "website-build",
			},
			{
				sku: "LC-WEB-PRO",
				name: "Website Build — Professional (15 Pages)",
				description: "Up to 15 pages with blog, forms, GBP integration, full schema.",
				defaultPrice: 1999,
				fulfillmentAgent: "Builder",
				turnaroundHours: 336,
				modelTier: "high_reasoning",
				specRef: "website-build",
			},
			{
				sku: "LC-WEB-ENT",
				name: "Website Build — Enterprise (30 Pages)",
				description: "Up to 30 pages, multi-location, custom integrations, 90-day optimization.",
				defaultPrice: 2999,
				fulfillmentAgent: "Builder",
				turnaroundHours: 672,
				modelTier: "high_reasoning",
				specRef: "website-build",
			},
		];

		let inserted = 0;
		let skipped = 0;
		for (const item of catalog) {
			const existing = await ctx.db
				.query("pipelineProductCatalog")
				.withIndex("by_sku", (q) => q.eq("sku", item.sku))
				.first();

			if (!existing) {
				await ctx.db.insert("pipelineProductCatalog", {
					...item,
					active: true,
					tenantId: "localcatalyst",
				});
				inserted++;
			} else {
				skipped++;
			}
		}

		return { inserted, skipped, total: catalog.length };
	},
});

// Deactivate old draft catalog entries (tenantId: "default", wrong SKUs).
// Safe to run multiple times.
export const deactivateOldEntries = mutation({
	handler: async (ctx) => {
		const all = await ctx.db.query("pipelineProductCatalog").collect();
		let deactivated = 0;
		for (const entry of all) {
			if (entry.tenantId === "default" || !entry.tenantId) {
				await ctx.db.patch(entry._id, { active: false });
				deactivated++;
			}
		}
		return { deactivated };
	},
});
