/**
 * About — upscaled with Northbound's key differentiators:
 * 38+ years, alumni staff, 1:1 ratio, InVivo® model, proven outcomes.
 */

const STATS = [
  { value: "38+", label: "Years Serving\nSouthern California", icon: "ri-history-line" },
  { value: "10,000+", label: "Lives\nTransformed", icon: "ri-heart-pulse-line" },
  { value: "1:1", label: "Staff-to-Client\nRatio", icon: "ri-user-heart-line" },
  { value: "97%+", label: "Abstinence Rate\n2015 Outcomes Study", icon: "ri-bar-chart-grouped-line" },
];

const DIFFERENTIATORS = [
  {
    icon: "ri-group-line",
    title: "Alumni-Led Team",
    body: "One third of our staff are alumni themselves — they've walked through the same door you're considering right now.",
  },
  {
    icon: "ri-flask-line",
    title: "InVivo® Model",
    body: "Clients practice real-world skills, stresses, and successes while still in treatment — for smoother transition and lasting recovery.",
  },
  {
    icon: "ri-award-line",
    title: "200+ Years of Expertise",
    body: "Our leadership team collectively brings more than 200 years of combined behavioral healthcare experience.",
  },
  {
    icon: "ri-heart-2-line",
    title: "Trauma-Informed Care",
    body: "We treat addiction at its root. Trauma-informed, dual-diagnosis capable, with full continuum from detox through aftercare.",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand py-24 lg:py-32">

      {/* Subtle background glows */}
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-0 h-72 w-72 rounded-full bg-terracotta/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-navy" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
                Our Story
              </p>
            </div>
            <h2 className="font-serif text-5xl leading-tight text-espresso lg:text-6xl">
              About Northbound
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-espresso/60 lg:text-right">
            Founded in 1988. Reborn with purpose in 2008. Trusted across
            Southern California for 38+ years.
          </p>
        </div>

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <div className="mb-16 grid grid-cols-2 border border-sand-dark lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className={`flex flex-col items-center justify-center gap-2 px-6 py-8 text-center ${
                i < STATS.length - 1 ? "border-b border-sand-dark lg:border-b-0 lg:border-r" : ""
              } ${i === 1 ? "border-r border-sand-dark lg:border-r" : ""}`}
            >
              <i className={`${stat.icon} text-xl text-terracotta`} />
              <p className="font-serif text-4xl font-bold text-navy">{stat.value}</p>
              <p className="whitespace-pre-line text-[10px] font-semibold uppercase leading-relaxed tracking-[0.15em] text-espresso/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Main two-column ───────────────────────────────────────────── */}
        <div className="mb-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — copy */}
          <div className="space-y-8">
            <div className="relative border-l-4 border-navy pl-8">
              <i className="ri-double-quotes-l absolute -left-1 -top-3 text-4xl text-navy/10" />
              <p className="text-lg font-light leading-relaxed text-espresso/80">
                One third of the Northbound Treatment Services® team are alumni
                themselves, so there is a real understanding of what someone
                walking through our doors for the first time is going through.
              </p>
            </div>

            <p className="font-light leading-relaxed text-espresso/70">
              Our evidence-based approach combines medical expertise with holistic
              healing — CBT, DBT, EMDR, yoga, art therapy, and psychiatry — creating
              individualized treatment plans that address the whole person: mind,
              body, and spirit. Every client is an active participant in their
              own care.
            </p>

            <div className="space-y-3 border-t border-sand-dark pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-espresso/40">
                Unique to Northbound
              </p>
              <div className="flex flex-wrap gap-2">
                {["InVivo® Model", "Collegebound®", "Careerbound®", "DHCS Licensed", "NAATP Member"].map((tag) => (
                  <span
                    key={tag}
                    className="border border-navy/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-navy"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-navy px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta"
            >
              Learn More About Us
              <i className="ri-arrow-right-line text-sm leading-none" />
            </a>
          </div>

          {/* Right — YouTube embed + floating credential card */}
          <div className="relative">
            <div className="architectural-border relative aspect-video overflow-hidden bg-espresso/5 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/C7v5X5WD8qg"
                title="Northbound Treatment Services"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* Floating credential strip below embed */}
            <div className="border border-sand-dark bg-white px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-espresso/60">
                  <i className="ri-shield-check-line text-sm text-navy" />
                  <span className="font-semibold">DHCS #300661CP</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-espresso/60">
                  <i className="ri-star-fill text-sm text-terracotta" />
                  <span className="font-semibold">4.6 / 5 · 224+ Google Reviews</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-espresso/60">
                  <i className="ri-building-2-line text-sm text-navy" />
                  <span className="font-semibold">Founded 1988</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Differentiator cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-px border border-sand-dark bg-sand-dark sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((d, i) => (
            <div
              key={d.title}
              className={`group flex flex-col gap-4 p-8 transition-colors duration-300 hover:bg-navy ${
                i % 2 === 0 ? "bg-white" : "bg-sand"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center border border-sand-dark bg-white text-navy transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                <i className={`${d.icon} text-lg leading-none`} />
              </span>
              <h3 className="font-serif text-lg text-espresso transition-colors duration-300 group-hover:text-white">
                {d.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-espresso/60 transition-colors duration-300 group-hover:text-white/70">
                {d.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
