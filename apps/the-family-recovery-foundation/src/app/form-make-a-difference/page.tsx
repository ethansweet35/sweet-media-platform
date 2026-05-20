import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import FormMakeADifferencePage from "@/views/make-a-difference/FormMakeADifferencePage";

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    "/form-make-a-difference",
    "Get Involved",
    "Volunteer, contribute to our blog, or offer professional services to The Family Recovery Foundation.",
  );
}

export default function Page() {
  return <FormMakeADifferencePage />;
}
