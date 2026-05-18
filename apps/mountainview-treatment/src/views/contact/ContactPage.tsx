import Link from "next/link";
import { SITE } from "@/lib/site";
import ContactForm from "@/components/feature/ContactForm";

const INFO_ITEMS = [
  {
    icon: "ri-phone-fill",
    label: "Admissions Line",
    value: SITE.phone.display,
    href: SITE.phone.href,
  },
  {
    icon: "ri-mail-line",
    label: "Email",
    value: SITE.contactEmail,
    href: `mailto:${SITE.contactEmail}`,
  },
  {
    icon: "ri-map-pin-2-line",
    label: "Location",
    value: SITE.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(SITE.address.full)}`,
  },
  {
    icon: "ri-time-line",
    label: "Availability",
    value: SITE.hours,
    href: undefined,
  },
];

const REASSURANCES = [
  "No obligation — just a conversation",
  "Same-day assessments available",
  "Insurance verified at no cost",
  "All inquiries are 100% confidential",
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-[var(--mvt-forest-deep)] text-white">
        {/* Decorative circles */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[var(--mvt-forest)]/40" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[var(--mvt-teal-light)]/8" />

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-24 lg:px-12 lg:pb-28 lg:pt-32">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
              Get In Touch
            </p>
            <h1 className="mt-6 font-heading text-[44px] leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[60px]">
              Take the First{" "}
              <span className="italic text-[var(--mvt-teal-light)]">Step</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75">
              Our admissions team is available around the clock to answer your
              questions, verify your insurance, and help you or your loved one
              begin the path to recovery — with complete confidentiality and
              no pressure.
            </p>

            {/* Reassurance list */}
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {REASSURANCES.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal-light)]/15">
                    <i className="ri-check-line text-[10px] text-[var(--mvt-teal-light)]" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="bg-[var(--mvt-ink)]">
        <div className="mx-auto grid max-w-[1280px] gap-0 px-0 lg:grid-cols-[1fr_420px]">

          {/* Form panel */}
          <div className="px-6 py-16 lg:px-12 lg:py-20">
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-teal-light)]">
              Confidential Inquiry
            </p>
            <ContactForm />
          </div>

          {/* Info panel */}
          <div className="border-t border-white/8 bg-[var(--mvt-forest-deep)] px-8 py-16 lg:border-l lg:border-t-0 lg:px-10 lg:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-teal-light)]">
              Contact Information
            </p>

            <ul className="mt-8 space-y-7">
              {INFO_ITEMS.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal-light)]/10 text-[var(--mvt-teal-light)]">
                    <i className={`${item.icon} text-base`} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-1 block text-sm font-medium text-white/90 hover:text-white"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-white/90">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-10 border-t border-white/8" />

            {/* Insurance CTA */}
            <div>
              <p className="text-sm font-semibold text-white">Verify your insurance</p>
              <p className="mt-1.5 text-xs leading-5 text-white/55">
                We accept most major insurance plans. Our team will confirm your
                benefits at no cost before you commit to anything.
              </p>
              <Link
                href="/admissions/insurance/"
                className="mt-5 inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 transition hover:border-white/50 hover:text-white"
              >
                <i className="ri-shield-check-line text-sm text-[var(--mvt-teal-light)]" aria-hidden="true" />
                Check Insurance Coverage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA strip ── */}
      <section className="bg-[var(--mvt-forest)] py-14">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 px-6 text-center lg:flex-row lg:justify-between lg:px-12 lg:text-left">
          <div>
            <p className="font-heading text-xl font-light text-white sm:text-2xl">
              Need to speak with someone right now?
            </p>
            <p className="mt-1 text-sm text-white/65">
              Our admissions team is available 24 hours a day, 7 days a week.
            </p>
          </div>
          <a
            href={SITE.phone.href}
            className="inline-flex shrink-0 items-center gap-3 bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-cream)]"
          >
            <i className="ri-phone-fill text-base" aria-hidden="true" />
            {SITE.phone.display}
          </a>
        </div>
      </section>
    </>
  );
}
