import { createInsuranceGuidePage } from "@/lib/createInsuranceGuidePage";

const { generateMetadata, Page } = createInsuranceGuidePage(
  "/beacon-health-insurance-rehab-coverage",
);
export { generateMetadata };
export default Page;
