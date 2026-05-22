import ServiceLandingImageBand from "@/views/services/components/ServiceLandingImageBand";
import { MENTAL_HEALTH_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

export default function MentalHealthWhatAreServices() {
  return (
    <ServiceLandingImageBand
      eyebrow="Health behavioral services"
      heading={
        <>
          What are <span className="text-[#5eb5e0]">mental health billing services</span>?
        </>
      }
      imageSrc={MENTAL_HEALTH_LANDING_IMAGES.program}
      imageAlt="Licensed therapist providing mental health services in a private practice counseling office"
      imagePosition="left"
    >
      <p>
        Mental health billing services cover the revenue cycle for outpatient therapy, psychiatry, and integrated
        behavioral health—medical billing for psychotherapy CPT codes, psychiatric visits, telehealth services, and
        co-occurring substance use treatment when your census includes both.
      </p>
      <p>
        Cipher helps health providers from solo therapists to multi-site group practices—billing mental health with the
        same rigor as urgent care or other medical specialties, but tuned to session-based care and ongoing authorization
        rules.
      </p>
    </ServiceLandingImageBand>
  );
}
