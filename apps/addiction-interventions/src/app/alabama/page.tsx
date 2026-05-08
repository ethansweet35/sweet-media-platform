import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlabamaPage from "@/views/alabama/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Alabama | Addiction Interventions",
  description: "Certified interventionists serving Alabama. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/alabama", fallbackMetadata);
}

export default function Page() {
  return <AlabamaPage />;
}
