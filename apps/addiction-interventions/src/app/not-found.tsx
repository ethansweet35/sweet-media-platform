import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--color-cream)] px-6 text-[var(--color-ink)]">
      <div className="mx-auto max-w-md text-center">
        <p className="brand-eyebrow text-[var(--color-sage)]">
          404 — Page not found
        </p>
        <h1 className="mt-4 text-5xl md:text-6xl">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-base text-[var(--color-ink-muted)]">
          The link may be broken or the page may have moved. Head back to the
          homepage and we&apos;ll get you on your way.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-sage)] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-sage-deep)]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
