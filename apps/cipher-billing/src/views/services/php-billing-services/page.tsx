import PhpCredibilityBar from "@/views/services/php-billing-services/components/PhpCredibilityBar";
import PhpLandingHero from "@/views/services/php-billing-services/components/PhpLandingHero";
import PhpBillingCodesEducation from "@/views/services/php-billing-services/components/PhpBillingCodesEducation";
import PhpBillingRequirements from "@/views/services/php-billing-services/components/PhpBillingRequirements";
import PhpBillingEssentials from "@/views/services/php-billing-services/components/PhpBillingEssentials";
import PhpRcmPartnerSection from "@/views/services/php-billing-services/components/PhpRcmPartnerSection";
import PhpDifferentiation from "@/views/services/php-billing-services/components/PhpDifferentiation";
import PhpWhatArePhpServices from "@/views/services/php-billing-services/components/PhpWhatArePhpServices";
import PhpProcess from "@/views/services/php-billing-services/components/PhpProcess";
import PhpFaq from "@/views/services/php-billing-services/components/PhpFaq";
import PhpSocialProof from "@/views/services/php-billing-services/components/PhpSocialProof";
import PhpWhatsIncluded from "@/views/services/php-billing-services/components/PhpWhatsIncluded";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

/**
 * PHP billing landing page — rebuilt section by section.
 * Hero includes embedded lead form (posts to /api/contact).
 */
export default function PhpBillingServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <PhpLandingHero />
      <PhpCredibilityBar />
      <PhpWhatsIncluded />
      <PhpWhatArePhpServices />
      <PhpBillingCodesEducation />
      <PhpBillingRequirements />
      <PhpBillingEssentials />
      <PhpRcmPartnerSection />
      <PhpDifferentiation />
      <PhpProcess />
      <PhpSocialProof />
      <PhpFaq />
      <OurCompanyLeadSection />
    </main>
  );
}
