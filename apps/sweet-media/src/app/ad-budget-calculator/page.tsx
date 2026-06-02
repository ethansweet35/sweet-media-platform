import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdBudgetCalculatorPage from "@/views/ad-budget-calculator/page";

const fallbackMetadata: Metadata = {
  title: "Behavioral Health Google Ads Budget Calculator | Sweet Media",
  description:
    "Model minimum and recommended Google Ads budgets for treatment centers. See cost per lead, verified (VOB) volume, impression-share ceilings, and Smart Bidding thresholds by program and market.",
  alternates: { canonical: "/ad-budget-calculator" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ad-budget-calculator", fallbackMetadata);
}

export default function Page() {
  return <AdBudgetCalculatorPage />;
}
