import MentalHealthBillingCodesEducation from "@/views/services/mental-health-billing-services/components/MentalHealthBillingCodesEducation";
import MentalHealthBillingEssentials from "@/views/services/mental-health-billing-services/components/MentalHealthBillingEssentials";
import MentalHealthBillingRequirements from "@/views/services/mental-health-billing-services/components/MentalHealthBillingRequirements";
import MentalHealthCredibilityBar from "@/views/services/mental-health-billing-services/components/MentalHealthCredibilityBar";
import MentalHealthDifferentiation from "@/views/services/mental-health-billing-services/components/MentalHealthDifferentiation";
import MentalHealthFaq from "@/views/services/mental-health-billing-services/components/MentalHealthFaq";
import MentalHealthLandingHero from "@/views/services/mental-health-billing-services/components/MentalHealthLandingHero";
import MentalHealthProcess from "@/views/services/mental-health-billing-services/components/MentalHealthProcess";
import MentalHealthRcmPartnerSection from "@/views/services/mental-health-billing-services/components/MentalHealthRcmPartnerSection";
import MentalHealthSocialProof from "@/views/services/mental-health-billing-services/components/MentalHealthSocialProof";
import MentalHealthWhatAreServices from "@/views/services/mental-health-billing-services/components/MentalHealthWhatAreServices";
import MentalHealthWhatsIncluded from "@/views/services/mental-health-billing-services/components/MentalHealthWhatsIncluded";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

export default function MentalHealthBillingServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <MentalHealthLandingHero />
      <MentalHealthCredibilityBar />
      <MentalHealthRcmPartnerSection />
      <MentalHealthWhatsIncluded />
      <MentalHealthWhatAreServices />
      <MentalHealthBillingCodesEducation />
      <MentalHealthBillingRequirements />
      <MentalHealthBillingEssentials />
      <MentalHealthDifferentiation />
      <MentalHealthProcess />
      <MentalHealthSocialProof />
      <MentalHealthFaq />
      <OurCompanyLeadSection />
    </main>
  );
}
