import { createInsuranceGuidePage } from "@/lib/createInsuranceGuidePage";

const { generateMetadata, Page } = createInsuranceGuidePage("/cox-health-missouri");
export { generateMetadata };
export default Page;
