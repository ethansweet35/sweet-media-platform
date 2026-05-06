import Image from 'next/image';
import Link from 'next/link';

const ADMISSIONS_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-admissions.png';

const steps = [
  {
    num: '01',
    title: 'Free Consultation Call',
    description:
      'Call or submit your information online. Our intake coordinator reaches out within hours — no commitment required.',
  },
  {
    num: '02',
    title: 'Clinical Assessment',
    description:
      'A licensed clinician evaluates your teen\'s needs, history, and goals. Typically completed within 24–48 hours.',
  },
  {
    num: '03',
    title: 'Begin Treatment',
    description:
      'We handle insurance verification and build a personalized care plan. Most teens start their first session within the same week.',
  },
];

export default function AdmissionsSection() {
  return (
    <section className="w-full py-24 md:py-28 bg-canvas-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* Left: steps */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-ash font-medium">
                Admissions
              </span>
              <h2
                className="text-midnight-ink font-black leading-[1.0]"
                style={{ fontSize: 'clamp(38px, 4.5vw, 60px)', letterSpacing: '-0.03em' }}
              >
                From first call to
                <br />
                first session in days.
              </h2>
              <p className="text-[15px] text-muted-ash font-light leading-[1.8] max-w-md">
                We've designed the admissions process to be as clear and stress-free as possible.
                Most families are enrolled and starting within 3–5 business days.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-0 border-t border-black/[0.06]">
              {steps.map(({ num, title, description }, i) => (
                <div
                  key={num}
                  className="flex items-start gap-6 py-7 border-b border-black/[0.06]"
                >
                  <span
                    className="flex-shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted-ash font-medium pt-0.5"
                    style={{ minWidth: '28px' }}
                  >
                    {num}
                  </span>
                  <div>
                    <h3
                      className="text-midnight-ink font-bold mb-1.5 tracking-tight"
                      style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
                    >
                      {title}
                    </h3>
                    <p className="text-[13px] text-muted-ash font-light leading-[1.7]">{description}</p>
                  </div>
                  {i === 0 && (
                    <span className="flex-shrink-0 ml-auto text-[11px] uppercase tracking-[0.15em] text-phoenix-orange font-medium pt-0.5">
                      Start here
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-midnight-ink text-canvas-white text-[13px] font-semibold tracking-tight cursor-pointer hover:bg-surface-charcoal transition-colors duration-200 whitespace-nowrap"
              >
                Start the Process
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <a
                href="tel:+17197338556"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/[0.1] text-midnight-ink text-[13px] font-medium cursor-pointer hover:bg-whisper-gray transition-colors duration-200 whitespace-nowrap"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z" /></svg>
                Call to Talk Now
              </a>
            </div>
          </div>

          {/* Right: image + trust cards */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-black/[0.05]">
              <Image
                src={ADMISSIONS_IMG}
                alt="Welcoming clinical reception space"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Same-Week Intake' },
                { label: 'No Waitlists' },
                { label: '24/7 Support' },
              ].map(({ label }) => (
                <div
                  key={label}
                  className="bg-whisper-gray rounded-xl px-4 py-4 flex flex-col items-center gap-2 text-center border border-black/[0.05]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-phoenix-orange" />
                  <span className="text-[11px] font-semibold text-midnight-ink leading-tight tracking-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
