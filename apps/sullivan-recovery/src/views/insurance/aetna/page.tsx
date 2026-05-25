import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { aetnaInsurancePage } from "@/data/insurancePages/aetna";

export default function AetnaInsurancePage() {
  return <InsuranceCarrierPageView data={aetnaInsurancePage} />;
}
