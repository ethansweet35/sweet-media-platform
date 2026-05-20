import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import DonateLightTheWayPage from "@/views/donate/DonateLightTheWayPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/donate-light-the-way",
    "Donate — Light the Way",
    "Give to the Light the Way holiday matching campaign for The Family Recovery Foundation.",
  );
}

export default function Page() {
  return <DonateLightTheWayPage />;
}
