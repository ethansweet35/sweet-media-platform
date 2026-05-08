import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FloridaPage from "@/views/florida/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Florida | Addiction Interventions",
  description: "Certified interventionists serving Florida. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/florida", fallbackMetadata);
}

export default function Page() {
  return <FloridaPage />;
}
