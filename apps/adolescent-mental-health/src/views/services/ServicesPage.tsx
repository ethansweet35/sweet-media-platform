import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AccentText,
  AmhButton,
  Eyebrow,
  Heading,
  MarketingPage,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/marketing";
import {
  LEVELS_OF_CARE_LINKS,
  THERAPY_PROGRAM_LINKS,
  TREATMENT_PROGRAM_LINKS,
  type ProgramLink,
} from "@/lib/treatment-programs";
import { SERVICES_IMGS, SITE } from "@/lib/site";

const highlights = [
  {
    icon: "ri-heart-pulse-line",
    title: "Evidence-based modalities",
    body: "CBT, DBT, trauma-informed care, and family systems work — delivered by clinicians who specialize in adolescents.",
  },
  {
    icon: "ri-home-heart-line",
    title: "Virtual-first access",
    body: "Teens receive intensive support from home, staying connected to school, friends, and routines.",
  },
  {
    icon: "ri-parent-line",
    title: "Family partnership",
    body: "Parents are active partners in care through dedicated family therapy and coaching sessions.",
  },
];

function ProgramCard({ program }: { program: ProgramLink }) {
  return (
    <Link
      href={program.path}
      className="group flex flex-col rounded-3xl bg-surface p-8 ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent/20">
          <i className={`${program.icon} text-xl`} aria-hidden />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-dark ring-1 ring-border">
          {program.tag}
        </span>
      </div>
      <Heading as={3} className="mt-5">
        {program.label}
      </Heading>
      {program.body ? <p className="mt-3 flex-1 text-sm leading-7 text-body">{program.body}</p> : null}
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition group-hover:text-accent">
        Learn more
        <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <MarketingPage currentPath="/services">
      <PageHero
        glow="right"
        eyebrow="Services"
        headline={
          <>
            Programs built for <AccentText>teens ages {SITE.ages}</AccentText>
          </>
        }
        body="From Virtual IOP to specialized treatment tracks, every program is designed for adolescent development — not adapted from adult care."
        image={{
          src: SERVICES_IMGS.hero,
          alt: "Teen participating in a virtual group therapy session from a calm home environment",
          priority: true,
        }}
        actions={
          <AmhButton href="/contact" icon="ri-arrow-right-line">
            Talk to admissions
          </AmhButton>
        }
      />

      <PageSection>
        <SectionHeader
          eyebrow="Levels of care"
          title="Intensive outpatient programs"
          description="Virtual IOP provides 9–20 clinical hours per week — a structured step between weekly therapy and hospitalization."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {LEVELS_OF_CARE_LINKS.map((program) => (
            <ProgramCard key={program.path} program={program} />
          ))}
        </div>
      </PageSection>

      <PageSection bg="surface">
        <SectionHeader
          eyebrow="Condition treatment"
          title="Specialized treatment tracks"
          description="Evidence-based virtual IOP for the conditions families most often call us about."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENT_PROGRAM_LINKS.map((program) => (
            <ProgramCard key={program.path} program={program} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <AmhButton href="/treatment" variant="secondary" icon="ri-arrow-right-line">
            Browse all treatment programs
          </AmhButton>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          eyebrow="Therapy & modalities"
          title="How we deliver care"
          description="Individual, group, and family therapy — plus CBT and DBT — integrated into IOP or available as focused tracks."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {THERAPY_PROGRAM_LINKS.map((program) => (
            <ProgramCard key={program.path} program={program} />
          ))}
          <Link
            href="/therapy"
            className="group flex flex-col justify-center rounded-3xl border border-dashed border-accent/40 bg-surface p-8 transition hover:border-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <p className="text-sm font-semibold text-accent-dark">All therapies</p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-body group-hover:text-ink">
              Explore the therapy hub
              <i className="ri-arrow-right-line" aria-hidden />
            </span>
          </Link>
        </div>
      </PageSection>

      <PageSection bg="dark">
        <SectionHeader light eyebrow="Across every program" title="What stays consistent" />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {highlights.map((item) => (
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
      </PageSection>

      <PageSection bg="surface">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Learn more"
              title="Parent guides & articles"
              description="Explore our blog for practical guidance on teen mental health, treatment options, and what to expect during care."
            />
            <AmhButton href="/blog" variant="textLink" icon="ri-arrow-right-line" className="mt-8">
              Browse the blog
            </AmhButton>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border">
            <Eyebrow className="tracking-[0.25em]">Not sure where to start?</Eyebrow>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"Admissions can help you compare Virtual IOP, condition-specific tracks, and therapy options based on your\n              teen&apos;s symptoms and insurance."}</AutoLinkedText>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <AmhButton href="/admissions" variant="secondary" className="px-6 py-3.5">
                How admissions works
              </AmhButton>
              <AmhButton href="/contact" className="px-6 py-3.5">
                Contact us
              </AmhButton>
            </div>
          </div>
        </div>
      </PageSection>
    </MarketingPage>
  );
}
