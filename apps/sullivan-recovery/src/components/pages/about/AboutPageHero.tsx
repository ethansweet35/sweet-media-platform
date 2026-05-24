import Image from "next/image";
import Link from "next/link";

const HERO_IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_facility_7.png";

export default function AboutPageHero() {
  return (
    <section
      className="relative flex min-h-[min(100dvh,820px)] flex-col justify-end overflow-hidden bg-[var(--sr-charcoal)]"
      style={{
        marginTop: "-88px",
        paddingTop: "88px",
      }}
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Sullivan Recovery facility grounds in Mission Viejo"
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(30,31,27,0.97) 0%, rgba(44,57,40,0.75) 50%, rgba(30,31,27,0.4) 100%)",
          }}
        />
      </div>

      <div className="sr-container relative z-10 w-full py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-end">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="sr-eyebrow text-[var(--sr-sage)]">About Sullivan Recovery</p>
              <span className="hidden h-px w-12 bg-white/20 sm:block" aria-hidden />
              <p
                className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Mission Viejo, California
              </p>
            </div>

            <h1
              className="mb-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Where medical precision meets{" "}
              <span className="italic text-[var(--sr-sage)]">human warmth</span>
            </h1>

            <p
              className="max-w-xl text-base leading-[1.75] text-white/75 md:text-lg"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Sullivan Recovery was built by people who have walked the path of addiction
              and mental health recovery themselves — and chose to turn that experience
              into a sanctuary for others.
            </p>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <p
                className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Our Promise
              </p>
              <p
                className="text-xl font-light italic leading-snug text-white md:text-2xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Every person who walks through our doors is seen, heard, and met exactly
                where they are.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/our-approach/our-team/"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--sr-sage)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sr-charcoal)] transition hover:bg-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Meet Our Team
                  <i className="ri-arrow-right-line" aria-hidden />
                </Link>
                <Link
                  href="/insurance/"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition hover:border-white/60 hover:bg-white/10"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Verify Insurance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
