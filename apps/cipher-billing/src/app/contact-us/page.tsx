import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactUsPage from "@/views/contact-us/page";

const fallbackMetadata: Metadata = {
  title: "Contact Us | Cipher Billing Behavioral Health Experts | Cipher Billing",
  description:
    "Contact Cipher Billing for behavioral health billing support. Request a free practice audit within 24 hours — phone, email, and Costa Mesa office.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact-us", fallbackMetadata);
}

export default function Page() {
  return <ContactUsPage />;
}
