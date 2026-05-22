import Link from "next/link";
import { heroOverlayClass } from "@/lib/heroSpacing";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-heading text-2xl font-bold text-navy md:text-3xl">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-6 font-heading text-lg font-bold text-navy">
      {children}
    </h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 leading-relaxed text-espresso/80">{children}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 space-y-2 pl-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />
          <span className="leading-relaxed text-espresso/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <div className="my-10 h-px w-full bg-sand-dark/60" />;
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-navy py-20 ${heroOverlayClass}`}>
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-navy-light/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-terracotta/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
            <Link href="/" className="transition hover:text-terracotta">Home</Link>
            <i className="ri-arrow-right-s-line text-white/20" />
            <span className="text-white/70">Privacy Policy</span>
          </nav>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
            Legal
          </p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Effective Date: April 14, 2003 &nbsp;·&nbsp; Last Revised: September 23, 2013
          </p>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">

          {/* What we collect */}
          <SectionHeading>What Information Do We Collect?</SectionHeading>
          <Body>
            We collect information from you when you subscribe to our newsletter or fill out a form.
            When ordering or registering on our site, as appropriate, you may be asked to enter your
            name, e-mail address, phone number, or social security number. You may, however, visit
            our site anonymously.
          </Body>

          <Divider />

          {/* What we use it for */}
          <SectionHeading>What Do We Use Your Information For?</SectionHeading>
          <Body>
            Any of the information we collect from you may be used in one of the following ways:
          </Body>
          <BulletList items={[
            "To personalize your experience — your information helps us to better respond to your individual needs.",
            "To improve our website — we continually strive to improve our website offerings based on the information and feedback we receive from you.",
            "To improve customer service — your information helps us to more effectively respond to your customer service requests and support needs.",
            "To process transactions.",
          ]} />
          <Body>
            Your information, whether public or private, will not be sold, exchanged, transferred,
            or given to any other company for any reason whatsoever, without your consent, other than
            for the express purpose of delivering the purchased product or service requested.
          </Body>

          <Divider />

          {/* Personal Data */}
          <SectionHeading>Personal Data</SectionHeading>
          <Body>
            We may ask for personal data while you&rsquo;re engaging with us. This includes but is
            not limited to: email address, first and last name, phone number, personal address,
            cookies and usage data, and insurance information.
          </Body>
          <Body>
            We may use your personal data to contact you regarding admission, promotional materials,
            or other information of interest to you. You may opt out of receiving any, or all, of
            these communications from us by following the unsubscribe link provided in any email we
            send or by contacting us.
          </Body>
          <div className="my-6 border-l-4 border-terracotta bg-sand pl-6 py-4 pr-4">
            <p className="font-semibold text-navy">Northbound Treatment Services</p>
            <p className="mt-1 text-sm text-espresso/70">3822 Campus Dr. Suite 100</p>
            <p className="text-sm text-espresso/70">Newport Beach, CA 92660-2099</p>
          </div>

          <Divider />

          {/* How we protect */}
          <SectionHeading>How Do We Protect Your Information?</SectionHeading>
          <Body>
            We implement a variety of security measures to maintain the safety of your personal
            information when you enter, submit, or access your personal information.
          </Body>
          <Body>
            We offer the use of a secure server. All supplied sensitive/credit information is
            transmitted via Secure Socket Layer (SSL) technology and then encrypted into our
            database to be only accessed by those authorized with special access rights to our
            systems, who are required to keep the information confidential.
          </Body>
          <Body>
            After a transaction, your private information (credit cards, social security numbers,
            financials, etc.) will not be stored on our servers.
          </Body>

          <Divider />

          {/* Cookies */}
          <SectionHeading>Do We Use Cookies?</SectionHeading>
          <Body>
            Yes. Cookies are small files that a site or its service provider transfers to your
            computer&rsquo;s hard drive through your web browser (if you allow) that enables the
            site&rsquo;s or service provider&rsquo;s systems to recognize your browser and capture
            and remember certain information.
          </Body>
          <Body>
            We use cookies to understand and save your preferences for future visits and compile
            aggregate data about site traffic and site interaction so that we can offer better site
            experiences and tools in the future. We may contract with third-party service providers
            to assist us in better understanding our site visitors. These service providers are not
            permitted to use the information collected on our behalf except to help us conduct and
            improve our business.
          </Body>

          <Divider />

          {/* Outside parties */}
          <SectionHeading>Do We Disclose Any Information to Outside Parties?</SectionHeading>
          <Body>
            We do not sell, trade, or otherwise transfer to outside parties your personally
            identifiable information. This does not include trusted third parties who assist us in
            operating our website, conducting our business, or servicing you, so long as those
            parties agree to keep this information confidential.
          </Body>
          <Body>
            We may also release your information when we believe release is appropriate to comply
            with the law, enforce our site policies, or protect ours or others&rsquo; rights,
            property, or safety. However, non-personally identifiable visitor information may be
            provided to other parties for marketing, advertising, or other uses.
          </Body>

          <Divider />

          {/* Third party links */}
          <SectionHeading>Third Party Links</SectionHeading>
          <Body>
            Occasionally, at our discretion, we may include or offer third party products or
            services on our website. These third party sites have separate and independent privacy
            policies. We therefore have no responsibility or liability for the content and activities
            of these linked sites. Nonetheless, we seek to protect the integrity of our site and
            welcome any feedback about these sites.
          </Body>

          <Divider />

          {/* SMS */}
          <SectionHeading>SMS Messaging</SectionHeading>
          <Body>
            You agree to receive text messages regarding appointment reminders, updates from us, and
            responses to your inquiries from Northbound Treatment Centers. Message frequency varies
            as needed. Message and data rates may apply. Your mobile information will not be shared
            with third parties. Reply <strong>HELP</strong> for help. Reply <strong>STOP</strong> to
            cancel. Our Privacy Policy and Terms and Conditions apply.
          </Body>

          <Divider />

          {/* California + COPPA */}
          <SectionHeading>California Online Privacy Protection Act Compliance</SectionHeading>
          <Body>
            Because we value your privacy we have taken the necessary precautions to be in
            compliance with the California Online Privacy Protection Act. We will therefore not
            distribute your personal information to outside parties without your consent.
          </Body>

          <SectionHeading>Children&rsquo;s Online Privacy Protection Act Compliance</SectionHeading>
          <Body>
            We are in compliance with the requirements of COPPA (Children&rsquo;s Online Privacy
            Protection Act). We do not collect any information from anyone under 13 years of age.
            Our website, products, and services are all directed to people who are at least 13 years
            old or older.
          </Body>

          <SectionHeading>Online Privacy Policy Only</SectionHeading>
          <Body>
            This online privacy policy applies only to information collected through our website and
            not to information collected offline.
          </Body>

          <SectionHeading>Your Consent</SectionHeading>
          <Body>
            By using our site, you consent to our privacy policy. If we decide to change our privacy
            policy, we will post those changes on this page.
          </Body>

          <Divider />

          {/* HIPAA Notice */}
          <div className="mb-8 rounded-none border border-navy/20 bg-navy px-8 py-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
              Important Notice
            </p>
            <h2 className="font-heading mt-2 text-2xl font-bold text-white md:text-3xl">
              Notice of Health Information Practices
            </h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/60">
              This notice describes how information about you may be used and disclosed and how you
              can get access to this information. Please review it carefully.
            </p>
            <p className="mt-2 text-xs text-white/40">
              Effective Date: April 14, 2003 &nbsp;·&nbsp; Revised: September 23, 2013
            </p>
          </div>

          <SubHeading>Understanding Your Health Record / Information</SubHeading>
          <Body>
            Your client / patient medical record contains information about your health history,
            symptoms, examination and test results, diagnoses, treatment, and a plan for future care
            or treatment. This information serves as a:
          </Body>
          <BulletList items={[
            "Basis for planning your care and treatment",
            "Means of communication among the many health professionals who contribute to your care",
            "Legal document describing the care you received",
            "Means by which you or a third party payer can verify that services billed were actually provided",
            "A tool in educating health professionals",
            "A source of data for medical research",
            "A source of information for public health officials charged with improving the health of the nation",
            "A source of data for facility planning and marketing",
            "A tool with which we can assess and continually work to improve the care we render and the outcomes we achieve",
          ]} />
          <Body>
            Understanding what is in your record and how your health information is used helps you
            to ensure its accuracy, better understand who, what, when, where, and why others may
            access your health information, and make more informed decisions when authorizing
            disclosure to others.
          </Body>

          <SubHeading>Your Health Information Rights</SubHeading>
          <Body>
            Although your health record is the physical property of the healthcare practitioner or
            facility that compiled it, the information belongs to you. You have the right to:
          </Body>
          <BulletList items={[
            "Request a restriction on certain uses and disclosures of your information as provided by 45 CFR 164.522 and 42 CFR, Chapter 1, Part 2",
            "Obtain a paper copy of the notice of information practices upon request",
            "Inspect and obtain a paper or electronic copy of your health record as provided for in 45 CFR 164.524",
            "Amend your health record as provided in 45 CFR 164.528",
            "Obtain an accounting of disclosures of your health information as provided in 45 CFR 164.528",
            "Request communications of your health information by alternative means or at alternative locations",
            "Revoke your authorization to use or disclose health information except to the extent that action has already been taken",
          ]} />

          <SubHeading>Our Responsibilities</SubHeading>
          <Body>This organization is required to:</Body>
          <BulletList items={[
            "Maintain the privacy of your health information",
            "Provide you with a notice as to our legal duties and privacy practices with respect to information we collect and maintain about you",
            "Abide by the terms of this notice",
            "Notify you if we are unable to agree to a requested restriction",
            "Accommodate reasonable requests you may have to communicate personal health information by alternative means or at alternative locations",
            "Notify you and the Dept. of Health and Human Services if it is determined through a risk analysis that a breach of your health information occurred",
          ]} />
          <Body>
            We reserve the right to change our practices and to make the new provisions effective
            for all protected health information we maintain. Should our information practices
            change, we are required to distribute the modified version to new clients / patients on
            or after the date of modification. We will not use or disclose your health information
            without your authorization, except as described in this notice.
          </Body>

          <SubHeading>For More Information or to Report a Problem</SubHeading>
          <Body>
            If you have questions and would like additional information, you may contact the
            Compliance Officer at: 4343 Von Karman, Suite 100, Newport Beach, CA 92660.
          </Body>
          <Body>
            If you believe your privacy rights have been violated, you can file a complaint with
            the Dept. of Health and Human Services / Office for Civil Rights by email at{" "}
            <a
              href="mailto:ocrcomplaint@hhs.gov"
              className="text-navy underline underline-offset-4 hover:text-terracotta"
            >
              ocrcomplaint@hhs.gov
            </a>{" "}
            or by calling the national Office at{" "}
            <a href="tel:2022058725" className="text-navy underline underline-offset-4 hover:text-terracotta">
              202-205-8725
            </a>{" "}
            and asking for the OCR Health Information Privacy Complaint Form and / or the
            appropriate Regional OCR Office. There will be no retaliation for filing a complaint.
          </Body>

          <SubHeading>Examples of Disclosures for Treatment, Payment and Health Operations</SubHeading>
          <Body>
            We will use your health information for treatment. For example: information obtained by
            a counselor, physician, nurse, or other member of your treatment care team will be
            recorded in your record and used to determine the course of treatment that should work
            best for you.
          </Body>
          <Body>
            With your consent, we also provide an individual such as a physician or an entity such
            as a subsequent healthcare provider with copies of your diagnosis, various reports,
            assessments, and summaries, including psychotherapy notes where appropriate, that should
            assist him / her or the entity treating you once you are discharged from this program.
            Without your consent, we will not use or disclose your health information for marketing
            purposes, and we will not sell your health information.
          </Body>
          <Body>
            With your consent, we will use your health information for payment. For example: a bill
            may be sent to you or a third party payer. The information on or accompanying the bill
            may include information that identifies you, as well as your diagnosis and descriptions
            of treatment methods and procedures used. You have the right to restrict certain
            disclosures of health information to a health plan when you pay out of pocket in full
            for the healthcare item or services.
          </Body>
          <Body>
            We will use your health information for regular, internal health operations. For
            example: members of the treatment staff, the utilization review coordinator, the quality
            improvement manager, or members of the quality improvement team may use information in
            your health record to assess the care and outcomes in your case and others like it. This
            information will then be used in an effort to continually improve the quality and
            effectiveness of the treatment and service we provide.
          </Body>

          <SubHeading>Other Uses or Disclosures</SubHeading>
          <Body>
            <strong>Business Associates:</strong> There are some services provided in our
            organization through contracts with business associates. Examples include care by
            external physicians (in the event urgent or emergency care is needed), pharmacy services
            (filling prescriptions), and laboratory tests. When these services are contracted, we
            may disclose your health information to our business associate so that they can perform
            the job we&rsquo;ve asked them to do and bill for services rendered. Both we and the
            Dept. of Health and Human Services require business associates and their subcontractors
            to appropriately safeguard your information.
          </Body>
          <Body>
            <strong>Notification:</strong> With your prior consent, in the event of an emergency or
            crisis, we may use or disclose your personal information to notify or assist in notifying
            a family member, personal representative, or another person you designate as responsible
            for your continued care, your location, and general condition.
          </Body>
          <Body>
            <strong>Communication with Family:</strong> With your consent, this program&rsquo;s
            treatment personnel may disclose to a family member, other relative, close personal
            friend, or other significant person that you identify, your personal health information
            relevant to that person&rsquo;s involvement in your care or for payment needs related
            to your care.
          </Body>
          <Body>
            <strong>Research:</strong> With your consent, we may disclose information to researchers
            when their research has been approved by an Institutional Review Board that has reviewed
            the research proposal and established specific protocols to ensure the confidentiality of
            your health information.
          </Body>
          <Body>
            <strong>Continuing Care and/or Marketing:</strong> With your prior consent, we may
            contact you to provide appointment reminders or information about continuing care or
            other related benefits and services that may be of interest to you.
          </Body>
          <Body>
            <strong>Food and Drug Administration (FDA):</strong> We may disclose to the FDA health
            information relative to adverse events with respect to food, supplements, product and
            product defects, or other information to enable the FDA to notify patients and physicians
            about emerging dangers.
          </Body>
          <Body>
            <strong>Disability Insurance and Workers Compensation:</strong> With your consent, we
            may disclose the minimum health information needed to the extent authorized by and
            necessary to comply with laws relating to disability and workers compensation or other
            similar programs established by law.
          </Body>
          <Body>
            <strong>Public Health:</strong> With your consent and if required by law, we may
            disclose the minimum necessary health information to public health or legal authorities
            charged with preventing or controlling disease, injury, or disability.
          </Body>
          <Body>
            <strong>Law Enforcement:</strong> We may disclose health information for law enforcement
            per 42 CFR: Chapter 1, Part 2 (see Notice of &ldquo;Confidentiality of Alcohol and Drug
            Abuse Patient Records&rdquo;). Federal law makes provision for your health information
            to be released to an appropriate health oversight agency, public health authority, or
            attorney, provided that a workforce member or business associate believes in good faith
            that we have engaged in unlawful conduct or have otherwise violated professional or
            clinical standards and are potentially endangering you or patients, workers, or the
            public. In this case, a court order is required per 42 CFR, Chapter 1, Part 2.
          </Body>
          <Body>
            This organization reserves the right to change the terms of its notice and to make the
            new notice provisions effective for all protected health information that it maintains.
            Revisions of this notice will be posted at this location and on the
            organization&rsquo;s web site.
          </Body>
          <Body>
            <em>
              Reference: Health Insurance Portability and Accountability Act (45 CFR Part 160–164)
              HIPAA Privacy Rule – Standards for Privacy of Individually Identifiable Health
              Information. Adapted from the American Health Information Management Association
              Practice Brief, &ldquo;Notice of Information Practices&rdquo; (Updated November
              2002); and 42 CFR.
            </em>
          </Body>

          <Divider />

          {/* Contact */}
          <SectionHeading>Contacting Us</SectionHeading>
          <Body>
            If there are any questions regarding this privacy policy you may contact us using the
            information below.
          </Body>
          <div className="mt-6 border border-sand-dark/60 bg-sand p-6">
            <p className="font-semibold text-navy">Northbound Treatment Services</p>
            <p className="mt-1 text-sm text-espresso/70">3822 Campus Dr. Suite 100</p>
            <p className="text-sm text-espresso/70">Newport Beach, CA 92660-2099</p>
            <a
              href="tel:8663110003"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:underline"
            >
              <i className="ri-phone-line" />
              (866) 311-0003
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
