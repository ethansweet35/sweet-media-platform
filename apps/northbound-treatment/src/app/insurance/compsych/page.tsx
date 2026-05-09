import { type Metadata } from "next";
import CompsychPage from "@/views/insurance/compsych/CompsychPage";

export const metadata: Metadata = {
  title: "ComPsych EAP & Behavioral Health Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound accepts ComPsych behavioral health and EAP coverage for addiction treatment. Verify your ComPsych benefits for detox, residential, PHP, and IOP programs.",
};

export default function Page() {
  return <CompsychPage />;
}
