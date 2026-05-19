import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FinancialAssistancePage from "@/views/admissions/FinancialAssistancePage";

const fallback: Metadata = {
  title: "Financial Assistance for Rehab",
  description: "Money should never prevent anyone from getting help. Northbound offers insurance coverage, third-party financing, scholarships, and payment plans to make addiction treatment accessible to everyone.",
  alternates: { canonical: "/financial-assistance" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/financial-assistance", fallback);
}

export default function Page() {
  return <FinancialAssistancePage />;
}
