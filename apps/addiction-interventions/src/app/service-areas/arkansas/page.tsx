import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ArkansasPage from "@/views/arkansas/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Arkansas | Addiction Interventions",
  description: "Certified interventionists serving Arkansas. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/arkansas" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/arkansas", fallbackMetadata);
}

export default function Page() {
  return <ArkansasPage />;
}
