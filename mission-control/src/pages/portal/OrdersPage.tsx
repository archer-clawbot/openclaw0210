import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ORDER_STATUS_STYLES: Record<string, { label: string; color: string }> = {
	pending: { label: "Pending", color: "text-zinc-400" },
	processing: { label: "Processing", color: "text-blue-400" },
	"on-hold": { label: "On Hold", color: "text-amber-400" },
	completed: { label: "Completed", color: "text-emerald-400" },
	cancelled: { label: "Cancelled", color: "text-red-400" },
	refunded: { label: "Refunded", color: "text-zinc-500" },
	failed: { label: "Failed", color: "text-red-500" },
};

export default function OrdersPage() {
	const roleData = useQuery(api.portalAuth.resolveRole);
	const customerId = roleData?.customer?.id;

	const orders = useQuery(
		api.wooQueries.listOrdersByCustomer,
		customerId ? { customerId } : "skip",
	);

	return (
		<div className="p-8 max-w-5xl">
			<div className="mb-8">
				<h1 className="text-2xl font-bold tracking-tight">Order History</h1>
				<p className="text-zinc-500 text-sm mt-1">
					All your LocalCatalyst purchases.
				</p>
			</div>

			{orders === undefined ? (
				<div className="text-zinc-500 text-sm animate-pulse">
					Loading orders...
				</div>
			) : orders.length === 0 ? (
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
					<p className="text-zinc-400 text-lg mb-2">No orders yet</p>
					<p className="text-zinc-600 text-sm">
						Orders will appear here after your first purchase.
					</p>
				</div>
			) : (
				<div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="text-xs text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
								<th className="text-left px-6 py-3 font-medium">Order</th>
								<th className="text-left px-6 py-3 font-medium">Date</th>
								<th className="text-left px-6 py-3 font-medium">Status</th>
								<th className="text-right px-6 py-3 font-medium">Total</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-zinc-800/50">
							{orders.map((order) => {
								const status =
									ORDER_STATUS_STYLES[order.status] ??
									ORDER_STATUS_STYLES.pending;
								const items = JSON.parse(order.lineItems || "[]");
								const date = new Date(order.wcDateCreated).toLocaleDateString(
									"en-US",
									{ month: "short", day: "numeric", year: "numeric" },
								);

								return (
									<tr
										key={order._id}
										className="hover:bg-zinc-800/30 transition-colors"
									>
										<td className="px-6 py-4">
											<p className="font-medium">#{order.wcOrderId}</p>
											<p className="text-xs text-zinc-500 mt-0.5">
												{items
													.map((i: any) => i.name)
													.join(", ")
													.substring(0, 60)}
												{items
													.map((i: any) => i.name)
													.join(", ").length > 60
													? "..."
													: ""}
											</p>
										</td>
										<td className="px-6 py-4 text-zinc-400">{date}</td>
										<td className="px-6 py-4">
											<span className={`font-medium ${status.color}`}>
												{status.label}
											</span>
										</td>
										<td className="px-6 py-4 text-right font-medium">
											${order.total} {order.currency}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
