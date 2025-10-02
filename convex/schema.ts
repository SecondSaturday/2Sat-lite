import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User data synced from Clerk
  users: defineTable({
    clerkId: v.optional(v.string()),
    email: v.string(),
    name: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    joinedAt: v.optional(v.number()),
    emailVerificationTime: v.optional(v.number()),
  })
    .index("by_email", ["email"]),

  // Friend groups (hardcoded "My Friend Group" for POC)
  groups: defineTable({
    name: v.string(),
    createdAt: v.number(),
    memberIds: v.array(v.id("users")),
  }),

  // Monthly contributions from users
  contributions: defineTable({
    userId: v.id("users"),
    groupId: v.id("groups"),
    month: v.string(), // Format: "2025-01"

    // 5 prompts
    prompt1: v.optional(v.string()), // What did you do this month?
    prompt2: v.optional(v.array(v.string())), // Photo Wall (image URLs)
    prompt3: v.optional(v.string()), // One Good Thing
    prompt4: v.optional(v.string()), // On Your Mind
    prompt5: v.optional(v.string()), // What song are you listening to?

    status: v.union(v.literal("draft"), v.literal("submitted")),
    submittedAt: v.optional(v.number()),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_group", ["groupId"])
    .index("by_month", ["month"])
    .index("by_user_month", ["userId", "month"]),

  // Sent newsletters
  newsletters: defineTable({
    groupId: v.id("groups"),
    month: v.string(), // Format: "2025-01"
    htmlContent: v.string(),
    recipientEmails: v.array(v.string()),
    sentAt: v.number(),
    resendId: v.optional(v.string()), // Resend email ID for tracking
  })
    .index("by_group", ["groupId"])
    .index("by_month", ["month"])
    .index("by_sent_at", ["sentAt"]),

  // Legacy table - can be removed after migration
  numbers: defineTable({
    value: v.number(),
  }),
});
