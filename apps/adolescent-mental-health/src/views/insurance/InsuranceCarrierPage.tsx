import {
  AmhButton,
  DarkCtaSection,
  InsuranceCarrierHeroSection,
  InsuranceCarrierHighlightsSection,
  InsuranceCarrierIntroSection,
  InsuranceCarrierOtherPlansSection,
  InsuranceCarrierVerificationSection,
  MarketingPage,
  PageSection,
  SectionHeader,
  TherapyFaqSection,
} from "@/components/marketing";
import type { InsuranceCarrierConfig } from "@/lib/insurance-carrier-pages";
import { INSURANCE_IMGS, INSURANCE_LOGOS, SITE } from "@/lib/site";

type InsuranceCarrierPageProps = {
  config: InsuranceCarrierConfig;
};

export default function InsuranceCarrierPage({ config }: InsuranceCarrierPageProps) {
  const heroImage = INSURANCE_IMGS.carriers[config.slug] ?? INSURANCE_IMGS.hero;
  const otherCarriers = Object.entries(INSURANCE_LOGOS).filter(([key]) => key !== config.logoKey);

  return (
    <MarketingPage currentPath={config.path}>
      <InsuranceCarrierHeroSection
        eyebrow={config.hero.eyebrow}
        carrierName={config.name}
        headlineAccent={config.hero.headlineAccent}
        body={config.hero.body}
        logoSrc={config.logo}
        imageSrc={heroImage}
        imageAlt={config.hero.imageAlt}
        verifyHref="/contact"
      />

      <InsuranceCarrierHighlightsSection
        carrierName={config.name}
        logoSrc={config.logo}
        highlights={config.highlights}
        verifyHref="/contact"
      />

      <InsuranceCarrierIntroSection
        carrierName={config.name}
        logoSrc={config.logo}
        intro={config.intro}
        covered={config.covered}
      />

      <InsuranceCarrierVerificationSection
        carrierName={config.name}
        verification={config.verification}
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              align="left"
              eyebrow={config.planTypes.eyebrow}
              title={config.planTypes.title}
              description={config.planTypes.description}
            />
            <div className="mt-8 space-y-4">
              {config.planTypes.items.map((plan) => (
                <div key={plan.label} className="rounded-2xl bg-surface px-5 py-4 ring-1 ring-border">
                  <p className="text-sm font-semibold text-ink">{plan.label}</p>
                  <p className="mt-2 text-sm leading-7 text-body">{plan.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-dark p-8 text-white lg:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              {config.telehealth.eyebrow}
            </p>
            <h2
              className="mt-4 text-3xl font-bold leading-tight md:text-4xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {config.telehealth.title}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-8 text-white/70">
              {config.telehealth.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3">
              {config.telehealth.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <i className="ri-check-line text-xs" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <InsuranceCarrierOtherPlansSection carriers={otherCarriers} currentSlug={config.slug} />

      <TherapyFaqSection title={`${config.name} coverage questions`} items={config.faqs} />

      <DarkCtaSection
        title={config.cta.title}
        description={config.cta.description}
        actions={
          <>
            <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
              Request verification
            </AmhButton>
            <AmhButton href={SITE.phone.href} variant="darkSecondary" icon="ri-phone-fill" iconPosition="left">
              Call {SITE.phone.display}
            </AmhButton>
          </>
        }
      />
    </MarketingPage>
  );
}
