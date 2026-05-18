import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AddictionIndexPage from "@/views/what-we-treat/AddictionIndexPage";

const fallback: Metadata = {
  title: "Addiction Treatment in Seattle, WA | Mountain View Treatment",
  description: "Evidence-based outpatient addiction treatment in Seattle, WA. Mountain View Treatment offers PHP, IOP, and OP for alcohol, opioids, stimulants, marijuana, and prescription drug use disorders.",
  alternates: { canonical: "/what-we-treat/addiction/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/addiction/", fallback);
}

export default function Page() {
  return <AddictionIndexPage />;
}
