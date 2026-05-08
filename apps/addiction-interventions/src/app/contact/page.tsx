import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactPage from "@/views/contact/page";

const fallbackMetadata: Metadata = {
  title: "Contact Us | Addiction Interventions",
  description:
    "Speak with a certified interventionist 24/7. Free, confidential consultations — call 949-776-7093 or request a private call back.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallbackMetadata);
}

export default function Page() {
  return <ContactPage />;
}
