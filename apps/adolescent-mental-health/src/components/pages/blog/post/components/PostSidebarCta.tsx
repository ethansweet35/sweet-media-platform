import Link from "next/link";
import { SITE } from "@/lib/site";

const TRUST_ITEMS = [
  "Virtual IOP for ages 12–17",
  "Most major insurance accepted",
  "Free confidential consultations",
] as const;

export default function PostSidebarCta() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dark/10 border-l-4 border-l-accent bg-dark p-5">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.12]" aria-hidden />
      <div className="relative flex flex-col gap-4">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Get support</p>
          <p className="text-base font-bold leading-snug text-white" style={{ fontFamily: "var(--font-heebo)" }}>
            Questions about care for your teen?
          </p>
        </div>

        <ul className="flex flex-col gap-2">
          {TRUST_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[11px] leading-snug text-white/65">
              <i className="ri-check-line shrink-0 text-xs text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <a
          href={SITE.phone.href}
          className="flex items-center justify-center gap-2 bg-accent px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-accent-dark"
        >
          <i className="ri-phone-fill text-xs" aria-hidden />
          {SITE.phone.display}
        </a>

        <Link
          href="/verify-insurance"
          className="flex items-center justify-center gap-2 border border-white/20 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65 transition hover:border-white/40 hover:text-white"
        >
          Verify insurance
        </Link>
      </div>
    </div>
  );
}
