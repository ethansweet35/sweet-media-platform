import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthIndexPage from "@/views/what-we-treat/MentalHealthIndexPage";
const fallback: Metadata = {
  title: "Mental Health Treatment in Seattle, WA | Mountain View Treatment",
  description: "Evidence-based outpatient mental health treatment in Seattle. Anxiety, depression, bipolar disorder, PTSD, personality disorders, and schizoaffective disorder. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/mental-health/" },
};
export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/mental-health/", fallback);
}
export default function Page() { return <MentalHealthIndexPage />; }
