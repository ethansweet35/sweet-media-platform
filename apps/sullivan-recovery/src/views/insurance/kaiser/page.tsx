import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { kaiserInsurancePage } from "@/data/insurancePages/kaiser";

export default function Page() {
  return <InsuranceCarrierPageView data={kaiserInsurancePage} />;
}
