/**
 * About — consolidated layout:
 *  1. Header (eyebrow + headline + supporting tagline)
 *  2. Two-column main: alumni pull-quote + body + program tags + CTA | YouTube
 *  3. Clean borderless stats strip at the bottom
 */

const STATS = [
  { value: "38+", label: "Years of Care" },
  { value: "10,000+", label: "Lives Transformed" },
  { value: "1:1", label: "Staff-to-Client Ratio" },
  { value: "97%+", label: "Abstinence Outcomes" },
];

const PROGRAM_TAGS = [
  "InVivo® Model",
  "Collegebound®",
  "Careerbound®",
  "DHCS Licensed",
  "NAATP Member",
];

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand py-24 lg:py-32">

      {/* Subtle background glows */}
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-0 h-72 w-72 rounded-full bg-terracotta/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[2px] w-12 bg-navy" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
              Our Story
            </p>
          </div>
          <h2 className="mb-5 font-serif text-5xl leading-tight text-espresso lg:text-6xl">
            About Northbound
          </h2>
          <p className="text-lg font-light leading-relaxed text-espresso/60">
            Founded in 1988. Reborn with purpose in 2008. Trusted across
            Southern California for 38+ years.
          </p>
        </div>

        {/* ── Main two-column ───────────────────────────────────────────── */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — alumni quote + body + tags + CTA */}
          <div className="space-y-7">
            <div className="relative border-l-4 border-navy pl-8">
              <i className="ri-double-quotes-l absolute -left-1 -top-3 text-4xl text-navy/10" />
              <p className="text-lg font-light leading-relaxed text-espresso/80">
                One third of the Northbound Treatment Services® team are alumni
                themselves, so there is a real understanding of what someone
                walking through our doors for the first time is going through.
              </p>
            </div>

            <p className="font-light leading-relaxed text-espresso/70">
              Our leadership team brings 200+ years of combined behavioral
              healthcare experience. Our trauma-informed, evidence-based approach
              combines medical expertise with holistic healing — CBT, DBT, EMDR,
              yoga, art therapy, and psychiatry — built around individualized
              plans that address the whole person.
            </p>

            <div className="flex flex-wrap gap-2">
              {PROGRAM_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="border border-navy/20 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-navy"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-navy px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta"
            >
              Learn More About Us
              <i className="ri-arrow-right-line text-sm leading-none" />
            </a>
          </div>

          {/* Right — YouTube embed */}
          <div className="architectural-border relative aspect-video overflow-hidden bg-espresso/5 shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/C7v5X5WD8qg"
              title="Northbound Treatment Services"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/* ── Stats strip ───────────────────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-sand-dark pt-10 lg:grid-cols-4 lg:gap-4">
          {STATS.map((stat) => (
            <div key={stat.value} className="text-center lg:text-left">
              <p className="font-serif text-4xl font-bold text-navy lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
