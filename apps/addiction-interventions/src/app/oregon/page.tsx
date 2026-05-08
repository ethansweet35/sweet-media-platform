import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OregonPage from "@/views/oregon/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Oregon | Addiction Interventions",
  description: "Certified interventionists serving Oregon. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/oregon", fallbackMetadata);
}

export default function Page() {
  return <OregonPage />;
}
