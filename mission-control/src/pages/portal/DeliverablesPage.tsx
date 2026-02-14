import { useQuery } from "convex/react";
import { Link, useSearchParams } from "react-router";
import { api } from "../../../convex/_generated/api";

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
	pending: { label: "Pending", color: "bg-zinc-700 text-zinc-300" },
	in_progress: { label: "In Progress", color: "bg-blue-900/50 text-blue-400" },
	delivered: { label: "Delivered", color: "bg-emerald-900/50 text-emerald-400" },
	revision: { label: "Revision", color: "bg-amber-900/50 text-amber-400" },
};

const ITEM_TYPES = [
	"content_pages",
	"topical_map",
	"citation_package",
	"org_schema",
	"page_schema",
	"link_building",
	"seo_audit",
	"gbp_optimization",
];

export default function DeliverablesPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type") ?? "";

	const roleData = useQuery(api.portalAuth.resolveRole);
	const customerId = roleData?.customer?.id;

	const deliverables = useQuery(
		api.wooQueries.listDeliverablesByCustomer,
		customerId
			? { customerId, ...(typeFilter ? { itemType: typeFilter } : {}) }
			: "skip",
	);

	return (
		<div className="p-8 max-w-5xl">
			<div className="mb-8 flex items-end justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Deliverables</h1>
					<p className="text-zinc-500 text-sm mt-1">
						All completed and in-progress work for your account.
					</p>
				</div>
			</div>

			{/* Type filter */}
			<div className="flex gap-2 mb-6 flex-wrap">
				<button
					onClick={() => setSearchParams({})}
					className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
						!typeFilter
							? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
							: "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
					}`}
				>
					All
				</button>
				{ITEM_TYPES.map((type) => (
					<button
						key={type}
						onClick={() => setSearchParams({ type })}
						className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
							typeFilter === type
								? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
								: "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
						}`}
					>
						{type.replace(/_/g, " ")}
					</button>
				))}
			</div>

			{/* Deliverables list */}
			{deliverables === undefined ? (
				<div className="text-zinc-500 text-sm animate-pulse">
					Loading deliverables...
				</div>
			) : deliverables.length === 0 ? (
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
					<p className="text-zinc-400 text-lg mb-2">
						{typeFilter
							? `No ${typeFilter.replace(/_/g, " ")} deliverables`
							: "No deliverables yet"}
					</p>
					<p className="text-zinc-600 text-sm">
						Deliverables will appear here as your SEO work is completed.
					</p>
				</div>
			) : (
				<div className="space-y-2">
					{deliverables.map((d) => {
						const style = STATUS_STYLES[d.status] ?? STATUS_STYLES.pending;
						return (
							<Link
								key={d._id}
								to={`/portal/deliverables/${d._id}`}
								className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 hover:border-zinc-700 transition-all group"
							>
								<div className="flex-1 min-w-0">
									<p className="font-medium text-sm group-hover:text-orange-400 transition-colors">
										{d.title}
									</p>
									<div className="flex items-center gap-3 mt-1">
										<span className="text-xs text-zinc-500">
											{d.itemType.replace(/_/g, " ")}
										</span>
										{d.cycleNumber && (
											<span className="text-xs text-zinc-600">
												Cycle {d.cycleNumber}
											</span>
										)}
										{d.deliveredAt && (
											<span className="text-xs text-zinc-600">
												{new Date(d.deliveredAt).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})}
											</span>
										)}
									</div>
								</div>
								<span
									className={`text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 ${style.color}`}
								>
									{style.label}
								</span>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
