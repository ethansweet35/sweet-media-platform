import Link from 'next/link';

const pillars = [
  {
    number: '01',
    title: 'Trauma-Informed Care',
    desc: 'Every interaction is guided by deep compassion and an understanding of how trauma shapes the whole person — mind, body, and spirit.',
    color: '#C8795A',
  },
  {
    number: '02',
    title: 'Colorado Wilderness Roots',
    desc: 'Inspired by the healing power of Colorado\'s mountains and open skies, our programs integrate nature-based mindfulness and grounding practices.',
    color: '#DDA15E',
  },
  {
    number: '03',
    title: 'Women-Only Community',
    desc: 'A safe, affirming space built exclusively for women — where shared experience becomes a source of profound strength and connection.',
    color: '#8FA489',
  },
  {
    number: '04',
    title: 'Holistic Healing',
    desc: 'We treat the whole woman — integrating evidence-based therapy with yoga, nutrition, creative arts, and somatic healing practices.',
    color: '#C8795A',
  },
  {
    number: '05',
    title: 'Evidence-Based Methods',
    desc: 'Our clinical team uses proven modalities including CBT, DBT, EMDR, and motivational interviewing — adapted for women\'s unique needs.',
    color: '#DDA15E',
  },
  {
    number: '06',
    title: 'Virtual & Accessible',
    desc: 'Receive world-class care from the comfort of your home. Our virtual platform removes barriers so healing is available wherever you are.',
    color: '#8FA489',
  },
];

export default function PillarsSection() {
  return (
    <section className="w-full bg-[#2C3B2E] relative overflow-hidden py-24 px-8 md:px-16">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header — left-aligned, editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20 anim-fade-up anim-visible">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">What Makes Us Different</span>
            <h2
              className="font-serif text-[#FAF8F5] leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4vw, 56px)' }}
            >
              Rooted in Nature.<br />
              <em className="text-[#DDA15E] not-italic">Grounded in Science.</em>
            </h2>
          </div>
          <p className="text-[#F0ECE1]/55 font-light text-base leading-[1.9] lg:max-w-md">
            Six pillars that define our approach to women's healing — each one chosen with intention, each one proven to transform lives.
          </p>
        </div>

        {/* Pillars — horizontal rule list, editorial style */}
        <div className="flex flex-col divide-y divide-[#FAF8F5]/10">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`group grid grid-cols-[80px_1fr_1fr] md:grid-cols-[100px_1fr_1.4fr] items-center gap-6 md:gap-12 py-8 cursor-default anim-fade-up anim-delay-${Math.min(i + 1, 6)} anim-visible`}
            >
              {/* Large number */}
              <span
                className="font-serif font-bold leading-none select-none transition-colors duration-500 group-hover:opacity-100 opacity-30"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: pillar.color }}
              >
                {pillar.number}
              </span>

              {/* Title */}
              <h3 className="font-serif text-[#FAF8F5] leading-snug transition-colors duration-300 group-hover:text-[#DDA15E]" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#F0ECE1]/50 font-light leading-[1.85] group-hover:text-[#F0ECE1]/80 transition-colors duration-300 hidden sm:block">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex items-center gap-6">
          <Link
            href="/about"
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#FAF8F5] hover:text-[#2C3B2E] transition-all duration-300"
          >
            Our Approach
            <i className="ri-arrow-right-line"></i>
          </Link>
          <div className="w-px h-6 bg-[#FAF8F5]/20"></div>
          <span className="text-xs text-[#F0ECE1]/40 font-light uppercase tracking-widest">Est. 2012 · Denver, Colorado</span>
        </div>

      </div>
    </section>
  );
}
