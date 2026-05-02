import type { Metadata } from "next";
import WebDevPage from "@/pages/web-dev/page";

export const metadata: Metadata = {
  title: "Web Development for Treatment Centers | CRO & UX | Sweet Media",
  description:
    "High-converting website development for behavioral health treatment centers. Custom sites, landing pages, and conversion rate optimization that turns visitors into admissions.",
  alternates: { canonical: "/web-dev" },
};

export default function Page() {
  return <WebDevPage />;
}
