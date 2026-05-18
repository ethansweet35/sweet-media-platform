import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SchizoaffectivePage from "@/views/what-we-treat/SchizoaffectivePage";
const fallback: Metadata = {
  title: "Schizoaffective Disorder Treatment Seattle | Mountain View Treatment",
  description: "Integrated outpatient treatment for schizoaffective disorder in Seattle, WA. Medication coordination, psychoeducation, and psychosocial support. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/mental-health/schizoaffective/" },
};
export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/mental-health/schizoaffective/", fallback);
}
export default function Page() { return <SchizoaffectivePage />; }
