import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AnxietyPage from "@/views/what-we-treat/AnxietyPage";
const fallback: Metadata = {
  title: "Anxiety Disorder Treatment in Seattle, WA | Mountain View Treatment",
  description: "Evidence-based outpatient treatment for anxiety disorders in Seattle — GAD, panic disorder, social anxiety, and more. CBT, ERP, ACT. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/mental-health/anxiety/" },
};
export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/mental-health/anxiety/", fallback);
}
export default function Page() { return <AnxietyPage />; }
