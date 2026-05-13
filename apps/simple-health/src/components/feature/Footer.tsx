import Image from "next/image";
import Link from "next/link";
import { SCHEDULE_CTA_URL } from "./Navbar";

const LOGO_URL =
  "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated/Get-Simple-Health-Logo-1.svg";

const FOOTER_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Weight Loss", href: "/weight-loss/" },
      { label: "Peptides", href: "/peptides/" },
      { label: "Skin & Hair", href: "/skin-hair/" },
      { label: "Mental Health", href: "/mental-health/" },
      { label: "Annual Wellness", href: "/annual-wellness/" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Retatrutide", href: "/retatrutide/" },
      { label: "Tirzepatide", href: "/tirzepatide/" },
      { label: "Semaglutide", href: "/semaglutide/" },
      { label: "CJC/Ipamorelin", href: "/cjc-ipamorelin/" },
      { label: "NAD+", href: "/nad/" },
      { label: "Sermorelin", href: "/sermorelin/" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3A3A3A] text-[#FAF8F5]">
      <section className="px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_2fr_1.2fr]">
          {/* Brand block */}
          <div>
            <Link href="/" className="inline-block" aria-label="Simple Health home">
              <Image
                src={LOGO_URL}
                alt="Simple Health"
                width={200}
                height={42}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#FAF8F5]/70">
              Modern medicine for how you actually live. Future-proof your body with expert
              telehealth care.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#C67B5C]">
                  {col.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.84rem] text-[#FAF8F5]/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stay Ahead block */}
          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#C67B5C]">
              Stay Ahead
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#FAF8F5]/70">
              Get wellness tips and longevity insights, straight to your inbox.
            </p>
            <a
              href={SCHEDULE_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#C67B5C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#A66647]"
            >
              Schedule Consultation
              <i className="ri-arrow-right-line text-base" />
            </a>
          </div>
        </div>
      </section>

      {/* Copyright bar */}
      <div className="border-t border-white/10 px-5 py-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-[#FAF8F5]/55 md:flex-row">
          <p>© {year} Simple Health. All rights reserved.</p>
          <p>Telehealth services delivered nationwide.</p>
        </div>
      </div>
    </footer>
  );
}
