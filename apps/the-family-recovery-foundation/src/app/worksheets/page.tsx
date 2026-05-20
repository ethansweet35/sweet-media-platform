import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import WorksheetsPage from "@/views/worksheets/WorksheetsPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/worksheets",
    "Worksheets",
    "Download family recovery worksheets — relapse prevention and support planning tools.",
  );
}

export default function Page() {
  return <WorksheetsPage />;
}
