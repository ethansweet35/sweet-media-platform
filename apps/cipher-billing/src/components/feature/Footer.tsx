import Link from "next/link";
import Image from "next/image";

/** Navigation column — mirrors live cipherbilling.com footer (no "Home" link). */
const navLinks = [
  { label: "Our Company", path: "/our-company" },
  { label: "Our Team", path: "/our-team" },
  { label: "Our Solution", path: "/behavioral-health-revenue-cycle-management" },
  { label: "Our Process", path: "/our-process" },
  { label: "Behavioral Health Reimbursements By State", path: "/behavioral-health-reimbursement-rates-by-state" },
  { label: "Behavioral Health Billing Codes", path: "/behavioral-health-coding-guide" },
  { label: "Blogs", path: "/blog" },
  { label: "FAQ", path: "/faq" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact-us" },
];

/** CallRail target — swapped at runtime via src/app/layout.tsx CALLRAIL_SWAP_SRC. */
const TEL_DISPLAY = "949-676-2252";
const TEL_HREF = "tel:949-676-2252";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-[var(--color-primary)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/HORIZONTAL-LOGO_CIPHER-BLACK_TRANSPARENT-BG-1024x262.png"
            alt="Cipher Billing"
            width={200}
            height={50}
            className="h-auto w-[170px]"
          />
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Cipher Billing provides expert RCM and medical billing services for mental health and recovery facilities. We deliver the transparency, compliance, and financial results behavioral health providers need to grow with confidence.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Navigation
          </h3>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={`nav-${link.label}`}
                href={link.path}
                className="text-sm text-slate-700 hover:text-[var(--color-accent)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Get In Touch
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-slate-700">
            <a href="mailto:info@cipherbilling.com" className="hover:text-[var(--color-accent)]">
              Email: info@cipherbilling.com
            </a>
            <a href={TEL_HREF} suppressHydrationWarning className="hover:text-[var(--color-accent)]">
              Phone: {TEL_DISPLAY}
            </a>
            <span>Hours: Mon-Fri 8:00AM - 5:30PM</span>
            <span className="pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Directions
            </span>
            <span>1665 Scenic Ave suite 250, Costa Mesa, CA 92626</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-dark-blue)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-3 text-[10px] uppercase tracking-[0.16em] text-white/80 md:flex-row md:items-center md:justify-between">
          <p>Cipher Billing © 2026 All Rights Reserved.</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Terms &amp; Service</span>
            <span className="text-white/40" aria-hidden>
              |
            </span>
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
