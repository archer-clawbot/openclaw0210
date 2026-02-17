import { mutation } from "./_generated/server";

export const seed = mutation({
	handler: async (ctx) => {
		const catalog = [
			{
				sku: "LC-GBP-OPT",
				name: "GBP Full Optimization",
				defaultPrice: 97,
				fulfillmentAgent: "Silas",
				turnaroundHours: 48,
				modelTier: "high_reasoning",
				specRef: "silas_engine/gbp_optimization",
			},
			{
				sku: "LC-SCHEMA",
				name: "Schema Markup Package",
				defaultPrice: 47,
				fulfillmentAgent: "Silas",
				turnaroundHours: 24,
				modelTier: "high_reasoning",
				specRef: "silas_engine/schema_markup",
			},
			{
				sku: "LC-NAP-CITE",
				name: "NAP/Citation Audit + Fixes",
				defaultPrice: 147,
				fulfillmentAgent: "Silas",
				turnaroundHours: 120,
				modelTier: "high_reasoning",
				specRef: "silas_engine/citation_building",
			},
			{
				sku: "LC-TECH-AUDIT",
				name: "Technical SEO Audit Report",
				defaultPrice: 197,
				fulfillmentAgent: "Silas",
				turnaroundHours: 48,
				modelTier: "high_reasoning",
				specRef: "silas_engine/technical_seo",
			},
			{
				sku: "LC-CONTENT-CAL",
				name: "12-Month Content Calendar",
				defaultPrice: 197,
				fulfillmentAgent: "Scribe",
				turnaroundHours: 48,
				modelTier: "bulk_processing",
				specRef: "silas_engine/content_strategy",
			},
			{
				sku: "LC-BLOG-8",
				name: "8 SEO Blog Posts (2000+ words)",
				defaultPrice: 397,
				fulfillmentAgent: "Scribe",
				turnaroundHours: 168,
				modelTier: "bulk_processing",
				specRef: "silas_engine/content_creation",
			},
			{
				sku: "LC-COMP-REPORT",
				name: "Competitor Analysis Report",
				defaultPrice: 147,
				fulfillmentAgent: "Silas + Scribe",
				turnaroundHours: 48,
				modelTier: "high_reasoning",
				specRef: "silas_engine/competitor_analysis",
			},
			{
				sku: "LC-REVIEW-STRAT",
				name: "Review Generation Strategy",
				defaultPrice: 97,
				fulfillmentAgent: "Scribe",
				turnaroundHours: 24,
				modelTier: "bulk_processing",
				specRef: "silas_engine/review_generation",
			},
			{
				sku: "LC-LINK-PLAY",
				name: "Local Link Building Playbook",
				defaultPrice: 147,
				fulfillmentAgent: "Silas + Scribe",
				turnaroundHours: 120,
				modelTier: "high_reasoning",
				specRef: "silas_engine/link_building",
			},
			{
				sku: "LC-FULL-LAUNCH",
				name: "Full Local SEO Launch Package",
				defaultPrice: 797,
				fulfillmentAgent: "All",
				turnaroundHours: 240,
				modelTier: "high_reasoning",
				specRef: "silas_engine/full_launch",
			},
		];

		let inserted = 0;
		for (const item of catalog) {
			// Check if SKU already exists (idempotent)
			const existing = await ctx.db
				.query("pipelineProductCatalog")
				.withIndex("by_sku", (q) => q.eq("sku", item.sku))
				.first();

			if (!existing) {
				await ctx.db.insert("pipelineProductCatalog", {
					...item,
					active: true,
					tenantId: "default",
				});
				inserted++;
			}
		}

		return { inserted, total: catalog.length };
	},
});
