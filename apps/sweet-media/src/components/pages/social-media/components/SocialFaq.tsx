"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "How quickly can I expect to see results from social media management?",
    a: "Content engagement typically improves within the first 2–4 weeks as we establish posting consistency and optimize for your audience. Community management impact is immediate — every message gets a response from day one. Review generation and reputation improvements typically show measurable results within 60–90 days as review volume compounds.",
  },
  {
    q: "Do you only manage social media for behavioral health facilities?",
    a: "Yes — 100% of our social media clients are behavioral health organizations. We understand the unique sensitivities of this industry: HIPAA compliance in responses, crisis escalation protocols, the emotional state of families reaching out, and the regulatory landscape. Generalist social media agencies simply don't have this context.",
  },
  {
    q: "How do you handle crisis-related messages on social media?",
    a: "Every crisis inquiry gets an immediate, compassionate response with clear next steps. We have built-in escalation protocols that route urgent messages to your clinical team within minutes. Our team is trained to recognize crisis language, respond with empathy, and never provide clinical advice — only guidance toward appropriate resources.",
  },
  {
    q: "What's included in the free social media audit?",
    a: "We review all your active social profiles, content quality and consistency, engagement rates, community response times, review platform presence, and competitor positioning. We also assess your brand voice, visual identity, and content gaps. Everything is delivered as a written report with prioritized recommendations within 5 business days.",
  },
  {
    q: "Do you create all content in-house or do we need to provide assets?",
    a: "We produce everything in-house — graphics, video, copy, and scheduling. You don't need to bring assets or manage content creation. If you have existing brand materials, facility photos, or patient testimonials (with proper releases), we'll incorporate them. Otherwise, we build your entire visual identity from scratch.",
  },
  {
    q: "How do you report on social media performance?",
    a: "Every client gets a live reporting dashboard showing engagement rates, follower growth, content performance, community response metrics, and review platform health — updated in real time. We hold monthly strategy calls to review what's working, adjust the content calendar, and plan the next 30 days.",
  },
  {
    q: "Which platforms do you manage?",
    a: "We manage Instagram, Facebook, LinkedIn, and YouTube as our core platforms. We also monitor and respond to reviews on Google, Facebook, Healthgrades, Yelp, and other industry-specific directories. If your audience is active on additional platforms (TikTok, X, etc.), we can expand coverage as part of your growth plan.",
  },
];

export default function SocialFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className={`lg:sticky lg:top-28 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium mb-4 text-center lg:text-left">Common Questions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Social Media Questions,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Answered.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              Everything you need to know about social media management for behavioral health — from content to crisis response to what makes our approach different.
            </p>
            <div className="flex justify-center lg:justify-start">
            <a
              href="#social-contact"
              className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-full hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
            >
              Ask Us Anything
              <i className="ri-arrow-right-line text-sm"></i>
            </a>
            </div>
          </div>

          <div className={`flex flex-col gap-2 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-black/20 bg-white" : "border-black/8 bg-white hover:border-black/20"}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 cursor-pointer text-left"
                >
                  <span className={`text-sm font-semibold leading-snug transition-colors ${open === i ? "text-black" : "text-black/75"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border transition-all duration-200 ${open === i ? "bg-[#0A1F44] border-[#0A1F44]" : "border-black/15"}`}>
                    <i className={`text-xs transition-all duration-200 ${open === i ? "ri-subtract-line text-white" : "ri-add-line text-black/40"}`}></i>
                  </div>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}