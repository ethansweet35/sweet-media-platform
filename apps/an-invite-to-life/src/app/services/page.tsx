import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServicesPage from "@/views/ServicesPage";

const fallback: Metadata = {
  title: "Our Services",
  description: "Professional intervention, aftercare planning, and family support services.",
  alternates: { canonical: "/services" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services", fallback);
}

export default function Page() {
  return <ServicesPage />;
}
