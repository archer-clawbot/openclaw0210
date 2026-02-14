import { useParams, Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
	pending: { label: "Pending", color: "bg-zinc-700 text-zinc-300" },
	in_progress: { label: "In Progress", color: "bg-blue-900/50 text-blue-400" },
	delivered: { label: "Delivered", color: "bg-emerald-900/50 text-emerald-400" },
	revision: { label: "Revision", color: "bg-amber-900/50 text-amber-400" },
};

export default function DeliverableDetailPage() {
	const { id } = useParams<{ id: string }>();

	const deliverable = useQuery(
		api.wooQueries.getDeliverable,
		id ? { id: id as Id<"wooDeliverables"> } : "skip",
	);

	if (deliverable === undefined) {
		return (
			<div className="p-8">
				<div className="text-zinc-500 text-sm animate-pulse">
					Loading deliverable...
				</div>
			</div>
		);
	}

	if (deliverable === null) {
		return (
			<div className="p-8">
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
					<p className="text-zinc-400 text-lg mb-2">Deliverable not found</p>
					<Link
						to="/portal/deliverables"
						className="text-orange-400 text-sm hover:underline"
					>
						Back to deliverables
					</Link>
				</div>
			</div>
		);
	}

	const style = STATUS_STYLES[deliverable.status] ?? STATUS_STYLES.pending;
	const downloadUrls: string[] = deliverable.downloadUrls
		? JSON.parse(deliverable.downloadUrls)
		: [];

	return (
		<div className="p-8 max-w-3xl">
			{/* Breadcrumb */}
			<div className="mb-6">
				<Link
					to="/portal/deliverables"
					className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
				>
					← Back to deliverables
				</Link>
			</div>

			{/* Header */}
			<div className="flex items-start justify-between mb-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">
						{deliverable.title}
					</h1>
					<p className="text-zinc-500 text-sm mt-1">
						{deliverable.itemType.replace(/_/g, " ")}
						{deliverable.cycleNumber
							? ` — Cycle ${deliverable.cycleNumber}`
							: ""}
					</p>
				</div>
				<span
					className={`text-xs font-medium px-3 py-1.5 rounded-full ${style.color}`}
				>
					{style.label}
				</span>
			</div>

			{/* Details card */}
			<div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-6">
				<div className="px-6 py-4 border-b border-zinc-800">
					<h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
						Details
					</h2>
				</div>
				<div className="px-6 py-4 space-y-3">
					<DetailRow label="Status" value={style.label} />
					{deliverable.quantity != null && (
						<DetailRow
							label="Quantity"
							value={`${deliverable.quantityDelivered ?? 0} / ${deliverable.quantity}`}
						/>
					)}
					{deliverable.dueDate && (
						<DetailRow label="Due Date" value={deliverable.dueDate} />
					)}
					{deliverable.deliveredAt && (
						<DetailRow
							label="Delivered"
							value={new Date(deliverable.deliveredAt).toLocaleDateString(
								"en-US",
								{
									month: "long",
									day: "numeric",
									year: "numeric",
								},
							)}
						/>
					)}
					{deliverable.packageName && (
						<DetailRow label="Package" value={deliverable.packageName} />
					)}
				</div>
			</div>

			{/* Notes */}
			{deliverable.notes && (
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-6">
					<div className="px-6 py-4 border-b border-zinc-800">
						<h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
							Notes from Your SEO Team
						</h2>
					</div>
					<div className="px-6 py-4">
						<p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
							{deliverable.notes}
						</p>
					</div>
				</div>
			)}

			{/* Downloads */}
			{downloadUrls.length > 0 && (
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
					<div className="px-6 py-4 border-b border-zinc-800">
						<h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
							Files
						</h2>
					</div>
					<div className="divide-y divide-zinc-800/50">
						{downloadUrls.map((url, i) => {
							const filename =
								url.split("/").pop() ?? `File ${i + 1}`;
							return (
								<a
									key={i}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 px-6 py-3.5 hover:bg-zinc-800/40 transition-colors"
								>
									<span className="text-lg">📄</span>
									<span className="text-sm font-medium text-orange-400 hover:underline">
										{filename}
									</span>
								</a>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

function DetailRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between text-sm">
			<span className="text-zinc-500">{label}</span>
			<span className="text-zinc-200 font-medium">{value}</span>
		</div>
	);
}
