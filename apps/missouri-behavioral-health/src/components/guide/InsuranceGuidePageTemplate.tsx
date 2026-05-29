import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { INSURANCE_GUIDES } from "@/data/treatmentGuides";
import type { InsuranceGuidePageData } from "@/data/insuranceGuidePages";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

export default function InsuranceGuidePageTemplate({ data }: { data: InsuranceGuidePageData }) {
  const relatedGuides = INSURANCE_GUIDES.filter((g) => g.path !== data.path);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mbh-forest-deep text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-12deg, transparent, transparent 48px, rgba(255,255,255,0.03) 48px, rgba(255,255,255,0.03) 49px)",
          }}
        />
        <div className={`${CONTAINER} relative py-14 lg:py-20`}>
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 font-body text-[11px] text-white/40"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <i className="ri-arrow-right-s-line" aria-hidden />
            <Link href="/treatment-guide" className="transition hover:text-white/70">
              Treatment Guide
            </Link>
            <i className="ri-arrow-right-s-line" aria-hidden />
            <span className="text-white/65">{data.carrierName}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-mbh-sage/30 bg-mbh-green/15 px-4 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.24em] text-mbh-sage">
                <i className={`${data.icon} text-sm`} aria-hidden />
                {data.carrierTagline}
              </span>
              <h1
                className="font-display font-semibold leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.25rem)" }}
              >
                {data.heroHeadline}
              </h1>
              <p className="mt-5 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-white/60">
                <AutoLinkedText>{data.heroBody}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/25 transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-shield-check-line" aria-hidden />
                  Verify your benefits
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full border border-white/22 px-7 py-3.5 font-body text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/8"
                >
                  <i className="ri-phone-fill" aria-hidden />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
                <p className="font-body text-[9px] font-bold uppercase tracking-[0.32em] text-mbh-sage">
                  Quick facts
                </p>
                <dl className="mt-4 space-y-3">
                  {data.carrierFacts.slice(0, 4).map((f) => (
                    <div key={f.label} className="flex gap-3 border-t border-white/8 pt-3 first:border-t-0 first:pt-0">
                      <i className={`${f.icon} mt-0.5 shrink-0 text-mbh-mint`} aria-hidden />
                      <div>
                        <dt className="font-body text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
                          {f.label}
                        </dt>
                        <dd className="font-display text-sm font-semibold text-white">{f.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                What may be covered
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              {data.coverageHeadline}
            </h2>
            <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              <AutoLinkedText>{data.coverageIntro}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.coverageItems.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 rounded-2xl border border-mbh-forest/8 bg-cream/50 p-6 transition hover:border-mbh-green/25 hover:bg-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${item.icon} text-lg text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-mbh-forest">{item.label}</h3>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-mbh-body">
                    <AutoLinkedText>{item.detail}</AutoLinkedText>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-body text-xs leading-relaxed text-mbh-body/55">
            <AutoLinkedText>
              Coverage depends on your specific plan, medical necessity, and in-network status. Missouri
              Behavioral Health does not accept Medicaid or Medicare. We verify private-plan benefits at no
              cost before admission.
            </AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-mbh-forest-deep py-[100px] text-white">
        <div className={CONTAINER}>
          <div className="mb-12 text-center">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
              How it works
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
              We handle the insurance calls for you.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {data.steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/8 bg-white/5 p-6 text-center md:text-left"
              >
                <span className="font-display text-3xl font-semibold text-mbh-sage/90">{step.number}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/55">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                {data.aboutHeadline}
              </h2>
              {data.aboutBody.map((para) => (
                <p key={para.slice(0, 48)} className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                  <AutoLinkedText>{para}</AutoLinkedText>
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
                >
                  Admissions <i className="ri-arrow-right-line" aria-hidden />
                </Link>
                <Link
                  href="/levels-of-care-missouri"
                  className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-green/30 hover:bg-mbh-green/5"
                >
                  Levels of care
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-mbh-forest/8 bg-white p-6 shadow-sm">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-green">
                {data.carrierName} at a glance
              </p>
              <dl className="mt-4 divide-y divide-mbh-forest/8">
                {data.carrierFacts.map((f) => (
                  <div key={f.label} className="flex gap-3 py-3.5 first:pt-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mbh-green/10">
                      <i className={`${f.icon} text-mbh-green`} aria-hidden />
                    </span>
                    <div>
                      <dt className="font-body text-[9px] font-bold uppercase tracking-[0.16em] text-mbh-body/45">
                        {f.label}
                      </dt>
                      <dd className="font-display text-sm font-semibold text-mbh-forest">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-[100px]">
        <div className={`${CONTAINER} max-w-3xl`}>
          <SubstanceFaq items={data.faqs} />
        </div>
      </section>

      {/* Other guides */}
      <section className="border-y border-mbh-forest/8 bg-cream py-12">
        <div className={CONTAINER}>
          <p className="mb-6 text-center font-body text-[11px] font-bold uppercase tracking-[0.22em] text-mbh-body/45">
            Other insurance guides
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {relatedGuides.map((g) => (
              <Link
                key={g.path}
                href={g.path}
                className="rounded-full border border-mbh-forest/12 bg-white px-4 py-2 font-body text-sm font-medium text-mbh-forest transition hover:border-mbh-green/30 hover:text-mbh-green"
              >
                {g.carrier}
              </Link>
            ))}
            <Link
              href="/treatment-guide"
              className="rounded-full border border-mbh-green/30 bg-mbh-green/10 px-4 py-2 font-body text-sm font-semibold text-mbh-green transition hover:bg-mbh-green/15"
            >
              All guides
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-8 text-center lg:items-center">
            <div className="max-w-2xl">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Start today
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white">
                {data.ctaHeadline}
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                <AutoLinkedText>{data.ctaBody}</AutoLinkedText>
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl transition hover:bg-mbh-mint"
              >
                Verify insurance
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                <i className="ri-phone-fill" aria-hidden />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
