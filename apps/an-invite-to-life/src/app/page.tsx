import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HomePage from "@/views/HomePage";

const fallback: Metadata = {
  title: "An Invite To Life | Professional Intervention Services",
  description: "Compassionate addiction and mental health intervention services in Orange County. Free confidential consultations available 24/7.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallback);
}

export default function Page() {
  return <HomePage />;
}
