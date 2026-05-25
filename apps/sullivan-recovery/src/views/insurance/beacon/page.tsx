import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { beaconInsurancePage } from "@/data/insurancePages/beacon";

export default function BeaconInsurancePage() {
  return <InsuranceCarrierPageView data={beaconInsurancePage} />;
}
