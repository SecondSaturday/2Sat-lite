"use client";

import { UserButton } from "@clerk/nextjs";
import { getNextSecondSaturday, formatMonthDay } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function Dashboard() {
  const router = useRouter();
  const nextSecondSaturday = getNextSecondSaturday();
  const formattedDate = formatMonthDay(nextSecondSaturday);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header - DaisyUI navbar component */}
      <header className="navbar bg-base-100 border-b border-base-300">
        <div className="navbar-start">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <Logo width={40} height={40} className="text-primary w-10 h-10 sm:w-12 sm:h-12" />
            <span className="font-semibold text-base-content hidden sm:inline text-lg">
              2Sat
            </span>
          </div>
        </div>

        <div className="navbar-center">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost gap-2 font-normal text-lg"
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
        </div>

        <div className="navbar-end">
          <UserButton afterSignOutUrl="/signin" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-8">
          {/* Empty State Message */}
          <p className="text-lg text-base-content/60 text-center max-w-2xl">
            Your Second Saturday issues will appear here.
          </p>

          {/* CTA Button - DaisyUI button with design system tokens */}
          <button
            onClick={() => router.push('/contribute')}
            className="btn btn-primary btn-lg gap-3 shadow-depth hover:shadow-xl transition-shadow"
          >
            <svg
              className="w-6 h-6"
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
            <span className="text-xl font-semibold">{formattedDate}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
