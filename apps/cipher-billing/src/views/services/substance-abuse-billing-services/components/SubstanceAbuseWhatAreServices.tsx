import ServiceLandingImageBand from "@/views/services/components/ServiceLandingImageBand";
import { SUBSTANCE_ABUSE_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function SubstanceAbuseWhatAreServices() {
  return (
    <ServiceLandingImageBand
      eyebrow="Substance use disorder"
      heading={
        <>
          What are <span className="text-[#5eb5e0]">substance abuse billing services</span>?
        </>
      }
      imageSrc={SUBSTANCE_ABUSE_LANDING_IMAGES.program}
      imageAlt="Outpatient substance abuse group counseling session at an addiction treatment center"
      imagePosition="left"
    >
      <p>
        Substance abuse billing services cover the revenue cycle for addiction treatment—from detox and residential
        substance use disorder programs to intensive outpatient and standard outpatient SUD treatment. Billing substance
        use programs requires specialized abuse billing knowledge: HCPCS codes, ASAM assessments, and payer rules that
        differ from routine health billing.
      </p>
      <p>
        Cipher supports treatment providers serving co-occurring mental health and substance use disorders—so disorder
        treatment billing stays accurate across levels of care while clinicians focus on patient care.
      </p>
    </ServiceLandingImageBand>
  );
}
