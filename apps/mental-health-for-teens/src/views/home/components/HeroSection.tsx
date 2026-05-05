import Image from 'next/image';
import Link from 'next/link';

const HERO_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-hero.png';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Teens in a supportive mental health center"
          fill
          className="w-full h-full object-cover object-center"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-ink/80 via-midnight-ink/55 to-midnight-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-ink/30 via-transparent to-midnight-ink/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pt-36 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl flex flex-col gap-7">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 w-fit">
              <span className="w-6 h-px bg-canvas-white/50" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-canvas-white/70 font-medium">
                Teen Mental Health · Ages 12–18 · Colorado
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-canvas-white font-bold leading-[1.05]"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', letterSpacing: '-0.03em' }}
            >
              Your Teen Deserves<br />
              to{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ffd7f0 0%, #e2ddfd 50%, #99fff9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Thrive.
              </span>
            </h1>

            {/* Body */}
            <p className="text-canvas-white/70 text-[15px] leading-[1.75] max-w-lg font-light">
              Specialized outpatient mental health care designed for teenagers. Evidence-based therapy, compassionate clinicians, and a safe space for real healing.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-canvas-white text-midnight-ink text-[13px] font-medium cursor-pointer hover:bg-whisper-gray transition-colors duration-200"
                style={{ boxShadow: 'rgba(17, 17, 17, 0.04) 0px 1px 2px 0px, rgba(17, 17, 17, 0.04) 0px 4px 8px 0px' }}
              >
                Get Started Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a
                href="tel:+17197338556"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-canvas-white/25 text-canvas-white text-[13px] font-medium cursor-pointer hover:bg-canvas-white/10 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z"/></svg>
                (719) 733-8556
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 border-t border-canvas-white/10 mt-1">
              {[
                { label: 'Insurance Accepted' },
                { label: 'HIPAA Compliant' },
                { label: 'Free Initial Consultation' },
                { label: 'Same-Week Intake' },
              ].map(({ label }) => (
                <div key={label} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green flex-shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-[12px] text-canvas-white/55 font-light">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-midnight-ink/70 backdrop-blur-sm border-t border-canvas-white/8">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Teens Helped' },
            { value: '98%', label: 'Family Satisfaction' },
            { value: '12+', label: 'Years of Experience' },
            { value: '24/7', label: 'Crisis Support' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-canvas-white font-bold text-xl tracking-tight">{value}</span>
              <span className="text-canvas-white/45 text-[11px] tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
