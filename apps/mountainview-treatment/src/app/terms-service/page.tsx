import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TermsOfServicePage from "@/views/legal/TermsOfServicePage";

const fallback: Metadata = {
  title: "Terms of Service | Mountain View Treatment",
  description:
    "The terms and conditions governing your use of the Mountain View Treatment website and informational content.",
  alternates: { canonical: "/terms-service/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/terms-service/", fallback);
}

export default function Page() {
  return <TermsOfServicePage />;
}
