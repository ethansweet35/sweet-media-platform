'use client';

import { useEffect, useState } from "react";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";

export default function PartnershipsHeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`relative overflow-hidden bg-deep-navy ${PAGE_TOP_NAV_PADDING} pb-20 md:pb-28`}>
      {/* Decorative soft shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-tfrf-blue/20 blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-blue/15 blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-5 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            Working Together
          </p>
          <h1
            className="text-[clamp(36px,5.5vw,72px)] font-display text-pure-white leading-[1.05] mb-6 md:mb-8 transition-all duration-700 delay-100"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            Partnerships &amp; <em className="italic">Resources</em>
          </h1>
          <p
            className="text-body-m md:text-body-l font-body text-pure-white/70 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            We partner with treatment centers, clinicians, and organizations across
            the country who share our mission of healing families and preventing
            substance use. Together, we expand access to care, education, and hope.
          </p>
        </div>
      </div>
    </section>
  );
}