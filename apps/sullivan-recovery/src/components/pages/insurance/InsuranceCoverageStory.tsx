import Image from "next/image";
import Link from "next/link";

const IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_prog_detox_v2.jpg";

export default function InsuranceCoverageStory() {
  return (
    <section className="bg-[var(--sr-moss)] py-14 md:py-20">
      <div className="sr-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[520px]">
            <Image
              src={IMG}
              alt="Medical detox at Sullivan Recovery"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[var(--sr-moss)]/40"
              aria-hidden
            />
            <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Mission Viejo, CA
              </p>
              <p
                className="mt-1 text-lg font-light text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Detox & residential under one roof
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="sr-eyebrow mb-4 text-[var(--sr-sage)]">Rehab coverage</p>
            <h2
              className="mb-6 max-w-xl text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Insurance should clear the path —{" "}
              <span className="italic text-[var(--sr-sage)]">not block it</span>
            </h2>
            <div
              className="space-y-4 text-[15px] leading-[1.85] text-white/72"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <p>
                Seeking help for drug or alcohol addiction takes courage. Sorting through
                deductibles, networks, and pre-authorization should not add another layer of
                stress.
              </p>
              <p>
                Our admissions team translates your benefits into plain language, coordinates
                with your carrier, and helps you understand out-of-pocket costs before
                admission — including{" "}
                <strong className="font-medium text-white">PPO out-of-network</strong> options
                when your plan allows.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/programs/detox/"
                className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Medical detox
                <i className="ri-arrow-right-line text-sm" aria-hidden />
              </Link>
              <Link
                href="/programs/residential-treatment/"
                className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Residential care
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
