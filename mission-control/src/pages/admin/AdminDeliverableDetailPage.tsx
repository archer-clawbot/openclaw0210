import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { useParams, Link, useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

const STATUS_OPTIONS = [
	{ value: "pending", label: "Pending", color: "bg-zinc-700 text-zinc-300" },
	{
		value: "in_progress",
		label: "In Progress",
		color: "bg-blue-900/50 text-blue-400",
	},
	{
		value: "delivered",
		label: "Delivered",
		color: "bg-emerald-900/50 text-emerald-400",
	},
	{
		value: "revision",
		label: "Revision",
		color: "bg-amber-900/50 text-amber-400",
	},
];

const ITEM_TYPE_LABELS: Record<string, string> = {
	content_pages: "Content Pages",
	topical_map: "Topical Map",
	citation_package: "Citation Package",
	org_schema: "Organization Schema",
	page_schema: "Page-Level Schema",
	link_building: "Link Building",
	gbp_optimization: "GBP Optimization",
	technical_audit: "Technical Audit",
	custom: "Custom",
};

export default function AdminDeliverableDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const deliverable = useQuery(
		api.wooQueries.getDeliverable,
		id ? { id: id as Id<"wooDeliverables"> } : "skip",
	);

	const updateDeliverable = useMutation(api.wooDeliverables.updateDeliverable);
	const markDelivered = useMutation(api.wooDeliverables.markDelivered);
	const deleteDeliverable = useMutation(api.wooDeliverables.deleteDeliverable);

	const [editing, setEditing] = useState(false);
	const [delivering, setDelivering] = useState(false);
	const [form, setForm] = useState({
		title: "",
		status: "",
		quantity: "",
		quantityDelivered: "",
		dueDate: "",
		notes: "",
		downloadUrls: "",
	});

	// Sync form when data loads
	useEffect(() => {
		if (deliverable) {
			const urls = deliverable.downloadUrls
				? JSON.parse(deliverable.downloadUrls).join("\n")
				: "";
			setForm({
				title: deliverable.title,
				status: deliverable.status,
				quantity: String(deliverable.quantity ?? ""),
				quantityDelivered: String(deliverable.quantityDelivered ?? ""),
				dueDate: deliverable.dueDate ?? "",
				notes: deliverable.notes ?? "",
				downloadUrls: urls,
			});
		}
	}, [deliverable]);

	if (deliverable === undefined) {
		return (
			<div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
				<div className="animate-pulse text-zinc-500 text-sm tracking-widest uppercase">
					Loading...
				</div>
			</div>
		);
	}

	if (!deliverable) {
		return (
			<div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
				<p className="text-zinc-400">Deliverable not found.</p>
				<Link
					to="/admin/deliverables"
					className="text-orange-400 text-sm mt-2 inline-block"
				>
					← Back to Deliverables
				</Link>
			</div>
		);
	}

	const currentStatus =
		STATUS_OPTIONS.find((s) => s.value === deliverable.status) ??
		STATUS_OPTIONS[0];

	const handleSave = async () => {
		const urlArray = form.downloadUrls
			.split("\n")
			.map((u) => u.trim())
			.filter(Boolean);

		await updateDeliverable({
			id: id as Id<"wooDeliverables">,
			title: form.title,
			status: form.status,
			quantity: form.quantity ? Number(form.quantity) : undefined,
			quantityDelivered: form.quantityDelivered
				? Number(form.quantityDelivered)
				: undefined,
			dueDate: form.dueDate || undefined,
			notes: form.notes || undefined,
			downloadUrls:
				urlArray.length > 0 ? JSON.stringify(urlArray) : undefined,
		});
		setEditing(false);
	};

	const handleMarkDelivered = async () => {
		setDelivering(true);
		try {
			const urlArray = form.downloadUrls
				.split("\n")
				.map((u) => u.trim())
				.filter(Boolean);

			await markDelivered({
				id: id as Id<"wooDeliverables">,
				downloadUrls:
					urlArray.length > 0 ? JSON.stringify(urlArray) : undefined,
				notes: form.notes || undefined,
			});
		} catch (err: any) {
			alert(`Error: ${err.message}`);
		}
		setDelivering(false);
	};

	const handleDelete = async () => {
		if (
			!confirm(
				"Delete this deliverable? This cannot be undone.",
			)
		)
			return;
		await deleteDeliverable({ id: id as Id<"wooDeliverables"> });
		navigate("/admin/deliverables");
	};

	const downloadUrls: string[] = deliverable.downloadUrls
		? JSON.parse(deliverable.downloadUrls)
		: [];

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			{/* Header */}
			<div className="border-b border-zinc-800 px-8 py-5">
				<div className="flex items-center gap-3 mb-1 text-sm">
					<Link
						to="/admin"
						className="text-zinc-500 hover:text-zinc-300 transition-colors"
					>
						Ops
					</Link>
					<span className="text-zinc-700">/</span>
					<Link
						to="/admin/deliverables"
						className="text-zinc-500 hover:text-zinc-300 transition-colors"
					>
						Deliverables
					</Link>
					<span className="text-zinc-700">/</span>
					<span className="text-zinc-300 truncate max-w-sm">
						{deliverable.title}
					</span>
				</div>
			</div>

			<div className="p-8 max-w-4xl">
				{/* Main card */}
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
					<div className="flex items-start justify-between mb-6">
						<div className="flex-1">
							{editing ? (
								<input
									type="text"
									value={form.title}
									onChange={(e) =>
										setForm({ ...form, title: e.target.value })
									}
									className="text-xl font-bold bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-100 w-full focus:outline-none focus:border-orange-500"
								/>
							) : (
								<h2 className="text-xl font-bold">{deliverable.title}</h2>
							)}
							<div className="flex items-center gap-4 text-sm text-zinc-500 mt-2">
								<span>{deliverable.customerName}</span>
								<span>{deliverable.customerEmail}</span>
								{deliverable.packageName && (
									<span>
										Package:{" "}
										{deliverable.packageConfigId ? (
											<Link
												to={`/admin/packages/${deliverable.packageConfigId}`}
												className="text-orange-400 hover:text-orange-300"
											>
												{deliverable.packageName}
											</Link>
										) : (
											deliverable.packageName
										)}
									</span>
								)}
							</div>
						</div>
						<span
							className={`text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 ${currentStatus.color}`}
						>
							{currentStatus.label}
						</span>
					</div>

					{/* Info grid */}
					<div className="grid grid-cols-4 gap-4 mb-6">
						<div className="bg-zinc-800/50 rounded-lg p-3">
							<p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">
								Type
							</p>
							<p className="text-sm font-medium">
								{ITEM_TYPE_LABELS[deliverable.itemType] ??
									deliverable.itemType}
							</p>
						</div>
						<div className="bg-zinc-800/50 rounded-lg p-3">
							<p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">
								Cycle
							</p>
							<p className="text-sm font-medium">
								{deliverable.cycleNumber ?? "—"}
							</p>
						</div>
						<div className="bg-zinc-800/50 rounded-lg p-3">
							<p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">
								Progress
							</p>
							{editing ? (
								<div className="flex items-center gap-1">
									<input
										type="number"
										min={0}
										value={form.quantityDelivered}
										onChange={(e) =>
											setForm({
												...form,
												quantityDelivered: e.target.value,
											})
										}
										className="w-12 text-sm font-medium bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-zinc-100 focus:outline-none focus:border-orange-500"
									/>
									<span className="text-zinc-500">/</span>
									<input
										type="number"
										min={0}
										value={form.quantity}
										onChange={(e) =>
											setForm({ ...form, quantity: e.target.value })
										}
										className="w-12 text-sm font-medium bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-zinc-100 focus:outline-none focus:border-orange-500"
									/>
								</div>
							) : (
								<p className="text-sm font-medium">
									{deliverable.quantityDelivered ?? 0}/
									{deliverable.quantity ?? 0}
								</p>
							)}
						</div>
						<div className="bg-zinc-800/50 rounded-lg p-3">
							<p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">
								Due Date
							</p>
							{editing ? (
								<input
									type="date"
									value={form.dueDate}
									onChange={(e) =>
										setForm({ ...form, dueDate: e.target.value })
									}
									className="text-sm font-medium bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-zinc-100 focus:outline-none focus:border-orange-500"
								/>
							) : (
								<p className="text-sm font-medium">
									{deliverable.dueDate ?? "—"}
								</p>
							)}
						</div>
					</div>

					{/* Timestamps */}
					<div className="flex items-center gap-6 text-xs text-zinc-600 mb-6">
						<span>
							Created{" "}
							{new Date(deliverable._creationTime).toLocaleDateString()}
						</span>
						{deliverable.deliveredAt && (
							<span className="text-emerald-600">
								Delivered{" "}
								{new Date(deliverable.deliveredAt).toLocaleDateString()}
							</span>
						)}
						{deliverable.emailSentAt && (
							<span className="text-blue-600">
								Email sent{" "}
								{new Date(deliverable.emailSentAt).toLocaleDateString()}
							</span>
						)}
					</div>

					{/* Status selector (edit mode) */}
					{editing && (
						<div className="mb-4">
							<label className="block text-xs text-zinc-500 mb-1.5">
								Status
							</label>
							<select
								value={form.status}
								onChange={(e) =>
									setForm({ ...form, status: e.target.value })
								}
								className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
							>
								{STATUS_OPTIONS.map((s) => (
									<option key={s.value} value={s.value}>
										{s.label}
									</option>
								))}
							</select>
						</div>
					)}

					{/* Action bar */}
					<div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
						{editing ? (
							<>
								<button
									onClick={handleSave}
									className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
								>
									Save Changes
								</button>
								<button
									onClick={() => setEditing(false)}
									className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
								>
									Cancel
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => setEditing(true)}
									className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
								>
									Edit
								</button>
								{deliverable.status !== "delivered" && (
									<button
										onClick={handleMarkDelivered}
										disabled={delivering}
										className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
									>
										{delivering
											? "Delivering..."
											: "Mark Delivered + Notify Client"}
									</button>
								)}
								<button
									onClick={handleDelete}
									className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800 text-red-400 text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ml-auto"
								>
									Delete
								</button>
							</>
						)}
					</div>
				</div>

				{/* Download URLs / Files */}
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
					<h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400 mb-4">
						Files & Downloads
					</h3>

					{editing ? (
						<div>
							<label className="block text-xs text-zinc-500 mb-1.5">
								Download URLs (one per line)
							</label>
							<textarea
								value={form.downloadUrls}
								onChange={(e) =>
									setForm({ ...form, downloadUrls: e.target.value })
								}
								rows={5}
								placeholder="https://drive.google.com/file/d/xxx&#10;https://docs.google.com/document/d/xxx"
								className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 font-mono focus:outline-none focus:border-orange-500 resize-y"
							/>
						</div>
					) : downloadUrls.length > 0 ? (
						<div className="space-y-2">
							{downloadUrls.map((url, i) => (
								<a
									key={i}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
								>
									<span className="text-base">📄</span>
									<span className="truncate">{url}</span>
								</a>
							))}
						</div>
					) : (
						<p className="text-zinc-600 text-sm">
							No files attached yet. Edit to add download URLs.
						</p>
					)}
				</div>

				{/* Notes */}
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
					<h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400 mb-4">
						Notes
					</h3>
					{editing ? (
						<textarea
							value={form.notes}
							onChange={(e) =>
								setForm({ ...form, notes: e.target.value })
							}
							rows={4}
							placeholder="Internal or client-facing notes about this deliverable..."
							className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500 resize-y"
						/>
					) : deliverable.notes ? (
						<p className="text-sm text-zinc-300 whitespace-pre-wrap">
							{deliverable.notes}
						</p>
					) : (
						<p className="text-zinc-600 text-sm">No notes.</p>
					)}
				</div>
			</div>
		</div>
	);
}
