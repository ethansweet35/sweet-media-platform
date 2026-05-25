import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/base/Breadcrumb";
import { SCHEDULE_HERO_IMAGE } from "@/data/dailySchedule";

export default function DailyScheduleHero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--sr-charcoal)] text-white"
      style={{ marginTop: "-88px", paddingTop: "calc(88px + 1.25rem)" }}
    >
      <div className="absolute inset-0 lg:left-[40%]">
        <Image
          src={SCHEDULE_HERO_IMAGE}
          alt="Structured morning routine at Sullivan Recovery residential program"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,31,27,0.92) 0%, rgba(30,31,27,0.78) 50%, rgba(44,57,40,0.5) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,31,27,0.97) 0%, rgba(30,31,27,0.9) 35%, rgba(44,57,40,0.4) 60%, transparent 100%)",
          }}
        />
      </div>

      <div className="sr-container relative z-10 pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="max-w-2xl">
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Daily schedule" }]} />
          </div>
          <p className="sr-eyebrow mb-3 text-[var(--sr-sage)]">Life on campus</p>
          <h1
            className="mb-4 text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-[1.02] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A structured day in{" "}
            <span className="italic text-[var(--sr-sage)]">recovery</span>
          </h1>
          <p
            className="mb-8 max-w-lg text-[15px] leading-[1.85] text-white/78"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Predictable routines during detox and residential treatment — balancing clinical
            care, therapy, holistic programming, and time to rest.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#schedule"
              className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              View schedule
              <i className="ri-arrow-down-line text-sm" aria-hidden />
            </a>
            <Link
              href="/programs/"
              className="inline-flex items-center gap-2 border border-white/35 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
