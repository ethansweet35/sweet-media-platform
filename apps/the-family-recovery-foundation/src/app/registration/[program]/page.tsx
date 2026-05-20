import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marketingMetadata } from "@/lib/marketing-page";
import { getRegistrationProgram } from "@/mocks/registration-programs";
import ProgramRegistrationPage from "@/views/registration/ProgramRegistrationPage";

interface PageProps {
  params: Promise<{ program: string }>;
}

export function generateStaticParams() {
  return [
    { program: "fix-your-family" },
    { program: "the-family-room" },
    { program: "morning-meditation" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { program: slug } = await params;
  const program = getRegistrationProgram(slug);
  if (!program) {
    return marketingMetadata("/registration", "Registration", "Register for Family Recovery Foundation programs.");
  }
  return marketingMetadata(
    `/registration/${slug}`,
    `Registration — ${program.title}`,
    `Register for ${program.title}. ${program.schedule}`,
  );
}

export default async function Page({ params }: PageProps) {
  const { program: slug } = await params;
  const program = getRegistrationProgram(slug);
  if (!program) notFound();
  return <ProgramRegistrationPage program={program} />;
}
