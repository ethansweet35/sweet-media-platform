import {
  SERVICE_CONTAINER,
  SERVICE_SECTION_PY_COMPACT,
} from "@/views/services/components/servicePageConstants";
import { SUBSTANCE_ABUSE_BILLING_ESSENTIALS } from "@/views/services/substance-abuse-billing-services/substanceAbuseBillingEssentials";

export default function SubstanceAbuseBillingEssentials() {
  return (
    <section id="substance-abuse-billing-essentials" className={`bg-[#F5F7FA] ${SERVICE_SECTION_PY_COMPACT}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing essentials</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
            What SUD operators need to <span className="text-[#166C96]">know first</span>
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-slate-600">
            Operator detail without a long FAQ—see{" "}
            <a href="#substance-abuse-billing-codes" className="font-semibold text-[#166C96] underline-offset-2 hover:underline">
              substance abuse billing codes
            </a>{" "}
            for the full crosswalk.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {SUBSTANCE_ABUSE_BILLING_ESSENTIALS.map((item) => (
            <article
              key={item.title}
              className="flex h-full gap-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm md:p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#166C96]/10 text-[#166C96]">
                <i className={`${item.icon} text-xl`} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-[var(--font-heading)] text-base font-medium leading-snug text-[#101E3F] md:text-[17px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-slate-600">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
