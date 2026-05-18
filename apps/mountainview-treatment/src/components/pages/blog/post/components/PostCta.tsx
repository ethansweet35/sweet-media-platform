import Link from "next/link";
import { SITE } from "@/lib/site";

export default function PostCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--mvt-ink)] py-16 md:py-24">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--mvt-teal)]/20 blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[var(--mvt-teal-light)]/10 blur-[60px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Left: text */}
          <div>
            <p className="mvt-eyebrow-light mb-4 text-xs tracking-[0.2em]">
              TAKE THE NEXT STEP
            </p>
            <h2 className="font-heading max-w-xl text-3xl font-bold leading-snug text-white md:text-4xl">
              Recovery starts with a single, confidential conversation.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">
              Our admissions concierge is available 24 hours a day. We can verify your insurance,
              answer every question, and have you admitted — often within 24 hours.
            </p>

            {/* Trust strip */}
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              {[
                { icon: "ri-shield-check-line", label: "HIPAA Protected" },
                { icon: "ri-time-line", label: "Available 24/7" },
                { icon: "ri-secure-payment-line", label: "Most Insurance Accepted" },
              ].map((t) => (
                <span key={t.label} className="flex items-center gap-2 text-xs font-semibold text-[var(--mvt-teal-light)]">
                  <i className={`${t.icon} text-sm`} />
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col gap-3 lg:min-w-[220px]">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--mvt-teal-light)] px-7 py-4 text-sm font-semibold text-[var(--mvt-ink)] transition hover:opacity-90"
            >
              <i className="ri-phone-fill" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
            >
              Verify Insurance
            </Link>
            <Link
              href="/blog/"
              className="mt-1 text-center text-xs font-semibold text-white/40 transition hover:text-white/70"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
