import Link from "next/link";
import MarketingPageHero, { MarketingCtaLink } from "@/components/marketing/MarketingPageHero";

export default function LightTheWayPage() {
  return (
    <main className="bg-soft-white">
      <MarketingPageHero
        eyebrow="Holiday Campaign"
        title="Light the Way"
        body="Join our holiday matching campaign and help families access prevention, education, and support when they need it most. Every gift lights the path toward healing for someone walking this journey today."
        variant="dark"
      >
        <div className="flex flex-wrap gap-4">
          <MarketingCtaLink href="/donate-light-the-way" label="Give now" primary />
          <MarketingCtaLink href="/stories" label="See our stories" />
        </div>
      </MarketingPageHero>

      <section className="py-14 md:py-20 bg-pure-white">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-display text-deep-navy mb-6">
              Holiday $5,000 Matching Campaign
            </h2>
            <p className="text-[16px] font-body text-slate leading-relaxed mb-8">
              Your donation during this campaign can be matched — doubling the impact of your
              support for families navigating addiction, treatment, and long-term recovery.
            </p>
            <Link
              href="/donate-light-the-way"
              className="inline-flex items-center gap-2 rounded-full bg-tfrf-blue px-8 py-3.5 text-[15px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors"
            >
              Donate to Light the Way
              <i className="ri-heart-line" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
