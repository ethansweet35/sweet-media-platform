import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";

const fallbackMetadata: Metadata = {
  title: "Contact | Adolescent Mental Health",
  description: "Give visitors a simple way to contact the client.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallbackMetadata);
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-24 text-[var(--color-primary)]">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
          Client Template
        </p>
        <h1 className="mb-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
          Contact
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Give visitors a simple way to contact the client.
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
