/**
 * Espresso-bg scrolling marquee of in-network insurers. The keyframe is
 * defined in globals.css (.animate-scroll). The marquee row is duplicated so
 * it loops seamlessly. Per Figma InsuranceMarquee.tsx.
 */
const INSURERS = [
  "Aetna",
  "Anthem",
  "Beacon Health",
  "BlueCross BlueShield",
  "Cigna",
  "Compsych",
  "First Health Network",
  "TriCare",
];

export default function InsuranceMarquee() {
  return (
    <section
      id="insurance"
      className="overflow-hidden border-y border-white/10 bg-navy py-10 text-white"
    >
      <div className="flex flex-col items-center md:flex-row">
        <div className="relative z-10 mb-4 flex-shrink-0 bg-navy px-6 md:mb-0 md:border-r md:border-white/10 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta">
            In-Network Preferred Provider
          </p>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div className="animate-scroll flex items-center gap-16 whitespace-nowrap px-16">
            {INSURERS.map((name, i) => (
              <span
                key={`set1-${i}`}
                className="font-serif text-2xl text-white/75"
              >
                {name}
              </span>
            ))}
            {INSURERS.map((name, i) => (
              <span
                key={`set2-${i}`}
                className="font-serif text-2xl text-white/75"
                aria-hidden="true"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
