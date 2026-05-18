import type { Metadata } from "next";
import { preload } from "react-dom";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HomePage from "@/views/home/page";

const HERO_VIDEO =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/video2-compressed.mp4";

const fallbackMetadata: Metadata = {
  title: "Cipher Billing | Behavioral Health Billing Services | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  preload(HERO_VIDEO, { as: "video" });
  return <HomePage />;
}
