import { type Metadata } from "next";
import SuboxonePage from "@/views/substance/suboxone/SuboxonePage";

export const metadata: Metadata = {
  title: "Suboxone Addiction Treatment in Orange County | Northbound Treatment Services",
  description:
    "Northbound helps people safely get off Suboxone without substituting another opiate. Medically supervised detox, residential, PHP, and IOP in Orange County. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/suboxone' },
};

export default function Page() {
  return <SuboxonePage />;
}
