import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ── Queries ─────────────────────────────────────────────────────

export const list = query({
  args: {
    tenantId: v.string(),
    status: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db
      .query("brainstorms")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .order("desc")
      .collect();

    if (args.status) {
      results = results.filter((b) => b.status === args.status);
    }

    if (args.search) {
      const term = args.search.toLowerCase();
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          (b.summary && b.summary.toLowerCase().includes(term)) ||
          b.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    return results;
  },
});

export const get = query({
  args: {
    brainstormId: v.id("brainstorms"),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const brainstorm = await ctx.db.get(args.brainstormId);
    if (!brainstorm || brainstorm.tenantId !== args.tenantId) {
      throw new Error("Brainstorm not found");
    }
    return brainstorm;
  },
});

export const getBySlug = query({
  args: {
    slug: v.string(),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("brainstorms")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();
    const brainstorm = results.find((b) => b.tenantId === args.tenantId);
    if (!brainstorm) throw new Error("Brainstorm not found");
    return brainstorm;
  },
});

// ── Mutations ───────────────────────────────────────────────────

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
    sourceDate: v.string(),
    sourceAgent: v.optional(v.string()),
    sourceVideo: v.optional(v.string()),
    tags: v.array(v.string()),
    status: v.optional(v.string()),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("brainstorms", {
      title: args.title,
      slug: args.slug,
      content: args.content,
      summary: args.summary || "",
      sourceDate: args.sourceDate,
      sourceAgent: args.sourceAgent || "Archer",
      sourceVideo: args.sourceVideo,
      tags: args.tags,
      status: (args.status as any) || "new",
      planGenerated: false,
      taskCount: 0,
      tenantId: args.tenantId,
    });
  },
});

export const updateStatus = mutation({
  args: {
    brainstormId: v.id("brainstorms"),
    status: v.string(),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const brainstorm = await ctx.db.get(args.brainstormId);
    if (!brainstorm || brainstorm.tenantId !== args.tenantId) {
      throw new Error("Brainstorm not found");
    }
    await ctx.db.patch(args.brainstormId, { status: args.status as any });
  },
});

export const markPlanGenerated = mutation({
  args: {
    brainstormId: v.id("brainstorms"),
    taskCount: v.number(),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const brainstorm = await ctx.db.get(args.brainstormId);
    if (!brainstorm || brainstorm.tenantId !== args.tenantId) {
      throw new Error("Brainstorm not found");
    }
    await ctx.db.patch(args.brainstormId, {
      planGenerated: true,
      taskCount: args.taskCount,
      status: "planned",
    });
  },
});

export const remove = mutation({
  args: {
    brainstormId: v.id("brainstorms"),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const brainstorm = await ctx.db.get(args.brainstormId);
    if (!brainstorm || brainstorm.tenantId !== args.tenantId) {
      throw new Error("Brainstorm not found");
    }
    await ctx.db.delete(args.brainstormId);
  },
});

// ── Bulk import ─────────────────────────────────────────────────

export const bulkImport = mutation({
  args: {
    brainstorms: v.array(
      v.object({
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        summary: v.string(),
        sourceDate: v.string(),
        sourceAgent: v.string(),
        tags: v.array(v.string()),
      })
    ),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    let imported = 0;
    let skipped = 0;

    for (const b of args.brainstorms) {
      const existing = await ctx.db
        .query("brainstorms")
        .withIndex("by_slug", (q) => q.eq("slug", b.slug))
        .collect();

      const match = existing.find((e) => e.tenantId === args.tenantId);

      if (match) {
        if (match.content !== b.content) {
          await ctx.db.patch(match._id, {
            content: b.content,
            title: b.title,
            summary: b.summary,
            tags: b.tags,
          });
          imported++;
        } else {
          skipped++;
        }
      } else {
        await ctx.db.insert("brainstorms", {
          title: b.title,
          slug: b.slug,
          content: b.content,
          summary: b.summary,
          sourceDate: b.sourceDate,
          sourceAgent: b.sourceAgent,
          tags: b.tags,
          status: "new",
          planGenerated: false,
          taskCount: 0,
          tenantId: args.tenantId,
        });
        imported++;
      }
    }

    return { imported, skipped };
  },
});
