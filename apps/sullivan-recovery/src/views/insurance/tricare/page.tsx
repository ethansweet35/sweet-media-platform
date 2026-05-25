import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { tricareInsurancePage } from "@/data/insurancePages/tricare";

export default function Page() {
  return <InsuranceCarrierPageView data={tricareInsurancePage} />;
}
