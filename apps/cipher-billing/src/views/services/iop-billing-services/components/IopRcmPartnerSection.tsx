import ServiceSplitSection from "@/views/services/components/ServiceSplitSection";
import { IOP_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function IopRcmPartnerSection() {
  return (
    <ServiceSplitSection
      eyebrow="Billing partner"
      heading="Your IOP revenue cycle team"
      accent="on call"
      imageSrc={IOP_LANDING_IMAGES.rcm}
      imageAlt="Behavioral health billing specialists reviewing intensive outpatient program claims and authorization timelines"
      imagePosition="right"
      tone="slate"
    >
      <p>
        Cipher acts as your dedicated <strong>billing partner</strong> for intensive outpatient programs—not a software
        login your staff has to decipher. We handle authorization, claim submissions, and claim denials while your
        clinicians stay focused on patients who receive IOP services.
      </p>
      <p>
        From Medicare and Medicaid to commercial payers, we stay informed on billing regulations and reimbursement rates
        that affect mental health and substance use disorder treatment centers, so your cash flow is not held hostage by
        payer edits your team has never seen before.
      </p>
    </ServiceSplitSection>
  );
}
