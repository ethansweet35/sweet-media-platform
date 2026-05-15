import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OpPage from "@/views/op/OpPage";

const fallbackMetadata: Metadata = {
  title: "Outpatient Program (OP) | Mountain View Treatment Seattle",
  description:
    "Mountain View's Outpatient Program in Seattle provides ongoing therapy, group support, and relapse prevention 1-3 days per week — designed for stable recovery and step-down care.",
  alternates: { canonical: "/levels-of-care/outpatient-program/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/levels-of-care/outpatient-program/",
    fallbackMetadata,
  );
}

export default function Page() {
  return <OpPage />;
}
