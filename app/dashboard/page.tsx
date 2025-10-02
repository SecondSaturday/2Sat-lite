"use client";

import { UserButton } from "@clerk/nextjs";
import { getNextSecondSaturday, formatMonthDay } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const nextSecondSaturday = getNextSecondSaturday();
  const formattedDate = formatMonthDay(nextSecondSaturday);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="bg-base-100 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 20 L20 50 L35 50 L35 35 L50 35 L50 20 Z"
                fill="currentColor"
              />
              <path
                d="M80 20 L80 50 L65 50 L65 35 L50 35 L50 20 Z"
                fill="currentColor"
              />
              <path
                d="M20 80 L20 50 L35 50 L35 65 L50 65 L50 80 Z"
                fill="currentColor"
              />
              <path
                d="M80 80 L80 50 L65 50 L65 65 L50 65 L50 80 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Month Selector */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost gap-2 text-base sm:text-lg font-normal"
            >
              <span>Sep 13</span>
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

          {/* User Avatar */}
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/signin" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          {/* Empty State Message */}
          <p className="text-base-content/60 text-center mb-8 sm:mb-12 text-base sm:text-lg">
            Your Second Saturday issues will appear here.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/contribute')}
            className="btn btn-primary btn-lg gap-2 text-white text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-3xl shadow-lg hover:shadow-xl transition-all"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
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
            <span>{formattedDate}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
