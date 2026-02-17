# Data Source Abstraction Layer
## Maps source IDs to current access methods — single file to update when MCP arrives

Skills reference this file by ID: `ref:data-sources`.

---

## Purpose

CATALYST skills reference data by source ID (e.g., `source:pagespeed`). This file maps each source to its current access method. When MCP endpoints become available, update this file only — skills remain unchanged.

---

## Source Registry

### Performance & Technical

| Source ID | Description | Current Method | Reliability | Future MCP |
|-----------|-------------|---------------|-------------|------------|
| `source:pagespeed` | Core Web Vitals, Lighthouse scores | `web_search "PageSpeed Insights [domain]"` then read results | High — Google's own tool | `mcp://pagespeed-insights` |
| `source:lighthouse` | Full Lighthouse audit | `web_search` for cached reports or note "requires manual run" | Medium — lab data only | `mcp://lighthouse` |
| `source:mobile-friendly` | Google Mobile-Friendly Test | `web_search "[domain] mobile friendly test"` | Medium | Deprecated — use Lighthouse |
| `source:rich-results` | Rich Results Test | `web_search "rich results test [domain]"` — or instruct operator to run manually | Low — requires manual | `mcp://google-rich-results` |

### Backlinks & Authority

| Source ID | Description | Current Method | Reliability | Future MCP |
|-----------|-------------|---------------|-------------|------------|
| `source:ahrefs` | Domain Rating, backlink profile, referring domains | Mark as "ESTIMATED — verify with Ahrefs" | None — no API access | `mcp://ahrefs` |
| `source:semrush` | Authority Score, organic traffic estimates | Mark as "ESTIMATED — verify with Semrush" | None — no API access | `mcp://semrush` |
| `source:moz` | Domain Authority, Page Authority | Mark as "ESTIMATED — verify with Moz" | None — no API access | `mcp://moz` |
| `source:majestic` | Trust Flow, Citation Flow | Mark as "ESTIMATED — verify with Majestic" | None — no API access | `mcp://majestic` |

### Search Console & Analytics

| Source ID | Description | Current Method | Reliability | Future MCP |
|-----------|-------------|---------------|-------------|------------|
| `source:gsc` | Search Console: clicks, impressions, queries, indexing | Requires operator access — request GSC screenshot or export | High when available | `mcp://google-search-console` |
| `source:ga4` | Google Analytics: traffic, engagement, conversions | Requires operator access — request GA4 screenshot or export | High when available | `mcp://google-analytics` |

### SERP & Rankings

| Source ID | Description | Current Method | Reliability | Future MCP |
|-----------|-------------|---------------|-------------|------------|
| `source:serp` | Live SERP position checking | `web_search "[keyword]"` and parse results | Medium — varies by location/personalization | `mcp://serpapi` |
| `source:geo-grid` | Local rank tracking across geographic grid | Requires SerpAPI + geo-grid setup (SPEC-015) | High when configured | `mcp://serpapi-geogrid` |

### Citations & Listings

| Source ID | Description | Current Method | Reliability | Future MCP |
|-----------|-------------|---------------|-------------|------------|
| `source:citations` | Citation/directory listing audit | `web_search "[business name] [city]"` per directory | Medium — manual and slow | `mcp://brightlocal` |
| `source:nap` | NAP consistency check | `web_search` per platform and compare | Medium — manual | `mcp://brightlocal-nap` |

### AI & LLM Visibility

| Source ID | Description | Current Method | Reliability | Future MCP |
|-----------|-------------|---------------|-------------|------------|
| `source:ai-overview` | Google AI Overview citation check | `web_search` conversational queries and inspect | Medium — AI Overviews vary | `mcp://google-ai-overviews` |
| `source:llm-mention` | LLM mention testing (ChatGPT, Gemini, Perplexity) | Manual API calls or note "requires LLM testing" | Low — requires multi-platform | `mcp://llm-visibility` |

### Content & Schema

| Source ID | Description | Current Method | Reliability | Future MCP |
|-----------|-------------|---------------|-------------|------------|
| `source:crawl` | Full site crawl (pages, meta, schema, links) | Scout agent crawl dispatch | High — proven pipeline | Internal (Scout agent) |
| `source:schema-test` | Schema validation | `web_search "schema validator [URL]"` or manual check | Medium | `mcp://schema-validator` |

---

## Usage Pattern in Skills

Skills reference sources like this:
```
Data: Use `source:pagespeed` for CWV metrics.
If unavailable, note: "CWV data unavailable — requires PageSpeed Insights check."
```

Skills NEVER hard-code the access method. They reference the source ID, and this file determines how to access it.

---

## Reliability Tiers

| Tier | Meaning | Audit Treatment |
|------|---------|-----------------|
| High | Direct API or proven tool access | Report values as authoritative |
| Medium | Web search or indirect method | Report values with method note |
| Low | Requires manual action or operator access | Mark as "REQUIRES VERIFICATION" |
| None | No current access method | Mark as "ESTIMATED — verify with [tool]" |

---

## MCP Migration Checklist

When an MCP endpoint becomes available:
1. Update the "Current Method" column in this file
2. Update the "Reliability" tier (typically moves to "High")
3. No changes needed to any skill files — they reference source IDs
4. Test with one audit to verify data format compatibility
5. Update `cron/routing-config.json` if the MCP call needs specific model routing
