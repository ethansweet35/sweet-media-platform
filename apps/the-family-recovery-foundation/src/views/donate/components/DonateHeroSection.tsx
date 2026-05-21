import DonorboxEmbed from "@/components/marketing/DonorboxEmbed";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";

export default function DonateHeroSection() {
  return (
    <section className="relative min-h-[700px] md:min-h-[800px]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_8d7904a2_LifeLinesGrey_Banner.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`relative z-10 max-w-content mx-auto px-6 lg:px-8 ${PAGE_TOP_NAV_PADDING} pb-16 md:pb-24 lg:pb-32`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.15em] text-tfrf-blue mb-4">
              Help Advance Awareness
            </p>
            <h1 className="text-display-m font-display text-deep-navy mb-6">
              Donate to The Family Recovery Foundation
            </h1>
            <p className="text-body-m font-body text-slate mb-4">
              Help support the The Family Recovery Foundation mission. Donate today!
            </p>
            <p className="text-caption font-body italic text-stone-blue mb-4">
              The Family Recovery Foundation is a 501(c)(3) nonprofit organization, Tax I.D. #87-4108362 - Donations to The Family Recovery Foundation are tax-deductible to the fullest extent of the law. No goods or services were received in exchange for these donations.
            </p>
            <p className="text-caption font-body italic text-deep-navy mb-1">
              <strong>Please make checks payable to &quot;Lifeline Recovery Services Foundation&quot; with a note &quot;DBA The Family Recovery Foundation&quot; and mail to:</strong>
            </p>
            <p className="text-caption font-body italic text-deep-navy mb-8">
              <strong>
                Lifeline Recovery Services Foundation
                <br />
                9842 13th St
                <br />
                Garden Grove CA 92844
              </strong>
            </p>

            <hr className="border-mist mb-8" />

            <p className="text-body-s font-body text-slate leading-relaxed">
              Our non-profit is spearheading a Drug Prevention Campaign aimed at financing educational initiatives and providing resources to parents of youth to assist them in navigating the complexities of addiction within their homes and communities.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <DonorboxEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
