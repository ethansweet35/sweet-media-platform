import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlumniPage from "@/views/community/alumni/AlumniPage";

const fallback: Metadata = {
  title: "Alumni Programs & Community Services",
  description:
    "Northbound's Alumni Association connects 500+ clean and sober former clients through weekly meetings, monthly events, sobriety milestone celebrations, and lifelong community support in Orange County, CA.",
  alternates: { canonical: '/community/alumni' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/community/alumni", fallback);
}

export default function Page() {
  return <AlumniPage />;
}
