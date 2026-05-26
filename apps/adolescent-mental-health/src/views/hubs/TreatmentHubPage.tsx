import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AccentText,
  AmhButton,
  DarkCtaSection,
  GoodFitSection,
  Heading,
  MarketingPage,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/marketing";
import { TREATMENT_PROGRAM_LINKS } from "@/lib/treatment-programs";
import { CONTAINER, HUB_IMGS, SITE } from "@/lib/site";

const treatmentStats = [
  { value: "11", label: "Condition-specific tracks", icon: "ri-stack-line" },
  { value: "9–20h", label: "Clinical hours per week in IOP", icon: "ri-time-line" },
  { value: "CBT + DBT", label: "Core modalities in every track", icon: "ri-award-line" },
  { value: SITE.ages, label: "Ages served", icon: "ri-user-smile-line" },
];

const trackProof = [
  {
    icon: "ri-video-chat-line",
    title: "Same Virtual IOP foundation",
    body: "Every treatment track runs through our intensive outpatient model — individual, group, and family therapy with 9–20 clinical hours per week.",
  },
  {
    icon: "ri-focus-3-line",
    title: "Condition-specific clinical focus",
    body: "Clinicians tailor goals, skills, and family coaching to the primary concern — whether that is anxiety, depression, trauma, OCD, or safety.",
  },
  {
    icon: "ri-home-heart-line",
    title: "Family partnership built in",
    body: "Parents receive coaching and structured family sessions so progress continues between appointments — not only in the therapy room.",
  },
];

const chooseTracks = [
  {
    icon: "ri-emotion-line",
    title: "Mood & worry",
    body: "Persistent sadness, panic, or generalized anxiety that disrupts school and daily life.",
    links: [
      { label: "Teen depression", href: "/teen-depression-treatment" },
      { label: "Online anxiety", href: "/online-anxiety-treatment" },
      { label: "Bipolar treatment", href: "/online-bipolar-treatment" },
    ],
  },
  {
    icon: "ri-shield-flash-line",
    title: "Trauma & intrusive symptoms",
    body: "PTSD, OCD, or psychosis-related concerns that need paced, structured virtual care.",
    links: [
      { label: "PTSD treatment", href: "/ptsd-treatment-online" },
      { label: "OCD treatment", href: "/online-ocd-treatment" },
      { label: "Schizophrenia in adolescence", href: "/schizophrenia-in-adolescence" },
    ],
  },
  {
    icon: "ri-hand-heart-line",
    title: "Safety & dysregulation",
    body: "Self-harm, intense emotional swings, or behaviors that worry caregivers between sessions.",
    links: [
      { label: "Self-harm support", href: "/conditions/self-harm" },
      { label: "ADHD for teens", href: "/adhd-treatment-for-teens" },
      { label: "Psychiatrist coordination", href: "/psychiatrist-for-teens" },
    ],
  },
  {
    icon: "ri-school-line",
    title: "School & routines",
    body: "Refusal, avoidance, insomnia, or executive function struggles tied to daily functioning.",
    links: [
      { label: "School avoidance", href: "/conditions/school-avoidance" },
      { label: "Insomnia treatment", href: "/online-insomnia-treatment-for-teens" },
      { label: "Virtual IOP overview", href: "/virtual-iop-for-teens" },
    ],
  },
];

const fitCriteria = [
  {
    icon: "ri-add-line",
    label: "Weekly therapy has not been enough",
    sub: "Symptoms are escalating or progress has stalled",
  },
  {
    icon: "ri-heart-pulse-line",
    label: "A primary condition is clear",
    sub: "Anxiety, depression, trauma, OCD, ADHD, or related concerns",
  },
  {
    icon: "ri-question-line",
    label: "Multiple concerns overlap",
    sub: "Admissions can help match the right track in Virtual IOP",
  },
  {
    icon: "ri-shield-check-line",
    label: "Medically stable at home",
    sub: "IOP is appropriate when crisis hospitalization is not required",
  },
];

