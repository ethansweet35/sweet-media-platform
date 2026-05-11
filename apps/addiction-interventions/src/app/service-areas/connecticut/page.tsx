import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ConnecticutPage from "@/views/connecticut/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Connecticut | Addiction Interventions",
  description: "Certified interventionists serving Connecticut. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/connecticut" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/connecticut", fallbackMetadata);
}

export default function Page() {
  return <ConnecticutPage />;
}
