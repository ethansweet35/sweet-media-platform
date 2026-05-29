import Link from "next/link";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

/**
 * Section 11 — Bottom CTA
 * Design: dark forest bg with forest.png (real WP image) as a subtle right-side accent.
 * Full-width closing band — headline + two CTAs + trust micro-copy.
 */

export default function HomeBottomCta() {
  return (
    <section className="relative overflow-hidden bg-mbh-forest py-[100px]">
      {/* Subtle right-edge photo accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-15"
        style={{
          backgroundImage:
            "url('https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/mbh_cta_forest.png')",
          backgroundSize: "cover",
          backgroundPosition: "left center",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(30,80,39,1) 35%, transparent 100%)" }}
      />

      <div className={`${CONTAINER} relative z-10`}>
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-white/40" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
              Need Help?
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-white">
            Get help now.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-white/70">
            Admission coordinators are available 24 hours a day, 7 days a week. Your call is
            100% confidential and HIPAA-compliant. Take the first step — we&apos;ll guide you
            through the rest.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl shadow-black/20 transition hover:bg-mbh-mint hover:text-mbh-forest-deep"
            >
              <i className="ri-phone-fill" aria-hidden />
              Call Now — {PHONE_DISPLAY}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 font-body text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/10"
            >
              Contact us online
            </Link>
          </div>

          <p className="mt-6 font-body text-xs text-white/40">
            We do not accept Medicaid or Medicare. Private insurance and private pay accepted.
          </p>
        </div>
      </div>
    </section>
  );
}
