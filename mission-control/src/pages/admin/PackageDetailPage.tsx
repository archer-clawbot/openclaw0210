import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useParams, Link, useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

const ITEM_TYPES = [
	{ value: "content_pages", label: "Content Pages" },
	{ value: "topical_map", label: "Topical Map" },
	{ value: "citation_package", label: "Citation Package" },
	{ value: "org_schema", label: "Organization Schema" },
	{ value: "page_schema", label: "Page-Level Schema" },
	{ value: "link_building", label: "Link Building" },
	{ value: "gbp_optimization", label: "GBP Optimization" },
	{ value: "technical_audit", label: "Technical Audit" },
	{ value: "custom", label: "Custom" },
];

const FREQUENCIES = [
	{ value: "monthly", label: "Monthly" },
	{ value: "first_month", label: "First Month Only" },
	{ value: "one_time", label: "One-Time" },
	{ value: "quarterly", label: "Quarterly" },
];

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
	active: { label: "Active", color: "bg-emerald-900/50 text-emerald-400" },
	paused: { label: "Paused", color: "bg-amber-900/50 text-amber-400" },
	cancelled: { label: "Cancelled", color: "bg-red-900/50 text-red-400" },
};

export default function PackageDetailPage() {
	const { configId } = useParams();
	const navigate = useNavigate();

	const packageData = useQuery(
		api.wooQueries.getPackageConfig,
		configId ? { id: configId as Id<"wooPackageConfigs"> } : "skip",
	);

	const updateConfig = useMutation(api.wooPackages.updatePackageConfig);
	const deleteConfig = useMutation(api.wooPackages.deletePackageConfig);
	const addItem = useMutation(api.wooPackages.addPackageItem);
	const deleteItem = useMutation(api.wooPackages.deletePackageItem);
	const generateDeliverables = useMutation(
		api.wooDeliverables.generateForPackage,
	);

	const [showAddItem, setShowAddItem] = useState(false);
	const [editingConfig, setEditingConfig] = useState(false);
	const [configForm, setConfigForm] = useState({ name: "", billingCycleDay: "", notes: "" });
	const [itemForm, setItemForm] = useState({
		itemType: "content_pages",
		label: "",
		frequency: "monthly",
		quantity: "1",
		quantityUnit: "pages",
		notes: "",
	});
	const [generating, setGenerating] = useState(false);

	if (packageData === undefined) {
		return (
			<div className="flex items-center justify-center py-32">
				<div className="animate-pulse text-muted-foreground text-sm tracking-widest uppercase">
					Loading...
				</div>
			</div>
		);
	}

	if (!packageData) {
		return (
			<div className="p-8">
				<p className="text-muted-foreground">Package not found.</p>
				<Link to="/admin/packages" className="text-orange-400 text-sm mt-2 inline-block">
					← Back to Packages
				</Link>
			</div>
		);
	}

	const style = STATUS_STYLES[packageData.status] ?? STATUS_STYLES.active;

	const handleEditConfig = () => {
		setConfigForm({
			name: packageData.name,
			billingCycleDay: String(packageData.billingCycleDay),
			notes: packageData.notes ?? "",
		});
		setEditingConfig(true);
	};

	const handleSaveConfig = async () => {
		await updateConfig({
			id: configId as Id<"wooPackageConfigs">,
			name: configForm.name,
			billingCycleDay: Number(configForm.billingCycleDay),
			notes: configForm.notes || undefined,
		});
		setEditingConfig(false);
	};

	const handleStatusChange = async (newStatus: string) => {
		await updateConfig({
			id: configId as Id<"wooPackageConfigs">,
			status: newStatus,
		});
	};

	const handleDelete = async () => {
		if (!confirm("Delete this package and all its items? This cannot be undone.")) return;
		await deleteConfig({ id: configId as Id<"wooPackageConfigs"> });
		navigate("/admin/packages");
	};

	const handleAddItem = async () => {
		if (!itemForm.label) return;
		await addItem({
			packageConfigId: configId as Id<"wooPackageConfigs">,
			itemType: itemForm.itemType,
			label: itemForm.label,
			frequency: itemForm.frequency,
			quantity: Number(itemForm.quantity),
			quantityUnit: itemForm.quantityUnit || undefined,
			notes: itemForm.notes || undefined,
		});
		setShowAddItem(false);
		setItemForm({
			itemType: "content_pages",
			label: "",
			frequency: "monthly",
			quantity: "1",
			quantityUnit: "pages",
			notes: "",
		});
	};

	const handleDeleteItem = async (itemId: Id<"wooPackageItems">) => {
		if (!confirm("Remove this item from the package?")) return;
		await deleteItem({ id: itemId });
	};

	const handleGenerate = async () => {
		setGenerating(true);
		try {
			const result = await generateDeliverables({
				packageConfigId: configId as Id<"wooPackageConfigs">,
			});
			alert(`Generated ${result.generated} deliverable(s) for this cycle.`);
		} catch (err: any) {
			alert(`Error: ${err.message}`);
		}
		setGenerating(false);
	};

	return (
		<>
			{/* Page header */}
			<div className="border-b border-border px-8 py-5">
				<div className="flex items-center gap-3 mb-1 text-sm">
					<Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
						Ops
					</Link>
					<span className="text-muted-foreground/40">/</span>
					<Link to="/admin/packages" className="text-muted-foreground hover:text-foreground transition-colors">
						Packages
					</Link>
					<span className="text-muted-foreground/40">/</span>
					<span className="text-foreground/80">{packageData.name}</span>
				</div>
			</div>

			<div className="p-8 max-w-5xl">
				{/* Package info card */}
				<div className="bg-card border border-border rounded-xl p-6 mb-6">
					<div className="flex items-start justify-between mb-4">
						<div>
							{editingConfig ? (
								<input
									type="text"
									value={configForm.name}
									onChange={(e) =>
										setConfigForm({ ...configForm, name: e.target.value })
									}
									className="text-xl font-bold bg-input border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:border-primary"
								/>
							) : (
								<h2 className="text-xl font-bold">{packageData.name}</h2>
							)}
							<p className="text-sm text-muted-foreground mt-1">
								{packageData.customerName} — {packageData.customerEmail}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${style.color}`}>
								{style.label}
							</span>
						</div>
					</div>

					<div className="grid grid-cols-4 gap-4 mb-4">
						<div className="bg-muted rounded-lg p-3">
							<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
								Current Cycle
							</p>
							<p className="text-lg font-bold">{packageData.currentCycleNumber}</p>
						</div>
						<div className="bg-muted rounded-lg p-3">
							<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
								Billing Day
							</p>
							{editingConfig ? (
								<input
									type="number"
									min={1}
									max={28}
									value={configForm.billingCycleDay}
									onChange={(e) =>
										setConfigForm({ ...configForm, billingCycleDay: e.target.value })
									}
									className="text-lg font-bold bg-input border border-border rounded px-2 py-0.5 w-16 text-foreground focus:outline-none focus:border-primary"
								/>
							) : (
								<p className="text-lg font-bold">{packageData.billingCycleDay}</p>
							)}
						</div>
						<div className="bg-muted rounded-lg p-3">
							<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
								Start Date
							</p>
							<p className="text-lg font-bold">{packageData.startDate}</p>
						</div>
						<div className="bg-muted rounded-lg p-3">
							<p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
								Items
							</p>
							<p className="text-lg font-bold">{packageData.items.length}</p>
						</div>
					</div>

					{editingConfig && (
						<div className="mb-4">
							<label className="block text-xs text-muted-foreground mb-1">Notes</label>
							<input
								type="text"
								value={configForm.notes}
								onChange={(e) =>
									setConfigForm({ ...configForm, notes: e.target.value })
								}
								className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
							/>
						</div>
					)}

					{/* Action buttons */}
					<div className="flex items-center gap-2 pt-2 border-t border-border">
						{editingConfig ? (
							<>
								<button onClick={handleSaveConfig} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer">
									Save
								</button>
								<button onClick={() => setEditingConfig(false)} className="px-3 py-1.5 bg-muted hover:bg-accent text-muted-foreground text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer">
									Cancel
								</button>
							</>
						) : (
							<>
								<button onClick={handleEditConfig} className="px-3 py-1.5 bg-muted hover:bg-accent text-muted-foreground text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer">
									Edit
								</button>
								<button
									onClick={handleGenerate}
									disabled={generating || packageData.status !== "active"}
									className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
								>
									{generating ? "Generating..." : "Generate Deliverables"}
								</button>
								{packageData.status === "active" && (
									<button onClick={() => handleStatusChange("paused")} className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer">
										Pause
									</button>
								)}
								{packageData.status === "paused" && (
									<button onClick={() => handleStatusChange("active")} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer">
										Resume
									</button>
								)}
								<button onClick={handleDelete} className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800 text-red-400 text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ml-auto">
									Delete
								</button>
							</>
						)}
					</div>
				</div>

				{/* Package items */}
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-sm font-bold tracking-wider uppercase text-muted-foreground">
						Package Items
					</h3>
					<button
						onClick={() => setShowAddItem(!showAddItem)}
						className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
					>
						+ Add Item
					</button>
				</div>

				{/* Add item form */}
				{showAddItem && (
					<div className="bg-card border border-border rounded-xl p-5 mb-4">
						<div className="grid grid-cols-3 gap-4 mb-4">
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">Type</label>
								<select
									value={itemForm.itemType}
									onChange={(e) =>
										setItemForm({ ...itemForm, itemType: e.target.value })
									}
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
								>
									{ITEM_TYPES.map((t) => (
										<option key={t.value} value={t.value}>{t.label}</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">Label</label>
								<input
									type="text"
									value={itemForm.label}
									onChange={(e) =>
										setItemForm({ ...itemForm, label: e.target.value })
									}
									placeholder="Blog Content Pages"
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary"
								/>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">Frequency</label>
								<select
									value={itemForm.frequency}
									onChange={(e) =>
										setItemForm({ ...itemForm, frequency: e.target.value })
									}
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
								>
									{FREQUENCIES.map((f) => (
										<option key={f.value} value={f.value}>{f.label}</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">Quantity</label>
								<input
									type="number"
									min={1}
									value={itemForm.quantity}
									onChange={(e) =>
										setItemForm({ ...itemForm, quantity: e.target.value })
									}
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
								/>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">Unit</label>
								<input
									type="text"
									value={itemForm.quantityUnit}
									onChange={(e) =>
										setItemForm({ ...itemForm, quantityUnit: e.target.value })
									}
									placeholder="pages, citations, links..."
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary"
								/>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">Notes</label>
								<input
									type="text"
									value={itemForm.notes}
									onChange={(e) =>
										setItemForm({ ...itemForm, notes: e.target.value })
									}
									placeholder="Optional notes..."
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary"
								/>
							</div>
						</div>
						<div className="flex gap-3">
							<button
								onClick={handleAddItem}
								disabled={!itemForm.label}
								className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
							>
								Add Item
							</button>
							<button
								onClick={() => setShowAddItem(false)}
								className="px-4 py-2 bg-muted hover:bg-accent text-muted-foreground text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
							>
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Items list */}
				{packageData.items.length === 0 ? (
					<div className="bg-card border border-border rounded-xl p-8 text-center">
						<p className="text-muted-foreground mb-1">No items configured</p>
						<p className="text-xs text-muted-foreground/60">
							Add deliverable items to define what this client receives each cycle.
						</p>
					</div>
				) : (
					<div className="space-y-2">
						{packageData.items.map((item) => {
							const typeLabel = ITEM_TYPES.find((t) => t.value === item.itemType)?.label ?? item.itemType;
							const freqLabel = FREQUENCIES.find((f) => f.value === item.frequency)?.label ?? item.frequency;
							const completed = JSON.parse(item.completedCycles || "[]") as number[];

							return (
								<div
									key={item._id}
									className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-1">
											<p className="text-sm font-semibold">{item.label}</p>
											<span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
												{typeLabel}
											</span>
										</div>
										<div className="flex items-center gap-4 text-xs text-muted-foreground">
											<span>{item.quantity} {item.quantityUnit ?? "units"} / {freqLabel.toLowerCase()}</span>
											{completed.length > 0 && (
												<span className="text-emerald-500">
													Completed cycles: {completed.join(", ")}
												</span>
											)}
											{item.notes && (
												<span className="italic text-muted-foreground/60">{item.notes}</span>
											)}
										</div>
									</div>
									<button
										onClick={() => handleDeleteItem(item._id)}
										className="text-xs text-red-400/60 hover:text-red-400 transition-colors px-2 py-1 cursor-pointer"
									>
										Remove
									</button>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}
