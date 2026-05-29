import Link from "next/link";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

export default function PostCta() {
  return (
    <section className="border-t border-mbh-forest/10 bg-white py-14">
      <div className={`${CONTAINER} text-center`}>
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-mbh-green">
          Need help now?
        </p>
        <h2 className="mx-auto mt-3 max-w-lg font-display text-2xl font-semibold text-mbh-forest">
          Questions about treatment? Talk to our team 24/7.
        </h2>
        <p className="mx-auto mt-2 max-w-md font-body text-sm text-mbh-body">
          Every call is confidential. We can help with insurance, admissions, and level of care.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
          >
            <i className="ri-phone-fill" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/20 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
          >
            Admissions
          </Link>
        </div>
      </div>
    </section>
  );
}
