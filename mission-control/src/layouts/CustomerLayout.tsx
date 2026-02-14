import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
	IconChartBar,
	IconMap,
	IconSearch,
	IconMapPin,
	IconFileText,
	IconBuildingStore,
	IconCode,
	IconWorld,
	IconMenu2,
	IconX,
} from "@tabler/icons-react";

interface CustomerAuthState {
	email: string | null;
	name: string | null;
	orders: OrderSummary[] | null;
	loading: boolean;
}

interface OrderSummary {
	orderId: string;
	productSlug: string;
	status: string;
	completedAt?: number;
	deliverableUrl?: string;
}

const PRODUCT_TABS = [
	{ slug: "reporting", label: "Reporting", icon: IconChartBar, path: "/dashboard/reporting" },
	{ slug: "topical-map", label: "Topical Map", icon: IconMap, path: "/dashboard/topical-map" },
	{ slug: "seo-audit", label: "SEO Audit", icon: IconSearch, path: "/dashboard/seo-audit" },
	{ slug: "gbp-optimization", label: "GBP Optimization", icon: IconMapPin, path: "/dashboard/gbp-optimization" },
	{ slug: "content-pages", label: "Content Pages", icon: IconFileText, path: "/dashboard/content-pages" },
	{ slug: "citation-building", label: "Citation Building", icon: IconBuildingStore, path: "/dashboard/citation-building" },
	{ slug: "schema-markup", label: "Schema Markup", icon: IconCode, path: "/dashboard/schema-markup" },
	{ slug: "website-build", label: "Website Build", icon: IconWorld, path: "/dashboard/website-build" },
] as const;

export default function CustomerLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [auth, setAuth] = useState<CustomerAuthState>({
		email: null,
		name: null,
		orders: null,
		loading: true,
	});

	// TODO: Replace with real auth check (magic link token verification)
	// For MVP, we'll use query params or localStorage token
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get("token") || localStorage.getItem("lc_auth_token");

		if (token) {
			localStorage.setItem("lc_auth_token", token);
			// Fetch customer data from Convex
			fetchCustomerData(token);
		} else {
			setAuth((prev) => ({ ...prev, loading: false }));
		}
	}, []);

	const fetchCustomerData = useCallback(async (token: string) => {
		try {
			const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL || import.meta.env.VITE_CONVEX_URL?.replace(".cloud", ".site");
			const res = await fetch(`${convexUrl}/orders/status?token=${encodeURIComponent(token)}`);

			if (res.ok) {
				const data = await res.json();
				setAuth({
					email: data.customerEmail,
					name: data.customerName,
					orders: null, // TODO: fetch full order list via separate endpoint
					loading: false,
				});
			} else {
				setAuth((prev) => ({ ...prev, loading: false }));
			}
		} catch {
			setAuth((prev) => ({ ...prev, loading: false }));
		}
	}, []);

	const getProductStatus = useCallback(
		(slug: string): "purchased" | "in_progress" | "completed" | null => {
			if (!auth.orders) return null;
			const order = auth.orders.find((o) => o.productSlug === slug);
			if (!order) return null;
			if (order.status === "completed") return "completed";
			return "in_progress";
		},
		[auth.orders],
	);

	return (
		<div className="flex min-h-screen bg-slate-50" style={{ fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif' }}>
			{/* Mobile hamburger */}
			<button
				className="fixed top-4 left-4 z-50 rounded-lg bg-slate-800 p-2 text-white shadow-md lg:hidden"
				onClick={() => setSidebarOpen(!sidebarOpen)}
			>
				{sidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
			</button>

			{/* Mobile backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/30 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-700 bg-[#0f172a] transition-transform lg:static lg:translate-x-0 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Logo */}
				<div className="flex h-16 items-center gap-3 border-b border-slate-700 pl-14 pr-6 lg:pl-6">
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 p-1.5">
						<img
							src="/logo-icon.svg"
							alt="LocalCatalyst"
							className="h-full w-auto"
							style={{ filter: "brightness(0) invert(1)" }}
						/>
					</div>
					<span className="text-lg font-bold text-white">
						<span className="text-emerald-400">Local</span>Catalyst
					</span>
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto p-4">
					<ul className="space-y-1">
						{PRODUCT_TABS.map((tab) => {
							const Icon = tab.icon;
							const status = tab.slug === "reporting" ? "purchased" : getProductStatus(tab.slug);

							return (
								<li key={tab.slug}>
									<NavLink
										to={tab.path}
										onClick={() => setSidebarOpen(false)}
										className={({ isActive }) =>
											`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
												isActive
													? "bg-emerald-500/15 text-emerald-400"
													: status
														? "text-slate-300 hover:bg-slate-800 hover:text-white"
														: "text-slate-500 hover:bg-slate-800/50 hover:text-slate-400"
											}`
										}
									>
										<Icon size={18} stroke={1.5} />
										<span className="flex-1">{tab.label}</span>
										{status === "completed" && (
											<span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
												Done
											</span>
										)}
										{status === "in_progress" && (
											<span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
												Active
											</span>
										)}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* User info */}
				{auth.name && (
					<div className="border-t border-slate-700 p-4">
						<div className="text-sm font-medium text-slate-200">
							{auth.name}
						</div>
						<div className="text-xs text-slate-400">{auth.email}</div>
					</div>
				)}
			</aside>

			{/* Main content */}
			<main className="flex-1 lg:ml-0">
				<div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
