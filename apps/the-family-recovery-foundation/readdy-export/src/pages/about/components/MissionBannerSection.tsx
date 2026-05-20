import { useEffect, useState } from "react";

export default function MissionBannerSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[420px] md:min-h-[480px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.squarespace-cdn.com/content/v1/6334a516d3673e24537a875e/744a3663-0c1f-4e52-941e-9763ea2b3cf6/LifeLinesBlue_Banner.png"
          alt="Decorative blue banner background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-deep-navy/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-16 py-16 md:py-20 w-full">
        <div
          className="max-w-2xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <h2 className="text-[clamp(22px,2.8vw,34px)] font-display text-pure-white leading-snug mb-4 md:mb-6">
            For many of us, our recovery started when we were feeling the most
            lost and were brought closer to the divine.
          </h2>
          <p className="text-body-m font-body text-pure-white/80 leading-relaxed mb-8 md:mb-10">
            That&apos;s why we are here to help shed a light and cast out the
            shadows of doubt and despair.
          </p>
          <a
            href="/resources"
            className="inline-flex items-center gap-3 bg-pure-white text-deep-navy px-7 py-3.5 rounded-full text-[14px] md:text-[15px] font-body font-semibold tracking-tight hover:bg-mist transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            <span>View All Resources</span>
            <span className="w-7 h-7 rounded-full bg-deep-navy text-pure-white flex items-center justify-center">
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}