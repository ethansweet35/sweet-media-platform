import Link from "next/link";
import CtmFormReactor from "@/components/feature/CtmFormReactor";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const locations = [
  {
    name: "Garden Grove — The Grove (Flagship)",
    address: "12832 Garden Grove Blvd, Garden Grove, CA 92843",
    phone: "(866) 311-0003",
    href: "/locations/california/garden-grove/",
    icon: "ri-map-pin-2-line",
  },
  {
    name: "Newport Beach",
    address: "Newport Beach, CA",
    phone: "(866) 311-0003",
    href: "/locations/california/newport-beach/",
    icon: "ri-map-pin-2-line",
  },
  {
    name: "San Diego",
    address: "San Diego, CA",
    phone: "(866) 311-0003",
    href: "/locations/california/san-diego/",
    icon: "ri-map-pin-2-line",
  },
  {
    name: "Seattle, WA",
    address: "Seattle, WA",
    phone: "(866) 311-0003",
    href: "/locations/washington/seattle/",
    icon: "ri-map-pin-2-line",
  },
];

const trust = [
  { icon: "ri-award-2-line", label: "JCAHO Accredited" },
  { icon: "ri-shield-check-line", label: "15+ Insurance Plans Accepted" },
  { icon: "ri-time-line", label: "24/7 Admissions" },
  { icon: "ri-lock-line", label: "100% Confidential" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedTextClient>{"We&apos;re Here to Help"}</AutoLinkedTextClient></p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Contact <span className="italic text-[#e97a52]">Northbound</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedTextClient>{"We know how difficult it can be to take that first step toward recovery. At Northbound,\n            you will never be alone on this path. Our admissions team is available 24 hours a day,\n            7 days a week."}</AutoLinkedTextClient>
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm text-white/80">
                <i className={`${t.icon} text-[#e97a52]`} />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

            {/* CTM FormReactor */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Start Your Journey</p>
              <h2 className="font-heading text-3xl font-bold text-[#3a6697] mb-8">
                Tell Us About Yourself
              </h2>
              <CtmFormReactor height={520} title="Contact Northbound Treatment" />
              <p className="mt-4 text-xs text-[#94a3b8] text-center">
                <AutoLinkedTextClient>{"Your information is 100% confidential and never shared."}</AutoLinkedTextClient>
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">

              {/* Phone CTA */}
              <div className="bg-[#3a6697] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-3">
                  Immediate Help
                </p>
                <p className="text-white/80 text-sm leading-6 mb-5">
                  <AutoLinkedTextClient>{"For immediate assistance, call our 24/7 admissions hotline. We answer every call."}</AutoLinkedTextClient>
                </p>
                <a
                  href="tel:8663110003"
                  className="flex items-center gap-3 bg-[#e97a52] px-6 py-4 text-white font-semibold hover:bg-[#f09068] transition-colors"
                >
                  <i className="ri-phone-fill text-xl" />
                  <span>
                    <span className="block text-xs font-normal opacity-80">Call us anytime</span>
                    (866) 311-0003
                  </span>
                </a>
              </div>

              {/* Insurance */}
              <div className="border border-[#cdd8e8] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-3">Insurance</p>
                <p className="text-sm text-[#64748b] leading-6 mb-4">
                  <AutoLinkedTextClient>{"We&apos;re in-network with 15+ major insurance plans. Verify your coverage at no cost — in minutes."}</AutoLinkedTextClient>
                </p>
                <Link href="/insurance/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3a6697] hover:text-[#e97a52] transition-colors">
                  Verify Insurance <i className="ri-arrow-right-line" />
                </Link>
              </div>

              {/* Locations */}
              <div className="border border-[#cdd8e8] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-4">Our Locations</p>
                <div className="space-y-4">
                  {locations.map((loc) => (
                    <Link key={loc.name} href={loc.href} className="group flex items-start gap-3 hover:text-[#e97a52] transition-colors">
                      <i className={`${loc.icon} text-[#e97a52] mt-0.5 shrink-0`} />
                      <div>
                        <p className="text-sm font-semibold text-[#3a6697] group-hover:text-[#e97a52] transition-colors"><AutoLinkedTextClient>{loc.name}</AutoLinkedTextClient></p>
                        <p className="text-xs text-[#64748b]"><AutoLinkedTextClient>{loc.address}</AutoLinkedTextClient></p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Accreditation badges */}
              <div className="bg-[#eef2f7] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <i className="ri-award-2-line text-[#e97a52] text-xl" />
                  <p className="text-sm font-semibold text-[#3a6697]">JCAHO Accredited</p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-star-fill text-[#e97a52]" />
                  <p className="text-sm text-[#64748b]"><AutoLinkedTextClient>{"4.6★ on Google — 224+ reviews"}</AutoLinkedTextClient></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Locations strip */}
      <section className="py-16 bg-[#eef2f7] border-t border-[#cdd8e8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Find Us</p>
          <h2 className="font-heading text-3xl font-bold text-[#3a6697] mb-10">Our Treatment Centers</h2>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <Link key={loc.name} href={loc.href} className="group bg-white p-6 flex flex-col gap-3 hover:bg-[#3a6697] transition-colors">
                <i className={`${loc.icon} text-2xl text-[#e97a52]`} />
                <p className="font-heading text-base font-bold text-[#3a6697] group-hover:text-white transition-colors"><AutoLinkedTextClient>{loc.name}</AutoLinkedTextClient></p>
                <p className="text-xs text-[#64748b] group-hover:text-white/70 transition-colors"><AutoLinkedTextClient>{loc.address}</AutoLinkedTextClient></p>
                <span className="mt-auto text-xs font-semibold text-[#e97a52] flex items-center gap-1">
                  View location <i className="ri-arrow-right-line" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
