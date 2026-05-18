import LegalPage from "./LegalPage";

export default function TermsOfServicePage() {
  return (
    <LegalPage
      badge="LEGAL"
      title="Terms of Service"
      subtitle="The terms and conditions governing your use of the Mountain View Treatment website."
      lastUpdated="January 1, 2025"
      intro="By accessing or using the Mountain View Treatment website (mountainviewtreatment.com), you agree to be bound by these Terms of Service. Please read them carefully. If you do not agree to these terms, please do not use this website."
      sections={[
        {
          heading: "Acceptance of Terms",
          body: [
            "These Terms of Service constitute a legally binding agreement between you and Mountain View Treatment Center regarding your use of this website and any related content, features, or services made available through it.",
            "We reserve the right to modify these terms at any time. Modifications become effective when posted to this page. Your continued use of the website following any changes constitutes your acceptance of the modified terms.",
          ],
        },
        {
          heading: "Website Use and Purpose",
          body: [
            "This website is provided for informational purposes only. The content on this site — including articles, guides, treatment descriptions, and other materials — is intended to provide general information about addiction treatment and behavioral health services offered by Mountain View Treatment.",
            "The information on this website does not constitute medical advice and is not a substitute for professional medical consultation, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.",
          ],
          list: [
            "Website content is for informational purposes only — not medical advice",
            "Do not delay seeking medical care based on information read on this site",
            "In a medical emergency, call 911 or go to the nearest emergency room",
            "For crisis support, call the 988 Suicide & Crisis Lifeline (call or text 988)",
          ],
        },
        {
          heading: "No Treatment Relationship",
          body: [
            "Use of this website does not create a treatment relationship, therapist-patient relationship, or any other professional relationship between you and Mountain View Treatment Center or any of its staff. Such a relationship is established only through a formal admissions process and executed treatment agreement.",
            "Submitting a contact form, inquiry, or insurance verification request on this website does not guarantee admission to our program. Admissions are subject to availability, clinical appropriateness, and insurance or financial eligibility.",
          ],
        },
        {
          heading: "Intellectual Property",
          body: [
            "All content on this website — including text, images, graphics, logos, icons, and software — is the property of Mountain View Treatment Center or its content suppliers and is protected by applicable intellectual property laws.",
            "You may view, download, and print content from this website for your personal, non-commercial use only. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content without our prior written consent.",
          ],
        },
        {
          heading: "User Conduct",
          body: [
            "By using this website, you agree not to engage in any conduct that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable. You agree not to attempt to gain unauthorized access to any portion of the website or its infrastructure.",
          ],
          list: [
            "Do not transmit any harmful, offensive, or unlawful content",
            "Do not attempt to interfere with the operation of the website",
            "Do not use automated tools to scrape or systematically download content",
            "Do not impersonate Mountain View Treatment or its staff",
            "Do not submit false or misleading information in contact forms",
          ],
        },
        {
          heading: "Third-Party Links",
          body: [
            "This website may contain links to third-party websites, resources, and services. These links are provided for convenience only. Mountain View Treatment does not endorse and is not responsible for the content, accuracy, or privacy practices of any linked third-party sites.",
            "Accessing linked third-party websites is at your own risk and subject to the terms and privacy policies of those sites.",
          ],
        },
        {
          heading: "Disclaimers and Limitation of Liability",
          body: [
            "This website and its content are provided on an 'as is' and 'as available' basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.",
            "To the fullest extent permitted by law, Mountain View Treatment shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this website, even if we have been advised of the possibility of such damages.",
            "Nothing in these terms limits our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded under applicable law.",
          ],
        },
        {
          heading: "Governing Law and Dispute Resolution",
          body: [
            "These Terms of Service are governed by and construed in accordance with the laws of the State of Washington, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in King County, Washington.",
          ],
        },
        {
          heading: "Accessibility",
          body: [
            "Mountain View Treatment is committed to ensuring this website is accessible to individuals with disabilities. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. If you experience barriers accessing any content on this site, please contact us and we will work to address the issue.",
          ],
        },
      ]}
      contactNote="For questions about these Terms of Service, contact us at tanner@mountainviewtx.com or call (253)-252-5564. Mountain View Treatment Center, 13028 Interurban Ave S Suite 124, Seattle, WA 98168."
    />
  );
}
