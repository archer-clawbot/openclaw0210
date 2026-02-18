import { Id } from "../../convex/_generated/dataModel";

// ── Task status types ───────────────────────────────────────────

export type TaskStatus =
  | "inbox"
  | "brainstorm_queue"
  | "assigned"
  | "in_progress"
  | "review"
  | "done"
  | "archived";

export const KANBAN_COLUMNS = [
  { id: "inbox" as const, label: "INBOX", color: "var(--text-subtle)" },
  { id: "brainstorm_queue" as const, label: "BRAINSTORM", color: "var(--accent-orange)" },
  { id: "assigned" as const, label: "ASSIGNED", color: "var(--accent-orange)" },
  { id: "in_progress" as const, label: "IN PROGRESS", color: "var(--accent-blue)" },
  { id: "review" as const, label: "REVIEW", color: "var(--text-main)" },
  { id: "done" as const, label: "DONE", color: "var(--accent-green)" },
] as const;

export const ARCHIVED_COLUMN = {
  id: "archived" as const,
  label: "ARCHIVED",
  color: "var(--text-subtle)",
} as const;

// ── Filter state ────────────────────────────────────────────────

export interface KanbanFilters {
  clientSlug: string;      // "all" or slug
  projectId: string;       // "all" or project _id
  tag: string;             // "all" or tag string
  search: string;          // free text
}

export const DEFAULT_FILTERS: KanbanFilters = {
  clientSlug: "all",
  projectId: "all",
  tag: "all",
  search: "",
};

// ── Task interface (enriched) ───────────────────────────────────

export interface EnrichedTask {
  _id: Id<"tasks">;
  _creationTime: number;
  title: string;
  description: string;
  status: string;
  assigneeIds: Id<"agents">[];
  tags: string[];
  borderColor?: string;
  clientSlug?: string;
  projectId?: Id<"projects">;
  sourceBrainstormId?: Id<"brainstorms">;
  priority?: string;
  lastMessageTime?: number | null;
}

// ── Project interface ───────────────────────────────────────────

export interface ProjectDoc {
  _id: Id<"projects">;
  name: string;
  slug: string;
  description?: string;
  clientSlug?: string;
  color: string;
  sourceBrainstormId?: Id<"brainstorms">;
  status: string;
  taskCount: number;
  completedTaskCount: number;
}

// ── Client interface ────────────────────────────────────────────

export interface ClientDoc {
  _id: Id<"clients">;
  name: string;
  slug: string;
  color?: string;
  domain?: string;
  active: boolean;
}

// ── Helpers ─────────────────────────────────────────────────────

export function formatRelativeTime(timestamp: number | null): string {
  if (!timestamp) return "";
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
