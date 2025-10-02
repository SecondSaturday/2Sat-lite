"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from "@clerk/nextjs";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <>
      <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-10">
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <Logo width={32} height={32} className="text-primary" />
            <h1 className="text-lg font-semibold">2Sat</h1>
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-3">
            <SignedIn>
              <UserButton />
              <SignOutButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="btn btn-primary btn-sm">Sign In</button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-base-content">
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
    <button
      className="btn btn-ghost btn-sm"
      onClick={() => signOut(() => router.push("/signin"))}
      data-testid="sign-out-button"
    >
      Sign out
    </button>
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
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p className="text-lg">Welcome {viewer ?? "Anonymous"}!</p>
      <p className="text-base-content/80">
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
      </div>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : (numbers?.join(", ") ?? "...")}
      </p>
      <p className="text-base-content/80">
        Edit{" "}
        <code className="font-mono bg-base-200 px-2 py-1 rounded text-sm">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p className="text-base-content/80">
        Edit{" "}
        <code className="font-mono bg-base-200 px-2 py-1 rounded text-sm">
          app/page.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        See the{" "}
        <Link href="/server" className="link link-primary">
          /server route
        </Link>{" "}
        for an example of loading data in a server component
      </p>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold">Useful resources:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card bg-base-200 hover:bg-base-300 transition-colors"
    >
      <div className="card-body p-4 gap-2">
        <h3 className="card-title text-sm font-semibold text-primary">
          {title}
        </h3>
        <p className="text-xs text-base-content/70 line-clamp-3">{description}</p>
      </div>
    </a>
  );
}
