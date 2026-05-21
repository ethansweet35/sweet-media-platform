import FlodeskFormEmbed from "@/components/marketing/FlodeskFormEmbed";

interface ProgramRegistrationFormProps {
  programSlug: string;
}

export default function ProgramRegistrationForm({ programSlug }: ProgramRegistrationFormProps) {
  return (
    <div id="program-registration">
      <p className="text-[14px] font-body text-slate mb-4">
        Your Zoom login details will be sent after registration.
      </p>
      <FlodeskFormEmbed instanceKey={`registration-${programSlug}`} />
    </div>
  );
}
