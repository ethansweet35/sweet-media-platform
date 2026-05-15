import FinancialConcierge from "@/components/feature/FinancialConcierge";
import PhpHero from "./PhpHero";
import StepDownSection from "./StepDownSection";
import WhoBenefitsSection from "./WhoBenefitsSection";
import TypicalDaySection from "./TypicalDaySection";
import ComparisonSection from "./ComparisonSection";
import ConditionsTreatedSection from "./ConditionsTreatedSection";
import FaqSection from "./FaqSection";

export default function PhpPage() {
  return (
    <>
      <PhpHero />
      <StepDownSection />
      <WhoBenefitsSection />
      <TypicalDaySection />
      <ComparisonSection />
      <ConditionsTreatedSection />
      <FaqSection />
      <FinancialConcierge />
    </>
  );
}
