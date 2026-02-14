import { IconExternalLink } from "@tabler/icons-react";

const WP_PRODUCT_URLS: Record<string, string> = {
	"seo-audit": "/services/seo-audit/",
	"gbp-optimization": "/services/gbp-optimization/",
	"citation-building": "/services/citation-building/",
	"schema-markup": "/services/schema-markup/",
	"website-build": "/services/website-build/",
};

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
	"seo-audit":
		"A comprehensive audit of your website's on-page, technical, and off-page SEO with prioritized recommendations and an actionable roadmap.",
	"gbp-optimization":
		"Complete optimization of your Google Business Profile including categories, attributes, photos, posts, and Q&A for maximum local visibility.",
	"citation-building":
		"Build and clean up your business citations across top directories to strengthen NAP consistency and local search authority.",
	"schema-markup":
		"Implementation of structured data markup (LocalBusiness, Service, FAQ, etc.) to enhance your search result appearance with rich snippets.",
	"website-build":
		"A custom-designed, SEO-optimized website built for local businesses with fast load times, mobile-first design, and conversion-focused layouts.",
};

interface GenericProductTabProps {
	productSlug: string;
	label: string;
}

export default function GenericProductTab({ productSlug, label }: GenericProductTabProps) {
	// TODO: Fetch actual order data for this product from Convex
	const hasPurchased = false; // Will be replaced with real data
	const wpSiteUrl = "https://localcatalyst.com";
	const productUrl = WP_PRODUCT_URLS[productSlug] || "/services/";

	if (!hasPurchased) {
		return (
			<div>
				<h1 className="text-2xl font-bold text-slate-800">{label}</h1>

				<div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
						<IconExternalLink size={28} className="text-slate-400" />
					</div>
					<h2 className="text-lg font-semibold text-slate-700">
						You haven't purchased this yet
					</h2>
					<p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
						{PRODUCT_DESCRIPTIONS[productSlug] || `Get started with our ${label} service.`}
					</p>
					<a
						href={wpSiteUrl + productUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
					>
						Get Started
						<IconExternalLink size={16} />
					</a>
				</div>
			</div>
		);
	}

	// Purchased state — shows order timeline + deliverable
	return (
		<div>
			<h1 className="text-2xl font-bold text-slate-800">{label}</h1>
			<p className="mt-1 text-sm text-slate-500">
				Your {label} order details and deliverable
			</p>

			{/* TODO: Render order status timeline + deliverable download */}
			<div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
				<p className="text-sm text-slate-600">
					Order details will appear here once connected to your account data.
				</p>
			</div>
		</div>
	);
}
