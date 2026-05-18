import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactPage from "@/views/contact/ContactPage";

const fallback: Metadata = {
  title: "Contact Us | Rize OC — Orange County Treatment Center",
  description:
    "Contact Rize OC's admissions team by phone, email, or our secure online form. We respond within hours. Call (949) 461-2620 — available 24/7.",
  alternates: { canonical: "/contact" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallback);
}

export default function Page() {
  return <ContactPage />;
}
