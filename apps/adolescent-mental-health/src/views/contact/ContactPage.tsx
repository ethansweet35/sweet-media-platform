import Image from "next/image";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  AmhButton,
  DarkCtaSection,
  Eyebrow,
  Heading,
  MarketingPage,
  PageHero,
  PageSection,
} from "@/components/marketing";
import ContactForm from "@/components/feature/ContactForm";
import { PAGE_IMGS, SITE } from "@/lib/site";

const nextSteps = [
  {
    num: "01",
    title: "Free consultation",
    body: "Speak with admissions about your teen's symptoms, timeline, and insurance — no obligation.",
  },
  {
    num: "02",
    title: "Clinical assessment",
    body: "A licensed clinician evaluates fit and recommends the appropriate level of care.",
  },
  {
    num: "03",
    title: "Personalized schedule",
    body: "We build a weekly plan around school, family, and clinical goals.",
  },
];

const trustItems = [
  { icon: "ri-shield-check-line", label: "HIPAA compliant" },
  { icon: "ri-award-line", label: "Licensed clinicians" },
  { icon: "ri-bank-card-line", label: "Insurance accepted" },
  { icon: "ri-lock-2-line", label: "Confidential" },
];

export default function ContactPage() {
  return (
    <MarketingPage currentPath="/contact">
      <PageHero
        compact
        glow="right"
        eyebrow="Contact"
        headline="Talk to admissions — free & confidential"
        body="Whether you have questions about Virtual IOP, insurance, or whether our programs are the right fit, our team is here to help. Call anytime or send a message below."
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="rounded-3xl border border-border bg-surface-muted/50 p-6 shadow-sm sm:p-10">
            <Heading as={3}>Send us a message</Heading>
            <p className="mt-2 text-sm text-body">
              We typically respond within one business day. For faster help, call{" "}
              <a href={SITE.phone.href} className="font-semibold text-accent-dark hover:text-accent">
                {SITE.phone.display}
              </a>
              .
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lg ring-1 ring-border">
              <Image
                src={PAGE_IMGS.contactHero}
                alt="Parent and teenage son on a sofa, conveying family support for adolescent mental health care"
                fill
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>

            <div className="rounded-3xl bg-dark p-8 text-white">
              <Eyebrow>Reach us directly</Eyebrow>
              <div className="mt-6 flex flex-col gap-5">
                <a
                  href={SITE.phone.href}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <i className="ri-phone-fill text-lg" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/45">Call admissions</p>
                    <p className="mt-1 text-lg font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{SITE.phone.display}</AutoLinkedText></p>
                    <p className="mt-1 text-xs text-white/45"><AutoLinkedText>{"Free consultation · Available 7 days a week"}</AutoLinkedText></p>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <i className="ri-mail-line text-lg" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/45">Email</p>
                    <p className="mt-1 break-all text-sm font-semibold text-white"><AutoLinkedText>{SITE.email}</AutoLinkedText></p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <Eyebrow className="tracking-[0.2em]">What happens next</Eyebrow>
              <div className="mt-5 flex flex-col gap-4">
                {nextSteps.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-xs font-bold text-accent ring-1 ring-border"
                      style={{ fontFamily: "var(--font-heebo)" }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <Heading as={3} className="text-sm">
                        {step.title}
                      </Heading>
                      <p className="mt-1 text-xs leading-6 text-body"><AutoLinkedText>{step.body}</AutoLinkedText></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {trustItems.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-[11px] font-semibold text-body ring-1 ring-border"
                >
                  <i className={`${item.icon} text-sm text-accent`} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <DarkCtaSection
        eyebrow="Prefer to talk now?"
        title="A real person answers — not a phone tree"
        description="Our admissions team can verify insurance, explain program options, and help you understand the next step for your teen."
        actions={
          <>
            <AmhButton href={SITE.phone.href} variant="darkPrimary" icon="ri-phone-fill" iconPosition="left">
              Call {SITE.phone.display}
            </AmhButton>
            <AmhButton href="/virtual-iop-for-teens" variant="darkSecondary" icon="ri-arrow-right-line">
              Learn about Virtual IOP
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}
