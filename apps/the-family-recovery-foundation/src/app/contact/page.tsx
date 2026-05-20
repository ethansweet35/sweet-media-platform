import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/contact/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/contact",
    "Contact",
    "Contact The Family Recovery Foundation — we answer every call.",
  );
}

export default function Page() {
  return <PageView />;
}
