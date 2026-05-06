import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";

const fallbackMetadata: Metadata = {
  title: "Client Brand Homepage | Client Brand",
  description: "A blank homepage starter for a new client website.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-24 text-[var(--color-primary)]">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
          Client Template
        </p>
        <h1 className="mb-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
          Client Brand Homepage
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          A blank homepage starter for a new client website.
        </p>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm leading-7 text-slate-600">
            Replace this starter section with client-specific copy, layout, imagery, and conversion elements.
            The admin, blog, Supabase, and shared package infrastructure are already wired into this template.
          </p>
        </div>
      </section>
    </main>
  );
}
