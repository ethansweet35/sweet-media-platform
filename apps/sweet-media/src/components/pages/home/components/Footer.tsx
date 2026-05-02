"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  { label: "AI & Organic SEO", href: "/seo", isLink: true },
  { label: "Google Ads", href: "#paid-media", isLink: false },
  { label: "Meta & Social Ads", href: "#paid-media", isLink: false },
  { label: "TV & Streaming", href: "#paid-media", isLink: false },
  { label: "Web Development", href: "/web-dev", isLink: true },
  { label: "Social Media Mgmt", href: "/social-media", isLink: true },
  { label: "Reputation Management", href: "#social-media", isLink: false },
  { label: "Local SEO", href: "/seo", isLink: true },
];

const company = [
  { label: "Our Difference", href: "#difference" },
  { label: "Verified Results", href: "#results" },
  { label: "Who We Work With", href: "#industries" },
  { label: "Blog & Insights", href: "/blog", isLink: true },
  { label: "Book a Strategy Call", href: "#getting-started" },
];

const industries = [
  "Residential Treatment",
  "Detox & PHP",
  "Outpatient & IOP",
  "Sober Living",
  "Dual Diagnosis",
  "Mental Health",
];

const socials = [
  { icon: "ri-instagram-line", href: "https://instagram.com", label: "Instagram" },
  { icon: "ri-linkedin-fill", href: "https://linkedin.com", label: "LinkedIn" },
  { icon: "ri-facebook-fill", href: "https://facebook.com", label: "Facebook" },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full" style={{ background: "#040e20" }}>

      {/* ── Top brand statement strip ───────────────────────────── */}
      <div className="border-b border-white/8 px-6 py-[50px] md:py-[100px]">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-8">
          <Image
            src="https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/sweet%20media%20logo.png"
            alt="Sweet Media"
            width={200}
            height={48}
            loading="lazy"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/45 font-semibold">Costa Mesa, CA · Est. 2023</span>
            <div className="w-8 h-px bg-white/30" />
          </div>
          <p
            className="text-[22px] md:text-3xl font-light text-white/65 leading-snug max-w-2xl"
            style={{
              fontFamily: "var(--font-cormorant-garamond), Georgia, 'Times New Roman', serif",
            }}
          >
            The only digital marketing agency built{" "}
            <em className="italic" style={{color:'#7B9FD4'}}>exclusively</em> for behavioral health.
          </p>
          <button
            onClick={() => handleNav("#getting-started")}
            className="inline-flex items-center gap-3 bg-white text-[#0A1F44] text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-4 rounded-xl hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap"
          >
            Book a Free Call
            <i className="ri-arrow-right-line text-sm"></i>
          </button>
        </div>
      </div>

      {/* ── Main link grid ──────────────────────────────────────── */}
      <div className="px-5 md:px-6 py-[50px] md:py-[100px] border-b border-white/8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* Services */}
          <div className="col-span-2 md:col-span-1">
            <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50 mb-5">
              Services
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-y-2.5 gap-x-4">
              {services.map((s) =>
                s.isLink ? (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="text-xs text-white/40 hover:text-white transition-colors text-left cursor-pointer whitespace-nowrap leading-relaxed"
                  >
                    {s.label}
                  </Link>
                ) : (
                  <button
                    key={s.label}
                    onClick={() => handleNav(s.href)}
                    className="text-xs text-white/40 hover:text-white transition-colors text-left cursor-pointer whitespace-nowrap leading-relaxed"
                  >
                    {s.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50 mb-5">
              Industries
            </h5>
            <div className="flex flex-col gap-2.5">
              {industries.map((s) => (
                <button
                  key={s}
                  onClick={() => handleNav("#industries")}
                  className="text-xs text-white/40 hover:text-white transition-colors text-left cursor-pointer whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50 mb-5">
              Company
            </h5>
            <div className="flex flex-col gap-2.5">
              {company.map((c) =>
                'isLink' in c && c.isLink ? (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="text-xs text-white/40 hover:text-white transition-colors text-left cursor-pointer whitespace-nowrap"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <button
                    key={c.label}
                    onClick={() => handleNav(c.href)}
                    className="text-xs text-white/40 hover:text-white transition-colors text-left cursor-pointer whitespace-nowrap"
                  >
                    {c.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Contact + social */}
          <div>
            <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50 mb-5">
              Contact
            </h5>
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-start gap-2.5">
                <i className="ri-map-pin-2-line text-white/35 text-sm mt-0.5 flex-shrink-0"></i>
                <span className="text-xs text-white/40 leading-relaxed">
                  Costa Mesa, CA
                  <br />
                  United States
                </span>
              </div>
              <a
                href="tel:+17143005115"
                className="flex items-center gap-2.5 text-xs text-white/40 hover:text-white transition-colors"
              >
                <i className="ri-phone-line text-white/35 text-sm flex-shrink-0"></i>
                (714) 300-5115
              </a>
              <a
                href="mailto:emma@sweetmediaservices.com"
                className="flex items-center gap-2.5 text-xs text-white/40 hover:text-white transition-colors"
              >
                <i className="ri-mail-line text-white/35 text-sm flex-shrink-0"></i>
                emma@sweetmediaservices.com
              </a>
            </div>

            {/* Socials */}
            <h5 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50 mb-4">
              Follow Us
            </h5>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  rel="nofollow"
                  target="_blank"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/8 hover:bg-white/20 text-white/45 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <i className={`${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="px-6 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <p className="text-[11px] text-white/30">
              &copy; {new Date().getFullYear()} Sweet Media LLC. All Rights Reserved.
            </p>
            <span className="text-white/15 text-xs">·</span>
            <span className="text-[11px] text-white/30">Costa Mesa, CA</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[11px] text-white/30 hover:text-white transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[11px] text-white/30 hover:text-white transition-colors whitespace-nowrap"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-[11px] text-white/30 hover:text-white transition-colors whitespace-nowrap"
            >
              HIPAA Notice
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
