import Image from 'next/image';
import Link from 'next/link';

const HERO_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft_hero01.jpg';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-canvas-white overflow-hidden">

      {/* Mobile-only: image banner above text */}
      <div
        className="lg:hidden relative w-full mt-[64px] overflow-hidden"
        style={{ height: '55vw', maxHeight: '360px', minHeight: '200px' }}
      >
        <div className="absolute inset-0 ambient-gradient" />
        <Image
          src={HERO_IMG}
          alt="Teen writing in a journal in a calm, natural-light setting"
          fill
          className="object-cover object-top"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
        />
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] lg:items-center lg:min-h-screen gap-0">

          {/* ── LEFT: Typography ── */}
          <div className="flex flex-col pt-10 pb-16 lg:pt-[140px] lg:pb-28 lg:pr-16">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-6 h-px bg-phoenix-orange flex-shrink-0" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-ash font-medium select-none">
                Colorado · Ages 12–18 · Outpatient
              </span>
            </div>

            {/* H1 */}
            <h1
              className="text-midnight-ink font-black leading-[1.0] mb-7"
              style={{ fontSize: 'clamp(48px, 5.8vw, 80px)', letterSpacing: '-0.04em' }}
            >
              Your teen deserves
              <br />
              <span className="text-phoenix-orange">real</span>
              {' '}mental health care.
            </h1>

            {/* Body */}
            <p className="text-[16px] text-muted-ash font-light leading-[1.75] max-w-[480px] mb-9">
              Specialized outpatient programs for teenagers ages 12–18 — individual therapy, group therapy,
              IOP, and family support. Built for teens, not adults.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-midnight-ink text-canvas-white text-[13px] font-semibold tracking-tight cursor-pointer hover:bg-surface-charcoal transition-colors duration-200 whitespace-nowrap"
              >
                Free Consultation
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <a
                href="tel:+17197338556"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/[0.1] text-midnight-ink text-[13px] font-medium cursor-pointer hover:bg-whisper-gray transition-colors duration-200 whitespace-nowrap"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z" /></svg>
                (719) 733-8556
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-7 gap-y-2.5 pt-8 border-t border-black/[0.06]">
              {[
                'Insurance Accepted',
                'Free Consultation',
                'Same-Week Intake',
                'HIPAA Compliant',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8400d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[12px] text-muted-ash font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image panel (desktop only) ── */}
          <div className="hidden lg:flex flex-col justify-center py-12 pl-6">
            {/* Ambient gradient outer frame */}
            <div className="relative rounded-3xl overflow-hidden p-2.5 ambient-gradient">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden" style={{ height: '580px' }}>
                <Image
                  src={HERO_IMG}
                  alt="Teen writing in a journal in a calm, natural-light setting"
                  fill
                  className="object-cover object-top"
                  priority
                  fetchPriority="high"
                  sizes="460px"
                  quality={85}
                />
              </div>

              {/* Floating stat card */}
              <div className="absolute bottom-7 left-6 right-6 glass-luxe rounded-xl px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-midnight-ink font-black leading-none mb-0.5"
                    style={{ fontSize: '26px', letterSpacing: '-0.04em' }}
                  >
                    500+
                  </p>
                  <p className="text-[11px] text-muted-ash font-light">Teens helped in Colorado</p>
                </div>
                <div className="w-px h-8 bg-black/[0.08] flex-shrink-0" />
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex items-center justify-end gap-1.5 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-deliver-green flex-shrink-0" />
                    <span className="text-[12px] font-medium text-midnight-ink">Now Accepting</span>
                  </div>
                  <p className="text-[11px] text-muted-ash font-light">Same-week intake</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-black/[0.06]" />
    </section>
  );
}
