import Image from "next/image";
import Link from "next/link";

const HERO_IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_prog_residential.jpg";

export default function ProgramsPageHero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--sr-charcoal)] text-white"
      style={{ marginTop: "-88px", paddingTop: "calc(88px + 1.25rem)" }}
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(30,31,27,0.95) 0%, rgba(44,57,40,0.75) 55%, rgba(30,31,27,0.5) 100%)",
          }}
        />
      </div>

      <div className="sr-container relative z-10 pb-12 pt-6 md:pb-14 md:pt-8">
        <p className="sr-eyebrow mb-3 text-[var(--sr-sage)]">Levels of care</p>
        <h1
          className="mb-4 max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Treatment programs built around{" "}
          <span className="italic text-[var(--sr-sage)]">your journey</span>
        </h1>
        <p
          className="mb-8 max-w-xl text-[15px] leading-[1.8] text-white/72"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          From medically supervised detox through residential treatment, therapies, and
          aftercare — every level of care is coordinated on one Mission Viejo campus.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/programs/detox/"
            className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Medical detox
            <i className="ri-arrow-right-line text-sm" aria-hidden />
          </Link>
          <Link
            href="/insurance/"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Verify insurance
          </Link>
        </div>
      </div>
    </section>
  );
}
