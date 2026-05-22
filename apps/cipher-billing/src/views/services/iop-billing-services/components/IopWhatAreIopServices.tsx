import ServiceLandingImageBand from "@/views/services/components/ServiceLandingImageBand";
import { IOP_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function IopWhatAreIopServices() {
  return (
    <ServiceLandingImageBand
      eyebrow="IOP services"
      heading={
        <>
          What are <span className="text-[#5eb5e0]">IOP services</span> in medical billing?
        </>
      }
      imageSrc={IOP_LANDING_IMAGES.program}
      imageAlt="Intensive outpatient group therapy for mental health and substance use treatment in a modern clinic"
      imagePosition="right"
    >
      <p>
        Intensive outpatient (IOP) is a structured behavioral health level of care for mental health and substance use
        treatment: more hours than routine outpatient services, fewer than partial hospitalization (PHP). IOP services
        typically include group therapy, individual psychotherapy, psychoeducation, and care coordination across multiple
        sessions per week—often billed as program services under HCPCS or CPT, depending on payer and site of service.
      </p>
      <p>
        For IOP providers treating mental illness and substance use disorders, accurate IOP billing means matching
        authorization, documentation, and billing
        codes to the outpatient program actually delivered—whether Medicare coverage, Medicaid, or commercial health care
        plans. Cipher&apos;s IOP billing services handle that alignment so your clinical team can focus on patients, not
        claim edits.
      </p>
    </ServiceLandingImageBand>
  );
}
