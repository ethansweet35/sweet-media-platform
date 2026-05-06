import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SocialMediaPage from "@/pages/social-media/page";

const fallbackMetadata: Metadata = {
  title: "Social Media for Treatment Centers | Content & Community | Sweet Media",
  description:
    "Social media marketing for behavioral health treatment centers. Authentic content, community management, and reputation building that earns family trust.",
  alternates: { canonical: "/social-media" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/social-media", fallbackMetadata);
}

export default function Page() {
  return <SocialMediaPage />;
}
