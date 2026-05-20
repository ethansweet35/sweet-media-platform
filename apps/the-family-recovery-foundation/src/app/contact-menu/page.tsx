import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import PageView from "@/views/contact/page";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/contact-menu",
    "Contact",
    "Get in touch with The Family Recovery Foundation.",
  );
}

export default function Page() {
  return <PageView />;
}
