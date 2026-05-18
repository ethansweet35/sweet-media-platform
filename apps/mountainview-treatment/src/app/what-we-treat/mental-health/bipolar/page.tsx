import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BipolarPage from "@/views/what-we-treat/BipolarPage";
const fallback: Metadata = {
  title: "Bipolar Disorder Treatment in Seattle, WA | Mountain View Treatment",
  description: "Specialized outpatient treatment for bipolar I, II, and cyclothymia in Seattle. Medication coordination, IPSRT, CBT for bipolar. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/mental-health/bipolar/" },
};
export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/mental-health/bipolar/", fallback);
}
export default function Page() { return <BipolarPage />; }
