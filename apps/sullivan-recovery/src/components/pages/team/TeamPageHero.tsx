import Link from "next/link";

export default function TeamPageHero() {
  return (
    <section
      className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)]"
      style={{
        marginTop: "-88px",
        paddingTop: "calc(88px + 2.5rem)",
      }}
    >
      <div className="sr-container pb-12 pt-4 md:pb-16 md:pt-6">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-[13px]">
          <Link
            href="/our-approach/"
            className="text-[var(--sr-muted)] transition hover:text-[var(--sr-fern)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            About Us
          </Link>
          <span className="text-[var(--sr-sand)]" aria-hidden>
            /
          </span>
          <span
            className="font-medium text-[var(--sr-fern)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Our Team
          </span>
        </div>

        <div className="max-w-3xl">
          <p className="sr-eyebrow mb-4">Our Team</p>
          <h1
            className="mb-5 text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Meet the people behind{" "}
            <span className="italic text-[var(--sr-fern)]">your recovery</span>
          </h1>
          <p
            className="text-base leading-[1.85] text-[var(--sr-body)] md:text-lg"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Our dedicated team of professionals brings together a unique blend of expertise,
            empathy, and evidence-based practices to support each individual on their journey
            to recovery.
          </p>
        </div>
      </div>
    </section>
  );
}
