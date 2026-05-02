import type { Metadata } from "next";
import IndustriesPage from "@/pages/industries/page";

export const metadata: Metadata = {
  title: "Industries We Serve | Behavioral Health Marketing | Sweet Media",
  description:
    "Sweet Media serves detox, residential, IOP, PHP, and mental health treatment programs. Specialized marketing for every level of behavioral health care.",
  alternates: { canonical: "/industries" },
};

export default function Page() {
  return <IndustriesPage />;
}
