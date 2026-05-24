"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOGO_PATH, SITE } from "@/data/site";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setAreasOpen(false);
  };

  return (
    <div className="min-h-screen">
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      />

      <div className="sticky-call-bar">
        <a href={SITE.phoneHref}>CALL NOW: {SITE.phone}</a>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <img src={LOGO_PATH} alt={SITE.name} style={{ height: "3rem" }} />
          <button
            type="button"
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="mobile-menu-content">
          <Link href="/is-it-time" onClick={closeMobileMenu}>
            Is It Time?
          </Link>
          <Link href="/about-us" onClick={closeMobileMenu}>
            About Us
          </Link>
          <div
            className={`mobile-submenu-label ${servicesOpen ? "open" : ""}`}
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            Services
          </div>
          <div className={`mobile-submenu ${servicesOpen ? "open" : ""}`}>
            <Link href="/services" onClick={closeMobileMenu}>
              Overview
            </Link>
            <Link href="/conditions" onClick={closeMobileMenu}>
              Conditions
            </Link>
            <Link href="/methods" onClick={closeMobileMenu}>
              Methods
            </Link>
          </div>
          <div
            className={`mobile-submenu-label ${areasOpen ? "open" : ""}`}
            onClick={() => setAreasOpen(!areasOpen)}
          >
            Service Areas
          </div>
          <div className={`mobile-submenu ${areasOpen ? "open" : ""}`}>
            <Link href="/service-areas" onClick={closeMobileMenu}>
              Overview
            </Link>
            <Link href="/service-areas/national" onClick={closeMobileMenu}>
              National
            </Link>
            <Link href="/service-areas/international" onClick={closeMobileMenu}>
              International
            </Link>
          </div>
          <Link href="/contact" onClick={closeMobileMenu}>
            Contact Us
          </Link>
          <a href={SITE.phoneHref} className="mobile-call-btn">
            {SITE.phone}
          </a>
        </div>
      </div>

      <nav className="site-nav">
        <div className="container nav-content">
          <Link href="/" className="logo">
            <img src={LOGO_PATH} alt={SITE.name} style={{ height: "5rem" }} />
          </Link>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="nav-links">
            <Link href="/is-it-time">Is It Time?</Link>
            <Link href="/about-us">About Us</Link>
            <div className="nav-item">
              <Link href="/services">Services</Link>
              <div className="dropdown">
                <Link href="/services">Overview</Link>
                <Link href="/conditions">Conditions</Link>
                <Link href="/methods">Methods</Link>
              </div>
            </div>
            <div className="nav-item">
              <Link href="/service-areas">Service Areas</Link>
              <div className="dropdown">
                <Link href="/service-areas">Overview</Link>
                <Link href="/service-areas/national">National</Link>
                <Link href="/service-areas/international">International</Link>
              </div>
            </div>
            <Link href="/contact">Contact</Link>
            <a href={SITE.phoneHref} className="call-btn">
              {SITE.phone}
            </a>
          </div>
        </div>
      </nav>

      {children}

      <footer id="contact">
        <div className="container">
          <div
            className="footer-cta"
            style={{
              backgroundColor: "var(--text-main)",
              color: "var(--bg-paper)",
              padding: "6rem 2rem 4rem 2rem",
              textAlign: "center",
              borderRadius: "var(--radius-large) var(--radius-large) 0 0",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "50%",
                transform: "translateX(-50%) rotate(-1deg)",
                width: "150px",
                height: "40px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(4px)",
              }}
            />
            <h2 style={{ color: "var(--bg-paper)", fontSize: "3rem", marginBottom: "1rem" }}>
              You don&apos;t have to carry this alone.
            </h2>
            <p>Your loved one needs help, and so do you. Let&apos;s create a plan together.</p>
            <Link href="/contact" className="btn btn-light">
              Schedule a Free Consultation
            </Link>

            <div
              className="footer-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                maxWidth: "900px",
                margin: "4rem auto 0 auto",
                textAlign: "left",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "3rem",
                gap: "2rem",
              }}
            >
              <div className="footer-col">
                <h4
                  style={{
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-body), Nunito, sans-serif",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "1.5rem",
                  }}
                >
                  Contact
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    <a href={SITE.phoneHref} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                      {SITE.phone}
                    </a>
                  </li>
                  <li style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    <a href={`mailto:${SITE.email}`} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                      {SITE.email}
                    </a>
                  </li>
                  <li style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    Available 24/7 for crisis
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4
                  style={{
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-body), Nunito, sans-serif",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "1.5rem",
                  }}
                >
                  Service Areas
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    Alcohol & Drug Intervention
                  </li>
                  <li style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    Mental Health Crisis
                  </li>
                  <li style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    Adolescent Services
                  </li>
                  <li style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    Sober Transport
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4
                  style={{
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-body), Nunito, sans-serif",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "1.5rem",
                  }}
                >
                  Locations
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {SITE.locations.map((location) => (
                    <li
                      key={location}
                      style={{ marginBottom: "0.8rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: "4rem", fontSize: "0.8rem", opacity: 0.6 }}>
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
              <br />
              Disclaimer: This service is for intervention and coaching, not emergency medical care. If this is a
              life-threatening emergency, dial 911.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
