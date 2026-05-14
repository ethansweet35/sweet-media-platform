import Image from "next/image";

const STATS = [
  { value: "300+", label: "Sunny Days" },
  { value: "15 min", label: "From SeaTac" },
  { value: "Year-Round", label: "Programming" },
  { value: "World-Class", label: "Clinical Team" },
];

const LOCATIONS = [
  {
    title: "The Green River Trail & Interurban Trail",
    body:
      "Miles of riverside trails minutes from our doors — therapeutic movement, nature connection, and grounding for the body in early recovery.",
    img: "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/The-Green-River-Trail-Interurban-Trail.webp",
  },
  {
    title: "Kubota Garden",
    body:
      "A 20-acre Japanese garden of meditative stone paths, koi ponds, and quiet contemplation — used for mindfulness practice integration.",
    img: "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/kubota-garden.webp",
  },
  {
    title: "The Museum of Flight",
    body:
      "Cultural and historical immersion paired with our community reintegration outings — restoring curiosity and purpose alongside recovery.",
    img: "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/museum-of-flight.webp",
  },
  {
    title: "iFLY Seattle (Indoor Skydiving)",
    body:
      "Adventure-based therapy that builds resilience, confidence, and healthy risk tolerance — the kind of new neuropathways that anchor recovery.",
    img: "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/ifly-seattle.webp",
  },
];

export default function PacificNorthwestSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--mvt-ink)] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <Image
          src="https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/The-Green-River-Trail-Interurban-Trail.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--mvt-ink)]/85 via-[var(--mvt-ink)]/70 to-[var(--mvt-ink)]/95" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mvt-eyebrow-light">The Seattle Experience</p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Healing in the <span className="italic text-[var(--mvt-cream)]">Heart</span> of the Pacific Northwest.
            </h2>
          </div>
          <p className="max-w-xl self-end text-base leading-7 text-white/75">
            Recovery is enriched by connection to place. Seattle offers a unique
            blend of natural beauty, cultural richness, and therapeutic
            environments that complement your healing journey.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-[var(--mvt-ink)]/85 px-6 py-7 text-center backdrop-blur"
            >
              <div className="font-heading text-4xl text-[var(--mvt-cream)] sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/65">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Locations grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <article
              key={loc.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={loc.img}
                  alt={loc.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--mvt-ink)]/80 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-2xl text-white">{loc.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{loc.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
