import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const STOREFRONT_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/Mountain-View-Treatment-Store-Front-Photo-1.webp";

export default function AboutHero() {
  return (
    <section className="bg-[var(--mvt-forest-deep)] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-12 lg:py-24">
        {/* Copy */}
        <div className="self-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-white/85" />
            Our Story
          </p>
          <h1 className="mt-6 font-heading text-[44px] leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[64px]">
            Transforming Lives <span className="italic">Since 2021.</span>
          </h1>
          <div className="mt-7 max-w-xl space-y-4 text-base leading-7 text-white/85">
            <p>
              Mountainview focuses on you. Designed for the client by those who
              understand what it means to be a client, this experienced
              organization knows recovery. It recognizes that sobriety does not
              impact any one person the same because addiction does not follow
              any one set of rules, so treatment shouldn&rsquo;t either.
            </p>
            <p>
              Born and raised in Washington, the founder has been determined to
              help the recovery community in this state by creating a place
              that feels like home for all to get sober. Mountain View Treatment is
              that place.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill text-base" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 bg-white px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] hover:bg-[var(--mvt-cream)]"
            >
              Verify Insurance
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:max-w-[460px] lg:justify-self-end">
          <Image
            src={STOREFRONT_IMG}
            alt="Mountain View Treatment office in Seattle, Washington"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 460px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
