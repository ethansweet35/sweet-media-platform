import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServicesHubPage from "@/views/services/ServicesHubPage";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Treatment Services",
  description:
    "Northbound Treatment offers a full continuum of addiction care — medical detox, residential treatment, PHP, IOP, and telehealth in Orange County, CA. 38+ years of evidence-based recovery programs.",
  alternates: { canonical: "/services" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services", fallbackMetadata);
}

export default function Page() {
  return <ServicesHubPage />;
}
