import ServiceLandingImageBand from "@/views/services/components/ServiceLandingImageBand";
import { RESIDENTIAL_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function ResidentialWhatAreServices() {
  return (
    <ServiceLandingImageBand
      eyebrow="Care residential programs"
      heading={
        <>
          What is <span className="text-[#5eb5e0]">residential treatment</span> in billing?
        </>
      }
      imageSrc={RESIDENTIAL_LANDING_IMAGES.asam}
      imageAlt="Clinician conducting ASAM level-of-care assessment for residential mental health and substance use treatment billing"
      imagePosition="right"
    >
      <p>
        Residential treatment is an inpatient level of behavioral health care where patients live on-site while receiving
        mental health and addiction treatment services—typically billed per diem through HCPCS codes such as H0017, not
        room-and-board charges bundled into program rates.
      </p>
      <p>
        For mental health and substance use disorder programs alike, short-term residential (H0018) often requires ASAM
        Level 3.5 documentation where payers require it. Cipher&apos;s health billing team aligns clinical records,
        authorization, and billing codes so treatment providers
        can focus on patients—not payer phone trees.
      </p>
    </ServiceLandingImageBand>
  );
}
