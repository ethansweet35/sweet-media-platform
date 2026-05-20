import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VirtualIopPage from "@/views/virtual-iop/VirtualIopPage";

const fallbackMetadata: Metadata = {
  title: "Virtual IOP for Teens | Adolescent Mental Health",
  description:
    "Virtual Intensive Outpatient Program for teens ages 12–17. 9–20 hours per week of individual, group, and family therapy from home. Insurance accepted. Free consultation — call (949) 946-5876.",
  alternates: { canonical: "/virtual-iop-for-teens" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/virtual-iop-for-teens", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner
        trackedPagePath="/virtual-iop-for-teens"
        brandName="Adolescent Mental Health"
      />
      <VirtualIopPage />
    </>
  );
}
