import Link from 'next/link';

const conditions = [
  'Anxiety & Panic Disorders',
  'Depression',
  'Trauma & PTSD',
  'ADHD',
  'Eating Disorders',
  'OCD',
  'Self-Harm',
  'Suicidal Ideation',
  'Substance Use',
  'Bipolar Disorder',
  'Social Anxiety',
  'Academic Stress',
];

export default function WhatWeTreatSection() {
  return (
    <section className="w-full py-24 md:py-28 bg-canvas-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-end mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-ash font-medium">
              What We Treat
            </span>
            <h2
              className="text-midnight-ink font-black leading-[1.0]"
              style={{ fontSize: 'clamp(38px, 4.5vw, 60px)', letterSpacing: '-0.03em' }}
            >
              The full spectrum of
              <br />
              teen mental health.
            </h2>
          </div>
          <p className="text-[15px] text-muted-ash font-light leading-[1.8] lg:pb-1">
            Our clinicians are trained across the full range of adolescent conditions.
            If you don&rsquo;t see your teen&rsquo;s challenge listed, reach out — we very likely can help.
          </p>
        </div>

        {/* Conditions — editorial two-column list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-black/[0.06]">
          {conditions.map((label, i) => (
            <div
              key={label}
              className={`flex items-center gap-4 py-5 px-1 border-b border-black/[0.06] ${
                i % 3 !== 2 ? 'lg:border-r lg:pr-10' : ''
              } ${i % 3 !== 0 ? 'lg:pl-10' : ''} ${
                i % 2 !== 1 ? 'sm:border-r sm:pr-8 lg:border-r-0 lg:pr-0' : 'sm:pl-8 lg:pl-0'
              }`}
            >
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-phoenix-orange"
              />
              <span className="text-[15px] font-medium text-midnight-ink tracking-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-black/[0.06]">
          <div>
            <p className="text-[15px] font-semibold text-midnight-ink tracking-tight mb-1">
              Not sure if we can help?
            </p>
            <p className="text-[13px] text-muted-ash font-light">
              Our intake team is available now — no commitment required.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+17197338556"
              className="px-5 py-2.5 rounded-full border border-black/[0.1] text-[13px] font-medium text-midnight-ink cursor-pointer hover:bg-whisper-gray transition-colors duration-200 whitespace-nowrap"
            >
              Call Now
            </a>
            <Link
              href="/admissions"
              className="px-5 py-2.5 rounded-full bg-midnight-ink text-canvas-white text-[13px] font-medium cursor-pointer hover:bg-surface-charcoal transition-colors duration-200 whitespace-nowrap"
            >
              Free Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
