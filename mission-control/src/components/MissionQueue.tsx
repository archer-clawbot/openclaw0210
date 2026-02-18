import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { IconArchive } from "@tabler/icons-react";
import { DEFAULT_TENANT_ID } from "../lib/tenant";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import KanbanColumn from "./KanbanColumn";
import KanbanFilterBar from "./KanbanFilterBar";
import {
  type TaskStatus,
  type KanbanFilters,
  type EnrichedTask,
  type ProjectDoc,
  type ClientDoc,
  KANBAN_COLUMNS,
  ARCHIVED_COLUMN,
  DEFAULT_FILTERS,
  formatRelativeTime,
} from "../lib/types";

interface MissionQueueProps {
  selectedTaskId: Id<"tasks"> | null;
  onSelectTask: (id: Id<"tasks">) => void;
}

const MissionQueue: React.FC<MissionQueueProps> = ({
  selectedTaskId,
  onSelectTask,
}) => {
  const tasks = useQuery(api.queries.listTasks, { tenantId: DEFAULT_TENANT_ID });
  const agents = useQuery(api.queries.listAgents, { tenantId: DEFAULT_TENANT_ID });
  const projects = useQuery(api.projects.list, { tenantId: DEFAULT_TENANT_ID });
  const clients = useQuery(api.clients.list, { tenantId: DEFAULT_TENANT_ID });

  const archiveTask = useMutation(api.tasks.archiveTask);
  const updateStatus = useMutation(api.tasks.updateStatus);
  const linkRun = useMutation(api.tasks.linkRun);

  const [showArchived, setShowArchived] = useState(false);
  const [filters, setFilters] = useState<KanbanFilters>(DEFAULT_FILTERS);
  const convex = useConvex();
  const [activeTask, setActiveTask] = useState<EnrichedTask | null>(null);

  const currentUserAgent = agents?.find((a) => a.name === "Manish");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // Build lookup maps
  const projectMap = useMemo(() => {
    if (!projects) return new Map<string, ProjectDoc>();
    return new Map(projects.map((p) => [p._id, p as ProjectDoc]));
  }, [projects]);

  const clientMap = useMemo(() => {
    if (!clients) return new Map<string, ClientDoc>();
    return new Map(clients.map((c) => [c.slug, c as ClientDoc]));
  }, [clients]);

  // Apply filters
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return (tasks as EnrichedTask[]).filter((task) => {
      // Client filter
      if (filters.clientSlug !== "all") {
        if (task.clientSlug !== filters.clientSlug) return false;
      }

      // Project filter
      if (filters.projectId !== "all") {
        if (String(task.projectId) !== filters.projectId) return false;
      }

      // Tag filter
      if (filters.tag !== "all") {
        const tagLower = filters.tag.toLowerCase();
        if (!task.tags.some((t) => t.toLowerCase().includes(tagLower))) return false;
      }

      // Search filter
      if (filters.search) {
        const term = filters.search.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(term);
        const descMatch = task.description.toLowerCase().includes(term);
        const tagMatch = task.tags.some((t) => t.toLowerCase().includes(term));
        const clientMatch = task.clientSlug?.toLowerCase().includes(term);
        const projectName = task.projectId
          ? projectMap.get(String(task.projectId))?.name.toLowerCase()
          : "";
        const projectMatch = projectName?.includes(term);

        if (!titleMatch && !descMatch && !tagMatch && !clientMatch && !projectMatch)
          return false;
      }

      return true;
    });
  }, [tasks, filters, projectMap]);

  if (tasks === undefined || agents === undefined) {
    return (
      <main className="[grid-area:main] bg-secondary flex flex-col overflow-hidden animate-pulse">
        <div className="h-[65px] bg-card border-b border-border" />
        <div className="flex-1 grid grid-cols-6 gap-px bg-border">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-secondary" />
          ))}
        </div>
      </main>
    );
  }

  const getAgentName = (id: string) => {
    return agents.find((a) => a._id === id)?.name || "Unknown";
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = filteredTasks.find((t) => t._id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || !currentUserAgent) return;

    const taskId = active.id as Id<"tasks">;
    const newStatus = over.id as TaskStatus;
    const task = filteredTasks.find((t) => t._id === taskId);

    if (task && task.status !== newStatus) {
      await updateStatus({
        taskId,
        status: newStatus,
        agentId: currentUserAgent._id,
        tenantId: DEFAULT_TENANT_ID,
      });
    }
  };

  const handleArchive = (taskId: Id<"tasks">) => {
    if (currentUserAgent) {
      archiveTask({
        taskId,
        agentId: currentUserAgent._id,
        tenantId: DEFAULT_TENANT_ID,
      });
    }
  };

  const buildAgentPreamble = (task: EnrichedTask) => {
    const assignee =
      task.assigneeIds.length > 0
        ? agents.find((a) => a._id === task.assigneeIds[0])
        : null;
    if (!assignee) return "";

    const parts: string[] = [];
    if (assignee.systemPrompt) parts.push(`System Prompt:\n${assignee.systemPrompt}`);
    if (assignee.character) parts.push(`Character:\n${assignee.character}`);
    if (assignee.lore) parts.push(`Lore:\n${assignee.lore}`);

    return parts.length > 0 ? parts.join("\n\n") + "\n\n---\n\n" : "";
  };

  const buildPrompt = async (task: EnrichedTask) => {
    let prompt = buildAgentPreamble(task);

    prompt +=
      task.description && task.description !== task.title
        ? `${task.title}\n\n${task.description}`
        : task.title;

    const messages = await convex.query(api.queries.listMessages, {
      taskId: task._id,
      tenantId: DEFAULT_TENANT_ID,
    });
    if (messages && messages.length > 0) {
      const sorted = [...messages].sort(
        (a, b) => a._creationTime - b._creationTime
      );
      const thread = sorted
        .map((m) => `[${m.agentName}]: ${m.content}`)
        .join("\n\n");
      prompt += `\n\n---\nConversation:\n${thread}\n---\nContinue working on this task based on the conversation above.`;
    }

    return prompt;
  };

  const triggerAgent = async (taskId: Id<"tasks">, message: string) => {
    try {
      const res = await fetch("/hooks/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENCLAW_HOOK_TOKEN || ""}`,
        },
        body: JSON.stringify({
          message,
          sessionKey: `mission:${taskId}`,
          name: "MissionControl",
          wakeMode: "now",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.runId) {
          await linkRun({
            taskId,
            openclawRunId: data.runId,
            tenantId: DEFAULT_TENANT_ID,
          });
        }
      }
    } catch (err) {
      console.error("[MissionQueue] Failed to trigger openclaw agent:", err);
    }
  };

  const handlePlay = async (taskId: Id<"tasks">) => {
    if (!currentUserAgent) return;

    await updateStatus({
      taskId,
      status: "in_progress",
      agentId: currentUserAgent._id,
      tenantId: DEFAULT_TENANT_ID,
    });

    const task = filteredTasks.find((t) => t._id === taskId);
    if (!task) return;

    const message = await buildPrompt(task);
    await triggerAgent(taskId, message);
  };

  const displayColumns = showArchived
    ? [...KANBAN_COLUMNS, ARCHIVED_COLUMN]
    : KANBAN_COLUMNS;

  const archivedCount = (tasks as EnrichedTask[]).filter(
    (t) => t.status === "archived"
  ).length;

  const colCount = displayColumns.length;

  return (
    <main className="[grid-area:main] bg-secondary flex min-h-0 flex-col overflow-hidden">
      {/* Header with stats + filters */}
      <div className="shrink-0 flex flex-col gap-3 px-6 py-4 bg-card border-b border-border">
        {/* Top row: title + stats */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold tracking-widest text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent-orange)] rounded-full" />
            MISSION QUEUE
          </div>
          <div className="flex gap-2">
            <div className="text-[11px] font-semibold px-3 py-1 rounded bg-muted text-muted-foreground flex items-center gap-1.5">
              <span className="text-sm">📦</span>
              {(tasks as EnrichedTask[]).filter((t) => t.status === "inbox").length}
            </div>
            <div className="text-[11px] font-semibold px-3 py-1 rounded bg-muted text-muted-foreground">
              {
                (tasks as EnrichedTask[]).filter(
                  (t) => t.status !== "done" && t.status !== "archived"
                ).length
              }{" "}
              active
            </div>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-[11px] font-semibold px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
                showArchived
                  ? "bg-[var(--accent-blue)] text-white"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              <IconArchive size={14} />
              {showArchived ? "Hide Archived" : "Show Archived"}
              {archivedCount > 0 && (
                <span
                  className={`px-1.5 rounded-full text-[10px] ${
                    showArchived ? "bg-white/20" : "bg-muted-foreground/30"
                  }`}
                >
                  {archivedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <KanbanFilterBar
          filters={filters}
          onChange={setFilters}
          taskCount={(tasks as EnrichedTask[]).length}
          filteredCount={filteredTasks.length}
        />
      </div>

      {/* Kanban columns */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex-1 min-h-0 grid gap-px bg-border overflow-x-auto overflow-y-hidden"
          style={{
            gridTemplateColumns: `repeat(${colCount}, minmax(220px, 1fr))`,
          }}
        >
          {displayColumns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <KanbanColumn
                key={col.id}
                column={col}
                taskCount={colTasks.length}
              >
                {colTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    isSelected={selectedTaskId === task._id}
                    onClick={() => onSelectTask(task._id)}
                    getAgentName={getAgentName}
                    formatRelativeTime={formatRelativeTime}
                    columnId={col.id}
                    currentUserAgentId={currentUserAgent?._id}
                    onArchive={handleArchive}
                    onPlay={handlePlay}
                    project={
                      task.projectId
                        ? projectMap.get(String(task.projectId)) || null
                        : null
                    }
                    client={
                      task.clientSlug
                        ? clientMap.get(task.clientSlug) || null
                        : null
                    }
                  />
                ))}
              </KanbanColumn>
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              isSelected={false}
              onClick={() => {}}
              getAgentName={getAgentName}
              formatRelativeTime={formatRelativeTime}
              columnId={activeTask.status}
              isOverlay={true}
              project={
                activeTask.projectId
                  ? projectMap.get(String(activeTask.projectId)) || null
                  : null
              }
              client={
                activeTask.clientSlug
                  ? clientMap.get(activeTask.clientSlug) || null
                  : null
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
};

export default MissionQueue;
