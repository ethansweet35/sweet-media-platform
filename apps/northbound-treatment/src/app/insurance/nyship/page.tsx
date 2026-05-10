import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NyshipPage from "@/views/insurance/nyship/NyshipPage";

const fallback: Metadata = {
  title: "NYSHIP Coverage for Addiction Treatment | Northbound Treatment",
  description:
    "Northbound accepts NYSHIP (New York State Health Insurance Program) for eligible state employees and their families. Verify your NYSHIP Empire Plan benefits for addiction treatment.",
  alternates: { canonical: '/insurance/nyship' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/nyship", fallback);
}

export default function Page() {
  return <NyshipPage />;
}
