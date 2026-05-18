import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdmissionsPage from "@/views/admissions/AdmissionsPage";

const fallback: Metadata = {
  title: "Admissions | Rize OC — Orange County Treatment Center",
  description:
    "Start the admissions process at Rize OC. Same-day intake available, most PPO insurance accepted, free benefits verification. Call (949) 461-2620 for confidential support 24/7.",
  alternates: { canonical: "/admissions" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions", fallback);
}

export default function Page() {
  return <AdmissionsPage />;
}
