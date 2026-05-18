import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InHouseCalculatorPage from "@/views/resources/in-house-vs-outsourced-calculator/page";

const fallbackMetadata: Metadata = {
  title: "In-House vs. Outsourced Billing Cost Calculator | Cipher Billing",
  description:
    "Calculate the true all-in cost of in-house behavioral health billing vs. outsourcing to Cipher. Accounts for salaries, software, denial losses, A/R aging opportunity cost, and overhead.",
  alternates: { canonical: "/resources/in-house-vs-outsourced-calculator" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/resources/in-house-vs-outsourced-calculator",
    fallbackMetadata,
  );
}

export default function Page() {
  return <InHouseCalculatorPage />;
}
