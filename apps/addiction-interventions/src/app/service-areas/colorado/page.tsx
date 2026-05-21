import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ColoradoPage from "@/views/colorado/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Intervention Services Colorado | 24/7 Help",
  description:
    "Need Addiction Intervention Services Colorado? Confidential support is available statewide, 24/7. Certified interventionists on-site within 48 hours. Get help today.",
  alternates: { canonical: "/service-areas/colorado" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/colorado", fallbackMetadata);
}

export default function Page() {
  return <ColoradoPage />;
}