export default function TreatmentHubPage() {
  return (
    <MarketingPage currentPath="/treatment">
      <PageHero
        glow="right"
        eyebrow="Treatment"
        headline={
          <>
            Virtual programs for <AccentText>teens {SITE.ages}</AccentText>
          </>
        }
        body="Explore intensive outpatient and specialized treatment tracks — all delivered virtually with licensed clinicians and major insurance coverage."
        image={{
          src: HUB_IMGS.treatment,
          alt: "Teen receiving compassionate virtual mental health treatment from home with family support nearby",
          priority: true,
        }}
        actions={
          <AmhButton href="/contact" icon="ri-arrow-right-line">
            Free assessment
          </AmhButton>
        }
      />

      <PageSection bg="surface" contained={false}>
        <div className={CONTAINER}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {treatmentStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-start gap-4 rounded-2xl bg-white px-5 py-5 ring-1 ring-border"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <i className={`${stat.icon} text-lg`} aria-hidden />
                </span>
                <div>
                  <p className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{stat.value}</AutoLinkedText></p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-body/70"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          eyebrow="Programs"
          title="Treatment options"
          description="Each program combines evidence-based modalities with schedules built around school and family life."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENT_PROGRAM_LINKS.map((program) => (
            <Link
              key={program.path}
              href={program.path}
              className="group flex flex-col rounded-3xl bg-surface p-8 ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-accent/40"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <i className={`${program.icon} text-xl`} aria-hidden />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-dark ring-1 ring-border">
                  {program.tag}
                </span>
              </div>
              <Heading as={3} className="mt-5">
                {program.label}
              </Heading>
              {program.body ? <p className="mt-3 flex-1 text-sm leading-7 text-body"><AutoLinkedText>{program.body}</AutoLinkedText></p> : null}
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark group-hover:text-accent">
                Learn more
                <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
          <Link
            href="/services"
            className="group flex flex-col justify-center rounded-3xl border border-dashed border-accent/40 bg-white p-8 transition hover:border-accent hover:bg-accent/5"
          >
            <p className="text-sm font-semibold text-accent-dark">View all services</p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-body group-hover:text-ink">
              Compare every program
              <i className="ri-arrow-right-line" aria-hidden />
            </span>
          </Link>
        </div>
      </PageSection>

      <PageSection bg="dark" contained={false}>
        <div className={CONTAINER}>
          <SectionHeader
            light
            eyebrow="How tracks work"
            title="Specialized focus inside one IOP model"
            description="Treatment tracks are not separate products — they are clinically focused paths through the same Virtual IOP structure, tailored to what your teen needs most."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {trackProof.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-accent/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <i className={`${item.icon} text-xl`} aria-hidden />
                </span>
                <Heading as={3} light className="mt-5">
                  {item.title}
                </Heading>
                <p className="mt-3 text-sm leading-7 text-white/55"><AutoLinkedText>{item.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <AmhButton href="/virtual-iop-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
              See the full Virtual IOP model
            </AmhButton>
          </div>
        </div>
      </PageSection>

      <PageSection bg="surface">
        <SectionHeader
          eyebrow="How to choose"
          title="Match symptoms to the right track"
          description="Start with the concern that affects daily life most. Admissions can refine the fit during your free consultation."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {chooseTracks.map((group) => (
            <div key={group.title} className="rounded-3xl bg-white p-8 ring-1 ring-border">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <i className={`${group.icon} text-xl`} aria-hidden />
              </span>
              <Heading as={3} className="mt-5">
                {group.title}
              </Heading>
              <p className="mt-3 text-sm leading-7 text-body"><AutoLinkedText>{group.body}</AutoLinkedText></p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-accent-dark transition hover:border-accent hover:text-accent"
                    >
                      {link.label}
                      <i className="ri-arrow-right-line text-[10px]" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageSection>

      <GoodFitSection
        title="When Virtual IOP is the right step"
        description="Most families on this page already know weekly therapy is not enough. These signs suggest intensive outpatient care — with a condition-specific track — may be the next step."
        criteria={fitCriteria}
        ctaHref="/contact"
        ctaLabel="Talk to admissions"
        asideNote={{
          label: "Not sure which track?",
          body: "You do not need to pick the perfect program before calling. We assess fit, safety, and insurance together — then recommend the right clinical focus.",
        }}
      />

      <DarkCtaSection
        title="Find the right treatment track for your teen"
        description="Free consultations are confidential. We verify insurance and help you compare condition-specific Virtual IOP options."
        actions={
          <>
            <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
              Request a consultation
            </AmhButton>
            <AmhButton href="/admissions" variant="darkSecondary" icon="ri-file-list-3-line">
              How admissions works
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}
