import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PayingForRehabPage from "@/views/guide/PayingForRehabPage";

const fallback: Metadata = {
  title: "How to Pay for Drug Rehab in Washington State | Mountain View Treatment",
  description:
    "A complete guide to insurance coverage, Apple Health (Medicaid), EAPs, financing options, parity laws, and how to appeal a treatment denial in Washington State.",
  alternates: { canonical: "/guide/how-to-pay-for-drug-rehab-in-washington-state/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/how-to-pay-for-drug-rehab-in-washington-state/",
    fallback,
  );
}

export default function Page() {
  return <PayingForRehabPage />;
}
