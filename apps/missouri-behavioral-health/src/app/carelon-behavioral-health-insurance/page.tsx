import { createInsuranceGuidePage } from "@/lib/createInsuranceGuidePage";

const { generateMetadata, Page } = createInsuranceGuidePage(
  "/carelon-behavioral-health-insurance",
);
export { generateMetadata };
export default Page;
