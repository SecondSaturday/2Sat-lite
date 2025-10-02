import { v } from "convex/values";
import { query } from "./_generated/server";

/**
 * Get a newsletter by group ID and month
 * Returns null if no newsletter exists for that group/month
 */
export const getByGroupAndMonth = query({
  args: {
    groupId: v.id("groups"),
    month: v.string(), // Format: "2025-01" or "2025-10"
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Verify user is a member of the group
    const group = await ctx.db.get(args.groupId);

    if (!group) {
      throw new Error("Group not found");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user || !group.memberIds.includes(user._id)) {
      throw new Error("Not authorized to view this group's newsletters");
    }

    // Find newsletter for this group and month
    const newsletter = await ctx.db
      .query("newsletters")
      .filter((q) =>
        q.and(
          q.eq(q.field("groupId"), args.groupId),
          q.eq(q.field("month"), args.month)
        )
      )
      .first();

    return newsletter ?? null;
  },
});

/**
 * List all newsletters for a group
 * Returns newsletters ordered by sentAt date (newest first)
 */
export const listByGroup = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Verify user is a member of the group
    const group = await ctx.db.get(args.groupId);

    if (!group) {
      throw new Error("Group not found");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user || !group.memberIds.includes(user._id)) {
      throw new Error("Not authorized to view this group's newsletters");
    }

    // Get all newsletters for this group
    const newsletters = await ctx.db
      .query("newsletters")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .order("desc")
      .collect();

    return newsletters;
  },
});
