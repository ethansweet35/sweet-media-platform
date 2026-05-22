import ServiceSplitSection from "@/views/services/components/ServiceSplitSection";
import { RESIDENTIAL_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function ResidentialRcmPartnerSection() {
  return (
    <ServiceSplitSection
      eyebrow="Billing partner"
      heading="Residential revenue cycle management"
      accent="for both"
      imageSrc={RESIDENTIAL_LANDING_IMAGES.hero}
      imageAlt="Residential mental health and addiction treatment center for behavioral health billing and authorization management"
      imagePosition="right"
      tone="slate"
    >
      <p>
        Cipher is your <strong>billing partner</strong> for residential programs—not billing software your staff has to
        reverse-engineer. We handle authorization, insurance claims, and claim denials while patients receive treatment
        services and your team stays focused on care.
      </p>
      <p>
        With millions of adults living with serious mental illness and many not receiving treatment, treatment centers
        need reimbursement rates that reflect the true costs of inpatient care. We stay informed on payer regulations and
        billing coding updates so your financial health does not depend on guesswork.
      </p>
    </ServiceSplitSection>
  );
}
