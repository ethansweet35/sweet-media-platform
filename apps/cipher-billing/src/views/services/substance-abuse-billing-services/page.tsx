import SubstanceAbuseBillingCodesEducation from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseBillingCodesEducation";
import SubstanceAbuseBillingEssentials from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseBillingEssentials";
import SubstanceAbuseBillingRequirements from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseBillingRequirements";
import SubstanceAbuseCredibilityBar from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseCredibilityBar";
import SubstanceAbuseDifferentiation from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseDifferentiation";
import SubstanceAbuseFaq from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseFaq";
import SubstanceAbuseLandingHero from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseLandingHero";
import SubstanceAbuseProcess from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseProcess";
import SubstanceAbuseRcmPartnerSection from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseRcmPartnerSection";
import SubstanceAbuseSocialProof from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseSocialProof";
import SubstanceAbuseWhatAreServices from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseWhatAreServices";
import SubstanceAbuseWhatsIncluded from "@/views/services/substance-abuse-billing-services/components/SubstanceAbuseWhatsIncluded";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

export default function SubstanceAbuseBillingServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <SubstanceAbuseLandingHero />
      <SubstanceAbuseCredibilityBar />
      <SubstanceAbuseRcmPartnerSection />
      <SubstanceAbuseWhatsIncluded />
      <SubstanceAbuseWhatAreServices />
      <SubstanceAbuseBillingCodesEducation />
      <SubstanceAbuseBillingRequirements />
      <SubstanceAbuseBillingEssentials />
      <SubstanceAbuseDifferentiation />
      <SubstanceAbuseProcess />
      <SubstanceAbuseSocialProof />
      <SubstanceAbuseFaq />
      <OurCompanyLeadSection />
    </main>
  );
}
