"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--color-cream)] px-6 text-[var(--color-ink)]">
      <div className="mx-auto max-w-md text-center">
        <p className="brand-eyebrow text-[var(--color-sage)]">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">
          We hit an unexpected error
        </h1>
        <p className="mt-4 text-base text-[var(--color-ink-muted)]">
          The page couldn&apos;t finish loading. Please try again — if the issue
          persists, refresh or come back in a moment.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-sage)] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-sage-deep)]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
