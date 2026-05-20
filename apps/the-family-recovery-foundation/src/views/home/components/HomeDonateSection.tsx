import DonorboxEmbed from "@/components/marketing/DonorboxEmbed";
import { SITE_IMAGES } from "@/lib/site-images";

export default function HomeDonateSection() {
  return (
    <section id="donate" className="relative bg-pure-white">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={SITE_IMAGES.lifeLinesGreyBannerPng}
          alt=""
          className="w-full h-full object-cover opacity-20"
          aria-hidden
        />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-16 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.15em] text-tfrf-blue mb-4">
              Help Advance Awareness
            </p>
            <h2 className="text-[clamp(28px,3vw,40px)] font-display text-deep-navy leading-[1.1] mb-5">
              Donate to The Family Recovery Foundation
            </h2>
            <p className="text-body-m font-body text-slate leading-relaxed mb-6">
              Help support The Family Recovery Foundation mission. Donate today!
            </p>
            <p className="text-caption font-body italic text-stone-blue leading-relaxed">
              The Family Recovery Foundation is a 501(c)(3) nonprofit organization, Federal I.D.
              #87-4108362 — Donations to The Family Recovery Foundation are tax-deductible to the
              fullest extent of the law. No goods or services were received in exchange for these
              donations.
            </p>
          </div>

          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-[500px] min-h-[400px] rounded-xl border border-mist/80 bg-pure-white p-4 md:p-5 shadow-sm overflow-visible">
              <DonorboxEmbed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
