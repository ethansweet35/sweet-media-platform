import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PersonalityDisordersPage from "@/views/what-we-treat/PersonalityDisordersPage";
const fallback: Metadata = {
  title: "Personality Disorder Treatment Seattle | Mountain View Treatment",
  description: "DBT and schema therapy for borderline, narcissistic, avoidant, and other personality disorders in Seattle, WA. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/mental-health/personality-disorders/" },
};
export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/mental-health/personality-disorders/", fallback);
}
export default function Page() { return <PersonalityDisordersPage />; }
