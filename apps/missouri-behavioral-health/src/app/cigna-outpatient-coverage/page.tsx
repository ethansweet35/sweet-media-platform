import { createInsuranceGuidePage } from "@/lib/createInsuranceGuidePage";

const { generateMetadata, Page } = createInsuranceGuidePage("/cigna-outpatient-coverage");
export { generateMetadata };
export default Page;
