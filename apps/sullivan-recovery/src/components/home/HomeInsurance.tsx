import Link from "next/link";

const LOGOS_BASE = "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos";

const INSURERS = [
  { name: "Beacon Health Options", file: "sr_ins_beacon.png", href: "/addiction-aftercare-program/beacon-health-insurance-rehab-coverage/", width: "w-[260px] md:w-[300px]" },
  { name: "Cigna",                 file: "sr_ins_cigna.png",  href: "/addiction-aftercare-program/cigna-rehab-coverage/", width: "w-[150px] md:w-[180px]" },
  { name: "Aetna",                 file: "sr_ins_aetna.png",  href: "/addiction-aftercare-program/aetna-insurance-coverage-for-rehab/", width: "w-[140px] md:w-[160px]" },
  { name: "Anthem Blue Cross",     file: "sr_ins_anthem.png", href: "/addiction-aftercare-program/anthem-blue-cross-rehab-insurance/", width: "w-[280px] md:w-[320px]" },
];

const BULLETS = [
  { icon: "ri-shield-check-line",  text: "In-network & PPO out-of-network accepted" },
  { icon: "ri-phone-line",         text: "Free insurance verification — same day" },
  { icon: "ri-lock-2-line",        text: "100% confidential, no obligation" },
  { icon: "ri-time-line",          text: "Most clients pay little to nothing out of pocket" },
];

export default function HomeInsurance() {
  return (
    <section className="bg-[var(--sr-moss)] py-[100px]">
      <div className="sr-container">

        {/* Top: eyebrow + headline split */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Insurance Coverage
            </p>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Don&apos;t let cost <br />
              stop your <em className="italic text-[var(--sr-sage)]">recovery.</em>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p
              className="mb-8 text-[14px] leading-[1.9] text-white/65"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We work with most major insurance providers and PPO out-of-network plans.
              Our admissions team will verify your benefits quickly and confidentially —
              so you can focus on getting help, not navigating paperwork.
            </p>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--sr-ink)] transition hover:bg-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Verify My Insurance
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

        {/* Logos — horizontal strip; mix-blend removes black square backgrounds */}
        <div className="mb-12 border-y border-white/10 py-14">
          <p
            className="mb-12 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            We accept most major plans
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 md:gap-x-12 lg:gap-x-14">
            {INSURERS.map(({ name, file, href, width }) => (
              <Link
                key={name}
                href={href}
                className={`group flex h-16 items-center justify-center md:h-20 lg:h-24 ${width}`}
                title={name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${LOGOS_BASE}/${file}`}
                  alt={name}
                  className="h-full w-full object-contain opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ mixBlendMode: "screen" }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Bullet strip */}
        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {BULLETS.map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-4 bg-[var(--sr-moss)] px-6 py-7">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--sr-sage)]/30 text-[var(--sr-sage)]">
                <i className={`${icon} text-base`} />
              </span>
              <p
                className="text-[13px] leading-[1.7] text-white/70"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
