import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AmhButton,
  ComparisonTable,
  DarkCtaSection,
  GoodFitSection,
  MarketingPage,
  ProgramHeroSection,
  SessionStructureSection,
  TherapyFaqSection,
} from "@/components/marketing";
import type { LgbtqTreatmentConfig } from "@/lib/lgbtq-treatment-page";
import { CONTAINER, LGBTQ_IMGS, SITE } from "@/lib/site";

type LgbtqTeenMentalHealthPageProps = {
  config: LgbtqTreatmentConfig;
};

const affirmingStats = [
  { value: "2×", label: "higher mental health burden for LGBTQ+ youth (CDC)", icon: "ri-bar-chart-grouped-line" },
  { value: "Affirming", label: "names, pronouns & family support matter", icon: "ri-heart-3-line" },
  { value: "9–20", label: "clinical hours per week in Virtual IOP", icon: "ri-time-line" },
  { value: "24–48", label: "hours typical intake timeline", icon: "ri-calendar-check-line" },
];

const stressProfiles = [
  {
    icon: "ri-user-heart-line",
    title: "Gender dysphoria distress",
    body: "Body-related discomfort, social transition stress, or uncertainty that affects mood, sleep, and daily functioning.",
  },
  {
    icon: "ri-emotion-sad-line",
    title: "Depression & withdrawal",
    body: "Hopelessness, isolation, or loss of interest — especially when identity is dismissed or debated at home.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Anxiety & social fear",
    body: "Fear of bullying, outing, or rejection at school — leading to avoidance, panic, or constant vigilance.",
  },
  {
    icon: "ri-home-heart-line",
    title: "Family conflict",
    body: "Tension with caregivers who are learning, disagree, or struggle to use affirming language consistently.",
  },
];

const invalidationShifts = [
  { before: "Waiting for teens to \"figure it out\" alone", after: "Structured therapy with affirming clinicians at the teen's pace" },
  { before: "Debating identity at home without support", after: "Family coaching focused on safety, respect, and communication" },
  { before: "Assuming weekly therapy is enough during crisis", after: "Virtual IOP with multiple sessions per week when symptoms escalate" },
  { before: "Avoiding the topic to prevent conflict", after: "Clinician-guided conversations that reduce shame and isolation" },
];

const coOccurringPrograms = [
  { icon: "ri-heart-pulse-line", label: "Anxiety", detail: "Social anxiety, panic, and school stress when environments feel unsafe.", path: "/online-anxiety-treatment" },
  { icon: "ri-emotion-sad-line", label: "Depression", detail: "Persistent low mood and withdrawal — treated with behavioral activation in IOP.", path: "/teen-depression-treatment" },
  { icon: "ri-hand-heart-line", label: "Self-harm", detail: "DBT-informed safety planning when dysregulation or NSSI co-occurs.", path: "/conditions/self-harm" },
  { icon: "ri-school-line", label: "School avoidance", detail: "Refusal patterns tied to bullying or identity-related school stress.", path: "/conditions/school-avoidance" },
];

const affirmingSupports = [
  "Chosen name and pronouns used in all sessions",
  "Therapist matching when LGBTQ+ experience is requested",
  "Family psychoeducation for affirming home environments",
  "Coordination with medical providers when families authorize",
];

