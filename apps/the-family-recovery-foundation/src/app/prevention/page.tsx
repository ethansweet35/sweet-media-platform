import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PillarDetailPage from "@/views/pillars/PillarDetailPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/prevention",
    "Prevention",
    "Prevention modules for families and communities.",
  );
}

export default function Page() {
  return <PillarDetailPage slug="prevention" />;
}
