import LegalPage from "@/components/pages/legal/LegalPage";
import {
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_NOTICE,
  PRIVACY_POLICY_SECTIONS,
} from "@/data/privacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      badge="Legal"
      title="HIPAA Notice of Privacy Practices"
      subtitle="Sullivan Recovery · Mission Viejo, California"
      lastUpdated="February 7, 2024"
      notice={PRIVACY_POLICY_NOTICE}
      intro={PRIVACY_POLICY_INTRO}
      sections={PRIVACY_POLICY_SECTIONS}
      contactNote="If you have questions about this notice or wish to exercise your privacy rights, contact our admissions team. We can connect you with the appropriate privacy officer."
    />
  );
}
