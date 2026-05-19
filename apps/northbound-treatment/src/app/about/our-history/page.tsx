import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurHistoryPage from "@/views/about/OurHistoryPage";

const fallback: Metadata = {
  title: "Our History",
  description: "For over 38 years Northbound Treatment has helped thousands achieve recovery. Learn how we grew from a small Orange County IOP in 1988 into a nationally recognized multi-campus treatment center.",
  alternates: { canonical: "/about/our-history" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about/our-history", fallback);
}

export default function Page() {
  return <OurHistoryPage />;
}
