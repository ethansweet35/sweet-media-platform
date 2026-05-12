import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/meth";

const fallback: Metadata = {
  title: "Meth Addiction Treatment in Orange County | Rize OC",
  description: "Methamphetamine addiction treatment at Rize OC in Orange County — psychiatric stabilization, CBT, Contingency Management, and dual-diagnosis care for meth use disorder.",
  alternates: { canonical: "/addiction/meth" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/meth", fallback);
}

export default SubPage;
