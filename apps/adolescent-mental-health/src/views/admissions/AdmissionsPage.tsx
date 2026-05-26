import Image from "next/image";
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
import { ADMISSIONS_IMGS, INSURANCE_LOGOS, SITE } from "@/lib/site";

const intakeSteps = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Free consultation",
    body: "Call or message admissions to share your teen's symptoms, timeline, and insurance. There is no obligation — we help you understand whether Virtual IOP is the right fit.",
  },
  {
    num: "02",
    icon: "ri-file-list-3-line",
    title: "Insurance verification",
    body: "We confirm benefits, authorizations, and out-of-pocket costs before enrollment. Most major plans cover adolescent IOP, including telehealth.",
  },
  {
    num: "03",
    icon: "ri-clipboard-line",
    title: "Clinical assessment",
    body: "A licensed clinician evaluates your teen's needs, safety, and level-of-care fit. We coordinate with your current providers when appropriate.",
  },
  {
    num: "04",
    icon: "ri-calendar-check-line",
    title: "Start care",
    body: "We build a weekly schedule around school and family commitments. Many families begin within 24–48 hours after the initial consultation.",
  },
];

const checklist = [
  "Teen's primary concerns and how long symptoms have been present",
  "Current medications and recent psychiatric or medical history",
  "Insurance card (front and back) or member ID",
  "Parent or guardian contact information",
  "Any prior treatment records you can share (therapy, IOP, hospitalization)",
  "School schedule and availability for sessions",
];

const trustItems = [
  { icon: "ri-shield-check-line", label: "HIPAA compliant" },
  { icon: "ri-award-line", label: "Licensed clinicians" },
  { icon: "ri-bank-card-line", label: "Insurance accepted" },
  { icon: "ri-time-line", label: "Intake in 24–48 hours" },
];

export default function AdmissionsPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Admissions"
        headline={
          <>
            Getting started is <AccentText>simple and confidential</AccentText>
          </>
        }
        body="Our admissions team guides families through insurance verification, clinical assessment, and scheduling — so your teen can begin Virtual IOP without long waitlists or guesswork."
        image={{
          src: ADMISSIONS_IMGS.hero,
          alt: "Parent reviewing admissions paperwork with a supportive admissions coordinator by video call",
          priority: true,
        }}
        actions={
          <>
            <AmhButton href="/contact" icon="ri-arrow-right-line">
              Request a consultation
            </AmhButton>
            <AmhButton href={SITE.phone.href} variant="phone" icon="ri-phone-fill" iconPosition="left">
              {SITE.phone.display}
            </AmhButton>
          </>
        }
      />

      <PageSection>
        <SectionHeader
          eyebrow="How it works"
          title="From first call to first session"
          description="We keep the process clear and family-friendly. Most families complete intake within a few days."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {intakeSteps.map((step) => (
            <div
              key={step.num}
              className="rounded-3xl bg-surface p-7 ring-1 ring-border transition hover:ring-accent/40"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-accent" style={{ fontFamily: "var(--font-heebo)" }}>
                  {step.num}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <i className={`${step.icon} text-lg`} />
                </span>
              </div>
              <Heading as={3} className="mt-5">
                {step.title}
              </Heading>
              <p className="mt-3 text-sm leading-7 text-body">{step.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection bg="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Before you call"
              title="Helpful information to have ready"
              description="You do not need everything on this list to start — but having these details speeds up verification and scheduling."
            />
            <CheckList items={checklist} className="mt-8" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
            <Image
              src={ADMISSIONS_IMGS.intake}
              alt="Teen and parent completing a virtual intake assessment from a comfortable home setting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          eyebrow="Insurance"
          title="We verify benefits before you commit"
          description="Most major insurance plans cover adolescent IOP, including telehealth. We explain copays, authorizations, and out-of-pocket costs up front."
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-80">
          {Object.entries(INSURANCE_LOGOS).map(([key, src]) => (
            <Image
              key={key}
              src={src}
              alt={`${key} insurance accepted`}
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
            />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm font-semibold text-body">
              <i className={`${item.icon} text-accent`} />
              {item.label}
            </div>
          ))}
        </div>
      </PageSection>

      <DarkCtaSection
        eyebrow="Next step"
        title="Ready to begin admissions?"
        description="Free consultations are confidential. Call anytime or send a message — we typically respond within one business day."
        actions={
          <>
            <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
              Contact admissions
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
