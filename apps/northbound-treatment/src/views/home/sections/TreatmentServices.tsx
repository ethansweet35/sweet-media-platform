/**
 * Treatment Services — 6 program cards in a 3-col grid on desktop. Sand bg
 * with a giant ghost number behind each card and a terracotta bottom-bar
 * reveal on hover. Per Figma TreatmentServices.tsx.
 */
const SERVICES = [
  {
    number: "01",
    badge: "Initial Stabilization",
    title: "Drug & Alcohol Detox",
    description:
      "The vital first step toward recovery. We prioritize your physical comfort, safety, and dignity during the withdrawal process with round-the-clock medical supervision.",
    features: [
      "24/7 Medical Monitoring & Support",
      "Medication-Assisted Treatment (MAT)",
      "Luxury, comfort-focused private amenities",
    ],
  },
  {
    number: "02",
    badge: "Immersive Care",
    title: "Residential Treatment",
    description:
      "A structured, home-like sanctuary where clients live on-site and focus entirely on healing, free from the triggers and chaos of the outside world.",
    features: [
      "Intensive individual & group therapy",
      "Deep trauma resolution (EMDR, CBT)",
      "Access to holistic Signature Services",
    ],
  },
  {
    number: "03",
    badge: "Day Treatment",
    title: "Partial Hospitalization (PHP)",
    description:
      "Robust daytime clinical programming providing structure and deep therapeutic work while allowing you to return to sober living at night.",
    features: [
      "5-6 days per week of clinical support",
      "Practicing coping skills in real-time",
      "Integration with our Sober Living homes",
    ],
  },
  {
    number: "04",
    badge: "Flexible Support",
    title: "Intensive Outpatient (IOP)",
    description:
      "Continued, structured support designed to integrate with your daily life as you transition back into work, school, and independence.",
    features: [
      "3-5 days per week (day or evening)",
      "Strong focus on relapse prevention",
      "Lifelong Alumni program access",
    ],
  },
  {
    number: "05",
    badge: "Transitional Living",
    title: "Sober Living",
    description:
      "A supportive, substance-free living environment that allows clients to ease back into their daily responsibilities while remaining connected to a strong recovery community.",
    features: [
      "Structured, accountable environment",
      "Peer support and community building",
      "Seamless integration with IOP programs",
    ],
  },
  {
    number: "06",
    badge: "Long-Term Success",
    title: "Aftercare Support",
    description:
      "Recovery is a lifelong journey. Our comprehensive aftercare and alumni programs provide a continuous support system to help you maintain long-term health and sobriety.",
    features: [
      "Ongoing alumni events and groups",
      "Relapse prevention planning",
      "Continued access to recovery resources",
    ],
  },
] as const;

export default function TreatmentServices() {
  return (
    <section className="architectural-border-top relative overflow-hidden bg-sand py-24">
      <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 bg-terracotta/5 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-10 left-0 h-80 w-80 bg-navy/10 blur-3xl"></div>
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(#2C2416 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 border-b border-navy/20 pb-8 md:flex-row">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-[2px] w-10 bg-navy"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-navy">
                Our Programs
              </span>
            </div>
            <h2 className="font-serif text-4xl text-espresso lg:text-5xl">
              Core Treatment Services
            </h2>
          </div>
          <a
            href="tel:8663110003"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-navy transition-all hover:gap-3 hover:text-terracotta"
          >
            Discuss Options
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="architectural-border group relative flex flex-col overflow-hidden bg-sand-light p-10 transition-all duration-500 hover:-translate-y-2 hover:border-terracotta/40 hover:shadow-2xl lg:p-12"
            >
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-terracotta/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-terracotta/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="pointer-events-none absolute right-4 top-4 font-serif text-7xl text-sand-dark opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:text-terracotta/10">
                {service.number}
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terracotta/0 via-terracotta/0 to-terracotta/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

              <span className="mb-6 inline-block border border-navy/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy/5">
                {service.badge}
              </span>

              <h3 className="relative z-10 mb-4 font-serif text-2xl text-espresso transition-colors duration-300 group-hover:text-terracotta lg:text-3xl">
                {service.title}
              </h3>
              <p className="relative z-10 mb-6 min-h-[60px] text-sm font-light leading-relaxed text-espresso/70">
                {service.description}
              </p>

              <ul className="relative z-10 mb-10 space-y-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm font-light text-espresso/80"
                  >
                    <i className="ri-check-line mt-0.5 flex-shrink-0 text-base leading-none text-terracotta transition-transform duration-300 group-hover:scale-110"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-auto border-t border-sand-dark pt-6 transition-colors duration-500 group-hover:border-terracotta/30">
                <a
                  href="#"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-terracotta transition-all duration-300 group-hover:gap-4"
                >
                  Explore {service.title.split(" ").slice(0, 2).join(" ")}
                  <span className="inline-block text-lg transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>

              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-terracotta to-terracotta-light transition-all duration-700 ease-out group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
