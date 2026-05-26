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
    <div className="flex min-h-screen w-full items-center justify-center bg-bg px-6 text-ink">
      <div className="mx-auto max-w-md text-center">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-muted">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
          We hit an unexpected error
        </h1>
        <p className="mt-4 text-base text-muted">
          The page couldn&apos;t finish loading. Please try again — if the issue
          persists, refresh or come back in a moment.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
