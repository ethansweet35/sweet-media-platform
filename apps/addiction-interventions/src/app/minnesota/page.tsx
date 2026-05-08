import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MinnesotaPage from "@/views/minnesota/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Minnesota | Addiction Interventions",
  description: "Certified interventionists serving Minnesota. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/minnesota", fallbackMetadata);
}

export default function Page() {
  return <MinnesotaPage />;
}
