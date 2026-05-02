import type { Metadata } from "next";
import SocialMediaPage from "@/pages/social-media/page";

export const metadata: Metadata = {
  title: "Social Media for Treatment Centers | Content & Community | Sweet Media",
  description:
    "Social media marketing for behavioral health treatment centers. Authentic content, community management, and reputation building that earns family trust.",
  alternates: { canonical: "/social-media" },
};

export default function Page() {
  return <SocialMediaPage />;
}
