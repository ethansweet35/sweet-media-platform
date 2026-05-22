import ResidentialBillingCodesEducation from "@/views/services/residential-treatment-billing-services/components/ResidentialBillingCodesEducation";
import ResidentialBillingEssentials from "@/views/services/residential-treatment-billing-services/components/ResidentialBillingEssentials";
import ResidentialBillingRequirements from "@/views/services/residential-treatment-billing-services/components/ResidentialBillingRequirements";
import ResidentialCredibilityBar from "@/views/services/residential-treatment-billing-services/components/ResidentialCredibilityBar";
import ResidentialDifferentiation from "@/views/services/residential-treatment-billing-services/components/ResidentialDifferentiation";
import ResidentialFaq from "@/views/services/residential-treatment-billing-services/components/ResidentialFaq";
import ResidentialLandingHero from "@/views/services/residential-treatment-billing-services/components/ResidentialLandingHero";
import ResidentialProcess from "@/views/services/residential-treatment-billing-services/components/ResidentialProcess";
import ResidentialRcmPartnerSection from "@/views/services/residential-treatment-billing-services/components/ResidentialRcmPartnerSection";
import ResidentialSocialProof from "@/views/services/residential-treatment-billing-services/components/ResidentialSocialProof";
import ResidentialWhatAreServices from "@/views/services/residential-treatment-billing-services/components/ResidentialWhatAreServices";
import ResidentialWhatsIncluded from "@/views/services/residential-treatment-billing-services/components/ResidentialWhatsIncluded";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

export default function ResidentialTreatmentBillingServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <ResidentialLandingHero />
      <ResidentialCredibilityBar />
      <ResidentialRcmPartnerSection />
      <ResidentialWhatsIncluded />
      <ResidentialWhatAreServices />
      <ResidentialBillingCodesEducation />
      <ResidentialBillingRequirements />
      <ResidentialBillingEssentials />
      <ResidentialDifferentiation />
      <ResidentialProcess />
      <ResidentialSocialProof />
      <ResidentialFaq />
      <OurCompanyLeadSection />
    </main>
  );
}
