import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ── 12 project colors (distinct, accessible on dark bg) ────────
export const PROJECT_COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#06b6d4", // cyan
  "#e11d48", // rose
  "#a855f7", // purple
  "#14b8a6", // teal
  "#f59e0b", // amber
  "#6366f1", // indigo
];

// ── Queries ─────────────────────────────────────────────────────

export const list = query({
  args: {
    tenantId: v.string(),
    clientSlug: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results;

    if (args.clientSlug) {
      results = await ctx.db
        .query("projects")
        .withIndex("by_tenant_client", (q) =>
          q.eq("tenantId", args.tenantId).eq("clientSlug", args.clientSlug)
        )
        .collect();
    } else {
      results = await ctx.db
        .query("projects")
        .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
        .collect();
    }

    if (args.status) {
      results = results.filter((p) => p.status === args.status);
    }

    return results;
  },
});

export const get = query({
  args: {
    projectId: v.id("projects"),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project || project.tenantId !== args.tenantId) {
      throw new Error("Project not found");
    }
    return project;
  },
});

// ── Mutations ───────────────────────────────────────────────────

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    clientSlug: v.optional(v.string()),
    color: v.optional(v.string()),
    sourceBrainstormId: v.optional(v.id("brainstorms")),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    // Auto-assign color if not provided
    const existingProjects = await ctx.db
      .query("projects")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .collect();

    const usedColors = new Set(existingProjects.map((p) => p.color));
    const color =
      args.color ||
      PROJECT_COLORS.find((c) => !usedColors.has(c)) ||
      PROJECT_COLORS[existingProjects.length % PROJECT_COLORS.length];

    const id = await ctx.db.insert("projects", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      clientSlug: args.clientSlug,
      color,
      sourceBrainstormId: args.sourceBrainstormId,
      status: "active",
      taskCount: 0,
      completedTaskCount: 0,
      tenantId: args.tenantId,
    });
    return id;
  },
});

export const updateCounts = mutation({
  args: {
    projectId: v.id("projects"),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project || project.tenantId !== args.tenantId) return;

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_tenant_project", (q) =>
        q.eq("tenantId", args.tenantId).eq("projectId", args.projectId)
      )
      .collect();

    const taskCount = tasks.length;
    const completedTaskCount = tasks.filter(
      (t) => t.status === "done" || t.status === "archived"
    ).length;

    await ctx.db.patch(args.projectId, { taskCount, completedTaskCount });
  },
});

export const updateStatus = mutation({
  args: {
    projectId: v.id("projects"),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("archived")
    ),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project || project.tenantId !== args.tenantId) {
      throw new Error("Project not found");
    }
    await ctx.db.patch(args.projectId, { status: args.status });
  },
});

export const remove = mutation({
  args: {
    projectId: v.id("projects"),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project || project.tenantId !== args.tenantId) {
      throw new Error("Project not found");
    }

    // Unlink tasks from project (don't delete them)
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_tenant_project", (q) =>
        q.eq("tenantId", args.tenantId).eq("projectId", args.projectId)
      )
      .collect();

    for (const task of tasks) {
      await ctx.db.patch(task._id, { projectId: undefined });
    }

    await ctx.db.delete(args.projectId);
  },
});
