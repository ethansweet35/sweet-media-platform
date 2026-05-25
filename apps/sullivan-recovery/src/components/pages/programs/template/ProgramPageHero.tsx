import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/base/Breadcrumb";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import type { ProgramPageData } from "@/types/programPage";

type Props = Pick<ProgramPageData, "breadcrumb" | "hero">;

export default function ProgramPageHero({ breadcrumb, hero }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-[var(--sr-charcoal)] text-white"
      style={{ marginTop: "-88px", paddingTop: "calc(88px + 1.25rem)" }}
    >
      <div className="absolute inset-0 lg:left-[38%]">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 62vw"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,31,27,0.92) 0%, rgba(30,31,27,0.75) 45%, rgba(44,57,40,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,31,27,0.97) 0%, rgba(30,31,27,0.88) 32%, rgba(44,57,40,0.35) 58%, transparent 100%)",
          }}
        />
      </div>

      <div className="sr-container relative z-10 pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="mb-6">
              <Breadcrumb
                items={[
                  ...(breadcrumb.ancestors ?? []).map((a) => ({
                    label: a.label,
                    path: a.href,
                  })),
                  { label: breadcrumb.parent.label, path: breadcrumb.parent.href },
                  { label: breadcrumb.current },
                ]}
              />
            </div>
            <p className="sr-eyebrow mb-3 text-[var(--sr-sage)]">{hero.eyebrow}</p>
            <h1
              className="mb-4 max-w-2xl text-[clamp(2.5rem,5.5vw,4.25rem)] font-light leading-[1.02] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {hero.title}
              {hero.titleAccent ? (
                <>
                  {" "}
                  <span className="italic text-[var(--sr-sage)]">{hero.titleAccent}</span>
                </>
              ) : null}
            </h1>
            <p
              className="mb-8 max-w-lg text-[15px] leading-[1.85] text-white/78"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/insurance/"
                className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Verify insurance
                <i className="ri-shield-check-line text-sm" aria-hidden />
              </Link>
              <CallRailPhoneLink className="inline-flex items-center gap-2 border border-white/35 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
                <i className="ri-phone-fill text-sm" aria-hidden />
                24/7 admissions
              </CallRailPhoneLink>
            </div>
          </div>

          {hero.stats && hero.stats.length > 0 ? (
            <div className="flex items-end lg:col-span-5 lg:justify-end xl:col-span-6">
              <div className="grid w-full max-w-md grid-cols-2 gap-px border border-white/15 bg-white/10 backdrop-blur-md sm:max-w-sm lg:ml-auto">
                {hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[var(--sr-charcoal)]/80 px-5 py-5 md:px-6 md:py-6"
                  >
                    <p
                      className="text-[clamp(1.5rem,3vw,2rem)] font-light leading-none text-[var(--sr-sage)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
