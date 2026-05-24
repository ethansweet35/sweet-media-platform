import Image from "next/image";
import Link from "next/link";

const BASE =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images";

// Intentionally varied sizes for a masonry/editorial feel
const PHOTOS = [
  { src: `${BASE}/sr_facility_1.png`, alt: "Facility courtyard", span: "col-span-2 row-span-2" },
  { src: `${BASE}/sr_facility_2.png`, alt: "Living room", span: "col-span-1 row-span-1" },
  { src: `${BASE}/sr_facility_3.png`, alt: "Bathroom", span: "col-span-1 row-span-1" },
  { src: `${BASE}/sr_facility_4.png`, alt: "Bedroom suite", span: "col-span-1 row-span-1" },
  { src: `${BASE}/sr_facility_5.png`, alt: "Private room", span: "col-span-1 row-span-1" },
  { src: `${BASE}/sr_facility_6.png`, alt: "Master bedroom", span: "col-span-1 row-span-1" },
  { src: `${BASE}/sr_facility_7.png`, alt: "Exterior grounds", span: "col-span-2 row-span-1" },
  { src: `${BASE}/sr_facility_8.png`, alt: "Outdoor area", span: "col-span-1 row-span-1" },
  { src: `${BASE}/sr_facility_9.png`, alt: "Facility exterior", span: "col-span-1 row-span-1" },
];

export default function HomeFacility() {
  return (
    <section className="bg-[var(--sr-moss)] py-[100px]">
      <div className="sr-container">

        {/* Header row */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our Facility
            </p>
            <h2
              className="text-[clamp(2.5rem,4vw,4rem)] font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              A space designed <br />
              <span className="italic text-[var(--sr-sage)]">for healing</span>
            </h2>
          </div>
          <div className="max-w-sm md:pb-2">
            <p
              className="text-sm leading-relaxed text-white/60"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Located in Mission Viejo, our facility offers private rooms,
              serene outdoor spaces, and every comfort to support your recovery.
            </p>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-3">

          {/* Large hero tile — col 1-2, rows 1-2 */}
          <div className="group relative col-span-2 row-span-2 overflow-hidden">
            <Image
              src={`${BASE}/sr_facility_1.png`}
              alt="Sullivan Recovery facility courtyard"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[var(--sr-moss)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </div>

          {/* Top right: 2 small tiles side by side */}
          <div className="group relative col-span-1 overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image src={`${BASE}/sr_facility_2.png`} alt="Living room" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[var(--sr-moss)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </div>
          <div className="group relative col-span-1 overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image src={`${BASE}/sr_facility_3.png`} alt="Bathroom" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[var(--sr-moss)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </div>

          {/* Middle right: 2 small tiles */}
          <div className="group relative col-span-1 overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image src={`${BASE}/sr_facility_4.png`} alt="Bedroom" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[var(--sr-moss)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </div>
          <div className="group relative col-span-1 overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image src={`${BASE}/sr_facility_5.png`} alt="Private room" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[var(--sr-moss)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </div>

          {/* Bottom row: 4 equal tiles */}
          {[6, 7, 8, 9].map((n) => (
            <div
              key={n}
              className="group relative col-span-1 overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={`${BASE}/sr_facility_${n}.png`}
                alt={`Facility photo ${n}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[var(--sr-moss)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            </div>
          ))}
        </div>

        {/* CTA below gallery */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[var(--sr-sage)]/20 pt-10 md:flex-row">
          <p
            className="text-xl italic text-white/70"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            24731 Via San Fernando, Mission Viejo, CA 92692
          </p>
          <Link
            href="/admissions-process/"
            className="bg-[var(--sr-parchment)] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--sr-moss)] transition hover:bg-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Schedule a Tour
          </Link>
        </div>

      </div>
    </section>
  );
}
