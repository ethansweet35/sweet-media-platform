import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CompsychPage from "@/views/insurance/compsych/CompsychPage";

const fallback: Metadata = {
  title: "ComPsych EAP & Behavioral Health Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound accepts ComPsych behavioral health and EAP coverage for addiction treatment. Verify your ComPsych benefits for detox, residential, PHP, and IOP programs.",
  alternates: { canonical: '/insurance/compsych' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/compsych", fallback);
}

export default function Page() {
  return <CompsychPage />;
}
