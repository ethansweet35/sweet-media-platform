import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import GetInvolvedPage from "@/views/get-involved/GetInvolvedPage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/get-involved",
    "Get Involved",
    "Donate, partner, or spread the word — join us in standing with families.",
  );
}

export default function Page() {
  return <GetInvolvedPage />;
}
