'use client';

import { useEffect, useRef, useState } from "react";
import { writtenTestimonials } from "@/mocks/testimonials";

function QuoteCard({
  testimonial,
  index,
  visible,
  featured = false,
}: {
  testimonial: (typeof writtenTestimonials)[0];
  index: number;
  visible: boolean;
  featured?: boolean;
}) {
  const paragraphs = testimonial.quote.split("\n\n").filter(Boolean);

  if (featured) {
    return (
      <div
        className="group relative bg-pure-white rounded-2xl border border-mist/40 overflow-hidden transition-all duration-500 hover:border-tfrf-blue/30 hover:shadow-md"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transitionDelay: `${index * 100}ms`,
        }}
      >
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-tfrf-blue rounded-l-2xl" />

        <div className="flex flex-col lg:flex-row">
          {/* Text content */}
          <div className="flex-1 p-8 md:p-10 lg:p-12">
            {/* Quote icon */}
            <div className="w-10 h-10 rounded-full bg-tfrf-blue/10 flex items-center justify-center mb-6">
              <i className="ri-double-quotes-l w-5 h-5 flex items-center justify-center text-tfrf-blue text-base" />
            </div>

            {/* Paragraphs */}
            <div className="space-y-5">
              {paragraphs.map((para, pi) => (
                <p
                  key={pi}
                  className="text-[15px] md:text-[16px] font-body text-deep-navy/85 leading-[1.75]"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Attribution */}
            <div className="mt-8 pt-6 border-t border-mist/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tfrf-blue/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-body font-semibold text-tfrf-blue">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-body font-semibold text-deep-navy">
                  {testimonial.name}
                </p>
                <p className="text-xs font-body text-slate">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative right side */}
          <div className="hidden lg:flex w-[240px] xl:w-[280px] bg-powder-blue/40 items-center justify-center shrink-0">
            <div className="text-[120px] xl:text-[140px] font-display leading-none text-tfrf-blue/10 select-none">
              &ldquo;
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-pure-white rounded-xl border border-mist/40 overflow-hidden transition-all duration-500 hover:border-tfrf-blue/30 hover:shadow-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-tfrf-blue rounded-l-xl" />

      <div className="p-6 md:p-8 pl-7 md:pl-9">
        {/* Quote icon */}
        <div className="w-9 h-9 rounded-full bg-tfrf-blue/8 flex items-center justify-center mb-5">
          <i className="ri-double-quotes-l w-4 h-4 flex items-center justify-center text-tfrf-blue text-sm" />
        </div>

        {/* Paragraphs */}
        <div className="space-y-4">
          {paragraphs.map((para, pi) => (
            <p
              key={pi}
              className="text-[14px] md:text-[15px] font-body text-deep-navy/80 leading-[1.7]"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Attribution */}
        <div className="mt-6 pt-5 border-t border-mist/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-tfrf-blue/8 flex items-center justify-center shrink-0">
            <span className="text-sm font-body font-semibold text-tfrf-blue">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-deep-navy">
              {testimonial.name}
            </p>
            {testimonial.location && (
              <p className="text-xs font-body text-slate">
                {testimonial.location}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WrittenTestimonialsSection() {
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

  const featured = writtenTestimonials.find((t) => t.featured);
  const regular = writtenTestimonials.filter((t) => !t.featured);

  return (
    <section
      ref={ref}
      className="bg-soft-white pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div
          className="max-w-xl mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Written Testimonials
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15]">
            Words From the <em className="italic">Heart</em>
          </h2>
        </div>

        {/* Featured testimonial */}
        {featured && (
          <div className="mb-6 md:mb-8">
            <QuoteCard
              testimonial={featured}
              index={0}
              visible={visible}
              featured
            />
          </div>
        )}

        {/* Regular testimonials - 2 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {regular.map((t, i) => (
            <QuoteCard
              key={t.id}
              testimonial={t}
              index={i + 1}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}