import { SITE } from "@/lib/site";

const STEPS = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Call Us Anytime",
    body: "Speak confidentially with our admissions team — available 24 hours a day, 7 days a week. No judgment, just compassionate guidance.",
  },
  {
    num: "02",
    icon: "ri-shield-check-line",
    title: "Verify Insurance",
    body: "We work with most major PPO insurers. Our team contacts your provider directly and walks you through your exact coverage — no surprises.",
  },
  {
    num: "03",
    icon: "ri-heart-pulse-line",
    title: "Begin Treatment",
    body: "Same-day intake is often available. We coordinate your clinical assessment, build your treatment plan, and support your first day from start to finish.",
  },
];

const INSURERS = ["Cigna", "Aetna", "United Health", "Anthem", "Regence", "Premera", "+ More"];

export default function LpAdmissions() {
  return (
    <section id="admissions" className="bg-[var(--mvt-ink)] relative overflow-hidden">
      {/* Cascade mountain silhouette */}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-[0.08]"
      >
        {/* Distant range — soft, hazy */}
        <path
          d="M0,400 L0,280 C80,280 100,230 160,220 C220,210 230,250 290,245 C350,240 380,190 450,175 C520,160 540,210 610,205 C680,200 700,170 770,155 C840,140 870,185 940,180 C1010,175 1040,145 1110,135 C1180,125 1210,165 1280,160 C1350,155 1390,175 1440,170 L1440,400 Z"
          fill="white"
          opacity="0.35"
        />
        {/* Mid range — defined peaks */}
        <path
          d="M0,400 L0,330 C60,330 90,295 130,270 C155,255 165,275 200,268 C240,260 260,230 310,210 C345,197 358,218 390,212 C430,204 455,175 510,158 C550,146 565,168 600,162 C640,154 665,128 720,112 C758,100 772,122 808,116 C848,108 875,82 930,70 C968,62 982,84 1018,78 C1058,70 1085,48 1140,38 C1178,30 1192,52 1228,48 C1268,42 1295,22 1350,16 C1388,11 1420,30 1440,26 L1440,400 Z"
          fill="white"
          opacity="0.55"
        />
        {/* Front range — sharp Cascade silhouette */}
        <path
          d="M0,400 L0,370 C40,370 55,350 80,335 C105,320 118,340 145,332 C175,323 195,300 230,282 C258,267 272,285 300,278 C332,269 352,248 390,232 C418,220 432,238 460,232 C492,224 512,205 548,190 C572,180 584,196 610,190 C638,183 658,165 692,152 C714,143 725,158 750,153 C776,146 796,130 828,118 C848,110 858,124 882,118 C908,111 928,96 960,84 C980,76 990,90 1014,85 C1040,78 1060,64 1092,54 C1112,47 1122,60 1146,55 C1172,49 1192,36 1224,28 C1244,22 1254,34 1278,30 C1304,24 1326,14 1358,8 C1378,4 1408,14 1440,10 L1440,400 Z"
          fill="white"
        />
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-24">

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-end mb-14">
          <div>
            <p className="mvt-eyebrow-light mb-5">3-Step Admission Process</p>
            <h2
              className="font-heading font-light text-white leading-[1.05]"
              style={{ fontSize: "clamp(32px, 3.8vw, 50px)" }}
            >
              Getting Started Is<br />
              <em className="italic text-white/40">Easier Than You Think</em>
            </h2>
          </div>
          <p className="text-[14px] font-light leading-relaxed text-white/50">
            We accept most private insurance including Cigna, Aetna, United Health, Anthem, Regence, and Premera. Our team handles the complexity so you can focus on healing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-px bg-white/10 mb-12">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-[var(--mvt-ink)] hover:bg-white/5 transition-colors duration-300 p-8 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center bg-[var(--mvt-forest)]/30 border border-[var(--mvt-forest)]/40 text-[var(--mvt-teal-light)]">
                  <i className={`${step.icon} text-lg`} aria-hidden="true" />
                </span>
                <span className="font-heading text-5xl font-light text-white/[0.06] leading-none select-none">
                  {step.num}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-light text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[13.5px] font-light leading-relaxed text-white/50">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA + insurer strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <a
            href={SITE.phone.href}
            className="inline-flex items-center gap-2.5 bg-[var(--mvt-forest)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:opacity-90 transition-opacity shrink-0"
          >
            <i className="ri-phone-fill" aria-hidden="true" />
            Call Now — {SITE.phone.display}
          </a>
          <div className="flex flex-wrap items-center gap-3">
            {INSURERS.map((ins) => (
              <span key={ins} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
                {ins}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
