import ServiceLandingImageBand from "@/views/services/components/ServiceLandingImageBand";
import { PHP_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function PhpWhatArePhpServices() {
  return (
    <ServiceLandingImageBand
      eyebrow="Behavioral health PHP"
      heading={
        <>
          What is a <span className="text-[#5eb5e0]">partial hospitalization program</span>?
        </>
      }
      imageSrc={PHP_LANDING_IMAGES.program}
      imageAlt="Partial hospitalization group therapy for mental health and substance use treatment in a day program"
      imagePosition="left"
    >
      <p>
        A partial hospitalization program (PHP) delivers structured mental health and substance use treatment—typically
        a minimum of twenty hours per week of therapeutic services—without overnight inpatient care. PHP treatment sits
        between residential-level care and intensive outpatient programs, with unique billing requirements for health
        providers who bill hospitalization services on UB-04 claims.
      </p>
      <p>
        Cipher&apos;s PHP billing services handle medical billing, authorization, and revenue cycle management for
        behavioral health facilities—so your team can focus on patient care while we protect timely reimbursement and
        cash flow on every PHP program you run.
      </p>
    </ServiceLandingImageBand>
  );
}
