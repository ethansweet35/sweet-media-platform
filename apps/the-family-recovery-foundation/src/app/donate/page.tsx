import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/donate/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/donate",
    "Donate",
    "Support The Family Recovery Foundation with a tax-deductible donation.",
  );
}

export default function Page() {
  return <PageView />;
}
