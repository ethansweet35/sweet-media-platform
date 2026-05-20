import ResourcesSection from "@/views/partnerships/components/ResourcesSection";

export default function ResourcesPage() {
  return (
    <main className="bg-pure-white">
      <section className="bg-deep-navy text-pure-white py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-4">
            Resources &amp; Partners
          </p>
          <h1 className="text-[clamp(32px,4vw,48px)] font-display leading-[1.08]">
            Trusted National Resources
          </h1>
          <p className="mt-5 text-[17px] font-body text-pure-white/75 leading-relaxed">
            Research, support, and treatment information for families navigating addiction and mental
            health challenges.
          </p>
        </div>
      </section>
      <ResourcesSection />
    </main>
  );
}
