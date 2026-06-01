import VirtualLpCtaBanner from "./VirtualLpCtaBanner";
import VirtualLpFaq from "./VirtualLpFaq";
import VirtualLpHero from "./VirtualLpHero";
import VirtualLpSectionHeader from "./VirtualLpSectionHeader";
import VirtualLpStickyCta from "./VirtualLpStickyCta";
import { LpCallCta, LpInlineCta, LpVerifyCta } from "./LpOnPageCta";
import {
  ADMISSIONS_PHONE_DISPLAY,
  APPROPRIATE_FOR,
  CLINICAL_SERVICES,
  HOW_IT_WORKS_STEPS,
  NETWORK_BRANDS,
  NOT_APPROPRIATE_FOR,
  PATHWAY_CARDS,
  PROGRAM_FINDER,
  VERIFY_INSURANCE_HREF,
  VIRTUAL_BENEFITS,
  VIRTUAL_LP_SCROLL_MARGIN,
} from "./content";

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";
const SECTION = `py-20 lg:py-28 ${VIRTUAL_LP_SCROLL_MARGIN}`;

export default function VirtualLpPage() {
  return (
    <div className="pb-24 md:pb-0">
      <VirtualLpHero />
      <VirtualLpStickyCta />

      {/* Network overview */}
      <section id="network" className={`bg-sand ${SECTION}`}>
        <div className={CONTAINER}>
          <VirtualLpSectionHeader
            eyebrow="Northbound Treatment Network"
            headline="One Network. Four Virtual Care Pathways."
            italicWord="Four"
            body="Not every person needs the same type of virtual treatment. This page helps you find the right program based on what you are facing, how you want to receive care, and what type of support environment fits you best."
            align="center"
            bodyWidth="max-w-3xl"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NETWORK_BRANDS.map((brand, idx) => (
              <div
                key={`${brand.name}-${brand.focus}`}
                className={`border-l-4 p-6 ${brand.accent}`}
              >
                <span
                  className={`mb-4 flex h-11 w-11 items-center justify-center ${brand.iconBg}`}
                >
                  <i className={[brand.icon, "text-xl"].filter(Boolean).join(" ")} aria-hidden />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/60">{brand.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-espresso/80">{brand.focus}</p>
              </div>
            ))}
          </div>

          {/* Pathway map */}
          <div className="mt-16 hidden lg:block">
            <div className="relative flex items-center justify-between rounded-sm border border-sand-dark bg-white px-8 py-10">
              <div className="absolute left-[12%] right-[12%] top-1/2 h-px -translate-y-1/2 bg-sand-dark" />
              {[
                { label: "Substance Use", icon: "ri-capsule-line", color: "bg-navy" },
                { label: "Mental Health", icon: "ri-brain-line", color: "bg-agave" },
                { label: "Women's SUD", icon: "ri-women-line", color: "bg-terracotta" },
                {
                  label: "Eating Disorders",
                  icon: "ri-heart-pulse-line",
                  color: "bg-terracotta-light",
                },
              ].map((node, mapIdx) => (
                <div key={node.label} className="relative z-10 flex flex-col items-center gap-3">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md ${node.color}`}
                  >
                    <i className={[node.icon, "text-2xl text-white"].filter(Boolean).join(" ")} aria-hidden />
                  </span>
                  <span className="text-center text-xs font-semibold uppercase tracking-wide text-navy">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program pathway cards */}
      <section id="programs" className={`bg-white ${SECTION}`}>
        <div className={CONTAINER}>
          <VirtualLpSectionHeader
            eyebrow="Virtual Programs"
            headline="Choose the Pathway That Fits You"
            italicWord="Fits"
            body="Each program is delivered through secure video sessions with licensed clinicians. Explore the option that best matches your clinical needs and personal preferences."
            align="center"
            bodyWidth="max-w-3xl"
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {PATHWAY_CARDS.map((card, cardIdx) => (
              <article
                key={card.programName}
                className={`relative flex flex-col border border-sand-dark p-8 lg:p-10 ${card.cardBg}`}
              >
                <div className={`absolute left-0 top-0 h-1 w-full ${card.accentBar}`} />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta">{card.brand}</span>
                  <span className="rounded-full border border-sand-dark bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-navy/70">{card.brandTag}</span>
                </div>
                <span
                  className={`mt-6 flex h-12 w-12 items-center justify-center ${card.accentBar} text-white`}
                >
                  <i className={[card.icon, "text-2xl text-white"].filter(Boolean).join(" ")} aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-bold text-navy">{card.programName}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-espresso/50">
                  Best for
                </p>
                <p className="mt-1 text-sm leading-relaxed text-espresso/75">{card.bestFor}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {card.features.map((feature, featureIdx) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-espresso/70">
                      <i className="ri-check-line mt-0.5 shrink-0 text-terracotta" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <LpVerifyCta label={card.ctaLabel} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Program finder */}
      <section id="find-program" className={`bg-navy ${SECTION}`}>
        <div className={CONTAINER}>
          <VirtualLpSectionHeader
            eyebrow="Decision Support"
            headline="Find the Virtual Program That Fits Your Needs"
            italicWord="Fits"
            dark
            align="center"
            bodyWidth="max-w-3xl"
          />

          <div className="mt-14 space-y-4">
            {PROGRAM_FINDER.map((item, idx) => (
              <div
                key={item.scenario}
                className="flex flex-col gap-4 border border-white/10 bg-white/5 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-terracotta/20 text-terracotta">
                    <i className={[item.icon, "text-xl"].filter(Boolean).join(" ")} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-white/60">If you are looking for…</p>
                    <p className="mt-1 font-heading text-lg font-bold text-white md:text-xl">{item.scenario}</p>
                    <p className="mt-2 text-sm text-white/75">
                      We recommend{" "}
                      <span className="font-semibold text-terracotta-light">{item.recommend}</span>
                    </p>
                  </div>
                </div>
                <LpInlineCta label="Verify Insurance" />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-white/70">Not sure where to start? Speak with admissions and we'll help you find the right fit.</p>
            <LpCallCta
              label={`Speak With Admissions — ${ADMISSIONS_PHONE_DISPLAY}`}
              className="mt-5"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className={`bg-sand ${SECTION}`}>
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <VirtualLpSectionHeader
              eyebrow="Why Virtual Care"
              headline="Structured Treatment Without Leaving Home"
              italicWord="Home"
              body="Virtual outpatient care across the Northbound network combines clinical structure with the flexibility many people need to stay engaged in daily life."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {VIRTUAL_BENEFITS.map((benefit, idx) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 border border-sand-dark bg-white p-4 text-sm leading-relaxed text-espresso/75"
                >
                  <i className="ri-wifi-line mt-0.5 shrink-0 text-terracotta" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className={`bg-white ${SECTION}`}>
        <div className={CONTAINER}>
          <VirtualLpSectionHeader
            eyebrow="Admissions Process"
            headline="How Virtual Treatment Works"
            italicWord="Works"
            align="center"
            bodyWidth="max-w-3xl"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="relative border border-sand-dark bg-sand/30 p-8 pt-10"
              >
                <span className="absolute -top-4 left-6 bg-terracotta px-3 py-1 font-heading text-sm font-bold text-white">
                  {step.number}
                </span>
                <h3 className="font-heading text-xl font-bold text-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical services */}
      <section className={`bg-sand py-20 lg:py-24 ${VIRTUAL_LP_SCROLL_MARGIN}`}>
        <div className={CONTAINER}>
          <VirtualLpSectionHeader
            eyebrow="Clinical Services"
            headline="Comprehensive Virtual Care Across the Network"
            italicWord="Network"
            align="center"
            body="Depending on your program and clinical assessment, services may include the following when clinically appropriate."
            bodyWidth="max-w-3xl"
          />
          <ul className="mt-12 flex flex-wrap justify-center gap-2">
            {CLINICAL_SERVICES.map((service, idx) => (
              <li
                key={service}
                className="border border-sand-dark bg-white px-4 py-2.5 text-sm font-medium text-navy"
              >
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <section className={`bg-white ${SECTION}`}>
        <div className={CONTAINER}>
          <VirtualLpSectionHeader
            eyebrow="Clinical Fit"
            headline="Who Virtual Outpatient Care May Be Appropriate For"
            italicWord="Appropriate"
            align="center"
            bodyWidth="max-w-3xl"
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="border border-sand-dark bg-sand/40 p-8">
              <h3 className="font-heading text-xl font-bold text-navy">Virtual outpatient care may be appropriate for people who:</h3>
              <ul className="mt-6 space-y-3">
                {APPROPRIATE_FOR.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-espresso/75">
                    <i className="ri-check-line mt-0.5 shrink-0 text-agave" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-sand-dark p-8">
              <h3 className="font-heading text-xl font-bold text-navy">Virtual outpatient may not be appropriate for people who:</h3>
              <ul className="mt-6 space-y-3">
                {NOT_APPROPRIATE_FOR.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-espresso/75">
                    <i className="ri-close-line mt-0.5 shrink-0 text-terracotta" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-2xl rounded-sm border border-terracotta/30 bg-terracotta/5 px-6 py-4 text-center text-sm leading-relaxed text-espresso/80">
            <strong className="text-navy">If you are in immediate danger or crisis,</strong> call{" "}
            <a href="tel:911" className="font-semibold text-terracotta underline-offset-2 hover:underline">
              911
            </a>{" "}
            or{" "}
            <a href="tel:988" className="font-semibold text-terracotta underline-offset-2 hover:underline">
              988
            </a>
            . Virtual care is not right for everyone, and a clinical assessment helps determine the
            safest level of care.
          </p>
        </div>
      </section>

      {/* Insurance */}
      <section
        id="insurance"
        className={`relative overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-light/80 ${SECTION}`}
      >
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
        <div className={`${CONTAINER} relative z-10 text-center`}>
          <VirtualLpSectionHeader
            eyebrow="Insurance"
            headline="Insurance May Cover Virtual Outpatient Treatment"
            italicWord="May"
            dark
            align="center"
            body="Many major insurance plans provide coverage for virtual IOP and outpatient care. Our admissions team can verify your benefits confidentially and explain your options before you begin treatment. Coverage is not guaranteed and depends on your plan."
            bodyWidth="max-w-3xl"
          />
          <a
            href={VERIFY_INSURANCE_HREF}
            className="mt-10 inline-flex items-center gap-2 bg-terracotta px-10 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-terracotta-light"
          >
            <i className="ri-shield-check-line" />
            <span>Verify Insurance</span>
          </a>
          <p className="mt-6 text-xs text-white/45">Benefits verification is confidential. We do not guarantee coverage or reimbursement.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`bg-sand ${SECTION}`}>
        <div className={CONTAINER}>
          <VirtualLpSectionHeader
            eyebrow="FAQ"
            headline="Common Questions About Virtual Outpatient Care"
            italicWord="Virtual"
            align="center"
            bodyWidth="max-w-3xl"
          />
          <div className="mx-auto mt-14 max-w-3xl">
            <VirtualLpFaq />
          </div>
        </div>
      </section>

      <VirtualLpCtaBanner />
    </div>
  );
}
