import Image from "next/image";
import {
  ADMISSIONS_PHONE,
  ADMISSIONS_PHONE_DISPLAY,
  VIRTUAL_LP_SECTION_LINKS,
} from "./content";

const LOGO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/logos/northbound-logo.png";

/** Minimal LP header with on-page section sitelinks — no links off the landing page. */
export default function VirtualLpChrome() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[60] border-b border-sand-dark/30 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
        <Image
          src={LOGO}
          alt="Northbound Treatment Services"
          width={220}
          height={58}
          className="h-11 w-auto shrink-0 sm:h-12 md:h-[3.25rem]"
          priority
        />

        <nav
          className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto no-scrollbar"
          aria-label="On-page sections"
        >
          {VIRTUAL_LP_SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="shrink-0 whitespace-nowrap px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-navy/70 transition hover:text-navy sm:px-2.5 sm:text-[11px] sm:tracking-[0.08em]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={ADMISSIONS_PHONE}
          className="inline-flex shrink-0 items-center gap-2 bg-navy px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-navy-light sm:px-5"
        >
          <i className="ri-phone-line" />
          <span className="hidden sm:inline">{ADMISSIONS_PHONE_DISPLAY}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  );
}
