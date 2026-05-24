import Image from "next/image";
import Link from "next/link";
import AboutSectionHeader from "./AboutSectionHeader";

const STAFF_IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_apart_staff01.jpg";

const PILLARS = [
  {
    num: "01",
    title: "Medical Detox",
    desc: "Physician-led withdrawal management with 24/7 nursing — safe, monitored, and designed to minimize discomfort.",
    icon: "ri-heart-pulse-line",
  },
  {
    num: "02",
    title: "Comprehensive Care",
    desc: "From assessment through aftercare planning, every layer of treatment is coordinated under one roof.",
    icon: "ri-stack-line",
  },
  {
    num: "03",
    title: "Expert Team",
    desc: "Licensed clinicians and addiction specialists who combine credentials with genuine empathy.",
    icon: "ri-team-line",
  },
  {
    num: "04",
    title: "Personalized Plans",
    desc: "Your plan reflects your substance history, mental health needs, goals, and timeline.",
    icon: "ri-file-list-3-line",
  },
  {
    num: "05",
    title: "Holistic Healing",
    desc: "Surf therapy, music, movement, and time outdoors — restoring the whole person.",
    icon: "ri-leaf-line",
  },
  {
    num: "06",
    title: "Family Support",
    desc: "We educate and involve loved ones with compassion, helping families heal together.",
    icon: "ri-parent-line",
  },
  {
    num: "07",
    title: "Confidential & Safe",
    desc: "A private residential setting in Mission Viejo where dignity and discretion come first.",
    icon: "ri-shield-check-line",
  },
  {
    num: "08",
    title: "Continuous Support",
    desc: "Aftercare resources and alumni community so progress lasts beyond discharge.",
    icon: "ri-loop-left-line",
  },
];

export default function AboutApproachGrid() {
  return (
    <section className="bg-[var(--sr-mist)] py-[100px]">
      <div className="sr-container">
        <AboutSectionHeader
          eyebrow="What Sets Us Apart"
          title={
            <>
              The Sullivan Recovery <em className="italic text-[var(--sr-fern)]">difference</em>
            </>
          }
          description={
            <>
              Our approach to drug and alcohol detox harmonizes medical expertise with a
              profound commitment to each individual&apos;s path toward sobriety.{" "}
              <Link
                href="/addiction-aftercare-program/opioid-detox-orange-county/drug-and-alcohol-detox-mission-viejo/"
                className="font-medium text-[var(--sr-fern)] underline-offset-4 hover:underline"
              >
                Explore our detox program
              </Link>
              .
            </>
          }
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6 lg:items-stretch">
          <div className="relative min-h-[280px] overflow-hidden bg-[var(--sr-moss)] sm:min-h-[340px] lg:col-span-5 lg:min-h-full">
            <Image
              src={STAFF_IMG}
              alt="Sullivan Recovery staff providing compassionate care"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-moss)] via-[var(--sr-moss)]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p
                className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Clinical + Compassionate
              </p>
              <p
                className="max-w-xs text-xl font-light leading-snug text-white md:text-2xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Exceptional staff. Uncommon care.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 border border-[var(--sr-sand)] bg-[var(--sr-sand)] sm:grid-cols-2 lg:col-span-7">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.num}
                className="flex min-h-[180px] flex-col bg-white p-6 transition-colors hover:bg-[var(--sr-parchment)] md:p-7"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span
                    className="text-[11px] font-medium tabular-nums tracking-[0.2em] text-[var(--sr-clay)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {pillar.num}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--sr-sand)] text-[var(--sr-fern)]">
                    <i className={`${pillar.icon} text-base`} aria-hidden />
                  </span>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="mt-auto text-[13px] leading-relaxed text-[var(--sr-muted)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {pillar.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
