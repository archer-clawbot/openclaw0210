import { IconExternalLink, IconMap } from "@tabler/icons-react";

export default function TopicalMapTab() {
	// TODO: Fetch real order data from Convex
	const hasPurchased = false;
	const topicalMapPages: any[] = []; // Will come from order.topicalMapPages

	const wpSiteUrl = "https://localcatalyst.com";

	if (!hasPurchased) {
		return (
			<div>
				<h1 className="text-2xl font-bold text-slate-800">Topical Map</h1>

				<div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
						<IconMap size={28} className="text-slate-400" />
					</div>
					<h2 className="text-lg font-semibold text-slate-700">
						You haven't purchased this yet
					</h2>
					<p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
						A topical map gives you a complete content architecture — every
						page your site needs to build topical authority, organized into
						pillars, clusters, and supporting content.
					</p>
					<a
						href={wpSiteUrl + "/services/topical-map/"}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
					>
						Get Your Topical Map ($397)
						<IconExternalLink size={16} />
					</a>
				</div>
			</div>
		);
	}

	// Purchased state — show the topical map with content page cross-sell
	return (
		<div>
			<h1 className="text-2xl font-bold text-slate-800">Topical Map</h1>
			<p className="mt-1 text-sm text-slate-500">
				Your content architecture and page recommendations
			</p>

			{/* Page list from topical map */}
			{topicalMapPages.length > 0 ? (
				<div className="mt-6 rounded-xl bg-white shadow-sm">
					<div className="border-b border-slate-200 px-6 py-4">
						<h2 className="text-lg font-semibold text-slate-700">
							Recommended Pages ({topicalMapPages.length})
						</h2>
					</div>
					<div className="divide-y divide-slate-100">
						{topicalMapPages.map((page: any, i: number) => (
							<div key={i} className="flex items-center justify-between px-6 py-3">
								<div>
									<p className="text-sm font-medium text-slate-700">{page.title}</p>
									<p className="text-xs text-slate-400">
										{page.keyword} &middot; {page.pageType}
									</p>
								</div>
								<div>
									{page.contentOrderId ? (
										<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
											Delivered
										</span>
									) : (
										<a
											href={`${wpSiteUrl}/services/content-pages/?topic=${encodeURIComponent(page.title)}&keyword=${encodeURIComponent(page.keyword)}`}
											target="_blank"
											rel="noopener noreferrer"
											className="rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-600"
										>
											Buy Now ($97)
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
					<p className="text-sm text-slate-600">
						Your topical map is being generated. Page recommendations will appear here once complete.
					</p>
				</div>
			)}
		</div>
	);
}
