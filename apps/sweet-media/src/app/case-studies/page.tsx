import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Legacy index URL — the designed results hub lives at /results.
 * Individual case studies remain at /case-studies/[slug].
 */
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const edit = params.sm_edit;
  if (edit === "1" || edit === "true") {
    redirect("/results?sm_edit=1");
  }
  redirect("/results");
}
