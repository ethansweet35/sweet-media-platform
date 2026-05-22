import ServiceSplitSection from "@/views/services/components/ServiceSplitSection";
import { DETOX_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function DetoxRcmPartnerSection() {
  return (
    <ServiceSplitSection
      eyebrow="Outsourced billing"
      heading="Detox revenue cycle"
      accent="management"
      imageSrc={DETOX_LANDING_IMAGES.rcm}
      imageAlt="Detox billing specialists managing insurance claims, utilization review, and reporting analytics"
      imagePosition="right"
      tone="slate"
    >
      <p>
        Outsourced detox billing services reduce the need for full-time billing staff at treatment facilities while
        keeping patient care first. Cipher handles insurance verification, claim submission, denial management, and
        patient billing—management services and cycle management RCM built for addiction treatment providers.
      </p>
      <p>
        Our billing company pairs utilization management with reporting analytics so treatment providers see services
        revenue trends, unpaid claims, and operational efficiency—HIPAA compliance required for every outsourced detox
        billing engagement.
      </p>
    </ServiceSplitSection>
  );
}
