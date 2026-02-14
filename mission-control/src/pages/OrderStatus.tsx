import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface OrderStatusData {
	orderId: string;
	productSlug: string;
	status: string;
	deliverableUrl?: string;
	paidAt?: number;
	intakeSubmittedAt?: number;
	completedAt?: number;
}

const STATUS_STEPS = [
	{ key: "paid", label: "Payment Received" },
	{ key: "intake", label: "Intake Submitted" },
	{ key: "production", label: "In Production" },
	{ key: "completed", label: "Completed" },
];

function getActiveStep(status: string): number {
	switch (status) {
		case "pending_intake":
			return 0;
		case "intake_submitted":
		case "queued":
			return 1;
		case "in_progress":
		case "review":
		case "delivering":
			return 2;
		case "completed":
			return 3;
		case "failed":
			return 2; // Show as stalled at production
		case "refunded":
			return -1;
		default:
			return 0;
	}
}

const PRODUCT_LABELS: Record<string, string> = {
	"topical-map": "Topical Map",
	"seo-audit": "SEO Audit",
	"gbp-optimization": "GBP Optimization",
	"content-pages": "Content Pages",
	"citation-building": "Citation Building",
	"schema-markup": "Schema Markup",
	"website-build": "Website Build",
};

export default function OrderStatus() {
	const { orderId } = useParams<{ orderId: string }>();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") || localStorage.getItem("lc_auth_token") || "";

	const [order, setOrder] = useState<OrderStatusData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!token) {
			setError("No access token found.");
			setLoading(false);
			return;
		}

		const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL || import.meta.env.VITE_CONVEX_URL?.replace(".cloud", ".site");

		const fetchStatus = () => {
			fetch(`${convexUrl}/orders/status?token=${encodeURIComponent(token)}`)
				.then((res) => {
					if (!res.ok) throw new Error("Unable to load order status");
					return res.json();
				})
				.then((data) => {
					setOrder(data);
					setLoading(false);
				})
				.catch((err) => {
					setError(err.message);
					setLoading(false);
				});
		};

		fetchStatus();
		// Poll every 30 seconds
		const interval = setInterval(fetchStatus, 30000);
		return () => clearInterval(interval);
	}, [token]);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="text-center">
					<div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
					<p className="mt-4 text-sm text-slate-500">Loading order status...</p>
				</div>
			</div>
		);
	}

	if (error || !order) {
		return (
			<div className="rounded-xl bg-white p-8 shadow-sm">
				<h1 className="text-lg font-semibold text-red-600">Error</h1>
				<p className="mt-2 text-sm text-slate-600">{error || "Order not found"}</p>
			</div>
		);
	}

	const activeStep = getActiveStep(order.status);
	const productLabel = PRODUCT_LABELS[order.productSlug] || order.productSlug;

	return (
		<div>
			<h1 className="text-2xl font-bold text-slate-800">
				Order Status: {productLabel}
			</h1>
			<p className="mt-1 text-sm text-slate-500">Order #{orderId}</p>

			{/* Timeline */}
			<div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
				<div className="relative">
					{STATUS_STEPS.map((step, i) => {
						const isCompleted = i <= activeStep;
						const isCurrent = i === activeStep;

						return (
							<div key={step.key} className="flex items-start gap-4 pb-8 last:pb-0">
								{/* Dot + line */}
								<div className="relative flex flex-col items-center">
									<div
										className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
											isCompleted
												? "border-emerald-500 bg-emerald-500 text-white"
												: "border-slate-300 bg-white text-slate-400"
										} ${isCurrent ? "ring-4 ring-emerald-100" : ""}`}
									>
										{isCompleted && i < activeStep ? (
											<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
										) : (
											<span className="text-xs font-bold">{i + 1}</span>
										)}
									</div>
									{i < STATUS_STEPS.length - 1 && (
										<div
											className={`absolute top-8 h-8 w-0.5 ${
												i < activeStep ? "bg-emerald-500" : "bg-slate-200"
											}`}
										/>
									)}
								</div>

								{/* Label + timestamp */}
								<div className="pt-1">
									<p
										className={`text-sm font-medium ${
											isCompleted ? "text-slate-800" : "text-slate-400"
										}`}
									>
										{step.label}
									</p>
									{step.key === "paid" && order.paidAt && (
										<p className="text-xs text-slate-400">
											{new Date(order.paidAt).toLocaleString()}
										</p>
									)}
									{step.key === "intake" && order.intakeSubmittedAt && (
										<p className="text-xs text-slate-400">
											{new Date(order.intakeSubmittedAt).toLocaleString()}
										</p>
									)}
									{step.key === "completed" && order.completedAt && (
										<p className="text-xs text-slate-400">
											{new Date(order.completedAt).toLocaleString()}
										</p>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Failed status banner */}
			{order.status === "failed" && (
				<div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
					<p className="text-sm font-medium text-red-800">
						There was an issue processing your order. Our team has been notified and will resolve it shortly.
					</p>
				</div>
			)}

			{/* Refunded status banner */}
			{order.status === "refunded" && (
				<div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
					<p className="text-sm font-medium text-slate-600">
						This order has been refunded.
					</p>
				</div>
			)}

			{/* Deliverable download */}
			{order.status === "completed" && order.deliverableUrl && (
				<div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
					<h2 className="text-lg font-semibold text-emerald-800">
						Your Deliverable is Ready
					</h2>
					<p className="mt-1 text-sm text-emerald-600">
						Download your completed {productLabel} below.
					</p>
					<a
						href={order.deliverableUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
					>
						Download Deliverable
					</a>
				</div>
			)}
		</div>
	);
}
