import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/events/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/gala",
    "Annual Gala",
    "Join The Family Recovery Foundation annual gala and fundraising events.",
  );
}

export default function Page() {
  return <PageView />;
}
