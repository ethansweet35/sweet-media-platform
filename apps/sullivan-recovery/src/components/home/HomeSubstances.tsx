import Link from "next/link";
import CallNowLink from "@/components/ui/CallNowLink";

const SUBSTANCES = [
  {
    icon: "ri-goblet-line",
    title: "Alcohol",
    desc: "Medically supervised tapering to safely manage tremors, anxiety, and the risk of life-threatening withdrawal.",
    href: "/detox-alcohol-near-me/",
  },
  {
    icon: "ri-capsule-line",
    title: "Fentanyl",
    desc: "Close medical supervision with buprenorphine or methadone support to manage this potent opioid's withdrawal.",
    href: "/addiction-aftercare-program/opioid-detox-orange-county/fentanyl-detox-near-me/",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Opioids",
    desc: "Medication-assisted treatment alongside holistic therapy to address both physical dependency and the psychological pull.",
    href: "/addiction-aftercare-program/opioid-detox-orange-county/",
  },
  {
    icon: "ri-mental-health-line",
    title: "Cocaine",
    desc: "Behavioral therapy and support groups to break through fatigue, depression, and intense psychological cravings.",
    href: "/addiction-aftercare-program/opioid-detox-orange-county/cocaine-detox-center-california/",
  },
  {
    icon: "ri-first-aid-kit-line",
    title: "Benzodiazepines",
    desc: "Gradual tapering under 24/7 supervision — critical for preventing seizures and severe anxiety during detox.",
    href: "/addiction-aftercare-program/opioid-detox-orange-county/benzo-detox-orange-county/",
  },
  {
    icon: "ri-fire-line",
    title: "Meth",
    desc: "Targeted behavioral therapy and support groups to address intense cravings, depression, and prolonged fatigue.",
    href: "/addiction-aftercare-program/opioid-detox-orange-county/meth-detox-mission-viejo/",
  },
  {
    icon: "ri-medicine-bottle-line",
    title: "Suboxone",
    desc: "Supervised tapering off the medication while rebuilding coping skills for long-term opioid-free living.",
    href: "/addiction-aftercare-program/opioid-detox-orange-county/suboxone-detox-centers-near-me/",
  },
  {
    icon: "ri-drop-line",
    title: "Depressants",
    desc: "Medical oversight throughout with medications to prevent seizures and manage anxiety safely.",
    href: "/general-detox/",
  },
];

export default function HomeSubstances() {
  return (
    <section className="bg-[var(--sr-parchment)] pb-[100px] pt-0">
      <div className="sr-container">

        {/* Divider from HomeAbout */}
        <div className="mb-14 border-t border-[var(--sr-sand)] pt-14">
          <p className="sr-eyebrow mb-4">What We Treat</p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Substance abuse <br />
              <span className="italic text-[var(--sr-fern)]">we treat</span>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed text-[var(--sr-body)] md:pb-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Every substance has a unique withdrawal profile.
              Our medical team specializes in all of them — safe, evidence-based detox tailored to you.
            </p>
          </div>
        </div>

        {/* Two-column list */}
        <div className="grid grid-cols-1 gap-0 border-t border-[var(--sr-sand)] md:grid-cols-2 md:divide-x md:divide-[var(--sr-sand)]">
          {/* Left column */}
          <div className="flex flex-col divide-y divide-[var(--sr-sand)]">
            {SUBSTANCES.slice(0, 4).map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="group flex items-start gap-5 px-0 py-8 pr-10 transition-colors duration-200 hover:bg-[var(--sr-linen)] md:px-8"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--sr-linen)] text-[var(--sr-fern)] transition-colors duration-200 group-hover:bg-[var(--sr-moss)] group-hover:text-white">
                  <i className={`${s.icon} text-lg`} />
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 flex items-center justify-between">
                    <h3
                      className="text-2xl font-light text-[var(--sr-ink)] transition-colors duration-200 group-hover:text-[var(--sr-moss)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {s.title}
                    </h3>
                    <i className="ri-arrow-right-up-line text-sm text-[var(--sr-subtle)] transition-colors duration-200 group-hover:text-[var(--sr-fern)]" />
                  </div>
                  <p
                    className="text-[13px] leading-relaxed text-[var(--sr-muted)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col divide-y divide-[var(--sr-sand)]">
            {SUBSTANCES.slice(4).map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="group flex items-start gap-5 px-0 py-8 pr-10 transition-colors duration-200 hover:bg-[var(--sr-linen)] md:px-8"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--sr-linen)] text-[var(--sr-fern)] transition-colors duration-200 group-hover:bg-[var(--sr-moss)] group-hover:text-white">
                  <i className={`${s.icon} text-lg`} />
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 flex items-center justify-between">
                    <h3
                      className="text-2xl font-light text-[var(--sr-ink)] transition-colors duration-200 group-hover:text-[var(--sr-moss)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {s.title}
                    </h3>
                    <i className="ri-arrow-right-up-line text-sm text-[var(--sr-subtle)] transition-colors duration-200 group-hover:text-[var(--sr-fern)]" />
                  </div>
                  <p
                    className="text-[13px] leading-relaxed text-[var(--sr-muted)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--sr-sand)] pt-8 sm:flex-row sm:items-center">
          <p
            className="text-lg italic text-[var(--sr-body)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Not sure if we treat your situation? Call us — we'll help.
          </p>
          <CallNowLink
            className="sr-btn-primary shrink-0"
            withPrefixOnDesktop
          />
        </div>

      </div>
    </section>
  );
}
