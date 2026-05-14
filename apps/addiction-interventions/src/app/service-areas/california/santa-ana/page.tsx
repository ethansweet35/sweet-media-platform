import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SantaAnaPage from "@/views/santa-ana/page";

const fallbackMetadata: Metadata = {
  title:
    "Drug Intervention Services in Santa Ana | Certified Interventionists",
  description:
    "Effective drug intervention services in Santa Ana, CA. Certified interventionists serving central Orange County — on-site within 24–48 hours, available 24/7.",
  alternates: { canonical: "/service-areas/california/santa-ana" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/santa-ana",
    fallbackMetadata,
  );
}

export default function Page() {
  return <SantaAnaPage />;
}
