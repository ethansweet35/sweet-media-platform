import ProgramPageView from "@/components/pages/programs/template/ProgramPageView";
import { personalizedCareProgramPage } from "@/data/programPages/personalized-care";

export default function PersonalizedCareProgramPage() {
  return <ProgramPageView data={personalizedCareProgramPage} />;
}
