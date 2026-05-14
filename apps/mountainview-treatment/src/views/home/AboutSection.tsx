import Image from "next/image";
import Link from "next/link";

const PILLARS = [
  {
    n: "01",
    label: "Bespoke Care",
    body:
      "Tailored programs addressing dual diagnosis and underlying trauma with unparalleled clinical precision.",
  },
  {
    n: "02",
    label: "Absolute Privacy",
    body:
      "Our Pacific Northwest office provides a secure, discreet environment where you can focus on healing with total peace of mind.",
  },
  {
    n: "03",
    label: "Holistic Healing",
    body:
      "Merging world-class medical expertise with advanced, restorative wellness practices.",
  },
];

const STOREFRONT_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/Mountain-View-Treatment-Store-Front-Photo-1.webp";

export default function AboutSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-12 lg:py-28">
        {/* Image */}
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={STOREFRONT_IMG}
            alt="Mountain View Health office in Seattle, Washington"
            width={1100}
            height={1320}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 540px, 100vw"
            priority
          />
        </div>

        {/* Copy */}
        <div className="self-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            About Us
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-[1.08] tracking-tight text-[var(--mvt-ink)] sm:text-5xl lg:text-[56px]">
            Drug Rehab in Seattle, Washington
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--mvt-text)]">
            Mountainview focuses on you. Designed for the client by those who
            understand what it means to be a client, this experienced
            organization knows recovery.
          </p>

          <dl className="mt-10 space-y-8">
            {PILLARS.map((p) => (
              <div key={p.n} className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-1.5">
                <span className="row-span-2 font-heading text-3xl font-light leading-none text-[var(--mvt-ink)] sm:text-4xl">
                  {p.n}
                </span>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--mvt-ink)]">
                  {p.label}
                </dt>
                <dd className="max-w-md text-sm leading-7 text-[var(--mvt-text)]">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <Link
              href="/about-us/"
              className="inline-flex items-center gap-3 border-b border-[var(--mvt-ink)] pb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)] hover:gap-4 hover:border-[var(--mvt-forest)]"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
