import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/family-programming/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/family-programming",
    "Family Programming",
    "Family modules, worksheets, and programming for lasting recovery.",
  );
}

export default function Page() {
  return <PageView />;
}
