import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import ResourcesPage from "@/views/resources/ResourcesPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/resources",
    "Resources",
    "Trusted national resources for families navigating addiction and mental health.",
  );
}

export default function Page() {
  return <ResourcesPage />;
}
