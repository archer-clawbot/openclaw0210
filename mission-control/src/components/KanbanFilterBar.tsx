import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DEFAULT_TENANT_ID } from "../lib/tenant";
import type { KanbanFilters } from "../lib/types";
import {
  IconFilter,
  IconX,
  IconSearch,
  IconUser,
  IconFolder,
  IconTag,
} from "@tabler/icons-react";

interface KanbanFilterBarProps {
  filters: KanbanFilters;
  onChange: (filters: KanbanFilters) => void;
  taskCount: number;
  filteredCount: number;
}

const KanbanFilterBar: React.FC<KanbanFilterBarProps> = ({
  filters,
  onChange,
  taskCount,
  filteredCount,
}) => {
  const clients = useQuery(api.clients.list, {
    tenantId: DEFAULT_TENANT_ID,
    activeOnly: true,
  });

  const projects = useQuery(api.projects.list, {
    tenantId: DEFAULT_TENANT_ID,
    status: "active",
  });

  const isFiltering =
    filters.clientSlug !== "all" ||
    filters.projectId !== "all" ||
    filters.tag !== "all" ||
    filters.search !== "";

  const clearFilters = () => {
    onChange({ clientSlug: "all", projectId: "all", tag: "all", search: "" });
  };

  // Collect unique tags from filtered context
  // (we'll compute these from the parent, but projects are a good proxy)
  const projectTags: string[] = [];
  if (projects) {
    // Build tag list from project names for easy filtering
    projects.forEach((p) => {
      if (!projectTags.includes(p.name)) projectTags.push(p.name);
    });
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search */}
      <div className="relative">
        <IconSearch
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-8 pr-3 py-1.5 text-[11px] bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] w-40"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: "" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <IconX size={11} />
          </button>
        )}
      </div>

      {/* Client filter */}
      <div className="relative flex items-center">
        <IconUser
          size={12}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <select
          value={filters.clientSlug}
          onChange={(e) => onChange({ ...filters, clientSlug: e.target.value })}
          className={`pl-7 pr-6 py-1.5 text-[11px] font-semibold border rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] appearance-none ${
            filters.clientSlug !== "all"
              ? "bg-[var(--accent-blue)]/15 border-[var(--accent-blue)]/30 text-[var(--accent-blue)]"
              : "bg-muted border-border text-muted-foreground"
          }`}
        >
          <option value="all">All Clients</option>
          {clients?.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Project filter */}
      <div className="relative flex items-center">
        <IconFolder
          size={12}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <select
          value={filters.projectId}
          onChange={(e) => onChange({ ...filters, projectId: e.target.value })}
          className={`pl-7 pr-6 py-1.5 text-[11px] font-semibold border rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] appearance-none ${
            filters.projectId !== "all"
              ? "bg-[var(--accent-blue)]/15 border-[var(--accent-blue)]/30 text-[var(--accent-blue)]"
              : "bg-muted border-border text-muted-foreground"
          }`}
        >
          <option value="all">All Projects</option>
          {projects?.map((p) => (
            <option key={p._id} value={p._id}>
              {p.clientSlug ? `${p.clientSlug} / ` : ""}
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tag filter */}
      <div className="relative flex items-center">
        <IconTag
          size={12}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <input
          type="text"
          placeholder="Filter by tag..."
          value={filters.tag === "all" ? "" : filters.tag}
          onChange={(e) =>
            onChange({ ...filters, tag: e.target.value || "all" })
          }
          className={`pl-7 pr-3 py-1.5 text-[11px] font-semibold border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] w-28 ${
            filters.tag !== "all"
              ? "bg-[var(--accent-blue)]/15 border-[var(--accent-blue)]/30 text-[var(--accent-blue)]"
              : "bg-muted border-border text-muted-foreground placeholder:text-muted-foreground"
          }`}
        />
      </div>

      {/* Active filter indicator + clear */}
      {isFiltering && (
        <div className="flex items-center gap-2 ml-1">
          <span className="text-[10px] font-semibold text-muted-foreground">
            {filteredCount}/{taskCount}
          </span>
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-[10px] font-semibold text-[var(--accent-red)] hover:text-foreground transition-colors bg-[var(--accent-red)]/10 px-2 py-1 rounded"
          >
            <IconX size={10} />
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default KanbanFilterBar;
