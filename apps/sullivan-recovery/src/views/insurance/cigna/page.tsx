import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { cignaInsurancePage } from "@/data/insurancePages/cigna";

export default function CignaInsurancePage() {
  return <InsuranceCarrierPageView data={cignaInsurancePage} />;
}
