import { AmhButton, DarkCtaSection } from "@/components/marketing";
import { SITE } from "@/lib/site";

export default function PostCta() {
  return (
    <DarkCtaSection
      eyebrow="Get support"
      title="Questions about care for your teen?"
      description="Free consultations are confidential. Our admissions team can explain Virtual IOP, verify insurance, and help you understand next steps."
      actions={
        <>
          <AmhButton href="/contact" variant="darkPrimary" icon="ri-arrow-right-line">
            Contact admissions
          </AmhButton>
          <AmhButton href={SITE.phone.href} variant="darkSecondary" icon="ri-phone-fill" iconPosition="left">
            {SITE.phone.display}
          </AmhButton>
        </>
      }
    />
  );
}
