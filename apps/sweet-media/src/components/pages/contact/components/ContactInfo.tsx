"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "How quickly do you respond to new inquiries?",
    a: "We respond to all new inquiries within 24 business hours. For urgent matters, you can call us directly at (714) 300-5115 during business hours.",
  },
  {
    q: "Do you require long-term contracts?",
    a: "No. We work on month-to-month agreements after an initial 90-day onboarding period. We believe in earning your business every month — not locking you in.",
  },
  {
    q: "How many new clients do you take on each quarter?",
    a: "We intentionally limit new client intake to 3–5 facilities per quarter to ensure every client gets senior-level attention. If we're at capacity, we'll let you know and add you to our waitlist.",
  },
  {
    q: "Do you work with facilities outside of California?",
    a: "Yes — we serve behavioral health facilities nationwide. Our team is based in Costa Mesa, CA, but we have active clients in 15+ states including Texas, Florida, New York, and Illinois.",
  },
  {
    q: "What's included in the free strategy call?",
    a: "A 30-minute call with a senior strategist. We'll review your current digital presence, identify your biggest growth opportunities, and give you honest recommendations — whether you work with us or not.",
  },
];

export default function ContactInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — map + contact details */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Find Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-8 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Costa Mesa,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>California.</em>
            </h2>

            {/* Map embed */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-black/8 mb-8">
              <iframe
                title="Sweet Media Office — Costa Mesa, CA"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.5!2d-117.9145!3d33.6458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd9b5e3e3e3e3%3A0x0!2s129+W+Wilson+St%2C+Costa+Mesa%2C+CA+92627!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {[
                { icon: "ri-map-pin-2-line", title: "Office", lines: ["129 W Wilson St, Costa Mesa, CA 92627", "Serving clients nationwide"] },
                { icon: "ri-phone-line", title: "Phone", lines: ["(714) 300-5115", "Mon–Fri, 9am–6pm PT"] },
                { icon: "ri-mail-line", title: "Email", lines: ["emma@sweetmediaservices.com", "Response within 24 hours"] },
                { icon: "ri-time-line", title: "Hours", lines: ["Monday–Friday: 9am–6pm PT", "Weekends: By appointment"] },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 border border-black/6">
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#0A1F44]/8 flex-shrink-0">
                    <i className={`${c.icon} text-[#0A1F44] text-sm`}></i>
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-black/35 font-semibold mb-0.5">{c.title}</div>
                    {c.lines.map((l, i) => (
                      <div key={i} className={`text-sm ${i === 0 ? "font-semibold text-black" : "text-black/45"}`}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — FAQ */}
          <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Common Questions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Before You
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Reach Out.</em>
            </h2>

            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-black/20 bg-white" : "border-black/8 bg-white hover:border-black/20"}`}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 cursor-pointer text-left"
                  >
                    <span className={`text-sm font-semibold leading-snug transition-colors ${open === i ? "text-black" : "text-black/70"}`}>
                      {faq.q}
                    </span>
                    <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border transition-all duration-200 ${open === i ? "bg-[#0A1F44] border-[#0A1F44]" : "border-black/15"}`}>
                      <i className={`text-xs transition-all duration-200 ${open === i ? "ri-subtract-line text-white" : "ri-add-line text-black/40"}`}></i>
                    </div>
                  </button>
                  {open === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-black/55 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-10 pt-8 border-t border-black/8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/35 font-semibold mb-4">Follow Sweet Media</p>
              <div className="flex gap-3">
                {[
                  { icon: "ri-linkedin-box-line", label: "LinkedIn", href: "#" },
                  { icon: "ri-instagram-line", label: "Instagram", href: "#" },
                  { icon: "ri-facebook-box-line", label: "Facebook", href: "#" },
                  { icon: "ri-twitter-x-line", label: "X / Twitter", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-black/8 text-black/40 hover:text-[#0A1F44] hover:border-[#0A1F44]/30 transition-all duration-200 cursor-pointer"
                  >
                    <i className={`${s.icon} text-base`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}