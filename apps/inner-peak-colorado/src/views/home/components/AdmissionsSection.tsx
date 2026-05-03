'use client';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const steps = [
  {
    number: '01',
    title: 'Free Consultation Call',
    desc: 'Reach out by phone, text, or form. A compassionate intake specialist will listen to your story — no pressure, no judgment, just care.',
    icon: 'ri-phone-line',
    color: '#C8795A',
  },
  {
    number: '02',
    title: 'Clinical Assessment',
    desc: 'A licensed clinician conducts a thorough, confidential assessment to understand your history, needs, and goals — and recommends the right level of care.',
    icon: 'ri-stethoscope-line',
    color: '#6B7D67',
  },
  {
    number: '03',
    title: 'Insurance & Benefits Review',
    desc: 'Our admissions team verifies your insurance benefits and walks you through your coverage — so there are no surprises before you begin.',
    icon: 'ri-bank-card-line',
    color: '#DDA15E',
  },
  {
    number: '04',
    title: 'Personalized Treatment Plan',
    desc: 'Your clinical team designs a treatment plan built around your unique needs, goals, and schedule — before your very first session.',
    icon: 'ri-file-list-3-line',
    color: '#8FA489',
  },
  {
    number: '05',
    title: 'Begin Your Healing',
    desc: 'You\'re welcomed into your program with warmth and intention. Most women begin within 24–72 hours of their initial call.',
    icon: 'ri-seedling-line',
    color: '#C8795A',
  },
];

export default function AdmissionsSection() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>();
  const [stepsRef, stepsVisible] = useInView<HTMLDivElement>();
  const [ctaRef, ctaVisible] = useInView<HTMLDivElement>();
  return (
    <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16 anim-hidden anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8795A] font-medium">Admissions Process</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
              From your first call<br />
              to your first session —<br />
              <em className="text-[#6B7D67] not-italic">we walk with you.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.9]">
              We've designed our admissions process to be as gentle and straightforward as possible. You focus on being ready — we'll handle everything else.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8FA489]"></div>
              <span className="text-sm text-[#3A4A3C]/60 font-light">Most women begin treatment within 24–72 hours</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F0ECE1] to-transparent" style={{ top: '40px' }}></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className={`relative flex flex-col gap-5 anim-hidden anim-fade-up anim-delay-${i + 1} ${stepsVisible ? 'anim-visible' : ''}`}>
                {/* Number circle */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center bg-[#F0ECE1] relative z-10 flex-shrink-0"
                >
                  <span className="font-serif text-2xl font-bold" style={{ color: step.color }}>{step.number}</span>
                </div>

                {/* Icon + content */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <i className={`${step.icon} text-sm`} style={{ color: step.color }}></i>
                    </div>
                    <h3 className="font-serif text-[#2C3B2E] text-base leading-snug">{step.title}</h3>
                  </div>
                  <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.8]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div ref={ctaRef} className={`mt-14 bg-[#2C3B2E] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 anim-hidden anim-scale ${ctaVisible ? 'anim-visible' : ''}`}>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-[#FAF8F5] text-lg">Ready to take the first step?</p>
            <p className="text-sm text-[#F0ECE1]/55 font-light">Our intake team is available right now — call, text, or fill out our form.</p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300 flex-shrink-0"
          >
            Start Admissions
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}
