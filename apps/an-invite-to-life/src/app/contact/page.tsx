import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactUsPage from "@/views/ContactUsPage";

const fallback: Metadata = {
  title: "Contact Us",
  description: "Reach An Invite To Life 24/7 for a free confidential consultation.",
  alternates: { canonical: "/contact" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallback);
}

export default function Page() {
  return <ContactUsPage />;
}
