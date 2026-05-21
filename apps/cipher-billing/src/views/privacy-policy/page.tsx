import Link from "next/link";

const SITE_URL = "https://cipherbilling.com";
const CONTACT_EMAIL = "info@cipherbilling.com";
const CONTACT_PHONE_DISPLAY = "949-676-2252";
const CONTACT_PHONE_HREF = "tel:9496762252";
const CONTACT_ADDRESS = "1665 Scenic Ave suite 250, Costa Mesa, CA 92626";

type PolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string;
};

const sections: PolicySection[] = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "We may collect information about you in a variety of ways. The information we may collect on the Site includes:",
    ],
    bullets: [
      "Personal Information: When you engage with us, contact us, or sign up for services, we may collect personal information such as your name, email address, phone number, and any other identifiers you provide. This information is collected to enable us to communicate effectively with you.",
      "Usage Data: Information about your interactions with our website, including IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing our website. This helps us analyze trends, administer the site, and improve user experience.",
      "Cookies and Tracking Technologies: We may use cookies, web beacons, and other tracking technologies to collect information about your activity on our website. Cookies enable us to recognize your browser and capture and remember certain information, which allows us to enhance your experience.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    paragraphs: ["We use your information for several purposes, including:"],
    bullets: [
      "To Provide Services: Information collected allows us to deliver the products and services you request from us, and ensure the smooth operation of our website.",
      "To Improve Customer Experience: We may analyze your use of our website to better understand our audience and improve the website's performance, content, and layout.",
      "Communication and Support: To respond to inquiries, send important updates or information about your account, and provide customer support.",
      "Marketing and Promotional Communications: With your consent, we may use your personal information to send you newsletters, promotions, or other marketing materials. You have the right to opt out of such communications at any time.",
      "Legal Obligations and Enforcement: In certain cases, we may need to use your information to comply with legal requirements, resolve disputes, enforce our terms of use, and respond to lawful requests by public authorities.",
    ],
  },
  {
    title: "3. Sharing Your Information",
    paragraphs: ["We may share information we have collected about you in certain situations, including:"],
    bullets: [
      "Service Providers: We may share your information with third-party vendors, contractors, or agents who perform services for us or on our behalf, such as payment processing, email delivery, and data analysis. These parties are contractually obligated to protect your data and may not use it for any other purpose.",
      "Business Transfers: If we undergo a merger, acquisition, restructuring, or asset sale, we may transfer your information as part of that transaction, provided the receiving party agrees to respect your personal data in a manner consistent with this policy.",
      "Legal and Regulatory Requirements: We may disclose your personal information to third parties when we believe it is necessary to comply with applicable laws, legal proceedings, or government requests.",
    ],
  },
  {
    title: "4. Data Security",
    paragraphs: [
      "Cipher Billing takes your data privacy seriously and employs commercially reasonable security measures to protect your personal information. We use various security tools to protect your data against unauthorized access or disclosure. However, please be aware that no transmission of information over the Internet or electronic storage is entirely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "5. Your Rights",
    paragraphs: [
      "Depending on your jurisdiction, you may have certain rights regarding your personal information:",
    ],
    bullets: [
      "Access and Portability: You may request a copy of the personal information we hold about you.",
      "Correction: You may request that we correct any inaccuracies in your personal information.",
      "Deletion: You may request that we delete your personal information, subject to certain legal exceptions.",
      "Object or Restrict Processing: You may ask us to stop processing your personal data or restrict how we use it, especially if you believe the information is inaccurate or collected unlawfully.",
    ],
    afterBullets:
      "To exercise any of these rights, please contact us using the contact information provided below.",
  },
  {
    title: "6. Cookies Policy",
    paragraphs: [
      "We use cookies to help us improve your experience on our website. Cookies are small files that are transferred to your computer's hard drive through your web browser (if you allow) that enable us to recognize your browser and remember certain information. You may choose to disable cookies through your browser settings, but this may limit your ability to use certain features on our website.",
    ],
  },
  {
    title: "7. Third-Party Links",
    paragraphs: [
      "Our website may include links to third-party websites that are not affiliated with us. Once you leave our website or are redirected to a third-party website or application, this Privacy Policy no longer applies. We are not responsible for the privacy practices of other websites and encourage you to read their privacy statements.",
    ],
  },
  {
    title: "8. Retention of Data",
    paragraphs: [
      "We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, including to satisfy any legal, accounting, or reporting requirements. If you would like us to delete your information from our systems, please contact us.",
    ],
  },
  {
    title: "9. Changes to This Privacy Policy",
    paragraphs: [
      "Cipher Billing reserves the right to update or change this Privacy Policy at any time. We will notify you of any material changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.",
    ],
  },
];

function SectionBlock({ section }: { section: PolicySection }) {
  const paragraphs = section.paragraphs ?? [];

  return (
    <article className="border-t border-[#E8ECF0] pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-[var(--font-heading)] text-xl font-medium text-[#101E3F] md:text-2xl">
        {section.title}
      </h2>
      {paragraphs.map((text) => (
        <p key={text} className="mt-4 text-sm leading-[1.65] text-[#4B5563] md:text-base">
          {text}
        </p>
      ))}
      {section.bullets ? (
        <ul className="mt-4 space-y-3">
          {section.bullets.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-[1.65] text-[#4B5563] md:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#166C96]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {section.afterBullets ? (
        <p className="mt-4 text-sm leading-[1.65] text-[#4B5563] md:text-base">{section.afterBullets}</p>
      ) : null}
    </article>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="bg-[#101E3F] text-white">
        <div className="mx-auto max-w-[900px] px-6 pb-12 pt-16 md:pb-16 md:pt-24">
          <nav className="mb-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
            <Link href="/" className="transition hover:text-[#166C96]">
              Home
            </Link>
            <i className="ri-arrow-right-s-line text-white/30" aria-hidden />
            <span className="text-white/80">Privacy Policy</span>
          </nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Legal</p>
          <h1 className="mt-3 font-[var(--font-heading)] text-3xl font-medium tracking-[-0.02em] md:text-[2.5rem]">
            Privacy <span className="text-[#246D92]">Policy</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[760px] px-6">
          <p className="text-sm leading-[1.65] text-[#4B5563] md:text-base">
            Cipher Billing (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to
            protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website (
            <a
              href={SITE_URL}
              className="font-medium text-[#166C96] underline-offset-2 hover:underline"
            >
              {SITE_URL}
            </a>
            ). Please read this Privacy Policy carefully. By accessing or using our website, you agree to the terms and
            conditions of this Privacy Policy.
          </p>

          <div className="mt-12 flex flex-col gap-10">
            {sections.map((section) => (
              <SectionBlock key={section.title} section={section} />
            ))}
          </div>

          <article className="mt-12 border-t border-[#E8ECF0] pt-10">
            <h2 className="font-[var(--font-heading)] text-xl font-medium text-[#101E3F] md:text-2xl">
              10. Contact Us
            </h2>
            <p className="mt-4 text-sm leading-[1.65] text-[#4B5563] md:text-base">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <address className="mt-6 not-italic text-sm leading-[1.8] text-[#4B5563] md:text-base">
              <p className="font-semibold text-[#101E3F]">Cipher Billing</p>
              <p>{CONTACT_ADDRESS}</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-[#166C96] underline-offset-2 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={CONTACT_PHONE_HREF}
                  className="font-medium text-[#166C96] underline-offset-2 hover:underline"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </p>
            </address>
            <p className="mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#166C96] transition hover:text-[#145a82]"
              >
                Contact us
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
