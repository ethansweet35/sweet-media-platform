import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SanDiegoCaliforniaPage from "@/views/san-diego-ca/page";

const fallbackMetadata: Metadata = {
  title: "Drug Intervention San Diego | Certified Interventionists",
  description:
    "On-site drug intervention services in San Diego, CA. Certified interventionists available 24/7 — covering all San Diego County including La Jolla, Chula Vista, and Carlsbad.",
  alternates: { canonical: "/service-areas/california/san-diego" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/san-diego",
    fallbackMetadata,
  );
}

export default function Page() {
  return <SanDiegoCaliforniaPage />;
}
