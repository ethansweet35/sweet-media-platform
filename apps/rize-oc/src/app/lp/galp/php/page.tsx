import type { Metadata } from "next";
import PhpPage from "@/views/lp/galp/PhpPage";

export const metadata: Metadata = {
  title: "Evidence-Based Partial Hospitalization Program (PHP) | Rize OC",
  description: "The bridge to lasting wellness. Structured PHP treatment in Orange County combining clinical excellence with a compassionate, community-focused approach. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PhpPage />;
}
