import InsuranceAcceptedPlans from "@/components/pages/insurance/InsuranceAcceptedPlans";
import InsuranceClosingCta from "@/components/pages/insurance/InsuranceClosingCta";
import InsuranceCoverageStory from "@/components/pages/insurance/InsuranceCoverageStory";
import InsuranceFaq from "@/components/pages/insurance/InsuranceFaq";
import InsurancePageHero from "@/components/pages/insurance/InsurancePageHero";
import InsuranceProcess from "@/components/pages/insurance/InsuranceProcess";
import InsuranceWhyUs from "@/components/pages/insurance/InsuranceWhyUs";

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[var(--sr-linen)]">
      <InsurancePageHero />
      <InsuranceAcceptedPlans />
      <InsuranceCoverageStory />
      <InsuranceProcess />
      <InsuranceWhyUs />
      <InsuranceFaq />
      <InsuranceClosingCta />
    </main>
  );
}
