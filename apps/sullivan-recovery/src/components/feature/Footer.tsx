import Image from "next/image";
import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";

const LOGO_URL =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos/sr_logo.png";

const LOGOS_BASE =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos";

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "Our Team", path: "/our-approach/our-team/" },
  { label: "Contact Us", path: "/contact-us/" },
];

const CERTS = [
  {
    src: `${LOGOS_BASE}/sr_cert_joint.png`,
    alt: "The Joint Commission National Quality Approval",
    className: "h-20 w-20 object-contain md:h-24 md:w-24",
    width: 96,
    height: 96,
  },
  {
    src: `${LOGOS_BASE}/sr_cert_dhcs.png`,
    alt: "California Department of Health Care Services",
    className: "h-14 w-auto max-w-[240px] object-contain md:h-16",
    width: 240,
    height: 84,
  },
  {
    src: `${LOGOS_BASE}/sr_cert_legitscript.png`,
    alt: "LegitScript Certified",
    className: "h-16 w-auto object-contain md:h-20",
    width: 80,
    height: 88,
  },
];

const EMAIL = "admissions@sullivanrecovery.com";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--sr-moss)] text-white">
      <div className="sr-container py-14">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          <div className="flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src={LOGO_URL}
                alt="Sullivan Recovery"
                width={160}
                height={160}
                className="h-28 w-28 object-contain brightness-0 invert"
              />
            </Link>
          </div>

          <div>
            <h3
              className="mb-5 text-sm font-medium text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-sm text-white/70 transition hover:text-white"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="mb-5 text-sm font-medium text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Location
            </h3>
            <address
              className="not-italic text-sm leading-relaxed text-white/70"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              24731 Via San Fernando
              <br />
              Mission Viejo, CA 92692
            </address>
          </div>

          <div>
            <h3
              className="mb-5 text-sm font-medium text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <CallRailPhoneLink
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <i className="ri-phone-line text-[var(--sr-sage)]" />
                </CallRailPhoneLink>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <i className="ri-mail-line text-[var(--sr-sage)]" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-14 lg:gap-20">
            {CERTS.map((cert) => (
              <div key={cert.alt} className="flex shrink-0 items-center justify-center">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={cert.width}
                  height={cert.height}
                  unoptimized
                  className={cert.className}
                />
              </div>
            ))}
          </div>
          <p
            className="mt-8 text-center text-[11px] leading-relaxed tracking-[0.08em] text-white/45"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Certified by the Department of Health Care Services · Certification: 300738AP
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-xs text-white/45"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            © {year} Sullivan Recovery. All rights reserved.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <Link
              href="/privacy-policy/"
              className="text-xs text-white/45 transition hover:text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-xs text-white/45 transition hover:text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
