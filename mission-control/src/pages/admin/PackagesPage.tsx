import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router";
import type { Id } from "../../../convex/_generated/dataModel";

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
	active: { label: "Active", color: "bg-emerald-900/50 text-emerald-400" },
	paused: { label: "Paused", color: "bg-amber-900/50 text-amber-400" },
	cancelled: { label: "Cancelled", color: "bg-red-900/50 text-red-400" },
};

export default function PackagesPage() {
	const packages = useQuery(api.wooQueries.listPackageConfigs, {});
	const customers = useQuery(api.wooQueries.listCustomers);
	const createPackage = useMutation(api.wooPackages.createPackageConfig);

	const [showCreate, setShowCreate] = useState(false);
	const [form, setForm] = useState({
		customerId: "" as string,
		wcOrderId: "",
		name: "",
		billingCycleDay: "1",
		startDate: new Date().toISOString().split("T")[0],
		notes: "",
	});

	const handleCreate = async () => {
		if (!form.customerId || !form.name) return;
		await createPackage({
			customerId: form.customerId as Id<"wooCustomers">,
			wcOrderId: Number(form.wcOrderId) || 0,
			name: form.name,
			billingCycleDay: Number(form.billingCycleDay),
			startDate: form.startDate,
			notes: form.notes || undefined,
		});
		setShowCreate(false);
		setForm({
			customerId: "",
			wcOrderId: "",
			name: "",
			billingCycleDay: "1",
			startDate: new Date().toISOString().split("T")[0],
			notes: "",
		});
	};

	// Join packages with customer names
	const enriched = (packages ?? []).map((pkg) => {
		const customer = customers?.find((c) => c._id === pkg.customerId);
		return {
			...pkg,
			customerName: customer
				? `${customer.firstName} ${customer.lastName}`.trim()
				: "Unknown",
		};
	});

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
							Packages
						</h1>
					</div>
					<p className="text-xs text-muted-foreground">
						{enriched.length} client package
						{enriched.length !== 1 ? "s" : ""} configured
					</p>
				</div>
				<button
					onClick={() => setShowCreate(!showCreate)}
					className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
				>
					+ New Package
				</button>
			</div>

			<div className="p-8 max-w-6xl">
				{/* Create form */}
				{showCreate && (
					<div className="bg-card border border-border rounded-xl p-6 mb-8">
						<h2 className="text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">
							New Package Configuration
						</h2>
						<div className="grid grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">
									Customer
								</label>
								<select
									value={form.customerId}
									onChange={(e) =>
										setForm({ ...form, customerId: e.target.value })
									}
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
								>
									<option value="">Select customer...</option>
									{(customers ?? []).map((c) => (
										<option key={c._id} value={c._id}>
											{c.firstName} {c.lastName}{" "}
											{c.company ? `(${c.company})` : ""} — {c.email}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">
									Package Name
								</label>
								<input
									type="text"
									value={form.name}
									onChange={(e) => setForm({ ...form, name: e.target.value })}
									placeholder="Acme Corp - Monthly SEO Package"
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary"
								/>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">
									WC Order ID
								</label>
								<input
									type="number"
									value={form.wcOrderId}
									onChange={(e) =>
										setForm({ ...form, wcOrderId: e.target.value })
									}
									placeholder="0"
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary"
								/>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">
									Billing Cycle Day (1-28)
								</label>
								<input
									type="number"
									min={1}
									max={28}
									value={form.billingCycleDay}
									onChange={(e) =>
										setForm({ ...form, billingCycleDay: e.target.value })
									}
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
								/>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">
									Start Date
								</label>
								<input
									type="date"
									value={form.startDate}
									onChange={(e) =>
										setForm({ ...form, startDate: e.target.value })
									}
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
								/>
							</div>
							<div>
								<label className="block text-xs text-muted-foreground mb-1.5">
									Notes (optional)
								</label>
								<input
									type="text"
									value={form.notes}
									onChange={(e) => setForm({ ...form, notes: e.target.value })}
									placeholder="Internal notes..."
									className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary"
								/>
							</div>
						</div>
						<div className="flex gap-3">
							<button
								onClick={handleCreate}
								disabled={!form.customerId || !form.name}
								className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
							>
								Create Package
							</button>
							<button
								onClick={() => setShowCreate(false)}
								className="px-4 py-2 bg-muted hover:bg-accent text-muted-foreground text-xs font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
							>
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Packages list */}
				{packages === undefined ? (
					<div className="text-muted-foreground text-sm animate-pulse">
						Loading packages...
					</div>
				) : enriched.length === 0 ? (
					<div className="bg-card border border-border rounded-xl p-12 text-center">
						<p className="text-muted-foreground text-lg mb-2">No packages configured</p>
						<p className="text-muted-foreground/60 text-sm">
							Create your first package to start managing client deliverables.
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{enriched.map((pkg) => {
							const style =
								STATUS_STYLES[pkg.status] ?? STATUS_STYLES.active;
							return (
								<Link
									key={pkg._id}
									to={`/admin/packages/${pkg._id}`}
									className="block bg-card border border-border rounded-xl p-5 hover:border-border transition-colors"
								>
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-semibold text-sm">{pkg.name}</h3>
										<span
											className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${style.color}`}
										>
											{style.label}
										</span>
									</div>
									<div className="flex items-center gap-6 text-xs text-muted-foreground">
										<span>{pkg.customerName}</span>
										<span>Cycle {pkg.currentCycleNumber}</span>
										<span>Bills on day {pkg.billingCycleDay}</span>
										<span>
											Started {pkg.startDate}
										</span>
									</div>
									{pkg.notes && (
										<p className="text-xs text-muted-foreground/60 mt-2 italic">
											{pkg.notes}
										</p>
									)}
								</Link>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}
