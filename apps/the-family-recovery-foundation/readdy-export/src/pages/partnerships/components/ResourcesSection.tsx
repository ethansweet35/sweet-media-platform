import { useEffect, useRef, useState } from "react";
import { resources } from "@/mocks/partnerships";

export default function ResourcesSection() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-pure-white pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: intro text */}
          <div
            className="w-full lg:w-[38%] shrink-0 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
              Links &amp; Info
            </p>
            <h2 className="text-[clamp(26px,3vw,40px)] font-display text-deep-navy leading-[1.15] mb-6">
              Resources
            </h2>
            <p className="text-body-m font-body text-slate leading-relaxed">
              We have compiled a list of trusted national organizations that
              provide research, support, and treatment information for families
              navigating addiction and mental health challenges.
            </p>
          </div>

          {/* Right: resource cards */}
          <div className="w-full lg:w-[62%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {resources.map((resource, i) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-soft-white hover:bg-tfrf-blue rounded-xl p-5 md:p-6 border border-mist hover:border-tfrf-blue transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${0.1 + i * 0.07}s`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-tfrf-blue/10 group-hover:bg-pure-white/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                      <i className="ri-global-line w-5 h-5 flex items-center justify-center text-tfrf-blue group-hover:text-pure-white text-lg transition-colors duration-300" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-body font-semibold text-deep-navy group-hover:text-pure-white truncate transition-colors duration-300">
                        {resource.label}
                      </h3>
                      <p className="text-[13px] font-body text-slate group-hover:text-pure-white/80 leading-relaxed mt-1 transition-colors duration-300">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}