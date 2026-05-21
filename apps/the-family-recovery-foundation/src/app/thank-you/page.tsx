import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ThankYouPage from "@/views/thank-you/page";

const fallbackMetadata: Metadata = {
  title: "Thank You for Registering | The Family Recovery Foundation",
  description:
    "Your registration is confirmed. Learn about Morning Meditation, Fix Your Family, The Family Room, and other family recovery resources.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/thank-you", fallbackMetadata);
}

export default function Page() {
  return <ThankYouPage />;
}
