import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/ocd";

const fallback: Metadata = {
  title: "OCD Treatment in Orange County | Rize OC",
  description: "OCD treatment in Orange County with certified ERP therapists — Exposure and Response Prevention, SSRI management, and integrated dual-diagnosis care at Rize OC.",
  alternates: { canonical: "/mental-health/ocd" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/ocd", fallback);
}

export default SubPage;
