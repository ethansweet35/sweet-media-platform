import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GroupTherapyPage from "@/views/therapy/GroupTherapyPage";

const fallbackMetadata: Metadata = {
  title: "Group Therapy for Teens | Adolescent Mental Health",
  description:
    "Virtual group therapy for adolescents in IOP. Peer support, CBT and DBT skills, and licensed clinicians for teens ages 12–17.",
  alternates: { canonical: "/therapy/group-therapy-with-adolescents" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapy/group-therapy-with-adolescents", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner
        trackedPagePath="/therapy/group-therapy-with-adolescents"
        brandName="Adolescent Mental Health"
      />
      <GroupTherapyPage />
    </>
  );
}
