import { useEffect, useState } from "react";

export default function PartnersCTASection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-deep-navy py-20 md:py-28">
      {/* Decorative blurred orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tfrf-blue/15 blur-3xl" />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-16">
        <div
          className="max-w-2xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <h2 className="text-[clamp(24px,3vw,36px)] font-display text-pure-white leading-snug mb-4 md:mb-5">
            Become a Partner
          </h2>
          <p className="text-body-m font-body text-pure-white/70 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto">
            Interested in joining our network of trusted partners? Together we can
            expand access to care, education, and support for families across the
            nation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-pure-white text-deep-navy px-8 py-4 rounded-full text-[14px] md:text-[15px] font-body font-semibold tracking-tight hover:bg-mist transition-colors duration-200 whitespace-nowrap cursor-pointer group"
          >
            <span>Contact Us</span>
            <span className="w-7 h-7 rounded-full bg-deep-navy text-pure-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}