import { ADMISSIONS_PHONE, VERIFY_INSURANCE_HREF } from "./content";

const linkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 transition hover:text-terracotta hover:underline";

/** Scroll-to-form CTA — stays on the landing page. */
export function LpVerifyCta({ label }: { label: string }) {
  return (
    <a href={VERIFY_INSURANCE_HREF} className={`mt-8 ${linkClass}`}>
      {label}
      <i className="ri-arrow-down-line text-base" />
    </a>
  );
}

export function LpInlineCta({ label = "Verify Insurance" }: { label?: string }) {
  return (
    <a href={VERIFY_INSURANCE_HREF} className={linkClass}>
      {label}
      <i className="ri-arrow-down-line" />
    </a>
  );
}

export function LpCallCta({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={ADMISSIONS_PHONE}
      className={`inline-flex items-center gap-2 bg-terracotta px-8 py-4 text-sm font-semibold text-white transition hover:bg-terracotta-light ${className}`.trim()}
    >
      <i className="ri-phone-line" />
      {label}
    </a>
  );
}
