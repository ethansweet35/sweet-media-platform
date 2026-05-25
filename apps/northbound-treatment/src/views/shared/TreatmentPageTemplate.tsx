import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import { EditableImage, EditableText } from "@sweetmedia/admin-core/page-editor";
import { heroInnerWrap, heroViewportSection } from "@/lib/heroSpacing";
import CtmLeadFormCard from "@/components/feature/CtmLeadFormCard";
import EditableCtaBanner from "./EditableCtaBanner";
import FaqAccordionItem from "./FaqAccordionItem";

/* ─── Types ─────────────────────────────────────────────────── */

export interface TreatmentFact {
  icon: string;
  label: string;
  value: string;
}

export interface TreatmentStep {
  number: string;
  title: string;
  body: string;
  icon: string;
}

export interface TreatmentDifferentiator {
  icon: string;
  title: string;
  body: string;
}

export interface ContinuumStep {
  label: string;
  href: string;
  icon: string;
  current?: boolean;
}

export interface TreatmentFaq {
  q: string;
  a: string;
}

export interface TreatmentPageData {
  heroImage: string;
  heroImageAlt: string;
  eyebrow: string;
  programName: string;
  italicWord?: string;
  tagline: string;
  heroBody: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  overviewHeadline: string;
  overviewBody: string[];
  keyFacts: TreatmentFact[];
  stepsHeadline: string;
  stepsIntro?: string;
  steps: TreatmentStep[];
  warningHeadline?: string;
  warningBody?: string[];
  warningPoints?: string[];
  differentiators: TreatmentDifferentiator[];
  continuum: ContinuumStep[];
  faqs: TreatmentFaq[];
  ctaHeadline: string;
  ctaBody?: string;
}

function ProgramNameHeadline({
  programName,
  italicWord,
}: {
  programName: string;
  italicWord?: string;
}) {
  if (!italicWord) return programName;
  const parts = programName.split(new RegExp(`(${italicWord})`, "i"));
  return parts.map((p, i) =>
    p.toLowerCase() === italicWord.toLowerCase() ? (
      <span key={i} className="italic text-terracotta">
        {p}
      </span>
    ) : (
      p
    ),
  );
}

