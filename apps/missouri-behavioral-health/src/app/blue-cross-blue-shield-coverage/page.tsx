import { createInsuranceGuidePage } from "@/lib/createInsuranceGuidePage";

const { generateMetadata, Page } = createInsuranceGuidePage("/blue-cross-blue-shield-coverage");
export { generateMetadata };
export default Page;
