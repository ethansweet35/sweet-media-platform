import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import MakeADifferencePage from "@/views/make-a-difference/MakeADifferencePage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/make-a-difference",
    "Make a Difference",
    "Donate, volunteer, fundraise, or contribute — ways to support The Family Recovery Foundation.",
  );
}

export default function Page() {
  return <MakeADifferencePage />;
}
