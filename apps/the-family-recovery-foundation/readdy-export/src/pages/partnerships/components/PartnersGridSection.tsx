import { useState, useEffect, useRef } from "react";
import { partners, tierBadge } from "@/mocks/partnerships";

export default function PartnersGridSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Sort: platinum first, then silver, then community
  const sorted = [...partners].sort((a, b) => {
    const order = { platinum: 0, silver: 1, community: 2 };
    return order[a.tier] - order[b.tier];
  });

  const platinum = sorted.filter((p) => p.tier === "platinum");
  const silver = sorted.filter((p) => p.tier === "silver");
  const community = sorted.filter((p) => p.tier === "community");

  return (
    <section
      ref={ref}
      id="partners"
      className="bg-soft-white pt-16 md:pt-20 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div
          className="mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Our Network
          </p>
          <h2 className="text-[clamp(26px,3vw,40px)] font-display text-deep-navy leading-[1.15]">
            Trusted Partners
          </h2>
        </div>

        {/* Featured: Platinum + Silver — larger cards */}
        {(platinum.length > 0 || silver.length > 0) && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            {[...platinum, ...silver].map((partner) => {
              const badge = tierBadge[partner.tier];
              return (
                <div
                  key={partner.id}
                  className="group bg-pure-white rounded-xl border border-mist overflow-hidden hover:border-tfrf-blue/30 transition-colors duration-300"
                >
                  {/* Top accent bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${partner.accent}`}
                  />
                  <div className="p-6 md:p-7">
                    {/* Logo area */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-16 h-16 rounded-xl bg-soft-white border border-mist flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                        <img
                          src={partner.logo}
                          alt={partner.logoAlt}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-display text-deep-navy leading-tight">
                          {partner.name}
                        </h3>
                        <span
                          className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-body font-semibold ${badge.bg} ${badge.text}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-body-s font-body text-slate leading-relaxed mb-5">
                      {partner.description}
                    </p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-body-s font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors duration-200 cursor-pointer group/link"
                    >
                      <span>Visit Website</span>
                      <i className="ri-external-link-line w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Divider */}
        {community.length > 0 && (
          <div
            className="flex items-center gap-6 mb-10 lg:mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.2s",
            }}
          >
            <div className="flex-1 h-px bg-mist" />
            <span className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-slate">
              Community Champions
            </span>
            <div className="flex-1 h-px bg-mist" />
          </div>
        )}

        {/* Community champions grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.25s",
          }}
        >
          {community.map((partner) => {
            const badge = tierBadge[partner.tier];
            return (
              <div
                key={partner.id}
                className="group bg-pure-white rounded-xl border border-mist overflow-hidden hover:border-tfrf-blue/30 transition-colors duration-300"
              >
                {/* Top accent bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${partner.accent}`}
                />
                <div className="p-5 md:p-6">
                  {/* Compact header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-soft-white border border-mist flex items-center justify-center shrink-0 overflow-hidden p-1">
                      <img
                        src={partner.logo}
                        alt={partner.logoAlt}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-display text-deep-navy leading-tight truncate">
                        {partner.name}
                      </h3>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-body font-semibold ${badge.bg} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-[14px] font-body text-slate leading-relaxed mb-4 line-clamp-4">
                    {partner.description}
                  </p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors duration-200 cursor-pointer"
                  >
                    <span>Visit Website</span>
                    <i className="ri-external-link-line w-3.5 h-3.5 flex items-center justify-center" />
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