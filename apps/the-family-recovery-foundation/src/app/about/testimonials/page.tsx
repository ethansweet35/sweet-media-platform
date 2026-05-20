import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/testimonials/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/about/testimonials",
    "Testimonials",
    "Stories from families who found hope and support through TFRF.",
  );
}

export default function Page() {
  return <PageView />;
}
