import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const levels = [
  {
    num: "1.",
    icon: "ri-first-aid-kit-line",
    title: "Medical Detox",
    intensityLabel: "Most Intensive",
    duration: "3-10 Days",
    desc: "The foundation. A highly supervised, medically assisted period of physical stabilization. Prioritizing your comfort and safety above all.",
    time: "24/7 Medical Care",
    accent: true,
    href: "/medical-detox",
  },
  {
    num: "2.",
    icon: "ri-home-2-line",
    title: "Residential (RTC)",
    intensityLabel: "High Intensive",
    duration: "30-90 Days",
    desc: "Deep, immersive therapy in our coastal sanctuary. Stepping away from daily life to rewrite the neural pathways of habit and trauma.",
    time: "24/7 Structured Care",
    accent: true,
    href: "/residential-treatment",
  },
  {
    num: "3.",
    icon: "ri-home-2-line",
    title: "PHP",
    intensityLabel: "Medium Intensive",
    duration: "2-4 Weeks",
    desc: "Robust daytime clinical programming providing structure and support, while allowing you to practice emotional regulation in the evenings.",
    time: "6 Hours Daily, 5-7 Days/Week",
    accent: false,
    href: "/partial-hospitalization-program",
  },
  {
    num: "4.",
    icon: "ri-home-2-line",
    title: "IOP",
    intensityLabel: "Least Intensive",
    duration: "8-12 Weeks",
    desc: "The gentle return. Flexible, targeted therapeutic check-ins that support your integration back into career, family, and community.",
    time: "3-9 Hours Weekly",
    accent: false,
    href: "/intensive-outpatient-program",
  },
];

export default function ContinuumSection() {
  return (
    <section className="bg-warm/40">
      <SectionWrapper>
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <Eyebrow className="mb-4">Levels of Care</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(40px,4vw,60px)] font-normal text-ink leading-[1.05]">
              The Continuum Of Care
            </h2>
            <p className="mt-4 text-[15px] font-light text-ink/65 max-w-sm">
              <AutoLinkedText>{"Moving at the speed of your healing, from profound rest to revitalized independence."}</AutoLinkedText>
            </p>
          </div>

          {/* Intensity legend */}
          <div className="flex items-center gap-4 text-sm text-ink/65">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent inline-block" />
              Higher Intensity
            </span>
            <span className="text-ink/30">→</span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-muted inline-block" />
              Lower Intensity
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((lvl) => (
            <div key={lvl.title} className="bg-white border border-warm p-7 flex flex-col">
              {/* Top row: number + icon */}
              <div className="flex items-start justify-between mb-5">
                <span className="font-[family-name:var(--font-display)] text-[72px] italic font-normal leading-none text-ink/15">
                  {lvl.num}
                </span>
                <IconCircle
                  icon={lvl.icon}
                  variant={lvl.accent ? "accent-subtle" : "muted-subtle"}
                  size="sm"
                  className="mt-1"
                />
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-ink leading-snug mb-4">
                {lvl.title}
              </h3>

              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-sm ${lvl.accent ? "bg-accent/10 text-accent" : "bg-muted/10 text-muted"}`}>
                  {lvl.intensityLabel}
                </span>
                <span className="text-[10px] font-medium px-2.5 py-1 rounded-sm bg-ink text-white">
                  {lvl.duration}
                </span>
              </div>

              <p className="text-sm font-light leading-relaxed text-ink/60 flex-1"><AutoLinkedText>{lvl.desc}</AutoLinkedText></p>

              <div className="mt-8 pt-5 border-t border-warm">
                <p className="text-xs font-light text-ink/50 mb-4">
                  <span className="font-medium text-ink">Time Commitment:</span> {lvl.time}
                </p>
                <a
                  href={lvl.href}
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  Learn More <i className="ri-arrow-right-line" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Callout box */}
        <div className="mt-6 border border-warm bg-white px-8 py-5 text-center">
          <p className="text-sm font-light text-ink/70">
            <span className="font-medium text-ink">Not sure which level is right for you?</span>{" "}
            Our admissions team will conduct a comprehensive assessment to determine the most appropriate level of care based on your unique needs, history, and circumstances.
          </p>
        </div>
      </SectionWrapper>
    </section>
  );
}
