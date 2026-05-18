import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DualDiagnosisGuidePage from "@/views/guide/DualDiagnosisGuidePage";

const fallback: Metadata = {
  title: "Understanding Dual Diagnosis: Addiction & Mental Health | Mountain View Treatment",
  description:
    "Over half of people with addiction have a co-occurring mental health condition. Learn what dual diagnosis means, why integrated treatment is essential, and how to find the right care in Washington State.",
  alternates: { canonical: "/guide/understanding-dual-diagnosis-addiction-mental-health/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/understanding-dual-diagnosis-addiction-mental-health/",
    fallback,
  );
}

export default function Page() {
  return <DualDiagnosisGuidePage />;
}
