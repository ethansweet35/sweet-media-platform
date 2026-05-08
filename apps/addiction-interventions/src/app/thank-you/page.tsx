import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ThankYouPage from "@/views/thank-you/page";

const fallbackMetadata: Metadata = {
  title: "Thank You | Addiction Interventions",
  description:
    "We have received your message — a certified interventionist will be in touch shortly. While you wait, here are resources to help you prepare for the conversation.",
  robots: { index: false, follow: false },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/thank-you", fallbackMetadata);
}

export default function Page() {
  return <ThankYouPage />;
}
