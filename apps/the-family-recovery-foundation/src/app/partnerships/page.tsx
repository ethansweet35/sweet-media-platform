import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/partnerships/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/partnerships",
    "Partnerships",
    "Partners and resources supporting family recovery.",
  );
}

export default function Page() {
  return <PageView />;
}
