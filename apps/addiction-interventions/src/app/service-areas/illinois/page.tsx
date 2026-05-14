import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IllinoisPage from "@/views/illinois/page";

const fallbackMetadata: Metadata = {
  title: "Mental Health & Addiction Interventionist In Illinois | Addiction Interventions",
  description:
    "Find professional mental health & addiction intervention services in Illinois. We help families navigate the intervention process and guide loved ones toward recovery.",
  alternates: { canonical: "/service-areas/illinois" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/illinois", fallbackMetadata);
}

export default function Page() {
  return <IllinoisPage />;
}
