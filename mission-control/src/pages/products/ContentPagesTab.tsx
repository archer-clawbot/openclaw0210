import { IconExternalLink, IconFileText } from "@tabler/icons-react";

export default function ContentPagesTab() {
	// TODO: Fetch real order data from Convex
	const hasPurchased = false;
	const contentOrders: any[] = []; // Will come from Convex orders filtered by productSlug=content-pages
	const topicalMapPages: any[] = []; // Cross-reference from topical map order

	const wpSiteUrl = "https://localcatalyst.com";

	if (!hasPurchased && topicalMapPages.length === 0) {
		return (
			<div>
				<h1 className="text-2xl font-bold text-slate-800">Content Pages</h1>

				<div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
						<IconFileText size={28} className="text-slate-400" />
					</div>
					<h2 className="text-lg font-semibold text-slate-700">
						You haven't purchased this yet
					</h2>
					<p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
						Professionally written, SEO-optimized content pages for your
						website. Each page targets a specific keyword and is crafted
						to rank and convert.
					</p>
					<a
						href={wpSiteUrl + "/services/content-pages/"}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
					>
						Get Content Pages ($97/page)
						<IconExternalLink size={16} />
					</a>
				</div>
			</div>
		);
	}

	return (
		<div>
			<h1 className="text-2xl font-bold text-slate-800">Content Pages</h1>
			<p className="mt-1 text-sm text-slate-500">
				Your purchased and recommended content pages
			</p>

			{/* Purchased content pages */}
			{contentOrders.length > 0 && (
				<div className="mt-6 rounded-xl bg-white shadow-sm">
					<div className="border-b border-slate-200 px-6 py-4">
						<h2 className="text-lg font-semibold text-slate-700">
							Your Content Pages ({contentOrders.length})
						</h2>
					</div>
					<div className="divide-y divide-slate-100">
						{contentOrders.map((order: any, i: number) => (
							<div key={i} className="flex items-center justify-between px-6 py-3">
								<div>
									<p className="text-sm font-medium text-slate-700">
										{order.intakeData?.productSpecific?.topics?.[0] || `Content Page #${i + 1}`}
									</p>
									<p className="text-xs text-slate-400">
										Status: {order.status}
									</p>
								</div>
								<div>
									{order.status === "completed" && order.deliverableUrl ? (
										<a
											href={order.deliverableUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
										>
											View
											<IconExternalLink size={14} />
										</a>
									) : (
										<span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
											{order.status === "in_progress" ? "Writing" : order.status}
										</span>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Topical map cross-reference — pages not yet purchased */}
			{topicalMapPages.length > 0 && (
				<div className="mt-6 rounded-xl bg-white shadow-sm">
					<div className="border-b border-slate-200 px-6 py-4">
						<h2 className="text-lg font-semibold text-slate-700">
							Recommended From Your Topical Map
						</h2>
						<p className="text-xs text-slate-400">
							These pages were recommended in your topical map but haven't been purchased yet.
						</p>
					</div>
					<div className="divide-y divide-slate-100">
						{topicalMapPages
							.filter((p: any) => !p.contentOrderId)
							.map((page: any, i: number) => (
								<div key={i} className="flex items-center justify-between px-6 py-3">
									<div>
										<p className="text-sm font-medium text-slate-700">{page.title}</p>
										<p className="text-xs text-slate-400">
											{page.keyword} &middot; {page.pageType}
										</p>
									</div>
									<a
										href={`${wpSiteUrl}/services/content-pages/?topic=${encodeURIComponent(page.title)}&keyword=${encodeURIComponent(page.keyword)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-600"
									>
										Buy Now ($97)
									</a>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
}
