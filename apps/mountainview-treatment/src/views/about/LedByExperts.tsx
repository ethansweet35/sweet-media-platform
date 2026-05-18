import Image from "next/image";
import { SITE } from "@/lib/site";

const TANNER_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/Tanner-Monstad.webp";

const BULLETS = [
  "Compassionate care coordinators guiding your long-term recovery",
  "Licensed therapists specializing in trauma & addiction",
  "Holistic wellness practitioners for whole-person care",
];

export default function LedByExperts() {
  return (
    <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12 lg:py-24">
        {/* Copy */}
        <div className="self-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Our Story
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-[1.05] tracking-tight text-[var(--mvt-ink)] sm:text-5xl lg:text-[56px]">
            Led By <br />
            <span className="italic">Compassionate Experts</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--mvt-text)]">
            Our multidisciplinary team includes board-certified physicians,
            licensed therapists, addiction specialists, and wellness
            professionals&mdash;all dedicated to your recovery journey. Rather
            than a one-size-fits-all approach, our clinical team collaborates
            daily to tailor your treatment plan, ensuring your unique physical,
            mental, and emotional needs are met at every stage.
          </p>

          <ul className="mt-8 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14px] leading-6">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)] text-white">
                  <i className="ri-check-line text-xs" aria-hidden="true" />
                </span>
                <span className="text-[var(--mvt-text)]">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill text-base" aria-hidden="true" />
              {SITE.phone.display}
            </a>
          </div>
        </div>

        {/* Tanner card */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--mvt-ink)] lg:max-w-[440px] lg:justify-self-end">
          <Image
            src={TANNER_IMG}
            alt="Tanner Monstad, Founder and CEO of Mountain View Treatment"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 440px, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white">
            <h3 className="font-heading text-[30px] leading-tight">
              Tanner Monstad
            </h3>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85">
              Founder / CEO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
