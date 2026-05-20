import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/about/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/about-the-family-recovery-foundation",
    "About the Foundation",
    "Our story, mission, and commitment to families in recovery.",
  );
}

export default function Page() {
  return <PageView />;
}
