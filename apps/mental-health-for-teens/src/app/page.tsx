import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';

const fallbackMetadata: Metadata = {
  title: 'Mental Health For Teens | Teen Therapy & Outpatient Programs in Colorado',
  description:
    'Specialized mental health treatment for teenagers ages 12–18. Individual therapy, group therapy, IOP, and family therapy in Colorado. Free consultation available.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/', fallbackMetadata);
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas-white px-6 py-24 text-midnight-ink">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-intelligence-blue">
          Mental Health For Teens
        </p>
        <h1 className="mb-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
          Homepage
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-ash">
          Blank homepage — ready to build.
        </p>
        <div className="mt-10 rounded-3xl border border-black/8 bg-whisper-gray p-8">
          <p className="text-sm leading-7 text-muted-ash">
            Replace this section with client-specific copy, layout, imagery, and conversion elements.
          </p>
        </div>
      </section>
    </main>
  );
}
