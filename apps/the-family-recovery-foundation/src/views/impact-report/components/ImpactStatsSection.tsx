'use client';

import { useEffect, useRef, useState } from "react";
import { programStats, overallImpact } from "@/mocks/impact-report";

function StatCard({
  stat,
  index,
  visible,
}: {
  stat: (typeof programStats)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="group bg-pure-white rounded-xl border border-mist/60 p-7 md:p-8 text-center transition-all duration-500 hover:border-tfrf-blue/30 hover:shadow-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100 + 150}ms`,
      }}
    >
      <h3 className="text-[17px] md:text-[18px] font-display font-medium text-deep-navy mb-5 leading-snug min-h-[48px] flex items-center justify-center">
        {stat.label}
      </h3>
      <p className="text-[48px] md:text-[56px] font-display font-medium text-tfrf-blue leading-none mb-4">
        {stat.percentage}%
      </p>
      <p className="text-[13px] md:text-[14px] font-body text-slate leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
}

export default function ImpactStatsSection() {
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
      className="bg-pure-white pb-12 md:pb-16 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10 md:mb-14">
          {programStats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} visible={visible} />
          ))}
        </div>

        {/* Overall Impact Banner */}
        <div
          className="relative bg-pure-white rounded-xl border border-mist/60 overflow-hidden transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "500ms",
          }}
        >
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-tfrf-blue rounded-l-xl" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 p-8 md:p-10 pl-8 md:pl-10 text-center">
            <h3 className="text-[18px] md:text-[20px] font-display font-medium text-deep-navy">
              {overallImpact.label}
            </h3>
            <p className="text-[14px] md:text-[15px] font-body text-deep-navy/80 leading-relaxed max-w-xl">
              <strong className="text-tfrf-blue">{overallImpact.percentage}%</strong>{" "}
              {overallImpact.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}