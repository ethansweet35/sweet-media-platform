import { createInsuranceGuidePage } from "@/lib/createInsuranceGuidePage";

const { generateMetadata, Page } = createInsuranceGuidePage("/aetna-outpatient-services");
export { generateMetadata };
export default Page;
