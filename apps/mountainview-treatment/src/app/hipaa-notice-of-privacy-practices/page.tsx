import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HipaaPage from "@/views/legal/HipaaPage";

const fallback: Metadata = {
  title: "HIPAA Notice of Privacy Practices | Mountain View Treatment",
  description:
    "How Mountain View Treatment uses and discloses your protected health information, special 42 CFR Part 2 protections for substance use disorder records, and your patient rights.",
  alternates: { canonical: "/hipaa-notice-of-privacy-practices/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/hipaa-notice-of-privacy-practices/", fallback);
}

export default function Page() {
  return <HipaaPage />;
}
