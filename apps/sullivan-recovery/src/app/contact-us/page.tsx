import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactUsPage from "@/views/contact-us/page";

const fallbackMetadata: Metadata = {
  title: "Contact Us | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact-us", fallbackMetadata);
}

export default function Page() {
  return <ContactUsPage />;
}
