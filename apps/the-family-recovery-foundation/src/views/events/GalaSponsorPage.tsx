import DonorboxDboxWidget from "@/components/marketing/DonorboxDboxWidget";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";

export default function GalaSponsorPage() {
  return (
    <div className="min-h-screen bg-soft-white">
      <main className={`${PAGE_TOP_NAV_PADDING} pb-16 md:pb-24`}>
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-3">
              Oklahoma City Annual Gala
            </p>
            <h1 className="font-display text-display-m text-deep-navy mb-4">
              Become a Sponsor
            </h1>
            <p className="text-body-m font-body text-slate max-w-xl mx-auto">
              Choose a sponsorship level to support families impacted by addiction and mental
              health challenges.
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-2xl border border-mist/80 bg-pure-white p-4 md:p-6 shadow-sm">
            <DonorboxDboxWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
