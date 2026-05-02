import type { Metadata } from "next";
import PaidMediaPage from "@/pages/paid-media/page";

export const metadata: Metadata = {
  title: "Paid Media for Treatment Centers | Google Ads, Meta & CTV | Sweet Media",
  description:
    "Results-driven paid media for behavioral health treatment centers. Google Ads, Meta Ads, and Connected TV campaigns that fill beds.",
  alternates: { canonical: "/paid-media" },
};

export default function Page() {
  return <PaidMediaPage />;
}
