import ServiceSplitSection from "@/views/services/components/ServiceSplitSection";
import { SUBSTANCE_ABUSE_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function SubstanceAbuseRcmPartnerSection() {
  return (
    <ServiceSplitSection
      eyebrow="Billing partner"
      heading="SUD revenue cycle management"
      accent="not software alone"
      imageSrc={SUBSTANCE_ABUSE_LANDING_IMAGES.rcm}
      imageAlt="Substance abuse billing specialists managing addiction treatment insurance claims and denial workflows"
      imagePosition="right"
      tone="slate"
    >
      <p>
        Cipher is your <strong>billing partner</strong> for substance use disorder programs—beyond billing software that
        still leaves claim submission, verification claims, and denial management on your staff. We handle insurance
        verification, accurate coding, and accounts receivable follow-up so healthcare providers can prioritize patient
        care.
      </p>
      <p>
        Our management services help treatment facilities in the healthcare industry enhance financial performance
        through operational efficiency—staying compliant with HIPAA and payer rules while technology-backed reporting
        keeps your business informed.
      </p>
    </ServiceSplitSection>
  );
}
