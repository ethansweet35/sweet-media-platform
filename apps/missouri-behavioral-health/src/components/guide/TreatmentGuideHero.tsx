import Link from "next/link";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import { INSURANCE_GUIDES } from "@/data/treatmentGuides";

/**
 * Guide hub hero — dark "coverage index" (distinct from cream therapy heroes and LOC photo heroes).
 */
export default function TreatmentGuideHero() {
  return (
    <section className="relative overflow-hidden bg-mbh-forest-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 48px, rgba(255,255,255,0.03) 48px, rgba(255,255,255,0.03) 49px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-mbh-green/15 blur-3xl"
      />

      <div className={`${CONTAINER} relative py-16 lg:py-24`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <nav
              className="mb-6 flex flex-wrap items-center gap-2 font-body text-[11px] text-white/40"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition hover:text-white/70">
                Home
              </Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <span className="text-white/60">Treatment Guide</span>
            </nav>

            <p className="mb-4 font-body text-[10px] font-bold uppercase tracking-[0.34em] text-mbh-sage">
              Insurance &amp; coverage
            </p>
            <h1
              className="font-display font-semibold leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.35rem, 5vw, 3.75rem)" }}
            >
              Treatment guide for{" "}
              <span className="italic text-mbh-mint">Missouri families.</span>
            </h1>
            <p className="mt-5 max-w-xl font-body text-[0.9375rem] leading-relaxed text-white/60">
              Plain-language guides to how major insurance plans cover addiction and mental health
              treatment at Missouri Behavioral Health — plus a free, confidential benefits check
              before you start care.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/25 transition hover:bg-mbh-green-hover"
              >
                <i className="ri-shield-check-line" aria-hidden />
                Verify your insurance
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-white/22 px-7 py-3.5 font-body text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/8"
              >
                <i className="ri-phone-fill" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-6">
              {[
                { value: String(INSURANCE_GUIDES.length), label: "Carrier guides" },
                { value: "Free", label: "Benefits verification" },
                { value: "24/7", label: "Admissions support" },
              ].map((s) => (
                <div key={s.label} className="px-3 text-center first:pl-0 last:pr-0 sm:px-5">
                  <p className="font-display text-[clamp(1.25rem,2vw,1.65rem)] font-semibold text-white">
                    {s.value}
                  </p>
                  <p className="mt-0.5 font-body text-[10px] uppercase tracking-[0.14em] text-white/40">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live index of carriers (not a floating overlay card) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
              <p className="font-body text-[9px] font-bold uppercase tracking-[0.32em] text-mbh-sage">
                Coverage index
              </p>
              <ul className="mt-4 space-y-0 divide-y divide-white/8">
                {INSURANCE_GUIDES.map((g, i) => (
                  <li key={g.path}>
                    <Link
                      href={g.path}
                      className="group flex items-center gap-3 py-3.5 transition hover:pl-1"
                    >
                      <span className="font-display text-xs font-semibold tabular-nums text-mbh-sage/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-sm font-semibold text-white transition group-hover:text-mbh-mint">
                          {g.carrier}
                        </span>
                        <span className="block truncate font-body text-[11px] text-white/40">
                          {g.title}
                        </span>
                      </span>
                      <i
                        className="ri-arrow-right-line shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-mbh-mint"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
