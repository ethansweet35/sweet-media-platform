import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TorrancePage from "@/views/torrance/page";

const fallbackMetadata: Metadata = {
  title:
    "Alcohol Intervention Services in Torrance | Certified Interventionists",
  description:
    "Effective alcohol intervention services in Torrance, CA. Certified interventionists serving Torrance and the South Bay — on-site within 24–48 hours, available 24/7.",
  alternates: { canonical: "/service-areas/california/torrance" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/torrance",
    fallbackMetadata,
  );
}

export default function Page() {
  return <TorrancePage />;
}
