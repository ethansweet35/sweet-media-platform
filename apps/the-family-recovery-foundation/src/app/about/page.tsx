import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/about/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/about",
    "About",
    "Learn about The Family Recovery Foundation mission, team, and board.",
  );
}

export default function Page() {
  return <PageView />;
}
