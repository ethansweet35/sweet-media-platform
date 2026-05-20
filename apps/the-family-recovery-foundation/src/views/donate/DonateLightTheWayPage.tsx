import Link from "next/link";
import DonateHeroSection from "./components/DonateHeroSection";

export default function DonateLightTheWayPage() {
  return (
    <div className="min-h-screen bg-soft-white">
      <section className="bg-deep-navy text-pure-white py-14 md:py-18">
        <div className="max-w-content mx-auto px-6 lg:px-16 text-center max-w-3xl">
          <p className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-4">
            Light the Way Campaign
          </p>
          <h1 className="text-[clamp(28px,3.5vw,44px)] font-display leading-[1.1] mb-4">
            Holiday $5,000 Matching Campaign
          </h1>
          <p className="text-[16px] font-body text-pure-white/80 leading-relaxed mb-6">
            Your gift during this campaign helps families access prevention, education, and support.
            Give below to participate in Light the Way.
          </p>
          <Link
            href="/light-the-way"
            className="inline-flex items-center gap-2 text-[14px] font-body font-semibold text-sky-blue hover:text-pure-white"
          >
            Learn about the campaign
            <i className="ri-arrow-left-line" />
          </Link>
        </div>
      </section>
      <main className="pt-8 md:pt-12">
        <DonateHeroSection />
      </main>
    </div>
  );
}
