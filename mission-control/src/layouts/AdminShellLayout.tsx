import { Outlet } from "react-router";
import Header from "../components/Header";

/**
 * Lightweight admin shell for sub-pages (Packages, Deliverables, etc.).
 * Provides the shared Header and consistent dark background.
 * Mission Control (/admin) uses its own full layout with sidebars.
 */
export default function AdminShellLayout() {
	return (
		<div className="h-screen bg-card text-foreground flex flex-col overflow-hidden">
			<Header />
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
}
