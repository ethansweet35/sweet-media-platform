'use client';

import { useEffect, useRef, useState } from "react";

export default function TestimonialsHeroSection() {
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
      className="relative bg-powder-blue overflow-hidden pt-28 md:pt-36 lg:pt-44 pb-20 md:pb-28 lg:pb-36"
    >
      {/* Soft decorative shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tfrf-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-soft-white/60 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-content mx-auto px-6 lg:px-16 relative">
        <div
          className="max-w-3xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-5">
            What People Are Saying
          </p>
          <h1 className="text-[clamp(36px,5vw,64px)] font-display text-deep-navy leading-[1.1] mb-6 md:mb-8">
            Voices of <em className="italic">Hope</em> &amp; Healing
          </h1>
          <p className="text-body-l font-body text-slate leading-relaxed max-w-2xl mx-auto">
            Real stories from real families. These testimonials reflect the courage,
            resilience, and transformation that happen when families come together
            to heal from addiction.
          </p>

          {/* Decorative line */}
          <div className="mt-10 md:mt-14 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-tfrf-blue/30" />
            <div className="w-2 h-2 rounded-full bg-tfrf-blue/40" />
            <div className="w-12 h-px bg-tfrf-blue/30" />
          </div>
        </div>
      </div>
    </section>
  );
}