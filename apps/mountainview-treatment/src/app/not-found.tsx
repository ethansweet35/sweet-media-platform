import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--color-background)] px-6 text-[var(--color-primary)]">
      <div className="mx-auto max-w-md text-center">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-muted)]">
          404 — Page not found
        </p>
        <h1 className="mt-4 text-5xl font-semibold md:text-6xl">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-base text-[var(--color-muted)]">
          The link may be broken or the page may have moved. Head back to the
          homepage and we&apos;ll get you on your way.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
