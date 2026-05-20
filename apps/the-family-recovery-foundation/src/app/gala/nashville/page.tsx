import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/events/nashville/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/gala/nashville",
    "Nashville Gala",
    "Nashville gala event details, sponsorships, and registration.",
  );
}

export default function Page() {
  return <PageView />;
}
