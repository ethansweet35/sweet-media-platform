import Link from "next/link";
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
import { SERVICES_IMGS, SITE } from "@/lib/site";

const programs = [
  {
    icon: "ri-video-chat-line",
    title: "Virtual IOP for Teens",
    body: "Our flagship intensive outpatient program — 9–20 hours per week of individual, group, and family therapy from home.",
    href: "/virtual-iop-for-teens",
    tag: "Most popular",
  },
  {
    icon: "ri-group-line",
    title: "Adolescent IOP",
    body: "Structured IOP for teens who need coordinated clinical hours beyond weekly therapy — with schedules built around school.",
    href: "/adolescent-iop-for-teens",
    tag: "Intensive care",
  },
  {
    icon: "ri-user-heart-line",
    title: "Individual Therapy for Teens",
    body: "One-on-one sessions with licensed clinicians using CBT, DBT, and trauma-informed approaches tailored to adolescents.",
    href: "/therapy/individual-therapy-for-teens",
    tag: "Outpatient",
  },
  {
    icon: "ri-brain-line",
    title: "Online CBT",
    body: "Evidence-based cognitive behavioral therapy delivered virtually — effective for anxiety, depression, and related concerns.",
    href: "/online-cognitive-behavioral-therapy",
    tag: "Modality",
  },
  {
    icon: "ri-moon-line",
    title: "Insomnia Treatment for Teens",
    body: "Structured sleep-focused care for adolescents struggling with insomnia, circadian disruption, and related mood symptoms.",
    href: "/online-insomnia-treatment-for-teens",
    tag: "Specialized",
  },
  {
    icon: "ri-contrast-2-line",
    title: "Bipolar Treatment",
    body: "Virtual care for teens with bipolar disorder — mood stabilization, family support, and coordinated clinical oversight.",
    href: "/online-bipolar-treatment",
    tag: "Specialized",
  },
];

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

export default function ServicesPage() {
  return (
    <MarketingPage>
      <PageHero
        glow="right"
        eyebrow="Services"
        headline={
          <>
            Programs built for <AccentText>teens ages {SITE.ages}</AccentText>
          </>
        }
        body="From Virtual IOP to specialized therapy tracks, every program is designed for adolescent development — not adapted from adult care."
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
          eyebrow="Our programs"
          title="Find the right level of care"
          description="Not sure which program fits? Admissions helps you compare options during a free consultation."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.href}
              href={program.href}
              className="group flex flex-col rounded-3xl bg-surface p-8 ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent/20">
                  <i className={`${program.icon} text-xl`} />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-dark ring-1 ring-border">
                  {program.tag}
                </span>
              </div>
              <Heading as={3} className="mt-5">
                {program.title}
              </Heading>
              <p className="mt-3 flex-1 text-sm leading-7 text-body">{program.body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition group-hover:text-accent">
                Learn more
                <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
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
                <i className={`${item.icon} text-xl`} />
              </span>
              <Heading as={3} light className="mt-5">
                {item.title}
              </Heading>
              <p className="mt-3 text-sm leading-7 text-white/55">{item.body}</p>
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
              Admissions can help you compare Virtual IOP, individual therapy, and specialized tracks based on your
              teen&apos;s symptoms and insurance.
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
