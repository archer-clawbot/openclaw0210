import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ProfilePage() {
	const roleData = useQuery(api.portalAuth.resolveRole);
	const customer = roleData?.customer;

	if (roleData === undefined) {
		return (
			<div className="p-8">
				<div className="text-zinc-500 text-sm animate-pulse">
					Loading profile...
				</div>
			</div>
		);
	}

	return (
		<div className="p-8 max-w-3xl">
			<div className="mb-8">
				<h1 className="text-2xl font-bold tracking-tight">Profile</h1>
				<p className="text-zinc-500 text-sm mt-1">
					Your account information.
				</p>
			</div>

			<div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
				<div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-4">
					<div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-orange-400">
						{customer?.firstName?.charAt(0)?.toUpperCase() ?? "?"}
					</div>
					<div>
						<p className="font-semibold text-lg">
							{customer
								? `${customer.firstName} ${customer.lastName}`.trim()
								: "Unknown"}
						</p>
						<p className="text-sm text-zinc-500">{customer?.email ?? ""}</p>
					</div>
				</div>

				<div className="px-6 py-4 space-y-4">
					<ProfileField label="First Name" value={customer?.firstName ?? ""} />
					<ProfileField label="Last Name" value={customer?.lastName ?? ""} />
					<ProfileField label="Email" value={customer?.email ?? ""} />
					{customer?.company && (
						<ProfileField label="Company" value={customer.company} />
					)}
				</div>
			</div>

			<p className="text-xs text-zinc-600 mt-6">
				To update your profile information, please contact our team or
				update your details on localcatalyst.ai.
			</p>
		</div>
	);
}

function ProfileField({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between items-center py-2 border-b border-zinc-800/50 last:border-0">
			<span className="text-sm text-zinc-500">{label}</span>
			<span className="text-sm text-zinc-200 font-medium">{value}</span>
		</div>
	);
}
