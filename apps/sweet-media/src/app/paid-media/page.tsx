import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PaidMediaPage from "@/pages/paid-media/page";

const fallbackMetadata: Metadata = {
  title: "Paid Media for Treatment Centers | Google Ads, Meta & CTV | Sweet Media",
  description:
    "Results-driven paid media for behavioral health treatment centers. Google Ads, Meta Ads, and Connected TV campaigns that fill beds.",
  alternates: { canonical: "/paid-media" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/paid-media", fallbackMetadata);
}

export default function Page() {
  return <PaidMediaPage />;
}