function TreatmentHero({ data }: { data: TreatmentPageData }) {
  return (
    <section className={heroViewportSection}>
      <EditableImage
        fieldKey="hero.image"
        defaultSrc={data.heroImage}
        alt={data.heroImageAlt}
        label="Hero image"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-terracotta/15 blur-3xl" />

      <div className={heroInnerWrap}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
              <Link href="/" className="transition hover:text-terracotta">
                Home
              </Link>
              {data.breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  <i className="ri-arrow-right-s-line" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-terracotta">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>

            <EditableText
              fieldKey="hero.eyebrow"
              defaultValue={data.eyebrow}
              as="p"
              className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"
            >
              <AutoLinkedText>{data.eyebrow}</AutoLinkedText>
            </EditableText>

            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              <EditableText
                fieldKey="hero.programName"
                defaultValue={data.programName}
                as="span"
                className="text-white"
              >
                <ProgramNameHeadline programName={data.programName} italicWord={data.italicWord} />
              </EditableText>
            </h1>

            <EditableText
              fieldKey="hero.tagline"
              defaultValue={data.tagline}
              as="p"
              className="mt-2 text-base font-semibold text-white/50"
            >
              <AutoLinkedText>{data.tagline}</AutoLinkedText>
            </EditableText>

            <EditableText
              fieldKey="hero.body"
              defaultValue={data.heroBody}
              as="p"
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/70"
            >
              <AutoLinkedText>{data.heroBody}</AutoLinkedText>
            </EditableText>

            <ul className="mt-7 flex flex-col gap-2.5">
              {[
                "Medically supervised — safe, 24/7 monitored care",
                "Personalized treatment plan from day one",
                "Insurance verified at no cost — 15+ plans accepted",
                "38+ years of clinical expertise in Southern California",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-terracotta/20">
                    <i className="ri-check-line text-xs text-terracotta" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light"
              >
                <i className="ri-phone-line" /> (866) 311-0003
              </a>
              <span className="text-xs text-white/35">Available 24/7 · Confidential</span>
            </div>
          </div>

          <div className="relative lg:flex lg:items-start lg:justify-end">
            <CtmLeadFormCard
              eyebrow="Free · No Obligation · Confidential"
              title="Verify Your Coverage"
              subtitle="Fill out the form — we'll call you right away."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TreatmentPageTemplate({ data }: { data: TreatmentPageData }) {
  return (
    <>
      <TreatmentHero data={data} />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Overview</p>
              <EditableText
                fieldKey="overview.headline"
                defaultValue={data.overviewHeadline}
                as="h2"
                className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl"
              >
                <AutoLinkedText>{data.overviewHeadline}</AutoLinkedText>
              </EditableText>
              <div className="mt-6 space-y-4">
                {data.overviewBody.map((para, i) => (
                  <EditableText
                    key={i}
                    fieldKey={`overview.body.${i}`}
                    defaultValue={para}
                    as="p"
                    className="text-base leading-relaxed text-espresso/70"
                  >
                    <AutoLinkedText>{para}</AutoLinkedText>
                  </EditableText>
                ))}
              </div>
              <a
                href="tel:8663110003"
                className="mt-8 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta"
              >
                <i className="ri-phone-line" /> Speak with a Counselor
              </a>
            </div>

            <div className="self-start">
              <div className="border border-sand-dark bg-sand">
                <div className="border-b border-sand-dark bg-navy px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-terracotta">At a Glance</p>
                </div>
                <div className="divide-y divide-sand-dark">
                  {data.keyFacts.map((fact, i) => (
                    <div key={fact.label} className="flex items-center gap-4 px-6 py-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white">
                        <i className={`${fact.icon} text-base text-navy`} />
                      </span>
                      <div>
                        <EditableText
                          fieldKey={`keyFacts.${i}.label`}
                          defaultValue={fact.label}
                          as="p"
                          className="text-[10px] font-semibold uppercase tracking-[0.1em] text-espresso/40"
                        >
                          <AutoLinkedText>{fact.label}</AutoLinkedText>
                        </EditableText>
                        <EditableText
                          fieldKey={`keyFacts.${i}.value`}
                          defaultValue={fact.value}
                          as="p"
                          className="mt-0.5 text-sm font-bold text-navy"
                        >
                          <AutoLinkedText>{fact.value}</AutoLinkedText>
                        </EditableText>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-sand-dark px-6 py-5">
                  <Link
                    href="/insurance/"
                    className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.1em] text-terracotta transition hover:text-navy"
                  >
                    Verify Your Insurance
                    <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-navy-light/50" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-terracotta/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">The Process</p>
              <EditableText
                fieldKey="steps.headline"
                defaultValue={data.stepsHeadline}
                as="h2"
                className="font-heading text-4xl font-bold text-white md:text-5xl"
              >
                <AutoLinkedText>{data.stepsHeadline}</AutoLinkedText>
              </EditableText>
              {data.stepsIntro && (
                <EditableText
                  fieldKey="steps.intro"
                  defaultValue={data.stepsIntro}
                  as="p"
                  className="mt-4 max-w-xl text-base leading-relaxed text-white/55"
                >
                  <AutoLinkedText>{data.stepsIntro}</AutoLinkedText>
                </EditableText>
              )}
            </div>
            <div className="hidden shrink-0 flex-col items-center justify-center border border-white/10 bg-white/5 px-8 py-5 lg:flex">
              <span className="font-heading text-4xl font-bold text-white">{data.steps.length}</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-terracotta">Steps</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[2.375rem] top-0 hidden h-full w-px bg-white/10 lg:block" />
            <div className="flex flex-col divide-y divide-white/10">
              {data.steps.map((step, i) => (
                <div
                  key={step.number}
                  className="group relative grid gap-6 py-7 transition hover:bg-white/3 lg:grid-cols-[auto_1fr_2fr] lg:items-start lg:gap-10"
                >
                  <div className="flex shrink-0 items-center gap-4 lg:flex-col lg:items-center lg:gap-3">
                    <div className="relative hidden lg:flex">
                      <div className="h-[5px] w-[5px] rounded-full bg-terracotta ring-4 ring-navy ring-offset-0 transition group-hover:scale-125" />
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-terracotta/15 transition group-hover:bg-terracotta/25">
                      <i className={`${step.icon} text-lg text-terracotta`} />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="mb-1 font-heading text-6xl font-bold leading-none text-white/8 transition group-hover:text-white/12">
                      {step.number}
                    </span>
                    <EditableText
                      fieldKey={`steps.${i}.title`}
                      defaultValue={step.title}
                      as="h3"
                      className="font-heading text-xl font-bold leading-snug text-white"
                    >
                      <AutoLinkedText>{step.title}</AutoLinkedText>
                    </EditableText>
                  </div>
                  <div className="flex items-center">
                    <EditableText
                      fieldKey={`steps.${i}.body`}
                      defaultValue={step.body}
                      as="p"
                      className="text-sm leading-relaxed text-white/60"
                    >
                      <AutoLinkedText>{step.body}</AutoLinkedText>
                    </EditableText>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-8">
            <EditableText
              fieldKey="steps.footerNote"
              defaultValue="Each step is guided by our clinical team — you are never alone in this process."
              as="p"
              className="text-xs font-semibold text-white/30"
            >
              <AutoLinkedText>
                Each step is guided by our clinical team — you are never alone in this process.
              </AutoLinkedText>
            </EditableText>
            <a
              href="tel:8663110003"
              className="inline-flex items-center gap-2 bg-terracotta px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-line" /> Start Today
            </a>
          </div>
        </div>
      </section>

      {data.warningHeadline && (
        <section className="bg-sand py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Important</p>
                <EditableText
                  fieldKey="warning.headline"
                  defaultValue={data.warningHeadline}
                  as="h2"
                  className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl"
                >
                  <AutoLinkedText>{data.warningHeadline}</AutoLinkedText>
                </EditableText>
                <div className="mt-5 space-y-4">
                  {(data.warningBody ?? []).map((p, i) => (
                    <EditableText
                      key={i}
                      fieldKey={`warning.body.${i}`}
                      defaultValue={p}
                      as="p"
                      className="text-base leading-relaxed text-espresso/70"
                    >
                      <AutoLinkedText>{p}</AutoLinkedText>
                    </EditableText>
                  ))}
                </div>
              </div>
              {data.warningPoints && (
                <div className="flex flex-col gap-4">
                  <EditableText
                    fieldKey="warning.pointsTitle"
                    defaultValue="Withdrawal Symptoms Without Medical Support"
                    as="p"
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/40"
                  >
                    <AutoLinkedText>Withdrawal Symptoms Without Medical Support</AutoLinkedText>
                  </EditableText>
                  <div className="grid grid-cols-2 gap-px overflow-hidden border border-sand-dark bg-sand-dark">
                    {data.warningPoints.map((point, i) => (
                      <div
                        key={point}
                        className={`flex items-center gap-3 px-5 py-4 ${i % 2 === 0 ? "bg-white" : "bg-sand"}`}
                      >
                        <i className="ri-error-warning-line text-terracotta" />
                        <EditableText
                          fieldKey={`warning.points.${i}`}
                          defaultValue={point}
                          as="span"
                          className="text-sm font-semibold text-navy"
                        >
                          {point}
                        </EditableText>
                      </div>
                    ))}
                  </div>
                  <EditableText
                    fieldKey="warning.closing"
                    defaultValue="At Northbound, our clinical team is present around the clock to manage every symptom safely — so you never face this alone."
                    as="p"
                    className="text-sm leading-relaxed text-espresso/60"
                  >
                    <AutoLinkedText>
                      At Northbound, our clinical team is present around the clock to manage every symptom safely — so
                      you never face this alone.
                    </AutoLinkedText>
                  </EditableText>
                  <a
                    href="tel:8663110003"
                    className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light"
                  >
                    <i className="ri-phone-line" /> Get Safe Help Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Clinical Excellence</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              Why Choose <span className="italic text-terracotta">Northbound</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.differentiators.map((d, i) => (
              <div
                key={d.title}
                className="group border border-sand-dark p-8 transition hover:border-navy/20 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-sand transition group-hover:bg-navy">
                  <i className={`${d.icon} text-xl text-navy transition group-hover:text-terracotta`} />
                </div>
                <EditableText
                  fieldKey={`differentiators.${i}.title`}
                  defaultValue={d.title}
                  as="h3"
                  className="font-heading text-lg font-bold text-navy"
                >
                  <AutoLinkedText>{d.title}</AutoLinkedText>
                </EditableText>
                <EditableText
                  fieldKey={`differentiators.${i}.body`}
                  defaultValue={d.body}
                  as="p"
                  className="mt-3 text-sm leading-relaxed text-espresso/65"
                >
                  <AutoLinkedText>{d.body}</AutoLinkedText>
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <EditableText
            fieldKey="continuum.eyebrow"
            defaultValue="Your Recovery Journey"
            as="p"
            className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"
          >
            <AutoLinkedText>Your Recovery Journey</AutoLinkedText>
          </EditableText>
          <div className="relative flex flex-wrap items-stretch justify-center gap-px overflow-hidden border border-white/10">
            {data.continuum.map((step, i) => (
              <Link
                key={step.label}
                href={step.href}
                className={`group relative flex min-w-[110px] flex-1 flex-col items-center gap-2 px-5 py-5 text-center transition ${
                  step.current ? "bg-terracotta" : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <i
                  className={`${step.icon} text-xl ${step.current ? "text-white" : "text-white/50 group-hover:text-terracotta"}`}
                />
                <EditableText
                  fieldKey={`continuum.${i}.label`}
                  defaultValue={step.label}
                  as="span"
                  className={`text-xs font-bold leading-tight ${step.current ? "text-white" : "text-white/60 group-hover:text-white"}`}
                >
                  {step.label}
                </EditableText>
                {step.current && (
                  <span className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-white" />
                )}
              </Link>
            ))}
          </div>
          <EditableText
            fieldKey="continuum.hint"
            defaultValue="Highlighted step = current program · Click any step to learn more"
            as="p"
            className="mt-5 text-center text-[11px] text-white/30"
          >
            <AutoLinkedText>Highlighted step = current program · Click any step to learn more</AutoLinkedText>
          </EditableText>
        </div>
      </section>

      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <div className="lg:pt-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Common Questions</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                Frequently Asked <span className="italic text-terracotta">Questions</span>
              </h2>
              <EditableText
                fieldKey="faqs.intro"
                defaultValue="Have a question not answered here? Call our admissions team — they're available 24/7."
                as="p"
                className="mt-5 text-base leading-relaxed text-espresso/65"
              >
                <AutoLinkedText>
                  Have a question not answered here? Call our admissions team — they&apos;re available 24/7.
                </AutoLinkedText>
              </EditableText>
              <a
                href="tel:8663110003"
                className="mt-7 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta"
              >
                <i className="ri-phone-line" /> (866) 311-0003
              </a>
            </div>

            <div className="divide-y divide-sand-dark">
              {data.faqs.map((faq, i) => (
                <FaqAccordionItem
                  key={faq.q}
                  initialOpen={i === 0}
                  question={
                    <EditableText fieldKey={`faqs.${i}.q`} defaultValue={faq.q} as="span">
                      <AutoLinkedText>{faq.q}</AutoLinkedText>
                    </EditableText>
                  }
                  answer={
                    <EditableText fieldKey={`faqs.${i}.a`} defaultValue={faq.a} as="span">
                      <AutoLinkedText>{faq.a}</AutoLinkedText>
                    </EditableText>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <EditableCtaBanner
        headline={data.ctaHeadline}
        body={data.ctaBody}
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}
