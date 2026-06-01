import Link from "next/link";
import { CONTAINER, SITE } from "@/lib/site";
import { DOT_GRID_CLASS, SECTION_PY } from "./tokens";

export type TherapyCtaTrustItem = {
  icon: string;
  label: string;
};

type TherapyFinalCtaSectionProps = {
  title: React.ReactNode;
  description: string;
  trustItems: TherapyCtaTrustItem[];
  eyebrow?: string;
};

export default function TherapyFinalCtaSection({
  title,
  description,
  trustItems,
  eyebrow = "Get started today",
}: TherapyFinalCtaSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-dark px-6 ${SECTION_PY} lg:px-10`}>
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
      <div className={`pointer-events-none absolute inset-0 ${DOT_GRID_CLASS} opacity-[0.04]`} aria-hidden />

      <div className={`relative ${CONTAINER} w-full`}>
        <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 shadow-[0_24px_80px_-20px_rgba(10,15,20,0.55)]">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center border-b border-white/8 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-12">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
              <h2
                className="text-3xl font-bold leading-[1.08] text-white md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                {title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-8 text-white/55">{description}</p>
            </div>

            <div className="flex flex-col justify-center bg-white/[0.04] p-6 sm:p-8 lg:p-12">
              <p className="text-sm font-semibold text-white/75">Ready to take the first step?</p>
              <p className="mt-1 text-xs text-white/35">Free, confidential, and no obligation to enroll.</p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={SITE.phone.href}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-white/90"
                >
                  <i className="ri-phone-fill shrink-0 text-accent"></i>
                  <span className="truncate">{SITE.phone.display}</span>
                </a>
                <Link
                  href="/admissions"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  Start Intake
                  <i className="ri-arrow-right-line text-accent"></i>
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/8 pt-6">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <i className={`${item.icon} text-sm text-accent`} aria-hidden />
                    <span className="text-xs leading-snug text-white/45">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
