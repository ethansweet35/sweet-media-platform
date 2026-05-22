import ServiceSplitSection from "@/views/services/components/ServiceSplitSection";
import { MENTAL_HEALTH_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function MentalHealthRcmPartnerSection() {
  return (
    <ServiceSplitSection
      eyebrow="Full-service billing"
      heading="Mental health revenue cycle"
      accent="management"
      imageSrc={MENTAL_HEALTH_LANDING_IMAGES.rcm}
      imageAlt="Mental health billing team managing therapy insurance claims and denial management workflows"
      imagePosition="right"
      tone="slate"
    >
      <p>
        Cipher provides billing support and management RCM solutions for health professionals—help psychiatrists and
        therapy practices alike. We handle insurance billing, claims processing, payment posting, and denial
        management so you can focus on patient care and peace of mind for your clinicians.
      </p>
      <p>
        Our health billing team works alongside your EHR or EMR workflows—billing service help that keeps billing mental
        health services accurate across Medicaid, Medicare, and commercial payers without surprise per claim friction.
      </p>
    </ServiceSplitSection>
  );
}
