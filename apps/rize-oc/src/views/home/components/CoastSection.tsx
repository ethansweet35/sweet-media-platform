import Image from "next/image";
import Link from "next/link";

const BASE =
  "https://uivbbrwuaffqujzkqjvr.supabase.co/storage/v1/object/public/site-assets/images";

const features = [
  {
    icon: "ri-water-flash-line",
    label: "Nature & Outdoors",
    items: [
      "Zuma Beach Access (2 miles)",
      "Santa Monica Mountains Hiking",
      "Surfing & Paddleboarding",
    ],
  },
  {
    icon: "ri-group-line",
    label: "Recovery Community",
    items: [
      "Malibu Recovery Fellowships",
      "Rize Active Alumni Network",
      "Local Volunteer Opportunities",
    ],
  },
  {
    icon: "ri-flight-takeoff-line",
    label: "Travel & Logistics",
    items: [
      "45 minutes from LAX",
      "60 minutes from Burbank (BUR)",
      "Private car service for all arrivals",
    ],
  },
];

const stats = [
  { value: "2 mi", label: "To nearest beach" },
  { value: "360°", label: "Ocean views" },
  { value: "45 min", label: "From LAX" },
];

export default function CoastSection() {
  return (
    <section className="bg-[#F5F0E8] overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1fr] min-h-[560px]">
        {/* Left: content panel — flex justify-end so inner max-w tracks the 1300px container boundary */}
        <div className="flex lg:justify-end">
        <div className="w-full lg:max-w-[650px] flex flex-col justify-center px-[30px] py-[75px] lg:pl-6 lg:pr-14 lg:py-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent mb-5 block">
            Connected to the Coast
          </span>

          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.04] mb-5"
            style={{ fontSize: "clamp(34px, 3.4vw, 48px)" }}
          >
            Where Recovery
            <br />
            <em className="italic text-ink/40">Meets the Ocean</em>
          </h2>

          <p className="text-[14px] font-light leading-relaxed text-ink/60 max-w-[340px] mb-8">
            Recovery does not happen in a vacuum. We harness the rich,
            recovery-focused culture of Southern California to build a vibrant
            foundation for your life after treatment.
          </p>

          {/* Feature groups — stacked on mobile, 3-column on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-5 mb-8">
            {features.map((f) => (
              <div key={f.label}>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/6 border border-ink/10 text-accent mb-3">
                  <i className={`${f.icon} text-sm`} />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/60 mb-2">
                  {f.label}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className="text-[12.5px] font-light text-ink/50 flex items-start gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0 mt-[5px]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href="/location"
            className="inline-flex items-center gap-2.5 bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-ink/80 transition-colors duration-300 self-start"
          >
            View Location <i className="ri-map-pin-2-line" />
          </Link>
        </div>
        </div>

        {/* Right: coastal image */}
        <div className="relative min-h-[480px] lg:min-h-0">
          <Image
            src={`${BASE}/rize_coast_hero.jpg`}
            alt="Aerial view of the Southern California coastline near Orange County at golden hour"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Left-edge fade into cream panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] via-[#F5F0E8]/10 to-transparent pointer-events-none" />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Floating stat cards */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/90 backdrop-blur-sm px-5 py-3 text-right shadow-lg"
              >
                <p
                  className="font-[family-name:var(--font-display)] text-ink leading-none mb-0.5"
                  style={{ fontSize: "clamp(22px, 2.5vw, 28px)" }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
