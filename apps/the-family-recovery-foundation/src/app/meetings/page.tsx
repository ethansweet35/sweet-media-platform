import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import MeetingsPage from "@/views/meetings/MeetingsPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/meetings",
    "Meetings",
    "Join weekly live recovery support sessions — register for Fix Your Family, The Family Room, and more.",
  );
}

export default function Page() {
  return <MeetingsPage />;
}
