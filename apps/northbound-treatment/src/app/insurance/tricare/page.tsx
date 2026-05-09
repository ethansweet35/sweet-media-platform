import { type Metadata } from "next";
import TricarePage from "@/views/insurance/tricare/TricarePage";

export const metadata: Metadata = {
  title: "Tricare Addiction Treatment Coverage for Veterans & Military | Northbound",
  description:
    "Northbound accepts Tricare for eligible active duty service members, veterans, and military families. Verify your Tricare benefits for detox, residential, PHP, and IOP addiction treatment.",
};

export default function Page() {
  return <TricarePage />;
}
