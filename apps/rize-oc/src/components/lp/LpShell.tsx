import Image from "next/image";
import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";
const LOGO_SRC      = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated/rize-logo.png";

const NAV_LINKS = [
  { label: "Accommodations", href: "#accommodations" },
  { label: "What We Treat",  href: "#substances"     },
  { label: "How It Works",   href: "#admissions"     },
  { label: "Insurance",      href: "#insurance"      },
  { label: "FAQ",            href: "#faq"            },
];

export default function LpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* LP header — sticky, logo + nav anchors + phone */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-white shadow-sm">
        <div className="mx-auto max-w-[1300px] px-6 h-20 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src={LOGO_SRC}
              alt="Rize OC"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop anchor nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/60 hover:text-ink transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <CallRailPhoneLink className="shrink-0 flex items-center gap-2 bg-accent px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity">
            <i className="ri-phone-fill text-sm" />
            <span className="hidden sm:inline">{CALLRAIL_PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call Now</span>
          </CallRailPhoneLink>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Minimal LP footer */}
      <footer className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-[1300px] px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-ink/50 leading-relaxed">
            <p className="font-medium text-ink/70">Rize OC — Mental Health &amp; Addiction Treatment</p>
            <p>22792 Centre Dr Suite 104, Lake Forest, CA 92630</p>
            <p className="mt-1">Certified by the State of California, Department of Health Care Services</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-ink/40">
            <Link href="/terms-and-service" className="hover:text-ink/70 transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:text-ink/70 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <CallRailPhoneLink className="hover:text-ink/70 transition-colors">{CALLRAIL_PHONE_DISPLAY}</CallRailPhoneLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
