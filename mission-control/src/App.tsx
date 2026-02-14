"use client";

import { Routes, Route } from "react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import LoginPage from "./pages/LoginPage";
import RoleRedirect from "./guards/RoleRedirect";
import AdminGuard from "./guards/AdminGuard";
import CustomerGuard from "./guards/CustomerGuard";
import MissionControlApp from "./pages/admin/MissionControlApp";
import PackagesPage from "./pages/admin/PackagesPage";
import PackageDetailPage from "./pages/admin/PackageDetailPage";
import AdminDeliverablesPage from "./pages/admin/AdminDeliverablesPage";
import AdminDeliverableDetailPage from "./pages/admin/AdminDeliverableDetailPage";
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
					<Route
						path="/admin/packages"
						element={
							<AdminGuard>
								<PackagesPage />
							</AdminGuard>
						}
					/>
					<Route
						path="/admin/packages/:configId"
						element={
							<AdminGuard>
								<PackageDetailPage />
							</AdminGuard>
						}
					/>
					<Route
						path="/admin/deliverables"
						element={
							<AdminGuard>
								<AdminDeliverablesPage />
							</AdminGuard>
						}
					/>
					<Route
						path="/admin/deliverables/:id"
						element={
							<AdminGuard>
								<AdminDeliverableDetailPage />
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
