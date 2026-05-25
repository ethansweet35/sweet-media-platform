import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { ppoOutOfNetworkInsurancePage } from "@/data/insurancePages/ppo-out-of-network";

export default function Page() {
  return <InsuranceCarrierPageView data={ppoOutOfNetworkInsurancePage} />;
}
