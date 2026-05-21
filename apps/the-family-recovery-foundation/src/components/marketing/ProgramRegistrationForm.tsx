import FlodeskFormEmbed from "@/components/marketing/FlodeskFormEmbed";

interface ProgramRegistrationFormProps {
  programSlug: string;
}

export default function ProgramRegistrationForm({ programSlug }: ProgramRegistrationFormProps) {
  return <FlodeskFormEmbed instanceKey={`registration-${programSlug}`} />;
}
