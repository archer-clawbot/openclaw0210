import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Id } from "../../convex/_generated/dataModel";
import { IconArchive, IconPlayerPlay, IconLoader2, IconFolder } from "@tabler/icons-react";
import type { ProjectDoc, ClientDoc } from "../lib/types";

interface Task {
  _id: Id<"tasks">;
  title: string;
  description: string;
  status: string;
  assigneeIds: Id<"agents">[];
  tags: string[];
  borderColor?: string;
  clientSlug?: string;
  projectId?: Id<"projects">;
  priority?: string;
  lastMessageTime?: number;
}

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onClick: () => void;
  getAgentName: (id: string) => string;
  formatRelativeTime: (timestamp: number | null) => string;
  columnId: string;
  currentUserAgentId?: Id<"agents">;
  onArchive?: (taskId: Id<"tasks">) => void;
  onPlay?: (taskId: Id<"tasks">) => void;
  isOverlay?: boolean;
  // New props for grouping
  project?: ProjectDoc | null;
  client?: ClientDoc | null;
}

const PRIORITY_DOTS: Record<string, { color: string; label: string }> = {
  critical: { color: "#ef4444", label: "Critical" },
  high: { color: "#f97316", label: "High" },
  medium: { color: "#eab308", label: "Medium" },
  low: { color: "#6b7280", label: "Low" },
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isSelected,
  onClick,
  getAgentName,
  formatRelativeTime,
  columnId,
  currentUserAgentId,
  onArchive,
  onPlay,
  isOverlay = false,
  project,
  client,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task._id,
    data: { task },
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  // Use project color for left border if available, else task's borderColor
  const leftBorderColor = project?.color || task.borderColor || "transparent";

  const priorityInfo = task.priority ? PRIORITY_DOTS[task.priority] : null;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        borderLeft:
          isSelected || isOverlay
            ? undefined
            : `4px solid ${leftBorderColor}`,
      }}
      className={`min-w-0 bg-card rounded-lg p-3 sm:p-4 shadow-sm flex flex-col gap-2.5 border transition-all cursor-pointer select-none ${
        isDragging ? "dragging-card" : "hover:-translate-y-0.5 hover:shadow-md"
      } ${
        isSelected
          ? "ring-2 ring-[var(--accent-blue)] border-transparent"
          : "border-border"
      } ${columnId === "archived" ? "opacity-60" : ""} ${
        columnId === "in_progress" ? "card-running" : ""
      } ${isOverlay ? "drag-overlay" : ""}`}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      {/* Top row: client badge + priority + actions */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
          {/* Client badge */}
          {client && (
            <span
              className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded shrink-0"
              style={{
                backgroundColor: `${client.color || "#6b7280"}20`,
                color: client.color || "#6b7280",
              }}
            >
              {client.name}
            </span>
          )}
          {/* Fallback: show clientSlug if no client doc */}
          {!client && task.clientSlug && (
            <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
              {task.clientSlug}
            </span>
          )}
          {/* Priority dot */}
          {priorityInfo && (
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: priorityInfo.color }}
              title={priorityInfo.label}
            />
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {(columnId === "inbox" ||
            columnId === "assigned" ||
            columnId === "brainstorm_queue") &&
            currentUserAgentId &&
            onPlay && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(task._id);
                }}
                className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-[var(--accent-blue)]"
                title="Start task"
              >
                <IconPlayerPlay size={14} />
              </button>
            )}
          {columnId === "in_progress" && (
            <span className="p-1 text-[var(--accent-blue)]" title="Running">
              <IconLoader2 size={14} className="animate-spin" />
            </span>
          )}
          {columnId === "done" && currentUserAgentId && onArchive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArchive(task._id);
              }}
              className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
              title="Archive task"
            >
              <IconArchive size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-foreground leading-tight break-words">
        {task.title}
      </h3>

      {/* Description preview */}
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 break-words">
        {task.description}
      </p>

      {/* Project badge (if grouped) */}
      {project && (
        <div
          className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded w-fit"
          style={{
            backgroundColor: `${project.color}18`,
            color: project.color,
          }}
        >
          <IconFolder size={11} />
          <span className="truncate max-w-[160px]">{project.name}</span>
        </div>
      )}

      {/* Footer: agent + timestamp */}
      <div className="flex justify-between items-center">
        {task.assigneeIds && task.assigneeIds.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs">👤</span>
            <span className="text-[11px] font-semibold text-foreground">
              {getAgentName(task.assigneeIds[0] as string)}
            </span>
          </div>
        )}
        {task.lastMessageTime && (
          <span className="text-[11px] text-muted-foreground">
            {formatRelativeTime(task.lastMessageTime)}
          </span>
        )}
      </div>

      {/* Tags row */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags
            .filter((t) => !t.startsWith("src:")) // hide internal source tags
            .slice(0, 4)
            .map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-1.5 py-0.5 bg-muted rounded font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          {task.tags.filter((t) => !t.startsWith("src:")).length > 4 && (
            <span className="text-[9px] px-1.5 py-0.5 bg-muted rounded font-medium text-muted-foreground">
              +{task.tags.filter((t) => !t.startsWith("src:")).length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
