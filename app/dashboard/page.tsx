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
      {/* Header - Using Figma design tokens */}
      <header className="bg-base-100 border-b border-base-300" style={{ minHeight: 'var(--navbar-min-height, 64px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <Logo width={40} height={40} className="text-primary w-10 h-10 sm:w-12 sm:h-12" />
            <span className="font-semibold text-base-content hidden sm:inline" style={{ fontSize: 'var(--font-size-lg)' }}>
              2Sat
            </span>
          </div>

          {/* Month Selector - Using design token font sizes */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost gap-2 font-normal"
              style={{ fontSize: 'var(--font-size-lg, 18px)' }}
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

          {/* User Avatar */}
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/signin" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          {/* Empty State Message - Using design token spacing */}
          <p
            className="text-base-content/60 text-center mb-8 sm:mb-12"
            style={{ fontSize: 'var(--font-size-lg, 18px)', lineHeight: 'var(--line-height-7, 28px)' }}
          >
            Your Second Saturday issues will appear here.
          </p>

          {/* CTA Button - Using Figma design tokens for sizing and styling */}
          <button
            onClick={() => router.push('/contribute')}
            className="btn btn-primary btn-lg gap-2 text-white px-8 sm:px-12 py-6 sm:py-8 h-auto shadow-depth hover:shadow-xl transition-all"
            style={{
              fontSize: 'var(--font-size-2xl, 24px)',
              borderRadius: 'var(--radius-boxes, 16px)',
              fontWeight: 'var(--font-weight-semibold, 600)'
            }}
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
