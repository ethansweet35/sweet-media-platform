import Image from "next/image";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AccentText,
  AmhButton,
  CheckList,
  DarkCtaSection,
  Heading,
  MarketingPage,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/marketing";
import { CONTAINER, PAGE_IMGS, SITE } from "@/lib/site";

const values = [
  {
    icon: "ri-heart-pulse-line",
    title: "Evidence-based care",
    body: "CBT, DBT, and trauma-informed approaches delivered by licensed clinicians who specialize in adolescent mental health — not generalists adapting adult models.",
  },
  {
    icon: "ri-home-heart-line",
    title: "Family-centered model",
    body: "Parents are partners in care. Family therapy and coaching are built into every program so progress continues between sessions — not just in the therapy room.",
  },
  {
    icon: "ri-video-chat-line",
    title: "Virtual-first access",
    body: "Intensive outpatient care from home means teens stay connected to school, friends, and routines while receiving 9–20 hours of structured clinical support per week.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Safety & confidentiality",
    body: "HIPAA-compliant video sessions, licensed clinicians, and clear safety protocols give families confidence that their teen is in qualified, accountable hands.",
  },
];

const differentiators = [
  {
    num: "01",
    title: "Built for adolescents — not adapted from adult care",
    body: "Our therapists understand teen culture, school pressure, social media stress, and the developmental stage your child is navigating. Sessions feel relevant — not clinical or condescending.",
  },
  {
    num: "02",
    title: "More support than weekly therapy allows",
    body: "When symptoms escalate or progress stalls, Virtual IOP provides the structured hours families need — individual, group, and family therapy coordinated in one plan.",
  },
  {
    num: "03",
    title: "Insurance verification before you commit",
    body: "We confirm benefits, authorizations, and out-of-pocket costs up front. Most major plans cover adolescent IOP, including telehealth.",
  },
  {
    num: "04",
    title: "Intake in days — not weeks",
    body: "After your free consultation, many families begin care within 24–48 hours. When your teen needs help, waiting lists are the last thing you need.",
  },
];

const stats = [
  { value: "12–17", label: "Ages served" },
  { value: "9–20h", label: "Clinical hours per week" },
  { value: "100%", label: "Virtual sessions" },
  { value: "24–48h", label: "Typical intake timeline" },
];

const whoWeServeItems = [
  "Medically stable teens who need more than weekly therapy",
  "Families stepping down from PHP or residential care",
  "Parents who want intensive support without disrupting school",
  "Teens who engage better in familiar home environments",
];

export default function AboutPage() {
  return (
    <MarketingPage currentPath="/about">
      <PageHero
        eyebrow="About us"
        headline={
          <>
            Expert teen mental health care, <AccentText>designed for families</AccentText>
          </>
        }
        body="Adolescent Mental Health provides evidence-based Virtual Intensive Outpatient Programs for teens ages 12–17. We help families navigate anxiety, depression, trauma, and more — with structured care that fits real life."
        image={{
          src: PAGE_IMGS.aboutHero,
          alt: "Thoughtful teenage girl in a calm home setting, ready for virtual mental health support",
          imageClassName: "object-[center_35%]",
          priority: true,
        }}
        actions={
          <>
            <AmhButton href="/contact" icon="ri-arrow-right-line">
              Contact admissions
            </AmhButton>
            <AmhButton href={SITE.phone.href} variant="phone" icon="ri-phone-fill" iconPosition="left">
              {SITE.phone.display}
            </AmhButton>
          </>
        }
      />

      <PageSection>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our mission"
              title="Help teens heal without putting life on hold"
            />
            <p className="mt-6 text-sm leading-8 text-body">
              <AutoLinkedText>{"Too many adolescents struggle with mental health symptoms that weekly therapy cannot stabilize. Families\n              deserve an option between standard outpatient care and residential treatment — intensive, structured, and\n              accessible from home."}</AutoLinkedText>
            </p>
            <p className="mt-4 text-sm leading-8 text-body">
              <AutoLinkedText>{"We built Adolescent Mental Health to fill that gap: licensed clinicians, evidence-based modalities, and\n              schedules that respect school, family, and the pace of adolescent life."}</AutoLinkedText>
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
            <Image
              src={PAGE_IMGS.aboutMission}
              alt="Home desk with laptop prepared for a structured virtual therapy session"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>
      </PageSection>

      <PageSection bg="surface">
        <SectionHeader
          eyebrow="What guides us"
          title="Care built on trust, skill, and family partnership"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border transition hover:shadow-md hover:ring-accent/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <i className={`${item.icon} text-xl`} />
              </span>
              <Heading as={3} className="mt-5">
                {item.title}
              </Heading>
              <p className="mt-3 text-sm leading-7 text-body"><AutoLinkedText>{item.body}</AutoLinkedText></p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection bg="dark" contained={false}>
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                align="left"
                light
                eyebrow="Why families choose us"
                title="More than a telehealth appointment"
                description="Virtual IOP is a full clinical program — coordinated individual, group, and family care with the hours and structure teens need when outpatient therapy is not enough."
              />
              <div className="mt-8 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{stat.value}</AutoLinkedText></p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/45"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {differentiators.map((item) => (
                <div
                  key={item.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/30"
                >
                  <p className="text-xs font-bold text-accent" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{item.num}</AutoLinkedText></p>
                  <Heading as={3} light className="mt-2 text-lg">
                    {item.title}
                  </Heading>
                  <p className="mt-3 text-sm leading-7 text-white/55"><AutoLinkedText>{item.body}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border lg:order-2">
            <Image
              src={PAGE_IMGS.aboutTeam}
              alt="Teens in a supportive group setting connecting through virtual mental health care"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
          <div className="lg:order-1">
            <SectionHeader
              align="left"
              eyebrow="Who we serve"
              title={`Teens ages ${SITE.ages} across the country`}
            />
            <p className="mt-6 text-sm leading-8 text-body">
              <AutoLinkedText>{"We treat anxiety, depression, trauma and PTSD, ADHD, bipolar disorder, self-harm, school avoidance, OCD,\n              and related concerns — through Virtual IOP, individual therapy, group therapy, and family sessions."}</AutoLinkedText>
            </p>
            <CheckList items={whoWeServeItems} className="mt-8" />
            <AmhButton href="/virtual-iop-for-teens" variant="textLink" icon="ri-arrow-right-line" className="mt-9">
              Explore Virtual IOP
            </AmhButton>
          </div>
        </div>
      </PageSection>

      <DarkCtaSection
        title="Ready to talk about care for your teen?"
        description="Free consultations are confidential. We can verify insurance and help you understand whether Virtual IOP is the right next step."
        actions={
          <>
            <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
              Contact us
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
