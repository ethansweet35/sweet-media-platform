import Image from "next/image";
import Link from "next/link";

const BASE = "https://uivbbrwuaffqujzkqjvr.supabase.co/storage/v1/object/public/site-assets/images";

const tiles = [
  {
    type: "image" as const,
    img: `${BASE}/rize_env_suite.jpg`,
    category: "Accommodations",
    title: "Private Ocean-View Suites",
    desc: "Organic linens, en-suite baths, and unobstructed coastal views.",
    col: "lg:col-span-2",
    row: "lg:row-span-2",
    h: "h-[300px] lg:h-auto",
  },
  {
    type: "image" as const,
    img: `${BASE}/rize_env_culinary.jpg`,
    category: "Nutrition",
    title: "Executive Culinary Program",
    desc: "Private chefs preparing neuro-nutritional meals daily.",
    col: "",
    row: "",
    h: "h-[220px]",
  },
  {
    type: "image" as const,
    img: `${BASE}/rize_env_yoga.jpg`,
    category: "Wellness",
    title: "Ocean-View Yoga",
    desc: "Morning yoga and breathwork overlooking the Pacific.",
    col: "",
    row: "",
    h: "h-[220px]",
  },
  {
    type: "image" as const,
    img: `${BASE}/rize_env_equine.jpg`,
    category: "Experiential",
    title: "Equine Therapy",
    desc: "Non-verbal healing through connection with horses.",
    col: "",
    row: "",
    h: "h-[220px]",
  },
  {
    type: "image" as const,
    img: `${BASE}/rize_env_workspace.jpg`,
    category: "Amenities",
    title: "Executive Connectivity",
    desc: "Private workspaces for those maintaining professional duties.",
    col: "",
    row: "",
    h: "h-[220px]",
  },
];

export default function EnvironmentSection() {
  return (
    <section className="bg-ink py-[75px] lg:py-[100px]">
      <div className="mx-auto max-w-[1300px] w-full px-[30px] lg:px-6">

        {/* Mosaic — header tile + 5 image tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          {/* Header tile */}
          <div className="col-span-2 lg:col-span-2 lg:row-span-2 bg-white/5 border border-white/10 p-10 lg:p-14 flex flex-col justify-between min-h-[300px] lg:min-h-0">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent mb-6 block">
                The Environment
              </span>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-white leading-[1.05]"
                style={{ fontSize: "clamp(40px, 4.5vw, 58px)" }}
              >
                An Architecture<br />
                <em className="italic text-white/50">Of Peace</em>
              </h2>
            </div>
            <div>
              <p className="text-[15px] font-light leading-relaxed text-white/55 mb-8 max-w-xs">
                Clinical excellence and genuine luxury — not trade-offs, but the same standard. Orange County, California.
              </p>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-ink transition-all duration-300"
              >
                Begin Admissions <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          {/* Featured suite — large 2×2 */}
          <div className="relative col-span-2 row-span-2 overflow-hidden group min-h-[440px]">
            <Image
              src={tiles[0].img}
              alt={tiles[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent/80 mb-2 block">{tiles[0].category}</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl text-white mb-2 leading-snug">{tiles[0].title}</h3>
              <p className="text-sm font-light text-white/65 max-w-xs">{tiles[0].desc}</p>
            </div>
          </div>

          {/* 4 smaller image tiles */}
          {tiles.slice(1).map((t) => (
            <div key={t.title} className="relative overflow-hidden group h-[220px]">
              <Image
                src={t.img}
                alt={t.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-accent/80 mb-1.5 block">{t.category}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-white leading-snug">{t.title}</h3>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
