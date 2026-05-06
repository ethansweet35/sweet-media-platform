import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CaliforniaPrimeRecoveryPage from "@/pages/case-studies/california-prime-recovery/page";

const fallbackMetadata: Metadata = {
  title: "California Prime Recovery Case Study | 30% CPA Reduction | Sweet Media",
  description:
    "How Sweet Media helped California Prime Recovery reduce paid advertising CPA by 30%, pass Core Web Vitals, and build a scalable admissions marketing system.",
  alternates: { canonical: "/case-studies/california-prime-recovery" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/case-studies/california-prime-recovery", fallbackMetadata);
}

export default function Page() {
  return <CaliforniaPrimeRecoveryPage />;
}
