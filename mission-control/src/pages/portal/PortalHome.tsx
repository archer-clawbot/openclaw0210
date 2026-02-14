import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router";

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
	pending: { label: "Pending", color: "bg-zinc-700 text-zinc-300" },
	in_progress: { label: "In Progress", color: "bg-blue-900/50 text-blue-400" },
	delivered: { label: "Delivered", color: "bg-emerald-900/50 text-emerald-400" },
	revision: { label: "Revision", color: "bg-amber-900/50 text-amber-400" },
};

export default function PortalHome() {
	const roleData = useQuery(api.portalAuth.resolveRole);
	const customerId = roleData?.customer?.id;

	const deliverables = useQuery(
		api.wooQueries.listDeliverablesByCustomer,
		customerId ? { customerId } : "skip",
	);

	const packages = useQuery(
		api.wooQueries.listPackageConfigs,
		customerId ? { customerId } : "skip",
	);

	const firstName = roleData?.customer?.firstName ?? "there";

	// Group deliverables by cycle
	const byCycle = (deliverables ?? []).reduce(
		(acc, d) => {
			const cycle = d.cycleNumber ?? 0;
			if (!acc[cycle]) acc[cycle] = [];
			acc[cycle].push(d);
			return acc;
		},
		{} as Record<number, typeof deliverables>,
	);

	const sortedCycles = Object.keys(byCycle)
		.map(Number)
		.sort((a, b) => b - a);

	return (
		<div className="p-8 max-w-5xl">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold tracking-tight">
					Welcome back, {firstName}
				</h1>
				<p className="text-zinc-500 text-sm mt-1">
					Here's an overview of your SEO deliverables.
				</p>
			</div>

			{/* Stats row */}
			<div className="grid grid-cols-3 gap-4 mb-8">
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
					<p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
						Active Packages
					</p>
					<p className="text-2xl font-bold">
						{packages?.filter((p) => p.status === "active").length ?? 0}
					</p>
				</div>
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
					<p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
						In Progress
					</p>
					<p className="text-2xl font-bold text-blue-400">
						{deliverables?.filter((d) => d.status === "in_progress").length ?? 0}
					</p>
				</div>
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
					<p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
						Delivered
					</p>
					<p className="text-2xl font-bold text-emerald-400">
						{deliverables?.filter((d) => d.status === "delivered").length ?? 0}
					</p>
				</div>
			</div>

			{/* Deliverables by cycle */}
			{deliverables === undefined ? (
				<div className="text-zinc-500 text-sm animate-pulse">
					Loading deliverables...
				</div>
			) : sortedCycles.length === 0 ? (
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
					<p className="text-zinc-400 text-lg mb-2">No deliverables yet</p>
					<p className="text-zinc-600 text-sm">
						Once your SEO package begins, deliverables will appear here
						organized by billing cycle.
					</p>
				</div>
			) : (
				<div className="space-y-6">
					{sortedCycles.map((cycle) => (
						<div
							key={cycle}
							className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
						>
							<div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
								<h2 className="font-semibold text-sm tracking-wide uppercase">
									Cycle {cycle}
								</h2>
								<span className="text-xs text-zinc-500">
									{byCycle[cycle]!.length} item
									{byCycle[cycle]!.length !== 1 ? "s" : ""}
								</span>
							</div>
							<div className="divide-y divide-zinc-800/50">
								{byCycle[cycle]!.map((d) => {
									const style =
										STATUS_STYLES[d.status] ?? STATUS_STYLES.pending;
									return (
										<Link
											key={d._id}
											to={`/portal/deliverables/${d._id}`}
											className="flex items-center justify-between px-6 py-3.5 hover:bg-zinc-800/40 transition-colors"
										>
											<div>
												<p className="text-sm font-medium">{d.title}</p>
												<p className="text-xs text-zinc-500 mt-0.5">
													{d.itemType}
												</p>
											</div>
											<span
												className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${style.color}`}
											>
												{style.label}
											</span>
										</Link>
									);
								})}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
