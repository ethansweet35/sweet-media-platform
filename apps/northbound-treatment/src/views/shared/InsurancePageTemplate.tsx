import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import { EditableImage, EditableText } from "@sweetmedia/admin-core/page-editor";
import CtmFormReactor from "@/components/feature/CtmFormReactor";
import { heroSectionPad, heroOverlayClass } from "@/lib/heroSpacing";
import InsuranceFaqAccordion from "./InsuranceFaqAccordion";

/* ─── Types ──────────────────────────────────────────────────────── */

export interface CoverageItem {
  icon: string;
  label: string;
  detail: string;
}

export interface InsuranceFaq {
  q: string;
  a: string;
}

export interface RelatedCarrier {
  name: string;
  href: string;
}

export interface InsurancePageData {
  /* Hero */
  heroImage: string;
  heroImageAlt: string;
  carrierName: string;
  carrierTagline: string;
  heroBody: string;
  breadcrumbs?: { label: string; href?: string }[];

  /* About the carrier */
  aboutHeadline: string;
  aboutBody: string[];
  carrierFacts: { icon: string; label: string; value: string }[];

  /* Coverage */
  coverageHeadline: string;
  coverageIntro: string;
  coverageItems: CoverageItem[];

  /* How it works */
  steps: { number: string; title: string; body: string }[];

  /* FAQ / terms */
  faqs: InsuranceFaq[];

  /* Related carriers */
  relatedCarriers: RelatedCarrier[];
}

/* ─── Constants ──────────────────────────────────────────────────── */

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

/* ─── Sub-components ──────────────────────────────────────────────── */

function VerifyForm() {
  return (
    <CtmFormReactor
      className="max-w-[400px]"
      title="Verify insurance benefits — Northbound Treatment"
    />
  );
}

/* ─── Main Template ───────────────────────────────────────────────── */

