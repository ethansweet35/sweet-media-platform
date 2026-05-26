import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServicesPage from "@/views/services/ServicesPage";

const fallbackMetadata: Metadata = {
  title: "Services | Adolescent Mental Health",
  description:
    "Virtual IOP, adolescent IOP, individual therapy, CBT, insomnia treatment, and bipolar care for teens ages 12–17. Evidence-based programs from home.",
  alternates: { canonical: "/services" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/services" brandName="Adolescent Mental Health" />
      <ServicesPage />
    </>
  );
}
