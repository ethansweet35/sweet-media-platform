import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";
import PillarsSection from "@/views/home/components/PillarsSection";

export default function ThreePillarsPage() {
  return (
    <main className="bg-pure-white">
      <section className={`bg-soft-white ${PAGE_TOP_NAV_PADDING} pb-16 md:pb-20`}>
        <div className="max-w-content mx-auto px-6 lg:px-16 text-center max-w-3xl">
          <p className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Prevention · Education · Support
          </p>
          <h1 className="text-[clamp(32px,4vw,52px)] font-display text-deep-navy leading-[1.08] mb-6">
            Our Three Pillars
          </h1>
          <p className="text-[17px] font-body text-slate leading-relaxed">
            The Family Recovery Foundation&apos;s vision is generational change — equipping families and
            communities with prevention, education, and direct support so no one faces recovery alone.
          </p>
        </div>
      </section>
      <PillarsSection />
    </main>
  );
}
