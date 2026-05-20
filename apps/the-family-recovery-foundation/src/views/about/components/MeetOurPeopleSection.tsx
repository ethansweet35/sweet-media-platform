'use client';

import { useEffect, useRef, useState } from "react";

export default function MeetOurPeopleSection() {
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
      className="bg-soft-white pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div
          className="max-w-3xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="w-16 h-0.5 bg-tfrf-blue mx-auto mb-6" />
          <h2 className="text-[clamp(28px,3.2vw,44px)] font-display text-deep-navy leading-[1.15] mb-6 md:mb-8">
            Meet Our People
          </h2>
          <p className="text-body-m font-body text-slate leading-relaxed">
            If you&apos;re looking for real resources for real-life situations,
            created by real people, you&apos;ve come to the right place. We are a
            clinically facilitated foundation with a Christian faith-based
            orientation. Our people are industry experts, professionals, and
            advocates with decades of combined experience and years of
            collaboration who came together for a common cause.
          </p>
        </div>
      </div>
    </section>
  );
}