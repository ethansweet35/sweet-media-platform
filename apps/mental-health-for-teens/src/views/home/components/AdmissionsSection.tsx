import Image from 'next/image';
import Link from 'next/link';

const ADMISSIONS_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-admissions.png';

const steps = [
  {
    number: '01',
    color: 'bg-petal-pink',
    title: 'Free Consultation Call',
    description: 'Call or submit your information online. Our intake coordinator will reach out within hours to answer questions and gather basic information about your teen.',
  },
  {
    number: '02',
    color: 'bg-mint-green',
    title: 'Clinical Assessment',
    description: 'A licensed clinician conducts a comprehensive evaluation of your teen\'s mental health needs, history, and goals — typically within 24–48 hours.',
  },
  {
    number: '03',
    color: 'bg-subtle-lavender',
    title: 'Insurance Verification',
    description: 'We handle all insurance verification and pre-authorization. Our billing team explains your coverage and out-of-pocket costs before treatment begins.',
  },
  {
    number: '04',
    color: 'bg-canary-yellow',
    title: 'Personalized Treatment Plan',
    description: 'Based on the assessment, your clinical team creates a customized treatment plan — including which services, frequency, and therapeutic modalities are best suited.',
  },
  {
    number: '05',
    color: 'bg-petal-pink',
    title: 'Begin Treatment',
    description: 'Your teen starts their program, typically within the same week. Family orientation is included to help you support the process at home.',
  },
];

export default function AdmissionsSection() {
  return (
    <section className="w-full py-24 bg-canvas-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Steps */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-whisper-gray w-fit">
                <span className="text-[11px] font-medium text-muted-ash uppercase tracking-widest">Admissions Process</span>
              </div>
              <h2 className="text-[40px] font-bold text-midnight-ink leading-[1.1] tracking-tight">
                From first call to<br />first session in days
              </h2>
              <p className="text-[15px] text-muted-ash leading-[1.75] font-light">
                We've made the admissions process as simple and stress-free as possible. Most families are enrolled and starting treatment within 3–5 business days.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-4">
              {steps.map(({ number, color, title, description }, i) => (
                <div key={number} className="flex gap-4">
                  {/* Step number + connector */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[11px] font-bold text-midnight-ink">{number}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-black/[0.06] mt-2 mb-0 min-h-[20px]" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-5">
                    <h3 className="text-[14px] font-semibold text-midnight-ink tracking-tight mb-1">{title}</h3>
                    <p className="text-[13px] text-muted-ash leading-[1.65] font-light">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-midnight-ink text-canvas-white text-[13px] font-medium cursor-pointer hover:bg-surface-charcoal transition-colors duration-200"
                style={{ boxShadow: 'rgba(17, 17, 17, 0.04) 0px 1px 2px 0px, rgba(17, 17, 17, 0.04) 0px 4px 8px 0px' }}
              >
                Start the Process
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a
                href="tel:+17197338556"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-black/[0.08] text-midnight-ink text-[13px] font-medium cursor-pointer hover:bg-whisper-gray transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z"/></svg>
                Call to Talk Now
              </a>
            </div>
          </div>

          {/* Right: Image + trust card */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.08) 0px 24px 60px -10px' }}
            >
              <Image
                src={ADMISSIONS_IMG}
                alt="Welcoming mental health clinic reception area"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Same-Week Intake', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                )},
                { label: 'No Wait Lists', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                )},
                { label: '24/7 Support', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z"/></svg>
                )},
              ].map(({ label, icon }) => (
                <div key={label} className="bg-whisper-gray rounded-xl px-4 py-4 flex flex-col items-center gap-2 text-center">
                  <div className="text-midnight-ink">{icon}</div>
                  <span className="text-[11px] font-medium text-midnight-ink leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
