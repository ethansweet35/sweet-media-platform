import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import StoriesPage from "@/views/stories/StoriesPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/stories",
    "Stories",
    "Video stories from families impacted by addiction — real perspectives and real hope.",
  );
}

export default function Page() {
  return <StoriesPage />;
}
