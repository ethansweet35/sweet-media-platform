import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Our Company", path: "/our-company" },
  { label: "Our Solution", path: "/our-solution" },
  { label: "Our Process", path: "/our-process-2" },
  { label: "Resources", path: "/resources" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact-us" },
];

const services = [
  { label: "Insurance Billing", path: "/our-solution" },
  { label: "Credentialing", path: "/contact-us" },
  { label: "Denial Management", path: "/blog" },
  { label: "Revenue Cycle Consulting", path: "/behavioral-health-rcm-lp" },
  { label: "Blog", path: "/blog" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-[var(--color-primary)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="https://cipherbilling.com/wp-content/uploads/2026/04/HORIZONTAL-LOGO_CIPHER-BLACK_TRANSPARENT-BG-1024x262.png"
            alt="Cipher Billing"
            width={200}
            height={50}
            className="h-auto w-[170px]"
          />
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Your trusted partner in behavioral health billing services, delivering compliant operations and measurable revenue outcomes.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Navigation
          </h3>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <Link key={`nav-${link.label}`} href={link.path} className="text-sm text-slate-700 hover:text-[var(--color-accent)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Services
          </h3>
          <div className="mt-5 grid gap-3">
            {services.map((link) => (
              <Link key={`svc-${link.label}`} href={link.path} className="text-sm text-slate-700 hover:text-[var(--color-accent)]">
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
            <a href="tel:+17148671331" className="hover:text-[var(--color-accent)]">
              (714) 867-1331
            </a>
            <a href="mailto:info@cipherbilling.com" className="hover:text-[var(--color-accent)]">
              info@cipherbilling.com
            </a>
            <span>1665 Scenic Ave Suite 250</span>
            <span>Costa Mesa, CA 92626</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-dark-blue)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-3 text-[10px] uppercase tracking-[0.16em] text-white/80 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026. All rights reserved.</p>
          <p>Terms & Conditions | Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
