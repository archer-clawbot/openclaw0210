import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { DEFAULT_TENANT_ID } from "../lib/tenant";
import { slugify } from "../lib/types";
import {
  IconX,
  IconRocket,
  IconTrash,
  IconPlus,
  IconChecklist,
  IconSparkles,
  IconLoader2,
  IconFolder,
  IconUser,
} from "@tabler/icons-react";

interface GeneratePlanModalProps {
  brainstormId: Id<"brainstorms">;
  onClose: () => void;
  onComplete: () => void;
}

interface TaskDraft {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priority: "critical" | "high" | "medium" | "low";
  agentHint: string; // suggested agent name
}

/**
 * Parse brainstorm markdown and extract actionable tasks.
 */
function extractTasksFromContent(title: string, content: string): TaskDraft[] {
  const tasks: TaskDraft[] = [];
  let idCounter = 0;
  const makeId = () => `draft-${++idCounter}`;

  const sections = content.split(/^##\s+/m).filter(Boolean);

  // Agent detection: look for agent names in the content
  const agentNames = [
    "Archer", "Silas", "Scribe", "Herald", "Wrench", "Specs",
    "Mozi", "Scout", "Canvas", "Builder", "Citadel", "Ghost",
    "Lookout", "Ledger", "Razor",
  ];

  function detectAgent(text: string): string {
    const lower = text.toLowerCase();
    for (const agent of agentNames) {
      if (lower.includes(agent.toLowerCase())) return agent;
    }
    return "";
  }

  for (const section of sections) {
    const lines = section.split("\n");
    const sectionTitle = lines[0]?.trim() || "";

    if (/table of contents|overview|context|background/i.test(sectionTitle)) continue;

    const actionVerbs =
      /^(?:[-*]|\d+\.)\s+(?:implement|create|build|deploy|set up|configure|add|enable|integrate|migrate|install|update|fix|write|design|test|review|connect|launch|send|schedule|analyze|run|monitor)/i;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (actionVerbs.test(line)) {
        const taskText = line.replace(/^(?:[-*]|\d+\.)\s+/, "").trim();

        const subItems: string[] = [];
        let j = i + 1;
        while (j < lines.length && /^\s+[-*]/.test(lines[j])) {
          subItems.push(lines[j].trim().replace(/^[-*]\s+/, ""));
          j++;
        }

        const fullText = subItems.length > 0
          ? `${taskText}\n\n${subItems.map((s) => `- ${s}`).join("\n")}`
          : taskText;

        tasks.push({
          id: makeId(),
          title: taskText.length > 80 ? taskText.slice(0, 77) + "..." : taskText,
          description: fullText,
          tags: [
            sectionTitle
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .trim()
              .slice(0, 20),
          ].filter(Boolean),
          priority: "medium",
          agentHint: detectAgent(fullText) || detectAgent(sectionTitle),
        });
      }
    }

    // Fallback: subsection headings
    if (tasks.length === 0) {
      const subHeadings = section.match(/^###\s+(.+)$/gm);
      if (subHeadings) {
        for (const heading of subHeadings) {
          const subTitle = heading.replace(/^###\s+/, "").trim();
          if (/example|note|warning|caveat/i.test(subTitle)) continue;

          const headingIdx = section.indexOf(heading);
          const nextIdx = section.indexOf("\n### ", headingIdx + heading.length);
          const subContent = section
            .slice(headingIdx + heading.length, nextIdx > 0 ? nextIdx : undefined)
            .trim();

          if (subContent.length > 20) {
            tasks.push({
              id: makeId(),
              title: `${sectionTitle}: ${subTitle}`.slice(0, 80),
              description: subContent.slice(0, 500),
              tags: [
                sectionTitle
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, "")
                  .trim()
                  .slice(0, 20),
              ].filter(Boolean),
              priority: "medium",
              agentHint: detectAgent(subContent) || detectAgent(subTitle),
            });
          }
        }
      }
    }
  }

  // Final fallback: top-level sections as tasks
  if (tasks.length === 0) {
    for (const section of sections) {
      const lines = section.split("\n");
      const sectionTitle = lines[0]?.trim() || "";
      if (/table of contents|overview|context|background/i.test(sectionTitle)) continue;
      if (!sectionTitle || sectionTitle.length < 3) continue;

      const sectionContent = lines.slice(1).join("\n").trim();
      if (sectionContent.length < 20) continue;

      tasks.push({
        id: makeId(),
        title: `[${title}] ${sectionTitle}`.slice(0, 80),
        description: sectionContent.slice(0, 500),
        tags: ["brainstorm"],
        priority: "medium",
        agentHint: detectAgent(sectionContent),
      });
    }
  }

  return tasks;
}

export default function GeneratePlanModal({
  brainstormId,
  onClose,
  onComplete,
}: GeneratePlanModalProps) {
  const brainstorm = useQuery(api.brainstorms.get, {
    brainstormId,
    tenantId: DEFAULT_TENANT_ID,
  });

  const clientsList = useQuery(api.clients.list, {
    tenantId: DEFAULT_TENANT_ID,
    activeOnly: true,
  });

  const createTask = useMutation(api.tasks.createTask);
  const markPlanGenerated = useMutation(api.brainstorms.markPlanGenerated);
  const createProject = useMutation(api.projects.create);

  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [clientSlug, setClientSlug] = useState("");

  // Extract tasks from brainstorm content
  const initialTasks = useMemo(() => {
    if (!brainstorm) return [];
    return extractTasksFromContent(brainstorm.title, brainstorm.content);
  }, [brainstorm]);

  const [tasks, setTasks] = useState<TaskDraft[]>([]);

  // Initialize
  useEffect(() => {
    if (initialTasks.length > 0 && tasks.length === 0) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  // Default project name from brainstorm title
  useEffect(() => {
    if (brainstorm && !projectName) {
      setProjectName(brainstorm.title);
    }
  }, [brainstorm]);

  const updateTask = useCallback((id: string, updates: Partial<TaskDraft>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addTask = useCallback(() => {
    setTasks((prev) => [
      ...prev,
      {
        id: `draft-${Date.now()}`,
        title: "",
        description: "",
        tags: ["brainstorm"],
        priority: "medium" as const,
        agentHint: "",
      },
    ]);
  }, []);

  const handleCreateAll = async () => {
    if (tasks.length === 0 || isCreating) return;
    setIsCreating(true);

    try {
      // 1. Create the project to group all tasks
      const projectSlug = slugify(projectName || brainstorm?.title || "brainstorm-plan");
      const projectId = await createProject({
        name: projectName || brainstorm?.title || "Brainstorm Plan",
        slug: `${projectSlug}-${Date.now()}`,
        description: `Generated from brainstorm: ${brainstorm?.title}`,
        clientSlug: clientSlug || undefined,
        sourceBrainstormId: brainstormId,
        tenantId: DEFAULT_TENANT_ID,
      });

      // 2. Create all tasks linked to the project + client
      const validTasks = tasks.filter((t) => t.title.trim());
      for (const task of validTasks) {
        await createTask({
          title: task.title,
          description: task.description || task.title,
          status: "brainstorm_queue",
          tags: [
            ...task.tags,
            "brainstorm",
            `project:${projectSlug}`,
          ],
          borderColor: undefined, // project color handles this now
          tenantId: DEFAULT_TENANT_ID,
          projectId,
          clientSlug: clientSlug || undefined,
          sourceBrainstormId: brainstormId,
        });
      }

      // 3. Mark brainstorm as planned
      await markPlanGenerated({
        brainstormId,
        taskCount: validTasks.length,
        tenantId: DEFAULT_TENANT_ID,
      });

      onComplete();
    } catch (err) {
      console.error("Failed to create tasks:", err);
      setIsCreating(false);
    }
  };

  if (!brainstorm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-card rounded-xl p-8 text-muted-foreground animate-pulse">
          Loading brainstorm...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-xl border border-border shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col mx-4">
        {/* Header */}
        <div className="shrink-0 border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <IconSparkles size={20} className="text-[var(--accent-orange)]" />
              <h2 className="text-lg font-semibold text-foreground">
                Generate Implementation Plan
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <IconX size={18} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            From:{" "}
            <span className="font-medium text-foreground">{brainstorm.title}</span>
          </p>

          {/* Project name + Client assignment */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-muted-foreground mb-1.5">
                <IconFolder size={12} />
                PROJECT NAME
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., LocalCatalyst Email Campaign 1"
                className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)]"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-muted-foreground mb-1.5">
                <IconUser size={12} />
                CLIENT
              </label>
              <select
                value={clientSlug}
                onChange={(e) => setClientSlug(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] cursor-pointer"
              >
                <option value="">No client (internal)</option>
                {clientsList?.map((c) => (
                  <option key={c._id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground mt-2">
            All tasks below will be grouped under this project and tagged to the selected client.
            They'll appear in the <span className="font-semibold text-[var(--accent-orange)]">Brainstorm Queue</span> on the kanban.
          </p>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <IconChecklist size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No tasks extracted</p>
              <p className="text-sm mt-1">
                Add tasks manually or refine the brainstorm with more specific action items.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="bg-secondary border border-border rounded-lg p-4 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 pt-1">
                      <span className="text-xs font-bold text-muted-foreground bg-muted w-6 h-6 rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) =>
                          updateTask(task.id, { title: e.target.value })
                        }
                        placeholder="Task title..."
                        className="w-full text-sm font-semibold text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground"
                      />
                      <textarea
                        value={task.description}
                        onChange={(e) =>
                          updateTask(task.id, { description: e.target.value })
                        }
                        placeholder="Description..."
                        rows={2}
                        className="w-full mt-2 text-xs text-muted-foreground bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground leading-relaxed"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <select
                          value={task.priority}
                          onChange={(e) =>
                            updateTask(task.id, {
                              priority: e.target.value as TaskDraft["priority"],
                            })
                          }
                          className="text-[10px] font-semibold bg-muted border border-border rounded px-2 py-1 text-muted-foreground cursor-pointer"
                        >
                          <option value="critical">Critical</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                        {task.agentHint && (
                          <span className="text-[10px] px-2 py-0.5 bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] rounded font-semibold">
                            → {task.agentHint}
                          </span>
                        )}
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 bg-muted rounded font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="shrink-0 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-muted rounded transition-all text-muted-foreground hover:text-destructive"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={addTask}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted px-3 py-2 rounded-lg transition-colors"
          >
            <IconPlus size={14} />
            Add Task
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {tasks.filter((t) => t.title.trim()).length} tasks →{" "}
              <span className="font-semibold text-foreground">
                {projectName || "Unnamed Project"}
              </span>
            </span>
            <button
              onClick={onClose}
              className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAll}
              disabled={
                tasks.filter((t) => t.title.trim()).length === 0 || isCreating
              }
              className="flex items-center gap-2 text-sm font-semibold bg-[var(--accent-orange)] text-black px-5 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <>
                  <IconLoader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <IconRocket size={16} />
                  Create Project + Tasks
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
