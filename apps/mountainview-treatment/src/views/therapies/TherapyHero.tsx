import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export type TherapyHeroProps = {
  image: string;
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  body: string;
  credentials: { icon: string; label: string }[];
};

export default function TherapyHero({
  image,
  eyebrow,
  headline,
  headlineItalic,
  body,
  credentials,
}: TherapyHeroProps) {
  return (
    <section className="relative isolate flex min-h-[85vh] flex-col justify-end overflow-hidden text-white lg:min-h-[780px]">
      <Image
        src={image}
        alt={`Mountain View Treatment — ${headline}`}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[var(--mvt-forest-deep)] via-[var(--mvt-forest-deep)]/70 to-[var(--mvt-forest-deep)]/10"
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 lg:px-12 lg:pb-20 lg:pt-40">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
          {eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl font-heading text-[58px] leading-[1.0] tracking-tight text-white sm:text-[72px] lg:text-[90px]">
          {headline}
          <br />
          <span className="italic text-[var(--mvt-teal-light)]">{headlineItalic}</span>
        </h1>

        <p className="mt-6 max-w-xl text-[16px] leading-7 text-white/75 sm:text-[17px]">
          {body}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={SITE.phone.href}
            className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[var(--mvt-ink)]"
          >
            <i className="ri-phone-fill text-base" aria-hidden="true" />
            {SITE.phone.display}
          </a>
          <Link
            href="/admissions/"
            className="inline-flex items-center gap-2 border border-white/35 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:border-white hover:bg-white/5 hover:text-white"
          >
            Verify Insurance
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-7">
          {credentials.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-[12px] font-medium text-white/55">
              <i className={`${c.icon} text-[var(--mvt-teal-light)] text-[14px]`} aria-hidden="true" />
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
