"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getNextSecondSaturday, formatMonthDay } from "@/lib/utils";
import Logo from "@/components/Logo";
import type { Id } from "@/convex/_generated/dataModel";

export default function Dashboard() {
  const router = useRouter();
  const nextSecondSaturday = getNextSecondSaturday();
  const formattedDate = formatMonthDay(nextSecondSaturday);

  // Get current month in YYYY-MM format
  const currentMonth = new Date()
    .toLocaleDateString("en-CA", { year: "numeric", month: "2-digit" })
    .slice(0, 7);

  // For now, simulate empty groups until backend is ready
  const mockGroups: Array<{ _id: Id<"groups">; name: string; memberIds: Id<"users">[] }> = [];

  // State for selected group (desktop only)
  const [selectedGroupId, setSelectedGroupId] = useState<Id<"groups"> | null>(
    null
  );

  // Auto-select first group when data loads (desktop only)
  const effectiveGroupId =
    selectedGroupId ?? (mockGroups && mockGroups.length > 0 ? mockGroups[0]._id : null);

  // Fetch newsletter for selected group (TODO: implement with Convex query)
  // const newsletter: { htmlContent: string } | null = null;

  // Handle group click - mobile navigates, desktop updates state
  const handleGroupClick = (groupId: Id<"groups">) => {
    // Mobile: navigate to group page
    if (window.innerWidth < 768) {
      router.push(`/groups/${groupId}/issues/${currentMonth}`);
    } else {
      // Desktop: update selected group
      setSelectedGroupId(groupId);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 md:flex">
      {/* Mobile Layout: Full screen list */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-base-300">
          <Logo width={24} height={24} className="text-primary" />

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm gap-2 font-normal text-sm opacity-50"
            >
              <span>{formattedDate}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <UserButton afterSignOutUrl="/signin" />
        </header>

        {/* Body */}
        <main className="flex-1 flex flex-col items-center justify-center px-5">
          {mockGroups && mockGroups.length > 0 ? (
            <div className="w-full max-w-md space-y-4">
              {mockGroups.map((group) => (
                <button
                  key={group._id}
                  onClick={() => handleGroupClick(group._id)}
                  className="card bg-base-200 hover:bg-base-300 transition-colors w-full text-left"
                >
                  <div className="card-body p-6">
                    <h2 className="card-title text-base-content">{group.name}</h2>
                    <p className="text-sm text-base-content/60">
                      {group.memberIds.length}{" "}
                      {group.memberIds.length === 1 ? "member" : "members"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-base-content/50 text-center">
              Your groups will appear here
            </p>
          )}
        </main>

        {/* CTA Button */}
        <div className="flex items-center justify-center px-5 py-5 h-[88px]">
          <button
            onClick={() => router.push("/contribute")}
            className="btn btn-primary btn-lg gap-3 shadow-depth hover:shadow-xl transition-shadow min-w-[115px]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-lg font-semibold">{formattedDate}</span>
          </button>
        </div>
      </div>

      {/* Desktop Layout: Sidebar + Content */}
      <div className="hidden md:flex w-full h-screen">
        {/* Left Sidebar - Group List */}
        <aside className="w-[360px] flex flex-col border-r border-base-content/10 bg-base-300">
          {/* Header */}
          <header className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <Logo width={24} height={24} className="text-primary" />

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm gap-2 font-normal text-sm opacity-50"
              >
                <span>{formattedDate}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <UserButton afterSignOutUrl="/signin" />
          </header>

          {/* Body - Group List */}
          <div className="flex-1 flex flex-col items-center justify-center px-5 overflow-y-auto">
            {mockGroups && mockGroups.length > 0 ? (
              <div className="w-full space-y-4">
                {mockGroups.map((group) => (
                  <button
                    key={group._id}
                    onClick={() => setSelectedGroupId(group._id)}
                    className={`card w-full text-left transition-colors ${
                      effectiveGroupId === group._id
                        ? "bg-base-300"
                        : "bg-base-200 hover:bg-base-300"
                    }`}
                  >
                    <div className="card-body p-6">
                      <h2 className="card-title text-base-content">
                        {group.name}
                      </h2>
                      <p className="text-sm text-base-content/60">
                        {group.memberIds.length}{" "}
                        {group.memberIds.length === 1 ? "member" : "members"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-base-content/50 text-center">
                Your groups will appear here
              </p>
            )}
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center px-5 py-5 h-[88px]">
            <button
              onClick={() => router.push("/contribute")}
              className="btn btn-primary btn-lg gap-3 shadow-depth hover:shadow-xl transition-shadow min-w-[115px]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-lg font-semibold">{formattedDate}</span>
            </button>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 flex items-center justify-center overflow-y-auto bg-base-300">
          <div className="max-w-[800px] w-full px-8">
            <p className="text-sm text-base-content/50 text-center">
              Select a group to view newsletter
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
