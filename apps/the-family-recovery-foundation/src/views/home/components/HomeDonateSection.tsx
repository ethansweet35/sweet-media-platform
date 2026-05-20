import Link from "next/link";
import { SITE_IMAGES } from "@/lib/site-images";

export default function HomeDonateSection() {
  return (
    <section id="donate" className="relative overflow-hidden bg-deep-navy">
      <div className="absolute inset-0">
        <img
          src={SITE_IMAGES.lifeLinesGreyBannerPng}
          alt=""
          className="w-full h-full object-cover opacity-30"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 via-deep-navy/88 to-tfrf-blue/75" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-16 py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-4">
            Help Advance Awareness
          </p>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-display text-pure-white leading-[1.1] mb-5">
            Donate to The Family Recovery Foundation
          </h2>
          <p className="text-body-m font-body text-pure-white/80 leading-relaxed mb-6">
            Help support The Family Recovery Foundation mission. Donate today!
          </p>
          <p className="text-caption font-body italic text-pure-white/65 leading-relaxed mb-8 max-w-xl mx-auto">
            The Family Recovery Foundation is a 501(c)(3) nonprofit organization, Tax I.D. #87-4108362.
            Donations are tax-deductible to the fullest extent of the law. No goods or services were received
            in exchange for these donations.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-3 bg-pure-white text-deep-navy px-8 py-3.5 md:px-9 md:py-4 rounded-full text-[14px] md:text-[15px] font-body font-semibold tracking-tight hover:bg-mist transition-colors duration-200 whitespace-nowrap group"
          >
            <span>Donate Now</span>
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-deep-navy text-pure-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <i className="ri-heart-fill w-4 h-4 flex items-center justify-center" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
