"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <header
        className="sticky top-0 z-10 bg-base-100 border-b border-base-300 flex flex-row justify-between items-center"
        style={{ padding: 'var(--spacing-4)', minHeight: 'var(--navbar-min-height, 64px)' }}
      >
        <h1 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
          2Sat-lite
        </h1>
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton />
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
      <main style={{ padding: 'var(--spacing-8)' }} className="flex flex-col gap-8">
        <h1
          className="font-bold text-center text-base-content"
          style={{ fontSize: 'var(--font-size-4xl)' }}
        >
          Second Saturday Newsletter
        </h1>
        <Content />
      </main>
    </>
  );
}

function SignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => signOut(() => router.push("/signin"))}
      >
        Sign out
      </button>
    </>
  );
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p className="loading loading-spinner loading-lg text-primary"></p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p style={{ fontSize: 'var(--font-size-lg)' }}>Welcome {viewer ?? "Anonymous"}!</p>
      <p className="text-base-content/80">
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : (numbers?.join(", ") ?? "...")}
      </p>
      <p className="text-base-content/80">
        Edit{" "}
        <code className="font-mono bg-base-200 px-2 py-1" style={{ borderRadius: 'var(--radius-fields)', fontSize: 'var(--font-size-sm)' }}>
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p className="text-base-content/80">
        Edit{" "}
        <code className="font-mono bg-base-200 px-2 py-1" style={{ borderRadius: 'var(--radius-fields)', fontSize: 'var(--font-size-sm)' }}>
          app/page.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        See the{" "}
        <Link href="/server" className="underline hover:no-underline">
          /server route
        </Link>{" "}
        for an example of loading data in a server component
      </p>
      <div className="flex flex-col">
        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>Useful resources:</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing
              collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks,
              and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div
      className="flex flex-col gap-2 bg-base-200 p-4 h-28 overflow-auto hover:bg-base-300 transition-colors"
      style={{ borderRadius: 'var(--radius-boxes)' }}
    >
      <a
        href={href}
        className="text-primary underline hover:no-underline font-semibold"
        style={{ fontSize: 'var(--font-size-sm)' }}
      >
        {title}
      </a>
      <p className="text-base-content/70" style={{ fontSize: 'var(--font-size-xs)' }}>{description}</p>
    </div>
  );
}
