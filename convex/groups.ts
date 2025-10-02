import { v } from "convex/values";
import { query } from "./_generated/server";

/**
 * List all groups that the current user is a member of
 * Returns groups ordered by creation date (newest first)
 */
export const listUserGroups = query({
  args: {},
  handler: async (ctx) => {
    // Get current user identity from Clerk
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Find user in database by email
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) {
      // User not synced yet from Clerk webhook
      return [];
    }

    // Get all groups where user is a member
    const allGroups = await ctx.db.query("groups").collect();

    const userGroups = allGroups.filter((group) =>
      group.memberIds.includes(user._id)
    );

    // Sort by creation date (newest first)
    return userGroups.sort((a, b) => b.createdAt - a.createdAt);
  },
});

/**
 * Get a specific group by ID
 */
export const getById = query({
  args: { groupId: v.id("groups") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const group = await ctx.db.get(args.groupId);

    if (!group) {
      throw new Error("Group not found");
    }

    // Verify user is a member
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user || !group.memberIds.includes(user._id)) {
      throw new Error("Not authorized to view this group");
    }

    return group;
  },
});