export default function InsurancePageTemplate({ data }: { data: InsurancePageData }) {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-navy ${heroOverlayClass}`}>
        <div className="grid lg:grid-cols-[1fr_440px] lg:items-stretch">
          {/* Left: image + content */}
          <div className="relative min-h-[420px] lg:min-h-0">
            <EditableImage
              fieldKey="hero.image"
              defaultSrc={data.heroImage}
              alt={data.heroImageAlt}
              label="Hero image"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

            <div className={`relative z-10 flex h-full flex-col justify-center px-8 lg:px-12 ${heroSectionPad}`}>
              {/* Breadcrumb */}
              <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-white/40">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>/</span>
                <Link href="/insurance/" className="hover:text-white transition">Insurance</Link>
                <span>/</span>
                <span className="text-white/70">{data.carrierName}</span>
              </nav>

              {/* Carrier badge */}
              <span className="mb-4 inline-flex w-fit items-center gap-2 border border-terracotta/40 bg-terracotta/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-terracotta">
                <i className="ri-shield-check-line" /> In-Network Provider
              </span>

              <EditableText
                fieldKey="hero.headline"
                defaultValue={`${data.carrierName} Insurance for Addiction Treatment`}
                as="h1"
                className="font-heading max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl"
              >
                {data.carrierName} Insurance for{" "}
                <span className="italic text-terracotta-light">Addiction Treatment</span>
              </EditableText>
              <EditableText
                fieldKey="hero.body"
                defaultValue={data.heroBody}
                as="p"
                className="mt-4 max-w-lg text-base leading-relaxed text-white/70"
              >
                <AutoLinkedText>{data.heroBody}</AutoLinkedText>
              </EditableText>

              {/* Trust strip */}
              <div className="mt-8 flex flex-wrap gap-5">
                {[
                  { icon: "ri-check-double-line", label: "15+ Insurance Contracts" },
                  { icon: "ri-phone-line", label: "Free Benefits Verification" },
                  { icon: "ri-time-line", label: "Same-Day Admissions Available" },
                ].map((t) => (
                  <span key={t.label} className="flex items-center gap-2 text-xs font-semibold text-white/60">
                    <i className={`${t.icon} text-terracotta`} /> {t.label}
                  </span>
                ))}
              </div>

              <a
                href="tel:8663110003"
                className="mt-8 inline-flex w-fit items-center gap-2 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-navy transition hover:bg-white/90"
              >
                <i className="ri-phone-fill text-terracotta" /> Call (866) 311-0003
              </a>
            </div>
          </div>

          {/* Right: verification form */}
          <div className={`flex flex-col justify-center bg-navy-light/80 px-8 lg:px-10 ${heroSectionPad}`}>
            <p className="brand-eyebrow mb-2 text-terracotta">Verify Insurance</p>
            <h2 className="font-heading mb-4 text-2xl font-bold text-white">
              Check Your {data.carrierName} Benefits
            </h2>
            <VerifyForm />
          </div>
        </div>
      </section>

      {/* ── Coverage Items ─────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="mb-12 text-center">
            <p className="brand-eyebrow mb-3 text-terracotta">Coverage Details</p>
            <EditableText
              fieldKey="coverage.headline"
              defaultValue={data.coverageHeadline}
              as="h2"
              className="font-heading text-4xl font-bold text-navy md:text-5xl"
            >
              <AutoLinkedText>{data.coverageHeadline}</AutoLinkedText>
            </EditableText>
            <EditableText
              fieldKey="coverage.intro"
              defaultValue={data.coverageIntro}
              as="p"
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy/60"
            >
              <AutoLinkedText>{data.coverageIntro}</AutoLinkedText>
            </EditableText>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.coverageItems.map((item, i) => (
              <div
                key={item.label}
                className="group flex gap-5 rounded-none border border-navy/8 bg-white p-6 shadow-sm transition hover:border-terracotta/25 hover:shadow-md"
              >
                <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-none bg-terracotta/10 transition group-hover:bg-terracotta/20">
                  <i className={`${item.icon} text-xl text-terracotta`} />
                </span>
                <div>
                  <EditableText
                    fieldKey={`coverage.items.${i}.label`}
                    defaultValue={item.label}
                    as="h3"
                    className="font-heading text-base font-bold text-navy"
                  >
                    <AutoLinkedText>{item.label}</AutoLinkedText>
                  </EditableText>
                  <EditableText
                    fieldKey={`coverage.items.${i}.detail`}
                    defaultValue={item.detail}
                    as="p"
                    className="mt-1 text-sm leading-relaxed text-navy/60"
                  >
                    <AutoLinkedText>{item.detail}</AutoLinkedText>
                  </EditableText>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-navy/35">
            <AutoLinkedText>
              Coverage varies by plan, policy type, and clinical criteria. Northbound verifies your specific
              benefits at no cost before admission — call us or submit the form above.
            </AutoLinkedText>
          </p>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="mb-12 text-center">
            <p className="brand-eyebrow mb-3 text-terracotta">Simple Process</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              How Insurance Verification Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
              <AutoLinkedText>
                Northbound handles the complexity of insurance so you can focus on getting help — not paperwork.
              </AutoLinkedText>
            </p>
          </div>

          <div className="relative grid gap-0 lg:grid-cols-3">
            {/* Connector line */}
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-white/10 lg:block" style={{ left: "calc(16.67% + 1.5rem)", right: "calc(16.67% + 1.5rem)" }} />

            {data.steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center gap-5 px-8 text-center">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/10 bg-navy">
                  <span className="font-heading text-2xl font-bold text-terracotta">{step.number}</span>
                  {i < data.steps.length - 1 && (
                    <div className="absolute -right-px top-1/2 hidden h-px w-8 bg-white/10 lg:block" />
                  )}
                </div>
                <div>
                  <EditableText
                    fieldKey={`steps.${i}.title`}
                    defaultValue={step.title}
                    as="h3"
                    className="font-heading text-lg font-bold text-white"
                  >
                    <AutoLinkedText>{step.title}</AutoLinkedText>
                  </EditableText>
                  <EditableText
                    fieldKey={`steps.${i}.body`}
                    defaultValue={step.body}
                    as="p"
                    className="mt-2 text-sm leading-relaxed text-white/55"
                  >
                    <AutoLinkedText>{step.body}</AutoLinkedText>
                  </EditableText>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:8663110003"
              className="inline-flex items-center gap-2 bg-terracotta px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-fill" /> Call (866) 311-0003
            </a>
            <a
              href="/admissions/"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Learn About Admissions <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>

      {/* ── About the Carrier + Key Facts ──────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-3 text-terracotta">About {data.carrierName}</p>
              <EditableText
                fieldKey="about.headline"
                defaultValue={data.aboutHeadline}
                as="h2"
                className="font-heading text-4xl font-bold text-navy md:text-5xl"
              >
                <AutoLinkedText>{data.aboutHeadline}</AutoLinkedText>
              </EditableText>
              {data.aboutBody.map((para, i) => (
                <EditableText
                  key={i}
                  fieldKey={`about.body.${i}`}
                  defaultValue={para}
                  as="p"
                  className="mt-4 text-base leading-relaxed text-navy/65"
                >
                  <AutoLinkedText>{para}</AutoLinkedText>
                </EditableText>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:8663110003"
                  className="inline-flex items-center gap-2 rounded-none bg-navy px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-navy-light"
                >
                  <i className="ri-phone-line" /> Verify Benefits
                </a>
                <Link
                  href="/insurance/"
                  className="inline-flex items-center gap-2 rounded-none border border-navy/20 px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-navy transition hover:border-navy/40"
                >
                  All Insurance Plans
                </Link>
              </div>
            </div>

            {/* Fact card */}
            <div className="rounded-none border border-white/10 bg-navy p-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-terracotta">{data.carrierName} at a Glance</p>
              <div className="flex flex-col divide-y divide-white/10">
                {data.carrierFacts.map((fact, i) => (
                  <div key={fact.label} className="flex items-center gap-4 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta/15">
                      <i className={`${fact.icon} text-sm text-terracotta`} />
                    </span>
                    <div>
                      <EditableText
                        fieldKey={`carrierFacts.${i}.label`}
                        defaultValue={fact.label}
                        as="p"
                        className="text-[10px] font-bold uppercase tracking-widest text-white/40"
                      >
                        <AutoLinkedText>{fact.label}</AutoLinkedText>
                      </EditableText>
                      <EditableText
                        fieldKey={`carrierFacts.${i}.value`}
                        defaultValue={fact.value}
                        as="p"
                        className="text-sm font-semibold text-white"
                      >
                        <AutoLinkedText>{fact.value}</AutoLinkedText>
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ / Insurance Terms ──────────────────────────────── */}
      <section className="bg-[#F7F8FA] py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
            {/* Sticky CTA card */}
            <div className="rounded-none bg-navy p-8 lg:sticky lg:top-28">
              <p className="brand-eyebrow mb-2 text-terracotta">Have Questions?</p>
              <h3 className="font-heading text-2xl font-bold text-white">
                We Verify Benefits for Free
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Understanding your {data.carrierName} coverage can be confusing. Northbound&apos;s admissions team handles benefits verification — usually within one business day.
              </p>
              <a
                href="tel:8663110003"
                className="mt-6 flex items-center justify-center gap-2 bg-terracotta py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-terracotta-light"
              >
                <i className="ri-phone-fill" /> (866) 311-0003
              </a>
              <p className="mt-3 text-center text-[10px] text-white/30">
                <AutoLinkedText>Available 24/7 · Confidential · No Obligation</AutoLinkedText>
              </p>

              <div className="mt-8 flex flex-col gap-2">
                {["Free benefits verification", "15+ major insurance plans", "Most patients pay $0 out-of-pocket", "Same-day admissions available"].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-xs text-white/60">
                    <i className="ri-check-line text-terracotta" /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div>
              <p className="brand-eyebrow mb-3 text-terracotta">Common Questions</p>
              <h2 className="font-heading mb-8 text-4xl font-bold text-navy">
                {data.carrierName} Insurance FAQs
              </h2>
              <InsuranceFaqAccordion
                items={data.faqs.map((faq, i) => ({
                  question: (
                    <EditableText fieldKey={`faqs.${i}.q`} defaultValue={faq.q} as="span">
                      <AutoLinkedText>{faq.q}</AutoLinkedText>
                    </EditableText>
                  ),
                  answer: (
                    <EditableText fieldKey={`faqs.${i}.a`} defaultValue={faq.a} as="span">
                      <AutoLinkedText>{faq.a}</AutoLinkedText>
                    </EditableText>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Carriers ──────────────────────────────────────── */}
      {data.relatedCarriers.length > 0 && (
        <section className="bg-white py-16">
          <div className={CONTAINER}>
            <p className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-navy/40">
              <AutoLinkedText>Other Insurance Plans We Accept</AutoLinkedText>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.relatedCarriers.map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  className="rounded-none border border-navy/10 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-terracotta/30 hover:text-terracotta"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-navy-light/40" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-terracotta/10" />
        <div className={`${CONTAINER} relative z-10 text-center`}>
          <p className="brand-eyebrow mb-3 text-terracotta">Start Today</p>
          <h2 className="font-heading mx-auto max-w-2xl text-4xl font-bold text-white md:text-5xl">
            Your {data.carrierName} Plan May Cover{" "}
            <span className="italic text-terracotta-light">Most or All</span> of Treatment
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Northbound&apos;s admissions team verifies your benefits at no cost and works directly with {data.carrierName} to maximize your coverage. Most patients pay little to nothing out-of-pocket.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:8663110003"
              className="inline-flex items-center gap-2 bg-terracotta px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-fill" /> Call (866) 311-0003
            </a>
            <a
              href="/admissions/"
              className="inline-flex items-center gap-2 border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:border-white/50 hover:bg-white/8"
            >
              Verify Online <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
