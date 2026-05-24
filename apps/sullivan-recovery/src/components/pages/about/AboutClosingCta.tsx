import Link from "next/link";
import CallNowLink from "@/components/ui/CallNowLink";

export default function AboutClosingCta() {
  return (
    <section className="bg-[var(--sr-parchment)] py-[100px]">
      <div className="sr-container">
        <div className="border border-[var(--sr-sand)] bg-white px-6 py-10 md:px-12 md:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <p className="sr-eyebrow mb-4">Ready When You Are</p>
              <h2
                className="mb-4 text-[clamp(2rem,4vw,3rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Take the first step toward{" "}
                <span className="italic text-[var(--sr-fern)]">healing</span>
              </h2>
              <p
                className="max-w-md text-[15px] leading-[1.85] text-[var(--sr-body)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Whether you are seeking help for yourself or someone you love, our team is
                available 24/7 to answer questions, verify insurance, and guide you through
                admissions — confidentially and without pressure.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <CallNowLink
                withPrefixOnDesktop
                className="sr-btn-primary w-full justify-center px-8 py-4 sm:w-auto"
              />
              <Link
                href="/insurance/"
                className="sr-btn-ghost w-full justify-center px-8 py-4 sm:w-auto"
              >
                Verify Insurance
                <i className="ri-shield-check-line" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
