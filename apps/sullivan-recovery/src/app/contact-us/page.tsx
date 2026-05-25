import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import ContactUsPage from "@/views/contact-us/page";

const fallbackMetadata: Metadata = {
  title: "Contact Us | Sullivan Recovery",
  description: "Contact Sullivan Recovery admissions in Mission Viejo.",
  alternates: { canonical: "/contact-us/" },
  robots: { index: false, follow: false },
};

export async function generateMetadata(): Promise<Metadata> {
  const resolved = await resolveTrackedPageMetadata("/contact-us/", fallbackMetadata);
  return withDraftPageRobots(resolved);
}

export default function Page() {
  return <ContactUsPage />;
}
