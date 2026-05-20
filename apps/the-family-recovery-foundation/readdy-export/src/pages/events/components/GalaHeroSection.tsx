export default function GalaHeroSection() {
  return (
    <section className="relative bg-soft-white pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tfrf-blue via-sky-blue to-powder-blue" />

      <div className="max-w-bleed mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero image with overlaid text */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=Oklahoma%20City%20skyline%20panoramic%20view%20at%20golden%20hour%20sunset%20with%20warm%20amber%20light%20reflecting%20off%20modern%20downtown%20glass%20buildings%2C%20dramatic%20cloud%20formations%2C%20cinematic%20wide%20angle%20photography%2C%20deep%20blue%20and%20warm%20gold%20color%20palette%2C%20elegant%20event%20venue%20atmosphere%2C%20no%20text%20overlay%2C%20clean%20simple%20sky%20background&width=1200&height=500&seq=events-hero-001&orientation=landscape"
            alt="Oklahoma City skyline at golden hour"
            className="w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px] object-cover object-center"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/85 via-deep-navy/40 to-deep-navy/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/30 to-transparent" />

          {/* Text overlay on image */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-14 lg:pb-16 px-6 text-center">
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-powder-blue mb-3 md:mb-4">
              Save the Date
            </p>
            <h1 className="font-display text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-[-0.02em] text-pure-white mb-3">
              Annual Gala
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-pure-white/85 mb-6 md:mb-8">
              <span className="flex items-center gap-2 text-body-m font-body">
                <i className="ri-calendar-line w-4 h-4 flex items-center justify-center" />
                Thursday, June 11, 2026
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-pure-white/50" />
              <span className="flex items-center gap-2 text-body-m font-body">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center" />
                Oklahoma City, OK
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#tickets"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C9A44A] hover:bg-[#b8943f] text-deep-navy font-body font-semibold text-[14px] uppercase tracking-[0.06em] rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer shadow-lg shadow-black/20"
              >
                Purchase Tickets
              </a>
              <a
                href="#sponsorships"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-pure-white/60 text-pure-white hover:bg-pure-white/10 font-body font-semibold text-[14px] uppercase tracking-[0.06em] rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Become a Sponsor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}