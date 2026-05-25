import InsuranceCarrierPageView from "@/components/pages/insurance/carrier/InsuranceCarrierPageView";
import { unitedHealthcareInsurancePage } from "@/data/insurancePages/united-healthcare";

export default function Page() {
  return <InsuranceCarrierPageView data={unitedHealthcareInsurancePage} />;
}
