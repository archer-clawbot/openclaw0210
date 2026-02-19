import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DEFAULT_TENANT_ID } from "../../lib/tenant";
import { supabaseGet, getSupabaseClientId } from "../../lib/supabase";
import {
	IconChartBar,
	IconTrendingUp,
	IconTrendingDown,
	IconMinus,
	IconSearch,
	IconArrowUp,
	IconArrowDown,
} from "@tabler/icons-react";

interface KeywordRanking {
	id?: string;
	keyword: string;
	position: number;
	previous_position: number;
	change: number;
	volume: number;
	url: string;
	created_at?: string;
}

const MOCK_DATA: KeywordRanking[] = [
	{ keyword: "electrician near me chicago", position: 0, previous_position: 0, change: 0, volume: 2900, url: "" },
	{ keyword: "emergency electrician chicago", position: 0, previous_position: 0, change: 0, volume: 1800, url: "" },
	{ keyword: "residential electrician chicago", position: 0, previous_position: 0, change: 0, volume: 720, url: "" },
	{ keyword: "commercial electrician chicago", position: 0, previous_position: 0, change: 0, volume: 590, url: "" },
	{ keyword: "electrical repair chicago", position: 0, previous_position: 0, change: 0, volume: 480, url: "" },
];

export default function ReportingTab() {
	const clients = useQuery(api.clients.list, {
		tenantId: DEFAULT_TENANT_ID,
		activeOnly: true,
	});

	const [selectedSlug, setSelectedSlug] = useState<string>("");
	const [rankings, setRankings] = useState<KeywordRanking[]>([]);
	const [loading, setLoading] = useState(false);
	const [usingMock, setUsingMock] = useState(false);

	// Auto-select first client with a Supabase mapping
	useEffect(() => {
		if (clients && clients.length > 0 && !selectedSlug) {
			const mapped = clients.find((c) => getSupabaseClientId(c.slug));
			if (mapped) setSelectedSlug(mapped.slug);
		}
	}, [clients, selectedSlug]);

	// Fetch rankings when client changes
	useEffect(() => {
		if (!selectedSlug) return;

		const clientId = getSupabaseClientId(selectedSlug);
		if (!clientId) {
			setRankings(MOCK_DATA);
			setUsingMock(true);
			return;
		}

		setLoading(true);
		supabaseGet<KeywordRanking>("keyword_rankings", {
			client_id: `eq.${clientId}`,
			order: "created_at.desc",
			limit: "50",
		})
			.then((data) => {
				if (data.length > 0) {
					// Dedupe by keyword — keep most recent
					const seen = new Map<string, KeywordRanking>();
					for (const row of data) {
						if (!seen.has(row.keyword)) seen.set(row.keyword, row);
					}
					setRankings(Array.from(seen.values()));
					setUsingMock(false);
				} else {
					setRankings(MOCK_DATA);
					setUsingMock(true);
				}
			})
			.catch(() => {
				setRankings(MOCK_DATA);
				setUsingMock(true);
			})
			.finally(() => setLoading(false));
	}, [selectedSlug]);

	// Computed stats
	const tracked = rankings.length;
	const ranking = rankings.filter((r) => r.position > 0).length;
	const avgPos =
		ranking > 0
			? (
					rankings.filter((r) => r.position > 0).reduce((s, r) => s + r.position, 0) / ranking
				).toFixed(1)
			: "--";
	const improved = rankings.filter((r) => r.change > 0).length;

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-foreground">SEO Rankings</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Keyword positions tracked via Serper.dev
					</p>
				</div>

				{/* Client selector */}
				<select
					value={selectedSlug}
					onChange={(e) => setSelectedSlug(e.target.value)}
					className="bg-muted border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)]"
				>
					<option value="">Select client...</option>
					{clients?.map((c) => (
						<option key={c._id} value={c.slug}>
							{c.name}
						</option>
					))}
				</select>
			</div>

			{/* Summary cards */}
			<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<MetricCard
					label="Keywords Tracked"
					value={String(tracked)}
					icon={<IconSearch size={20} className="text-[var(--accent-blue)]" />}
				/>
				<MetricCard
					label="Ranking (Top 100)"
					value={String(ranking)}
					icon={<IconChartBar size={20} className="text-[var(--accent-green)]" />}
				/>
				<MetricCard
					label="Avg Position"
					value={avgPos}
					icon={<IconTrendingUp size={20} className="text-[var(--accent-orange)]" />}
				/>
				<MetricCard
					label="Improved"
					value={String(improved)}
					icon={<IconArrowUp size={20} className="text-[var(--accent-green)]" />}
				/>
			</div>

			{usingMock && (
				<div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-400">
					Showing placeholder data. Run a ranking check to populate real results.
				</div>
			)}

			{/* Rankings table */}
			<div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-border bg-muted/50">
							<th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								Keyword
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
								Position
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
								Change
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
								URL
							</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
									Loading rankings...
								</td>
							</tr>
						) : rankings.length === 0 ? (
							<tr>
								<td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
									No ranking data yet. Run a ranking check first.
								</td>
							</tr>
						) : (
							rankings.map((r, i) => (
								<tr
									key={r.keyword + i}
									className="border-b border-border/50 hover:bg-muted/30 transition-colors"
								>
									<td className="px-4 py-3 font-medium text-foreground">
										{r.keyword}
									</td>
									<td className="px-4 py-3 text-center">
										{r.position > 0 ? (
											<span
												className={`inline-flex items-center justify-center w-10 h-7 rounded-md text-xs font-bold ${
													r.position <= 3
														? "bg-[var(--accent-green)]/15 text-[var(--accent-green)]"
														: r.position <= 10
															? "bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]"
															: r.position <= 20
																? "bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]"
																: "bg-muted text-muted-foreground"
												}`}
											>
												{r.position}
											</span>
										) : (
											<span className="text-muted-foreground">--</span>
										)}
									</td>
									<td className="px-4 py-3 text-center">
										<ChangeIndicator change={r.change} />
									</td>
									<td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell truncate max-w-xs">
										{r.url || "--"}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
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
		<div className="rounded-xl bg-card border border-border p-4">
			<div className="flex items-center gap-3">
				{icon}
				<div>
					<p className="text-xs text-muted-foreground">{label}</p>
					<p className="text-xl font-bold text-foreground">{value}</p>
				</div>
			</div>
		</div>
	);
}

function ChangeIndicator({ change }: { change: number }) {
	if (change > 0)
		return (
			<span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[var(--accent-green)]">
				<IconArrowUp size={14} />
				{change}
			</span>
		);
	if (change < 0)
		return (
			<span className="inline-flex items-center gap-0.5 text-xs font-semibold text-red-400">
				<IconArrowDown size={14} />
				{Math.abs(change)}
			</span>
		);
	return (
		<span className="text-muted-foreground">
			<IconMinus size={14} />
		</span>
	);
}
