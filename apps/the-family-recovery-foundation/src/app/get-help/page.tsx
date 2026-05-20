import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import GetHelpPage from "@/views/get-help/GetHelpPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/get-help",
    "Get Help",
    "Connect with The Family Recovery Foundation — our team will reach out as soon as possible.",
  );
}

export default function Page() {
  return <GetHelpPage />;
}
