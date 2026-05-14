import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SolanaBeachPage from "@/views/solana-beach/page";

const fallbackMetadata: Metadata = {
  title:
    "Addiction Intervention Services in Solana Beach CA | Certified Interventionists",
  description:
    "Professional addiction intervention services in Solana Beach, CA. Certified interventionists serving North San Diego County — on-site within 24–48 hours.",
  alternates: { canonical: "/service-areas/california/solana-beach" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/solana-beach",
    fallbackMetadata,
  );
}

export default function Page() {
  return <SolanaBeachPage />;
}
