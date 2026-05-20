import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/events/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/events-1",
    "Events",
    "Upcoming events from The Family Recovery Foundation.",
  );
}

export default function Page() {
  return <PageView />;
}
