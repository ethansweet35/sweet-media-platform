import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TraumaPage from "@/views/what-we-treat/TraumaPage";
const fallback: Metadata = {
  title: "Trauma & PTSD Treatment in Seattle, WA | Mountain View Treatment",
  description: "Specialized outpatient trauma and PTSD treatment in Seattle. EMDR, trauma-focused CBT, somatic experiencing. TRICARE and major insurance accepted.",
  alternates: { canonical: "/what-we-treat/mental-health/trauma/" },
};
export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/mental-health/trauma/", fallback);
}
export default function Page() { return <TraumaPage />; }
