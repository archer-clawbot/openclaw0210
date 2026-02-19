const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

/**
 * Client slug -> Supabase client UUID mapping.
 * Expand this as you onboard more clients.
 */
const CLIENT_ID_MAP: Record<string, string> = {
	"chicagos-electrician": "ac466952-722a-4d3e-b1d7-cf6eb84cedba",
};

export function getSupabaseClientId(slug: string): string | null {
	return CLIENT_ID_MAP[slug] ?? null;
}

/**
 * Fetch rows from a Supabase table via PostgREST.
 * @param table  Table name (e.g. "keyword_rankings")
 * @param params PostgREST query params (e.g. { client_id: "eq.uuid", order: "created_at.desc" })
 */
export async function supabaseGet<T = unknown>(
	table: string,
	params: Record<string, string> = {},
): Promise<T[]> {
	if (!SUPABASE_URL || !SUPABASE_KEY) return [];

	const qs = new URLSearchParams(params).toString();
	const url = `${SUPABASE_URL}/rest/v1/${table}${qs ? `?${qs}` : ""}`;

	const res = await fetch(url, {
		headers: {
			apikey: SUPABASE_KEY,
			Authorization: `Bearer ${SUPABASE_KEY}`,
		},
	});

	if (!res.ok) return [];
	return res.json();
}
