import type { InsurancePageData } from "@/types/insurancePage";
import InsuranceCarrierCoverage from "./InsuranceCarrierCoverage";
import InsuranceCarrierCta from "./InsuranceCarrierCta";
import InsuranceCarrierFaq from "./InsuranceCarrierFaq";
import InsuranceCarrierHero from "./InsuranceCarrierHero";
import InsuranceCarrierHighlights from "./InsuranceCarrierHighlights";
import InsuranceCarrierIntro from "./InsuranceCarrierIntro";
import InsuranceCarrierNetwork from "./InsuranceCarrierNetwork";
import InsuranceCarrierOtherPlans from "./InsuranceCarrierOtherPlans";

type Props = {
  data: InsurancePageData;
};

export default function InsuranceCarrierPageView({ data }: Props) {
  return (
    <main className="min-h-screen bg-[var(--sr-linen)]">
      <InsuranceCarrierHero data={data} />
      <InsuranceCarrierHighlights highlights={data.highlights} />
      <InsuranceCarrierIntro {...data.intro} />
      <InsuranceCarrierCoverage {...data.covered} />
      <InsuranceCarrierNetwork inNetwork={data.inNetwork} data={data} />
      <InsuranceCarrierOtherPlans data={data} />
      <InsuranceCarrierFaq items={data.faqs} data={data} />
      <InsuranceCarrierCta {...data.cta} />
    </main>
  );
}
