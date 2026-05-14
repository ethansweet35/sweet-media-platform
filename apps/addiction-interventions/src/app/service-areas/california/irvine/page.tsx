import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IrvinePage from "@/views/irvine/page";

const fallbackMetadata: Metadata = {
  title: "Drug Intervention Services in Irvine | Certified Interventionists",
  description:
    "Effective drug intervention services in Irvine, CA. Certified interventionists serving Orange County — on-site within 24–48 hours. 1,500+ families helped nationwide.",
  alternates: { canonical: "/service-areas/california/irvine" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/irvine",
    fallbackMetadata,
  );
}

export default function Page() {
  return <IrvinePage />;
}
