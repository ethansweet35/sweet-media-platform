import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PfmlGuidePage from "@/views/guide/PfmlGuidePage";

const fallback: Metadata = {
  title: "Taking Leave for Rehab: WA PFML & FMLA Guide | Mountain View Treatment",
  description:
    "Your legal rights to take protected paid medical leave for addiction treatment in Washington State. Covers PFML benefits, federal FMLA, how to file without disclosing your diagnosis, and short-term disability.",
  alternates: { canonical: "/guide/taking-leave-for-rehab-washington-state-pfml-fmla-guide/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/taking-leave-for-rehab-washington-state-pfml-fmla-guide/",
    fallback,
  );
}

export default function Page() {
  return <PfmlGuidePage />;
}
