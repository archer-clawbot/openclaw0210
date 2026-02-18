import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ── Queries ─────────────────────────────────────────────────────

export const list = query({
  args: {
    tenantId: v.string(),
    activeOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db
      .query("clients")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .collect();

    if (args.activeOnly) {
      results = results.filter((c) => c.active);
    }

    return results.sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const getBySlug = query({
  args: {
    slug: v.string(),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("clients")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();
    return results.find((c) => c.tenantId === args.tenantId) || null;
  },
});

// ── Mutations ───────────────────────────────────────────────────

export const upsert = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    color: v.optional(v.string()),
    domain: v.optional(v.string()),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("clients")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    const match = existing.find((c) => c.tenantId === args.tenantId);

    if (match) {
      await ctx.db.patch(match._id, {
        name: args.name,
        color: args.color || match.color,
        domain: args.domain || match.domain,
      });
      return match._id;
    }

    return await ctx.db.insert("clients", {
      name: args.name,
      slug: args.slug,
      color: args.color,
      domain: args.domain,
      active: true,
      tenantId: args.tenantId,
    });
  },
});

export const setActive = mutation({
  args: {
    clientId: v.id("clients"),
    active: v.boolean(),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const client = await ctx.db.get(args.clientId);
    if (!client || client.tenantId !== args.tenantId) {
      throw new Error("Client not found");
    }
    await ctx.db.patch(args.clientId, { active: args.active });
  },
});

export const remove = mutation({
  args: {
    clientId: v.id("clients"),
    tenantId: v.string(),
  },
  handler: async (ctx, args) => {
    const client = await ctx.db.get(args.clientId);
    if (!client || client.tenantId !== args.tenantId) {
      throw new Error("Client not found");
    }
    await ctx.db.delete(args.clientId);
  },
});

// ── Seed common clients ─────────────────────────────────────────

export const seedDefaults = mutation({
  args: { tenantId: v.string() },
  handler: async (ctx, args) => {
    const defaults = [
      { name: "LocalCatalyst", slug: "localcatalyst", color: "#22c55e" },
      { name: "Chicago's Electrician", slug: "chicagos-electrician", color: "#3b82f6" },
      { name: "Spectators Bar & Grill", slug: "spectators", color: "#f97316" },
    ];

    let created = 0;
    for (const client of defaults) {
      const existing = await ctx.db
        .query("clients")
        .withIndex("by_slug", (q) => q.eq("slug", client.slug))
        .collect();

      if (!existing.find((c) => c.tenantId === args.tenantId)) {
        await ctx.db.insert("clients", {
          ...client,
          active: true,
          tenantId: args.tenantId,
        });
        created++;
      }
    }
    return { created };
  },
});
