import type { Metadata } from "next";
import SeattlePage from "@/views/locations/SeattlePage";

export const metadata: Metadata = {
  title: "Addiction Treatment in Seattle, WA | Northbound Treatment",
  description:
    "Northbound's Seattle hub in Lower Queen Anne provides clinical assessments, IOP, family support, alumni programming, and alternative sentencing services for Washington state residents. Telehealth available statewide. Call (866) 311-0003.",
  alternates: { canonical: '/locations/washington/seattle' },
};

export default function Page() {
  return <SeattlePage />;
}
