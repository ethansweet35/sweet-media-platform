import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/base/Breadcrumb";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { InsuranceLogoImage } from "@/components/pages/insurance/InsuranceLogo";
import { resolveInsurancePageIdentity } from "@/lib/insurancePageIdentity";
import type { InsurancePageData } from "@/types/insurancePage";

type Props = {
  data: InsurancePageData;
};

const HERO_TRUST = [
  { icon: "ri-shield-check-line", label: "Free benefits check" },
  { icon: "ri-hospital-line", label: "Detox & residential" },
  { icon: "ri-map-pin-2-line", label: "Mission Viejo, CA" },
] as const;

export default function InsuranceCarrierHero({ data }: Props) {
  const { carrier, hero } = data;
  const identity = resolveInsurancePageIdentity(data);

  return (
    <section
      className="relative overflow-hidden bg-[var(--sr-charcoal)] text-white"
      style={{ marginTop: "-88px", paddingTop: "calc(88px + 1.25rem)" }}
    >
      <div className="absolute inset-0 lg:left-[40%]">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,31,27,0.94) 0%, rgba(30,31,27,0.82) 50%, rgba(44,57,40,0.5) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,31,27,0.97) 0%, rgba(30,31,27,0.9) 28%, rgba(44,57,40,0.4) 52%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="sr-container relative z-10 pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="max-w-2xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Insurance", path: "/insurance/" },
                { label: identity.shortName },
              ]}
            />
          </div>
          <p className="sr-eyebrow mb-3 text-[var(--sr-sage)]">{hero.eyebrow}</p>
          <h1
            className="mb-4 max-w-xl text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] text-white"
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
            className="mb-8 max-w-lg text-[15px] leading-[1.8] text-white/75"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {hero.description}
          </p>
          <div className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/insurance/#verify-form"
              className="inline-flex items-center gap-2 bg-[var(--sr-sage)] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Verify benefits
              <i className="ri-shield-check-line text-sm" aria-hidden />
            </Link>
            <CallRailPhoneLink className="inline-flex items-center gap-2 border border-white/35 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10">
              <i className="ri-phone-fill text-sm" aria-hidden />
              Call admissions
            </CallRailPhoneLink>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-4 border border-white/15 bg-[var(--sr-charcoal)]/70 px-4 py-4 backdrop-blur-sm sm:max-w-md">
            <div className="min-w-0 flex-1">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {identity.hasLogo ? "In-network provider" : "Benefits verification"}
              </p>
              <p
                className="mt-1 text-[13px] leading-snug text-white/90"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Sullivan Recovery · Mission Viejo
              </p>
            </div>
            {identity.hasLogo && carrier ? (
              <InsuranceLogoImage carrier={carrier} surface="dark" compact />
            ) : (
              <span
                className="flex h-12 shrink-0 items-center justify-center border border-white/15 bg-[var(--sr-moss)] px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {identity.shortName}
              </span>
            )}
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {HERO_TRUST.map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-white/65">
                <i className={`${icon} text-[var(--sr-sage)]`} aria-hidden />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
