import Image from 'next/image';
import Link from 'next/link';
import { AutoLinkedText } from "@sweetmedia/blog-core";

const reasons = [
  { icon: 'ri-shield-check-line', label: 'Confidential & HIPAA-Compliant', color: '#8FA489' },
  { icon: 'ri-time-line', label: 'Available 24 Hours / 7 Days', color: '#DDA15E' },
  { icon: 'ri-bank-card-line', label: 'Most Insurance Accepted', color: '#C8795A' },
  { icon: 'ri-global-line', label: 'Virtual Care Nationwide', color: '#6B7D67' },
];

export default function ContactSection() {
  return (
    <section className="w-full bg-[#3A4A3C] relative overflow-hidden py-24 px-8 md:px-16">
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div className="flex flex-col gap-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Contact Us</span>
          <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(30px, 4vw, 56px)' }}>
            Your first step starts<br />
            with a{' '}
            <em className="text-[#DDA15E] not-italic">conversation.</em>
          </h2>
          <p className="text-[#F0ECE1]/65 font-light text-base leading-[1.9] max-w-md">
            <AutoLinkedText>{"Reach out today. Our compassionate intake team is available around the clock — no judgment, no pressure, just genuine care for where you are right now."}</AutoLinkedText>
          </p>

          {/* Reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: `${r.color}20` }}
                >
                  <i className={`${r.icon} text-sm`} style={{ color: r.color }}></i>
                </div>
                <span className="text-sm text-[#F0ECE1]/70 font-light">{r.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
            >
              Schedule a Free Call
              <i className="ri-phone-line"></i>
            </Link>
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5]/70 hover:bg-[#FAF8F5]/8 transition-all duration-300"
            >
              Send a Message
            </Link>
          </div>
        </div>

        {/* Right — image + contact info card */}
        <div className="flex flex-col gap-6">
          <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '300px' }}>
            <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/contact001.jpg"
  alt="Virtual therapy session"
  fill
  className="w-full h-full object-cover object-center"
/>
          </div>

          {/* Quick contact card */}
          <div className="bg-[#FAF8F5]/8 border border-[#FAF8F5]/12 rounded-2xl p-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: 'ri-phone-line', label: 'Call', value: '719-733-8556', color: '#DDA15E' },
              { icon: 'ri-mail-line', label: 'Email', value: 'admissions@innerpeakcolorado.com', color: '#8FA489' },
              { icon: 'ri-map-pin-line', label: 'Based In', value: 'Colorado Springs, CO', color: '#C8795A' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: `${item.color}20` }}>
                  <i className={`${item.icon} text-sm`} style={{ color: item.color }}></i>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/40 font-medium"><AutoLinkedText>{item.label}</AutoLinkedText></p>
                <p className="text-sm text-[#FAF8F5] font-light"><AutoLinkedText>{item.value}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
