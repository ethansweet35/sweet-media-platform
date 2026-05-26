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
  SessionStructureSection,
} from "@/components/marketing";
import { LEVELS_OF_CARE_LINKS } from "@/lib/treatment-programs";
import { CONTAINER, HUB_IMGS, SITE } from "@/lib/site";

const locStats = [
  { value: "9–20h", label: "Clinical hours in Virtual IOP", icon: "ri-time-line" },
  { value: "1", label: "Typical weekly outpatient session", icon: "ri-calendar-line" },
  { value: "24–48h", label: "Typical intake timeline", icon: "ri-calendar-check-line" },
  { value: SITE.ages, label: "Ages served", icon: "ri-user-smile-line" },
];

const careContinuum = [
  {
    step: "01",
    label: "Weekly outpatient",
    detail: "1 session per week (typical)",
    tone: "text-body/60",
    active: false,
  },
  {
    step: "02",
    label: "Virtual IOP",
    detail: "9–20 clinical hours per week",
    tone: "text-accent",
    active: true,
  },
  {
    step: "03",
    label: "PHP / day program",
    detail: "Full-day structure, often in person",
    tone: "text-body/60",
    active: false,
  },
  {
    step: "04",
    label: "Inpatient / crisis",
    detail: "24-hour monitoring and stabilization",
    tone: "text-body/60",
    active: false,
  },
];

const fitCriteria = [
  {
    icon: "ri-add-line",
    label: "Symptoms are escalating",
    sub: "Weekly therapy has not stabilized mood, anxiety, or behavior",
  },
  {
    icon: "ri-school-line",
    label: "School or daily life is disrupted",
    sub: "Refusal, withdrawal, or inability to function at home or in class",
  },
  {
    icon: "ri-shield-check-line",
    label: "Medically stable at home",
    sub: "IOP fits when crisis hospitalization is not required right now",
  },
  {
    icon: "ri-arrow-down-line",
    label: "Stepping down from higher care",
    sub: "Structured support to maintain gains after PHP or residential",
  },
  {
    icon: "ri-home-2-line",
    label: "Intensive care without leaving home",
    sub: "Families who want more contact without inpatient separation",
  },
];

const intakeSteps = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Free consultation",
    body: "Share symptoms, timeline, and insurance. Admissions helps you compare weekly therapy vs. Virtual IOP.",
  },
  {
    num: "02",
    icon: "ri-file-list-3-line",
    title: "Insurance verification",
    body: "We confirm benefits and out-of-pocket costs before enrollment — most major plans cover adolescent IOP telehealth.",
  },
  {
    num: "03",
    icon: "ri-clipboard-line",
    title: "Clinical assessment",
    body: "A licensed clinician evaluates safety, level-of-care fit, and whether Virtual or Adolescent IOP is appropriate.",
  },
  {
    num: "04",
    icon: "ri-video-chat-line",
    title: "Begin IOP",
    body: "We build a weekly schedule around school. Many families start within 24–48 hours after the first call.",
  },
];

