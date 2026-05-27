import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AccentText,
  AmhButton,
  Heading,
  MarketingPage,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/marketing";
import { RESOURCES_IMGS, SITE } from "@/lib/site";

const guides = [
  {
    icon: "ri-question-line",
    title: "Is Virtual IOP right for my teen?",
    body: "Learn how intensive outpatient care compares to weekly therapy — and signs that your teen may need more structured support.",
    href: "/virtual-iop-for-teens",
  },
  {
    icon: "ri-file-list-3-line",
    title: "What to expect during admissions",
    body: "A step-by-step overview of consultation, insurance verification, clinical assessment, and scheduling.",
    href: "/admissions",
  },
  {
    icon: "ri-parent-line",
    title: "How parents participate in care",
    body: "Family therapy and coaching are built into our programs — understand your role and how we support you.",
    href: "/about",
  },
  {
    icon: "ri-book-open-line",
    title: "Articles & parent guides",
    body: "Browse our blog for evidence-based guidance on teen anxiety, depression, school avoidance, and more.",
    href: "/blog",
  },
];

const crisisResources = [
  {
    icon: "ri-phone-line",
    title: "988 Suicide & Crisis Lifeline",
    body: "Free, confidential support 24/7. Call or text 988.",
    href: "tel:988",
    external: false,
  },
  {
    icon: "ri-message-2-line",
    title: "Crisis Text Line",
    body: "Text HOME to 741741 to connect with a trained crisis counselor.",
    href: "https://www.crisistextline.org/",
    external: true,
  },
  {
    icon: "ri-alarm-warning-line",
    title: "Emergency services",
    body: "If your teen is in immediate danger, call 911 or go to the nearest emergency room.",
    href: "tel:911",
    external: false,
  },
];

export default function ResourcesPage() {
  return (
    <MarketingPage currentPath="/resources">
      <PageHero
        eyebrow="Resources"
        headline={
          <>
            Guides & support for <AccentText>parents and families</AccentText>
          </>
        }
        body="Practical information on teen mental health, our programs, and crisis support — so you can make informed decisions for your family."
        image={{
          src: RESOURCES_IMGS.hero,
          alt: "Parent reading educational materials about adolescent mental health at a home desk",
          priority: true,
        }}
      />

      <PageSection>
        <SectionHeader eyebrow="Parent guides" title="Start here" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group flex gap-5 rounded-3xl bg-surface p-7 ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md hover:ring-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <i className={`${guide.icon} text-xl`} />
              </span>
              <div>
                <Heading as={3}>{guide.title}</Heading>
                <p className="mt-2 text-sm leading-7 text-body">{guide.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition group-hover:text-accent">
                  Read more
                  <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection bg="dark" contained={false}>
        <div className="mx-auto max-w-content grid items-center gap-12 px-0 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              align="left"
              light
              eyebrow="Crisis support"
              title="If your teen needs help right now"
              description="Adolescent Mental Health provides scheduled clinical care — not emergency services. If your teen is in crisis, use these resources immediately."
            />
            <div className="mt-8 flex flex-col gap-4">
              {crisisResources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.href}
                  {...(resource.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <i className={`${resource.icon} text-lg`} />
                  </span>
                  <div>
                    <Heading as={3} light className="text-base">
                      {resource.title}
                    </Heading>
                    <p className="mt-1 text-sm leading-7 text-white/55">{resource.body}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-white/10">
            <Image
              src={RESOURCES_IMGS.support}
              alt="Supportive family conversation emphasizing connection and mental health awareness"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
          </div>
        </div>
      </PageSection>

      <PageSection bg="surface" containerClassName="text-center">
        <SectionHeader
          eyebrow="Questions?"
          title="Our admissions team is here to help"
          description="Free consultations are confidential. We can explain programs, verify insurance, and help you understand next steps."
        />
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <AmhButton href="/contact" icon="ri-arrow-right-line">
            Contact admissions
          </AmhButton>
          <AmhButton href={SITE.phone.href} variant="phone" icon="ri-phone-fill" iconPosition="left">
            {SITE.phone.display}
          </AmhButton>
        </div>
      </PageSection>
    </MarketingPage>
  );
}
