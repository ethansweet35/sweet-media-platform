import ServiceLandingImageBand from "@/views/services/components/ServiceLandingImageBand";
import { DETOX_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function DetoxWhatAreServices() {
  return (
    <ServiceLandingImageBand
      eyebrow="Detoxification services"
      heading={
        <>
          What are <span className="text-[#5eb5e0]">detox billing services</span>?
        </>
      }
      imageSrc={DETOX_LANDING_IMAGES.program}
      imageAlt="Clinical team providing medical supervision during inpatient detox at an addiction treatment facility"
      imagePosition="left"
    >
      <p>
        Detox billing services cover the revenue cycle for medically supervised withdrawal—hospital inpatient detox under
        24/7 doctors and nurses, residential detox, ambulatory detox, and outpatient detox programs. Billing addiction
        treatment detox requires specialized sud billing knowledge: H-codes created by CMS, CPT codes managed by the AMA,
        and payer rules that differ from routine health billing.
      </p>
      <p>
        Cipher supports treatment providers serving alcohol drug withdrawal and co-occurring mental health—so disorder
        treatment billing stays accurate while clinicians deliver quality care and patient care that meets medical
        necessity standards.
      </p>
    </ServiceLandingImageBand>
  );
}
