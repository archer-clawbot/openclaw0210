import { useQuery } from "convex/react";
import { Navigate } from "react-router";
import { api } from "../../convex/_generated/api";

export default function RoleRedirect() {
	const roleData = useQuery(api.portalAuth.resolveRole);

	if (roleData === undefined) {
		return (
			<div className="flex items-center justify-center h-screen bg-zinc-950">
				<div className="animate-pulse text-zinc-500 text-sm tracking-widest uppercase">
					Loading...
				</div>
			</div>
		);
	}

	if (roleData.role === "client") {
		return <Navigate to="/portal" replace />;
	}

	return <Navigate to="/admin" replace />;
}
