import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactPage from "@/views/contact/ContactPage";

const fallbackMetadata: Metadata = {
  title: "Contact Us | Mountain View Treatment",
  description:
    "Reach our admissions team 24/7. Confidential inquiries, free insurance verification, and same-day assessments available. Mountain View Treatment — Seattle, WA.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    title: "Contact Us | Mountain View Treatment",
    description:
      "Reach our admissions team 24/7. Confidential inquiries, free insurance verification, and same-day assessments available.",
    url: "/contact/",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallbackMetadata);
}

export default function Page() {
  return <ContactPage />;
}
