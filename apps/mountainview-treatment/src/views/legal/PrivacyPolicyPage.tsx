import LegalPage from "./LegalPage";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      badge="LEGAL"
      title="Privacy Policy"
      subtitle="How Mountain View Treatment collects, uses, and protects your information."
      lastUpdated="January 1, 2025"
      intro="Mountain View Treatment Center is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or contact us about our services."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "We collect information you voluntarily provide when you contact us, submit an inquiry form, or communicate with our admissions team. This may include your name, email address, phone number, and information about the nature of your inquiry.",
            "We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited. This information is collected through standard web server logs and analytics tools.",
          ],
          list: [
            "Contact information (name, email, phone number)",
            "Inquiry details and communication history",
            "Technical data (IP address, browser type, device type)",
            "Usage data (pages viewed, time on site, referral source)",
            "Cookies and similar tracking technologies",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use the information we collect to respond to your inquiries, provide information about our treatment programs, and connect you with our admissions team. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
            "Contact information submitted through our website forms is used exclusively to follow up on your inquiry. We will not use your information to contact you about unrelated matters without your consent.",
          ],
          list: [
            "Responding to admissions inquiries and verification requests",
            "Providing information about treatment programs and services",
            "Improving website functionality and user experience",
            "Complying with applicable laws and regulations",
            "Protecting the safety and security of our website and users",
          ],
        },
        {
          heading: "Medical Information and HIPAA",
          body: [
            "Mountain View Treatment complies with the Health Insurance Portability and Accountability Act (HIPAA) and applicable state privacy laws regarding the handling of protected health information (PHI). PHI collected in connection with treatment services is governed by our separate HIPAA Notice of Privacy Practices.",
            "Information submitted through our website contact and inquiry forms prior to the establishment of a treatment relationship is not necessarily protected health information under HIPAA, but we treat all health-related information you share with us with the highest level of confidentiality.",
          ],
        },
        {
          heading: "Cookies and Tracking Technologies",
          body: [
            "Our website uses cookies — small text files stored on your device — to improve your browsing experience, analyze website traffic, and understand how visitors interact with our content. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain until deleted).",
            "You may configure your browser to refuse cookies or to alert you when cookies are being sent. If you disable cookies, some features of our website may not function correctly. We do not use cookies to collect personally identifiable information without your knowledge.",
          ],
        },
        {
          heading: "Third-Party Services",
          body: [
            "Our website may use third-party service providers to assist in operating our website and conducting our business. These providers may have access to personal information only as needed to perform their functions and are contractually obligated to maintain the confidentiality and security of that information.",
            "Our website may include links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before submitting any personal information.",
          ],
          list: [
            "Analytics providers (e.g., Google Analytics — data is aggregated and anonymized)",
            "Contact form and email delivery services",
            "Website hosting and security services",
          ],
        },
        {
          heading: "Data Retention and Security",
          body: [
            "We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, including responding to inquiries, complying with legal obligations, and resolving disputes. Website inquiry data is generally retained for a period consistent with our admissions records policies.",
            "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include SSL/TLS encryption for data transmission, access controls, and regular security assessments.",
          ],
        },
        {
          heading: "Your Rights and Choices",
          body: [
            "Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, correct, or request deletion of personal information we hold about you. To exercise these rights, please contact us using the information below.",
            "Washington State residents may have additional rights under the Washington My Health MY Data Act and other applicable state laws. We are committed to honoring all applicable privacy rights.",
          ],
          list: [
            "Right to access personal information we hold about you",
            "Right to correct inaccurate information",
            "Right to request deletion (subject to legal obligations)",
            "Right to opt out of certain data uses",
            "Right to receive a copy of your personal data in a portable format",
          ],
        },
        {
          heading: "Children's Privacy",
          body: [
            "Our website is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information. If you are a parent or guardian and believe your child has submitted personal information, please contact us immediately.",
          ],
        },
        {
          heading: "Changes to This Policy",
          body: [
            "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the revised policy on this page with an updated effective date. We encourage you to review this page periodically.",
            "Continued use of our website after any changes to this policy constitutes your acceptance of the updated terms.",
          ],
        },
      ]}
      contactNote={`For questions about this Privacy Policy or to exercise your privacy rights, contact us at ${SITE_CONTACT}. You may also write to Mountain View Treatment Center, ${SITE_ADDRESS}.`}
    />
  );
}

// These are used in the contactNote — avoids importing SITE into LegalPage content
const SITE_CONTACT = "tanner@mountainviewtx.com";
const SITE_ADDRESS = "13028 Interurban Ave S Suite 124, Seattle, WA 98168";
