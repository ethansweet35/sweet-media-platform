import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactPage from "@/views/contact/ContactPage";

const fallbackMetadata: Metadata = {
  title: "Contact Us | Adolescent Mental Health",
  description:
    "Contact Adolescent Mental Health admissions for a free, confidential consultation about Virtual IOP and teen therapy. Call (949) 946-5876 or send a message online.",
  alternates: { canonical: "/contact" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/contact" brandName="Adolescent Mental Health" />
      <ContactPage />
    </>
  );
}
