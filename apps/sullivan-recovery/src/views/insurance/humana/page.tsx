import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { humanaInsurancePage } from "@/data/insurancePages/humana";

export default function Page() {
  return <InsuranceCarrierPageView data={humanaInsurancePage} />;
}
