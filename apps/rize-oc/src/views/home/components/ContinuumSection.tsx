import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const levels = [
  {
    num: "01",
    icon: "ri-first-aid-kit-line",
    title: "Medical Detox",
    intensity: "Most Intensive",
    duration: "3–10 Days",
    schedule: "24/7 Medical Care",
    desc: "The foundation of recovery. Medically supervised stabilization in a safe, comfortable environment — prioritizing your wellbeing from the very first hour.",
    href: "/drug-alcohol-detox",
    style: "dark",        // ink background
    intensityBar: "w-full",
  },
  {
    num: "02",
    icon: "ri-home-heart-line",
    title: "Residential",
    intensity: "High Intensity",
    duration: "30–90 Days",
    schedule: "24/7 Structured Care",
    desc: "Deep, immersive healing in our coastal sanctuary. Stepping away from daily life to rewrite the neural pathways of habit, trauma, and identity.",
    href: "/levels-of-care",
    style: "warm",        // amber-warm tint
    intensityBar: "w-3/4",
  },
  {
    num: "03",
    icon: "ri-calendar-check-line",
    title: "PHP",
    intensity: "Moderate",
    duration: "2–4 Weeks",
    schedule: "6 Hrs Daily · 5–7 Days/Week",
    desc: "Robust daytime clinical programming that builds structure and resilience while allowing you to practice new skills in the real world each evening.",
    href: "/partial-hospitalization-program-orange-county",
    style: "cream",       // cream-alt background
    intensityBar: "w-1/2",
  },
  {
    num: "04",
    icon: "ri-leaf-line",
    title: "Outpatient (IOP/OP)",
    intensity: "Flexible",
    duration: "8–16 Weeks",
    schedule: "3–9 Hours Weekly",
    desc: "The gentle return. Flexible, targeted therapy that supports your integration back into career, family, and community life with sustained clinical backing.",
    href: "/iop-program-orange-county",
    style: "light",       // white with border
    intensityBar: "w-1/4",
  },
];

const bgMap: Record<string, string> = {
  dark:  "bg-ink",
  warm:  "bg-[#FDF6EE]",
  cream: "bg-cream-alt",
  light: "bg-white border border-warm/60",
};

const numColorMap: Record<string, string> = {
  dark:  "text-white/20",
  warm:  "text-accent/25",
  cream: "text-accent/20",
  light: "text-ink/15",
};

const titleColorMap: Record<string, string> = {
  dark:  "text-white",
  warm:  "text-ink",
  cream: "text-ink",
  light: "text-ink",
};

const descColorMap: Record<string, string> = {
  dark:  "text-white/60",
  warm:  "text-ink/65",
  cream: "text-ink/65",
  light: "text-ink/65",
};

const metaColorMap: Record<string, string> = {
  dark:  "text-white/40",
  warm:  "text-ink/40",
  cream: "text-ink/40",
  light: "text-ink/40",
};

const dividerMap: Record<string, string> = {
  dark:  "border-white/10",
  warm:  "border-ink/10",
  cream: "border-ink/10",
  light: "border-warm",
};

const ctaColorMap: Record<string, string> = {
  dark:  "text-accent hover:opacity-70",
  warm:  "text-ink hover:text-accent",
  cream: "text-ink hover:text-accent",
  light: "text-ink hover:text-accent",
};

const iconColorMap: Record<string, string> = {
  dark:  "text-accent/60",
  warm:  "text-accent",
  cream: "text-accent/70",
  light: "text-muted",
};

export default function ContinuumSection() {
  return (
    <section className="bg-white">
      <SectionWrapper>

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-8 mb-14">
          <div>
            <Eyebrow className="mb-4">Levels of Care</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(44px, 5vw, 64px)", lineHeight: 1.05 }}
            >
              The Continuum{" "}
              <em className="italic text-ink/55">Of Care</em>
            </h2>
          </div>
          <p className="text-base font-light leading-relaxed text-ink/60 max-w-sm">
            Recovery isn't a single destination — it's a journey. We walk alongside you at every stage, from stabilization to lasting independence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((lvl) => (
            <div
              key={lvl.title}
              className={`relative flex flex-col overflow-hidden ${bgMap[lvl.style]}`}
            >
              {/* Intensity bar — top */}
              <div className="h-1 w-full bg-black/5">
                <div className={`h-full bg-accent ${lvl.intensityBar}`} />
              </div>

              <div className="flex flex-col flex-1 p-8 lg:p-10 gap-6">
                {/* Number + Icon row */}
                <div className="flex items-start justify-between">
                  <span
                    className={`font-[family-name:var(--font-display)] italic leading-none select-none ${numColorMap[lvl.style]}`}
                    style={{ fontSize: "80px" }}
                  >
                    {lvl.num}
                  </span>
                  <i className={`${lvl.icon} text-2xl mt-1 ${iconColorMap[lvl.style]}`} />
                </div>

                {/* Title */}
                <h3
                  className={`font-[family-name:var(--font-display)] font-normal leading-tight ${titleColorMap[lvl.style]}`}
                  style={{ fontSize: "clamp(24px, 2.5vw, 30px)" }}
                >
                  {lvl.title}
                </h3>

                {/* Description */}
                <p className={`text-[15px] font-light leading-relaxed flex-1 ${descColorMap[lvl.style]}`}>
                  {lvl.desc}
                </p>

                {/* Meta + CTA */}
                <div className={`pt-6 border-t ${dividerMap[lvl.style]}`}>
                  <p className={`text-[11px] uppercase tracking-[0.15em] font-medium mb-1 ${metaColorMap[lvl.style]}`}>
                    {lvl.intensity}
                  </p>
                  <p className={`text-sm font-light mb-5 ${metaColorMap[lvl.style]}`}>
                    {lvl.duration} · {lvl.schedule}
                  </p>
                  <Link
                    href={lvl.href}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${ctaColorMap[lvl.style]} group`}
                  >
                    Learn More
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transform transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assessment CTA */}
        <div className="mt-6 bg-cream-alt px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl text-ink mb-1">
              Not sure which level is right for you?
            </p>
            <p className="text-sm font-light text-ink/60">
              Our admissions team will assess your situation and give you an honest recommendation — no pressure.
            </p>
          </div>
          <Link
            href="/verify-insurance"
            className="shrink-0 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:bg-ink/80 transition-colors"
          >
            <i className="ri-shield-check-line text-accent text-sm" />
            Free Assessment
          </Link>
        </div>

      </SectionWrapper>
    </section>
  );
}
