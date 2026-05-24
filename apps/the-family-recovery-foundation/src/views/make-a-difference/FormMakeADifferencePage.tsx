import MarketingPageHero from "@/components/marketing/MarketingPageHero";
import FormMakeADifferenceContent from "./FormMakeADifferenceContent";

export default async function FormMakeADifferencePage() {
  return (
    <main className="bg-soft-white">
      <MarketingPageHero
        eyebrow="Get Involved"
        title="Make a Difference"
        body="Would you like to contribute to our blog? Volunteer your time? Help FRF with photography, videography, and other services? Contact our team today."
      />

      <FormMakeADifferenceContent />
    </main>
  );
}
