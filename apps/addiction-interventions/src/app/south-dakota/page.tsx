import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SouthDakotaPage from "@/views/south-dakota/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in South Dakota | Addiction Interventions",
  description: "Certified interventionists serving South Dakota. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/south-dakota", fallbackMetadata);
}

export default function Page() {
  return <SouthDakotaPage />;
}
