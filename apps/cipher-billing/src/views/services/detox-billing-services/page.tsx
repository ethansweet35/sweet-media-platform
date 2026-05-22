import DetoxBillingCodesEducation from "@/views/services/detox-billing-services/components/DetoxBillingCodesEducation";
import DetoxBillingEssentials from "@/views/services/detox-billing-services/components/DetoxBillingEssentials";
import DetoxBillingRequirements from "@/views/services/detox-billing-services/components/DetoxBillingRequirements";
import DetoxCredibilityBar from "@/views/services/detox-billing-services/components/DetoxCredibilityBar";
import DetoxDifferentiation from "@/views/services/detox-billing-services/components/DetoxDifferentiation";
import DetoxFaq from "@/views/services/detox-billing-services/components/DetoxFaq";
import DetoxLandingHero from "@/views/services/detox-billing-services/components/DetoxLandingHero";
import DetoxProcess from "@/views/services/detox-billing-services/components/DetoxProcess";
import DetoxRcmPartnerSection from "@/views/services/detox-billing-services/components/DetoxRcmPartnerSection";
import DetoxSocialProof from "@/views/services/detox-billing-services/components/DetoxSocialProof";
import DetoxWhatAreServices from "@/views/services/detox-billing-services/components/DetoxWhatAreServices";
import DetoxWhatsIncluded from "@/views/services/detox-billing-services/components/DetoxWhatsIncluded";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

export default function DetoxBillingServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <DetoxLandingHero />
      <DetoxCredibilityBar />
      <DetoxRcmPartnerSection />
      <DetoxWhatsIncluded />
      <DetoxWhatAreServices />
      <DetoxBillingCodesEducation />
      <DetoxBillingRequirements />
      <DetoxBillingEssentials />
      <DetoxDifferentiation />
      <DetoxProcess />
      <DetoxSocialProof />
      <DetoxFaq />
      <OurCompanyLeadSection />
    </main>
  );
}
