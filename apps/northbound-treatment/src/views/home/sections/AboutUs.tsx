import { AutoLinkedText } from "@sweetmedia/blog-core";
/**
 * About — header + two-column (copy | video) + bottom stats strip.
 * Quote dropped; alumni point folded into the body copy.
 */

const STATS = [
  { value: "38+", label: "Years of Care" },
  { value: "10,000+", label: "Lives Transformed" },
  { value: "1:1", label: "Staff-to-Client Ratio" },
  { value: "97%+", label: "Abstinence Outcomes" },
];

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand py-24 lg:py-32">

      {/* Subtle background glows */}
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-0 h-72 w-72 rounded-full bg-terracotta/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-navy" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
              Our Story
            </p>
            <div className="h-[2px] w-12 bg-navy" />
          </div>
          <h2 className="mb-5 font-serif text-5xl leading-tight text-espresso lg:text-6xl">
            About Northbound
          </h2>
          <p className="text-lg font-light leading-relaxed text-espresso/60">
            <AutoLinkedText>{"Founded in 1988. Reborn with purpose in 2008. Trusted across\n            Southern California for 38+ years."}</AutoLinkedText>
          </p>
        </div>

        {/* ── Main two-column ───────────────────────────────────────────── */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — copy column */}
          <div className="flex flex-col items-start gap-6 lg:pr-6">
            <p className="text-lg font-light leading-relaxed text-espresso/80">
              Our leadership team brings <span className="font-medium text-navy">200+ years of combined behavioral healthcare experience</span> — and one third of our staff are alumni themselves, so when you walk through our door, you&apos;re met with people who have stood exactly where you stand.
            </p>
            <p className="font-light leading-relaxed text-espresso/70">
              <AutoLinkedText>{"Trauma-informed and evidence-based, we combine medical expertise\n              with holistic healing to create individualized plans that address the\n              whole person: mind, body, and spirit."}</AutoLinkedText>
            </p>
            <a
              href="/about"
              className="mt-2 inline-flex w-max items-center gap-2 bg-navy px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta"
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
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-sand-dark pt-10 text-center lg:grid-cols-4 lg:gap-4">
          {STATS.map((stat) => (
            <div key={stat.value}>
              <p className="font-serif text-4xl font-bold text-navy lg:text-5xl"><AutoLinkedText>{stat.value}</AutoLinkedText></p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso/50"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
