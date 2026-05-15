import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TricarePage from "@/views/insurance/TricarePage";

const fallback: Metadata = {
  title: "TRICARE Coverage | Mountain View Treatment",
  description:
    "Mountain View Treatment accepts TRICARE for active duty service members, veterans, National Guard and Reserve members, and their families. PHP, IOP, and outpatient care in Seattle, WA.",
  alternates: { canonical: "/admissions/insurance/tricare/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/insurance/tricare/", fallback);
}

export default function Page() {
  return <TricarePage />;
}
