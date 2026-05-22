import Link from "next/link";
import { buildFAQPageSchema } from "@sweetmedia/seo-schema";

import { DETOX_FAQ_ITEMS } from "@/views/services/detox-billing-services/detoxFaqItems";
import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const faqSchema = buildFAQPageSchema(DETOX_FAQ_ITEMS);

export default function DetoxFaq() {
  return (
    <section id="detox-faq" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className={SERVICE_CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
                Frequently asked questions
              </p>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
              Detox billing <span className="text-[#166C96]">questions</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-slate-600">
              Six common questions from detox programs and treatment facilities—codes, auth, denials, and when to call
              Cipher.
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-[1.65] text-slate-500">
              Want more on levels of care or revenue code 0116? See{" "}
              <a
                href="#detox-billing-essentials"
                className="font-semibold text-[#166C96] underline-offset-2 hover:underline"
              >
                billing essentials
              </a>{" "}
              above.
            </p>
            <Link
              href="/contact-us?source=detox-billing-faq"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#166C96] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#145a82]"
            >
              Talk to a detox billing specialist
              <i className="ri-arrow-right-line text-base" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-3">
            {DETOX_FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="font-[var(--font-heading)] text-base font-medium leading-snug text-[#101E3F] md:text-[17px]">
                    {item.question}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#166C96]/35 text-[#166C96]">
                    <i className="ri-add-line text-base group-open:hidden" aria-hidden />
                    <i className="ri-subtract-line hidden text-base group-open:block" aria-hidden />
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                  <p className="text-[14px] leading-[1.75] text-slate-600">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
