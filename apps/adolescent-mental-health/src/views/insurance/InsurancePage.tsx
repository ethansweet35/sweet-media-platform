import Image from "next/image";
import Link from "next/link";
import {
  AccentText,
  AmhButton,
  CheckList,
  DarkCtaSection,
  MarketingPage,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/marketing";
import { INSURANCE_CARRIER_PATHS } from "@/lib/insurance-carrier-pages";
import { CONTAINER, INSURANCE_IMGS, INSURANCE_LOGOS, SITE } from "@/lib/site";

const covered = [
  "Virtual Intensive Outpatient Program (IOP) for teens",
  "Individual, group, and family therapy sessions",
  "Clinical assessment and care coordination",
  "Telehealth services delivered from home",
];

const steps = [
  "Share your insurance card during the free admissions consultation",
  "We verify benefits, authorizations, and estimated out-of-pocket costs",
  "You receive a clear summary before enrollment — no surprise bills",
  "We handle ongoing authorization requests with your plan when required",
];

export default function InsurancePage({ currentPath = "/verify-insurance" }: { currentPath?: string }) {
  return (
    <MarketingPage currentPath={currentPath}>
      <PageHero
        glow="both"
        eyebrow="Insurance"
        headline={
          <>
            Most major plans <AccentText>cover Virtual IOP</AccentText>
          </>
        }
        body="Adolescent mental health treatment should be accessible. Our admissions team verifies benefits and explains costs before your teen begins care."
        image={{
          src: INSURANCE_IMGS.hero,
          alt: "Parent reviewing insurance coverage for teen virtual mental health treatment with an admissions coordinator",
          priority: true,
        }}
        actions={
          <>
            <AmhButton href="/contact" icon="ri-arrow-right-line">
              Verify my benefits
            </AmhButton>
            <AmhButton href={SITE.phone.href} variant="phone" icon="ri-phone-fill" iconPosition="left">
              {SITE.phone.display}
            </AmhButton>
          </>
        }
      />

      <PageSection>
        <SectionHeader
          eyebrow="Coverage"
          title="Plans we frequently work with"
          description="Network status varies by plan and region — admissions confirms your specific benefits during intake."
        />
        <div className={`${CONTAINER} mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5`}>
          {Object.entries(INSURANCE_LOGOS).map(([key, src]) => {
            const href = INSURANCE_CARRIER_PATHS[key as keyof typeof INSURANCE_CARRIER_PATHS];
            const labels: Record<string, string> = {
              aetna: "Aetna",
              cigna: "Cigna",
              anthem: "Anthem",
              becn: "Beacon",
              umr: "UMR",
            };
            const label = labels[key] ?? key;

            const tile = (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-surface px-4 py-7 text-center ring-1 ring-border transition hover:ring-accent/35">
                <Image
                  src={src}
                  alt={`${label} insurance logo`}
                  width={160}
                  height={64}
                  className="h-11 w-auto object-contain sm:h-12"
                />
                <p className="mt-4 text-xs font-semibold text-ink">{label}</p>
              </div>
            );

            return href ? (
              <Link key={key} href={href} className="block h-full">
                {tile}
              </Link>
            ) : (
              <div key={key}>{tile}</div>
            );
          })}
        </div>
      </PageSection>

      <PageSection bg="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="What's covered" title="Telehealth IOP services" />
            <CheckList items={covered} className="mt-8" />
          </div>
          <div>
            <SectionHeader align="left" eyebrow="Verification" title="How insurance check works" />
            <CheckList items={steps} className="mt-8" />
          </div>
        </div>
      </PageSection>

      <DarkCtaSection
        title="Questions about coverage?"
        description="Call admissions for a confidential benefits review — we'll explain options for teens ages 12–17 even if you're not ready to enroll."
        actions={<AmhButton href="/admissions">See admissions process</AmhButton>}
      />
    </MarketingPage>
  );
}
