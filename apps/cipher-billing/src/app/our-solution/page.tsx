import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurSolutionPage from "@/views/our-solution/page";

const fallbackMetadata: Metadata = {
  title: "Behavioral Health Revenue Cycle Management | Cipher Billing",
  description:
    "End-to-end behavioral health RCM: eligibility, UR, claims, denials, payment posting, and A/R—built for addiction and mental health programs.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-solution", fallbackMetadata);
}

export default function Page() {
  return <OurSolutionPage />;
}
