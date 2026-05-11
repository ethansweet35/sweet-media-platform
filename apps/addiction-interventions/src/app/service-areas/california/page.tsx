import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CaliforniaPage from "@/views/california/page";

const fallbackMetadata: Metadata = {
  title: "California Addiction & Mental Health Interventions | On-Site in 24-48 Hours",
  description:
    "Certified family interventionists serving every California county — LA, San Diego, SF Bay, Sacramento, Inland Empire, and beyond. On-site in 24-48 hours, expert in CA insurance and treatment options. Free 24/7 consultation.",
  alternates: { canonical: "/service-areas/california" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/california", fallbackMetadata);
}

export default function Page() {
  return <CaliforniaPage />;
}
