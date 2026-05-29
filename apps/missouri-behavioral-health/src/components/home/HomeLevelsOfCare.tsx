import Link from "next/link";
import { CONTAINER } from "@/data/site";

/**
 * Section 3 — Levels of Care
 * Design: dark forest background, 6-card grid.
 * Each card: icon + number + name + description + link.
 * Cards alternate subtle surface tints for depth without a border.
 */

const PROGRAMS = [
  {
    num: "01",
    icon: "ri-hospital-line",
    name: "Partial Hospitalization Program",
    abbr: "PHP",
    body: "A 5–7 day per week program providing structured therapy and medical support while allowing you to return home each evening.",
    href: "/php-sober-living",
  },
  {
    num: "02",
    icon: "ri-community-line",
    name: "Intensive Outpatient Program",
    abbr: "IOP",
    body: "A 9–15 hour per week program with therapy, counseling, and support — designed for those transitioning from higher levels of care.",
    href: "/iop-missouri",
  },
  {
    num: "03",
    icon: "ri-calendar-check-line",
    name: "Outpatient Program",
    abbr: "OP",
    body: "Flexible weekly therapy sessions, medication management, and relapse prevention for ongoing recovery support.",
    href: "/outpatient-rehab-springfield-mo",
  },
  {
    num: "04",
    icon: "ri-computer-line",
    name: "Virtual Outpatient",
    abbr: "Telehealth",
    body: "Online therapy programs to address mental health and addiction disorders from the comfort of your own home, statewide.",
    href: "/services",
  },
  {
    num: "05",
    icon: "ri-home-heart-line",
    name: "Sober Living Homes",
    abbr: "Housing",
    body: "A drug and alcohol-free living environment with peer support and structure for individuals in early recovery.",
    href: "/sober-living-springfield-mo",
  },
  {
    num: "06",
    icon: "ri-group-line",
    name: "Aftercare & Support Groups",
    abbr: "Aftercare",
    body: "Long-term recovery support including 12-step meetings, peer support groups, and relapse prevention planning.",
    href: "/services",
  },
] as const;

export default function HomeLevelsOfCare() {
  return (
    <section className="bg-mbh-forest-deep py-[100px]">
      <div className={CONTAINER}>

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Levels of Care
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-white">
              Treatment programs for<br className="hidden sm:block" /> mental health &amp; addiction.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 font-body text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            View all programs
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((prog, i) => (
            <Link
              key={prog.abbr}
              href={prog.href}
              className={`group flex flex-col gap-4 p-7 transition-colors hover:bg-white/6 lg:p-8 ${
                i % 2 === 0 ? "bg-mbh-forest-deep/60" : "bg-white/3"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/15">
                  <i className={`${prog.icon} text-xl text-mbh-sage`} aria-hidden />
                </span>
                <span className="font-body text-[11px] font-semibold tabular-nums text-white/25">
                  {prog.num}
                </span>
              </div>
              <div>
                <div className="mb-0.5 font-body text-[11px] font-semibold uppercase tracking-widest text-mbh-sage">
                  {prog.abbr}
                </div>
                <p className="font-display text-[1.05rem] font-semibold leading-snug text-white">
                  {prog.name}
                </p>
                <p className="mt-2.5 font-body text-sm leading-relaxed text-white/55">
                  {prog.body}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-sage opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <i className="ri-arrow-right-line" aria-hidden />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
