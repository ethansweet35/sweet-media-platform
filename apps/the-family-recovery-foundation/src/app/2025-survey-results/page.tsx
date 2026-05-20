import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/impact-report/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/2025-survey-results",
    "2025 Survey Results",
    "Impact report and survey insights from The Family Recovery Foundation.",
  );
}

export default function Page() {
  return <PageView />;
}
