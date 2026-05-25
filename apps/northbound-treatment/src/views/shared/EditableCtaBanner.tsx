import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import { EditableText } from "@sweetmedia/admin-core/page-editor";

interface CtaItem {
  label: string;
  href: string;
}

interface EditableCtaBannerProps {
  eyebrow?: string;
  headline: string;
  body?: string;
  primaryCta: CtaItem;
  secondaryCta?: CtaItem;
}

/** Server-only CTA strip with inline editor fields for program page templates. */
export default function EditableCtaBanner({
  eyebrow = "Take the First Step",
  headline,
  body,
  primaryCta,
  secondaryCta,
}: EditableCtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-navy-light/50" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-terracotta/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <EditableText
              fieldKey="cta.eyebrow"
              defaultValue={eyebrow}
              as="p"
              className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"
            >
              <AutoLinkedText>{eyebrow}</AutoLinkedText>
            </EditableText>
            <EditableText
              fieldKey="cta.headline"
              defaultValue={headline}
              as="h2"
              className="font-heading text-3xl font-bold text-white md:text-4xl"
            >
              <AutoLinkedText>{headline}</AutoLinkedText>
            </EditableText>
            {body ? (
              <EditableText
                fieldKey="cta.body"
                defaultValue={body}
                as="p"
                className="mt-3 text-base leading-relaxed text-white/70"
              >
                <AutoLinkedText>{body}</AutoLinkedText>
              </EditableText>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 bg-terracotta px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-light"
            >
              {primaryCta.label}
              <i className="ri-arrow-right-line" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                <i className="ri-phone-line" />
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-white/10 pt-10">
          {[
            { icon: "ri-time-line", text: "24/7 Admissions Available" },
            { icon: "ri-shield-check-line", text: "DHCS Licensed #300661CP" },
            { icon: "ri-secure-payment-line", text: "Insurance Accepted" },
            { icon: "ri-map-pin-2-line", text: "Orange County & Seattle" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-xs font-semibold text-white/50"
            >
              <i className={`${item.icon} text-sm text-terracotta`} />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
