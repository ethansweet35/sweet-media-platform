'use client';
import { useInView } from '@/hooks/useInView';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Denver, CO',
    initials: 'SM',
    bg: '#8FA489',
    quote: 'Inner Peak gave me something I had never experienced before — a space where I felt truly seen as a woman. The virtual format meant I could heal from my own home, surrounded by my family, while still receiving the most profound clinical care of my life.',
    program: 'PHP Program',
  },
  {
    name: 'Rachel T.',
    location: 'Boulder, CO',
    initials: 'RT',
    bg: '#C8795A',
    quote: 'I was skeptical about virtual treatment. But the therapists here are extraordinary. The nature-based mindfulness practices they wove into every session helped me reconnect with myself in ways I didn\'t think were possible after years of addiction.',
    program: 'Residential Intensive',
  },
  {
    name: 'Amara J.',
    location: 'Fort Collins, CO',
    initials: 'AJ',
    bg: '#DDA15E',
    quote: 'The women-only environment was everything. I could be completely honest without fear. My therapist understood my trauma in a way no one ever had. Six months later, I am sober, present, and finally living the life I always deserved.',
    program: 'IOP Program',
  },
  {
    name: 'Lindsey K.',
    location: 'Colorado Springs, CO',
    initials: 'LK',
    bg: '#6B7D67',
    quote: 'From the first call, I felt like I mattered. The intake team was warm, patient, and never made me feel like a number. The EMDR therapy changed my relationship with my past. I am forever grateful for Inner Peak.',
    program: 'Outpatient Therapy',
  },
  {
    name: 'Priya N.',
    location: 'Aurora, CO',
    initials: 'PN',
    bg: '#8FA489',
    quote: 'As a mother of two, I needed care that fit my life. The IOP schedule was perfect — I could be present for my kids in the evenings while still doing the deep work I needed. Inner Peak made recovery feel possible, not impossible.',
    program: 'IOP Program',
  },
  {
    name: 'Cassandra W.',
    location: 'Pueblo, CO',
    initials: 'CW',
    bg: '#C8795A',
    quote: 'The holistic approach here is unlike anything I\'ve experienced. Yoga, journaling, group therapy, EMDR — all woven together into something that actually healed me. I came in broken and left with roots.',
    program: 'PHP Program',
  },
];

export default function TestimonialsSection() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>();
  const [gridRef, gridVisible] = useInView<HTMLDivElement>({ threshold: 0.05 });
  return (
    <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className={`flex flex-col gap-4 mb-14 anim-hidden anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-[#C8795A]/10 border border-[#C8795A]/20 rounded-full px-4 py-1.5 self-start">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8795A] font-medium">Real Stories</span>
          </div>
          <h2 className="font-serif text-[#2C3B2E] leading-[1.2]" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            Women Who Found<br />
            <em className="text-[#6B7D67]">Their Way Back.</em>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`break-inside-avoid bg-[#F0ECE1] rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-7 flex flex-col gap-5 anim-hidden anim-fade-up anim-delay-${Math.min(i + 1, 6)} ${gridVisible ? 'anim-visible' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#FAF8F5] text-sm font-medium flex-shrink-0"
                  style={{ backgroundColor: t.bg }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C3B2E]">{t.name}</p>
                  <p className="text-xs text-[#6B7D67] font-light">{t.location}</p>
                </div>
              </div>
              <p className="text-sm text-[#3A4A3C] font-light leading-[1.85] italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-[#2C3B2E]/10">
                <i className="ri-seedling-line text-[#8FA489] text-xs"></i>
                <span className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium">{t.program}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
