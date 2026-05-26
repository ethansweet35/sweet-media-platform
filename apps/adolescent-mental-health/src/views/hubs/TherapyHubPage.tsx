import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AccentText,
  AmhButton,
  ClinicalMethodsSection,
  DarkCtaSection,
  Heading,
  IopModalityContextSection,
  MarketingPage,
  PageHero,
  PageSection,
  SectionHeader,
  SessionStructureSection,
} from "@/components/marketing";
import { THERAPY_PROGRAM_LINKS } from "@/lib/treatment-programs";
import { CONTAINER, HUB_IMGS, SITE } from "@/lib/site";

const therapyStats = [
  { value: "3", label: "Core delivery formats", icon: "ri-layout-grid-line" },
  { value: "CBT + DBT", label: "Evidence-based frameworks", icon: "ri-brain-line" },
  { value: "9–20h", label: "Weekly hours in Virtual IOP", icon: "ri-time-line" },
  { value: "100%", label: "Virtual sessions", icon: "ri-video-chat-line" },
];

const clinicalMethods = [
  {
    icon: "ri-user-heart-line",
    tag: "Individual",
    title: "One-on-one therapy for teens",
    body: "Private sessions with a consistent licensed clinician — the relational anchor where sensitive work happens and coping skills are built one-on-one.",
  },
  {
    icon: "ri-group-line",
    tag: "Group",
    title: "Group therapy with adolescents",
    body: "Small peer groups for CBT and DBT skills practice, normalization, and connection — coordinated with each teen's individual treatment plan.",
  },
  {
    icon: "ri-home-heart-line",
    tag: "Family",
    title: "Family therapy & caregiver coaching",
    body: "Structured family sessions and parent coaching so home environments reinforce progress between clinical appointments.",
  },
  {
    icon: "ri-brain-line",
    tag: "Evidence-based",
    title: "CBT & DBT across every modality",
    body: "The same evidence-based frameworks run through individual, group, and family work — so skills transfer across settings instead of staying siloed.",
  },
];

const iopModalities = [
  {
    icon: "ri-user-heart-line",
    label: "Individual therapy",
    cadence: "2–3 sessions per week",
    desc: "Goal-setting, safety planning, and skills practice with a consistent clinician who knows your teen's history and triggers.",
    active: false,
    href: "/therapy/individual-therapy-for-teens",
  },
  {
    icon: "ri-group-line",
    label: "Group therapy",
    cadence: "3–4 sessions per week",
    desc: "Peer skills groups where teens practice DBT and CBT tools, normalize struggle, and build accountability without performance pressure.",
    active: false,
    href: "/therapy/group-therapy-with-adolescents",
  },
  {
    icon: "ri-home-heart-line",
    label: "Family therapy",
    cadence: "1–2 sessions per week",
    desc: "Caregiver coaching and structured family sessions so communication, boundaries, and crisis responses improve at home.",
    active: false,
    href: "/therapy/adolescent-family-therapy",
  },
];

const weeklyStack = [
  {
    num: "01",
    icon: "ri-user-heart-line",
    title: "Individual anchor",
    body: "Private sessions establish goals, safety plans, and personalized skill work that group and family sessions reinforce.",
  },
  {
    num: "02",
    icon: "ri-group-line",
    title: "Group skills practice",
    body: "Peers practice emotion regulation, distress tolerance, and social skills in a moderated setting — not a lecture.",
  },
  {
    num: "03",
    icon: "ri-home-heart-line",
    title: "Family integration",
    body: "Parents learn de-escalation, boundary-setting, and how to support homework-style skill practice between sessions.",
  },
  {
    num: "04",
    icon: "ri-loop-right-line",
    title: "Between-session carryover",
    body: "Therapists coordinate across modalities so the same language and skills show up at school, home, and in crisis moments.",
  },
];

export default function TherapyHubPage() {
  return (
    <MarketingPage currentPath="/therapy">
      <PageHero
        glow="left"
        eyebrow="Therapies"
        headline={
          <>
            Modalities built for <AccentText>adolescent development</AccentText>
          </>
        }
        body="Individual, group, and family therapy work together in our Virtual IOP — each modality plays a distinct role in your teen's treatment plan."
        image={{
          src: HUB_IMGS.therapy,
          alt: "Diverse therapy modalities illustrated through teens in individual, group, and family virtual sessions",
          priority: true,
        }}
        actions={
          <AmhButton href="/virtual-iop-for-teens" icon="ri-arrow-right-line">
            See Virtual IOP
          </AmhButton>
        }
      />

      <PageSection bg="surface" contained={false}>
        <div className={CONTAINER}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {therapyStats.map((stat) => (
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
        <SectionHeader eyebrow="Our therapies" title="How each modality supports recovery" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {THERAPY_PROGRAM_LINKS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="group rounded-3xl bg-surface p-8 ring-1 ring-border transition hover:ring-accent/40 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <i className={`${item.icon} text-xl`} aria-hidden />
              </span>
              <Heading as={3} className="mt-5">
                {item.label}
              </Heading>
              {item.body ? <p className="mt-3 text-sm leading-7 text-body"><AutoLinkedText>{item.body}</AutoLinkedText></p> : null}
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark group-hover:text-accent">
                Learn more
                <i className="ri-arrow-right-line" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <ClinicalMethodsSection
        title={
          <>
            Evidence-based care
            <br className="hidden lg:block" /> across every modality
          </>
        }
        description="Individual, group, and family therapy are designed to work together in Virtual IOP — not as disconnected add-ons."
        items={clinicalMethods}
      />

      <IopModalityContextSection
        eyebrow="Inside Virtual IOP"
        title="How modalities stack in a typical week"
        description={`Each teen's schedule blends individual, group, and family sessions across ${SITE.ages} — coordinated by one clinical team, not three separate providers.`}
        items={iopModalities}
        footerHref="/virtual-iop-for-teens"
        footerLabel="Explore the full Virtual IOP schedule"
      />

      <SessionStructureSection
        eyebrow="Integrated care"
        title="Skills that transfer across settings"
        description="The point of combining modalities is not more appointments — it is the same coping language showing up when your teen is alone, with peers, and with family."
        phases={weeklyStack}
        bg="surface"
        footer={
          <div className="mt-10 flex flex-wrap gap-4">
            <AmhButton href="/online-cognitive-behavioral-therapy" variant="secondary" icon="ri-brain-line">
              CBT overview
            </AmhButton>
            <AmhButton href="/online-dialectical-behavioral-therapy" variant="secondary" icon="ri-contrast-2-line">
              DBT overview
            </AmhButton>
          </div>
        }
      />

      <DarkCtaSection
        title="See how therapy fits your teen's plan"
        description="Admissions can walk you through individual, group, and family sessions — and how CBT and DBT show up across Virtual IOP."
        actions={
          <>
            <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
              Request a consultation
            </AmhButton>
            <AmhButton href="/levels-of-care" variant="darkSecondary" icon="ri-stack-line">
              Compare levels of care
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}
