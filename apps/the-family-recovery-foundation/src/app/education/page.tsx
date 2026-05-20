import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PillarDetailPage from "@/views/pillars/PillarDetailPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/education",
    "Education",
    "Education and family programming for healing together.",
  );
}

export default function Page() {
  return <PillarDetailPage slug="education" />;
}
