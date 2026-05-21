import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import GalaSponsorPage from "@/views/events/GalaSponsorPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/gala/sponsor",
    "Gala Sponsorship",
    "Become a sponsor for The Family Recovery Foundation Oklahoma City annual gala.",
  );
}

export default function Page() {
  return <GalaSponsorPage />;
}
