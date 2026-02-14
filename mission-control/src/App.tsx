"use client";

import { Routes, Route } from "react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import LoginPage from "./pages/LoginPage";
import RoleRedirect from "./guards/RoleRedirect";
import AdminGuard from "./guards/AdminGuard";
import CustomerGuard from "./guards/CustomerGuard";
import MissionControlApp from "./pages/admin/MissionControlApp";
import PortalLayout from "./layouts/PortalLayout";
import PortalHome from "./pages/portal/PortalHome";
import OrdersPage from "./pages/portal/OrdersPage";
import DeliverablesPage from "./pages/portal/DeliverablesPage";
import DeliverableDetailPage from "./pages/portal/DeliverableDetailPage";
import ProfilePage from "./pages/portal/ProfilePage";

export default function App() {
	return (
		<>
			<Authenticated>
				<Routes>
					{/* Root — redirect based on role */}
					<Route path="/" element={<RoleRedirect />} />

					{/* Admin routes — existing ops dashboard */}
					<Route
						path="/admin"
						element={
							<AdminGuard>
								<MissionControlApp />
							</AdminGuard>
						}
					/>

					{/* Customer portal routes */}
					<Route
						path="/portal"
						element={
							<CustomerGuard>
								<PortalLayout />
							</CustomerGuard>
						}
					>
						<Route index element={<PortalHome />} />
						<Route path="orders" element={<OrdersPage />} />
						<Route path="deliverables" element={<DeliverablesPage />} />
						<Route path="deliverables/:id" element={<DeliverableDetailPage />} />
						<Route path="profile" element={<ProfilePage />} />
					</Route>

					{/* Fallback */}
					<Route path="*" element={<RoleRedirect />} />
				</Routes>
			</Authenticated>
			<Unauthenticated>
				<Routes>
					<Route path="*" element={<LoginPage />} />
				</Routes>
			</Unauthenticated>
		</>
	);
}
