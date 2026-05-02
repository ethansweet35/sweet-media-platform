import type { Metadata } from "next";
import CaliforniaPrimeRecoveryPage from "@/pages/case-studies/california-prime-recovery/page";

export const metadata: Metadata = {
  title: "California Prime Recovery Case Study | 30% CPA Reduction | Sweet Media",
  description:
    "How Sweet Media helped California Prime Recovery reduce paid advertising CPA by 30%, pass Core Web Vitals, and build a scalable admissions marketing system.",
  alternates: { canonical: "/case-studies/california-prime-recovery" },
};

export default function Page() {
  return <CaliforniaPrimeRecoveryPage />;
}
