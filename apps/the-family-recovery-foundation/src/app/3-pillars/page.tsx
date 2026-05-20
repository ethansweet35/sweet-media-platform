import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import ThreePillarsPage from "@/views/pillars/ThreePillarsPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/3-pillars",
    "Our Three Pillars",
    "Prevention, education, and support — the foundation of generational change.",
  );
}

export default function Page() {
  return <ThreePillarsPage />;
}
