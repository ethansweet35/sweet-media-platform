'use client';

import { useEffect, useRef, useState } from "react";
import { familyModules } from "@/mocks/family-programming";

function ModuleCard({
  module,
  index,
  visible,
}: {
  module: (typeof familyModules)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="group bg-pure-white rounded-xl border border-mist/50 p-6 md:p-7 transition-all duration-500 hover:border-tfrf-blue/30 hover:shadow-md flex flex-col h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-[13px] font-body font-semibold text-tfrf-blue uppercase tracking-wider">
          Module {module.number}
        </span>
        {module.hasVideo && (
          <span className="inline-flex items-center gap-1 text-[11px] font-body text-slate bg-mist/60 px-2 py-0.5 rounded-full">
            <i className="ri-video-line w-3 h-3 flex items-center justify-center" />
            Watch Video
          </span>
        )}
      </div>
      <h3 className="text-[15px] md:text-[16px] font-body font-semibold text-deep-navy leading-snug flex-1 mb-5">
        {module.title}
      </h3>
      <button className="w-full py-2.5 rounded-lg bg-tfrf-blue text-pure-white font-body font-medium text-[13px] hover:bg-deep-navy transition-colors cursor-pointer">
        Download Now
      </button>
    </div>
  );
}

export default function FamilyModulesSection() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-soft-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div
          className="text-center mb-10 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Intensive Family Program
          </p>
          <h2 className="text-display-s font-display text-deep-navy mb-4">
            Family Modules
          </h2>
          <p className="text-body-m font-body text-slate max-w-xl mx-auto leading-relaxed">
            We offer an Intensive Family Program to help families heal and navigate
            the challenges of addiction with understanding and compassion.
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {familyModules.map((module, i) => (
            <ModuleCard key={module.id} module={module} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}