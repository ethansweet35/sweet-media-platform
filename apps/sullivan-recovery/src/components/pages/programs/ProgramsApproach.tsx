import Link from "next/link";

export default function ProgramsApproach() {
  return (
    <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-14 md:py-20">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="sr-eyebrow mb-3">Our approach</p>
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              What sets Sullivan Recovery{" "}
              <span className="italic text-[var(--sr-fern)]">apart</span>
            </h2>
          </div>
          <div
            className="space-y-4 text-[15px] leading-[1.85] text-[var(--sr-body)] lg:col-span-7"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <p>
              Our approach to drug and alcohol treatment combines medical expertise with a
              deep commitment to each person&apos;s path to sobriety. Detox is the foundation —
              but recovery continues through therapy, residential structure, and aftercare
              planning.
            </p>
            <p>
              Every plan is tailored to your clinical needs, goals, and challenges. We offer a
              confidential, secure environment in Mission Viejo where you can focus on healing
              without judgment.
            </p>
            <Link
              href="/our-approach/"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-fern)] transition hover:text-[var(--sr-moss)]"
            >
              About Sullivan Recovery
              <i className="ri-arrow-right-line text-sm" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
