import { useEffect, useRef, useState } from "react";

export default function PartnershipSection() {
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
      className="relative overflow-hidden min-h-[480px] md:min-h-[560px] flex items-center"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/8d7904a2-321e-497a-b6b1-86369502544d/LifeLinesGrey_Banner.png"
          alt="Decorative grey banner background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-soft-white/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-16 py-16 md:py-20 w-full">
        <div
          className="bg-pure-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h3 className="text-[clamp(20px,2.2vw,28px)] font-display text-tfrf-blue leading-snug mb-4 md:mb-6">
            Prevention. Partnership. Perseverance
          </h3>
          <p className="text-body-m font-body text-slate leading-relaxed mb-4">
            Shoulder-to-shoulder, hand-in-hand, together we stand. The Family
            Recovery Foundation is here to lend a helping hand when you&apos;re
            reaching out for help.
          </p>
          <p className="text-body-m font-body text-deep-navy font-semibold leading-relaxed mb-8 md:mb-10">
            The Family Recovery Foundation is for{" "}
            <em className="italic font-display text-tfrf-blue">Anyone</em>{" "}
            because the disease of addiction affects{" "}
            <em className="italic font-display text-tfrf-blue">Everyone</em>.
          </p>
          <a
            href="/get-help"
            className="inline-flex items-center gap-3 bg-tfrf-blue text-pure-white px-8 py-4 rounded-full text-[14px] md:text-[15px] font-body font-semibold tracking-tight hover:bg-deep-navy transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            <span>Get Help</span>
            <span className="w-7 h-7 rounded-full bg-pure-white/20 flex items-center justify-center">
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}