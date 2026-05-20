'use client';

import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/base/Eyebrow";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";

export default function ImpactHeroSection() {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`bg-pure-white ${PAGE_TOP_NAV_PADDING} pb-12 md:pb-16 overflow-hidden`}
    >
      <div className="max-w-content mx-auto px-6 lg:px-16 text-center">
        <div
          className="transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <Eyebrow>Annual Report</Eyebrow>
          <h1 className="text-display-l font-display text-deep-navy mb-6">
            2025 Impact
          </h1>
        </div>

        <div
          className="max-w-2xl mx-auto transition-all duration-700 delay-150"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2 className="text-display-s font-display text-deep-navy mb-5">
            Transforming Families, One Step at a Time
          </h2>
          <p className="text-body-l font-body text-slate leading-relaxed">
            Every number tells a story of hope, healing, and connection.
            Here&apos;s what families are saying about their experience with{" "}
            <strong className="text-deep-navy">
              The Family Recovery Foundation (TFRF)
            </strong>{" "}
            programs.
          </p>
        </div>
      </div>
    </section>
  );
}