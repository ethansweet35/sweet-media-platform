import Link from "next/link";
import { HOME_PARTNER_LOGOS, SITE_IMAGES } from "@/lib/site-images";

export default function HomePartnersSection() {
  return (
    <section
      id="resources-partners"
      className="relative overflow-hidden bg-soft-white py-20 md:py-28 border-t border-mist/80"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <img
          src={SITE_IMAGES.partnership}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden
        />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-16 text-center">
        <h2 className="text-[clamp(28px,3.5vw,44px)] font-display text-deep-navy leading-[1.1] mb-4">
          Resources &amp; <em className="italic">Partners</em>
        </h2>
        <p className="text-body-m font-body text-slate leading-relaxed max-w-xl mx-auto mb-12 md:mb-14">
          Information, services, and partnerships for recovery.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-center justify-items-center max-w-4xl mx-auto">
          {HOME_PARTNER_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="flex h-20 md:h-24 w-full max-w-[180px] items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <p className="mt-10 md:mt-12">
          <Link
            href="/partnerships"
            className="text-[14px] font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors"
          >
            View partnerships &amp; resources →
          </Link>
        </p>
      </div>
    </section>
  );
}
