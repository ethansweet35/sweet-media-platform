import Image from "next/image";
import Link from "next/link";
import { PROGRAM_CATALOG, type ProgramEntry } from "@/data/programs";

const featured = PROGRAM_CATALOG.find((p) => p.featured)!;
const rest = PROGRAM_CATALOG.filter((p) => !p.featured);
/** 3 + 2 avoids an empty cell in a 3-column grid (5 programs below featured detox) */
const programsRowThree = rest.slice(0, 3);
const programsRowTwo = rest.slice(3);

function ProgramCard({
  prog,
  tall = false,
}: {
  prog: ProgramEntry;
  /** Taller cards in the 2-up row so the block balances the 3-up row */
  tall?: boolean;
}) {
  return (
    <Link
      href={prog.href}
      className={`group relative block w-full overflow-hidden ${
        tall ? "min-h-[300px] sm:min-h-[320px]" : "min-h-[260px] sm:min-h-[280px]"
      }`}
    >
      <Image
        src={prog.image}
        alt={prog.title}
        fill
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
        sizes={tall ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/92 via-[var(--sr-charcoal)]/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
        <span
          className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {prog.num}
        </span>
        <div>
          <h3
            className="mb-1.5 text-xl font-light text-white md:text-2xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {prog.title}
          </h3>
          <p
            className="line-clamp-2 text-xs leading-relaxed text-white/65"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {prog.description}
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--sr-sage)] transition group-hover:text-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Learn more
            <i className="ri-arrow-right-line text-xs" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProgramsIndexGrid() {
  return (
    <section className="bg-[var(--sr-moss)] py-14 md:py-20">
      <div className="sr-container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <h2
            className="text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.06] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Explore our programs
          </h2>
          <p
            className="max-w-sm text-[13px] leading-[1.7] text-white/60 md:text-right"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Physician-led detox through residential care, therapies, and long-term support.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={featured.href}
            className="group relative block min-h-[min(52vw,360px)] w-full overflow-hidden sm:min-h-[340px]"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--sr-charcoal)]/85 via-[var(--sr-charcoal)]/35 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
              <span
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {featured.num} · Detox
              </span>
              <div className="max-w-lg">
                <h3
                  className="mb-2 text-[clamp(1.75rem,3.5vw,2.75rem)] font-light text-white"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {featured.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-white/70"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {featured.description}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--sr-sage)] transition group-hover:text-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  View detox programs
                  <i className="ri-arrow-right-line text-sm" aria-hidden />
                </span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {programsRowThree.map((prog) => (
              <ProgramCard key={prog.href} prog={prog} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {programsRowTwo.map((prog) => (
              <ProgramCard key={prog.href} prog={prog} tall />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
