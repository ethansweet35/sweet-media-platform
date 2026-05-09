import Image from "next/image";
import { NB_LOGO } from "../assets";

/**
 * Footer with CTA on left, two link columns on right, license disclaimer
 * along the bottom. Per Figma Footer.tsx.
 */
export default function HomeFooter() {
  return (
    <footer id="contact" className="bg-navy pb-12 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 grid grid-cols-1 gap-16 border-b border-white/10 pb-20 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-serif text-4xl text-white lg:text-5xl">
              Begin your recovery.
            </h2>
            <p className="mb-10 max-w-md font-light leading-relaxed text-white/60">
              Admissions counselors are available 24/7. Your call is completely
              confidential. Let us help you navigate the first step toward
              living free.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:8663110003"
                className="bg-terracotta px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta-light"
              >
                Call (866) 311-0003
              </a>
              <a
                href="#insurance"
                className="border border-white/30 px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Verify Insurance
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
                Treatment
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/70">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Drug & Alcohol Detox
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Residential Treatment
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    PHP & IOP Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Virtual / Telehealth
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Sober Living Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
                Resources
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/70">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Verify Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Admissions Process
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Family Support
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 text-xs font-light text-white/40 md:flex-row">
          <div className="flex items-center">
            <Image
              src={NB_LOGO}
              alt="Northbound Treatment Services"
              width={500}
              height={132}
              className="h-7 w-auto brightness-0 invert"
            />
          </div>
          <div className="text-center md:text-left">
            <p>
              Licensed by the State Department of Health Care Services: DHCS
              License #300661CP
            </p>
            <p className="mt-1">
              If you are in a crisis, please call 988 or 911. Medical advice
              disclaimer applies.
            </p>
          </div>
          <p>&copy; 2026 Northbound Addiction Treatment.</p>
        </div>
      </div>
    </footer>
  );
}
