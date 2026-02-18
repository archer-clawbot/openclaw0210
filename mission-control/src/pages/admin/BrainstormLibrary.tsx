import React, { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { DEFAULT_TENANT_ID } from "../../lib/tenant";
import {
  IconBulb,
  IconSearch,
  IconCalendar,
  IconRocket,
  IconChecklist,
  IconFileText,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";
import BrainstormDetailPanel from "../../components/BrainstormDetailPanel";
import GeneratePlanModal from "../../components/GeneratePlanModal";

type BrainstormStatus = "new" | "reviewed" | "planned" | "in_progress" | "completed" | "archived";

const STATUS_CONFIG: Record<BrainstormStatus, { label: string; color: string; bg: string }> = {
  new: { label: "NEW", color: "var(--accent-orange)", bg: "rgba(255, 159, 67, 0.15)" },
  reviewed: { label: "REVIEWED", color: "var(--accent-blue)", bg: "rgba(84, 160, 255, 0.15)" },
  planned: { label: "PLANNED", color: "var(--accent-green)", bg: "rgba(29, 209, 161, 0.15)" },
  in_progress: { label: "IN PROGRESS", color: "var(--accent-blue)", bg: "rgba(84, 160, 255, 0.15)" },
  completed: { label: "COMPLETED", color: "var(--accent-green)", bg: "rgba(29, 209, 161, 0.15)" },
  archived: { label: "ARCHIVED", color: "var(--text-subtle, #666)", bg: "rgba(128, 128, 128, 0.15)" },
};

export default function BrainstormLibrary() {
  const brainstorms = useQuery(api.brainstorms.list, { tenantId: DEFAULT_TENANT_ID });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<Id<"brainstorms"> | null>(null);
  const [showGeneratePlan, setShowGeneratePlan] = useState<Id<"brainstorms"> | null>(null);

  const allTags = useMemo(() => {
    if (!brainstorms) return [];
    const tags = new Set<string>();
    brainstorms.forEach((b) => b.tags.forEach((t) => tags.add(t)));
    return [...tags].sort();
  }, [brainstorms]);

  const filtered = useMemo(() => {
    if (!brainstorms) return [];
    return brainstorms.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (tagFilter !== "all" && !b.tags.includes(tagFilter)) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          b.title.toLowerCase().includes(term) ||
          b.summary?.toLowerCase().includes(term) ||
          b.tags.some((t) => t.toLowerCase().includes(term))
        );
      }
      return true;
    });
  }, [brainstorms, statusFilter, tagFilter, searchTerm]);

  const stats = useMemo(() => {
    if (!brainstorms) return { total: 0, new: 0, planned: 0, totalTasks: 0 };
    return {
      total: brainstorms.length,
      new: brainstorms.filter((b) => b.status === "new").length,
      planned: brainstorms.filter((b) => b.planGenerated).length,
      totalTasks: brainstorms.reduce((sum, b) => sum + (b.taskCount || 0), 0),
    };
  }, [brainstorms]);

  const selectedBrainstorm = brainstorms?.find((b) => b._id === selectedId);

  if (brainstorms === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading brainstorms...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconBulb size={24} className="text-[var(--accent-orange)]" />
            <h1 className="text-lg font-semibold tracking-wider text-foreground">
              BRAINSTORM LIBRARY
            </h1>
            <span className="text-[11px] font-semibold px-3 py-1 rounded bg-muted text-muted-foreground">
              {stats.total} docs
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <IconSparkles size={14} className="text-[var(--accent-orange)]" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{stats.new}</span> new
              </span>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2">
              <IconChecklist size={14} className="text-[var(--accent-green)]" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{stats.planned}</span> planned
              </span>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2">
              <IconRocket size={14} className="text-[var(--accent-blue)]" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{stats.totalTasks}</span> tasks
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="relative flex-1 max-w-md">
            <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search brainstorms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)]"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <IconX size={14} />
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm bg-muted border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="planned">Planned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="text-sm bg-muted border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] cursor-pointer"
          >
            <option value="all">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <IconFileText size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No brainstorms found</p>
            <p className="text-sm mt-1">
              {searchTerm || statusFilter !== "all" || tagFilter !== "all"
                ? "Try adjusting your filters"
                : "Import brainstorm files to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((brainstorm) => {
              const statusConf = STATUS_CONFIG[brainstorm.status as BrainstormStatus] || STATUS_CONFIG.new;
              return (
                <div
                  key={brainstorm._id}
                  onClick={() => setSelectedId(brainstorm._id)}
                  className={`bg-card border rounded-lg p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${selectedId === brainstorm._id ? "ring-2 ring-[var(--accent-blue)] border-transparent" : "border-border"
                    }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                      style={{ color: statusConf.color, backgroundColor: statusConf.bg }}
                    >
                      {statusConf.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <IconCalendar size={12} />
                      {brainstorm.sourceDate}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight mb-2">
                    {brainstorm.title}
                  </h3>
                  {brainstorm.summary && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                      {brainstorm.summary}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {brainstorm.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-muted rounded font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span>🤖</span>
                      <span>{brainstorm.sourceAgent}</span>
                    </div>
                    {brainstorm.planGenerated ? (
                      <div className="flex items-center gap-1.5 text-[11px] text-[var(--accent-green)]">
                        <IconChecklist size={12} />
                        {brainstorm.taskCount} tasks
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowGeneratePlan(brainstorm._id);
                        }}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent-orange)] hover:text-[var(--accent-blue)] transition-colors"
                      >
                        <IconRocket size={12} />
                        Generate Plan
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selectedBrainstorm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedId(null)} />
          <BrainstormDetailPanel
            brainstorm={selectedBrainstorm}
            onClose={() => setSelectedId(null)}
            onGeneratePlan={() => {
              setShowGeneratePlan(selectedBrainstorm._id);
              setSelectedId(null);
            }}
          />
        </>
      )}

      {/* Generate plan modal */}
      {showGeneratePlan && (
        <GeneratePlanModal
          brainstormId={showGeneratePlan}
          onClose={() => setShowGeneratePlan(null)}
          onComplete={() => setShowGeneratePlan(null)}
        />
      )}
    </div>
  );
}
