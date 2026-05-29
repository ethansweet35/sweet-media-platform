import { createInsuranceGuidePage } from "@/lib/createInsuranceGuidePage";

const { generateMetadata, Page } = createInsuranceGuidePage("/anthem-blue-cross-coverage");
export { generateMetadata };
export default Page;
