import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SacramentoPage from "@/views/sacramento/page";

const fallbackMetadata: Metadata = {
  title: "Drug Intervention Sacramento CA | Certified Interventionists",
  description:
    "On-site drug intervention services in Sacramento, CA. Certified interventionists available 24/7 — on the ground within 24–48 hours. Serving the entire Sacramento Valley.",
  alternates: { canonical: "/service-areas/california/sacramento" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/sacramento",
    fallbackMetadata,
  );
}

export default function Page() {
  return <SacramentoPage />;
}
