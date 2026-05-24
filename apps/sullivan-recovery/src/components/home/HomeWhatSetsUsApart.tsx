import Image from "next/image";
import Link from "next/link";

const STAFF_IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_apart_staff01.jpg";

const DIFFERENTIATORS = [
  { num: "01", title: "Medical Detox", desc: "24/7 supervised withdrawal with clinical support" },
  { num: "02", title: "Personalized Plans", desc: "Treatment built around your history and goals" },
  { num: "03", title: "Continuous Support", desc: "Guidance from intake through aftercare" },
  { num: "04", title: "Community Involvement", desc: "Surf, music, outings, and peer connection" },
  { num: "05", title: "25+ Years of Experience", desc: "A team that has walked this path with thousands" },
];

export default function HomeWhatSetsUsApart() {
  return (
    <section className="bg-[var(--sr-linen)] py-[100px]">
      <div className="sr-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">

          {/* Left: copy + differentiators */}
          <div className="lg:col-span-6">
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              What Sets Us Apart
            </p>

            <h2
              className="mb-6 text-[clamp(2.5rem,4.5vw,4rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              <em className="italic text-[var(--sr-fern)]">Exceptional</em> staff.<br />
              Uncommon care.
            </h2>

            <p
              className="mb-10 max-w-lg text-[14px] leading-[1.9] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our approach to drug and alcohol addiction treatment sets a new standard in
              recovery — combining medical expertise with a deep commitment to every
              individual&apos;s journey toward sobriety.
            </p>

            {/* Numbered differentiator list */}
            <ul className="mb-10 divide-y divide-[var(--sr-sand)] border-y border-[var(--sr-sand)]">
              {DIFFERENTIATORS.map(({ num, title, desc }) => (
                <li
                  key={num}
                  className="group grid grid-cols-[3rem_1fr] items-center gap-4 py-4 transition-colors hover:bg-[var(--sr-parchment)]/60"
                >
                  <span
                    className="text-[11px] font-medium tabular-nums tracking-[0.15em] text-[var(--sr-clay)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {num}
                  </span>
                  <div>
                    <p
                      className="text-base font-medium text-[var(--sr-ink)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {title}
                    </p>
                    <p
                      className="mt-0.5 text-[12px] leading-relaxed text-[var(--sr-muted)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link href="/our-approach/" className="sr-btn-primary inline-flex items-center gap-2 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em]">
              Our Philosophy
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Right: image with floating stat */}
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden" style={{ minHeight: 520 }}>
              <Image
                src={STAFF_IMG}
                alt="Sullivan Recovery staff in a one-on-one counseling session with a client"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 border border-[var(--sr-sand)] bg-[var(--sr-parchment)] px-8 py-6 shadow-lg">
              <p
                className="text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-none text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                25+
              </p>
              <p
                className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Years combined experience
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
