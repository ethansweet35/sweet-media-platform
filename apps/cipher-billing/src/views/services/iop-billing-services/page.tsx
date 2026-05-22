import IopCredibilityBar from "@/views/services/iop-billing-services/components/IopCredibilityBar";
import IopRcmPartnerSection from "@/views/services/iop-billing-services/components/IopRcmPartnerSection";
import IopLandingHero from "@/views/services/iop-billing-services/components/IopLandingHero";
import IopBillingCodesEducation from "@/views/services/iop-billing-services/components/IopBillingCodesEducation";
import IopBillingRequirements from "@/views/services/iop-billing-services/components/IopBillingRequirements";
import IopDifferentiation from "@/views/services/iop-billing-services/components/IopDifferentiation";
import IopWhatAreIopServices from "@/views/services/iop-billing-services/components/IopWhatAreIopServices";
import IopProcess from "@/views/services/iop-billing-services/components/IopProcess";
import IopFaq from "@/views/services/iop-billing-services/components/IopFaq";
import IopSocialProof from "@/views/services/iop-billing-services/components/IopSocialProof";
import IopWhatsIncluded from "@/views/services/iop-billing-services/components/IopWhatsIncluded";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

/**
 * IOP billing landing page — rebuilt section by section.
 * Hero includes embedded lead form (posts to /api/contact).
 */
export default function IopBillingServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <IopLandingHero />
      <IopCredibilityBar />
      <IopRcmPartnerSection />
      <IopWhatsIncluded />
      <IopWhatAreIopServices />
      <IopBillingCodesEducation />
      <IopBillingRequirements />
      <IopDifferentiation />
      <IopProcess />
      <IopSocialProof />
      <IopFaq />
      <OurCompanyLeadSection />
    </main>
  );
}
