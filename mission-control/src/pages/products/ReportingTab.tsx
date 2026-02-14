import { IconChartBar, IconTrendingUp, IconExternalLink } from "@tabler/icons-react";

export default function ReportingTab() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-slate-800">Reporting</h1>
			<p className="mt-1 text-sm text-slate-500">
				Performance insights for your LocalCatalyst services
			</p>

			{/* Placeholder metrics */}
			<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<MetricCard
					label="Services Active"
					value="--"
					icon={<IconChartBar size={20} className="text-emerald-500" />}
				/>
				<MetricCard
					label="Orders Completed"
					value="--"
					icon={<IconTrendingUp size={20} className="text-emerald-500" />}
				/>
				<MetricCard
					label="Deliverables Ready"
					value="--"
					icon={<IconExternalLink size={20} className="text-violet-500" />}
				/>
			</div>

			{/* Coming soon */}
			<div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
				<h2 className="text-lg font-semibold text-emerald-800">
					Advanced Reporting Coming Soon
				</h2>
				<p className="mt-2 text-sm text-emerald-600">
					Track keyword rankings, GBP insights, traffic trends, and ROI
					across all your LocalCatalyst services. Available with our
					upcoming Monthly Content package.
				</p>
			</div>
		</div>
	);
}

function MetricCard({
	label,
	value,
	icon,
}: {
	label: string;
	value: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="rounded-xl bg-white p-4 shadow-sm">
			<div className="flex items-center gap-3">
				{icon}
				<div>
					<p className="text-xs text-slate-500">{label}</p>
					<p className="text-xl font-bold text-slate-800">{value}</p>
				</div>
			</div>
		</div>
	);
}
