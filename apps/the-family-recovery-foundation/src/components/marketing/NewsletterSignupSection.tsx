import FlodeskNewsletterEmbed from "@/components/marketing/FlodeskNewsletterEmbed";

interface NewsletterSignupSectionProps {
  instanceKey: string;
  sectionClassName?: string;
  contentClassName?: string;
}

export default function NewsletterSignupSection({
  instanceKey,
  sectionClassName = "bg-soft-white py-16 md:py-20 overflow-hidden",
  contentClassName = "max-w-2xl mx-auto text-center",
}: NewsletterSignupSectionProps) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className={contentClassName}>
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Sign Up
          </p>
          <h2 className="text-[clamp(24px,2.8vw,36px)] font-display text-deep-navy leading-[1.15] mb-4 md:mb-6">
            Join The Family Recovery Foundation Newsletter
          </h2>
          <p className="text-body-m font-body text-slate leading-relaxed mb-8 md:mb-10">
            Stay connected with{" "}
            <span className="text-tfrf-blue font-semibold">
              The Family Recovery Foundation
            </span>
            . Sign up with your email to receive the latest news &amp; information.
          </p>

          <FlodeskNewsletterEmbed instanceKey={instanceKey} />
        </div>
      </div>
    </section>
  );
}
