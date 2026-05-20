import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/home/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/",
    "Home",
    "Standing with families impacted by addiction through prevention, education, and support.",
  );
}

export default function Page() {
  return <PageView />;
}
