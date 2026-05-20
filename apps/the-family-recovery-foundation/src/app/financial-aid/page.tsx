import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PillarDetailPage from "@/views/pillars/PillarDetailPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/financial-aid",
    "Financial Aid & Support",
    "Direct financial aid for treatment and intervention services.",
  );
}

export default function Page() {
  return <PillarDetailPage slug="financial-aid" />;
}
