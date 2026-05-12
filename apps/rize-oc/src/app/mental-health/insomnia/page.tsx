import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/insomnia";

const fallback: Metadata = {
  title: "Insomnia & Sleep Disorder Treatment | Rize OC Orange County",
  description: "CBT-I (Cognitive Behavioral Therapy for Insomnia) and sleep disorder treatment in Orange County at Rize OC — evidence-based, non-pharmacological insomnia recovery.",
  alternates: { canonical: "/mental-health/insomnia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/insomnia", fallback);
}

export default SubPage;
