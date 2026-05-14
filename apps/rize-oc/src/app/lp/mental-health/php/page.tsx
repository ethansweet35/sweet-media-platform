import type { Metadata } from "next";
import PhpPage from "@/views/lp/galp/PhpPage";

export const metadata: Metadata = {
  title: "Adult Mental Health Partial Hospitalization Program Near Me | Rize OC",
  description: "Adult mental health PHP in Orange County. Structured day treatment program with 5–6 hours daily, evidence-based therapies, and insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PhpPage />;
}
