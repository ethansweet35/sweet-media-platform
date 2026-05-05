import Link from 'next/link';

const conditions = [
  { label: 'Anxiety & Panic Disorders', color: 'bg-petal-pink', accent: 'text-leadgen-red' },
  { label: 'Depression', color: 'bg-subtle-lavender', accent: 'text-midnight-violet' },
  { label: 'Trauma & PTSD', color: 'bg-canary-yellow', accent: 'text-engagement-gold' },
  { label: 'ADHD', color: 'bg-mint-green', accent: 'text-deliver-green' },
  { label: 'Eating Disorders', color: 'bg-petal-pink', accent: 'text-leadgen-red' },
  { label: 'OCD', color: 'bg-subtle-lavender', accent: 'text-midnight-violet' },
  { label: 'Self-Harm', color: 'bg-canary-yellow', accent: 'text-engagement-gold' },
  { label: 'Suicidal Ideation', color: 'bg-mint-green', accent: 'text-deliver-green' },
  { label: 'Substance Use', color: 'bg-petal-pink', accent: 'text-leadgen-red' },
  { label: 'Bipolar Disorder', color: 'bg-subtle-lavender', accent: 'text-midnight-violet' },
  { label: 'Social Anxiety', color: 'bg-canary-yellow', accent: 'text-engagement-gold' },
  { label: 'Academic Stress', color: 'bg-mint-green', accent: 'text-deliver-green' },
];

export default function WhatWeTreatSection() {
  return (
    <section className="w-full py-24 bg-canvas-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-whisper-gray w-fit">
              <span className="text-[11px] font-medium text-muted-ash uppercase tracking-widest">What We Treat</span>
            </div>
            <h2 className="text-[40px] font-bold text-midnight-ink leading-[1.1] tracking-tight">
              We treat the full spectrum<br />of teen mental health
            </h2>
          </div>
          <p className="text-[15px] text-muted-ash leading-[1.75] font-light max-w-sm lg:text-right">
            Our clinicians are experienced across a broad range of adolescent conditions. If you don't see your teen's challenge listed, reach out — we likely can help.
          </p>
        </div>

        {/* Conditions grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {conditions.map(({ label, color }) => (
            <div
              key={label}
              className={`${color} rounded-xl px-5 py-4 flex items-center gap-3`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
              <span className="text-[13px] font-medium text-midnight-ink leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="bg-whisper-gray rounded-xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ boxShadow: 'rgba(17, 17, 17, 0.05) 0px 0px 0px 1px inset' }}
        >
          <div>
            <p className="text-[15px] font-semibold text-midnight-ink tracking-tight">Not sure if we can help?</p>
            <p className="text-[13px] text-muted-ash mt-0.5 font-light">Our intake team is available now to answer your questions — no commitment required.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+17197338556"
              className="px-5 py-2.5 rounded-lg border border-midnight-ink/10 text-[13px] font-medium text-midnight-ink cursor-pointer hover:bg-canvas-white transition-colors duration-200 whitespace-nowrap"
            >
              Call (719) 733-8556
            </a>
            <Link
              href="/admissions"
              className="px-5 py-2.5 rounded-lg bg-midnight-ink text-canvas-white text-[13px] font-medium cursor-pointer hover:bg-surface-charcoal transition-colors duration-200 whitespace-nowrap"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.04) 0px 1px 2px 0px, rgba(17, 17, 17, 0.04) 0px 4px 8px 0px' }}
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
