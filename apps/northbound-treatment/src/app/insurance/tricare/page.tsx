import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TricarePage from "@/views/insurance/tricare/TricarePage";

const fallback: Metadata = {
  title: "Tricare Addiction Treatment Coverage for Veterans & Military | Northbound",
  description:
    "Northbound accepts Tricare for eligible active duty service members, veterans, and military families. Verify your Tricare benefits for detox, residential, PHP, and IOP addiction treatment.",
  alternates: { canonical: '/insurance/tricare' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/tricare", fallback);
}

export default function Page() {
  return <TricarePage />;
}
