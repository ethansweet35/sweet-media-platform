import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import LightTheWayPage from "@/views/light-the-way/LightTheWayPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/light-the-way",
    "Light the Way",
    "Join the holiday matching campaign and help families access recovery support.",
  );
}

export default function Page() {
  return <LightTheWayPage />;
}
