import { useState } from "react";
import { pillars } from "@/mocks/pillars";

export default function PillarsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="pillars" className="bg-pure-white pt-10 md:pt-14 lg:pt-20 pb-20 md:pb-28 lg:pb-36 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header — left aligned, not centered */}
        <div className="max-w-xl mb-14 md:mb-20">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Our Three Pillars
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15]">
            The Foundation of <em className="italic">Everything</em> We Do
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => {
            const isHovered = hoveredId === pillar.id;
            return (
              <div
                key={pillar.id}
                className="group relative"
                onMouseEnter={() => setHoveredId(pillar.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image container with decorative shape */}
                <div className="relative mb-6 md:mb-8">
                  {/* Decorative blob behind image */}
                  <div
                    className={`absolute -top-4 -right-4 w-[70%] h-[70%] rounded-[30px] ${pillar.accent} -z-10 transition-transform duration-500 ease-out`}
                    style={{
                      transform: isHovered ? "translate(8px, -8px) rotate(3deg)" : "translate(0, 0) rotate(0deg)",
                    }}
                  />

                  {/* Image */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-deep-navy/5">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
                      style={{
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                      }}
                    />

                    {/* Number watermark */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[64px] md:text-[72px] font-display text-pure-white/20 leading-none select-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[22px] md:text-[24px] font-display text-deep-navy mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-body-s font-body text-slate leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <a
                    href={`#${pillar.id}`}
                    className="inline-flex items-center gap-2 text-body-s font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors duration-200 group/link cursor-pointer"
                  >
                    <span>Learn more</span>
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}