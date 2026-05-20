import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-soft-white px-6 text-deep-navy">
      <div className="mx-auto max-w-md text-center">
        <p className="text-[12px] font-body font-semibold tracking-[0.15em] uppercase text-tfrf-blue">
          404 — Page not found
        </p>
        <h1 className="mt-4 font-display text-display-s">We can&apos;t find that page</h1>
        <p className="mt-4 text-[17px] font-body text-slate">
          The link may be broken or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-pure-white transition hover:bg-deep-navy"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
