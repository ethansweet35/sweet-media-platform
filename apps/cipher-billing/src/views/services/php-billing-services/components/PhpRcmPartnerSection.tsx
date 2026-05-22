import ServiceSplitSection from "@/views/services/components/ServiceSplitSection";
import { PHP_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function PhpRcmPartnerSection() {
  return (
    <ServiceSplitSection
      eyebrow="Billing partner"
      heading="Your PHP revenue cycle team"
      accent="on call"
      imageSrc={PHP_LANDING_IMAGES.rcm}
      imageAlt="Healthcare billing team managing partial hospitalization program institutional claims and per diem documentation"
      imagePosition="left"
      tone="slate"
    >
      <p>
        Cipher is your <strong>billing partner</strong> for partial hospitalization programs—not billing software your
        staff has to troubleshoot alone. We handle payer authorization, insurance claims, and claim denials while
        treatment providers focus on patients in your PHP program.
      </p>
      <p>
        We stay informed on Medicaid, Medicare, and commercial coverage rules, documentation requirements, and
        reimbursement rates for mental health and substance use disorder care—protecting the financial health of your
        treatment facility.
      </p>
    </ServiceSplitSection>
  );
}
