import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router";
import type { Id } from "../../../convex/_generated/dataModel";

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
	pending: { label: "Pending", color: "bg-muted text-muted-foreground" },
	in_progress: { label: "In Progress", color: "bg-blue-900/50 text-blue-400" },
	delivered: { label: "Delivered", color: "bg-emerald-900/50 text-emerald-400" },
	revision: { label: "Revision", color: "bg-amber-900/50 text-amber-400" },
};

const ITEM_TYPE_LABELS: Record<string, string> = {
	content_pages: "Content Pages",
	topical_map: "Topical Map",
	citation_package: "Citations",
	org_schema: "Org Schema",
	page_schema: "Page Schema",
	link_building: "Link Building",
	gbp_optimization: "GBP",
	technical_audit: "Tech Audit",
	custom: "Custom",
};

export default function AdminDeliverablesPage() {
	const [statusFilter, setStatusFilter] = useState<string>("");
	const [typeFilter, setTypeFilter] = useState<string>("");

	const allDeliverables = useQuery(api.wooQueries.listAllDeliverables, {
		status: statusFilter || undefined,
	});
	const generateAll = useMutation(api.wooDeliverables.generateCycleDeliverables);
	const updateStatus = useMutation(api.wooDeliverables.updateDeliverableStatus);

	const [generating, setGenerating] = useState(false);

	const handleGenerateAll = async () => {
		setGenerating(true);
		try {
			const result = await generateAll({});
			alert(
				`Generated ${result.generated} deliverable(s) across ${result.configsProcessed} package(s).`,
			);
		} catch (err: any) {
			alert(`Error: ${err.message}`);
		}
		setGenerating(false);
	};

	const handleQuickStatus = async (
		id: Id<"wooDeliverables">,
		status: string,
	) => {
		await updateStatus({ id, status });
	};

	// Apply type filter client-side (status filter is server-side)
	const filtered = typeFilter
		? (allDeliverables ?? []).filter((d) => d.itemType === typeFilter)
		: (allDeliverables ?? []);

	// Gather unique item types for the filter dropdown
	const itemTypes = [
		...new Set((allDeliverables ?? []).map((d) => d.itemType)),
	].sort();

	// Stats
	const stats = {
		total: (allDeliverables ?? []).length,
		pending: (allDeliverables ?? []).filter((d) => d.status === "pending").length,
		in_progress: (allDeliverables ?? []).filter((d) => d.status === "in_progress").length,
		delivered: (allDeliverables ?? []).filter((d) => d.status === "delivered").length,
	};

	return (
		<>
			{/* Page header */}
			<div className="border-b border-border px-8 py-5 flex items-center justify-between">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<Link
							to="/admin"
							className="text-muted-foreground hover:text-foreground text-sm transition-colors"
						>
							← Ops
						</Link>
						<span className="text-muted-foreground/40">/</span>
						<h1 className="text-lg font-bold tracking-wider uppercase">
							Deliverables
						</h1>
					</div>
					<p className="text-xs text-muted-foreground">
						All client deliverables across packages
					</p>
				</div>
				<button
					onClick={handleGenerateAll}
					disabled={generating}
					className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
				>
					{generating ? "Generating..." : "Run Cycle Generation"}
				</button>
			</div>

			<div className="p-8 max-w-6xl">
				{/* Stats row */}
				<div className="grid grid-cols-4 gap-4 mb-6">
					<button
						onClick={() => setStatusFilter("")}
						className={`bg-card border rounded-xl p-4 text-left transition-colors cursor-pointer ${
							statusFilter === ""
								? "border-orange-500/50"
								: "border-border hover:border-border"
						}`}
					>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
							Total
						</p>
						<p className="text-2xl font-bold">{stats.total}</p>
					</button>
					<button
						onClick={() =>
							setStatusFilter(statusFilter === "pending" ? "" : "pending")
						}
						className={`bg-card border rounded-xl p-4 text-left transition-colors cursor-pointer ${
							statusFilter === "pending"
								? "border-orange-500/50"
								: "border-border hover:border-border"
						}`}
					>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
							Pending
						</p>
						<p className="text-2xl font-bold text-muted-foreground">{stats.pending}</p>
					</button>
					<button
						onClick={() =>
							setStatusFilter(
								statusFilter === "in_progress" ? "" : "in_progress",
							)
						}
						className={`bg-card border rounded-xl p-4 text-left transition-colors cursor-pointer ${
							statusFilter === "in_progress"
								? "border-orange-500/50"
								: "border-border hover:border-border"
						}`}
					>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
							In Progress
						</p>
						<p className="text-2xl font-bold text-blue-400">
							{stats.in_progress}
						</p>
					</button>
					<button
						onClick={() =>
							setStatusFilter(
								statusFilter === "delivered" ? "" : "delivered",
							)
						}
						className={`bg-card border rounded-xl p-4 text-left transition-colors cursor-pointer ${
							statusFilter === "delivered"
								? "border-orange-500/50"
								: "border-border hover:border-border"
						}`}
					>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
							Delivered
						</p>
						<p className="text-2xl font-bold text-emerald-400">
							{stats.delivered}
						</p>
					</button>
				</div>

				{/* Type filter */}
				{itemTypes.length > 0 && (
					<div className="flex items-center gap-2 mb-4">
						<span className="text-xs text-muted-foreground">Filter by type:</span>
						<button
							onClick={() => setTypeFilter("")}
							className={`px-2.5 py-1 text-[11px] rounded-full transition-colors cursor-pointer ${
								typeFilter === ""
									? "bg-orange-600 text-white"
									: "bg-muted text-muted-foreground hover:text-foreground"
							}`}
						>
							All
						</button>
						{itemTypes.map((type) => (
							<button
								key={type}
								onClick={() =>
									setTypeFilter(typeFilter === type ? "" : type)
								}
								className={`px-2.5 py-1 text-[11px] rounded-full transition-colors cursor-pointer ${
									typeFilter === type
										? "bg-orange-600 text-white"
										: "bg-muted text-muted-foreground hover:text-foreground"
								}`}
							>
								{ITEM_TYPE_LABELS[type] ?? type}
							</button>
						))}
					</div>
				)}

				{/* Deliverables list */}
				{allDeliverables === undefined ? (
					<div className="text-muted-foreground text-sm animate-pulse">
						Loading deliverables...
					</div>
				) : filtered.length === 0 ? (
					<div className="bg-card border border-border rounded-xl p-12 text-center">
						<p className="text-muted-foreground text-lg mb-2">
							{statusFilter || typeFilter
								? "No deliverables match filters"
								: "No deliverables yet"}
						</p>
						<p className="text-muted-foreground/60 text-sm">
							{statusFilter || typeFilter
								? "Try adjusting your filters."
								: "Configure packages and run the generation engine."}
						</p>
					</div>
				) : (
					<div className="space-y-2">
						{filtered.map((d) => {
							const style =
								STATUS_STYLES[d.status] ?? STATUS_STYLES.pending;
							return (
								<div
									key={d._id}
									className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-border transition-colors"
								>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-3 mb-1">
											<Link
												to={`/admin/deliverables/${d._id}`}
												className="text-sm font-semibold hover:text-orange-400 transition-colors truncate"
											>
												{d.title}
											</Link>
											<span
												className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${style.color}`}
											>
												{style.label}
											</span>
										</div>
										<div className="flex items-center gap-4 text-xs text-muted-foreground">
											<span>{d.customerName}</span>
											<span>
												{ITEM_TYPE_LABELS[d.itemType] ?? d.itemType}
											</span>
											{d.cycleNumber && (
												<span>Cycle {d.cycleNumber}</span>
											)}
											{d.quantity && (
												<span>
													{d.quantityDelivered ?? 0}/{d.quantity}
												</span>
											)}
										</div>
									</div>

									{/* Quick status buttons */}
									<div className="flex items-center gap-1 shrink-0">
										{d.status === "pending" && (
											<button
												onClick={() =>
													handleQuickStatus(d._id, "in_progress")
												}
												className="px-2 py-1 text-[10px] font-bold uppercase bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors cursor-pointer"
											>
												Start
											</button>
										)}
										{d.status === "in_progress" && (
											<Link
												to={`/admin/deliverables/${d._id}`}
												className="px-2 py-1 text-[10px] font-bold uppercase bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 rounded-lg transition-colors"
											>
												Deliver
											</Link>
										)}
										{d.status === "delivered" && d.deliveredAt && (
											<span className="text-[10px] text-muted-foreground/60">
												{new Date(d.deliveredAt).toLocaleDateString()}
											</span>
										)}
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}
