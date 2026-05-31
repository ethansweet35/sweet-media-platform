import Image from "next/image";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";
import {
  OKLAHOMA_GALA_SPONSOR_PATH,
  OKLAHOMA_GALA_TICKETS_URL,
} from "@/lib/oklahoma-gala";
import { SITE_IMAGES } from "@/lib/site-images";

export default function GalaHeroSection() {
  return (
    <section className={`relative bg-soft-white ${PAGE_TOP_NAV_PADDING} pb-12 md:pb-16 overflow-hidden`}>
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tfrf-blue via-sky-blue to-powder-blue" />

      <div className="max-w-bleed mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero image with overlaid text */}
        <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
          <Image
            src={SITE_IMAGES.galaOklahomaHero}
            alt="Oklahoma City skyline at golden hour"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
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
                href={OKLAHOMA_GALA_TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C9A44A] hover:bg-[#b8943f] text-deep-navy font-body font-semibold text-[14px] uppercase tracking-[0.06em] rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer shadow-lg shadow-black/20"
              >
                Purchase Tickets
              </a>
              <a
                href={OKLAHOMA_GALA_SPONSOR_PATH}
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