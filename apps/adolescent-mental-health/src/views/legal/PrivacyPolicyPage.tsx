import { MarketingPage, PageHero, PageSection } from "@/components/marketing";
import { SITE } from "@/lib/site";
import { AutoLinkedText } from "@sweetmedia/blog-core";

export default function PrivacyPolicyPage() {
  return (
    <MarketingPage currentPath="/privacy-policy">
      <PageHero
        compact
        eyebrow="Legal"
        headline="Privacy Policy"
        body={`Last updated: ${new Date().getFullYear()}. This policy describes how ${SITE.brand} collects, uses, and protects information when you use our website and services.`}
      />

      <PageSection>
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-8 text-body">
          <section>
            <h2 className="font-heading text-xl font-bold text-ink">Information we collect</h2>
            <p className="mt-3">
              <AutoLinkedText>{"We may collect contact information you submit through forms (name, email, phone), technical data\n              such as IP address and browser type, and usage information about how you interact with our site."}</AutoLinkedText>
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-ink">How we use information</h2>
            <p className="mt-3">
              <AutoLinkedText>{"We use submitted information to respond to inquiries, coordinate admissions, improve our website,\n              and comply with legal obligations. Clinical information submitted during treatment is handled under\n              separate HIPAA policies provided at intake."}</AutoLinkedText>
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-ink">Sharing & security</h2>
            <p className="mt-3">
              <AutoLinkedText>{"We do not sell personal information. We share data with service providers who help operate our\n              website and communications, subject to appropriate safeguards. We implement administrative and\n              technical measures designed to protect information we collect online."}</AutoLinkedText>
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-ink">Your choices</h2>
            <p className="mt-3">
              You may request access to or correction of personal information we maintain about you by contacting{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-accent-dark hover:text-accent">
                {SITE.email}
              </a>
              . You may opt out of non-essential marketing communications at any time.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-ink">Contact</h2>
            <p className="mt-3">
              Questions about this policy: {SITE.email} or {SITE.phone.display}. If you or your teen is in crisis,
              call or text 988 or call 911.
            </p>
          </section>
        </div>
      </PageSection>
    </MarketingPage>
  );
}
