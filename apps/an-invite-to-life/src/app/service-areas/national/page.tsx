import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NationalPage from "@/views/NationalPage";

const fallback: Metadata = {
  title: "National Services",
  description: "Nationwide intervention services from our Orange County base.",
  alternates: { canonical: "/service-areas/national" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/national", fallback);
}

export default function Page() {
  return <NationalPage />;
}
