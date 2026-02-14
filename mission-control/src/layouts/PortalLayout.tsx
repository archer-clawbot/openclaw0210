import { Outlet, NavLink } from "react-router";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";

const navItems = [
	{ to: "/portal", label: "Dashboard", icon: "◇", end: true },
	{ to: "/portal/orders", label: "Orders", icon: "📋", end: false },
	{ to: "/portal/deliverables", label: "Deliverables", icon: "📦", end: false },
	{ to: "/portal/profile", label: "Profile", icon: "👤", end: false },
];

export default function PortalLayout() {
	const { signOut } = useAuthActions();
	const roleData = useQuery(api.portalAuth.resolveRole);

	const customerName = roleData?.customer
		? `${roleData.customer.firstName} ${roleData.customer.lastName}`.trim()
		: "Client";

	return (
		<div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans">
			{/* Sidebar */}
			<aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">
				{/* Brand */}
				<div className="p-6 border-b border-zinc-800">
					<div className="flex items-center gap-2">
						<span className="text-2xl text-orange-500">◇</span>
						<span className="text-lg font-bold tracking-wider uppercase">
							LocalCatalyst
						</span>
					</div>
					<p className="text-xs text-zinc-500 mt-1 tracking-wide">
						Client Portal
					</p>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4 space-y-1">
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={({ isActive }) =>
								`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
									isActive
										? "bg-zinc-800 text-orange-400"
										: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
								}`
							}
						>
							<span className="text-base">{item.icon}</span>
							{item.label}
						</NavLink>
					))}
				</nav>

				{/* User section */}
				<div className="p-4 border-t border-zinc-800">
					<div className="flex items-center gap-3 mb-3 px-2">
						<div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-orange-400">
							{customerName.charAt(0).toUpperCase()}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium truncate">{customerName}</p>
							<p className="text-xs text-zinc-500 truncate">
								{roleData?.customer?.email ?? ""}
							</p>
						</div>
					</div>
					<button
						onClick={() => void signOut()}
						className="w-full text-left px-4 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-all cursor-pointer"
					>
						Sign Out
					</button>
				</div>
			</aside>

			{/* Main content */}
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
}
