import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactPage from "@/views/contact/ContactPage";

const fallback: Metadata = {
  title: "Contact Us | Northbound Treatment",
  description:
    "Contact Northbound Treatment's 24/7 admissions team. Call (866) 311-0003 or fill out our form. Locations in Garden Grove, Newport Beach, San Diego, and Seattle. Confidential, no-cost consultation.",
  alternates: { canonical: "/contact-us" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact-us", fallback);
}

export default function Page() {
  return <ContactPage />;
}