export default function LgbtqTeenMentalHealthPage({ config }: LgbtqTeenMentalHealthPageProps) {
  return (
    <MarketingPage currentPath={config.path}>
      <ProgramHeroSection
        eyebrow={config.hero.eyebrow}
        headline={
          <>
            {config.hero.headline.before}
            <span className="text-accent">{config.hero.headline.accent}</span>
            {config.hero.headline.after}
          </>
        }
        body={config.hero.body}
        imageSrc={LGBTQ_IMGS.hero}
        imageAlt={config.hero.imageAlt}
        imageClassName="object-cover object-center"
        stats={config.hero.stats}
        trustItems={config.hero.trustItems}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {affirmingStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3 px-6 py-8 sm:px-8">
                <i className={`${stat.icon} text-xl text-accent`} aria-hidden />
                <p className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  <AutoLinkedText>{stat.value}</AutoLinkedText>
                </p>
                <p className="text-xs leading-5 text-body">
                  <AutoLinkedText>{stat.label}</AutoLinkedText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              <AutoLinkedText>{"LGBTQ+ adolescent mental health"}</AutoLinkedText>
            </p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              When identity stress shows up as anxiety, mood changes, or withdrawal
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>
                {"LGBTQ+ teens are not struggling because of who they are — they often struggle because of how they are\n              treated. Affirming clinical care reduces shame and helps teens engage in the skills work that drives recovery."}
              </AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stressProfiles.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:border-accent/40 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <i className={`${item.icon} text-xl`} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-body">
                  <AutoLinkedText>{item.body}</AutoLinkedText>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_400px]">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border lg:p-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                <AutoLinkedText>{config.overview.eyebrow}</AutoLinkedText>
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-[1.1] text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                {config.overview.title}
              </h3>
              {config.overview.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-5 max-w-xl text-sm leading-8 text-body">
                  <AutoLinkedText>{paragraph}</AutoLinkedText>
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-2">
                {config.overview.focusItems.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-2 text-xs font-semibold text-ink"
                  >
                    <i className={`${item.icon} text-accent`} aria-hidden />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl ring-1 ring-border lg:min-h-full">
              <Image
                src={LGBTQ_IMGS.bento}
                alt={config.overview.bentoAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6">
                <p className="text-sm font-bold text-white">
                  <AutoLinkedText>{config.overview.calloutTitle}</AutoLinkedText>
                </p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  <AutoLinkedText>{config.overview.calloutBody}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              <AutoLinkedText>{"Why affirmation matters clinically"}</AutoLinkedText>
            </p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heebo)" }}>
              Invalidation increases risk — affirming care reduces it
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>
                {"Research consistently links family acceptance and affirming environments to better mental health\n              outcomes for LGBTQ+ youth. Our IOP adds frequent clinical contact so teens are not carrying identity\n              stress alone between weekly appointments."}
              </AutoLinkedText>
            </p>
          </div>
          <div className="mt-10 space-y-3">
            {invalidationShifts.map((row) => (
              <div
                key={row.before}
                className="grid gap-3 rounded-2xl bg-surface p-5 ring-1 ring-border sm:grid-cols-2 sm:gap-6 sm:p-6"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-body/50">Common pattern</p>
                  <p className="mt-2 text-sm leading-6 text-body">
                    <AutoLinkedText>{row.before}</AutoLinkedText>
                  </p>
                </div>
                <div className="border-t border-border pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Affirming IOP approach</p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    <AutoLinkedText>{row.after}</AutoLinkedText>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              <AutoLinkedText>{config.pillars.eyebrow}</AutoLinkedText>
            </p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              {config.pillars.title}
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{config.pillars.description}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {config.pillars.items.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl bg-white p-8 ring-1 ring-border">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent-dark">
                    {pillar.tag}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-accent">
                    <i className={`${pillar.icon} text-base`} aria-hidden />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-body">
                  <AutoLinkedText>{pillar.body}</AutoLinkedText>
                </p>
                <ul className="mt-5 space-y-2">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-body">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="overflow-hidden rounded-3xl bg-dark ring-1 ring-white/10">
            <div className="grid lg:grid-cols-[1fr_340px]">
              <div className="p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Affirming care in practice</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  Therapy that respects identity — with intensive support
                </h2>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  <AutoLinkedText>
                    {"Virtual IOP combines affirming individual therapy, moderated peer groups, and family coaching —\n                  so teens get more than a supportive conversation once a week."}
                  </AutoLinkedText>
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {affirmingSupports.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AmhButton href="/virtual-iop-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
                    Virtual IOP program
                  </AmhButton>
                  <AmhButton href="/therapy/adolescent-family-therapy" variant="darkSecondary" icon="ri-arrow-right-line">
                    Family therapy
                  </AmhButton>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  <AutoLinkedText>{"Parents often notice"}</AutoLinkedText>
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    "Mood swings tied to school or social settings",
                    "Withdrawal after family conflict about identity",
                    "Increased anxiety when deadname or misgendering occurs",
                    "Self-harm or safety concerns during identity-related stress",
                  ].map((sign) => (
                    <div key={sign} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <i className="ri-alert-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      <span className="text-sm leading-6 text-white/70">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Integrated treatment</p>
            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Identity stress rarely travels alone
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>
                {"Many LGBTQ+ teens also meet criteria for anxiety, depression, trauma, or self-harm — IOP treats the\n              full clinical picture in one coordinated plan."}
              </AutoLinkedText>
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {coOccurringPrograms.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className="group flex flex-col rounded-3xl bg-surface p-6 ring-1 ring-border transition hover:ring-accent/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <i className={`${item.icon} text-xl`} aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink group-hover:text-accent" style={{ fontFamily: "var(--font-heebo)" }}>
                  {item.label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-body">{item.detail}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-dark">
                  Learn more
                  <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoodFitSection
        eyebrow={config.fit.eyebrow}
        title={config.fit.title}
        description={config.fit.description}
        criteria={config.fit.criteria}
        bg="surface"
        asideNote={{ label: "Good to know", body: config.fit.goodToKnow }}
        showCta={false}
      />

      <SessionStructureSection
        eyebrow={config.intake.eyebrow}
        title={config.intake.title}
        description={config.intake.description}
        phases={config.intake.steps.map((step) => ({
          num: step.num,
          icon: step.icon,
          title: step.title,
          body: step.body,
        }))}
        bg="white"
        footer={
          <p className="mt-6 text-center text-sm text-body">
            <i className="ri-time-line mr-1.5 align-middle text-accent" aria-hidden />
            <AutoLinkedText>{`Typical intake timeline: 24–48 hours · Ages ${SITE.ages}`}</AutoLinkedText>
          </p>
        }
      />

      <section className="bg-dark px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              <AutoLinkedText>{config.comparison.eyebrow}</AutoLinkedText>
            </p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              {config.comparison.title}
            </h2>
          </div>
          <ComparisonTable
            baselineLabel="Standard outpatient"
            highlightedLabel="Virtual IOP"
            rows={config.comparison.rows.map((row) => ({
              label: row.label,
              baseline: row.standard,
              highlighted: row.iop,
            }))}
          />
        </div>
      </section>

      <section className="bg-white px-6 py-section lg:px-10">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              <AutoLinkedText>{config.related.eyebrow}</AutoLinkedText>
            </p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              {config.related.title}
            </h2>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{config.related.description}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.related.items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="group rounded-3xl bg-surface p-6 ring-1 ring-border transition hover:ring-accent/40"
              >
                <h3 className="text-base font-bold text-ink group-hover:text-accent" style={{ fontFamily: "var(--font-heebo)" }}>
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-body">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-dark">
                  Learn more
                  <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TherapyFaqSection title={config.faq.title} items={config.faqs} />

      <DarkCtaSection
        title={config.cta.title}
        description={config.cta.description}
        actions={
          <>
            <AmhButton href={SITE.phone.href} variant="darkPrimary" icon="ri-phone-fill" iconPosition="left">
              Call {SITE.phone.display}
            </AmhButton>
            <AmhButton href="/contact" variant="darkSecondary" icon="ri-arrow-right-line">
              Free consultation
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}
