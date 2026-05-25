import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { blueCrossInsurancePage } from "@/data/insurancePages/blue-cross-blue-shield";

export default function Page() {
  return <InsuranceCarrierPageView data={blueCrossInsurancePage} />;
}