export default function LevelsOfCareHubPage() {
  return (
    <MarketingPage currentPath="/levels-of-care">
      <PageHero
        glow="both"
        eyebrow="Levels of Care"
        headline={
          <>
            When teens need <AccentText>more than weekly therapy</AccentText>
          </>
        }
        body="Virtual IOP provides 9–20 hours of coordinated clinical care per week — a structured step between outpatient therapy and hospitalization for teens ages 12–17."
        image={{
          src: HUB_IMGS.levelsOfCare,
          alt: "Clinical care levels diagram showing virtual IOP as structured support between outpatient therapy and hospitalization",
          priority: true,
        }}
        actions={
          <>
            <AmhButton href="/admissions" icon="ri-arrow-right-line">
              Admissions process
            </AmhButton>
            <AmhButton href="/contact" variant="secondary">
              Contact us
            </AmhButton>
          </>
        }
      />

      <PageSection bg="surface" contained={false}>
        <div className={CONTAINER}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locStats.map((stat) => (
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
          title="Our levels of care"
          description="Compare Virtual IOP and Adolescent IOP to find the right intensity for your teen."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {LEVELS_OF_CARE_LINKS.map((program) => (
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
        </div>
      </PageSection>

      <PageSection bg="dark" contained={false}>
        <div className={CONTAINER}>
          <SectionHeader
            light
            eyebrow="Care continuum"
            title="Where Virtual IOP sits on the spectrum"
            description="Many families start with weekly therapy. When symptoms affect school, safety, or daily life, Virtual IOP adds structured hours without inpatient separation."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careContinuum.map((step) => (
              <div
                key={step.step}
                className={`rounded-3xl p-6 ${
                  step.active
                    ? "bg-accent/10 ring-2 ring-accent/40"
                    : "border border-white/10 bg-white/[0.03]"
                }`}
              >
                <p className={`text-xs font-bold ${step.active ? "text-accent" : "text-white/40"}`}><AutoLinkedText>{step.step}</AutoLinkedText></p>
                <p
                  className={`mt-3 text-lg font-bold ${step.active ? "text-white" : "text-white/70"}`}
                  style={{ fontFamily: "var(--font-heebo)" }}
                ><AutoLinkedText>{step.label}</AutoLinkedText></p>
                <p className={`mt-2 text-sm ${step.tone}`}><AutoLinkedText>{step.detail}</AutoLinkedText></p>
                {step.active ? (
                  <span className="mt-4 inline-flex rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    Our programs
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection bg="surface">
        <SectionHeader
          eyebrow="Compare levels"
          title="Outpatient vs. Virtual IOP"
          description={`Many families start with weekly therapy. When symptoms affect school, safety, or daily life, Virtual IOP offers more frequent contact without inpatient separation — serving teens ages ${SITE.ages}.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 ring-1 ring-border">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Weekly outpatient</p>
            <ul className="mt-6 grid gap-3 text-sm text-body">
              <li className="flex gap-2">
                <i className="ri-check-line mt-0.5 text-accent" aria-hidden />
                1 session per week (typical)
              </li>
              <li className="flex gap-2">
                <i className="ri-check-line mt-0.5 text-accent" aria-hidden />
                Good for mild–moderate symptoms
              </li>
              <li className="flex gap-2">
                <i className="ri-check-line mt-0.5 text-accent" aria-hidden />
                Less structure between sessions
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-dark p-8 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Virtual IOP</p>
            <ul className="mt-6 grid gap-3 text-sm text-white/70">
              <li className="flex gap-2">
                <i className="ri-check-line mt-0.5 text-accent" aria-hidden />
                9–20 clinical hours per week
              </li>
              <li className="flex gap-2">
                <i className="ri-check-line mt-0.5 text-accent" aria-hidden />
                Individual + group + family therapy
              </li>
              <li className="flex gap-2">
                <i className="ri-check-line mt-0.5 text-accent" aria-hidden />
                Ideal when symptoms disrupt school or safety
              </li>
            </ul>
          </div>
        </div>
      </PageSection>

      <GoodFitSection
        title="Signs your teen may need Virtual IOP"
        description="Level-of-care decisions weigh safety, functioning, and how much structure your teen needs between sessions. These patterns often point toward intensive outpatient care."
        criteria={fitCriteria}
        ctaHref="/contact"
        ctaLabel="Ask about level of care"
        asideNote={{
          label: "Crisis or hospitalization?",
          body: "If your teen is in immediate danger, call 988 or go to the nearest emergency room. IOP is for teens who are medically stable at home but need more than weekly therapy.",
        }}
      />

      <SessionStructureSection
        eyebrow="Getting started"
        title="From first call to first IOP session"
        description="We keep intake clear and family-friendly — most families complete assessment and scheduling within a few days."
        phases={intakeSteps}
        bg="surface"
        footer={
          <div className="mt-10">
            <AmhButton href="/admissions" icon="ri-arrow-right-line">
              Full admissions guide
            </AmhButton>
          </div>
        }
      />

      <DarkCtaSection
        title="Find the right level of care for your teen"
        description="Free consultations are confidential. We verify insurance and help you understand whether Virtual IOP is the right next step."
        actions={
          <>
            <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
              Request a consultation
            </AmhButton>
            <AmhButton href={SITE.phone.href} variant="darkSecondary" icon="ri-phone-fill" iconPosition="left">
              {SITE.phone.display}
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}
