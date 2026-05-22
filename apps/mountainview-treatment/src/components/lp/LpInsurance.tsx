import { SITE } from "@/lib/site";

const PROVIDERS = [
  { name: "Cigna", href: "/admissions/insurance/cigna" },
  { name: "Aetna", href: "/admissions/insurance/aetna" },
  { name: "Anthem", href: "/admissions/insurance/anthem" },
  { name: "United Health", href: "/admissions/insurance/uhc" },
  { name: "Regence BlueCross", href: "/admissions/insurance" },
  { name: "Premera Blue Cross", href: "/admissions/insurance" },
  { name: "Tricare", href: "/admissions/insurance/tricare" },
  { name: "Kaiser Permanente", href: "/admissions/insurance" },
];

export default function LpInsurance() {
  return (
    <section id="insurance" className="bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

          <div>
            <p className="mvt-eyebrow mb-4">Insurance &amp; Coverage</p>
            <h2
              className="font-heading font-light text-[var(--mvt-ink)] mb-6"
              style={{ fontSize: "clamp(26px, 2.8vw, 44px)", lineHeight: 1.1 }}
            >
              We Work With<br />
              <em className="italic text-[var(--mvt-muted)]">Most Major Insurers</em>
            </h2>
            <div className="w-12 h-[2px] bg-[var(--mvt-forest)] mb-6" />
            <p className="text-base font-light leading-relaxed text-[var(--mvt-muted)] mb-8">
              Mountain View Treatment accepts most major PPO insurance plans. Our financial advocates verify your benefits directly with your insurer — so you know exactly what&apos;s covered before you begin.
            </p>
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-2 bg-[var(--mvt-forest)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:opacity-90 transition-opacity"
            >
              <i className="ri-phone-fill text-xs" aria-hidden="true" />
              Call to Verify — {SITE.phone.display}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {PROVIDERS.map((provider) => (
              <a
                key={provider.name}
                href={provider.href}
                className="flex items-center gap-3 border border-[var(--mvt-cream-2)] bg-[var(--mvt-cream)] px-5 py-4 hover:border-[var(--mvt-forest)]/30 hover:bg-white transition-colors duration-200 group"
              >
                <i className="ri-checkbox-circle-line text-[var(--mvt-forest)] text-sm shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-[var(--mvt-text)] group-hover:text-[var(--mvt-ink)] transition-colors">
                  {provider.name}
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
