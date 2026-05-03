'use client';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const steps = [
  { num: '01', icon: 'ri-phone-line', color: '#C8795A', title: 'Free Consultation', desc: 'A compassionate intake specialist listens to your story — no pressure, no judgment.' },
  { num: '02', icon: 'ri-stethoscope-line', color: '#6B7D67', title: 'Clinical Assessment', desc: 'A licensed clinician evaluates your needs and recommends the right track for you.' },
  { num: '03', icon: 'ri-shield-check-line', color: '#DDA15E', title: 'Insurance Verified', desc: 'We verify your benefits and walk you through your coverage — completely free.' },
  { num: '04', icon: 'ri-heart-line', color: '#8FA489', title: 'Begin Within 72 Hours', desc: 'Log in from anywhere in Colorado. Your healing starts now.' },
];

export default function AdmissionsPreviewSection() {
  const [leftRef, leftVisible] = useInView<HTMLDivElement>();
  const [rightRef, rightVisible] = useInView<HTMLDivElement>();
  return (
    <section className="w-full bg-[#F0ECE1] py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: heading + CTA */}
          <div ref={leftRef} className={`flex flex-col gap-6 anim-hidden anim-fade-right ${leftVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8795A] font-medium">Getting Started</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              From first call to<br />
              first session in<br />
              <em className="text-[#C8795A]">72 hours.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base leading-[1.9] max-w-sm">
              Our admissions process is designed to be as gentle and straightforward as possible. One call is all it takes — our team handles everything else.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/admissions"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300"
              >
                Start Admissions
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:+17197338556"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2C3B2E] text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
              >
                <i className="ri-phone-line"></i>
                719-733-8556
              </a>
            </div>
            <div className="flex flex-wrap gap-5 pt-2">
              {[
                { icon: 'ri-shield-check-line', label: 'HIPAA Secure' },
                { icon: 'ri-time-line', label: '24/7 Intake' },
                { icon: 'ri-map-pin-line', label: 'Colorado Only' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-[#3A4A3C]/50">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${b.icon} text-xs text-[#6B7D67]`}></i>
                  </div>
                  <span className="text-xs font-light">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: step cards */}
          <div ref={rightRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((s, i) => (
              <div key={i} className={`bg-[#FAF8F5] rounded-2xl p-6 flex flex-col gap-4 anim-hidden anim-fade-up anim-delay-${i + 1} ${rightVisible ? 'anim-visible' : ''}`}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${s.color}18` }}
                  >
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }}></i>
                  </div>
                  <span className="font-serif font-bold text-2xl opacity-20" style={{ color: s.color }}>{s.num}</span>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-base">{s.title}</h3>
                <p className="text-xs text-[#3A4A3C]/55 font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
