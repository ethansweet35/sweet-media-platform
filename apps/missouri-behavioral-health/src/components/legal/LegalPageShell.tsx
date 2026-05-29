import Link from "next/link";
import { CONTAINER, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

interface LegalPageShellProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  children: React.ReactNode;
}

export default function LegalPageShell({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: LegalPageShellProps) {
  return (
    <main className="bg-cream">
      <section className="bg-mbh-forest-deep py-14 text-white lg:py-16">
        <div className={CONTAINER}>
          <nav
            className="mb-6 flex items-center gap-2 font-body text-[11px] text-white/40"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <i className="ri-arrow-right-s-line" aria-hidden />
            <span className="text-white/60">{title}</span>
          </nav>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-mbh-sage" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
              {eyebrow}
            </span>
          </div>
          <h1
            className="font-display font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {title}
          </h1>
          <p className="mt-4 font-body text-[11px] uppercase tracking-[0.18em] text-white/40">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-[72px]">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 font-body text-lg leading-relaxed text-mbh-body">{intro}</p>
            <div className="prose-mbh">{children}</div>

            <div className="mt-12 rounded-2xl border border-mbh-forest/10 bg-white p-6">
              <p className="font-display text-base font-semibold text-mbh-forest">Questions?</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">
                Contact Missouri Behavioral Health at{" "}
                <a href={`mailto:${EMAIL}`} className="font-semibold text-mbh-green hover:underline">
                  {EMAIL}
                </a>{" "}
                or call{" "}
                <a href={PHONE_HREF} className="font-semibold text-mbh-green hover:underline">
                  {PHONE_DISPLAY}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
