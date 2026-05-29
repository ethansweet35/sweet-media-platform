import Image from "next/image";
import Link from "next/link";
import {
  BRAND_NAME,
  CONTAINER,
  EMAIL,
  FACILITY_ADDRESS,
  NAV_LOGO_HEIGHT,
  NAV_LOGO_URL,
  NAV_LOGO_WIDTH,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/data/site";

const PROGRAMS = [
  { label: "Partial Hospitalization (PHP)", path: "/php-sober-living" },
  { label: "Intensive Outpatient (IOP)",    path: "/iop-missouri" },
  { label: "Outpatient Program",            path: "/outpatient-rehab-springfield-mo" },
  { label: "Sober Living",                  path: "/sober-living-springfield-mo" },
  { label: "Levels of Care Overview",       path: "/levels-of-care-missouri" },
];

const ADDICTION = [
  { label: "Alcohol Rehab",          path: "/alcohol-rehab-center-in-missouri" },
  { label: "Benzodiazepine Detox",   path: "/benzodiazepine-detox-in-missouri" },
  { label: "Cocaine Detox",          path: "/cocaine-detox-in-missouri" },
  { label: "Fentanyl Rehab",         path: "/fentanyl-rehab-springfield-mo" },
  { label: "Heroin Rehab",           path: "/heroin-rehab-springfield-mo" },
  { label: "Meth Rehab",             path: "/meth-rehab-springfield-mo" },
];

const MENTAL_HEALTH = [
  { label: "Anxiety Treatment",  path: "/anxiety-therapist-springfield-mo-3" },
  { label: "Bipolar Treatment",  path: "/bipolar-treatment-centers-in-missouri-2-2" },
  { label: "Depression Therapy", path: "/depression-therapist-springfield-mo" },
  { label: "OCD Treatment",      path: "/ocd-treatment-in-missouri" },
  { label: "PTSD Counseling",    path: "/ptsd-counseling-springfield-mo" },
  { label: "Trauma Therapy",     path: "/trauma-therapist-springfield-mo-2" },
];

const COMPANY = [
  { label: "About Us",         path: "/about" },
  { label: "Admissions",       path: "/admissions" },
  { label: "Blog",             path: "/blog" },
  { label: "Contact",          path: "/contact" },
  { label: "Resources",        path: "/resources" },
  { label: "Verify Insurance", path: "/verify-insurance" },
];

const TRUST_ITEMS = [
  { icon: "ri-award-line",        label: "Joint Commission Accredited" },
  { icon: "ri-shield-check-line", label: "HIPAA Compliant" },
  { icon: "ri-time-line",         label: "24/7 Admissions" },
  { icon: "ri-computer-line",     label: "Statewide Telehealth" },
];

export default function Footer() {
  return (
    <footer aria-label="Site footer">

      {/* ── MAIN FOOTER BODY ────────────────────────────────────────────────── */}
      <div className="bg-mbh-forest-deep pt-16 pb-10">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">

            {/* Brand column */}
            <div className="flex flex-col gap-7">
              <Link href="/" aria-label={BRAND_NAME}>
                <Image
                  src={NAV_LOGO_URL}
                  alt={BRAND_NAME}
                  width={NAV_LOGO_WIDTH}
                  height={NAV_LOGO_HEIGHT}
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <p className="font-body text-sm leading-relaxed text-white/50 max-w-xs">
                Evidence-based addiction and mental health treatment in Springfield, Missouri. PHP, IOP, and outpatient programs available — in-person and statewide via telehealth.
              </p>

              <div className="space-y-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 group"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15 transition group-hover:bg-mbh-green/25">
                    <i className="ri-phone-fill text-sm text-mbh-sage" aria-hidden />
                  </span>
                  <span className="font-body text-sm font-semibold text-white/80 transition group-hover:text-white">
                    {PHONE_DISPLAY}
                  </span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 group"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15 transition group-hover:bg-mbh-green/25">
                    <i className="ri-mail-line text-sm text-mbh-sage" aria-hidden />
                  </span>
                  <span className="font-body text-sm text-white/50 transition group-hover:text-white/80">
                    {EMAIL}
                  </span>
                </a>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15">
                    <i className="ri-map-pin-2-line text-sm text-mbh-sage" aria-hidden />
                  </span>
                  <span className="font-body text-sm leading-snug text-white/50 pt-1.5">
                    {FACILITY_ADDRESS}
                  </span>
                </div>
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage/80 mb-5">
                Programs
              </h3>
              <ul className="space-y-3">
                {PROGRAMS.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="flex items-center gap-2 font-body text-sm text-white/50 transition hover:text-white"
                    >
                      <i className="ri-arrow-right-s-line text-mbh-sage/40 shrink-0" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage/80 mt-9 mb-5">
                Company
              </h3>
              <ul className="space-y-3">
                {COMPANY.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="flex items-center gap-2 font-body text-sm text-white/50 transition hover:text-white"
                    >
                      <i className="ri-arrow-right-s-line text-mbh-sage/40 shrink-0" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Addiction */}
            <div>
              <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage/80 mb-5">
                Addiction Treatment
              </h3>
              <ul className="space-y-3">
                {ADDICTION.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="flex items-center gap-2 font-body text-sm text-white/50 transition hover:text-white"
                    >
                      <i className="ri-arrow-right-s-line text-mbh-sage/40 shrink-0" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mental Health */}
            <div>
              <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage/80 mb-5">
                Mental Health
              </h3>
              <ul className="space-y-3">
                {MENTAL_HEALTH.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="flex items-center gap-2 font-body text-sm text-white/50 transition hover:text-white"
                    >
                      <i className="ri-arrow-right-s-line text-mbh-sage/40 shrink-0" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Inline CTA card */}
              <div className="mt-9 rounded-2xl border border-white/8 bg-mbh-green/10 p-5">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-sage">
                  Free Consultation
                </p>
                <p className="mt-1.5 font-display text-sm font-semibold text-white leading-snug">
                  Speak with an admissions coordinator today.
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-mbh-green py-2.5 font-body text-xs font-semibold text-white transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-phone-fill" aria-hidden /> Call 24/7
                </a>
              </div>
            </div>
          </div>

          {/* ── TRUST STRIP ───────────────────────────────────────────────────── */}
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/8 pt-8">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <i className={`${item.icon} text-mbh-sage/60 text-sm`} aria-hidden />
                <span className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-white/30">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── BOTTOM BAR ────────────────────────────────────────────────────── */}
          <div className="mt-6 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-body text-xs text-white/25">
                © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
              </p>
              <p className="mt-1.5 font-body text-[11px] leading-relaxed text-white/18 max-w-2xl">
                Missouri Behavioral Health provides outpatient mental health and substance use disorder treatment. Content on this site is for informational purposes only and does not constitute medical advice. If you are experiencing a medical emergency, call 911.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              {[
                { label: "Privacy Policy",    path: "/privacy-policy" },
                { label: "Terms of Use",      path: "/terms" },
                { label: "Accessibility",     path: "/accessibility" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="font-body text-xs text-white/25 transition hover:text-white/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
