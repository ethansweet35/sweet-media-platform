'use client';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const modalities = [
  {
    name: 'EMDR Therapy',
    tag: 'Trauma',
    desc: 'Bilateral stimulation techniques that help the brain reprocess painful memories — reducing their emotional charge and allowing genuine healing.',
    color: '#C8795A',
    icon: 'ri-eye-line',
  },
  {
    name: 'Cognitive Behavioral Therapy',
    tag: 'Evidence-Based',
    desc: 'The gold standard of psychotherapy — identifying and transforming the thought patterns that maintain depression, anxiety, and addiction.',
    color: '#6B7D67',
    icon: 'ri-brain-line',
  },
  {
    name: 'Dialectical Behavior Therapy',
    tag: 'Skills-Based',
    desc: 'Four core skill sets — mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness — that transform how women navigate life.',
    color: '#DDA15E',
    icon: 'ri-scales-3-line',
  },
  {
    name: 'Somatic Experiencing',
    tag: 'Body-Based',
    desc: 'Trauma lives in the body. Somatic work helps women release stored trauma energy and restore the nervous system\'s natural capacity for regulation.',
    color: '#8FA489',
    icon: 'ri-mental-health-line',
  },
];

export default function TherapySection() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>();
  const [cardsRef, cardsVisible] = useInView<HTMLDivElement>();
  return (
    <section className="w-full bg-[#2C3B2E] relative overflow-hidden py-24 px-8 md:px-16">
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16 anim-hidden anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Therapy</span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
              Healing modalities chosen<br />
              with intention, delivered<br />
              <em className="text-[#DDA15E] not-italic">with soul.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[#F0ECE1]/60 font-light text-base leading-[1.9]">
              Every therapy we offer has been carefully selected for its proven effectiveness with women — and woven into a holistic, integrated treatment experience that honors the whole person.
            </p>
            <Link
              href="/therapy"
              className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#FAF8F5]/40 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#FAF8F5] hover:text-[#2C3B2E] transition-all duration-300"
            >
              All Therapies
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>

        {/* Modality Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modalities.map((m, i) => (
            <div key={i} className={`bg-[#FAF8F5]/6 border border-[#FAF8F5]/10 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-7 flex flex-col gap-5 anim-hidden anim-fade-up anim-delay-${i + 1} ${cardsVisible ? 'anim-visible' : ''}`}>
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: `${m.color}22` }}
                >
                  <i className={`${m.icon} text-lg`} style={{ color: m.color }}></i>
                </div>
                <span
                  className="text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${m.color}18`, color: m.color }}
                >
                  {m.tag}
                </span>
              </div>
              <h3 className="font-serif text-[#FAF8F5] text-lg leading-snug">{m.name}</h3>
              <p className="text-sm text-[#F0ECE1]/55 font-light leading-[1.8]">{m.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
