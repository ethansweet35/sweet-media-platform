import Image from "next/image";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { INSURANCE_VERIFY_BULLETS } from "@/data/insurance";
import InsuranceVerifyForm from "./InsuranceVerifyForm";

const HERO_IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_facility_7.png";

export default function InsurancePageHero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--sr-charcoal)] text-white"
      style={{ marginTop: "-88px", paddingTop: "calc(88px + 1.25rem)" }}
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(30,31,27,0.96) 0%, rgba(44,57,40,0.82) 45%, rgba(30,31,27,0.55) 100%)",
          }}
        />
      </div>

      <div className="sr-container relative z-10 pb-10 pt-6 md:pb-12 md:pt-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="sr-eyebrow mb-3 text-[var(--sr-sage)]">Insurance coverage</p>
            <h1
              className="mb-4 max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Verify your benefits —{" "}
              <span className="italic text-[var(--sr-sage)]">before you commit</span>
            </h1>
            <p
              className="mb-6 max-w-lg text-[15px] leading-[1.75] text-white/72"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Free, confidential verification for detox and residential treatment in Mission
              Viejo.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {INSURANCE_VERIFY_BULLETS.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 bg-white/5 px-3 py-3 backdrop-blur-sm"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-[var(--sr-sage)]">
                    <i className={`${icon} text-sm`} aria-hidden />
                  </span>
                  <span
                    className="text-[11px] leading-[1.55] text-white/75"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <CallRailPhoneLink className="inline-flex items-center gap-2 border border-[var(--sr-sage)]/50 bg-[var(--sr-sage)] px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-ink)] transition hover:bg-white">
              <i className="ri-phone-fill text-sm" aria-hidden />
              Call admissions — 24/7
            </CallRailPhoneLink>
          </div>

          <div id="verify-form" className="scroll-mt-28 lg:col-span-6 xl:col-span-5">
            <div className="relative border border-white/15 bg-[var(--sr-parchment)] shadow-2xl">
              <div
                className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--sr-moss)] via-[var(--sr-sage)] to-[var(--sr-fern)]"
                aria-hidden
              />
              <div className="p-5 md:p-6">
                <InsuranceVerifyForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
